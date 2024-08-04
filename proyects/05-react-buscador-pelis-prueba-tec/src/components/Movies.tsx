import { Movie } from '../services/movies';

/* eslint-disable @typescript-eslint/no-explicit-any */
function ListOfMovies({ movies }: { movies: Movie[] }) {
  return (
    <ul className='movies'>
      {movies.map((movie: Movie) => (
        <li
          className='movie'
          key={movie.id}
        >
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img
            src={movie.poster}
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
  );
}

function NoMoviesResult() {
  return <p>No se encontraron Pelis para esta busqueda</p>;
}

export function Movies({ movies }: { movies: Movie[] }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
}
