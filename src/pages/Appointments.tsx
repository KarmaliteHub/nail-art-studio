import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkers } from "@/hooks/useWorkers";
import { useSettings } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";

const Appointments = () => {
  const { data: workers, isLoading: loadingWorkers } = useWorkers();
  const { data: settings, isLoading: loadingSettings } = useSettings();

  const handleWhatsApp = (workerName: string) => {
    const number = settings?.whatsapp_number || "5491112345678";
    const baseMessage = settings?.whatsapp_message || "Buenas, estoy interesado en sacar una cita con";
    const message = encodeURIComponent(`${baseMessage} ${workerName}`);
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  const activeWorkers = workers?.filter((w) => w.active) ?? [];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
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

        {(loadingWorkers || loadingSettings) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-72 w-full rounded-2xl" />
            ))}
          </div>
        ) : activeWorkers.length === 0 ? (
          <p className="text-center text-muted-foreground">No hay manicuristas disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {activeWorkers.map((worker, index) => (
              <div
                key={worker.id}
                className={`glass-card p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-up`}
                style={{ animationDelay: `${Math.min((index + 1) * 100, 500)}ms` }}
              >
                {worker.avatar_url ? (
                  <img
                    src={worker.avatar_url}
                    alt={worker.name}
                    loading="lazy"
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                    <span className="text-2xl font-bold text-primary">{worker.name.charAt(0)}</span>
                  </div>
                )}
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
        )}
      </div>
    </div>
  );
};

export default Appointments;
