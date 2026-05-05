"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { deleteImage } from "./upload";

// Album Actions
export async function createAlbum(data: {
  title: string;
  slug: string;
  date: string;
  description: string;
  color: string;
  span?: string;
}) {
  try {
    const album = await db.galleryAlbum.create({
      data,
    });
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true, data: album };
  } catch (error) {
    return { success: false, error: "Failed to create album" };
  }
}

export async function updateAlbum(
  id: string,
  data: {
    title?: string;
    slug?: string;
    date?: string;
    description?: string;
    color?: string;
    span?: string;
  },
) {
  try {
    const album = await db.galleryAlbum.update({
      where: { id },
      data,
    });
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true, data: album };
  } catch (error) {
    return { success: false, error: "Failed to update album" };
  }
}

export async function deleteAlbum(id: string) {
  try {
    await db.galleryAlbum.delete({
      where: { id },
    });
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete album" };
  }
}

// Photo Actions
export async function addPhoto(data: {
  url: string;
  publicId: string;
  alt: string;
  color: string;
  albumId: string;
}) {
  try {
    const photo = await db.photo.create({
      data,
    });
    revalidatePath(`/gallery/${data.albumId}`);
    revalidatePath(`/admin/gallery/${data.albumId}`);
    return { success: true, data: photo };
  } catch (error) {
    return { success: false, error: "Failed to add photo" };
  }
}

export async function deletePhoto(id: string, albumId: string) {
  try {
    const photo = await db.photo.findUnique({
      where: { id },
      select: { publicId: true }
    });

    if (photo?.publicId) {
      await deleteImage(photo.publicId);
    }

    await db.photo.delete({
      where: { id },
    });
    revalidatePath(`/gallery/${albumId}`);
    revalidatePath(`/admin/gallery/${albumId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete photo" };
  }
}

export async function getAlbums() {
  return await db.galleryAlbum.findMany({
    include: { photos: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAlbumBySlug(slug: string) {
  return await db.galleryAlbum.findUnique({
    where: { slug },
    include: { photos: true },
  });
}
