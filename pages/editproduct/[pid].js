import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { gql, useQuery } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'

const GET_PRODUCT = gql`
query getProductById($id: ID!) {
    getProductById(id:$id) {
        name
        price
        stock
    }
}

`

const EditProduct = () => {

    const router = useRouter();
    const { query: { id } } = router;

    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: {
            id
        }
    })

    const updateProductInfo = (values) => {
        console.log(values)
    }


    if (loading) return "loading..."

    const { getProductById } = data;

    const validationSchema = Yup.object({
        name: Yup.string().required("Product's name is mandatory"),
        stock: Yup.number()
            .required("Product's stock is mandatory")
            .positive('You can add negative numbers')
            .integer('Stock must be an integer number'),
        price: Yup.number()
            .required("Product's price is mandatory")
            .positive("You can't add a negative number")
    })


    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light"> Edit Product </h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        enableReinitialize
                        initialValues={getProductById}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            updateProductInfo(values)
                        }}>
                        {props => {
                            return (


                                <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 "
                                    onSubmit={props.handleSubmit}
                                >

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Name
                            </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="Product's name"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.name}
                                        >

                                        </input>

                                    </div>

                                    {props.touched.name && props.errors.name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">{props.errors.name}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                            Stock
                            </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="stock"
                                            type="number"
                                            placeholder="Product's stock"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.stock}
                                        >

                                        </input>

                                    </div>

                                    {props.touched.stock && props.errors.stock ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">{props.errors.stock}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                            Price
                            </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="price"
                                            type="number"
                                            placeholder="Product's price"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.price}
                                        >

                                        </input>

                                    </div>

                                    {props.touched.price && props.errors.price ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">{props.errors.price}</p>
                                        </div>
                                    ) : null}

                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-grey-900"
                                        value="Edit Product" />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}

export default EditProduct;