import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout'
import AssingClient from '../components/Orders/AssingClient'
import OrderContext from '../context/OrderContext'
import AssignProduct from '../components/Orders/AssignProduct'
import OrderSummary from '../components/Orders/OrderSummary'
import Total from '../components/Orders/Total'

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
                    <Total />

                    <button
                        type="button"
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`}>
                        Make order
                    </button>
                </div>
            </div>
        </Layout>


    )
}

export default NewOrder;