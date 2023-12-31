import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../urls";
import Modal from "react-bootstrap/Modal";
import { jsPDF } from "jspdf";
import { useTranslation } from "react-i18next";

function Share_document_job() {
  const { t } = useTranslation("sharedDocuments");
  const navigate = useNavigate();
  const [list, setlist] = useState([]);
  const [delete1, setdelete] = useState(false);
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
  const [message, setmessage] = useState(0);
  const [deletevalue, setdeletevalue] = useState("");

  const profile_data = () => {
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
        "/api/v1/shareddocumentslist?" +
        (refine.threedays != ""
          ? "threedays=" + refine.threedays
          : refine.withinweek != ""
          ? "withinweek=" + refine.withinweek
          : refine.twofourday != ""
          ? "twofourday=" + refine.twofourday
          : refine.withinmonth != ""
          ? "withinmonth=" + refine.withinmonth
          : ""),
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setlist(result.data.getDocumnets);
        console.log(result);
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
  useEffect(() => {
    if (window.innerWidth < 768) {
      setrecived("Refine by");
    }
  }, []);
  const delete_in = (a) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ids: deletevalue,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/deleteshareddocuments", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        profile_data();
        setdelete(false);
      })
      .catch((error) => console.log("error", error));
  };
  const [refine, setrefine] = useState({
    threedays: "",
    withinweek: "",
    twofourday: "",
    withinmonth: "",
  });
  const refine_bc = (e) => {
    setrefine({
      threedays: e == "3" ? true : "",
      withinweek: e == "7" ? true : "",
      twofourday: e == "24" ? true : "",
      withinmonth: e == "30" ? true : "",
    });
    setcheck(true);
  };
  const [recived, setrecived] = useState("");
  const [active, setactive] = useState(false);
  return (
    <>
      <div class="main-header share_doc">
        <h2 className="border">{t("Shared Documents")}</h2>
        <div class="mail-header-bar">
          <p>
            {list.length} {t("Documents")}{" "}
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
                      refine_bc("");
                      setactive(!active);
                    }}
                  >
                    {t("All")}
                  </li>
                  <li
                    onClick={(e) => {
                      setrecived(t("24 hours"));
                      refine_bc(24);
                      setactive(!active);
                    }}
                  >
                    {t("24 hours")}
                  </li>
                  <li
                    onClick={(e) => {
                      setrecived(t("3 Days"));
                      refine_bc(3);
                      setactive(!active);
                    }}
                  >
                    {t("3 Days")}
                  </li>
                  <li
                    onClick={(e) => {
                      setrecived(t("7 Days"));
                      refine_bc(7);
                      setactive(!active);
                    }}
                  >
                    {t("7 Days")}
                  </li>
                  <li
                    onClick={(e) => {
                      setrecived(t("30 Days"));
                      refine_bc(30);
                      setactive(!active);
                    }}
                  >
                    {t("30 Days")}
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <ul>
          {list.map((data) => {
            if (data.original_name == null) {
              return (
                <>
                  {data.back_doc != null ? (
                    <li>
                      <span className="docic">
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span>
                        {data.UserName != null
                          ? data.UserName + "_background check"
                          : ""}
                      </span>
                      <span className="date">
                        {" "}
                        {new Date(data.created_at).getDate()}/
                        {new Date(data.created_at).getMonth() + 1}/
                        {new Date(data.created_at).getFullYear()}{" "}
                      </span>

                      <button>
                        <a
                          href={
                            api + "/public/assets/images/users/" + data.back_doc
                          }
                          download
                          target="_blank"
                        >
                          <svg
                            width="14"
                            height="17"
                            viewBox="0 0 14 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z"
                              fill="#A98D4B"
                            />
                          </svg>
                        </a>
                      </button>
                      <button
                        onClick={(e) => {
                          setdelete(true);
                          setdeletevalue(data.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>
                      </button>
                    </li>
                  ) : (
                    ""
                  )}

                  {data.cert_doc != null ? (
                    <li>
                      <span className="docic">
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span>
                        {data.UserName != null
                          ? data.UserName + "_Certificate"
                          : ""}
                      </span>
                      <span className="date">
                        {" "}
                        {new Date(data.created_at).getDate()}/
                        {new Date(data.created_at).getMonth() + 1}/
                        {new Date(data.created_at).getFullYear()}{" "}
                      </span>

                      <button>
                        <a
                          href={
                            api + "/public/assets/images/users/" + data.cert_doc
                          }
                          download
                          target="_blank"
                        >
                          <svg
                            width="14"
                            height="17"
                            viewBox="0 0 14 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z"
                              fill="#A98D4B"
                            />
                          </svg>
                        </a>
                      </button>
                      <button
                        onClick={(e) => {
                          setdelete(true);
                          setdeletevalue(data.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>
                      </button>
                    </li>
                  ) : (
                    ""
                  )}
                  {data.cv_doc != null ? (
                    <li>
                      <span className="docic">
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span>
                        {data.UserName != null ? data.UserName + "_CV" : ""}
                      </span>
                      <span className="date">
                        {" "}
                        {new Date(data.created_at).getDate()}/
                        {new Date(data.created_at).getMonth() + 1}/
                        {new Date(data.created_at).getFullYear()}{" "}
                      </span>

                      <button>
                        <a
                          href={
                            api + "/public/assets/images/users/" + data.cv_doc
                          }
                          download
                          target="_blank"
                        >
                          <svg
                            width="14"
                            height="17"
                            viewBox="0 0 14 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z"
                              fill="#A98D4B"
                            />
                          </svg>
                        </a>
                      </button>
                      <button
                        onClick={(e) => {
                          setdelete(true);
                          setdeletevalue(data.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>
                      </button>
                    </li>
                  ) : (
                    ""
                  )}

                  {data.recom_doc != null ? (
                    <li>
                      <span className="docic">
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span>
                        {data.UserName != null
                          ? data.UserName + "_Recommendation"
                          : ""}
                      </span>
                      <span className="date">
                        {" "}
                        {new Date(data.created_at).getDate()}/
                        {new Date(data.created_at).getMonth() + 1}/
                        {new Date(data.created_at).getFullYear()}{" "}
                      </span>

                      <button>
                        <a
                          href={
                            api +
                            "/public/assets/images/users/" +
                            data.recom_doc
                          }
                          download
                          target="_blank"
                        >
                          <svg
                            width="14"
                            height="17"
                            viewBox="0 0 14 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 6H11.59C12.48 6 12.92 7.08 12.29 7.71L7.70002 12.3C7.31002 12.69 6.68002 12.69 6.29002 12.3L1.70002 7.71C1.07002 7.08 1.52002 6 2.41002 6H4.00002V1C4.00002 0.45 4.45002 0 5.00002 0H9.00002C9.55002 0 10 0.45 10 1V6ZM1 17C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1Z"
                              fill="#A98D4B"
                            />
                          </svg>
                        </a>
                      </button>
                      <button
                        onClick={(e) => {
                          setdelete(true);
                          setdeletevalue(data.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>
                      </button>
                    </li>
                  ) : (
                    ""
                  )}
                </>
              );
            }
          })}
        </ul>
      </div>

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
              <h2>{t("Delete Document")}</h2>

              <div className="gray">
                <p>
                  <span>{t("Warning!")}</span>{" "}
                  {t(
                    "Are you sure you want to permanently delete this document?"
                  )}
                  <br />
                  <span>{t("This action cannot be undone.")}</span>
                </p>
                <button onClick={(e) => delete_in()}>{t("Delete")}</button>
                <button onClick={(e) => setdelete(false)}>{t("Cancel")}</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default Share_document_job;
