import React from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import Footer from "./common/footer";
import Header from "./common/header";
import { useTranslation } from "react-i18next";

function Error() {
  // const history = useHistory();
  const { t } = useTranslation("error404");

  return (
    <>
      <Header />
      <div className="container-fluid ">
        <div className="container">
          <div className="thank_page error">
            <h2>{t("snap")}</h2>
            <div className="thanks">
              <p>{t("sorry")}</p>
              <Link to={"/"}>
                <img
                  src={window.location.origin + "/images/left_arrow_fill.svg"}
                />{" "}
                <span>{t("please")}</span>
              </Link>
            </div>
            <img
              src={window.location.origin + "/images/Error-404-animation.gif"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Error;
