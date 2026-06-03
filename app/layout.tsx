import "./globals.css";
import Script from "next/script";

import {
  WatchlistProvider,
} from "./context/WatchlistContext";

export const metadata = {
  title: "Moodrama",
  description: "Discover your next favorite drama",

  verification: {
    google:
      "3jwBjGfkW4hxU4thgZXgNjv2ueozFILzLiMCnw7q6d8",
  },
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

  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-3DZ2V5YXXN"
    strategy="afterInteractive"
  />

  <Script
    id="google-analytics"
    strategy="afterInteractive"
  >
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-3DZ2V5YXXN');
    `}
  </Script>

</body>

    </html>
  );
}