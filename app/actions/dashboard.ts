"use server";

import { db } from "@/lib/db";

export async function getDashboardStats() {
  const [members, activities, photos, socials] = await Promise.all([
    db.member.count(),
    db.activity.count(),
    db.photo.count(),
    db.socialMedia.count(),
  ]);

  return {
    members,
    activities,
    photos,
    socials,
  };
}

export async function getRecentActivities() {
  const [recentMembers, recentActivities, recentPhotos] = await Promise.all([
    db.member.findMany({ take: 2, orderBy: { createdAt: "desc" } }),
    db.activity.findMany({ take: 2, orderBy: { createdAt: "desc" } }),
    db.photo.findMany({ take: 2, orderBy: { createdAt: "desc" }, include: { album: true } }),
  ]);

  const activitiesList = [
    ...recentMembers.map((m) => ({
      text: `New member added: ${m.name}`,
      time: m.createdAt,
    })),
    ...recentActivities.map((a) => ({
      text: `New activity created: ${a.title}`,
      time: a.createdAt,
    })),
    ...recentPhotos.map((p) => ({
      text: `New photo added to "${p.album.title}"`,
      time: p.createdAt,
    })),
  ];

  return activitiesList.sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 5);
}
