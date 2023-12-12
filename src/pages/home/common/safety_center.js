import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { api } from "../../../urls";
import Footer from "./footer";
import Header from "./header";
import { useTranslation } from "react-i18next";

function Safety_center() {
  const [count, setcount] = useState(true);
  const [investor, setinvestor] = useState({});
  const [selecttab, setselecttab] = useState("tab1");
  const [location, setlocation] = useState(useLocation());
  const { t } = useTranslation("safetyCenter");

  useEffect(() => {
    if (count) {
      if (location.hash == "#parents") {
        setselecttab("tab2");
        window.scrollTo({ top: 330, behavior: "smooth" });
      } else if (location.hash == "#provider") {
        setselecttab("tab1");
        window.scrollTo({ top: 330, behavior: "smooth" });
      } else if (location.hash == "#school") {
        setselecttab("tab3");
        window.scrollTo({ top: 330, behavior: "smooth" });
      }
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(api + "/api/safetycenter", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setinvestor(result.data);
          console.log(result.data);
        })
        .catch((error) => console.log("error", error));
      setcount(false);
    }
    var myClickableElem = document.getElementById("question1");
    var myClickableElem2 = document.getElementById("question2");
    var myClickableElem3 = document.getElementById("question3");
    myClickableElem
      ? (myClickableElem.onclick = function () {
          localStorage.setItem(
            "faq",
            t("How do I report a member due to safety concerns or inappropriate conduct?")
          );
          window.location.hash = "provider";
          setTimeout(() => {
            window.location.replace("/faq");
          }, 200);
        })
      : (myClickableElem = document.getElementById("question1"));
    myClickableElem2
      ? (myClickableElem2.onclick = function () {
          localStorage.setItem(
            "faq",
            t("How do I report a member due to safety concerns or inappropriate conduct?")
          );
          window.location.hash = "parents";
          setTimeout(() => {
            window.location.replace("/faq");
          }, 200);
        })
      : (myClickableElem2 = document.getElementById("question1"));
    myClickableElem3
      ? (myClickableElem3.onclick = function () {
          localStorage.setItem(
            "faq",
            t("How do I report a member due to safety concerns or inappropriate conduct?")
          );
          window.location.hash = "school";
          setTimeout(() => {
            window.location.replace("/faq");
          }, 200);
        })
      : (myClickableElem3 = document.getElementById("question1"));
  }, [count, investor]);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="container">
          <div className="contact privacy safety">
            <div className="left">
              <h2>{t("Safety Center")}</h2>
              {selecttab == "tab1" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: t("description_for_providers", {
                      defaultValue: investor.description_for_providers,
                    }),
                  }}
                  className="privacycon safe_center"
                />
              ) : selecttab == "tab2" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: t("description_for_parents", {
                      defaultValue: investor.description_for_parents,
                    }),
                  }}
                  className="privacycon safe_center"
                />
              ) : selecttab == "tab3" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: t("description_for_school", {
                      defaultValue: investor.description_for_school,
                    }),
                  }}
                  className="privacycon safe_center"
                />
              ) : (
                ""
              )}
            </div>
            <div className="right">
              <img
                src={
                  "https://admin.senscare.sdsstaging.co.uk/assets/cms/" +
                  investor.image
                }
              />
              <h3>
                {t(
                  "Your safety is very important to us. SensCare is always here to support you."
                )}
              </h3>
            </div>
          </div>
          <div className="contact safety" id="safety_tips">
            <h2>{t("Choose safety tips for")}</h2>
            <div className="tabing">
              <button
                className={selecttab == "tab1" ? "active" : ""}
                onClick={(e) => {
                  window.location.hash = "provider";
                  setselecttab("tab1");
                }}
              >
                {t("For providers")}
              </button>
              <button
                className={selecttab == "tab2" ? "active" : ""}
                onClick={(e) => {
                  window.location.hash = "parents";
                  setselecttab("tab2");
                }}
              >
                {t("For parents")}
              </button>
              <button
                className={selecttab == "tab3" ? "active" : ""}
                onClick={(e) => {
                  window.location.hash = "school";
                  setselecttab("tab3");
                }}
              >
                {t("For schools")}
              </button>
            </div>
          </div>
        </div>
        <div className={"tab1 " + (selecttab == "tab1" ? "active" : "")}>
          <div className="provider_tabing">
            <div className="container">
              <div className="contact safety_tips">
                <h3>{t("Safety tips at glance")}</h3>
                <ul>
                  <li>
                    <img src="./images/verify.svg" />
                    <h4>
                      {t("Check if the")} <br /> {t("profile is")}{" "}
                      <span>{t(" verified")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/sreview.svg" />
                    <h4>
                      {t("Check")} <br />
                      <span>{t("reviews")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/sinterview.svg" />
                    <h4>
                      {t("Prepare for an online")} <span>{t("interview")}</span>{" "}
                      {t("or a meeting in a public space")}{" "}
                    </h4>
                  </li>
                  <li>
                    <img src="./images/probation.svg" />
                    <h4>
                      {t("Consider")} <br />
                      <span>{t("probation period")}</span>
                    </h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="more_tips contact">
              <h3>{t("See here for more details on Safety tips")}</h3>
              <ul>
                <li>
                  <img src="./images/verify_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("1st step:")}:{" "}
                      <span>
                        <Link
                          to="/faq"
                          onClick={(e) => {
                            window.location.hash = "provider";
                            localStorage.setItem(
                              "faq",
                              t("I have found a great job post, how can I apply for it?")
                            );
                          }}
                        >
                          {t("Choose family/school")}
                        </Link>
                      </span>
                    </h5>
                    <p>
                      {t("firstImportant")}{" "}
                      <Link
                        to="/faq"
                        onClick={(e) => {
                          window.location.hash = "provider";
                          localStorage.setItem(
                            "faq",
                            t("I have found a great job post, how can I apply for it?")
                          );
                        }}
                      >
                        {t("apply for jobs")}
                      </Link>
                      {t(
                        ". The next step is to schedule an interview and find the right employer."
                      )}
                    </p>
                  </div>
                </li>
                <li>
                  <img src="./images/rating_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("second")} <span>{t("Check reviews")}</span>
                    </h5>
                    <p>{t("checkReviews")}</p>
                  </div>
                </li>
                <li>
                  <img src="./images/interview_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("3rd step:")} <span>{t("Interview steps")}</span>
                    </h5>
                    <p>
                      {t("nextChoose")}
                      <br />
                      {t("youCanShare")}
                      <br />
                      {t(
                        "Now is the time to get to know your prospective employer."
                      )}
                    </p>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  <img src="./images/finger_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("4th step:")}{" "}
                      <span>{t("Get to know an employer better.")}</span>
                    </h5>
                    <p>{t("getToKnow")}</p>
                  </div>
                </li>

                <li className="inner">
                  <img src="./images/int_pup.svg" />
                  <div className="morecontent">
                    <h3>{t("Interview questions")}</h3>
                    <p>
                      {t("1. Could you tell me more about your family/school?")}
                      <br />
                      {t("2. Could you elaborate on my specific duties?")}
                      <br />
                      {t(
                        "3. What are your expectations of an ideal candidate in this position?"
                      )}
                    </p>
                  </div>
                </li>
                <li>
                  <img src="./images/probation_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("5th step:")} <span>{t("Probation period")}</span>
                    </h5>
                    <p>{t("beforeOfficial")}</p>
                    <img src="./images/thank_banner.png" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={"tab1 " + (selecttab == "tab2" ? "active" : "")}>
          <div className="provider_tabing">
            <div className="container">
              <div className="contact safety_tips parents">
                <h3>{t("Safety tips at glance")}</h3>
                <ul>
                  <li>
                    <img src="./images/verify.svg" />
                    <h4>
                      {t("Check if the")}
                      <br /> {t("profile is")} <span>{t(" verified")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/sreview.svg" />
                    <h4>
                      {t("Check")} <br />
                      <span>{t("reviews")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/sinterview.svg" />
                    <h4>
                      {t("Schedule an online")} <span>{t("interview")}</span>{" "}
                      {t("or a meeting in a public space")}{" "}
                    </h4>
                  </li>
                  <li>
                    <img src="./images/finger.svg" />
                    <h4>
                      {t("Request the")} <br />
                      <span>{t("background check")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/search_bg.svg" />
                    <h4>
                      {t("Check out")} <br />
                      <span>{t("references")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/probation.svg" />
                    <h4>
                      {t("Consider")} <br />
                      <span>{t("probation period")}</span>
                    </h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="more_tips contact">
              <h3>{t("See here for more details on Safety tips")}</h3>
              <ul>
                <li>
                  <img src="./images/verify_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("1st step:")}{" "}
                      <span>
                        <Link
                          to="/faq"
                          onClick={(e) => {
                            window.location.hash = "parents";
                            localStorage.setItem(
                              "faq",
                              "I found a professional child service provider, how can I send an interview invite?"
                            );
                          }}
                        >
                          {t("Selecting the right candidate")}
                        </Link>
                      </span>
                    </h5>
                    <p>
                      {t("The first important step in")}{" "}
                      <strong>{t("selecting the right candidate")}</strong>{" "}
                      {t("selectingCandidate")}{" "}
                      <Link
                        to="/faq"
                        onClick={(e) => {
                          window.location.hash = "parents";
                          localStorage.setItem(
                            "faq",
                            t("I found a professional child service provider, how can I send an interview invite?")
                          );
                        }}
                      >
                        {t("invite a candidate for an interview")}
                      </Link>{" "}
                      {t("onceYouHave")}
                    </p>
                  </div>
                </li>
                <li>
                  <img src="./images/rating_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("second")} <span>{t("Check reviews")}</span>
                    </h5>
                    <p>{t("CheckCandidate")}</p>
                  </div>
                </li>
                <li>
                  <img src="./images/finger_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("3rd step")} <span>{t("Schedule an interview")}</span>
                    </h5>
                    <p>
                      {" "}
                      {t("Sledece")}
                      <Link
                        to="/faq"
                        onClick={(e) => {
                          window.location.hash = "parents";
                          localStorage.setItem(
                            "faq",
                            t("How can I request a background check?")
                          );
                        }}
                      >
                        {t("here")}
                      </Link>{" "}
                      {t("to learn how to request a background check and")}{" "}
                      <Link
                        to="/faq"
                        onClick={(e) => {
                          window.location.hash = "parents";
                          localStorage.setItem(
                            "faq",
                            t("How can I request a CV and references from providers via SensCare platform?")
                          );
                        }}
                      >
                        {t("here")}
                      </Link>{" "}
                      {t("requestAdditional")}
                    </p>
                  </div>
                </li>
                <li>
                  <img src="./images/interview_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("4th step:")}{" "}
                      <span>{t("Get to know an employer better")}</span>
                    </h5>
                    <p>{t("duringTheInterview")}</p>
                  </div>
                </li>

                <li className="inner">
                  <img src="./images/int_pup.svg" />
                  <div className="morecontent">
                    <h3>{t("General Interview questions")}</h3>
                    <p>
                      {t("1. Could you tell us something about yourself?")}
                      <br />
                      {t("2. How long have you worked with children?")}
                      <br />
                      {t(
                        "3. Please, tell us more about your experience and give us some examples of your work duties?"
                      )}
                      <br />
                      {t("ellaborate")}
                      <br />
                      {t("5. Describe your work philosophy?")}
                    </p>
                  </div>
                </li>
                <li className="inner">
                  <img src="./images/int_pup.svg" />
                  <div className="morecontent">
                    <h3>{t("Specific Interview questions for families")}</h3>
                    <p>
                      {t(
                        "1. How would you handle it if my child refuses to eat?"
                      )}
                      <br />
                      {t("tantrum")}
                      <br />
                      {t(
                        "3. How would you support my child with special needs?"
                      )}
                      <br />
                      {t("4. Would you be willing to travel abroad with us?")}
                      <br />
                      {t(
                        "5. Could you provide transportation for our children?"
                      )}
                      <br />
                      {t("lightHouse")}
                      <br />
                      {t("7. Do you have any questions about our family?")}
                      <br />
                      {t("substance")}
                      <br />
                      {t("medical")}
                    </p>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  <img src="./images/interview_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("5th step:")} <span>{t("Check references")}</span>
                    </h5>
                    <p>{t("oneMoreStep")}</p>
                  </div>
                </li>

                <li className="inner out">
                  <img src="./images/flag_bro.svg" />
                  <div className="morecontent">
                    <p>
                      <strong>{t("Category I:")}</strong>{" "}
                      {t("referencesWereHappy")}
                    </p>
                  </div>
                </li>
                <li className="inner out">
                  <img src="./images/flag_pur.svg" />
                  <div className="morecontent">
                    <p>
                      <strong>{t("Category II:")}</strong>{" "}
                      {t("referencesWereNonResponsive")}{" "}
                    </p>
                  </div>
                </li>
                <li>
                  <img src="./images/probation_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("6th step:")} <span>{t("Probation period")}</span>
                    </h5>
                    <p>
                      {t("official")}
                      <strong>{t("probation period second")}</strong>
                      {t("probationLimited")}{" "}
                    </p>
                    <img src="./images/thank_banner.png" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={"tab1 " + (selecttab == "tab3" ? "active" : "")}>
          <div className="provider_tabing">
            <div className="container">
              <div className="contact safety_tips parents">
                <h3>{t("Safety tips at glance")}</h3>
                <ul>
                  <li>
                    <img src="./images/verify.svg" />
                    <h4>
                      {t("Check if the")} <br /> {t("profile is")}{" "}
                      <span>{t(" verified")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/sreview.svg" />
                    <h4>
                      {t("Check")} <br />
                      <span>{t("reviews")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/sinterview.svg" />
                    <h4>
                      {t("Schedule an")} <br /> <span>{t("interview")}</span>{" "}
                    </h4>
                  </li>
                  <li>
                    <img src="./images/finger.svg" />
                    <h4>
                      {t("Request the")} <br />
                      <span>{t("background check")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/search_bg.svg" />
                    <h4>
                      {t("Check out")} <br />
                      <span>{t("references")}</span>
                    </h4>
                  </li>
                  <li>
                    <img src="./images/probation.svg" />
                    <h4>
                      {t("Consider")} <br />
                      <span>{t("probation period")}</span>
                    </h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="more_tips contact">
              <h3>{t("See here for more details on Safety tips")}</h3>
              <ul>
                <li>
                  <img src="./images/verify_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("1st step:")}{" "}
                      <span>
                        <Link to="/faq">
                          {t("Selecting the right candidate")}
                        </Link>
                      </span>
                    </h5>
                    <p>
                      {" "}
                      {t("The first important step in")}{" "}
                      <strong>{t("selecting the right candidate")}</strong>{" "}
                      {t("selectingCandidate")}{" "}
                      <Link
                        to="/faq"
                        onClick={(e) => {
                          window.location.hash = "school";
                          localStorage.setItem(
                            "faq",
                            t("I found a professional child service provider, how can I send an interview invite?")
                          );
                        }}
                      >
                        {t("invite a candidate for an interview")}
                      </Link>{" "}
                      {t("onceYouHave")}
                    </p>
                  </div>
                </li>
                <li>
                  <img src="./images/rating_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("second")} <span>{t("Check reviews")}</span>
                    </h5>
                    <p>{t("checkReviewsSchool")}</p>
                  </div>
                </li>
                <li>
                  <img src="./images/finger_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("3rd step:")} <span>{t("Schedule an interview")}</span>
                    </h5>
                    <p>
                      {t("feelMostComfortable")}{" "}
                      <Link
                        to="/faq"
                        onClick={(e) => {
                          window.location.hash = "school";
                          localStorage.setItem(
                            "faq",
                            t("How can I request a background check?")
                          );
                        }}
                      >
                        {t("here")}
                      </Link>{" "}
                      {t("to learn how to request a background check and")}{" "}
                      <Link
                        to="/faq"
                        onClick={(e) => {
                          window.location.hash = "school";
                          localStorage.setItem(
                            "faq",
                            t("How can I request a CV and references from providers via SensCare platform?")
                            
                          );
                        }}
                      >
                        {t("here")}
                      </Link>{" "}
                      {t("requestAdditional")}
                    </p>
                  </div>
                </li>
                <li>
                  <img src="./images/interview_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("4th step:")}{" "}
                      <span>{t("Get to know a candidate better")}</span>
                    </h5>
                    <p>{t("duringInterview")}</p>
                  </div>
                </li>

                <li className="inner">
                  <img src="./images/int_pup.svg" />
                  <div className="morecontent">
                    <h3>{t("General Interview questions")}</h3>
                    <p>
                      {t("1. Could you tell us something about yourself?")}
                      <br />
                      {t("2. How long have you worked with children?")}
                      <br />
                      {t(
                        "3. Please, tell us more about your experience and give us some examples of your work duties?"
                      )}
                      <br />
                      {t("ellaborate")}
                      <br />
                      {t("5. Describe your work philosophy?")}
                    </p>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  <img src="./images/interview_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("5th step:")} <span>{t("Check references")}</span>
                    </h5>
                    <p>
                      {t("One more step before making a hire:")}{" "}
                      <strong>{t("Check the references")}</strong>
                      {t("makeSuretoAsk")}
                    </p>
                  </div>
                </li>

                <li className="inner out">
                  <img src="./images/flag_bro.svg" />
                  <div className="morecontent">
                    <p>
                      <strong>{t("Category I:")}</strong>{" "}
                      {t("referencesWereHappy")}
                    </p>
                  </div>
                </li>
                <li className="inner out">
                  <img src="./images/flag_pur.svg" />
                  <div className="morecontent">
                    <p>
                      <strong>{t("Category II:")}</strong>{" "}
                      {t("referencesWereNonResponsive")}{" "}
                    </p>
                  </div>
                </li>
                <li>
                  <img src="./images/probation_pur.svg" />
                  <div className="morecontent">
                    <h5>
                      {t("6th step:")} <span>{t("Probation period")}</span>
                    </h5>
                    <p>
                      {t(
                        "Before officially hiring, some employers may decide to implement a "
                      )}
                      <strong>{t("probation period")}</strong>
                      {t("probationLimited")}
                    </p>
                    <img src="./images/thank_banner.png" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Safety_center;
