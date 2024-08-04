import { PeliculasInterface } from "../models/Peliculas";
import peliMocks from '../mocks/with-results.json';
import sinPelis from '../mocks/no-results.json';
import { useCallback, useMemo, useRef, useState } from "react";
import { json } from "express";
import { searchPeliculas } from "../services/peliculas";

export function useMovies({ query, sort }: { query: string, sort: boolean }) {
    const [movies, setMovies] = useState<PeliculasInterface[]>([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>();
    const previosSearch = useRef(query);

    const getPeliculas = useCallback( //--> para funciones 
        async (query: string) => {

            if (query === previosSearch.current) return;

            try {
                setCargando(true);
                setError(null);
                previosSearch.current = query;
                const newMovies = await searchPeliculas(query);
                setMovies(newMovies);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                console.log("Unexpected error " + error);
            } finally {
                setCargando(false);
            }
        }, []);

    // const sortPeliculas = sort ? [...movies].sort((a, b) => a.titulo.localeCompare(b.titulo)) : movies;
    const sortedMovies = useMemo(() => {

        return sort ? [...movies].sort((a, b) => a.titulo.localeCompare(b.titulo)) : movies;
    }, [sort, movies])

    return { movies: sortedMovies, getPeliculas, cargando };
}