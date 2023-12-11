import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../urls";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

function Message_chet(props) {
  const { t, i18n } = useTranslation("message");
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

  const [reviewmodel, setreviewmodel] = useState(false);
  const [plink, setplink] = useState(localStorage.getItem("id"));
  const [showflogin, setshowflogin] = useState(false);
  const [refine, setrefine] = useState({
    threedays: "",
    withinweek: "",
    twofourday: "",
    withinmonth: "",
  });
  const [survay, setsurvay] = useState(false);
  const [active, setactive] = useState(false);
  const [recived, setrecived] = useState("");
  const [message, setmessage] = useState("");
  const [messagecheck, setmessagecheck] = useState(false);
  const [errormsg, seterrormsg] = useState("");
  const [report, setreport] = useState({
    resion: "",
    other: "",
    error: "",
  });
  const slugdata = useParams();
  let data = slugdata.name;

  const profile_data = () => {
    localStorage.removeItem("message");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      sender_id: props.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/inboxmessagesview", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setlist([result.data]);
        // setTimeout(() => {
        //     profile_data()
        // }, 5000);

        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (check) {
      profile_data();
      setcheck(false);
    }
    var objDiv = document.getElementById("parentDiv");
    if (objDiv != null) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [check, list, errormsg]);

  const accept = () => {
    setmessagecheck(true);
    if (message != "") {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        user_id: props.id,
        message: message,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(api + "/api/v1/sendmessage", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          profile_data();
          setmessage("");
          setmessagecheck(false);
          if (result.message == "The user is blocked.Cannot send a message") {
            seterrormsg("The user is blocked.Cannot send a message");
          }
        })
        .catch((error) => console.log("error", error));

      var myHeaders2 = new Headers();
      myHeaders2.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders2.append("Content-Type", "application/json");

      var raw2 = JSON.stringify({
        user_id: props.id,
      });

      var requestOptions2 = {
        method: "POST",
        headers: myHeaders2,
        body: raw2,
        redirect: "follow",
      };

      fetch(api + "/api/v1/sendmessagemail", requestOptions2)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const block = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      block_user_id: list[0].userdetails?.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/userblock", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // profile_data()
        // setmessage("")
        navigate("/search-providers/" + slugdata.id);
      })
      .catch((error) => console.log("error", error));
  };
  const repost = () => {
    if (report.resion != "") {
      setreport({ ...report, error: "" });
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        report_userid: list[0].userdetails?.id,
        reason: report.resion,
        other_reason: "",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(api + "/api/v1/reportuser", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // profile_data()
          // setmessage("")
          setshowflogin(true);
        })
        .catch((error) => console.log("error", error));
    } else {
      setreport({ ...report, error: "error" });
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
      msg_ids: [list && list[0]?.getmessages[0]?.msg_id],
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
        navigate("/search-providers/" + slugdata.id);
        props.list();
      })
      .catch((error) => console.log("error", error));
  };
  // textarea.addEventListener('keypress', function(e) {
  //     p_standard.textContent = e.target.value
  //     p_wrap.textContent = e.target.value
  //   })
  return (
    <>
      {list && list[0] ? (
        <>
          <h2 className="border"></h2>
          <div className="message_chet">
            {list && list[0].userdetails ? (
              <div className="top_profile">
                <div className="left_p" onClick={(e) => setactive(false)}>
                  <img
                    src={
                      api +
                      "/public/assets/images/users/" +
                      (list && list[0].userdetails?.file_path)
                    }
                  />
                  <span>
                    <h2>
                      {list && list[0].userdetails?.first_name}{" "}
                      {list && list[0].userdetails?.last_name}
                    </h2>
                    <p>
                      {list && list[0].userdetails?.reviewAvg >= 0 ? (
                        <>
                          {[
                            ...Array(list && list[0].userdetails?.reviewAvg),
                          ].map((star, index) => {
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
                          })}
                          {[
                            ...Array(
                              5 - (list && list[0].userdetails?.reviewAvg)
                            ),
                          ].map((star, index) => {
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
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      <span> ({list && list[0].userdetails?.reviewcount})</span>
                    </p>
                    <p>{list && list[0].userdetails?.address}</p>
                  </span>
                </div>
                {active ? (
                  <div
                    className="bg_off"
                    onClick={(e) => setactive(false)}
                  ></div>
                ) : (
                  ""
                )}

                <div className="right_p">
                  <Link
                    to={
                      list &&
                      list[0] &&
                      list[0]?.userdetails?.user_type == "provider"
                        ? "/profile-provider/" +
                          (list && list[0] && list[0]?.userdetails?.id)
                        : "/profile-parents/" +
                          (list && list[0] && list[0]?.userdetails?.id)
                    }
                  >
                    {t("View profile")}
                  </Link>
                  <div className="select message_select">
                    <button onClick={(e) => setactive(!active)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="4"
                        height="16"
                        viewBox="0 0 4 16"
                        fill="none"
                      >
                        <circle
                          cx="1.84617"
                          cy="1.84617"
                          r="1.84617"
                          fill="#636363"
                        />
                        <circle
                          cx="1.84617"
                          cy="8.00046"
                          r="1.84617"
                          fill="#636363"
                        />
                        <circle
                          cx="1.84617"
                          cy="14.1528"
                          r="1.84617"
                          fill="#636363"
                        />
                      </svg>
                    </button>
                    {active ? (
                      <>
                        <ul>
                          <li
                            onClick={(e) => {
                              setreviewmodel(true);
                            }}
                          >
                            {t("Delete")}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="16"
                              viewBox="0 0 14 16"
                              fill="none"
                            >
                              <path
                                d="M0 2.625V1.75C0 1.33438 0.334375 1 0.75 1H4.25L4.54375 0.415625C4.66875 0.159375 4.92812 0 5.2125 0H8.78437C9.06875 0 9.32812 0.159375 9.45625 0.415625L9.75 1H13.25C13.6656 1 14 1.33438 14 1.75V2.625C14 2.83125 13.8312 3 13.625 3H0.375C0.16875 3 0 2.83125 0 2.625ZM12.975 4.39687L12.3375 14.5938C12.2875 15.3844 11.6312 16 10.8406 16H3.15937C2.36875 16 1.7125 15.3844 1.6625 14.5938L1.025 4.39687C1.0125 4.18125 1.18437 4 1.4 4H12.6031C12.8156 4 12.9875 4.18125 12.975 4.39687Z"
                                fill="#636363"
                              />
                            </svg>
                          </li>
                          {/* <li onClick={e => {
                                                            setrecived("Safety")
                                                            setactive(!active)
                                                        }} >Safety
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6667 5.33333H9.90476V3.80952C9.90476 1.70667 8.1981 0 6.09524 0C3.99238 0 2.28571 1.70667 2.28571 3.80952V5.33333H1.52381C0.685714 5.33333 0 6.01905 0 6.85714V14.4762C0 15.3143 0.685714 16 1.52381 16H10.6667C11.5048 16 12.1905 15.3143 12.1905 14.4762V6.85714C12.1905 6.01905 11.5048 5.33333 10.6667 5.33333ZM6.09524 12.1905C5.25714 12.1905 4.57143 11.5048 4.57143 10.6667C4.57143 9.82857 5.25714 9.14286 6.09524 9.14286C6.93333 9.14286 7.61905 9.82857 7.61905 10.6667C7.61905 11.5048 6.93333 12.1905 6.09524 12.1905ZM3.80952 3.80952V5.33333H8.38095V3.80952C8.38095 2.54476 7.36 1.52381 6.09524 1.52381C4.83048 1.52381 3.80952 2.54476 3.80952 3.80952Z" fill="#636363" />
                                                            </svg>
                                                        </li> */}
                          <li
                            onClick={(e) => {
                              setrecived("Block user");
                              setactive(!active);
                              block();
                            }}
                          >
                            {list && list[0].userdetails?.blockUser == true
                              ? t("Unblock user")
                              : t("Block user")}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM1.6 8C1.6 4.464 4.464 1.6 8 1.6C9.48 1.6 10.84 2.104 11.92 2.952L2.952 11.92C2.104 10.84 1.6 9.48 1.6 8ZM4.08021 13.0482C5.16021 13.8962 6.52021 14.4002 8.00021 14.4002C11.5362 14.4002 14.4002 11.5362 14.4002 8.00021C14.4002 6.52021 13.8962 5.16021 13.0482 4.08021L4.08021 13.0482Z"
                                fill="#636363"
                              />
                            </svg>
                          </li>
                          <li
                            onClick={(e) => {
                              setrecived("Report");
                              setactive(!active);
                              setsurvay(true);
                            }}
                          >
                            {t("Report")}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              style={{ fill: "#fff" }}
                            >
                              <circle cx="8" cy="8" r="7.5" stroke="#7D2B8B" />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.0224 10.8435C11.0224 11.6258 10.3824 12.2658 9.6002 12.2658H7.00464C6.62064 12.2658 6.25797 12.1129 5.99131 11.8426L3.2002 9.00531C3.2002 9.00531 3.54174 8.64978 3.66242 8.56087C3.78309 8.47195 3.83814 8.46759 3.94331 8.45776C4.04847 8.44792 4.09264 8.47909 4.15664 8.51464C4.17086 8.5182 5.68909 9.38931 5.68909 9.38931V5.15464C5.68909 4.85953 5.92731 4.62131 6.22242 4.62131C6.51753 4.62131 6.75575 4.85953 6.75575 5.15464V7.64353H7.11131V4.26576C7.11131 3.97064 7.34953 3.73242 7.64464 3.73242C7.93975 3.73242 8.17797 3.97064 8.17797 4.26576V7.64353H8.53353V4.62131C8.53353 4.3262 8.77175 4.08798 9.06686 4.08798C9.36197 4.08798 9.6002 4.3262 9.6002 4.62131V7.64353H9.95575V5.68798C9.95575 5.39287 10.194 5.15464 10.4891 5.15464C10.7842 5.15464 11.0224 5.39287 11.0224 5.68798V10.8435Z"
                                fill="#7D2B8B"
                                style={{ fill: "#7D2B8B" }}
                              />
                            </svg>
                          </li>
                        </ul>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <h2 className="border" style={{ width: "100%" }}></h2>
            <div
              className="chet_message"
              id="parentDiv"
              onClick={(e) => setactive(false)}
            >
              {list && list[0].getmessages
                ? list &&
                  list[0].getmessages.map((data) => {
                    return (
                      <div
                        className={data.sender_id == plink ? "send" : "recive"}
                      >
                        <img
                          src={
                            api +
                            "/public/assets/images/users/" +
                            (data.sender_id == plink
                              ? data.senderImage
                              : list && list[0].userdetails?.file_path)
                          }
                        />
                        <div className="message_view">{data.message}</div>
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
                          {new Date(data.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    );
                  })
                : ""}
            </div>
            {list && list[0].userdetails?.blockUser == false ? (
              list && list[0]?.userdetails?.blockbycurrentuser == false ? (
                <div className="send_input">
                  <p className="blocked">{errormsg}</p>
                  <textarea
                    type="text"
                    id="textarea"
                    placeholder={t("Type here")}
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                  />
                  <button
                    onClick={accept}
                    style={messagecheck == true ? { opacity: "0.5" } : {}}
                    disabled={messagecheck}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="27"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path d="M14.8763 0.100971L0.390353 8.45812C-0.175333 8.78315 -0.10345 9.57074 0.45911 9.80826L3.78134 11.2022L12.7604 3.28881C12.9323 3.13567 13.1761 3.37007 13.0292 3.54822L5.50028 12.7211V15.237C5.50028 15.9745 6.391 16.2652 6.82854 15.7308L8.81313 13.3149L12.7073 14.9463C13.1511 15.1338 13.6574 14.8557 13.7387 14.3775L15.9889 0.876054C16.0952 0.244736 15.417 -0.211562 14.8763 0.100971Z" />
                    </svg>
                    {t("Send")}
                  </button>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {list && list[0].userdetails?.blockUser == true ? (
              <p className="blocked" onClick={block}>
                {t("Blocked")}
              </p>
            ) : list && list[0]?.userdetails?.blockbycurrentuser == true ? (
              <p className="blocked">{t("This user blocked you.")}</p>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        ""
      )}
      {survay ? (
        <Modal show={survay} onHide={(e) => setsurvay(false)}>
          <Modal.Body>
            <div className="promocode_content cancelmembership report">
              <Link to="" onClick={(e) => setsurvay(false)}>
                +{" "}
              </Link>
              <svg
                onClick={(e) => setsurvay(true)}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.6667 20.3333C20.6667 21.8 19.4667 23 18 23H13.1333C12.4133 23 11.7333 22.7133 11.2333 22.2067L6 16.8867C6 16.8867 6.6404 16.2201 6.86667 16.0533C7.09293 15.8866 7.19614 15.8784 7.39333 15.86C7.59052 15.8416 7.67333 15.9 7.79333 15.9667C7.82 15.9733 10.6667 17.6067 10.6667 17.6067V9.66667C10.6667 9.11333 11.1133 8.66667 11.6667 8.66667C12.22 8.66667 12.6667 9.11333 12.6667 9.66667V14.3333H13.3333V8C13.3333 7.44667 13.78 7 14.3333 7C14.8867 7 15.3333 7.44667 15.3333 8V14.3333H16V8.66667C16 8.11333 16.4467 7.66667 17 7.66667C17.5533 7.66667 18 8.11333 18 8.66667V14.3333H18.6667V10.6667C18.6667 10.1133 19.1133 9.66667 19.6667 9.66667C20.22 9.66667 20.6667 10.1133 20.6667 10.6667V20.3333Z"
                  fill="#7D2B8B"
                />
              </svg>
              <h2>{t("Report User")}</h2>
              <div className="cancelmembershipp">
                <p>
                  <b>
                    {t(
                      "In order to process your request, we need a little bit more information from you."
                    )}
                  </b>
                </p>
                <div class="onepxline"></div>
                <p className={report.error != "" ? "active second" : "second"}>
                  {t("What is the reason you want to report this profile?")}
                </p>
                <br />
                <ul>
                  <li>
                    <input
                      type={"radio"}
                      id="survay"
                      name="survay"
                      onClick={(e) =>
                        setreport({
                          ...report,
                          resion: "User sent an unsolicited message",
                          error: "",
                        })
                      }
                    />
                    <span> {t("User sent an unsolicited message")}</span>
                  </li>
                  <li>
                    <input
                      type={"radio"}
                      id="survay"
                      name="survay"
                      onClick={(e) =>
                        setreport({
                          ...report,
                          resion: "Security and verification issue",
                          error: "",
                        })
                      }
                    />
                    <span> {t("Security and verification issue")}</span>
                  </li>
                </ul>
                <p className="giveus">{t("Give us more details")}</p>
                <div className="comment">
                  <textarea
                    className={
                      report.resion == "other" && report.other == ""
                        ? "bordererror"
                        : ""
                    }
                    maxlength="70"
                    placeholder={t("Type here...")}
                    onChange={(e) =>
                      setreport({ ...report, other: e.target.value, error: "" })
                    }
                  ></textarea>
                  <span>
                    {t("Number of characters")} {70 - report.other.length}
                  </span>
                </div>
                <div class="button text-center">
                  <div class="pull-right">
                    <button class="btn" onClick={(e) => repost()}>
                      {t("Report User")}
                    </button>
                  </div>
                  <div class="pull-right">
                    <button
                      class="btn confirm"
                      onClick={(e) => setsurvay(false)}
                    >
                      {t("Cancel")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {showflogin ? (
        <Modal show={showflogin} onHide={(e) => setshowflogin(false)}>
          <Modal.Body>
            <div className="promocode_content cancelmembership reportthanks">
              <div className="">
                <p>
                  <strong>{t("Thank you for your message.")}</strong>
                </p>
                <br />
                <p className={"second"}>
                  <b>
                    {t(
                      "SensCare is taking your safety very seriously. Please allow us up to 48hrs to further investigate this inquiry."
                    )}
                  </b>{" "}
                </p>
                <br />
                <p className="giveus">
                  {t("In the meantime, please visit our")}
                  <Link to="/safety-center" target={"_blank"}>
                    {t("Safety center")}
                  </Link>{" "}
                  {t("and")}
                  <Link to="/faq" target={"_blank"}>
                    {t("FAQ")}
                  </Link>{" "}
                  {t("for more info.")}
                </p>

                <div class="button text-center">
                  <div class="pull-right">
                    <button
                      class="btn"
                      onClick={(e) => {
                        setshowflogin();
                        navigate("/search-providers/" + slugdata.id);
                        setsurvay(false);
                      }}
                    >
                      {t("Close")}
                    </button>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
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
                      setreviewmodel(false);
                    }}
                  >
                    {t("No")}
                  </button>
                  <button
                    class="btn"
                    onClick={(e) => {
                      setrecived("Delete");
                      setactive(!active);
                      delete_in();
                      setreviewmodel(false);
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
    </>
  );
}

export default Message_chet;
