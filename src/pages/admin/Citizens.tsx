import { useState } from "react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import DetailDialog from "@/components/admin/DetailDialog";
import { defaultCitizens } from "@/data/seedData";

interface Citizen {
  id: string; name: string; fatherName: string; motherName: string; occupation: string;
  phone: string; address: string; bloodGroup: string; education: string; profession: string;
}

const fields = [
  { key: "name", label: "Full Name", required: true },
  { key: "fatherName", label: "Father's Name", required: true },
  { key: "motherName", label: "Mother's Name" },
  { key: "occupation", label: "Occupation" },
  { key: "phone", label: "Phone", type: "tel" as const },
  { key: "address", label: "Address", required: true },
  { key: "bloodGroup", label: "Blood Group", type: "select" as const, options: ["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g => ({ label: g, value: g })) },
  { key: "education", label: "Education" },
  { key: "profession", label: "Profession" },
];

const CitizensPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<Citizen>({ storageKey: "uims_citizens", defaultData: defaultCitizens });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Citizen | null>(null);
  const [viewItem, setViewItem] = useState<Citizen | null>(null);

  const columns: Column<Citizen>[] = [
    { key: "name", label: "Name", render: (c) => <span className="font-medium">{c.name}</span> },
    { key: "fatherName", label: "Father" },
    { key: "occupation", label: "Occupation" },
    { key: "bloodGroup", label: "Blood", render: (c) => c.bloodGroup ? <span className="px-2 py-1 rounded-lg text-xs font-medium bg-destructive/10 text-destructive">{c.bloodGroup}</span> : "—" },
    { key: "phone", label: "Phone" },
  ];

  return (
    <>
      <DataTable title="Citizens" description="Village people database" data={items} columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }} onEdit={(c) => { setEditItem(c); setFormOpen(true); }}
        onDelete={(c) => deleteItem(c.id)} onView={(c) => setViewItem(c)}
        searchPlaceholder="Search citizens..." searchKeys={["name", "fatherName", "address", "phone"]} addLabel="Add Citizen"
      />
      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title={editItem ? "Edit Citizen" : "Add Citizen"} fields={fields} initialData={editItem || {}}
        onSubmit={(data) => { if (editItem) updateItem(editItem.id, data); else addItem(data as Omit<Citizen, "id">); }}
      />
      <DetailDialog open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name || ""} fields={viewItem ? [
        { label: "Name", value: viewItem.name }, { label: "Father", value: viewItem.fatherName },
        { label: "Mother", value: viewItem.motherName }, { label: "Occupation", value: viewItem.occupation },
        { label: "Phone", value: viewItem.phone }, { label: "Address", value: viewItem.address },
        { label: "Blood Group", value: viewItem.bloodGroup }, { label: "Education", value: viewItem.education },
        { label: "Profession", value: viewItem.profession },
      ] : []} />
    </>
  );
};

export default CitizensPage;
