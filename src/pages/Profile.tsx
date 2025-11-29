import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileSection from "../components/Profile/ProfileSection";
import PasswordSection from "../components/Profile/PasswordSection";
import DangerZone from "../components/Profile/DangerZone";
import { useUser } from "../context/UserContext";

const Profile: React.FC = () => {
  const { user, updateProfile } = useUser();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-white text-lg">No user found. Please login.</p>
      </div>
    );
  }

  return (
    <div className="flex bg-background min-h-screen text-white">
      <Sidebar />
      <main className="flex-1 p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {/* Pass user and updateProfile to ProfileSection */}
          <ProfileSection />
          <PasswordSection />
          <DangerZone />
        </div>
      </main>
    </div>
  );
};

export default Profile;
