"use client";

import Link from "next/link";

export default function BestActionPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-6">
        ⚔️ Best Action Dramas To Watch
      </h1>

      <p className="text-gray-400 mb-10">
        Love intense fights, thrilling missions,
        crime investigations and nonstop action?
        These dramas deliver excitement from start to finish.
      </p>

      <div className="space-y-6">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            Moving
          </h2>

          <p className="text-gray-300 mt-2">
            Superpowered teenagers and their parents
            try to survive dangerous government secrets.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            Vincenzo
          </h2>

          <p className="text-gray-300 mt-2">
            A Korean mafia lawyer returns home and
            takes revenge against powerful villains.
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