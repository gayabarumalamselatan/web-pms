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
import { Share2 } from "lucide-react";
import { updateSocial } from "@/app/actions/socials";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = [
  { label: "Pink (IG)", value: "bg-pink-400" },
  { label: "Green (WA)", value: "bg-green-400" },
  { label: "Blue (FB)", value: "bg-blue-400" },
  { label: "Sky (Twitter)", value: "bg-sky-400" },
  { label: "Red (YouTube)", value: "bg-red-400" },
];

export function EditSocialDialog({ social, open, onOpenChange }: {
  social: any,
  open: boolean,
  onOpenChange: (open: boolean) => void
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    
    try {
      const res = await updateSocial(social.id, {
        name: formData.get("name") as string,
        handle: formData.get("handle") as string,
        link: formData.get("link") as string,
        color: formData.get("color") as string,
        iconType: formData.get("iconType") as string || "link",
      });

      if (res.success) {
        toast.success("Social link updated");
        onOpenChange(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Failed to update social link");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
            <Share2 className="w-5 h-5" />
          </div>
          <DialogTitle>Edit Social Link</DialogTitle>
          <DialogDescription>
            Update the social media platform or contact link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Platform Name</Label>
            <Input id="name" name="name" defaultValue={social.name} placeholder="Instagram" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="handle">Handle / Display Text</Label>
            <Input id="handle" name="handle" defaultValue={social.handle} placeholder="@username or Contact Us" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">URL Link</Label>
            <Input id="link" name="link" defaultValue={social.link} placeholder="https://..." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Theme Color</Label>
            <Select name="color" defaultValue={social.color}>
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
            <Label htmlFor="iconType">Icon Type (instagram, whatsapp, etc.)</Label>
            <Input id="iconType" name="iconType" defaultValue={social.iconType} placeholder="instagram" />
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
