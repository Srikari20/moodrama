import "./globals.css";

import {
  WatchlistProvider,
} from "./context/WatchlistContext";

export const metadata = {
  title: "Moodrama",
  description:
    "Discover your next favorite drama",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body>

        <WatchlistProvider>

          {children}

        </WatchlistProvider>

      </body>

    </html>
  );
}