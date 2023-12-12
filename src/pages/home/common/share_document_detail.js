import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../urls'
import Modal from 'react-bootstrap/Modal'
import { jsPDF } from "jspdf";



function Share_document_detail(props) {
    const navigate = useNavigate();
    const [list, setlist] = useState([])
    const [check, setcheck] = useState(true)
    const [active, setactive] = useState(false)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [message, setmessage] = useState("")
    const slugdata = useParams()
    const [recived, setrecived] = useState("")
    let data = slugdata.name
    const [refine, setrefine] = useState({
        threedays: "",
        withinweek: "",
        twofourday: "",
        withinmonth: ""
    })

    const profile_data = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "inv_id": props.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/viewdocuments?" + (refine.threedays != "" ? "threedays=" + refine.threedays : refine.withinweek != "" ? "withinweek=" + refine.withinweek : refine.twofourday != "" ? "twofourdays=" + refine.twofourday : refine.withinmonth != "" ? "withinmonth=" + refine.withinmonth : ""), requestOptions)
            .then(response => response.json())
            .then(result => {
                setlist(result.data.viewdocument)
                setmessage(result.data.currentUserName)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if (check) {
            profile_data()
            setcheck(false)
        }
        console.log(list, slugdata, slugdata, "LLLLLLLLLLLLLLLLLLLL");
    }, [check])
    const delete_in = (a) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "ids": a
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/shareddocdltparent", requestOptions)
            .then(response => response.text())
            .then(result => {
                props.list()
                props.setview("")
                navigate("/search-parents/" + slugdata.id + "/" + slugdata.name)
            })
            .catch(error => console.log('error', error));
    }

    const generatePDF = () => {

    }
    const refine_bc = (e) => {
        setrefine({
            threedays: e == "3" ? true : "",
            withinweek: e == "7" ? true : "",
            twofourday: e == "24" ? true : "",
            withinmonth: e == "30" ? true : "",
        })
        setcheck(true)
    }
    return (
        <>
            <div class="main-header share_doc">
                <h2 className='border'>Shared Documents</h2>
                <div class="mail-header-bar">
                    <p>{list.length} Documents </p>
                    <div class="btn-group flex">
                        Refine by
                        <div className='select'>
                            <label onClick={e => setactive(!active)}>{recived} <span><img src="/images/done_a.svg" /></span></label>
                            {
                                active ?
                                    <ul onClick={e => setactive(!active)}>

                                        <li onClick={e => {
                                            setrecived("All")
                                            refine_bc("")
                                            setactive(!active)
                                        }} >All</li>
                                        <li onClick={e => {
                                            setrecived("24 hours")
                                            refine_bc(24)
                                            setactive(!active)
                                        }} >24 hours</li>
                                        <li onClick={e => {
                                            setrecived("3 Days")
                                            refine_bc(3)
                                            setactive(!active)
                                        }} >3 Days</li>
                                        <li onClick={e => {
                                            setrecived("7 Days")
                                            refine_bc(7)
                                            setactive(!active)
                                        }} >7 Days</li>
                                        <li onClick={e => {
                                            setrecived("30 Days")
                                            refine_bc(30)
                                            setactive(!active)
                                        }} >30Days </li>
                                    </ul>
                                    : ""}
                        </div>

                    </div>

                </div>
                <ul>
                    {
                        list && list.map((data, index) => {
                            return (
                                <>
                                    {data.back_doc != null ?
                                        <li>
                                            <span className='docic'>
                                                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                                </svg>
                                            </span>
                                            <span>{data.UserName != null ? data.UserName + "_background check" : ""}</span>
                                            <span className='date'> {new Date(data.documentsend_date).getDate()}/{new Date(data.documentsend_date).getMonth() + 1}/{new Date(data.documentsend_date).getFullYear()}</span>

                                            <button onClick={e => generatePDF()}>
                                                <a href={api + '/public/assets/images/users/' + data.back_doc} download target="_blank">
                                                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z" fill="#A98D4B" />
                                                    </svg>
                                                </a>
                                            </button>
                                            <button onClick={e => delete_in([data.DOC_ID])}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                            </button>
                                        </li>
                                        : ""}
                                    {data.cert_doc != null ?
                                        <li>
                                            <span className='docic'>
                                                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                                </svg>
                                            </span>
                                            <span>{data.UserName != null ? data.UserName + "_Certificate" : ""}</span>
                                            <span className='date'> {new Date(data.documentsend_date).getDate()}/{new Date(data.documentsend_date).getMonth() + 1}/{new Date(data.documentsend_date).getFullYear()}</span>

                                            <button onClick={e => generatePDF()}>
                                                <a href={api + '/public/assets/images/users/' + data.cert_doc} download target="_blank">
                                                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z" fill="#A98D4B" />
                                                    </svg>
                                                </a>
                                            </button>
                                            <button onClick={e => delete_in([data.DOC_ID])}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                            </button>
                                        </li>
                                        : ""}
                                    {data.cv_doc != null ?
                                        <li>
                                            <span className='docic'>
                                                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                                </svg>
                                            </span>
                                            <span>{data.UserName != null ? data.UserName + "_CV" : ""}</span>
                                            <span className='date'> {new Date(data.documentsend_date).getDate()}/{new Date(data.documentsend_date).getMonth() + 1}/{new Date(data.documentsend_date).getFullYear()}</span>

                                            <button onClick={e => generatePDF()}>
                                                <a href={api + '/public/assets/images/users/' + data.cv_doc} download target="_blank">
                                                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z" fill="#A98D4B" />
                                                    </svg>
                                                </a>
                                            </button>
                                            <button onClick={e => delete_in([data.DOC_ID])}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                            </button>
                                        </li>
                                        : ""}
                                    {data.recom_doc != null ?
                                        <li>
                                            <span className='docic'>
                                                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                                </svg>
                                            </span>
                                            <span>{data.UserName != null ? data.UserName + "_Recommendation" : ""}</span>
                                            <span className='date'> {new Date(data.documentsend_date).getDate()}/{new Date(data.documentsend_date).getMonth() + 1}/{new Date(data.documentsend_date).getFullYear()}</span>

                                            <button onClick={e => generatePDF()}>
                                                <a href={api + '/public/assets/images/users/' + data.recom_doc} download target="_blank">
                                                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z" fill="#A98D4B" />
                                                    </svg>
                                                </a>
                                            </button>
                                            <button onClick={e => delete_in([data.DOC_ID])}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                            </button>
                                        </li>
                                        : ""}
                                </>
                            )
                        })
                    }

                </ul>
            </div>
        </>
    )
}

export default Share_document_detail
