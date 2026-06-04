"use client";

import Link from "next/link";

export default function BestRevengePage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-6">
        🔥 Best Revenge Dramas
      </h1>

      <p className="text-gray-400 mb-10">
        Betrayal, justice and unforgettable revenge stories.
        These dramas keep you hooked until the end.
      </p>

      <div className="space-y-6">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            The Glory
          </h2>

          <p className="text-gray-300 mt-2">
            A woman carefully plans revenge against
            those who ruined her life.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            Itaewon Class
          </h2>

          <p className="text-gray-300 mt-2">
            A determined entrepreneur challenges
            a powerful family after tragedy strikes.
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