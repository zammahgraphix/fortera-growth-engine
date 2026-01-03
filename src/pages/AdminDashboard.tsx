import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  FolderOpen,
  Settings,
  LogOut,
  BarChart3,
  Star,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import forteraIcon from "@/assets/fortera-icon.png";
import DashboardOverview from "@/components/admin/DashboardOverview";
import ContactSubmissions from "@/components/admin/ContactSubmissions";
import EmailSubscribers from "@/components/admin/EmailSubscribers";
import PortfolioManager from "@/components/admin/PortfolioManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import PricingManager from "@/components/admin/PricingManager";

type TabType = "overview" | "contacts" | "subscribers" | "portfolio" | "testimonials" | "pricing";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      // Verify admin role
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been signed out successfully.",
    });
    navigate("/admin");
  };

  const navItems = [
    { id: "overview" as TabType, label: "Overview", icon: LayoutDashboard },
    { id: "contacts" as TabType, label: "Contact Submissions", icon: MessageSquare },
    { id: "subscribers" as TabType, label: "Email Subscribers", icon: Mail },
    { id: "portfolio" as TabType, label: "Portfolio", icon: FolderOpen },
    { id: "testimonials" as TabType, label: "Testimonials", icon: Star },
    { id: "pricing" as TabType, label: "Pricing", icon: DollarSign },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={forteraIcon} alt="Fortera" className="h-8 w-8" />
            <span className="font-semibold text-foreground">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-border flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-foreground">
            {navItems.find((item) => item.id === activeTab)?.label}
          </h1>
          <div className="text-sm text-muted-foreground">
            {user?.email}
          </div>
        </header>

        <div className="p-8">
          {activeTab === "overview" && <DashboardOverview />}
          {activeTab === "contacts" && <ContactSubmissions />}
          {activeTab === "subscribers" && <EmailSubscribers />}
          {activeTab === "portfolio" && <PortfolioManager />}
          {activeTab === "testimonials" && <TestimonialsManager />}
          {activeTab === "pricing" && <PricingManager />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
