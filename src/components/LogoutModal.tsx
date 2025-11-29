import React from "react";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-[#1f2937] p-6 rounded-2xl w-[400px] shadow-lg text-center transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-10"
        }`}
      >
        <div className="flex items-center justify-center mb-4">
          <LogOut size={38} className="text-primary" />
        </div>

        <h2 className="text-xl font-semibold text-text-primary-dark mb-1">
          Log Out
        </h2>
        <p className="text-text-secondary-dark">
          Are you sure you want to log out of your account?
        </p>

        <div className="mt-6 flex justify-between gap-3">
          <button
            onClick={onCancel}
            className="w-full py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
