import { PeliculasInterface } from '../models/Peliculas';

function RenderPeliculas({ movies }: { movies: PeliculasInterface[] }) {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <li className='movie' key={movie.id}>
          <h3>{movie.titulo}</h3>
          <p>{movie.anno}</p>
          <img
            src={movie.poster}
            alt={movie.titulo}
          />
        </li>
      ))}
    </ul>
  );
}

function RenderNoPelis() {
  return <p>No se encontraron peliculas para esta búsqueda</p>;
}

export function Peliculas ({peliculas}:{peliculas:PeliculasInterface[]}) {
  const tienePeliculas = peliculas?.length > 0;
  return(
    tienePeliculas ? <RenderPeliculas movies={peliculas} /> : <RenderNoPelis/> 
  )
}