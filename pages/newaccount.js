import React from 'react';
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from "Yup";
import { useQuery, useMutation, gql, NetworkStatus } from '@apollo/client'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const NEW_ACCOUNT = gql`
mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastName
      email
    }
  }
  `;




const NewAccount = () => {

    const [newUser] = useMutation(NEW_ACCOUNT)
    const router = useRouter();



    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is mandatory'),
            lastName: Yup.string()
                .required('Last Name is mandatory'),
            email: Yup.string()
                .email('Email is not valid').required('Email is mandatory'),
            password: Yup.string()
                .required('Password is mandatory').min(6, 'Password must have at least 6 characters')

        }),
        onSubmit: async (values) => {

            const { name, lastName, email, password } = values
            try {
                await newUser({
                    variables: {
                        input: {
                            name,
                            lastName,
                            email,
                            password
                        }
                    }
                })
                Swal.fire({
                    title: "YAY!",
                    text: "Don't forget to check your email",
                    icon: "success",
                    confirmButtonText: "All done!",
                });
                router.push("/login")
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This user is already registered',
                })
            }
        }
    });

    return (
        <Layout>
            <h1 className='text-center text-2xl text-white font-light'>Sign Up</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                                placeholder="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                            >

                            </input>

                        </div>

                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.lastName}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            >

                            </input>

                        </div>

                        {formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.email}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            >

                            </input>

                        </div>

                        {formik.touched.password && formik.errors.password ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.password}</p>
                            </div>
                        ) : null}

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Sign Up"

                        />
                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default NewAccount;