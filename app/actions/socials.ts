"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getSocials() {
  return await db.socialMedia.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createSocial(data: {
  name: string;
  handle: string;
  link: string;
  color: string;
  iconType: string;
}) {
  try {
    const social = await db.socialMedia.create({ data });
    revalidatePath("/admin/socials");
    revalidatePath("/");
    return { success: true, data: social };
  } catch (error) {
    return { success: false, error: "Failed to create social media link" };
  }
}

export async function updateSocial(id: string, data: {
  name?: string;
  handle?: string;
  link?: string;
  color?: string;
  iconType?: string;
}) {
  try {
    const social = await db.socialMedia.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/socials");
    revalidatePath("/");
    return { success: true, data: social };
  } catch (error) {
    return { success: false, error: "Failed to update social media link" };
  }
}

export async function deleteSocial(id: string) {
  try {
    await db.socialMedia.delete({ where: { id } });
    revalidatePath("/admin/socials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete social media link" };
  }
}
