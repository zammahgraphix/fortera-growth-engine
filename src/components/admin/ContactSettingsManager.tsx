import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactSettings {
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_address_city: string;
  contact_address_state: string;
  contact_address_country: string;
}

const ContactSettingsManager = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ContactSettings>({
    contact_email: "",
    contact_phone: "",
    contact_whatsapp: "",
    contact_address_city: "",
    contact_address_state: "",
    contact_address_country: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("key, content")
        .eq("category", "contact");

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((item) => {
        settingsMap[item.key] = item.content;
      });

      setSettings({
        contact_email: settingsMap.contact_email || "",
        contact_phone: settingsMap.contact_phone || "",
        contact_whatsapp: settingsMap.contact_whatsapp || "",
        contact_address_city: settingsMap.contact_address_city || "",
        contact_address_state: settingsMap.contact_address_state || "",
        contact_address_country: settingsMap.contact_address_country || "",
      });
    } catch (error) {
      toast({
        title: "Error loading settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(settings).map(([key, content]) => ({
        key,
        content,
        label: key.replace("contact_", "").replace(/_/g, " "),
        category: "contact",
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from("site_content")
          .upsert(update, { onConflict: "key" });

        if (error) throw error;
      }

      toast({ title: "Contact settings saved!" });
    } catch (error) {
      toast({
        title: "Error saving settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Phone & WhatsApp</h3>
            <p className="text-sm text-muted-foreground">
              Contact phone numbers
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={settings.contact_phone}
              onChange={(e) =>
                setSettings({ ...settings, contact_phone: e.target.value })
              }
              placeholder="+234 905 926 2128"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              value={settings.contact_whatsapp}
              onChange={(e) =>
                setSettings({ ...settings, contact_whatsapp: e.target.value })
              }
              placeholder="+2349059262128"
            />
            <p className="text-xs text-muted-foreground">
              No spaces or special characters
            </p>
          </div>
        </div>
      </div>

      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Email</h3>
            <p className="text-sm text-muted-foreground">Primary contact email</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={settings.contact_email}
            onChange={(e) =>
              setSettings({ ...settings, contact_email: e.target.value })
            }
            placeholder="hello@forteraglobalgroup.com"
          />
        </div>
      </div>

      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Address</h3>
            <p className="text-sm text-muted-foreground">Business location</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={settings.contact_address_city}
              onChange={(e) =>
                setSettings({ ...settings, contact_address_city: e.target.value })
              }
              placeholder="Abuja"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={settings.contact_address_state}
              onChange={(e) =>
                setSettings({ ...settings, contact_address_state: e.target.value })
              }
              placeholder="FCT"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={settings.contact_address_country}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact_address_country: e.target.value,
                })
              }
              placeholder="Nigeria"
            />
          </div>
        </div>
      </div>

      <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Saving..." : "Save Contact Settings"}
      </Button>
    </div>
  );
};

export default ContactSettingsManager;
