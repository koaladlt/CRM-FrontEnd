import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import Product from '../components/Product'
import Link from 'next/link'

const GET_PRODUCTS = gql`
        query getProducts {
            getProducts {
                id
                name
                price
                stock
            }
        }
    
    
    `

export default function Products() {

    const { data, loading, error } = useQuery(GET_PRODUCTS)

    if (loading) {
        return (
            <Layout>
                <div className="loader">
                </div>
            </Layout>
        )
    }


    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light"> Products </h1>

                <Link href="/newproduct">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray- 800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
                        New Product
                    </a>
                </Link>

                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/5 py-2 ">Name</th>
                            <th className="w-1/5 py-2 ">Stock</th>
                            <th className="w-1/5 py-2 ">Price</th>
                            <th className="w-1/5 py-2 ">Delete</th>
                            <th className="w-1/5 py-2 ">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.getProducts && data.getProducts.map((product) => (
                            <Product
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </tbody>
                </table>
            </Layout>
        </div>
    )
}
