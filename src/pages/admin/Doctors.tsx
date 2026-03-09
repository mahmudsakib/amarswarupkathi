import { useState } from "react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import DetailDialog from "@/components/admin/DetailDialog";
import { defaultDoctors } from "@/data/seedData";

interface Doctor {
  id: string; name: string; specialization: string; hospital: string; phone: string;
  visitingHours: string; chamber: string; qualification: string; experience: string;
}

const fields = [
  { key: "name", label: "Doctor Name", required: true, placeholder: "Dr. ..." },
  { key: "specialization", label: "Specialization", type: "select" as const, required: true, options: [
    "Cardiology", "Gynecology", "Pediatrics", "Medicine", "Orthopedics", "Surgery", "ENT", "Dermatology", "Neurology", "Ophthalmology"
  ].map(s => ({ label: s, value: s })) },
  { key: "hospital", label: "Hospital/Clinic", required: true, placeholder: "Hospital name" },
  { key: "phone", label: "Phone", type: "tel" as const, required: true },
  { key: "visitingHours", label: "Visiting Hours", placeholder: "e.g. 9AM - 1PM" },
  { key: "chamber", label: "Chamber Address", placeholder: "Room/Floor details" },
  { key: "qualification", label: "Qualification", placeholder: "e.g. MBBS, FCPS" },
  { key: "experience", label: "Experience", placeholder: "e.g. 10 years" },
];

const DoctorsPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<Doctor>({ storageKey: "uims_doctors", defaultData: defaultDoctors });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Doctor | null>(null);
  const [viewItem, setViewItem] = useState<Doctor | null>(null);

  const columns: Column<Doctor>[] = [
    { key: "name", label: "Name", render: (d) => <span className="font-medium">{d.name}</span> },
    { key: "specialization", label: "Specialization", render: (d) => (
      <span className="px-2 py-1 rounded-lg text-xs font-medium bg-success/10 text-success">{d.specialization}</span>
    )},
    { key: "hospital", label: "Hospital" },
    { key: "visitingHours", label: "Hours" },
    { key: "phone", label: "Phone" },
  ];

  return (
    <>
      <DataTable title="Doctors" description="Manage all registered doctors" data={items} columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }}
        onEdit={(d) => { setEditItem(d); setFormOpen(true); }}
        onDelete={(d) => deleteItem(d.id)}
        onView={(d) => setViewItem(d)}
        searchPlaceholder="Search doctors..." searchKeys={["name", "specialization", "hospital"]} addLabel="Add Doctor"
      />
      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title={editItem ? "Edit Doctor" : "Add Doctor"} fields={fields} initialData={editItem || {}}
        onSubmit={(data) => { if (editItem) updateItem(editItem.id, data); else addItem(data as Omit<Doctor, "id">); }}
      />
      <DetailDialog open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name || ""} fields={viewItem ? [
        { label: "Name", value: viewItem.name }, { label: "Specialization", value: viewItem.specialization },
        { label: "Hospital", value: viewItem.hospital }, { label: "Phone", value: viewItem.phone },
        { label: "Visiting Hours", value: viewItem.visitingHours }, { label: "Chamber", value: viewItem.chamber },
        { label: "Qualification", value: viewItem.qualification }, { label: "Experience", value: viewItem.experience },
      ] : []} />
    </>
  );
};

export default DoctorsPage;
