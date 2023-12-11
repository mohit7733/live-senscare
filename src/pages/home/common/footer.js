import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


function Footer() {
    const [fmenu, setfmenu] = useState()
    const [cooki, setcooki] = useState(localStorage.getItem("cooki") ? JSON.parse(localStorage.getItem("cooki")) : true)
    const [check, setcheck] = useState(useLocation())




    return (
        <>
            <div className='container-fluid dask'>
                <div className='footer'>
                    <div className='head'>
                        <div className='container'>
                            <ul>
                                <li>Contact</li>
                                <li>About</li>
                                <li>Resources</li>
                                <li>Legal</li>
                            </ul>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='footer_menu'>
                            <ul>
                                <li><Link to='/contact-us'>Contact us</Link></li>
                                <li><Link to='/work-with-us'>Work with us</Link></li>
                                <li><Link to='/career'>Career</Link></li>
                                <li><Link to='/investor-relations'>Investor Relation</Link></li>
                            </ul>
                            <ul>
                                <li><Link to='/about-sensCare'>About SensCare</Link></li>
                                <li><Link to='/faq'>FAQ</Link></li>
                            </ul>
                            <ul>
                                <li><Link to='/resources'>Resources for parents</Link></li>
                                <li><Link to='/safety-center'>Safety center</Link></li>
                            </ul>
                            <ul>
                                <li><Link to='/terms-of-use'>Terms of use</Link></li>
                                <li><Link to='/privacy-policy'>Privacy policy</Link></li>
                                <li><Link to='/cookies-policy'>Cookies policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='bottom'>
                        <ul>
                            <li>© 2023 SensCare. All Rights Reserved. </li>
                            <li>
                                <ul>
                                    <li>
                                        <a href='https://www.facebook.com/people/SensCare/100066554561840/' target='_blank'>
                                            <img src={window.location.origin + '/images/facebook.svg'} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://www.linkedin.com/company/sens-care/' target='_blank'>
                                            <img src={window.location.origin + '/images/indi.svg'} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://www.instagram.com/mysenscare/' target='_blank'>
                                            <img src={window.location.origin + '/images/twiter.svg'} />
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to='#'><img src={window.location.origin + '/images/app_store.svg'} /></Link>
                            </li>
                            <li>
                                <Link to='/'><img src={window.location.origin + '/images/logo.svg'} /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* {
                check.pathname == "/" ||check.pathname=="/investor-relations"||check.pathname=="/career"||check.pathname=="*"?
                    <div className='container-fluid mobilef'>
                        <div className='footer'>

                            <div className='container'>
                                <div className='footer_menu'>
                                    <h4 id='fm1' onClick={a => {
                                        fmenu ? setfmenu() :
                                            setfmenu('fm1')
                                    }}>Contact <img src={window.location.origin + '/images/down_arrow.svg'} /></h4>
                                    <ul className={fmenu == 'fm1' ? "show" : "hide"}>
                                        <li><Link to='/contact-us'>Contact us </Link></li>
                                        <li><Link to='/work-with-us'>Work with us</Link></li>
                                        <li><Link to='/career'>Career</Link></li>
                                        <li><Link to='/investor-relations'>Investor Relation</Link></li>
                                    </ul>
                                    <h4 id='fm2' onClick={a => {
                                        fmenu ? setfmenu() : setfmenu('fm2')
                                    }}>About<img src={window.location.origin + '/images/down_arrow.svg'} /></h4>
                                    <ul className={fmenu == 'fm2' ? "show" : "hide"}>
                                        <li><Link to='/about-sensCare'>About SensCare</Link></li>
                                        <li><Link to='/faq'>FAQ</Link></li>
                                    </ul>
                                    <h4 id='fm3' onClick={a => {
                                        fmenu ? setfmenu() : setfmenu('fm3')
                                    }}>Resources<img src={window.location.origin + '/images/down_arrow.svg'} /></h4>
                                    <ul className={fmenu == 'fm3' ? "show" : "hide"}>
                                        <li><Link to='/resources'>Resources for parents</Link></li>
                                        <li><Link to='/safety-center'>Safety center</Link></li>
                                    </ul>
                                    <h4 id='fm4' onClick={a => {
                                        fmenu ? setfmenu() : setfmenu('fm4')
                                    }}>Legal <img src={window.location.origin + '/images/down_arrow.svg'} /></h4>
                                    <ul className={fmenu == 'fm4' ? "show" : "hide"}>
                                        <li><Link to='/terms-of-use'>Terms of use</Link></li>
                                        <li><Link to='/privacy-policy'>Privacy policy</Link></li>
                                        <li><Link to='/cookies-policy'>Cookies policy</Link></li>
                                    </ul>

                                </div>
                                <div className='bottom2 '>
                                    <ul>
                                        <li>
                                            <Link to='/'><img src={window.location.origin + '/images/white_logo.svg'} /></Link>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    <Link to='#'>
                                                        <img src={window.location.origin + '/images/whitefb.svg'} />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='#'>
                                                        <img src={window.location.origin + '/images/whitein.svg'} />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='#'>
                                                        <img src={window.location.origin + '/images/whitetwiter.svg'} />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link to='#'><img src={window.location.origin + '/images/app_store.svg'} /></Link>
                                        </li>
                                        <li>© 2023 SensCare. All Rights Reserved. </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
              
              : ""
            } */}

<div className='container-fluid mobilef'>
                        <div className='footer'>

                            <div className='container'>
                                <div className='footer_menu'>
                                    <h4 id='fm1' onClick={a => {
                                        fmenu ? setfmenu() :
                                            setfmenu('fm1')
                                    }}>Contact <img src={window.location.origin + '/images/down_arrow.svg'} /></h4>
                                    <ul className={fmenu == 'fm1' ? "show" : "hide"}>
                                        <li><Link to='/contact-us'>Contact us </Link></li>
                                        <li><Link to='/work-with-us'>Work with us</Link></li>
                                        <li><Link to='/career'>Career</Link></li>
                                        <li><Link to='/investor-relations'>Investor Relation</Link></li>
                                    </ul>
                                    <h4 id='fm2' onClick={a => {
                                        fmenu ? setfmenu() : setfmenu('fm2')
                                    }}>About<img src={window.location.origin + '/images/down_arrow.svg'} /></h4>
                                    <ul className={fmenu == 'fm2' ? "show" : "hide"}>
                                        <li><Link to='/about-sensCare'>About SensCare</Link></li>
                                        <li><Link to='/faq'>FAQ</Link></li>
                                    </ul>
                                    <h4 id='fm3' onClick={a => {
                                        fmenu ? setfmenu() : setfmenu('fm3')
                                    }}>Resources<img src={window.location.origin + '/images/down_arrow.svg'} /></h4>
                                    <ul className={fmenu == 'fm3' ? "show" : "hide"}>
                                        <li><Link to='/resources'>Resources for parents</Link></li>
                                        <li><Link to='/safety-center'>Safety center</Link></li>
                                    </ul>
                                    <h4 id='fm4' onClick={a => {
                                        fmenu ? setfmenu() : setfmenu('fm4')
                                    }}>Legal <img src={window.location.origin + '/images/down_arrow.svg'} /></h4>
                                    <ul className={fmenu == 'fm4' ? "show" : "hide"}>
                                        <li><Link to='/terms-of-use'>Terms of use</Link></li>
                                        <li><Link to='/privacy-policy'>Privacy policy</Link></li>
                                        <li><Link to='/cookies-policy'>Cookies policy</Link></li>
                                    </ul>

                                </div>
                                <div className='bottom2 '>
                                    <ul>
                                        <li>
                                            <Link to='/'><img src={window.location.origin + '/images/white_logo.svg'} /></Link>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    <Link to='#'>
                                                        <img src={window.location.origin + '/images/whitefb.svg'} />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='#'>
                                                        <img src={window.location.origin + '/images/whitein.svg'} />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='#'>
                                                        <img src={window.location.origin + '/images/whitetwiter.svg'} />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link to='#'><img src={window.location.origin + '/images/app_store.svg'} /></Link>
                                        </li>
                                        <li>© 2023 SensCare. All Rights Reserved. </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
            {cooki ?
                <div className='cookie_pop'>
                    <div className='container'>
                        <img src={window.location.origin + '/images/cooki_icon.svg'} />
                        <p>This site uses cookies in order to offer you the most relevant information.
                            <br /> Please accept cookies for optimal performance.   <Link to="/cookies-policy" target="_blank"><b>Learn more</b></Link></p>
                        <button onClick={e => {
                            localStorage.setItem("cooki", false)
                            setcooki(false)
                        }}>Decline Cookies</button>
                        <button className='accept' onClick={e => {
                            localStorage.setItem("cooki", false)
                            setcooki(false)
                        }}>Accept Cookies</button>
                    </div>
                </div>
                : ''}
        </>
    )
}

export default Footer
