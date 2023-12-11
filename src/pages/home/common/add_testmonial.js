import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../../../urls";
import StarRating from "./StarRating";
import TranslateComponent from "../../../translate-component";
import { useTranslation } from "react-i18next";

function Add_testmonial(props) {
  const { t } = useTranslation("modalWindows");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(0);
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [hover, setHover] = useState(0);
  const [hover2, setHover2] = useState(0);
  const [hover3, setHover3] = useState(0);
  const [test, settest] = useState([
    {
      name: "userId",
    },
    {
      name: "recommendValue",
    },
    {
      name: "navigationValue",
    },
    {
      name: "seeService",
    },
    {
      name: "overallValue",
    },
    {
      name: "userReview",
    },
    {
      name: "otherService",
    },
  ]);

  const [form_logins, setform_logins] = useState({
    userId: parseInt(localStorage.getItem("id")),
    recommendValue: "",
    navigationValue: "",
    seeService: "",
    overallValue: "",
    userReview: "",
    otherService: "jb",
  });
  const [error, seterror] = useState({
    userId: "",
    recommendValue: "",
    navigationValue: "",
    seeService: "",
    overallValue: "",
    userReview: "",
    otherService: "",
  });

  const logins_field = (name) => {
    switch (name) {
      case "userId":
        error.userId = form_logins.userId == "" ? "required" : "";
        break;
      case "recommendValue":
        error.recommendValue =
          form_logins.recommendValue != "" ? "" : "required";

        break;
      case "navigationValue":
        error.navigationValue =
          form_logins.navigationValue != "" ? "" : "required";
        break;
      case "seeService":
        error.seeService = form_logins.seeService == "" ? "required" : "";
        break;
      case "overallValue":
        error.overallValue = form_logins.overallValue == "" ? "required" : "";
        break;
      case "userReview":
        error.userReview = form_logins.userReview == "" ? "required" : "";
        break;
      case "otherService":
        error.otherService = form_logins.otherService == "" ? "required" : "";
        break;
      default:
        break;
    }
    seterror(error);
  };


  useEffect(() => {}, [error, form_logins]);

  const add_testmonial_api = () => {
    if (
      (form_logins.recommendValue,
      form_logins.navigationValue,
      form_logins.seeService,
      form_logins.overallValue,
      form_logins.userReview)
      // form_logins.otherService
    ) {
      if (token && form_logins.userId) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var formdata = new FormData();
        formdata.append("userId", form_logins.userId);
        formdata.append("recommendValue", form_logins.recommendValue);
        formdata.append("navigationValue", form_logins.navigationValue);
        formdata.append("seeService", form_logins.seeService);
        formdata.append("overallValue", form_logins.overallValue);
        formdata.append("userReview", form_logins.userReview);
        formdata.append("otherService", form_logins.otherService);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        fetch(api + "/api/v1/savesurvey", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.success) {
              handleClose();
            } else {
            }
          })
          .catch((error) => {});
      } else {
      }
    } else {
      test.map((e) => {
        logins_field(e.name);
      });
    }
  };
  return (
    <>
      <div className="testimonial_add">
        <Link to="#" onClick={handleShow}>
          {props.name}
        </Link>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
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
            <div className="promocode_content testimonial_adds">
              <Link to="" onClick={handleClose}>
                +{" "}
              </Link>
              <h2> {t("Testimonials and Survey")}</h2>

              <div className="add_test">
                <h3 className="border">
                  {t(
                    "Thank you for being a valuable member of the SensCare community. Please, help us improve by taking part in a short survey"
                  )}{" "}
                </h3>
                <h5>{t("Please tell us about your experience so far")} </h5>
                <div className="que1">
                  <p>
                    {t("Would you recommend SensCare to friends and family?")}{" "}
                  </p>
                  <span className="star">
                    <div className="star-rating">
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <i
                            type="button"
                            key={index}
                            className={
                              index <= (hover || form_logins.recommendValue)
                                ? "on fa-solid fa-star"
                                : "off fa-regular fa-star"
                            }
                            onClick={() =>
                              setform_logins({
                                ...form_logins,
                                recommendValue: index,
                              })
                            }
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                          ></i>
                        );
                      })}
                    </div>
                  </span>
                  <span className="errorfield">{error.recommendValue}</span>
                </div>
                <div className="que1">
                  <p>{t("How will you rate the site navigation?")} </p>
                  <span className="star">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <i
                          type="button"
                          key={index}
                          className={
                            index <= (hover2 || form_logins.navigationValue)
                              ? "on fa-solid fa-star"
                              : "off fa-regular fa-star"
                          }
                          onClick={() =>
                            setform_logins({
                              ...form_logins,
                              navigationValue: index,
                            })
                          }
                          onMouseEnter={() => setHover2(index)}
                          onMouseLeave={() => setHover2(rating)}
                        ></i>
                      );
                    })}
                  </span>
                  <span className="errorfield">{error.navigationValue}</span>
                </div>
                <div className="que1 border">
                  <p>
                    {t(
                      "What additional services you would like to see on our website:"
                    )}{" "}
                  </p>
                  <div className="option">
                    <label>
                      <input
                        type={"radio"}
                        name="service"
                        onClick={(e) =>
                          setform_logins({
                            ...form_logins,
                            seeService: "Cleaning",
                          })
                        }
                      />
                      <span>{t("Cleaning")}</span>
                    </label>
                    <label>
                      <input
                        type={"radio"}
                        name="service"
                        onClick={(e) =>
                          setform_logins({
                            ...form_logins,
                            seeService: "Elderly care",
                          })
                        }
                      />
                      <span>{t("Elderly care")}</span>
                    </label>
                    <label>
                      <input
                        type={"radio"}
                        name="service"
                        onClick={(e) =>
                          setform_logins({
                            ...form_logins,
                            seeService: "Pet care",
                          })
                        }
                      />
                      <span>{t("Pet care")}</span>
                    </label>
                    <label>
                      <input
                        type={"radio"}
                        name="service"
                        onClick={(e) =>
                          setform_logins({
                            ...form_logins,
                            seeService: "Other",
                          })
                        }
                      />
                      <span>{t("Other")}</span>
                      <div className="comment">
                        <textarea
                          rows={2}
                          cols={5}
                          placeholder={t("Type here")}
                          onChange={(e) => {
                            setform_logins({
                              ...form_logins,
                              otherService: e.target.value,
                            });
                          }}
                        />
                        <span>{t("Number of characters 70")} </span>
                      </div>
                    </label>
                  </div>
                  <span className="errorfield">{error.seeService}</span>
                </div>
                <div className="que1">
                  <p>
                    {t("Rate your overall impression with SensCare platform")}{" "}
                  </p>
                  <span className="star">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <i
                          type="button"
                          key={index}
                          className={
                            index <= (hover3 || form_logins.overallValue)
                              ? "on fa-solid fa-star"
                              : "off fa-regular fa-star"
                          }
                          onClick={() =>
                            setform_logins({
                              ...form_logins,
                              overallValue: index,
                            })
                          }
                          onMouseEnter={() => setHover3(index)}
                          onMouseLeave={() => setHover3(rating)}
                        ></i>
                      );
                    })}
                  </span>
                  <span className="errorfield">{error.overallValue}</span>
                </div>
                <div className="que1 border sec2">
                  <p>{t("Write your review")} </p>
                  <div className="comment">
                    <textarea
                      rows={2}
                      cols={5}
                      onChange={(e) => {
                        setform_logins({
                          ...form_logins,
                          userReview: e.target.value,
                        });
                      }}
                    />
                    <span>{t("Number of characters 70")} </span>
                    <div className="errorfield" style={{ bottom: "5px" }}>
                      {error.userReview}
                    </div>
                  </div>
                </div>
                <div className="buttons">
                  <button className="rest" onClick={add_testmonial_api}>
                    {t("Send")}
                  </button>
                  <button>{t("Cancel")} </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Add_testmonial;
