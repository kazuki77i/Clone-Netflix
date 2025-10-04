export function CardSkeleton() {
  return <div className="w-[160px] h-[240px] md:w-[200px] md:h-[300px] rounded bg-neutral-800 animate-pulse" />;
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full aspect-[2/3] rounded bg-neutral-800 animate-pulse" />
      ))}
    </div>
  );
}


