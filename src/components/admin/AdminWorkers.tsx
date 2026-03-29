import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkers, useCreateWorker, useUpdateWorker, useDeleteWorker, type Worker } from "@/hooks/useWorkers";
import ImageUpload from "./ImageUpload";
import { Skeleton } from "@/components/ui/skeleton";

const AdminWorkers = () => {
  const { data: workers = [], isLoading } = useWorkers();
  const createWorker = useCreateWorker();
  const updateWorker = useUpdateWorker();
  const deleteWorker = useDeleteWorker();

  const [editing, setEditing] = useState<Worker | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", specialty: "", description: "", avatar_url: "", phone: "", active: true });

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", specialty: "", description: "", avatar_url: "", phone: "", active: true });
    setDialogOpen(true);
  };

  const openEdit = (w: Worker) => {
    setEditing(w);
    setForm({ name: w.name, specialty: w.specialty, description: w.description, avatar_url: w.avatar_url, phone: w.phone, active: w.active });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    if (editing) {
      await updateWorker.mutateAsync({ id: editing.id, ...form });
    } else {
      await createWorker.mutateAsync(form);
    }
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteWorker.mutateAsync(id);
  };

  if (isLoading) {
    return <div className="space-y-4">{[1, 2].map(i => <Skeleton key={i} className="h-20 w-full" />)}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{workers.length} manicurista(s) registrada(s)</p>
        <Button onClick={openNew} className="rounded-full">
          <Plus className="h-4 w-4 mr-2" /> Agregar
        </Button>
      </div>

      <div className="grid gap-4">
        {workers.map((w) => (
          <div key={w.id} className="glass-card p-4 flex items-center gap-4">
            <img src={w.avatar_url || "/placeholder.svg"} alt={w.name} className="w-12 h-12 rounded-full object-cover border border-border" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{w.name}</h4>
              <p className="text-xs text-muted-foreground">{w.specialty}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${w.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {w.active ? "Activa" : "Inactiva"}
            </span>
            <Button variant="ghost" size="icon" onClick={() => openEdit(w)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(w.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{editing ? "Editar" : "Nueva"} Manicurista</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Especialidad</Label>
              <Input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <ImageUpload
              label="Foto"
              onUploaded={(url) => setForm({ ...form, avatar_url: url })}
            />
            {form.avatar_url && (
              <img src={form.avatar_url} alt="Preview" className="w-16 h-16 rounded-full object-cover border border-border" />
            )}
            <div className="space-y-2">
              <Label>Teléfono (opcional)</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
              <Label>Activa</Label>
            </div>
            <Button onClick={handleSave} className="w-full rounded-full" disabled={createWorker.isPending || updateWorker.isPending}>
              {editing ? "Guardar Cambios" : "Agregar Manicurista"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWorkers;
