import { Product } from "../models/ProductInterface";

// export const initialState = [];
// export const initialState = localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')!) : [];
export const initialState = JSON.parse(localStorage.getItem('cart')!) || [];

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
}

//update localStorage with state for cart
export const uploadLocalStorage = (state: Product[]) => {
    localStorage.setItem('cart', JSON.stringify(state));
}

const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]: (state: Product[], action: any) => {
        // const { type: actionType, payload: actionPayload } = action;
        // const { id } = actionPayload;

        const { id } = action.actionPayload;  //--> este id viene del modelo Product

        const productInCartIndex: number | undefined = state.findIndex(item => item.id === id);

        //-------USANDO EL structuredClone --------------
        if (productInCartIndex >= 0) {
            const newState = structuredClone(state);
            newState[productInCartIndex].quantity! += 1;
            uploadLocalStorage(newState);
            return newState;

            //------------USANDO EL SPREAD OPERATOR Y SLICE [1,2,3,4,5] --cambiarPorIndice-> [1,2,*,4,5]
            // const newState2 = [
            //     ...state.slice(0, productInCartIndex),
            //     {
            //         ...state[productInCartIndex], quantity: state[productInCartIndex].quantity! + 1
            //     },
            //     ...state.slice(productInCartIndex + 1)
            // ]
            // uploadLocalStorage(newState2);
            // return newState2;
        }



        const newState = [
            ...state,
            {
                ...action.actionPayload, //product
                quantity: 1
            }
        ]
        uploadLocalStorage(newState);
        return newState;
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state: Product[], action: any) => {
        const { id } = action.actionPayload;
        const newState = state.filter(item => item.id !== id);
        uploadLocalStorage(newState);
        return newState;
    },
    [CART_ACTION_TYPES.CLEAR_CART]: () => {
        uploadLocalStorage([]);
        return [];
    }
}

export const cartReducer = (state: Product[], action: any) => {
    // const { type: actionType, payload: actionPayload } = action;

    // switch (actionType) {
    //     case CART_ACTION_TYPES.ADD_TO_CART: {
    //         const { id } = actionPayload;  //--> este id viene del modelo Product

    //         const productInCartIndex: number | undefined = state.findIndex(item => item.id === id);

    //         if (productInCartIndex >= 0) {
    //             const newState = structuredClone(state);
    //             newState[productInCartIndex].quantity! += 1;
    //             uploadLocalStorage(newState);
    //             return newState;
    //         }


    //         const newState = [
    //             ...state,
    //             {
    //                 ...actionPayload, //product
    //                 quantity: 1
    //             }
    //         ]
    //         uploadLocalStorage(newState);
    //         return newState;
    //     }

    //     case CART_ACTION_TYPES.REMOVE_FROM_CART: {
    //         const { id } = actionPayload;
    //         const newState = state.filter(item => item.id !== id);
    //         uploadLocalStorage(newState);
    //         return newState;
    //     }

    //     case CART_ACTION_TYPES.CLEAR_CART: {
    //         uploadLocalStorage([]);
    //         return [];
    //     }
    // }

    //----SIN UNSAR EL SWITCH
    const { type: actionType } = action
    const updateAction = UPDATE_STATE_BY_ACTION[actionType];

    return updateAction ? updateAction(state, action) : state;
}