import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Peliculas } from './components/PeliculasComponents';
import { useMovies } from './hooks/useMovies';
import debounce from 'just-debounce-it';

function useSerch() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<null | string>(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === ''; //1.--> query === '' -> true // luego que se agregue algo en la query se va a cambiar query ->{'algo'} === '' -> false
      return;
    }
    if (query.startsWith(' ')) return; //Pre validacion

    setQuery(query);

    if (query === '') {
      setError('No se puede buscar en vacio');
      return;
    }

    if (query.match(/^\d+$/)) {
      setError('No se puede buscar algo con numeros');
      return;
    }

    if (query.length < 3) {
      setError('No se puede con menos de 3 letras');
      return;
    }
    setError(null);
  }, [query]);

  return { query, setQuery, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { query, setQuery, error } = useSerch();
  const { movies, getPeliculas, cargando } = useMovies({ query, sort });

  const debounceGetPeliculas = useCallback(
    debounce((query: string) => {
      console.log('search', query);
      getPeliculas(query);
    }, 400),
    []
  );

  const handleSubmited = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getPeliculas(query);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newQuery = event.currentTarget.value;
    setQuery(newQuery);
    debounceGetPeliculas(newQuery);
  };

  return (
    <>
      <header>
        <h1>Buscador de peliculas</h1>
        <form
          className='form'
          onSubmit={handleSubmited}
        >
          <input
            type='text'
            onChange={handleChange}
            value={query}
            placeholder='Avengers, Star Wars, The Matrix ...'
            style={{
              border: '1px solid #000',
              borderColor: error ? 'red' : 'transparent',
            }}
          />
          <input
            type='checkbox'
            onChange={handleSort}
            checked={sort}
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {cargando ? <p>Cargando...</p> : <Peliculas peliculas={movies} />}
      </main>
    </>
  );
}

export default App;
