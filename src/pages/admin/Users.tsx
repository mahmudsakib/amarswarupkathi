import { useState } from "react";
import { useLocalCrud } from "@/hooks/useLocalCrud";
import { DataTable, Column } from "@/components/admin/DataTable";
import FormDialog from "@/components/admin/FormDialog";
import { defaultUsers } from "@/data/seedData";

interface UserRecord {
  id: string; name: string; email: string; role: string; status: string; lastLogin: string;
}

const roles = ["Super Admin", "Upazila Admin", "Data Entry Operator"];

const fields = [
  { key: "name", label: "Full Name", required: true },
  { key: "email", label: "Email", type: "email" as const, required: true },
  { key: "role", label: "Role", type: "select" as const, required: true, options: roles.map(r => ({ label: r, value: r })) },
  { key: "status", label: "Status", type: "select" as const, options: [{ label: "Active", value: "Active" }, { label: "Blocked", value: "Blocked" }] },
];

const UsersPage = () => {
  const { items, addItem, updateItem, deleteItem } = useLocalCrud<UserRecord>({ storageKey: "uims_users", defaultData: defaultUsers });
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<UserRecord | null>(null);

  const columns: Column<UserRecord>[] = [
    { key: "name", label: "Name", render: (u) => <span className="font-medium">{u.name}</span> },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (u) => {
      const colors: Record<string, string> = { "Super Admin": "bg-destructive/10 text-destructive", "Upazila Admin": "bg-primary/10 text-primary", "Data Entry Operator": "bg-info/10 text-info" };
      return <span className={`px-2 py-1 rounded-lg text-xs font-medium ${colors[u.role] || "bg-muted text-muted-foreground"}`}>{u.role}</span>;
    }},
    { key: "status", label: "Status", render: (u) => (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${u.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{u.status}</span>
    )},
    { key: "lastLogin", label: "Last Login" },
  ];

  return (
    <>
      <DataTable title="User Management" description="Manage admin and operator accounts" data={items} columns={columns}
        onAdd={() => { setEditItem(null); setFormOpen(true); }} onEdit={(u) => { setEditItem(u); setFormOpen(true); }}
        onDelete={(u) => deleteItem(u.id)}
        searchPlaceholder="Search users..." searchKeys={["name", "email", "role"]} addLabel="Create User"
      />
      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title={editItem ? "Edit User" : "Create User"} fields={fields} initialData={editItem || { status: "Active" }}
        onSubmit={(data) => { if (editItem) updateItem(editItem.id, data); else addItem({ ...data, lastLogin: new Date().toISOString().slice(0, 10) } as Omit<UserRecord, "id">); }}
      />
    </>
  );
};

export default UsersPage;
