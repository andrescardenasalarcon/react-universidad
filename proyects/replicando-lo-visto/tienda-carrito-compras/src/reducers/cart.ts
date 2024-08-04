import { Product } from "../models/ProductInterface";

export const carroInitialEstado: Product[] = JSON.parse(localStorage.getItem('cart')!) || [];

export const CARRO_ACCIONES_TIPOS = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

//update localStorage wiht state for carro
export const updateLocalStorage = (state: Product[]) => {
    localStorage.setItem('cart', JSON.stringify(state))
}

export const carroReducer = (state: Product[], action: any) => {
    const { type: actionType, payload: actionPayload } = action;
    switch (action.type) {
        case CARRO_ACCIONES_TIPOS.ADD_TO_CART:
            const { id } = actionPayload;
            //Check si el producto ya esta en el carrito
             const productInCarroIndex = state.findIndex((item) => item.id === id);

            if (productInCarroIndex >= 0) {
            //     const newState = structuredClone(state); //Hace una copia profunda todo el array del objeto
            //     newState[productInCarroIndex].quantity! += 1;
            //     return newState;
            // }


            // const newState = [
            //     ...state,
            //     {
            //         ...actionPayload, //Producto
            //         quantity: 1,
            //     },
            // ];

            //USANDO EL SPREAD OPERATOR Y SLICE
            const newState = [
                ...state.slice(0, productInCarroIndex),
                {...state[productInCarroIndex], quiantity: state[productInCarroIndex].quantity! + 1},
                ...state.slice(productInCarroIndex + 1)

            ]
            
            updateLocalStorage(newState);
            return newState;
        }

        case CARRO_ACCIONES_TIPOS.REMOVE_FROM_CART: {
            const { id } = actionPayload;
            const newState = state.filter((item) => item.id !== id);
            updateLocalStorage(newState);
            return newState;
        }

        case CARRO_ACCIONES_TIPOS.CLEAR_CART: {
            updateLocalStorage([]);
            return [];
        }
    }
    return state;
};