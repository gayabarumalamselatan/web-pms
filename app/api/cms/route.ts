import { NextResponse } from "next/server";
import { getLandingPageData } from "@/lib/services/cms";

export async function GET() {
  try {
    const data = await getLandingPageData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
