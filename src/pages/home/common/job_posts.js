import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../urls';
import Favorite_select from './favorite_select';
import Facebook_share from './share_facebook';


function Job_posts() {
    const [interview, setinterview] = useState([])
    const [profile, setprofile] = useState({})
    const [plink, setplink] = useState(true)
    const [check, setcheck] = useState(true)
    const [list2, setlist2] = useState(10)
    const [list, setlist] = useState(list2)
    const [recived, setrecived] = useState("Active jobs")
    const [active, setactive] = useState(false)


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


    const profile_data = (a) => {
        setinterview([])
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/favjobslist?job_search=" + (a != undefined ? a : "0"), requestOptions)
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
    let pages = 0
    let data_show = ((list / list2) - 1) * list2;
    return (
        <>
            <div class="main-header">
                <h2 className='border'>Job Posts</h2>
                <div class="mail-header-bar">
                    <p>{interview.length} Job Posts </p>
                    <div class="btn-group flex">
                    Refine by
                        <div className='select'>
                            <label onClick={e => setactive(!active)}>{recived}  <span><img src="/images/done_a.svg" /></span></label>
                            {
                                active ?
                                    <ul onClick={e => setactive(!active)}>
                                        <li onClick={e => {
                                            profile_data("0")
                                            setrecived("Active jobs")
                                            setactive(!active)
                                        }}>Active jobs</li>

                                        <li onClick={e => {
                                            profile_data("1")
                                            setrecived("Closed jobs")
                                            setactive(!active)
                                        }}>Closed jobs</li>
                                    </ul>
                                    : ""}
                        </div>
                    </div>
                </div>
                <div class="right_side_section">
                    <div class="looking_for_candidate job_post">
                        {
                            interview.map((data, index) => {
                                if (index < list && data_show <= index) {
                                    return (
                                        <div class="looking_for_candidate_boxs">
                                            <div class="looking_for_candidate_box">
                                                <div class="first_sec">
                                                    <div class="image_sec">
                                                        <img src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : window.location.origin + "/img/nany_img.png"} alt="" />
                                                        <div class="heart_sec">
                                                            <Favorite_select id={data.jid} heart={profile_data} username={data.first_name} />
                                                        </div>
                                                    </div>
                                                    <div className="nany_social">
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
                                                        {/* {
                                                            data.docsStatus == "Yes" ?
                                                                <img src={window.location.origin + "/images/ok.svg"} alt="" />
                                                                : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z" fill="#B7B7B7" />
                                                                </svg>
                                                        } */}
                                                    </div>
                                                </div>
                                                <div class="second_sec">
                                                    <div class="heading">
                                                        <h3><Link to={"/profile-parents/" + data.user_id}  >{data.title != null ? data.title : ""}</Link></h3>
                                                        {data.plateformonsocialmedia == "Yes" ?
                                                            <Facebook_share link={window.location.origin + "/profile-parents/" + data.user_id} />
                                                            : ""}
                                                    </div>
                                                    <div class="post_general">
                                                        <h6>{data.school != null ? data.school : ""}</h6>
                                                        <p>
                                                            <img src={window.location.origin + "/images/family_star.svg"} alt="" />
                                                            <span> (3)</span>
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
                                                    <p id={"half" + index} >{data.description != null ? (data.description.substr(0, 100)
                                                    ) : ""}  {data.description != null && data.description.length > 100 ? <span onClick={e => pmore("half" + index, "full" + index, "plink" + index)}>...more</span> : ""} </p>
                                                    <p id={"full" + index} className="hide">{data.description} <span onClick={e => pmore("full" + index, "half" + index, "plink" + index)}> less</span></p>



                                                </div>

                                                <div class="view_profile_btn newadd" style={{ float: "right" }}>
                                                    <Link to={"/profile-parents/" + data.user_id} >Visit profile</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            )}
                        <div className='mobile'>
                            <div class="mobile_looking_for_candidate_boxs">
                                {
                                    interview.map((data, index) => {
                                        if (index < list && data_show <= index) {
                                            return (
                                                <div class="mobile_looking_for_candidate_box">
                                                    <div class="head_part">
                                                        <h3>{data.title != null ? data.title : ""}</h3>
                                                        {data.plateformonsocialmedia == "Yes" ?
                                                            <Facebook_share link={window.location.origin + "/profile-parents/" + data.user_id} />
                                                            : ""}
                                                    </div>
                                                    <div class="post_general">
                                                        <h6>{data.school != null ? data.school : ""}</h6>
                                                        <p>
                                                            <img src={window.location.origin + "/images/family_star.svg"} alt="" />
                                                            <span> (3)</span>
                                                        </p>
                                                    </div>
                                                    <div class="main_sec">
                                                        <div class="first_sec">
                                                            <div class="image_sec">
                                                                <img src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : "img/nany_img.png"} alt="" />
                                                                <div class="heart_sec">
                                                                    <Favorite_select id={data.jid} heart={profile_data} username={data.first_name} />

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
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="second_sec">
                                                            <div class="post">
                                                                {
                                                                    data.service_type != null ? Object.values(JSON.parse(data.service_type))[0] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                }
                                                                <h5>{data.service_type != null ? Object.values(JSON.parse(data.service_type))[0] == "Special Education Paraprofessional" ? "Paraprofessional" : Object.values(JSON.parse(data.service_type))[0] == "Special Education Teacher" ? "SPED teacher" : Object.values(JSON.parse(data.service_type))[0] : ""}
                                                                    {/* {Object.values(JSON.parse(data.service_type)) + ","} */}
                                                                </h5>
                                                            </div>
                                                            <div class="post">
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

                                                            <div class="post_fet">
                                                                <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                                <h5>{data.tutorintrestedin != null ? data.tutorintrestedin : data.nanyintrestedin}</h5>
                                                            </div>
                                                            <br></br>
                                                            <div class="post_cal">
                                                                <img src={window.location.origin + "/images/post_cal.svg"} alt="" />
                                                                <h5>{data.tutorstartdate != null ? data.tutorstartdate : data.nanystartdate}</h5>
                                                            </div>
                                                            <br></br>
                                                            <div class="post_loc">
                                                                <img src={window.location.origin + "/images/post_loc.svg"} alt="" />
                                                                <h5>{data.country != null ? data.country : ""}, {data.city != null ? data.city : ""}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p id={"show" + index} >{data.description != null ? (data.description.substr(0, 100)
                                                    ) : ""}  {data.description != null && data.description.length > 100 ? <span onClick={e => pmore("show" + index, "hide" + index, "plink" + index)}>...more</span> : ""} </p>
                                                    <p id={"hide" + index} className="hide">{data.description} <span onClick={e => pmore("hide" + index, "show" + index, "plink" + index)}> less</span></p>

                                                    <div class="view_profile_btn newadd" style={{ float: "right" }}>
                                                        <Link to={"/profile-parents/" + data.user_id}  >Visit profile</Link>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default Job_posts
