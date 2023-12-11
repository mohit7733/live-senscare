import React, { useEffect } from 'react'
import Interview_invite from './interview_invite'
import Recommendations_profile from './common/recommendations_parents'
import Review_provider from './common/review_provider'
import Job_application from './common/job_application'
import Profile_visiter from './common/profile_visiter'
import Share_document from './common/share_document'
import All_profile from './common/all_profile'
import Who_i_visited from './common/who_i_visited'
import Who_visit_me from './common/who_visit_me'
import Job_application_hiatory_parents from './common/job_application_parents'
import Interview_invite_job from './interview_invite_job'
import Recommendations_profile_job from './common/recommendations_parents_job'
import My_document from './common/my_document'
import Job_post_parents from './common/job_post_parents'
import Share_document_job from './common/share_document_job'
import All_review2 from './common/see_all_review'
import Message_list from './common/message_list'
import Trash_list from './common/trash'
import Loyality_notification from './common/loyalty_notification_'
import Loyalty from './common/loyalty_program'

function Parents_notification_tabs(props) {
    useEffect(() => {
        localStorage.setItem("back", props.subtab)
        localStorage.setItem("side", props.profilesection)
    }, [props.subtab])
    return (
        <>
            {
                props.subtab == "interview-invite" ?
                    <div class="interview">
                        <Interview_invite />
                    </div>
                    : ""
            }

            {
                props.subtab == "job-application" ?
                    <div class="interview">
                        <Job_application />
                    </div>
                    : ""
            }
            {
                props.subtab == "new-recommendation" ?
                    <div class="interview">
                        <Recommendations_profile />
                    </div>
                    : ""
            }
            {
                props.subtab == "shared-document" ?
                    <div class="interview">
                        <Share_document />
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
                props.subtab == "recent-profile-visitor" ?
                    <div class="interview">
                        <Profile_visiter />
                    </div>
                    : ""
            }
            {
                props.subtab == "all-profile" ?
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
                    <div class="interview">
                        <Who_visit_me />
                    </div>
                    : ""
            }
            {
                props.subtab == "job-applications" ?
                    <div class="interview">
                        <Job_application_hiatory_parents />
                    </div>
                    : ""
            }
            {
                props.subtab == "interview-invites" ?
                    <div class="interview">
                        <Interview_invite_job />
                    </div>
                    : ""
            }
            {
                props.subtab == "recommendation-request" ?
                    <div class="interview">
                        <Recommendations_profile_job />
                    </div>
                    : ""
            }
            {
                props.subtab == "shared-documents" ?
                    <div class="interview">
                        <Share_document_job />
                    </div>
                    : ""
            }
            {
                props.subtab == "job-post" ?
                    <div class="interview">
                        <Job_post_parents />
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

export default Parents_notification_tabs
