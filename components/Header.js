import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'


const GET_USER = gql`
query getUser {
    getUser{
        id
        name
        lastName
        email
    }
    
}

`;

const Header = () => {

    const { data, loading, error } = useQuery(GET_USER)
    const router = useRouter()

    if (loading) return "cargando..."

    if (!data.getUser || error) {
        window.location.href = 'login';
    }

    const { name } = data.getUser

    const logOut = () => {
        localStorage.removeItem('token')
        router.push('/login')

    }
    return (
        <div className="sm:flex justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Hola: {name}</p>

            <button
                onClick={() => logOut()}
                type="button"
                className="bg-blue-800 w-full sm:w-auto font bold uppercase text-xs rounded py-1 px-2 text-white shadow-md">
                Log Out
            </button>
        </div>
    )
}

export default Header;