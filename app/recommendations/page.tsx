"use client";

import Link from "next/link";
import recentShows from "@/data/recent";
import DramaCard from "@/components/DramaCard";

const heartbroken = recentShows.filter((drama) =>
  drama.moods?.includes("Heartbroken")
);

const healing = recentShows.filter((drama) =>
  drama.moods?.includes("Healing")
);

const romantic = recentShows.filter((drama) =>
  drama.moods?.includes("Romantic")
);

const thriller = recentShows.filter((drama) =>
  drama.moods?.includes("Thrilling")
);

const revenge = recentShows.filter((drama) =>
  drama.moods?.includes("Revenge")
);

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">


  <h1 className="text-5xl font-black mb-4">
    🎭 Drama Recommendations By Mood
  </h1>

  <p className="text-gray-400 mb-12">
    Find the perfect drama based on how you're feeling today.
  </p>

  <div className="space-y-16">

{/* HEARTBROKEN */}

<div>
  <h2 className="text-3xl font-bold mb-6">
    💔 Heartbroken
  </h2>

  <div className="grid md:grid-cols-4 gap-6">
    {heartbroken.map((drama) => (
      <DramaCard
        key={drama.id}
        drama={drama}
        watchlist={[]}
        addToWatchlist={() => {}}
        removeFromWatchlist={() => {}}
      />
    ))}
  </div>
</div>

{/* HEALING */}

<div>
  <h2 className="text-3xl font-bold mb-6">
    🌿 Healing
  </h2>

  <div className="grid md:grid-cols-4 gap-6">
    {healing.map((drama) => (
      <DramaCard
        key={drama.id}
        drama={drama}
        watchlist={[]}
        addToWatchlist={() => {}}
        removeFromWatchlist={() => {}}
      />
    ))}
  </div>
</div>

{/* ROMANTIC */}

<div>
  <h2 className="text-3xl font-bold mb-6">
    ❤️ Romantic
  </h2>

  <div className="grid md:grid-cols-4 gap-6">
    {romantic.map((drama) => (
      <DramaCard
        key={drama.id}
        drama={drama}
        watchlist={[]}
        addToWatchlist={() => {}}
        removeFromWatchlist={() => {}}
      />
    ))}
  </div>
</div>

{/* THRILLER */}

<div>
  <h2 className="text-3xl font-bold mb-6">
    🔥 Thriller
  </h2>

  <div className="grid md:grid-cols-4 gap-6">
    {thriller.map((drama) => (
      <DramaCard
        key={drama.id}
        drama={drama}
        watchlist={[]}
        addToWatchlist={() => {}}
        removeFromWatchlist={() => {}}
      />
    ))}
  </div>
</div>

{/* REVENGE */}

<div>
  <h2 className="text-3xl font-bold mb-6">
    ⚔️ Revenge
  </h2>

  <div className="grid md:grid-cols-4 gap-6">
    {revenge.map((drama) => (
      <DramaCard
        key={drama.id}
        drama={drama}
        watchlist={[]}
        addToWatchlist={() => {}}
        removeFromWatchlist={() => {}}
      />
    ))}
  </div>
</div>


  <div className="mt-12">
    <Link
      href="/"
      className="
      bg-pink-500
      px-6
      py-3
      rounded-xl
      font-bold
      "
    >
      ← Back Home
    </Link>
  </div>

</div>
</main>
  );
}