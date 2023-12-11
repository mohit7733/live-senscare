import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../urls";
import All_review from "./all_review";
import Modal from "react-bootstrap/Modal";
import Send_review from "../send_review";
import { useTranslation } from "react-i18next";

function All_review2(props) {
  const { t } = useTranslation("all-reviews");
  const navigate = useNavigate();
  const [list, setlist] = useState([]);
  const [all, setall] = useState("");
  const [check, setcheck] = useState(true);
  const month = [
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
  ];
  const [profile, setprofile] = useState();
  const [plink, setplink] = useState(true);
  const [message, setmessage] = useState("");
  const [username, setusername] = useState("");
  const [apirun, setapirun] = useState(0);
  const [reviewmodel, setreviewmodel] = useState(false);
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

  const profile_data = (a) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      rev_id: a,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/reviewnotificationview", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setlist([result.data.reviewview]);
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
  }, [check]);

  return (
    <>
      {all == "" ? (
        <All_review setall={setall} profile_data={profile_data} />
      ) : (
        <div class="main-header revumain">
          <button onClick={(e) => setall("")}>
            <svg
              width="17"
              height="8"
              viewBox="0 0 17 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM17 3.5L1 3.5V4.5L17 4.5V3.5Z"
                fill="#A98D4B"
              />
            </svg>{" "}
            {t("Back")}
          </button>
          {list && list[0] ? (
            <>
              <h2 className="border"></h2>
              <div className="detail_invit">
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  <span className="date">
                    {new Date(
                      list && list[0] && list[0].created_at
                    ).toLocaleDateString("en-US", { weekday: "short" })}
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
                  <Link
                    to={
                      list[0]?.SenderUsertype != "parents"
                        ? "/profile-provider/" + list[0]?.sender_userid
                        : "/profile-parents/" + list[0]?.sender_userid
                    }
                  >
                    {list && list[0] && list[0].SenderName}
                  </Link>{" "}
                  {t("left you a review.")}
                </p>
                <h2 style={{ marginTop: "8px" }}>
                  {t("Dear")} {message + " "},
                </h2>
                <h2>{t("Please read review you have just received.")}</h2>
              </div>
              <div class="right_side_section">
                <div class="looking_for_candidate">
                  {list.map((data, index) => {
                    if (index <= 5) {
                      return (
                        <div className="recommend">
                          <div className="image">
                            <img
                              src={
                                data.SenderImage != null
                                  ? api +
                                    "/public/assets/images/users/" +
                                    data.SenderImage
                                  : window.location.origin + "/img/nany_img.png"
                              }
                              alt=""
                            />
                          </div>
                          <div className="detail">
                            <h3>{data.SenderName}</h3>
                            <span className="star">
                              {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                  <i
                                    type="button"
                                    key={index}
                                    className={
                                      index <= data.rating
                                        ? "on fa-solid fa-star"
                                        : "off fa-regular fa-star"
                                    }
                                  ></i>
                                );
                              })}
                            </span>
                            <p style={{ padding: "0" }}>
                              {new Date(
                                list && list[0] && list[0].created_at
                              ).getDate()}
                              /
                              {new Date(
                                list && list[0] && list[0].created_at
                              ).getMonth() + 1}
                              /
                              {new Date(
                                list && list[0] && list[0].created_at
                              ).getFullYear()}
                            </p>
                            <h3 style={{ fontStyle: "italic" }}>
                              {data.review_title}
                            </h3>
                            <p style={{ fontStyle: "italic" }}>
                              {data.message}
                            </p>
                            <div className="buttonrec">
                              <button
                                style={{ marginLeft: "10px" }}
                                onClick={(e) => setall("")}
                              >
                                {t("See all Reviews")}
                              </button>

                              {data.reviewerData == 0 &&
                              data.invitationstatus?.status > 0 ? (
                                <button
                                  onClick={(e) => {
                                    setapirun(data.sender_userid);
                                    setreviewmodel(true);
                                    setusername(data.Sendername);
                                  }}
                                >
                                  {t("Leave Review")}
                                </button>
                              ) : (
                                <button
                                  style={{
                                    color: "#B7B7B7",
                                    borderColor: "#B7B7B7",
                                  }}
                                >
                                  {t("Leave Review")}
                                </button>
                              )}
                            </div>
                          </div>
                          <p>
                            {t(
                              "Sharing your experiences will help future providers to find the best family or school and make a safe choice."
                            )}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
      {reviewmodel ? (
        <Modal show={reviewmodel} onHide={(e) => setreviewmodel(false)}>
          <Modal.Body>
            <Send_review
              setrequest={setreviewmodel}
              slugdata={apirun}
              username={username}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default All_review2;
