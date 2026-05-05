import { getGreeting } from "@/app/actions/greeting";
import { GreetingForm } from "@/components/admin/greeting-form";

export default async function GreetingAdminPage() {
  const greeting = await getGreeting();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Chairman's Greeting
        </h1>
        <p className="text-muted-foreground">
          Update the welcome message from the chairman displayed on the landing
          page.
        </p>
      </div>

      <GreetingForm initialValue={greeting?.text || ""} />
    </div>
  );
}
