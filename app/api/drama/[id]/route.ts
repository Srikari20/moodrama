import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any
) {
  try {

    const id =
      context.params.id;

    /* TVMAZE DETAILS */

    const res = await fetch(
      `https://api.tvmaze.com/shows/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {

      return NextResponse.json(
        { error: "Drama not found" },
        { status: 404 }
      );

    }

    const data =
      await res.json();

    return NextResponse.json(data);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );

  }
}