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

        default:
            return state;
    }
}