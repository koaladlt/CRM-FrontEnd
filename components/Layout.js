import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import Header from './Header';
import { useRouter } from 'next/router';
import DataSvg from './DataSvg'


const Layout = ({ children }) => {

    const router = useRouter()

    return (
        <>
            <Head>
                <title>CRM - Clients Administration</title>
            </Head>

            {router.pathname === '/login' || router.pathname === '/newaccount' ?
                (
                    <div className=" bg-gray-800 flex min-h-screen flex items-center justify-evenly ">
                        <div className>
                            {children}
                        </div>
                        <div className="hidden lg:block">
                            <DataSvg />
                        </div>
                    </div>
                ) : (<div className="bg-gray-200 min-h-screen">
                    <div className="sm:flex min-h-screen">
                        <Sidebar />

                        <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
                            <Header />
                            {children}
                        </main>


                    </div>

                </div>)}



        </>
    )
}

export default Layout;