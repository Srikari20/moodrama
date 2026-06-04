"use client";

import Link from "next/link";

export default function BestHistoricalPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-6">
        🏯 Best Historical Dramas
      </h1>

      <p className="text-gray-400 mb-10">
        Explore royal courts, ancient kingdoms,
        political intrigue and unforgettable historical stories.
      </p>

      <div className="space-y-6">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            Moon Lovers: Scarlet Heart Ryeo
          </h2>

          <p className="text-gray-300 mt-2">
            A modern woman travels back in time
            and becomes involved with royal princes.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            Mr. Queen
          </h2>

          <p className="text-gray-300 mt-2">
            A hilarious historical drama with
            romance, politics and comedy.
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