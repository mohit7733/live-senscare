import React, { useEffect, useState } from "react";
import { api } from "../../../urls";
import Footer from "./footer";
import Header from "./header";
import { useTranslation } from "react-i18next";
import Preloader from "../common/preLoader";

function Cookie_policy() {
  const [count, setcount] = useState(true);
  const [investor, setinvestor] = useState({});
  const [isloading, setIsloading] = useState(true);
  const { t } = useTranslation("cookiePolicy");
  useEffect(() => {
    if (count) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      setIsloading(true);
      fetch(api + "/api/cookiepolicy", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setinvestor(result.data);
          setIsloading(false);
        })
        .catch((error) => console.log("error", error));
      setcount(false);
    }
  }, [count]);
  return (
    <>
      <Header />
      <div className="container-fluid">
        <Preloader isloading={isloading} />
        <div className="container">
          <div className="contact privacy">
            <h2>{t("title", { defaultValue: investor.title })}</h2>
            <p>
              <em>{t("Last version 27. September 2023")}</em>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: t("description", {
                  defaultValue: investor.description,
                }),
              }}
              className="privacycon"
            />

            <br />
            <br />
            <br />
            <div className="category_use">
              <ul>
                <li>{t("Category of use")}</li>
                <li>{t("Example")}</li>
              </ul>
              <ul>
                <li>
                  <h4>{t("Preferences")}</h4>
                  <p>{t("preferenceCookie")}</p>
                </li>
                <li>
                  <h4>{t("Authentication & Security")}</h4>
                  <p>
                    <strong>{t("Authentication")}</strong>
                    <br />
                    {t("haveAccount")}
                    <br />
                    <br />
                    <br />
                    <strong>{t("Security")}</strong>
                    <br />
                    {t("ifYouHave")}
                  </p>
                </li>
                <li>
                  <h4>{t("Performance")}</h4>
                  <p>{t("performanceCookie")}</p>
                </li>
                <li>
                  <h4>{t("Analytics")}</h4>
                  <p>{t("theseCookie")}</p>
                </li>
              </ul>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: t("description2", {
                  defaultValue: investor.description2,
                }),
              }}
              className="privacycon"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cookie_policy;
