import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../urls'
import Facebook_share from './share_facebook';


function Job_application_hiatory_detail(props) {
    const navigate = useNavigate();
    const [list, setlist] = useState([])
    const [job, setjob] = useState([])
    const [check, setcheck] = useState(true)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [profile, setprofile] = useState({})
    const [plink, setplink] = useState(true)
    const [message, setmessage] = useState("")
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
            "app_jobid": props.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/providerappliedjobprofileview", requestOptions)
            .then(response => response.json())
            .then(result => {
                setlist([result.data.providerappliedjobprofileview])
                setjob(result.data.job)
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
    }, [check])


    return (
        <>
            {list && list[0] ?
                <>
                    <h2 className='border'></h2>
                    <div className='detail_invit removebg'>
                        <p>
                            <strong> Job post </strong>
                            <span className='date'>You applied on  {list && list[0] && list[0].applyJobDate ? new Date(list && list[0] && list[0].applyJobDate).toLocaleDateString('en-US', { weekday: 'short' }) : ""}, {list && list[0] && list[0].applyJobDate ? month[new Date(list && list[0] && list[0].applyJobDate).getMonth()] : ""}, {new Date(list && list[0] && list[0].applyJobDate).getDate()}, {new Date(list && list[0] && list[0].applyJobDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

                        </p>
                    </div>
                    <div class="right_side_section jobapli">
                        <div class="looking_for_candidate">
                            {window.innerWidth > 860 ?
                                list.map((data, index) => {
                                    if (index <= 5) {
                                        return (
                                            <div class="looking_for_candidate_boxs">
                                                <div class="looking_for_candidate_box hovertable">
                                                    <div class="first_sec">
                                                        <div class="image_sec">
                                                            <img src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : window.location.origin + "/img/nany_img.png"} alt="" />
                                                            <div class="heart_sec">
                                                                <img src={window.location.origin + "/images/img_heart.svg"} alt="" />
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
                                                            {/* <img src={window.location.origin +"/images/ok.svg"} alt="" /> */}
                                                        </div>
                                                    </div>
                                                    <div class="second_sec">
                                                        <div class="heading">
                                                            <h3>{
                                                                data.provider_readstatus == 0 ?
                                                                    <span class="new-tag">NEW </span>
                                                                    : data.status == 0 ? <span class="new-tag2"> Active</span> : data.status >= 0 ? <span class="new-tag3"> Closed</span> : ""
                                                            } {data.title}</h3>
                                                            {data.plateformonsocialmedia == "Yes" ?
                                                                <Facebook_share link={window.location.origin + "/profile-parents/" + data.user_id} />
                                                                : ""}
                                                        </div>
                                                        <div class="post_general">
                                                            <h6> <Link to={"/profile-parents/" + list[0]?.user_id}>{data.first_name != null ? data.first_name + " " + data.last_name + " " : ""}</Link>({data.dob != undefined ? new Date().getFullYear() - parseInt(data.dob.substr(data.dob.lastIndexOf('\\') + 1).split('-')[0]) : ""})</h6>
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
                                                                    : <h5>${data.nanyperhrrate != null ? data.nanyperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""}/hour </h5>
                                                                }
                                                            </div>

                                                            <div class="vi"></div>
                                                            <div class="post_fet">
                                                                <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                                <h5>{data.nanyintrestedin != null ? data.nanyintrestedin : data.tutorintrestedin}</h5>
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
                                                        <p id={"half" + index} >{data.description}  {data.description != null && data.description.length > 100 ? <span onClick={e => pmore("half" + index, "full" + index, "plink" + index)}>...more</span> : ""} </p>
                                                        <p id={"full" + index} className="hide">{data.description} <span onClick={e => pmore("full" + index, "half" + index, "plink" + index)}> less</span></p>



                                                    </div>
                                                    <div className='find_search'>

                                                    </div>
                                                    <div class="view_profile_btn visiterbtn">
                                                        <Link to="/search-parents"> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6942 12.8252C10.4625 13.8106 8.9 14.3998 7.19991 14.3998C3.22351 14.3998 0 11.1763 0 7.19991C0 3.22351 3.22351 0 7.19991 0C11.1763 0 14.3998 3.22351 14.3998 7.19991C14.3998 8.8998 13.8107 10.4621 12.8255 11.6938L15.7661 14.6343C16.0785 14.9467 16.0785 15.4533 15.7661 15.7657C15.4537 16.0781 14.9471 16.0781 14.6347 15.7657L11.6942 12.8252ZM1.59998 7.19991C1.59998 4.10715 4.10715 1.59998 7.19991 1.59998C10.2927 1.59998 12.7998 4.10715 12.7998 7.19991C12.7998 8.70993 12.2022 10.0804 11.2305 11.0875C11.2042 11.108 11.1789 11.1302 11.1548 11.1544C11.1306 11.1785 11.1083 11.2039 11.0879 11.2302C10.0807 12.202 8.7101 12.7998 7.19991 12.7998C4.10715 12.7998 1.59998 10.2927 1.59998 7.19991Z" fill="#7D2B8B" />
                                                            <circle cx="7.19948" cy="7.20144" r="5.59987" fill="white" />
                                                        </svg> Apply for similar jobs </Link>
                                                        {data.status > 0 ? "" : <Link to={"/profile-parents/" + data.user_id}  >View Job</Link>}

                                                    </div>
                                                    <br />
                                                    <br />

                                                </div>

                                            </div>
                                        )
                                    }
                                }
                                ) : ""}

                            <div className='mobile '>
                                {
                                    list.map((data, index) => {
                                        if (index <= 5) {
                                            return (
                                                <>
                                                    <div class="looking_for_candidate_boxs" style={{ display: "block" }}>
                                                        <div class="looking_for_candidate_box hovertable">
                                                            <div class="second_sec">
                                                                <div class="heading">
                                                                    <h3>{
                                                                        data.provider_readstatus == 0 ?
                                                                            <span class="new-tag">NEW </span>
                                                                            : data.status == 0 ? <span class="new-tag2"> Active</span> : data.status >= 0 ? <span class="new-tag3">Closed </span> : ""
                                                                    } {data.title}</h3>
                                                                    {data.plateformonsocialmedia == "Yes" ?
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
                                                                                : ""}/hour </h5>
                                                                            : <h5>${data.nanyperhrrate != null ? data.nanyperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""} /hour</h5>
                                                                        }
                                                                    </div>

                                                                    <div class="vi"></div>
                                                                    <div class="post_fet">
                                                                        <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                                        <h5>{data.nanyintrestedin != null ? data.nanyintrestedin : data.tutorintrestedin}</h5>
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
                                                                    <img src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : "img/nany_img.png"} alt="" />
                                                                    <div class="heart_sec">
                                                                        <img src={window.location.origin + "/images/img_heart.svg"} alt="" />
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
                                                                        data.facebookverify != null ?
                                                                            <img src={window.location.origin + "/images/nany_cont.svg"} alt="" />
                                                                            : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z" fill="#B7B7B7" />
                                                                            </svg>
                                                                    }
                                                                    {/* <img src={window.location.origin +"/images/ok.svg"} alt="" /> */}
                                                                </div>
                                                            </div>
                                                            <div class="second_sec">
                                                                <p id={"half" + index} >{data.description != null ? (data.description.substr(0, 100)
                                                                ) : ""}  {data.description != null && data.description.length > 100 ? <span onClick={e => pmore("half" + index, "full" + index, "plink" + index)}>...more</span> : ""} </p>
                                                                <p id={"full" + index} className="hide">{data.description} <span onClick={e => pmore("full" + index, "half" + index, "plink" + index)}> ... less</span></p>
                                                            </div>
                                                            <div class="view_profile_btn visiterbtn">
                                                                <Link to="/search-parents" > <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6942 12.8252C10.4625 13.8106 8.9 14.3998 7.19991 14.3998C3.22351 14.3998 0 11.1763 0 7.19991C0 3.22351 3.22351 0 7.19991 0C11.1763 0 14.3998 3.22351 14.3998 7.19991C14.3998 8.8998 13.8107 10.4621 12.8255 11.6938L15.7661 14.6343C16.0785 14.9467 16.0785 15.4533 15.7661 15.7657C15.4537 16.0781 14.9471 16.0781 14.6347 15.7657L11.6942 12.8252ZM1.59998 7.19991C1.59998 4.10715 4.10715 1.59998 7.19991 1.59998C10.2927 1.59998 12.7998 4.10715 12.7998 7.19991C12.7998 8.70993 12.2022 10.0804 11.2305 11.0875C11.2042 11.108 11.1789 11.1302 11.1548 11.1544C11.1306 11.1785 11.1083 11.2039 11.0879 11.2302C10.0807 12.202 8.7101 12.7998 7.19991 12.7998C4.10715 12.7998 1.59998 10.2927 1.59998 7.19991Z" fill="#7D2B8B" />
                                                                    <circle cx="7.19948" cy="7.20144" r="5.59987" fill="white" />
                                                                </svg> Apply for similar jobs   </Link>
                                                                {data.status > 0 ? "" : <Link to={"/profile-parents/" + data.user_id} >View Job</Link>}

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
                </>
                : ""
            }
        </>
    )
}

export default Job_application_hiatory_detail
