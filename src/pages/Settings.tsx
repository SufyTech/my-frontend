import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileSection from "../components/Profile/ProfileSection";
import PasswordSection from "../components/Profile/PasswordSection";
import DangerZone from "../components/Profile/DangerZone";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Optional: Notifications section
const NotificationsSection: React.FC = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  return (
    <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
      <p className="text-sm text-muted mb-6">
        Manage how you receive notifications.
      </p>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
            className="accent-purple-500"
          />
          <span className="text-white">Email Notifications</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={pushNotif}
            onChange={() => setPushNotif(!pushNotif)}
            className="accent-purple-500"
          />
          <span className="text-white">Push Notifications</span>
        </label>
      </div>
    </section>
  );
};

interface User {
  name: string;
  email: string;
  avatar: string;
}

const Settings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "account" | "security" | "notifications" | "danger"
  >("account");

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found, please login.");

        const API_URL = import.meta.env.VITE_API_URL;

        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        alert("Failed to load profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        {/* Animated loader */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-white text-lg">No user found.</p>
      </div>
    );

  return (
    <div className="flex bg-background min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-border">
          {[
            { key: "account", label: "Account" },
            { key: "security", label: "Security" },
            { key: "notifications", label: "Notifications" },
            { key: "danger", label: "Danger Zone" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                activeTab === tab.key
                  ? tab.key === "danger"
                    ? "bg-red-700 text-white"
                    : "bg-surface-highlight text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content with smooth transitions */}
        <AnimatePresence mode="wait">
          {activeTab === "account" && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileSection />
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <PasswordSection />
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <NotificationsSection />
            </motion.div>
          )}

          {activeTab === "danger" && (
            <motion.div
              key="danger"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DangerZone />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Settings;
