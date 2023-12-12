import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { api } from "../../../urls";
import Favorite_profile from "./favorite_profile";
import Favorite_select from "./favorite_select";
import { useTranslation } from "react-i18next";

function Who_visit_me() {
  const { t, i18n } = useTranslation("WhoVisitedMe");
  const navigate = useNavigate();
  const [interview, setinterview] = useState([]);
  const [check, setcheck] = useState(true);
  const [list2, setlist2] = useState(10);
  const [list, setlist] = useState(list2);
  const [page, setpage] = useState(0);
  const [recived, setrecived] = useState(
    localStorage.getItem("user_type") == "provider" ? "Parents" : "Provider"
  );
  const language = i18n.language;
  let receivedLand = "";
  function recivedBasedOnLanguage() {
    if (recived === "Parents" && language === "en") receivedLand = "Parents";
    if (recived === "Parents" && language === "sr") receivedLand = "Roditelji";
    if (recived === "Provider" && language === "en") receivedLand = "Provider";
    if (recived === "Provider" && language === "sr") receivedLand = "Kandidat";
  }
  recivedBasedOnLanguage();

  const [active, setactive] = useState(false);
  const profile_data = (a) => {
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
      api +
        "/api/v1/whovisitedme?profile_search=" +
        (a != undefined ? a : recived),
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setinterview(result.data.whovisitedme);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const favourite_selectapi = (a) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: a,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/deletewhovisitedme", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        profile_data();
        setinterview([]);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (check) {
      profile_data();
      setcheck(false);
    }
    window.scrollTo({ top: 200, behavior: "smooth" });
  }, [check, list, list2, page]);
  let pages = 0;
  let data_show = (list / list2 - 1) * list2;
  return (
    <>
      <div class="main-header">
        <h2 className="border">{t("Who Visited Me")}</h2>
        <div class="mail-header-bar">
          <p>
            {interview.length} {t("Profiles")}{" "}
          </p>
          <div class="btn-group flex">
            {t("Refine by")}
            <div className="select">
              <label onClick={(e) => setactive(!active)}>
                {t(receivedLand)}
                <span>
                  <img src="/images/done_a.svg" />
                </span>
              </label>
              {active ? (
                <ul>
                  <li
                    onClick={(e) => {
                      profile_data("Parents");
                      setrecived(t("Parents"));
                      setactive(!active);
                    }}
                  >
                    {t("Parents")}
                  </li>
                  <li
                    onClick={(e) => {
                      profile_data("Provider");
                      setrecived(t("Provider"));
                      setactive(!active);
                    }}
                  >
                    {t("Provider")}
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div class="right_side_section">
          <div class="looking_for_candidate">
            <div class="interested_fam">
              <div class="interested_fam_boxs higit">
                {interview?.map((data, index) => {
                  if (index < list && data_show <= index) {
                    return (
                      <div class="interested_fam_box">
                        <div class="image_sec">
                          <div class="heart_sec delete">
                            <svg
                              onClick={
                                (e) => favourite_selectapi(data?.user_id)
                                // navigate(localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership")
                                // navigate("/")
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                            </svg>
                          </div>
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
                            {localStorage.getItem("user_type") != "parents" &&
                            recived == "Parents" ? (
                              <Favorite_select
                                id={data.jobsId?.JID}
                                username={data.first_name}
                                heart2={data.favOrnotjob}
                              />
                            ) : (
                              <Favorite_profile
                                id={data.id}
                                username={data.first_name}
                                heart2={data.favOrnot}
                                whovisitedme={data.first_name}
                              />
                            )}
                          </div>
                        </div>
                        <div class="general_sec">
                          <h4>
                            <Link
                              to={""}
                              // {localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"}
                            >
                              {data.first_name + " " + data.last_name}
                            </Link>
                          </h4>
                          {data.reviewAvg >= 0 ? (
                            <>
                              {[...Array(data.reviewAvg)]?.map(
                                (star, index) => {
                                  index += 1;
                                  return (
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
                                        d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z"
                                        fill="#A98D4B"
                                      />
                                    </svg>
                                  );
                                }
                              )}
                              {[...Array(5 - data.reviewAvg)]?.map(
                                (star, index) => {
                                  index += 1;
                                  return (
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z"
                                        stroke="#A98D4B"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        fill="none"
                                      />
                                    </svg>
                                  );
                                }
                              )}
                            </>
                          ) : (
                            ""
                          )}
                          <div class="detail_sec">
                            {JSON.parse(data.service_type) != null ? (
                              Object.values(JSON.parse(data.service_type))[0] ==
                              "Nanny" ? (
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
                            <p>
                              {JSON.parse(data.service_type) != null
                                ? t(
                                    Object.values(
                                      JSON.parse(data.service_type)
                                    )[0]
                                  )
                                : ""}
                            </p>
                          </div>
                          <div class="detail_sec">
                            <img
                              src={
                                window.location.origin + "/images/post_pay.svg"
                              }
                              alt=""
                            />
                            <p>
                              ${data.nanyperhrrate} {t("/hour")}
                            </p>
                          </div>
                          {data.service_type != null &&
                          Object.values(JSON.parse(data.service_type))[1] ? (
                            <>
                              <div class="detail_sec">
                                {JSON.parse(data.service_type) != null ? (
                                  Object.values(
                                    JSON.parse(data.service_type)
                                  )[1] == "Nanny" ? (
                                    <img
                                      src={
                                        window.location.origin +
                                        "/images/nany_post.svg"
                                      }
                                      alt=""
                                    />
                                  ) : Object.keys(
                                      JSON.parse(data.service_type)
                                    )[1] == "tab2" ? (
                                    <img
                                      src={
                                        window.location.origin +
                                        "/images/teacher_post.svg"
                                      }
                                      alt=""
                                    />
                                  ) : Object.keys(
                                      JSON.parse(data.service_type)
                                    )[1] == "tab3" ? (
                                    <img
                                      src={
                                        window.location.origin +
                                        "/images/education_post.svg"
                                      }
                                      alt=""
                                    />
                                  ) : Object.keys(
                                      JSON.parse(data.service_type)
                                    )[1] == "tab4" ? (
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

                                <p>
                                  {" "}
                                  {JSON.parse(data.service_type) != null
                                    ? t(
                                        Object.values(
                                          JSON.parse(data.service_type)
                                        )[1]
                                      )
                                    : ""}
                                </p>
                              </div>

                              <div class="detail_sec">
                                <img
                                  src={
                                    window.location.origin +
                                    "/images/post_pay.svg"
                                  }
                                  alt=""
                                />
                                <p>
                                  ${data.tutorperhrrate} {t("/hour")}
                                </p>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          <div class="detail_sec">
                            <img
                              src={
                                window.location.origin + "/images/post_rang.svg"
                              }
                              alt=""
                            />
                            {/* <p>
                              {data.nanyyearexp != null
                                ? t(data.nanyperhrrate)
                                : data.setyearexp != null
                                ? t(data.setyearexp)
                                : data.tutorexp != null
                                ? t(data.tutorexp)
                                : data.yearofexpasteacher != null
                                ? t(data.yearofexpasteacher)
                                : "0"}{" "}
                              {t("yrs of exp")}
                            </p> */}
                            
                            {language === "sr" ? <p>
  {data.tutorexp != null 
    ? `${t(data.tutorexp)} ${t("yrs of exp")}`
    : `${t(data.nanyyearexp)} ${t("yrs of exp")}`}
</p> : <p>
  {data.tutorexp != null 
    ? `${t(data.tutorexp)} ${t("yrs of exp")}`
    : `${t(data.nanyyearexp)} ${t("yrs of exp")}`}
</p> }
                          </div>
                          <div class="detail_sec">
                            <img
                              src={
                                window.location.origin + "/images/post_loc.svg"
                              }
                              alt=""
                            />
                            <p>{data.city + ", " + data.country}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="upgared hight2">
        {/* <button onClick={e => setupgrad("ji")}>+ </button> */}
        <p>
          {interview.length}{" "}
          {t("more people visited your profile. Please upgrade to")}
          <br />
          {t("view their profiles and connect.")}
        </p>
        <Link
          to={
            ""
            // !localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"
          }
          //  target="_blank"
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
          {t("Upgrade now")}
        </Link>
      </div>
      <div className="footer_pagination pagi_post">
        <div class="btn-group">
          {" "}
          {t("Result per page")}
          <select
            onChange={(e) => {
              setlist2(parseInt(e.target.value));
              setlist(parseInt(e.target.value));
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="pagination">
          <span className="curserpage" onClick={(e) => setlist(list2)}>
            {"<<"}
          </span>
          <span
            className="curserpage"
            onClick={(e) =>
              setlist(
                interview.length > 0 && list > list2 ? list - list2 : list2
              )
            }
          >
            {"<"}
          </span>

          {interview?.map((data, index) => {
            if (interview.length > pages) {
              pages = pages + list2;
              return (
                <span
                  onClick={(e) => setlist((index + 1) * list2)}
                  className={list == pages ? "active" : ""}
                >
                  {index + 1}
                </span>
              );
            }
          })}
          <span
            className="curserpage"
            onClick={(e) =>
              setlist(interview.length > list ? list + list2 : list)
            }
          >
            {">"}
          </span>
          <span className="curserpage" onClick={(e) => setlist(pages)}>
            {">>"}
          </span>
        </div>
      </div>
    </>
  );
}

export default Who_visit_me;
