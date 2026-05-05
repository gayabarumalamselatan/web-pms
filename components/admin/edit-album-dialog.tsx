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
import { ImageIcon } from "lucide-react";
import { updateAlbum } from "@/app/actions/gallery";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = [
  { label: "Purple", value: "bg-purple-400" },
  { label: "Indigo", value: "bg-indigo-400" },
  { label: "Sky", value: "bg-sky-400" },
  { label: "Yellow", value: "bg-yellow-400" },
  { label: "Secondary", value: "bg-secondary" },
];

export function EditAlbumDialog({ album, open, onOpenChange }: {
  album: any,
  open: boolean,
  onOpenChange: (open: boolean) => void
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    
    try {
      const res = await updateAlbum(album.id, {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        date: formData.get("date") as string,
        description: formData.get("description") as string,
        color: formData.get("color") as string,
      });

      if (res.success) {
        toast.success("Album updated");
        onOpenChange(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Failed to update album");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
            <ImageIcon className="w-5 h-5" />
          </div>
          <DialogTitle>Edit Album</DialogTitle>
          <DialogDescription>
            Update album information and appearance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Album Title</Label>
            <Input id="title" name="title" defaultValue={album.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL identifier)</Label>
            <Input id="slug" name="slug" defaultValue={album.slug} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Event Date (e.g., Oct 2024)</Label>
            <Input id="date" name="date" defaultValue={album.date} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={album.description} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Theme Color</Label>
            <Select name="color" defaultValue={album.color}>
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
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
