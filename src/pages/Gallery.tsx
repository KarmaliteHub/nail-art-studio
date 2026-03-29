import { useState } from "react";
import { X } from "lucide-react";
import galleryPreview from "@/assets/gallery-preview.jpg";
import heroImage from "@/assets/hero-manicure.jpg";

const mockGalleryItems = [
  { id: 1, title: "Diseño Floral", description: "Delicadas flores en tonos pastel", image: galleryPreview },
  { id: 2, title: "French Elegante", description: "Clásico francés con un toque moderno", image: heroImage },
  { id: 3, title: "Glitter Rosa", description: "Brillo y glamour para ocasiones especiales", image: galleryPreview },
  { id: 4, title: "Minimalista", description: "Líneas simples, belleza pura", image: heroImage },
  { id: 5, title: "Arte Abstracto", description: "Expresión artística en cada uña", image: galleryPreview },
  { id: 6, title: "Degradado Sunset", description: "Colores cálidos que inspiran", image: heroImage },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<typeof mockGalleryItems[0] | null>(null);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3 animate-fade-up">
            Nuestro portfolio
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground animate-fade-up animate-delay-100">
            Galería de Trabajos
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto animate-fade-up animate-delay-200">
            Cada diseño cuenta una historia. Descubre nuestras creaciones.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mockGalleryItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item)}
              className={`group relative overflow-hidden rounded-2xl aspect-square animate-fade-up animate-delay-${Math.min((index + 1) * 100, 500)}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end">
                <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-display text-lg font-semibold text-primary-foreground">{item.title}</h3>
                  <p className="text-sm text-primary-foreground/80">{item.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-primary-foreground hover:text-primary transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="font-display text-xl font-semibold text-primary-foreground">{lightbox.title}</h3>
              <p className="text-sm text-primary-foreground/70 mt-1">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
