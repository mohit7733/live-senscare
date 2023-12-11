import React from "react";
import Footer from "./common/footer";
import Header from "./common/header";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

function Welcome() {
  const { t } = useTranslation("thanksParent");
  return (
    <>
      <Header login={"true"} />
      <div className="container-fluid ">
        <div className="container">
          <div className="thank_page welcome">
            <h2>
              <span>{t("Success!")}</span> {t("Welcome On Board.")}{" "}
            </h2>
            <div className="thanks">
              <p>
                {t("You have successfully activated your account.")}
                <br />
                {t(
                  "Please log in to proceed to your profile page and fill in more details."
                )}{" "}
              </p>
              <Link to="/login">{t("Log In")} </Link>
            </div>
            <img src="./images/thank_banner.png" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Welcome;
