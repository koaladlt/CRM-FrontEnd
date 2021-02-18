import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout'
import AssingClient from '../components/Orders/AssingClient'
import OrderContext from '../context/OrderContext'
import AssignProduct from '../components/Orders/AssignProduct'
import OrderSummary from '../components/Orders/OrderSummary'


const NewOrder = () => {
    const orderContext = useContext(OrderContext)
    console.log(orderContext)
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

            <div className="flex justify-center mt-5 ">
                <div className="w-full max-w-lg">


                    <AssingClient />
                    <AssignProduct />
                    <OrderSummary />
                </div>
            </div>
        </Layout>


    )
}

export default NewOrder;