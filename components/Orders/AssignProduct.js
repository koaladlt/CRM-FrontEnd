import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'
import OrderContext from '../../context/OrderContext'

const GET_PRODUCTS = gql`
query getProducts {
    getProducts {
        id
        name
        price
        stock
    }
}
`;

const AssignProduct = () => {
    const [products, setProducts] = useState([]);

    const orderContext = useContext(OrderContext)

    const { AddProduct } = orderContext

    const { data, loading, error } = useQuery(GET_PRODUCTS)

    useEffect(() => {
        AddProduct(products)
    }, [products])

    if (loading) return null;

    const { getProducts } = data;

    const selectProducts = (product) => {
        setProducts(product)
    }

    return (
        <>
            <p className="mt-3 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2.- Select or search products</p>
            <Select
                className="mt-3"
                onChange={products => selectProducts(products)}
                isMulti={true}
                options={getProducts}
                getOptionValue={options => options.id}
                getOptionLabel={options => `${options.name} - ${options.stock} availables `}
            />
        </>
    )
}

export default AssignProduct;