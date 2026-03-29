import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Image, Settings, LogOut, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import AdminWorkers from "@/components/admin/AdminWorkers";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminSettings from "@/components/admin/AdminSettings";

type Tab = "workers" | "gallery" | "settings";

const tabs = [
  { id: "workers" as Tab, label: "Trabajadoras", icon: Users },
  { id: "gallery" as Tab, label: "Galería", icon: Image },
  { id: "settings" as Tab, label: "Configuración", icon: Settings },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("workers");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-semibold">Bella Nails</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Panel Administrativo</p>
        </div>

        <nav className="p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
            <Link to="/admin/login">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Link>
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center px-4 md:px-6">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4 text-foreground">
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="font-display text-lg font-semibold">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {activeTab === "workers" && <AdminWorkers />}
          {activeTab === "gallery" && <AdminGallery />}
          {activeTab === "settings" && <AdminSettings />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
