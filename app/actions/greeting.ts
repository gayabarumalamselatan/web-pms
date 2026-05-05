"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getGreeting() {
  return await db.greeting.findUnique({
    where: { id: "sambutan" },
  });
}

export async function updateGreeting(text: string) {
  try {
    const greeting = await db.greeting.upsert({
      where: { id: "sambutan" },
      update: { text },
      create: { id: "sambutan", text },
    });
    revalidatePath("/admin/greeting");
    revalidatePath("/");
    return { success: true, data: greeting };
  } catch (error) {
    return { success: false, error: "Failed to update greeting" };
  }
}
