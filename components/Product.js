import React from 'react';

const Product = ({ product }) => {
    const { name } = product;
    return (
        <h1>{name}</h1>
    )
}

export default Product;