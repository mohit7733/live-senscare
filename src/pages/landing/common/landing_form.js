import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { api } from '../../../urls'
import TranslateComponent from '../../../translate-component';

const emailRegex = RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);
const capitalsmall = RegExp("^[a-zA-Z\\s]*$")
function Landing_form() {
    const [service, setservice] = useState('')
    const [serviced, setserviced] = useState('')
    const [form_logins, setform_logins] = useState({
        email: "",
        first_name: "",
        city: "",
        zip: "",
        service: ""
    });
    const [error, seterror] = useState({
        email: "",
        first_name: "",
        city: "",
        zip: "",
        service: ""
    });

    const landing_field = (e) => {
        const { name, value } = e.target;
        switch (name) {

            case 'email':
                error.email =
                    emailRegex.test(value)
                        ? "" : "Email not valid.";
                break;
            case 'first_name':
                error.first_name =
                    capitalsmall.test(value) ? error.first_name = value.length < 2
                        ? "Minimum 2 characters required"
                        : "" : " Only letters are allowed"
                break;
            case 'city':
                error.city =
                    capitalsmall.test(value) ? error.city = value.length < 2
                        ? "Minimum 2 characters required"
                        : "" : " Only letters are allowed"
                break;
            case 'zip':
                error.zip =
                    value.length < 2
                        ? "required"
                        : "";
                break;
            default:
                break;
        }
        setform_logins({ ...form_logins, [name]: value })
        seterror(error)
    }

    const landing = () => {
        if (error.first_name == '' & error.email == '' & service != '' & error.city == '' & error.zip == '') {
            setserviced("h")
            var formdata = new FormData();
            formdata.append("name", form_logins.first_name);
            formdata.append("email", form_logins.email.toLowerCase());
            formdata.append("service_type", service);
            formdata.append("city", form_logins.city);
            formdata.append("zip", form_logins.zip);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(api + "/api/contacts", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        // toast.success(result.message)
                        setTimeout(() => {
                            setserviced("")
                            { service == "parents" ? window.location.href = "/thanks_parents" : window.location.href = "/thanks_Providers" }
                        }, 0);

                    } else {
                        // toast.error("Request unsuccessfully.")
                    }
                })
                .catch(error => {
                    // toast.error("Request unsuccessfully.")
                    setserviced("")
                });
        } else {
            seterror({
                email: form_logins.email == '' ? "required" : error.email,
                first_name: form_logins.first_name == '' ? "required" : error.first_name,
                city: form_logins.city == '' ? "required" : error.city,
                zip: form_logins.zip == '' ? "required" : error.zip,
                service: service == "" ? "required" : ""
            });
            // toast.error("All field Require.")
        }
    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            />
            <form>
                <div className='detail'>
                    <h3>Get early and full access to the SensCare services.</h3>
                    <div className='form_group'>
                        <input placeholder="Your name" type={"text"} name='first_name' onChange={e => landing_field(e)} className={error.first_name == '' ? '' : "bordererror"} />
                        {
                            error.first_name ?
                                <span className='errorfield'>{error.first_name} </span> : ""
                        }

                    </div>
                    <div className='form_group'>
                        <input placeholder="example@mailclient.com" type={"email"} name='email' onChange={e => landing_field(e)} className={error.email == '' ? '' : "bordererror"} />
                        {error.email ?
                            <span className='errorfield'>{error.email} </span> : ""
                        }
                    </div>
                    <div className='form_group'>
                        <input placeholder="ZIP code" type={"number"} name='zip' onChange={e => landing_field(e)} className={error.zip == '' ? '' : "bordererror"} />
                        {error.zip ?
                            <span className='errorfield'>{error.zip} </span> : ""
                        }
                    </div>
                    <div className='form_group'>
                        <input placeholder="City" type={"text"} name='city' onChange={e => landing_field(e)} className={error.city == '' ? '' : "bordererror"} />
                        {error.city ?
                            <span className='errorfield'>{error.city} </span>
                            : ""
                        }
                    </div>
                </div>
                <div className='choose'>
                    <label>
                        Get early and full access to the SensCare services Choose
                    </label>
                    <span><input type="radio" id='job' name='job' onChange={e => setservice("parents")} /><label htmlFor="job"> I need a service</label></span>
                    <span><input type="radio" id='job2' name='job' onChange={e => setservice('provider')} /> <label htmlFor="job2">I need a job</label></span>
                </div>
            </form>
            <button onClick={landing} className="join" disabled={serviced != "" ? true : false} style={serviced != "" ? { opacity: "0.5" } : {}}>Join SensCare</button>
        </>
    )
}

export default Landing_form
