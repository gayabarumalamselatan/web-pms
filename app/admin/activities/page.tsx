import { getActivities } from "@/app/actions/activity";
import { ActivitiesTable } from "@/components/admin/activities-table";
import { CreateActivityDialog } from "@/components/admin/create-activity-dialog";

export default async function ActivitiesAdminPage() {
  const activities = await getActivities();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
          <p className="text-muted-foreground">
            Manage the "What We Do" section on the landing page.
          </p>
        </div>
        <CreateActivityDialog />
      </div>

      <ActivitiesTable activities={activities} />
    </div>
  );
}
