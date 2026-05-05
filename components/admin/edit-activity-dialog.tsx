"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadImage } from "@/app/actions/upload";
import { updateActivity } from "@/app/actions/activity";
import { toast } from "sonner";
import { RotateCw, Loader2, Activity } from "lucide-react";

const COLORS = [
  { label: "Sky", value: "bg-sky-400" },
  { label: "Pink", value: "bg-pink-400" },
  { label: "Yellow", value: "bg-yellow-400" },
  { label: "Orange", value: "bg-orange-400" },
  { label: "Blue", value: "bg-blue-400" },
  { label: "Secondary", value: "bg-secondary" },
];

export function EditActivityDialog({ activity, open, onOpenChange }: {
  activity: any,
  open: boolean,
  onOpenChange: (open: boolean) => void
}) {
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePath, setImagePath] = useState(activity.imagePath || "");
  const [publicId, setPublicId] = useState(activity.publicId || "");
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
    formData.append("path", "activities");
    formData.append("rotation", rotation.toString());

    try {
      const res = await uploadImage(formData);

      if (res.success && res.url) {
        setImagePath(res.url);
        setPublicId(res.public_id || "");
        toast.success("Image uploaded");
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
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    
    try {
      const res = await updateActivity(activity.id, {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        imagePath: imagePath,
        publicId: publicId,
        color: formData.get("color") as string,
      });

      if (res.success) {
        toast.success("Activity updated");
        onOpenChange(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Failed to update activity");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
            <Activity className="w-5 h-5" />
          </div>
          <DialogTitle>Edit Activity</DialogTitle>
          <DialogDescription>
            Update activity details and its cover image.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={activity.title} placeholder="Workshop & Seminar" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={activity.description} placeholder="Brief description of the activity..." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Theme Color</Label>
            <Select name="color" defaultValue={activity.color}>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${color.value}`} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Activity Image</Label>
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group">
                {(localPreview || imagePath) ? (
                  <img
                    src={localPreview || imagePath}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-200"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-lg">
                    No image
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
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
          <DialogFooter>
            <Button type="submit" disabled={isPending || isUploading}>
              {isPending ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
