import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import { api } from '../../urls'
import { country } from './common/country'
import Footer from './common/footer'
import Header from './common/header'

const emailRegex = RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);
function Work_us() {
    const [show, setShow] = useState(false);
    const [count, setcount] = useState(true);
    const [investor, setinvestor] = useState({});
    const [country_number, setcountry_number] = useState("");
    const [button, setbutton] = useState(false);
    const handleClose = () => {
        setShow(false)
        window.location.reload()
    };
    const handleShow = () => setShow(true);
    const [refresh, setrefresh] = useState('')
    const [test, settest] = useState([{
        name: "email"
    }, {
        name: "first_name"
    }, {
        name: "last_name"
    }, {
        name: "phone"
    }, {
        name: "message"
    }
    ])
    const [form_logins, setform_logins] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        message: ""
    });
    const [error, seterror] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        message: ""
    });
    const logins_field_test = (name) => {
        switch (name) {
            case 'email':
                error.email =
                    form_logins.email == ''
                        ? "required"
                        : "";
                break;
            case 'first_name':
                error.first_name =
                    form_logins.first_name != ''
                        ? "" : "required";
                break;
            case 'last_name':
                error.last_name =
                    form_logins.last_name != ''
                        ? "" : "required";
                break;
            case 'phone':
                error.phone =
                    form_logins.phone != ''
                        ? "" : "required";
                break;
            case 'message':
                error.message =
                    form_logins.message != ''
                        ? "" : "required";
                break;
            default:
                break;
        }
        seterror(error)
        setTimeout(() => {
            setrefresh("njjijiinibiibi")
        }, 1000);
    }
    const logins_field = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                error.email =
                    emailRegex.test(value)
                        ? "" : "Email not valid.";

                break;
            case 'first_name':
                error.first_name =
                    value.length < 2
                        ? "Minimum 2 characters required"
                        : "";
                break;
            case 'last_name':
                error.last_name =
                    value.length < 2
                        ? "Minimum 2 characters required"
                        : "";
                break;
            case 'phone':
                error.phone =
                    value.length < 10
                        ? "required"
                        : "";
                break;
            case 'message':
                error.message =
                    value.length < 2
                        ? "required"
                        : "";
                error.message =
                    value.length > 301
                        ? "Maximum 300 characters valid "
                        : "";
                break;
            default:
                break;
        }
        setform_logins({ ...form_logins, [name]: value })
        seterror(error)
    }


    const contact_us = () => {
        setbutton(true)
        if (error.email == '' & error.first_name == '' & error.last_name == '' & error.phone == '' & error.message == '' & form_logins.email != '' & form_logins.first_name != '' & form_logins.last_name != '' & form_logins.phone != '' & form_logins.message != '') {
            var formdata = new FormData();
            formdata.append("first_name", form_logins.first_name);
            formdata.append("last_name", form_logins.last_name);
            formdata.append("email", form_logins.email);
            formdata.append("phone", (country_number + form_logins.phone));
            formdata.append("related_question", form_logins.gender);
            formdata.append("message", form_logins.message);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(api + "/api/workwithusenquiry", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result,'result')
                    result.success ? handleShow() : handleClose()
                    setbutton(false)
                })
                .catch(error => console.log('error', error));
        }
        else {
            test.map((e) => {
                logins_field_test(e.name)
            })
            setbutton(false)
        }
    }
    useEffect(() => {
        if (count) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(api + "/api/workwithus", requestOptions)
                .then(response => response.json())
                .then(result => setinvestor(result.data))
                .catch(error => console.log('error', error));
            setcount(false)
        }
    }, [count, error])
    return (
        <>
            <Header />
            <div className='container-fluid' style={{ marginBottom: "20px" }}>
                <div className='container' style={{maxWidth:'740px'}}>
                    <div className='contact'>
                        {investor.title ?
                            <h2>{investor.title} </h2> : ""}
                        {investor.description ?
                             <div className="privacycon" dangerouslySetInnerHTML={{ __html: investor.description }} /> : ""}
                        <h3>Send us message</h3>
                        <div className='form border'>
                            <form className=''>
                                <div className='form_group'>
                                    <label>First name<span>*</span></label>
                                    <input placeholder='Type here' type="text" name='first_name' onChange={e => logins_field(e)} className={error.first_name == '' ? '' : "bordererror"} />

                                    <span className='errorfield'>{error.first_name}</span>
                                </div>
                                <div className='form_group'>
                                    <label>Last name<span>*</span></label>
                                    <input placeholder='Type here' type="text" name='last_name' onChange={e => logins_field(e)} className={error.last_name == '' ? '' : "bordererror"} />
                                    <span className='errorfield'>{error.last_name}</span>
                                </div>
                                <div className='form_group'>
                                    <label>Email address<span>*</span></label>
                                    <input placeholder='Type here' type="email" name='email' onChange={e => logins_field(e)} className={error.email == '' ? '' : "bordererror"} />
                                    <span className='errorfield'>{error.email}</span>
                                </div>
                                <div className='form_group part2'>
                                    <label>Telephone number</label>
                                    <div className='citydetail small'>
                                        <select onChange={e => setcountry_number(e.target.value)}>
                                            <option selected></option>
                                            {country.data.map((e) => {
                                                return <option value={e.dial_code}>{e.country}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className='citydetail'>
                                        <input placeholder='Type here' type="number" name='phone' onChange={e => logins_field(e)} className={error.phone == '' ? '' : "bordererror"} />
                                        <div className='errorfield'>{error.phone}</div>
                                        <span>{country_number}</span>
                                    </div>
                                </div>
                                <div className='form_group full'>
                                    <label>Your message<span>*</span></label>
                                    <textarea rows={2} maxlength="300" name='message' onChange={e => logins_field(e)} className={error.message == '' ? '' : "bordererror"} >
                                    </textarea>
                                    <div className='errorfield'>{error.message}</div>
                                    <span>Number of characters 300</span>
                                </div>
                            </form>
                            <button onClick={contact_us} disabled={button}>Submit</button>
                        </div>
                        <div className='follow'>
                            <h3>Follow us on social media</h3>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/people/SensCare/100066554561840/" target='_blank'><img src='./images/facebookp.svg' /></a>
                                    <a href="https://www.linkedin.com/company/sens-care/"><img src='./images/indip.svg' target='_blank' /></a>
                                    <a href="https://www.instagram.com/mysenscare/"><img src='./images/twiterp.svg' target='_blank' /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className='promocode_content younger contactpop'>
                        <Link to="" onClick={handleClose}>+ </Link>
                        <h5>Thank you for contacting us.</h5>
                        <p>SensCare has received your message.<br />
                            Please allow us up to 24hrs to get back to you. </p>
                        <button onClick={handleClose}>OK</button>
                    </div>
                </Modal.Body>
            </Modal>
            <Footer />
        </>
    )
}

export default Work_us
