import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../urls'
import Modal from 'react-bootstrap/Modal'
import { jsPDF } from "jspdf";


function My_document() {
    const navigate = useNavigate();
    const [list, setlist] = useState([]);
    const [delete1, setdelete] = useState(false);
    const [share, setshare] = useState(false);
    const [check, setcheck] = useState(true)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [message, setmessage] = useState(0)
    const [firstappli, setfirstappli] = useState(false);
    const [submit, setsubmit] = useState("");
    const [error, seterror] = useState("");
    const [strip, setstrip] = useState("");
    const [deletevalue, setdeletevalue] = useState("");
    const [sharelist, setsharelist] = useState([]);
    const [sharelist2, setsharelist2] = useState([]);
    const [shareslect, setshareslect] = useState("");

    const [sharedoc, setsharedoc] = useState({});
    const [recived, setrecived] = useState("")
    const [active, setactive] = useState(false)
    const [detailprovider, setdetailprovide] = useState({
        recommendationsfile: "",
        qualificationscertificatesname: "",
        cv: "",
        qualificationscertificatesdoc: "",
        backgrounddoc: ""
    })
    const [certificates, setcertificates] = useState({
        qualificationscertificatesname: "",
        qualificationscertificatesname2: "",
        qualificationscertificatesname3: "",
        qualificationscertificatesname4: ""
    })
    const [errorfield, seterrorfield] = useState({
        recommendationsfile: "",
        qualificationscertificatesname: "",
        cv: "",
        qualificationscertificatesdoc: "",
        backgrounddoc: ""
    })
    const profile_update = () => {
        setsubmit("h")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var formdata = new FormData();
        formdata.append("user_id", localStorage.getItem("id"));
        detailprovider.cv.name ? formdata.append("cv", detailprovider.cv) : formdata.append("user_id", localStorage.getItem("id"));
        detailprovider.qualificationscertificatesdoc.name ? formdata.append("qualificationscertificatesdoc[]", detailprovider.qualificationscertificatesdoc) : formdata.append("user_id", localStorage.getItem("id"));
        detailprovider.backgrounddoc.name ? formdata.append("backgrounddoc", detailprovider.backgrounddoc) : formdata.append("user_id", localStorage.getItem("id"));
        detailprovider.recommendationsfile.name ? formdata.append("recommendationsfile", detailprovider.recommendationsfile) : formdata.append("user_id", localStorage.getItem("id"));
       


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/updateprovider", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setsubmit("")
                setcheck(false)
                profile_data()
                setfirstappli(false)
                setdetailprovide({
                    recommendationsfile: "",
                    qualificationscertificatesname: "",
                    cv: "",
                    qualificationscertificatesdoc: "",
                    backgrounddoc: ""
                })
            })
            .catch(error => {
                console.log('error', error)
            });
    }
    const profile_data = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/providermydocumentslist?" + (refine.threedays != "" ? "threedays=" + refine.threedays : refine.withinweek != "" ? "withinweek=" + refine.withinweek : refine.twofourday != "" ? "twofourday=" + refine.twofourday : refine.withinmonth != "" ? "withinmonth=" + refine.withinmonth : ""), requestOptions)
            .then(response => response.json())
            .then(result => {
                setlist(result.data)
                console.log(result)
                let cnt = 0
                if (result.data.recommendationsfile && result.data.recommendationsfile_deleted_at == 0) {
                    cnt = cnt + 1
                }
                if (result.data.cv && result.data.cv_deleted_at == 0) {
                    cnt = cnt + 1
                }
                if (result.data.qualificationscertificatesdoc && result.data.qualificationscertificatesdoc_deleted_at == 0) {
                    cnt = cnt + 1
                }
                if (result.data.backgrounddoc && result.data.backgrounddoc_deleted_at == 0) {
                    cnt = cnt + 1
                }
                setmessage(cnt)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if (check) {
            profile_data()
            setcheck(false)
            share_list()
        }
        console.log(list);

    }, [check])
    useEffect(() => {
        if (window.innerWidth < 768) {
            setrecived("Refine by")
        }
        setsharelist(sharelist2)
        setshareslect("")
    }, [share])
    const delete_in = (a) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "file_name": deletevalue
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/providermydocumentsdelete", requestOptions)
            .then(response => response.text())
            .then(result => {
                setdelete(false)
                profile_data()
            })
            .catch(error => console.log('error', error));
    }

    const share_list = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/userlistforshardoc", requestOptions)
            .then(response => response.json())
            .then(result => {
                setsharelist(result.data)
                setsharelist2(result.data)
            })
            .catch(error => console.log('error', error));
    }

    const share_data = () => {
        if (shareslect != "") {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            var formdata = new FormData();
            formdata.append("parents_id", shareslect);
            if (sharedoc.recom_doc) {
                formdata.append("recom_doc", sharedoc.recom_doc);
            }
            if (sharedoc.cv_doc) {
                formdata.append("cv_doc", sharedoc.cv_doc);
            }
            if (sharedoc.back_doc) {
                formdata.append("back_doc", sharedoc.back_doc);
            }
            if (sharedoc.cert_doc) {
                formdata.append("cert_doc", sharedoc.cert_doc);
            }

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(api + "/api/v1/directdocsend", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setstrip("s")
                    setshare(false)
                    setTimeout(() => {
                        setstrip("")
                    }, 2000);
                })
                .catch(error => console.log('error', error));
        } else {
            seterror("Please select one!")
            setTimeout(() => {
                seterror("")
            }, 2000);
        }
    }
    const searchdata = (data) => {
        const filterBySearch = sharelist2.filter((item) => {
            if (item != null) {
                if ((item.first_name + item.last_name).toLowerCase().includes(data.toLowerCase())) {
                    return item;
                }
            }

        })
        setsharelist(filterBySearch)
    }
    const [refine, setrefine] = useState({
        threedays: "",
        withinweek: "",
        twofourday: "",
        withinmonth: ""
    })
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
            {
                strip != "" ?
                    <div className='popup_status' id="popup_status">
                      Congratulations! You successfully shared a document!
                    </div>
                    : ""
            }
            <div class="main-header share_doc">
                <h2 className='border'>My Documents</h2>
                <div class="mail-header-bar">
                    <p>
                        <span>{message}</span> Documents</p>
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
                                        }} >30 Days</li>
                                    </ul>
                                    : ""}
                        </div>

                    </div>

                </div>
                <ul>
                    {
                        list.recommendationsfile && list.recommendationsfile_deleted_at == 0 ?
                            <li>
                                <span className='docic'>
                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                    </svg>
                                </span>
                                <span>Recommendation_{list.recommendationsfile_original ? list.recommendationsfile_original : ""}</span>
                                <span className='date'>{list.recommendationsfile_update_at}</span>

                                <button >
                                    <a href={api + '/public/assets/images/users/' + list.recommendationsfile} download target="_blank">
                                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z" fill="#A98D4B" />
                                        </svg>
                                    </a>
                                </button>
                                <button onClick={e => {
                                    setsharedoc({
                                        "recom_doc": list.recommendationsfile
                                    })
                                    setshare(true)
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7072 10.2523C11.841 10.2528 11.0214 10.6445 10.477 11.3182L5.64755 8.90347C5.77548 8.41171 5.76698 7.89438 5.62296 7.40709L10.5426 4.74641C11.5004 5.85506 13.1396 6.06415 14.3451 5.23145C15.5506 4.39876 15.9353 2.79169 15.2374 1.50341C14.5396 0.215139 12.9834 -0.340625 11.6274 0.214168C10.2714 0.768961 9.55101 2.25615 9.9563 3.6641L5.0367 6.32478C4.2458 5.41389 2.96968 5.09486 1.84317 5.5264C0.716664 5.95794 -0.0197013 7.04791 0.000401531 8.25408C0.0205043 9.46025 0.792783 10.5251 1.93305 10.9188C3.07331 11.3126 4.33809 10.9512 5.0982 10.0145L9.92761 12.4292C9.62817 13.6178 10.1167 14.8654 11.1437 15.5346C12.1707 16.2038 13.5093 16.1468 14.4758 15.3928C15.4422 14.6388 15.823 13.3542 15.4236 12.1953C15.0243 11.0364 13.9329 10.2591 12.7072 10.2605V10.2523Z" fill="#7D2B8B" />
                                    </svg>
                                </button>
                                <button onClick={e => {
                                    setdelete(true)
                                    setdeletevalue("recommendationsfile")
                                }}>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                </button>
                            </li>
                            : ""
                    }
                    {
                        list.cv && list.cv_deleted_at == 0 ?
                            <li>
                                <span className='docic'>
                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                    </svg>
                                </span>
                                <span>CV{list.cv_original ? list.cv_original : ""}</span>
                                <span className='date'>{list.cv_updated_at}</span>

                                <button >
                                    <a href={api + '/public/assets/images/users/' + list.cv} download target="_blank">
                                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z" fill="#A98D4B" />
                                        </svg>
                                    </a>
                                </button>
                                <button onClick={e => {
                                    setsharedoc({
                                        "cv_doc": list.cv
                                    })
                                    setshare(true)
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7072 10.2523C11.841 10.2528 11.0214 10.6445 10.477 11.3182L5.64755 8.90347C5.77548 8.41171 5.76698 7.89438 5.62296 7.40709L10.5426 4.74641C11.5004 5.85506 13.1396 6.06415 14.3451 5.23145C15.5506 4.39876 15.9353 2.79169 15.2374 1.50341C14.5396 0.215139 12.9834 -0.340625 11.6274 0.214168C10.2714 0.768961 9.55101 2.25615 9.9563 3.6641L5.0367 6.32478C4.2458 5.41389 2.96968 5.09486 1.84317 5.5264C0.716664 5.95794 -0.0197013 7.04791 0.000401531 8.25408C0.0205043 9.46025 0.792783 10.5251 1.93305 10.9188C3.07331 11.3126 4.33809 10.9512 5.0982 10.0145L9.92761 12.4292C9.62817 13.6178 10.1167 14.8654 11.1437 15.5346C12.1707 16.2038 13.5093 16.1468 14.4758 15.3928C15.4422 14.6388 15.823 13.3542 15.4236 12.1953C15.0243 11.0364 13.9329 10.2591 12.7072 10.2605V10.2523Z" fill="#7D2B8B" />
                                    </svg>
                                </button>
                                <button onClick={e => {
                                    setdelete(true)
                                    setdeletevalue("cv")
                                }}>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                </button>
                            </li>
                            : ""}
                    {
                        list.qualificationscertificatesdoc && list.qualificationscertificatesdoc_deleted_at == 0 ?
                            <li>
                                <span className='docic'>
                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                    </svg>
                                </span>
                                <span>Certificate{list.qualificationscertificatesdoc_original ? list.qualificationscertificatesdoc_original : ""}</span>
                                <span className='date'>{list.qualificationscertificatesdoc_updated_at}</span>

                                <button >
                                    <a href={api + '/public/assets/images/users/' + list.qualificationscertificatesdoc} download target="_blank">
                                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z" fill="#A98D4B" />
                                        </svg>
                                    </a>
                                </button>
                                <button onClick={e => {
                                    setsharedoc({
                                        "cert_doc": list.qualificationscertificatesdoc
                                    })
                                    setshare(true)
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7072 10.2523C11.841 10.2528 11.0214 10.6445 10.477 11.3182L5.64755 8.90347C5.77548 8.41171 5.76698 7.89438 5.62296 7.40709L10.5426 4.74641C11.5004 5.85506 13.1396 6.06415 14.3451 5.23145C15.5506 4.39876 15.9353 2.79169 15.2374 1.50341C14.5396 0.215139 12.9834 -0.340625 11.6274 0.214168C10.2714 0.768961 9.55101 2.25615 9.9563 3.6641L5.0367 6.32478C4.2458 5.41389 2.96968 5.09486 1.84317 5.5264C0.716664 5.95794 -0.0197013 7.04791 0.000401531 8.25408C0.0205043 9.46025 0.792783 10.5251 1.93305 10.9188C3.07331 11.3126 4.33809 10.9512 5.0982 10.0145L9.92761 12.4292C9.62817 13.6178 10.1167 14.8654 11.1437 15.5346C12.1707 16.2038 13.5093 16.1468 14.4758 15.3928C15.4422 14.6388 15.823 13.3542 15.4236 12.1953C15.0243 11.0364 13.9329 10.2591 12.7072 10.2605V10.2523Z" fill="#7D2B8B" />
                                    </svg>
                                </button>
                                <button onClick={e => {
                                    setdelete(true)
                                    setdeletevalue("qualificationscertificatesdoc")
                                }}>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                </button>
                            </li>
                            : ""
                    }
                    {
                        list.backgrounddoc && list.backgrounddoc_deleted_at == 0 ?
                            <li>
                                <span className='docic'>
                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                    </svg>
                                </span>
                                <span>Background_check_{list.backgrounddoc_original ? list.backgrounddoc_original : ""}</span>
                                <span className='date'>{list.backgrounddoc_updated_at}</span>

                                <button >
                                    <a href={api + '/public/assets/images/users/' + list.backgrounddoc} download target="_blank">
                                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z" fill="#A98D4B" />
                                        </svg>
                                    </a>
                                </button>
                                <button onClick={e => {
                                    setsharedoc({
                                        "back_doc": list.backgrounddoc
                                    })
                                    setshare(true)
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7072 10.2523C11.841 10.2528 11.0214 10.6445 10.477 11.3182L5.64755 8.90347C5.77548 8.41171 5.76698 7.89438 5.62296 7.40709L10.5426 4.74641C11.5004 5.85506 13.1396 6.06415 14.3451 5.23145C15.5506 4.39876 15.9353 2.79169 15.2374 1.50341C14.5396 0.215139 12.9834 -0.340625 11.6274 0.214168C10.2714 0.768961 9.55101 2.25615 9.9563 3.6641L5.0367 6.32478C4.2458 5.41389 2.96968 5.09486 1.84317 5.5264C0.716664 5.95794 -0.0197013 7.04791 0.000401531 8.25408C0.0205043 9.46025 0.792783 10.5251 1.93305 10.9188C3.07331 11.3126 4.33809 10.9512 5.0982 10.0145L9.92761 12.4292C9.62817 13.6178 10.1167 14.8654 11.1437 15.5346C12.1707 16.2038 13.5093 16.1468 14.4758 15.3928C15.4422 14.6388 15.823 13.3542 15.4236 12.1953C15.0243 11.0364 13.9329 10.2591 12.7072 10.2605V10.2523Z" fill="#7D2B8B" />
                                    </svg>
                                </button>
                                <button onClick={e => {
                                    setdelete(true)
                                    setdeletevalue("backgrounddoc")
                                }}>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                </button>
                            </li>
                            : ""}

                </ul>
                <button className='upload_doc' onClick={e => setfirstappli(true)}>Upload documents<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="15" fill="#A98D4B" />
                    <rect x="14" y="7" width="2.28571" height="16" rx="1.14286" fill="white" />
                    <rect x="7" y="16" width="2.28571" height="16" rx="1.14286" transform="rotate(-90 7 16)" fill="white" />
                </svg>
                </button>
            </div>

            {
                firstappli ?
                    <Modal show={firstappli} onHide={e => setfirstappli(false)} className="upload_doc_modul">
                        <Modal.Body>
                            <div className='promocode_content upload_document'>
                                <Link to="" onClick={e => setfirstappli(false)}>+ </Link>
                                <h2>Upload Documents</h2>
                                <p>Please choose the type of document you want to upload</p>
                                <ul>
                                    <li>
                                        <span className='docic'>
                                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                            </svg>
                                        </span>
                                        <span className='named'>Recommendation</span>
                                        <div className='upload_field'>
                                        <input placeholder='Choose file' type="file"  onChange={e => {
                                                if (e.target.files[0].name != "The upload does not work properly.docx") {
                                                    seterrorfield({ ...errorfield, recommendationsfile: "" })
                                                    setdetailprovide({ ...detailprovider, recommendationsfile: e.target.files[0] })
                                                }
                                            }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" />
                                            <span>{detailprovider.recommendationsfile != "" ? detailprovider.recommendationsfile.name ? detailprovider.recommendationsfile.name : detailprovider.recommendationsfile : 'Choose file'}</span>
                                            <button>
                                                <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.748538 7.27273C1.16194 7.27273 1.49708 7.59834 1.49708 8V13.8182C1.49708 14.0111 1.57594 14.1961 1.71632 14.3324C1.8567 14.4688 2.04709 14.5455 2.24561 14.5455H11.2281C11.4266 14.5455 11.617 14.4688 11.7574 14.3324C11.8977 14.1961 11.9766 14.0111 11.9766 13.8182V8C11.9766 7.59834 12.3117 7.27273 12.7251 7.27273C13.1386 7.27273 13.4737 7.59834 13.4737 8V13.8182C13.4737 14.3968 13.2371 14.9518 12.816 15.361C12.3948 15.7701 11.8236 16 11.2281 16H2.24561C1.65004 16 1.07886 15.7701 0.657725 15.361C0.236591 14.9518 0 14.3968 0 13.8182V8C0 7.59834 0.335132 7.27273 0.748538 7.27273Z" fill="#A98D4B" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.748538 7.27273C1.16194 7.27273 1.49708 7.59834 1.49708 8V13.8182C1.49708 14.0111 1.57594 14.1961 1.71632 14.3324C1.8567 14.4688 2.04709 14.5455 2.24561 14.5455H11.2281C11.4266 14.5455 11.617 14.4688 11.7574 14.3324C11.8977 14.1961 11.9766 14.0111 11.9766 13.8182V8C11.9766 7.59834 12.3117 7.27273 12.7251 7.27273C13.1386 7.27273 13.4737 7.59834 13.4737 8V13.8182C13.4737 14.3968 13.2371 14.9518 12.816 15.361C12.3948 15.7701 11.8236 16 11.2281 16H2.24561C1.65004 16 1.07886 15.7701 0.657725 15.361C0.236591 14.9518 0 14.3968 0 13.8182V8C0 7.59834 0.335132 7.27273 0.748538 7.27273Z" fill="white" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.20755 0.213013C6.49987 -0.0710044 6.97382 -0.0710044 7.26614 0.213013L10.2603 3.1221C10.5526 3.40612 10.5526 3.86661 10.2603 4.15062C9.96797 4.43464 9.49402 4.43464 9.2017 4.15062L6.73684 1.75579L4.27199 4.15062C3.97966 4.43464 3.50572 4.43464 3.21339 4.15062C2.92107 3.86661 2.92107 3.40612 3.21339 3.1221L6.20755 0.213013Z" fill="#A98D4B" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.20755 0.213013C6.49987 -0.0710044 6.97382 -0.0710044 7.26614 0.213013L10.2603 3.1221C10.5526 3.40612 10.5526 3.86661 10.2603 4.15062C9.96797 4.43464 9.49402 4.43464 9.2017 4.15062L6.73684 1.75579L4.27199 4.15062C3.97966 4.43464 3.50572 4.43464 3.21339 4.15062C2.92107 3.86661 2.92107 3.40612 3.21339 3.1221L6.20755 0.213013Z" fill="white" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73684 1.08372e-08C7.15025 1.08372e-08 7.48538 0.325611 7.48538 0.727273V10.1818C7.48538 10.5835 7.15025 10.9091 6.73684 10.9091C6.32344 10.9091 5.9883 10.5835 5.9883 10.1818V0.727273C5.9883 0.325611 6.32344 1.08372e-08 6.73684 1.08372e-08Z" fill="#A98D4B" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73684 1.08372e-08C7.15025 1.08372e-08 7.48538 0.325611 7.48538 0.727273V10.1818C7.48538 10.5835 7.15025 10.9091 6.73684 10.9091C6.32344 10.9091 5.9883 10.5835 5.9883 10.1818V0.727273C5.9883 0.325611 6.32344 1.08372e-08 6.73684 1.08372e-08Z" fill="white" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <span className='docic'>
                                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                            </svg>
                                        </span>
                                        <span className='named'>CV</span>
                                        <div className='upload_field'>
                                            <span>{detailprovider.cv != "" ? detailprovider.cv.name ? detailprovider.cv.name : detailprovider.cv : 'Choose file'}</span>
                                            <input placeholder='Choose file' className={errorfield.cv != "" ? "bordererror" : ""} type="file" onChange={e => {
                                                if (e.target.files[0].name != "The upload does not work properly.docx") {
                                                    seterrorfield({ ...errorfield, cv: "" })
                                                    setdetailprovide({ ...detailprovider, cv: e.target.files[0] })
                                                }
                                            }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" />
                                            <button>
                                                <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.748538 7.27273C1.16194 7.27273 1.49708 7.59834 1.49708 8V13.8182C1.49708 14.0111 1.57594 14.1961 1.71632 14.3324C1.8567 14.4688 2.04709 14.5455 2.24561 14.5455H11.2281C11.4266 14.5455 11.617 14.4688 11.7574 14.3324C11.8977 14.1961 11.9766 14.0111 11.9766 13.8182V8C11.9766 7.59834 12.3117 7.27273 12.7251 7.27273C13.1386 7.27273 13.4737 7.59834 13.4737 8V13.8182C13.4737 14.3968 13.2371 14.9518 12.816 15.361C12.3948 15.7701 11.8236 16 11.2281 16H2.24561C1.65004 16 1.07886 15.7701 0.657725 15.361C0.236591 14.9518 0 14.3968 0 13.8182V8C0 7.59834 0.335132 7.27273 0.748538 7.27273Z" fill="#A98D4B" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.748538 7.27273C1.16194 7.27273 1.49708 7.59834 1.49708 8V13.8182C1.49708 14.0111 1.57594 14.1961 1.71632 14.3324C1.8567 14.4688 2.04709 14.5455 2.24561 14.5455H11.2281C11.4266 14.5455 11.617 14.4688 11.7574 14.3324C11.8977 14.1961 11.9766 14.0111 11.9766 13.8182V8C11.9766 7.59834 12.3117 7.27273 12.7251 7.27273C13.1386 7.27273 13.4737 7.59834 13.4737 8V13.8182C13.4737 14.3968 13.2371 14.9518 12.816 15.361C12.3948 15.7701 11.8236 16 11.2281 16H2.24561C1.65004 16 1.07886 15.7701 0.657725 15.361C0.236591 14.9518 0 14.3968 0 13.8182V8C0 7.59834 0.335132 7.27273 0.748538 7.27273Z" fill="white" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.20755 0.213013C6.49987 -0.0710044 6.97382 -0.0710044 7.26614 0.213013L10.2603 3.1221C10.5526 3.40612 10.5526 3.86661 10.2603 4.15062C9.96797 4.43464 9.49402 4.43464 9.2017 4.15062L6.73684 1.75579L4.27199 4.15062C3.97966 4.43464 3.50572 4.43464 3.21339 4.15062C2.92107 3.86661 2.92107 3.40612 3.21339 3.1221L6.20755 0.213013Z" fill="#A98D4B" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.20755 0.213013C6.49987 -0.0710044 6.97382 -0.0710044 7.26614 0.213013L10.2603 3.1221C10.5526 3.40612 10.5526 3.86661 10.2603 4.15062C9.96797 4.43464 9.49402 4.43464 9.2017 4.15062L6.73684 1.75579L4.27199 4.15062C3.97966 4.43464 3.50572 4.43464 3.21339 4.15062C2.92107 3.86661 2.92107 3.40612 3.21339 3.1221L6.20755 0.213013Z" fill="white" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73684 1.08372e-08C7.15025 1.08372e-08 7.48538 0.325611 7.48538 0.727273V10.1818C7.48538 10.5835 7.15025 10.9091 6.73684 10.9091C6.32344 10.9091 5.9883 10.5835 5.9883 10.1818V0.727273C5.9883 0.325611 6.32344 1.08372e-08 6.73684 1.08372e-08Z" fill="#A98D4B" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73684 1.08372e-08C7.15025 1.08372e-08 7.48538 0.325611 7.48538 0.727273V10.1818C7.48538 10.5835 7.15025 10.9091 6.73684 10.9091C6.32344 10.9091 5.9883 10.5835 5.9883 10.1818V0.727273C5.9883 0.325611 6.32344 1.08372e-08 6.73684 1.08372e-08Z" fill="white" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <span className='docic'>
                                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                            </svg>
                                        </span>
                                        <span className='named'>Certificate</span>
                                        <div className='uploadcert'>
                                            <div className='upload_field'>
                                            <input placeholder='Choose file' type="file"  onChange={e => {
                                                    if (e.target.files[0].name != "The upload does not work properly.docx") {
                                                        seterrorfield({ ...errorfield, qualificationscertificatesdoc: "" })
                                                        setdetailprovide({ ...detailprovider, qualificationscertificatesdoc: e.target.files[0] })
                                                    }
                                                }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" id='' />
                                                <span>{detailprovider.qualificationscertificatesdoc != "" ? detailprovider.qualificationscertificatesdoc.name ? detailprovider.qualificationscertificatesdoc.name : detailprovider.qualificationscertificatesdoc : 'Choose file'}</span>
                                                <button>
                                                    <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.748538 7.27273C1.16194 7.27273 1.49708 7.59834 1.49708 8V13.8182C1.49708 14.0111 1.57594 14.1961 1.71632 14.3324C1.8567 14.4688 2.04709 14.5455 2.24561 14.5455H11.2281C11.4266 14.5455 11.617 14.4688 11.7574 14.3324C11.8977 14.1961 11.9766 14.0111 11.9766 13.8182V8C11.9766 7.59834 12.3117 7.27273 12.7251 7.27273C13.1386 7.27273 13.4737 7.59834 13.4737 8V13.8182C13.4737 14.3968 13.2371 14.9518 12.816 15.361C12.3948 15.7701 11.8236 16 11.2281 16H2.24561C1.65004 16 1.07886 15.7701 0.657725 15.361C0.236591 14.9518 0 14.3968 0 13.8182V8C0 7.59834 0.335132 7.27273 0.748538 7.27273Z" fill="#A98D4B" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.748538 7.27273C1.16194 7.27273 1.49708 7.59834 1.49708 8V13.8182C1.49708 14.0111 1.57594 14.1961 1.71632 14.3324C1.8567 14.4688 2.04709 14.5455 2.24561 14.5455H11.2281C11.4266 14.5455 11.617 14.4688 11.7574 14.3324C11.8977 14.1961 11.9766 14.0111 11.9766 13.8182V8C11.9766 7.59834 12.3117 7.27273 12.7251 7.27273C13.1386 7.27273 13.4737 7.59834 13.4737 8V13.8182C13.4737 14.3968 13.2371 14.9518 12.816 15.361C12.3948 15.7701 11.8236 16 11.2281 16H2.24561C1.65004 16 1.07886 15.7701 0.657725 15.361C0.236591 14.9518 0 14.3968 0 13.8182V8C0 7.59834 0.335132 7.27273 0.748538 7.27273Z" fill="white" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.20755 0.213013C6.49987 -0.0710044 6.97382 -0.0710044 7.26614 0.213013L10.2603 3.1221C10.5526 3.40612 10.5526 3.86661 10.2603 4.15062C9.96797 4.43464 9.49402 4.43464 9.2017 4.15062L6.73684 1.75579L4.27199 4.15062C3.97966 4.43464 3.50572 4.43464 3.21339 4.15062C2.92107 3.86661 2.92107 3.40612 3.21339 3.1221L6.20755 0.213013Z" fill="#A98D4B" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.20755 0.213013C6.49987 -0.0710044 6.97382 -0.0710044 7.26614 0.213013L10.2603 3.1221C10.5526 3.40612 10.5526 3.86661 10.2603 4.15062C9.96797 4.43464 9.49402 4.43464 9.2017 4.15062L6.73684 1.75579L4.27199 4.15062C3.97966 4.43464 3.50572 4.43464 3.21339 4.15062C2.92107 3.86661 2.92107 3.40612 3.21339 3.1221L6.20755 0.213013Z" fill="white" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73684 1.08372e-08C7.15025 1.08372e-08 7.48538 0.325611 7.48538 0.727273V10.1818C7.48538 10.5835 7.15025 10.9091 6.73684 10.9091C6.32344 10.9091 5.9883 10.5835 5.9883 10.1818V0.727273C5.9883 0.325611 6.32344 1.08372e-08 6.73684 1.08372e-08Z" fill="#A98D4B" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73684 1.08372e-08C7.15025 1.08372e-08 7.48538 0.325611 7.48538 0.727273V10.1818C7.48538 10.5835 7.15025 10.9091 6.73684 10.9091C6.32344 10.9091 5.9883 10.5835 5.9883 10.1818V0.727273C5.9883 0.325611 6.32344 1.08372e-08 6.73684 1.08372e-08Z" fill="white" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* <ul onClick={e => seterrorfield({ ...errorfield, qualificationscertificatesname: "" })}>
                                                <li><input type="radio" name='Certificate' onClick={e => {
                                                    if (e.target.checked) {
                                                        setcertificates({ ...certificates, qualificationscertificatesname: "First Aid", qualificationscertificatesname4: "" })
                                                    }
                                                    else {
                                                        setcertificates({ ...certificates, qualificationscertificatesname: "" })
                                                    }
                                                }} defaultChecked={certificates.qualificationscertificatesname == "First Aid" ? true : false} /><span> First Aid</span></li>
                                                <li><input type="radio" name='Certificate' onClick={e => {
                                                    if (e.target.checked) {
                                                        setcertificates({ ...certificates, qualificationscertificatesname2: "Montessori", qualificationscertificatesname4: "" })
                                                    } else {
                                                        setcertificates({ ...certificates, qualificationscertificatesname2: "" })
                                                    }
                                                }} defaultChecked={certificates.qualificationscertificatesname2 == "Montessori" ? true : false} /><span> Montessori</span></li>
                                                <li><input type="radio" name='Certificate' onClick={e => {
                                                    if (e.target.checked) {
                                                        setcertificates({ ...certificates, qualificationscertificatesname3: "Board Certified Nurse", qualificationscertificatesname4: "" })
                                                    } else {
                                                        setcertificates({ ...certificates, qualificationscertificatesname3: "" })
                                                    }
                                                }} defaultChecked={certificates.qualificationscertificatesname3 == "Board Certified Nurse" ? true : false} /><span> Board Certified Nurse</span></li>

                                                <li><input type="radio" name='Certificate' onClick={e => {
                                                    if (e.target.checked) {
                                                        setcertificates({ ...certificates, qualificationscertificatesname4: " " })
                                                    }
                                                    else {
                                                        setcertificates({ ...certificates, qualificationscertificatesname4: "" })
                                                    }
                                                }} defaultChecked={certificates.qualificationscertificatesname4 != "" ? true : false} />

                                                    <span> <input type="text" placeholder='Other' onChange={e => {
                                                        setcertificates({ ...certificates, qualificationscertificatesname4: e.target.value })
                                                    }} defaultValue={certificates.qualificationscertificatesname4} className={certificates.qualificationscertificatesname4 == " " ? "bordererror" : ""} /></span></li>

                                            </ul> */}
                                        </div>
                                    </li>
                                    <li>
                                        <span className='docic'>
                                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                            </svg>
                                        </span>
                                        <span className='named'>Background check</span>
                                        <div className='upload_field'>
                                        <input placeholder='Choose file' type="file"  onChange={e => {
                                                if (e.target.files[0].name != "The upload does not work properly.docx") {
                                                    seterrorfield({ ...errorfield, backgroundstatus: "", backgrounddoc: "" })
                                                    setdetailprovide({ ...detailprovider, backgrounddoc: e.target.files[0] })
                                                }
                                            }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" id='Background' />
                                            <span>{detailprovider.backgrounddoc != "" ? detailprovider.backgrounddoc.name ? detailprovider.backgrounddoc.name : detailprovider.backgrounddoc : 'Choose file'}</span>
                                            <button>
                                                <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.748538 7.27273C1.16194 7.27273 1.49708 7.59834 1.49708 8V13.8182C1.49708 14.0111 1.57594 14.1961 1.71632 14.3324C1.8567 14.4688 2.04709 14.5455 2.24561 14.5455H11.2281C11.4266 14.5455 11.617 14.4688 11.7574 14.3324C11.8977 14.1961 11.9766 14.0111 11.9766 13.8182V8C11.9766 7.59834 12.3117 7.27273 12.7251 7.27273C13.1386 7.27273 13.4737 7.59834 13.4737 8V13.8182C13.4737 14.3968 13.2371 14.9518 12.816 15.361C12.3948 15.7701 11.8236 16 11.2281 16H2.24561C1.65004 16 1.07886 15.7701 0.657725 15.361C0.236591 14.9518 0 14.3968 0 13.8182V8C0 7.59834 0.335132 7.27273 0.748538 7.27273Z" fill="#A98D4B" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.748538 7.27273C1.16194 7.27273 1.49708 7.59834 1.49708 8V13.8182C1.49708 14.0111 1.57594 14.1961 1.71632 14.3324C1.8567 14.4688 2.04709 14.5455 2.24561 14.5455H11.2281C11.4266 14.5455 11.617 14.4688 11.7574 14.3324C11.8977 14.1961 11.9766 14.0111 11.9766 13.8182V8C11.9766 7.59834 12.3117 7.27273 12.7251 7.27273C13.1386 7.27273 13.4737 7.59834 13.4737 8V13.8182C13.4737 14.3968 13.2371 14.9518 12.816 15.361C12.3948 15.7701 11.8236 16 11.2281 16H2.24561C1.65004 16 1.07886 15.7701 0.657725 15.361C0.236591 14.9518 0 14.3968 0 13.8182V8C0 7.59834 0.335132 7.27273 0.748538 7.27273Z" fill="white" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.20755 0.213013C6.49987 -0.0710044 6.97382 -0.0710044 7.26614 0.213013L10.2603 3.1221C10.5526 3.40612 10.5526 3.86661 10.2603 4.15062C9.96797 4.43464 9.49402 4.43464 9.2017 4.15062L6.73684 1.75579L4.27199 4.15062C3.97966 4.43464 3.50572 4.43464 3.21339 4.15062C2.92107 3.86661 2.92107 3.40612 3.21339 3.1221L6.20755 0.213013Z" fill="#A98D4B" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.20755 0.213013C6.49987 -0.0710044 6.97382 -0.0710044 7.26614 0.213013L10.2603 3.1221C10.5526 3.40612 10.5526 3.86661 10.2603 4.15062C9.96797 4.43464 9.49402 4.43464 9.2017 4.15062L6.73684 1.75579L4.27199 4.15062C3.97966 4.43464 3.50572 4.43464 3.21339 4.15062C2.92107 3.86661 2.92107 3.40612 3.21339 3.1221L6.20755 0.213013Z" fill="white" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73684 1.08372e-08C7.15025 1.08372e-08 7.48538 0.325611 7.48538 0.727273V10.1818C7.48538 10.5835 7.15025 10.9091 6.73684 10.9091C6.32344 10.9091 5.9883 10.5835 5.9883 10.1818V0.727273C5.9883 0.325611 6.32344 1.08372e-08 6.73684 1.08372e-08Z" fill="#A98D4B" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73684 1.08372e-08C7.15025 1.08372e-08 7.48538 0.325611 7.48538 0.727273V10.1818C7.48538 10.5835 7.15025 10.9091 6.73684 10.9091C6.32344 10.9091 5.9883 10.5835 5.9883 10.1818V0.727273C5.9883 0.325611 6.32344 1.08372e-08 6.73684 1.08372e-08Z" fill="white" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                                <button onClick={e => {
                                    setdetailprovide({
                                        recommendationsfile: "",
                                        qualificationscertificatesname: "",
                                        cv: "",
                                        qualificationscertificatesdoc: "",
                                        backgrounddoc: ""
                                    })
                                    setcertificates({
                                        qualificationscertificatesname: "",
                                        qualificationscertificatesname2: "",
                                        qualificationscertificatesname3: "",
                                        qualificationscertificatesname4: ""
                                    })
                                    setfirstappli(false)
                                }}>Cancel</button>
                                <button style={submit != "" ? { opacity: "0.5" } : {}} onClick={e => profile_update()} >{submit == "" ? "Submit": "Submiting" }</button>
                            </div>
                        </Modal.Body>
                    </Modal>
                    : ""
            }
            {delete1 ?
                <Modal show={delete1} onHide={e => setdelete(false)} className="">
                    <Modal.Body>
                        <div className='promocode_content upload_document_delete'>
                            <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1304 0L10.5631 0.747414L19.8263 16.7474L20.2608 17.4979H19.3935H0.867224H0L0.434511 16.7474L9.69767 0.747414L10.1304 0ZM18.5263 16.4979L10.1304 1.99586L1.73445 16.4979H18.5263ZM10.9724 14.4717H9.28818V12.7875H10.9724V14.4717ZM9.28818 11.1035H10.9724V7.73506H9.28818V11.1035Z" fill="#7D2B8B" />
                            </svg>
                            <h2>Delete Document</h2>

                            <div className='gray'>
                                <p><span>Warning!</span> Are you sure you want to permanently delete this document? <br />
                                    <span>This action cannot be undone.</span></p>
                                <button onClick={e => delete_in()}>Delete</button>
                                <button onClick={e => setdelete(false)}>Cancel</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                : ""
            }
            {
                share ?
                    <Modal show={share} onHide={e => setshare(false)} className="">
                        <Modal.Body>
                            <div className='promocode_content share_profile'>
                                {/* <Link to="" onClick={e => setshare(false)}>+ </Link> */}
                                <h2>Share with</h2>
                                <br />
                                <div className='list_prorofile'>
                                    <div className='search_profile'>
                                   <input placeholder="Type here" type={"text"}  onChange={e => searchdata(e.target.value)} />
                                        <button>Search</button>
                                    </div>
                                    <ul>
                                        {
                                            sharelist.map((data, index) => {
                                                if (data != null) {
                                                    return (
                                                        <li>
                                                            <img src={api + "/public/assets/images/users/" + data.file_path} />
                                                            <p>{data.first_name + ' ' + data.last_name}</p>
                                                            <input type="radio" name='share' onChange={() => {
                                                                setshareslect(data.id)
                                                            }} />
                                                            <span></span>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                    <p style={{ color: "red", fontWeight: "600" }}>{error}</p>
                                    <button onClick={e => setshare(false)}>Cancel</button>
                                    <button onClick={share_data}>Share</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    : ""
            }
        </>
    )
}

export default My_document
