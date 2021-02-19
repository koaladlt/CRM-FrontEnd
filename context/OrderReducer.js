import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer'

import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    AMOUNT_PRODUCTS
} from '../types/index';

export default (state, action) => {
    switch (action.type) {
        case SELECT_CLIENT:
            return {
                ...state,
                client: action.payload
            }
        case SELECT_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case AMOUNT_PRODUCTS:
            return {
                ...state,
                products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product)
            }
        default:
            return state;
    }
}