import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSettings, useUpdateSettings, type AppSettings } from "@/hooks/useSettings";
import ImageUpload from "./ImageUpload";
import { Skeleton } from "@/components/ui/skeleton";

const AdminSettings = () => {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const [form, setForm] = useState<AppSettings | null>(null);

  useEffect(() => {
    if (settings && !form) {
      setForm(settings);
    }
  }, [settings, form]);

  const handleSave = async () => {
    if (!form) return;
    try {
      await updateSettings.mutateAsync(form);
      toast.success("Configuración guardada");
    } catch {
      toast.error("Error al guardar");
    }
  };

  if (isLoading || !form) {
    return <div className="max-w-2xl space-y-8">{[1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full" />)}</div>;
  }

  return (
    <div className="max-w-2xl">
      <div className="space-y-8">
        <section className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Información del Negocio</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre del negocio</Label>
              <Input
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
              />
            </div>
            <ImageUpload
              label="Logotipo"
              onUploaded={(url) => setForm({ ...form, logo_url: url })}
            />
            {form.logo_url && (
              <img src={form.logo_url} alt="Logo" className="h-16 object-contain rounded border border-border p-1" />
            )}
          </div>
        </section>

        <section className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">WhatsApp</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Número de WhatsApp</Label>
              <Input
                value={form.whatsapp_number}
                onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
                placeholder="5491112345678"
              />
              <p className="text-xs text-muted-foreground">Formato internacional sin +, ej: 5491112345678</p>
            </div>
            <div className="space-y-2">
              <Label>Mensaje predeterminado</Label>
              <Textarea
                value={form.whatsapp_message}
                onChange={(e) => setForm({ ...form, whatsapp_message: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        </section>

        <section className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Colores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([
              ["primary_color", "Color primario"],
              ["secondary_color", "Color secundario"],
              ["accent_color", "Color acento"],
            ] as const).map(([key, label]) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                  />
                  <Input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="flex-1" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Redes Sociales</h3>
          <p className="text-sm text-muted-foreground mb-4">Agrega los enlaces a tus redes sociales. Déjalos vacíos para que no aparezcan en el sitio.</p>
          <div className="space-y-4">
            {([
              ["social_facebook", "Facebook", "https://facebook.com/tu-pagina"],
              ["social_instagram", "Instagram", "https://instagram.com/tu-cuenta"],
              ["social_tiktok", "TikTok", "https://tiktok.com/@tu-cuenta"],
              ["social_twitter", "Twitter / X", "https://x.com/tu-cuenta"],
              ["social_youtube", "YouTube", "https://youtube.com/@tu-canal"],
            ] as const).map(([key, label, placeholder]) => (
              <div key={key} className="space-y-1">
                <Label>{label}</Label>
                <Input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </section>

        <Button onClick={handleSave} className="rounded-full px-8" size="lg" disabled={updateSettings.isPending}>
          {updateSettings.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
