import React, { useContext, useState, useEffect } from 'react';
import OrderContext from '../../context/OrderContext'
import ProductSummary from './ProductSummary';


const OrderSummary = () => {
    const orderContext = useContext(OrderContext)
    const { products } = orderContext;




    return (
        <>
            <p className="mt-3 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">3.- Adjust product's quantity</p>

            {products.length > 0 ? (
                <>
                    {products.map((product) => (
                        <ProductSummary
                            key={product.id}
                            product={product}
                        />

                    ))}
                </>
            ) : <>
                    <p>There are no products</p>
                </>}
        </>
    )
}

export default OrderSummary;