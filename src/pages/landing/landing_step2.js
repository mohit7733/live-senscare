import React, { useEffect, useState } from 'react'
import Footer from './common/footer'
import Header from './common/header'
import { Link } from 'react-router-dom'
import Landing_form from './common/landing_form'
import { api } from '../../urls'
import Modal from 'react-bootstrap/Modal'


function Landing_step2() {
    const [reviewmodel, setreviewmodel] = useState(false)
    const videoclick = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "clickcount": "1"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/exploreclickcounts", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <Header />
            <div className='container-fluid border'>
                <div className='container'>
                    <div className='landing_page'>
                        <h2>The best child services marketplace is coming soon!</h2>
                        <div className='left_form'>
                            <p>Our team consists of professors, special education professionals, and international ABA therapists. The child care you need, the job you want.</p>
                            <div className='hire_because'>
                                <h4>Hire or Become</h4>
                                <ul>
                                    <li>
                                        <img src='./images/nany.svg' alt='icon' />
                                        <span>Nanny</span>
                                    </li>
                                    <li>
                                        <img src='./images/special.svg' alt='icon' />
                                        <span>Special education provider</span>
                                    </li>
                                    <li>
                                        <img src='./images/turor.svg' alt='icon' />
                                        <span>Tutor</span>
                                    </li>
                                </ul>
                            </div>
                            <div className='dask bgnon'>
                                <Landing_form />
                            </div>
                        </div>
                        <div className='right_section'>
                            <ul>

                                <li>
                                    <Link to='/about-sensCare' >
                                        {/* <Link to='/' > */}
                                        {/* <svg width="110" height="80" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="32" cy="32" r="32" />
                                            <circle cx="32" cy="32" r="24.5" stroke="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.9054 22.1352C32.4055 21.6353 31.595 21.6353 31.0952 22.1352C30.5953 22.635 30.5953 23.4455 31.0952 23.9454L37.8701 30.7203H23.0403C22.3333 30.7203 21.7603 31.2933 21.7603 32.0003C21.7603 32.7072 22.3333 33.2803 23.0403 33.2803H37.8701L31.0952 40.0552C30.5953 40.555 30.5953 41.3655 31.0952 41.8654C31.595 42.3652 32.4055 42.3652 32.9054 41.8654L41.8653 32.9053C42.3652 32.4055 42.3652 31.595 41.8653 31.0952L32.9054 22.1352Z" fill="white" />
                                        </svg> */}
                                        <img src="./images/arrow.png" alt="icon" />
                                        <span onClick={videoclick}>Meet SensCare Team</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='#' onClick={() => {
                                        setreviewmodel(true)
                                        videoclick()
                                    }} >
                                        <img src="./images/play.png" alt="icon" />
                                        <span >Explore SensCare platform</span>
                                    </Link>
                                </li>
                            </ul>
                            <img src='./images/landing.png' alt='banner' />
                        </div>
                        <div className='left_form'>

                            <div className='mobile'>
                                <Landing_form />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {
                reviewmodel ?
                    <Modal className='video_landing' show={reviewmodel} onHide={e => setreviewmodel(false)
                    } >
                        <div className='promocode_content reactiveask'>
                            <Link to="" onClick={e => setreviewmodel(false)}>+ </Link>
                            <video width="100%" controls autoPlay={true} >
                                <source src="./images/Sense_Care_Demo_Video_FINAL_WEB.mp4" type="video/mp4" />
                                {/* <source src="./images/Sense_Care_Demo_Video_FINAL_WEB.ogg" type="video/ogg" /> */}
                                Your browser does not support HTML video.
                            </video>
                        </div>
                    </Modal > : ""
            }
        </>
    )
}

export default Landing_step2
