import React, { useEffect } from 'react';
import Layout from '../components/Layout'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, selectURI, useQuery } from '@apollo/client'

const BEST_CLIENTS = gql`
query getBestClients {
    getBestClients {
        client {
            name
            company
        }
        total
    }
}


`;


const BestClients = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_CLIENTS);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if (loading) return null;

    console.log(data)

    const { getBestClients } = data;

    const dataGraphic = [];

    getBestClients.map((client, i) => {
        dataGraphic[i] = {
            ...client.client[0],
            total: client.total
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

export default BestClients;