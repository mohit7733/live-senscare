import React from 'react'
import { Link } from 'react-router-dom'
// import { useHistory } from "react-router-dom";
import Footer from './common/footer'
import Header from './common/header'


function Error() {
    // const history = useHistory();
    return (
        <>
            <Header />
            <div className='container-fluid '>
                <div className='container'>
                    <div className='thank_page error'>
                        <h2>Oh snap! Error 404.</h2>
                        <div className='thanks'>
                            <p>Sorry! We couldn't find what  you are looking for.</p>
                            <Link to={"/"}><img src={window.location.origin + '/images/left_arrow_fill.svg'} /> <span>Please return to previous page</span></Link>
                        </div>
                        <img src={window.location.origin + '/images/Error-404-animation.gif'} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Error
