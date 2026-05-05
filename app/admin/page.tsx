import {
  Users,
  Activity,
  Image as ImageIcon,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats, getRecentActivities } from "@/app/actions/dashboard";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function AdminPage() {
  const statsData = await getDashboardStats();
  const recentActivities = await getRecentActivities();

  const stats = [
    { label: "Members", value: statsData.members, icon: Users, color: "text-blue-600" },
    { label: "Activities", value: statsData.activities, icon: Activity, color: "text-orange-600" },
    {
      label: "Gallery Photos",
      value: statsData.photos,
      icon: ImageIcon,
      color: "text-purple-600",
    },
    { label: "Social Links", value: statsData.socials, icon: Share2, color: "text-green-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome to the PMS Management System.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                Total in database
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? recentActivities.map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.text}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No recent activity found.</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/admin/greeting" className="w-full text-left px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">
              Update Chairman's Greeting
            </Link>
            <Link href="/admin/members" className="w-full text-left px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">
              Add New Member
            </Link>
            <Link href="/admin/gallery" className="w-full text-left px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">
              Create Gallery Album
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
