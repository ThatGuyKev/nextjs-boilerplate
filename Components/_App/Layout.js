import React, { useEffect, useState } from 'react'
import Head from "next/head"
import { ToastProvider } from 'react-toast-notifications'
import { Toaster } from 'react-hot-toast'
import Router from 'next/router'
import GoTop from './GoTop'
import Navbar from './Navbar'
import Footer from './Footer'
import Preloader from './Preloader'

const Layout = ({
    children,
    user,
    title,
    description,
    canonical,
    css,
    js,
    image,
    keywords,
}) => {
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1000);
    }, [])

    Router.events.on('routeChangeStart', () => {
        setLoader(true)
    })
    Router.events.on('routeChangeComplete', () => {
        setLoader(false)
    })
    Router.events.on('routeChangeError', () => {
        setLoader(false)
    })

    const isCustomer = user && user.role === 'customer'
    const isAdmin = user && user.role === 'admin'
    const isStaff = user && user.role === 'staff'


    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta property="og:type" content="website" />
                <meta name="og:title" property="og:title" content={title} />
                <meta
                    name="og:description"
                    property="og:description"
                    content={description}
                />
                <meta property="og:site_name" content="NowDeals" />
                <meta property="og:url" content={`${canonical}`} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:site" content="@nowdeals" />
                <meta name="twitter:creator" content="@nowdeals" />
                {css && <link rel="stylesheet" href={`${css}`} />}
                {image ? (
                    <meta property="og:image" content={`${image}`} />
                ) : (
                    <meta property="og:image" content="" />
                )}
                {image && <meta name="twitter:image" content={`${image}`} />}
                {canonical && <link rel="canonical" href={`${canonical}`} />}
                {js && <script type="text/javascript" src={`${js}`}></script>}
            </Head>

            {loader && <Preloader />}

            <Toaster
                position="top-left"
                reverseOrder={false}
            />

            <ToastProvider
                placement='bottom-left'
                autoDismissTimeout={10000}
                autoDismiss
            >
                <Navbar user={user} />


                {children}

                <GoTop scrollStepInPx="100" delayInMs="10.50" />
                <Footer />
            </ToastProvider>

        </React.Fragment>
    );
}

export default Layout;