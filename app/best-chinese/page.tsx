"use client";

import Link from "next/link";

export default function BestChinesePage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-6">
        🇨🇳 Best Chinese Dramas
      </h1>

      <p className="text-gray-400 mb-10">
        Discover the most popular Chinese dramas
        loved by audiences worldwide.
      </p>

      <div className="space-y-6">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            Hidden Love
          </h2>

          <p className="text-gray-300 mt-2">
            A beautiful coming-of-age romance that
            became a global hit.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">
            The Untamed
          </h2>

          <p className="text-gray-300 mt-2">
            Fantasy, mystery and brotherhood in one
            of the most beloved Chinese dramas.
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