import React from "react";
import { Search } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="flex justify-center border-b border-solid border-border-dark px-6 py-4 sticky top-0 bg-background-dark/80 backdrop-blur-md z-10">
      {/* Centered Search Bar */}
      <div className="w-full max-w-lg">
        <div className="relative flex w-full items-center rounded-lg h-10 group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-dark pointer-events-none group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="w-full rounded-lg bg-surface-dark/50 text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-dark border border-transparent placeholder:text-text-secondary-dark pl-10 pr-4 text-sm transition-all"
            placeholder="Search for reviews..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
