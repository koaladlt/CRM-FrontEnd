import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import Product from '../components/Product'

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
        return 'loading...'
    }


    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light"> Orders </h1>

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
