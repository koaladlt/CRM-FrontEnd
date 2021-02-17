import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

const EditProduct = () => {

    const router = useRouter();
    const { query: { id } } = router;

    console.log(id)

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light"> Edit Product </h1>
        </Layout>
    )
}

export default EditProduct;