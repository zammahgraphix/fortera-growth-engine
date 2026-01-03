import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, MessageSquare, Mail, TrendingUp } from "lucide-react";

interface Stats {
  contacts: number;
  subscribers: number;
  unreadContacts: number;
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    contacts: 0,
    subscribers: 0,
    unreadContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contactsRes, subscribersRes, unreadRes] = await Promise.all([
          supabase.from("contact_submissions").select("id", { count: "exact" }),
          supabase.from("email_subscribers").select("id", { count: "exact" }),
          supabase.from("contact_submissions").select("id", { count: "exact" }).eq("is_read", false),
        ]);

        setStats({
          contacts: contactsRes.count || 0,
          subscribers: subscribersRes.count || 0,
          unreadContacts: unreadRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Contacts",
      value: stats.contacts,
      icon: MessageSquare,
      color: "bg-blue-500",
    },
    {
      label: "Unread Messages",
      value: stats.unreadContacts,
      icon: Mail,
      color: "bg-amber-500",
    },
    {
      label: "Email Subscribers",
      value: stats.subscribers,
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Growth Rate",
      value: "+24%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card-premium p-6 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-4" />
            <div className="h-8 bg-muted rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="card-premium p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card-premium p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Quick Overview</h3>
        <p className="text-muted-foreground">
          Welcome to the Fortera Admin Panel. Use the sidebar navigation to manage contact submissions, email subscribers, portfolio projects, testimonials, and pricing.
        </p>
      </div>
    </div>
  );
};

export default DashboardOverview;
