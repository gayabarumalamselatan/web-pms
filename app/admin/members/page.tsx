import { getMembers } from "@/app/actions/members";
import { MembersTable } from "@/components/admin/members-table";
import { CreateMemberDialog } from "@/components/admin/create-member-dialog";

export default async function MembersAdminPage() {
  const members = await getMembers();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">
            Manage the list of active and inactive members.
          </p>
        </div>
        <CreateMemberDialog />
      </div>

      <MembersTable members={members} />
    </div>
  );
}
