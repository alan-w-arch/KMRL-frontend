import React, { useState } from "react";
import { Search, Bell, User, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { searchDocuments } from "../api/services"; // Adjust import path as needed

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") return;
    console.log("Searching for:", query);
    // Replace with API call, navigation, or filtering logic
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) setSearchQuery("");
  };

  const handleSignOut = () => {
    logout(); // clears context + localStorage
    navigate("/login"); // redirect to login
  };

  const handlebellclick = () => {
    setIsUserDropdownOpen(false);
    navigate("/notifications");
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await searchDocuments(query); // query is your search input state
      setResults(data.results || []); // backend returns { results: [...] }
    } catch (err) {
      console.error("Search error", err.response?.data || err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsUserDropdownOpen(false); // Close dropdown after selection
  };

  const handlesettingsclick = () => {
    setIsUserDropdownOpen(false);
    navigate("/profile-settings");
  };
  const handlepreferencesclick=()=>{
    setIsUserDropdownOpen(false);
    navigate("/preferences");
  }


  // Document Icon Component matching your logo
  const DocumentIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 512 512" className={className}>
      <path
        fill="currentColor"
        d="M448 464V48c0-8.837-7.163-16-16-16H112C85.49 32 64 53.49 64 80v352c0 26.51 21.49 48 48 48h320c8.837 0 16-7.163 16-16zM128 80c0-8.837 7.163-16 16-16h192v80c0 8.837 7.163 16 16 16h80v304H112c-8.837 0-16-7.163-16-16V80zm256 32h-48V64h32.686L416 113.314V112z"
      />
      <rect
        x="160"
        y="144"
        width="192"
        height="16"
        rx="8"
        fill="currentColor"
      />
      <rect
        x="160"
        y="192"
        width="192"
        height="16"
        rx="8"
        fill="currentColor"
      />
      <rect
        x="160"
        y="240"
        width="256"
        height="16"
        rx="8"
        fill="currentColor"
      />
      <rect
        x="160"
        y="288"
        width="256"
        height="16"
        rx="8"
        fill="currentColor"
      />
      <rect
        x="160"
        y="336"
        width="256"
        height="16"
        rx="8"
        fill="currentColor"
      />
      <rect
        x="160"
        y="384"
        width="256"
        height="16"
        rx="8"
        fill="currentColor"
      />
      <circle cx="112" cy="304" r="48" fill="currentColor" />
      <rect x="64" y="432" width="96" height="48" rx="24" fill="currentColor" />
    </svg>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-100 p-4 shadow z-40 flex justify-between">
        {/* Left side - Menu + Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 sm:p-2 hover:bg-hover rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X size={18} className="sm:w-5 sm:h-5" />
            ) : (
              <Menu size={18} className="sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Logo only */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
            <DocumentIcon size={14} className="text-secondary sm:w-4 sm:h-4" />
          </div>

          {/* Title only visible on larger screens */}
          <h1 className="hidden md:block text-xl font-heading font-semibold text-primary">
            {t.appName}
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-32 sm:w-48 md:w-64 lg:w-80 px-3 py-1.5 sm:py-2 pl-9 text-sm sm:text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 text-neutral-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 104 10.5a6.5 6.5 0 0013 0z"
              />
            </svg>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white text-sm sm:text-base rounded-lg hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
          {/* Notifications */}
          <button
            onClick={handlebellclick}
            className="relative p-1.5 sm:p-2 hover:bg-hover rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-neutral-600 sm:w-5 sm:h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-danger text-secondary text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 hover:bg-hover rounded-lg transition-colors"
              aria-label="User menu"
            >
              <User size={18} className="text-neutral-600 sm:w-5 sm:h-5" />
              {/* Username only visible on larger screens */}
              <span className="hidden lg:block text-sm font-medium text-neutral-700">
                {user?.name || "Guest"}
              </span>
              <ChevronDown
                size={12}
                className="text-neutral-500 sm:w-3.5 sm:h-3.5"
              />
            </button>

            {/* User Dropdown */}
            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-secondary rounded-lg shadow-lg border border-border py-1 z-dropdown"
                >
                  <div className="px-4 py-3 border-b border-divider">
                    <p className="font-medium text-primary">
                      {user?.name || "Guest"}
                    </p>
                    <p className="text-sm text-neutral-500">-----@kmrl.com</p>
                  </div>

                  {/* Language Selection */}
                  <div className="px-4 py-3 border-b border-divider">
                    <p className="text-sm font-medium text-neutral-700 mb-2">
                      Language
                    </p>
                    <div className="flex bg-neutral-100 rounded-lg p-1">
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className={`flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                          language === "en"
                            ? "bg-secondary text-primary shadow-sm"
                            : "text-neutral-600"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleLanguageChange("ml")}
                        className={`flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                          language === "ml"
                            ? "bg-secondary text-primary shadow-sm"
                            : "text-neutral-600"
                        }`}
                      >
                        മലയാളം
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handlesettingsclick}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-hover transition-colors"
                  >
                    {t.profileSettings}
                  </button>
                  <button
                  onClick={handlepreferencesclick}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-hover transition-colors">
                    {t.preferences}
                  </button>
                  <div className="border-t border-divider mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
                    >
                      {t.signOut}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Click outside to close dropdowns */}
      {(isUserDropdownOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsUserDropdownOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
