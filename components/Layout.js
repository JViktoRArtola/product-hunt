import React from 'react';
import Head from "next/head";

const Layout = props => {
    return (
        <>
            <Head>
                <title>Product Hunt</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                {props.children}
            </main>
        </>
    );
};

export default Layout;
