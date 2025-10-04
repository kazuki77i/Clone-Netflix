import { NextRequest, NextResponse } from "next/server";
import { buildTmdbUrl } from "@/lib/tmdb";

// 簡易プロキシ: /api/tmdb?path=/trending/all/week&language=ja-JP
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("path");
  if (!pathname) return NextResponse.json({ error: "Missing path" }, { status: 400 });

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== "path") params[key] = value;
  });

  let url = buildTmdbUrl(pathname, params);
  const v4 = process.env.TMDB_API_V4_TOKEN;
  const v3 = process.env.TMDB_API_KEY;
  if (!v4 && !v3) return NextResponse.json({ error: "TMDB credentials missing" }, { status: 500 });

  if (!v4 && v3) {
    const u = new URL(url);
    u.searchParams.set("api_key", v3);
    url = u.toString();
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (v4) headers.Authorization = `Bearer ${v4}`;

  const tmdbRes = await fetch(url, { headers, next: { revalidate: 60 } });

  const body = await tmdbRes.text();
  return new NextResponse(body, {
    status: tmdbRes.status,
    headers: { "Content-Type": tmdbRes.headers.get("content-type") || "application/json" },
  });
}


