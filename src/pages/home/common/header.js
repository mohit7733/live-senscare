import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import SelectBoxCustom from "../common/selectBoxCustom";
import AWS from "aws-sdk";
import { useTranslation } from "react-i18next";

// const locales = {
//   en: { title: "ENG" },
//   sb: { title: "SRB" },
// };

function Header(props) {
  const { t } = useTranslation("header");

  const navigate = useNavigate();
  const [menu, setmenu] = useState("close");
  const [language, setlanguage] = useState("1");
  const [count, setcount] = useState(true);
  const [check, setcheck] = useState(useLocation());
  const [logincheck, setlogincheck] = useState({
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
    namep: localStorage.getItem("name"),
    type: localStorage.getItem("user_type"),
  });
  if (check.pathname != "/faq") {
    localStorage.removeItem("faq");
    localStorage.removeItem("refine");
  }
  if (check.pathname != "/search-providers") {
    localStorage.removeItem("refine");
  }
  if (check.pathname != "/search-parents") {
    localStorage.removeItem("refine2");
  }
  if (
    check.pathname != "/search-parents" &&
    check.pathname != "/search-providers" &&
    check.pathname != "/profile-parents/:id" &&
    check.pathname != "/profile-provider/:id"
  ) {
    localStorage.removeItem("search");
    localStorage.removeItem("search2");
    localStorage.removeItem("edittime");
    localStorage.removeItem("filter");
  }
  if (
    check.pathname != "/search-parents/:id" &&
    check.pathname != "/search-providers/:id" &&
    check.pathname != "/search-parents/:id/:name" &&
    check.pathname != "/search-providers/:id/:name"
  ) {
    localStorage.removeItem("side");
  }
  const checkmy = () => {
    // if (check.pathname == "/search-providers") {
    //     window.location.reload()
    // }
    // if (check.pathname == "/search-parents") {
    //     window.location.reload()
    // }
  };

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("search");
    localStorage.removeItem("search2");
    setTimeout(() => {
      window.location.replace("/login");
    }, 500);
  };

  if (count == true) {
    window.scrollTo({ top: 0 });
    setcount(false);
  }

  const [translatedText, setTranslatedText] = useState("");
  const translate = new AWS.Translate({
    region: "us-west-2",
    accessKeyId: "AKIAZEH755VC6ZPP3KGK",
    secretAccessKey: "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",
  });

  const translatePage = async () => {
    const pageText = document.body.innerHTML.toString();
    const params = {
      Text: pageText,
      SourceLanguageCode: "en",
      TargetLanguageCode: "fr",
    };
    try {
      const data = await translate.translateText(params).promise();
      setTranslatedText(data.TranslatedText);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  // setTimeout(() => {
  //     translatePage()
  // }, 5000);

  return (
    <>
      {/* {translatedText ? (
                <div dangerouslySetInnerHTML={{ __html: translatedText }} />
            ) : (
                <div>Loading...</div>
            )} */}
      <div className="container-fluid border" style={{ zIndex: 11 }}>
        <div className="container">
          <div className="header">
            <div className="search">
              <button onClick={props.fil}>
                {check.pathname == "/search-providers" ||
                check.pathname == "/search-parents" ? (
                  <img src={window.location.origin + "/images/search.svg"} />
                ) : (
                  <NavLink to={"/search-providers"}>
                    <img src={window.location.origin + "/images/search.svg"} />
                  </NavLink>
                )}
              </button>
            </div>
            <div className="logo_main">
              <Link to="/">
                <img
                  src={window.location.origin + "/images/logo.svg"}
                  alt="logo"
                />{" "}
              </Link>
            </div>
            <div className="mobileicon">
              <button onClick={(e) => setmenu("open")}>
                <img src={window.location.origin + "/images/menuicon.svg"} />
              </button>
            </div>
            <div className="menu">
              <ul>
                <li>
                  <Link to="/" className={props.page == "home" ? "active" : ""}>
                    {t("home")}
                  </Link>
                </li>
                {/* {logincheck.id && logincheck.token ?
                                    <>
                                        <li ><Link to='/signup'>Educational Store <img src='./images/done_a.svg' /></Link></li>
                                        <li ><Link to='/signup'>Child Services Directory <img src='./images/done_a.svg' /></Link></li>
                                    </>
                                    : <li><Link to='#'>Blog </Link></li>} */}

                <li>
                  <a href="https://blog.mysenscare.com">{t("blog")}</a>
                </li>
                {logincheck.id && logincheck.token ? (
                  <>
                    <li className="signup">
                      <Link
                        to={""}
                        //  {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"}
                      >
                        {t("upgrade")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to=""
                        className={props.page == "proile" ? "active" : ""}
                      >
                        {logincheck.namep ? logincheck.namep : "username"}{" "}
                        <img
                          src={window.location.origin + "/images/done_a.svg"}
                        />
                      </Link>
                      <ul>
                        <li>
                          <Link
                            to={
                              localStorage.getItem("user_type") != "parents"
                                ? "/search-parents/Account"
                                : "/search-providers/Account"
                            }
                            onClick={(e) => {
                              localStorage.setItem("search2", "setting");
                            }}
                          >
                            {t("My Profile")}
                          </Link>
                        </li>
                        <li onClick={logout}>{t("Logout")}</li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="signup">
                      <Link style={{ textTransform: "None" }} to="/signup">
                        {t("Sign Up")}
                      </Link>
                    </li>
                    <li className="login">
                      <Link style={{ textTransform: "None" }} to="/login">
                        {t("Log In")}
                      </Link>
                    </li>
                  </>
                )}
                {/* <Google_translater /> */}
                <li className="lang" id="google_element">
                  <SelectBoxCustom
                    items={[
                      {
                        value: "ENG",
                        id: 1,
                        icon:
                          window.location.origin + "/images/Flag_of_the_US.svg",
                        lang: "en",
                      },
                      {
                        value: "SRB",
                        id: 2,
                        icon: window.location.origin + "/images/Serbia.png",
                        lang: "sr",
                      },
                    ]}
                  />

                  {/* {Object.keys(locales).map((locale) => (
                    <li key={locale}>
                      <button
                        style={{
                          fontWeight:
                            i18n.resolvedLanguage === locale
                              ? "bold"
                              : "normal",
                        }}
                        type="submit"
                        onClick={() => i18n.changeLanguage(locale)}
                      >
                        {locales[locale].title}
                      </button>
                    </li>
                  ))} */}
                </li>
              </ul>
            </div>
            <span className={"menu mobilem shadow " + menu}></span>
            <div className={"menu mobilem " + menu}>
              <button onClick={(e) => setmenu("close")}>
                <img src={window.location.origin + "/images/cross.svg"} />
              </button>
              <ul>
                <li className="border">
                  <Link to="/" className={props.page == "home" ? "active" : ""}>
                    {t("home")}
                  </Link>
                </li>
                {/* {logincheck.id && logincheck.token ?
                                    <>
                                        <li ><Link to='/signup'>Educational Store <img src='./images/done_a.svg' /></Link></li>
                                        <li ><Link to='/signup'>Child Services Directory <img src='./images/done_a.svg' /></Link></li>
                                    </>
                                    : <li><Link to='#'>Blog </Link></li>} */}
                <li className="border">
                  <a href="https://blog.mysenscare.com">{t("blog")}</a>
                </li>
                <li className="">
                  <Link to="/search-parents/Loyalty">{t("SC Referrals")}</Link>
                </li>
                {logincheck.id && logincheck.token ? (
                  <>
                    <li>
                      <Link
                        to=""
                        className={props.page == "profile" ? "active" : ""}
                      >
                        {logincheck.namep ? logincheck.namep : "username"}{" "}
                        <img
                          src={window.location.origin + "/images/done_a.svg"}
                        />
                      </Link>
                      <ul>
                        <li>
                          <Link
                            to={
                              localStorage.getItem("user_type") != "parents"
                                ? "/search-parents/Account"
                                : "/search-providers/Account"
                            }
                            onClick={(e) => {
                              localStorage.setItem("search2", "Account");
                              // checkmy()
                            }}
                          >
                            {t("Account")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={
                              localStorage.getItem("user_type") != "parents"
                                ? "/search-parents/Profile"
                                : "/search-providers/Profile"
                            }
                            onClick={(e) => {
                              localStorage.setItem("search2", "Profile");
                              // checkmy()
                            }}
                          >
                            {t("View/Edit Profile")}
                          </Link>
                        </li>
                        <li onClick={logout}>{t("Logout")}</li>
                      </ul>
                    </li>
                  </>
                ) : (
                  ""
                )}
                <li className="lang">
                  <SelectBoxCustom
                    items={[
                      {
                        value: "ENG",
                        id: 1,
                        icon:
                          window.location.origin + "/images/Flag_of_the_US.svg",
                        lang: "en",
                      },
                      {
                        value: "SRB",
                        id: 2,
                        icon: window.location.origin + "/images/Serbia.png",
                        lang: "sr",
                      },
                    ]}
                  />
                </li>
                {logincheck.id && logincheck.token ? (
                  <>
                    <li className="signup">
                      <Link
                        to={""}
                        // {localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"}
                      >
                        {t("Upgrade")}
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="signup">
                      <Link to="/signup">{t("Sign Up")}</Link>
                    </li>
                    <li className="login">
                      <Link to="/login">{t("Log In")}</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
