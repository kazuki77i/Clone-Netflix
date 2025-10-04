const TMDB_API_BASE = process.env.TMDB_API_BASE || "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_V4_TOKEN = process.env.TMDB_API_V4_TOKEN;

export type SearchParams = Record<string, string | number | boolean | undefined>;

export function buildTmdbUrl(pathname: string, params?: SearchParams): string {
  const url = new URL(pathname.replace(/^\/+/, ""), TMDB_API_BASE + "/");
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

export async function fetchFromTmdb<T>(pathname: string, params?: SearchParams, revalidateSeconds = 60): Promise<T> {
  const hasV4 = Boolean(TMDB_API_V4_TOKEN);
  const hasV3 = Boolean(TMDB_API_KEY);
  if (!hasV4 && !hasV3) throw new Error("TMDB credentials are not set");

  let urlStr = buildTmdbUrl(pathname, params);
  if (!hasV4 && hasV3 && TMDB_API_KEY) {
    const u = new URL(urlStr);
    u.searchParams.set("api_key", TMDB_API_KEY);
    urlStr = u.toString();
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (hasV4 && TMDB_API_V4_TOKEN) headers.Authorization = `Bearer ${TMDB_API_V4_TOKEN}`;

  const response = await fetch(urlStr, {
    headers,
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`TMDB error ${response.status}: ${text}`);
  }
  return (await response.json()) as T;
}

export function getImageUrl(path: string | null | undefined, size: "w300" | "w500" | "w780" | "w1280" | "original" = "w500"): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}


