"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { deleteImage } from "./upload";

export async function createActivity(data: {
  title: string;
  description: string;
  imagePath: string;
  publicId?: string;
  color: string;
}) {
  try {
    const activity = await db.activity.create({
      data,
    });
    revalidatePath("/");
    revalidatePath("/admin/activities");
    return { success: true, data: activity };
  } catch (error) {
    return { success: false, error: "Failed to create activity" };
  }
}

export async function updateActivity(id: string, data: {
  title?: string;
  description?: string;
  imagePath?: string;
  publicId?: string;
  color?: string;
}) {
  try {
    const activity = await db.activity.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    revalidatePath("/admin/activities");
    return { success: true, data: activity };
  } catch (error) {
    return { success: false, error: "Failed to update activity" };
  }
}

export async function deleteActivity(id: string) {
  try {
    const activity = await db.activity.findUnique({
      where: { id },
      select: { publicId: true }
    });

    if (activity?.publicId) {
      await deleteImage(activity.publicId);
    }

    await db.activity.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/activities");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete activity" };
  }
}

export async function getActivities() {
  return await db.activity.findMany({
    orderBy: { createdAt: "desc" },
  });
}
