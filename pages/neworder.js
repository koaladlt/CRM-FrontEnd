import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import AssingClient from '../components/Orders/AssingClient'



const NewOrder = () => {
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New Order</h1>
            <AssingClient />

        </Layout>


    )
}

export default NewOrder;