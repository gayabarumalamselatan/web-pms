"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { deleteImage } from "./upload";

export async function getMembers() {
  return await db.member.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createMember(data: {
  name: string;
  julukan?: string;
  position: string;
  imagePath?: string;
  publicId?: string;
  status: string;
}) {
  try {
    const member = await db.member.create({ data });
    revalidatePath("/admin/members");
    revalidatePath("/");
    return { success: true, data: member };
  } catch (error) {
    return { success: false, error: "Failed to create member" };
  }
}

export async function updateMember(
  id: string,
  data: {
    name?: string;
    julukan?: string;
    position?: string;
    imagePath?: string;
    publicId?: string;
    status?: string;
  },
) {
  try {
    const member = await db.member.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/members");
    revalidatePath("/");
    return { success: true, data: member };
  } catch (error) {
    return { success: false, error: "Failed to update member" };
  }
}

export async function deleteMember(id: string) {
  try {
    const member = await db.member.findUnique({
      where: { id },
      select: { publicId: true }
    });

    if (member?.publicId) {
      await deleteImage(member.publicId);
    }

    await db.member.delete({ where: { id } });
    revalidatePath("/admin/members");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete member" };
  }
}
