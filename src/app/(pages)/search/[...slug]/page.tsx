import Link from "next/link";

import { Song } from "@/types";
import { search } from "@/lib/jiosaavn-api";
import { cn } from "@/lib/utils";
import { ItemCard } from "@/components/item-card";
import SongList from "@/components/song-list";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H1, Muted } from "@/components/ui/topography";

type Props = {
  params: { slug: ["song" | "album" | "playlist" | "artist" | "show", string] };
};

const Nav = [
  { title: "Playlists", href: "/search/playlist" },
  { title: "Songs", href: "/search/song" },
  { title: "Albums", href: "/search/album" },
  { title: "Podcasts", href: "/search/show" },
  { title: "Artists", href: "/search/artist" },
];

const Page = async ({ params: { slug } }: Props) => {
  const [type, query] = slug;

  const searchRes = await search(query, type);

  return (
    <>
      <H1 className="text-center md:text-start">
        Search Results for{" "}
        <span className="block md:inline-block">
          &apos;
          <em className="font-extrabold underline underline-offset-4">
            {query.replaceAll("%20", " ")}
          </em>
          &apos;
        </span>
      </H1>
      <Muted className="text-center md:text-start">
        {searchRes.total} Results
      </Muted>

      <Separator className="mt-4" />

      <nav className="border-b">
        <div className="hidden h-full items-center gap-2 lg:flex">
          {Nav.map(({ title, href }) => {
            const isActive = type === href.split("/")[2];

            return (
              <div
                key={title}
                className={cn(
                  "hover:border-primary inline-block h-full border-b-2 border-transparent py-2",
                  isActive && "border-primary"
                )}
              >
                <Link
                  href={`${href}/${query}`}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    isActive && "font-medium"
                  )}
                >
                  {title}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="my-4">
        {type === "song" ? (
          <SongList songs={searchRes.results as Song[]} />
        ) : (
          <div className="flex w-full flex-wrap justify-between gap-y-4">
            {searchRes.results.map(
              ({ id, name, url, subtitle, type, image }) => (
                <ItemCard
                  key={id}
                  name={name}
                  url={url}
                  subtitle={subtitle}
                  type={type}
                  image={image}
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
