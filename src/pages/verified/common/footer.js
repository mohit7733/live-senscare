import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="social_media">
        <p>{t("Follow us on")}</p>
        <ul>
          <li>
            <Link to="#">
              <img src="./images/facebook.svg" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src="./images/indi.svg" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src="./images/twiter.svg" />
            </Link>
          </li>
        </ul>
        <p>{t("@2022 SensCare. All Rights Reserved.")}</p>
      </div>
    </>
  );
}

export default Footer;
