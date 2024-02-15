import React from 'react'
import Header from '../../components/templates/Header'
import Footer from '../../components/templates/Footer'
import Home from './Home'
import { Helmet } from 'react-helmet-async'

const HomeLayout: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Python Coding</title>
                <meta property="og:title" content="Python Coding" />
                <meta property="og:description" content="Python Data Science web based code editor for learning and practicing Python coding" />
                <meta property="og:image" content="https://blog.logrocket.com/wp-content/uploads/2021/12/python-datetime-module.png" />
                <meta property="og:url" content="" />
                <meta property="og:type" content="website" />
            </Helmet>
            <div>
                <Header />
                <Home />
                <Footer />
            </div>
        </>
    )
}

export default HomeLayout