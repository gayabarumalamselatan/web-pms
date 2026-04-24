import { MetadataRoute } from "next";
import { galleryEvents } from "@/lib/gallery-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://persatuanmahasiswasakit.my.id";

  // Base routes
  const routes = ["", "/daftar-anggota"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Gallery routes
  const galleryRoutes = galleryEvents.map((event) => ({
    url: `${baseUrl}/gallery/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...galleryRoutes];
}
