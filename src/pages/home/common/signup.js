import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../../../urls";
import { country } from "./country";
import { useTranslation } from "react-i18next";
const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const validPassword = RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
function Signup() {
  const { t } = useTranslation("signup");

  const [category, setcategory] = useState("");
  const [describe, setdescribe] = useState({});
  const [stap, setstap] = useState("stap1");
  const [show, setShow] = useState(false);
  const [countrydata, setcountrydata] = useState(country.data);
  const [nonselect, setnonselect] = useState("");
  const [form_logins, setform_logins] = useState({
    username: "",
    email: "",
    password: "",
    c_password: "",
    service_type: "",
    first_name: "",
    last_name: "",
    dob: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    hearAboutUs: "",
    user_type: "",
  });
  const [error, seterror] = useState({
    username: "",
    email: "",
    password: "",
    c_password: "",
    service_type: "",
    first_name: "",
    last_name: "",
    dob: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    hearAboutUs: "",
  });

  const slugdata = useParams();
  let data = slugdata.refral;

  useState(() => {
    localStorage.setItem("refral", data);
  }, [data]);
  const logins_field = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        error.username =
          value.length < 2 ? t("Minimum 2 characters required") : "";
        break;
      case "email":
        error.email = emailRegex.test(value) ? "" : t("Password not same.");

        break;
      case "password":
        error.password = validPassword.test(value) ? "" : "Demo@123";
        error.c_password =
          value != form_logins.c_password ? t("Password not same.") : "";
        break;
      case "c_password":
        error.c_password =
          value != form_logins.password ? t("Password not same.") : "";
        break;
      case "service_type":
        error.service_type =
          value.length < 2 ? t("Minimum 2 characters required") : "";
        break;
      case "first_name":
        error.first_name =
          value.length < 2 ? t("Minimum 2 characters required") : "";
        break;
      case "last_name":
        error.last_name =
          value.length < 2 ? t("Minimum 2 characters required") : "";
        break;
      case "dob":
        error.dob = value.length < 2 ? "required" : "";
        let x =
          new Date().getFullYear() - parseInt(value) > 16 ? "" : handleShow();
        break;
      case "phone":
        error.phone = value.length < 10 ? "required" : "";
        break;
      case "address":
        error.address = value.length < 2 ? "required" : "";
        break;
      case "city":
        error.city = value.length < 2 ? "required" : "";
        break;
      case "zip":
        error.zip = value.length < 2 ? "required" : "";
        break;
      case "country":
        error.country = value.length < 2 ? "required" : "";
        break;
      case "hearAboutUs":
        error.hearAboutUs = value.length < 2 ? "required" : "";
        break;
      default:
        break;
    }
    setform_logins({ ...form_logins, [name]: value });
    seterror(error);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const describeselect = (a, b) => {
    if (Object.keys(describe).length < 2) {
      setdescribe({ ...describe, [a]: b });
    } else {
      delete describe[a];
      setdescribe({ ...describe });
    }
  };

  const signup = () => {
    if (
      (form_logins.username != "") &
      (form_logins.email != "") &
      (form_logins.password != "") &
      (form_logins.c_password != "") &
      (form_logins.first_name != "") &
      (form_logins.last_name != "") &
      (form_logins.dob != "") &
      (form_logins.phone != "") &
      (form_logins.address != "") &
      (form_logins.city != "") &
      (form_logins.zip != "") &
      (form_logins.country != "") &
      (form_logins.hearAboutUs != "")
    ) {
      let type2 = Object.keys(describe)[2];
      var formdata = new FormData();
      formdata.append("username", form_logins.username.toLocaleLowerCase());
      formdata.append("email", form_logins.email.toLocaleLowerCase());
      formdata.append("password", form_logins.password);
      formdata.append("c_password", form_logins.c_password);
      formdata.append("service_type[]", Object.keys(describe)[0]);
      // formdata.append("service_type[]", Object.keys(describe)[1])
      formdata.append("first_name", form_logins.first_name);
      formdata.append("last_name", form_logins.last_name);
      formdata.append("dob", form_logins.dob);
      formdata.append("phone", form_logins.phone);
      formdata.append("address", form_logins.address);
      formdata.append("city", form_logins.city);
      formdata.append("zip", form_logins.zip);
      formdata.append("country", form_logins.country);
      formdata.append("hearAboutUs", form_logins.hearAboutUs);
      formdata.append("user_type", category);
      formdata.append(
        "referralId",
        "eyJpdiI6IlNaODJ2dG1hOEsrbVdjdDhHR1BhY1E9PSIsInZhbHVlIjoicE1yVVpyeWNNZ1VxYkY5cDJJNjJZUT09IiwibWFjIjoiYTc5ODdjZDM1NTc2N2MxMzY2NjEzZTRkMDlkZTZmM2Y4N2M2NGE3YmJhY2Q5YjA0YmFhNDRhODE0ZWM1OThjMSJ9"
      );
      // { type2 ?  : '' }

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(api + "/api/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            // toast.success(result.message)
            setTimeout(() => {
              {
                category == "parents"
                  ? (window.location.href = "/parent_thankyou")
                  : (window.location.href = "/providers_thankyou");
              }
            }, 2010);
          } else {
            // toast.error("User signup unsuccessfully.")
          }
        })
        .catch((error) => {
          // toast.error("User signup unsuccessfully.")
        });
    } else {
      // toast.error("All field Require.")
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <div className="container-fluid">
        <div className="container">
          <div className="signup_section">
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
                  <span>{t("Already a member?")}</span>{" "}
                  <Link to="/login">{t("Log In")} </Link>
                </li>
              </ul>
            </div>

            <div className={"more_about " + (stap == "stap1" ? "" : "none")}>
              <img src={window.location.origin + "/images/sign_logo.svg"} />
              <h2>{t("Tell us more about your needs")}</h2>
              <ul>
                <li
                  className={category == "parents" ? "active" : ""}
                  onClick={(e) => {
                    setcategory("parents");
                    setnonselect("");
                  }}
                >
                  <span className={nonselect == "" ? "" : "bordererror"}>
                    <img
                      src={
                        category == "parents"
                          ? window.location.origin +
                            "/images/sign_service_fill.svg"
                          : window.location.origin + "/images/sign_service.svg"
                      }
                    />
                    <h4>{t("I need a service")}</h4>
                  </span>
                  <p>
                    {t(
                      "Start your free search for child services in selected areas"
                    )}
                  </p>
                </li>
                <li
                  className={category == "provider" ? "active" : ""}
                  onClick={(e) => {
                    setcategory("provider");
                    setnonselect("");
                  }}
                >
                  <span className={nonselect == "" ? "" : "bordererror"}>
                    <img
                      src={
                        category == "provider"
                          ? window.location.origin +
                            "/images/sign_search_fill.svg"
                          : window.location.origin + "/images/sign_search.svg"
                      }
                    />
                    <h4>{t("I need a job")}</h4>
                  </span>
                  <p>{t("Create a free profile and search for jobs")}</p>
                </li>
              </ul>
              <div className="process_guid ">
                <p>
                  {t(
                    "And then take a few more easy steps to become a SensCare member"
                  )}
                </p>
                <ul>
                  <li>
                    <Link to="#">
                      <img
                        src={window.location.origin + "/images/profile.svg"}
                      />
                      <span>{t("Create your profile")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src={window.location.origin + "/images/jobs.svg"} />
                      <span>{t("Apply for jobs")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img
                        src={window.location.origin + "/images/condidate.svg"}
                      />
                      <span>{t("Search for candidates")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src={window.location.origin + "/images/team.svg"} />
                      <span>{t("Team up")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <button
                onClick={(e) => {
                  category != ""
                    ? category == "parents"
                      ? (window.location.href = "/signup_Parents")
                      : (window.location.href = "/signup_provider")
                    : setnonselect("Please select your needs.");
                }}
              >
                {t("Next")}
              </button>
            </div>
            <div
              className={
                "describe more_about " + (stap == "stap2" ? "" : "none")
              }
            >
              <img src={window.location.origin + "/images/sign_logo.png"} />
              <h2>{t("Tell us more about yourself")}</h2>
              <p>
                {t("I am (Please select up to two professions)")}
                <br />
                {t("Once you sign up, you can change your choice")}
              </p>
              <div className="process_guid ">
                <ul>
                  <li
                    className={
                      describe && describe.tab1 == "nany" ? "active" : ""
                    }
                    onClick={(e) => describeselect("tab1", "nany")}
                  >
                    <Link to="">
                      <img
                        src={
                          describe && describe.tab1 == "nany"
                            ? "./images/nanny_fill.png"
                            : "./images/nanny.png"
                        }
                      />
                      <span>{t("Nanny")}</span>
                    </Link>
                  </li>
                  <li
                    className={
                      describe && describe.tab2 == "education_teacher"
                        ? "active"
                        : ""
                    }
                    onClick={(e) => describeselect("tab2", "education_teacher")}
                  >
                    <Link to="">
                      <img
                        src={
                          describe && describe.tab2 == "education_teacher"
                            ? "./images/teacher_fill.png"
                            : "./images/teacher.png"
                        }
                      />
                      <span>{t("Special Education Teacher")}</span>
                    </Link>
                  </li>
                  <li
                    className={
                      describe && describe.tab3 == "paraprofessional"
                        ? "active"
                        : ""
                    }
                    onClick={(e) => describeselect("tab3", "paraprofessional")}
                  >
                    <Link to="">
                      <img
                        src={
                          describe && describe.tab3 == "paraprofessional"
                            ? "./images/education_fill.png"
                            : "./images/education.png"
                        }
                      />
                      <span>{t("Special Education Paraprofessional")}</span>
                    </Link>
                  </li>
                  <li
                    className={
                      describe && describe.tab4 == "tutor" ? "active" : ""
                    }
                    onClick={(e) => describeselect("tab4", "tutor")}
                  >
                    {" "}
                    <Link to="">
                      <img
                        src={
                          describe && describe.tab4 == "tutor"
                            ? "./images/tutor_fill.png"
                            : "./images/tutor.png"
                        }
                      />
                      <span>{t("Tutor")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <button className="back_sign" onClick={(e) => setstap("stap1")}>
                {t("back")}
              </button>
              <button
                onClick={(e) => {
                  Object.keys(describe).length >= 1
                    ? setstap("stap3")
                    : console.log("Please select yourself.");
                }}
              >
                {t("Next")}
              </button>
            </div>

            <div
              className={
                "describe more_about form_signup " +
                (stap == "stap3" ? "" : "none")
              }
            >
              <img src="./images/sign_logo.png" />
              <h2>{t("Tell us more about your needs")}</h2>
              <form>
                <div className="form_group">
                  <label>{t("First Name*")}</label>
                  <input
                    type="text"
                    placeholder={t("Type here")}
                    className={error.first_name == "" ? "" : "bordererror"}
                    name="first_name"
                    onChange={(e) => logins_field(e)}
                  />
                  <span className="errorfield">{error.first_name}</span>
                </div>
                <div className="form_group">
                  <label>{t("Last Name*")}</label>
                  <input
                    type="text"
                    placeholder={t("Type here")}
                    name="last_name"
                    onChange={(e) => logins_field(e)}
                    className={error.last_name == "" ? "" : "bordererror"}
                  />
                  <span className="errorfield">{error.last_name}</span>
                </div>
                <div className="form_group">
                  <label>{t("Username*")}</label>
                  <input
                    type="text"
                    placeholder={t("Type here")}
                    name="username"
                    onChange={(e) => logins_field(e)}
                    className={error.username == "" ? "" : "bordererror"}
                  />
                  <span className="errorfield">{error.username}</span>
                </div>
                <div className="form_group">
                  <label>{t("Email address*")}</label>
                  <input
                    type="email"
                    placeholder={t("Type here")}
                    name="email"
                    onChange={(e) => logins_field(e)}
                    className={error.email == "" ? "" : "bordererror"}
                  />
                  <span className="errorfield">{error.email}</span>
                </div>

                <div className="form_group">
                  <label>{t("Password*")}</label>
                  <input
                    type="password"
                    placeholder=". . . . . . . . ."
                    name="password"
                    onChange={(e) => logins_field(e)}
                    className={error.password == "" ? "" : "bordererror"}
                  />
                  <span className="errorfield">{error.password}</span>
                </div>

                <div className="form_group">
                  <label>{t("Repeat password*")}</label>
                  <input
                    type="password"
                    placeholder=". . . . . . . . . . "
                    name="c_password"
                    onChange={(e) => logins_field(e)}
                    className={error.c_password == "" ? "" : "bordererror"}
                  />
                  <span className="errorfield">{error.c_password}</span>
                </div>

                <div className="form_group">
                  <label>{t("Date of birth*")}</label>
                  <input
                    type="date"
                    placeholder={t("Type here")}
                    name="dob"
                    onBlur={(e) => logins_field(e)}
                    className={error.dob == "" ? "" : "bordererror"}
                  />
                  <span className="errorfield">{error.dob}</span>
                </div>
                <div className="form_group">
                  <label>{t("Mobile phone*")}</label>
                  <input
                    type="number"
                    placeholder={t("Type here")}
                    name="phone"
                    onChange={(e) => logins_field(e)}
                    className={error.phone == "" ? "" : "bordererror"}
                  />
                  <span className="errorfield">{error.phone}</span>
                </div>
                <div className="form_group">
                  <label>{t("Address*")}</label>
                  <input
                    type="text"
                    placeholder={t("Street name, House number")}
                    name="address"
                    onChange={(e) => logins_field(e)}
                    className={error.address == "" ? "" : "bordererror"}
                  />
                  <span className="errorfield">{error.address}</span>
                </div>
                <div className="form_group part2">
                  <div className="citydetail">
                    <label>{t("City*")}</label>
                    <input
                      type="text"
                      placeholder={t("Type here")}
                      name="city"
                      onChange={(e) => logins_field(e)}
                      className={error.city == "" ? "" : "bordererror"}
                    />
                    <span className="errorfield">{error.city}</span>
                  </div>
                  <div className="citydetail">
                    <label>{t("Zip code*")}</label>
                    <input
                      type="number"
                      placeholder={t("Type here")}
                      name="zip"
                      onChange={(e) => logins_field(e)}
                      className={error.zip == "" ? "" : "bordererror"}
                    />
                    <span className="errorfield">{error.zip}</span>
                  </div>
                </div>
                <div className="form_group">
                  <label>{t("Country*")}</label>
                  <select
                    name="country"
                    onChange={(e) => logins_field(e)}
                    className={error.country == "" ? "" : "bordererror"}
                  >
                    <option></option>
                    {countrydata.map((e) => {
                      return <option value={e.country}> {e.country}</option>;
                    })}
                  </select>
                  <span className="errorfield">{error.country}</span>
                </div>
                <div className="form_group">
                  <label>{t("How did you hear about us?*")}</label>
                  <select
                    name="hearAboutUs"
                    onChange={(e) => logins_field(e)}
                    className={error.hearAboutUs == "" ? "" : "bordererror"}
                  >
                    <option>{t("Choose from the list")}</option>
                    <option value={t("Internet browsing ")}>
                      {t("Internet browsing")}
                    </option>
                    <option value={t("Friend recommendation")}></option>
                    <option value={t("Facebook")}>{t("Facebook")}</option>
                    <option value={t("Our website")}>
                      {t("Our website ")}{" "}
                    </option>
                    <option value={t("Other")}>{t("Other")}</option>
                  </select>
                  <span className="errorfield">{error.hearAboutUs}</span>
                </div>
              </form>
              <p>
                {t("By clicking on “Sign up” you agree to our")}
                <Link to="/terms-of-use">{t("Terms of Use")} </Link> and{" "}
                <Link to="/privacy-policy">{t("Privacy Policy")} </Link>.
              </p>
              <button className="back_sign" onClick={(e) => setstap("stap2")}>
                {t("Back")}
              </button>
              <button
                onClick={(e) => {
                  // handleShow()
                  signup();
                }}
              >
                <Link
                  to="#"
                  // '/thank_you'
                >
                  {t("Sign Up")}{" "}
                </Link>
              </button>
            </div>
            <div
              className={
                "signupdetail " +
                (stap == "stap1" || stap == "stap2" || stap == "stap3"
                  ? ""
                  : "none")
              }
            >
              {category == "provider" ? (
                <>
                  <h2>
                    {t("Sign Up")}
                    <br /> {t("for FREE!")}
                  </h2>
                  <ul>
                    <li>
                      <img
                        src={
                          window.location.origin + "/images/thanks_right.svg"
                        }
                      />{" "}
                      <span>{t("Create your profile.")}</span>
                    </li>
                    <li>
                      <img
                        src={
                          window.location.origin + "/images/thanks_right.svg"
                        }
                      />{" "}
                      <span>
                        {t("Browse and apply for child services jobs.")}
                      </span>
                    </li>
                    <li>
                      <img
                        src={
                          window.location.origin + "/images/thanks_right.svg"
                        }
                      />{" "}
                      <span>{t("Find an ideal candidate.")}</span>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
              {category == "parents" ? (
                <>
                  <h2>
                    {t("Connect with schools and families.")} <br />{" "}
                    {t("for FREES!")}
                  </h2>
                  <ul>
                    <li>
                      <img
                        src={
                          window.location.origin + "/images/thanks_right.svg"
                        }
                      />{" "}
                      <span>{t("Add your job post.")}</span>
                    </li>
                    <li>
                      <img
                        src={
                          window.location.origin + "/images/thanks_right.svg"
                        }
                      />{" "}
                      <span>{t("Browse a candidate's profile.")}</span>
                    </li>
                    <li>
                      <img
                        src={
                          window.location.origin + "/images/thanks_right.svg"
                        }
                      />{" "}
                      <span>{t("Find an ideal candidate")}</span>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="promocode_content younger">
            <Link to="" onClick={handleClose}>
              +{" "}
            </Link>
            <h5>{t("Thank you!")}</h5>
            <p>{t("ThankYouFor")}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Signup;
