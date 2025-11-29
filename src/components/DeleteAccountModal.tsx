import React, { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // optional for custom buttons/content
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // prevent scroll
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative flex w-full max-w-md flex-col gap-6 rounded-xl border border-border bg-[#1f2937] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-slate-900"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-400">
            Are you sure you want to delete your account?
          </h2>
          <p className="mt-2 text-sm text-muted">
            This action is permanent and cannot be undone.
          </p>
        </div>

        {/* Custom buttons passed as children */}
        {children}
      </div>
    </div>
  );
};
