"use client";

import { useEffect, useState } from "react";
import DramaCard from "../../components/DramaCard";
import { useWatchlist } from "../context/WatchlistContext";

export default function TrendingPage() {

  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useWatchlist();

  const [trending, setTrending] =
    useState<any[]>([]);

  useEffect(() => {

    async function loadTrending() {

      try {

        const res =
          await fetch(
            "/api/search?q=Korean"
          );

        const data =
          await res.json();

        setTrending(
          data.slice(0, 20)
        );

      } catch (error) {

        console.error(error);

      }

    }

    loadTrending();

  }, []);

  if (trending.length === 0) {

    return (

      <div
        className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      "
      >

        Loading Trending Dramas...

      </div>

    );

  }

  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      px-8
      py-10
    "
    >

      <h1
        className="
        text-5xl
        font-black
        mb-10
      "
      >

        🔥 Trending This Week

      </h1>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-5
        gap-6
      "
      >

        {trending.map(
          (drama: any) => (

            <div
              key={drama.id}
              onClick={() => {

                localStorage.setItem(
                  "selectedDrama",
                  JSON.stringify(drama)
                );

                window.location.href =
                  `/drama/${drama.id}`;

              }}
            >

              <DramaCard
                drama={drama}
                watchlist={watchlist}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
              />

            </div>

          )
        )}

      </div>

    </main>

  );

}