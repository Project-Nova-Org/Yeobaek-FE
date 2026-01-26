import { useState } from "react";
import type { ToastAction, ToastTarget } from "@/components/ToastMessage/ToastMessage";

type DeleteTarget = {
  id: number;
  name?: string;
};

type ToastState = {
  action: ToastAction;
  target: ToastTarget;
};

export function useDeleteFlow(target: ToastTarget) {
  const [selected, setSelected] = useState<DeleteTarget | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const requestDelete = (payload: DeleteTarget) => {
    setSelected(payload);
  };

  const closeAlert = () => {
    setSelected(null);
  };

  const confirmDelete = (onDelete: (id: number) => void) => {
    if (!selected) return;

    onDelete(selected.id);

    setToast({
      action: "delete",
      target,
    });

    setSelected(null);
  };

  const hideToast = () => {
    setToast(null);
  };

  return {
    selected,
    toast,
    requestDelete,
    confirmDelete,
    closeAlert,
    hideToast,
  };
}
