import { useState } from "react";
import { Phone } from "lucide-react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import DetailDialog from "@/components/admin/DetailDialog";
import { defaultBloodDonors } from "@/data/seedData";

interface BloodDonor {
  id: string; name: string; bloodGroup: string; phone: string; address: string;
  lastDonation: string; availability: string; gender: string; age: string;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const fields = [
  { key: "name", label: "Donor Name", required: true },
  { key: "bloodGroup", label: "Blood Group", type: "select" as const, required: true, options: bloodGroups.map(g => ({ label: g, value: g })) },
  { key: "phone", label: "Phone", type: "tel" as const, required: true },
  { key: "address", label: "Address", required: true },
  { key: "lastDonation", label: "Last Donation Date", type: "date" as const },
  { key: "availability", label: "Availability", type: "select" as const, options: [{ label: "Available", value: "Available" }, { label: "Unavailable", value: "Unavailable" }] },
  { key: "gender", label: "Gender", type: "select" as const, options: [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }] },
  { key: "age", label: "Age", type: "number" as const },
];

const BloodDonorsPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<BloodDonor>({ storageKey: "uims_blood_donors", defaultData: defaultBloodDonors });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<BloodDonor | null>(null);
  const [viewItem, setViewItem] = useState<BloodDonor | null>(null);
  const [filterGroup, setFilterGroup] = useState("");

  const filteredItems = filterGroup ? items.filter(d => d.bloodGroup === filterGroup) : items;

  const columns: Column<BloodDonor>[] = [
    { key: "name", label: "Name", render: (d) => <span className="font-medium">{d.name}</span> },
    { key: "bloodGroup", label: "Blood Group", render: (d) => (
      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-destructive/10 text-destructive">{d.bloodGroup}</span>
    )},
    { key: "phone", label: "Phone", render: (d) => (
      <a href={`tel:${d.phone}`} className="flex items-center gap-1 text-primary hover:underline">
        <Phone className="h-3 w-3" />{d.phone}
      </a>
    )},
    { key: "availability", label: "Status", render: (d) => (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${d.availability === "Available" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{d.availability}</span>
    )},
    { key: "lastDonation", label: "Last Donation" },
  ];

  const filterComponent = (
    <select
      value={filterGroup}
      onChange={(e) => setFilterGroup(e.target.value)}
      className="px-3 py-2.5 rounded-xl bg-card text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      <option value="">All Blood Groups</option>
      {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
  );

  return (
    <>
      <DataTable title="Blood Donors" description="Manage blood donor database — search by blood group" data={filteredItems} columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }} onEdit={(d) => { setEditItem(d); setFormOpen(true); }}
        onDelete={(d) => deleteItem(d.id)} onView={(d) => setViewItem(d)}
        searchPlaceholder="Search donors..." searchKeys={["name", "bloodGroup", "address", "phone"]} addLabel="Add Donor"
        filterComponent={filterComponent}
      />
      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title={editItem ? "Edit Donor" : "Add Blood Donor"} fields={fields} initialData={editItem || {}}
        onSubmit={(data) => { if (editItem) updateItem(editItem.id, data); else addItem(data as Omit<BloodDonor, "id">); }}
      />
      <DetailDialog open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name || ""} fields={viewItem ? [
        { label: "Name", value: viewItem.name }, { label: "Blood Group", value: viewItem.bloodGroup },
        { label: "Phone", value: viewItem.phone }, { label: "Address", value: viewItem.address },
        { label: "Last Donation", value: viewItem.lastDonation }, { label: "Availability", value: viewItem.availability },
        { label: "Gender", value: viewItem.gender }, { label: "Age", value: viewItem.age },
      ] : []} />
    </>
  );
};

export default BloodDonorsPage;
