import React, { useEffect, useState } from 'react'
import { api } from '../../urls';
import Footer from './common/footer'
import Header from './common/header'


function Career() {
    const [count, setcount] = useState(true);
    const [careerdata, setcareerdata] = useState({});


    useEffect(() => {
        if (count) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(api + "/api/career", requestOptions)
                .then(response => response.json())
                .then(result => setcareerdata(result.data))
                .catch(error => console.log('error', error));
            setcount(false)
            console.log(careerdata,'careerdata')
        }
    }, [count])

    return (
        <>
            <Header />
            <div className='container-fluid'>
                <div className='container'>
                    <div className='career'>

                        {careerdata.title ?
                            <h2>{careerdata.title} </h2> : ""}
                        {careerdata.description ?
                            <p>{careerdata.description} </p>
                            : ""}
                        <img src={api + "/assets/cms/" + careerdata.image} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Career
