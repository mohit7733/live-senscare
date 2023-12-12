import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from '../pages/home/about'
import Career from '../pages/home/career'
import Cookie_policy from '../pages/home/common/cookie_policy'
import Faq from '../pages/home/common/faq'
import Login from '../pages/home/common/login'
import Parents_signup from '../pages/home/common/parents_signup'
import Privacy_policy from '../pages/home/common/privacy_policy'
import Provider_signup from '../pages/home/common/provider_signup'
import Reset_password from '../pages/home/common/reset_password'
import Resources from '../pages/home/common/resources'
import Safety_center from '../pages/home/common/safety_center'
import Signup from '../pages/home/common/signup'
import Terms_condition from '../pages/home/common/terms_condition'
import Contact from '../pages/home/contact'
import Create_parent_profile from '../pages/home/create_parent_profile'
import Create_provider_profile from '../pages/home/create_provider_profile'
import Error from '../pages/home/error404'
import Home from '../pages/home/home'
import Investor_relations from '../pages/home/investor_relations'
import Parents_membership from '../pages/home/parents_membership'
import Profile from '../pages/home/profile'
import Provider_membership from '../pages/home/provider_membership'
import Provider_payment from '../pages/home/provider_payment'
import Profile_provider from '../pages/home/provider_profile'
import Search_parents from '../pages/home/search_parents'
import Search_providers from '../pages/home/search_providers'
import Thank from '../pages/home/thanks'
import Thank_parents from '../pages/home/thank_parents'
import Thank_providers from '../pages/home/thank_providers'
import Welcome from '../pages/home/welcome_on_board'
import Work_us from '../pages/home/work with-us'
import Landing_parents from '../pages/landing/landing_parents'
import Landing_providers from '../pages/landing/landing_providers'
import Landing_step2 from '../pages/landing/landing_step2'
import Emai_thank from '../pages/verified/emai_thank'
import Reset_email from '../pages/verified/reset_email_password'
import { AuthGuard } from './authGard'
import { LinkedInCallback } from "react-linkedin-login-oauth2";


function Routing() {
    const [storagecheck, setstoragecheck] = React.useState(localStorage.getItem("token"));
    const [storagecheck2, setstoragecheck2] = React.useState(localStorage.getItem("id"));
    const auth = (storagecheck == null ? true : false)


    


    return (
        <>
            
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/landing' element={<Landing_step2 />} />
                    <Route exact path='/thanks_parents' element={<Landing_parents />} />
                    <Route exact path='/thanks_Providers' element={<Landing_providers />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/signup/:refral' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path="/linkedin" element={<LinkedInCallback />} />

                    <Route exact path='/signup_provider' element={<Provider_signup />} />
                    <Route exact path='/signup_Parents' element={<Parents_signup />} />
                    <Route exact path='/parent_thankyou' element={<Thank_parents />} />
                    <Route exact path='/thankyou' element={<Thank />} />
                    <Route exact path='/providers_thankyou' element={<Thank_providers />} />
                    <Route exact path='/welcome' element={<Welcome />} />
                    {/* <Route exact path='/thank_you' element={<Emai_thank />} /> */}
                    {/* <Route exact path='/reset_password_mail' element={<Reset_email />} /> */}
                    <Route exact path="/reset-password/:token/:id" element={<Reset_password />} />
                    <Route exact path="/privacy-policy" element={<Privacy_policy />} />
                    <Route exact path="/terms-of-use" element={<Terms_condition />} />
                    <Route exact path="/about-sensCare" element={<About />} />
                    <Route exact path="/contact-us" element={<Contact />} />
                    <Route exact path="/career" element={<Career />} />
                    <Route exact path="/investor-relations" element={<Investor_relations />} />
                    <Route exact path="/work-with-us" element={<Work_us />} />
                    <Route exact path="/safety-center" element={<Safety_center />} />
                    <Route exact path="/cookies-policy" element={<Cookie_policy />} />
                    <Route exact path="/resources" element={<Resources />} />
                    <Route exact path="/faq" element={<Faq />} />
                    <Route exact path="/complete-provider-profile" element={<Create_provider_profile />} />
                    <Route exact path="/complete-parents-profile" element={<Create_parent_profile />} />
                    <Route exact path="/search-parents" element={<Search_parents />} />
                    <Route exact path="/search-providers" element={<Search_providers />} />
                    {/* if(storagecheck != null){ */}
                    {storagecheck != null ?
                        <>
                            <Route exact path="/search-parents/:id" element={<Search_parents />} />
                            <Route exact path="/search-providers/:id" element={<Search_providers />} />
                            <Route exact path="/search-parents/:id/:name" element={<Search_parents />} />
                            <Route exact path="/search-providers/:id/:name" element={<Search_providers />} />
                        </> :
                        <>
                            <Route exact path="/search-parents/:id" element={<Login />} />
                            <Route exact path="/search-providers/:id" element={<Login />} />
                            <Route exact path="/search-parents/:id/:name" element={<Login />} />
                            <Route exact path="/search-providers/:id/:name" element={<Login />} />
                        </>
                    }
                    {/* } */}


                    <Route exact path="/parents-membership" element={<Parents_membership />} />
                    <Route exact path="/provider-membership" element={<Provider_membership />} />
                    <Route exact path="/provider-payment" element={<Provider_payment />} />
                    <Route exact path="/profile-parents/:id" element={<Profile />} />
                    <Route exact path="/profile-provider/:id" element={<Profile_provider />} />

                    <Route path='*' element={<Error />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing
