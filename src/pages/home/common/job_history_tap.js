import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'


function Job_history_tap(props) {
    const navigate = useNavigate();

    return (
        <>
            <ul>
                <li className={props.subtab == "job-applications" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("job-applications")
                    navigate("/search-providers/job-applications")
                }}> <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8H16V12.5C16 13.3284 15.3284 14 14.5 14H1.5C0.671562 14 0 13.3284 0 12.5V8H6V8.625C6 8.83209 6.16791 9 6.375 9H9.625C9.83209 9 10 8.83209 10 8.625V8ZM16 4.5V7H0V4.5C0 3.67156 0.671562 3 1.5 3H4V1.5C4 0.671562 4.67156 0 5.5 0H10.5C11.3284 0 12 0.671562 12 1.5V3H14.5C15.3284 3 16 3.67156 16 4.5ZM10 2H6V3H10V2Z" fill="#636363" />
                    </svg>Job Applications</li>
                <li className={props.subtab == "interview-invites" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("interview-invites")
                    navigate("/search-providers/interview-invites")
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.4999 0.699996V6.99996C10.4999 7.38496 10.1849 7.69996 9.79994 7.69996H2.79998L0 10.4999V0.699996C0 0.314998 0.314998 0 0.699996 0H9.79994C10.1849 0 10.4999 0.314998 10.4999 0.699996ZM11.9001 2.79907H13.3001C13.685 2.79907 14 3.11407 14 3.49907V13.999L11.2001 11.199H3.50011C3.11511 11.199 2.80011 10.884 2.80011 10.499V9.09904H11.9001V2.79907Z" fill="#636363"></path></svg>
                   Interview Invites </li>
                <li className={props.subtab == "my-document" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("my-document")
                    navigate("/search-providers/my-document")
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3 0H0.7C0.311111 0 0 0.311111 0 0.7V13.3C0 13.6111 0.311111 14 0.7 14H13.3C13.6111 14 14 13.6111 14 13.3V0.7C14 0.311111 13.6111 0 13.3 0ZM4.66682 3.1099H3.11126V4.66545H4.66682V3.1099ZM10.889 3.1099H6.2223V4.66545H10.889V3.1099ZM10.889 6.21979H6.2223V7.77535H10.889V6.21979ZM6.2223 9.33516H10.889V10.8907H6.2223V9.33516ZM3.11126 6.21979H4.66682V7.77535H3.11126V6.21979ZM4.66682 9.33516H3.11126V10.8907H4.66682V9.33516ZM1.55563 12.4438H12.4445V1.55495H1.55563V12.4438Z" fill="#636363" />
                    </svg>My Documents </li>
                <li className={props.subtab == "document-requests" ? "active" : ""} onClick={e => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    props.setsubtab("document-requests")
                    navigate("/search-providers/document-requests")
                }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.6008 0H4.20034C3.4303 0 2.80026 0.630033 2.80026 1.40007V9.80052C2.80026 10.5706 3.4303 11.2006 4.20034 11.2006H12.6008C13.3708 11.2006 14.0009 10.5706 14.0009 9.80052V1.40007C14.0009 0.630033 13.3708 0 12.6008 0ZM0.700037 2.79913C0.315017 2.79913 0 3.11415 0 3.49917V12.5997C0 13.3697 0.630033 13.9997 1.40007 13.9997H10.5006C10.8856 13.9997 11.2006 13.6847 11.2006 13.2997C11.2006 12.9147 10.8856 12.5997 10.5006 12.5997H2.10011C1.71509 12.5997 1.40007 12.2846 1.40007 11.8996V3.49917C1.40007 3.11415 1.08506 2.79913 0.700037 2.79913ZM5.60034 6.30199H11.2006C11.5857 6.30199 11.9007 5.98697 11.9007 5.60195C11.9007 5.21693 11.5857 4.90192 11.2006 4.90192H5.60034C5.21532 4.90192 4.9003 5.21693 4.9003 5.60195C4.9003 5.98697 5.21532 6.30199 5.60034 6.30199ZM8.40049 9.10112H5.60034C5.21532 9.10112 4.9003 8.78611 4.9003 8.40109C4.9003 8.01607 5.21532 7.70105 5.60034 7.70105H8.40049C8.78551 7.70105 9.10052 8.01607 9.10052 8.40109C9.10052 8.78611 8.78551 9.10112 8.40049 9.10112ZM5.60034 3.4992H11.2006C11.5857 3.4992 11.9007 3.18418 11.9007 2.79916C11.9007 2.41414 11.5857 2.09912 11.2006 2.09912H5.60034C5.21532 2.09912 4.9003 2.41414 4.9003 2.79916C4.9003 3.18418 5.21532 3.4992 5.60034 3.4992Z" fill="#636363"></path></svg>
                   Document requests</li>
            </ul>
        </>
    )
}

export default Job_history_tap
