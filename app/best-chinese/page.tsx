"use client";

import Link from "next/link";
import DramaCard from "@/components/DramaCard";
import recentShows from "@/data/recent";

export default function BestChinesePage() {

const dramas = recentShows.filter(
(drama) =>
drama.language === "Chinese"
);

return ( <main className="min-h-screen bg-black text-white px-8 py-12">


  <h1 className="text-5xl font-black mb-6">
    🇨🇳 Best Chinese Dramas
  </h1>

  <p className="text-gray-400 mb-10">
    Discover the most popular and beloved Chinese dramas.
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
