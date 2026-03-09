import { useState } from "react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import DetailDialog from "@/components/admin/DetailDialog";
import { defaultHospitals } from "@/data/seedData";

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  type: string;
  services: string;
  emergency: string;
  hours: string;
}

const fields = [
  { key: "name", label: "Hospital Name", required: true, placeholder: "Enter hospital name" },
  { key: "address", label: "Address", required: true, placeholder: "Enter address" },
  { key: "phone", label: "Phone", type: "tel" as const, required: true, placeholder: "01XXX-XXXXXX" },
  { key: "email", label: "Email", type: "email" as const, placeholder: "hospital@email.com" },
  { key: "type", label: "Type", type: "select" as const, required: true, options: [{ label: "Government", value: "Government" }, { label: "Private", value: "Private" }] },
  { key: "services", label: "Available Services", type: "textarea" as const, placeholder: "e.g. Emergency, Surgery, ICU" },
  { key: "emergency", label: "Emergency Service", type: "select" as const, options: [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }] },
  { key: "hours", label: "Working Hours", placeholder: "e.g. 24/7 or 8AM - 10PM" },
];

const HospitalsPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<Hospital>({ storageKey: "uims_hospitals", defaultData: defaultHospitals });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Hospital | null>(null);
  const [viewItem, setViewItem] = useState<Hospital | null>(null);

  const columns: Column<Hospital>[] = [
    { key: "name", label: "Name", render: (h) => <span className="font-medium">{h.name}</span> },
    { key: "type", label: "Type", render: (h) => (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${h.type === "Government" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>{h.type}</span>
    )},
    { key: "phone", label: "Phone" },
    { key: "emergency", label: "Emergency", render: (h) => (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${h.emergency === "Yes" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{h.emergency}</span>
    )},
    { key: "hours", label: "Hours" },
  ];

  return (
    <>
      <DataTable
        title="Hospitals"
        description="Manage all hospitals and health facilities"
        data={items}
        columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }}
        onEdit={(h) => { setEditItem(h); setFormOpen(true); }}
        onDelete={(h) => deleteItem(h.id)}
        onView={(h) => setViewItem(h)}
        searchPlaceholder="Search hospitals..."
        searchKeys={["name", "address", "type"]}
        addLabel="Add Hospital"
      />

      <FormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editItem ? "Edit Hospital" : "Add Hospital"}
        fields={fields}
        initialData={editItem || {}}
        onSubmit={(data) => {
          if (editItem) updateItem(editItem.id, data);
          else addItem(data as Omit<Hospital, "id">);
        }}
      />

      <DetailDialog
        open={!!viewItem}
        onClose={() => setViewItem(null)}
        title={viewItem?.name || ""}
        fields={viewItem ? [
          { label: "Name", value: viewItem.name },
          { label: "Address", value: viewItem.address },
          { label: "Phone", value: viewItem.phone },
          { label: "Email", value: viewItem.email },
          { label: "Type", value: viewItem.type },
          { label: "Services", value: viewItem.services },
          { label: "Emergency", value: viewItem.emergency },
          { label: "Working Hours", value: viewItem.hours },
        ] : []}
      />
    </>
  );
};

export default HospitalsPage;
