"use client";

import Link from "next/link";

export default function DramaCard({
  drama,
  addToWatchlist,
  removeFromWatchlist,
  watchlist,
}: any) {

  const isInWatchlist =
    watchlist?.some(
      (item: any) => item.id === drama.id
    ) || false;

  const imageUrl =
    drama?.poster_path
      ? `https://image.tmdb.org/t/p/w500${drama.poster_path}`
      : drama?.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${drama.backdrop_path}`
      : drama?.image?.original ||
        drama?.image?.medium ||
        "https://placehold.co/600x900/111111/FFFFFF/png?text=Moodrama";

  const rating =
    drama.vote_average ||
    drama.rating?.average ||
    "N/A";

  return (
    <Link
      href={`/drama/${drama.id}`}
      onClick={() => {
        localStorage.setItem(
          "selectedDrama",
          JSON.stringify(drama)
        );
      }}
    >
      <div
        className="
        group
        relative
        rounded-3xl
        overflow-hidden
        bg-zinc-950
        border
        border-white/10
        transition-all
        duration-500
        hover:scale-[1.05]
        hover:-translate-y-3
        hover:border-pink-500/40
        hover:shadow-[0_0_60px_rgba(236,72,153,0.25)]
      "
      >
        {/* IMAGE */}
        <div className="relative h-[420px] overflow-hidden">

          <img
            src={imageUrl}
            alt={
              drama.name ||
              drama.title ||
              "Drama"
            }
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/500x750/111111/FFFFFF/png?text=Moodrama";
            }}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          {/* DARK OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black
              via-black/20
              to-transparent
            "
          />

          {/* PLAY BUTTON */}
          <div
            className="
              absolute inset-0
              flex items-center justify-center
              opacity-0
              group-hover:opacity-100
              transition-all duration-500
            "
          >
            <div
              className="
                w-24 h-24
                rounded-full
                bg-white/20
                backdrop-blur-xl
                border border-white/30
                flex items-center justify-center
                text-white text-4xl
                shadow-2xl
                scale-75
                group-hover:scale-100
                transition-all duration-500
              "
            >
              ▶
            </div>
          </div>

          {/* TRENDING */}
          {Number(rating) >= 8 && (
            <div
              className="
                absolute top-4 left-4 z-30
                bg-pink-500
                text-white
                text-xs font-black
                px-3 py-2 rounded-full
                shadow-lg
              "
            >
              🔥 TRENDING
            </div>
          )}

          {/* HOVER DESCRIPTION */}
          <div
            className="
              absolute bottom-0 left-0 right-0
              p-5
              translate-y-10
              opacity-0
              group-hover:translate-y-0
              group-hover:opacity-100
              transition-all duration-500
            "
          >
            <p className="text-sm text-gray-300 line-clamp-3">
              {drama.overview ||
                drama.summary?.replace(/<[^>]+>/g, "") ||
                "No description available."}
            </p>
          </div>

        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h3 className="text-2xl font-black line-clamp-1 group-hover:text-pink-400 transition-colors">
            {drama.name || drama.title || "Unknown Drama"}
          </h3>

          <div className="flex items-center justify-between mt-4">
            <p className="text-yellow-400 font-bold text-lg">
              ⭐ {rating}
            </p>

            <p className="text-sm text-cyan-400 font-semibold">
              {drama.original_language || drama.language || "Drama"}
            </p>
          </div>
        </div>

        {/* WATCHLIST */}
        <div className="px-5 pb-5">
          {isInWatchlist ? (
            <button
              onClick={() => removeFromWatchlist(drama.id)}
              className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-bold transition-all duration-300"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={() => addToWatchlist(drama)}
              className="w-full bg-pink-500 hover:bg-pink-600 py-3 rounded-2xl font-bold transition-all duration-300"
            >
              + Watchlist
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}