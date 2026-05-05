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
import { MoreHorizontal, Trash2, UserCircle, Pencil } from "lucide-react";
import { deleteMember } from "@/app/actions/members";
import { toast } from "sonner";
import { EditMemberDialog } from "./edit-member-dialog";

export function MembersTable({ members }: { members: any[] }) {
  const [editingMember, setEditingMember] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      const res = await deleteMember(id);
      if (res.success) toast.success("Member deleted");
      else toast.error(res.error);
    }
  };

  return (
    <div className="rounded-md border bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-800/50">
            <TableHead>Name</TableHead>
            <TableHead>Julukan</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow
              key={member.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                    {member.imagePath ? (
                      <img
                        src={member.imagePath}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle className="w-5 h-5" />
                    )}
                  </div>
                  {member.name}
                </div>
              </TableCell>
              <TableCell className="italic text-slate-500">
                {member.julukan ? `"${member.julukan}"` : "-"}
              </TableCell>
              <TableCell>{member.position}</TableCell>
              <TableCell>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${
                    member.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {member.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditingMember(member)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Member
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingMember && (
        <EditMemberDialog
          member={editingMember}
          open={!!editingMember}
          onOpenChange={(open) => !open && setEditingMember(null)}
        />
      )}
    </div>
  );
}
