"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../lib/firebase";


export default function MostReviewedPage() {

  const [dramas, setDramas] =
    useState<any[]>([]);

  useEffect(() => {

    async function loadData() {

      const snapshot =
        await getDocs(
          collection(
            db,
            "reviews"
          )
        );

      const reviews =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      const counts: any = {};

      const dramaMap: any = {};

      reviews.forEach(
        (review: any) => {

          const name =
            review.dramaName;

          counts[name] =
            (counts[name] || 0) + 1;

          if (review.drama) {

            dramaMap[name] =
              review.drama;

          }

        }
      );

      const sorted =
        Object.entries(counts)
          .map(
            ([name, count]) => ({

              drama:
                dramaMap[name],

              name,

              count,

            })
          )
          .filter(
            (item: any) =>
              item.drama
          )
          .sort(
            (a: any, b: any) =>
              Number(b.count) -
              Number(a.count)
          );

      setDramas(sorted);

    }

    loadData();

  }, []);

  if (dramas.length === 0) {

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

        Loading Most Reviewed...

      </div>

    );

  }

  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      px-8
      py-10
    "
    >

      <h1
        className="
        text-5xl
        font-black
        mb-10
      "
      >

        🏆 Most Reviewed Dramas

      </h1>

      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-5
        gap-6
      "
      >

        {dramas.map(
          (
            dramaItem: any,
            index: number
          ) => (

            <a
              key={index}

              href={`/drama/${dramaItem.drama.id}`}

              onClick={() => {

                localStorage.setItem(
                  "selectedDrama",
                  JSON.stringify(
                    dramaItem.drama
                  )
                );

              }}

              className="
              bg-zinc-900
              rounded-2xl
              overflow-hidden
              border
              border-white/10
              hover:border-pink-500
              hover:scale-105
              transition-all
            "
            >

              <div
                className="
                absolute
                z-10
                bg-pink-500
                px-3
                py-1
                rounded-br-xl
                font-bold
              "
              >

                #{index + 1}

              </div>

              <img
                src={
                  dramaItem.drama?.image
                    ?.medium ||

                  dramaItem.drama?.image
                    ?.original ||

                  "https://placehold.co/300x450"
                }

                alt={
                  dramaItem.name
                }

                className="
                w-full
                h-[320px]
                object-cover
              "
              />

              <div className="p-4">

                <h2
                  className="
                  font-bold
                  text-lg
                  line-clamp-2
                "
                >

                  {dramaItem.name}

                </h2>

                <p
                  className="
                  text-pink-400
                  mt-2
                "
                >

                  {dramaItem.count}
                  {" "}
                  reviews

                </p>

              </div>

            </a>

          )
        )}

      </div>

    </main>

  );

}