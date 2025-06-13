import { useState, useCallback } from "react";
import { ToastType } from "@/components/ui/toast";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((currentToasts) => [...currentToasts, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const showSuccess = useCallback(
    (message: string) => {
      addToast(message, "success");
    },
    [addToast]
  );

  const showError = useCallback(
    (message: string) => {
      addToast(message, "error");
    },
    [addToast]
  );

  const showInfo = useCallback(
    (message: string) => {
      addToast(message, "info");
    },
    [addToast]
  );

  return {
    toasts,
    showSuccess,
    showError,
    showInfo,
    removeToast,
  };
};
