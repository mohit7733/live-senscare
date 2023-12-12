import React from 'react'
import Footer from './common/footer'
import Header from './common/header'
import { Link } from 'react-router-dom'


function Emai_thank() {
    return (
        <>
            <div className='verify'>
                <Header />
                <div className='container-fluid border'>
                    <div className='container'>
                        <div className='verify_content'>
                            <p>
                           Dear username,  
                                <br />
                                <br />
                               Thank you for your interest in joining SensCare platform! 
                                <br />
                                <br />
                               To complete your registration, please verify your email address.
                            </p>
                            <button>Verify</button>
                            <br />
                            <br />
                            <br />
                            <br />
                            <p>Sincerely,</p>
                            <h4><img src='./images/signature.png' /></h4>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Emai_thank
