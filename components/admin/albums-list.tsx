"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Trash2,
  ImageIcon,
  Camera,
  Pencil,
} from "lucide-react";
import { deleteAlbum } from "@/app/actions/gallery";
import { toast } from "sonner";
import Link from "next/link";
import { EditAlbumDialog } from "./edit-album-dialog";

export function AlbumsList({ albums }: { albums: any[] }) {
  const [editingAlbum, setEditingAlbum] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this album?")) {
      const res = await deleteAlbum(id);
      if (res.success) toast.success("Album deleted");
      else toast.error(res.error);
    }
  };

  return (
    <div className="rounded-md border bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-800/50">
            <TableHead>Album Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Photos</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((album) => (
            <TableRow
              key={album.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${album.color}`}
                  >
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  {album.title}
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs">{album.slug}</TableCell>
              <TableCell>{album.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Camera className="w-3 h-3 text-slate-400" />
                  <span>{album.photos?.length || 0}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/gallery/${album.slug}`}>
                        Manage Photos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEditingAlbum(album)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Album
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(album.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Album
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingAlbum && (
        <EditAlbumDialog
          album={editingAlbum}
          open={!!editingAlbum}
          onOpenChange={(open) => !open && setEditingAlbum(null)}
        />
      )}
    </div>
  );
}
