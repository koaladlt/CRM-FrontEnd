import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const NewOrder = () => {
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

            <Select
                options={options}
                isMulti={true}
            />
        </Layout>


    )
}

export default NewOrder;