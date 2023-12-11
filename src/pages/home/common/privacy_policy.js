import React, { useEffect, useState } from 'react'
import { api } from '../../../urls';
import Footer from './footer'
import Header from './header'

function Privacy_policy() {
    const [count, setcount] = useState(true);
    const [investor, setinvestor] = useState({});
    useEffect(() => {
        if (count) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(api + "/api/privacypolicy", requestOptions)
                .then(response => response.json())
                .then(result => setinvestor(result.data))
                .catch(error => console.log('error', error));
            setcount(false)
        }
    }, [count])
    return (
        <>
            <Header />
            <div className='container-fluid'>
                <div className='container'>
                    <div className='contact privacy'>
                        {investor.title ?
                            <h2>{investor.title} </h2> : ""}
                        {investor.description ?
                            <div className="privacycon" dangerouslySetInnerHTML={{ __html: investor.description }} /> : ""
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Privacy_policy
