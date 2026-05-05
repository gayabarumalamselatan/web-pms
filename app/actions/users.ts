"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    return { error: "Invalid credentials" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { error: "Invalid credentials" };
  }

  // Create session
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId: user.id, username: user.username, name: user.name, expires });

  const cookieStore = await cookies();
  cookieStore.set("session", session, { expires, httpOnly: true, secure: process.env.NODE_ENV === "production" });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
  redirect("/admin/login");
}

export async function getUsers() {
  return await db.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createUser(formData: FormData) {
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string || "ADMIN";

  if (!username || !password || !name) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      username,
      name,
      password: hashedPassword,
      role,
    },
  });

  revalidatePath("/admin/users");
}

export async function updateUser(id: string, formData: FormData) {
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;

  const data: any = {
    username,
    name,
    role,
  };

  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  await db.user.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  // Prevent deleting the last admin if necessary, but keep it simple for now
  await db.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}
