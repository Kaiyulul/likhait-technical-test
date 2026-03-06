import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HistoryPage from "./pages/HistoryPage";
import { COLORS } from "./constants/colors";
import { createCategory, fetchCategories } from "./services/api";
import { Category, CreateCategoryData } from "./types";
import { Modal } from "./vibes";
import { CreateCategoryModal } from "./components/CreateCategoryModal";

function App() {
  const [currentPage, setCurrentPage] = useState("history");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);

  React.useEffect(() => {
    void loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const appStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: isSidebarCollapsed ? "80px" : "360px",
    transition: "margin-left 0.3s ease",
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleCreateCategory = async (data: CreateCategoryData) => {
    await createCategory(data);
    await loadCategories();
    setIsCreateCategoryOpen(false);
  };

  return (
    <div style={appStyle}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onAddCategory={() => setIsCreateCategoryOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />
      <main style={mainStyle}>
        {currentPage === "history" && <HistoryPage categories={categories} />}
      </main>
      <Modal
        isOpen={isCreateCategoryOpen}
        onClose={() => setIsCreateCategoryOpen(false)}
        title="Add Category"
      >
        <CreateCategoryModal
          onSubmit={handleCreateCategory}
          onCancel={() => setIsCreateCategoryOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
