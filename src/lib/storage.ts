import { supabase } from "@/integrations/supabase/client";

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(path, file);

  if (error) throw error;

  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadImageFromUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  const ext = blob.type.split("/")[1] || "jpg";
  const file = new File([blob], `upload.${ext}`, { type: blob.type });
  return uploadImage(file);
}
