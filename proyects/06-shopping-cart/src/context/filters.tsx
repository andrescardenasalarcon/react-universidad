import { createContext, ReactNode, useState } from 'react';
import { Filter } from './FilterType';

//1. Crear el contexto --> Este es el que tenemos que consumir
export const FiltersContext = createContext({});

//2. Crear el Provider, para proveer el contexto --> Este es el que nos provee de acceso al contexto
interface Props {
  children: ReactNode;
}

export function FiltersContextProvider({ children }: Props) {
  const [filtersContext, setFiltersContext] = useState<Filter>({
    category: 'all',
    minPrice: 0,
  });
  return (
    <FiltersContext.Provider
      value={{
        filtersContext,
        setFiltersContext
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export default FiltersContext;
