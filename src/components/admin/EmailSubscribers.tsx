import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Mail, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

const EmailSubscribers = () => {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from("email_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      toast({
        title: "Error fetching subscribers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const deleteSubscriber = async (id: string) => {
    try {
      const { error } = await supabase
        .from("email_subscribers")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      toast({ title: "Subscriber removed" });
    } catch (error) {
      toast({ title: "Error removing", variant: "destructive" });
    }
  };

  const exportCSV = () => {
    const headers = ["Email", "Subscribed Date", "Status"];
    const rows = subscribers.map((s) => [
      s.email,
      format(new Date(s.subscribed_at), "yyyy-MM-dd"),
      s.is_active ? "Active" : "Inactive",
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {subscribers.length} total subscribers
        </p>
        {subscribers.length > 0 && (
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        )}
      </div>

      {subscribers.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No subscribers yet</h3>
          <p className="text-muted-foreground">Email subscribers will appear here.</p>
        </div>
      ) : (
        <div className="card-premium overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Subscribed
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-foreground">{subscriber.email}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">
                    {format(new Date(subscriber.subscribed_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        subscriber.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {subscriber.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSubscriber(subscriber.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmailSubscribers;
