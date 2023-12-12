import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../urls';
import { Link, NavLink, useNavigate } from 'react-router-dom'


function Notification_tab_provider(props) {
    const navigate = useNavigate();
    const [count, setcount] = useState(true)
    const [inve, setinve] = useState({});

    useEffect(() => {
        if (count) {
            membership1()
            setcount(false)
        }
    }, [])
    const membership1 = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer  " + localStorage.getItem("token"));
        myHeaders.append("Cookie", "XSRF-TOKEN= " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/providerallcounts", requestOptions)
            .then(response => response.json())
            .then(result => {
                setinve(result.data)
                // setTimeout(membership1, 10000);
            })
            .catch(error => console.log('error', error));

    }
    return (
        <>
            <ul>
                <li className={props.subtab == "interview-invite" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("interview-invite")
                    navigate("/search-providers/interview-invite")
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4999 0.699996V6.99996C10.4999 7.38496 10.1849 7.69996 9.79994 7.69996H2.79998L0 10.4999V0.699996C0 0.314998 0.314998 0 0.699996 0H9.79994C10.1849 0 10.4999 0.314998 10.4999 0.699996ZM11.9001 2.79907H13.3001C13.685 2.79907 14 3.11407 14 3.49907V13.999L11.2001 11.199H3.50011C3.11511 11.199 2.80011 10.884 2.80011 10.499V9.09904H11.9001V2.79907Z" fill="#636363" />
                    </svg>Interview Invites  ({inve.invitation})</li>
                <li className={props.subtab == "new-recommendation" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("new-recommendation")
                    navigate("/search-providers/new-recommendation")
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.7 0H13.3C13.6111 0 14 0.311111 14 0.7V13.3C14 13.6111 13.6111 14 13.3 14H0.7C0.311111 14 0 13.6111 0 13.3V0.7C0 0.311111 0.311111 0 0.7 0ZM3.11127 3.10989H4.66682V4.66545H3.11127V3.10989ZM6.22229 3.10989H10.889V4.66545H6.22229V3.10989ZM6.22229 6.21979H10.889V7.77534H6.22229V6.21979ZM10.889 9.33514H6.22229V10.8907H10.889V9.33514ZM4.66682 6.21979H3.11127V7.77534H4.66682V6.21979ZM3.11127 9.33514H4.66682V10.8907H3.11127V9.33514Z" fill="#636363" />
                    </svg>New Recommendations  ({inve.recommendation})</li>
                <li className={props.subtab == "document-request" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("document-request")
                    navigate("/search-providers/document-request")
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6008 0H4.20034C3.4303 0 2.80026 0.630033 2.80026 1.40007V9.80052C2.80026 10.5706 3.4303 11.2006 4.20034 11.2006H12.6008C13.3708 11.2006 14.0009 10.5706 14.0009 9.80052V1.40007C14.0009 0.630033 13.3708 0 12.6008 0ZM0.700037 2.79913C0.315017 2.79913 0 3.11415 0 3.49917V12.5997C0 13.3697 0.630033 13.9997 1.40007 13.9997H10.5006C10.8856 13.9997 11.2006 13.6847 11.2006 13.2997C11.2006 12.9147 10.8856 12.5997 10.5006 12.5997H2.10011C1.71509 12.5997 1.40007 12.2846 1.40007 11.8996V3.49917C1.40007 3.11415 1.08506 2.79913 0.700037 2.79913ZM5.60034 6.30199H11.2006C11.5857 6.30199 11.9007 5.98697 11.9007 5.60195C11.9007 5.21693 11.5857 4.90192 11.2006 4.90192H5.60034C5.21532 4.90192 4.9003 5.21693 4.9003 5.60195C4.9003 5.98697 5.21532 6.30199 5.60034 6.30199ZM8.40049 9.10112H5.60034C5.21532 9.10112 4.9003 8.78611 4.9003 8.40109C4.9003 8.01607 5.21532 7.70105 5.60034 7.70105H8.40049C8.78551 7.70105 9.10052 8.01607 9.10052 8.40109C9.10052 8.78611 8.78551 9.10112 8.40049 9.10112ZM5.60034 3.4992H11.2006C11.5857 3.4992 11.9007 3.18418 11.9007 2.79916C11.9007 2.41414 11.5857 2.09912 11.2006 2.09912H5.60034C5.21532 2.09912 4.9003 2.41414 4.9003 2.79916C4.9003 3.18418 5.21532 3.4992 5.60034 3.4992Z" fill="#636363" />
                    </svg> Document Requests ({inve.documentrequest})</li>
                <li className={props.subtab == "hirings" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("hirings")
                    navigate("/search-providers/hirings")
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.55556 0H12.4444C13.3 0 14 0.578114 14 1.2847V9.59027C14 10.0335 13.7278 10.4253 13.3156 10.6566L7.43556 13.894C7.17111 14.0353 6.83667 14.0353 6.57222 13.894L0.684444 10.6566C0.272222 10.4253 0 10.0335 0 9.59027L0.00777778 1.2847C0.00777778 0.578114 0.7 0 1.55556 0ZM6.39963 9.96903L11.2751 5.0936C11.5256 4.84308 11.5192 4.4384 11.2686 4.18789C11.0181 3.93737 10.6134 3.93737 10.3629 4.18789L5.94356 8.60725L4.0936 6.75728C3.84308 6.50677 3.4384 6.50677 3.18789 6.75728C2.93737 7.0078 2.93737 7.41248 3.18789 7.663L5.49392 9.96903C5.74444 10.2195 6.14912 10.2195 6.39963 9.96903Z" fill="#636363" />
                    </svg> New Hirings ({inve.hiring})</li>
                <li className={props.subtab == "new-reviews" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("new-reviews")
                    navigate("/search-providers/new-reviews")
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7C0 3.136 3.129 0 6.993 0C10.864 0 14 3.136 14 7C14 10.864 10.864 14 6.993 14C3.129 14 0 10.864 0 7ZM7.00022 9.41321L9.96122 11.1982L9.17722 7.82421L11.7882 5.56321L8.34422 5.26921L7.00022 2.09821L5.65622 5.27621L2.21222 5.57021L4.82322 7.83121L4.03922 11.1982L7.00022 9.41321Z" fill="#636363" />
                    </svg> New Reviews ({inve.review})</li>
                <li className={props.subtab == "Loyalty-notification" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("Loyalty-notification")
                    navigate("/search-providers/Loyalty-notification")
                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                        <path d="M9.66667 12.0881V4.65248H6.33333V12.0881C6.33333 12.2612 6.39583 12.3945 6.52083 12.488C6.64583 12.5814 6.80556 12.6282 7 12.6282H9C9.19444 12.6282 9.35417 12.5814 9.47917 12.488C9.60417 12.3945 9.66667 12.2612 9.66667 12.0881ZM4.91667 3.3232H6.94792L5.63542 1.65122C5.45486 1.43659 5.21528 1.32928 4.91667 1.32928C4.63889 1.32928 4.40278 1.42621 4.20833 1.62006C4.01389 1.81391 3.91667 2.04931 3.91667 2.32624C3.91667 2.60317 4.01389 2.83857 4.20833 3.03242C4.40278 3.22627 4.63889 3.3232 4.91667 3.3232ZM12.0833 2.32624C12.0833 2.04931 11.9861 1.81391 11.7917 1.62006C11.5972 1.42621 11.3611 1.32928 11.0833 1.32928C10.7847 1.32928 10.5451 1.43659 10.3646 1.65122L9.0625 3.3232H11.0833C11.3611 3.3232 11.5972 3.22627 11.7917 3.03242C11.9861 2.83857 12.0833 2.60317 12.0833 2.32624ZM16 4.9848V8.308C16 8.40493 15.9688 8.48455 15.9062 8.54686C15.8438 8.60917 15.7639 8.64032 15.6667 8.64032H14.6667V12.9605C14.6667 13.2374 14.5694 13.4728 14.375 13.6667C14.1806 13.8605 13.9444 13.9574 13.6667 13.9574H2.33333C2.05556 13.9574 1.81944 13.8605 1.625 13.6667C1.43056 13.4728 1.33333 13.2374 1.33333 12.9605V8.64032H0.333333C0.236111 8.64032 0.15625 8.60917 0.09375 8.54686C0.03125 8.48455 0 8.40493 0 8.308V4.9848C0 4.88788 0.03125 4.80826 0.09375 4.74595C0.15625 4.68364 0.236111 4.65248 0.333333 4.65248H4.91667C4.27083 4.65248 3.72049 4.42574 3.26562 3.97226C2.81076 3.51879 2.58333 2.97011 2.58333 2.32624C2.58333 1.68237 2.81076 1.1337 3.26562 0.680218C3.72049 0.226739 4.27083 0 4.91667 0C5.65972 0 6.24306 0.266548 6.66667 0.799645L8 2.51317L9.33333 0.799645C9.75694 0.266548 10.3403 0 11.0833 0C11.7292 0 12.2795 0.226739 12.7344 0.680218C13.1892 1.1337 13.4167 1.68237 13.4167 2.32624C13.4167 2.97011 13.1892 3.51879 12.7344 3.97226C12.2795 4.42574 11.7292 4.65248 11.0833 4.65248H15.6667C15.7639 4.65248 15.8438 4.68364 15.9062 4.74595C15.9688 4.80826 16 4.88788 16 4.9848Z" fill="#636363" />
                    </svg> SensCare Loyalty ({inve.loyalty})</li>
                <li className={props.subtab == "recent-profile-visitor" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("recent-profile-visitor")
                    navigate("/search-providers/recent-profile-visitor")
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.55556V12.4444C0 13.3 0.692222 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0H1.55556C0.692222 0 0 0.7 0 1.55556ZM9.33332 4.66573C9.33332 5.95684 8.2911 6.99906 6.99999 6.99906C5.70888 6.99906 4.66666 5.95684 4.66666 4.66573C4.66666 3.37462 5.70888 2.3324 6.99999 2.3324C8.2911 2.3324 9.33332 3.37462 9.33332 4.66573ZM7.0001 8.47839C5.44455 8.47839 2.33344 9.33395 2.33344 10.8895V11.6673H11.6668V10.8895C11.6668 9.33395 8.55566 8.47839 7.0001 8.47839Z" fill="#636363" />
                    </svg> Recent profile visitors ({inve.visitor})</li>
            </ul>
        </>
    )
}

export default Notification_tab_provider
