// UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.user) {
        const userData = res.data.user;
        userData.avatarUrl = userData.avatarUrl || "/default-avatar.png";

        setUser(userData);

        localStorage.setItem("userName", userData.name);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userAvatar", userData.avatarUrl);
      }
    } catch (err) {
      console.error("fetchUser error:", err);
    }
  };

  const updateProfile = async (formData: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.user) {
        const updatedUser = res.data.user;
        updatedUser.avatarUrl = updatedUser.avatarUrl || "/default-avatar.png";

        setUser(updatedUser);

        localStorage.setItem("userName", updatedUser.name);
        localStorage.setItem("userEmail", updatedUser.email);
        localStorage.setItem("userAvatar", updatedUser.avatarUrl);
      }
    } catch (err) {
      console.error("updateProfile error:", err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAvatar");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, fetchUser, updateProfile, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
