// app/routes/home.tsx
import { useState, useEffect } from "react";

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
  [key: string]: string | number | undefined;
}

export function meta() {
  return [
    { title: "Mango Movie Wishlister" },
    { name: "description", content: "Your final destination for movie wishlisting" },
  ];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [filter1, setFilter1] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  const filteredData = data
    .filter((movie) =>
      movie[filter1]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[filter1]?.toString().toLowerCase() ?? "";
      const valB = b[filter1]?.toString().toLowerCase() ?? "";
      return valA.localeCompare(valB);
    });

  async function fetchData() {
    try {
      const response = await fetch("./app/public/movie.json");
      if (!response.ok) throw new Error("failed to fetch");
      const myData = await response.json();
      setData(myData);
      setError(false);
    } catch (err) {
      setError(true);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const toggleWishlist = (movie: Movie) => {
    setWishlist((prev) =>
      prev.some((m) => m.title === movie.title)
        ? prev.filter((m) => m.title !== movie.title)
        : [...prev, movie]
    );
  };

  const isWishlisted = (movie: Movie) => wishlist.some((m) => m.title === movie.title);

  const downloadWishlist = () => {
    const text = wishlist
      .map(
        (movie) =>
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
      )
      .join("\n\n---\n\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wishlist.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-base-200">

      <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
        <div className="flex-1 flex items-center gap-2">
          <img src="./app/public/MovieIcon.png" className="w-8 h-8 object-contain"/>
          <span className="text-xl font-bold tracking-tight">Movie Wishlister</span>
        </div>

        <div className="flex-none flex items-center gap-2">
          <button
            onClick={downloadWishlist}
            disabled={wishlist.length === 0}
            className="btn btn-ghost btn-sm"
            title="Download wishlist"
          >
            Download
          </button>
          <div className="indicator">
            <span className="indicator-item badge badge-sm badge-primary">
              {wishlist.length}
            </span>
            <button className="btn btn-ghost btn-sm gap-1">Wishlist</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="card bg-base-100 shadow-sm mb-8">
          <div className="card-body flex flex-col sm:flex-row gap-3 items-end p-4">
            <div className="form-control w-full sm:w-48">
              <label className="label pb-1">
                <span className="label-text text-xs font-semibold uppercase tracking-wide">Filter by</span>
              </label>
              <select
                value={filter1}
                onChange={(e) => setFilter1(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="title">Title</option>
                <option value="director">Director</option>
                <option value="releasing_year">Year Released</option>
                <option value="language">Language</option>
                <option value="runtime">Runtime</option>
                <option value="age_group">Age Group</option>
                <option value="short_description">Description</option>
                <option value="genre">Genre</option>
                <option value="budget">Budget</option>
                <option value="imdb_rating">IMDB Rating</option>
              </select>
            </div>

            <div className="form-control flex-1">
              <label className="label pb-1">
                <span className="label-text text-xs font-semibold uppercase tracking-wide">Search</span>
              </label>
              <input
                type="search"
                placeholder={`Search by ${filter1}...`}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered input-sm w-full"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center gap-4 py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 text-base-content/50">
            <span>Failed to load movies. Please try again.</span>
          </div>
        )}

        {/* No results */}
        {!isLoading && !error && filteredData.length === 0 && (
          <div className="text-center py-20 text-base-content/50">
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm">No movies matched {searchQuery} in {filter1}</p>
          </div>
        )}

        {!isLoading && !error && filteredData.length > 0 && (
          <>
            <p className="text-sm text-base-content/50 mb-4">
              {filteredData.length} movie{filteredData.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((movie, index) => (
                <div key={index} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="card-body p-4">
                    <h2 className="card-title text-xl leading-snug badge badge-neutral">{movie.title}</h2>

                    <div className="flex flex-col items-center gap-2 mt-2">
                      {movie.director && <span className="badge-soft">Director: {movie.director}</span>}
                      {movie.genre && <span className="badge-soft">Genre: {movie.genre}</span>}
                      {movie.releasing_year && <span className="badge-soft">Release Year: {movie.releasing_year}</span>}
                      {movie.imdb_rating && <span className="badge-soft">IMDB Rating: {movie.imdb_rating}</span>}
                      {movie.runtime && <span className="badge-soft">Runtime: {movie.runtime}</span>}
                      {movie.age_group && <span className="badge-soft">Age group: {movie.age_group}</span>}
                      {movie.language && <span className="badge-soft">Language: {movie.language}</span>}
                      {movie.budget && <span className="badge-soft">Budget: {movie.budget}</span>}
                    </div>

                    {movie.short_description && (
                      <p className="text-sm mt-4">{movie.short_description}</p>
                    )}

                    <div className="card-actions justify-end mt-3">
                      <button
                        onClick={() => toggleWishlist(movie)}
                        className={`btn btn-sm ${isWishlisted(movie) ? "btn-primary" : "btn-outline"}`}
                      >
                        {isWishlisted(movie) ? "Remove from Wishlist" : "Add to Wishlist"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}