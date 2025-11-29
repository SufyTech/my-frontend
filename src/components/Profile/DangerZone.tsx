import React, { useState } from "react";
import axios from "axios";
import { DeleteAccountModal } from "../DeleteAccountModal"; // your existing modal

const DangerZone: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // success modal state

  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:5000/api/auth/delete-account", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.clear();
      setIsModalOpen(false);
      setIsSuccess(true); // show success modal

      // redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to delete account. Please try again.");
    }
  };

  return (
    <>
      <section className="rounded-xl border border-red-600/50 bg-red-900/20 p-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <div>
            <h2 className="text-2xl font-semibold text-white">Danger Zone</h2>
            <p className="mt-1 text-sm text-muted">
              Deleting your account is permanent and cannot be undone.
            </p>
          </div>
          <button
            className="h-10 min-w-[140px] rounded-lg bg-red-600 text-white font-bold shadow-md hover:bg-red-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Delete Account
          </button>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex justify-end gap-4">
          <button
            onClick={deleteAccount}
            className="flex h-10 items-center justify-center rounded-lg bg-red-600 px-5 text-sm font-bold text-white shadow-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </DeleteAccountModal>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-black/50">
          <div className="flex flex-col items-center justify-center rounded-xl bg-green-600 p-6 shadow-lg animate-fade-in">
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414L9 14.414l-3.707-3.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Your account was deleted successfully
            </h3>
            <p className="text-sm text-white/80 text-center mt-1">
              You will be redirected to the home page shortly.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DangerZone;
