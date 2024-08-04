import { PeliculasInterface } from "../models/Peliculas";


const API_KEY = '4287ad07';
export const searchPeliculas = async (search: string): Promise<PeliculasInterface[]> => {
    console.log(search);

    if (search === '') return [];

    try {
        const response = await fetch(`https://www.omdbapi.com/?apiKey=${API_KEY}&s=${search}`);
        const json = await response.json();

        const peliculas = json.Search;

        // const mappedPelis: PeliculasInterface[] = peliculas?.map((peli) => ({
        //     id: peli.imdbID,
        //     titulo: peli.Title,
        //     anno: peli.Year,
        //     poster: peli.Poster,
        // }));

        const mappedPelis: PeliculasInterface[] = peliculas?.map((peli: any) => ({
            id: peli.imdbID,
            titulo: peli.Title,
            anno: peli.Year,
            poster: peli.Poster,
        }));

        return mappedPelis;

    } catch (e) {
        throw new Error('Error searching movies')
    }


}