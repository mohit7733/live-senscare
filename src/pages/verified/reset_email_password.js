import React from "react";
import { Link } from "react-router-dom";
import Footer from "./common/footer";
import Header from "./common/header";
import { useTranslation } from "react-i18next";

function Reset_email() {
  const { t } = useTranslation("resetEmail");
  return (
    <>
      <div className="verify">
        <Header />
        <div className="container-fluid border">
          <div className="container">
            <div className="verify_content Reset_email">
              <p>
                {t("Dear username,")}
                <br />
                <br />
                {t(
                  "We have received your request to reset your password. To reset your password click the button below within 24 hours."
                )}
                <br />
                <button>{t("Reset Password")}</button>
                <br />
                <br />
                <br />
                {t(
                  "If you haven’t made this request, please contact us immediately at"
                )}{" "}
                <Link to={"techsupport@senscare"}>techsupport@senscare.</Link>
              </p>
              <br />
              <br />
              <br />
              <br />
              <p>{t("Sincerely")}</p>
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

export default Reset_email;
