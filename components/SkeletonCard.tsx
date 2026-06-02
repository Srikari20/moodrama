export default function SkeletonCard() {

  return (

    <div
      className="
      min-w-[280px]
      rounded-3xl
      overflow-hidden
      bg-zinc-900
      animate-pulse
      border
      border-zinc-800
    "
    >

      <div
        className="
        h-[420px]
        bg-zinc-800
      "
      />

      <div className="p-5">

        <div
          className="
          h-7
          w-40
          bg-zinc-800
          rounded-lg
          mb-4
        "
        />

        <div
          className="
          h-5
          w-20
          bg-zinc-800
          rounded-lg
          mb-5
        "
        />

        <div
          className="
          h-12
          bg-zinc-800
          rounded-2xl
        "
        />

      </div>

    </div>

  );

}