import { NextResponse } from "next/server";

export async function GET(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url);

    const query =
      searchParams.get("q");

    if (!query) {

      return NextResponse.json([]);
    }

    const res = await fetch(

      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,

      {
        cache: "no-store",
      }

    );

    if (!res.ok) {

      return NextResponse.json([]);
    }

    const data =
      await res.json();

    const formatted =
      data.map((item: any) => ({
        ...item.show,
      }));

    return NextResponse.json(
      formatted
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json([]);
  }
}