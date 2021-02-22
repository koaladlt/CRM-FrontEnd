import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

const UPDATE_ORDER = gql`
mutation updateOrder ($id: ID!, $input: OrdersInput) {
    updateOrder(id: $id, input: $input) {
        state
    }
}

`

const DELETE_ORDER = gql`
mutation deleteOrder ($id: ID!) {
    deleteOrder (id: $id) 
}


`

const Order = ({ order }) => {
    const { id, total, client: { name, lastName, phone, email }, state } = order;

    const [updateOrder] = useMutation(UPDATE_ORDER)
    const [deleteOrder] = useMutation(DELETE_ORDER)

    const [orderState, setOrderState] = useState(state);
    const [shape, setShape] = useState('');

    useEffect(() => {
        if (orderState) {
            setOrderState(orderState)
        }
        shapeColor()
    }, [orderState])

    const shapeColor = () => {
        if (orderState === "PENDING") {
            setShape('border-yellow-500')
        }
        if (orderState === "COMPLETE") {
            setShape('border-green-500')
        }
        if (orderState === "CANCELLED") {
            setShape('border-red-800')
        }
    }

    const changeState = async (state) => {
        try {
            const { data } = await updateOrder({
                variables: {
                    id,
                    input: {
                        state,
                        client: order.client.id
                    }

                }
            })
            setOrderState(data.updateOrder.state)
        } catch (error) {
            console.error(error)
        }
    }

    const confirmDeleteOrder = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete order!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteOrder({
                        variables: {
                            id
                        }
                    })

                    Swal.fire(
                        'Deleted!',
                        'Client has been deleted.',
                        'success'
                    )
                } catch (error) {
                    console.error(error)
                }
            }
        })
    }



    return (
        <div className={`${shape} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:grap-4 shadow-lg`}>
            <div>
                <p className="font-bold text-gray-800">
                    Client: {name} {lastName}
                </p>

                {email && (
                    <p className="flex items-center my-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                        {email}
                    </p>
                )}

                {phone && (
                    <p className="flex items-center my-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        {phone}
                    </p>
                )}

                <h2 className="text-gray-800 font-bold mt-10"> Order State: </h2>

                <select className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    value={orderState}
                    onChange={e => changeState(e.target.value)}

                >
                    <option value="COMPLETE">COMPLETE</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CANCELLED">CANCELLED</option>

                </select>


            </div>

            <div>
                <h2 className="text-gray-800 font-bold mt-2">Order summary</h2>
                {order.order.map((product) => (
                    <div key={product.id} className="mt-4">
                        <p className="text-sm text-gray-600">Product: {product.name}</p>
                        <p className="text-sm text-gray-600">Amount: {product.amount}</p>
                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold">Total:
                <span className="font-light"> $ {total} </span>
                </p>

                <button className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold"
                    onClick={() => confirmDeleteOrder()}>
                    Delete order
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>

            </div>
        </div>
    )
}

export default Order;