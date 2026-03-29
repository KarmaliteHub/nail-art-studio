import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockWorkers = [
  {
    id: 1,
    name: "María González",
    specialty: "Nail Art & Diseños",
    description: "Especialista en diseños artísticos y técnicas avanzadas de decoración.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    active: true,
  },
  {
    id: 2,
    name: "Laura Martínez",
    specialty: "Uñas en Gel",
    description: "Experta en extensiones de gel y acabados de larga duración.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    active: true,
  },
  {
    id: 3,
    name: "Ana López",
    specialty: "Manicura Clásica",
    description: "Cuidado tradicional de uñas con atención al detalle y productos premium.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    active: true,
  },
];

const WHATSAPP_NUMBER = "5491112345678";
const DEFAULT_MESSAGE = "Buenas, estoy interesado en sacar una cita con";

const Appointments = () => {
  const handleWhatsApp = (workerName: string) => {
    const message = encodeURIComponent(`${DEFAULT_MESSAGE} ${workerName}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3 animate-fade-up">
            Nuestro equipo
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground animate-fade-up animate-delay-100">
            Pedir Cita
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto animate-fade-up animate-delay-200">
            Elige a tu manicurista favorita y coordina tu cita por WhatsApp.
          </p>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {mockWorkers.filter(w => w.active).map((worker, index) => (
            <div
              key={worker.id}
              className={`glass-card p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-up animate-delay-${Math.min((index + 1) * 100, 500)}`}
            >
              <img
                src={worker.avatar}
                alt={worker.name}
                loading="lazy"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20"
                width={300}
                height={300}
              />
              <h3 className="font-display text-lg font-semibold text-foreground">{worker.name}</h3>
              <p className="text-primary text-sm font-medium mt-1">{worker.specialty}</p>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                {worker.description}
              </p>
              <Button
                onClick={() => handleWhatsApp(worker.name)}
                className="mt-6 rounded-full px-6 w-full"
                size="lg"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Pedir Cita
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
