"use server";

import { cloudinary } from "@/lib/cloudinary";
import sharp from "sharp";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  const folder = (formData.get("path") as string) || "pms";

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);

    // Compress image if it's an image
    if (file.type.startsWith("image/")) {
      const rotation = parseInt(formData.get("rotation") as string) || 0;

      let image = sharp(buffer).rotate(); // .rotate() with no args handles EXIF orientation automatically

      if (rotation !== 0) {
        image = image.rotate(rotation);
      }

      buffer = await image
        .resize(1280, 1280, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 75, progressive: true })
        .toBuffer();
    }

    // Convert buffer to base64 for Cloudinary
    const base64Data = buffer.toString("base64");
    const fileUri = `data:${file.type};base64,${base64Data}`;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: folder,
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return {
      success: false,
      error: error.message || "Failed to upload to Cloudinary",
    };
  }
}

export async function deleteImage(publicId: string) {
  if (!publicId) return { success: false, error: "No public ID provided" };

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === "ok") {
      return { success: true };
    } else {
      throw new Error(result.result);
    }
  } catch (error: any) {
    console.error("Cloudinary Delete Error:", error);
    return {
      success: false,
      error: error.message || "Failed to delete from Cloudinary",
    };
  }
}
