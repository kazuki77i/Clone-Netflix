"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getImageUrl } from "@/lib/tmdb";
import type { Movie } from "@/types/tmdb";

type Props = { items: Movie[] };

export default function Banner({ items }: Props) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 5000);
    return () => clearInterval(id);
  }, [items.length]);

  const title = current?.title || current?.name || "";
  const background = useMemo(() => getImageUrl(current?.backdrop_path, "w1280"), [current]);

  return (
    <section className="relative h-[45vh] md:h-[60vh] w-full">
      {background && (
        <Image src={background} alt={title} fill className="object-cover" priority />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-8 left-6 right-6 max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{title}</h1>
        <p className="hidden md:block text-sm text-[var(--muted)] line-clamp-3">
          {current?.overview}
        </p>
      </div>
    </section>
  );
}


