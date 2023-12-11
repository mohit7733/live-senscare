import React from "react";
import Footer from "./common/footer";
import Header from "./common/header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Emai_thank() {
  const { t } = useTranslation("emailThank");
  return (
    <>
      <div className="verify">
        <Header />
        <div className="container-fluid border">
          <div className="container">
            <div className="verify_content">
              <p>
                {t("Dear username")}
                <br />
                <br />
                {t("Thank you for your interest in joining SensCare platform!")}
                <br />
                <br />
                {t(
                  "To complete your registration, please verify your email address."
                )}
              </p>
              <button>{t("Verify")}</button>
              <br />
              <br />
              <br />
              <br />
              <p> {t("Sincerely")}</p>
              <h4>
                <img src="./images/signature.png" />
              </h4>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Emai_thank;
