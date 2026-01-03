import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Mail, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Contact {
  id: string;
  name: string;
  company: string | null;
  email: string;
  business_type: string;
  goals: string | null;
  budget_range: string | null;
  timeline: string | null;
  is_read: boolean;
  created_at: string;
}

const ContactSubmissions = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      toast({
        title: "Error fetching contacts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ is_read: true })
        .eq("id", id);

      if (error) throw error;

      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_read: true } : c))
      );

      toast({ title: "Marked as read" });
    } catch (error) {
      toast({ title: "Error updating", variant: "destructive" });
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast({ title: "Contact deleted" });
    } catch (error) {
      toast({ title: "Error deleting", variant: "destructive" });
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-24 bg-muted rounded-xl" />
      ))}
    </div>;
  }

  if (contacts.length === 0) {
    return (
      <div className="card-premium p-12 text-center">
        <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No submissions yet</h3>
        <p className="text-muted-foreground">Contact submissions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`card-premium p-6 ${!contact.is_read ? "ring-2 ring-primary/20" : ""}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-foreground">{contact.name}</h3>
                {!contact.is_read && (
                  <Badge variant="default" className="text-xs">New</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{contact.email}</p>
              {contact.company && (
                <p className="text-sm text-muted-foreground">{contact.company}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!contact.is_read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(contact.id)}
                >
                  <Check className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteContact(contact.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
            <div>
              <span className="text-muted-foreground">Type:</span>
              <p className="font-medium capitalize">{contact.business_type}</p>
            </div>
            {contact.budget_range && (
              <div>
                <span className="text-muted-foreground">Budget:</span>
                <p className="font-medium">{contact.budget_range}</p>
              </div>
            )}
            {contact.timeline && (
              <div>
                <span className="text-muted-foreground">Timeline:</span>
                <p className="font-medium">{contact.timeline}</p>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">Date:</span>
              <p className="font-medium">{format(new Date(contact.created_at), "MMM d, yyyy")}</p>
            </div>
          </div>

          {contact.goals && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground">{contact.goals}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactSubmissions;
