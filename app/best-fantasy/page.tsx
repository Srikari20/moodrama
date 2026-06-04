"use client";

import Link from "next/link";

export default function BestFantasyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-6">
        ✨ Best Fantasy Dramas To Watch
      </h1>

      <p className="text-gray-400 mb-10">
        Looking for magical worlds, supernatural powers,
        gods, demons, and unforgettable fantasy stories?
        These fantasy dramas are among the best.
      </p>

      <div className="space-y-6">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            Goblin
          </h2>

          <p className="text-gray-300 mt-2">
            A legendary immortal warrior searches for the
            one person who can end his curse.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            Alchemy of Souls
          </h2>

          <p className="text-gray-300 mt-2">
            Magic, destiny, forbidden powers and romance.
          </p>
        </div>

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