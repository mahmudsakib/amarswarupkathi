import { useState } from "react";
import { Phone } from "lucide-react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import DetailDialog from "@/components/admin/DetailDialog";
import { defaultEmergencyServices } from "@/data/seedData";

interface EmergencyService {
  id: string; name: string; category: string; phone: string; address: string; contact: string; available: string;
}

const categories = ["Police", "Fire Service", "Ambulance", "Electricity", "Gas", "Local Administration"];

const fields = [
  { key: "name", label: "Service Name", required: true },
  { key: "category", label: "Category", type: "select" as const, required: true, options: categories.map(c => ({ label: c, value: c })) },
  { key: "phone", label: "Emergency Number", type: "tel" as const, required: true },
  { key: "address", label: "Address" },
  { key: "contact", label: "Contact Person" },
  { key: "available", label: "Availability", placeholder: "e.g. 24/7" },
];

const EmergencyPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<EmergencyService>({ storageKey: "uims_emergency", defaultData: defaultEmergencyServices });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<EmergencyService | null>(null);
  const [viewItem, setViewItem] = useState<EmergencyService | null>(null);

  const columns: Column<EmergencyService>[] = [
    { key: "name", label: "Service", render: (e) => <span className="font-medium">{e.name}</span> },
    { key: "category", label: "Category", render: (e) => <span className="px-2 py-1 rounded-lg text-xs font-medium bg-destructive/10 text-destructive">{e.category}</span> },
    { key: "phone", label: "Number", render: (e) => (
      <a href={`tel:${e.phone}`} className="flex items-center gap-1 text-primary font-bold hover:underline">
        <Phone className="h-3 w-3" />{e.phone}
      </a>
    )},
    { key: "available", label: "Available" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <>
      <DataTable title="Emergency Services" description="Manage emergency contact numbers" data={items} columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }} onEdit={(e) => { setEditItem(e); setFormOpen(true); }}
        onDelete={(e) => deleteItem(e.id)} onView={(e) => setViewItem(e)}
        searchPlaceholder="Search emergency services..." searchKeys={["name", "category", "phone"]} addLabel="Add Service"
      />
      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title={editItem ? "Edit Service" : "Add Emergency Service"} fields={fields} initialData={editItem || {}}
        onSubmit={(data) => { if (editItem) updateItem(editItem.id, data); else addItem(data as Omit<EmergencyService, "id">); }}
      />
      <DetailDialog open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name || ""} fields={viewItem ? [
        { label: "Name", value: viewItem.name }, { label: "Category", value: viewItem.category },
        { label: "Phone", value: viewItem.phone }, { label: "Address", value: viewItem.address },
        { label: "Contact", value: viewItem.contact }, { label: "Available", value: viewItem.available },
      ] : []} />
    </>
  );
};

export default EmergencyPage;
