import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PricingTier {
  id: string;
  tier: string;
  name: string;
  description: string;
  price: string | null;
  features: unknown[];
  target_audience: string | null;
  is_visible: boolean;
}

const PricingManager = () => {
  const { toast } = useToast();
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PricingTier>>({});

  const fetchPricing = async () => {
    try {
      const { data, error } = await supabase
        .from("pricing_tiers")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      
      const formattedData = (data || []).map((tier) => ({
        ...tier,
        features: Array.isArray(tier.features) ? tier.features : [],
      }));
      
      setTiers(formattedData);
    } catch (error) {
      toast({
        title: "Error fetching pricing",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const startEdit = (tier: PricingTier) => {
    setEditingId(tier.id);
    setEditForm({
      name: tier.name,
      description: tier.description,
      price: tier.price || "",
      target_audience: tier.target_audience || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id: string) => {
    try {
      const { error } = await supabase
        .from("pricing_tiers")
        .update({
          name: editForm.name,
          description: editForm.description,
          price: editForm.price,
          target_audience: editForm.target_audience,
        })
        .eq("id", id);

      if (error) throw error;

      setTiers((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, ...editForm }
            : t
        )
      );

      toast({ title: "Pricing updated" });
      cancelEdit();
    } catch (error) {
      toast({ title: "Error updating", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-muted rounded-xl" />
        ))}
      </div>
    );
  }

  if (tiers.length === 0) {
    return (
      <div className="card-premium p-12 text-center">
        <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No pricing tiers</h3>
        <p className="text-muted-foreground">Pricing tiers will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tiers.map((tier) => (
        <div key={tier.id} className="card-premium p-6">
          {editingId === tier.id ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground capitalize">{tier.tier}</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={cancelEdit}>
                    <X className="w-4 h-4" />
                  </Button>
                  <Button variant="default" size="sm" onClick={() => saveEdit(tier.id)}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    value={editForm.price || ""}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editForm.description || ""}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Input
                  value={editForm.target_audience || ""}
                  onChange={(e) => setEditForm({ ...editForm, target_audience: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                  <p className="text-primary font-medium">{tier.price}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => startEdit(tier)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-muted-foreground mb-4">{tier.description}</p>

              {tier.target_audience && (
                <p className="text-sm text-muted-foreground">
                  Best for: {tier.target_audience}
                </p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PricingManager;
