import React, { useState, useEffect } from 'react'
import { api, api2 } from '../../urls'
function Count_notification() {
    const [count, setcount] = useState(true)
    const [inve, setinve] = useState({});
    const [inve2, setinve2] = useState(0);

    useEffect(() => {
        if (count) {
            setcount(false)
            membership1()
        }
    }, [inve, inve2])

    const membership1 = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer  " + localStorage.getItem("token"));
        myHeaders.append("Cookie", "XSRF-TOKEN= " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/" + (localStorage.getItem("user_type") == "parents" ? "parentsallcounts" : "providerallcounts"), requestOptions)
            .then(response => response.json())
            .then(result => {
                setinve(result.data)
                setinve2(inve2 + 1)
                setTimeout(membership1, 10000);
                // console.log(result,">>>>>>>>>>>>>>>>")
            })
            .catch(error => console.log('error', error));
    }


    return (
        <>
            {inve.totalcount}
        </>
    )
}

export default Count_notification
