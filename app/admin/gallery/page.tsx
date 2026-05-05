import { getAlbums } from "@/app/actions/gallery";
import { AlbumsList } from "@/components/admin/albums-list";
import { CreateAlbumDialog } from "@/components/admin/create-album-dialog";

export default async function GalleryAdminPage() {
  const albums = await getAlbums();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gallery Albums</h1>
          <p className="text-muted-foreground">
            Manage photo albums and gallery content.
          </p>
        </div>
        <CreateAlbumDialog />
      </div>

      <AlbumsList albums={albums} />
    </div>
  );
}
