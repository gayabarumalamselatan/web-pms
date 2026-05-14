import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // Optional: Verify the request is coming from Vercel Cron
    const authHeader = request.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Perform a lightweight database query to keep the Supabase database active
    await db.greeting.findFirst();

    return NextResponse.json({
      success: true,
      message: "Supabase database pinged successfully to prevent pausing.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { error: "Failed to ping database" },
      { status: 500 },
    );
  }
}
