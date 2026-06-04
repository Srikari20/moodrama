"use client";

import Link from "next/link";
import DramaCard from "@/components/DramaCard";
import recentShows from "@/data/recent";

export default function BestRevengePage() {

const dramas = recentShows.filter(
(drama) =>
drama.moods?.includes("Revenge")
);

return ( <main className="min-h-screen bg-black text-white px-8 py-12">

  <h1 className="text-5xl font-black mb-6">
    🔥 Best Revenge Dramas
  </h1>

  <p className="text-gray-400 mb-10">
    Betrayal, justice and unforgettable revenge stories.
  </p>

  <div className="grid md:grid-cols-4 gap-6">
    {dramas.map((drama) => (
      <DramaCard
        key={drama.id}
        drama={drama}
        watchlist={[]}
        addToWatchlist={() => {}}
        removeFromWatchlist={() => {}}
      />
    ))}
  </div>

  <Link
    href="/"
    className="inline-block mt-10 bg-pink-500 px-6 py-3 rounded-xl font-bold"
  >
    ← Back Home
  </Link>

</main>


);
}
