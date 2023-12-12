import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("common");
  return (
    <div>
      <div className="container-fluid">
        <div className="container">
          <div className="footer bagf">
            <div className="social_media">
              <p>{t("Follow us on")}</p>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/people/SensCare/100066554561840/"
                    target="_blank"
                  >
                    <img src="./images/facebook.svg" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/sens-care/"
                    target="_blank"
                  >
                    <img src="./images/indi.svg" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/mysenscare/"
                    target="_blank"
                  >
                    <img src="./images/twiter.svg" />
                  </a>
                </li>
              </ul>
              <p>{t("@2023 SensCare. All Rights Reserved.")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
