"use client";

import Link from "next/link";
import DramaCard from "@/components/DramaCard";
import recentShows from "@/data/recent";

export default function BestFantasyPage() {

const fantasyDramas =
recentShows.filter(
drama =>
drama.moods?.includes("Fantasy")
);

return (


<main className="min-h-screen bg-black text-white px-8 py-12">

  <h1 className="text-5xl font-black mb-6">
    ✨ Best Fantasy Dramas
  </h1>

  <p className="text-gray-400 mb-10">
    Discover magical worlds, supernatural powers,
    unforgettable romance and fantasy adventures.
  </p>

  <div className="grid md:grid-cols-4 gap-6">

    {fantasyDramas.map((drama) => (

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
    className="
    inline-block
    mt-10
    bg-pink-500
    px-6
    py-3
    rounded-xl
    font-bold
    "
  >
    ← Back Home
  </Link>

</main>


);
}
