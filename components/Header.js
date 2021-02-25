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

    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]


    if (loading) return null;

    if (!data.getUser || error) {
        window.location.href = 'login';
    }

    const { name } = data.getUser

    const logOut = () => {
        localStorage.removeItem('token')
        router.push('/login')

    }
    return (
        <div className="sm:flex mb-6 justify-between">
            <h1 className="text-center text-2xl font-light"> {name}, have a great {days[new Date().getDay()]}!</h1>
            <button
                onClick={() => logOut()}
                type="button"
                className="bg-blue-800 w-full sm:w-auto font bold uppercase text-sm py-1 px-2 text-white shadow-md rounded-full">
                Log Out
            </button>
        </div>
    )
}

export default Header;