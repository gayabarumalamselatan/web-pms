"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Camera, Loader2, RotateCw } from "lucide-react";
import { addPhoto } from "@/app/actions/gallery";
import { uploadImage } from "@/app/actions/upload";
import { toast } from "sonner";

export function AddPhotoDialog({ albumId }: { albumId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState("");
  const [rotation, setRotation] = useState(0);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalFile(file);
    setLocalPreview(URL.createObjectURL(file));
    setRotation(0);
  }

  async function startUpload() {
    if (!localFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", localFile);
    formData.append("path", "gallery");
    formData.append("rotation", rotation.toString());

    try {
      const res = await uploadImage(formData);

      if (res.success && res.url) {
        setImageUrl(res.url);
        setPublicId(res.public_id || "");
        toast.success("Image uploaded to storage");
        setLocalFile(null);
        setLocalPreview("");
      } else {
        throw new Error(res.error);
      }
    } catch (error: any) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  }

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!imageUrl) return toast.error("Please upload an image first");

    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    try {
      const res = await addPhoto({
        url: imageUrl,
        publicId: publicId,
        alt: formData.get("alt") as string,
        color: "bg-slate-200", // Default color for photo accent
        albumId: albumId,
      });

      if (res.success) {
        toast.success("Photo added to album");
        setOpen(false);
        setImageUrl("");
        setPublicId("");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Failed to add photo");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
            <Camera className="w-5 h-5" />
          </div>
          <DialogTitle>Add Photo</DialogTitle>
          <DialogDescription>
            Upload a new photo to this album.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Image</Label>
            <div className="flex flex-col gap-4">
              <div className="relative">
                {(localPreview || imageUrl) ? (
                  <div className="relative overflow-hidden rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] aspect-video">
                    <img
                      src={localPreview || imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform duration-200"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    No image selected
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                  className="cursor-pointer"
                />
                <div className="flex gap-2">
                  {localPreview && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={rotate}
                        className="gap-2"
                      >
                        <RotateCw className="w-3 h-3" />
                        Rotate
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={startUpload}
                        disabled={isUploading}
                      >
                        Upload Image
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="alt">Alt Text (Description)</Label>
            <Input
              id="alt"
              name="alt"
              placeholder="Momen seru saat makrab..."
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending || isUploading || !imageUrl}
            >
              {isPending ? "Adding..." : "Add to Album"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
