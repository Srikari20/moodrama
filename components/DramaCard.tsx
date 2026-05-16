import Link from "next/link";

type Drama = {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
};

export default function DramaCard({
  drama,
  addToWatchlist,
  removeFromWatchlist,
  watchlist,
}: {
  drama: Drama;
  addToWatchlist: (drama: Drama) => void;
  removeFromWatchlist: (id: number) => void;
  watchlist: Drama[];
}) {

  const isInWatchlist = watchlist.some(
    (item) => item.id === drama.id
  );

  return (
    <Link href={`/drama/${drama.id}`}>
      <div className="
      group bg-gray-900
rounded-2xl
overflow-hidden
transition-all
duration-500
hover:-translate-y-3
hover:shadow-[0_0_30px_rgba(236,72,153,0.35)]
">

        <img
          src={drama.poster_path}
          alt={drama.name}
          className="
w-full
h-80
object-cover
transition-transform
duration-500
group-hover:scale-110
"
        />

        <div className="p-4">
          <h4 className="
text-xl
font-semibold
transition-colors
duration-300
group-hover:text-pink-400
">
            {drama.name}
          </h4>

          <p className="text-gray-400 mt-2">
            ⭐ {drama.vote_average?.toFixed(1)}
          </p>

          {isInWatchlist ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFromWatchlist(drama.id);
              }}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg"
            >
              ✓ Added
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToWatchlist(drama);
              }}
              className="
mt-4
w-full
bg-pink-500
hover:bg-pink-600
py-2
rounded-lg
font-semibold
transition-all
duration-300
hover:scale-105
"
            >
              + Watchlist
            </button>
          )}

        </div>

      </div>
    </Link>
  );
}