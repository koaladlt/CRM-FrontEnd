import React from 'react';
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import Router from 'next/router'

const DELETE_CLIENT = gql`
mutation deleteClient ($id: ID!) {
    deleteClient (id: $id)
}

`

const GET_CLIENTS = gql`
query getClientsBySeller {
  getClientsBySeller {
    id
    name
    lastName
    company
    email
  }
}
`;


const Client = ({ client }) => {

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        update(cache) {
            const { getClientsBySeller } = cache.readQuery({ query: GET_CLIENTS });

            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    getClientsBySeller: getClientsBySeller.filter(actualClient => actualClient.id !== id)
                }
            })
        }
    })

    const { name, lastName, company, email, id } = client;

    const confirmDeleteClient = () => {

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
                    const { data } = await deleteClient({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Deleted!',
                        'Client has been deleted.',
                        'success'
                    )

                } catch (error) {
                    console.error(error)
                }
            }
        })
    }

    const editClient = () => {
        Router.push({
            pathname: "/editclient/[id]",
            query: { id }
        })
    }

    return (
        <tr key={client.id}>
            <td className="border px-4  py-2 ">{name} {lastName}</td>
            <td className="border px-4  py-2 ">{company}</td>
            <td className="border px-4  py-2 ">{email}</td>
            <td className="border px-4  py-2 ">
                <button
                    type="button"
                    onClick={() => confirmDeleteClient()}
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold">
                    Delete
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td>
            <td className="border px-4  py-2 ">
                <button
                    type="button"
                    onClick={() => editClient()}
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold">
                    Edit
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </td>
        </tr>
    )
}

export default Client;