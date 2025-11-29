import React, { useState, FormEvent } from "react";
import axios from "axios";

const PasswordSection: React.FC = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const updatePassword = async () => {
    if (newPass !== confirm) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const res = await axios.put(
        "http://localhost:5000/api/auth/update-password",
        { current, newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Password updated successfully!");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err: any) {
      console.error(err);

      // Use err.response.data.error instead of message
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("Failed to update password");
      }
    }
  };

  return (
    <section className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 shadow-md">
      <div className="border-b border-border pb-5">
        <h2 className="text-2xl font-semibold text-white">Change Password</h2>
        <p className="mt-1 text-sm text-muted">
          Update your password for better account security.
        </p>
      </div>

      <form
        className="grid grid-cols-1 gap-6"
        onSubmit={(e: FormEvent) => e.preventDefault()}
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Current Password
          </label>
          <input
            type="password"
            className="block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            New Password
          </label>
          <input
            type="password"
            className="block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Confirm New Password
          </label>
          <input
            type="password"
            className="block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="h-10 min-w-[150px] p-2 rounded-lg bg-primary text-white font-bold shadow-md hover:bg-primary-hover transition"
            onClick={updatePassword}
          >
            Update Password
          </button>
        </div>
      </form>
    </section>
  );
};

export default PasswordSection;
