import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../urls'
import Modal from 'react-bootstrap/Modal'
import Send_review from '../send_review'
import Favorite_profile from './favorite_profile'
import Message_chet from './message_chet'
import Facebook_share from './share_facebook'


function Interview_accept(props) {
    const navigate = useNavigate();
    const [list, setlist] = useState([])
    const [check, setcheck] = useState(true)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [rating, setrating] = useState({})
    const [update, setupdate] = useState(false)
    const [profile, setprofile] = useState({})
    const [reviewmodel, setreviewmodel] = useState(false)
    const [view, setview] = useState("")
    const [plink, setplink] = useState(true)

    const [message, setmessage] = useState("")
    const [hired, sethired] = useState("")
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

        var raw = JSON.stringify({
            "notification_id": props.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/interviewinvitesresponseprofile", requestOptions)
            .then(response => response.json())
            .then(result => {
                setlist([result.data.providerprofile])
                setmessage(result.data.currentUserName)
                setrating(result.data)
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
    }, [check, hired])

    const accept = (a) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "inv_id": props.id,
            "provider_id": a
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/providerhire", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.type == "success") {
                    sethired("Hired Successfully")
                }
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    return (
        <>
            {list && list[0] ?
                view == "" ?
                    <>
                        <h2 className='border'></h2>
                        <div className='detail_invit'>
                            <p>
                                {list && list[0] && list[0].read_status == 0 ?
                                    <span className='new'>NEW !</span>
                                    : ""}

                                {list && list[0] && list[0].profile_headline != null ? list && list[0] && list[0].profile_headline : ""} <span className='date'>{list && list[0] && list[0].created_at ? new Date(list && list[0] && list[0].created_at).toLocaleDateString('en-US', { weekday: 'short' }) : ""}, {list && list[0] && list[0].created_at ? month[new Date(list && list[0] && list[0].created_at).getMonth()] : ""}, {new Date(list && list[0] && list[0].created_at).getDate()}, {new Date(list && list[0] && list[0].created_at).getFullYear()}, {new Date(list && list[0] && list[0].created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></p>
                            <h2>Dear <span>{message}</span>,                        </h2>
                            <h2>
                                {list && list[0] && list[0].status == 2 ? "" :
                                    "Congratulations,"} <Link to={"/profile-provider/" + list[0]?.UID} style={{ marginLeft: list && list[0] && list[0].status == 2 ? "0" : "2px" }}>  {list && list[0] && list[0].first_name}</Link>  {list && list[0] && list[0].status == 1 ? "accepted" : list && list[0] && list[0].status == 2 ? "declined" : "panding"} your Interview invite.
                            </h2>
                            {
                                list && list[0] && list[0].status == 2 ? "" :
                                    <p style={{ paddingTop: "15px" }}>The next step is to schedule an interview. Prepare for the interview by visiting our <Link to="/safety-center" target="_blank"> Safety center</Link> and <Link to="/faq" target="_blank"> FAQ</Link>.</p>
                            }
                        </div>
                        <div class="right_side_section jobapli">
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
                                                                <Favorite_profile id={data.provider_id} username={data.first_name} />
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
                                                            {
                                                                rating.docsStatus == "Yes" ?
                                                                    <img src={window.location.origin + "/images/ok.svg"} alt="" />
                                                                    : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z" fill="#B7B7B7" />
                                                                    </svg>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div class="second_sec">
                                                        <div class="heading">
                                                            <h3>{rating?.jobStatus?.JobStatus == 1 ? <span class="new-tag3"> Closed</span> : ""}  {data.profile_headline != null ? data.profile_headline : ""} </h3>

                                                            {list && list[0] && list[0].status == 1 && rating?.jobStatus?.jobStatus != 1 ?
                                                                <button style={hired != "" || data.hire_status == 1 ? { opacity: "0.5" } : {}} onClick={e => accept(data.provider_id)} disabled={hired != "" || data.hire_status == 1 ? true : false}>{hired != "" || data.hire_status == 1 ?
                                                                    "Hired" :
                                                                    "Hire"}</button>
                                                                : ""
                                                            }
                                                            {data.plateformsocialmedia == "Yes" ?
                                                                <Facebook_share link={window.location.origin + "/profile-provider/" + data.provider_id} />
                                                                : ""}

                                                        </div>
                                                        <div class="post_general">
                                                            <h6><Link to={"/profile-provider/" + list[0]?.UID} >{data.first_name != null ? data.first_name + " " + data.last_name + " " : ""}</Link> ({data.dob != undefined ? new Date().getFullYear() - parseInt(data.dob.substr(data.dob.lastIndexOf('\\') + 1).split('-')[0]) : ""})</h6>
                                                            <p onClick={e => {
                                                                if (rating.checkreviewstatus != true) {
                                                                    setreviewmodel(true)
                                                                }
                                                            }}>
                                                                {rating.reviewAvg >= 0 ?
                                                                    <>
                                                                        {[...Array(rating.reviewAvg)].map((star, index) => {
                                                                            index += 1;
                                                                            return (
                                                                                <svg width="12" height="12" style={{ marginLeft: "0px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                                </svg>

                                                                            );
                                                                        })}
                                                                        {[...Array(5 - rating.reviewAvg)].map((star, index) => {
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
                                                                <span> ({rating.reviewcount})</span>
                                                            </p>
                                                        </div>
                                                        <div class="post_detail">
                                                            <div class="post">
                                                                {
                                                                    data.service_type != null ? Object.values(JSON.parse(data.service_type))[0] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                }
                                                                <h5>{data.service_type != null ? Object.values(JSON.parse(data.service_type))[0]
                                                                    : ""}
                                                                    {/* {
                                                                data.service_type != null && Object.values(data.service_type)[0].length > 8 ? "..." : ""
                                                            } */}
                                                                    {/* {Object.values(data.service_type) + ","} */}
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
                                                                        : ""}/hour </h5>
                                                                    : <h5>${data.nanyperhrrate != null ? data.nanyperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""} /hour</h5>
                                                                }
                                                            </div>
                                                            <div class="vi"></div>
                                                            {data.service_type != null && Object.values(JSON.parse(data.service_type))[1] ?
                                                                <>
                                                                    <div class="post">
                                                                        {
                                                                            data.service_type != null ? Object.values(JSON.parse(data.service_type))[1] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[1] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[1] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[1] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                        }
                                                                        <h5>{JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[1] ==
                                                                            "Special Education Paraprofessional" ?
                                                                            "SPED Paraprofessional" : Object.values(JSON.parse(data.service_type))[1] ==
                                                                                " Special Education Teacher" ?
                                                                                "SPED teacher" : Object.values(JSON.parse(data.service_type))[1] : ""
                                                                        }
                                                                            {/* {
                                                                        data.service_type != null && Object.values(data.service_type)[1].length > 8 ? "..." : ""
                                                                    } */}
                                                                        </h5>
                                                                    </div>
                                                                    <div class="vi"></div>

                                                                    <div class="post_pay">
                                                                        <img src={window.location.origin + "/img/post_pay.png"} alt="" />
                                                                        {profile && profile.country == "Serbia" ? <h5>{data.tutorperhrrate ?
                                                                            data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                            + " - " +
                                                                            data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                            : ""}/hour</h5>
                                                                            : <h5>${data.tutorperhrrate ? data.tutorperhrrate : ""}/hour </h5>
                                                                        }
                                                                    </div>
                                                                    <div class="vi"></div>
                                                                </>
                                                                : ""}
                                                            <div class="post_fet">
                                                                <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                                <h5>{data.tutorintrestedin != null ? data.tutorintrestedin : data.nanyintrestedin}</h5>
                                                            </div>
                                                            <div class="vi"></div>
                                                            <div class="post_cal">
                                                                <img src={window.location.origin + "/images/post_cal.svg"} alt="" />
                                                                <h5>{data.tutorstartdate != null ? data.tutorstartdate : data.nanystartdate}</h5>
                                                            </div>
                                                            <div class="vi"></div>
                                                            <div class="post_loc">
                                                                <img src={window.location.origin + "/images/post_loc.svg"} alt="" />
                                                                <h5>{data.country != null ? data.country : ""}, {data.city != null ? data.city : ""}</h5>
                                                            </div>
                                                        </div>
                                                        <p id={"half" + index} > {data.about != null ? (data.about.substr(0, 100)
                                                        ) : ""}   {data.about != null && data.about.length > 100 ? <span onClick={e => {
                                                            setplink(true)
                                                            pmore("half" + index, "full" + index, "plink" + index)
                                                        }}>...more</span> : ""} </p>

                                                        <p id={"full" + index} className="hide"> {data.about} <span onClick={e => pmore("full" + index, "half" + index, "plink" + index)}> less</span></p>


                                                    </div>
                                                    <div className='find_search'>
                                                        <Link to="/search-providers" > <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6942 12.8252C10.4625 13.8106 8.9 14.3998 7.19991 14.3998C3.22351 14.3998 0 11.1763 0 7.19991C0 3.22351 3.22351 0 7.19991 0C11.1763 0 14.3998 3.22351 14.3998 7.19991C14.3998 8.8998 13.8107 10.4621 12.8255 11.6938L15.7661 14.6343C16.0785 14.9467 16.0785 15.4533 15.7661 15.7657C15.4537 16.0781 14.9471 16.0781 14.6347 15.7657L11.6942 12.8252ZM1.59998 7.19991C1.59998 4.10715 4.10715 1.59998 7.19991 1.59998C10.2927 1.59998 12.7998 4.10715 12.7998 7.19991C12.7998 8.70993 12.2022 10.0804 11.2305 11.0875C11.2042 11.108 11.1789 11.1302 11.1548 11.1544C11.1306 11.1785 11.1083 11.2039 11.0879 11.2302C10.0807 12.202 8.7101 12.7998 7.19991 12.7998C4.10715 12.7998 1.59998 10.2927 1.59998 7.19991Z" fill="#7D2B8B" />
                                                            <circle cx="7.19948" cy="7.20144" r="5.59987" fill="white" />
                                                        </svg> Search for similar candidates</Link>
                                                    </div>
                                                    {rating?.jobStatus?.jobStatus != 1 ?
                                                        <div class="view_profile_btn">
                                                            {data.status == 1 ?
                                                                <Link to="" onClick={e => setview(data.provider_id)}>Send message</Link>
                                                                : ""
                                                                // onClick={e => setupdate(true)}
                                                            }
                                                            <Link to={"/profile-provider/" + data.provider_id} >Visit profile</Link>
                                                        </div>
                                                        : ''
                                                    }
                                                </div>

                                                <p>
                                                    {
                                                        data.medicalcondition != null && data.medicalcondition == "Yes" || data.anyallergies != null && data.anyallergies == "Yes" ?
                                                            <>
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.80221 11.9999H7.20221V10.3999H8.80221V11.9999ZM8.80221 8.8H7.20221V4H8.80221V8.8Z" fill="#A98D4B" />
                                                                </svg>
                                                                <strong>Note:</strong> Our record indicates that the provider might have an allergy and/or medical condition that you may want to discuss about during the interview.   <br />
                                                            </>
                                                            : ""
                                                    }
                                                </p>

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
                                                                        <h3>{data.profile_headline != null ? data.profile_headline : ""}</h3>
                                                                        {list && list[0] && list[0].status == 1 ?
                                                                            <button style={hired != "" || data.hire_status == 1 ? { opacity: "0.5" } : {}} onClick={e => accept(data.provider_id)} disabled={hired != "" || data.hire_status == 1 ? true : false}>{hired != "" || data.hire_status == 1 ? "Hired" : "Hire"}</button>
                                                                            : ""
                                                                        }
                                                                        {data.plateformsocialmedia == "Yes" ?
                                                                            <Facebook_share link={window.location.origin + "/profile-provider/" + data.provider_id} />
                                                                            : ""}
                                                                    </div>
                                                                    <div class="post_general">
                                                                        <h6><Link to={"/profile-provider/" + list[0]?.UID} >{data.first_name != null ? data.first_name + " " + data.last_name + " " : ""}</Link> ({data.dob != undefined ? new Date().getFullYear() - parseInt(data.dob.substr(data.dob.lastIndexOf('\\') + 1).split('-')[0]) : ""})</h6>
                                                                        <p>
                                                                            {rating.reviewAvg >= 0 ?
                                                                                <>
                                                                                    {[...Array(rating.reviewAvg)].map((star, index) => {
                                                                                        index += 1;
                                                                                        return (
                                                                                            <svg width="12" height="12" style={{ marginLeft: "0px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                                            </svg>

                                                                                        );
                                                                                    })}
                                                                                    {[...Array(5 - rating.reviewAvg)].map((star, index) => {
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
                                                                            <span> ({rating.reviewcount})</span>
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
                                                                                : <h5>${data.nanyperhrrate != null ? data.nanyperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""} /hour</h5>
                                                                            }
                                                                        </div>
                                                                        <div class="vi"></div>
                                                                        {data.service_type != null && Object.values(JSON.parse(data.service_type))[1] ?
                                                                            <>
                                                                                <div class="post">
                                                                                    {
                                                                                        data.service_type != null ? Object.values(JSON.parse(data.service_type))[1] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[1] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[1] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[1] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                                    }
                                                                                    <h5>{JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[1] == "Special Education Paraprofessional" ? "SPED Paraprofessional" : Object.values(JSON.parse(data.service_type))[1] == "Special Education Teacher" ? "SPED teacher" : Object.values(JSON.parse(data.service_type))[1] : ""
                                                                                    }
                                                                                        {/* {
                                                                        data.service_type != null && Object.values(data.service_type)[1].length > 8 ? "..." : ""
                                                                    } */}
                                                                                    </h5>
                                                                                </div>
                                                                                <div class="vi"></div>

                                                                                <div class="post_pay">
                                                                                    <img src={window.location.origin + "/img/post_pay.png"} alt="" />
                                                                                    {profile && profile.country == "Serbia" ? <h5>{data.tutorperhrrate ?
                                                                                        data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                                        + " - " +
                                                                                        data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                                        : ""} /hour</h5>
                                                                                        : <h5>${data.tutorperhrrate ? data.tutorperhrrate : ""} /hour</h5>
                                                                                    }
                                                                                </div>
                                                                                <div class="vi"></div>
                                                                            </>
                                                                            : ""}
                                                                        <div class="vi"></div>
                                                                        <div class="post_fet">
                                                                            <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                                            <h5>{data.tutorintrestedin != null ? data.tutorintrestedin : data.nanyintrestedin}</h5>
                                                                        </div>
                                                                        <div class="vi"></div>
                                                                        <div class="post_cal">
                                                                            <img src={window.location.origin + "/images/post_cal.svg"} alt="" />
                                                                            <h5>{data.tutorstartdate != null ? data.tutorstartdate : data.nanystartdate}</h5>
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
                                                                        <img src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : "img/nany_img.png"} alt="" />
                                                                        <div class="heart_sec">
                                                                            <Favorite_profile id={data.id} username={data.username} />
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
                                                                        {
                                                                            rating.docsStatus == "Yes" ?
                                                                                <img src={window.location.origin + "/images/ok.svg"} alt="" />
                                                                                : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z" fill="#B7B7B7" />
                                                                                </svg>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div class="second_sec">
                                                                    <p id={"half" + index} >{data.about != null ? (data.about.substr(0, 100)
                                                                    ) : ""} {data.about != null && data.about.length > 100 ? <span onClick={e => pmore("half" + index, "full" + index, "plink" + index)}>...more</span> : ""} </p>
                                                                    <p id={"full" + index} className="hide">{data.about} <span onClick={e => pmore("full" + index, "half" + index, "plink" + index)}> less</span></p>
                                                                </div>
                                                                <div class="view_profile_btn visiterbtn">

                                                                    {rating?.jobStatus?.jobStatus != 1 ?
                                                                        <> <Link to={"/profile-provider/" + data.provider_id} >Visit profile</Link>
                                                                            {data.status == 1 ?
                                                                                <Link to="" onClick={e => setview(data.provider_id)} className={"brown"}>Send message</Link>
                                                                                // onClick={e => setupdate(true)}
                                                                                : ""
                                                                            }</>
                                                                        : ""}
                                                                    <Link to="/search-providers" style={{
                                                                        border: "none", background: "transparent", color: "#7D2B8B", fontSize: "17px",
                                                                        width: "100%",
                                                                        marginLeft: "0",
                                                                        padding: "5px 0"
                                                                    }} > <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6942 12.8252C10.4625 13.8106 8.9 14.3998 7.19991 14.3998C3.22351 14.3998 0 11.1763 0 7.19991C0 3.22351 3.22351 0 7.19991 0C11.1763 0 14.3998 3.22351 14.3998 7.19991C14.3998 8.8998 13.8107 10.4621 12.8255 11.6938L15.7661 14.6343C16.0785 14.9467 16.0785 15.4533 15.7661 15.7657C15.4537 16.0781 14.9471 16.0781 14.6347 15.7657L11.6942 12.8252ZM1.59998 7.19991C1.59998 4.10715 4.10715 1.59998 7.19991 1.59998C10.2927 1.59998 12.7998 4.10715 12.7998 7.19991C12.7998 8.70993 12.2022 10.0804 11.2305 11.0875C11.2042 11.108 11.1789 11.1302 11.1548 11.1544C11.1306 11.1785 11.1083 11.2039 11.0879 11.2302C10.0807 12.202 8.7101 12.7998 7.19991 12.7998C4.10715 12.7998 1.59998 10.2927 1.59998 7.19991Z" fill="#7D2B8B" />
                                                                            <circle cx="7.19948" cy="7.20144" r="5.59987" fill="white" />
                                                                        </svg>Search for similar candidates </Link>
                                                                </div>
                                                            </div>
                                                            <p>
                                                                {
                                                                    data.medicalcondition != null && data.medicalcondition == "Yes" || data.anyallergies != null && data.anyallergies == "Yes" ?
                                                                        <>
                                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.80221 11.9999H7.20221V10.3999H8.80221V11.9999ZM8.80221 8.8H7.20221V4H8.80221V8.8Z" fill="#A98D4B" />
                                                                            </svg>
                                                                            <strong>Note:</strong> Our record indicates that the provider might have an allergy and/or medical condition that you may want to discuss about during the interview.   <br />
                                                                        </>
                                                                        : ""
                                                                }
                                                            </p>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        }
                                        )}
                                </div>
                            </div>
                            {/* <div className='suggess'>
                            <ul>
                                <li>
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.77778 0V3.11111H15.5556V14H0V0H7.77778ZM1.55542 12.4447H3.11098V10.8891H1.55542V12.4447ZM3.11098 9.33278H1.55542V7.77722H3.11098V9.33278ZM1.55542 6.22505H3.11098V4.66949H1.55542V6.22505ZM3.11098 3.10994H1.55542V1.55438H3.11098V3.10994ZM4.66528 12.4447H6.22084V10.8891H4.66528V12.4447ZM6.22084 9.33278H4.66528V7.77722H6.22084V9.33278ZM4.66528 6.22505H6.22084V4.66949H4.66528V6.22505ZM6.22084 3.10994H4.66528V1.55438H6.22084V3.10994ZM7.77722 12.4473H13.9994V4.66949H7.77722V6.22505H9.33278V7.78061H7.77722V9.33616H9.33278V10.8917H7.77722V12.4473ZM12.4442 6.22278H10.8886V7.77834H12.4442V6.22278ZM10.8886 9.33051H12.4442V10.8861H10.8886V9.33051Z" fill="#B7B7B7" />
                                    </svg>
                                    <p>
                                        Explore your local businesses
                                        <Link to="">Find more deals <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6942 12.8252C10.4625 13.8106 8.9 14.3998 7.19991 14.3998C3.22351 14.3998 0 11.1763 0 7.19991C0 3.22351 3.22351 0 7.19991 0C11.1763 0 14.3998 3.22351 14.3998 7.19991C14.3998 8.8998 13.8107 10.4621 12.8255 11.6938L15.7661 14.6343C16.0785 14.9467 16.0785 15.4533 15.7661 15.7657C15.4537 16.0781 14.9471 16.0781 14.6347 15.7657L11.6942 12.8252ZM1.59998 7.19991C1.59998 4.10715 4.10715 1.59998 7.19991 1.59998C10.2927 1.59998 12.7998 4.10715 12.7998 7.19991C12.7998 8.70993 12.2022 10.0804 11.2305 11.0875C11.2042 11.108 11.1789 11.1302 11.1548 11.1544C11.1306 11.1785 11.1083 11.2039 11.0879 11.2302C10.0807 12.202 8.7101 12.7998 7.19991 12.7998C4.10715 12.7998 1.59998 10.2927 1.59998 7.19991Z" fill="#7D2B8B" />
                                            <circle cx="7.19948" cy="7.20144" r="5.59987" fill="white" />
                                        </svg></Link>
                                    </p>
                                </li>
                                <li>
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.267 6.81877L12.2486 5.68765V2.2974C12.2486 1.8287 11.958 1.41 11.5175 1.24439L8.39281 0.0726481C8.13972 -0.0242161 7.8585 -0.0242161 7.60228 0.0726481L4.47763 1.24439C4.03705 1.41 3.74646 1.8287 3.74646 2.2974V5.68765L0.728044 6.81877C0.290593 6.98438 0 7.40308 0 7.87178V11.312C0 11.737 0.240598 12.1276 0.621806 12.3182L3.74646 13.8805C4.06205 14.0398 4.43701 14.0398 4.75259 13.8805L7.99911 12.2557L11.2456 13.8805C11.5612 14.0398 11.9362 14.0398 12.2518 13.8805L15.3764 12.3182C15.7576 12.1276 15.9982 11.737 15.9982 11.312V7.87178C15.9982 7.40308 15.7076 6.98438 15.267 6.81877ZM11.1863 5.71264L8.5303 6.70941V4.5784L11.1863 3.42227V5.71264ZM4.81196 2.25365L7.99911 1.06004L11.1863 2.25365V2.2724L7.99911 3.56601L4.81196 2.2724V2.25365ZM7.43667 11.3495L4.78072 12.6775V10.2059L7.43667 8.99353V11.3495ZM7.43667 7.84991L4.24953 9.14351L1.06238 7.84991V7.83116L4.24953 6.63754L7.43667 7.83116V7.84991ZM14.9358 11.3495L12.2799 12.6775V10.2059L14.9358 8.99353V11.3495ZM14.9358 7.84991L11.7487 9.14351L8.56155 7.84991V7.83116L11.7487 6.63754L14.9358 7.83116V7.84991Z" fill="#B7B7B7" />
                                    </svg>
                                    <p>
                                        Find a perfect educational material and toys
                                        <Link to="">Search EDU store <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6942 12.8252C10.4625 13.8106 8.9 14.3998 7.19991 14.3998C3.22351 14.3998 0 11.1763 0 7.19991C0 3.22351 3.22351 0 7.19991 0C11.1763 0 14.3998 3.22351 14.3998 7.19991C14.3998 8.8998 13.8107 10.4621 12.8255 11.6938L15.7661 14.6343C16.0785 14.9467 16.0785 15.4533 15.7661 15.7657C15.4537 16.0781 14.9471 16.0781 14.6347 15.7657L11.6942 12.8252ZM1.59998 7.19991C1.59998 4.10715 4.10715 1.59998 7.19991 1.59998C10.2927 1.59998 12.7998 4.10715 12.7998 7.19991C12.7998 8.70993 12.2022 10.0804 11.2305 11.0875C11.2042 11.108 11.1789 11.1302 11.1548 11.1544C11.1306 11.1785 11.1083 11.2039 11.0879 11.2302C10.0807 12.202 8.7101 12.7998 7.19991 12.7998C4.10715 12.7998 1.59998 10.2927 1.59998 7.19991Z" fill="#7D2B8B" />
                                            <circle cx="7.19948" cy="7.20144" r="5.59987" fill="white" />
                                        </svg></Link>
                                    </p>
                                </li>
                            </ul>
                        </div> */}
                        </div>
                    </>
                    : ""
                : ""
            }
            {
                view != "" ?
                    <div class="main-header">
                        {/* <button onClick={e => setview("")}><svg width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM17 3.5L1 3.5V4.5L17 4.5V3.5Z" fill="#A98D4B" />
                        </svg> Back</button> */}
                        <Message_chet id={view} setview={setview} />
                    </div>
                    : ""
            }
            {
                reviewmodel ?
                    <Modal show={reviewmodel} onHide={e => setreviewmodel(false)
                    } >
                        <Modal.Body>
                            <Send_review setrequest={setreviewmodel} slugdata={list && list[0] && list[0].UID} username={list && list[0] && list[0].first_name + " " + list && list[0] && list[0].last_name} />
                        </Modal.Body>
                    </Modal > : ""
            }
            <Modal show={update} onHide={e => setupdate(false)}>
                <Modal.Body>
                    <div className='promocode_content login_first search_pop upgd'>
                        <Link to="" onClick={e => setupdate(false)}>+ </Link>
                        <h2>Please upgrade your account to access full benefits on SensCare</h2>
                        <img src={window.location.origin + '/images/promo.png'} />
                        <p>When you upgrade your account it will enable you to connect with other members via our message center, send and receive interview invites, apply for jobs and much more.</p>
                        <button onClick={e => setupdate(false)} className={"ruf"}><Link to={""}>Maybe later</Link ></button>
                        <button onClick={e => setupdate(false)}><Link to={""}
                        // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank"
                        ><svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.4375 12.25H3.0625C2.82187 12.25 2.625 12.4469 2.625 12.6875V13.5625C2.625 13.8031 2.82187 14 3.0625 14H14.4375C14.6781 14 14.875 13.8031 14.875 13.5625V12.6875C14.875 12.4469 14.6781 12.25 14.4375 12.25ZM16.1875 3.5C15.4629 3.5 14.875 4.08789 14.875 4.8125C14.875 5.00664 14.9187 5.18711 14.9953 5.35391L13.0156 6.54063C12.5945 6.79219 12.0504 6.65 11.807 6.22344L9.57851 2.32422C9.87109 2.08359 10.0625 1.72266 10.0625 1.3125C10.0625 0.587891 9.47461 0 8.75 0C8.02539 0 7.4375 0.587891 7.4375 1.3125C7.4375 1.72266 7.62891 2.08359 7.92148 2.32422L5.69297 6.22344C5.44961 6.65 4.90273 6.79219 4.48437 6.54063L2.50742 5.35391C2.58125 5.18984 2.62773 5.00664 2.62773 4.8125C2.62773 4.08789 2.03984 3.5 1.31523 3.5C0.590625 3.5 0 4.08789 0 4.8125C0 5.53711 0.587891 6.125 1.3125 6.125C1.38359 6.125 1.45469 6.11406 1.52305 6.10313L3.5 11.375H14L15.977 6.10313C16.0453 6.11406 16.1164 6.125 16.1875 6.125C16.9121 6.125 17.5 5.53711 17.5 4.8125C17.5 4.08789 16.9121 3.5 16.1875 3.5Z" fill="#7D2B8B" />
                            </svg>Upgrade now </Link ></button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Interview_accept
