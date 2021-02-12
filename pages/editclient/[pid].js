import React from 'react';
import { useRouter } from 'next/router'

const EditClient = () => {
    const router = useRouter();
    const { query: { id } } = router;
    console.log(id)

    return (
        <h1>Edit Client</h1>
    )
}

export default EditClient;