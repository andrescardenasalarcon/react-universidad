import { createContext, ReactNode, useState } from 'react';
//useContext --> NOTA: Se debe usar para cuando los cambios son pqeueños o con pocos llamados,
//si se ncecesita para algo con mas valor, peso o logica usar REDUX, zustand
//1. Crear el contexto
export interface IFiltrosContextType {
  category: string;
  minPrice: number;
}
//Las acciones que requerien de nuesto IFiltrosContextType para actualizar algun dato
export type FiltrosContexto = {
  filtros: IFiltrosContextType;
  setFiltros: React.Dispatch<React.SetStateAction<IFiltrosContextType>>;
};
//1.1 Este es el que nos provee de acceso al contexto
export const FiltrosContext = createContext<FiltrosContexto | null>(null);

//2. Crear el Provider, para proveer el conetxt
interface Props {
  children: ReactNode;
}
export function FiltrosProvider({ children }: Props) {
  const [filtros, setFiltros] = useState<IFiltrosContextType>({
    category: 'all',
    minPrice: 0,
  });
  return (
    <FiltrosContext.Provider
      value={{
        filtros,
        setFiltros,
      }}
    >
      {children}
    </FiltrosContext.Provider>
  );
}
export default FiltrosContext;
//3. Llamar o envolver el contexto en este caso en el main.tsx <FiltrosProvider/>
