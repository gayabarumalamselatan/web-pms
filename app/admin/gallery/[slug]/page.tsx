import { getAlbumBySlug } from "@/app/actions/gallery";
import { PhotosList } from "@/components/admin/photos-list";
import { AddPhotoDialog } from "@/components/admin/add-photo-dialog";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ManagePhotosPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = (await params).slug;
  const album = await getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/gallery"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manage Photos: {album.title}
            </h1>
            <p className="text-muted-foreground">
              Add or remove photos from this album.
            </p>
          </div>
        </div>
        <AddPhotoDialog albumId={album.id} />
      </div>

      <PhotosList photos={album.photos} albumId={album.id} />
    </div>
  );
}
