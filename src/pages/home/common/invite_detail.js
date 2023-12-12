import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../urls";
import Modal from "react-bootstrap/Modal";
import Send_review from "../send_review";
import Favorite_select from "./favorite_select";
import Message_chet from "./message_chet";
import Facebook_share from "./share_facebook";
import { useTranslation } from "react-i18next";

function Invite_detail(props) {
  const { t, i18n } = useTranslation("invite_interview");
  const navigate = useNavigate();
  const [list, setlist] = useState([]);
  const [job, setjob] = useState([]);
  const [view, setview] = useState("");
  const [rating, setrating] = useState({});
  const [check, setcheck] = useState(true);
  const language = i18n.language;
  const month =
    language === "en"
      ? [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Maj",
          "Jun",
          "Jul",
          "Avg",
          "Sep",
          "Okt",
          "Nov",
          "Dec",
        ];
  const [profile, setprofile] = useState();
  const [reviewmodel, setreviewmodel] = useState(false);
  const [plink, setplink] = useState(true);
  const [showflogin, setshowflogin] = useState(false);
  const [update, setupdate] = useState(false);

  const [noactive, setnoactive] = useState(false);

  const [delete1, setdelete] = useState(false);
  const [delete21, setdelete2] = useState(false);
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");
  const [statusr, setstatusr] = useState("");
  const pmore = (e, x, z) => {
    console.log(e, x);
    document.getElementById(e).style.display = "none";
    document.getElementById(x).style.display = "block";
    if (plink) {
      document.getElementById(z).style.display = "block";
      setplink(false);
    } else {
      setplink(true);
      document.getElementById(z).style.display = "none";
    }
  };

  const profile_data = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      notification_id: props.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/interviewinvitesprofile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setlist([result.data.getparentsData]);
        setjob(result.data.jobs);
        setrating(result.data);
        setmessage(result.data.currentUserName);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (check) {
      profile_data();
      setcheck(false);
    }
    console.log(status);
  }, [check, status]);

  const accept = (a) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      inv_id: props.id,
      status: a,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/invitationresponsesend", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let x = (list[0].status = a);
        setlist(list);
        setdelete2(false);
        setdelete(false);
        setstatus(a);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      {list && list[0] ? (
        view == "" ? (
          <>
            <h2 className="border"></h2>
            <div className="detail_invit">
              <p>
                <span className="date">
                  {t(
                    new Date(
                      list && list[0] && list[0].created_at
                    ).toLocaleDateString("en-US", { weekday: "short" })
                  )}
                  ,{" "}
                  {month[
                    new Date(list && list[0] && list[0].created_at).getMonth()
                  ] +
                    " " +
                    new Date(list && list[0] && list[0].created_at).getDate()}
                  ,{" "}
                  {new Date(
                    list && list[0] && list[0].created_at
                  ).getFullYear()}
                  ,{" "}
                  {new Date(
                    list && list[0] && list[0].created_at
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {list && list[0] && list[0].read_status == 0 ? (
                  <span className="new">{t("NEW")}!</span>
                ) : (
                  ""
                )}
                {job && job[0] && job[0].title != null ? job[0].title : ""}{" "}
              </p>
              <h2>
                {t("Dear")} <span>{message}</span> {t("congratulations!")}
              </h2>
              <h2>
                <Link to={"/profile-parents/" + list[0]?.user_id}>
                  {list && list[0] && list[0].first_name}
                </Link>{" "}
                {t("invited you to an Interview.")}
              </h2>
              <p>
                {t(
                  "Read more about job below and accept interview invite if you are interested."
                )}
              </p>
            </div>
            <div class="right_side_section">
              <div class="looking_for_candidate">
                {list.map((data, index) => {
                  return (
                    <div class="looking_for_candidate_boxs">
                      <div class="looking_for_candidate_box">
                        <div class="first_sec">
                          <div class="image_sec">
                            <img
                              src={
                                data.file_path != null
                                  ? api +
                                    "/public/assets/images/users/" +
                                    data.file_path
                                  : window.location.origin +
                                    window.location.origin +
                                    "/img/nany_img.png"
                              }
                              alt=""
                            />
                            <div class="heart_sec">
                              <Favorite_select
                                id={data.user_id}
                                username={data.first_name}
                              />
                            </div>
                          </div>
                          <div class="nany_social">
                            {data.phoneVerifiedStatus == 1 ? (
                              <img
                                src={
                                  window.location.origin +
                                  "/images/nany_phone.svg"
                                }
                                alt=""
                              />
                            ) : (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z"
                                  fill="#B7B7B7"
                                />
                              </svg>
                            )}
                            <img
                              src={
                                window.location.origin + "/images/nany_msg.svg"
                              }
                              alt=""
                            />
                            {data.facebookverify != null ||
                            data.linkdinverify != null ? (
                              <img
                                src={
                                  window.location.origin +
                                  "/images/nany_cont.svg"
                                }
                                alt=""
                              />
                            ) : (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z"
                                  fill="#B7B7B7"
                                />
                              </svg>
                            )}
                            {/* {
                                                                rating.docsStatus == "Yes" ?
                                                                    <img src={window.location.origin + "/images/ok.svg"} alt="" />
                                                                    : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z" fill="#B7B7B7" />
                                                                    </svg>
                                                            } */}

                            {/* <img src={window.location.origin +"/images/ok.svg"} alt="" /> */}
                          </div>
                        </div>
                        <div class="second_sec">
                          <div class="heading">
                            <h3>
                              {job && job[0] && job[0].title != null
                                ? job[0].title
                                : ""}
                            </h3>
                            {job &&
                            job[0] &&
                            job[0].plateformonsocialmedia == "Yes" ? (
                              <Facebook_share
                                link={
                                  window.location.origin +
                                  "/profile-parents/" +
                                  data.user_id
                                }
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div class="post_general">
                            <h6>
                              <Link to={"/profile-parents/" + list[0]?.user_id}>
                                {data.first_name != null
                                  ? data.first_name + " " + data.last_name + " "
                                  : ""}
                              </Link>{" "}
                              (
                              {data.dob != undefined
                                ? new Date().getFullYear() -
                                  parseInt(
                                    data.dob
                                      .substr(data.dob.lastIndexOf("\\") + 1)
                                      .split("-")[0]
                                  )
                                : ""}
                              )
                            </h6>

                            <p
                              onClick={(e) => {
                                if (
                                  rating.checkreviewstatus != true ||
                                  data.checkapplyornot == true
                                ) {
                                  setreviewmodel(true);
                                }
                              }}
                            >
                              {rating.reviewAvg >= 0 ? (
                                <>
                                  {[...Array(rating.reviewAvg)].map(
                                    (star, index) => {
                                      index += 1;
                                      return (
                                        <svg
                                          width="12"
                                          height="12"
                                          style={{ marginLeft: "0px" }}
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z"
                                            fill="#A98D4B"
                                          />
                                        </svg>
                                      );
                                    }
                                  )}
                                  {[...Array(5 - rating.reviewAvg)].map(
                                    (star, index) => {
                                      index += 1;
                                      return (
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          style={{ marginLeft: "0px" }}
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z"
                                            stroke="#A98D4B"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                      );
                                    }
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                              <span> ({rating.reviewcount})</span>
                            </p>
                          </div>
                          <div class="post_detail">
                            <div class="post">
                              {/* {
                                                                    JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[0] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(JSON.parse(data.service_type))[0] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                }
                                                                <h5>{JSON.parse(data.service_type) != null ? Object.values(JSON.parse(data.service_type))[0]
                                                                    : ""}
                                                                </h5> */}
                              {data.jobType != null ? (
                                data.jobType == "Nanny" ? (
                                  <img
                                    src={
                                      window.location.origin +
                                      "/images/nany_post.svg"
                                    }
                                    alt=""
                                  />
                                ) : data.jobType ==
                                  "Special Education Teacher" ? (
                                  <img
                                    src={
                                      window.location.origin +
                                      "/images/teacher_post.svg"
                                    }
                                    alt=""
                                  />
                                ) : data.jobType ==
                                  "Special Education Paraprofessional" ? (
                                  <img
                                    src={
                                      window.location.origin +
                                      "/images/education_post.svg"
                                    }
                                    alt=""
                                  />
                                ) : data.jobType == "Tutor" ? (
                                  <img
                                    src={
                                      window.location.origin +
                                      "/images/tutor_post.svg"
                                    }
                                    alt=""
                                  />
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                              <h5>
                                {data.jobType != null ? t(data.jobType) : ""}
                              </h5>
                            </div>
                            <div class="vi"></div>

                            <div class="post_pay">
                              <img
                                src={
                                  window.location.origin + "/img/post_pay.png"
                                }
                                alt=""
                              />
                              {profile && profile.country == "Serbia" ? (
                                <h5>
                                  {data.nanyperhrrate != null
                                    ? data.nanyperhrrate
                                        .substr(
                                          data.nanyperhrrate.lastIndexOf("\\") +
                                            1
                                        )
                                        .split("-")[0] *
                                        100 +
                                      " - " +
                                      data.nanyperhrrate
                                        .substr(
                                          data.nanyperhrrate.lastIndexOf("\\") +
                                            1
                                        )
                                        .split("-")[1] *
                                        100
                                    : data.tutorperhrrate
                                    ? data.tutorperhrrate
                                        .substr(
                                          data.tutorperhrrate.lastIndexOf(
                                            "\\"
                                          ) + 1
                                        )
                                        .split("-")[0] *
                                        100 +
                                      " - " +
                                      data.tutorperhrrate
                                        .substr(
                                          data.tutorperhrrate.lastIndexOf(
                                            "\\"
                                          ) + 1
                                        )
                                        .split("-")[1] *
                                        100
                                    : ""}{" "}
                                  {t("/hour")}
                                </h5>
                              ) : (
                                <h5>
                                  $
                                  {data.nanyperhrrate != null
                                    ? data.nanyperhrrate
                                    : data.tutorperhrrate
                                    ? data.tutorperhrrate
                                    : ""}{" "}
                                  {t("/hour")}
                                </h5>
                              )}
                            </div>

                            <div class="vi"></div>
                            <div class="post_fet">
                              <img
                                src={
                                  window.location.origin +
                                  "/images/post_fet.svg"
                                }
                                alt=""
                              />
                              <h5>
                                {data.nanyintrestedin != null
                                  ? data.nanyintrestedin
                                  : t("Full time")}
                              </h5>
                            </div>
                            <div class="vi"></div>
                            <div class="post_cal">
                              <img
                                src={
                                  window.location.origin +
                                  "/images/post_cal.svg"
                                }
                                alt=""
                              />
                              <h5>
                                {data.nanystartdate != null
                                  ? data.nanystartdate
                                  : data.tutorstartdate}
                              </h5>
                            </div>
                            <div class="vi"></div>
                            <div class="post_loc">
                              <img
                                src={
                                  window.location.origin +
                                  "/images/post_loc.svg"
                                }
                                alt=""
                              />
                              <h5>
                                {data.country != null ? data.country : ""} ,{" "}
                                {data.city != null ? data.city : ""}
                              </h5>
                            </div>
                          </div>
                          <p id={"half" + index}>
                            {job && job[0] && job[0].description != null
                              ? job &&
                                job[0] &&
                                job[0].description.substr(0, 100)
                              : ""}{" "}
                            {job &&
                            job[0] &&
                            job[0].description != null &&
                            job &&
                            job[0] &&
                            job[0].description.length > 100 ? (
                              <span
                                onClick={(e) =>
                                  pmore(
                                    "half" + index,
                                    "full" + index,
                                    "plink" + index
                                  )
                                }
                              >
                                {t("more")}
                              </span>
                            ) : (
                              ""
                            )}{" "}
                          </p>
                          <p id={"full" + index} className="hide">
                            {job && job[0] && job[0].description}{" "}
                            <span
                              onClick={(e) =>
                                pmore(
                                  "full" + index,
                                  "half" + index,
                                  "plink" + index
                                )
                              }
                            >
                              {t("less")}
                            </span>
                          </p>
                        </div>
                        <div className="find_search">
                          <Link to="/search-parents">
                            {" "}
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.6942 12.8252C10.4625 13.8106 8.9 14.3998 7.19991 14.3998C3.22351 14.3998 0 11.1763 0 7.19991C0 3.22351 3.22351 0 7.19991 0C11.1763 0 14.3998 3.22351 14.3998 7.19991C14.3998 8.8998 13.8107 10.4621 12.8255 11.6938L15.7661 14.6343C16.0785 14.9467 16.0785 15.4533 15.7661 15.7657C15.4537 16.0781 14.9471 16.0781 14.6347 15.7657L11.6942 12.8252ZM1.59998 7.19991C1.59998 4.10715 4.10715 1.59998 7.19991 1.59998C10.2927 1.59998 12.7998 4.10715 12.7998 7.19991C12.7998 8.70993 12.2022 10.0804 11.2305 11.0875C11.2042 11.108 11.1789 11.1302 11.1548 11.1544C11.1306 11.1785 11.1083 11.2039 11.0879 11.2302C10.0807 12.202 8.7101 12.7998 7.19991 12.7998C4.10715 12.7998 1.59998 10.2927 1.59998 7.19991Z"
                                fill="#7D2B8B"
                              />
                              <circle
                                cx="7.19948"
                                cy="7.20144"
                                r="5.59987"
                                fill="white"
                              />
                            </svg>{" "}
                            {t("Search for similar jobs")}
                          </Link>
                        </div>
                        <div class="view_profile_btn">
                          {data.status == 1 ? (
                            <button onClick={(e) => setview(data.user_id)}>
                              {t("Send message")}
                            </button>
                          ) : (
                            <button
                              style={
                                data.status == 2 || status == 2
                                  ? { opacity: "0.5" }
                                  : {}
                              }
                              onClick={(e) => setdelete(true)}
                              disabled={
                                data.status == 2 || status == 2 ? true : false
                              }
                            >
                              {status == 2 || data.status == 2
                                ? t("Declined")
                                : t("Decline")}
                            </button>
                          )}
                          {data.status == 1 ? (
                            new Date(
                              list && list[0] && list[0].created_at
                            ).getMonth() < new Date().getMonth() ? (
                              <Link
                                to={""}
                                onClick={(e) => {
                                  setnoactive(true);
                                }}
                              >
                                {t("Visit profile")}
                              </Link>
                            ) : (
                              <Link to={"/profile-parents/" + data.user_id}>
                                {t("Visit profile")}
                              </Link>
                            )
                          ) : data.status == 2 || status == 2 ? (
                            <Link
                              to={""}
                              style={
                                data.status == 2 || status == 2
                                  ? { opacity: "0.5" }
                                  : {}
                              }
                            >
                              {t("Accept and visit profile")}
                            </Link>
                          ) : (
                            <Link
                              to={""}
                              disabled={
                                data.status == 2 || status == 2 ? true : false
                              }
                              style={
                                data.status == 2 || status == 2
                                  ? { opacity: "0.5" }
                                  : {}
                              }
                              onClick={(e) => {
                                localStorage.removeItem("search");
                                localStorage.removeItem("search2");
                                setdelete2(true);
                              }}
                            >
                              {t("Accept and visit profile")}
                            </Link>
                          )}
                        </div>
                      </div>
                      <p>
                        {(data.childmedicalcondition != null &&
                          data.childmedicalcondition == "Yes") ||
                        (data.childanyallergies != null &&
                          data.childanyallergies == "Yes") ? (
                          <>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.80221 11.9999H7.20221V10.3999H8.80221V11.9999ZM8.80221 8.8H7.20221V4H8.80221V8.8Z"
                                fill="#A98D4B"
                              />
                            </svg>
                            <strong>{t("Note:")}</strong>{" "}
                            {/* {t(
                              "Our record indicates that the provider might have an allergy and/or medical condition that you may want to discuss about during the interview."
                            )} */}
                            {/* <br /> */}
                          </>
                        ) : (
                          ""
                        )}
                        {/* <br /> */}
                        {t(
                          "Respond promptly or within 24h to the invitation and improve your chances to get hired. Please refer to our"
                        )}
                        <Link to="/faq" target="_blank">
                          {t(" FAQ")}
                        </Link>{" "}
                        {t("and")}{" "}
                        <Link to="/safety-center" target="_blank">
                          {t("Safety center")}
                        </Link>{" "}
                        {t("to read safety tips.")}
                      </p>
                    </div>
                  );
                })}
                <div className="mobile">
                  {list.map((data, index) => {
                    if (index <= 5) {
                      return (
                        <>
                          <div
                            class="looking_for_candidate_boxs"
                            style={{ display: "block" }}
                          >
                            <div class="looking_for_candidate_box">
                              <div class="second_sec">
                                <div class="heading">
                                  <h3>
                                    {job && job[0] && job[0].title != null
                                      ? job[0].title
                                      : ""}
                                  </h3>
                                  {job &&
                                  job[0] &&
                                  job[0].plateformonsocialmedia == "Yes" ? (
                                    <Facebook_share
                                      link={
                                        window.location.origin +
                                        "/profile-parents/" +
                                        data.user_id
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div class="post_general">
                                  <h6>
                                    {data.first_name != null
                                      ? data.first_name
                                      : ""}{" "}
                                    (
                                    {data.dob != undefined
                                      ? new Date().getFullYear() -
                                        parseInt(
                                          data.dob
                                            .substr(
                                              data.dob.lastIndexOf("\\") + 1
                                            )
                                            .split("-")[0]
                                        )
                                      : ""}
                                    )
                                  </h6>
                                  <p
                                    onClick={(e) => {
                                      if (rating.checkreviewstatus != true) {
                                        setreviewmodel(true);
                                      }
                                    }}
                                  >
                                    {rating.reviewAvg >= 0 ? (
                                      <>
                                        {[...Array(rating.reviewAvg)].map(
                                          (star, index) => {
                                            index += 1;
                                            return (
                                              <svg
                                                width="12"
                                                height="12"
                                                style={{ marginLeft: "0px" }}
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z"
                                                  fill="#A98D4B"
                                                />
                                              </svg>
                                            );
                                          }
                                        )}
                                        {[...Array(5 - rating.reviewAvg)].map(
                                          (star, index) => {
                                            index += 1;
                                            return (
                                              <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                style={{ marginLeft: "0px" }}
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z"
                                                  stroke="#A98D4B"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                              </svg>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    <span> ({rating.reviewcount})</span>
                                  </p>
                                </div>
                                <div class="post_detail">
                                  <div class="post">
                                    {JSON.parse(data.service_type) != null ? (
                                      Object.values(
                                        JSON.parse(data.service_type)
                                      )[0] == "Nanny" ? (
                                        <img
                                          src={
                                            window.location.origin +
                                            "/images/nany_post.svg"
                                          }
                                          alt=""
                                        />
                                      ) : Object.keys(
                                          JSON.parse(data.service_type)
                                        )[0] == "tab2" ? (
                                        <img
                                          src={
                                            window.location.origin +
                                            "/images/teacher_post.svg"
                                          }
                                          alt=""
                                        />
                                      ) : Object.keys(
                                          JSON.parse(data.service_type)
                                        )[0] == "tab3" ? (
                                        <img
                                          src={
                                            window.location.origin +
                                            "/images/education_post.svg"
                                          }
                                          alt=""
                                        />
                                      ) : Object.keys(
                                          JSON.parse(data.service_type)
                                        )[0] == "tab4" ? (
                                        <img
                                          src={
                                            window.location.origin +
                                            "/images/tutor_post.svg"
                                          }
                                          alt=""
                                        />
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )}
                                    <h5>
                                      {JSON.parse(data.service_type) != null
                                        ? Object.values(
                                            JSON.parse(data.service_type)
                                          )[0] ==
                                          "Special Education Paraprofessional"
                                          ? t("SPED Paraprofessional")
                                          : Object.values(
                                              JSON.parse(data.service_type)
                                            )[0] == "Special Education Teacher"
                                          ? t("SPED teacher")
                                          : Object.values(
                                              JSON.parse(data.service_type)
                                            )[0]
                                        : ""}
                                    </h5>
                                  </div>
                                  <div class="vi"></div>
                                  <div class="post_pay">
                                    <img
                                      src={
                                        window.location.origin +
                                        "/img/post_pay.png"
                                      }
                                      alt=""
                                    />
                                    {profile && profile.country == "Serbia" ? (
                                      <h5>
                                        {data.nanyperhrrate != null
                                          ? data.nanyperhrrate
                                              .substr(
                                                data.nanyperhrrate.lastIndexOf(
                                                  "\\"
                                                ) + 1
                                              )
                                              .split("-")[0] *
                                              100 +
                                            " - " +
                                            data.nanyperhrrate
                                              .substr(
                                                data.nanyperhrrate.lastIndexOf(
                                                  "\\"
                                                ) + 1
                                              )
                                              .split("-")[1] *
                                              100
                                          : data.tutorperhrrate
                                          ? data.tutorperhrrate
                                              .substr(
                                                data.tutorperhrrate.lastIndexOf(
                                                  "\\"
                                                ) + 1
                                              )
                                              .split("-")[0] *
                                              100 +
                                            " - " +
                                            data.tutorperhrrate
                                              .substr(
                                                data.tutorperhrrate.lastIndexOf(
                                                  "\\"
                                                ) + 1
                                              )
                                              .split("-")[1] *
                                              100
                                          : ""}{" "}
                                        {t("/hour")}
                                      </h5>
                                    ) : (
                                      <h5>
                                        $
                                        {data.nanyperhrrate != null
                                          ? data.nanyperhrrate
                                          : data.tutorperhrrate
                                          ? data.tutorperhrrate
                                          : ""}{" "}
                                        {t("/hour")}
                                      </h5>
                                    )}
                                  </div>
                                  <div class="vi"></div>
                                  <div class="post_fet">
                                    <img
                                      src={
                                        window.location.origin +
                                        "/images/post_fet.svg"
                                      }
                                      alt=""
                                    />
                                    <h5>
                                      {data.nanyintrestedin != null
                                        ? data.nanyintrestedin
                                        : t("Full time")}
                                    </h5>
                                  </div>
                                  <div class="vi"></div>
                                  <div class="post_cal">
                                    <img
                                      src={
                                        window.location.origin +
                                        "/images/post_cal.svg"
                                      }
                                      alt=""
                                    />
                                    <h5>
                                      {data.nanystartdate != null
                                        ? data.nanystartdate
                                        : data.tutorstartdate}
                                    </h5>
                                  </div>
                                  <div class="vi"></div>
                                  <div class="post_loc">
                                    <img
                                      src={
                                        window.location.origin +
                                        "/images/post_loc.svg"
                                      }
                                      alt=""
                                    />
                                    <h5>
                                      {data.country != null ? data.country : ""}{" "}
                                      , {data.city != null ? data.city : ""}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div class="first_sec">
                                <div class="image_sec">
                                  <img
                                    src={
                                      data.file_path != null
                                        ? api +
                                          "/public/assets/images/users/" +
                                          data.file_path
                                        : window.location.origin +
                                          "/img/nany_img.png"
                                    }
                                    alt=""
                                  />
                                  <div class="heart_sec">
                                    <Favorite_select
                                      id={data.user_id}
                                      username={data.first_name}
                                    />
                                  </div>
                                </div>
                                <div class="nany_social">
                                  {data.phoneVerifiedStatus == 1 ? (
                                    <img
                                      src={
                                        window.location.origin +
                                        "/images/nany_phone.svg"
                                      }
                                      alt=""
                                    />
                                  ) : (
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z"
                                        fill="#B7B7B7"
                                      />
                                    </svg>
                                  )}
                                  <img
                                    src={
                                      window.location.origin +
                                      "/images/nany_msg.svg"
                                    }
                                    alt=""
                                  />
                                  {data.facebookverify != null ||
                                  data.linkdinverify != null ? (
                                    <img
                                      src={
                                        window.location.origin +
                                        "/images/nany_cont.svg"
                                      }
                                      alt=""
                                    />
                                  ) : (
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z"
                                        fill="#B7B7B7"
                                      />
                                    </svg>
                                  )}
                                  {/* <img src={window.location.origin +"/images/ok.svg"} alt="" /> */}
                                </div>
                              </div>
                              <div class="second_sec">
                                <p id={"half" + index}>
                                  {job && job[0] && job[0].description != null
                                    ? job &&
                                      job[0] &&
                                      job[0].description.substr(0, 100)
                                    : ""}{" "}
                                  {job &&
                                  job[0] &&
                                  job[0].description != null &&
                                  job &&
                                  job[0] &&
                                  job[0].description.length > 100 ? (
                                    <span
                                      onClick={(e) =>
                                        pmore(
                                          "half" + index,
                                          "full" + index,
                                          "plink" + index
                                        )
                                      }
                                    >
                                      {t("more")}
                                    </span>
                                  ) : (
                                    ""
                                  )}{" "}
                                </p>
                                <p id={"full" + index} className="hide">
                                  {job && job[0] && job[0].description}{" "}
                                  <span
                                    onClick={(e) =>
                                      pmore(
                                        "full" + index,
                                        "half" + index,
                                        "plink" + index
                                      )
                                    }
                                  >
                                    {t("less")}
                                  </span>
                                </p>
                              </div>
                              <p className="parbot">
                                {(data.childmedicalcondition != null &&
                                  data.childmedicalcondition == "Yes") ||
                                (data.childanyallergies != null &&
                                  data.childanyallergies == "Yes") ? (
                                  <>
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.80221 11.9999H7.20221V10.3999H8.80221V11.9999ZM8.80221 8.8H7.20221V4H8.80221V8.8Z"
                                        fill="#A98D4B"
                                      />
                                    </svg>
                                    <strong>{t("Note:")}</strong>{" "}
                                    {t(
                                      "Our record indicates that the provider might have an allergy and/or medical condition that you may want to discuss about during the interview."
                                    )}
                                    <br />
                                  </>
                                ) : (
                                  ""
                                )}
                                {t(
                                  "Respond promptly or within 24h to the invitation and improve your chances to get hired. Please refer to our"
                                )}
                                <Link to="/faq" target="_blank">
                                  {t(" FAQ")}
                                </Link>{" "}
                                {t("and")}{" "}
                                <Link to="/safety-center" target="_blank">
                                  {t("Safety center")}
                                </Link>{" "}
                                {t("to read safety tips.")}
                              </p>
                              <div class="view_profile_btn visiterbtn ">
                                {data.status == 1 ? (
                                  new Date(
                                    list && list[0] && list[0].created_at
                                  ).getMonth() < new Date().getMonth() ? (
                                    <Link
                                      to={""}
                                      onClick={(e) => {
                                        setnoactive(true);
                                      }}
                                    >
                                      {t("Visit profile")}
                                    </Link>
                                  ) : (
                                    <Link
                                      to={"/profile-parents/" + data.user_id}
                                    >
                                      {t("Visit profile")}
                                    </Link>
                                  )
                                ) : data.status == 2 || status == 2 ? (
                                  <Link
                                    to={""}
                                    style={
                                      data.status == 2 || status == 2
                                        ? { opacity: "0.5" }
                                        : {}
                                    }
                                  >
                                    {t("Accept and visit profile")}
                                  </Link>
                                ) : (
                                  <Link
                                    to={""}
                                    disabled={
                                      data.status == 2 || status == 2
                                        ? true
                                        : false
                                    }
                                    style={
                                      data.status == 2 || status == 2
                                        ? { opacity: "0.5" }
                                        : {}
                                    }
                                    onClick={(e) => {
                                      localStorage.removeItem("search");
                                      localStorage.removeItem("search2");
                                      setdelete2(true);
                                    }}
                                  >
                                    {t("Accept and visit profile")}
                                  </Link>
                                )}
                                {data.status == 1 ? (
                                  <a onClick={(e) => setview(data.user_id)}>
                                    {"Send message"}
                                  </a>
                                ) : (
                                  <a
                                    style={
                                      data.status == 2 || status == 2
                                        ? { opacity: "0.5" }
                                        : {}
                                    }
                                    onClick={(e) => {
                                      data.status == 2 || status == 2
                                        ? setdelete(false)
                                        : setdelete(true);
                                    }}
                                    disabled={
                                      data.status == 2 || status == 2
                                        ? true
                                        : false
                                    }
                                  >
                                    {status == 2 || data.status == 2
                                      ? "Declined"
                                      : "Decline"}
                                  </a>
                                )}
                                <br />
                                <Link
                                  to="/search-parents"
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    color: "#7D2B8B",
                                    fontSize: "17px",
                                    width: "100%",
                                    marginLeft: "0",
                                    padding: "5px 0",
                                  }}
                                >
                                  {" "}
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M11.6942 12.8252C10.4625 13.8106 8.9 14.3998 7.19991 14.3998C3.22351 14.3998 0 11.1763 0 7.19991C0 3.22351 3.22351 0 7.19991 0C11.1763 0 14.3998 3.22351 14.3998 7.19991C14.3998 8.8998 13.8107 10.4621 12.8255 11.6938L15.7661 14.6343C16.0785 14.9467 16.0785 15.4533 15.7661 15.7657C15.4537 16.0781 14.9471 16.0781 14.6347 15.7657L11.6942 12.8252ZM1.59998 7.19991C1.59998 4.10715 4.10715 1.59998 7.19991 1.59998C10.2927 1.59998 12.7998 4.10715 12.7998 7.19991C12.7998 8.70993 12.2022 10.0804 11.2305 11.0875C11.2042 11.108 11.1789 11.1302 11.1548 11.1544C11.1306 11.1785 11.1083 11.2039 11.0879 11.2302C10.0807 12.202 8.7101 12.7998 7.19991 12.7998C4.10715 12.7998 1.59998 10.2927 1.59998 7.19991Z"
                                      fill="#7D2B8B"
                                    />
                                    <circle
                                      cx="7.19948"
                                      cy="7.20144"
                                      r="5.59987"
                                      fill="white"
                                    />
                                  </svg>{" "}
                                  {t("Search for similar jobs")}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {view != "" ? (
        <div class="main-header">
          {/* <button onClick={e => setview("")}><svg width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM17 3.5L1 3.5V4.5L17 4.5V3.5Z" fill="#A98D4B" />
                        </svg> Back</button> */}
          <Message_chet id={view} setview={setview} />
        </div>
      ) : (
        ""
      )}
      {reviewmodel ? (
        <Modal show={reviewmodel} onHide={(e) => setreviewmodel(false)}>
          <Modal.Body>
            <Send_review
              setrequest={setreviewmodel}
              slugdata={list && list[0] && list[0].user_id}
              username={
                list &&
                list[0] &&
                list[0].first_name + " " + list &&
                list[0] &&
                list[0].last_name
              }
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {delete1 ? (
        <Modal show={delete1} onHide={(e) => setdelete(false)} className="">
          <Modal.Body>
            <div className="promocode_content upload_document_delete">
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.1304 0L10.5631 0.747414L19.8263 16.7474L20.2608 17.4979H19.3935H0.867224H0L0.434511 16.7474L9.69767 0.747414L10.1304 0ZM18.5263 16.4979L10.1304 1.99586L1.73445 16.4979H18.5263ZM10.9724 14.4717H9.28818V12.7875H10.9724V14.4717ZM9.28818 11.1035H10.9724V7.73506H9.28818V11.1035Z"
                  fill="#7D2B8B"
                />
              </svg>
              <h2>{t("Decline an Interview invite")}</h2>

              <div className="gray">
                <p style={{ borderBottom: "1px solid #B7B7B7" }}>
                  <span>{t("Important!")}</span>{" "}
                  <b>
                    {t(
                      "If you decline an invite, it might lead to fewer invites in the future."
                    )}
                  </b>
                </p>
                <p>
                  {t("Are you sure you want to decline an interview invite?")}
                </p>
                <button
                  onClick={(e) => {
                    setshowflogin(true);
                    accept("2");
                  }}
                >
                  {t("Yes")}
                </button>
                <button onClick={(e) => setdelete(false)}>{t("No")}</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {delete21 ? (
        <Modal show={delete21} onHide={(e) => setdelete2(false)} className="">
          <Modal.Body>
            <div className="promocode_content upload_document_delete acceptinterview">
              <h2>{t("Accept an Interview invite")}</h2>
              <p>{t("Are you sure you want to accept an invite?")}</p>
              <button onClick={(e) => setdelete2(false)}>{t("Decline")}</button>
              <button onClick={(e) => accept("1")}>
                <Link to={"/profile-parents/" + list[0].user_id}>
                  {t("Accept")}
                </Link>
              </button>
              <div className="gray">
                <p>
                  {t("Please visit our ")}
                  <Link to="/faq" target="_blank">
                    {t("FAQS")}
                  </Link>{" "}
                  {t("pages and")}{" "}
                  <Link to="/safety-center" target="_blank">
                    {t("Safety center")}
                  </Link>{" "}
                  {t("to read our safety tips and prepare for the interview.")}
                </p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      <Modal show={showflogin} onHide={(e) => setshowflogin(false)}>
        <Modal.Body>
          <div className="promocode_content login_first search_pop">
            <Link to="" onClick={(e) => setshowflogin(false)}>
              +{" "}
            </Link>
            <h2>{t("We are sorry you didn’t like this job.")}</h2>
            <img src={window.location.origin + "/images/return.png"} />
            <p style={{ color: "#7D2B8B" }}>
              {t("Search other posts and find your perfect job.")}
            </p>
            <button onClick={(e) => setshowflogin(false)}>
              <Link to={"/search-parents"}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.156 14.4283C11.7703 15.5369 10.0125 16.1998 8.0999 16.1998C3.62645 16.1998 0 12.5733 0 8.0999C0 3.62645 3.62645 0 8.0999 0C12.5733 0 16.1998 3.62645 16.1998 8.0999C16.1998 10.0123 15.5371 11.7699 14.4287 13.1555L17.7368 16.4636C18.0883 16.8151 18.0883 17.3849 17.7368 17.7364C17.3854 18.0879 16.8155 18.0879 16.4641 17.7364L13.156 14.4283ZM1.79998 8.0999C1.79998 4.62055 4.62055 1.79998 8.0999 1.79998C11.5792 1.79998 14.3998 4.62055 14.3998 8.0999C14.3998 9.79867 13.7274 11.3404 12.6343 12.4735C12.6047 12.4964 12.5763 12.5215 12.5491 12.5487C12.5219 12.5759 12.4969 12.6043 12.4739 12.6339C11.3408 13.7273 9.79887 14.3998 8.0999 14.3998C4.62055 14.3998 1.79998 11.5792 1.79998 8.0999Z"
                    fill="white"
                  />
                </svg>{" "}
                {t("Search jobs")}
              </Link>
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={update} onHide={(e) => setupdate(false)}>
        <Modal.Body>
          <div className="promocode_content login_first search_pop upgd">
            <Link to="" onClick={(e) => setupdate(false)}>
              +{" "}
            </Link>
            <h2>
              {t(
                "Please upgrade your account to access full benefits on SensCare"
              )}
            </h2>
            <img src={window.location.origin + "/images/promo.png"} />
            <p>
              {t(
                "When you upgrade your account it will enable you to connect with other members via our message center, send and receive interview invites, apply for jobs and much more."
              )}
            </p>
            <button onClick={(e) => setupdate(false)} className={"ruf"}>
              <Link to={""}> {t("Maybe later")}</Link>
            </button>
            <button onClick={(e) => setupdate(false)}>
              <Link
                to={""}
                // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank"
              >
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4375 12.25H3.0625C2.82187 12.25 2.625 12.4469 2.625 12.6875V13.5625C2.625 13.8031 2.82187 14 3.0625 14H14.4375C14.6781 14 14.875 13.8031 14.875 13.5625V12.6875C14.875 12.4469 14.6781 12.25 14.4375 12.25ZM16.1875 3.5C15.4629 3.5 14.875 4.08789 14.875 4.8125C14.875 5.00664 14.9187 5.18711 14.9953 5.35391L13.0156 6.54063C12.5945 6.79219 12.0504 6.65 11.807 6.22344L9.57851 2.32422C9.87109 2.08359 10.0625 1.72266 10.0625 1.3125C10.0625 0.587891 9.47461 0 8.75 0C8.02539 0 7.4375 0.587891 7.4375 1.3125C7.4375 1.72266 7.62891 2.08359 7.92148 2.32422L5.69297 6.22344C5.44961 6.65 4.90273 6.79219 4.48437 6.54063L2.50742 5.35391C2.58125 5.18984 2.62773 5.00664 2.62773 4.8125C2.62773 4.08789 2.03984 3.5 1.31523 3.5C0.590625 3.5 0 4.08789 0 4.8125C0 5.53711 0.587891 6.125 1.3125 6.125C1.38359 6.125 1.45469 6.11406 1.52305 6.10313L3.5 11.375H14L15.977 6.10313C16.0453 6.11406 16.1164 6.125 16.1875 6.125C16.9121 6.125 17.5 5.53711 17.5 4.8125C17.5 4.08789 16.9121 3.5 16.1875 3.5Z"
                    fill="#7D2B8B"
                  />
                </svg>{" "}
                {t("Upgrade now")}
              </Link>
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={noactive} onHide={(e) => setnoactive(false)}>
        <Modal.Body>
          <div className="promocode_content login_first search_pop">
            <Link to="" onClick={(e) => setnoactive(false)}>
              +{" "}
            </Link>
            <h2>{t("Profile not found")}</h2>
            <p>
              <span style={{ color: "#A98D4B" }}>
                {list && list[0] && list[0].first_name}{" "}
              </span>{" "}
              {t("has no longer an active profile with SensCare.")}
            </p>
            <button
              style={{ padding: "10px 14px" }}
              onClick={(e) => setnoactive(false)}
            >
              <Link to={"/search-parents"}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.156 14.4283C11.7703 15.5369 10.0125 16.1998 8.0999 16.1998C3.62645 16.1998 0 12.5733 0 8.0999C0 3.62645 3.62645 0 8.0999 0C12.5733 0 16.1998 3.62645 16.1998 8.0999C16.1998 10.0123 15.5371 11.7699 14.4287 13.1555L17.7368 16.4636C18.0883 16.8151 18.0883 17.3849 17.7368 17.7364C17.3854 18.0879 16.8155 18.0879 16.4641 17.7364L13.156 14.4283ZM1.79998 8.0999C1.79998 4.62055 4.62055 1.79998 8.0999 1.79998C11.5792 1.79998 14.3998 4.62055 14.3998 8.0999C14.3998 9.79867 13.7274 11.3404 12.6343 12.4735C12.6047 12.4964 12.5763 12.5215 12.5491 12.5487C12.5219 12.5759 12.4969 12.6043 12.4739 12.6339C11.3408 13.7273 9.79887 14.3998 8.0999 14.3998C4.62055 14.3998 1.79998 11.5792 1.79998 8.0999Z"
                    fill="white"
                  />
                </svg>{" "}
                {t("Find similar job posts")}
              </Link>
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Invite_detail;
