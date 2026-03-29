import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([
    { id: 1, title: "Diseño Floral", description: "Flores en pastel", image: "/placeholder.svg" },
    { id: 2, title: "French Elegante", description: "Clásico francés", image: "/placeholder.svg" },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  const handleAdd = () => {
    if (!form.title.trim()) return;
    setItems([...items, { id: Date.now(), ...form }]);
    setDialogOpen(false);
    setForm({ title: "", description: "", image: "" });
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{items.length} imagen(es)</p>
        <Button onClick={() => { setForm({ title: "", description: "", image: "" }); setDialogOpen(true); }} className="rounded-full">
          <Plus className="h-4 w-4 mr-2" /> Agregar Imagen
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="glass-card overflow-hidden group relative">
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full aspect-square object-cover" />
            <div className="p-3">
              <h4 className="text-sm font-medium truncate">{item.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Agregar Imagen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>URL de imagen</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
            <Button onClick={handleAdd} className="w-full rounded-full">Agregar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
