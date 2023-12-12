import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../urls';
import Visiter_detail from './visiter_profile';
import { useParams, useNavigate } from 'react-router-dom';


export default function Profile_visiter() {
    const navigate = useNavigate();
    const [check, setcheck] = useState(true)
    const [interview, setinterview] = useState([])
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [view, setview] = useState("")
    const [upgrad, setupgrad] = useState("")
    const [delete_list, setdelete_list] = useState([])
    const slugdata = useParams()
    let data = slugdata.name
    const list = () => {
        setinterview([])
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/profilevisitors?" + (refine.threedays != "" ? "threedays=" + refine.threedays : refine.withinweek != "" ? "withinweek=" + refine.withinweek : refine.twofourday != "" ? "twofourday=" + refine.twofourday : refine.withinmonth != "" ? "withinmonth=" + refine.withinmonth : ""), requestOptions)
            .then(response => response.json())
            .then(result => setinterview(result.data.allvisitors))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            list()
            setcheck(false)

        }

        console.log(interview);
        setview(data ? data : "")
    }, [check, interview, data, slugdata])
    useEffect(() => {
        if (window.innerWidth < 768) {
            setrecived("Refine by")
        }
    }, [])
    const selects = () => {
        var ele = document.getElementsByName('chk');
        interview.map((data) => {
            delete_list.push(data.id)
        })
        for (var i = 0; i < ele.length; i++) {
            if (ele[i].type == 'checkbox')
                ele[i].checked = true;
        }

    }
    const deSelect = () => {
        var ele = document.getElementsByName('chk');
        for (var i = 0; i < ele.length; i++) {
            if (ele[i].type == 'checkbox')
                ele[i].checked = false;
        }
        setdelete_list([])
    }

    const delete_select = (a) => {
        let sum = false
        delete_list.map((e) => {
            if (e == a) {
                sum = true
                const index = delete_list.indexOf(a);
                if (index > -1) {
                    delete_list.splice(index, 1);
                }
                // setdelete_list([...delete_list])
            }
        })
        if (sum == false) {
            delete_list.push(a)
        }
    }

    const delete_in = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "ids": delete_list
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/visitorsdelete", requestOptions)
            .then(response => response.text())
            .then(result => {
                list()
            })
            .catch(error => console.log('error', error));
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
    const [recived, setrecived] = useState("")
    const [active, setactive] = useState(false)
    return (
        <div>
            {view == "" ?
                <>
                    <div class="main-header">
                        <h2 className='border'>Recent profile visitors</h2>
                        <div class="mail-header-bar">
                            <p>{interview.length} Profile</p>
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
                        <div class="mail-option">
                            <div class="chk-all">
                                <input type="checkbox" class="mail-radio mail-group-radio" name="chk" id="checkbox_id" onClick={e => {
                                    if (e.target.checked) {
                                        selects()
                                    } else {
                                        deSelect()
                                    }
                                }} />
                                <span className='circle'></span>
                                <label for="checkbox_id">Select all</label>
                            </div>
                            <div class="right-side-btn">
                                <div class="delete-btn" onClick={e => delete_in()}>
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                        <span> Delete</span>
                                    </a>
                                </div>
                                <div class="refresh-btn" onClick={e => list()}>
                                    <a href='#'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                            <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" /></svg>
                                    </a>
                                    <span>Refresh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-inbox table-hover recentshow2">
                        <tbody>
                            {
                                interview.map((data, index) => {
                                    if (index <= 116) {
                                        return (
                                            <tr class={data.read_status == 0 ? "unread" : ""} >
                                                <td class="view-message  dont-show recentshow">
                                                    <input type="checkbox" class="mail-radio" name="chk" onChange={e => delete_select(data.id)} />
                                                    <span className='circle'></span>
                                                    <span onClick={e => {
                                                        navigate("/search-providers/" + slugdata.id + "/" + data.id)
                                                        setview(data.id)
                                                    }}>
                                                        <Link to={""}
                                                        // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"}
                                                        >{
                                                                data.read_status == 0 ?
                                                                    <span class="new-tag"> NEW!</span>
                                                                    : ""
                                                            }
                                                            <span class="username-text" onClick={e => {
                                                                navigate("/search-providers/" + slugdata.id + "/" + data.id)
                                                                setview(data.id)
                                                            }}> {data.ParentsName} </span>
                                                            <span className='statuspg' style={{ color: "#636363" }}>
                                                                {data.about != null ? data.about.substr(0, 40) + "..." : ""
                                                                 /* {   data.read_status == 0 ?

                                                                        "Looking for awesome super friendly ..."
                                                                        :
                                                                        "We need warm and reliable person t ..." */}
                                                            </span>
                                                        </Link>
                                                    </span>
                                                </td>
                                                <td class="view-message  text-right">{data.created_at ? month[new Date(data.created_at).getMonth()] : ""}{" " + (parseInt(new Date(data.created_at).getDate()) < 10 ? "0" : "") + new Date(data.created_at).getDate()}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }


                        </tbody>
                    </table>
                    {upgrad != "" ? "" :
                        <div className='upgared'>
                            {/* <button onClick={e => setupgrad("ji")}>+ </button> */}
                            <p>{(interview.length - 2) > 1 ? interview.length - 2 : 0}more people visited your profile.  <br />
                                Please upgrade to view their profiles and connect.</p>
                            <Link to={""}
                            // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank"
                            >
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.4375 12.25H3.0625C2.82187 12.25 2.625 12.4469 2.625 12.6875V13.5625C2.625 13.8031 2.82187 14 3.0625 14H14.4375C14.6781 14 14.875 13.8031 14.875 13.5625V12.6875C14.875 12.4469 14.6781 12.25 14.4375 12.25ZM16.1875 3.5C15.4629 3.5 14.875 4.08789 14.875 4.8125C14.875 5.00664 14.9187 5.18711 14.9953 5.35391L13.0156 6.54063C12.5945 6.79219 12.0504 6.65 11.807 6.22344L9.57851 2.32422C9.87109 2.08359 10.0625 1.72266 10.0625 1.3125C10.0625 0.587891 9.47461 0 8.75 0C8.02539 0 7.4375 0.587891 7.4375 1.3125C7.4375 1.72266 7.62891 2.08359 7.92148 2.32422L5.69297 6.22344C5.44961 6.65 4.90273 6.79219 4.48437 6.54063L2.50742 5.35391C2.58125 5.18984 2.62773 5.00664 2.62773 4.8125C2.62773 4.08789 2.03984 3.5 1.31523 3.5C0.590625 3.5 0 4.08789 0 4.8125C0 5.53711 0.587891 6.125 1.3125 6.125C1.38359 6.125 1.45469 6.11406 1.52305 6.10313L3.5 11.375H14L15.977 6.10313C16.0453 6.11406 16.1164 6.125 16.1875 6.125C16.9121 6.125 17.5 5.53711 17.5 4.8125C17.5 4.08789 16.9121 3.5 16.1875 3.5Z" fill="#7D2B8B" />
                                </svg>
                                Upgrade now </Link>
                        </div>
                    }
                </> :
                <div class="main-header">
                    <button onClick={e => {
                        navigate("/search-providers/" + slugdata.id)
                        setview("")
                    }}><svg width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM17 3.5L1 3.5V4.5L17 4.5V3.5Z" fill="#A98D4B" />
                        </svg>Back</button>
                    <Visiter_detail id={view} />
                </div>
            }
        </div>
    )
}
