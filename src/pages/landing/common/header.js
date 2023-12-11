import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='container-fluid'>
            <div className='logo border'>
                <Link to='/'><img src='./images/logo.svg' alt='logo' /> </Link>
            </div>
        </div>
    )
}

export default Header
