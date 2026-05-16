export async function getTrendingDramas() {
  try {
    const res = await fetch("/api/dramas");

    const data = await res.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data;

  } catch (error) {
    console.error(error);
    return [];
  }
}