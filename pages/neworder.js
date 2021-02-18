import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout'
import AssingClient from '../components/Orders/AssingClient'
import OrderContext from '../context/OrderContext'
import AssignProduct from '../components/Orders/AssignProduct'


const NewOrder = () => {
    const orderContext = useContext(OrderContext)
    console.log(orderContext)
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New Order</h1>
            <AssingClient />
            <AssignProduct />
        </Layout>


    )
}

export default NewOrder;