export interface Movie {
    id: string;
    title: string;
    year: string;
    poster: string;
}

const API_KEY = '4287ad07'
export const searchMovies = async ({ search = '' }): Promise<Movie[]> => {
    if (search === '') return [];

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json();

        const movies = json.Search;
        const mapped: Movie[] = movies?.map((movie: any) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
        }));
        return mapped;

    } catch (error) {
        throw new Error('Error searching movies');
    }

}

