import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useQuery, gql } from '@apollo/client';
import { Formik } from 'formik'

const GET_CLIENT = gql`
query getClientById($id:ID!) {
    getClientById(id:$id) {
        id
        name 
        lastName
        email
        phone
        company
    }
}


`;



const EditClient = () => {
    const router = useRouter();
    const { query: { id } } = router;


    const { data, loading, error } = useQuery(GET_CLIENT, {
        variables: {
            id
        }
    })

    if (loading) {
        return "loading..."
    }



    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik

                    >

                        {props => {
                            console.log(props)

                            return (


                                <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 "
                                // onSubmit={formik.handleSubmit}
                                >

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Name
                            </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="Client's name"
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.name}
                                        >

                                        </input>

                                    </div>
                                    {/* 
                        {formik.touched.name && formik.errors.name ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.name}</p>
                            </div>
                        ) : null} */}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                            Last Name
                            </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"
                                            placeholder="Client's Last Name"
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.lastName}
                                        >

                                        </input>

                                    </div>

                                    {/* {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.lastName}</p>
                            </div>
                        ) : null} */}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                                            Company
                            </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="company"
                                            type="text"
                                            placeholder="Company's name"
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.company}
                                        >

                                        </input>

                                    </div>

                                    {/* {formik.touched.company && formik.errors.company ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.company}</p>
                            </div>
                        ) : null} */}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                            Email
                            </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="text"
                                            placeholder="Email address"
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.email}
                                        >

                                        </input>

                                    </div>

                                    {/* {formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.email}</p>
                            </div>
                        ) : null} */}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                            Phone number
                            </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="phone"
                                            type="tel"
                                            placeholder="Phone number"
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.phone}
                                        >

                                        </input>

                                    </div>

                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-grey-900"
                                        value="Save client" />



                                </form>
                            )
                        }}

                    </Formik>

                </div>
            </div>
        </Layout>
    )
}

export default EditClient;