"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

export default function SearchBar({

  search,
  setSearch,

}: any) {

  const [results, setResults] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [selectedIndex, setSelectedIndex] =
    useState(-1);

  /* TRENDING */

  const trendingSearches = [

    "Goblin",

    "Crash Landing on You",

    "Hidden Love",

    "Moving",

    "Alchemy of Souls",

    "The Untamed",

  ];

  /* SEARCH */

  useEffect(() => {

    const timer =
      setTimeout(async () => {

        if (
          search.trim().length < 2
        ) {

          setResults([]);

          return;

        }

        try {

          setLoading(true);

          const res =
            await fetch(
              `/api/search?q=${encodeURIComponent(
                search
              )}`
            );

          const data =
            await res.json();

          setResults(
            Array.isArray(data)
              ? data
              : []
          );

        } catch (error) {

          console.error(error);

          setResults([]);

        } finally {

          setLoading(false);

        }

      }, 400);

    return () =>
      clearTimeout(timer);

  }, [search]);

  /* KEYBOARD NAVIGATION */

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {

    if (
      results.length === 0
    ) return;

    /* DOWN */

    if (
      e.key === "ArrowDown"
    ) {

      e.preventDefault();

      setSelectedIndex((prev) =>

        prev < results.length - 1
          ? prev + 1
          : prev
      );

    }

    /* UP */

    if (
      e.key === "ArrowUp"
    ) {

      e.preventDefault();

      setSelectedIndex((prev) =>

        prev > 0
          ? prev - 1
          : 0
      );

    }

    /* ENTER */

    if (
      e.key === "Enter"
    ) {

      const selectedShow =
        results[selectedIndex];

      if (!selectedShow)
        return;

      const dramaData =
        selectedShow.show ||
        selectedShow;

      localStorage.setItem(
        "selectedDrama",
        JSON.stringify(
          dramaData
        )
      );

      window.location.href =
        `/drama/${dramaData.id}`;

    }

  }

  return (

    <section className="relative z-50">

      {/* SEARCH INPUT */}

      <div className="relative">

        <input
          type="text"

          value={search}

          onChange={(e) => {

            setSearch(
              e.target.value
            );

            setSelectedIndex(-1);

          }}

          onKeyDown={
            handleKeyDown
          }

          placeholder="Search dramas, actors, anime..."

          className="
          w-full
          px-7
          py-5
          rounded-3xl
          bg-zinc-900/90
          border
          border-gray-700
          backdrop-blur-xl
          outline-none
          text-lg
          focus:border-pink-500
          transition-all
        "
        />

      </div>

      {/* TRENDING */}

      {search.length === 0 && (

        <div
          className="
          flex
          flex-wrap
          gap-3
          mt-5
        "
        >

          {trendingSearches.map(
            (item, index) => (

              <button
                key={index}

                onClick={() =>
                  setSearch(item)
                }

                className="
                bg-zinc-900
                hover:bg-pink-500
                px-4
                py-2
                rounded-2xl
                text-sm
                font-semibold
                transition-all
              "
              >

                🔥 {item}

              </button>

            )
          )}

        </div>

      )}

      {/* RESULTS */}

      {(results.length > 0 ||

        loading) && (

        <div
          className="
          absolute
          top-full
          mt-4
          w-full
          bg-black/95
          border
          border-gray-800
          rounded-3xl
          p-4
          max-h-[500px]
          overflow-y-auto
          shadow-2xl
          z-[999]
        "
        >

          {/* LOADING */}

          {loading ? (

            <p className="text-gray-400 p-4">

              Searching...

            </p>

          ) : (

            <div className="space-y-3">

              {results.map(
                (
                  show: any,
                  index: number
                ) => {

                  const dramaData =
                    show.show ||
                    show;

                  return (

                    <Link
                      key={
                        dramaData.id
                      }

                      href={`/drama/${dramaData.id}`}

                      onClick={() => {

                        localStorage.setItem(
                          "selectedDrama",

                          JSON.stringify(
                            dramaData
                          )
                        );

                        setSearch("");

                        setResults([]);

                      }}

                      className={`
                        flex
                        items-center
                        gap-4
                        p-3
                        rounded-2xl
                        transition-all

                        ${
                          selectedIndex ===
                          index

                            ? `
                              bg-pink-500/20
                              border
                              border-pink-500/30
                            `

                            : `
                              hover:bg-zinc-900
                            `
                        }
                      `}
                    >

                      {/* IMAGE */}

                      <img
                        src={
                          dramaData.image
                            ?.medium ||

                          "https://placehold.co/80x120"
                        }

                        alt={
                          dramaData.name
                        }

                        className="
                        w-[60px]
                        h-[90px]
                        object-cover
                        rounded-xl
                        flex-shrink-0
                      "
                      />

                      {/* INFO */}

                      <div>

                        <h3
                          className="
                          font-bold
                          text-lg
                        "
                        >

                          {
                            dramaData.name
                          }

                        </h3>

                        <p
                          className="
                          text-sm
                          text-gray-400
                          mt-1
                        "
                        >

                          🌏 {

                            dramaData.language ||

                            "Unknown"

                          }

                        </p>

                        <p
                          className="
                          text-sm
                          text-pink-400
                        "
                        >

                          ⭐ {

                            dramaData.rating
                              ?.average ||

                            "N/A"

                          }

                        </p>

                      </div>

                    </Link>

                  );

                }
              )}

            </div>

          )}

        </div>

      )}

    </section>

  );

}