import React, { useEffect, useState } from "react";


function Calander(props) {
    const [count, setcount] = useState(true)
    const [calendardata, setcalendardata] = useState({

    })

    const set_calander = (x, e) => {
        if(props.profile == "profile"){

        }else{
        if (calendardata[x]) {
            delete calendardata[x];
            setcalendardata({ ...calendardata })
        } else {
            setcalendardata({ ...calendardata, [x]: e })
        }
    }

    }
    useEffect(() => {
        if (count) {
            props.data1 != null ? setcalendardata(props.data1) : setcalendardata({})
            setcount(false)
        }
        props.data(props.data2, calendardata)
        console.log(calendardata)
    }, [calendardata])



    return (
        <>
            <div className="custom_calender">
                <div className="leftc">
                    <ul>
                        <li><img src={window.location.origin + "/images/morning.svg"} /></li>
                        <li><img src={window.location.origin + "/images/noon.svg"} /></li>
                        <li><img src={window.location.origin + "/images/evening.svg"} /></li>
                        <li><img src={window.location.origin + "/images/moon.svg"} /></li>
                    </ul>
                </div>
                <div className="middel">
                    <ul>
                        <li>
                            <span></span>
                            <ul>
                                <li>Mon</li>
                                <li>Tue</li>
                                <li>Wed</li>
                                <li>Thr</li>
                                <li>Fri</li>
                                <li>Sat</li>
                                <li>Sun</li>
                            </ul>
                        </li>
                        <li> <span>6 - 9 AM </span>
                            <ul>
                                <li onClick={e => set_calander("Mon", "mon-6 - 9 AM")} className={calendardata.Mon == "mon-6 - 9 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Tue", "tue-6 - 9 AM")} className={calendardata.Tue == "tue-6 - 9 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Wed", "wed-6 - 9 AM")} className={calendardata.Wed == "wed-6 - 9 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Thr", "thr-6 - 9 AM")} className={calendardata.Thr == "thr-6 - 9 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Fri", "fri-6 - 9 AM")} className={calendardata.Fri == "fri-6 - 9 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sat", "sat-6 - 9 AM")} className={calendardata.Sat == "sat-6 - 9 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sun", "sun-6 - 9 AM")} className={calendardata.Sun == "sun-6 - 9 AM" ? "active" : ""}></li>
                            </ul>
                        </li>
                        <li><span>9 - 12Pm </span>
                            <ul>
                                <li onClick={e => set_calander("Mon2", "mon2-9 - 12 Pm")} className={calendardata.Mon2 == "mon2-9 - 12 Pm" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Tue2", "tue2-9 - 12 Pm")} className={calendardata.Tue2 == "tue2-9 - 12 Pm" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Wed2", "wed2-9 - 12 Pm")} className={calendardata.Wed2 == "wed2-9 - 12 Pm" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Thr2", "thr2-9 - 12 Pm")} className={calendardata.Thr2 == "thr2-9 - 12 Pm" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Fri2", "fri2-9 - 12 Pm")} className={calendardata.Fri2 == "fri2-9 - 12 Pm" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sat2", "sat2-9 - 12 Pm")} className={calendardata.Sat2 == "sat2-9 - 12 Pm" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sun2", "sun2-9 - 12 Pm")} className={calendardata.Sun2 == "sun2-9 - 12 Pm" ? "active" : ""}></li>
                            </ul>
                        </li>
                        <li> <span>12 - 3PM </span>
                            <ul>
                                <li onClick={e => set_calander("Mon3", "mon3-12 - 3 PM")} className={calendardata.Mon3 == "mon3-12 - 3 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Tue3", "tue3-12 - 3 PM")} className={calendardata.Tue3 == "tue3-12 - 3 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Wed3", "wed3-12 - 3 PM")} className={calendardata.Wed3 == "wed3-12 - 3 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Thr3", "thr3-12 - 3 PM")} className={calendardata.Thr3 == "thr3-12 - 3 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Fri3", "fri3-12 - 3 PM")} className={calendardata.Fri3 == "fri3-12 - 3 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sat3", "sat3-12 - 3 PM")} className={calendardata.Sat3 == "sat3-12 - 3 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sun3", "sun3-12 - 3 PM")} className={calendardata.Sun3 == "sun3-12 - 3 PM" ? "active" : ""}></li>
                            </ul>
                        </li>
                        <li><span>3 - 6 PM</span>
                            <ul>
                                <li onClick={e => set_calander("Mon4", "mon4-3 - 6 PM")} className={calendardata.Mon4 == "mon4-3 - 6 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Tue4", "tue4-3 - 6 PM")} className={calendardata.Tue4 == "tue4-3 - 6 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Wed4", "wed4-3 - 6 PM")} className={calendardata.Wed4 == "wed4-3 - 6 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Thr4", "thr4-3 - 6 PM")} className={calendardata.Thr4 == "thr4-3 - 6 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Fri4", "fri4-3 - 6 PM")} className={calendardata.Fri4 == "fri4-3 - 6 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sat4", "sat4-3 - 6 PM")} className={calendardata.Sat4 == "sat4-3 - 6 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sun4", "sun4-3 - 6 PM")} className={calendardata.Sun4 == "sun4-3 - 6 PM" ? "active" : ""}></li>
                            </ul>
                        </li>
                        <li><span>6 - 9 PM</span>
                            <ul>
                                <li onClick={e => set_calander("Mon5", "mon5-6 - 9 PM")} className={calendardata.Mon5 == "mon5-6 - 9 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Tue5", "tue5-6 - 9 PM")} className={calendardata.Tue5 == "tue5-6 - 9 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Wed5", "wed5-6 - 9 PM")} className={calendardata.Wed5 == "wed5-6 - 9 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Thr5", "thr5-6 - 9 PM")} className={calendardata.Thr5 == "thr5-6 - 9 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Fri5", "fri5-6 - 9 PM")} className={calendardata.Fri5 == "fri5-6 - 9 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sat5", "sat5-6 - 9 PM")} className={calendardata.Sat5 == "sat5-6 - 9 PM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sun5", "sun5-6 - 9 PM")} className={calendardata.Sun5 == "sun5-6 - 9 PM" ? "active" : ""}></li>
                            </ul>
                        </li>
                        <li><span>9 - 12 AM</span>
                            <ul>
                                <li onClick={e => set_calander("Mon6", "mon6-9 - 12 AM")} className={calendardata.Mon6 == "mon6-9 - 12 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Tue6", "tue6-9 - 12 AM")} className={calendardata.Tue6 == "tue6-9 - 12 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Wed6", "wed6-9 - 12 AM")} className={calendardata.Wed6 == "wed6-9 - 12 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Thr6", "thr6-9 - 12 AM")} className={calendardata.Thr6 == "thr6-9 - 12 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Fri6", "fri6-9 - 12 AM")} className={calendardata.Fri6 == "fri6-9 - 12 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sat6", "sat6-9 - 12 AM")} className={calendardata.Sat6 == "sat6-9 - 12 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sun6", "sun6-9 - 12 AM")} className={calendardata.Sun6 == "sun6-9 - 12 AM" ? "active" : ""}></li>
                            </ul>
                        </li>
                        <li><span>12 - 6 AM</span>
                            <ul>
                                <li onClick={e => set_calander("Mon7", "mon7-12 - 6 AM")} className={calendardata.Mon7 == "mon7-12 - 6 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Tue7", "tue7-12 - 6 AM")} className={calendardata.Tue7 == "tue7-12 - 6 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Wed7", "wed7-12 - 6 AM")} className={calendardata.Wed7 == "wed7-12 - 6 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Thr7", "thr7-12 - 6 AM")} className={calendardata.Thr7 == "thr7-12 - 6 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Fri7", "fri7-12 - 6 AM")} className={calendardata.Fri7 == "fri7-12 - 6 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sat7", "sat7-12 - 6 AM")} className={calendardata.Sat7 == "sat7-12 - 6 AM" ? "active" : ""}></li>
                                <li onClick={e => set_calander("Sun7", "sun7-12 - 6 AM")} className={calendardata.Sun7 == "sun7-12 - 6 AM" ? "active" : ""}></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Calander
