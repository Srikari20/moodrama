"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import HeroSlider from "../components/HeroSlider";

import DramaCard from "../components/DramaCard";

import DramaRow from "../components/DramaRow";

import SkeletonCard from "../components/SkeletonCard";

import AnimatedSection from "../components/AnimatedSection";

import { useWatchlist } from "./context/WatchlistContext";

import recentShows from "../data/recent";

import SearchBar from "../components/SearchBar";

export default function Home() {

  const [dramas, setDramas] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [searchResults, setSearchResults] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [searchLoading, setSearchLoading] =
    useState(false);

  const [selectedGenre, setSelectedGenre] =
    useState("All");

  const [selectedMood, setSelectedMood] =
  useState("All");

  const [apiShows, setApiShows] =
  useState([]);
  const [apiTrending, setApiTrending] =
  useState<any[]>([]);

const [apiPopular, setApiPopular] =
  useState<any[]>([]);

const [topToday, setTopToday] =
  useState<any[]>([]);

  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useWatchlist();

  /* LOAD */

  useEffect(() => {

    setDramas(recentShows);

    setLoading(false);

  }, []);

  useEffect(() => {

  async function fetchApiRows() {

    try {

      const trendingRes =
        await fetch(
          "/api/search?q=kdrama"
        );

      const trendingData =
        await trendingRes.json();

      setApiTrending(
        trendingData.map(
          (item: any) =>
            item.show || item
        )
      );

      const popularRes =
        await fetch(
          "/api/search?q=romance"
        );

      const popularData =
        await popularRes.json();

      setApiPopular(
        popularData.map(
          (item: any) =>
            item.show || item
        )
      );
      const combined = [

  ...trendingData.map(
    (item: any) =>
      item.show || item
  ),

  ...popularData.map(
    (item: any) =>
      item.show || item
  ),

];
const uniqueShows =
  combined.filter(
    (
      show: any,
      index: number,
      self: any[]
    ) =>
      index ===
      self.findIndex(
        (s: any) =>
          s.id === show.id
      )
  );
  const sortedShows =
  uniqueShows.sort(
    (a: any, b: any) =>

      (
        b.rating?.average || 0
      ) -

      (
        a.rating?.average || 0
      )
  );
  setTopToday(
  sortedShows.slice(0, 10)
);

    } catch (error) {

      console.error(error);

    }

  }

  fetchApiRows();

}, []);

  /* SEARCH */

  useEffect(() => {

    const timer =
      setTimeout(async () => {

        if (
          search.trim().length < 2
        ) {

          setSearchResults([]);

          return;

        }

        try {

          setSearchLoading(true);

          const res =
            await fetch(
              `/api/search?q=${encodeURIComponent(search)}`
            );

          const data =
            await res.json();

          setSearchResults(
            Array.isArray(data)
              ? data
              : []
          );

        } catch (error) {

          console.error(error);

          setSearchResults([]);

        } finally {

          setSearchLoading(false);

        }

      }, 500);

    return () =>
      clearTimeout(timer);

  }, [search]);

  useEffect(() => {

  async function fetchTrending() {

    const res = await fetch(
      "/api/search?q=kdrama"
    );

    const data = await res.json();

    setApiShows(data);

  }

  fetchTrending();

}, []);
 

  /* FILTER */

  const filteredDramas =
    dramas.filter((drama) => {

      const matchesSearch =

        (drama.name || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesGenre =

        selectedGenre === "All" ||

        drama.genres?.some(
          (genre: any) =>

            genre.name === selectedGenre ||

            genre === selectedGenre
        );
      const matchesMood =

  selectedMood === "All" ||

  drama.moods?.includes(
    selectedMood
  );

      return (
  matchesSearch &&
  matchesGenre &&
  matchesMood
);

    });

  
  /* CATEGORIES */

  const featured =
    filteredDramas.slice(0, 5);

  const topRatedShows =

    [...filteredDramas]

      .sort(

        (a, b) =>

          (b.vote_average ||

            b.rating?.average ||

            0) -

          (a.vote_average ||

            a.rating?.average ||

            0)

      )

      .slice(0, 10);

  const trendingShows =
    filteredDramas.slice(0, 10);


  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      overflow-x-hidden
      relative
    "
    >

      {/* TOP GRADIENT */}

      <div
        className="
        absolute
        top-0
        left-0
        right-0
        h-40
        bg-gradient-to-b
        from-black
        to-transparent
        pointer-events-none
        z-40
      "
      />

      {/* NAVBAR */}

      <nav
        className="
        fixed
        top-0
        left-0
        right-0
        z-50
        flex
        items-center
        justify-between
        px-8
        py-5
        bg-black/30
        backdrop-blur-2xl
        border-b
        border-white/10
        transition-all
      "
      >

        {/* LOGO */}

        <h1
          className="
          text-4xl
          font-black
          tracking-wide
          bg-gradient-to-r
          from-pink-500
          via-fuchsia-500
          to-cyan-400
          bg-clip-text
          text-transparent
        "
        >

          Moodrama

        </h1>

        {/* RIGHT */}
         
          <Link
            href="/watchlist"

            className="
            bg-pink-500
            hover:bg-pink-600
            px-5
            py-3
            rounded-2xl
            font-bold
            transition-all
            duration-300
            hover:scale-105
            shadow-lg
            shadow-pink-500/20
          "
          >

            ⭐ My Watchlist

          </Link>

      </nav>

      {/* HERO */}

      <div className="pt-24">

        <HeroSlider
          dramas={featured}
        /> 
        </div>

     {/* SEARCH */}

<section className="px-8 py-12 relative z-30">

  <div className="max-w-2xl mx-auto">

    <SearchBar
      search={search}
      setSearch={setSearch}
    />

  </div>

</section>

 <section className="px-8 py-12">

  <h2 className="text-4xl font-black mb-8">
    🎬 Explore Categories
  </h2>

  <div className="flex gap-4 overflow-x-auto pb-2">

    <Link
      href="/top10"
      className="bg-cyan-500 p-4 rounded-2xl font-semibold text-center"
    >
      🏆 Top 10
    </Link>

    <Link
      href="/best-romance"
      className="bg-pink-500 p-4 rounded-2xl font-semibold text-center"
    >
      ❤️ Romance
    </Link>

    <Link
      href="/best-school"
      className="bg-blue-500 p-4 rounded-2xl font-semibold text-center"
    >
      🎓 School
    </Link>

    <Link
      href="/best-thriller"
      className="bg-red-500 p-4 rounded-2xl font-semibold text-center"
    >
      🔥 Thriller
    </Link>

    <Link
      href="/trending"
      className="bg-orange-500 p-4 rounded-2xl font-semibold text-center"
    >
      🔥 Trending
    </Link>

    <Link
      href="/most-reviewed"
      className="bg-cyan-500 p-4 rounded-2xl font-semibold text-center"
    >
      🏆 Most Reviewed
    </Link>

    <Link
      href="/top-rated"
      className="bg-yellow-500 p-4 rounded-2xl font-semibold text-center"
    >
      ⭐ Top Rated
    </Link>

    <Link
      href="/recommendations"
      className="bg-purple-500 p-4 rounded-2xl font-semibold text-center"
    >
      🎭 By Mood
    </Link>
    <Link href="/best-fantasy">
  <button className="bg-purple-500 px-5 py-3 rounded-xl">
    ✨ Fantasy
  </button>
</Link>

<Link href="/best-action">
  <button className="bg-red-500 px-5 py-3 rounded-xl">
    ⚔️ Action
  </button>
</Link>

<Link href="/best-historical">
  <button className="bg-amber-500 px-5 py-3 rounded-xl">
    🏯 Historical
  </button>
</Link>

<Link href="/best-revenge">
  <button className="bg-orange-500 px-5 py-3 rounded-xl">
    🔥 Revenge
  </button>
</Link>

<Link href="/best-chinese">
  <button className="bg-cyan-500 px-5 py-3 rounded-xl">
    🇨🇳 Chinese
  </button>
</Link>

  </div>

</section>

      

      {/* LOADING */}

      {loading && (

        <section className="px-8 py-16">

          <div
            className="
            flex
            gap-6
            overflow-hidden
          "
          >

            {Array.from({
              length: 5,
            }).map((_, index) => (

              <SkeletonCard
                key={index}
              />

            ))}

          </div>

        </section>

      )}

      {/* ROWS */}

      {!loading && (

        <main className="px-8 pb-20">

        <AnimatedSection>

  <DramaRow
    title="🏆 Top 10 Today"
    dramas={topToday}
    watchlist={watchlist}
    addToWatchlist={addToWatchlist}
    removeFromWatchlist={removeFromWatchlist}
  />

</AnimatedSection>

          <AnimatedSection>

            <DramaRow
              title="🔥 Trending Now"
              dramas={trendingShows}
              watchlist={watchlist}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
            />

          </AnimatedSection>

          <AnimatedSection>

            <DramaRow
              title="⭐ Top Rated"
              dramas={topRatedShows}
              watchlist={watchlist}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
              />
        </AnimatedSection>

        <AnimatedSection>

  <DramaRow
    title="🔥 Global Trending"
    dramas={apiTrending}
    watchlist={watchlist}
    addToWatchlist={addToWatchlist}
    removeFromWatchlist={removeFromWatchlist}
  />

</AnimatedSection>

<AnimatedSection>

  <DramaRow
    title="💖 Popular Romance"
    dramas={apiPopular}
    watchlist={watchlist}
    addToWatchlist={addToWatchlist}
    removeFromWatchlist={removeFromWatchlist}
  />

</AnimatedSection>
        </main>

)}
    </main>

  );

}