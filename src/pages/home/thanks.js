import React from 'react'
import Footer from './common/footer'
import Header from './common/header'
import Testimonials from './common/testimonials'
import { Link } from 'react-router-dom'


function Thank() {
    return (
        <>
            <Header />
            <div className='container-fluid '>
                <div className='container'>
                    <div className='thank_page '>
                        <div className='thanks over'>
                            <h2>Thank You! </h2>
                            {/* <h3>Stay tuned, we are coming soon!</h3> */}
                        </div>
                        <img className='flow' src='./images/thank_banner.png' />
                    </div>
                </div>
            </div>
            <Testimonials />
            <Footer />
        </>
    )
}

export default Thank
