"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Share2, ExternalLink, Pencil } from "lucide-react";
import { deleteSocial } from "@/app/actions/socials";
import { toast } from "sonner";
import { useState } from "react";
import { EditSocialDialog } from "./edit-social-dialog";

export function SocialsTable({ socials }: { socials: any[] }) {
  const [editingSocial, setEditingSocial] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this social link?")) {
      const res = await deleteSocial(id);
      if (res.success) toast.success("Social link deleted");
      else toast.error(res.error);
    }
  };

  return (
    <div className="rounded-md border bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-800/50">
            <TableHead>Platform</TableHead>
            <TableHead>Handle</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {socials.map((social) => (
            <TableRow key={social.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${social.color}`}>
                    <Share2 className="w-5 h-5" />
                  </div>
                  {social.name}
                </div>
              </TableCell>
              <TableCell>{social.handle}</TableCell>
              <TableCell>
                <a 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  Visit <ExternalLink className="w-3 h-3" />
                </a>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => setEditingSocial(social)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Link
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(social.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingSocial && (
        <EditSocialDialog
          social={editingSocial}
          open={!!editingSocial}
          onOpenChange={(open) => !open && setEditingSocial(null)}
        />
      )}
    </div>
  );
}
