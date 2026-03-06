import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import HistoryPage from "./pages/HistoryPage";
import { COLORS } from "./constants/colors";

function App() {
  const [currentPage, setCurrentPage] = useState("history");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);

  const appStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: isSidebarCollapsed ? "80px" : "360px",
    transition: "margin-left 0.3s ease",
    willChange: "margin-left",
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!sidebarContainerRef.current?.contains(target)) {
        setIsSidebarCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSidebarClick = () => {
    setIsSidebarCollapsed(false);
  };

  return (
    <div style={appStyle}>
      <div ref={sidebarContainerRef} onMouseDown={handleSidebarClick}>
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          isCollapsed={isSidebarCollapsed}
        />
      </div>
      <main style={mainStyle}>
        {currentPage === "history" && <HistoryPage />}
      </main>
    </div>
  );
}

export default App;
