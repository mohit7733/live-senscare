import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { api } from '../../../urls'

import ReCAPTCHA from "react-google-recaptcha";
const validPassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const special = RegExp("(?=.*[!@#\$%\^&\*])");
const capital = RegExp("(?=.*[A-Z])");
const number = RegExp("(?=.*[0-9])");
function Reset_password() {
    const slugdata = useParams()
    const id = slugdata.id
    const token = slugdata.token
    const [form_logins, setform_logins] = useState({
        password: "",
        remember: false,
        c_password: ""
    });
    const [error, seterror] = useState({
        password: "",
        c_password: ""
    });
    const [cpassword, setcpassword] = useState(false);
    const [password, setpassword] = useState(false);
    const [strip, setstrip] = useState("")

    const logins_field = (e) => {

        const { name, value } = e.target;
        switch (name) {

            case 'password':
                error.password =
                    validPassword.test(value) ? "" : "Demo@123";
                break;
            case 'c_password':
                error.c_password =
                    value != form_logins.password
                        ? "Password did not match."
                        : "";
                break;
            default:
                break;
        }
        setform_logins({ ...form_logins, [name]: value })
        seterror(error)
    }
    const resetemail = () => {
        if (error.password == "" && error.c_password == "") {
            var formdata = new FormData();
            formdata.append("id", id)
            formdata.append("token", token)
            formdata.append("password", form_logins.password)
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(api + "/api/changeresetpassword", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setstrip("Your password has been reset successfully!")
                        setTimeout(() => {
                            window.location.href = "/"
                            setstrip("")
                        }, 4000);
                    } else {
                        // toast.error(result.message)
                    }
                })
                .catch(error => {
                    // toast.error(error.message)
                });
        }
        else {
            // toast.error("All field Require.")
        }
    }
    const redirect = () => {
        window.location.href = "/"
    }
    const [verfied, setVerifed] = useState(false);

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerifed(true);
    }
    return (
        <>
            {
                strip != "" ?
                    <div className='popup_status' id="popup_status">
                        {strip}
                    </div>
                    : ""
            }
            <div className='promocode_content reset reset2'>
                <div className="">
                    <h2>Reset Password </h2>
                    <form>
                        <div className='form_group'>
                            <label>Password</label>
                            <input type={password ? "text" : "password"} placeholder=". . .  . . . . . . ." className={error.password == '' ? '' : "bordererror"} name='password' onChange={e => logins_field(e)} />
                            <div className='eyes'>
                                <input type={"checkbox"} onClick={e => {
                                    setpassword(!password)
                                }} />
                                <i></i>
                            </div>
                            {error.password || error.password ?
                                <div className='password_rule errorfield '>
                                    <p>Your password must be between 8-15 characters long and contain:<br />

                                        {capital.test(form_logins.password) ? "" : "- at least one uppercase letter"}
                                        <br />
                                        {number.test(form_logins.password) ? "" : "- at least one number digit"}<br />
                                        {special.test(form_logins.password) ? "" : "- at least one special character -for example:  #, @, !"}</p>
                                </div> : ""}
                        </div>
                        <div className='form_group'>
                            <label>Confirm password</label>
                            <input type={cpassword ? "text" : "password"} placeholder=". . .  . . . . . . . " className={error.c_password == '' ? '' : "bordererror"} name='c_password' onChange={e => logins_field(e)} />
                            <div className='eyes'>
                                <input type={"checkbox"} onClick={e => {
                                    setcpassword(!cpassword)
                                }} />
                                <i></i>
                            </div>
                            <span className='errorfield'>{error.c_password}</span>

                        </div>

                        <div className='rmfog'>
                            <label><input type={"checkbox"} /> <span>Remember me</span></label>
                        </div>
                        <div className='captch'>
                            <ReCAPTCHA
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                onChange={onChange}
                            />
                        </div>
                    </form>
                    <div className='buttons reset3'>
                        <button className='rest' disabled={!verfied} onClick={resetemail}>Reset password</button>
                        <button class="rest" onClick={redirect}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset_password
