import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { api } from "../../../urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FacebookProvider, LoginButton } from "react-facebook";
import ReCAPTCHA from "react-google-recaptcha";
import ReCaptach from "./recaptcha";
import { useParams, useNavigate } from "react-router-dom";
import LinkedInPage from "./linkedin";

import { useTranslation } from "react-i18next";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
function Login() {
  const { t } = useTranslation("login");
  const [showflogin, setShowflogin] = useState(false);
  const [showfprovider, setShowfprovider] = useState(false);
  const [activate, setactivate] = useState(false);
  const [reactiveask, setreactiveask] = useState(false);

  const [showemail, setShowemail] = useState(false);
  const [password, setpassword] = useState(false);
  const [fetchbotton, setfetchbotton] = useState("");
  const [form_logins, setform_logins] = useState({
    username: "",
    password: "",
    remember: false,
    resetemailadd: "",
  });
  const [error, seterror] = useState({
    username: "",
    password: "",
    resetemailadd: "",
  });

  const handleCloseemail = () => {
    setShowemail(false);
  };
  const handleCloselogin_first = () => {
    setShowflogin(false);
    window.location.replace("/search-providers");
  };
  const handleCloselogin_firstprovider = () => {
    setShowfprovider(false);
    window.location.replace("/search-parents");
  };
  const handleShowemail = () => {
    setShowemail(true);
  };
  const handleShowlogin_first = () => {
    setShowflogin(true);
  };
  const handleShowlogin_firstprovider = () => {
    setShowfprovider(true);
  };

  useEffect(() => {
    let x = localStorage.getItem("remember");
    if (x != null) {
      setform_logins(JSON.parse(x));
    }
  }, [showflogin, showemail, showflogin, showfprovider]);

  const remember = (e) => {
    form_logins.remember = e.target.checked;
    setform_logins(form_logins);
    if (form_logins.remember == true) {
      localStorage.setItem("remember", JSON.stringify(form_logins));
    } else {
      localStorage.clear();
    }
  };

  const logins_field = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        error.username = value.length > 4 ? "" : t("Email not valid.");
        break;
      case "password":
        error.password =
          value.length < 8 ? t("Minimum 8 characters required") : "";
        break;
      case "resetemailadd":
        error.resetemailadd = value.length > 4 ? "" : t("Email not valid.");
        break;
      default:
        break;
    }
    setform_logins({ ...form_logins, [name]: value });
    seterror(error);
  };
  const slugdata = useParams();
  let data = slugdata.id;
  const login = () => {
    localStorage.removeItem("search");
    localStorage.removeItem("search2");
    if (form_logins.username != "" && form_logins.password != "") {
      var formdata = new FormData();
      formdata.append("email", form_logins.username.toLocaleLowerCase());
      formdata.append("password", form_logins.password);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(api + "/api/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.data == "Not verified") {
            document.getElementById("unsuccess").style.display = "block";
          } else {
            document.getElementById("unsuccess").style.display = "none";
          }
          if (result.success) {
            localStorage.setItem("id", result.data.user.id);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("user_type", result.data.user.user_type);
            setfetchbotton(result.data.user.user_type);
            localStorage.setItem(
              "name",
              result.data.user.first_name + " " + result.data.user.last_name
            );
            result.data.welcomeMessage ? setactivate(true) : setactivate(false);
            console.log(result);

            if (!data) {
              !result.data.welcomeMessage ? (
                <>
                  {result.data.user &&
                  result.data.user.user_type == "provider" &&
                  result.data.user.backgroundstatus != null
                    ? window.location.replace("/search-parents")
                    : result.data.user &&
                      result.data.user.user_type == "parents" &&
                      result.data.jobExist == 1
                    ? window.location.replace("/search-providers")
                    : result.data.user &&
                      result.data.user.user_type == "parents"
                    ? setTimeout(() => {
                        handleShowlogin_first();
                      }, 500)
                    : result.data.user &&
                      result.data.user.user_type == "provider"
                    ? setTimeout(() => {
                        handleShowlogin_firstprovider();
                      }, 500)
                    : setfetchbotton(result.data.user.user_type)}
                </>
              ) : result.data.welcomeMessage ? (
                setactivate(true)
              ) : (
                setactivate(false)
              );
            } else {
              window.location.reload();
            }
          } else {
            result.message == "You are entering the wrong password."
              ? seterror({ password: t("Incorrect password"), username: "" })
              : result.message == "You are entering the wrong email or username"
              ? seterror({
                  username: t("Incorrect email / username"),
                  password: "",
                })
              : seterror({
                  username: "",
                  password: "",
                });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      seterror({
        username: "required",
        password: "required",
      });
    }
  };

  const handleResponse = (data) => {
    var formdata = new FormData();
    formdata.append("email", data.profile.email);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(api + "/api/facebooklogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success == false) {
          seterror({ username: t("Incorrect email / username"), password: "" });
        } else {
          console.log(result);
          if (result.data == "Not verified") {
            document.getElementById("unsuccess").style.display = "block";
          } else {
            document.getElementById("unsuccess").style.display = "none";
          }
          if (result.success) {
            localStorage.setItem("id", result.data.user.id);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("user_type", result.data.user.user_type);
            setfetchbotton(result.data.user.user_type);
            localStorage.setItem(
              "name",
              result.data.user.first_name + " " + result.data.user.last_name
            );
            result.data.welcomeMessage ? setactivate(true) : setactivate(false);
            console.log(result);

            if (!data) {
              !result.data.welcomeMessage ? (
                <>
                  {result.data.user &&
                  result.data.user.user_type == "provider" &&
                  result.data.user.backgroundstatus != null
                    ? window.location.replace("/search-parents")
                    : result.data.user &&
                      result.data.user.user_type == "parents" &&
                      result.data.jobExist == 1
                    ? window.location.replace("/search-providers")
                    : result.data.user &&
                      result.data.user.user_type == "parents"
                    ? setTimeout(() => {
                        handleShowlogin_first();
                      }, 500)
                    : result.data.user &&
                      result.data.user.user_type == "provider"
                    ? setTimeout(() => {
                        handleShowlogin_firstprovider();
                      }, 500)
                    : setfetchbotton(result.data.user.user_type)}
                </>
              ) : result.data.welcomeMessage ? (
                setactivate(true)
              ) : (
                setactivate(false)
              );
            } else {
              window.location.replace("/");
            }
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    console.log(data);
    setform_logins({ ...form_logins, username: data.profile.email });
  };

  const handleError = (error) => {
    console.log({ error });
  };

  const resetemail = () => {
    if (form_logins.resetemailadd != "") {
      var formdata = new FormData();
      formdata.append("email", form_logins.resetemailadd);
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(api + "/api/resetpassword", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            toast.success(result.message);
            handleCloseemail();
          } else {
            seterror({
              resetemailadd: t("You are enter the wrong email/username"),
            });
          }
          console.log(result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      seterror({
        resetemailadd: "required",
      });
    }
  };

  const redirect = () => {
    window.location.href = "/";
  };
  const [verfied, setVerifed] = useState(false);

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifed(true);
  }

  return (
    <>
      {/* <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            /> */}
      <div className="container-fluid">
        <div className="container">
          <div className="signup_section loginbg">
            <div className="header_sign">
              <ul>
                <li>
                  <Link to="/">
                    <img
                      src={window.location.origin + "/images/left_arrow.svg"}
                    />{" "}
                    <span>{t("home")}</span>{" "}
                  </Link>
                </li>
                <li className="login">
                  <span>{t("Don’t have an account?")}</span>{" "}
                  <Link to="/signup">{t("Sign Up")}</Link>
                </li>
              </ul>
            </div>

            <div className={"more_about login_form"}>
              <img src={window.location.origin + "/images/sign_logo.svg"} />
              <h2>{t("login")}</h2>
              <span className="unsuccess" id="unsuccess">
                {t(
                  "Your email is not verified. Please check your email to verify account."
                )}
              </span>
              <form>
                <div className="form_group">
                  <label> {t("email")}</label>
                  <input
                    className={error.username == "" ? "" : "bordererror"}
                    type={"text"}
                    placeholder={t("type")}
                    name="username"
                    onChange={(e) => logins_field(e)}
                    defaultValue={form_logins.username}
                  />
                  <span className="errorfield">{error.username}</span>
                </div>
                <div className="form_group">
                  <label>{t("Password")}</label>
                  <input
                    className={error.password == "" ? "" : "bordererror"}
                    type={password ? "text" : "password"}
                    placeholder=". . .  . . . . . . . "
                    name="password"
                    onChange={(e) => logins_field(e)}
                    defaultValue={form_logins.password}
                  />
                  <div className="eyes">
                    <input
                      type={"checkbox"}
                      onClick={(e) => {
                        setpassword(!password);
                      }}
                    />
                    <i></i>
                  </div>
                  <span className="errorfield">{error.password}</span>
                </div>
                <div className="rmfog">
                  <label>
                    <input
                      type={"checkbox"}
                      onClick={(e) => {
                        remember(e);
                      }}
                    />{" "}
                    <span>{t("Remember me")}</span>
                  </label>
                  <Link to="" onClick={handleShowemail}>
                    {t("Forgot password?")}{" "}
                  </Link>
                </div>
                <div className="captcha">
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={onChange}
                  />
                </div>
              </form>
              {/* <img src={window.location.origin + '/images/recaptcha.png' /> */}

              <button
                disabled={!verfied}
                onClick={(e) => {
                  // handleShowlogin_first(),
                  login();
                }}
              >
                {t("Log In")}
              </button>
              <span>
                <span></span>
                <p>{t("Or Log In with")}</p>
              </span>
              <FacebookProvider appId="3384521628485216">
                <LoginButton
                  scope="email"
                  onCompleted={handleResponse}
                  onError={handleError}
                  className="facebook"
                >
                  <span>
                    <i class="fa-brands fa-facebook-f"></i>{" "}
                    {t("Log in with Facebook")}
                  </span>
                </LoginButton>
              </FacebookProvider>
              <LinkedInPage handleResponse={handleResponse} />
              {/* <Link to='#' className='indi'><i class="fa-brands fa-linkedin-in"></i> Log in with LinkedIn </Link> */}
              <p>
                {t("Don’t have an account?")}
                <Link to="/signup">{t("Sign Up")} </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showemail} onHide={handleCloseemail}>
        <Modal.Body>
          <div className="promocode_content reset_email reset">
            <Link to="" onClick={handleCloseemail}>
              +{" "}
            </Link>
            <h5>{t("Reset Password")}</h5>
            <p>
              <span>{t("Don't you worry, we’ve got your back!")}</span>
              <br />{" "}
              {t(
                "Enter your email address below and we will send you instructions to reset your password."
              )}
            </p>
            <div className="form_group">
              <input
                type={"email"}
                className={error.resetemailadd == "" ? "" : "bordererror"}
                placeholder="example@emailprovider.com"
                name="resetemailadd"
                onChange={(e) => logins_field(e)}
              />
              <span className="errorfield">{error.resetemailadd}</span>
            </div>
            <div className="buttons reset4">
              <button className="rest" onClick={resetemail}>
                {t("Send")}
              </button>
              <button class="rest" onClick={handleCloseemail}>
                {t("Cancel")}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showflogin} onHide={handleCloselogin_first}>
        <Modal.Body>
          <div className="promocode_content login_first">
            <Link to="" onClick={handleCloselogin_first}>
              +{" "}
            </Link>
            <h2>{t("Complete your profile and find the perfect candidate")}</h2>
            <img src={window.location.origin + "/images/landing.png"} />
            <p>
              {t(
                "Answer a few questions to help you find the candidates that are just right for you!"
              )}
            </p>
            <button>
              <Link to={"/complete-parents-profile"}>
                {t("Complete Profile")}
              </Link>
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showfprovider} onHide={handleCloselogin_firstprovider}>
        <Modal.Body>
          <div className="promocode_content login_first">
            <Link to="" onClick={handleCloselogin_firstprovider}>
              +{" "}
            </Link>
            <h2>{t("Complete your profile and get a perfect job")}</h2>
            <img src={window.location.origin + "/images/landing.png"} />
            <p>
              {t(
                "Answer a few questions to make it easier to find jobs that are just made for you!"
              )}
            </p>
            <button>
              <Link to={"/complete-provider-profile"}>
                {t("Complete Profile")}
              </Link>
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {activate ? (
        <Modal show={activate} onHide={(e) => setactivate(false)}>
          <Modal.Body>
            <div className="promocode_content login_first reactivatefirst ">
              <Link to="" onClick={(e) => setactivate(false)}>
                +{" "}
              </Link>
              <h2>{t("We are glad you are back!")}</h2>
              <img src={window.location.origin + "/images/activate.png"} />
              <p>
                {t(
                  "Reactivate Account today to get full access to your profile and connect with SensCare members"
                )}
              </p>
              <button>
                <Link
                  to={""}
                  onClick={(e) => {
                    setactivate(false);
                    setreactiveask(true);
                  }}
                >
                  {t("Reactivate my Account")}
                </Link>
              </button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      <Modal show={reactiveask} onHide={(e) => setreactiveask(false)}>
        <Modal.Body>
          <div className="promocode_content reactiveask">
            <Link to="" onClick={(e) => setreactiveask(false)}>
              +{" "}
            </Link>
            <h2>{t("Reactivate Account")}</h2>
            <div className="cancelmembershipp">
              <p>{t("Do you want to update your profile information?")} </p>
              <div class="button text-center">
                <div class="pull-right">
                  <button class="btn" onClick={(e) => setreactiveask(false)}>
                    {" "}
                    <Link
                      to={
                        fetchbotton != "parents"
                          ? "/search-parents"
                          : "/search-providers"
                      }
                    >
                      {t("No")}
                    </Link>
                  </button>
                </div>
                <div class="pull-right">
                  <button class="btn confirm">
                    {" "}
                    <Link
                      to={
                        fetchbotton == "parents"
                          ? "/complete-parents-profile"
                          : "/complete-provider-profile"
                      }
                    >
                      {t("Yes")}
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
