import React, { useEffect, useState } from 'react'
import { api } from '../../urls';
import Footer from './common/footer'
import Header from './common/header'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

const emailRegex = RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);
function Investor_relations() {
    const [count, setcount] = useState(true);
    const [investor, setinvestor] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        window.location.reload()
    };
    const handleShow = () => setShow(true);
    const [refresh, setrefresh] = useState('')
    const [test, settest] = useState([{
        name: "email"
    }, {
        name: "message"
    }
    ])
    const [form_logins, setform_logins] = useState({
        email: "",
        message: ""
    });
    const [error, seterror] = useState({
        email: "",
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
    useEffect(() => {
        if (count) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(api + "/api/investorrelations", requestOptions)
                .then(response => response.json())
                .then(result => setinvestor(result.data))
                .catch(error => console.log('error', error));
            setcount(false)
        }
    }, [count, error, refresh])


    const Investor = () => {
        if (form_logins.email != '' & form_logins.message != '') {
            var formdata = new FormData();
            formdata.append("email", form_logins.email);
            formdata.append("message", form_logins.message);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(api + "/api/investorrelationsenquiry", requestOptions)
                .then(response => response.json())
                .then(result => {
                    result.success ? handleShow() : handleClose()
                })
                .catch(error => console.log('error', error));
        } else {
            test.map((e) => {
                logins_field_test(e.name)
            })
        }
    }
    return (
        <>
            <Header />
            <div className='container-fluid dask_margin' >
                <div className='container'>
                    <div className='investor'>
                        {investor.title ?
                            <h2>{investor.title}</h2> : ""}
                        <p>{investor.description}</p>
                        <br />
                        <h3>We’d love to hear from you </h3>
                        <div className='form_group'>
                            <label>Email address<span>*</span></label>
                            <input placeholder='Type here' type="email" name='email' onChange={e => logins_field(e)} className={error.email == '' ? '' : "bordererror"} />
                            {error.email ?
                                <div className='errorfield'>{error.email}</div>
                                : ""
                            }
                        </div>
                        <div className='form_group full'>
                            <label>Your message<span>*</span></label>
                            <textarea rows={2} maxlength="300" name='message'
                                onChange={e => logins_field(e)} className={error.message == '' ? '' : "bordererror"}
                            >
                            </textarea>
                            {error.message ?
                                <div className='errorfield'>{error.message} </div> : ""
                            }
                            <span>Number of characters 300</span>
                        </div>
                        <button onClick={Investor}>Submit</button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className='promocode_content younger contactpop'>
                        <Link to="" onClick={handleClose}>+ </Link>
                        <h5>Thank you for contacting us.</h5>
                        <p>SensCare has received your message.<br />
                            Please allow us up to 24hrs to get back to you.</p>
                        <button onClick={handleClose}>OK</button>
                    </div>
                </Modal.Body>
            </Modal>
            <Footer />
        </>
    )
}

export default Investor_relations
