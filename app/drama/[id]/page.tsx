
"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import recentShows from "../../../data/recent";

import { db } from "../../../lib/firebase";

import {
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getDramaImage,
} from "../../../utils/getImage";

import { useWatchlist } from "../../context/WatchlistContext";

export default function DramaPage() {

  const params = useParams();

  const id = params.id as string;

  const [drama, setDrama] =
    useState<any>(null);

  const [cast, setCast] =
  useState<any[]>([]);

  const [reviews, setReviews] =
  useState<any[]>([]);

  const averageRating =
  reviews.length > 0
    ? reviews.reduce(
        (sum: number, review: any) =>
          sum + Number(review.rating),
        0
      ) / reviews.length
    : 0;
const reviewCount =
  reviews.length;

const [comment, setComment] =
  useState("");

const [rating, setRating] =
  useState(10);

  const [similarShows, setSimilarShows] =
  useState<any[]>([]);

  const [peopleAlsoWatched, setPeopleAlsoWatched] =
  useState<any[]>([]);

  

  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useWatchlist();

  /* LOAD DRAMA */

  async function loadCast(
  dramaName: string
) {

  try {

    const searchRes =
      await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
          dramaName
        )}`
      );

    const searchData =
      await searchRes.json();

    if (
      !searchData ||
      searchData.length === 0
    ) return;

    const showId =
      searchData[0].show.id;

    const castRes =
      await fetch(
        `https://api.tvmaze.com/shows/${showId}/cast`
      );

    const castData =
      await castRes.json();

    const formattedCast =
      castData.map((item: any) => ({

        id: item.person?.id,

        name: item.person?.name,

        character:
          item.character?.name,

        profile_path:
          item.person?.image?.medium ||

          null,

      }));

    setCast(formattedCast);

  } catch (error) {

    console.error(error);

  }

}
async function loadSimilarShows(
  dramaName: string
) {

  try {

    const res =
      await fetch(
        `/api/search?q=${encodeURIComponent(
          dramaName
        )}`
      );

    const data =
      await res.json();

    const filtered =
      data
        ?.filter(
          (show: any) =>
            show.name !== dramaName
        )
        ?.slice(0, 8);

    setSimilarShows(filtered);

  } catch (error) {

    console.error(error);

  }

}

async function loadPeopleAlsoWatched(
  genre: string
) {

  try {

    const res =
      await fetch(
        `/api/search?q=${encodeURIComponent(
          genre
        )}`
      );

    const data =
      await res.json();

    const filtered =
      data.slice(0, 8);

    setPeopleAlsoWatched(
      filtered
    );

  } catch (error) {

    console.error(error);

  }

}

async function testFirestore() {

  try {

    await addDoc(
      collection(db, "reviews"),
      {

        dramaId: drama.id,

        dramaName: drama.name,

        rating: 10,

        comment:
          "Firestore Test Successful",

      }
    );

    alert(
      "Review saved!"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Firestore Error"
    );

  }

}
/*reviews*/
async function loadReviews(
  dramaId: string
) {

  const q = query(
    collection(db, "reviews"),
    where("dramaId", "==", dramaId)
  );

  const snapshot =
    await getDocs(q);

  const reviewList =
    snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

  setReviews(reviewList);

}
async function submitReview() {

  if (!comment.trim()) return;

 await addDoc(
  collection(db, "reviews"),
  {
    dramaId:
      drama.id.toString(),

    dramaName:
      drama.name,

    dramaData:
      drama,

    rating,

    comment,

    likes: 0,

    createdAt:
      Date.now(),
  }
);

  setComment("");
  setRating(10);

  loadReviews(
    drama.id.toString()
  );

}

async function likeReview(
  reviewId: string
) {

  const reviewRef =
    doc(
      db,
      "reviews",
      reviewId
    );

  await updateDoc(
    reviewRef,
    {
      likes:
        increment(1),
    }
  );

  loadReviews(
    drama.id.toString()
  );

}
/*Use effect */

