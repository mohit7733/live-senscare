import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../urls'


function Loyalty_detail(props) {
    const [list, setlist] = useState([])
    const [check, setcheck] = useState(true)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [message, setmessage] = useState("")


    const profile_data = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": props.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/membershipnotificationsview", requestOptions)
            .then(response => response.json())
            .then(result => {
                setlist([result.data.data])
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
    }, [check])


    return (
        <>
            {list && list[0] ?
                <>
                    <h2 className='border'></h2>
                    {
                        list && list[0] && list[0].type != "plans" ?
                            <div className='detail_invit'>
                                <p>
                                    <span className='date'>{list && list[0] && list[0].created_at ? new Date(list && list[0] && list[0].created_at).toLocaleDateString('en-US', { weekday: 'short' }) : ""}, {list && list[0] && list[0].created_at ? month[new Date(list && list[0] && list[0].created_at).getMonth()] : ""}, {new Date(list && list[0] && list[0].created_at).getDate()},{new Date(list && list[0] && list[0].created_at).getFullYear()}, {new Date(list && list[0] && list[0].created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    {list && list[0] && list[0].read_status == 0 ?
                                        <span className='new'>NEW!</span>
                                        : ""}
                                </p>
                                <h2>Dear <span>{message}</span> congratulations! 
                                </h2>
                                <h2>
                                Your friend has just joined the SensCare family! </h2>
                                <p>You need to bring 5 friends on board to get a discount on the monthly membership fee.
                                    <br />
                                     Find out more details <Link to='/terms-of-use' style={{ textTransform: "lowercase" }}>here</Link>.</p>
                            </div>
                            :

                            <div className='detail_invit'>
                                <p>
                                    <span className='date'>{new Date(list && list[0] && list[0].created_at).toLocaleDateString('en-US', { weekday: 'short' })}, {month[new Date(list && list[0] && list[0].created_at).getMonth()] + " " + new Date(list && list[0] && list[0].created_at).getDate()}, {new Date(list && list[0] && list[0].created_at).getFullYear()}, {new Date(list && list[0] && list[0].created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    {list && list[0] && list[0].read_status == 0 ?
                                        <span className='new'>NEW!</span>
                                        : ""}
                                </p>
                                <h2>
                                Dear  <span>{message}</span> ,

                                </h2>
                                <h2>
                                 Congratulations! SensCare rewards you with a discount of 500 dinars on the monthly membership fee as a sign of gratitude that you have been our member for 6 months.</h2>
                                <p>Thank you for building the SensCare community together with us.
                                    <br />

                                     Follow your discount at any time on the <Link to='/search-providers/Loyalty'>SensCare loyalty page</Link>.</p>
                            </div>
                    }

                </>
                : ""

            }

        </>
    )
}

export default Loyalty_detail
