import { createContext, ReactNode, useReducer, useState } from 'react';
import { Product } from '../models/ProductInterface';
import { cartReducer, initialState } from '../reducer/reducerCart';

export type TodoContextType = {
  cart: Product[];
  addCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
};

export const CartContext = createContext<TodoContextType | null>(null);

interface Props {
  children: ReactNode;
}

//----------hook...--------
function useCartReducer() {
  ///------------REDUCER-LOGIC----------------
  const [state, dispach] = useReducer(cartReducer, initialState);

  const addCart = (product: Product) =>
    dispach({
      type: 'ADD_TO_CART',
      payload: product,
    });

  const removeFromCart = (product: Product) =>
    dispach({
      type: 'REMOVE_FROM_CART',
      payload: product,
    });

  const clearCart = () => dispach({ type: 'CLEAR_CART' });

  return { state, addCart, removeFromCart, clearCart };
}
export function CartProvider({ children }: Props) {
  // const [cart, setCart] = useState<Product[]>([]);

  // const addCart = (product: Product) => {
  //   //Caheck if teh products is already in the cart
  //   const productInCart: number | undefined = cart.findIndex(
  //     (item) => item.id === product.id
  //   );

  //   if (typeof productInCart === "number" && productInCart! >= 0) {
  //     //Una forma seria usando structuro clone, aunque es un poco lento cuando son muchos datos
  //     const newCart: Product[] = structuredClone(cart); //structuredClone --> hace una copia profunda de los array y de los objetos
  //     newCart[productInCart].quantity! += 1;
  //     return setCart(newCart);
  //   }

  //   //Producto no está en el carrito, se agrega con 1 unidad
  //   setCart((prevState) => [
  //     ...prevState,
  //     {
  //       ...product,
  //       quantity: 1,
  //     },
  //   ]);
  // };

  // const removeFromCart = (product: Product) => {
  //   setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  // };
  // const clearCart = () => {
  //   setCart([]);
  // };

  ///------------REDUCER-HOOK----------------
  const { state, addCart, removeFromCart, clearCart } = useCartReducer();
  return (
    <CartContext.Provider
      value={{
        cart: state,
        addCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
