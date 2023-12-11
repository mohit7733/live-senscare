import React from 'react'
import Footer from './common/footer'
import Header from './common/header'
import Testimonials from './common/testimonials'


function Thank_providers() {
    return (
        <>
            <Header />
            <div className='container-fluid '>
                <div className='container'>
                    <div className='thank_page '>
                        <h2>Thank You for Joining SensCare! </h2>
                        <div className='thanks over'>
                            <h4>Together We Create the Future.</h4>
                            <p>Thank you for registering with SensCare! A confirmation has been sent to you. Please check your email and activate your account. If you haven't received an email, check your spam folder.</p>
                            <ul>
                                <li><img src='./images/thanks_right.svg' /> <span>Large selection of jobs (domestically and internationally).</span></li>
                                <li><img src='./images/thanks_right.svg' /> <span>Fast, quality and safe services.</span></li>
                                <li><img src='./images/thanks_right.svg' /> <span>Find an ideal job.</span></li>

                            </ul>
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

export default Thank_providers
