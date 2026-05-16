import dramas from "../../../data/dramas";

export default async function DramaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const drama = dramas.find(
    (d) => d.id === Number(id)
  );

  if (!drama) {
    return (
      <div className="text-white p-10">
        Drama not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-10 py-10">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <img
          src={drama.poster_path}
          alt={drama.name}
          className="w-full max-w-md rounded-3xl shadow-2xl"
        />

        <div>

          <p className="text-pink-500 font-semibold mb-2">
            {drama.genre} • {drama.year}
          </p>

          <h1 className="text-5xl font-bold mb-6">
            {drama.name}
          </h1>

          <p className="text-yellow-400 text-xl mb-6">
            ⭐ {drama.vote_average}
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            {drama.description}
          </p>

          <button className="mt-8 bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-2xl font-semibold transition">
            + Add to Watchlist
          </button>

        </div>

      </div>

    </main>
  );
}