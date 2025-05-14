import React from "react";
import { NavLink } from "react-router-dom";
import {
  Film,
  Bookmark,
  Home,
  Star,
  Compass,
  Search,
  TrendingUp,
  Settings,
} from "lucide-react";
import "../styles/Sidebar.css";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-icon">🎬</span>
            <h1 className="logo-text">TeamFlicks</h1>
          </div>
        </div>

        <nav className="nav-links">
          <div className="nav-group">
            <div className="nav-group-title">{t("menu")}</div>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Home size={24} strokeWidth={2.5} />
              <span className="link-text">{t("home")}</span>
            </NavLink>

            <NavLink
              to="/discover"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Compass size={24} strokeWidth={2.5} />
              <span className="link-text">{t("discover")}</span>
            </NavLink>

            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Search size={24} strokeWidth={2.5} />
              <span className="link-text">{t("search")}</span>
            </NavLink>
          </div>

          <div className="nav-group">
            <div className="nav-group-title">{t("library")}</div>
            <NavLink
              to="/watchlist"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Bookmark size={24} strokeWidth={2.5} />
              <span className="link-text">{t("yourcollection")}</span>
            </NavLink>

            {/* <NavLink to="/trending" className={({ isActive }) => isActive ? 'active' : ''}>
              <TrendingUp size={24} strokeWidth={2.5} />
              <span className="link-text">{t('trending')}</span>
            </NavLink> */}
          </div>

          <div className="nav-group">
            <div className="nav-group-title">{t("other")}</div>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Settings size={24} strokeWidth={2.5} />
              <span className="link-text">{t("settings")}</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
