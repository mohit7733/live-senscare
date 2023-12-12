import React, { useEffect, useState } from 'react'
import { api } from '../../../urls';
import Footer from './footer'
import Header from './header'


function Cookie_policy() {
    const [count, setcount] = useState(true);
    const [investor, setinvestor] = useState({});
    useEffect(() => {
        if (count) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(api + "/api/cookiepolicy", requestOptions)
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
                            <h2>{investor.title}</h2> : ""}
                        {
                            investor.description ?
                            <div className="privacycon" dangerouslySetInnerHTML={{ __html: investor.description }} /> : ""
                        }

                        <br />
                        <br />
                        <br />
                        <div className='category_use'>
                            <ul>
                                <li>Category of use</li>
                                <li>Example</li>
                            </ul>
                            <ul>
                                <li>
                                    <h4>Preferences</h4>
                                    <p>Preferences cookies enables the functionality of our Services and helps us provide a personalized experience of our Site. It remembers information such as preferred language and currency and then adapt how the Site appears or behaves. </p>
                                </li>
                                <li>
                                    <h4>Authentication & Security</h4>
                                    <p><strong>Authentication</strong><br />
                                         If you have an account on the Platform, we use cookies to verify your account and, if you prefer, keep you logged in so that our Services will be more accessible to you. Cookies also allow us to store security information so that we can recover your account in case it has been hacked or you have forgotten your password.
                                        <br />
                                        <br />
                                        <br />

                                        <strong>Security</strong><br />
                                        If you have an account on the Platform, security cookies help us keep your account safe and protect user data from unauthorized parties. These cookies prevent fraudulent use of login credentials by, for instance, applying further security measures when someone attempts to access your account without the proper authorization.
                                    </p>
                                </li>
                                <li>
                                    <h4>Performance</h4>
                                    <p>Performance cookies enables all functions on our Site to work correctly. For example, you may not be able to use our search function or login page (if you have an account) without these cookies. </p>
                                </li>
                                <li>
                                    <h4>Analytics</h4>
                                    <p>These cookies will provide information regarding how visitors interact with our Services and makes it possible for us to collect information about which aspects should be further developed in order to improve the user experience</p>
                                </li>

                            </ul>
                        </div>
                        {
                            investor.description2 ?
                                <div className="privacycon"  dangerouslySetInnerHTML={{ __html: investor.description2 }} /> : ""
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cookie_policy
