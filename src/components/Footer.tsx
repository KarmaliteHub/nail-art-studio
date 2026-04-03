import { Sparkles, Instagram, Phone, MapPin, Facebook, Twitter, Youtube } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.19a8.16 8.16 0 004.76 1.53V7.27a4.85 4.85 0 01-1-.58z" />
  </svg>
);

interface SocialLink {
  key: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}

const Footer = () => {
  const { data: settings } = useSettings();

  const socialLinks: SocialLink[] = [
    { key: "social_facebook", url: settings?.social_facebook || "", icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
    { key: "social_instagram", url: settings?.social_instagram || "", icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
    { key: "social_tiktok", url: settings?.social_tiktok || "", icon: <TikTokIcon className="h-5 w-5" />, label: "TikTok" },
    { key: "social_twitter", url: settings?.social_twitter || "", icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { key: "social_youtube", url: settings?.social_youtube || "", icon: <Youtube className="h-5 w-5" />, label: "YouTube" },
  ].filter((link) => link.url.trim() !== "");

  const businessName = settings?.business_name || "Bella Nails";

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="h-6 w-6 object-contain" />
              ) : (
                <Sparkles className="h-5 w-5 text-primary" />
              )}
              <span className="font-display text-lg font-semibold">{businessName}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tus uñas, nuestra pasión. Diseños únicos que reflejan tu estilo.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
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
                <MapPin className="h-4 w-4 text-primary" />
                <span>Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {businessName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;