import React, { useEffect } from 'react'
import Notification from './common/notification'
import Recommendations from './common/recommendations'
import Document_requests from './common/document_requests'
import Hired from './common/hiring'
import Profile_visiter from './common/profile_visiter'
import Review_provider from './common/review_provider'
import Document_requests_main from './common/document_requests_main'
import Job_posts from './common/job_posts'
import All_profile from './common/all_profile'
import Who_i_visited from './common/who_i_visited'
import Who_visit_me from './common/who_visit_me'
import Job_application_hiatory from './common/job_application_hiatory'
import My_document from './common/my_document'
import Interview_job_his from './common/interview_job_his'
import All_review from './common/see_all_review'
import All_review2 from './common/see_all_review'
import Message_list from './common/message_list'
import Trash_list from './common/trash'
import Loyalty from './common/loyalty_program'
import Loyality_notification from './common/loyalty_notification_'

function Provider_notification_tabs(props) {
    useEffect(() => {
        localStorage.setItem("back", props.subtab)
        localStorage.setItem("side", props.profilesection)
    }, [props.subtab])
    return (
        <>
            {
                props.subtab == "interview-invite" ?
                    <div class="interview">
                        <Notification />
                    </div>
                    : ""
            }
            {
                props.subtab == "new-recommendation" ?
                    <div class="interview">
                        <Recommendations />
                    </div>
                    : ""
            }
            {
                props.subtab == "document-request" ?
                    <div class="interview">
                        <Document_requests />
                    </div>
                    : ""
            }

            {
                props.subtab == "hirings" ?
                    <div class="interview">
                        <Hired />
                    </div>
                    : ""
            }
            {
                props.subtab == "recent-profile-visitor" ?
                    <div class="interview">
                        <Profile_visiter />
                    </div>
                    : ""
            }
            {
                props.subtab == "new-reviews" ?
                    <div class="interview">
                        <Review_provider />
                    </div>
                    : ""
            }
            {
                props.subtab == "Reviews" ?
                    <div class="interview">
                        <All_review2 />
                    </div>
                    : ""
            }

            {
                props.subtab == "document-requests" ?
                    <div class="interview">
                        <Document_requests_main />
                    </div>
                    : ""
            }
            {
                props.subtab == "my-document" ?
                    <div class="interview">
                        <My_document />
                    </div>
                    : ""
            }
            {
                props.subtab == "job-applications" ?
                    <div class="interview">
                        <Job_application_hiatory />
                    </div>
                    : ""
            }
            {
                props.subtab == "job-post" ?
                    <div class="interview">
                        <Job_posts />
                    </div>
                    : ""
            }
            {
                props.subtab == "all_profile" ?
                    <div class="interview">
                        <All_profile />
                    </div>
                    : ""
            }
            {
                props.subtab == "who-i-visited" ?
                    <div class="interview">
                        <Who_i_visited />
                    </div>
                    : ""
            }
            {
                props.subtab == "who-visited-me" ?
                    <div class="interview" style={{ marginBottom: "100px" }}>
                        <Who_visit_me />
                    </div>
                    : ""
            }
            {
                props.subtab == "interview-invites" ?
                    <div class="interview">
                        <Interview_job_his />
                    </div>
                    : ""
            }
            {
                props.subtab == "message-inbox" ?
                    <div class="interview mbin" >
                        <Message_list />
                    </div>
                    : ""
            }
            {
                props.subtab == "Trash" ?
                    <div class="interview">
                        <Trash_list />
                    </div>
                    : ""
            }
            {
                props.subtab == "Loyalty-notification" ?
                    <div class="interview" >
                        <Loyality_notification />
                    </div>
                    : ""
            }
            {
                props.subtab == "Loyalty" ?
                    <div class="interview" style={{ width: "calc(100% - 22.5%)" }}>
                        <Loyalty />
                    </div>
                    : ""
            }

        </>
    )
}

export default Provider_notification_tabs
