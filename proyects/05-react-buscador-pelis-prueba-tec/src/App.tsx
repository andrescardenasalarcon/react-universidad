import './App.css';
//hook es una referecia que PERSISTE
// en todo el ciclo de vida del cooomponente "NO RENDERIZA EL COMPONENTE",
//no se reeinicia cuando se vuelve a renderizar un componente
import { useCallback, useEffect, useRef, useState } from 'react';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import debounce from 'just-debounce-it'; //https://github.com/angus-c/just/tree/master/packages/function-debounce

function useSearch() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      setError('No se pude buscar una pelicula vacía');
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un número');
      return;
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menor 3 caracteres');
      return;
    }
    setError('');
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debounceGetMovies = useCallback(
    debounce((search: string) => {
      console.log('MiSearch ' + search);

      getMovies({ search });
    }, 300), ///2000 --> 2segundos
    []
  );

  const handelSubmit = (event: any) => {
    event?.preventDefault();
    //Este es vanilla del DOM logic
    //Recuperera un elemenot del DOM, lo trae, guarde y lo lee en una ref
    // const inputElement = inputRef.current;
    // const value = inputElement.value;
    // //const value = inputRef.current.value;
    // console.log(value);
    const fields = Object.fromEntries(new FormData(event.target)); //recupera todos los tados que tenga un formulario mediante el $event
    // const { miQuery } = Object.fromEntries(new FormData(event.target)); // Asi traemos un field en especifico
    // const query = fields.get('query'); //cuando no se usa el Object.fromEntires --> con el .get('') traemos un obj en especifico por el name
    console.log(fields.miQuery);
    console.log(fields.miQuery === ''); //asi podemos hacer validaciones de campos y asi
    console.log('Search Enter: ' + { search });
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.startsWith('x')) return; //Pre validacion de ejemplo
    const newSearch = event.currentTarget.value;
    setSearch(newSearch);

    debounceGetMovies(newSearch); //  ✅ Haz que la búsqueda se haga automáticamente al escribir.
  };

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form
          action=''
          className='form'
          onSubmit={handelSubmit}
        >
          <input
            onChange={handleChange}
            value={search}
            name='miQuery'
            type='text'
            placeholder='Avengers, The Matrix, Star Wars ...'
          />
          <input
            type='checkbox'
            name='sort'
            id='sort'
            onChange={handleSort}
            checked={sort}
          />

          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
