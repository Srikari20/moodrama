import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/tv/week",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          accept: "application/json",
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(data.results);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch dramas" },
      { status: 500 }
    );
  }
}