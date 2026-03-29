import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    businessName: "Bella Nails",
    whatsappNumber: "5491112345678",
    whatsappMessage: "Buenas, estoy interesado en sacar una cita con",
    logoUrl: "",
    primaryColor: "#d4849a",
    secondaryColor: "#f5f0e8",
    accentColor: "#c4677e",
  });

  const handleSave = () => {
    toast.success("Configuración guardada (demo). Activa Lovable Cloud para persistir los cambios.");
  };

  return (
    <div className="max-w-2xl">
      <div className="space-y-8">
        {/* Business Info */}
        <section className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Información del Negocio</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre del negocio</Label>
              <Input
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>URL del logotipo</Label>
              <Input
                value={settings.logoUrl}
                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
        </section>

        {/* WhatsApp */}
        <section className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">WhatsApp</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Número de WhatsApp</Label>
              <Input
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="5491112345678"
              />
              <p className="text-xs text-muted-foreground">Formato internacional sin +, ej: 5491112345678</p>
            </div>
            <div className="space-y-2">
              <Label>Mensaje predeterminado</Label>
              <Textarea
                value={settings.whatsappMessage}
                onChange={(e) => setSettings({ ...settings, whatsappMessage: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Colores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Color primario</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                />
                <Input value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color secundario</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                />
                <Input value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color acento</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                />
                <Input value={settings.accentColor} onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })} className="flex-1" />
              </div>
            </div>
          </div>
        </section>

        <Button onClick={handleSave} className="rounded-full px-8" size="lg">
          <Save className="h-4 w-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
