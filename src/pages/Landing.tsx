import { Link } from "react-router-dom";
import { ArrowRight, Star, Heart, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-manicure.jpg";
import galleryPreview from "@/assets/gallery-preview.jpg";

const services = [
  {
    icon: Palette,
    title: "Nail Art",
    description: "Diseños personalizados que reflejan tu estilo único y personalidad.",
  },
  {
    icon: Star,
    title: "Manicura Clásica",
    description: "Cuidado completo de tus uñas con productos de primera calidad.",
  },
  {
    icon: Heart,
    title: "Uñas en Gel",
    description: "Durabilidad y brillo excepcional que dura semanas sin perder su encanto.",
  },
];

const Landing = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Salón de manicura elegante"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 animate-fade-up">
              Belleza en cada detalle
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up animate-delay-100">
              Tus uñas, <br />
              <span className="text-primary italic">nuestra pasión</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed animate-fade-up animate-delay-200">
              Descubre el arte de la manicura con diseños exclusivos y un servicio personalizado que te hará sentir especial.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-300">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/citas">
                  Pedir Cita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/galeria">Ver Galería</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
              Nuestros servicios
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Lo que ofrecemos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`glass-card p-8 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-up animate-delay-${(index + 1) * 100}`}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
                Nuestro trabajo
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Diseños que <span className="text-primary italic">enamoran</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Cada diseño es una obra de arte. Explora nuestra galería y encuentra la inspiración perfecta para tu próxima visita.
              </p>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link to="/galeria">
                  Ver toda la galería
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src={galleryPreview}
                alt="Galería de trabajos"
                className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
                loading="lazy"
                width={1200}
                height={800}
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Lista para lucir uñas perfectas?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Agenda tu cita hoy y déjanos transformar tus uñas en una obra de arte.
          </p>
          <Button asChild size="lg" className="rounded-full px-10">
            <Link to="/citas">
              Pedir Cita Ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
