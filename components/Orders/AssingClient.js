import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Layout from '../Layout';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const AssingClient = () => {
    const [client, setClient] = useState([])

    useEffect(() => {
        console.log(client)
    }, [client])

    const selectClient = (client) => {
        setClient(client)
    }
    return (

        <Select
            onChange={client => selectClient(client)}
            options={options}
            isMulti={true}
        />
    )
};

export default AssingClient;