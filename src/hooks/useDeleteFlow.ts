import { useState, useCallback } from "react";
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

  const requestDelete = useCallback((payload: DeleteTarget) => {
    setSelected(payload);
  }, []);

  const closeAlert = useCallback(() => {
    setSelected(null);
  }, []);

  const showToast = useCallback(
    (action: ToastAction) => {
      setToast({ action, target });
    },
    [target],
  );

  const confirmDelete = useCallback(
    (onDelete: (id: number) => void) => {
      if (!selected) return;
      const idToDelete = selected.id;

      onDelete(idToDelete);
      setToast({ action: "delete", target });
      setSelected(null);
    },
    [selected, target],
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    selected,
    toast,
    requestDelete,
    confirmDelete,
    closeAlert,
    hideToast,
    showToast,
  };
}
