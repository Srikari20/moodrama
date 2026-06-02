import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log(
      "TOKEN:",
      process.env.NEXT_PUBLIC_TMDB_API_KEY
    );

    const res = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          accept: "application/json",
        },
      }
    );

    const data = await res.json();

    console.log(data);

    return NextResponse.json(data);

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      error: "failed",
    });

  }
}