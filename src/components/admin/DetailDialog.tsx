import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: { label: string; value: string | number | undefined }[];
}

const DetailDialog = ({ open, onClose, title, fields }: DetailDialogProps) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative bg-card rounded-2xl shadow-elevated border border-border w-full max-w-lg mx-4 max-h-[85vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-bold font-display text-foreground">{title}</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {fields.map((f) => (
                <div key={f.label} className="flex flex-col">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{f.label}</span>
                  <span className="text-sm text-foreground mt-0.5">{f.value || "—"}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-border">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DetailDialog;
