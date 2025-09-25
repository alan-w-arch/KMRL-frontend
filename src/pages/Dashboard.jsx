import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatsShow from "../components/StatsShow";
import DocumentStacksSection from "../components/DocumentStacksSection"; // Add this import
import RecentDocuments from "../components/RecentDocuments";
import FloatingMenu from "../components/FloatingMenu";
import SearchDrawer from "../components/SearchDrawer";
import { useAuth } from "../context/AuthContext";
import HorizontalScroll from "../components/HorizontalScroll";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const uid = user?.id; // Assuming user object has an 'id' property

  const [activeItem, setActiveItem] = useState("dashboard");

  const handleFileUpload = () => {
    console.log("Upload File Clicked");
  };

  const handleUrlUpload = () => {
    console.log("Upload URL Clicked");
  };

  // Example search function
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

  return (
    <div className="min-h-screen m-0 ">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          toggleSearch={() => {
            setSearchOpen((prev) => !prev);
            setActiveItem("search");
          }}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        {/* Main Content */}
        <main className="flex-1 pt-16 lg:pt-16 p-4 min-h-[150vh] lg:p-6 w-full m-0 overflow-auto">
          <div>
            <DocumentStacksSection userId={uid} />
          </div>

          {/* Add the Document Stacks Section here
          <DocumentStacksSection userId={uid} /> */}

          <RecentDocuments />
          <FloatingMenu
            onFileClick={handleFileUpload}
            onLinkClick={handleUrlUpload}
          />
        </main>
      </div>

      <SearchDrawer
        isSearchOpen={searchOpen}
        toggleSearch={() => setSearchOpen((prev) => !prev)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
        results={results}
        loading={loading}
      />
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[40]"
          onClick={() => setSearchOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
