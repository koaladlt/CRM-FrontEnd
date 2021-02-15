import React from 'react';
import Layout from '../components/Layout'

const NewProduct = () => {
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Create New Product</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

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
                                placeholder="Product's name"
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.name}
                            >

                            </input>

                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                Stock
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="stock"
                                type="number"
                                placeholder="Product's stock"
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.name}
                            >

                            </input>

                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="number"
                                placeholder="Product's price"
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.name}
                            >

                            </input>

                        </div>

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-grey-900"
                            value="Add New Product" />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NewProduct