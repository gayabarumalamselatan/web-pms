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
import { MoreHorizontal, Trash2, Activity, Pencil } from "lucide-react";
import { deleteActivity } from "@/app/actions/activity";
import { toast } from "sonner";
import { useState } from "react";
import { EditActivityDialog } from "./edit-activity-dialog";

export function ActivitiesTable({ activities }: { activities: any[] }) {
  const [editingActivity, setEditingActivity] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      const res = await deleteActivity(id);
      if (res.success) toast.success("Activity deleted");
      else toast.error(res.error);
    }
  };

  return (
    <div className="rounded-md border bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-800/50">
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Color</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${activity.color}`}>
                    <Activity className="w-5 h-5" />
                  </div>
                  {activity.title}
                </div>
              </TableCell>
              <TableCell className="max-w-xs truncate">{activity.description}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${activity.color} border border-black/10`} />
                  <span className="text-xs font-mono">{activity.color}</span>
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
                    <DropdownMenuItem 
                      onClick={() => setEditingActivity(activity)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Activity
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(activity.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Activity
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingActivity && (
        <EditActivityDialog
          activity={editingActivity}
          open={!!editingActivity}
          onOpenChange={(open) => !open && setEditingActivity(null)}
        />
      )}
    </div>
  );
}