useEffect(() => {

  async function loadDrama() {

    /* LOCAL STORAGE */

    const savedDrama =
      localStorage.getItem(
        "selectedDrama"
      );

    if (savedDrama) {

      const parsedDrama =
        JSON.parse(savedDrama);

      if (
        parsedDrama.id.toString() === id
      ) {

        setDrama(parsedDrama);

        loadCast(
          parsedDrama.name
        );

        loadSimilarShows(
          parsedDrama.name
        );

        loadPeopleAlsoWatched(
          parsedDrama.genres?.[0] ||
          "Drama"
        );

        loadReviews(
          parsedDrama.id.toString()
        );

        return;
      }
    }

    /* RECENT SHOWS */

    const localDrama =
      recentShows.find(
        (d) =>
          d.id.toString() === id
      );

    if (localDrama) {

      setDrama(localDrama);

      loadCast(
        localDrama.name
      );

      loadSimilarShows(
        localDrama.name
      );

      loadPeopleAlsoWatched(
        localDrama.genres?.[0] ||
        "Drama"
      );

      loadReviews(
        localDrama.id.toString()
      );

      return;
    }

    /* FIRESTORE FALLBACK */

    const q = query(
      collection(db, "reviews"),
      where("dramaId", "==", id)
    );

    const snapshot =
      await getDocs(q);

    if (!snapshot.empty) {

      const reviewData =
        snapshot.docs[0].data();

      if (reviewData.dramaData) {

        const firestoreDrama =
          reviewData.dramaData;

        setDrama(
          firestoreDrama
        );

        loadCast(
          firestoreDrama.name
        );

        loadSimilarShows(
          firestoreDrama.name
        );

        loadPeopleAlsoWatched(
          firestoreDrama.genres?.[0] ||
          "Drama"
        );

        loadReviews(id);

        return;
      }
    }
  }

  if (id) {

    loadDrama();

  }

}, [id]);
  /* LOADING */

  if (!drama) {

    return (

      <div
        className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        text-3xl
      "
      >

        Loading...

      </div>

    );

  }

  /* WATCHLIST */

  const isInWatchlist =
    watchlist.some(
      (item: any) =>
        item.id === drama.id
    );

  /* IMAGES */

  const imageUrl =
    getDramaImage(drama);

  const backdropUrl =
    drama?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${drama.backdrop_path}`
      : imageUrl;

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}

      <section
        className="
        relative
        min-h-screen
        overflow-hidden
      "
      >

        {/* BACKDROP */}

        <div className="absolute inset-0">

          <img
            src={backdropUrl}
            loading="eager"
            alt={drama.name}

            className="
            w-full
            h-full
            object-cover
            opacity-50
            scale-100
          "

            onError={(e) => {

              (
                e.currentTarget as HTMLImageElement
              ).src = imageUrl;

            }}
          />

        </div>

        {/* OVERLAY */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/70
          to-black/10
        "
        />

        {/* CONTENT */}

        <div
          className="
          relative
          z-10
          flex
          items-end
          min-h-screen
          px-8
          py-20
        "
        >

          <div
            className="
            flex
            flex-col
            md:flex-row
            gap-10
            items-center
            md:items-end
          "
          >

            {/* POSTER */}

            <div
              className="
              relative
              w-[260px]
              h-[390px]
              rounded-3xl
              overflow-hidden
              shadow-2xl
              border
              border-gray-800
              flex-shrink-0
            "
            >

              <img
                src={imageUrl}
                alt={drama.name}

                className="
                w-full
                h-full
                object-cover
              "

                onError={(e) => {

                  (
                    e.currentTarget as HTMLImageElement
                  ).src =
                    "https://placehold.co/600x900/111111/FFFFFF/png?text=Moodrama";

                }}
              />

            </div>

            {/* INFO */}

            <div className="max-w-3xl">

              <p
                className="
                text-pink-500
                font-bold
                mb-4
                text-lg
                tracking-widest
              "
              >

                MOODRAMA ORIGINAL

              </p>

              <h1
                className="
                text-5xl
                md:text-7xl
                font-black
                leading-tight
                mb-6
              "
              >

                {drama.name}

              </h1>

              {/* META */}

              <div
                className="
                flex
                gap-6
                text-lg
                mb-8
                flex-wrap
              "
              >

                <p className="text-yellow-400">

                  ⭐ {

                    drama.vote_average ||

                    drama.rating?.average ||

                    "N/A"

                  }

                </p>

                <p className="text-cyan-400">

                  🌏 {

                    drama.original_language ||

                    drama.language ||

                    "Unknown"

                  }

                </p>

                <p className="text-green-400">

                  🎭 {

                    drama.genres?.[0]?.name ||

                    drama.genres?.[0] ||

                    "Drama"

                  }

                </p>

              </div>

              {/* GENRES */}

              {drama.genres?.length > 0 && (

                <div
                  className="
                  flex
                  gap-3
                  flex-wrap
                  mb-8
                "
                >

                  {drama.genres.map(
                    (genre: any) => (

                      <span
                        key={
                          genre.id || genre
                        }

                        className="
                        bg-pink-500/20
                        border
                        border-pink-500/30
                        px-4
                        py-2
                        rounded-xl
                        text-sm
                        font-semibold
                        backdrop-blur-md
                      "
                      >

                        {genre.name || genre}

                      </span>

                    )
                  )}

                </div>

              )}

              {/* EXTRA INFO */}

              <div
                className="
                flex
                flex-wrap
                gap-4
                mb-8
              "
              >

                {/* STATUS */}

                {drama.status && (

                  <div
                    className="
                    bg-white/10
                    backdrop-blur-md
                    px-5
                    py-3
                    rounded-2xl
                    border
                    border-white/10
                  "
                  >

                    📡 {drama.status}

                  </div>

                )}

                {/* RUNTIME */}

                {(drama.runtime ||
                  drama.averageRuntime) && (

                  <div
                    className="
                    bg-white/10
                    backdrop-blur-md
                    px-5
                    py-3
                    rounded-2xl
                    border
                    border-white/10
                  "
                  >

                    ⏱ Runtime:
                    {" "}
                    {
                      drama.runtime ||
                      drama.averageRuntime
                    }
                    mins

                  </div>

                )}

              </div>

              {/* WATCH LINKS */}

              <div className="mb-10">

                <h3
                  className="
                  text-2xl
                  font-bold
                  mb-5
                "
                >

                  📺 Watch Now

                </h3>

              <a
  href={`/watch/${drama.name
    .toLowerCase()
    .replaceAll(" ", "-")}`}
  className="
  inline-block
  mb-4
  text-pink-400
  hover:text-pink-300
  font-semibold
"
>

  🔎 Where can I watch {drama.name}?

</a>

                <div className="flex flex-wrap gap-4">

                  <a
                    href={`https://www.netflix.com/search?q=${encodeURIComponent(
                      drama.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    bg-red-600
                    hover:bg-red-700
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                    transition-all
                    hover:scale-105
                    shadow-lg
                  "
                  >

                    Netflix

                  </a>

                  <a
                    href={`https://www.viki.com/search?q=${encodeURIComponent(
                      drama.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    bg-blue-500
                    hover:bg-blue-600
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                    transition-all
                    hover:scale-105
                    shadow-lg
                  "
                  >

                    Viki

                  </a>

                  <a
                    href={`https://wetv.vip/en/search?q=${encodeURIComponent(
                      drama.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    bg-emerald-500
                    hover:bg-emerald-600
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                    transition-all
                    hover:scale-105
                    shadow-lg
                  "
                  >

                    WeTV

                  </a>

                  <a
                    href={`https://www.iq.com/search?query=${encodeURIComponent(
                      drama.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    bg-green-500
                    hover:bg-green-600
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                    transition-all
                    hover:scale-105
                    shadow-lg
                  "
                  >

                    iQIYI

                  </a>
                  {/* PRIME VIDEO */}
<a
  href={`https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURIComponent(
    drama.name
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg"
>
  Prime Video
</a>

{/* DISNEY */}
<a
  href={`https://www.disneyplus.com/search/${encodeURIComponent(
    drama.name
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg"
>
  Disney+
</a>

{/* YOUTUBE */}
<a
  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
    drama.name + " full episodes"
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg"
>
  YouTube
</a>

{/* MORE */}
<a
  href={`https://www.google.com/search?q=${encodeURIComponent(
    `${drama.name} watch online`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg"
>
  More Sources
</a>          

                </div>

              </div>

    

{/* CAST */}

<div className="mb-10">

  <h2 className="text-3xl font-bold mb-6">

    CAST TEST

  </h2>

  <p className="text-red-500 mb-4">

    Cast Count: {cast.length}

  </p>

  <div className="flex flex-wrap gap-5">

    {cast.slice(0, 10).map(
      (actor: any, index: number) => (

        <div
          key={index}
          className="w-[120px]"
        >

          <img
            src={
              actor.profile_path ||

              actor.person?.image?.medium ||

              "https://placehold.co/200x200"
            }

            alt="actor"

            className="
            w-[120px]
            h-[120px]
            object-cover
            rounded-xl
          "
          />

          <p className="text-sm mt-2">

            {
              actor.name ||
              actor.person?.name
            }

          </p>

        </div>

      )
    )}

  </div>

</div>

{/* COMMUNITY RATING */}

<div
  className="
  mb-10
  bg-zinc-900
  border
  border-white/10
  rounded-3xl
  p-6
  "
>

  <h2
    className="
    text-2xl
    font-bold
    mb-3
    "
  >

    ⭐ Community Rating

  </h2>

  <div
    className="
    flex
    items-center
    gap-4
    "
  >

    <span
      className="
      text-5xl
      font-black
      text-yellow-400
      "
    >

      {averageRating
        ? averageRating.toFixed(1)
        : "N/A"}

    </span>

    <div>

      <p className="text-lg">

        /10

      </p>

      <p className="text-gray-400">

        Based on
        {" "}
        {reviewCount}
        {" "}
        reviews

      </p>

    </div>

  </div>

</div>


              {/* DESCRIPTION */}

              <div
                className="
                text-gray-300
                text-lg
                leading-relaxed
                max-w-3xl
              "

                dangerouslySetInnerHTML={{
                  __html:

                    drama.overview ||

                    drama.summary ||

                    "No description available.",
                }}
              />

              {/* BUTTONS */}

              <div className="flex gap-4 mt-10 flex-wrap">

            

                {/* TRAILER */}

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                    drama.name + " trailer"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <button
                    className="
                    bg-pink-500
                    hover:bg-pink-600
                    px-8
                    py-4
                    rounded-2xl
                    text-lg
                    font-bold
                    transition
                  "
                  >

                    ▶ Watch Trailer

                  </button>

                </a>

                {/* WATCHLIST */}

                {isInWatchlist ? (

                  <button
                    onClick={() =>
                      removeFromWatchlist(
                        drama.id
                      )
                    }

                    className="
                    bg-red-500
                    hover:bg-red-600
                    px-8
                    py-4
                    rounded-2xl
                    text-lg
                    font-bold
                    transition
                  "
                  >

                    Remove Watchlist

                  </button>

                ) : (

                  <button
                    onClick={() =>
                      addToWatchlist(drama)
                    }

                    className="
                    bg-cyan-500
                    hover:bg-cyan-600
                    px-8
                    py-4
                    rounded-2xl
                    text-lg
                    font-bold
                    transition
                  "
                  >

                    + Add Watchlist

                  </button>

                )}

              
              </div>

              <button
  onClick={testFirestore}
  className="
    bg-green-500
    hover:bg-green-600
    px-8
    py-4
    rounded-2xl
    text-lg
    font-bold
  "
>

  🔥 Test Firestore

</button>

<div className="mt-12">
  <div
  className="
  bg-zinc-900
  border
  border-white/10
  rounded-3xl
  p-6
  mb-8
"
>

  <div className="text-4xl font-black text-yellow-400">

    ⭐ {averageRating}

  </div>

  <p className="text-gray-400 mt-2">

    Based on {reviews.length} reviews

  </p>

</div>

  <h2
    className="
    text-3xl
    font-bold
    mb-6
  "
  >
    ⭐ Reviews
  </h2>
  

  <input
    type="number"
    min="1"
    max="10"
    value={rating}
    onChange={(e) =>
      setRating(
        Number(e.target.value)
      )
    }
    className="
    bg-zinc-900
    p-3
    rounded-xl
    mb-4
    w-24
  "
  />
  

  <textarea
    value={comment}
    onChange={(e) =>
      setComment(
        e.target.value
      )
    }
    placeholder="Write review..."
    className="
    w-full
    bg-zinc-900
    p-4
    rounded-2xl
    mb-4
  "
  />

  <button
    onClick={submitReview}
    className="
    bg-pink-500
    px-6
    py-3
    rounded-xl
    font-bold
  "
  >
    Post Review
  </button>

</div>
<div className="mt-8">

  {reviews.map(
    (review: any) => (

      <div
        key={review.id}
        className="
        bg-zinc-900
        p-5
        rounded-2xl
        mb-4
      "
      >
      <div className="text-yellow-400 mb-2">

  {"⭐".repeat(review.rating)}

</div>

        <p className="text-yellow-400">

          ⭐ {review.rating}/10

        </p>

        <p className="mt-2">

          {review.comment}

        </p>
        <div className="mt-4">

  <button
    onClick={() =>
      likeReview(
        review.id
      )
    }

    className="
    bg-pink-500/20
    px-4
    py-2
    rounded-xl
    hover:bg-pink-500/30
  "
  >

    👍 {review.likes || 0}

  </button>

</div>

      </div>

    )
  )}

</div>
{/* SIMILAR SHOWS */}

{similarShows.length > 0 && (

  <div className="mb-14">

    <h2
      className="
      text-3xl
      font-bold
      mb-6
    "
    >

      🔥 Similar Dramas

    </h2>

    <div
      className="
      flex
      gap-5
      overflow-x-auto
      pb-4
    "
    >

      {similarShows.map(
        (show: any) => (

          <a
            key={show.id}

            href={`/drama/${show.id}`}
            onClick={() => {

  localStorage.setItem(
    "selectedDrama",
    JSON.stringify(show)
  );

}}

            className="
            min-w-[180px]
            bg-zinc-900
            rounded-2xl
            overflow-hidden
            hover:scale-105
            transition-all
            border
            border-white/10
          "
          >

            <img
              src={
                show.image?.medium ||

                "https://placehold.co/300x450"
              }

              alt={show.name}

              className="
              w-full
              h-[260px]
              object-cover
            "
            />

            <div className="p-4">

              <h3
                className="
                font-bold
                line-clamp-2
              "
              >

                {show.name}

              </h3>

            </div>

          </a>

        )
      )}

    </div>

  </div>

)}

{peopleAlsoWatched.length > 0 && (

  <div className="mb-14">

    <h2
      className="
      text-3xl
      font-bold
      mb-6
      "
    >

      👥 People Also Watched

    </h2>

    <div
      className="
      flex
      gap-5
      overflow-x-auto
      pb-4
      "
    >

      {peopleAlsoWatched.map(
        (show: any) => (

          <a
            key={show.id}

            href={`/drama/${show.id}`}

            className="
            min-w-[180px]
            bg-zinc-900
            rounded-2xl
            overflow-hidden
            hover:scale-105
            transition-all
            border
            border-white/10
            "
          >

            <img
              src={
                show.image?.medium ||

                "https://placehold.co/300x450"
              }

              alt={show.name}

              className="
              w-full
              h-[260px]
              object-cover
              "
            />

            <div className="p-4">

              <h3
                className="
                font-bold
                line-clamp-2
                "
              >

                {show.name}

              </h3>

            </div>

          </a>

        )
      )}

    </div>

  </div>

)}

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}
