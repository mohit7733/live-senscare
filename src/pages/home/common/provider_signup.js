import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../../../urls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { country } from "./country";
import Location from "./location";
import { useTranslation } from "react-i18next";
const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const special = RegExp("(?=.*[!@#$%^&*])");
const capital = RegExp("(?=.*[A-Z])");
const number = RegExp("(?=.*[0-9])");
const validPassword = RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const capitalsmall = RegExp("^[a-zA-Z]*$");

function Provider_signup() {
  const { t } = useTranslation("ProvidedSignup");

  var today = new Date();
  const [refresh, setrefresh] = useState("");
  const [category, setcategory] = useState("provider");
  const [describe, setdescribe] = useState({});
  const [stap, setstap] = useState("stap2");
  const [show, setShow] = useState(false);
  const [countrydata, setcountrydata] = useState(country.data);
  const [nonselect, setnonselect] = useState("");
  const [cpassword, setcpassword] = useState(false);
  const [password, setpassword] = useState(false);
  const [ref, setref] = useState("");
  const [latlong, setlatlong] = useState({});
  const [test, settest] = useState([
    { name: "username" },
    { name: "email" },
    { name: "password" },
    { name: "c_password" },
    { name: "first_name" },
    { name: "last_name" },
    { name: "dob" },
    { name: "phone" },
    { name: "address" },
    { name: "city" },
    { name: "zip" },
    { name: "country" },
    { name: "hearAboutUs" },
  ]);
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
  const [contact_code, setcontact_code] = useState({
    code: "",
    flag: "",
  });
  const [setcode, setsetcode] = useState(true);
  const codeselect = () => {
    if (setcode) {
      setsetcode(false);
    } else {
      setsetcode(true);
    }
  };
  const [error, seterror] = useState({
    password: "",
    c_password: "",
    service_type: "",
    username: "",
    email: "",

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
  useEffect(() => {
    console.log(error);
  }, [error, form_logins, refresh]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setform_logins({ ...form_logins, dob: "" });
    setShow(true);
  };
  const logins_field = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        error.username =
          value.length < 2 ? t("Minimum 2 characters required") : "";
        break;
      case "email":
        error.email = emailRegex.test(value) ? "" : t("Email not valid.");

        break;
      case "password":
        error.password = validPassword.test(value) ? "" : "Demo@123";

        break;
      case "c_password":
        error.c_password =
          value != form_logins.password ? t("Password not match.") : "";
        break;
      case "service_type":
        error.service_type =
          value.length < 2 ? t("Minimum 2 characters required") : "";
        break;
      case "first_name":
        error.first_name = capitalsmall.test(value)
          ? (error.first_name =
              value.length < 2 ? t("Minimum 2 characters required") : "")
          : t("Only letters are allowed ");

        break;
      case "last_name":
        error.last_name = capitalsmall.test(value)
          ? (error.last_name =
              value.length < 2 ? t("Minimum 2 characters required") : "")
          : t("Only letters are allowed  ");

        break;
      case "dob":
        error.dob = value.length < 2 ? t("required") : "";
        let x =
          new Date().getFullYear() - parseInt(value) > 16 ? "" : handleShow();
        break;
      case "phone":
        error.phone = value.length < 10 ? t("required") : "";
        break;
      case "address":
        error.address = value.length < 2 ? t("required") : "";
        break;
      case "city":
        error.city = value.length < 2 ? t("required") : "";
        break;
      case "zip":
        error.zip = value.length < 2 ? t("required") : "";
        break;
      case "country":
        error.country = value.length < 2 ? t("required") : "";
        break;
      case "hearAboutUs":
        error.hearAboutUs = value.length < 2 ? t("required") : "";
        break;
      default:
        break;
    }
    setform_logins({ ...form_logins, [name]: value });
    seterror(error);
  };
  const signup = () => {
    if (
      (form_logins.username != "") &
      (contact_code.code != "") &
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
      var formdata = new FormData();
      formdata.append("username", form_logins.username);
      formdata.append("email", form_logins.email);
      formdata.append("password", form_logins.password);
      formdata.append("c_password", form_logins.c_password);
      formdata.append("service_type", JSON.stringify(describe));
      formdata.append("first_name", form_logins.first_name);
      formdata.append("last_name", form_logins.last_name);
      formdata.append("dob", form_logins.dob);
      formdata.append("countrycode", contact_code.code);
      formdata.append("phone", form_logins.phone);
      formdata.append("address", form_logins.address);
      formdata.append("city", form_logins.city);
      formdata.append("zip", form_logins.zip);
      formdata.append("country", form_logins.country);
      formdata.append("hearAboutUs", form_logins.hearAboutUs);
      formdata.append("user_type", category);
      formdata.append("lat", latlong.lat);
      formdata.append("lng", latlong.lng);
      formdata.append(
        "referralId",
        localStorage.getItem("refral") &&
          localStorage.getItem("refral") != "undefined"
          ? localStorage.getItem("refral")
          : ""
      );

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(api + "/api/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          {
            result.errors && result.errors.error.email
              ? seterror({
                  ...error,
                  email: t("The email has already been taken."),
                  first_name: "",
                })
              : setrefresh(result);
          }
          {
            result.errors && result.errors.error.username
              ? seterror({
                  ...error,
                  first_name: "",
                  username: "The username has already been taken.",
                })
              : setrefresh(result);
          }
          setTimeout(() => {
            setrefresh(result);
          }, 500);
          if (result.success) {
            toast.success(result.message);
            setTimeout(() => {
              {
                category == "parents"
                  ? (window.location.href = "/parent_thankyou")
                  : (window.location.href = "/providers_thankyou");
              }
            }, 2010);
          } else {
          }
        })
        .catch((error) => {});
    } else {
      test.map((e) => {
        after_logins_field(e.name);
      });
    }
  };

  const after_logins_field = (name) => {
    switch (name) {
      case "username":
        error.username = form_logins.username == "" ? t("required") : "";
        break;
      case "email":
        error.email = form_logins.email != "" ? "" : t("required");

        break;
      case "password":
        error.password = form_logins.password != "" ? "" : t("required");
        break;
      case "c_password":
        error.c_password = form_logins.c_password == "" ? t("required") : "";
        break;
      case "first_name":
        error.first_name = form_logins.first_name == "" ? t("required") : "";
        break;
      case "last_name":
        error.last_name = form_logins.last_name == "" ? t("required") : "";
        break;
      case "dob":
        error.dob = form_logins.dob == "" ? t("required") : "";
        break;
      case "phone":
        error.phone = form_logins.phone == "" ? t("required") : "";
        break;
      case "phone":
        error.phone = contact_code.code == "" ? t("required") : "";
        break;
      case "address":
        error.address = form_logins.address == "" ? t("required") : "";
        break;
      case "city":
        error.city = form_logins.city == "" ? t("required") : "";
        break;
      case "zip":
        error.zip = form_logins.zip == "" ? t("required") : "";
        break;
      case "country":
        error.country = form_logins.country == "" ? t("required") : "";
        break;
      case "hearAboutUs":
        error.hearAboutUs = form_logins.hearAboutUs == "" ? t("required") : "";
        break;

      default:
        break;
    }
    seterror(error);
    setTimeout(() => {
      setrefresh("njjijiinibiibi");
    }, 1000);
  };

  const describeselect = (a, b) => {
    if (Object.keys(describe).length < 2) {
      setdescribe({ ...describe, [a]: b });
    } else {
      delete describe[a];
      setdescribe({ ...describe });
    }
    console.log(describe);
  };
  const redirect = () => {
    window.location.href = "/signup";
  };
  const getletlon = (latlong2, e, addresss) => {
    e.then(function (result) {
      setlatlong(result);
      console.log(result);
    });
    console.log(latlong2.address_components);
    latlong2.address_components.map((e) => {
      e.types.map((a) => {
        if (a == "country") {
          console.log(e.long_name);
          seterror({ ...error, country: "", address: "" });
          setform_logins({
            ...form_logins,
            country: e.long_name,
            address: addresss,
          });
        }
      });
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="signup_section">
            <div className="header_sign">
              <ul>
                <li>
                  <Link to="/">
                    <img src="./images/left_arrow.svg" />{" "}
                    <span>{t("Home")}</span>{" "}
                  </Link>
                </li>
                <li className="login">
                  <span>{t("Already a member?")}</span>{" "}
                  <Link to="/login">{t("Log In")} </Link>
                </li>
              </ul>
            </div>

            <div
              className={
                "describe more_about " + (stap == "stap2" ? "" : "none")
              }
            >
              <img src="/images/sign_logo.svg" />
              <h2>{t("What describes you best")}</h2>
              <p>
                <span>{t("I am")} </span> (
                {t("Please select up to two professions")}) <br />
                {t("Once you sign up, you can change your choice")}
              </p>
              <div className="process_guid ">
                <ul>
                  <li
                    className={
                      describe && describe.tab1 == t("Nanny")
                        ? "active"
                        : "" + nonselect == ""
                        ? ""
                        : "bordererror"
                    }
                    onClick={(e) => {
                      describeselect("tab1", t("Nanny"));
                      setnonselect("");
                    }}
                  >
                    <Link to="">
                      <img
                        src={
                          describe && describe.tab1 == t("Nanny")
                            ? "./images/nanny_fill.svg"
                            : "./images/nanny.svg"
                        }
                      />
                      <span>{t("Nanny")}</span>
                    </Link>
                  </li>
                  <li
                    className={
                      describe &&
                      describe.tab2 == t("Special Education Teacher")
                        ? "active"
                        : "" + nonselect == ""
                        ? ""
                        : "bordererror"
                    }
                    onClick={(e) => {
                      describeselect("tab2", t("Special Education Teacher"));
                      setnonselect("");
                    }}
                  >
                    <Link to="">
                      <img
                        src={
                          describe &&
                          describe.tab2 == t("Special Education Teacher")
                            ? "./images/teacher_fill.svg"
                            : "./images/teacher.svg"
                        }
                      />
                      <span>{t("Special Education Teacher")}</span>
                    </Link>
                  </li>
                  <li
                    className={
                      describe &&
                      describe.tab3 == t("Special Education Paraprofessional")
                        ? "active"
                        : "" + nonselect == ""
                        ? ""
                        : "bordererror"
                    }
                    onClick={(e) => {
                      describeselect(
                        "tab3",
                        t("Special Education Paraprofessional")
                      );
                      setnonselect("");
                    }}
                  >
                    <Link to="">
                      <img
                        src={
                          describe &&
                          describe.tab3 ==
                            t("Special Education Paraprofessional")
                            ? "./images/education_fill.svg"
                            : "./images/education.svg"
                        }
                      />
                      <span>{t("Special Education Paraprofessional")}</span>
                    </Link>
                  </li>
                  <li
                    className={
                      describe && describe.tab4 == t("Tutor")
                        ? "active"
                        : "" + nonselect == ""
                        ? ""
                        : "bordererror"
                    }
                    onClick={(e) => {
                      describeselect("tab4", t("Tutor"));
                      setnonselect("");
                    }}
                  >
                    {" "}
                    <Link to="">
                      <img
                        src={
                          describe && describe.tab4 == t("Tutor")
                            ? "./images/tutor_fill.svg"
                            : "./images/tutor.svg"
                        }
                      />
                      <span>{t("Tutor")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <button className="back_sign" onClick={redirect}>
                {t("Back")}
              </button>
              <button
                onClick={(e) => {
                  Object.keys(describe).length >= 1
                    ? setstap("stap3")
                    : setnonselect("Please select your needs.");
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
              <img src="/images/sign_logo.svg" />
              <h2>{t("Tell us more about yourself")}</h2>
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
                    type={password ? "text" : "password"}
                    placeholder=". . . . . . . . ."
                    name="password"
                    onChange={(e) => logins_field(e)}
                    className={error.password == "" ? "" : "bordererror"}
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
                  {error.password || error.password ? (
                    <div className="password_rule errorfield signuppassword">
                      <p>
                        {t(
                          "Your password must be between 8-15 characters long and contain:"
                        )}
                        <br />
                        {capital.test(form_logins.password)
                          ? ""
                          : t("- at least one uppercase letter")}
                        <br />
                        {number.test(form_logins.password)
                          ? ""
                          : t(t("- at least one number digit"))}
                        <br />
                        {special.test(form_logins.password)
                          ? ""
                          : t(
                              "- at least one special character -for example:  #, @, !"
                            )}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form_group">
                  <label>{t("Repeat password*")}</label>
                  <input
                    type={cpassword ? "text" : "password"}
                    placeholder=". . . . . . . . . . "
                    name="c_password"
                    onChange={(e) => logins_field(e)}
                    className={error.c_password == "" ? "" : "bordererror"}
                  />
                  <div className="eyes">
                    <input
                      type={"checkbox"}
                      onClick={(e) => {
                        setcpassword(!cpassword);
                      }}
                    />
                    <i></i>
                  </div>
                  <span className="errorfield">{error.c_password}</span>
                </div>

                <div className="form_group">
                  <label>{t("Date of birth*")}</label>
                  <input
                    type="date"
                    min="1960-01-01"
                    value={form_logins.dob}
                    name="dob"
                    className={error.dob == "" ? "" : "bordererror"}
                  />
                  <DatePicker
                    showYearDropdown={true}
                    yearDropdownItemNumber={3}
                    className={error.dob != "" ? "bordererror" : ""}
                    minDate={new Date("1960-01-01")}
                    maxDate={today}
                    selected={
                      form_logins.dob != "" ? new Date(form_logins.dob) : today
                    }
                    name="dob"
                    onChange={(date: Date) => {
                      seterror({ ...error, dob: "" });
                      new Date().getFullYear() - date.getFullYear() > 16
                        ? setform_logins({
                            ...form_logins,
                            dob:
                              date.getFullYear() +
                              "-" +
                              String(date.getMonth() + 1).padStart(2, "0") +
                              "-" +
                              String(date.getDate()).padStart(2, "0"),
                          })
                        : handleShow();
                    }}
                  />
                  <span className="errorfield">{error.dob}</span>
                </div>

                <div className="form_group number">
                  <label>{t("Mobile phone*")}</label>
                  <input
                    type="number"
                    placeholder={t("Type here")}
                    name="phone"
                    onChange={(e) => {
                      logins_field(e);
                      setform_logins({
                        ...form_logins,
                        phone:
                          e.target.value.length <= 10
                            ? e.target.value
                            : form_logins.phone,
                      });
                    }}
                    className={error.phone == "" ? "" : "bordererror"}
                    maxLength="10"
                    value={form_logins.phone}
                  />
                  <div
                    className={
                      error.phone == ""
                        ? "country_flag"
                        : "bordererror country_flag"
                    }
                    onClick={(e) => codeselect()}
                  >
                    <img src={contact_code.flag} /> {contact_code.code}
                  </div>
                  <ul style={setcode ? { display: "none" } : {}}>
                    {country.data.map((e) => {
                      return (
                        <li
                          onClick={(a) => {
                            codeselect();
                            setcontact_code({
                              flag: e.flag,
                              code: e.dial_code,
                            });
                          }}
                        >
                          <img src={e.flag} />{" "}
                          {e.country + " " + " " + e.dial_code}
                        </li>
                      );
                    })}
                  </ul>
                  <span className="errorfield">{error.phone}</span>
                </div>
                <div className="form_group">
                  <label>{t("Address*")}</label>
                  {/* <input type="text" placeholder='Street name, House number' name='address' onChange={e => logins_field(e)} className={error.address == '' ? '' : "bordererror"} /> */}
                  <div className={error.address == "" ? "" : "bordererror"}>
                    <Location let={getletlon} />
                  </div>
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
                  <input
                    type="text"
                    name="country"
                    onChange={(e) => logins_field(e)}
                    value={form_logins.country}
                    className={error.country == "" ? "" : "bordererror"}
                  />
                  <span className="errorfield">{error.country}</span>
                </div>
                <div className="form_group">
                  <label>{t("How did you hear about us?*")}</label>
                  <select
                    name="hearAboutUs"
                    onChange={(e) => console.log(logins_field(e), "EEE")}
                    className={error.hearAboutUs == "" ? "" : "bordererror"}
                  >
                    <option>{t("Choose from the list")}</option>
                    <option value={t("Internet browsing ")}>
                      {t("Internet browsing")}
                    </option>
                    <option value={"Friend recommendation"}>
                      {t("Friend recommendation")}
                    </option>
                    <option value={t("Facebook")}>{t("Facebook")}</option>
                    <option value={t("Our website")}>
                      {t("Our website")}{" "}
                    </option>
                    <option value={t("Other")}>{t("Other")}</option>
                  </select>
                  <span className="errorfield">{error.hearAboutUs}</span>
                </div>
              </form>
              <p>
                {t("By clicking on “Sign up” you agree to our")}
                <Link to="/terms-of-use" target={"_blank"}>
                  {t("Terms of Use")}
                </Link>{" "}
                {t("and")}
                <Link to="/privacy-policy" target={"_blank"}>
                  {t("Privacy Policy")}
                </Link>
                .
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
                  {t("Sign Up")}
                </Link>
              </button>
            </div>
            <div
              className={
                "signupdetail " +
                (stap == "stap2" || stap == "stap2" || stap == "stap3"
                  ? ""
                  : "none")
              }
            >
              <h2>
                {t("Sign Up")} <br /> {t("for FREE!")}
              </h2>
              <ul>
                <li>
                  <img src="./images/thanks_right.svg" />{" "}
                  <span>{t("Create your profile.")}</span>
                </li>
                <li>
                  <img src="./images/thanks_right.svg" />{" "}
                  <span>{t("Browse and apply for child services jobs.")}</span>
                </li>
                <li>
                  <img src="./images/thanks_right.svg" />{" "}
                  <span>{t("Connect with schools and families.")}</span>
                </li>
              </ul>
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
            <p>
              {t(
                "Thank you for your interest in the SensCare platform. Unfortunately, SensCare does not allow persons younger than 16 years to advertise on our website."
              )}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Provider_signup;
