import { useState } from "react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import DetailDialog from "@/components/admin/DetailDialog";
import { defaultSchools } from "@/data/seedData";

interface School {
  id: string; name: string; type: string; address: string; contact: string;
  principal: string; students: string; facilities: string;
}

const fields = [
  { key: "name", label: "School Name", required: true },
  { key: "type", label: "Type", type: "select" as const, required: true, options: [{ label: "Government", value: "Government" }, { label: "Private", value: "Private" }] },
  { key: "address", label: "Address", required: true },
  { key: "contact", label: "Contact Number", type: "tel" as const },
  { key: "principal", label: "Principal Name" },
  { key: "students", label: "Number of Students", type: "number" as const },
  { key: "facilities", label: "Facilities", type: "textarea" as const, placeholder: "Library, Lab, Playground..." },
];

const SchoolsPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<School>({ storageKey: "uims_schools", defaultData: defaultSchools });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<School | null>(null);
  const [viewItem, setViewItem] = useState<School | null>(null);

  const columns: Column<School>[] = [
    { key: "name", label: "Name", render: (s) => <span className="font-medium">{s.name}</span> },
    { key: "type", label: "Type", render: (s) => (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${s.type === "Government" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>{s.type}</span>
    )},
    { key: "principal", label: "Principal" },
    { key: "students", label: "Students" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <>
      <DataTable title="Schools" description="Manage educational institutions" data={items} columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }} onEdit={(s) => { setEditItem(s); setFormOpen(true); }}
        onDelete={(s) => deleteItem(s.id)} onView={(s) => setViewItem(s)}
        searchPlaceholder="Search schools..." searchKeys={["name", "type", "principal"]} addLabel="Add School"
      />
      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title={editItem ? "Edit School" : "Add School"} fields={fields} initialData={editItem || {}}
        onSubmit={(data) => { if (editItem) updateItem(editItem.id, data); else addItem(data as Omit<School, "id">); }}
      />
      <DetailDialog open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name || ""} fields={viewItem ? [
        { label: "Name", value: viewItem.name }, { label: "Type", value: viewItem.type },
        { label: "Address", value: viewItem.address }, { label: "Contact", value: viewItem.contact },
        { label: "Principal", value: viewItem.principal }, { label: "Students", value: viewItem.students },
        { label: "Facilities", value: viewItem.facilities },
      ] : []} />
    </>
  );
};

export default SchoolsPage;
