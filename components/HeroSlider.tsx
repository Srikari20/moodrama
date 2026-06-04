"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

export default function HeroSlider({
  dramas,
}: any) {

  const [current, setCurrent] =
    useState(0);

  useEffect(() => {

    if (!dramas?.length) return;

    const interval =
      setInterval(() => {

        setCurrent(
          (prev) =>
            (prev + 1) %
            dramas.length
        );

      }, 5000);

    return () =>
      clearInterval(interval);

  }, [dramas]);

  if (!dramas?.length)
    return null;

  const drama =
  dramas?.[current];

  if (!drama)
  return null;

  /* IMAGE */

  const backdrop =

    drama?.backdrop_path

      ? `https://image.tmdb.org/t/p/original${drama.backdrop_path}`

      : drama?.poster_path

      ? `https://image.tmdb.org/t/p/original${drama.poster_path}`

      : drama?.image?.original ||

        drama?.image?.medium ||

        "https://placehold.co/1600x900/111111/FFFFFF/png?text=Moodrama";

  return (

    <section
      className="
      relative
      h-[95vh]
      w-full
      overflow-hidden
    "
    >

      {/* BACKDROP */}

      <div className="absolute inset-0">

        <img
          src={backdrop}

          alt={
            drama.name ||
            drama.title
          }

          className="
          w-full
          h-full
          object-cover
          scale-100
          opacity-85
          transition-all
          duration-1000
        "

          onError={(e) => {

            (
              e.currentTarget as HTMLImageElement
            ).src =
              "https://placehold.co/1600x900/111111/FFFFFF/png?text=Moodrama";

          }}
        />

      </div>

      {/* DARK OVERLAY */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-r
        from-black/80
        via-black/30
        to-transparent
      "
      />

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/70
        via-black/10
        to-transparent
      "
      />

      {/* CONTENT */}

      <div
        className="
        relative
        z-20
        h-full
        flex
        items-center
        px-6
        md:px-16
      "
      >

        <div className="max-w-3xl">

          {/* BRAND */}

          <p
            className="
            text-pink-500
            font-black
            tracking-[0.3em]
            mb-5
            text-sm
          "
          >

            MOODRAMA

          </p>

          {/* TITLE */}

          <h1
            className="
            text-5xl
            md:text-8xl
            font-black
            leading-none
            mb-6
            drop-shadow-2xl
          "
          >

            {
              drama.name ||
              drama.title ||
              "Unknown Drama"
            }

          </h1>

          {/* DESCRIPTION */}

          <p
            className="
            text-gray-300
            text-lg
            md:text-xl
            leading-relaxed
            max-w-2xl
            mb-10
            line-clamp-4
          "
          >

            {
              drama.overview ||

              drama.summary?.replace(
                /<[^>]+>/g,
                ""
              ) ||

              drama.description ||

              "An emotional drama filled with romance, suspense, heartbreak, and unforgettable characters."
            }

          </p>

          {/* BUTTONS */}

          <div className="flex gap-4 flex-wrap">

            {/* WATCH */}

            <Link
              href={`/drama/${drama.id}`}

              onClick={() => {

                localStorage.setItem(
                  "selectedDrama",
                  JSON.stringify(drama)
                );

              }}
            >

              <button
                className="
                bg-pink-500
                hover:bg-pink-600
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition-all
                duration-300
                hover:scale-105
                shadow-2xl
                shadow-pink-500/30
              "
              >

                ▶ Watch Now

              </button>

            </Link>

            {/* MORE INFO */}

            <Link
              href={`/drama/${drama.id}`}

              onClick={() => {

                localStorage.setItem(
                  "selectedDrama",
                  JSON.stringify(drama)
                );

              }}
            >

              <button
                className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                hover:bg-white/20
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition-all
                duration-300
              "
              >

                ℹ More Info

              </button>

            </Link>

          </div>

        </div>

      </div>

      {/* SLIDER INDICATORS */}

      <div
        className="
        absolute
        bottom-10
        left-1/2
        -translate-x-1/2
        flex
        gap-3
        z-30
      "
      >

        {dramas.map(
          (_: any, index: number) => (

            <button
              key={index}

              onClick={() =>
                setCurrent(index)
              }

              className={`
                h-2
                rounded-full
                transition-all
                duration-500

                ${
                  current === index

                    ? `
                      w-14
                      bg-gradient-to-r
                      from-pink-500
                      to-fuchsia-500
                    `

                    : `
                      w-4
                      bg-white/40
                      hover:bg-white/70
                    `
                }
              `}
            />

          )
        )}

      </div>

    </section>

  );

}