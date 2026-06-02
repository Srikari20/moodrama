"use client";

import { useParams } from "next/navigation";

export default function WatchPage() {
  const params = useParams();

  const slug = params.slug as string;

  const dramaName = slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">

      <h1 className="text-5xl font-black mb-6">
        Where To Watch {dramaName}
      </h1>

      <div className="text-gray-300 text-lg max-w-3xl mb-10">
        Looking for where to watch {dramaName} online?
        Check these streaming services.
      </div>

      <div className="max-w-4xl mb-10">

        <h2 className="text-3xl font-bold mb-4">
          Watch {dramaName} Online
        </h2>

        <p className="text-gray-300 leading-8">
          Fans looking to stream {dramaName} can check
          Netflix, Viki, Prime Video, iQIYI and other
          streaming services. Availability may vary by
          country and region.
        </p>

        <p className="text-gray-300 leading-8 mt-4">
          Moodrama helps viewers discover where to watch
          Korean, Chinese, Japanese and Asian dramas online.
        </p>

      </div>

      <div className="flex flex-wrap gap-4">

        <a
          href={`https://www.netflix.com/search?q=${encodeURIComponent(
            dramaName
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold"
        >
          Netflix
        </a>

        <a
          href={`https://www.viki.com/search?q=${encodeURIComponent(
            dramaName
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-bold"
        >
          Viki
        </a>

        <a
          href={`https://www.iq.com/search?query=${encodeURIComponent(
            dramaName
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
        >
          iQIYI
        </a>

        <a
          href={`https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURIComponent(
            dramaName
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold"
        >
          Prime Video
        </a>

      </div>

    </main>
  );
}