import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom'

function Favorite_provider(props) {
    const [fav, setfav] = useState("")
    const navigate = useNavigate();
    return (
        <>
            <ul>
                {localStorage.getItem("user_type") == "parents" ? "" :
                    <li className={props.subtab == "job-post" ? "active" : ""} onClick={e => {
                        navigate("/search-providers/job-post")
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        props.setsubtab("job-post")
                        props.setprofilesection("")
                    }}> <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 8H16V12.5C16 13.3284 15.3284 14 14.5 14H1.5C0.671562 14 0 13.3284 0 12.5V8H6V8.625C6 8.83209 6.16791 9 6.375 9H9.625C9.83209 9 10 8.83209 10 8.625V8ZM16 4.5V7H0V4.5C0 3.67156 0.671562 3 1.5 3H4V1.5C4 0.671562 4.67156 0 5.5 0H10.5C11.3284 0 12 0.671562 12 1.5V3H14.5C15.3284 3 16 3.67156 16 4.5ZM10 2H6V3H10V2Z" fill="#636363" />
                        </svg> Job Posts</li>
                }
                {/* {localStorage.getItem("user_type") == "parents" ?
                    <li className={props.subtab == "all-profile" ? "active" : ""} onClick={e => {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        props.setsubtab("all-profile")
                        navigate("/search-providers/all-profile")
                    }}><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5067 1.77778H14.2222C15.2 1.77778 16 2.57778 16 3.55556V16C16 16.9778 15.2 17.7778 14.2222 17.7778H1.77778C0.8 17.7778 0 16.9778 0 16V3.55556C0 2.57778 0.8 1.77778 1.77778 1.77778H5.49333C5.86667 0.746667 6.84444 0 8 0C9.15556 0 10.1333 0.746667 10.5067 1.77778ZM8.88932 2.66623C8.88932 2.17734 8.48932 1.77734 8.00043 1.77734C7.51154 1.77734 7.11154 2.17734 7.11154 2.66623C7.11154 3.15512 7.51154 3.55512 8.00043 3.55512C8.48932 3.55512 8.88932 3.15512 8.88932 2.66623ZM7.9998 5.33313C9.47535 5.33313 10.6665 6.52424 10.6665 7.9998C10.6665 9.47535 9.47535 10.6665 7.9998 10.6665C6.52424 10.6665 5.33313 9.47535 5.33313 7.9998C5.33313 6.52424 6.52424 5.33313 7.9998 5.33313ZM2.66711 14.7553V15.9998H13.3338V14.7553C13.3338 12.9775 9.77822 11.9998 8.00045 11.9998C6.22267 11.9998 2.66711 12.9775 2.66711 14.7553Z" fill="#636363" />
                        </svg> All Profiles</li>
                    : ""
                } */}
                {/* <li className={props.subtab == "who-i-visited" || props.subtab == "who-visited-me" ? "active Document_main side_drop_collapse" : "Document_main side_drop_collapse"} onClick={e => setfav(fav != "" ? "" : "fav")}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.55556V12.4444C0 13.3 0.692222 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0H1.55556C0.692222 0 0 0.7 0 1.55556ZM9.33332 4.66573C9.33332 5.95684 8.2911 6.99906 6.99999 6.99906C5.70888 6.99906 4.66666 5.95684 4.66666 4.66573C4.66666 3.37462 5.70888 2.3324 6.99999 2.3324C8.2911 2.3324 9.33332 3.37462 9.33332 4.66573ZM7.0001 8.47839C5.44455 8.47839 2.33344 9.33395 2.33344 10.8895V11.6673H11.6668V10.8895C11.6668 9.33395 8.55566 8.47839 7.0001 8.47839Z" fill="#636363" />
                </svg> Recent profile visits
                    <ul style={fav != "" ? { display: "block" } : { display: "none" }}>
                        <li onClick={e => {
                            navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/who-i-visited" : "/search-providers/who-i-visited")
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            props.setsubtab("who-i-visited")
                            props.setprofilesection("")

                        }} className={props.subtab == "who-i-visited" ? "active " : ""} >Who I Visited</li>
                        <li onClick={e => {
                            navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/who-visited-me" : "/search-providers/who-visited-me")
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            props.setsubtab("who-visited-me")
                            props.setprofilesection("")

                        }} className={props.subtab == "who-visited-me" ? "active upgrade" : "upgrade"}>Who Visited Me <span><Link to={!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank">upgrade</Link></span></li>
                    </ul>
                </li> */}
            </ul>
        </>
    )
}

export default Favorite_provider
