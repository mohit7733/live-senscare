import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../../urls";
import Message_chet from "./message_chet";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

export default function Message_list() {
  const { t, i18n } = useTranslation("message");
  const navigate = useNavigate();
  const [check, setcheck] = useState(true);
  const [interview, setinterview] = useState([]);
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
  const [view, setview] = useState("");
  const [delete_list, setdelete_list] = useState([]);
  const [recived, setrecived] = useState("");
  const [active, setactive] = useState(false);
  const [upgrad, setupgrad] = useState("");
  const [reviewmodel, setreviewmodel] = useState(false);
  const [refine, setrefine] = useState({
    weekly: "",
    monthly: "",
    unread: "",
  });
  const slugdata = useParams();
  let data = slugdata.name;
  const list = () => {
    setinterview([]);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      api +
        "/api/v1/inboxnotifications?" +
        (refine.weekly != ""
          ? "weekly=" + refine.weekly
          : refine.monthly != ""
          ? "monthly=" + refine.monthly
          : refine.unread != ""
          ? "unread=" + refine.unread
          : ""),

      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setinterview(result.data.getallNotifications);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (check) {
      list();
      setcheck(false);
    }

    console.log();
    setview(data ? data : "");
  }, [check, interview, delete_list, refine, data, slugdata]);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setrecived("Refine by");
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("message") &&
      localStorage.getItem("message") != ""
    ) {
      setview(localStorage.getItem("message"));
    }
  }, []);
  const selects = () => {
    var ele = document.getElementsByName("chk");
    interview.map((data) => {
      console.log(data, delete_list);
      delete_list.push(data.id);
    });
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == "checkbox") ele[i].checked = true;
    }
  };
  const deSelect = () => {
    var ele = document.getElementsByName("chk");
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == "checkbox") ele[i].checked = false;
    }
    setdelete_list([]);
  };

  const delete_select = (a) => {
    let sum = false;
    delete_list.map((e) => {
      if (e == a) {
        sum = true;
        const index = delete_list.indexOf(a);
        if (index > -1) {
          delete_list.splice(index, 1);
        }
        // setdelete_list([...delete_list])
      }
    });
    if (sum == false) {
      delete_list.push(a);
    }
    setinterview(interview);
  };

  const delete_in = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      msg_ids: delete_list,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/deletemessagenotifications", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        list();
        setdelete_list([]);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {view == "" ? (
        <>
          <div class="main-header">
            <h2 className="border">{t("Inbox")}</h2>
            <div class="mail-header-bar">
              <p>
                {interview.length} {t("Messages")}{" "}
              </p>
              <div class="btn-group flex">
                {t("Refine by")}
                <div className="select">
                  <label onClick={(e) => setactive(!active)}>
                    {t(recived)}{" "}
                    <span>
                      <img src="/images/done_a.svg" />
                    </span>
                  </label>
                  {active ? (
                    <ul>
                      <li
                        onClick={(e) => {
                          setrecived(t("All"));
                          setrefine({
                            weekly: "",
                            monthly: "",
                            unread: "",
                          });
                          setcheck(true);
                          setactive(!active);
                        }}
                      >
                        {t("All")}
                      </li>
                      <li
                        onClick={(e) => {
                          setrecived(t("7 Days"));
                          setrefine({
                            weekly: true,
                            monthly: "",
                            unread: "",
                          });
                          setcheck(true);
                          setactive(!active);
                        }}
                      >
                        {t("7 days")}
                      </li>
                      <li
                        onClick={(e) => {
                          setrecived(t("30 Days"));
                          setrefine({
                            weekly: "",
                            monthly: true,
                            unread: "",
                          });
                          setcheck(true);
                          setactive(!active);
                        }}
                      >
                        {t("30 days")}
                      </li>
                      <li
                        onClick={(e) => {
                          setrecived("Unread");
                          setrefine({
                            weekly: "",
                            monthly: "",
                            unread: true,
                          });
                          setactive(!active);
                          setcheck(true);
                        }}
                      >
                        {t("Unread")}
                      </li>
                      {/* <li onClick={e => {
                                                    setrecived("30 Days")
                                                    refine_bc(30)
                                                    setactive(!active)
                                                }} >Active jobs</li>
                                                <li onClick={e => {
                                                    setrecived("30 Days")
                                                    refine_bc(30)
                                                    setactive(!active)
                                                }} >Closed jobs</li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div class="mail-option">
              <div class="chk-all">
                <input
                  type="checkbox"
                  class="mail-radio mail-group-radio"
                  name="chk"
                  id="checkbox_id"
                  onClick={(e) => {
                    if (e.target.checked) {
                      selects();
                    } else {
                      deSelect();
                    }
                  }}
                />
                <span className="circle"></span>
                <label for="checkbox_id">{t("Select all")}</label>
              </div>
              <div class="right-side-btn">
                <div class="delete-btn" onClick={(e) => setreviewmodel(true)}>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                    <span> {t("Delete")}</span>
                  </a>
                </div>
                <div class="refresh-btn" onClick={(e) => list()}>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                      <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
                    </svg>
                  </a>
                  <span>{t("Refresh")}</span>
                </div>
              </div>
            </div>
          </div>
          {interview[0] ? (
            <table class="table table-inbox table-hover hovertable message_list">
              <tbody>
                {interview.map((data) => {
                  return (
                    <tr class={data.readStatuss == 0 ? "unread" : ""}>
                      <td class="view-message  dont-show">
                        <input
                          type="checkbox"
                          class="mail-radio"
                          name="chk"
                          onChange={(e) => delete_select(data.msg_id)}
                        />
                        <span className="circle"></span>
                        <img
                          className="dask_img"
                          src={
                            api + "/public/assets/images/users/" + data.Image
                          }
                        />
                        <p
                          onClick={(e) => {
                            navigate(
                              "/search-providers/" +
                                slugdata.id +
                                "/" +
                                data.sender_id
                            );
                            setview(data.sender_id);
                          }}
                        >
                          <strong
                            style={{ marginBottom: "8px", display: "block" }}
                          >
                            <img
                              className="mob_img"
                              src={
                                api +
                                "/public/assets/images/users/" +
                                data.Image
                              }
                            />
                            {data.SenderUserName != null
                              ? data.SenderUserName
                              : ""}{" "}
                            <span>
                              {new Date(data.updated_at).toLocaleDateString(
                                "en-US",
                                { weekday: "short" }
                              )}
                              ,{" "}
                              {month[new Date(data.updated_at).getMonth()] +
                                " " +
                                new Date(data.updated_at).getDate()}
                              , {new Date(data.updated_at).getFullYear()},{" "}
                              {new Date(data.updated_at).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </span>
                          </strong>
                          {/* <strong>Nanny needed for 1 child in Long Beach</strong> */}
                          {/* <br /> */}
                          {data.message}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="noresult">
              <h3>{t("You have no messages to display")}</h3>
              <svg
                style={{ width: "190px", height: "142px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="190"
                height="142"
                viewBox="0 0 190 142"
                fill="none"
              >
                <path
                  d="M185.746 46.8896C187.189 45.7432 189.333 46.8156 189.333 48.6276V124.25C189.333 134.049 181.383 142 171.583 142H17.75C7.95052 142 0 134.049 0 124.25V48.6646C0 46.8156 2.10781 45.7802 3.58698 46.9266C11.8703 53.3609 22.8531 61.5333 60.5719 88.9349C68.3745 94.6297 81.5391 106.611 94.6667 106.537C107.868 106.648 121.292 94.4078 128.798 88.9349C166.517 61.5333 177.463 53.324 185.746 46.8896ZM94.6667 94.6667C103.246 94.8146 115.597 83.8688 121.809 79.3573C170.881 43.7464 174.616 40.6401 185.931 31.7651C188.076 30.101 189.333 27.5125 189.333 24.776V17.75C189.333 7.95052 181.383 0 171.583 0H17.75C7.95052 0 0 7.95052 0 17.75V24.776C0 27.5125 1.25729 30.0641 3.40208 31.7651C14.7177 40.6031 18.4526 43.7464 67.524 79.3573C73.7365 83.8688 86.0875 94.8146 94.6667 94.6667Z"
                  fill="#F7F7F7"
                />
              </svg>
            </div>
          )}
          {upgrad != "" ? (
            ""
          ) : interview[0] ? (
            <div className="upgared">
              {/* <button onClick={e => setupgrad("ji")}>+ </button> */}
              <p>{t("Please upgrade to view messages and connect.")}</p>
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
                </svg>
                {t(" Upgrade now")}
              </Link>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div class="main-header">
          <button
            onClick={(e) => {
              localStorage.removeItem("message");
              navigate("/search-providers/" + slugdata.id);
              setview("");
            }}
          >
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
          <Message_chet id={view} setview={setview} list={list} />
        </div>
      )}
      {reviewmodel ? (
        <Modal show={reviewmodel} onHide={(e) => setreviewmodel(false)}>
          <Modal.Body>
            <div className="promocode_content signout invite">
              <p>
                <b>{t("Are you sure you want to delete this message?")}</b>
              </p>
              <div class="button text-center ">
                <div class="pull-right">
                  <button
                    class="btn"
                    onClick={(e) => {
                      deSelect();
                      setreviewmodel(false);
                    }}
                  >
                    {t("No")}
                  </button>
                  <button
                    class="btn"
                    onClick={(e) => {
                      setreviewmodel(false);
                      delete_in();
                    }}
                    style={{ marginLeft: "20px" }}
                  >
                    {t("Yes")}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
