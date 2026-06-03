import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://moodrama-4did.vercel.app/"; // replace with your actual Vercel URL

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/top10`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/most-reviewed`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/top-rated`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/best-romance`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/best-school`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/best-thriller`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
    },
  ];
}