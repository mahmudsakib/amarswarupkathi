import { useState } from "react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import DetailDialog from "@/components/admin/DetailDialog";
import { defaultGovtOffices } from "@/data/seedData";

interface GovtOffice {
  id: string; name: string; department: string; address: string; contact: string; services: string; officer: string;
}

const fields = [
  { key: "name", label: "Office Name", required: true },
  { key: "department", label: "Department", required: true },
  { key: "address", label: "Address", required: true },
  { key: "contact", label: "Contact", type: "tel" as const },
  { key: "services", label: "Services Offered", type: "textarea" as const },
  { key: "officer", label: "Officer Name" },
];

const GovtOfficesPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<GovtOffice>({ storageKey: "uims_govt_offices", defaultData: defaultGovtOffices });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<GovtOffice | null>(null);
  const [viewItem, setViewItem] = useState<GovtOffice | null>(null);

  const columns: Column<GovtOffice>[] = [
    { key: "name", label: "Name", render: (g) => <span className="font-medium">{g.name}</span> },
    { key: "department", label: "Department", render: (g) => <span className="px-2 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">{g.department}</span> },
    { key: "officer", label: "Officer" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <>
      <DataTable title="Government Offices" description="Manage government departments and offices" data={items} columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }} onEdit={(g) => { setEditItem(g); setFormOpen(true); }}
        onDelete={(g) => deleteItem(g.id)} onView={(g) => setViewItem(g)}
        searchPlaceholder="Search offices..." searchKeys={["name", "department", "officer"]} addLabel="Add Office"
      />
      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title={editItem ? "Edit Office" : "Add Office"} fields={fields} initialData={editItem || {}}
        onSubmit={(data) => { if (editItem) updateItem(editItem.id, data); else addItem(data as Omit<GovtOffice, "id">); }}
      />
      <DetailDialog open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name || ""} fields={viewItem ? [
        { label: "Name", value: viewItem.name }, { label: "Department", value: viewItem.department },
        { label: "Address", value: viewItem.address }, { label: "Contact", value: viewItem.contact },
        { label: "Services", value: viewItem.services }, { label: "Officer", value: viewItem.officer },
      ] : []} />
    </>
  );
};

export default GovtOfficesPage;
