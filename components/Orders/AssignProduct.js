import React from 'react';
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'

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

    const { data, loading, error } = useQuery(GET_PRODUCTS)

    if (loading) return null;

    const { getProducts } = data;

    return (
        <>
            <p className="mt-3 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2.- Select or search products</p>
            <Select
                className="mt-3"
                onChange={client => selectClient(client)}
                options={getProducts}
                getOptionValue={options => options.id}
                getOptionLabel={options => `${options.name} - ${options.stock} availables  `}
            />
        </>
    )
}

export default AssignProduct;