import { Link } from "react-router";
import { useWishlist } from "../componenets/Wishlist";
import Navbar from "~/componenets/Navbar";

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

export default function WishlistPage() {
  const { wishlist, toggleWishlist, downloadWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-base-200">

      <Navbar/>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-base-content/40">
            <p className="text-2xl font-semibold">Your wishlist is empty</p>
            <p className="text-sm mt-2">Head back home and add some movies you want to watch</p>
            <Link to="/" className="btn btn-primary mt-6">Browse Movies</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-base-content/50 mb-4">
              {wishlist.length} movie{wishlist.length !== 1 ? "s" : ""} in your wishlist
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map((movie: Movie, index: number) => (
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
                        className="btn btn-sm btn-outline"
                      >
                        Remove from Wishlist
                      </button>
                      <Link
                        to={`/movie/${encodeURIComponent(movie.title || "")}`}
                        className="btn btn-sm btn-primary"
                      >
                        View Details
                      </Link>
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