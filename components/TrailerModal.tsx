"use client";

export default function TrailerModal({
  trailerKey,
  onClose,
}: any) {

  if (!trailerKey) return null;

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/90
      z-[9999]
      flex
      items-center
      justify-center
      p-4
    "
    >

      {/* CLOSE */}

      <button
        onClick={onClose}

        className="
        absolute
        top-6
        right-6
        text-white
        text-4xl
        font-bold
        hover:text-pink-500
        transition
        z-50
      "
      >

        ✕

      </button>

      {/* VIDEO */}

      <div
        className="
        w-full
        max-w-6xl
        aspect-video
        rounded-3xl
        overflow-hidden
        shadow-2xl
        border
        border-white/10
      "
      >

        <iframe
          width="100%"
          height="100%"

          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}

          title="Trailer"

          allow="autoplay; encrypted-media"

          allowFullScreen

          className="w-full h-full"
        />

      </div>

    </div>

  );

}