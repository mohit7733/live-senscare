import React, { useState, useEffect } from "react";
import { api } from "../../../urls";
import { Link } from "react-router-dom";
import Promo_code from "./promo_code";
import Facebook_share from "./share_facebook";
import { useTranslation } from "react-i18next";

export default function Loyalty() {
  const { t } = useTranslation("loyalty");
  const [Invite, setInvite] = useState(true);
  const [Invite2, setInvite2] = useState(true);
  const [Invite3, setInvite3] = useState(true);
  const [count, setcount] = useState(true);
  const [inve, setinve] = useState({});
  const [Loyality, setLoyality] = useState({});
  useEffect(() => {
    if (count) {
      refral();
      setcount(false);
    }
    console.log(Loyality);
  }, [Loyality]);
  const refral = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer  " + localStorage.getItem("token")
    );
    myHeaders.append("Cookie", "XSRF-TOKEN= " + localStorage.getItem("token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(api + "/api/v1/referrallink", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setinve(result.data);
      })
      .catch((error) => console.log("error", error));
    fetch(api + "/api/v1/referraluserchekfordiscount", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoyality(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const copy = (text) => {
    window.navigator.clipboard.writeText(text);
    var tooltip = document.getElementById("myTooltip2");
    tooltip.innerHTML = t("Copied");
  };

  const handleCopy = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    var tooltip = document.getElementById("myTooltip2");
    tooltip.innerHTML = t("Copied");
  };

  return (
    <>
      <div class="senscare_wrapper">
        <h2>{t("SensCare Loyalty program")}</h2>
        <div className="border"></div>
        <br />
        <div class="tab row justify_content-between">
          <div class="column">
            <h2>{t("Invite friends")}</h2>
          </div>
          <div class="column align-center" onClick={(e) => setInvite(!Invite)}>
            <i class="fa fa-chevron-up" aria-hidden="true"></i>
          </div>
        </div>
        {Invite ? (
          <div class="inner_wrapper">
            <div class="column_left">
              <p>{t("Your personal referral link")}</p>
              <div class="link_wrap row justify_content-between align-center">
                <a style={{ width: "calc(100% - 120px)" }}>
                  <span>{inve.referralLink}</span>...
                </a>
                <div class="btn btn-secondary">
                  <a
                    href="#"
                    onClick={(e) => handleCopy(inve.referralLink.toString())}
                    class="tooltiptext"
                    id="myTooltip2"
                  >
                    {t("Copy")}
                  </a>
                </div>
              </div>
              <br />
              <div class="icon_wrap flex align-center">
                {localStorage.getItem("user_type") == "parents" ? (
                  <Facebook_share link={inve.referralLink} icon={"yes"} />
                ) : (
                  <Facebook_share link={inve.referralLink} icon={"yes"} />
                )}
                <h4>{t("Share with friends and family")}</h4>
              </div>
            </div>
            <div class="column_right ">
              <img
                src={window.location.origin + "/images/loylty_right.jpg"}
                alt=""
              />
            </div>
            <div class="column_left left2">
              <br />
              <div class="tab row align-center justify_content-between">
                <div class="column">
                  <h2>{t("Find out more")}</h2>
                </div>
                <div class="column">
                  <i class="fa fa-chevron-up" aria-hidden="true"></i>
                </div>
                <div className="border" style={{ width: "100%" }}></div>
                <p style={{ marginBottom: "-20px" }}>
                  {t(
                    "Bring 5 friends to the SensCare platform and you will be rewarded with a"
                  )}{" "}
                  <span>
                    <Promo_code
                      title={t(
                        "500 dinar discount on each monthly membership fee"
                      )}
                    />{" "}
                  </span>{" "}
                  {t(
                    "as long as you remain an active member. Sounds great and easy, doesn't it?"
                  )}
                </p>
                <p>
                  {t(
                    "All it takes is for your friends to create an account on the SensCare platform within the period of three months since you’ve become our member."
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div class="tab tab_2 row justify_content-between">
          <div class="column">
            <h2>{t("SensCare Loyality")}</h2>
          </div>
          <div
            class="column  align-center"
            onClick={(e) => setInvite2(!Invite2)}
          >
            <i class="fa fa-chevron-up" aria-hidden="true"></i>
          </div>
        </div>
        {Invite2 ? (
          <div class="walk_section">
            {Loyality.referraluserchekfordiscount < 5 ||
            !Loyality.referraluserchekfordiscount ? (
              <div class="column">
                <img src={window.location.origin + "/images/walk.svg"} alt="" />
                <ul class="row">
                  <li>
                    <h4>
                      <strong>{t("Full price")}</strong>
                      <br />
                      <span>{t("1500 RSD")}</span>
                      <p>{t("Let's walk together")}</p>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      {t("1st discount")} <br />
                      <span>{t("1000 RSD")}</span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      {t("2nd discount")}
                      <br />
                      <span>{t("500 RSD")}</span>
                      <p style={{ color: "#BE95C5" }}>
                        {t("SensCare rewards you")}
                      </p>
                    </h4>
                  </li>
                </ul>
              </div>
            ) : (
              <div class="column"></div>
            )}
            {Loyality.referraluserchekfordiscount >= 5 &&
            Loyality.referraluserchekfordiscount < 12 ? (
              <div class="column">
                <img src={window.location.origin + "/images/walk.jpg"} alt="" />
                <ul class="row">
                  <li>
                    <h4>
                      {t("Full price")}
                      <br />
                      <span>{t("1500 RSD")}</span>
                      <p>{t("Let's walk together")}</p>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      <strong>{t("1st discount")}</strong> <br />
                      <span>{t("1000 RSD")}</span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      {t("2nd discount")} <br />
                      <span>{t("500 RSD")}</span>{" "}
                      <p style={{ color: "#BE95C5" }}>
                        {t("SensCare rewards you")}
                      </p>
                    </h4>
                  </li>
                </ul>
              </div>
            ) : (
              <div class="column"></div>
            )}
            {Loyality.referraluserchekfordiscount >= 12 ? (
              <div class="column">
                <img src={window.location.origin + "/images/walk.jpg"} alt="" />
                <ul class="row">
                  <li>
                    <h4>
                      {t("Full price")}
                      <br />
                      <span>{t("1500 RSD")}</span>
                      <p>{t("Let's walk together")}</p>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      {t("1st discount")}
                      <br />
                      <span>{t("1000 RSD")}</span>
                    </h4>
                  </li>
                  <li>
                    <h4>
                      <strong>{t("2nd discount")}</strong>
                      <br />
                      <span>{t("500 RSD")}</span>{" "}
                      <p>{t("SensCare rewards you")}</p>
                    </h4>
                  </li>
                </ul>
              </div>
            ) : (
              <div class="column"></div>
            )}
          </div>
        ) : (
          ""
        )}
        <div class="tab tab_3 row justify_content-between">
          <div class="column">
            <h2>{t("Find out more")}</h2>
          </div>
          <div
            class="column  align-center"
            onClick={(e) => setInvite3(!Invite3)}
          >
            <i class="fa fa-chevron-up" aria-hidden="true"></i>
          </div>
          {Invite3 ? (
            <>
              <div className="border" style={{ width: "100%" }}></div>

              <p style={{ width: "100%" }}>
                {t(
                  "As a token of our gratitude, SensCare rewards our loyal members with a"
                )}{" "}
                <span>{t("discount of 500 dinars twice a year")}</span>{" "}
                {t("every 6 and 12 months.")}{" "}
              </p>
              <br />
            </>
          ) : (
            ""
          )}
        </div>
        <br />
        <br />
        <p className="lastline">
          {t("For detailed information on SensCare promotions, click")}{" "}
          <Link to="/terms-of-use"> {t("here.")}</Link>
        </p>
      </div>
    </>
  );
}
