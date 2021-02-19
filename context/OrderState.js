import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer'

import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    AMOUNT_PRODUCTS
} from '../types/index';

const OrderState = ({ children }) => {
    const initialState = {
        client: {},
        products: [],
        total: 0
    }

    const [state, dispatch] = useReducer(OrderReducer, initialState)

    const AddClient = (client) => {
        dispatch({
            type: SELECT_CLIENT,
            payload: client
        })

    }

    const AddProduct = (products) => {
        dispatch({
            type: SELECT_PRODUCT,
            payload: products
        })
    }

    const productsAmount = (newProduct) => {
        dispatch({
            type: AMOUNT_PRODUCTS,
            payload: newProduct
        })
    }

    return (
        <OrderContext.Provider
            value={{
                products: state.products,
                AddClient,
                AddProduct,
                productsAmount
            }}>
            {children}

        </OrderContext.Provider>
    )
}

export default OrderState;