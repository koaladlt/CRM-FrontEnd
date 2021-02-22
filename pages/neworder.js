import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout'
import AssingClient from '../components/Orders/AssingClient'
import OrderContext from '../context/OrderContext'
import AssignProduct from '../components/Orders/AssignProduct'
import OrderSummary from '../components/Orders/OrderSummary'
import Total from '../components/Orders/Total'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const NEW_ORDER = gql`
mutation newOrder ($input: OrdersInput) {
    newOrder (input: $input) {
        id 
    }
}
`;

const GET_ORDERS_BY_SELLER = gql`
query getOrdersBySeller {
    getOrdersBySeller {
        id
        order {
            id
            amount
            name
        }
        client {
            id
            name
            lastName
            email
            phone
        }
        seller
        total
        state
    }
}

`;

const NewOrder = () => {
    const orderContext = useContext(OrderContext)
    const { client, products, total } = orderContext;
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);




    const [newOrder] = useMutation(NEW_ORDER, {
        update(cache, {
            data: { newOrder } }) {
            const { getOrdersBySeller } = cache.readQuery({
                query: GET_ORDERS_BY_SELLER
            });

            cache.writeQuery({
                query: GET_ORDERS_BY_SELLER,
                data: {
                    getOrdersBySeller: [...getOrdersBySeller, newOrder]
                }
            })
        }
    })

    const validateOrder = () => {
        return !products.every(product => product.amount > 0) || total === 0 || client.length === 0 ? "opacity-50 cursor-not-allowed" : ""
    }

    const createNewOrder = async () => {

        const { id } = client;

        const order = products.map(({ __typename, stock, ...product }) => product)
        try {
            const { data } = await newOrder({
                variables: {
                    input: {
                        client: id,
                        total,
                        order
                    }
                }
            })
            await Swal.fire({
                title: "Success",
                text: "New order added",
                icon: "success",
                confirmButtonText: "Alright!",
            },
                setModalOpen(true));

            if (!modalOpen) {
                router.push('/orders')
            }
        } catch (error) {
            console.error(error)
        }
    }

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
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
                        onClick={() => createNewOrder()}>
                        Make order
                    </button>
                </div>
            </div>
        </Layout>


    )
}

export default NewOrder;