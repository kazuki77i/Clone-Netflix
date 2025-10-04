import { GridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="container py-6 space-y-6">
      <div className="flex gap-2">
        <div className="w-full h-10 rounded bg-neutral-800 animate-pulse" />
        <div className="w-24 h-10 rounded bg-neutral-800 animate-pulse" />
      </div>
      <GridSkeleton />
    </main>
  );
}


