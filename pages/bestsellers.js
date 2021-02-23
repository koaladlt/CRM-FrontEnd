import React from 'react';
import Layout from '../components/Layout'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, selectURI, useQuery } from '@apollo/client'

const BEST_SELLERS = gql`
query getBestSellers {
    getBestSellers {
        seller {
            name
            email
        }
        total
    }
}


`;


const BestSellers = () => {

    const { data, loading, error } = useQuery(BEST_SELLERS);

    if (loading) return null;

    const { getBestSellers } = data;

    const dataGraphic = [];

    getBestSellers.map((seller, i) => {
        dataGraphic[i] = {
            ...seller.seller[0],
            total: seller.total
        }
    })

    console.log(dataGraphic)

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light"> Best Sellers </h1>


            <BarChart
                className="mt-10"
                width={600}
                height={500}
                data={dataGraphic}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3182CE" />

            </BarChart>

        </Layout>
    )
}

export default BestSellers;