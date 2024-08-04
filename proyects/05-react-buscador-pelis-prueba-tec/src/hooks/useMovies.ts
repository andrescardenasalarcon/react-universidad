// Usememo se encarga de memo-rozar un valor para no tener que volverlo a calcular dependidendo de una lista de dependencias
import { useRef, useState, useMemo, useCallback } from 'react';
import { Movie, searchMovies } from "../services/movies";

export function useMovies({ search = '', sort = false }) {
  // const [movies, setMovies] = useState({ Search: [] });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const previousSearch = useRef(search) // ✅ evitanos que se haga la misma búsqueda dos veces seguidas.

  // const getMovies = useMemo(() => {
  //   return async ({search = ''}) => {
  //     if (search === previousSearch.current) return

  //     try {
  //       setLoading(true);
  //       setError(null);
  //       previousSearch.current = search;
  //       const newMovies = await searchMovies({ search })
  //       setMovies(newMovies);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         setError(error.message);
  //       } else {
  //         console.log('Unexpected error ', error);
  //       }

  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // }, []) 

  const getMovies = useCallback(//EL USECALLBACK esta pensado unicamente para las funciones, como en este caso --"el useCallBack" usa por de bajo el useMemo
    async ({ search = '' }) => {
      if (search === previousSearch.current) return

      try {
        setLoading(true);
        setError(null);
        previousSearch.current = search;
        const newMovies = await searchMovies({ search })
        setMovies(newMovies);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          console.log('Unexpected error ', error);
        }

      } finally {
        setLoading(false);
      }
    }, [])

  // const sortedMovies: Movie[] = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies

  //-----USE-MEMO- Si no cambia el sort o las movies, no me vuelvas a calcular eso
  const sortedMovies: Movie[] = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;
  }, [sort, movies]) //Si no cambia el sort o las movies, no me vuelvas a calcular eso

  return { movies: sortedMovies, getMovies, loading };
}
