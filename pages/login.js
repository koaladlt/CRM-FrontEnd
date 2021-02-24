import React, { useState } from 'react';
import Layout from '../components/Layout'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';


const AUTHENTICATE_USER = gql`
mutation authenticateUser ($input: AuthenticateInput) {
    authenticateUser (input: $input) {
      token
    }
  }

`

const Login = () => {

    const [authenticateUser] = useMutation(AUTHENTICATE_USER)
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email is not valid')
                .required('Email is mandatory'),
            password: Yup.string()
                .required('Password is required')
        }),
        onSubmit: async (values) => {
            const { email, password } = values
            try {
                const { data } = await authenticateUser({
                    variables: {
                        input: {
                            email,
                            password

                        }
                    }
                })

                setLoading(true)

                const { token } = data.authenticateUser
                localStorage.setItem('token', token)

                setTimeout(() => {
                    setLoading(false)
                    router.push('/')
                }, 3000);

            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The email or password are incorrect',
                })
            }

        }
    })

    return (
        <Layout>
            {loading ? (<div className="loader">
            </div>) : (
                    <>
                        <h1 className='text-center text-2xl text-white font-light'>Login</h1>

                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-sm">
                                <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                            Email
                </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Email"
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
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                            Password
                </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
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
                                        value="Login"

                                    />
                                </form>
                            </div>

                        </div>
                    </>
                )
            }

        </Layout >
    )
}

export default Login;