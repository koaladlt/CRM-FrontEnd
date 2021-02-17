import React from 'react';
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'
import EditProduct from '../pages/editproduct/[pid]';

const DELETE_PRODUCT = gql`
    mutation deleteProduct ($id:ID!) {
        deleteProduct(id:$id) 
    }

`

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

const Product = ({ product }) => {
    const { id, name, price, stock } = product;

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        update(cache) {
            const { getProducts } = cache.readQuery({
                query: GET_PRODUCTS
            });

            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts: getProducts.filter(actualProduct => actualProduct.id !== id)
                }
            })
        }
    })


    const confirmDeleteProduct = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete client!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await deleteProduct({
                        variables: {
                            id
                        }
                    })

                } catch (error) {
                    console.error(error)
                }
            }
        })

    }

    const editProduct = () => {

        Router.push({
            pathname: "/editproduct/[id]",
            query: { id }
        })

    }
    return (
        <tr>
            <td className="border px-4 py-2">
                {name}
            </td>
            <td className="border px-4 py-2">
                {stock}
            </td>
            <td className="border px-4 py-2">
                $ {price}
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    onClick={() => confirmDeleteProduct()}
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold">
                    Delete
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    onClick={() => editProduct()}
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold">
                    Edit
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </td>
        </tr>
    )
}

export default Product;