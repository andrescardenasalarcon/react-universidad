import { useContext } from "react";
import { CartContext, TodoContextType } from "../context/cart";

export const useCart = () => {
    const filtersContext = useContext(CartContext) as TodoContextType;

    if (filtersContext === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return filtersContext;
}