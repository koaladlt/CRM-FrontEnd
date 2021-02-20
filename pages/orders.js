import Layout from '../components/Layout'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client';
import Order from '../components/Orders/Order'

const GET_ORDERS_BY_SELLER = gql`
query getOrdersBySeller {
    getOrdersBySeller {
        id
        order {
            id
            amount
        }
        client
        seller
        total
        state
    }
}

`;



const Orders = () => {

    const { data, loading, error } = useQuery(GET_ORDERS_BY_SELLER);

    if (loading) return null;
    console.log(data);

    const { getOrdersBySeller } = data;

    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light"> Orders </h1>

                <Link href="/neworder">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">New Order </a>
                </Link>

                {getOrdersBySeller.length === 0 ? (
                    <p className="mt-5 text-center text-2xl">There are no orders yet</p>
                ) : (
                        getOrdersBySeller.map((order) => (
                            <Order
                                key={order.id}
                                order={order}
                            />
                        ))
                    )}
            </Layout>
        </div>
    )
}

export default Orders;
