import { createContext, ReactNode, useReducer, useState } from 'react';
import { Product } from '../models/ProductInterface';
import { carroReducer, carroInitialEstado } from '../reducers/cart';

//--------------------------Crear el Contexto
export interface ICarroContextType {
  carro: Product[];
  addAlCarro: (product: Product) => void;
  removeDelCarro: (product: Product) => void;
  clearCarro: () => void;
}
export const CarroContext = createContext<ICarroContextType | null>(null);

//--------------------------Provider
interface Props {
  children: ReactNode;
}

function useCarroReducer() {
  const [state, dispatch] = useReducer(carroReducer, carroInitialEstado);

  const addAlCarro = (product: any) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });

  const removeDelCarro = (product: any) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    });

  const clearCarro = () => dispatch({ type: 'CLEAR_CART' });

  return { state, addAlCarro, removeDelCarro, clearCarro };
}

export function CarroProvider({ children }: Props) {
  const { state, addAlCarro, removeDelCarro, clearCarro } = useCarroReducer();
  //   const addAlCarro = (product: Product) => {
  //     //Check si el producto ya esta en el carrito
  //     const productInCarroIndex = carro.findIndex(
  //       (item) => item.id === product.id
  //     );

  //     if (productInCarroIndex >= 0) {
  //       const newCarro = structuredClone(carro); //Hace una copia profunda todo el array del objeto
  //       newCarro[productInCarroIndex].quantity! += 1;
  //       return setCarro(newCarro);
  //     }

  //     //Producto no esta en el carro
  //     setCarro((prevState: Product[]) => [
  //       ...prevState,
  //       {
  //         ...product,
  //         quantity: 1,
  //       },
  //     ]);
  //   };

  //   const removeDelCarro = (product: Product) => {
  //     setCarro((prevState) => prevState.filter((item) => item.id !== product.id));
  //   };

  //   const clearCarro = () => {
  //     setCarro([]);
  //   };


  return (
    <CarroContext.Provider
      value={{ carro: state, addAlCarro, removeDelCarro, clearCarro }}
    >
      {children}
    </CarroContext.Provider>
  );
}
