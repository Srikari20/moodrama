import { NextResponse } from "next/server";

export async function GET() {

  try {

    const res = await fetch(

      "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc",

      {
        headers: {
          Authorization:
            `Bearer ${process.env.TMDB_TOKEN}`,
        },

        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) {

      throw new Error(
        "TMDB fetch failed"
      );

    }

    const data =
      await res.json();

    const asianShows =
      data.results.filter(
        (show: any) =>

          show.original_language === "ko" ||
          show.original_language === "ja" ||
          show.original_language === "zh"
      );

    return NextResponse.json(
      asianShows
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json([]);

  }

}