import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (movie) => {
    setWishlist((prev) =>
      prev.some((m) => m.title === movie.title)
        ? prev.filter((m) => m.title !== movie.title)
        : [...prev, movie]
    );
  };

  const downloadWishlist = () => {
    const text = wishlist.map((movie) =>
      `Movie Name: ${movie.title || "N/A"}\nDirector: ${movie.director || "N/A"}`
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

export function useWishlist() {
  return useContext(WishlistContext);
}