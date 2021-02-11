import React, { useState } from 'react';
import Layout from '../components/Layout'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Router, useRouter } from 'next/router'

const NEW_CLIENT = gql`
mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastName
      company
      email
      phone
    }
  }
`

const GET_CLIENTS = gql`
query getClientsBySeller {
  getClientsBySeller {
    name
    lastName
    company
    email
  }
}
`;

const newClient = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const router = useRouter();


    const [newClient] = useMutation(NEW_CLIENT, {
        update(cache, { data: { newClient } }) {
            const { getClientsBySeller } = cache.readQuery({ query: GET_CLIENTS })
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    getClientsBySeller: [...getClientsBySeller, newClient]
                }
            })
        }


    })

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            company: '',
            email: '',
            phone: '',

        },
        validationSchema: Yup.object({
            name: Yup.string().required("Client's name is mandatory"),
            lastName: Yup.string().required("Client's last name is mandatory"),
            company: Yup.string().required("Client's company is mandatory"),
            email: Yup.string().email('Email is not valid').required("Client's email is mandatory")
        }),
        onSubmit: async values => {
            const { name, lastName, company, email, phone } = values;

            try {
                const { data } = await newClient({
                    variables: {
                        input: {
                            name,
                            lastName,
                            company,
                            email,
                            phone
                        }
                    }
                })
                await Swal.fire({
                    title: "Success",
                    text: "New client added",
                    icon: "success",
                    confirmButtonText: "Alright!",
                },
                    setModalOpen(true));

                if (!modalOpen) {
                    router.push('/')
                }

            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New Client</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 "
                        onSubmit={formik.handleSubmit}
                    >

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Client's name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            >

                            </input>

                        </div>

                        {formik.touched.name && formik.errors.name ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.name}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                type="text"
                                placeholder="Client's Last Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                            >

                            </input>

                        </div>

                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.lastName}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                                Company
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="company"
                                type="text"
                                placeholder="Company's name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.company}
                            >

                            </input>

                        </div>

                        {formik.touched.company && formik.errors.company ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.company}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="Email address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            >

                            </input>

                        </div>

                        {formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.email}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone number
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="tel"
                                placeholder="Phone number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            >

                            </input>

                        </div>

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-grey-900"
                            value="Save client" />


                    </form>

                </div>
            </div>
        </Layout>
    )
}

export default newClient;