import React, { useState, useEffect } from "react";
import {
  Code2,
  History,
  Settings,
  LogOut,
  Hexagon,
  LayoutDashboard,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { useUser } from "../context/UserContext";

const Sidebar: React.FC<{ currentPath?: string }> = ({ currentPath }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("/default-avatar.png");

  useEffect(() => {
    if (user?.avatarUrl) {
      setAvatarSrc(`${user.avatarUrl}?t=${Date.now()}`);
    } else {
      setAvatarSrc("/default-avatar.png");
    }
  }, [user]);

  const userName = user?.name || "Your Name";
  const userEmail = user?.email || "your.email@example.com";

  const getLinkClasses = (linkPath: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      location.pathname === linkPath
        ? "bg-primary/20 text-primary"
        : "text-text-secondary-dark hover:bg-white/10 hover:text-text-primary-dark"
    }`;

  const handleLogout = () => {
    document.body.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-500"
    );
    setTimeout(() => {
      logout();
      navigate("/");
      document.body.classList.remove("opacity-0");
      document.body.classList.add("opacity-100");
    }, 300);
  };

  const navItems = [
    {
      path: "/dashboard",
      icon: <LayoutDashboard size={28} />,
      label: "Dashboard",
    },
    { path: "/review", icon: <Code2 size={28} />, label: "Review Code" },
    { path: "/history", icon: <History size={28} />, label: "History" },
    { path: "/settings", icon: <Settings size={28} />, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden top-4 right-4 z-[60] p-2 bg-primary text-white rounded-md shadow-md flex items-center justify-center transition-transform hover:scale-105 absolute"
        onClick={() => setMobileOpen(true)}
      >
        <Hexagon size={24} />
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden flex transition-opacity ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Sidebar Content */}
        <aside
          className={`fixed right-0 top-0 h-full w-4/5 bg-gradient-to-b from-primary/80 to-primary/50 p-6 flex flex-col justify-between transform transition-transform duration-500 shadow-2xl rounded-l-3xl ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-6 mt-4">
            <Hexagon fill="currentColor" className="w-12 h-12 text-white" />
            <h1 className="text-white text-2xl font-extrabold">Code-AI</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-5 mt-10 items-center w-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl w-full justify-center transition-all ${
                  location.pathname === item.path
                    ? "bg-white/20 text-white scale-105"
                    : "text-white/90 hover:bg-white/10 hover:scale-105"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.icon}
                <span className="text-lg font-semibold">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Profile & Logout */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <Link
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className="flex flex-col items-center gap-2"
            >
              <img
                src={avatarSrc}
                alt={userName}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-lg"
              />
              <p className="text-white font-semibold text-lg">{userName}</p>
              <p className="text-white/70 text-sm">{userEmail}</p>
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                setShowLogoutModal(true);
              }}
              className="flex items-center gap-2 px-6 py-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all font-medium"
            >
              <LogOut size={20} />
              Log out
            </button>
          </div>
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:sticky md:top-0 md:bg-surface-dark md:border-r md:border-border-dark md:p-4 md:justify-between">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 py-2">
            <Hexagon fill="currentColor" className="w-8 h-8 text-primary" />
            <h1 className="text-text-primary-dark text-lg font-bold">
              Code-AI
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getLinkClasses(item.path)}
              >
                {item.icon}
                <p className="text-sm font-medium">{item.label}</p>
              </Link>
            ))}
          </nav>
        </div>

        {/* Profile & Logout */}
        <div className="flex flex-col gap-3 border-t border-border-dark pt-4">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <img
              src={avatarSrc}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-text-primary-dark">
                {userName}
              </p>
              <p className="text-xs text-text-secondary-dark">{userEmail}</p>
            </div>
          </Link>
          <button
            onClick={() => setShowLogoutModal(true)}
            className={getLinkClasses("/logout")}
          >
            <LogOut size={20} />
            <p className="text-sm font-medium">Log out</p>
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
