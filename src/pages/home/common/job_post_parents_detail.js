import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../urls";
import Modal from "react-bootstrap/Modal";
import Facebook_share from "./share_facebook";
import { useTranslation } from "react-i18next";

function Job_post_parents_detail(props) {
  const { t, i18n } = useTranslation("job-application");
  const navigate = useNavigate();
  const [list, setlist] = useState([]);
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
  const [delete1, setdelete] = useState(false);
  const [plink, setplink] = useState(true);
  const [message, setmessage] = useState("");
  const [jobpost, setjobpost] = useState(false);
  const [edit, setedit] = useState({
    plateformonsocialmedia: "",
    job_type: "",
    title: "",
    description: "",
  });
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
  const handleClose5 = () => {
    setjobpost(false);
  };
  const profile_data = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      job_id: JSON.parse(props.id),
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/jobdetailsview", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setlist([result.data.jobData]);
        // setmessage(result.data.currentUserName)
        setedit({
          plateformonsocialmedia: result.data.jobData.plateformonsocialmedia,
          job_type: result.data.jobData.job_type,
          title: result.data.jobData.title,
          description: result.data.jobData.description,
        });
        console.log(result, JSON.parse(props.id));
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (check) {
      profile_data();
      setcheck(false);
    }
    console.log(edit);
  }, [check, edit]);

  const accept = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      job_id: JSON.parse(props.id),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/jobstatusupdate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setdelete(false);
        profile_data();
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  const editpost = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      job_id: JSON.parse(props.id),
      plateformonsocialmedia: edit.plateformonsocialmedia,
      job_type: list[0].job_type,
      title: edit.title,
      description: edit.description,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/updatejob", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        handleClose5();
        window.location.reload();
        profile_data();
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      {list && list[0] ? (
        <>
          <h2 className="border"></h2>
          <div className="detail_invit bbnone">
            <p>
              {list && list[0] && list[0].read_status == 0 ? (
                <span className="new">{t("NEW!")}</span>
              ) : (
                ""
              )}
              {t("Your Job Post")}{" "}
              <span
                className="date"
                style={{
                  display: "inherit",
                  width: "auto",
                  position: "inherit",
                }}
              >
                {t("You created it on")}{" "}
                {month[
                  new Date(list && list[0] && list[0].jobcreated_at).getMonth()
                ] +
                  " " +
                  new Date(list && list[0] && list[0].jobcreated_at).getDate()}
                ,{" "}
                {new Date(
                  list && list[0] && list[0].jobcreated_at
                ).getFullYear()}
                ,{" "}
                {new Date(
                  list && list[0] && list[0].jobcreated_at
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>
          <div class="right_side_section">
            <div class="looking_for_candidate">
              {list.map((data, index) => {
                return data.jobStatus == 0 ? (
                  <div class={"looking_for_candidate_boxs"}>
                    <div class="looking_for_candidate_box">
                      <div class="first_sec">
                        <div class="image_sec">
                          <img
                            src={
                              data.file_path != null
                                ? api +
                                  "/public/assets/images/users/" +
                                  data.file_path
                                : window.location.origin + "/img/nany_img.png"
                            }
                            alt=""
                          />
                          <div class="heart_sec">
                            <img
                              src={
                                window.location.origin + "/images/img_heart.svg"
                              }
                              alt=""
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
                                window.location.origin + "/images/nany_cont.svg"
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
                        </div>
                      </div>
                      <div class="second_sec">
                        <div class="heading">
                          <h3>{data.title != null ? data.title : ""}</h3>
                          {data.plateformonsocialmedia == "Yes" ? (
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
                          <p className="stars_profile">
                            {data.reviewAvg >= 0 ? (
                              <>
                                {[...Array(data.reviewAvg)].map(
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
                                {[...Array(5 - data.reviewAvg)].map(
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
                            <span> ({data.reviewcount})</span>
                          </p>
                        </div>
                        <div class="post_detail">
                          <div class="post">
                            {data.job_type != null ? (
                              data.job_type == "Nanny" ? (
                                <img
                                  src={
                                    window.location.origin +
                                    "/images/nany_post.svg"
                                  }
                                  alt=""
                                />
                              ) : data.job_type ==
                                "Special Education Teacher" ? (
                                <img
                                  src={
                                    window.location.origin +
                                    "/images/teacher_post.svg"
                                  }
                                  alt=""
                                />
                              ) : data.job_type ==
                                "Special Education Paraprofessional" ? (
                                <img
                                  src={
                                    window.location.origin +
                                    "/images/education_post.svg"
                                  }
                                  alt=""
                                />
                              ) : data.job_type == "Tutor" ? (
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
                              {data.job_type != null ? t(data.job_type) : ""}
                            </h5>
                          </div>
                          <div class="vi"></div>

                          <div class="post_pay">
                            <img
                              src={window.location.origin + "/img/post_pay.png"}
                              alt=""
                            />
                            {profile && profile.country == "Serbia" ? (
                              <h5>
                                {data.nanyperhrrate != null
                                  ? data.nanyperhrrate
                                      .substr(
                                        data.nanyperhrrate.lastIndexOf("\\") + 1
                                      )
                                      .split("-")[0] *
                                      100 +
                                    " - " +
                                    data.nanyperhrrate
                                      .substr(
                                        data.nanyperhrrate.lastIndexOf("\\") + 1
                                      )
                                      .split("-")[1] *
                                      100
                                  : data.tutorperhrrate
                                  ? data.tutorperhrrate
                                      .substr(
                                        data.tutorperhrrate.lastIndexOf("\\") +
                                          1
                                      )
                                      .split("-")[0] *
                                      100 +
                                    " - " +
                                    data.tutorperhrrate
                                      .substr(
                                        data.tutorperhrrate.lastIndexOf("\\") +
                                          1
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
                                window.location.origin + "/images/post_fet.svg"
                              }
                              alt=""
                            />
                            <h5>
                              {data.tutorintrestedin != null
                                ? t(data.tutorintrestedin)
                                : ""}
                            </h5>
                          </div>
                          <div class="vi"></div>
                          <div class="post_cal">
                            <img
                              src={
                                window.location.origin + "/images/post_cal.svg"
                              }
                              alt=""
                            />
                            <h5>
                              {data.tutorstartdate != null
                                ? data.tutorstartdate
                                : ""}
                            </h5>
                          </div>
                          <div class="vi"></div>
                          <div class="post_loc">
                            <img
                              src={
                                window.location.origin + "/images/post_loc.svg"
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
                          {data.description != null
                            ? data.description.substr(0, 100)
                            : ""}{" "}
                          {data.description != null &&
                          data.description.length > 100 ? (
                            <span
                              onClick={(e) => {
                                setplink(true);
                                pmore(
                                  "half" + index,
                                  "full" + index,
                                  "plink" + index
                                );
                              }}
                            >
                              {t("...more")}
                            </span>
                          ) : (
                            ""
                          )}{" "}
                        </p>

                        <p id={"full" + index} className="hide">
                          {data.description}{" "}
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

                      <div
                        class="view_profile_btn brownntn"
                        style={{
                          float: "right",
                          width: "100%",
                          textAlign: "right",
                          display: "block",
                        }}
                      >
                        <button
                          style={{ marginRight: "6px" }}
                          onClick={(e) => setdelete(true)}
                        >
                          {t("Close this Job")}
                        </button>
                        <button onClick={(e) => setjobpost(true)}>
                          {t("Edit post")}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div class={"looking_for_candidate_boxs graydata"}>
                    <div class="looking_for_candidate_box">
                      <div class="first_sec">
                        <div class="image_sec">
                          <img
                            src={
                              data.file_path != null
                                ? api +
                                  "/public/assets/images/users/" +
                                  data.file_path
                                : "img/nany_img.png"
                            }
                            alt=""
                          />
                          <div class="heart_sec">
                            <svg
                              width="16"
                              height="14"
                              viewBox="0 0 16 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.6276 0.342582C10.1734 0.116411 10.7585 0 11.3493 0C11.9402 0 12.5253 0.116411 13.0711 0.342582C13.6168 0.568711 14.1127 0.90013 14.5303 1.31791C14.9481 1.73556 15.2798 2.23164 15.5059 2.77738C15.7321 3.32322 15.8485 3.90828 15.8485 4.49913C15.8485 5.08997 15.7321 5.67503 15.5059 6.22087C15.2797 6.76667 14.9483 7.26256 14.5305 7.68023C14.5304 7.68027 14.5305 7.68019 14.5305 7.68023L8.41336 13.7973C8.14312 14.0676 7.70499 14.0676 7.43475 13.7973L1.31766 7.68023C0.473975 6.83655 0 5.69227 0 4.49913C0 3.30598 0.473975 2.16171 1.31766 1.31803C2.16134 0.474345 3.30561 0.000370052 4.49876 0.000370052C5.6919 0.000370052 6.83618 0.474345 7.67986 1.31803L7.92405 1.56222L8.16813 1.31814C8.16817 1.3181 8.1681 1.31818 8.16813 1.31814C8.5858 0.900306 9.08181 0.568732 9.6276 0.342582ZM11.3493 1.38396C10.9403 1.38396 10.5353 1.46455 10.1574 1.62113C9.77948 1.77771 9.43614 2.00721 9.14697 2.29652L8.41336 3.03013C8.14312 3.30036 7.70499 3.30036 7.43475 3.03013L6.70125 2.29663C6.11711 1.71249 5.32485 1.38433 4.49876 1.38433C3.67266 1.38433 2.8804 1.71249 2.29626 2.29663C1.71212 2.88077 1.38396 3.67303 1.38396 4.49913C1.38396 5.32522 1.71212 6.11749 2.29626 6.70162L7.92405 12.3294L13.5518 6.70162C13.8412 6.41245 14.0708 6.069 14.2273 5.6911C14.3839 5.31321 14.4645 4.90817 14.4645 4.49913C14.4645 4.09008 14.3839 3.68504 14.2273 3.30715C14.0708 2.92926 13.8413 2.58592 13.552 2.29675C13.2628 2.00744 12.9192 1.77771 12.5413 1.62113C12.1634 1.46455 11.7584 1.38396 11.3493 1.38396Z"
                                fill="#A98D4B"
                              />
                            </svg>
                          </div>
                        </div>
                        <div class="nany_social">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z"
                              fill="#A98D4B"
                            />
                          </svg>
                          <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.6969 3.9625C15.8187 3.86563 16 3.95625 16 4.10938V10.5C16 11.3281 15.3281 12 14.5 12H1.5C0.671875 12 0 11.3281 0 10.5V4.1125C0 3.95625 0.178125 3.86875 0.303125 3.96562C1.00312 4.50937 1.93125 5.2 5.11875 7.51562C5.77812 7.99687 6.89062 9.00938 8 9.00313C9.11562 9.0125 10.25 7.97813 10.8844 7.51562C14.0719 5.2 14.9969 4.50625 15.6969 3.9625ZM8 8C8.725 8.0125 9.76875 7.0875 10.2937 6.70625C14.4406 3.69688 14.7562 3.43437 15.7125 2.68437C15.8937 2.54375 16 2.325 16 2.09375V1.5C16 0.671875 15.3281 0 14.5 0H1.5C0.671875 0 0 0.671875 0 1.5V2.09375C0 2.325 0.10625 2.54062 0.2875 2.68437C1.24375 3.43125 1.55938 3.69688 5.70625 6.70625C6.23125 7.0875 7.275 8.0125 8 8Z"
                              fill="#A98D4B"
                            />
                          </svg>
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
                              fill="#A98D4B"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="second_sec">
                        <div class="heading">
                          <h3>{data.title != null ? data.title : ""}</h3>

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
                              d="M12.7072 10.2523C11.841 10.2528 11.0214 10.6445 10.477 11.3182L5.64755 8.90347C5.77548 8.41171 5.76698 7.89438 5.62296 7.40709L10.5426 4.74641C11.5004 5.85506 13.1396 6.06415 14.3451 5.23145C15.5506 4.39876 15.9353 2.79169 15.2374 1.50341C14.5396 0.215139 12.9834 -0.340625 11.6274 0.214168C10.2714 0.768961 9.55101 2.25615 9.9563 3.6641L5.0367 6.32478C4.2458 5.41389 2.96968 5.09486 1.84317 5.5264C0.716664 5.95794 -0.0197013 7.04791 0.000401531 8.25408C0.0205043 9.46025 0.792783 10.5251 1.93305 10.9188C3.07331 11.3126 4.33809 10.9512 5.0982 10.0145L9.92761 12.4292C9.62817 13.6178 10.1167 14.8654 11.1437 15.5346C12.1707 16.2038 13.5093 16.1468 14.4758 15.3928C15.4422 14.6388 15.823 13.3542 15.4236 12.1953C15.0243 11.0364 13.9329 10.2591 12.7072 10.2605V10.2523Z"
                              fill="#7D2B8B"
                            />
                          </svg>
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
                          <p className="stars_profile">
                            {data.reviewAvg >= 0 ? (
                              <>
                                {[...Array(data.reviewAvg)].map(
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
                                {[...Array(5 - data.reviewAvg)].map(
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
                                        className="blank_star"
                                      >
                                        <path
                                          d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z"
                                          stroke="#bbb "
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          fill="#fff"
                                        />
                                      </svg>
                                    );
                                  }
                                )}
                              </>
                            ) : (
                              ""
                            )}
                            <span> ({data.reviewcount})</span>
                          </p>
                        </div>
                        <div class="post_detail">
                          <div class="post">
                            {data.job_type != null ? (
                              data.job_type == "Nanny" ? (
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
                                    d="M6.62288 4.77497V0.608626C6.62288 0.241362 6.94799 -0.047633 7.30924 0.00655353C9.64527 0.337694 11.4394 2.34862 11.4394 4.77497H6.62288ZM11.4393 5.3769C11.4393 6.48471 11.06 7.50823 10.4279 8.32103C10.9818 8.81473 11.2768 9.5914 11.0661 10.4283C10.8734 11.1869 10.2472 11.789 9.48262 11.9515C8.23031 12.2164 7.10444 11.3615 6.94188 10.1935H5.68957C5.52701 11.3675 4.39512 12.2224 3.13077 11.9455C2.37216 11.7769 1.74601 11.1688 1.56538 10.4102C1.32456 9.40476 1.81223 8.46553 2.61299 8.03806C2.47451 7.82733 1.3366 5.3769 1.3366 5.3769H0.602071C0.270932 5.3769 0 5.10597 0 4.77483C0 4.4437 0.270932 4.17276 0.602071 4.17276H1.72192C1.95071 4.17276 2.16746 4.30522 2.26379 4.51594L2.6732 5.3769H11.4393ZM3.61283 10.7954C3.11311 10.7954 2.70973 10.392 2.70973 9.89226C2.70973 9.39254 3.11311 8.98915 3.61283 8.98915C4.11255 8.98915 4.51594 9.39254 4.51594 9.89226C4.51594 10.392 4.11255 10.7954 3.61283 10.7954ZM8.12738 9.89226C8.12738 10.392 8.53077 10.7954 9.03049 10.7954C9.5302 10.7954 9.93359 10.392 9.93359 9.89226C9.93359 9.39254 9.5302 8.98915 9.03049 8.98915C8.53077 8.98915 8.12738 9.39254 8.12738 9.89226Z"
                                    fill="#A98D4B"
                                  />
                                </svg>
                              ) : data.job_type ==
                                "Special Education Teacher" ? (
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 70 70"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M51.3966 37.3731C48.8738 37.3731 47.7812 39.2928 46.4105 39.2928C42.7662 39.2928 46.0833 28.5835 46.0833 28.5835C46.0833 28.5835 34.1561 33.4446 34.1561 28.3832C34.1561 26.2062 36.3611 25.5728 36.3611 23.1584C36.3611 21.0011 34.6527 19.8335 32.6265 19.8335C30.5208 19.8335 28.5938 20.9814 28.5938 23.2573C28.5938 25.7707 30.5207 26.8592 30.5207 28.2247C30.5208 32.4553 19.8333 29.9664 19.8333 29.9664V50.2151C19.8333 50.2151 30.6879 52.7093 30.6879 48.4735C30.6879 47.108 28.2573 46.0365 28.2573 43.523C28.2573 41.2471 30.0347 40.0992 32.1205 40.0992C34.1666 40.0992 35.875 41.2669 35.875 43.424C35.875 45.8385 33.67 46.4718 33.67 48.6488C33.67 52.3435 41.5495 50.2123 44.6822 50.2123C44.6822 50.2123 42.5722 42.9145 46.2516 42.9145C48.4368 42.9145 49.0724 45.1112 51.496 45.1112C53.6613 45.1113 54.8333 43.4093 54.8333 41.3708C54.8333 39.2928 53.6811 37.3731 51.3966 37.3731Z"
                                    fill="#A98D4B"
                                  />
                                </svg>
                              ) : data.job_type ==
                                "Special Education Paraprofessional" ? (
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 70 70"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M34.85 18C33.1379 18 31.75 19.3879 31.75 21.1C31.75 22.8121 33.1379 24.2 34.85 24.2C36.5621 24.2 37.95 22.8121 37.95 21.1C37.95 19.3879 36.5621 18 34.85 18ZM45.6999 33.3449C45.6999 32.5854 45.1419 31.9654 44.3979 31.8414C42.4604 31.5159 40.6315 30.4774 39.3915 29.1135L37.392 26.897C37.1285 26.6025 36.803 26.37 36.4465 26.1995C36.4387 26.1995 36.4349 26.1956 36.431 26.1917C36.4271 26.1878 36.4232 26.184 36.4155 26.184H36.4C35.8265 25.8585 35.191 25.7035 34.4625 25.7965C32.8815 25.9825 31.75 27.4085 31.75 29.005V38.1499C31.75 39.8549 33.145 41.2499 34.85 41.2499H42.5999V47.4499C42.5999 48.3024 43.2974 48.9999 44.1499 48.9999C45.0024 48.9999 45.6999 48.3024 45.6999 47.4499V40.4749C45.6999 38.7699 44.3049 37.3749 42.5999 37.3749H37.95V32.0274C39.5 33.3139 41.67 34.4144 43.8399 34.8484C44.8009 35.0499 45.6999 34.3214 45.6999 33.3449ZM31.75 45.9C33.7805 45.9 35.5009 44.598 36.1364 42.8H39.3449C38.6319 46.334 35.5009 49 31.75 49C27.472 49 24 45.528 24 41.25C24 37.499 26.666 34.368 30.2 33.655V36.8635C28.402 37.5145 27.1 39.2195 27.1 41.25C27.1 43.823 29.177 45.9 31.75 45.9Z"
                                    fill="#A98D4B"
                                  />
                                </svg>
                              ) : data.job_type == "Tutor" ? (
                                <svg
                                  width="28"
                                  height="28"
                                  viewBox="0 0 70 70"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M49.154 30.3523L35.4881 24.1236C35.1302 23.9588 34.7397 23.9588 34.4143 24.1236L20.7484 30.3523C20.2928 30.55 20 31.0114 20 31.5057C20 32.0001 20.3254 32.4615 20.7809 32.6921L21.9523 33.2524V37.8663C21.9523 38.3277 22.3102 38.6902 22.7657 38.6902C23.2213 38.6902 23.5792 38.3277 23.5792 37.8663V34.1422L25.5315 35.1968V40.7993C25.5315 41.03 25.5965 41.2278 25.7267 41.4255C25.8568 41.6233 28.8178 46.1053 34.8048 46.1053C40.9544 46.1053 43.7852 41.5903 43.9154 41.4255C44.013 41.2608 44.1106 41.0301 44.1106 40.8323V35.4275L49.2842 32.7581C49.7397 32.5274 50 32.066 50 31.5716C49.9349 31.0114 49.6095 30.583 49.154 30.3523ZM41.8004 40.4369C41.1497 41.2278 38.9371 43.7984 34.8048 43.7984C30.7701 43.7984 28.4599 41.2608 27.8091 40.4369V36.3832L34.3818 39.7777C34.577 39.8766 34.7722 39.9095 34.9675 39.9095C35.1627 39.9095 35.3905 39.8766 35.5857 39.7777L41.8004 36.5809V40.4369ZM34.9675 37.1083L24.295 31.6376L34.9675 26.7601L45.6399 31.6376L34.9675 37.1083ZM23.5792 39.8436C23.8069 40.0743 23.9696 40.4369 23.9696 40.7664C23.9696 41.096 23.8395 41.4584 23.5792 41.6891C23.3514 41.9198 22.9935 42.0847 22.6681 42.0847C22.3427 42.0847 21.9848 41.9528 21.757 41.6891C21.5293 41.4584 21.3666 41.096 21.3666 40.7664C21.3666 40.4369 21.4967 40.0743 21.757 39.8436C21.9848 39.6129 22.3427 39.4482 22.6681 39.4482C22.9935 39.4482 23.3189 39.58 23.5792 39.8436Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M49.154 30.3523L35.4881 24.1236C35.1302 23.9588 34.7397 23.9588 34.4143 24.1236L20.7484 30.3523C20.2928 30.55 20 31.0114 20 31.5057C20 32.0001 20.3254 32.4615 20.7809 32.6921L21.9523 33.2524V37.8663C21.9523 38.3277 22.3102 38.6902 22.7657 38.6902C23.2213 38.6902 23.5792 38.3277 23.5792 37.8663V34.1422L25.5315 35.1968V40.7993C25.5315 41.03 25.5965 41.2278 25.7267 41.4255C25.8568 41.6233 28.8178 46.1053 34.8048 46.1053C40.9544 46.1053 43.7852 41.5903 43.9154 41.4255C44.013 41.2608 44.1106 41.0301 44.1106 40.8323V35.4275L49.2842 32.7581C49.7397 32.5274 50 32.066 50 31.5716C49.9349 31.0114 49.6095 30.583 49.154 30.3523ZM41.8004 40.4369C41.1497 41.2278 38.9371 43.7984 34.8048 43.7984C30.7701 43.7984 28.4599 41.2608 27.8091 40.4369V36.3832L34.3818 39.7777C34.577 39.8766 34.7722 39.9095 34.9675 39.9095C35.1627 39.9095 35.3905 39.8766 35.5857 39.7777L41.8004 36.5809V40.4369ZM34.9675 37.1083L24.295 31.6376L34.9675 26.7601L45.6399 31.6376L34.9675 37.1083ZM23.5792 39.8436C23.8069 40.0743 23.9696 40.4369 23.9696 40.7664C23.9696 41.096 23.8395 41.4584 23.5792 41.6891C23.3514 41.9198 22.9935 42.0847 22.6681 42.0847C22.3427 42.0847 21.9848 41.9528 21.757 41.6891C21.5293 41.4584 21.3666 41.096 21.3666 40.7664C21.3666 40.4369 21.4967 40.0743 21.757 39.8436C21.9848 39.6129 22.3427 39.4482 22.6681 39.4482C22.9935 39.4482 23.3189 39.58 23.5792 39.8436Z"
                                    fill="#A98D4B"
                                  />
                                </svg>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                            <h5>
                              {data.job_type != null ? t(data.job_type) : ""}
                            </h5>
                          </div>
                          <div class="vi"></div>

                          <div class="post_pay">
                            <svg
                              width="14"
                              height="12"
                              viewBox="0 0 14 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.3536 2.57143H2.14286C1.90607 2.57143 1.71429 2.37964 1.71429 2.14286C1.71429 1.90607 1.90607 1.71429 2.14286 1.71429H12.4286C12.6654 1.71429 12.8571 1.5225 12.8571 1.28571C12.8571 0.575625 12.2815 0 11.5714 0H1.71429C0.767411 0 0 0.767411 0 1.71429V10.2857C0 11.2326 0.767411 12 1.71429 12H12.3536C13.1041 12 13.7143 11.4233 13.7143 10.7143V3.85714C13.7143 3.14812 13.1041 2.57143 12.3536 2.57143ZM11.1429 8.14286C10.6696 8.14286 10.2857 7.75902 10.2857 7.28571C10.2857 6.81241 10.6696 6.42857 11.1429 6.42857C11.6162 6.42857 12 6.81241 12 7.28571C12 7.75902 11.6162 8.14286 11.1429 8.14286Z"
                                fill="#A98D4B"
                              />
                            </svg>
                            {profile && profile.country == "Serbia" ? (
                              <h5>
                                {data.nanyperhrrate != null
                                  ? data.nanyperhrrate
                                      .substr(
                                        data.nanyperhrrate.lastIndexOf("\\") + 1
                                      )
                                      .split("-")[0] *
                                      100 +
                                    " - " +
                                    data.nanyperhrrate
                                      .substr(
                                        data.nanyperhrrate.lastIndexOf("\\") + 1
                                      )
                                      .split("-")[1] *
                                      100
                                  : data.tutorperhrrate
                                  ? data.tutorperhrrate
                                      .substr(
                                        data.tutorperhrrate.lastIndexOf("\\") +
                                          1
                                      )
                                      .split("-")[0] *
                                      100 +
                                    " - " +
                                    data.tutorperhrrate
                                      .substr(
                                        data.tutorperhrrate.lastIndexOf("\\") +
                                          1
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
                            <svg
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.14287 5.71429H11.4286V8.92857C11.4286 9.52031 10.9489 10 10.3572 10H1.07143C0.479688 10 0 9.52031 0 8.92857V5.71429H4.28572V6.16071C4.28572 6.30864 4.40566 6.42857 4.55358 6.42857H6.87501C7.02294 6.42857 7.14287 6.30864 7.14287 6.16071V5.71429ZM11.4286 3.21429V5H0V3.21429C0 2.62254 0.479688 2.14286 1.07143 2.14286H2.85715V1.07143C2.85715 0.479688 3.33684 0 3.92858 0H7.50001C8.09176 0 8.57144 0.479688 8.57144 1.07143V2.14286H10.3572C10.9489 2.14286 11.4286 2.62254 11.4286 3.21429ZM7.14287 1.42857H4.28572V2.14286H7.14287V1.42857Z"
                                fill="#A98D4B"
                              />
                            </svg>
                            <h5>
                              {data.tutorintrestedin != null
                                ? t(data.tutorintrestedin)
                                : ""}
                            </h5>
                          </div>
                          <div class="vi"></div>
                          <div class="post_cal">
                            <svg
                              width="13"
                              height="14"
                              viewBox="0 0 13 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.9219 4.375H0.328125C0.147656 4.375 0 4.22734 0 4.04688V3.0625C0 2.33789 0.587891 1.75 1.3125 1.75H2.625V0.328125C2.625 0.147656 2.77266 0 2.95312 0H4.04688C4.22734 0 4.375 0.147656 4.375 0.328125V1.75H7.875V0.328125C7.875 0.147656 8.02266 0 8.20312 0H9.29688C9.47734 0 9.625 0.147656 9.625 0.328125V1.75H10.9375C11.6621 1.75 12.25 2.33789 12.25 3.0625V4.04688C12.25 4.22734 12.1023 4.375 11.9219 4.375ZM0.328125 5.25H11.9219C12.1023 5.25 12.25 5.39766 12.25 5.57812V12.6875C12.25 13.4121 11.6621 14 10.9375 14H1.3125C0.587891 14 0 13.4121 0 12.6875V5.57812C0 5.39766 0.147656 5.25 0.328125 5.25ZM3.5 10.8281C3.5 10.6477 3.35234 10.5 3.17188 10.5H2.07812C1.89766 10.5 1.75 10.6477 1.75 10.8281V11.9219C1.75 12.1023 1.89766 12.25 2.07812 12.25H3.17188C3.35234 12.25 3.5 12.1023 3.5 11.9219V10.8281ZM3.5 7.32812C3.5 7.14766 3.35234 7 3.17188 7H2.07812C1.89766 7 1.75 7.14766 1.75 7.32812V8.42188C1.75 8.60234 1.89766 8.75 2.07812 8.75H3.17188C3.35234 8.75 3.5 8.60234 3.5 8.42188V7.32812ZM7 10.8281C7 10.6477 6.85234 10.5 6.67188 10.5H5.57812C5.39766 10.5 5.25 10.6477 5.25 10.8281V11.9219C5.25 12.1023 5.39766 12.25 5.57812 12.25H6.67188C6.85234 12.25 7 12.1023 7 11.9219V10.8281ZM7 7.32812C7 7.14766 6.85234 7 6.67188 7H5.57812C5.39766 7 5.25 7.14766 5.25 7.32812V8.42188C5.25 8.60234 5.39766 8.75 5.57812 8.75H6.67188C6.85234 8.75 7 8.60234 7 8.42188V7.32812ZM10.5 10.8281C10.5 10.6477 10.3523 10.5 10.1719 10.5H9.07812C8.89766 10.5 8.75 10.6477 8.75 10.8281V11.9219C8.75 12.1023 8.89766 12.25 9.07812 12.25H10.1719C10.3523 12.25 10.5 12.1023 10.5 11.9219V10.8281ZM10.5 7.32812C10.5 7.14766 10.3523 7 10.1719 7H9.07812C8.89766 7 8.75 7.14766 8.75 7.32812V8.42188C8.75 8.60234 8.89766 8.75 9.07812 8.75H10.1719C10.3523 8.75 10.5 8.60234 10.5 8.42188V7.32812Z"
                                fill="#A98D4B"
                              />
                            </svg>
                            <h5>
                              {data.tutorstartdate != null
                                ? data.tutorstartdate
                                : ""}
                            </h5>
                          </div>
                          <div class="vi"></div>
                          <div class="post_loc">
                            <svg
                              width="8"
                              height="10"
                              viewBox="0 0 8 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 3.59527C0 1.6076 1.6076 0 3.59527 0C5.58295 0 7.19055 1.6076 7.19055 3.59527C7.19055 5.73703 4.92039 8.69029 3.99075 9.8151C3.78531 10.0616 3.41037 10.0616 3.20493 9.8151C2.27016 8.69029 0 5.73703 0 3.59527ZM2.31125 3.59527C2.31125 4.30406 2.88649 4.8793 3.59527 4.8793C4.30406 4.8793 4.8793 4.30406 4.8793 3.59527C4.8793 2.88649 4.30406 2.31125 3.59527 2.31125C2.88649 2.31125 2.31125 2.88649 2.31125 3.59527Z"
                                fill="#A98D4B"
                              />
                            </svg>
                            <h5>
                              {data.country != null ? data.country : ""} ,{" "}
                              {data.city != null ? data.city : ""}
                            </h5>
                          </div>
                        </div>
                        <p id={"half" + index}>
                          {data.description != null
                            ? data.description.substr(0, 100)
                            : ""}{" "}
                          {data.description != null &&
                          data.description.length > 100 ? (
                            <span
                              onClick={(e) => {
                                setplink(true);
                                pmore(
                                  "half" + index,
                                  "full" + index,
                                  "plink" + index
                                );
                              }}
                            >
                              {t("more")}
                            </span>
                          ) : (
                            ""
                          )}{" "}
                        </p>

                        <p id={"full" + index} className="hide">
                          {data.description}{" "}
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

                      <div
                        class="view_profile_btn"
                        style={{
                          float: "right",
                          width: "100%",
                          textAlign: "right",
                          display: "block",
                        }}
                      >
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#ccc",
                            fontSize: "17px",
                          }}
                        >
                          {t("Closed")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="mobile">
                {list.map((data, index) => {
                  return data.jobStatus == 0 ? (
                    <div
                      class="looking_for_candidate_boxs"
                      style={{ display: "block" }}
                    >
                      <div class="looking_for_candidate_box">
                        <div class="second_sec">
                          <div class="heading">
                            <h3>{data.title != null ? data.title : ""}</h3>
                            {data.plateformonsocialmedia == "Yes" ? (
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
                            <p>
                              {data.reviewAvg >= 0 ? (
                                <>
                                  {[...Array(data.reviewAvg)].map(
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
                                  {[...Array(5 - data.reviewAvg)].map(
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
                              <span> ({data.reviewcount})</span>
                            </p>
                          </div>
                          <div class="post_detail">
                            <div class="post">
                              {data.job_type != null ? (
                                data.job_type == "Nanny" ? (
                                  <img
                                    src={
                                      window.location.origin +
                                      "/images/nany_post.svg"
                                    }
                                    alt=""
                                  />
                                ) : data.job_type ==
                                  "Special Education Teacher" ? (
                                  <img
                                    src={
                                      window.location.origin +
                                      "/images/teacher_post.svg"
                                    }
                                    alt=""
                                  />
                                ) : data.job_type ==
                                  "Special Education Paraprofessional" ? (
                                  <img
                                    src={
                                      window.location.origin +
                                      "/images/education_post.svg"
                                    }
                                    alt=""
                                  />
                                ) : data.job_type == "Tutor" ? (
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
                                {data.job_type != null
                                  ? data.job_type ==
                                    "Special Education Paraprofessional"
                                    ? t("SPED Paraprofessional")
                                    : data.job_type ==
                                      "Special Education Teacher"
                                    ? t("SPED teacher")
                                    : data.job_type
                                  : ""}
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
                                  ? t(data.nanyintrestedin)
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
                        </div>
                        <div class="first_sec">
                          <div class="image_sec">
                            <img
                              src={
                                data.file_path != null
                                  ? api +
                                    "/public/assets/images/users/" +
                                    data.file_path
                                  : "img/nany_img.png"
                              }
                              alt=""
                            />
                            <div class="heart_sec">
                              <img
                                src={
                                  window.location.origin +
                                  "/images/img_heart.svg"
                                }
                                alt=""
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
                            {/* <img src={window.location.origin + "/images/ok.svg"} alt="" /> */}
                          </div>
                        </div>
                        <div class="second_sec">
                          <p id={"half" + index}>
                            {data.description != null
                              ? data.description.substr(0, 100)
                              : ""}{" "}
                            {data.description != null &&
                            data.description.length > 100 ? (
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
                            {data.description}{" "}
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
                        <div class="view_profile_btn visiterbtn jobbtn brownntn">
                          <button onClick={(e) => setdelete(true)}>
                            {t("Close this Job")}
                          </button>
                          <button onClick={(e) => setjobpost(true)}>
                            {t("Edit post")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      class="looking_for_candidate_boxs graydata"
                      style={{ display: "block" }}
                    >
                      <div class="looking_for_candidate_box">
                        <div class="second_sec">
                          <div class="heading">
                            <h3>{data.title != null ? data.title : ""}</h3>

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
                                d="M12.7072 10.2523C11.841 10.2528 11.0214 10.6445 10.477 11.3182L5.64755 8.90347C5.77548 8.41171 5.76698 7.89438 5.62296 7.40709L10.5426 4.74641C11.5004 5.85506 13.1396 6.06415 14.3451 5.23145C15.5506 4.39876 15.9353 2.79169 15.2374 1.50341C14.5396 0.215139 12.9834 -0.340625 11.6274 0.214168C10.2714 0.768961 9.55101 2.25615 9.9563 3.6641L5.0367 6.32478C4.2458 5.41389 2.96968 5.09486 1.84317 5.5264C0.716664 5.95794 -0.0197013 7.04791 0.000401531 8.25408C0.0205043 9.46025 0.792783 10.5251 1.93305 10.9188C3.07331 11.3126 4.33809 10.9512 5.0982 10.0145L9.92761 12.4292C9.62817 13.6178 10.1167 14.8654 11.1437 15.5346C12.1707 16.2038 13.5093 16.1468 14.4758 15.3928C15.4422 14.6388 15.823 13.3542 15.4236 12.1953C15.0243 11.0364 13.9329 10.2591 12.7072 10.2605V10.2523Z"
                                fill="#7D2B8B"
                              />
                            </svg>
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
                            <p className="stars_profile">
                              {data.reviewAvg >= 0 ? (
                                <>
                                  {[...Array(data.reviewAvg)].map(
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
                                  {[...Array(5 - data.reviewAvg)].map(
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
                                          className="blank_star"
                                        >
                                          <path
                                            d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z"
                                            stroke="#bbb "
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            fill="#fff"
                                          />
                                        </svg>
                                      );
                                    }
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                              <span> ({data.reviewcount})</span>
                            </p>
                          </div>
                          <div class="post_detail">
                            <div class="post">
                              {data.job_type != null ? (
                                data.job_type == "Nanny" ? (
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
                                      d="M6.62288 4.77497V0.608626C6.62288 0.241362 6.94799 -0.047633 7.30924 0.00655353C9.64527 0.337694 11.4394 2.34862 11.4394 4.77497H6.62288ZM11.4393 5.3769C11.4393 6.48471 11.06 7.50823 10.4279 8.32103C10.9818 8.81473 11.2768 9.5914 11.0661 10.4283C10.8734 11.1869 10.2472 11.789 9.48262 11.9515C8.23031 12.2164 7.10444 11.3615 6.94188 10.1935H5.68957C5.52701 11.3675 4.39512 12.2224 3.13077 11.9455C2.37216 11.7769 1.74601 11.1688 1.56538 10.4102C1.32456 9.40476 1.81223 8.46553 2.61299 8.03806C2.47451 7.82733 1.3366 5.3769 1.3366 5.3769H0.602071C0.270932 5.3769 0 5.10597 0 4.77483C0 4.4437 0.270932 4.17276 0.602071 4.17276H1.72192C1.95071 4.17276 2.16746 4.30522 2.26379 4.51594L2.6732 5.3769H11.4393ZM3.61283 10.7954C3.11311 10.7954 2.70973 10.392 2.70973 9.89226C2.70973 9.39254 3.11311 8.98915 3.61283 8.98915C4.11255 8.98915 4.51594 9.39254 4.51594 9.89226C4.51594 10.392 4.11255 10.7954 3.61283 10.7954ZM8.12738 9.89226C8.12738 10.392 8.53077 10.7954 9.03049 10.7954C9.5302 10.7954 9.93359 10.392 9.93359 9.89226C9.93359 9.39254 9.5302 8.98915 9.03049 8.98915C8.53077 8.98915 8.12738 9.39254 8.12738 9.89226Z"
                                      fill="#A98D4B"
                                    />
                                  </svg>
                                ) : data.job_type ==
                                  "Special Education Teacher" ? (
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M51.3966 37.3731C48.8738 37.3731 47.7812 39.2928 46.4105 39.2928C42.7662 39.2928 46.0833 28.5835 46.0833 28.5835C46.0833 28.5835 34.1561 33.4446 34.1561 28.3832C34.1561 26.2062 36.3611 25.5728 36.3611 23.1584C36.3611 21.0011 34.6527 19.8335 32.6265 19.8335C30.5208 19.8335 28.5938 20.9814 28.5938 23.2573C28.5938 25.7707 30.5207 26.8592 30.5207 28.2247C30.5208 32.4553 19.8333 29.9664 19.8333 29.9664V50.2151C19.8333 50.2151 30.6879 52.7093 30.6879 48.4735C30.6879 47.108 28.2573 46.0365 28.2573 43.523C28.2573 41.2471 30.0347 40.0992 32.1205 40.0992C34.1666 40.0992 35.875 41.2669 35.875 43.424C35.875 45.8385 33.67 46.4718 33.67 48.6488C33.67 52.3435 41.5495 50.2123 44.6822 50.2123C44.6822 50.2123 42.5722 42.9145 46.2516 42.9145C48.4368 42.9145 49.0724 45.1112 51.496 45.1112C53.6613 45.1113 54.8333 43.4093 54.8333 41.3708C54.8333 39.2928 53.6811 37.3731 51.3966 37.3731Z"
                                      fill="#A98D4B"
                                    />
                                  </svg>
                                ) : data.job_type ==
                                  "Special Education Paraprofessional" ? (
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M34.85 18C33.1379 18 31.75 19.3879 31.75 21.1C31.75 22.8121 33.1379 24.2 34.85 24.2C36.5621 24.2 37.95 22.8121 37.95 21.1C37.95 19.3879 36.5621 18 34.85 18ZM45.6999 33.3449C45.6999 32.5854 45.1419 31.9654 44.3979 31.8414C42.4604 31.5159 40.6315 30.4774 39.3915 29.1135L37.392 26.897C37.1285 26.6025 36.803 26.37 36.4465 26.1995C36.4387 26.1995 36.4349 26.1956 36.431 26.1917C36.4271 26.1878 36.4232 26.184 36.4155 26.184H36.4C35.8265 25.8585 35.191 25.7035 34.4625 25.7965C32.8815 25.9825 31.75 27.4085 31.75 29.005V38.1499C31.75 39.8549 33.145 41.2499 34.85 41.2499H42.5999V47.4499C42.5999 48.3024 43.2974 48.9999 44.1499 48.9999C45.0024 48.9999 45.6999 48.3024 45.6999 47.4499V40.4749C45.6999 38.7699 44.3049 37.3749 42.5999 37.3749H37.95V32.0274C39.5 33.3139 41.67 34.4144 43.8399 34.8484C44.8009 35.0499 45.6999 34.3214 45.6999 33.3449ZM31.75 45.9C33.7805 45.9 35.5009 44.598 36.1364 42.8H39.3449C38.6319 46.334 35.5009 49 31.75 49C27.472 49 24 45.528 24 41.25C24 37.499 26.666 34.368 30.2 33.655V36.8635C28.402 37.5145 27.1 39.2195 27.1 41.25C27.1 43.823 29.177 45.9 31.75 45.9Z"
                                      fill="#A98D4B"
                                    />
                                  </svg>
                                ) : data.job_type == "Tutor" ? (
                                  <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M49.154 30.3523L35.4881 24.1236C35.1302 23.9588 34.7397 23.9588 34.4143 24.1236L20.7484 30.3523C20.2928 30.55 20 31.0114 20 31.5057C20 32.0001 20.3254 32.4615 20.7809 32.6921L21.9523 33.2524V37.8663C21.9523 38.3277 22.3102 38.6902 22.7657 38.6902C23.2213 38.6902 23.5792 38.3277 23.5792 37.8663V34.1422L25.5315 35.1968V40.7993C25.5315 41.03 25.5965 41.2278 25.7267 41.4255C25.8568 41.6233 28.8178 46.1053 34.8048 46.1053C40.9544 46.1053 43.7852 41.5903 43.9154 41.4255C44.013 41.2608 44.1106 41.0301 44.1106 40.8323V35.4275L49.2842 32.7581C49.7397 32.5274 50 32.066 50 31.5716C49.9349 31.0114 49.6095 30.583 49.154 30.3523ZM41.8004 40.4369C41.1497 41.2278 38.9371 43.7984 34.8048 43.7984C30.7701 43.7984 28.4599 41.2608 27.8091 40.4369V36.3832L34.3818 39.7777C34.577 39.8766 34.7722 39.9095 34.9675 39.9095C35.1627 39.9095 35.3905 39.8766 35.5857 39.7777L41.8004 36.5809V40.4369ZM34.9675 37.1083L24.295 31.6376L34.9675 26.7601L45.6399 31.6376L34.9675 37.1083ZM23.5792 39.8436C23.8069 40.0743 23.9696 40.4369 23.9696 40.7664C23.9696 41.096 23.8395 41.4584 23.5792 41.6891C23.3514 41.9198 22.9935 42.0847 22.6681 42.0847C22.3427 42.0847 21.9848 41.9528 21.757 41.6891C21.5293 41.4584 21.3666 41.096 21.3666 40.7664C21.3666 40.4369 21.4967 40.0743 21.757 39.8436C21.9848 39.6129 22.3427 39.4482 22.6681 39.4482C22.9935 39.4482 23.3189 39.58 23.5792 39.8436Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M49.154 30.3523L35.4881 24.1236C35.1302 23.9588 34.7397 23.9588 34.4143 24.1236L20.7484 30.3523C20.2928 30.55 20 31.0114 20 31.5057C20 32.0001 20.3254 32.4615 20.7809 32.6921L21.9523 33.2524V37.8663C21.9523 38.3277 22.3102 38.6902 22.7657 38.6902C23.2213 38.6902 23.5792 38.3277 23.5792 37.8663V34.1422L25.5315 35.1968V40.7993C25.5315 41.03 25.5965 41.2278 25.7267 41.4255C25.8568 41.6233 28.8178 46.1053 34.8048 46.1053C40.9544 46.1053 43.7852 41.5903 43.9154 41.4255C44.013 41.2608 44.1106 41.0301 44.1106 40.8323V35.4275L49.2842 32.7581C49.7397 32.5274 50 32.066 50 31.5716C49.9349 31.0114 49.6095 30.583 49.154 30.3523ZM41.8004 40.4369C41.1497 41.2278 38.9371 43.7984 34.8048 43.7984C30.7701 43.7984 28.4599 41.2608 27.8091 40.4369V36.3832L34.3818 39.7777C34.577 39.8766 34.7722 39.9095 34.9675 39.9095C35.1627 39.9095 35.3905 39.8766 35.5857 39.7777L41.8004 36.5809V40.4369ZM34.9675 37.1083L24.295 31.6376L34.9675 26.7601L45.6399 31.6376L34.9675 37.1083ZM23.5792 39.8436C23.8069 40.0743 23.9696 40.4369 23.9696 40.7664C23.9696 41.096 23.8395 41.4584 23.5792 41.6891C23.3514 41.9198 22.9935 42.0847 22.6681 42.0847C22.3427 42.0847 21.9848 41.9528 21.757 41.6891C21.5293 41.4584 21.3666 41.096 21.3666 40.7664C21.3666 40.4369 21.4967 40.0743 21.757 39.8436C21.9848 39.6129 22.3427 39.4482 22.6681 39.4482C22.9935 39.4482 23.3189 39.58 23.5792 39.8436Z"
                                      fill="#A98D4B"
                                    />
                                  </svg>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                              <h5>
                                {data.job_type != null
                                  ? data.job_type ==
                                    "Special Education Paraprofessional"
                                    ? t("SPED Paraprofessional")
                                    : data.job_type ==
                                      "Special Education Teacher"
                                    ? t("SPED teacher")
                                    : t(data.job_type)
                                  : ""}
                              </h5>
                            </div>
                            <div class="vi"></div>
                            <div class="post_pay">
                              <svg
                                width="14"
                                height="12"
                                viewBox="0 0 14 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.3536 2.57143H2.14286C1.90607 2.57143 1.71429 2.37964 1.71429 2.14286C1.71429 1.90607 1.90607 1.71429 2.14286 1.71429H12.4286C12.6654 1.71429 12.8571 1.5225 12.8571 1.28571C12.8571 0.575625 12.2815 0 11.5714 0H1.71429C0.767411 0 0 0.767411 0 1.71429V10.2857C0 11.2326 0.767411 12 1.71429 12H12.3536C13.1041 12 13.7143 11.4233 13.7143 10.7143V3.85714C13.7143 3.14812 13.1041 2.57143 12.3536 2.57143ZM11.1429 8.14286C10.6696 8.14286 10.2857 7.75902 10.2857 7.28571C10.2857 6.81241 10.6696 6.42857 11.1429 6.42857C11.6162 6.42857 12 6.81241 12 7.28571C12 7.75902 11.6162 8.14286 11.1429 8.14286Z"
                                  fill="#A98D4B"
                                />
                              </svg>
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
                              <svg
                                width="12"
                                height="10"
                                viewBox="0 0 12 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.14287 5.71429H11.4286V8.92857C11.4286 9.52031 10.9489 10 10.3572 10H1.07143C0.479688 10 0 9.52031 0 8.92857V5.71429H4.28572V6.16071C4.28572 6.30864 4.40566 6.42857 4.55358 6.42857H6.87501C7.02294 6.42857 7.14287 6.30864 7.14287 6.16071V5.71429ZM11.4286 3.21429V5H0V3.21429C0 2.62254 0.479688 2.14286 1.07143 2.14286H2.85715V1.07143C2.85715 0.479688 3.33684 0 3.92858 0H7.50001C8.09176 0 8.57144 0.479688 8.57144 1.07143V2.14286H10.3572C10.9489 2.14286 11.4286 2.62254 11.4286 3.21429ZM7.14287 1.42857H4.28572V2.14286H7.14287V1.42857Z"
                                  fill="#A98D4B"
                                />
                              </svg>
                              <h5>
                                {data.nanyintrestedin != null
                                  ? t(data.nanyintrestedin)
                                  : t("Full time")}
                              </h5>
                            </div>
                            <div class="vi"></div>
                            <div class="post_cal">
                              <svg
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.9219 4.375H0.328125C0.147656 4.375 0 4.22734 0 4.04688V3.0625C0 2.33789 0.587891 1.75 1.3125 1.75H2.625V0.328125C2.625 0.147656 2.77266 0 2.95312 0H4.04688C4.22734 0 4.375 0.147656 4.375 0.328125V1.75H7.875V0.328125C7.875 0.147656 8.02266 0 8.20312 0H9.29688C9.47734 0 9.625 0.147656 9.625 0.328125V1.75H10.9375C11.6621 1.75 12.25 2.33789 12.25 3.0625V4.04688C12.25 4.22734 12.1023 4.375 11.9219 4.375ZM0.328125 5.25H11.9219C12.1023 5.25 12.25 5.39766 12.25 5.57812V12.6875C12.25 13.4121 11.6621 14 10.9375 14H1.3125C0.587891 14 0 13.4121 0 12.6875V5.57812C0 5.39766 0.147656 5.25 0.328125 5.25ZM3.5 10.8281C3.5 10.6477 3.35234 10.5 3.17188 10.5H2.07812C1.89766 10.5 1.75 10.6477 1.75 10.8281V11.9219C1.75 12.1023 1.89766 12.25 2.07812 12.25H3.17188C3.35234 12.25 3.5 12.1023 3.5 11.9219V10.8281ZM3.5 7.32812C3.5 7.14766 3.35234 7 3.17188 7H2.07812C1.89766 7 1.75 7.14766 1.75 7.32812V8.42188C1.75 8.60234 1.89766 8.75 2.07812 8.75H3.17188C3.35234 8.75 3.5 8.60234 3.5 8.42188V7.32812ZM7 10.8281C7 10.6477 6.85234 10.5 6.67188 10.5H5.57812C5.39766 10.5 5.25 10.6477 5.25 10.8281V11.9219C5.25 12.1023 5.39766 12.25 5.57812 12.25H6.67188C6.85234 12.25 7 12.1023 7 11.9219V10.8281ZM7 7.32812C7 7.14766 6.85234 7 6.67188 7H5.57812C5.39766 7 5.25 7.14766 5.25 7.32812V8.42188C5.25 8.60234 5.39766 8.75 5.57812 8.75H6.67188C6.85234 8.75 7 8.60234 7 8.42188V7.32812ZM10.5 10.8281C10.5 10.6477 10.3523 10.5 10.1719 10.5H9.07812C8.89766 10.5 8.75 10.6477 8.75 10.8281V11.9219C8.75 12.1023 8.89766 12.25 9.07812 12.25H10.1719C10.3523 12.25 10.5 12.1023 10.5 11.9219V10.8281ZM10.5 7.32812C10.5 7.14766 10.3523 7 10.1719 7H9.07812C8.89766 7 8.75 7.14766 8.75 7.32812V8.42188C8.75 8.60234 8.89766 8.75 9.07812 8.75H10.1719C10.3523 8.75 10.5 8.60234 10.5 8.42188V7.32812Z"
                                  fill="#A98D4B"
                                />
                              </svg>
                              <h5>
                                {data.nanystartdate != null
                                  ? data.nanystartdate
                                  : data.tutorstartdate}
                              </h5>
                            </div>
                            <div class="vi"></div>
                            <div class="post_loc">
                              <svg
                                width="8"
                                height="10"
                                viewBox="0 0 8 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0 3.59527C0 1.6076 1.6076 0 3.59527 0C5.58295 0 7.19055 1.6076 7.19055 3.59527C7.19055 5.73703 4.92039 8.69029 3.99075 9.8151C3.78531 10.0616 3.41037 10.0616 3.20493 9.8151C2.27016 8.69029 0 5.73703 0 3.59527ZM2.31125 3.59527C2.31125 4.30406 2.88649 4.8793 3.59527 4.8793C4.30406 4.8793 4.8793 4.30406 4.8793 3.59527C4.8793 2.88649 4.30406 2.31125 3.59527 2.31125C2.88649 2.31125 2.31125 2.88649 2.31125 3.59527Z"
                                  fill="#A98D4B"
                                />
                              </svg>
                              <h5>
                                {data.country != null ? data.country : ""} ,{" "}
                                {data.city != null ? data.city : ""}
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
                                  : "img/nany_img.png"
                              }
                              alt=""
                            />
                            <div class="heart_sec">
                              <svg
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M9.6276 0.342582C10.1734 0.116411 10.7585 0 11.3493 0C11.9402 0 12.5253 0.116411 13.0711 0.342582C13.6168 0.568711 14.1127 0.90013 14.5303 1.31791C14.9481 1.73556 15.2798 2.23164 15.5059 2.77738C15.7321 3.32322 15.8485 3.90828 15.8485 4.49913C15.8485 5.08997 15.7321 5.67503 15.5059 6.22087C15.2797 6.76667 14.9483 7.26256 14.5305 7.68023C14.5304 7.68027 14.5305 7.68019 14.5305 7.68023L8.41336 13.7973C8.14312 14.0676 7.70499 14.0676 7.43475 13.7973L1.31766 7.68023C0.473975 6.83655 0 5.69227 0 4.49913C0 3.30598 0.473975 2.16171 1.31766 1.31803C2.16134 0.474345 3.30561 0.000370052 4.49876 0.000370052C5.6919 0.000370052 6.83618 0.474345 7.67986 1.31803L7.92405 1.56222L8.16813 1.31814C8.16817 1.3181 8.1681 1.31818 8.16813 1.31814C8.5858 0.900306 9.08181 0.568732 9.6276 0.342582ZM11.3493 1.38396C10.9403 1.38396 10.5353 1.46455 10.1574 1.62113C9.77948 1.77771 9.43614 2.00721 9.14697 2.29652L8.41336 3.03013C8.14312 3.30036 7.70499 3.30036 7.43475 3.03013L6.70125 2.29663C6.11711 1.71249 5.32485 1.38433 4.49876 1.38433C3.67266 1.38433 2.8804 1.71249 2.29626 2.29663C1.71212 2.88077 1.38396 3.67303 1.38396 4.49913C1.38396 5.32522 1.71212 6.11749 2.29626 6.70162L7.92405 12.3294L13.5518 6.70162C13.8412 6.41245 14.0708 6.069 14.2273 5.6911C14.3839 5.31321 14.4645 4.90817 14.4645 4.49913C14.4645 4.09008 14.3839 3.68504 14.2273 3.30715C14.0708 2.92926 13.8413 2.58592 13.552 2.29675C13.2628 2.00744 12.9192 1.77771 12.5413 1.62113C12.1634 1.46455 11.7584 1.38396 11.3493 1.38396Z"
                                  fill="#A98D4B"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="nany_social">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z"
                                fill="#A98D4B"
                              />
                            </svg>
                            <svg
                              width="16"
                              height="12"
                              viewBox="0 0 16 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.6969 3.9625C15.8187 3.86563 16 3.95625 16 4.10938V10.5C16 11.3281 15.3281 12 14.5 12H1.5C0.671875 12 0 11.3281 0 10.5V4.1125C0 3.95625 0.178125 3.86875 0.303125 3.96562C1.00312 4.50937 1.93125 5.2 5.11875 7.51562C5.77812 7.99687 6.89062 9.00938 8 9.00313C9.11562 9.0125 10.25 7.97813 10.8844 7.51562C14.0719 5.2 14.9969 4.50625 15.6969 3.9625ZM8 8C8.725 8.0125 9.76875 7.0875 10.2937 6.70625C14.4406 3.69688 14.7562 3.43437 15.7125 2.68437C15.8937 2.54375 16 2.325 16 2.09375V1.5C16 0.671875 15.3281 0 14.5 0H1.5C0.671875 0 0 0.671875 0 1.5V2.09375C0 2.325 0.10625 2.54062 0.2875 2.68437C1.24375 3.43125 1.55938 3.69688 5.70625 6.70625C6.23125 7.0875 7.275 8.0125 8 8Z"
                                fill="#A98D4B"
                              />
                            </svg>
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
                                fill="#A98D4B"
                              />
                            </svg>
                            {/* <img src={window.location.origin + "/images/ok.svg"} alt="" /> */}
                          </div>
                        </div>
                        <div class="second_sec">
                          <p id={"half" + index}>
                            {data.description != null
                              ? data.description.substr(0, 100)
                              : ""}{" "}
                            {data.description != null &&
                            data.description.length > 100 ? (
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
                            {data.description}{" "}
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
                        <div
                          class="view_profile_btn visiterbtn"
                          style={{
                            width: "100%",
                          }}
                        >
                          <button
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "#ccc",
                              fontSize: "17px",
                              textTransform: "uppercase",
                            }}
                          >
                            {t("Closed")}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {delete1 ? (
        <Modal show={delete1} onHide={(e) => setdelete(false)} className="">
          <Modal.Body>
            <div className="promocode_content changestatus">
              <h2>{t("Are you sure you want to close this job post?")}</h2>
              <p>
                <b>
                  {t(
                    "This action will close an active job post and deactivate this profession on your profile."
                  )}
                </b>
              </p>
              <p>{t("Are you sure you want to continue?")}</p>
              <button onClick={(e) => accept()}>{t("Yes")}</button>
              <button onClick={(e) => setdelete(false)}>{t("No")}</button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {jobpost ? (
        <Modal
          show={jobpost}
          onHide={(e) => {
            handleClose5();
          }}
          className="question_new jobs"
        >
          <Modal.Body>
            <div className="younger">
              <Link
                to=""
                onClick={(e) => {
                  handleClose5();
                }}
              >
                +{" "}
              </Link>
              <br></br>
              <p>
                <b>{t("Edit post")}</b>
              </p>
              <div className="Profile_complete">
                <div className="detail work-experience job_performance job_post setp4">
                  <div className="form_group full">
                    <label>
                      <strong>
                        {/* {t("Details for")} {list ? t(list[0].job_type) : ""}{" "} */}
                        {t("positions")}
                      </strong>
                    </label>
                    <br />
                    <label>
                      {t("Job post title")}
                      <span>*</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder={
                        t("Experienced") +
                        (list ? list[0].job_type : "") +
                        t("with 10 years of experience")
                      }
                      maxlength="70"
                      name="message"
                      onChange={(e) => {
                        setedit({ ...edit, title: e.target.value });
                      }}
                      defaultValue={list ? list[0].title : ""}
                    ></textarea>
                    <span>
                      {t("Number of characters")} {70 - list[0].title.length}
                    </span>
                  </div>
                  <div className="form_group full sec">
                    <label>
                      {t("Job description")}
                      <span>*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder={
                        list[0].job_type == "Nanny"
                          ? t(
                              "My name is Jelena and I am looking for a reliable, responsible and passionate nanny for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. Nanny would care for my son when I run errands, help with meal preparation for him and take him to the local park (walking distance). We need a nanny for Monday through Friday from 8 A.M. to 12 P.M."
                            )
                          : list[0].job_type == "Special Education Teacher"
                          ? t(
                              "My name is Jelena and I am looking for a reliable, responsible and passionate special education teacher to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills."
                            )
                          : list[0].job_type ==
                            "Special Education Paraprofessional"
                          ? t(
                              "My name is Jelena and I am looking for a reliable, responsible and passionate special education paraprofessional to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills and possibly accompany him to the school"
                            )
                          : list[0].job_type == "Tutor"
                          ? t(
                              "My name is Jelena and I am looking for a reliable, responsible and experienced English tutor for my 9-year-old son. Our son needs help in reading and writing. Also, we are open for online classes."
                            )
                          : ""
                      }
                      maxlength="300"
                      name="message"
                      onChange={(e) => {
                        setedit({ ...edit, description: e.target.value });
                      }}
                      defaultValue={list ? list[0].description : ""}
                    ></textarea>
                    <span>
                      {t("Number of characters")}{" "}
                      {300 - list[0].description.length}
                    </span>
                  </div>
                  <div className="job_note" id="job_note">
                    <svg
                      width="15"
                      height="17"
                      viewBox="0 0 15 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.4 2L9 0H0V17H2V10H7.6L8 12H15V2H9.4Z"
                        fill="#7D2B8B"
                      />
                    </svg>
                    <p>
                      {t(
                        "Your old profile information will be applied to this job post, too."
                      )}{" "}
                      <br />
                      {t("Please update your profile")}{" "}
                      <Link
                        to="/search-parents"
                        onClick={(e) => {
                          localStorage.setItem("edittime", "editall");
                          localStorage.setItem("search", "Profile");
                        }}
                        target={"_blank"}
                      >
                        {t("here")}
                      </Link>{" "}
                      {t("if you have had some changes in the meantime.")}
                    </p>
                  </div>
                  <div class="form_group full socialpost ">
                    <label>
                      {t(
                        "I give my consent for this job to be shared by SensCare platform on social media"
                      )}
                      <span>*</span>
                    </label>
                    <div class="checkbox create">
                      <ul>
                        <li style={{ width: "25% !important" }}>
                          <input
                            type="radio"
                            name="e"
                            onClick={(e) => {
                              setedit({
                                ...edit,
                                plateformonsocialmedia: "Yes",
                              });
                            }}
                            defaultChecked={
                              list[0].plateformonsocialmedia == "Yes"
                                ? true
                                : false
                            }
                          />
                          <span> {t("Yes")}</span>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="e"
                            onClick={(e) => {
                              setedit({
                                ...edit,
                                plateformonsocialmedia: "No",
                              });
                            }}
                            defaultChecked={
                              list[0].plateformonsocialmedia == "No"
                                ? true
                                : false
                            }
                          />
                          <span> {t("No")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="button text-center">
                <div class="pull-right">
                  <button class="btn" onClick={(e) => handleClose5()}>
                    {t("Back")}
                  </button>
                </div>
                <div class="pull-right">
                  <button
                    class="btn confirm"
                    onClick={(e) => {
                      if (
                        edit.title != "" &&
                        edit.description != "" &&
                        edit.plateformonsocialmedia
                      ) {
                        editpost();
                      }
                    }}
                  >
                    {t("Publish")}
                  </button>
                </div>
              </div>
              <br />
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default Job_post_parents_detail;
