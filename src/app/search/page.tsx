import { fetchFromTmdb, getImageUrl } from "@/lib/tmdb";
import type { Movie, PagedResponse } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";

type Props = { searchParams: { q?: string } };

export default async function SearchPage({ searchParams }: Props) {
  const query = (searchParams.q || "").trim();
  const hasTmdb = Boolean(process.env.TMDB_API_V4_TOKEN || process.env.TMDB_API_KEY);
  const data = query && hasTmdb
    ? await fetchFromTmdb<PagedResponse<Movie>>("/search/multi", { query, language: "ja-JP" })
    : null;

  return (
    <main className="container py-6 space-y-6">
      <form className="flex gap-2" action="/search">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="作品名で検索"
          className="w-full rounded bg-neutral-900 px-3 py-2 outline-none border border-white/10"
        />
        <button className="px-4 rounded bg-[var(--accent)] font-semibold">検索</button>
      </form>

      {!hasTmdb && (
        <p className="text-[var(--muted)]">TMDB 環境変数を設定すると検索が使えます。</p>
      )}

      {data && (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {data.results.map((m) => {
            const image = getImageUrl(m.poster_path || m.backdrop_path, "w300");
            const name = m.title || m.name || "";
            return (
              <Link key={`${m.media_type}-${m.id}`} href={`/title/${m.media_type || "movie"}/${m.id}`} className="block">
                <div className="relative w-full aspect-[2/3] rounded overflow-hidden bg-neutral-900">
                  {image && <Image src={image} alt={name} fill className="object-cover" />}
                </div>
                <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">{name}</p>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}


