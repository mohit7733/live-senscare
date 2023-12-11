import React, { useState, useEffect } from "react";
import { country } from "./common/country";
import Footer from "./common/footer";
import Header from "./common/header";
import Modal from "react-bootstrap/Modal";
import { api } from "../../urls";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Provider_membership() {
  const { t } = useTranslation("parentsMembership");
  const [count, setcount] = useState(true);
  const [detail, setdetail] = useState("");
  const [plan, setplan] = useState("");
  const [planmobile, setplanmobile] = useState("");
  const [month, setmonth] = useState(0);
  const [step, setstep] = useState(1);
  const [complete, setcomplete] = useState(0);
  const [complete2, setcomplete2] = useState(0);
  const [paymenttype, setpaymenttype] = useState(false);
  const [savepayment, setsavepayment] = useState(false);
  const [country2, setcountry] = useState();
  const [error, seterror] = useState({
    month: "",
    plan: "",
  });
  const [check, setcheck] = useState({
    month: "",
    plan: "",
  });
  const [showflogin, setShowflogin] = useState(false);
  const handleCloselogin_first = () => {
    setShowflogin(false);
  };
  const redirect = () => {
    window.location.href = "/search-parents";
  };
  useEffect(() => {
    if (count) {
      profile_data();
      setcount(false);
      membership();
    }
    console.log(country2);
  }, [detail, month, country2]);
  const countprice = () => {
    setTimeout(() => {
      let planprice =
        plan == "Hummingbird"
          ? 0
          : plan == "Swan"
          ? detail.country == "Serbia"
            ? 12.75
            : 11.9
          : plan == "Flamingo"
          ? 16
          : "";
      let monthprice = planprice * month;
      setcomplete(monthprice);
    }, 500);
  };
  const countprice2 = () => {
    setTimeout(() => {
      let planprice =
        plan == "Hummingbird"
          ? 0
          : plan == "Swan"
          ? 14
          : plan == "Flamingo"
          ? 20
          : "";
      let monthprice = planprice * month;
      setcomplete2(monthprice);
    }, 500);
  };
  const profile_data = () => {
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

    fetch(api + "/api/v1/details", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setdetail(result.data);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  const membership = () => {
    if (localStorage.getItem("user_type") == "provider") {
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

      fetch(api + "/api/v1/getmembershipplan", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.data && result.data.usertype == "provider") {
            setmonth(parseInt(result.data.month));

            setplan(result.data.name);
            setcheck({
              month: parseInt(result.data.month),
              plan: result.data.name,
            });
          }
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const updatemembership = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      price: complete,
      name: plan,
      month: month,
      iep: 1,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/savemembershipplan", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert("done");
        console.log(result);
        if (
          (check.month != "" && check.month != month) ||
          (check.plan != "" && check.plan != plan)
        ) {
          setShowflogin(true);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <Header />
      <div class="container-fluid">
        <div
          class="container"
          style={step == 1 ? { display: "block" } : { display: "none" }}
        >
          <div class="member_ship">
            <h2>{t("Membership Plans")}</h2>
            <p>
              {t(
                "Create a free account today, join our platform and explore a new world of opportunities. Better care now grants you a better future tomorrow!"
              )}
            </p>
            <div
              class="time_btns"
              onClick={(e) => seterror({ ...error, month: "" })}
            >
              <button
                onClick={(e) => setmonth(1)}
                className={month == 1 ? "active" : ""}
              >
                <span className={error.month != "" ? "bordererror" : ""}>
                  {t("Monthly")}
                </span>
              </button>
              <button
                onClick={(e) => setmonth(3)}
                className={month == 3 ? "active" : ""}
              >
                <span className={error.month != "" ? "bordererror" : ""}>
                  {t("3 Months")}
                </span>
              </button>
              <button
                onClick={(e) => setmonth(6)}
                className={month == 6 ? "active" : ""}
              >
                <span className={error.month != "" ? "bordererror" : ""}>
                  {t("6 Months")}
                </span>
              </button>
            </div>
            {/* {month != "" ?
                            <div class="time_btns selectb">
                                <button><span>{month} Month</span></button>
                            </div>
                            : ""} */}
          </div>
          <div class="member_ship_table">
            <div class="table_head">
              <p>{t("*All prices are on monthly basis.")}</p>
            </div>
            <div class="mobile_collap">
              <button
                type="button"
                className={
                  plan == "Hummingbird" ? "active collapsible" : "collapsible"
                }
                onClick={(e) => setplanmobile("Hummingbird")}
              >
                <div class="price_content">
                  <img src="img/bird.png" alt="bird" />
                  <div class="price_under_content one">
                    <h2>{t("Hummingbird")}</h2>
                    <h3>{t("free")}</h3>
                  </div>
                </div>
              </button>
              <div
                class={
                  planmobile == "Hummingbird" ? "content active" : "content"
                }
              >
                <ul className={plan == "Hummingbird" ? "active" : ""}>
                  <li>{t("Create profile")}</li>
                  <li>{t("Post up to 1 photo")}</li>
                  <li>{t("Browse job posts")}</li>
                  <li>
                    {t("Apply for jobs")} <span>UNLIMITED</span>
                  </li>
                </ul>
                <div
                  class={
                    error.plan != ""
                      ? "borderred select_button"
                      : "select_button"
                  }
                  onClick={(e) => seterror({ ...error, plan: "" })}
                >
                  <button
                    onClick={(e) => {
                      setplan("Hummingbird");
                    }}
                    className={plan == "Hummingbird" ? "active" : ""}
                  >
                    {t("Select")}
                  </button>
                </div>
              </div>
              <div class="choose">
                <p>{t("best choice")}</p>
                <p class="choose_save">{t("Save 15%")}</p>
              </div>
              <button
                type="button"
                className={
                  plan == "Swan" ? "active collapsible" : "collapsible"
                }
                onClick={(e) => setplanmobile("Swan")}
              >
                <div class="price_content">
                  <img src="img/swan.png" alt="bird" />
                  <div class="price_under_content two">
                    <h2>{t("Swan")}</h2>
                    {detail.country == "Serbia" ? (
                      <>
                        <h3>
                          <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                              fill="#fff"
                            />
                          </svg>
                          1275
                        </h3>
                        <h4>
                          <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                              fill="#fff"
                            />
                          </svg>
                          1500
                        </h4>
                      </>
                    ) : (
                      <>
                        <h3>$11.9</h3>
                        <h4>$14</h4>
                      </>
                    )}
                  </div>
                </div>
              </button>
              <div class={planmobile == "Swan" ? "content active" : "content"}>
                <ul className={plan == "Swan" ? "active" : ""}>
                  <li>{t("Create profile")}</li>
                  <li>{t("Post up to 2 photo")}</li>
                  <li>{t("Browse job posts")}</li>
                  <li>
                    {t("Apply for jobs")} <span>{t("UNLIMITED")}</span>
                  </li>
                  <li>
                    {t("Connect with schools/families")}{" "}
                    <span>{t("UNLIMITED")}</span>
                  </li>
                  <li>
                    {t(
                      "Share your documents (CV/recommendations/background check)"
                    )}
                  </li>
                  <li>{t("Rate and review family/schools")}</li>
                </ul>
                <div
                  class={
                    error.plan != ""
                      ? "borderred select_button"
                      : "select_button"
                  }
                  onClick={(e) => seterror({ ...error, plan: "" })}
                >
                  <button
                    onClick={(e) => {
                      setplan("Swan");
                    }}
                    className={plan == "Swan" ? "active" : ""}
                  >
                    {t("Select")}
                  </button>
                </div>
              </div>
              <div class="choose">
                <p>{t("excellent choice")}</p>
                <p class="choose_save">{t("Save 20%")}</p>
              </div>
              <button
                type="button"
                className={
                  plan == "Flamingo" ? "active collapsible" : "collapsible"
                }
                onClick={(e) => setplanmobile("Flamingo")}
              >
                <div class="price_content ">
                  <img src="img/flam.png" alt="bird" />
                  <div class="price_under_content three">
                    <h2>{t("Flamingo")}</h2>
                    {detail.country == "Serbia" ? (
                      <>
                        <h3>
                          <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                              fill="#fff"
                            />
                          </svg>
                          1600
                        </h3>
                        <h4>
                          <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                              fill="#fff"
                            />
                          </svg>
                          2000
                        </h4>
                      </>
                    ) : (
                      <>
                        <h3>$16</h3>
                        <h4>$20</h4>
                      </>
                    )}
                  </div>
                </div>
              </button>
              <div
                class={planmobile == "Flamingo" ? "content active" : "content"}
              >
                <ul className={plan == "Flamingo" ? "active" : ""}>
                  <li>{t("Create profile")}</li>
                  <li>{t("Post up to 2 photos and 1 video")}</li>
                  <li>{t("Browse job posts")}</li>
                  <li>
                    {t("Apply for jobs")}
                    <span>{t("UNLIMITED")}</span>
                  </li>
                  <li>
                    {t("Connect with schools/families")}
                    <span>{t("UNLIMITED")}</span>
                  </li>
                  <li>
                    {t(
                      "Share your documents (CV/recommendations/background check)"
                    )}
                  </li>
                  <li>{t("Rate and review family/schools")}</li>
                  <li>{t("Appear higher in search results")}</li>
                  <li>{t("See who viewed your profile")}</li>
                  <li>{t("Notifications for matching jobs in your area")}</li>
                </ul>
                <div
                  class={
                    error.plan != ""
                      ? "borderred select_button"
                      : "select_button"
                  }
                  onClick={(e) => seterror({ ...error, plan: "" })}
                >
                  <button
                    onClick={(e) => {
                      setplan("Flamingo");
                    }}
                    className={plan == "Flamingo" ? "active" : ""}
                  >
                    {t("Select")}
                  </button>
                </div>
              </div>
            </div>
            <table id="customer_tabel">
              <tr>
                <th class="blank"></th>
                <td class="blank"></td>
                <td class={plan == "Swan" ? "choose active" : "choose"}>
                  <p>{t("best choice")}</p>
                  <p class="choose_save">{t("Save 15%")}</p>
                </td>
                <td class={plan == "Flamingo" ? "choose active" : "choose"}>
                  <p>{t("excellent choice")}</p>
                  <p class="choose_save">{t("Save 20%")}</p>
                </td>
              </tr>
              <tr class="plan">
                <th class="blank"></th>
                <td class={plan == "Hummingbird" ? "price active" : "price"}>
                  <div class="price_content">
                    <img src="img/bird.png" alt="bird" />
                    <div class="price_under_content">
                      <h2>{t("Hummingbird")}</h2>
                      <h3>{t("free")}</h3>
                    </div>
                  </div>
                </td>
                <td class={plan == "Swan" ? "price active" : "price"}>
                  <div class="price_content">
                    <img src="img/swan.png" alt="bird" />
                    <div class="price_under_content">
                      <h2>{t("Swan")}</h2>
                      {detail.country == "Serbia" ? (
                        <>
                          <h3>
                            <svg
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                                fill="#fff"
                              />
                            </svg>
                            1275
                          </h3>
                          <h4>
                            <svg
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                                fill="#fff"
                              />
                            </svg>
                            1500
                          </h4>
                        </>
                      ) : (
                        <>
                          <h3>$11.9</h3>
                          <h4>$14</h4>
                        </>
                      )}
                    </div>
                  </div>
                </td>
                <td class={plan == "Flamingo" ? "price active" : "price"}>
                  <div class="price_content">
                    <img src="img/flam.png" alt="bird" />
                    <div class="price_under_content">
                      <h2>{t("Flamingo")}</h2>
                      {detail.country == "Serbia" ? (
                        <>
                          <h3>
                            <svg
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                                fill="#fff"
                              />
                            </svg>
                            1600
                          </h3>
                          <h4>
                            <svg
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                                fill="#fff"
                              />
                            </svg>
                            2000
                          </h4>
                        </>
                      ) : (
                        <>
                          <h3>$16</h3>
                          <h4>$20</h4>
                        </>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="plan">
                <th>{t("Create profile")}</th>
                <td class={plan == "Hummingbird" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
                <td class={plan == "Swan" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
              </tr>
              <tr class="plan">
                <th>{t("Post photos/videos")}</th>
                <td class={plan == "Hummingbird" ? " active" : ""}>
                  {t("Up to 1 photo")}
                </td>
                <td class={plan == "Swan" ? " active" : ""}>
                  {t("Up to 2 photos")}
                </td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  {t("Up to 2 photos and 1 video")}
                </td>
              </tr>
              <tr class="plan">
                <th>{t("Browse job posts")}</th>
                <td class={plan == "Hummingbird" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
                <td class={plan == "Swan" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
              </tr>
              <tr class="plan">
                <th>{t("Apply for jobs")}</th>
                <td class={plan == "Hummingbird" ? " active" : ""}>
                  {t("unlimited")}
                </td>
                <td class={plan == "Swan" ? " active" : ""}>
                  {t("unlimited")}
                </td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  {t("unlimited")}
                </td>
              </tr>
              <tr class="plan">
                <th>{t("Connect with schools/families")}</th>
                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                <td class={plan == "Swan" ? " active" : ""}>
                  {t("unlimited")}
                </td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  {t("unlimited")}
                </td>
              </tr>
              <tr class="plan">
                <th>
                  {t("Share your documents")} <br /> (
                  {t("CV/recommendations/background check")})
                </th>
                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                <td class={plan == "Swan" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
              </tr>
              <tr class="plan">
                <th>{t("Rate and review family/schools")}</th>
                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                <td class={plan == "Swan" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
              </tr>
              <tr class="plan">
                <th>{t("Appear higher in search results")}</th>
                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                <td class={plan == "Swan" ? " active" : ""}></td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
              </tr>
              <tr class="plan">
                <th>{t("See who viewed your profile")}</th>
                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                <td class={plan == "Swan" ? " active" : ""}></td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
              </tr>
              <tr class="plan">
                <th>{t("Notifications for matching jobs in your area")}</th>
                <td class={plan == "Hummingbird" ? " active" : ""}></td>
                <td class={plan == "Swan" ? " active" : ""}></td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  <img src="img/vector.png" alt="Tick" />
                </td>
              </tr>

              <tr
                class="select_btn"
                onClick={(e) => seterror({ ...error, plan: "" })}
              >
                <th></th>
                <td class={plan == "Hummingbird" ? " active" : ""}>
                  <div
                    class={
                      error.plan != ""
                        ? "borderred select_button"
                        : "select_button"
                    }
                  >
                    <button
                      onClick={(e) => {
                        setplan("Hummingbird");
                      }}
                      className={plan == "Hummingbird" ? "active" : ""}
                    >
                      {t("Select")}
                    </button>
                  </div>
                </td>
                <td class={plan == "Swan" ? " active" : ""}>
                  <div
                    class={
                      error.plan != ""
                        ? "borderred select_button"
                        : "select_button"
                    }
                  >
                    <button
                      onClick={(e) => {
                        setplan("Swan");
                      }}
                      className={plan == "Swan" ? "active" : ""}
                    >
                      {t("Select")}
                    </button>
                  </div>
                </td>
                <td class={plan == "Flamingo" ? " active" : ""}>
                  <div
                    class={
                      error.plan != ""
                        ? "borderred select_button"
                        : "select_button"
                    }
                  >
                    <button
                      onClick={(e) => {
                        setplan("Flamingo");
                      }}
                      className={plan == "Flamingo" ? "active" : ""}
                    >
                      {t("Select")}
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="form_submit_button">
            <div class="button">
              <button
                class="can"
                onClick={(e) => {
                  if (plan && month) {
                    setstep(2);
                    window.scrollTo({ top: 0 });
                    countprice();
                    countprice2();
                  } else {
                    window.scrollTo({ top: 0 });
                    seterror({
                      month: month == "" ? "required" : "",
                      plan: plan == "" ? "required" : "",
                    });
                  }
                }}
              >
                {t("Next")}
              </button>
            </div>
          </div>
        </div>
        <div
          className="step2"
          style={step == 2 ? { display: "block" } : { display: "none" }}
        >
          <div class="selected_plan">
            <div class="container">
              <div class="selected_page_content">
                <h3>
                  {t("You Selected:")} <strong>{plan}</strong>
                </h3>
                <div class="change_plan_btn">
                  <button
                    onClick={(e) => {
                      window.scrollTo({ top: 0 });
                      setstep(1);
                    }}
                  >
                    {t("Change Plan")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="total_amnt">
            <div class="container">
              <div class="total_amnt_content">
                <h3>
                  {t("Total Amount To Pay:")}
                  <s>
                    {detail.country == "Serbia" ? (
                      <>
                        <svg
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                            fill="#A98D4B"
                          />
                        </svg>
                        {complete2 * 100}
                      </>
                    ) : (
                      "$" + complete2.toFixed(2)
                    )}
                  </s>{" "}
                  <span>
                    {detail.country == "Serbia" ? (
                      <>
                        <svg
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                            fill="#A98D4B"
                          />
                        </svg>
                        {complete * 100}
                      </>
                    ) : (
                      "$" + complete.toFixed(2)
                    )}
                  </span>
                </h3>
                <h4>
                  {t("Take advantage of our current discount offers and save")}
                  {plan == "Swan" ? 15 : plan == "Flamingo" ? 20 : 100}%{" "}
                  {t("now")}.
                </h4>
                <ul>
                  <li>
                    {t(
                      "* Subscription will be automatically renewed unless you cancel it before the next renewal date."
                    )}
                  </li>
                  <li>
                    {t(
                      "* Plus applicable local taxes and currency conversions."
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="payment_details">
              <h3>{t("Payment Details")}</h3>
              {paymenttype == false ? (
                <>
                  <div class="payment_cards">
                    <button>
                      <img src="img/mastercard.png" alt="" />
                    </button>
                    <button>
                      <img src="img/maestro.png" alt="" />
                    </button>
                    <button>
                      <img src="img/american_exp.png" alt="" />
                    </button>
                    <button>
                      <img
                        src="img/paypal.png"
                        alt=""
                        onClick={() => setpaymenttype(!paymenttype)}
                      />
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            {paymenttype == false ? (
              <>
                <div class="payment_form">
                  <form action="">
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label class="form-label" for="name">
                            {t("Name on Card")}
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder={t("Type here")}
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label class="form-label" for="card">
                            {t("Card Number")}
                          </label>
                          <input
                            type="tel"
                            id="card"
                            placeholder={t("Type here")}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label class="form-label" for="address">
                            {t("Billing Address")}
                          </label>
                          <input
                            type="text"
                            id="address"
                            placeholder={t("Type here")}
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="row exp_Sec">
                          <div class="col exp_sec">
                            <div class="form-group">
                              <label class="form-label" for="date">
                                {t("Expiration Date")}
                              </label>
                              <input
                                type="date"
                                id="date"
                                placeholder={t("Type here")}
                              />
                            </div>
                          </div>
                          <div class="col exp_sec">
                            <div class="form-group">
                              <label class="form-label" for="security">
                                {t("Security #")}
                              </label>
                              <input
                                type="tel"
                                id="security"
                                placeholder={t("Type here")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label class="form-label" for="country">
                                {t("Country")}
                              </label>
                              <select
                                name=""
                                id=""
                                onChange={(e) => setcountry(e.target.value)}
                              >
                                <option selected>Choose from list</option>
                                {country.data.map((e) => {
                                  return (
                                    <option value={e.country}>
                                      {e.country}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>

                          <div class="col">
                            {country2 != "Serbia" ? (
                              <div class="form-group">
                                <label class="form-label" for="state">
                                  {t("State")}
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  placeholder={t("Type here")}
                                />
                                {/* <select name="" id="">
                                                    <option selected>Choose from list</option>
                                                    <option value="a">a</option>
                                                    <option value="a">a</option>
                                                    <option value="a">a</option>
                                                    <option value="a">a</option>
                                                </select> */}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label class="form-label" for="email">
                            {t("Email Address")}
                          </label>
                          <input
                            type="email"
                            id="email"
                            placeholder={t("Type here")}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="row city_zip">
                          <div class="col city_zip">
                            <div class="form-group">
                              <label class="form-label" for="city">
                                {t("City")}
                              </label>
                              <input
                                type="text"
                                id="city"
                                placeholder={t("Type here")}
                              />
                            </div>
                          </div>
                          <div class="col city_zip">
                            <div class="form-group">
                              <label class="form-label" for="zip">
                                {t("Zip Code")}
                              </label>
                              <input
                                type="tel"
                                id="zip"
                                placeholder={t("Type here")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <div class="radio">
                            <input
                              type="checkbox"
                              checked={savepayment}
                              onClick={(e) => setsavepayment()}
                            />
                            <label>
                              {t("Save this card for future payments")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="Account ">
                <div className={"personal"}>
                  <div className="cardstype" style={{ margin: "0" }}>
                    <div className="paymenttype">
                      <ul>
                        <li>
                          <input type="radio" id="a" name="a" />
                          <label for="a">{t("Pay with card")}</label>
                        </li>
                        <li>
                          <input type="radio" id="b" name="a" />
                          <label
                            for="b"
                            onClick={() => setpaymenttype(!paymenttype)}
                          >
                            {t("Pay with PayPal")}
                          </label>
                        </li>
                      </ul>
                    </div>
                    <h4>{t("My Cards")}</h4>
                    <div className="savecard" style={{ margin: "0" }}>
                      <ul>
                        <li>
                          <label for="c">
                            {" "}
                            <input type="radio" id="c" name="c" />
                            <span>{t("Use for payment")}</span>
                          </label>
                          <span>{t("Card name")}</span>
                          <p>{t("Bankname card ****4589")}</p>
                          <span>{t("Expires on")}</span>
                          <p>04/2022</p>
                          <button style={{ textAlign: "right" }}>
                            {t("Edit")}
                          </button>
                        </li>
                        <li>
                          <label for="d">
                            {" "}
                            <input type="radio" id="d" name="c" />
                            <span>{t("Use for payment")}</span>
                          </label>
                          <span>{t("Card name")}</span>
                          <p>{t("Bankname card ****4589")}</p>
                          <span>{t("Expires on")}</span>
                          <p>04/2022</p>
                          <button style={{ textAlign: "right" }}>
                            {t("Edit")}
                          </button>
                        </li>
                        <li>
                          <label for="e">
                            {" "}
                            <input type="radio" id="e" name="c" />
                            <span>{t("Use for payment")}</span>
                          </label>
                          <span>{t("Card name")}</span>
                          <p>{t("Bankname card ****4589")}</p>
                          <span>{t("Expires on")}</span>
                          <p>04/2022</p>
                          <button style={{ textAlign: "right" }}>
                            {t("Edit")}
                          </button>
                        </li>
                        <li>
                          <label for="e">
                            {" "}
                            <input type="radio" id="e" name="c" />
                            <span>{t("Use for payment")}</span>
                          </label>
                          <span>{t("Card name")}</span>
                          <p>{t("Bankname card ****4589")}</p>
                          <span>{t("Expires on")}</span>
                          <p>04/2022</p>
                          <button style={{ textAlign: "right" }}>Edit</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div class="promotion">
              <div class="promotion_code">
                <label for="">
                  {t("Add a promotion code")}
                  {/* <span>*This code expired.</span> */}
                </label>
                <input type="text" placeholder="ngsklf4875d" />
                <button>{t("Apply code")}</button>
              </div>
            </div>
            <div class="pay_aggrement">
              <input type="checkbox" />
              <label for="">
                {t("I agree to pay")}
                {detail.country == "Serbia" ? (
                  <>
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2947 2.14286H1.78572C1.58839 2.14286 1.42857 1.98304 1.42857 1.78571C1.42857 1.58839 1.58839 1.42857 1.78572 1.42857H10.3572C10.5545 1.42857 10.7143 1.26875 10.7143 1.07143C10.7143 0.479688 10.2346 0 9.64286 0H1.42857C0.639509 0 0 0.639509 0 1.42857V8.57143C0 9.36049 0.639509 10 1.42857 10H10.2947C10.9201 10 11.4286 9.51942 11.4286 8.92857V3.21429C11.4286 2.62344 10.9201 2.14286 10.2947 2.14286ZM9.28572 6.78571C8.8913 6.78571 8.57143 6.46585 8.57143 6.07143C8.57143 5.67701 8.8913 5.35714 9.28572 5.35714C9.68014 5.35714 10 5.67701 10 6.07143C10 6.46585 9.68014 6.78571 9.28572 6.78571Z"
                        fill="#A98D4B"
                      />
                    </svg>
                    {(complete / month).toFixed(2) * 100}
                  </>
                ) : (
                  "$" + (complete / month).toFixed(2)
                )}{" "}
                {t("monthly for")} {month > 0 ? month : ""}{" "}
                {month == 1 ? "month " : "months "}
                {t("subscription")}.
              </label>
            </div>
            <div class="form_submit_button">
              <div class="button">
                <button
                  class="can"
                  onClick={(e) => {
                    setstep(1);
                  }}
                >
                  {t("Back")}
                </button>
                <button class="sub" onClick={(e) => updatemembership()}>
                  {t("Submit")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal show={showflogin} onHide={handleCloselogin_first}>
        <Modal.Body>
          <div className="promocode_content login_first">
            <Link to="" onClick={handleCloselogin_first}>
              +{" "}
            </Link>
            <h2>{t("Congratulations on your new membership plan")}</h2>
            <img src="./images/create_profile.png" />
            <p className="pro" style={{ color: "#636363" }}>
              {t("It’s time to find your perfect job!")}
            </p>
            <button onClick={redirect}>{t("Search for jobs")}</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Provider_membership;
