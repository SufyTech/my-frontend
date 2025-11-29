import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useUser } from "../../context/UserContext";

// Utility to avoid cached avatar
const getAvatarUrl = (avatarUrl: string | undefined) =>
  avatarUrl ? `${avatarUrl}?t=${Date.now()}` : "/default-avatar.png";

const ProfileSection: React.FC = () => {
  const { user, updateProfile } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [preview, setPreview] = useState(
    getAvatarUrl(user?.avatarUrl) || "/default-avatar.png"
  );
  const [file, setFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPreview(getAvatarUrl(user.avatarUrl));
      localStorage.setItem("userAvatar", user.avatarUrl || "");
    }
  }, [user]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
      setPreview(URL.createObjectURL(uploaded));
    }
  };

  const saveChanges = async () => {
    if (!name.trim()) return;
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (file) formData.append("avatar", file);

      await updateProfile(formData);

      // Force preview to refresh with cache-busting
      setPreview(getAvatarUrl(user?.avatarUrl));

      setFile(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Profile update failed. Check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <section className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 shadow-md">
      <div className="border-b border-border pb-5">
        <h2 className="text-2xl font-semibold text-white">Public Profile</h2>
        <p className="mt-1 text-sm text-muted">
          Update your personal information and profile photo.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div
          className="h-24 w-24 rounded-full border-4 border-surface-highlight shadow-inner bg-cover bg-center"
          style={{
            backgroundImage: `url(${preview || "/default-avatar.png"})`,
          }}
        />
        <div className="flex flex-col flex-1">
          <p className="text-lg font-medium text-white">Upload your photo</p>
          <p className="text-sm text-muted">
            This photo appears on your profile.
          </p>
        </div>
        <label className="mt-2 md:mt-0">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <span className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-surface-highlight px-4 text-sm font-bold text-white hover:bg-border transition">
            Upload Image
          </span>
        </label>
      </div>

      <form
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        onSubmit={(e: FormEvent) => e.preventDefault()}
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-black focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="text"
            value={user.email}
            readOnly
            className="block w-full cursor-not-allowed rounded-lg border border-border bg-surface-highlight px-4 py-2.5 text-gray-400 opacity-75"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-end gap-3">
          {saved && (
            <div className="flex items-center gap-2 font-medium text-white">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <svg
                  className="w-4 h-4 text-black"
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
              <span className="text-green-500">Saved!</span>
            </div>
          )}

          <button
            type="button"
            disabled={isSaving}
            onClick={saveChanges}
            className={`flex h-10 min-w-[150px] items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-md transition ${
              isSaving
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-hover"
            }`}
          >
            {isSaving ? "Saving changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileSection;
