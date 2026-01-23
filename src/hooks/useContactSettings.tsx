import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { contactDetails } from "@/config/contact";

interface ContactSettings {
  email: string;
  phone: string;
  whatsapp: string;
  city: string;
  state: string;
  country: string;
}

export const useContactSettings = () => {
  const [settings, setSettings] = useState<ContactSettings>({
    email: contactDetails.email,
    phone: contactDetails.phone,
    whatsapp: contactDetails.whatsapp,
    city: contactDetails.address.city,
    state: contactDetails.address.state,
    country: contactDetails.address.country,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("key, content")
          .eq("category", "contact");

        if (error) throw error;

        if (data && data.length > 0) {
          const settingsMap: Record<string, string> = {};
          data.forEach((item) => {
            settingsMap[item.key] = item.content;
          });

          setSettings({
            email: settingsMap.contact_email || contactDetails.email,
            phone: settingsMap.contact_phone || contactDetails.phone,
            whatsapp: settingsMap.contact_whatsapp || contactDetails.whatsapp,
            city: settingsMap.contact_address_city || contactDetails.address.city,
            state: settingsMap.contact_address_state || contactDetails.address.state,
            country: settingsMap.contact_address_country || contactDetails.address.country,
          });
        }
      } catch (error) {
        console.error("Error fetching contact settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const getWhatsAppUrl = (message?: string) => {
    const baseUrl = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`;
    return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
  };

  return { settings, loading, getWhatsAppUrl };
};
