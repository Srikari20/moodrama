"use client";

import Link from "next/link";
import DramaCard from "@/components/DramaCard";
import recentShows from "@/data/recent";

const koreanDramas = recentShows.filter(
  (drama) => drama.language === "Korean"
);

export default function BestKoreanDramasPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-4">
        🇰🇷 Best Korean Dramas
      </h1>

      <p className="text-gray-400 mb-10 max-w-3xl">
        Discover the best Korean dramas of all time including romance,
        fantasy, thriller, action, revenge and emotional masterpieces.
        These are some of the most popular K-Dramas loved by fans worldwide.
      </p>

      <div className="grid md:grid-cols-4 gap-6">

        {koreanDramas.map((drama) => (
          <DramaCard
            key={drama.id}
            drama={drama}
            watchlist={[]}
            addToWatchlist={() => {}}
            removeFromWatchlist={() => {}}
          />
        ))}

      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="
          bg-pink-500
          hover:bg-pink-600
          px-6
          py-3
          rounded-xl
          font-bold
          transition-all
          "
        >
          ← Back Home
        </Link>
      </div>

    </main>
  );
}