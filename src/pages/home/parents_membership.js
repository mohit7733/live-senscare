import React, { useState, useEffect } from 'react'
import { country } from './common/country'
import Footer from './common/footer'
import Header from './common/header'
import Modal from 'react-bootstrap/Modal'
import { api } from '../../urls'
import { Link } from 'react-router-dom'


function Parents_membership() {
    const [count, setcount] = useState(true)
    const [detail, setdetail] = useState("")
    const [plan, setplan] = useState("")
    const [iep, setiep] = useState("")
    const [planmobile, setplanmobile] = useState("")
    const [complete, setcomplete] = useState(0)
    const [complete2, setcomplete2] = useState(0)
    const [month, setmonth] = useState(0)
    const [step, setstep] = useState(1)
    const [paymenttype, setpaymenttype] = useState(false)
    const [savepayment, setsavepayment] = useState(false)
    const [country2, setcountry] = useState()
    const [error, seterror] = useState({
        month: "",
        plan: ""
    })
    useEffect(() => {
        if (count) {
            profile_data()
            membership()
            setcount(false)
        }
        console.log(plan, month, iep, country2);
    }, [detail, month, complete, complete2, savepayment, country2])
    const [check, setcheck] = useState({
        month: "",
        plan: ""
    })
    const [showflogin, setShowflogin] = useState(false);
    const handleCloselogin_first = () => {
        setShowflogin(false)
    };
    const redirect = () => {
        window.location.href = "/search-providers"
    }
    const countprice = () => {
        setTimeout(() => {
            let planprice = (plan == "Hummingbird" ? 0 : plan == "Swan" ? 25.5 : plan == "Flamingo" ? detail.country == "Serbia" ? 40 : 40.80 : "")
            let iepadd = (iep != "" ? 41 : 0)
            let monthprice = planprice * month
            setcomplete(monthprice + iepadd)
        }, 500);
    }
    const countprice2 = () => {
        setTimeout(() => {
            let planprice = (plan == "Hummingbird" ? 0 : plan == "Swan" ? 30 : plan == "Flamingo" ? 50 : "")
            let iepadd = (iep != "" ? 41 : 0)
            let monthprice = planprice * month
            setcomplete2(monthprice + iepadd)
        }, 500);
    }
    const profile_data = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token")
        );

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/details", requestOptions)
            .then(response => response.json())
            .then(result => {
                setdetail(result.data)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    const membership = () => {
        if (localStorage.getItem("user_type") == "parents") {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(api + "/api/v1/getmembershipplan", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.data && result.data.usertype == "parents") {
                        setiep(result.data.iep)
                        setmonth(parseInt(result.data.month))
                        setplan(result.data.name)
                        setcheck({
                            month: parseInt(result.data.month),
                            plan: result.data.name
                        })
                    }
                    console.log(result)
                })
                .catch(error => console.log('error', error));
        }
    }

    const updatemembership = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "price": complete,
            "name": plan,
            "month": month,
            "iep": iep
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/savemembershipplan", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                alert("done")
                if (check.month != "" && check.month != month || check.plan != "" && check.plan != plan) {
                    setShowflogin(true)
                }
            })
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <Header />
            <div class="container-fluid">
                <div class="container" style={step == 1 ? { display: 'block' } : { display: 'none' }}>
                    <div class="member_ship">
                        <h2>Membership Plans</h2>
                        <p>Create a free account today, join our platform and explore a new world of opportunities. Better care
                            now grants you a better future tomorrow!</p>
                        <div class="time_btns" onClick={e => seterror({ ...error, month: "" })}>
                            <button onClick={e => setmonth(1)} className={month == 1 ? "active" : ""}><span className={error.month != "" ? "bordererror" : ""}>Monthly</span></button>
                            <button onClick={e => setmonth(3)} className={month == 3 ? "active" : ""}><span className={error.month != "" ? "bordererror" : ""}>3Months </span></button>
                            <button onClick={e => setmonth(6)} className={month == 6 ? "active" : ""}><span className={error.month != "" ? "bordererror" : ""}>6 Months</span></button>
                        </div>

                    </div>
                    <div class="member_ship_table">
                        <div class="table_head">
                            <p>*All prices are on monthly basis.</p>
                        </div>
                        <div class="mobile_collap">
                            <button type="button" className={plan == "Hummingbird" ? "active collapsible" : "collapsible"} onClick={e => setplanmobile("Hummingbird")}>
                                <div class="price_content">
                                    <img src="img/bird.png" alt="bird" />
                                    <div class="price_under_content one">
                                        <h2>Hummingbird</h2>
                                        <h3>free</h3>
                                    </div>
                                </div>
                            </button>
                            <div class={planmobile == "Hummingbird" ? "content active" : "content"}>
                                <ul className={plan == "Hummingbird" ? "active" : ""}>
                                    <li>Create profile</li>
                                    <li>Post up to 1 photo</li>
                                    <li>Browse candidates’ profiles</li>
                                    <li>Post up to 1 job offer</li>
                                    <li>Send interview requests <span>UNLIMITED</span></li>
                                    <li>Receive applications <span>UNLIMITED</span></li>
                                    <li class="iep_faq">
                                        <div class="iep_containter">IEP development
                                            <img src="img/faq.png" alt="FAQ" />
                                            <div class="iep_content">
                                                <p>Our team of experts will develop IEP for your child.
                                                    After a comprehensive evaluation of cognitive, language, and academic skills we
                                                    will
                                                    include in the IEP report a present level of performances, specific IEP goals,
                                                    frequency and duration of special education services, and recommendations of
                                                    needed
                                                    accommodations.
                                                    In addition, we will be available for a consultation with school members
                                                    regarding
                                                    the implementation of IEP goals.
                                                    *This price includes one IEP report.</p>
                                            </div>
                                        </div>
                                        (full report/accomodations reccommendation/IEP goals/school
                                        consulting)
                                        <div class="iep_section">
                                            <div class="iep_plan">
                                                <input type="checkbox" name="price" id="" checked={iep == "Hummingbird" ? true : false} onClick={e => {
                                                    if (e.target.checked) {
                                                        setiep("Hummingbird")
                                                    } else {
                                                        setiep("")
                                                    }
                                                }} />
                                                <div class="iep">
                                                    <p>Add IEP development</p>
                                                    <p>Price: <strong>{detail.country == "Serbia" ?
                                                        <><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#A98D4B" />
                                                        </svg>
                                                            4100
                                                        </> : "$41"}</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class={error.plan != "" ? "borderred select_button" : "select_button"} onClick={e => seterror({ ...error, plan: "" })}>
                                    <button onClick={e => {
                                        setiep("")
                                        setplan("Hummingbird")
                                    }} className={plan == "Hummingbird" ? "active" : ""}>Select</button>
                                </div>
                            </div>
                            <div class="choose">
                                <p>best choice</p>
                                <p class="choose_save">Save 15%</p>
                            </div>
                            <button type="button" className={plan == "Swan" ? "active collapsible" : "collapsible"} onClick={e => setplanmobile("Swan")}>
                                <div class="price_content">
                                    <img src="img/swan.png" alt="bird" />
                                    <div class="price_under_content two">
                                        <h2>Swan</h2>
                                        {detail.country == "Serbia" ?
                                            <>
                                                <h3><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#fff" />
                                                </svg> 2550</h3>
                                                <h4><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#fff" />
                                                </svg> 3000</h4>
                                            </>
                                            :
                                            <>
                                                <h3>$25.5</h3>
                                                <h4>$30</h4>
                                            </>}
                                    </div>
                                </div>
                            </button>
                            <div class={planmobile == "Swan" ? "content active" : "content"}>
                                <ul className={plan == "Swan" ? "active" : ""}>
                                    <li>Create profile</li>
                                    <li>Post up to 2 photo</li>
                                    <li>Browse candidates’ profiles</li>
                                    <li>Post up to 5  job offers monthly</li>
                                    <li>Send interview requests <span>UNLIMITED</span></li>
                                    <li>Receive applications <span>UNLIMITED</span></li>
                                    <li>Connect with candidates <span>UNLIMITED</span></li>
                                    <li>Rate and review providers</li>
                                    <li>Request background check</li>
                                    <li>Request recommendations and certificates</li>
                                    <li>Notifications for matching candidates in your area</li>
                                    <li class="iep_faq">
                                        <div class="iep_containter">IEP development
                                            <img src="img/faq.png" alt="FAQ" />
                                            <div class="iep_content">
                                                <p>Our team of experts will develop IEP for your child.
                                                    After a comprehensive evaluation of cognitive, language, and academic skills we
                                                    will
                                                    include in the IEP report a present level of performances, specific IEP goals,
                                                    frequency and duration of special education services, and recommendations of
                                                    needed
                                                    accommodations.
                                                    In addition, we will be available for a consultation with school members
                                                    regarding
                                                    the implementation of IEP goals.
                                                    *This price includes one IEP report.</p>
                                            </div>
                                        </div>
                                        (full report/accomodations reccommendation/IEP goals/school
                                        consulting)
                                        <div class="iep_section">
                                            <div class="iep_plan">
                                                <input type="checkbox" name="price" id="" checked={iep == "Swan" ? true : false} onClick={e => {
                                                    if (e.target.checked) {
                                                        setiep("Swan")
                                                    } else {
                                                        setiep("")
                                                    }
                                                }} />
                                                <div class="iep">
                                                    <p>Add IEP development</p>
                                                    <p>Price: <strong>{detail.country == "Serbia" ?
                                                        <><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#A98D4B" />
                                                        </svg>
                                                            4100
                                                        </> : "$41"}</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class={error.plan != "" ? "borderred select_button" : "select_button"} onClick={e => seterror({ ...error, plan: "" })}>
                                    <button onClick={e => {
                                        setiep("")
                                        setplan("Swan")
                                    }} className={plan == "Swan" ? "active" : ""}>Select</button>
                                </div>
                            </div>
                            <div class="choose">
                                <p>excellent choice</p>
                                <p class="choose_save">Save20%</p>
                            </div>
                            <button type="button" className={plan == "Flamingo" ? "active collapsible" : "collapsible"} onClick={e => setplanmobile("Flamingo")}>
                                <div class="price_content ">
                                    <img src="img/flam.png" alt="bird" />
                                    <div class="price_under_content three">
                                        <h2>Flamingo</h2>
                                        {detail.country == "Serbia" ?
                                            <>
                                                <h3><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#fff" />
                                                </svg> 4000</h3>
                                                <h4><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#fff" />
                                                </svg> 5000</h4>
                                            </>
                                            :
                                            <>
                                                <h3>$40.80</h3>
                                                <h4>$50</h4>
                                            </>}
                                    </div>
                                </div>
                            </button>
                            <div class={planmobile == "Flamingo" ? "content active" : "content"}>
                                <ul className={plan == "Flamingo" ? "active" : ""}>
                                    <li>Create profile</li>
                                    <li>Post up to 2 photos and 1 video</li>
                                    <li>Browse candidates’ profiles</li>
                                    <li>Post job offers <span>UNLIMITED</span></li>
                                    <li>Send interview requests <span>UNLIMITED</span></li>
                                    <li>Receive applications <span>UNLIMITED</span></li>
                                    <li>Connect with candidates <span>UNLIMITED</span></li>
                                    <li>Rate and review providers</li>
                                    <li>Request background check</li>
                                    <li>Request recommendations and certificates</li>
                                    <li>Notifications for matching candidates in your area</li>
                                    <li>Appear higher in search results</li>
                                    <li>See who viewed your profile</li>
                                    <li>SensCare selection of candidates(up to 10 candidates)</li>
                                    <li>Consultation with ABA therapist/ Special education specialist/or Agency coordinator via Skype or Zoom(45 mins monthly)</li>
                                    <li class="iep_faq">
                                        <div class="iep_containter">IEP development
                                            <img src="img/faq.png" alt="FAQ" />
                                            <div class="iep_content">
                                                <p>Our team of experts will develop IEP for your child.
                                                    After a comprehensive evaluation of cognitive, language, and academic skills we
                                                    will
                                                    include in the IEP report a present level of performances, specific IEP goals,
                                                    frequency and duration of special education services, and recommendations of
                                                    needed
                                                    accommodations.
                                                    In addition, we will be available for a consultation with school members
                                                    regarding
                                                    the implementation of IEP goals.
                                                    *This price includes one IEP report.</p>
                                            </div>
                                        </div>
                                        (full report/accomodations reccommendation/IEP goals/school
                                        consulting)
                                        <div class="iep_section">
                                            <div class="iep_plan">
                                                <input type="checkbox" name="price" id="" checked={iep == "Flamingo" ? true : false} onClick={e => {
                                                    if (e.target.checked) {
                                                        setiep("Flamingo")
                                                    } else {
                                                        setiep("")
                                                    }
                                                }} />
                                                <div class="iep">
                                                    <p>Add Interview Invitesvelopment</p>
                                                    <p>Price: <strong>{detail.country == "Serbia" ? <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#fff" />
                                                    </svg> +
                                                        <><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#A98D4B" />
                                                        </svg>
                                                            4100
                                                        </> : "$41"}</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class={error.plan != "" ? "borderred select_button" : "select_button"} onClick={e => seterror({ ...error, plan: "" })}>
                                    <button onClick={e => {
                                        setiep("")
                                        setplan("Flamingo")
                                    }} className={plan == "Flamingo" ? "active" : ""}>Select</button>
                                </div>
                            </div>
                        </div>
                        <table id="customer_tabel">
                            <tr>
                                <th class="blank"></th>
                                <td class="blank"></td>
                                <td class={plan == "Swan" ? "choose active" : "choose"}>
                                    <p>best choice</p>
                                    <p class="choose_save">Save  15%</p>
                                </td>
                                <td class={plan == "Flamingo" ? "choose active" : "choose"}>
                                    <p>excellent choice</p>
                                    <p class="choose_save">Save 20%</p>
                                </td>
                            </tr>
                            <tr class="plan">
                                <th class="blank"></th>
                                <td class={plan == "Hummingbird" ? "price active" : "price"}>
                                    <div class="price_content">
                                        <img src="img/bird.png" alt="bird" />
                                        <div class="price_under_content">
                                            <h2>Hummingbird</h2>
                                            <h3>free</h3>
                                        </div>
                                    </div>
                                </td>
                                <td class={plan == "Swan" ? "price active" : "price"}>
                                    <div class="price_content">
                                        <img src="img/swan.png" alt="bird" />
                                        <div class="price_under_content">
                                            <h2>Swan</h2>
                                            {detail.country == "Serbia" ?
                                                <>
                                                    <h3><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#fff" />
                                                    </svg> 2550</h3>
                                                    <h4><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#fff" />
                                                    </svg> 3000</h4>
                                                </>
                                                :
                                                <>
                                                    <h3>$25.5</h3>
                                                    <h4>$30</h4>
                                                </>}
                                        </div>
                                    </div>
                                </td>
                                <td class={plan == "Flamingo" ? "price active" : "price"}>
                                    <div class="price_content">
                                        <img src="img/flam.png" alt="bird" />
                                        <div class="price_under_content">
                                            <h2>Flamingo</h2>
                                            {detail.country == "Serbia" ?
                                                <>
                                                    <h3><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#fff" />
                                                    </svg> 4000</h3>
                                                    <h4><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#fff" />
                                                    </svg> 5000</h4>
                                                </>
                                                :
                                                <>
                                                    <h3>$40.80</h3>
                                                    <h4>$50</h4>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plan">
                                <th>Create profile</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                                <td class={plan == "Swan" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th>Post photos/videos</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}>Up to 1 photo</td>
                                <td class={plan == "Swan" ? " active" : ""}>Up to 2 photos</td>
                                <td class={plan == "Flamingo" ? " active" : ""}>Up to 2 photos and 1 video</td>
                            </tr>
                            <tr class="plan">
                                <th>Browse candidates’ profiles</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                                <td class={plan == "Swan" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th>Post job offers</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}>Up to 1 photo</td>
                                <td class={plan == "Swan" ? " active" : ""}>Up to 5 posts monthly</td>
                                <td class={plan == "Flamingo" ? " active" : ""}>unlimited</td>
                            </tr>
                            <tr class="plan">
                                <th>Send interview requests</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}>unlimited</td>
                                <td class={plan == "Swan" ? " active" : ""}>unlimited</td>
                                <td class={plan == "Flamingo" ? " active" : ""}>unlimited</td>
                            </tr>
                            <tr class="plan">
                                <th>Receive applications</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}>unlimited</td>
                                <td class={plan == "Swan" ? " active" : ""}>unlimited</td>
                                <td class={plan == "Flamingo" ? " active" : ""}>unlimited</td>
                            </tr>
                            <tr class="plan">
                                <th>Connect with candidates</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                                <td class={plan == "Swan" ? " active" : ""}>unlimited</td>
                                <td class={plan == "Flamingo" ? " active" : ""}>unlimited</td>
                            </tr>
                            <tr class="plan">
                                <th>Rate and review providers</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                                <td class={plan == "Swan" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th>Request background check</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                                <td class={plan == "Swan" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th>Request recommendations and certificates</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                                <td class={plan == "Swan" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th>Notifications for matching candidates in your area</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                                <td class={plan == "Swan" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th>Appear higher in search results</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                                <td class={plan == "Swan" ? " active" : ""}></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th>See who viewed your profile</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                                <td class={plan == "Swan" ? " active" : ""}></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th>SensCare selection of candidates(up to 10 candidates)</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                                <td class={plan == "Swan" ? " active" : ""}></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th>Consultation with ABA therapist/ Special education specialist/or Agency coordinator via
                                    Skype or Zoom (45 mins monthly)</th>
                                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                                <td class={plan == "Swan" ? " active" : ""}></td>
                                <td class={plan == "Flamingo" ? " active" : ""}><img src="img/vector.png" alt="Tick" /></td>
                            </tr>
                            <tr class="plan">
                                <th class="iep_faq" >
                                    <div class="iep_containter">IEP development
                                        <img src="img/faq.png" alt="FAQ" />
                                        <div class="iep_content">
                                            <p>Our team of experts will develop IEP for your child.
                                                After a comprehensive evaluation of cognitive, language, and academic skills we
                                                will
                                                include in the IEP report a present level of performances, specific IEP goals,
                                                frequency and duration of special education services, and recommendations of
                                                needed
                                                accommodations.
                                                In addition, we will be available for a consultation with school members
                                                regarding
                                                the implementation of IEP goals.
                                                *This price includes one IEP report.</p>
                                        </div>
                                    </div>
                                    (full report/accomodations reccommendation/IEP goals/school
                                    consulting)
                                </th>
                                <td class={iep == "Hummingbird" ? "iep_section active" : "iep_section"}>
                                    <div class="iep_plan">
                                        <input type="checkbox" name="price" id="" checked={iep == "Hummingbird" ? true : false} onClick={e => {
                                            if (e.target.checked) {
                                                setiep("Hummingbird")
                                            } else {
                                                setiep("")
                                            }
                                        }} />
                                        <div class="iep">
                                            <p>Add IEP development</p>
                                            <p>Price: <strong>{detail.country == "Serbia" ?
                                                <><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#A98D4B" />
                                                </svg>
                                                    4100
                                                </> : "$41"}</strong></p>
                                        </div>
                                    </div>
                                </td>
                                <td class={iep == "Swan" ? "iep_section active" : "iep_section"}>
                                    <div class="iep_plan">
                                        <input type="checkbox" name="price" id="" checked={iep == "Swan" ? true : false} onClick={e => {
                                            if (e.target.checked) {
                                                setiep("Swan")
                                            } else {
                                                setiep("")
                                            }
                                        }} />
                                        <div class="iep">
                                            <p>Add IEP development</p>
                                            <p>Price: <strong>{detail.country == "Serbia" ?
                                                <><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#A98D4B" />
                                                </svg>
                                                    4100
                                                </> : "$41"}</strong></p>
                                        </div>
                                    </div>
                                </td>
                                <td class={iep == "Flamingo" ? "iep_section active" : "iep_section"}>
                                    <div class="iep_plan">
                                        <input type="checkbox" name="price" id="" checked={iep == "Flamingo" ? true : false} onClick={e => {
                                            if (e.target.checked) {
                                                setiep("Flamingo")
                                            } else {
                                                setiep("")
                                            }
                                        }} />
                                        <div class="iep">
                                            <p>Add IEP development</p>
                                            <p>Price: <strong>{detail.country == "Serbia" ?
                                                <><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#A98D4B" />
                                                </svg>
                                                    4100
                                                </> : "$41"}</strong></p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="select_btn">
                                <th></th>
                                <td class={plan == "Hummingbird" ? " active" : ""}>
                                    <div class={error.plan != "" ? "borderred select_button" : "select_button"} onClick={e => seterror({ ...error, plan: "" })}>
                                        <button onClick={e => {
                                            if (iep != "Hummingbird") {
                                                setiep("")
                                            }
                                            setplan("Hummingbird")
                                        }} className={plan == "Hummingbird" ? "active" : ""}>Select</button>
                                    </div>
                                </td>
                                <td class={plan == "Swan" ? " active" : ""}>
                                    <div class={error.plan != "" ? "borderred select_button" : "select_button"} onClick={e => seterror({ ...error, plan: "" })}>
                                        <button onClick={e => {
                                            if (iep != "Swan") {
                                                setiep("")
                                            }
                                            setplan("Swan")
                                        }} className={plan == "Swan" ? "active" : ""}>Select</button>
                                    </div>
                                </td>
                                <td class={plan == "Flamingo" ? " active" : ""}>
                                    <div class={error.plan != "" ? "borderred select_button" : "select_button"} onClick={e => seterror({ ...error, plan: "" })}>
                                        <button onClick={e => {
                                            if (iep != "Flamingo") {
                                                setiep("")
                                            }
                                            setplan("Flamingo")
                                        }} className={plan == "Flamingo" ? "active" : ""}>Select</button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <br />
                    <br />
                    <div class="form_submit_button">
                        <div class="button">
                            <button class="can" onClick={e => {
                                if (plan && month) {
                                    setstep(2)
                                    window.scrollTo({ top: 0 })
                                    countprice()
                                    countprice2()
                                } else {
                                    window.scrollTo({ top: 0 })
                                    seterror({
                                        month: (month == "" ? "required" : ""),
                                        plan: (plan == "" ? "required" : "")
                                    })
                                }
                            }}>Next</button>
                        </div>
                    </div>
                </div>
                <div className='step2' style={step == 2 ? { display: 'block' } : { display: 'none' }}>
                    <div class="selected_plan">
                        <div class="container">
                            <div class="selected_page_content">
                                <h3>You Selected: <strong>{plan}</strong></h3>
                                <div class="change_plan_btn">
                                    <button onClick={e => {
                                        window.scrollTo({ top: 0 });
                                        setstep(1)
                                    }}>Change Plan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="total_amnt">
                        <div class="container">
                            <div class="total_amnt_content">
                                <h3>Total Amount To Pay:<s>{detail.country == "Serbia" ? <>
                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#A98D4B" />
                                    </svg>
                                    {complete2 * 100}
                                </> : "$" + complete2.toFixed(2)}</s> <span>{detail.country == "Serbia" ?
                                    <>
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#A98D4B" />
                                        </svg>
                                        {complete * 100}
                                    </> : "$" + complete.toFixed(2)}</span></h3>
                                <h4>Take advantage of our current discount offers and save{plan == "Swan" ? 15 : plan == "Flamingo" ? 20 : 100}% now.</h4>
                                <ul>
                                    <li>* Subscription will be automatically renewed unless you cancel it before the next renewal date.
                                    </li>
                                    <li>* Plus applicable local taxes and currency conversions.</li>
                                    {iep != "" ?
                                        <li>* <strong>IEP document</strong>development cost is included. </li> : ""}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="payment_details">
                            <h3>Payment Details</h3>
                            {
                                paymenttype == false ?
                                    <>
                                        <div class="payment_cards">
                                            <button><img src="img/mastercard.png" alt="" /></button>
                                            <button><img src="img/maestro.png" alt="" /></button>
                                            <button><img src="img/american_exp.png" alt="" /></button>
                                            <button><img src="img/paypal.png" alt="" onClick={() => setpaymenttype(!paymenttype)} /></button>
                                        </div>
                                    </>
                                    : ""}
                        </div>
                        {
                            paymenttype == false ?
                                <>
                                    <div class="payment_form">
                                        <form action="">
                                            <div class="row">
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label class="form-label" for="name">Name on Card</label>
                                                        <input type="text" id="name" placeholder="Type here" />
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label class="form-label" for="card">Card Number</label>
                                                        <input type="tel" id="card" placeholder="Type here" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label class="form-label" for="address">Billing Address</label>
                                                        <input type="text" id="address" placeholder="Type here" />
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="row exp_Sec">
                                                        <div class="col exp_sec">
                                                            <div class="form-group">
                                                                <label class="form-label" for="date">Expiration Date</label>
                                                                <input type="date" id="date" placeholder="Type here" />
                                                            </div>
                                                        </div>
                                                        <div class="col exp_sec">
                                                            <div class="form-group">
                                                                <label class="form-label" for="security">Security #</label>
                                                                <input type="tel" id="security" placeholder="Type here" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="form-group">
                                                                <label class="form-label" for="country">Country</label>
                                                                <select name="" id="" onChange={e => setcountry(e.target.value)}>
                                                                    <option selected>Choose from list</option>
                                                                    {
                                                                        country.data.map((e) => {
                                                                            return (
                                                                                <option value={e.country} >{e.country}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="col">
                                                            {
                                                                country2 != "Serbia" ?
                                                                    <div class="form-group">

                                                                        <label class="form-label" for="state">State</label>
                                                                        <input type="email" id="email" placeholder="Type here" />
                                                                        {/* <select name="" id="">
                                                    <option selected>Choose from list</option>
                                                    <option value="a">a</option>
                                                    <option value="a">a</option>
                                                    <option value="a">a</option>
                                                    <option value="a">a</option>
                                                </select> */}
                                                                    </div>
                                                                    : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label class="form-label" for="email">Email Address</label>
                                                        <input type="email" id="email" placeholder="Type here" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <div class="row city_zip">
                                                        <div class="col city_zip">
                                                            <div class="form-group">
                                                                <label class="form-label" for="city">City</label>
                                                                <input type="text" id="city" placeholder="Type here" />
                                                            </div>
                                                        </div>
                                                        <div class="col city_zip">
                                                            <div class="form-group">
                                                                <label class="form-label" for="zip">Zip Code</label>
                                                                <input type="tel" id="zip" placeholder="Type here" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group">
                                                        <div class="radio">
                                                            <input type="checkbox" checked={savepayment} onClick={e => setsavepayment()} />
                                                            <label>Save this card for future payments</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </>
                                :
                                <div className='Account '>
                                    <div className={"personal"} >
                                        <div className='cardstype' style={{ margin: "0" }}>
                                            <div className='paymenttype'>

                                                <ul>
                                                    <li>
                                                        <input type="radio" id='a' name='a' />
                                                        <label for="a">Pay with card</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id='b' name='a' />
                                                        <label for="b" onClick={() => setpaymenttype(!paymenttype)}>Pay with PayPal</label>
                                                    </li>
                                                </ul>

                                            </div>
                                            <h4>My Cards</h4>
                                            <div className='savecard' style={{ margin: "0" }}>
                                                <ul>
                                                    <li>

                                                        <label for="c"> <input type="radio" id='c' name='c' /><span>Use for payment</span></label>
                                                        <span>Card name</span>
                                                        <p>Bankname card ****4589</p>
                                                        <span>Expires on</span>
                                                        <p>04/2022</p>
                                                        <button style={{ textAlign: "right" }}>Edit</button>
                                                    </li>
                                                    <li>
                                                        <label for="d"> <input type="radio" id='d' name='c' /><span>Use for payment</span></label>
                                                        <span>Card name</span>
                                                        <p>Bankname card ****4589</p>
                                                        <span>Expires on</span>
                                                        <p>04/2022</p>
                                                        <button style={{ textAlign: "right" }}>Edit</button>
                                                    </li>
                                                    <li>
                                                        <label for="e"> <input type="radio" id='e' name='c' /><span>Use for payment</span></label>
                                                        <span>Card name</span>
                                                        <p>Bankname card ****4589</p>
                                                        <span>Expires on</span>
                                                        <p>04/2022</p>
                                                        <button style={{ textAlign: "right" }}>Edit</button>
                                                    </li>
                                                    <li>
                                                        <label for="e"> <input type="radio" id='e' name='c' /><span>Use for payment</span></label>
                                                        <span>Card name</span>
                                                        <p>Bankname card ****4589</p>
                                                        <span>Expires on</span>
                                                        <p>04/2022</p>
                                                        <button style={{ textAlign: "right" }}>Edit</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                        <div class="promotion">
                            <div class="promotion_code">
                                <label for="">Add a promotion code
                                    {/* <span>*This code expired.</span> */}
                                </label>
                                <input type="text" placeholder="ngsklf4875d" />
                                <button>Apply code</button>
                            </div>
                        </div>
                        <div class="pay_aggrement">
                            <input type="checkbox" />
                            <label for="">I agree to pay {detail.country == "Serbia" ?
                                <>
                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z" fill="#A98D4B" />
                                    </svg>
                                    {(complete / month).toFixed(2) * 100}
                                </> : "$" + (complete / month).toFixed(2)} monthly for {month > 0 ? month : ""}  {month == 1 ? "month " : "months "}subscription.</label>
                        </div>
                        <div class="form_submit_button">
                            <div class="button">
                                <button class="can" onClick={e => {
                                    setstep(1)
                                }}>Back</button>
                                <button class="sub" onClick={e => updatemembership()}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal show={showflogin} onHide={handleCloselogin_first}>
                <Modal.Body>
                    <div className='promocode_content login_first'>
                        <Link to="" onClick={handleCloselogin_first}>+ </Link>
                        <h2>Congratulations on your new membership plan</h2>
                        <img src='./images/create_profile.png' />
                        <p className='pro' style={{ color: "#636363" }}>It’s time to find your perfect candidate!</p>
                        <button onClick={redirect}>Search for candidates</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Parents_membership
