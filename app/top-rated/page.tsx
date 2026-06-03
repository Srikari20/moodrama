"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

export const metadata = {
  title: "Top Rated Dramas By Community | Moodrama",
  description:
    "Explore the highest-rated dramas based on community reviews and ratings.",
};

export default function TopRatedPage() {

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
          (doc) => doc.data()
        );

      const stats: any = {};

      reviews.forEach(
        (review: any) => {

          const name =
            review.dramaName;

          if (!stats[name]) {

            stats[name] = {

              total: 0,
              count: 0,
              dramaId:
                review.dramaId,

            };

          }

          stats[name].total +=
            Number(
              review.rating
            );

          stats[name].count += 1;

        }
      );

      const ranked =
        Object.entries(stats)
          .map(
            ([name, data]: any) => ({

              name,

              dramaId:
                data.dramaId,

              average:
                (
                  data.total /
                  data.count
                ).toFixed(1),

              reviews:
                data.count,

            })
          )
          .sort(
            (a: any, b: any) =>
              Number(b.average) -
              Number(a.average)
          );

      setDramas(ranked);

    }

    loadData();

  }, []);

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

        ⭐ Top Rated By Community

      </h1>

      <div className="space-y-5">

        {dramas.map(
          (
            drama: any,
            index: number
          ) => (

            <a
              key={index}
  href={`https://www.google.com/search?q=${encodeURIComponent(
    drama.name + " drama"
  )}`}
  target="_blank"
  rel="noopener noreferrer"
              className="
              block
              bg-zinc-900
              p-5
              rounded-2xl
              border
              border-white/10
              hover:border-yellow-400
              hover:scale-[1.02]
              transition-all
            "
            >

              <h2
                className="
                text-2xl
                font-bold
              "
              >

                #{index + 1}
                {" "}
                {drama.name}

              </h2>

              <p className="text-yellow-400 mt-2">

                ⭐ {drama.average}/10

              </p>

              <p className="text-gray-400">

                {drama.reviews}
                {" "}
                reviews

              </p>

            </a>

          )
        )}

      </div>

    </main>

  );

}