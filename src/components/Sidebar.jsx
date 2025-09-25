import { useLanguage } from "../context/LanguageContext";
import {
  FileText,
  Link2,
  HandHelping,
  FileClock,
  FileUp,
  ChartLine,
  LayoutDashboard,
  FolderCode,
  View,
  Crown,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { t } = useLanguage();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-green-500/40 text-neutral font-medium"
        : "text-neutral-600 hover:bg-neutral-100"
    }`;

  return (
    <>
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-neutral-200 z-30 transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <nav className="p-4 space-y-2 mt-4">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)} // close on mobile
          >
            <LayoutDashboard size={20} />
            {t.dashboard}
          </NavLink>

          {/* Upload File */}
          <NavLink
            to="/uploadfile"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <FileUp size={20} />
            {t.documents}
          </NavLink>

          {/* Upload URL */}
          <NavLink
            to="/uploadurl"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <Link2 size={20} />
            {t.uploadLink}
          </NavLink>

          <NavLink
            to="/history"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <FileClock size={20} />
            {t.history}
          </NavLink>

          <NavLink
            to="/help"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <HandHelping size={20} />
            {t.help}
          </NavLink>

          <NavLink
            to="/compliance"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <FileText size={20} />
            {t.compliance}
          </NavLink>

          <NavLink
            to="/view-summary"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <View size={20} />
            {t.viewsummary}
          </NavLink>

          {/* Analytics */}
          <NavLink
            to="/analytics"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <ChartLine size={20} />
            {t.analytics}
          </NavLink>
          <NavLink
            to="/about"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <FolderCode size={20} />
            {t.about}
          </NavLink>
          <NavLink
            to="/admin-options"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <Crown size={20} />
            {t.adminOptions}
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
