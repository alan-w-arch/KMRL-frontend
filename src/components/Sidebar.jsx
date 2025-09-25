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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useMemo } from "react";

function Sidebar({ sidebarOpen }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(true);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
      isActive
        ? "bg-green-500/20 text-green-700"
        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
    }`;

  const links = useMemo(
    () => [
      {
        to: "/dashboard",
        icon: <LayoutDashboard size={20} />,
        label: t.dashboard,
      },
      { to: "/uploadfile", icon: <FileUp size={20} />, label: t.documents },
      { to: "/uploadurl", icon: <Link2 size={20} />, label: t.uploadLink },
      { to: "/history", icon: <FileClock size={20} />, label: t.history },
      { to: "/help", icon: <HandHelping size={20} />, label: t.help },
      { to: "/compliance", icon: <FileText size={20} />, label: t.compliance },
      { to: "/view-summary", icon: <View size={20} />, label: t.viewsummary },
      { to: "/analytics", icon: <ChartLine size={20} />, label: t.analytics },
      { to: "/about", icon: <FolderCode size={20} />, label: t.about },
      {
        to: "/admin-options",
        icon: <Crown size={20} />,
        label: t.adminOptions,
      },
    ],
    [t]
  );

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-neutral-200 z-30 transition-all duration-300 flex flex-col
          ${expanded ? "w-64" : "w-16"}
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          overflow-hidden`}
      >
        {/* Brand / Logo */}
        <div className="flex items-center justify-center h-16 border-b border-neutral-200 px-2">
          {expanded ? (
            <span className="font-bold text-xl text-green-600">DocuFlow</span>
          ) : (
            <LayoutDashboard size={24} className="text-green-600" />
          )}
        </div>

        {/* Floating toggle button */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 bg-white border border-neutral-200 rounded-full shadow-lg hover:shadow-xl hover:bg-neutral-50 transition-all z-50"
          aria-label={expanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Navigation */}
        <nav className="flex flex-col p-2 gap-1 flex-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              <div className="flex items-center gap-3">
                {link.icon}
                {expanded && link.label}
              </div>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" />
      )}
    </>
  );
}

export default Sidebar;
