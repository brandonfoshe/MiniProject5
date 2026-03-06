import { Link } from "react-router";

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

interface MovieCardProps {
  movie: Movie;
  isWishlisted: boolean;
  onToggleWishlist: (movie: Movie) => void;
}

export default function MovieCard({ movie, isWishlisted, onToggleWishlist }: MovieCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
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
            onClick={() => onToggleWishlist(movie)}
            className={`btn btn-sm ${isWishlisted ? "btn-primary" : "btn-outline"}`}
          >
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
          <Link to={`/movie/${encodeURIComponent(movie.title || "")}`} className="btn btn-sm btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}