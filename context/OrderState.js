import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer'

import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    AMOUNT_PRODUCTS,
    UPDATE_TOTAL
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

    const AddProduct = (productsSelected) => {
        let newState;
        if (state.products.length > 0) {
            newState = productsSelected.map(product => {
                const newObject = state.products.find(productState => productState.id === product.id);
                return { ...product, ...newObject }
            })
        }
        else {
            newState = productsSelected
        }
        dispatch({
            type: SELECT_PRODUCT,
            payload: newState
        })
    }

    const productsAmount = (newProduct) => {
        dispatch({
            type: AMOUNT_PRODUCTS,
            payload: newProduct
        })
    }

    const updateTotal = () => {
        dispatch({
            type: UPDATE_TOTAL
        })
    }

    return (
        <OrderContext.Provider
            value={{
                products: state.products,
                total: state.total,
                AddClient,
                AddProduct,
                productsAmount,
                updateTotal
            }}>
            {children}

        </OrderContext.Provider>
    )
}

export default OrderState;