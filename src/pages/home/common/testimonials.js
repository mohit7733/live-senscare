import React, { useEffect, useState } from 'react'


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import Add_testmonial from './add_testmonial';
import { api } from '../../../urls';
import TranslateComponent from '../../../translate-component';



function Testimonials() {
    const sliderRef = useRef();
    const [count, setcount] = useState(false)
    const [hover, setHover] = useState(0);
    const [testimonialdata, settestimonialdata] = useState([])
    const [reflect, setreflect] = useState([])

    useEffect(() => {
        if (!count) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            fetch(api + "/api/getallsurvey", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result,'result testiomonials')
                    settestimonialdata(result.data)
                    setcount(true)
                    setTimeout(() => {
                        settestimonialdata(result.data)
                    }, 5000);
                    console.log(result);
                    result.data.map((e) => reflect.push(e))
                })
                .catch(error => console.log('error', error));
        }
    }, [count, testimonialdata, reflect])



    const testmonialdata = ((e, index) => {
        return (
            <div className="item" key={index}>
                <div className='profile_image'>
                    <img src={api + "/public/assets/images/users/" + e.image} alt='profile' />
                </div>
                <div className='review'>
                    <span className='star'>
                        <div className="star-rating">
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <i
                                        type="button"
                                        key={index}
                                        className={index <= (e.overallValue) ? "on fa-solid fa-star" : "off fa-regular fa-star"}
                                    >
                                    </i>
                                );
                            })}
                        </div>
                    </span>
                    <Add_testmonial name={e.username} />
                    <p>{e.userReview}  </p>
                </div>
            </div>
        )
    })

    const cursoleslid = () => {
        return (
            testimonialdata && testimonialdata.map(testmonialdata)
        )
    }
    var settings2 = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        arrows: true,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };
    return (
        <>
            <div className='container-fluid bggray'>
                <div className='container'>
                    <div className='testimonial_slid'>
                        <h2>Testimonials </h2>
                        <p>See what our clients think about using the SensCare platform. </p>
                        <Slider ref={sliderRef} {...settings2} id="Slider-4" className='slider_test'>
                            {cursoleslid()}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonials
