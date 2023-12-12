import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../urls';


import Favorite_profile from './favorite_profile';

function All_profile() {
    const [interview, setinterview] = useState([])
    const [check, setcheck] = useState(true)

    const [list2, setlist2] = useState(10)
    const [list, setlist] = useState(list2)
    const [search, setsearch] = useState("provider")
    const [detail, setdetail] = useState({})

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
                setdetail(result.data)
            })
            .catch(error => console.log('error', error));
    }

    const profile_data = (a) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/favprofilelist?profile_search=" + (a != undefined ? a : search), requestOptions)
            .then(response => response.json())
            .then(result => {
                setinterview(result.data.gatData)
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
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }, [check, list, list2])
    const refine_bc = (e) => {
        profile_data(e)
        setsearch(e)
    }
    const [recived, setrecived] = useState("")
    const [active, setactive] = useState(false)
    let pages = 0
    let data_show = ((list / list2) - 1) * list2;
    return (
        <>
            <div class="main-header">
                <h2 className='border'>All Profiles</h2>
                <div class="mail-header-bar">
                    <p>{interview.length} Profiles </p>
                    {/* <div class="btn-group flex">
                        Refine by
                        <div className='select'>
                            <label onClick={e => setactive(!active)}>{recived} <span><img src="/images/done_a.svg" /></span></label>
                            {
                                active ?
                                    <ul>
                                        <li onClick={e => {
                                            setrecived("All Profiles")
                                            refine_bc("")
                                            setactive(!active)
                                        }}>All Profiles</li>
                                        <li onClick={e => {
                                            setrecived("Parents")
                                            refine_bc("Parents")
                                            setactive(!active)
                                        }} >Parents</li>
                                        <li onClick={e => {
                                            setrecived("Provider")
                                            refine_bc("provider")
                                            setactive(!active)
                                        }} >Provider</li>
                                    </ul>
                                    : ""}
                        </div>

                    </div> */}
                </div>
                <div class="right_side_section" >
                    <div class="looking_for_candidate">
                        <div class="interested_fam">
                            <div class="interested_fam_boxs">
                                {
                                    interview?.map((data, index) => {
                                        if (index < list && data_show <= index) {
                                            return (
                                                <div class="interested_fam_box">
                                                    <div class="image_sec">
                                                        <img src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : "img/nany_img.png"} alt="" />
                                                        <div class="heart_sec">
                                                            <Favorite_profile id={data.id} heart={profile_data} username={data.username} />
                                                        </div>
                                                    </div>
                                                    <div class="general_sec">
                                                        <h4><Link to={data.user_type == "parents" ? "/profile-parents/" + data.id : "/profile-provider/" + data.id} >{data.first_name + " " + data.last_name}</Link></h4>

                                                        <p style={{ padding: "0" }}>
                                                            {data.reviewAvg >= 0 ?
                                                                <>
                                                                    {[...Array(data.reviewAvg)].map((star, index) => {
                                                                        index += 1;
                                                                        return (
                                                                            <svg width="12" height="12" style={{ marginLeft: "0px", width: "15px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                            </svg>

                                                                        );
                                                                    })}
                                                                    {[...Array(5 - data.reviewAvg)].map((star, index) => {
                                                                        index += 1;
                                                                        return (
                                                                            <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: "0px", width: "15px" }} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z" stroke="#A98D4B" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </svg>
                                                                        );
                                                                    })}
                                                                </>
                                                                : ""
                                                            }
                                                            {/* <span> {data.reviewcount}</span> */}
                                                        </p>
                                                        <div class="detail_sec">
                                                            {
                                                                JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[0] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                            }
                                                            <p>{JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[0]
                                                                : ""}</p>
                                                        </div>
                                                        <div class="detail_sec">
                                                            <img src={window.location.origin + "/images/post_pay.svg"} alt="" />
                                                            <p>{detail.country == 'Serbia' ? (data.nanyperhrrate != null ? data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100 : 0)
                                                                + " - " +
                                                                (data.nanyperhrrate != null ? data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] > 0 ? data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100 : 6000 : 6000) : ("$" + data.nanyperhrrate != null ? data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0] : 0)
                                                                + " - " +
                                                            (data.nanyperhrrate != null ? data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] > 0 ? data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] : 60 : 60)}/hour</p>
                                                        </div>
                                                        {data.service_type != null && Object.values(JSON.parse(data.service_type))[1] ?
                                                            <>
                                                                <div class="detail_sec">
                                                                    {
                                                                        JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[1] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[1] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[1] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[1] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                    }

                                                                    <p> {JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[1]
                                                                        : ""}
                                                                    </p>
                                                                </div>

                                                                <div class="detail_sec">
                                                                    <img src={window.location.origin + "/images/post_pay.svg"} alt="" />
                                                                    <p>{detail.country == 'Serbia' ? (data.tutorperhrrate != null ? data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100 : 0)
                                                                        + " - " +
                                                                        (data.tutorperhrrate != null ? data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] > 0 ? data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100 : 6000 : 6000) : ("$" + data.tutorperhrrate != null ? data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] : 0)
                                                                        + " - " +
                                                                    (data.tutorperhrrate != null ? data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] > 0 ? data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] : 60 : 60)}/hour </p>
                                                                </div>
                                                            </>
                                                            : ""}
                                                        <div class="detail_sec">
                                                            <img src={window.location.origin + "/images/post_rang.svg"} alt="" />
                                                            <p>{data.tutorexp != null ? data.tutorexp : data.nanyyearexp} Years of exp</p>
                                                        </div>
                                                        <div class="detail_sec">
                                                            <img src={window.location.origin + "/images/post_loc.svg"} alt="" />
                                                            <p>{data.city + ", " + data.country}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className='footer_pagination pagi_post'>
                <div class="btn-group">Result per page
                    <select onChange={e => {
                        setlist2(parseInt(e.target.value))
                        setlist(parseInt(e.target.value))
                    }}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className='pagination'>
                    <span className='curserpage' onClick={e => setlist(list2)}>{"<<"}</span>
                    <span className='curserpage' onClick={e => setlist(interview.length > 0 && list > list2 ? list - list2 : list2)}>{"<"}</span>

                    {
                        interview?.map((data, index) => {
                            if ((interview.length > pages)) {
                                pages = pages + list2
                                return <span onClick={e => setlist((index + 1) * list2)} className={list == pages ? "active" : ""}>{index + 1}</span>
                            }
                        })
                    }
                    <span className='curserpage' onClick={e => setlist(interview.length > list ? list + list2 : list)}>{">"}</span>
                    <span className='curserpage' onClick={e => setlist(pages)}>{">>"}</span>
                </div>
            </div>
        </>
    )
}

export default All_profile
