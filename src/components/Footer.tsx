import { Sparkles, Instagram, Phone, MapPin } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const Footer = () => {
  const { data: settings } = useSettings();

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt={settings.business_name} className="h-5 w-5 object-contain" />
              ) : (
                <Sparkles className="h-5 w-5 text-primary" />
              )}
              <span className="font-display text-lg font-semibold">
                {settings?.business_name || "Bella Nails"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tus uñas, nuestra pasión. Diseños únicos que reflejan tu estilo.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Navegación</h4>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Inicio</a>
              <a href="/galeria" className="text-sm text-muted-foreground hover:text-primary transition-colors">Galería</a>
              <a href="/citas" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pedir Cita</a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Contacto</h4>
            <div className="flex flex-col gap-3">
              {settings?.whatsapp_number && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+{settings.whatsapp_number}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Instagram className="h-4 w-4 text-primary" />
                <span>@{(settings?.business_name || "bellanails").toLowerCase().replace(/\s+/g, '')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {settings?.business_name || "Bella Nails"}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
