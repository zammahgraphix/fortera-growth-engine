import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save, RefreshCw, Plus, Trash2 } from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  is_visible: boolean;
  display_order: number;
}

const SocialLinksManager = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch social links",
        variant: "destructive",
      });
    } else {
      setLinks(data as SocialLink[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleUpdate = async (link: SocialLink) => {
    setSaving(link.id);
    const { error } = await supabase
      .from("social_links")
      .update({
        platform: link.platform,
        url: link.url,
        is_visible: link.is_visible,
      })
      .eq("id", link.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update link",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `${link.platform} updated successfully`,
      });
    }
    setSaving(null);
  };

  const handleToggleVisibility = async (link: SocialLink) => {
    const updatedLink = { ...link, is_visible: !link.is_visible };
    const updatedLinks = links.map((l) =>
      l.id === link.id ? updatedLink : l
    );
    setLinks(updatedLinks);
    await handleUpdate(updatedLink);
  };

  const handleChange = (id: string, field: keyof SocialLink, value: string) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    setLinks(updatedLinks);
  };

  const handleAddLink = async () => {
    const newOrder = links.length > 0 
      ? Math.max(...links.map(l => l.display_order)) + 1 
      : 1;
    
    const { data, error } = await supabase
      .from("social_links")
      .insert({
        platform: "New Platform",
        url: "https://",
        icon: "Link",
        display_order: newOrder,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add link",
        variant: "destructive",
      });
    } else {
      setLinks([...links, data as SocialLink]);
      toast({
        title: "Success",
        description: "New social link added",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete link",
        variant: "destructive",
      });
    } else {
      setLinks(links.filter((l) => l.id !== id));
      toast({
        title: "Success",
        description: "Social link deleted",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Social Media Links</h2>
          <p className="text-sm text-muted-foreground">
            Manage social media links displayed in the footer
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchLinks}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleAddLink}>
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="p-4 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Platform
                  </label>
                  <Input
                    value={link.platform}
                    onChange={(e) =>
                      handleChange(link.id, "platform", e.target.value)
                    }
                    placeholder="Platform name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    URL
                  </label>
                  <Input
                    value={link.url}
                    onChange={(e) =>
                      handleChange(link.id, "url", e.target.value)
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={link.is_visible}
                    onCheckedChange={() => handleToggleVisibility(link)}
                  />
                  <span className="text-xs text-muted-foreground">Visible</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleUpdate(link)}
                  disabled={saving === link.id}
                >
                  {saving === link.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(link.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksManager;
