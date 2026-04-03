import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AppSettings {
  business_name: string;
  whatsapp_number: string;
  whatsapp_message: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  social_facebook: string;
  social_instagram: string;
  social_tiktok: string;
  social_twitter: string;
  social_youtube: string;
}

const defaultSettings: AppSettings = {
  business_name: "Bella Nails",
  whatsapp_number: "5491112345678",
  whatsapp_message: "Buenas, estoy interesado en sacar una cita con",
  logo_url: "",
  primary_color: "#d4849a",
  secondary_color: "#f5f0e8",
  accent_color: "#c4677e",
  social_facebook: "",
  social_instagram: "",
  social_tiktok: "",
  social_twitter: "",
  social_youtube: "",
};

export function useSettings() {
  return useQuery({
    queryKey: ["app-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_settings")
        .select("key, value");
      if (error) throw error;
      const settings = { ...defaultSettings };
      data?.forEach((row: { key: string; value: string }) => {
        if (row.key in settings) {
          (settings as Record<string, string>)[row.key] = row.value;
        }
      });
      return settings;
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: AppSettings) => {
      const entries = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));
      for (const entry of entries) {
        const { error } = await supabase
          .from("app_settings")
          .upsert({ key: entry.key, value: entry.value, updated_at: entry.updated_at }, { onConflict: "key" });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["app-settings"] });
    },
  });
}
