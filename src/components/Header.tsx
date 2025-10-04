import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="text-2xl font-bold text-[var(--accent)]">
          N
        </Link>
        <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-white">ホーム</Link>
          <Link href="/search" className="hover:text-white">検索</Link>
        </nav>
      </div>
    </header>
  );
}


