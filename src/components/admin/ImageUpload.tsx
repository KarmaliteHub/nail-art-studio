import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { uploadImage, uploadImageFromUrl } from "@/lib/storage";
import { toast } from "sonner";

interface ImageUploadProps {
  onUploaded: (url: string) => void;
  label?: string;
}

const ImageUpload = ({ onUploaded, label = "Imagen" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onUploaded(url);
      toast.success("Imagen subida");
    } catch {
      toast.error("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleUrl = async () => {
    if (!urlInput.trim()) return;
    setUploading(true);
    try {
      const url = await uploadImageFromUrl(urlInput);
      onUploaded(url);
      setUrlInput("");
      toast.success("Imagen subida desde URL");
    } catch {
      toast.error("Error al descargar imagen desde URL");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Tabs defaultValue="file" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="file" className="text-xs">
            <Upload className="h-3 w-3 mr-1" /> Archivo
          </TabsTrigger>
          <TabsTrigger value="url" className="text-xs">
            <LinkIcon className="h-3 w-3 mr-1" /> URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="file" className="mt-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
            Seleccionar archivo
          </Button>
        </TabsContent>
        <TabsContent value="url" className="mt-2">
          <div className="flex gap-2">
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://..."
              disabled={uploading}
            />
            <Button
              type="button"
              onClick={handleUrl}
              disabled={uploading || !urlInput.trim()}
              size="icon"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LinkIcon className="h-4 w-4" />}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageUpload;
