import Image from "next/image";
import Link from "next/link";
import { fetchFromTmdb, getImageUrl } from "@/lib/tmdb";
import type { DetailedTitle } from "@/types/tmdb";

type Params = { params: { type: string; id: string } };

export default async function TitleDetail({ params }: Params) {
  const { type, id } = params;
  const hasTmdb = Boolean(process.env.TMDB_API_V4_TOKEN || process.env.TMDB_API_KEY);
  if (!hasTmdb) {
    return (
      <main className="container py-10 space-y-4">
        <h1 className="text-2xl font-bold">環境変数が未設定です</h1>
        <p className="text-[var(--muted)]">`.env.local` に TMDB のトークン/キーを設定してから再度アクセスしてください。</p>
      </main>
    );
  }
  const detail = await fetchFromTmdb<DetailedTitle>(`/${type}/${id}`, { append_to_response: "videos,similar", language: "ja-JP" });

  const title = detail.title || detail.name || "";
  const poster = getImageUrl(detail.poster_path, "w500");
  const backdrop = getImageUrl(detail.backdrop_path, "w1280");

  return (
    <main>
      <section className="relative h-[40vh] md:h-[50vh]">
        {backdrop && <Image src={backdrop} alt={title} fill className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </section>

      <section className="container -mt-24 md:-mt-28 flex gap-6">
        <div className="relative w-32 md:w-48 aspect-[2/3] rounded overflow-hidden bg-neutral-900 shrink-0">
          {poster && <Image src={poster} alt={title} fill className="object-cover" />}
        </div>
        <div className="py-2">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{title}</h1>
          {detail.overview && <p className="text-[var(--muted)] max-w-2xl">{detail.overview}</p>}
          {detail.genres && (
            <p className="mt-2 text-sm text-[var(--muted)]">{detail.genres.map((g) => g.name).join(" / ")}</p>
          )}
        </div>
      </section>

      {detail.similar?.results?.length ? (
        <section className="container my-6">
          <h2 className="heading">関連作品</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {detail.similar.results.map((m) => {
              const image = getImageUrl(m.poster_path || m.backdrop_path, "w300");
              const name = m.title || m.name || "";
              return (
                <Link key={m.id} href={`/title/${m.media_type || type}/${m.id}`} className="block">
                  <div className="relative w-full aspect-[2/3] rounded overflow-hidden bg-neutral-900">
                    {image && <Image src={image} alt={name} fill className="object-cover" />}
                  </div>
                  <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">{name}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}


