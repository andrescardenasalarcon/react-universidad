import { useContext } from "react"
import { CarroContext, ICarroContextType } from "../context/cart"

export const useCarro = () => {
    const context = useContext(CarroContext) as ICarroContextType;

    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}