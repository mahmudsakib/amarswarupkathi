import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  searchPlaceholder?: string;
  searchKeys?: string[];
  filterComponent?: React.ReactNode;
  addLabel?: string;
}

const ITEMS_PER_PAGE = 10;

export function DataTable<T extends { id: string }>({
  title,
  description,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  onView,
  searchPlaceholder = "Search...",
  searchKeys = [],
  filterComponent,
  addLabel = "Add New",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = data.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    if (searchKeys.length === 0) {
      return JSON.stringify(item).toLowerCase().includes(q);
    }
    return searchKeys.some((key) => {
      const val = (item as any)[key];
      return val && String(val).toLowerCase().includes(q);
    });
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity self-start"
          >
            <Plus className="h-4 w-4" />
            {addLabel}
          </button>
        )}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        {filterComponent}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="gradient-card rounded-2xl border border-border/50 shadow-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/30">
                {columns.map((col) => (
                  <th key={col.key} className={`px-4 py-3 text-left font-semibold text-foreground/80 text-xs uppercase tracking-wider ${col.className || ""}`}>
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold text-foreground/80 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-muted-foreground">
                    No records found
                  </td>
                </tr>
              ) : (
                paginated.map((item, i) => (
                  <tr key={item.id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className={`px-4 py-3 text-foreground ${col.className || ""}`}>
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {onView && (
                          <button onClick={() => onView(item)} className="p-2 rounded-lg hover:bg-info/10 text-info transition-colors" title="View">
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button onClick={() => onEdit(item)} className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                        )}
                        {onDelete && (
                          deleteConfirm === item.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => { onDelete(item); setDeleteConfirm(null); }}
                                className="px-2 py-1 rounded-lg bg-destructive text-destructive-foreground text-xs font-medium"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-2 py-1 rounded-lg bg-secondary text-foreground text-xs font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteConfirm(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
            <span className="text-xs text-muted-foreground">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium ${p === page ? "gradient-primary text-primary-foreground" : "hover:bg-secondary text-foreground"}`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
