import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGallery, useCreateGalleryImage, useDeleteGalleryImage } from "@/hooks/useGallery";
import ImageUpload from "./ImageUpload";
import { Skeleton } from "@/components/ui/skeleton";

const AdminGallery = () => {
  const { data: items = [], isLoading } = useGallery();
  const createImage = useCreateGalleryImage();
  const deleteImage = useDeleteGalleryImage();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image_url: "" });

  const handleAdd = async () => {
    if (!form.image_url) return;
    await createImage.mutateAsync(form);
    setDialogOpen(false);
    setForm({ title: "", description: "", image_url: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteImage.mutateAsync(id);
  };

  if (isLoading) {
    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-square w-full" />)}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{items.length} imagen(es)</p>
        <Button onClick={() => { setForm({ title: "", description: "", image_url: "" }); setDialogOpen(true); }} className="rounded-full">
          <Plus className="h-4 w-4 mr-2" /> Agregar Imagen
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="glass-card overflow-hidden group relative">
            <img src={item.image_url || "/placeholder.svg"} alt={item.title} className="w-full aspect-square object-cover" />
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
            <ImageUpload
              label="Imagen"
              onUploaded={(url) => setForm({ ...form, image_url: url })}
            />
            {form.image_url && (
              <img src={form.image_url} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-border" />
            )}
            <Button onClick={handleAdd} className="w-full rounded-full" disabled={!form.image_url || createImage.isPending}>
              Agregar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
