export default function Loading() {
  return (
    <main>
      <section className="h-[50vh] bg-neutral-900 animate-pulse" />
      <section className="container -mt-24 flex gap-6">
        <div className="w-32 md:w-48 aspect-[2/3] rounded bg-neutral-800 animate-pulse" />
        <div className="flex-1 space-y-3 pt-4">
          <div className="w-2/3 h-8 bg-neutral-800 rounded animate-pulse" />
          <div className="w-full h-4 bg-neutral-800 rounded animate-pulse" />
          <div className="w-5/6 h-4 bg-neutral-800 rounded animate-pulse" />
        </div>
      </section>
      <section className="container my-6 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-full aspect-[2/3] rounded bg-neutral-800 animate-pulse" />
        ))}
      </section>
    </main>
  );
}


