export function getDramaImage(drama: any) {

  if (drama?.poster_path) {
    return `https://image.tmdb.org/t/p/w500${drama.poster_path}`;
  }

  if (drama?.image?.original) {
    return drama.image.original;
  }

  return "https://placehold.co/600x900/111111/FFFFFF/png?text=Moodrama";
}

export function getBackdropImage(drama: any) {

  if (drama?.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${drama.backdrop_path}`;
  }

  if (drama?.backdrop) {
    return drama.backdrop;
  }

  if (drama?.poster_path) {
    return `https://image.tmdb.org/t/p/original${drama.poster_path}`;
  }

  if (drama?.image?.original) {
    return drama.image.original;
  }

  return "https://placehold.co/1920x1080/111111/FFFFFF/png?text=Moodrama";
}