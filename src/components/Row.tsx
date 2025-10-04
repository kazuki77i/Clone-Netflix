import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/tmdb";
import type { Movie } from "@/types/tmdb";

type Props = { title: string; items: Movie[] };

export default function Row({ title, items }: Props) {
  return (
    <section className="container my-6">
      <h2 className="heading">{title}</h2>
      <div className="row-scroll">
        {items.map((m) => {
          const image = getImageUrl(m.poster_path || m.backdrop_path, "w300");
          const name = m.title || m.name || "";
          return (
            <Link key={m.id} href={`/title/${m.media_type || "movie"}/${m.id}`} className="group">
              <div className="relative w-[160px] h-[240px] md:w-[200px] md:h-[300px] rounded overflow-hidden bg-neutral-900">
                {image && (
                  <Image src={image} alt={name} fill className="object-cover transition-transform group-hover:scale-105" />
                )}
              </div>
              <p className="mt-1 text-xs md:text-sm text-[var(--muted)] line-clamp-2">{name}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


