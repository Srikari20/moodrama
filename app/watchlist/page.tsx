"use client";

import Link from "next/link";

import DramaCard from "../../components/DramaCard";

import { useWatchlist } from "../context/WatchlistContext";


export default function WatchlistPage() {

  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useWatchlist();

  return (

    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}

      <nav
        className="
        flex
        items-center
        justify-between
        px-8
        py-5
        border-b
        border-gray-800
        sticky
        top-0
        z-50
        bg-black/80
        backdrop-blur-xl
      "
      >

        <Link href="/">

          <h1
            className="
            text-4xl
            font-black
            text-pink-500
            cursor-pointer
          "
          >

            Moodrama

          </h1>

        </Link>

      </nav>

      {/* HEADER */}

      <section className="px-8 pt-12 pb-8">

        <h1
          className="
          text-5xl
          md:text-6xl
          font-black
          mb-4
        "
        >

          My Watchlist

        </h1>

        <p className="text-gray-400 text-lg">

          Your saved dramas.

        </p>

      </section>

      {/* EMPTY */}

      {watchlist.length === 0 && (

        <div
          className="
          px-8
          py-20
          text-center
        "
        >

          <h2
            className="
            text-3xl
            font-bold
            text-gray-500
          "
          >

            No dramas added yet.

          </h2>

          <p className="text-gray-600 mt-4">

            Start adding your favorites ⭐

          </p>

        </div>

      )}

      {/* GRID */}

      {watchlist.length > 0 && (

        <section
          className="
          px-8
          pb-20
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
        "
        >

          {watchlist.map((drama: any) => (

            <DramaCard
              key={drama.id}

              drama={drama}

              addToWatchlist={
                addToWatchlist
              }

              removeFromWatchlist={
                removeFromWatchlist
              }

              watchlist={
                watchlist
              }
            />

          ))}

        </section>

      )}

    </main>

  );

}