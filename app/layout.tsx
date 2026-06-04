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

   <footer
    className="
    bg-black
    border-t
    border-white/10
    py-8
    mt-20
    text-center
    text-gray-400
    "
  >

    <p className="mb-4">

      © 2026 Moodrama

    </p>

    <div
      className="
      flex
      justify-center
      gap-6
      flex-wrap
      "
    >

      <a
        href="/about"
        className="hover:text-white"
      >
        About
      </a>

      <a
        href="/contact"
        className="hover:text-white"
      >
        Contact
      </a>

      <a
        href="/privacy-policy"
        className="hover:text-white"
      >
        Privacy Policy
      </a>

      <a
        href="/disclaimer"
        className="hover:text-white"
      >
        Disclaimer
      </a>

    </div>

  </footer>


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