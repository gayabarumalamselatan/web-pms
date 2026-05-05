import { db } from "@/lib/db";

export async function getLandingPageData() {
  const [greeting, activities, gallery, members, socials] = await Promise.all([
    db.greeting.findUnique({ where: { id: "sambutan" } }),
    db.activity.findMany({ orderBy: { createdAt: "desc" } }),
    db.galleryAlbum.findMany({
      include: { photos: { take: 1 } },
      orderBy: { createdAt: "desc" },
    }),
    db.member.findMany({
      where: { status: "Active" },
      orderBy: { name: "asc" },
    }),
    db.socialMedia.findMany(),
  ]);

  return {
    greeting,
    activities,
    gallery,
    members,
    socials,
  };
}
