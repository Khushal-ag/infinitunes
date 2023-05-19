import { useEffect } from "react";
import useSwr from "swr";

import { getHomeData } from "@/lib/utils";
import Card from "@/components/card";
import Loading from "@/components/loading";
import Center from "@/components/ui/center";
import { TopographyH2 } from "@/components/ui/topography";

const PlaylistGrid = () => {
  const { data } = useSwr("/home", getHomeData);

  useEffect(() => {
    document.title = "Top Albums | Infinitunes";
  }, []);

  return (
    <div>
      <TopographyH2 className="pb-4">Top Playlists</TopographyH2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data ? (
          data.playlists.map((playlist) => (
            <Card isLink key={playlist.id} item={playlist} />
          ))
        ) : (
          <Center absolutely>
            <Loading iconSize={50} />
          </Center>
        )}
      </div>
    </div>
  );
};

export default PlaylistGrid;
