import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'
import OrderContext from '../../context/OrderContext'
import { gql, useQuery } from '@apollo/client'

const GET_CLIENTS = gql`
query getClientsBySeller {
  getClientsBySeller {
    id
    name
    lastName
    company
    email
  }
}
`;


const AssingClient = () => {
    const { data, loading, error } = useQuery(GET_CLIENTS);
    const [client, setClient] = useState([])
    const orderContext = useContext(OrderContext);
    const { AddClient } = orderContext

    useEffect(() => {
        AddClient(client)
    }, [client])

    const selectClient = (client) => {
        setClient(client)
    }

    if (loading) return null;
    const { getClientsBySeller } = data;

    return (
        <>
            <p className="mt-3 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Assing the client to a order</p>
            <Select
                className="mt-3"
                onChange={client => selectClient(client)}
                options={getClientsBySeller}
                getOptionValue={options => options.id}
                getOptionLabel={options => options.name}
            />
        </>
    )
};

export default AssingClient;