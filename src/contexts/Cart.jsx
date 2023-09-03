import {createContext, useReducer} from 'react';
import {cartReducer} from '../reducers/cart'

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{cart, dispatchCartAction}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider