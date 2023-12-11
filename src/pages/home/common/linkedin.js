import React, { useEffect, useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { api } from "../../../urls";


function LinkedInPage(props) {
    const [check, setcheck] = useState(useLocation())
    const { linkedInLogin } = useLinkedIn({
        clientId: "860qiqz9pllqgi",
        redirectUri: `${window.location.origin}/linkedin`,
        scope: "r_emailaddress r_liteprofile",
        onSuccess: (response) => {
            console.log(response);
            fetchProfileData(response);
            setCode(response);
            setErrorMessage("");
        },
        onError: (error) => {
            console.log(error);
            setCode("");
            setErrorMessage(error.errorMessage);
        },
    });


    const [code, setCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const fetchProfileData = async (accessToken) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(api + "/api/authchecklinkdin/" + accessToken, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (JSON.parse(result.data).elements[0]) {
                    props.handleResponse({
                        profile: {
                            email: Object.values(JSON.parse(result.data).elements[0])[0].emailAddress,
                            type: "linkedIn"
                        }
                    })
                }
                else {

                }
            })
            .catch(error => console.log('error', error));
    };

    return (
        <>
            {
                props.profile ?
                    <svg
                        onClick={linkedInLogin}
                        //  onClick={e => {
                        //     if (detailprovider.linkdinverify) {
                        //         setdetailprovide({ ...detailprovider, linkdinverify: false })
                        //     } else {
                        //         setdetailprovide({ ...detailprovider, linkdinverify: true })
                        //     }
                        // }} 
                        className={props.status ? "active" : ""}
                        width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="40" height="40" rx="20" stroke="#B7B7B7" />
                        <path d="M30.5267 29.9936C29.3765 29.9662 28.2537 29.9662 27.1035 29.9936C26.8571 29.9936 26.8023 29.9389 26.8023 29.6924C26.8023 27.6658 26.8023 25.6119 26.8023 23.5854C26.8023 23.1198 26.7749 22.6543 26.638 22.2161C26.2272 20.792 24.584 20.2717 23.4065 21.2302C22.7766 21.7232 22.5301 22.4078 22.5301 23.2294C22.5301 25.1464 22.5301 27.0634 22.5301 28.9804C22.5301 29.2268 22.5027 29.4733 22.5301 29.7472C22.5575 29.9662 22.448 30.021 22.2563 29.9936C21.0787 29.9936 19.9285 29.9936 18.7509 29.9936C18.5318 29.9936 18.4771 29.9389 18.4771 29.7198C18.5044 27.9945 18.5044 26.2692 18.5044 24.5165C18.5044 22.3804 18.5044 20.2443 18.4771 18.1356C18.4771 17.8892 18.5318 17.8344 18.7509 17.8344C19.9285 17.8344 21.0787 17.8344 22.2563 17.8344C22.4754 17.8344 22.5301 17.8892 22.5301 18.1083C22.5301 18.5464 22.5301 18.9846 22.5301 19.5049C22.6123 19.4228 22.6397 19.3954 22.6671 19.368C23.7351 17.807 25.2413 17.3688 27.0214 17.6427C29.0753 17.9713 30.3898 19.3954 30.7184 21.5862C30.8006 22.1066 30.828 22.6269 30.828 23.1472C30.828 25.3381 30.828 27.5015 30.828 29.6924C30.828 29.9115 30.7732 29.9936 30.5267 29.9936Z" fill="#B7B7B7" />
                        <path d="M16.2862 23.9138C16.2862 25.8308 16.2862 27.7478 16.2862 29.6648C16.2862 29.9113 16.2314 29.9935 15.9849 29.9935C14.8347 29.9661 13.6846 29.9935 12.5344 29.9935C12.3153 29.9935 12.2605 29.9387 12.2605 29.7196C12.2605 25.8582 12.2605 21.9695 12.2605 18.1081C12.2605 17.9164 12.3153 17.8342 12.5344 17.8342C13.7119 17.8342 14.8895 17.8342 16.0671 17.8342C16.3136 17.8342 16.341 17.9164 16.341 18.1355C16.2862 20.0525 16.2862 21.9695 16.2862 23.9138Z" fill="#B7B7B7" />
                        <path d="M16.4773 14.6575C16.2034 15.7529 15.0806 16.3828 13.7935 16.1637C12.4242 15.9446 11.6574 14.6027 12.1503 13.2882C12.479 12.4666 13.2732 11.9737 14.2864 12.0011C15.82 11.9737 16.8333 13.2061 16.4773 14.6575Z" fill="#B7B7B7" />
                    </svg> :
                    <a className='indi' onClick={linkedInLogin}><i className="fa-brands fa-linkedin-in"></i> Log in with LinkedIn</a>
            }
        </>
    );
}

export default LinkedInPage;
