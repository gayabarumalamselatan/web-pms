import { getSocials } from "@/app/actions/socials";
import { SocialsTable } from "@/components/admin/socials-table";
import { CreateSocialDialog } from "@/components/admin/create-social-dialog";

export default async function SocialsAdminPage() {
  const socials = await getSocials();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Media</h1>
          <p className="text-muted-foreground">
            Manage links to social media platforms and contact points.
          </p>
        </div>
        <CreateSocialDialog />
      </div>

      <SocialsTable socials={socials} />
    </div>
  );
}
