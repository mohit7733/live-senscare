import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../../urls";
import Invite_detail from "./invite_detail";
import { useTranslation } from "react-i18next";

export default function Notification() {
  const { t } = useTranslation("recomendation");
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

    fetch(api + "/api/v1/parentsinvitedetails", requestOptions)
      .then((response) => response.json())
      .then((result) => setinterview(result.data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (check) {
      list();
      setcheck(false);
    }
    console.log(interview);
  }, [check, interview]);
  const selects = () => {
    var ele = document.getElementsByName("chk");
    interview.map((data) => {
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
  };

  const delete_in = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ids: delete_list,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/multideleteinvitaion", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        list();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {view == "" ? (
        <>
          <div class="main-header">
            <h2 className="border">{t("Interview Invites")}</h2>
            <div class="mail-header-bar">
              <p>
                {interview.length} {t("invites")}{" "}
              </p>
              <div class="btn-group">
                {t("Refine By:")}
                <select>
                  <option>{t("24 hours")}</option>
                  <option>{t("3 Days")}</option>
                  <option>{t("7 Days")}</option>
                  <option>{t("30 Days")}</option>
                </select>
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
          <table class="table table-inbox table-hover">
            <tbody>
              {interview.map((data) => {
                return (
                  <tr class={data.read_status == 0 ? "unread" : ""}>
                    <td class="view-message  dont-show">
                      <input
                        type="checkbox"
                        class="mail-radio"
                        name="chk"
                        onChange={(e) => delete_select(data.id)}
                      />
                      <span className="circle"></span>
                      {data.read_status == 0 ? (
                        <span class="new-tag"> {t("NEW!")}</span>
                      ) : (
                        ""
                      )}
                      <span
                        class="username-text"
                        onClick={(e) => setview(data.id)}
                      >
                        {" "}
                        {data.ProviderName}{" "}
                      </span>{" "}
                      {t("has just sent you an interview invite.")}
                    </td>
                    <td class="view-message  text-right">
                      {month[new Date(data.updated_at).getMonth() + 1] +
                        " " +
                        new Date(data.updated_at).getDate()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
          <Invite_detail id={view} />
        </div>
      )}
    </div>
  );
}
