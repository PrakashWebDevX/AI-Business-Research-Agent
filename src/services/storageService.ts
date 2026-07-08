import { supabase } from "@/lib/supabase";

const BUCKET = "employee-images";

export const storageService = {
  async uploadProfileImage(file: File, employeeId: string): Promise<string> {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${employeeId}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      upsert: true,
      contentType: file.type,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  },
  async deleteByPublicUrl(publicUrl: string | null | undefined) {
    if (!publicUrl) return;
    const marker = `/${BUCKET}/`;
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return;
    const path = publicUrl.substring(idx + marker.length);
    await supabase.storage.from(BUCKET).remove([path]);
  },
};
