import { api } from "@/api/jiosaavn";
import { useParams } from "react-router-dom";
import useSwr from "swr";

import { MatchParams } from "@/types/params";
import { base64ToStr, getArtistIds } from "@/lib/utils";
import ArtistsSidebar from "@/components/artists-sidebar";
import Loading from "@/components/loading";
import PlaylistHeader from "@/components/playlist-header";
import SongTile from "@/components/song-tile";
import Center from "@/components/ui/center";
import Dialog from "@/components/ui/dialog";

const getAlbumDetail = async (id?: string) => {
  if (!id) throw new Error("No album id provided");

  const data = await api.getAlbumDetails(base64ToStr(id));

  return data;
};

const Album = () => {
  const { id } = useParams<MatchParams>();

  const { data: album, error } = useSwr("/album", () => getAlbumDetail(id));

  if (error) {
    return (
      <Dialog heading="Something went wrong!" type="error">
        {error.message}
      </Dialog>
    );
  }

  return album ? (
    <>
      <PlaylistHeader item={album} />

      <div className="flex flex-col-reverse gap-2 py-6 xl:flex-row">
        {/* artists */}
        <ArtistsSidebar artists={getArtistIds(album)} />

        {/* songs */}
        <div className="flex w-full flex-col gap-2">
          {album.songs.map((song, i) => (
            <SongTile key={i} item={song} />
          ))}
        </div>
      </div>
    </>
  ) : (
    <Center absolutely>
      <Loading iconSize={50} />
    </Center>
  );
};

export default Album;
