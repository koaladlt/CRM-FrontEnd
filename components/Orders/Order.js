import React, { useState, useEffect } from 'react'

const Order = ({ order }) => {
    const { id, total, client, state } = order;

    const [orderState, setOrderState] = useState(state);

    useEffect(() => {
        if (orderState) {
            setOrderState(orderState)
        }
    }, [orderState])

    return (
        <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:grap-4 shadow-lg">
            <div>
                <p className="font-bold text-gray-800">
                    Client: {client}
                </p>

                <h2 className="text-gray-800 font-bold mt-10"> Order State: </h2>

                <select className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    value={orderState}
                >
                    <option value="COMPLETE">COMPLETE</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CANCELED">CANCELED</option>

                </select>


            </div>

            <div>


            </div>
        </div>
    )
}

export default Order;