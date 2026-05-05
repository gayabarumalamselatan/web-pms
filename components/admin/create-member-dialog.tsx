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
import { Plus, UserPlus, Loader2, RotateCw } from "lucide-react";
import { createMember } from "@/app/actions/members";
import { uploadImage } from "@/app/actions/upload";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateMemberDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePath, setImagePath] = useState("");
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
    formData.append("path", "members");
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
      const res = await createMember({
        name: formData.get("name") as string,
        julukan: formData.get("julukan") as string,
        position: formData.get("position") as string,
        imagePath: imagePath,
        publicId: publicId,
        status: formData.get("status") as string,
      });

      if (res.success) {
        toast.success("Member created");
        setOpen(false);
        setImagePath("");
        setPublicId("");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Failed to create member");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
            <UserPlus className="w-5 h-5" />
          </div>
          <DialogTitle>Create Member</DialogTitle>
          <DialogDescription>
            Add a new member to the team list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="julukan">Julukan (Nickname)</Label>
            <Input id="julukan" name="julukan" placeholder="The Legend" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              placeholder="Ketua Umum"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Profile Photo</Label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-black group">
                  {(localPreview || imagePath) ? (
                    <img
                      src={localPreview || imagePath}
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform duration-200"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      No image
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
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
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue="Active">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending || isUploading}>
              {isPending ? "Creating..." : "Create Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
