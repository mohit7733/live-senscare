import React from "react";
import Footer from "./common/footer";
import Header from "./common/header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Landing_providers() {
  const { t } = useTranslation("landing");

  return (
    <>
      <Header />
      <div className="container-fluid border">
        <div className="container">
          <div className="thank_page ">
            <h2>{t("Thank You for Joining SensCare!")} </h2>
            <div className="thanks">
              <h4>{t("Together we create the future.")}</h4>
              <ul>
                <li>
                  <img src="./images/thanks_right.svg" />{" "}
                  <span>
                    {t(
                      "Large selection of jobs (domestically and internationally)."
                    )}
                  </span>
                </li>
                <li>
                  <img src="./images/thanks_right.svg" />{" "}
                  <span>{t("Fast, quality and safe services.")}</span>
                </li>
                <li>
                  <img src="./images/thanks_right.svg" />{" "}
                  <span>{t("Find an ideal job.")}</span>
                </li>
              </ul>
              <h3>{t("Stay tuned, we are coming soon!")}</h3>
            </div>
            <img src="./images/thank_banner.png" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Landing_providers;
