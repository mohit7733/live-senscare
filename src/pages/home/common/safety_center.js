import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { api } from '../../../urls';

import Footer from './footer'
import Header from './header'

function Safety_center() {
    const [count, setcount] = useState(true);
    const [investor, setinvestor] = useState({});
    const [selecttab, setselecttab] = useState("tab1")
    const [location, setlocation] = useState(useLocation())
    useEffect(() => {
        if (count) {
            if (location.hash == "#parents") {
                setselecttab("tab2")
                window.scrollTo({ top: 330, behavior: 'smooth' });
            } else if (location.hash == "#provider") {
                setselecttab("tab1")
                window.scrollTo({ top: 330, behavior: 'smooth' });
            } else if (location.hash == "#school") {
                setselecttab("tab3")
                window.scrollTo({ top: 330, behavior: 'smooth' });
            }
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(api + "/api/safetycenter", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setinvestor(result.data)
                    console.log(result.data)
                })
                .catch(error => console.log('error', error));
            setcount(false)
        }
        var myClickableElem = document.getElementById('question1');
        var myClickableElem2 = document.getElementById('question2');
        var myClickableElem3 = document.getElementById('question3');
        myClickableElem ? myClickableElem.onclick = function () {
            localStorage.setItem("faq", "How do I report a member due to safety concerns or inappropriate conduct?")
            window.location.hash = "provider"
            setTimeout(() => {
                window.location.replace("/faq")
            }, 200);
        } : myClickableElem = document.getElementById('question1');
        myClickableElem2 ? myClickableElem2.onclick = function () {
            localStorage.setItem("faq", "How do I report a member due to safety concerns or inappropriate conduct?")
            window.location.hash = "parents"
            setTimeout(() => {
                window.location.replace("/faq")
            }, 200);
        } : myClickableElem2 = document.getElementById('question1');
        myClickableElem3 ? myClickableElem3.onclick = function () {
            localStorage.setItem("faq", "How do I report a member due to safety concerns or inappropriate conduct?")
            window.location.hash = "school"
            setTimeout(() => {
                window.location.replace("/faq")
            }, 200);
        } : myClickableElem3 = document.getElementById('question1');
    }, [count, investor])

   

    return (
        <>
            <Header />
            <div className='container-fluid' style={{ marginBottom: "20px" }}>
                <div className='container'>
                    <div className='contact privacy safety'>
                        <div className='left'>
                            {investor.title ?
                                <h2>{investor.title}</h2> : ""}
                                
                            {
                                investor.description_for_providers || investor.description_for_parents || investor.description_for_school ?
                                    selecttab == "tab1" ?
                                        investor.description_for_providers ?
                                            <div dangerouslySetInnerHTML={{ __html: investor.description_for_providers }} className="privacycon safe_center" /> : "" : (selecttab == "tab2" ?
                                                investor.description_for_parents ?
                                                    <div dangerouslySetInnerHTML={{ __html: investor.description_for_parents }} className="privacycon safe_center" /> : ""
                                                : (selecttab == "tab3" ?
                                                    investor.description_for_school ?
                                                        <div dangerouslySetInnerHTML={{ __html: investor.description_for_school }} className="privacycon safe_center" /> : ""
                                                    : ""))
                                    : ""
                            }

                        </div>
                        <div className='right'>
                            <img src={"https://admin.senscare.sdsstaging.co.uk/assets/cms/" + investor.image} />
                            <h3>Your safety is very important to us. SensCare is always here to support you.</h3>
                        </div>
                    </div>
                    <div className='contact safety' id='safety_tips'>
                        <h2>Choose safety tips for</h2>
                        <div className='tabing'>
                            <button className={selecttab == "tab1" ? 'active' : ''} onClick={e => {
                                window.location.hash = "provider"
                                setselecttab("tab1")
                            }}>For providers</button>
                            <button className={selecttab == "tab2" ? 'active' : ''} onClick={e => {
                                window.location.hash = "parents"
                                setselecttab("tab2")
                            }}>For parents</button>
                            <button className={selecttab == "tab3" ? 'active' : ''} onClick={e => {
                                window.location.hash = "school"
                                setselecttab("tab3")
                            }}>For schools</button>
                        </div>
                    </div>

                </div>
                <div className={'tab1 ' + (selecttab == "tab1" ? 'active' : '')}>
                    <div className='provider_tabing'>
                        <div className='container'>
                            <div className='contact safety_tips'>
                                <h3>Safety tips at glance</h3>
                                <ul>
                                    <li>
                                        <img src='./images/verify.svg' />
                                        <h4>Check if the <br />profile is <span>verified</span></h4>
                                    </li>
                                    <li>
                                        <img src='./images/sreview.svg' />
                                        <h4>Check<br /><span> reviews</span></h4>
                                    </li>
                                    <li>
                                        <img src='./images/sinterview.svg' />

                                        <h4>Prepare for an online <span> interview </span> or a meeting in a public space  </h4>

                                    </li>
                                    <li>
                                        <img src='./images/probation.svg' />
                                        <h4>Consider <br /><span>probation period</span></h4>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className='container'>
                        <div className='more_tips contact'>
                            <h3>See here for more details on Safety tips</h3>
                            <ul>
                                <li>
                                    <img src='./images/verify_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>1st step:<span><Link to="/faq" onClick={e => {
                                            window.location.hash = "provider"
                                            localStorage.setItem("faq", "I have found a great job post, how can I apply for it?")
                                        }}> Choose family/school</Link></span></h5>
                                        <p>The first important step when looking for a job is to check whether a member has a verified email, phone number and/or social media. Next, read the member's profile, previous reviews, and job posting carefully to ensure that it matches your skills and experience. We recommend that you apply for at least 5-7 posts during the initial search. Here you can find how to <Link to="/faq" onClick={e => {
                                            window.location.hash = "provider"
                                            localStorage.setItem("faq", "I have found a great job post, how can I apply for it?")
                                        }}>apply for jobs</Link>. The next step is to schedule an interview and find the right employer. </p>
                                    </div>
                                </li>
                                <li>
                                    <img src='./images/rating_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>2nd step: <span>Check reviews</span></h5>
                                        <p>Checking employer's reviews is a useful step in learning about their professionalism and relationship they establish with their employee. Overall, it is always good to hear how other employees feel about family or school in general.</p>
                                    </div>
                                </li>
                                <li>
                                    <img src='./images/interview_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>3rd step: <span>Interview steps</span></h5>
                                        <p>Next, choose places where you feel most comfortable to have an interview. We would recommend that you set up an online interview or a meeting at a place where you feel comfortable and safe, like in a public space or in the office. However, many members will opt to have an interview from the comfort of their home.
                                            You can share your resume and background check prior to the interview as that will help prospective employers learn more about you.
                                            Now is the time to get to know your prospective employer.</p>
                                    </div>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <img src='./images/finger_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>4th step: <span> Get to know an employee better</span></h5>
                                        <p>During the interview, it is best to be honest with the prospective employer regarding your skills and previous experience. Transparency and respectful communication enhance the interview process. We encourage you to ask job-related questions and learn more about family needs. By the end of the interview, you will have probably found your ideal job. Congratulations!</p>
                                    </div>
                                </li>

                                <li className='inner'>
                                    <img src='./images/int_pup.svg' />
                                    <div className='morecontent'>
                                        <h3>Interview questions</h3>
                                        <p>
                                            1. Could you tell me more about your family/school? <br />
                                            2. Could you elaborate on my specific duties? <br />
                                            3. What are your expectations of an ideal candidate in this position? </p>
                                    </div>
                                </li>
                                <li>
                                    <img src='./images/probation_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>5th step: <span>Probation period</span></h5>
                                        <p>Before officially hiring, some employers may decide to implement a probation period. Probation period is a limited time paid trial period that usually lasts no longer than 7-10 days. During that time employers may witness candidates skills and strengths before deciding to hire a candidate. If an employer suggests a probation period, be sure to clearly communicate your expectations and be in agreement. </p>
                                        <img src='./images/thank_banner.png' />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={'tab1 ' + (selecttab == "tab2" ? 'active' : '')}>
                    <div className='provider_tabing'>
                        <div className='container'>
                            <div className='contact safety_tips parents'>
                                <h3>Safety tips at glance</h3>
                                <ul>
                                    <li>
                                        <img src='./images/verify.svg' />
                                        <h4>Check if the <br /> profile is <span>verified</span></h4>
                                    </li>
                                    <li>
                                        <img src='./images/sreview.svg' />
                                        <h4>Check <br /><span>reviews</span></h4>
                                    </li>
                                    <li>
                                        <img src='./images/sinterview.svg' />

                                        <h4>Schedule an online <span>interview</span>  or a meeting in a public space  </h4>

                                    </li>
                                    <li>
                                        <img src='./images/finger.svg' />
                                        <h4>Request the  <br /><span>background check</span></h4>
                                    </li>
                                    <li>
                                        <img src='./images/search_bg.svg' />

                                        <h4>Check out <br /><span>references</span></h4>

                                    </li>
                                    <li>
                                        <img src='./images/probation.svg' />
                                        <h4>Consider <br /><span>probation period</span></h4>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className='container'>
                        <div className='more_tips contact'>
                            <h3>See here for more details on Safety tips</h3>
                            <ul>
                                <li>
                                    <img src='./images/verify_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>1st step: <span><Link to="/faq" onClick={e => {
                                            window.location.hash = "parents"
                                            localStorage.setItem("faq", "I found a professional child service provider, how can I send an interview invite?")
                                        }}>Selecting the right candidate</Link></span></h5>
                                        <p>The first important step in <strong>selecting the right candidate</strong> is to check whether the candidate has a verified email, phone number and/or social media. Next, read your candidates’ profiles carefully to ensure that candidates’ skills and experience are a suitable match for your family needs. We recommend that you select at least 3-4 candidates for an initial interview. Here you can find how to<Link to="/faq" onClick={e => {
                                            window.location.hash = "parents"
                                            localStorage.setItem("faq", "I found a professional child service provider, how can I send an interview invite?")

                                        }}>invite a candidate for an interview </Link> . Once you have completed your selection process, the next step is to schedule an interview to find the right child care provider.</p>

                                    </div>
                                </li>
                                <li>
                                    <img src='./images/rating_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>2nd step: <span>Check reviews</span></h5>
                                        <p>Checking candidate's reviews is a useful step in learning about their skills, their work ethics, and professionalism. Overall, it is always good to hear how other caregivers feel about candidate's work performance.</p>
                                    </div>
                                </li>
                                <li>
                                    <img src='./images/finger_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>3rd step: <span>Schedule an interview</span></h5>
                                        <p>Next, choose the place where you feel most comfortable to hold an interview. We would recommend that you set up an online interview or a meeting at a place where you feel comfortable and safe, like in a public space or in the office. However, many members will opt to hold an interview from the comfort of their home. When you meet a candidate, we would recommend that you ask your candidate for their personal identification document (e.g. ID, driver’s license). Additionally, prior to or during the interview, it is highly recommended that you ask a candidate for their background check, as well as for their other documents (such as resume, diploma, certificates, etc.). Please click <Link to="/faq" onClick={e => {
                                            window.location.hash = "parents"
                                            localStorage.setItem("faq", "How can I request a background check?")
                                        }}> here </Link>to learn how to request a background check and  <Link to="/faq" onClick={e => {
                                            window.location.hash = "parents"
                                            localStorage.setItem("faq", "How can I request a CV and references from providers via SensCare platform?")
                                        }}>here </Link>to request any additional documents directly via SensCare platform. These are the necessary steps to get to know your prospective employee better.</p>
                                    </div>
                                </li>
                                <li>
                                    <img src='./images/interview_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>4th step:<span> Get to know an employer better</span></h5>
                                        <p>During the interview, ask candidates about their experience in working with children and encourage them to ask job-related questions. It is best to be honest with candidates regarding your expectations, job duties and family needs. Transparency and respectful communication enhance the interview process. By the end of the interview, you will have probably found your ideal child care provider. Congratulations! It is time to check the references and welcome a new employee into your family.</p>
                                    </div>
                                </li>

                                <li className='inner'>
                                    <img src='./images/int_pup.svg' />
                                    <div className='morecontent'>
                                        <h3>General Interview questions</h3>
                                        <p>
                                            1. Could you tell us something about yourself?<br />
                                            2. How long have you worked with children?<br />
                                            3. Please, tell us more about your experience and give us some examples of your work duties? <br />
                                            4. Could you elaborate on your specific skills and why you are the best candidate for this job?<br />
                                            5. Describe your work philosophy? </p>
                                    </div>
                                </li>
                                <li className='inner'>
                                    <img src='./images/int_pup.svg' />
                                    <div className='morecontent'>
                                        <h3>Specific Interview questions for families</h3>
                                        <p>
                                            1. How would you handle it if my child refuses to eat? <br />
                                            2. How would you handle a child throwing a tantrum ?<br />
                                            3. How would you support my child with special needs?  <br />
                                            4. Would you be willing to travel abroad with us?<br />
                                            5. Could you provide transportation for our children?<br />
                                            6. Would you do some light house cleaning (including dust wiping, cooking for the child/ren, light dishwashing)?<br />
                                            7. Do you have any questions about our family? <br />
                                            8. Are you using any substances which may interfere with your job duties?<br />
                                            9. Do you have any medical conditions which may interfere with your job duties? </p>
                                    </div>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <img src='./images/interview_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>5th step: <span>Check references</span></h5>
                                        <p>One more step before making a hire: Check the references. Make sure to ask for at least 2 references from their previous employers who can confirm the candidate's experience, skills and duties on the previous jobs. SensCare has divided references into two categories (golden flag and purple flag) to help you decide whether a candidate has a strong background.</p>
                                    </div>
                                </li>

                                <li className='inner out'>
                                    <img src='./images/flag_bro.svg' />
                                    <div className='morecontent'>
                                        <p>

                                            <strong>Category I:</strong> the references were happy to answer and share a lot of positive details about the candidate that aligned with the information the candidate gave during the interview. Overall, the feedback was very satisfactory. This candidate sounds like a good, reliable match.

                                        </p>
                                    </div>
                                </li>
                                <li className='inner out'>
                                    <img src='./images/flag_pur.svg' />
                                    <div className='morecontent'>
                                        <p>

                                            <strong>Category II:</strong> the references were non responsive even after several attempts of you trying to reach them, or they talked poorly about the candidate and their previous experience with the candidate. Overall, the feedback was unsatisfactory and we would not recommend that you hire this candidate.                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <img src='./images/probation_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>6th step: <span></span></h5>
                                        <p>Before officially hiring, some employers may decide to implement a <strong>probation period</strong>. Probation period is a limited time paid trial period that usually lasts no longer than 7-10 days. During that time employers may witness candidates skills and strengths before deciding to hire a candidate.</p>
                                        <img src='./images/thank_banner.png' />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={'tab1 ' + (selecttab == "tab3" ? 'active' : '')}>
                    <div className='provider_tabing'>
                        <div className='container'>
                            <div className='contact safety_tips parents'>
                                <h3>Safety tips at glance</h3>
                                <ul>
                                    <li>
                                        <img src='./images/verify.svg' />
                                        <h4>Check if the<br />profile is <span>verified</span></h4>
                                    </li>
                                    <li>
                                        <img src='./images/sreview.svg' />
                                        <h4>Check <br /><span>reviews</span></h4>
                                    </li>
                                    <li>
                                        <img src='./images/sinterview.svg' />
                                        <h4>Schedule an <br />  <span>interview</span> </h4>
                                    </li>
                                    <li>
                                        <img src='./images/finger.svg' />
                                        <h4>Request the <br /><span>background check</span></h4>
                                    </li>
                                    <li>
                                        <img src='./images/search_bg.svg' />

                                        <h4>Check out  <br /><span>references</span></h4>

                                    </li>
                                    <li>
                                        <img src='./images/probation.svg' />
                                        <h4>Consider <br /><span>probation period</span></h4>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className='container'>
                        <div className='more_tips contact'>
                            <h3>See here for more details on Safety tips</h3>
                            <ul>
                                <li>
                                    <img src='./images/verify_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>1st step: <span><Link to="/faq">Selecting the right candidate</Link></span></h5>
                                        <p>                                           The first important step in  <strong>selecting the right candidate</strong> is to check whether the candidate has a verified email, phone number and/or social media. Next, read your candidates’ profiles carefully to ensure that candidates’ skills and experience are a suitable match for your school needs. We recommend that you select at least 3-4 candidates for an initial interview. Here you can find how to <Link to="/faq" onClick={e => {
                                            window.location.hash = "school"
                                            localStorage.setItem("faq", "I found a professional child service provider, how can I send an interview invite?")

                                        }}>invite a candidate for an interview </Link> . Once you have completed your selection process, the next step is to schedule an interview to find the right child care provider.</p>

                                    </div>
                                </li>
                                <li>
                                    <img src='./images/rating_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>2nd step: <span>Check reviews</span></h5>
                                        <p>Checking candidate's reviews is a useful step in learning about their skills, their work ethics, and professionalism. Overall, it is always good to hear how other schools feel about candidate's work performance.</p>
                                    </div>
                                </li>
                                <li>
                                    <img src='./images/finger_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>3rd step: <span>Schedule an interview</span></h5>
                                        <p>
                                            Next, choose the place where you feel most comfortable to hold an interview. We would recommend to meet in an school office. When you meet a candidate, we would recommend that you ask your candidate for their personal identification document (e.g. ID, driver’s license). Additionally, prior to or during the interview, it is highly recommended that you ask a candidate for their background check, as well as for their other documents (such as resume, diploma, certificates, etc.). Please click   <Link to="/faq" onClick={e => {
                                                window.location.hash = "school"
                                                localStorage.setItem("faq", "How can I request a background check?")
                                            }}>here</Link> to learn how to request a background check and  <Link to="/faq" onClick={e => {
                                                window.location.hash = "school"
                                                localStorage.setItem("faq", "How can I request a CV and references from providers via SensCare platform?")
                                            }}>here</Link> to request any additional documents directly via SensCare platform. These are the necessary steps to get to know your prospective employee better.</p>
                                    </div>
                                </li>
                                <li>
                                    <img src='./images/interview_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>4th step: <span>Get to know a candidate better</span></h5>
                                        <p>During the interview, ask candidates about their experience in working with children and encourage them to ask job-related questions. It is best to be honest with candidates regarding your expectations, job duties and school needs. Transparency and respectful communication enhance the interview process. By the end of the interview, you will have probably found your ideal child care provider. Congratulations! It is time to check the references and welcome a new employee into your school.</p>
                                    </div>
                                </li>

                                <li className='inner'>
                                    <img src='./images/int_pup.svg' />
                                    <div className='morecontent'>
                                        <h3>General Interview questions</h3>
                                        <p>
                                            1. Could you tell us something about yourself?<br />
                                            2. How long have you worked with children? <br />
                                            3. Please, tell us more about your experience and give us some examples of your work duties?<br />
                                            4. Could you elaborate on your specific skills and why you are the best candidate for this job? <br />
                                            5. Describe your work philosophy? </p>
                                    </div>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <img src='./images/interview_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>5th step: <span>Check references</span></h5>
                                        <p>One more step before making a hire:<strong>Check the references</strong>. Make sure to ask for at least 2 references from their previous employers who can confirm the candidate's experience, skills and duties on the previous jobs. SensCare has divided references into two categories (golden flag and purple flag) to help you decide whether a candidate has a strong background.</p>
                                    </div>
                                </li>

                                <li className='inner out'>
                                    <img src='./images/flag_bro.svg' />
                                    <div className='morecontent'>
                                        <p>

                                            <strong>Category I:</strong>  the references were happy to answer and share a lot of positive details about the candidate that aligned with the information the candidate gave during the interview. Overall, the feedback was very satisfactory. This candidate sounds like a good, reliable match.

                                        </p>
                                    </div>
                                </li>
                                <li className='inner out'>
                                    <img src='./images/flag_pur.svg' />
                                    <div className='morecontent'>
                                        <p>

                                            <strong>Category II:</strong> the references were non responsive even after several attempts of you trying to reach them, or they talked poorly about the candidate and their previous experience with the candidate. Overall, the feedback was unsatisfactory and we would not recommend that you hire this candidate.                                         </p>

                                    </div>
                                </li>
                                <li>
                                    <img src='./images/probation_pur.svg' />
                                    <div className='morecontent'>
                                        <h5>6th step:<span> Probation period</span></h5>
                                        <p>Before officially hiring, some employers may decide to implement a <strong >probation period</strong>. Probation period is a limited time paid trial period that usually lasts no longer than 7-10 days. During that time employers may witness candidates skills and strengths before deciding to hire a candidate.</p>
                                        <img src='./images/thank_banner.png' />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Safety_center
