import React from "react";
import { COLORS } from "../constants/colors";

interface SidebarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  onNavigate,
  currentPage = "history",
  isCollapsed = false,
}) => {
  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? "80px" : "360px",
    height: "100vh",
    background: `linear-gradient(180deg, ${COLORS.primary.p01} 0%, ${COLORS.primary.p02} 100%)`,
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${COLORS.secondary.s04}`,
    position: "fixed",
    left: 0,
    top: 0,
    transition: "width 0.3s ease",
    willChange: "width",
  };

  const headerStyle: React.CSSProperties = {
    padding: "24px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${COLORS.secondary.s04}`,
  };

  const logoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isCollapsed ? "0px" : "16px",
    transition: "gap 0.3s ease",
  };

  const logoIconStyle: React.CSSProperties = {
    width: "48px",
    height: "48px",
    background: COLORS.primary.p07,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
  };

  const logoTextStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: isCollapsed ? "0px" : "220px",
    opacity: isCollapsed ? 0 : 1,
    transform: isCollapsed ? "translateX(-8px)" : "translateX(0)",
    transition: "max-width 0.3s ease, opacity 0.2s ease, transform 0.3s ease",
    pointerEvents: isCollapsed ? "none" : "auto",
  };

  const logoTitleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: 700,
    color: COLORS.primary.p09,
    lineHeight: 1.2,
  };

  const navStyle: React.CSSProperties = {
    flex: 1,
    padding: "16px 0",
  };

  const navItemStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "16px",
    background: currentPage === "history" ? COLORS.primary.p03 : "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: 500,
    color: COLORS.primary.p09,
    textAlign: "left",
    transition: "background 0.2s",
  };

  const navTextStyle: React.CSSProperties = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: isCollapsed ? "0px" : "180px",
    opacity: isCollapsed ? 0 : 1,
    transform: isCollapsed ? "translateX(-6px)" : "translateX(0)",
    transition: "max-width 0.3s ease, opacity 0.2s ease, transform 0.3s ease",
    pointerEvents: isCollapsed ? "none" : "auto",
  };

  return (
    <aside style={sidebarStyle}>
      <div style={headerStyle}>
        <div style={logoStyle}>
          <span style={logoIconStyle}>$</span>
          <div style={logoTextStyle}>
            <div style={logoTitleStyle}>Expense Tracker</div>
          </div>
        </div>
      </div>

      <nav style={navStyle}>
        <button
          style={navItemStyle}
          onClick={() => onNavigate?.("history")}
          onMouseEnter={(e) => {
            if (currentPage !== "history") {
              e.currentTarget.style.background = COLORS.primary.p02;
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== "history") {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span style={navTextStyle}>History</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
