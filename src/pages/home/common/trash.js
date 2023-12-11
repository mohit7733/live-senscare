import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../../urls";
import Message_chet from "./message_chet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Trash_list() {
  const { t } = useTranslation("trash");
  const navigate = useNavigate();
  const [check, setcheck] = useState(true);
  const [interview, setinterview] = useState([]);
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
  const [view, setview] = useState("");
  const [delete_list, setdelete_list] = useState([]);
  const [recived, setrecived] = useState("");
  const [active, setactive] = useState(false);
  const [upgrad, setupgrad] = useState("");

  const [refine, setrefine] = useState({
    weekly: "",
    monthly: "",
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
        "/api/v1/trashnotifications?" +
        (refine.weekly != ""
          ? "weekly=" + refine.weekly
          : refine.monthly != ""
          ? "monthly=" + refine.monthly
          : ""),

      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setinterview(result.data.getallNotifications))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (check) {
      list();
      setcheck(false);
    }

    console.log(interview, delete_list, refine);
    setview(data ? data : "");
  }, [check, interview, delete_list, refine, data, slugdata]);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setrecived("Refine by");
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

    fetch(api + "/api/v1/deletetrashmessagenotifications", requestOptions)
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
            <h2 className="border">{t("Trash")}</h2>
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
                          setrecived(t("7 hours"));
                          setrefine({
                            weekly: true,
                            monthly: "",
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
                          });
                          setcheck(true);
                          setactive(!active);
                        }}
                      >
                        {t("30 days")}
                      </li>
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
                <div class="delete-btn" onClick={(e) => delete_in()}>
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
              </div>
            </div>
          </div>
          {interview[0] ? (
            <table class="table table-inbox table-hover hovertable message_list trash">
              <tbody>
                {interview.map((data) => {
                  return (
                    <tr class={data.read_status == 1 ? "unread" : ""}>
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
                        <p>
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
                              {new Date(data.created_at).toLocaleDateString(
                                "en-US",
                                { weekday: "short" }
                              )}
                              ,{" "}
                              {month[new Date(data.created_at).getMonth()] +
                                " " +
                                new Date(data.created_at).getDate()}
                              , {new Date(data.created_at).getFullYear()},{" "}
                              {new Date(data.created_at).toLocaleTimeString(
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
        </>
      ) : (
        <div class="main-header">
          <button onClick={(e) => setview("")}>
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
          <Message_chet id={view} />
        </div>
      )}
    </div>
  );
}
