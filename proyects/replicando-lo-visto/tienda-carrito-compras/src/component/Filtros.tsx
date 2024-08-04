import { useState } from 'react';
import '../styles/Filtros.css';
import { useId } from 'react';
import { useFiltros } from '../hooks/useFiltros';

export function Filtros() {
  const minPriceFilterID = useId();
  const categoryFilterID = useId();

  const { filtros, setFiltros } = useFiltros();

  const handleChangeMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros((prevSatae) => ({
      ...prevSatae,
      minPrice: Number(event.target.value),
    }));
  };

  const handleChangeCartegory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFiltros((prevSatae: any) => ({
      ...prevSatae,
      category: event.target.value,
    }));
  };

  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Precio</label>
        <input
          type='range'
          id={minPriceFilterID}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filtros.minPrice}
        />
        <span>${filtros.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterID}>Categoria</label>
        <select
          id={categoryFilterID}
          onChange={handleChangeCartegory}
        >
          <option value='all'>Todo</option>
          <option value='laptops'>Portátiles</option>
          <option value='smartphones'>Celulares</option>
        </select>
      </div>
    </section>
  );
}
