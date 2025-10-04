import { fetchFromTmdb } from "@/lib/tmdb";
import type { Movie, PagedResponse } from "@/types/tmdb";
import Banner from "@/components/Banner";
import Row from "@/components/Row";

export default async function Home() {
  const hasTmdb = Boolean(process.env.TMDB_API_V4_TOKEN || process.env.TMDB_API_KEY);
  if (!hasTmdb) {
    return (
      <main className="container py-10 space-y-4">
        <h1 className="text-2xl font-bold">環境変数が未設定です</h1>
        <p className="text-[var(--muted)]">`.env.local` に TMDB のトークン/キーを設定してからリロードしてください。</p>
        <pre className="bg-neutral-900 p-4 rounded text-xs overflow-auto">{`TMDB_API_V4_TOKEN=your_v4_token\n# or\nTMDB_API_KEY=your_v3_api_key`}</pre>
        <p className="text-sm text-[var(--muted)]">詳しくは `README.md` をご覧ください。</p>
      </main>
    );
  }

  const [trending, popular, topRated] = await Promise.all([
    fetchFromTmdb<PagedResponse<Movie>>("/trending/all/week", { language: "ja-JP" }),
    fetchFromTmdb<PagedResponse<Movie>>("/movie/popular", { language: "ja-JP" }),
    fetchFromTmdb<PagedResponse<Movie>>("/movie/top_rated", { language: "ja-JP" }),
  ]);

  return (
    <main>
      <Banner items={trending.results.slice(0, 10)} />
      <div className="space-y-4">
        <Row title="人気の映画" items={popular.results} />
        <Row title="トップレート" items={topRated.results} />
      </div>
    </main>
  );
}
