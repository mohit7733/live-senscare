import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { api } from '../../../urls';

function Promo_code(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [copytet, setcopy] = useState(false);



    const [count, setcount] = useState(false)
    const [promo, setpromo] = useState('')

    useEffect(() => {
        if (!count) {
            setcount(true)
            promo_get()
        }
        setcopy(copytet)
    }, [count, copytet])
    useEffect(() => {
        setcopy(copytet)
    }, [copytet])

    const promo_get = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(api + "/api/getpromocode", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.data.map((e) => {
                    setpromo(e.name)
                })
            })
            .catch(error => console.log('error', error));
    }
    const copy = (text) => {
        window.navigator.clipboard.writeText(text);
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = '<span >Copied</span> Copy code'
    }
    const handleCopy = (text) => {
        setcopy(true)
        handleClose()
        setTimeout(() => {
            handleShow()
        }, 10);
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        var tooltip = document.getElementById("myTooltip");
        // tooltip.innerHTML = "<span >"+(Copyed" />) + "</span>"+(<TranslateComponent text=" Copy code" />)
        // { console.log(tooltip.innerHTML,<TranslateComponent text="Copyed" />) }

    };
    return (
        <>

            <Link to='#' variant="primary" onClick={handleShow}>{props.title ? props.title : "Get your 500 dinars discount"}</Link>

            {
                show == true ?
                    <>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Body>
                                <div className='promocode_content'>
                                    <Link to="" onClick={handleClose}>+ </Link>
                                    <h2>SensCare rewards the first 100 platform users</h2>
                                    <p>SensCare rewards the first 100 platform users with an discount of<span>500 dinars on a monthly membership fee</span>as long as your membership remains active.
                                    </p>
                                    <img src={window.location.origin + '/images/promo.png'} />
                                    <h5>Take advantage of this amazing discount offer today! 
                                        <Link to='/signup'>  Register now  </Link> to get your discount. </h5>
                                    <p>Enter the <span style={{ textTransform: "uppercase" }}>{promo} </span>  code on the payment page to claim your discount.</p>
                                    <button onClick={e => handleCopy(promo.toString())} class="tooltiptext" id="myTooltip">
                                        {copytet == true ? "Copyed"  : "Copy code" }  </button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                    : ""}
        </>
    )
}

export default Promo_code
