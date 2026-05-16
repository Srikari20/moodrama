"use client";

import { useEffect, useState } from "react";
import DramaCard from "../components/DramaCard";

export default function Home() {

  const [dramas, setDramas] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState<any[]>([]);

  const [selectedGenre, setSelectedGenre] =
    useState("All");

  const [selectedMood, setSelectedMood] =
    useState("All");

  const genres = [
    "All",
    "Romance",
    "Fantasy",
    "Comedy",
  ];

  const moods = [
    "All",
    "Comfort",
    "Heartbreak",
    "Funny",
    "Healing",
    "Fantasy",
  ];

  const featuredDrama = dramas[0];

  useEffect(() => {

    async function loadDramas() {

      try {

        const res = await fetch("/api/dramas");

        const data = await res.json();

        setDramas(data.results || []);

      } catch (error) {

        console.error(error);

      }
    }

    loadDramas();

    const savedWatchlist =
      localStorage.getItem("watchlist");

    if (savedWatchlist) {

      setWatchlist(JSON.parse(savedWatchlist));

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    );

  }, [watchlist]);

  const filteredDramas = dramas.filter((drama) => {

    const matchesSearch =
      drama.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return matchesSearch;

  });

  const addToWatchlist = (drama: any) => {

    const alreadyAdded = watchlist.find(
      (item) => item.id === drama.id
    );

    if (!alreadyAdded) {

      setWatchlist([...watchlist, drama]);

    }
  };

  const removeFromWatchlist = (id: number) => {

    setWatchlist(
      watchlist.filter(
        (drama) => drama.id !== id
      )
    );
  };

  return (

    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-5 border-b border-gray-800 gap-4 md:gap-0">

        <h1 className="text-3xl font-bold text-pink-500">
          Moodrama
        </h1>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-gray-300">
          <button>Home</button>
          <button>Trending</button>
          <button>Watchlist</button>
          <button>Login</button>
        </div>

      </nav>

      {/* Hero */}
      <section
        className="
        relative
        min-h-[85vh]
        flex
        items-center
        px-4
        md:px-12
        overflow-hidden
      "
      >

        {/* Background Image */}
        {featuredDrama && (
          <img
            src={`https://image.tmdb.org/t/p/original${featuredDrama.poster_path}`}
            alt={featuredDrama.name}
            className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            opacity-30
          "
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl">

          <p className="text-pink-500 font-semibold mb-4">
            Featured Drama
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            {featuredDrama?.name}
          </h1>

          <p className="text-yellow-400 text-xl mt-6">
            ⭐ {featuredDrama?.vote_average?.toFixed(1)}
          </p>

          <p className="text-gray-300 text-lg mt-6 leading-relaxed">
            {featuredDrama?.overview}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">

            <button
              className="
              bg-pink-500
              hover:bg-pink-600
              px-8
              py-4
              rounded-2xl
              font-semibold
              transition
              hover:scale-105
            "
            >
              ▶ Watch Now
            </button>

            <button
              className="
              bg-white/10
              backdrop-blur-md
              border
              border-white/20
              px-8
              py-4
              rounded-2xl
              font-semibold
              transition
              hover:bg-white/20
            "
            >
              + My List
            </button>

          </div>

          {/* Search */}
          <div className="mt-12 flex flex-col sm:flex-row max-w-xl gap-3 sm:gap-0">

            <input
              type="text"
              placeholder="Search dramas..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
              flex-1
              px-5
              py-4
              rounded-xl
              sm:rounded-l-xl
              sm:rounded-r-none
              bg-gray-900/80
              border
              border-gray-700
              outline-none
              text-white
            "
            />

            <button
              className="
              bg-pink-500
              hover:bg-pink-600
              px-6
              rounded-xl
              sm:rounded-r-xl
              sm:rounded-l-none
              font-semibold
              transition
            "
            >
              Search
            </button>

          </div>

          {/* Genre Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">

            {genres.map((genre) => (

              <button
                key={genre}
                onClick={() =>
                  setSelectedGenre(genre)
                }
                className={`px-5 py-2 rounded-full transition ${
                  selectedGenre === genre
                    ? "bg-pink-500 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {genre}
              </button>

            ))}

          </div>

          {/* Mood Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">

            {moods.map((mood) => (

              <button
                key={mood}
                onClick={() =>
                  setSelectedMood(mood)
                }
                className={`px-5 py-2 rounded-full transition ${
                  selectedMood === mood
                    ? "bg-purple-500 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {mood}
              </button>

            ))}

          </div>

        </div>

      </section>

      {/* Trending */}
      <section className="px-4 md:px-8 pb-20">

        <h3 className="text-3xl font-bold mb-8">
          Trending Dramas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {filteredDramas.map((drama) => (

            <DramaCard
              key={drama.id}
              drama={drama}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
              watchlist={watchlist}
            />

          ))}

        </div>

      </section>

      {/* Watchlist */}
      <section className="px-4 md:px-8 pb-20">

        <h3 className="text-3xl font-bold mb-8">
          My Watchlist
        </h3>

        {watchlist.length === 0 ? (

          <p className="text-gray-400">
            No dramas added yet.
          </p>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {watchlist.map((drama) => (

              <DramaCard
                key={drama.id}
                drama={drama}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
                watchlist={watchlist}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}