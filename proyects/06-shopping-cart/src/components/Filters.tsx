import React, { useId } from 'react';
import './Filters.css';
import { useFilters } from '../hooks/useFilters';
import { Filter } from '../context/FilterType';

export function Filters() {
  const {filtersContext ,setFiltersContext } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Number(event.target.value);
    
    setFiltersContext((prevValues) => ({
      ...prevValues,
      minPrice: newMinPrice,
    }));
  };

  const handleChangeCategory = ( event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltersContext((prevState: Filter) => ({
      ...prevState,
      category: event.target.value,
    }));
  };
  
  return (
    <section className='filters '>
      <div>
        <label htmlFor='price'>Precio a partir de: </label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleMinPriceChange}
          value={filtersContext.minPrice}
        />
        <span>${filtersContext.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoria</label>
        <select
          name=''
          id={categoryFilterId}
          onChange={handleChangeCategory}
        >
          <option value='all'>Todas</option>
          <option value='laptops'>Portátiles</option>
          <option value='smartphones'>Celulares</option>
        </select>
      </div>
    </section>
  );
}
