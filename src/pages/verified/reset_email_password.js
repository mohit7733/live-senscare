import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './common/footer'
import Header from './common/header'


function Reset_email() {
    return (
        <>
            <div className='verify'>
                <Header />
                <div className='container-fluid border'>
                    <div className='container'>
                        <div className='verify_content Reset_email'>
                            <p>
                             Dear username,
                                <br />
                                <br />
                                 We have received your request to reset your password. 
                                 To reset your password click the button below within 24 hours.
                                <br />
                                <button>Reset Password</button>
                                <br />
                                <br />
                                <br />
                                If you haven’t made this request, please contact us immediately at    <Link to={"techsupport@senscare"}>techsupport@senscare.</Link>

                            </p>
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

export default Reset_email
