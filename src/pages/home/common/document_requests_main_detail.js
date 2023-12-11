import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../urls'
import Modal from 'react-bootstrap/Modal'
import Favorite_select from './favorite_select'
import Google_drive from './google_drive'
import Facebook_share from './share_facebook'


function Document_requests_main_detail(props) {
    const navigate = useNavigate();
    const [list, setlist] = useState([])
    const [list2, setlist2] = useState([])
    const [check, setcheck] = useState(true)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [profile, setprofile] = useState({})
    const [plink, setplink] = useState(true)
    const [firstappli, setfirstappli] = useState(false);
    const [share, setshare] = useState(false);
    const [message, setmessage] = useState("")
    const [doc_my, setdoc_my] = useState("")
    const [status, setstatus] = useState(false)
    const [error, seterror] = useState(false)
    const [selecttype, setselecttype] = useState("Mycomputer")
    const [doc, setdoc] = useState({})
    const [submit, setsubmit] = useState("");
    const [docmodel, setdocmodel] = useState(false)

    const [errorfield, seterrorfield] = useState({
        recommendationsfile: "",
        qualificationscertificatesname: "",
        cv: "",
        qualificationscertificatesdoc: "",
        backgrounddoc: ""
    })
    const [detailprovider, setdetailprovide] = useState({
        recommendationsfile: "",
        qualificationscertificatesname: "",
        cv: "",
        qualificationscertificatesdoc: "",
        backgrounddoc: ""
    })

    const pmore = (e, x, z) => {
        console.log(e, x)
        document.getElementById(e).style.display = "none"
        document.getElementById(x).style.display = "block"
        if (plink) {
            document.getElementById(z).style.display = "block"
            setplink(false)
        } else {
            setplink(true)
            document.getElementById(z).style.display = "none"
        }
    }

    const profile_data2 = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token")
        );

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/details", requestOptions)
            .then(response => response.json())
            .then(result => {
                setprofile(result.data)
            })
            .catch(error => console.log('error', error));
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

        fetch(api + "/api/v1/providermydocumentslist?", requestOptions)
            .then(response => response.json())
            .then(result => {
                setlist2(result.data)
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
                // setmessage(result.data.currentUserName)
            })
            .catch(error => console.log('error', error));

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

        fetch(api + "/api/v1/documentrequesthistory_viewdetails", requestOptions)
            .then(response => response.json())
            .then(result => {
                setlist([result.data.getparentsData])
                setmessage(result.data.currentUserName)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if (check) {
            profile_data()
            profile_data2()
            setcheck(false)
        }
        console.log(list2, doc);
    }, [check, selecttype, detailprovider, doc])

    const acceptdoc = (a) => {
        console.log(detailprovider, doc);
        setsubmit("h")
        if (doc.cv != "" || doc.qualificationscertificatesdoc != "" || doc.backgrounddoc != "" || doc.recommendationsfile != "" || doc.name) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            var formdata = new FormData();
            formdata.append("receiver_userid", list && list[0] && list[0].user_id);
            formdata.append("inv_id", props.id);
            formdata.append("type", selecttype);
            if (doc.cv) {
                formdata.append("cv_doc", doc.cv)
            } else if (doc.qualificationscertificatesdoc) {
                formdata.append("cert_doc", doc.qualificationscertificatesdoc)
            } else if (doc.backgrounddoc) {
                formdata.append("back_doc", doc.backgrounddoc)
            } else if (doc.recommendationsfile) {
                formdata.append("recom_doc", doc.recommendationsfile)
            } else if (doc.name) {
                formdata.append("recom_doc", doc);
            }


            // var formdata = new FormData();
            // formdata.append("document_name", doc);
            // formdata.append("receiver_userid", list && list[0] && list[0].user_id);
            // formdata.append("inv_id", props.id);
            // formdata.append("type", selecttype);
            // formdata.append("original_name", doc_my);
            // formdata.append("docrequest_name", list && list[0] && list[0]?.documment_name.substr(list && list[0] && list[0]?.documment_name.lastIndexOf('\\') + 1).split('[')[1] ? JSON.parse(list && list[0] && list[0]?.documment_name) : list && list[0] && list[0]?.documment_name);


            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(api + "/api/v1/senddocuments", requestOptions)
                .then(response => response.text())
                .then(result => {
                    setdocmodel(false)
                    setfirstappli(false)
                    setshare(false)
                    setstatus(true)
                    setdoc("")
                    setsubmit("")
                    setdetailprovide({
                        recommendationsfile: "",
                        qualificationscertificatesname: "",
                        cv: "",
                        qualificationscertificatesdoc: "",
                        backgrounddoc: ""
                    })
                    setTimeout(() => {
                        setstatus(false)
                    }, 4000);
                    console.log(result)
                })

                .catch(error => {
                    setsubmit("")
                    console.log('error', error)
                });
        }
        else {
            seterror("error")
            setTimeout(() => {
                seterror("")
            }, 2000);
            setsubmit("")
        }
    }
    return (
        <>
            {
                status ? <div className='popup_status' id="popup_status">
                    Congratulations, you successfully sent a document!
                </div> : ""
            }
            {list && list[0] ?
                <>
                    <h2 className='border'></h2>
                    <div className='detail_invit'>
                        <p>
                            <span className='date'>{list && list[0] && list[0].created_at ? new Date(list && list[0] && list[0].created_at).toLocaleDateString('en-US', { weekday: 'short' }) : ""}, {list && list[0] && list[0].created_at ? month[new Date(list && list[0] && list[0].created_at).getMonth()] : ""}, {new Date(list && list[0] && list[0].created_at).getDate()}, {new Date(list && list[0] && list[0].created_at).getFullYear()}, {new Date(list && list[0] && list[0].created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></p>
                        <h2>Dear<span> {message}</span>,
                        </h2>
                        <h2>
                            <Link to={"/profile-parents/" + list[0]?.user_id} >{list && list[0] && list[0].first_name}</Link> just requested<strong style={{ marginLeft: "5px" }}>
                                {list && list[0] && list[0]?.documment_name.substr(list && list[0] && list[0]?.documment_name.lastIndexOf('\\') + 1).split('[')[1] ? JSON.parse(list && list[0] && list[0]?.documment_name).map((e, i) => e + ((i + 1) == JSON.parse(list && list[0] && list[0]?.documment_name).length ? "" : ", ")) : list && list[0] && list[0]?.documment_name + "  "} document</strong> from you on {list && list[0] && list[0].created_at ? new Date(list && list[0] && list[0].created_at).toLocaleDateString('en-US', { weekday: 'short' }) : ""}, {list && list[0] && list[0].created_at ? month[new Date(list && list[0] && list[0].created_at).getMonth()] : ""},{new Date(list && list[0] && list[0].created_at).getDate()}
                        </h2>
                        <br />

                        <br />
                    </div>
                    <div class="right_side_section">
                        <div class="looking_for_candidate">
                            {window.innerWidth > 860 ?
                                list.map((data, index) => {
                                    return (
                                        <div class="looking_for_candidate_boxs">
                                            <div class="looking_for_candidate_box">
                                                <div class="first_sec">
                                                    <div class="image_sec">
                                                        <img src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : window.location.origin + "/img/nany_img.png"} alt="" />
                                                        <div class="heart_sec">
                                                            <Favorite_select id={data.user_id} username={data.first_name} />
                                                        </div>
                                                    </div>
                                                    <div class="nany_social">
                                                        {
                                                            data.phoneVerifiedStatus == 1 ?
                                                                <img src={window.location.origin + "/images/nany_phone.svg"} alt="" />
                                                                :
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z" fill="#B7B7B7" />
                                                                </svg>}
                                                        <img src={window.location.origin + "/images/nany_msg.svg"} alt="" />
                                                        {
                                                            data.facebookverify != null || data.linkdinverify != null ?
                                                                <img src={window.location.origin + "/images/nany_cont.svg"} alt="" />
                                                                : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z" fill="#B7B7B7" />
                                                                </svg>
                                                        }
                                                        {/* <img src={window.location.origin + "/images/ok.svg"} alt="" /> */}
                                                    </div>
                                                </div>
                                                <div class="second_sec">
                                                    <div class="heading">
                                                        <h3>{data.jobs.length > 0 && data?.jobs[0]?.title != null ? data.jobs[0]?.title : ""} </h3>
                                                        {data?.jobs[0]?.plateformonsocialmedia == "Yes" ?
                                                            <Facebook_share link={window.location.origin + "/profile-parents/" + data.user_id} />
                                                            : ""}
                                                    </div>
                                                    <div class="post_general">
                                                        <h6><Link to={"/profile-parents/" + list[0]?.user_id} >{data.first_name != null ? data.first_name + " " + data.last_name + " " : ""}</Link> ({data.dob != undefined ? new Date().getFullYear() - parseInt(data.dob.substr(data.dob.lastIndexOf('\\') + 1).split('-')[0]) : ""})</h6>
                                                        <p>
                                                            {data.reviewAvg >= 0 ?
                                                                <>
                                                                    {[...Array(data.reviewAvg)].map((star, index) => {
                                                                        index += 1;
                                                                        return (
                                                                            <svg width="12" height="12" style={{ marginLeft: "0px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                            </svg>

                                                                        );
                                                                    })}
                                                                    {[...Array(5 - data.reviewAvg)].map((star, index) => {
                                                                        index += 1;
                                                                        return (
                                                                            <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: "0px" }} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z" stroke="#A98D4B" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </svg>
                                                                        );
                                                                    })}
                                                                </>
                                                                : ""
                                                            }
                                                            <span> ({data.reviewcount})</span>
                                                        </p>
                                                    </div>
                                                    <div class="post_detail">
                                                        <div class="post">
                                                            {
                                                                JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[0] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                            }
                                                            <h5>{JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[0]
                                                                : ""}
                                                            </h5>
                                                        </div>
                                                        <div class="vi"></div>

                                                        <div class="post_pay">
                                                            <img src={window.location.origin + "/img/post_pay.png"} alt="" />
                                                            {profile && profile.country == "Serbia" ? <h5>{data.nanyperhrrate != null ?
                                                                data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                + " - " +
                                                                data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                : data.tutorperhrrate ?
                                                                    data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                    + " - " +
                                                                    data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                    : ""} /hour</h5>
                                                                : <h5>${data.nanyperhrrate != null ? data.nanyperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""} /hour</h5>
                                                            }
                                                        </div>

                                                        <div class="vi"></div>
                                                        <div class="post_fet">
                                                            <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                            <h5>{data.nanyintrestedin != null ? data.nanyintrestedin : data.tutorintrestedin != null ? data.tutorintrestedin : "Full time"} </h5>
                                                        </div>
                                                        <div class="vi"></div>
                                                        <div class="post_cal">
                                                            <img src={window.location.origin + "/images/post_cal.svg"} alt="" />
                                                            <h5>{data.nanystartdate != null ? data.nanystartdate : data.tutorstartdate}</h5>
                                                        </div>
                                                        <div class="vi"></div>
                                                        <div class="post_loc">
                                                            <img src={window.location.origin + "/images/post_loc.svg"} alt="" />
                                                            <h5>{data.country != null ? data.country : ""}, {data.city != null ? data.city : ""}</h5>
                                                        </div>
                                                    </div>
                                                    <p id={"half" + index} >{data?.jobs[0]?.description != null ? (data?.jobs[0]?.description.substr(0, 100)
                                                    ) : ""}   {data?.jobs[0]?.description != null && data?.jobs[0]?.description.length > 100 ? <span onClick={e => pmore("half" + index, "full" + index, "plink" + index)}>...more</span> : ""} </p>
                                                    <p id={"full" + index} className="hide">{data?.jobs[0]?.description}  <span onClick={e => pmore("full" + index, "half" + index, "plink" + index)}> less</span></p>



                                                </div>

                                                <div class="view_profile_btn newadd" style={{ float: "right" }}>
                                                    <Link to={"/profile-parents/" + data.user_id}  >Visit profile</Link>
                                                    <button onClick={e => {

                                                        setdocmodel(true)
                                                    }}>Send documents</button>


                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                ) : ""}
                            <div className='mobile'>
                                {
                                    list.map((data, index) => {
                                        if (index <= 5) {
                                            return (
                                                <>
                                                    <div class="looking_for_candidate_boxs" style={{ display: "block" }}>
                                                        <div class="looking_for_candidate_box">
                                                            <div class="second_sec">
                                                                <div class="heading">
                                                                    <h3>{data?.jobs[0]?.title != null ? data.jobs[0]?.title : ""}</h3>
                                                                    {data?.jobs[0]?.plateformonsocialmedia == "Yes" ?
                                                                        <Facebook_share link={window.location.origin + "/profile-parents/" + data.user_id} />
                                                                        : ""}
                                                                </div>
                                                                <div class="post_general">
                                                                    <h6><Link to={"/profile-parents/" + list[0]?.user_id} >{data.first_name != null ? data.first_name + " " + data.last_name + " " : ""}</Link> ({data.dob != undefined ? new Date().getFullYear() - parseInt(data.dob.substr(data.dob.lastIndexOf('\\') + 1).split('-')[0]) : ""})</h6>
                                                                    <p>
                                                                        {data.reviewAvg >= 0 ?
                                                                            <>
                                                                                {[...Array(data.reviewAvg)].map((star, index) => {
                                                                                    index += 1;
                                                                                    return (
                                                                                        <svg width="12" height="12" style={{ marginLeft: "0px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                                        </svg>

                                                                                    );
                                                                                })}
                                                                                {[...Array(5 - data.reviewAvg)].map((star, index) => {
                                                                                    index += 1;
                                                                                    return (
                                                                                        <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: "0px" }} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z" stroke="#A98D4B" stroke-linecap="round" stroke-linejoin="round" />
                                                                                        </svg>
                                                                                    );
                                                                                })}
                                                                            </>
                                                                            : ""
                                                                        }
                                                                        <span> ({data.reviewcount})</span>
                                                                    </p>
                                                                </div>
                                                                <div class="post_detail">
                                                                    <div class="post">
                                                                        {
                                                                            JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[0] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                        }
                                                                        <h5>{JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[0] == "Special Education Paraprofessional" ? "SPED Paraprofessional" : Object.values(JSON.parse(data.service_type))[0] == "Special Education Teacher" ? "SPED teacher" : Object.values(JSON.parse(data.service_type))[0]
                                                                            : ""}
                                                                        </h5>
                                                                    </div>
                                                                    <div class="vi"></div>
                                                                    <div class="post_pay">
                                                                        <img src={window.location.origin + "/img/post_pay.png"} alt="" />
                                                                        {profile && profile.country == "Serbia" ? <h5>{data.nanyperhrrate != null ?
                                                                            data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                            + " - " +
                                                                            data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                            : data.tutorperhrrate ?
                                                                                data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                                + " - " +
                                                                                data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                                : ""} /hour</h5>
                                                                            : <h5>${data.nanyperhrrate != null ? data.nanyperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""}/hour </h5>
                                                                        }
                                                                    </div>
                                                                    <div class="vi"></div>
                                                                    <div class="post_fet">
                                                                        <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                                        <h5>{data.nanyintrestedin != null ? data.nanyintrestedin : " Full time"}</h5>
                                                                    </div>
                                                                    <div class="vi"></div>
                                                                    <div class="post_cal">
                                                                        <img src={window.location.origin + "/images/post_cal.svg"} alt="" />
                                                                        <h5>{data.nanystartdate != null ? data.nanystartdate : data.tutorstartdate}</h5>
                                                                    </div>
                                                                    <div class="vi"></div>
                                                                    <div class="post_loc">
                                                                        <img src={window.location.origin + "/images/post_loc.svg"} alt="" />
                                                                        <h5>{data.country != null ? data.country : ""}, {data.city != null ? data.city : ""}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="first_sec">
                                                                <div class="image_sec">
                                                                    <img src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : window.location.origin + "/img/nany_img.png"} alt="" />
                                                                    <div class="heart_sec">
                                                                        <Favorite_select id={data.user_id} username={data.first_name} />
                                                                    </div>
                                                                </div>
                                                                <div class="nany_social">
                                                                    {
                                                                        data.phoneVerifiedStatus == 1 ?
                                                                            <img src={window.location.origin + "/images/nany_phone.svg"} alt="" />
                                                                            :
                                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z" fill="#B7B7B7" />
                                                                            </svg>}
                                                                    <img src={window.location.origin + "/images/nany_msg.svg"} alt="" />
                                                                    {
                                                                        data.facebookverify != null || data.linkdinverify != null ?
                                                                            <img src={window.location.origin + "/images/nany_cont.svg"} alt="" />
                                                                            : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z" fill="#B7B7B7" />
                                                                            </svg>
                                                                    }
                                                                    {/* <img src={window.location.origin + "/images/ok.svg"} alt="" /> */}
                                                                </div>
                                                            </div>
                                                            <div class="second_sec">
                                                                <p id={"half" + index} >{data.jobs[0]?.description != null ? (data.jobs[0]?.description.substr(0, 100)

                                                                ) : ""}  {data.jobs[0]?.description != null && data.jobs[0]?.description.length > 100 ? <span onClick={e => pmore("half" + index, "full" + index, "plink" + index)}>... more</span> : ""} </p>
                                                                <p id={"full" + index} className="hide">{data.jobs[0]?.description} <span onClick={e => pmore("full" + index, "half" + index, "plink" + index)}> less</span></p>

                                                            </div>
                                                            <div class="view_profile_btn newadd visiterbtn" style={{ float: "right" }}>
                                                                <Link to={"/profile-parents/" + data.user_id} >Visit profile </Link>
                                                                <a onClick={e => setdocmodel(true)} className="scolor">Send documents</a>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    }
                                    )}
                            </div>
                        </div>
                    </div>
                    {docmodel ?
                        <Modal show={docmodel} onHide={e => {
                            setdocmodel(false)
                        }
                        } >
                            <Modal.Body>
                                <div className='promocode_content signout senddoc'>
                                    <Link to="" onClick={e => {
                                        setdocmodel(false)
                                    }}>+ </Link>
                                    <h2>Select your documents from</h2>
                                    <ul>
                                        <li>
                                            <span class="view-message  dont-show">
                                                <input type="radio" class="mail-radio" name="chk" onChange={e => {
                                                    setselecttype("Mydocument")
                                                    setshare(true)
                                                }} />
                                                <span className='circle'></span>
                                            </span>
                                            <span className='bothtype'>
                                                <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27 3H15L12.885 0.885C12.315 0.315 11.55 0 10.755 0H3C1.35 0 0.015 1.35 0.015 3L0 21C0 22.65 1.35 24 3 24H27C28.65 24 30 22.65 30 21V6C30 4.35 28.65 3 27 3ZM19.5 7.5C21.15 7.5 22.5 8.85 22.5 10.5C22.5 12.15 21.15 13.5 19.5 13.5C17.85 13.5 16.5 12.15 16.5 10.5C16.5 8.85 17.85 7.5 19.5 7.5ZM13.5 18V19.5H25.5V18C25.5 16.005 21.495 15 19.5 15C17.505 15 13.5 16.005 13.5 18Z" fill="#B7B7B7" />
                                                </svg>
                                                <p>
                                                    <h3>My Documents</h3>
                                                    <span>Select from the files stored on SensCare Platform</span>
                                                </p>

                                            </span>
                                        </li>
                                        <li>
                                            <span class="view-message  dont-show">
                                                <input type="radio" class="mail-radio" name="chk"
                                                    defaultChecked="true" onChange={e => {
                                                        setselecttype("Mycomputer")
                                                    }} />
                                                <span className='circle'></span>
                                            </span>
                                            <span className='bothtype'>
                                                <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M32.985 18C32.985 19.65 31.65 21 30 21H34.5C35.325 21 36 21.675 36 22.5C36 23.325 35.325 24 34.5 24H1.5C0.675 24 0 23.325 0 22.5C0 21.675 0.675 21 1.5 21H6C4.35 21 3 19.65 3 18V3C3 1.35 4.35 0 6 0H30C31.65 0 33 1.35 33 3L32.985 18ZM28.5 3H7.5C6.675 3 6 3.675 6 4.5V16.5C6 17.325 6.675 18 7.5 18H28.5C29.325 18 30 17.325 30 16.5V4.5C30 3.675 29.325 3 28.5 3Z" fill="#B7B7B7" />
                                                </svg>
                                                <p>
                                                    <h3>My Computer</h3>
                                                    <span>Select from the files stored on your computer</span>
                                                </p>

                                            </span>
                                        </li>
                                        <li>
                                            <span class="view-message  dont-show">

                                                <Google_drive />
                                                <span className='circle'></span>
                                            </span>
                                            <span className='bothtype'>
                                                <svg width="30" height="21" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M30 12.8897V17.9073C30 19.2929 28.8807 20.4161 27.5 20.4161H2.5C1.11927 20.4161 0 19.2929 0 17.9073V12.8897C0 11.5041 1.11927 10.3809 2.5 10.3809H27.5C28.8807 10.3809 30 11.5041 30 12.8897ZM27.5 8.70838C28.0503 8.7079 28.5953 8.81743 29.103 9.0306L24.0755 1.46285C23.8472 1.11921 23.5379 0.837442 23.175 0.642561C22.8121 0.447679 22.4069 0.34571 21.9954 0.345703H8.00463C7.59307 0.345704 7.18787 0.447672 6.82501 0.642554C6.46214 0.837437 6.15283 1.11921 5.92453 1.46285L0.897031 9.0306C1.40473 8.81743 1.94966 8.7079 2.5 8.70838H27.5ZM25 13.726C24.0795 13.726 23.3333 14.4748 23.3333 15.3985C23.3333 16.3222 24.0795 17.0711 25 17.0711C25.9205 17.0711 26.6667 16.3222 26.6667 15.3985C26.6667 14.4748 25.9205 13.726 25 13.726ZM20 13.726C19.0795 13.726 18.3333 14.4748 18.3333 15.3985C18.3333 16.3222 19.0795 17.0711 20 17.0711C20.9205 17.0711 21.6667 16.3222 21.6667 15.3985C21.6667 14.4748 20.9205 13.726 20 13.726Z" fill="#B7B7B7" />
                                                </svg>
                                                <p>
                                                    <h3>Drive</h3>
                                                    <span>Select from the files stored on your drive</span>
                                                </p>

                                            </span>
                                        </li>
                                    </ul>
                                    <div className='file'>
                                        <label>File name</label>
                                        <div className='group_label'>
                                            {/* {
                                                selecttype == "Mydocument" ? "" :
                                                    <> */}
                                            <span>{Object.values(doc)[0] ?
                                                "Choose file" : doc.name}</span>
                                            <input type='file' onChange={e => {
                                                setdoc(e.target.files[0])
                                            }} onClick={() => {
                                                setselecttype("Mycomputer")
                                                setfirstappli(false)
                                            }} accept=".doc, .docx,.pdf" />
                                            {/* </>
                                            } */}
                                            <button onClick={e => acceptdoc()}>
                                                Upload
                                            </button>

                                        </div>

                                    </div>
                                    <p style={{ color: "red" }}>{error != "" ? "Please select Document!" : ""}</p>
                                    <p class="hide" >Please visit our <Link to="/faq" target="_blank"> FAQ</Link> page and <Link to="/safety-center" target="_blank"> Safety center</Link> to read our safety tips and instructions.</p>
                                </div>
                            </Modal.Body>
                        </Modal >
                        : ""
                    }
                </>
                : ""
            }
            {share ?
                <Modal show={share} onHide={e => setshare(false)} className="">
                    <Modal.Body>
                        <div className='promocode_content share_profile'>
                            {/* <Link to="" onClick={e => setshare(false)}>+ </Link> */}
                            <h2>Send with</h2>
                            <br />
                            <div className='list_prorofile'>

                                <ul>
                                    {
                                        list2.recommendationsfile && list2.recommendationsfile_deleted_at == 0 ?
                                            <li>
                                                <img src={window.location.origin + '/images/team.svg'} />
                                                <p>Recommendation_{list2.recommendationsfile_original ? list2.recommendationsfile_original.substr(0, 20) : ""}</p>
                                                <input type="radio" onClick={e => {
                                                    setdoc({ recommendationsfile: list2.recommendationsfile })
                                                    setdoc_my(list2.recommendationsfile_original)
                                                }} name="chk2" />
                                                <span></span>
                                            </li>
                                            : ""
                                    }
                                    {
                                        list2.cv && list2.cv_deleted_at == 0 ?
                                            <li>
                                                <img src={window.location.origin + '/images/team.svg'} />
                                                <p>
                                                    Cv{list2.cv_original ? list2.cv_original.substr(0, 20) : ""}</p>
                                                <input type="radio" onClick={e => {
                                                    setdoc({ cv: list2.cv })
                                                    setdoc_my(list2.cv_original)
                                                }} name="chk2" />
                                                <span></span>
                                            </li>
                                            : ""
                                    }
                                    {
                                        list2.qualificationscertificatesdoc && list2.qualificationscertificatesdoc_deleted_at == 0 ?
                                            <li>
                                                <img src={window.location.origin + '/images/team.svg'} />
                                                <p>Certificate_{list2.qualificationscertificatesdoc_original ? list2.qualificationscertificatesdoc_original.substr(0, 20) : ""}</p>
                                                <input type="radio" onClick={e => {
                                                    setdoc({ qualificationscertificatesdoc: list2.qualificationscertificatesdoc })
                                                    setdoc_my(list2.qualificationscertificatesdoc_original)
                                                }} name="chk2" />
                                                <span></span>
                                            </li>
                                            : ""
                                    }
                                    {
                                        list2.backgrounddoc && list2.backgrounddoc_deleted_at == 0 ?
                                            <li>
                                                <img src={window.location.origin + '/images/team.svg'} />
                                                <p>Background{list2.backgrounddoc_original ? list2.backgrounddoc_original.substr(0, 20) : ""}</p>
                                                <input type="radio" onClick={e => {
                                                    setdoc({ backgrounddoc: list2.backgrounddoc })
                                                    setdoc_my(list2.backgrounddoc_original)
                                                }} name="chk2" />
                                                <span></span>
                                            </li>
                                            : ""
                                    }
                                </ul>
                                <button onClick={e => setshare(false)}>Cancel</button>
                                <button onClick={e => acceptdoc()}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                : ""
            }
            {
                firstappli ?
                    <Modal show={firstappli} onHide={e => setfirstappli(false)} className="upload_doc_modul">
                        <Modal.Body>
                            <div className='promocode_content upload_document'>
                                {/* <Link to="" onClick={e => setfirstappli(false)}>+ </Link> */}
                                <h2>"Upload Documents</h2>
                                <p>"Please choose the type of document you want to upload</p>
                                <ul>
                                    {
                                        JSON.parse(list && list[0] && list[0]?.documment_name).filter((e) => e == "Recommendations"
                                        )[0] ?
                                            <li>
                                                <span className='docic'>
                                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                                    </svg>
                                                </span>
                                                <span className='named'>"Recommendation</span>
                                                <div className='upload_field'>
                                                    <input placeholder="Choose file" type="file" onChange={e => {
                                                        if (e.target.files[0].name != "The upload does not work properly.docx") {
                                                            seterrorfield({ ...errorfield, recommendationsfile: "" })
                                                            setdetailprovide({ ...detailprovider, recommendationsfile: e.target.files[0] })
                                                        }
                                                    }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" />
                                                    <span>{detailprovider.recommendationsfile != "" ? detailprovider.recommendationsfile.name ? detailprovider.recommendationsfile.name : detailprovider.recommendationsfile : "Choose file"}</span>
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
                                            : ""
                                    }
                                    {
                                        JSON.parse(list && list[0] && list[0]?.documment_name).filter((e) => e == "CV"
                                        )[0] ?
                                            <li>
                                                <span className='docic'>
                                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                                    </svg>
                                                </span>
                                                <span className='named'>CV</span>
                                                <div className='upload_field'>
                                                    <span>{detailprovider.cv != "" ? detailprovider.cv.name ? detailprovider.cv.name : detailprovider.cv :
                                                        "Choose file"}</span>
                                                    <input placeholder="choose file" className={errorfield.cv != "" ? "bordererror" : ""} type="file" onChange={e => {
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
                                            : ""
                                    }
                                    {
                                        JSON.parse(list && list[0] && list[0]?.documment_name).filter((e) => e == "Certificates"
                                        )[0] ?
                                            <li>
                                                <span className='docic'>
                                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                                    </svg>
                                                </span>
                                                <span className='named'>Certificate</span>
                                                <div className='uploadcert'>
                                                    <div className='upload_field'>
                                                        <input placeholder="choose file" type="file" onChange={e => {
                                                            if (e.target.files[0].name != "The upload does not work properly.docx") {
                                                                seterrorfield({ ...errorfield, qualificationscertificatesdoc: "" })
                                                                setdetailprovide({ ...detailprovider, qualificationscertificatesdoc: e.target.files[0] })
                                                            }
                                                        }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" id='' />
                                                        <span>{detailprovider.qualificationscertificatesdoc != "" ? detailprovider.qualificationscertificatesdoc.name ? detailprovider.qualificationscertificatesdoc.name : detailprovider.qualificationscertificatesdoc : "choose file"}</span>
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
                                            : ""
                                    }
                                    {
                                        JSON.parse(list && list[0] && list[0]?.documment_name).filter((e) => e == "Background check"
                                        )[0] ?
                                            <li>
                                                <span className='docic'>
                                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z" fill="white" />
                                                    </svg>
                                                </span>
                                                <span className='named'>Background check</span>
                                                <div className='upload_field'>
                                                    <input placeholder="Choose file to upload" type="file" onChange={e => {
                                                        if (e.target.files[0].name != "The upload does not work properly.docx") {
                                                            seterrorfield({ ...errorfield, backgroundstatus: "", backgrounddoc: "" })
                                                            setdetailprovide({ ...detailprovider, backgrounddoc: e.target.files[0] })
                                                        }
                                                    }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" id='Background' />
                                                    <span>{detailprovider.backgrounddoc != "" ? detailprovider.backgrounddoc.name ? detailprovider.backgrounddoc.name : detailprovider.backgrounddoc :
                                                        " choose file"}</span>
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
                                            </li> : ""
                                    }
                                </ul>
                                <button onClick={e => {
                                    setdetailprovide({
                                        recommendationsfile: "",
                                        qualificationscertificatesname: "",
                                        cv: "",
                                        qualificationscertificatesdoc: "",
                                        backgrounddoc: ""
                                    })

                                    setfirstappli(false)
                                }}>Cancel</button>
                                <button style={submit != "" ? { opacity: "0.5" } : {}} onClick={e => acceptdoc()} >{submit == "" ? "Submit" : "Submiting"}</button>
                                <p style={{ color: "red" }}>{error != "" ? "Please select Document!" : ""}</p>
                            </div>
                        </Modal.Body>

                    </Modal>
                    : ""
            }
            {
                submit != "" ?
                    <Modal show={true} className="upload_doc_modul">
                        <div className='loder_back'>
                            <div class="loader"></div>
                        </div>
                    </Modal>
                    : ""
            }
        </>
    )
}

export default Document_requests_main_detail


