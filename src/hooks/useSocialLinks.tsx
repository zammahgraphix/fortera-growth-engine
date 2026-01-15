import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  is_visible: boolean;
  display_order: number;
}

export const useSocialLinks = () => {
  return useQuery({
    queryKey: ["social-links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as SocialLink[];
    },
  });
};

export const useAllSocialLinks = () => {
  return useQuery({
    queryKey: ["social-links-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as SocialLink[];
    },
  });
};
