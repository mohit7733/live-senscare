import React from 'react'
import Footer from './common/footer'
import Header from './common/header'
import { Link } from 'react-router-dom'


function Welcome() {
    return (
        <>
            <Header login={"true"} />
            <div className='container-fluid '>
                <div className='container'>
                    <div className='thank_page welcome'>
                        <h2><span>Success!</span> Welcome On Board.  </h2>
                        <div className='thanks'>
                            <p>You have successfully activated your account.<br />
                               Please log in to proceed to your profile page and fill in more details.  </p>
                            <Link to='/login'>Log In </Link>
                        </div>
                        <img src='./images/thank_banner.png' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Welcome
