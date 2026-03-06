// app/routes/home.tsx
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import AuthButton from "../components/Login";
import Navbar from "../components/Navbar"
import MovieCard from "../components/MovieCard";
import { useWishlist } from "../components/Wishlist";

import movieData from "../public/movie.json";

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

  const { wishlist, toggleWishlist } = useWishlist();

   const isWishlisted = (movie: Movie) => wishlist.some((m) => m.title === movie.title);

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
      setData(movieData);
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



  return (
    <div className="min-h-screen bg-base-200">

      <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
        <Navbar />
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
            <MovieCard
              key={index}
              movie={movie}
              isWishlisted={isWishlisted(movie)}
              onToggleWishlist={toggleWishlist}
              />
            ))}
        </div>
          </>
        )}
      </div>
    </div>
  );
}
