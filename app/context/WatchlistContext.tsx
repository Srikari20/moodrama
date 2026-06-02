"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WatchlistContext = createContext<any>(null);

export function WatchlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [watchlist, setWatchlist] =
    useState<any[]>([]);

  useEffect(() => {

    const saved =
      localStorage.getItem("watchlist");

    if (saved) {

      setWatchlist(JSON.parse(saved));

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    );

  }, [watchlist]);

  const addToWatchlist = (drama: any) => {

    const exists = watchlist.find(
      (item) => item.id === drama.id
    );

    if (!exists) {

      setWatchlist([
        ...watchlist,
        drama,
      ]);

    }
  };

  const removeFromWatchlist = (
    id: number
  ) => {

    setWatchlist(
      watchlist.filter(
        (item) => item.id !== id
      )
    );
  };

  return (

    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >

      {children}

    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {

  return useContext(
    WatchlistContext
  );
}