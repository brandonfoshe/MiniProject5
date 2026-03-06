import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Movie {
  title?: string;
  director?: string;
  genre?: string;
  releasing_year?: string | number;
  imdb_rating?: string | number;
  runtime?: string;
  age_group?: string;
  language?: string;
  budget?: string;
  short_description?: string;
}

interface WishlistContextType {
  wishlist: Movie[];
  toggleWishlist: (movie: Movie) => void;
  downloadWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  const toggleWishlist = (movie: Movie) => {
    setWishlist((prev) =>
      prev.some((m) => m.title === movie.title)
        ? prev.filter((m) => m.title !== movie.title)
        : [...prev, movie]
    );
  };

  const downloadWishlist = () => {
    const text = wishlist.map((movie) =>
`Movie Name: ${movie.title || "N/A"}
Director: ${movie.director || "N/A"}
Genre: ${movie.genre || "N/A"}
Release Year: ${movie.releasing_year || "N/A"}
IMDB Rating: ${movie.imdb_rating || "N/A"}
Runtime: ${movie.runtime || "N/A"}
Age Group: ${movie.age_group || "N/A"}
Language: ${movie.language || "N/A"}
Budget: ${movie.budget || "N/A"}
Short Description: ${movie.short_description || "N/A"}`
    ).join("\n\n---\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wishlist.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, downloadWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}