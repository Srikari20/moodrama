"use client";

import recentShows from "../../data/recent";
import DramaCard from "../../components/DramaCard";
import { useWatchlist } from "../context/WatchlistContext";



export default function BestRomancePage() {

  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useWatchlist();

  const romanceShows =
    recentShows.filter(
      (show: any) =>
        show.moods?.includes("Romantic")
    );

  return (
    <main className="min-h-screen bg-black text-white px-8 py-10">

      <h1 className="text-5xl font-black mb-10">
        ❤️ Best Romance Dramas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {romanceShows.map((drama: any) => (

          <DramaCard
            key={drama.id}
            drama={drama}
            watchlist={watchlist}
            addToWatchlist={addToWatchlist}
            removeFromWatchlist={removeFromWatchlist}
          />

        ))}

      </div>

    </main>
  );
}