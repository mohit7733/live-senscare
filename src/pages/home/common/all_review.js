import React, { useState, useEffect } from "react";
import { api } from "../../../urls";
import Send_review from "../send_review";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function All_review(props) {
  const { t } = useTranslation("all-reviews");

  const [list, setlist] = useState([]);
  const [message, setmessage] = useState("");
  const [checkdata, setcheckdata] = useState("");
  const [check, setcheck] = useState(true);
  const [recived, setrecived] = useState("Received Reviews");
  const [active, setactive] = useState(false);
  const [lodemore, setlodemore] = useState(6);
  const [apirun, setapirun] = useState(0);
  const [reviewmodel, setreviewmodel] = useState(false);
  const [username, setusername] = useState("");
  const profile_data = (a) => {
    setlist([]);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      api + (a == 2 ? "/api/v1/givenreviews" : "/api/v1/receivedreviews"),
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        a == 2
          ? setlist(result.data.sender_userid)
          : setlist(result.data.receivedreviews);

        setmessage(result.data.currentUserName);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (check) {
      profile_data();
      setcheck(false);
    }
    console.log(list);
  }, [check]);
  return (
    <>
      <div class="main-header">
        <h2 className="border"> {t("Reviews")}</h2>
        <div class="mail-header-bar">
          <p>
            {list.length} {t("Reviews ")}
            {recived == "Received Reviews" ? t("earned") : t("are given")}
          </p>
          <div class="btn-group flex">
            {t("Refine by")}
            <div className="select">
              <label onClick={(e) => setactive(!active)}>
                {t(recived)}
                <span>
                  <img src="/images/done_a.svg" />
                </span>
              </label>
              {active ? (
                <ul>
                  <li
                    onClick={(e) => {
                      profile_data("1");
                      setrecived(t("Received Reviews"));
                      setactive(!active);
                    }}
                  >
                    {t("Received Reviews")}
                  </li>
                  <li
                    onClick={(e) => {
                      profile_data("2");
                      setrecived(t("Given Reviews"));
                      setactive(!active);
                    }}
                  >
                    {t("Given Reviews")}
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="all_review">
          <ul>
            {list?.map((data, index) => {
              if (index < lodemore) {
                return (
                  <li>
                    <div className="recommend">
                      <div className="image">
                        <img
                          src={
                            data.Image != null
                              ? api +
                                "/public/assets/images/users/" +
                                data.Image
                              : "img/nany_img.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="detail">
                        <h3>
                          <Link
                            to={
                              recived === "Received Reviews"
                                ? data?.user_type != "parents"
                                  ? "/profile-provider/" + data?.sender_userid
                                  : "/profile-parents/" + data?.sender_userid
                                : data?.user_type != "parents"
                                ? "/profile-provider/" + data?.receiver_userid
                                : "/profile-parents/" + data?.receiver_userid
                            }
                            // to={data.user_type == "parents" ? "/profile-parents/" + data.sender_userid : "/profile-provider/" + data.sender_userid} target="_blank"
                          >
                            {data.Sendername}
                          </Link>
                        </h3>
                        <span
                          className="star"
                          onClick={(e) => {
                            props.profile_data(data.id);
                            props.setall(data.id);
                          }}
                        >
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
                        <p
                          onClick={(e) => {
                            props.profile_data(data.id);
                            props.setall(data.id);
                          }}
                          style={{ padding: "0" }}
                        >
                          {new Date(data.updated_at).getDate()}/
                          {new Date(data.updated_at).getMonth() + 1}/
                          {new Date(data.updated_at).getFullYear()}
                        </p>
                        <h3
                          onClick={(e) => {
                            props.profile_data(data.id);
                            props.setall(data.id);
                          }}
                          style={{ fontStyle: "italic" }}
                        >
                          {data.review_title}
                        </h3>
                        <p
                          onClick={(e) => {
                            props.profile_data(data.id);
                            props.setall(data.id);
                          }}
                          style={{ fontStyle: "italic" }}
                        >
                          {data.message.substr(0, 85)}
                        </p>

                        {recived == t("Received Reviews") ? (
                          data.reviewerData == 0 && checkdata == "" ? (
                            <button
                              onClick={(e) => {
                                setapirun(data.sender_userid);
                                setreviewmodel(true);
                                setusername(data.Sendername);
                              }}
                            >
                              {t("Leave Review")}
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0Z"
                                  fill="#7D2B8B"
                                />
                                <rect
                                  x="9"
                                  y="4"
                                  width="2"
                                  height="12"
                                  rx="1"
                                  fill="white"
                                />
                                <rect
                                  x="16"
                                  y="9"
                                  width="2"
                                  height="12"
                                  rx="1"
                                  transform="rotate(90 16 9)"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          ) : (
                            <button style={{ color: "#B7B7B7" }}>
                              {t("Leave Review")}
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="#B7B7B7"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0Z"
                                  fill="#B7B7B7"
                                />
                                <rect
                                  x="9"
                                  y="4"
                                  width="2"
                                  height="12"
                                  rx="1"
                                  fill="#fff"
                                />
                                <rect
                                  x="16"
                                  y="9"
                                  width="2"
                                  height="12"
                                  rx="1"
                                  transform="rotate(90 16 9)"
                                  fill="#fff"
                                />
                              </svg>
                            </button>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
          {
            // localStorage.getItem("user_type") == "parents"
            recived != t("Received Reviews") ? (
              ""
            ) : (
              <button onClick={(e) => setlodemore(lodemore + 6)}>
                {t("Load more")}
              </button>
            )
          }
        </div>
      </div>
      {reviewmodel ? (
        <Modal show={reviewmodel} onHide={(e) => setreviewmodel(false)}>
          <Modal.Body>
            <Send_review
              setrequest={setreviewmodel}
              username={username}
              slugdata={apirun}
              setcheckdata={setcheckdata}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {/* {localStorage.getItem("user_type") == "parents" ?
                <div className='footer_pagination'>
                    <div class="btn-group">Refine by
                        <select onChange={e => setlodemore(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className='pagination'>
                        <span className='curserpage'>{"<<"}</span>
                        <span className='curserpage'>{"<"}</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span className='curserpage'>{">>"}</span>
                        <span className='curserpage'>{">"}</span>
                    </div>
                </div> :
                ""
            } */}
    </>
  );
}

export default All_review;
