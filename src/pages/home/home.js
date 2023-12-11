import React, { useState, useEffect } from "react";
import Footer from "./common/footer";
import Header from "./common/header";
import { Link } from "react-router-dom";
import Promo_code from "./common/promo_code";
import Testimonials from "./common/testimonials";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation("body");
  const [promo, setpromo] = useState("");
  const [logincheck, setlogincheck] = useState({
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
  });
  return (
    <>
      <Header page={"home"} />
      {promo == "" ? (
        <div className="promocode">
          <p>
            <Promo_code />
            <button onClick={(a) => setpromo("hide")}>+</button>
          </p>
        </div>
      ) : (
        ""
      )}

      <div className="container-fluid">
        <div className="container">
          <div className="better_care">
            <h2>{t("better")} </h2>
            <div className="right_banner">
              <img src="./images/home_right.svg" />
            </div>
            <div className="service_gurid">
              <div className="process_guid  dask bgnon">
                <ul>
                  <li>
                    <Link to="#">
                      <img src="./images/profile.svg" />
                      <span>{t("create")} </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./images/jobs.svg" />
                      <span>{t("apply")} </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./images/condidate.svg" />
                      <span>{t("search")} </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./images/team.svg" />
                      <span>{t("I need a service")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="need_service">
                <Link
                  to={"/search-providers"}

                  // to={logincheck.id && logincheck.token ? "/search-parents" : '/signup_Parents'}
                >
                  <svg
                    viewBox="0 0 20 22"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0049 0C12.7715 0 15.0049 2.23335 15.0049 5.00003C15.0049 7.76672 12.7715 10.0001 10.0049 10.0001C7.23822 10.0001 5.00488 7.76672 5.00488 5.00003C5.00488 2.23335 7.23822 0 10.0049 0Z"
                      fill=""
                    />
                    <path
                      d="M10 22.0009C5.83333 22.0009 2.15 19.8676 0 16.6343C0.05 13.3176 6.66667 11.501 10 11.501C13.3167 11.501 19.95 13.3176 20 16.6343C17.85 19.8676 14.1667 22.0009 10 22.0009Z"
                      fill=""
                    />
                  </svg>
                  <span>{t("service")} </span>{" "}
                </Link>
                <p>{t("start")} </p>
              </div>
              <div className="need_service need_job">
                <Link
                  to={"/search-parents"}
                  // to={logincheck.id && logincheck.token ? "/search-providers" : '/signup_provider'}
                >
                  <svg
                    viewBox="0 0 20 21"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8118 0C8.8339 0 5.60043 3.28 5.60043 7.28114C5.60043 8.97929 6.18199 10.5146 7.13575 11.7708L0.296596 18.6797C-0.0988653 19.0985 -0.0988653 19.7498 0.296596 20.1453C0.505958 20.3546 0.761846 20.4477 1.01773 20.4477C1.29688 20.4477 1.55276 20.3546 1.76213 20.1453L8.60128 13.2131C9.78767 14.0738 11.2299 14.5623 12.7885 14.5623C16.7664 14.5623 19.9999 11.2823 19.9999 7.28114C20.0231 3.25674 16.7897 0 12.8118 0ZM12.8118 12.7246C9.85745 12.7246 7.46142 10.282 7.46142 7.28114C7.46142 4.28028 9.85745 1.83774 12.8118 1.83774C15.7661 1.83774 18.1621 4.28028 18.1621 7.28114C18.1621 10.282 15.7661 12.7246 12.8118 12.7246ZM16.4175 7.37419C16.3709 7.76965 16.022 8.07207 15.6265 8.07207C15.58 8.07207 15.5568 8.07207 15.5102 8.07207C15.0682 8.00228 14.7658 7.60681 14.8123 7.16483C14.9752 5.95518 13.626 5.32709 13.5562 5.30383C13.1607 5.11773 12.9746 4.62923 13.1607 4.23377C13.3468 3.8383 13.8121 3.65221 14.2308 3.81504C14.3238 3.83831 16.7431 4.9549 16.4175 7.37419ZM14.7193 9.14213C14.8821 9.30497 14.9985 9.56087 14.9985 9.79349C14.9985 10.0494 14.9054 10.282 14.7193 10.4448C14.5565 10.6077 14.3006 10.724 14.068 10.724C13.8353 10.724 13.5794 10.6309 13.4166 10.4448C13.2538 10.282 13.1375 10.0261 13.1375 9.79349C13.1375 9.56087 13.2305 9.30497 13.4166 9.14213C13.5794 8.97929 13.8353 8.86299 14.068 8.86299C14.3006 8.86299 14.5332 8.95603 14.7193 9.14213Z"
                      fill=""
                    />
                  </svg>
                  <span>{t("job")}</span>{" "}
                </Link>
                <p>{t("create free")} </p>
              </div>
              <div className="process_guid  mobilenone mobile">
                <ul>
                  <li>
                    <Link to="#">
                      <img src="./images/profile.svg" />
                      <span>{t("create")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./images/jobs.svg" />
                      <span>{t("apply")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./images/condidate.svg" />
                      <span>{t("search")} </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./images/team.svg" />
                      <span>{t("team")} </span>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <div className='advertise'>
                                <Link to='#'><img src='./images/arrow_purpal.png' />
                                    <span>Advertise your company on our web site</span> </Link>
                            </div> */}
            </div>
          </div>
          <div className="make_safe">
            <h3>{t("make")}</h3>
            <div className="left">
              <h4>
                {t("tools")}
                <span>({t("recommended")})</span>
              </h4>
              <ul className="first">
                <li>{t("review")}</li>
                <li>{t("read")} </li>
                <li>{t("conduct")}</li>
                <li> {t("contact")}</li>
              </ul>
              <ul className="second">
                <li>
                  <img src="./images/review.svg" />
                </li>
                <li>
                  <img src="./images/rating.svg" />
                </li>
                <li>
                  <img src="./images/interview.svg" />
                </li>
                <li>
                  <img src="./images/reference.svg" />
                </li>
              </ul>
            </div>
            <div className="middel">
              <img src="./images/make_banner.svg" />
            </div>
            <div className="right left">
              <h4>{t("agency")}</h4>
              <ul className="second">
                <li>
                  <img src="./images/phone.svg" />
                </li>
                <li>
                  <img src="./images/email.svg" />
                </li>
                <li>
                  <img src="./images/verification.svg" />
                </li>
                <li>
                  <img src="./images/criminal.svg" />
                </li>
              </ul>
              <ul className="first">
                <li>{t("cell")}</li>
                <li>{t("email")}</li>
                <li> {t("facebook")}</li>
                <li>{t("criminal")} </li>
              </ul>
            </div>
            <p>
              {t("detail")}{" "}
              <Link to="/safety-center"> {t("Safety center")} </Link>
            </p>
          </div>
        </div>
      </div>
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
