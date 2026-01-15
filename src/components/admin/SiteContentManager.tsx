import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, RefreshCw } from "lucide-react";

interface SiteContent {
  id: string;
  key: string;
  content: string;
  label: string;
  category: string;
}

const SiteContentManager = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("category", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch site content",
        variant: "destructive",
      });
    } else {
      setContent(data as SiteContent[]);
      const initialEdits: Record<string, string> = {};
      (data as SiteContent[]).forEach((item) => {
        initialEdits[item.id] = item.content;
      });
      setEditedContent(initialEdits);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (item: SiteContent) => {
    setSaving(item.id);
    const { error } = await supabase
      .from("site_content")
      .update({ content: editedContent[item.id] })
      .eq("id", item.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `${item.label} updated successfully`,
      });
    }
    setSaving(null);
  };

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SiteContent[]>);

  const categoryLabels: Record<string, string> = {
    home: "Home Page",
    about: "About Section",
    digital: "Digital Page",
    stats: "Statistics",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Site Content</h2>
          <p className="text-sm text-muted-foreground">
            Edit text across the entire website
          </p>
        </div>
        <Button variant="outline" onClick={fetchContent}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {Object.entries(groupedContent).map(([category, items]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-md font-medium text-foreground border-b border-border pb-2">
            {categoryLabels[category] || category}
          </h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {item.label}
                    </label>
                    {item.content.length > 100 ? (
                      <Textarea
                        value={editedContent[item.id] || ""}
                        onChange={(e) =>
                          setEditedContent({
                            ...editedContent,
                            [item.id]: e.target.value,
                          })
                        }
                        rows={4}
                        className="resize-none"
                      />
                    ) : (
                      <Input
                        value={editedContent[item.id] || ""}
                        onChange={(e) =>
                          setEditedContent({
                            ...editedContent,
                            [item.id]: e.target.value,
                          })
                        }
                      />
                    )}
                    <p className="text-xs text-muted-foreground">
                      Key: {item.key}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSave(item)}
                    disabled={
                      saving === item.id ||
                      editedContent[item.id] === item.content
                    }
                  >
                    {saving === item.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SiteContentManager;
