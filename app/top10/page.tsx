"use client";


import { useEffect, useState } from "react";
import DramaCard from "../../components/DramaCard";
import { useWatchlist } from "../context/WatchlistContext";



export default function Top10Page() {

  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useWatchlist();

  const [top10, setTop10] =
  useState<any[]>([]);


  useEffect(() => {

  async function loadTop10() {

    try {

      const res =
        await fetch(
          "/api/search?q=kdrama"
        );

      const data =
        await res.json();

      const shows =
        data.map(
          (item: any) =>
            item.show || item
        );

      setTop10(
        shows.slice(0, 10)
      );

    } catch (error) {

      console.error(error);

    }

  }

  loadTop10();

}, []);
if (top10.length === 0) {

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

      Loading Top Dramas...

    </div>

  );

}
  return (

    <main className="min-h-screen bg-black text-white px-8 py-10">

      <h1 className="text-5xl font-black mb-10">

        🏆 Top 10 Dramas Today

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {top10.map(
          (drama: any, index: number) => (

            <div key={drama.id}>

              <div className="text-4xl font-black text-pink-500 mb-3">

                #{index + 1}

              </div>

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