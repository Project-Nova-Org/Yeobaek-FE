import { useState } from "react";
import type { ToastAction, ToastTarget } from "@/components/ToastMessage/ToastMessage";

interface DeleteTarget {
  id: number;
  name: string;
}

export function useDeleteFlow(target: ToastTarget) {
  const [selected, setSelected] = useState<DeleteTarget | null>(null);
  const [toast, setToast] = useState<{ action: ToastAction; target: ToastTarget } | null>(null);

  const requestDelete = (item: DeleteTarget) => {
    setSelected(item);
  };

  const confirmDelete = (onDelete: (id: number) => void) => {
    if (!selected) return;
    onDelete(selected.id);
    setSelected(null);
    setToast({ action: "delete", target });
  };

  return {
    selected,
    toast,
    requestDelete,
    confirmDelete,
    closeAlert: () => setSelected(null),
    hideToast: () => setToast(null),
  };
}
