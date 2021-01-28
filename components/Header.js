import React from 'react';
import { gql, useQuery } from '@apollo/client'

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

    if (loading) return null
    console.log(data)

    const { name } = data.getUser
    return (
        <div>
            <p>Hola: {name}</p>

            <button type="button">Log Out</button>
        </div>
    )
}

export default Header;