import React, { useEffect } from 'react';
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

    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_SELLERS);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if (loading) {
        return (
            <Layout>
                <div className="loader">
                </div>
            </Layout>
        )
    }

    console.log(data)

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

            <ResponsiveContainer
                width={'99%'}
                height={550}>
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
            </ResponsiveContainer>

        </Layout>
    )
}

export default BestSellers;