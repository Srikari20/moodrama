"use client";

import DramaCard from "./DramaCard";

export default function DramaRow({
  title,
  dramas,
  watchlist,
  addToWatchlist,
  removeFromWatchlist,
}: any) {

  if (!dramas?.length)
    return null;

  return (

    <section className="mb-16">

      {/* TITLE */}

      <h2
        className="
        text-3xl
        font-black
        mb-7
      "
      >

        {title}

      </h2>

      {/* ROW */}

      <div
        className="
        flex
        gap-6
        overflow-x-auto
        scrollbar-hide
        pb-4
      "
      >

        {dramas.map(
          (drama: any) => (

            <div
              key={drama.id}

              className="
              min-w-[260px]
              max-w-[260px]
              flex-shrink-0
            "
            >

              <DramaCard
                drama={drama}
                watchlist={watchlist}
                addToWatchlist={
                  addToWatchlist
                }
                removeFromWatchlist={
                  removeFromWatchlist
                }
              />

            </div>

          )
        )}

      </div>

    </section>

  );

}