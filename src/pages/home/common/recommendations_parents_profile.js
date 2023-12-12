import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../urls";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

function Recommendations_parents_profile(props) {
  const navigate = useNavigate();
  const { t } = useTranslation("recomendation");
  const [list, setlist] = useState([]);
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
  const [recommend, setrecommend] = useState("");
  const [request, setrequest] = useState(false);
  const [plink, setplink] = useState(true);
  const [message, setmessage] = useState("");
  const [docmodel, setdocmodel] = useState(false);
  const [doc, setdoc] = useState("");
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
      recommendation_id: props.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/recommendationrequestview", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setlist(result.data.data);
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
    console.log(list);
  }, [check]);
  const [strip, setstrip] = useState("");

  const recommendation = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var formdata = new FormData();
    formdata.append("recommendation_id", props.id);
    formdata.append("recommendation_response", doc);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      api + "/api/v1/parentsrecommendationrequestresponsesend",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setdocmodel(false);
        setdoc("");
        setstrip("1");
        setrecommend("1");
        setTimeout(() => {
          setstrip("");
        }, 2000);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      {strip == "1" ? (
        <div className="popup_status" id="popup_status">
          {t("Congratulations! You successfully sent a recommendation.")}
        </div>
      ) : (
        ""
      )}
      {list && list[0] ? (
        <>
          <h2 className="border"></h2>
          <div className="detail_invit">
            <p style={{ fontSize: "16px", fontWeight: "600" }}>
              <Link to={"/profile-provider/" + list[0]?.user_id}>
                {list && list[0] && list[0].ProviderName}
              </Link>{" "}
              {t("requested a recommendation from you")}
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
                {new Date(list && list[0] && list[0].created_at).getFullYear()},{" "}
                {new Date(
                  list && list[0] && list[0].created_at
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
            <h2 style={{ padding: "15px 0 0" }}>
              {t("Dear")}
              <span style={{ textTransform: "capitalize", marginLeft: "0" }}>
                <span>{message}</span>
              </span>
              ,
            </h2>
            <h2>{t("You’ve been requested to give a recommendation!")}</h2>
            <p>
              {t(
                "A recommendation will increase user's chances of getting hired."
              )}
            </p>
          </div>
          <div class="right_side_section">
            <div class="looking_for_candidate">
              {list.map((data, index) => {
                return (
                  <div className="recommend recomendbig">
                    <div className="image">
                      <img
                        src={
                          data.ProviderImage != null
                            ? api +
                              "/public/assets/images/users/" +
                              data.ProviderImage
                            : window.location.origin +
                              window.location.origin +
                              "/img/nany_img.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="detail">
                      <h3>{data.ProviderName}</h3>
                      <p>{data.recommendation_message}</p>
                      <button
                        disabled={
                          data.recommendation_response != null ||
                          recommend != ""
                            ? true
                            : false
                        }
                        onClick={(e) => setdocmodel(true)}
                        style={
                          data.recommendation_response != null ||
                          recommend != ""
                            ? { opacity: "0.5" }
                            : {}
                        }
                      >
                        {t("Leave Recommendation")}
                      </button>
                    </div>
                    <p>
                      {t(
                        "The recommendation letter should contain your feedback regarding providers' work achievements and responsibilities. It also can help other families to verify future candidate eligibility and performances"
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {/* {request ?
                <Modal show={request} onHide={e => setrequest(false)
                } >
                    <Modal.Body>
                        <div className='promocode_content signout invite request recome'>
                            <Link to="" onClick={e => setrequest(false)}>+ </Link>
                            <h2>Ask for Recommendation</h2>
                            <p>Ask <span><span>{message}</span></span> for a recommendation letter so that you can share with prospective employers what an outstanding and committed employee you are.</p>
                            <div className='form_groupre'>
                                <label>Write Recommendation</label>

                                <textarea placeholder='Type here' onChange={e => setrecommend(e.target.value)} maxLength="300">

                                </textarea>
                                <span>Number of characters {300 - recommend.length}</span>
                            </div>
                            <div class="button text-center ">
                                <div class="pull-right">
                                    <button class="btn" onClick={e => setrequest(false)}>Cancel</button>
                                </div>
                                <div class="pull-right">
                                    <button class="btn confirm" onClick={e => recommendation()}>Send request</button>
                                </div>

                            </div>
                        </div>
                    </Modal.Body>
                </Modal > : ""} */}
      {docmodel ? (
        <Modal show={docmodel} onHide={(e) => setdocmodel(false)}>
          <Modal.Body>
            <div className="promocode_content signout senddoc">
              <Link to="" onClick={(e) => setdocmodel(false)}>
                +{" "}
              </Link>
              <h2>{t("Select your documents from")}</h2>
              <ul>
                {/* <li>
                                    <span class="view-message  dont-show">
                                        <input type="radio" class="mail-radio" name="chk" defaultChecked="true" name="family" />
                                        <span className='circle'></span>
                                    </span>
                                    <span className='bothtype'>
                                        <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27 3H15L12.885 0.885C12.315 0.315 11.55 0 10.755 0H3C1.35 0 0.015 1.35 0.015 3L0 21C0 22.65 1.35 24 3 24H27C28.65 24 30 22.65 30 21V6C30 4.35 28.65 3 27 3ZM19.5 7.5C21.15 7.5 22.5 8.85 22.5 10.5C22.5 12.15 21.15 13.5 19.5 13.5C17.85 13.5 16.5 12.15 16.5 10.5C16.5 8.85 17.85 7.5 19.5 7.5ZM13.5 18V19.5H25.5V18C25.5 16.005 21.495 15 19.5 15C17.505 15 13.5 16.005 13.5 18Z" fill="#B7B7B7" />
                                        </svg>
                                        <p>
                                            <h3>My Documents</h3>
                                            <span>Select from the files stored on SensCare Platform</span>
                                        </p>

                                    </span>
                                </li> */}
                <li>
                  <span class="view-message  dont-show">
                    <input
                      type="radio"
                      class="mail-radio"
                      name="chk"
                      defaultChecked="true"
                    />
                    <span className="circle"></span>
                  </span>
                  <span className="bothtype">
                    <svg
                      width="36"
                      height="24"
                      viewBox="0 0 36 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M32.985 18C32.985 19.65 31.65 21 30 21H34.5C35.325 21 36 21.675 36 22.5C36 23.325 35.325 24 34.5 24H1.5C0.675 24 0 23.325 0 22.5C0 21.675 0.675 21 1.5 21H6C4.35 21 3 19.65 3 18V3C3 1.35 4.35 0 6 0H30C31.65 0 33 1.35 33 3L32.985 18ZM28.5 3H7.5C6.675 3 6 3.675 6 4.5V16.5C6 17.325 6.675 18 7.5 18H28.5C29.325 18 30 17.325 30 16.5V4.5C30 3.675 29.325 3 28.5 3Z"
                        fill="#B7B7B7"
                      />
                    </svg>
                    <p>
                      <h3>{t("My Computer")}</h3>
                      <span>
                        {t("Select from the files stored on your computer")}
                      </span>
                    </p>
                  </span>
                </li>
                <li>
                  <span class="view-message  dont-show">
                    <input type="radio" class="mail-radio" name="chk" />
                    <span className="circle"></span>
                  </span>
                  <span className="bothtype">
                    <svg
                      width="30"
                      height="21"
                      viewBox="0 0 30 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 12.8897V17.9073C30 19.2929 28.8807 20.4161 27.5 20.4161H2.5C1.11927 20.4161 0 19.2929 0 17.9073V12.8897C0 11.5041 1.11927 10.3809 2.5 10.3809H27.5C28.8807 10.3809 30 11.5041 30 12.8897ZM27.5 8.70838C28.0503 8.7079 28.5953 8.81743 29.103 9.0306L24.0755 1.46285C23.8472 1.11921 23.5379 0.837442 23.175 0.642561C22.8121 0.447679 22.4069 0.34571 21.9954 0.345703H8.00463C7.59307 0.345704 7.18787 0.447672 6.82501 0.642554C6.46214 0.837437 6.15283 1.11921 5.92453 1.46285L0.897031 9.0306C1.40473 8.81743 1.94966 8.7079 2.5 8.70838H27.5ZM25 13.726C24.0795 13.726 23.3333 14.4748 23.3333 15.3985C23.3333 16.3222 24.0795 17.0711 25 17.0711C25.9205 17.0711 26.6667 16.3222 26.6667 15.3985C26.6667 14.4748 25.9205 13.726 25 13.726ZM20 13.726C19.0795 13.726 18.3333 14.4748 18.3333 15.3985C18.3333 16.3222 19.0795 17.0711 20 17.0711C20.9205 17.0711 21.6667 16.3222 21.6667 15.3985C21.6667 14.4748 20.9205 13.726 20 13.726Z"
                        fill="#B7B7B7"
                      />
                    </svg>
                    <p>
                      <h3>{t("Drive")}</h3>
                      <span>
                        {t("Select from the files stored on your drive")}
                      </span>
                    </p>
                  </span>
                </li>
              </ul>
              <div className="file">
                <label>{t("File name")}</label>
                <div className="group_label">
                  <span>{doc == "" ? t("Choose file") : doc.name}</span>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (
                        e.target.files[0].name !=
                        "The upload does not work properly.docx"
                      ) {
                        setdoc(e.target.files[0]);
                      }
                    }}
                    accept=".doc, .docx"
                  />
                  <button onClick={(e) => recommendation()}>
                    {t("Submit")}
                  </button>
                </div>
              </div>
              <p class="hide">
                {" "}
                {t("Please visit our")}{" "}
                <Link to="/faq" target="_blank">
                  {t("FAQ")}
                </Link>{" "}
                {t("page ands")}{" "}
                <Link to="/safety-center" target="_blank">
                  {t("Safety center")}
                </Link>{" "}
                {t("to read our safety tips and instructions.")}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default Recommendations_parents_profile;
