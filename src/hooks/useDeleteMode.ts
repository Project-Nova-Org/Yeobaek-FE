import { useState } from "react";

export function useDeleteMode() {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const enterDeleteMode = () => setIsDeleteMode(true);
  const exitDeleteMode = () => setIsDeleteMode(false);

  return {
    isDeleteMode,
    enterDeleteMode,
    exitDeleteMode,
  };
}
