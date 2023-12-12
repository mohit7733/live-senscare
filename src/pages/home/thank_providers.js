import React from "react";
import Footer from "./common/footer";
import Header from "./common/header";
import Testimonials from "./common/testimonials";
import { useTranslation } from "react-i18next";

function Thank_providers() {
  const { t } = useTranslation("thankProvider");
  return (
    <>
      <Header />
      <div className="container-fluid ">
        <div className="container">
          <div className="thank_page ">
            <h2>{t("Thank You for Joining SensCare!")} </h2>
            <div className="thanks over">
              <h4>{t("Together we create the future.")}</h4>
              <p>
                {t(
                  "Thank you for registering with SensCare! A confirmation has been sent to you. Please check your email and activate your account. If you haven't received an email, check your spam folder."
                )}
              </p>
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
              {/* <h3>Stay tuned, we are coming soon!</h3> */}
            </div>
            <img className="flow" src="./images/thank_banner.png" />
          </div>
        </div>
      </div>
      <Testimonials />
      <Footer />
    </>
  );
}

export default Thank_providers;
