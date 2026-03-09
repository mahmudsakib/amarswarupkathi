import { useState } from "react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import DetailDialog from "@/components/admin/DetailDialog";
import { defaultBusinesses } from "@/data/seedData";

interface Business {
  id: string; name: string; owner: string; category: string; phone: string;
  address: string; description: string; hours: string;
}

const categories = ["Pharmacy", "Grocery", "Restaurant", "Electronics", "Agriculture", "Services", "Other"];

const fields = [
  { key: "name", label: "Business Name", required: true },
  { key: "owner", label: "Owner Name", required: true },
  { key: "category", label: "Category", type: "select" as const, required: true, options: categories.map(c => ({ label: c, value: c })) },
  { key: "phone", label: "Phone", type: "tel" as const },
  { key: "address", label: "Address", required: true },
  { key: "description", label: "Description", type: "textarea" as const },
  { key: "hours", label: "Opening Hours", placeholder: "e.g. 8AM - 10PM" },
];

const BusinessesPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<Business>({ storageKey: "uims_businesses", defaultData: defaultBusinesses });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Business | null>(null);
  const [viewItem, setViewItem] = useState<Business | null>(null);
  const [filterCat, setFilterCat] = useState("");

  const filtered = filterCat ? items.filter(b => b.category === filterCat) : items;

  const columns: Column<Business>[] = [
    { key: "name", label: "Name", render: (b) => <span className="font-medium">{b.name}</span> },
    { key: "category", label: "Category", render: (b) => <span className="px-2 py-1 rounded-lg text-xs font-medium bg-warning/10 text-warning">{b.category}</span> },
    { key: "owner", label: "Owner" },
    { key: "phone", label: "Phone" },
    { key: "hours", label: "Hours" },
  ];

  return (
    <>
      <DataTable title="Businesses" description="Local business directory" data={filtered} columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }} onEdit={(b) => { setEditItem(b); setFormOpen(true); }}
        onDelete={(b) => deleteItem(b.id)} onView={(b) => setViewItem(b)}
        searchPlaceholder="Search businesses..." searchKeys={["name", "owner", "category"]} addLabel="Add Business"
        filterComponent={
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-card text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        }
      />
      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title={editItem ? "Edit Business" : "Add Business"} fields={fields} initialData={editItem || {}}
        onSubmit={(data) => { if (editItem) updateItem(editItem.id, data); else addItem(data as Omit<Business, "id">); }}
      />
      <DetailDialog open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name || ""} fields={viewItem ? [
        { label: "Name", value: viewItem.name }, { label: "Owner", value: viewItem.owner },
        { label: "Category", value: viewItem.category }, { label: "Phone", value: viewItem.phone },
        { label: "Address", value: viewItem.address }, { label: "Description", value: viewItem.description },
        { label: "Hours", value: viewItem.hours },
      ] : []} />
    </>
  );
};

export default BusinessesPage;
