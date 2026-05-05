import { getUsers } from "@/app/actions/users";
import { UserList } from "@/components/admin/user-list";
import { CreateUserDialog } from "@/components/admin/create-user-dialog";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage admin accounts and permissions.
          </p>
        </div>
        <CreateUserDialog />
      </div>

      <UserList users={users} />
    </div>
  );
}
