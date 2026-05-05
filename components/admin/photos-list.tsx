"use client";

import { Trash2, ExternalLink } from "lucide-react";
import { deletePhoto } from "@/app/actions/gallery";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function PhotosList({ photos, albumId }: { photos: any[], albumId: string }) {
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      const res = await deletePhoto(id, albumId);
      if (res.success) toast.success("Photo deleted");
      else toast.error(res.error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative aspect-square border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <img 
            src={photo.url} 
            alt={photo.alt} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button 
              size="icon" 
              variant="destructive" 
              onClick={() => handleDelete(photo.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <a 
              href={photo.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-white text-black hover:bg-slate-100 rounded-md transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
      {photos.length === 0 && (
        <div className="col-span-full py-20 text-center border-4 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-400">No photos in this album yet.</p>
        </div>
      )}
    </div>
  );
}
