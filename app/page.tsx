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
 
/*moods*/

  const moods = [

  "All",

  "Heartbroken",

  "Feel Good",

  "Healing",

  "Emotional",

  "Dark",

  "Cozy",

  "Romantic",

  "Revenge",

  "Mystery",

  "Thrilling",

];
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

        <div className="flex items-center gap-4">

          <Link
  href="/top10"
  className="
  bg-cyan-500
  hover:bg-cyan-600
  px-5
  py-3
  rounded-2xl
  font-bold
  transition-all
  "
>
  🏆 Top 10
</Link>

<Link href="/best-romance">
  <button className="bg-pink-500 px-5 py-3 rounded-xl">
    ❤️ Romance
  </button>
</Link>

<Link href="/best-school">
  <button className="bg-cyan-500 px-5 py-3 rounded-xl">
    🎓 School
  </button>
</Link>

<Link href="/best-thriller">
  <button className="bg-red-500 px-5 py-3 rounded-xl">
    🔥 Thriller
  </button>
</Link>

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

          <Link
  href="/trending"
  className="
  bg-orange-500
  hover:bg-orange-600
  px-5
  py-3
  rounded-2xl
  font-bold
  transition-all
  "
>

  🔥 Trending

</Link>

          <Link
  href="/most-reviewed"
  className="
  bg-cyan-500
  hover:bg-cyan-600
  px-5
  py-3
  rounded-2xl
  font-bold
  transition-all
  "
>

  🏆 Most Reviewed

</Link>
<Link
  href="/top-rated"
  className="
  bg-yellow-500
  hover:bg-yellow-600
  px-5
  py-3
  rounded-2xl
  font-bold
  transition-all
  "
>

  ⭐ Top Rated

</Link>

        </div>

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


      {/* mood FILTERS */}

<section className="px-8 pb-10">

  <h2
    className="
    text-2xl
    font-black
    mb-5
  "
  >

    ✨ Browse By Mood

  </h2>

  <div
    className="
    flex
    gap-4
    overflow-x-auto
    scrollbar-hide
  "
  >

    {moods.map((mood) => (

      <button
        key={mood}

        onClick={() =>
          setSelectedMood(mood)
        }

        className={`
          px-6
          py-3
          rounded-2xl
          font-bold
          whitespace-nowrap
          transition-all
          duration-300

          ${
            selectedMood === mood

              ? `
                bg-cyan-500
                text-white
                shadow-lg
                shadow-cyan-500/30
                scale-105
              `

              : `
                bg-zinc-900
                text-gray-300
                hover:bg-zinc-800
              `
          }
        `}
      >

        {mood}

      </button>

    ))}

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
<footer
  className="
  border-t
  border-white/10
  mt-20
  py-10
  text-center
  text-gray-400
  "
>

  <div className="flex justify-center gap-8 flex-wrap">

    <Link href="/about">
      About
    </Link>

    <Link href="/privacy-policy">
      Privacy Policy
    </Link>

    <Link href="/disclaimer">
      Disclaimer
    </Link>

    <Link href="/contact">
      Contact
    </Link>

  </div>

</footer>
    </main>

  );

}