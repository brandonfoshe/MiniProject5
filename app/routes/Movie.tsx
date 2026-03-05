// app/routes/Movie.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

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
  return [{ title: "Movie" }];
}

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (movie?.title) {
      document.title = movie.title;
    }
  }, [movie]);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch("../app/public/movie.json");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: Movie[] = await response.json();

        const found = data.find(
          (m) => m.title?.toLowerCase() === id?.toLowerCase()
        );

        if (found) {
          setMovie(found);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        setNotFound(true);
      }
    }

    fetchMovie();
  }, [id]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Movie not found</h1>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
        <div className="flex-1 flex items-center gap-2">
          <img src="../app/public/MovieIcon.png" className="w-8 h-8 object-contain" alt="Movie icon" />
          <span className="text-xl font-bold tracking-tight">Movie Wishlister</span>
        </div>
        <div className="flex-none">
          <Link to="/" className="btn btn-ghost btn-sm">← Back to Movies</Link>
        </div>
      </div>

      {/* Movie Details */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body gap-4">

            <h1 className="text-3xl font-bold">{movie.title}</h1>

            {movie.short_description && (
              <p className="text-base-content/70">{movie.short_description}</p>
            )}

            <div className="divider"></div>

            <div className="grid grid-cols-2 gap-3">
              {movie.director && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">Director</p>
                  <p>{movie.director}</p>
                </div>
              )}
              {movie.genre && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">Genre</p>
                  <p>{movie.genre}</p>
                </div>
              )}
              {movie.releasing_year && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">Release Year</p>
                  <p>{movie.releasing_year}</p>
                </div>
              )}
              {movie.imdb_rating && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">IMDB Rating</p>
                  <p>{movie.imdb_rating}</p>
                </div>
              )}
              {movie.runtime && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">Runtime</p>
                  <p>{movie.runtime}</p>
                </div>
              )}
              {movie.age_group && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">Age Group</p>
                  <p>{movie.age_group}</p>
                </div>
              )}
              {movie.language && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">Language</p>
                  <p>{movie.language}</p>
                </div>
              )}
              {movie.budget && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">Budget</p>
                  <p>{movie.budget}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}