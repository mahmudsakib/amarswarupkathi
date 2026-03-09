import { useState } from "react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import { defaultCategories } from "@/data/seedData";

interface Category {
  id: string; name: string; type: string; description: string;
}

const fields = [
  { key: "name", label: "Category Name", required: true },
  { key: "type", label: "Type", type: "select" as const, required: true, options: [{ label: "Service", value: "Service" }, { label: "Business", value: "Business" }] },
  { key: "description", label: "Description", type: "textarea" as const },
];

const CategoriesPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<Category>({ storageKey: "uims_categories", defaultData: defaultCategories });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Category | null>(null);

  const columns: Column<Category>[] = [
    { key: "name", label: "Name", render: (c) => <span className="font-medium">{c.name}</span> },
    { key: "type", label: "Type", render: (c) => (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${c.type === "Service" ? "bg-info/10 text-info" : "bg-warning/10 text-warning"}`}>{c.type}</span>
    )},
    { key: "description", label: "Description" },
  ];

  return (
    <>
      <DataTable title="Categories" description="Manage service and business categories" data={items} columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }} onEdit={(c) => { setEditItem(c); setFormOpen(true); }}
        onDelete={(c) => deleteItem(c.id)}
        searchPlaceholder="Search categories..." searchKeys={["name", "type"]} addLabel="Add Category"
      />
      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title={editItem ? "Edit Category" : "Add Category"} fields={fields} initialData={editItem || {}}
        onSubmit={(data) => { if (editItem) updateItem(editItem.id, data); else addItem(data as Omit<Category, "id">); }}
      />
    </>
  );
};

export default CategoriesPage;
