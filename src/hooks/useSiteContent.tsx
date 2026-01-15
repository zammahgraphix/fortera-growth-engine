import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SiteContent {
  id: string;
  key: string;
  content: string;
  label: string;
  category: string;
}

export const useSiteContent = () => {
  return useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*");
      
      if (error) throw error;
      
      // Transform to a key-value map for easy access
      const contentMap: Record<string, string> = {};
      (data as SiteContent[])?.forEach((item) => {
        contentMap[item.key] = item.content;
      });
      
      return contentMap;
    },
  });
};

export const useSiteContentByCategory = (category: string) => {
  return useQuery({
    queryKey: ["site-content", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("category", category);
      
      if (error) throw error;
      return data as SiteContent[];
    },
  });
};
