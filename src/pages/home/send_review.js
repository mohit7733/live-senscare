import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../urls";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Send_review(props) {
  const { t } = useTranslation("send_review");
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [review, setreview] = useState("");
  const [hover2, setHover2] = useState(0);
  const [rating, setRating] = useState(0);
  const [ratingn, setRatingn] = useState(0);
  const [thanks, setthanks] = useState(0);

  const [error, seterror] = useState({
    rating: "",
    title: "",
    review: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("token") && !localStorage.getItem("id")) {
      navigate("/login");
    }
    if (localStorage.getItem("id") == props.slugdata) {
      props.setrequest(false);
    }
  }, [ratingn, error]);
  const review_send = () => {
    if (title && review && ratingn > 0) {
      setthanks(2);
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        receiver_userid: props.slugdata,
        review_title: title,
        rating: ratingn,
        message: review,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(api + "/api/v1/sendreview", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setthanks(1);
            props.setcheckdata("2");
          } else {
            props.setrequest(false);
          }
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      title == "" ? seterror({ ...error, title: "blank" }) : settitle(title);
      review == ""
        ? seterror({ ...error, review: "blank" })
        : setreview(review);
      ratingn == 0
        ? seterror({ ...error, rating: "blank" })
        : setRatingn(ratingn);
    }
  };
  return (
    <>
      {thanks == 0 || thanks == 2 ? (
        <div className="promocode_content signout invite request reviewpop">
          {/* <Link to="" onClick={e => props.setrequest(false)}>+ </Link> */}

          <h2>{t("Write Review")}</h2>
          <div className="form_groupre">
            <label className={error.rating != "" ? "starred" : ""}>
              {t("Select rating")}{" "}
              <span className="star">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <i
                      type="button"
                      key={index}
                      className={
                        index <= (hover2 || ratingn)
                          ? "on fa-solid fa-star"
                          : "off fa-regular fa-star"
                      }
                      onClick={() => {
                        seterror({ ...error, rating: "" });
                        setRatingn(index);
                      }}
                      onMouseEnter={() => setHover2(index)}
                      onMouseLeave={() => setHover2(rating)}
                    ></i>
                  );
                })}
              </span>
            </label>
          </div>
          <div className="form_groupre">
            <label>{t("Review title")}</label>
            <input
              className={error.title != "" ? "bordererror" : ""}
              type="text"
              placeholder={t("Type here")}
              onChange={(e) => {
                seterror({ ...error, title: "" });
                settitle(e.target.value);
              }}
              maxLength="25"
            />
            <span>
              {t("Number of characters")} {25 - title.length}
            </span>
          </div>
          <div className="form_groupre">
            <label>{t("Write Review")}</label>
            <textarea
              className={error.review != "" ? "bordererror" : ""}
              placeholder={t("Type here")}
              onChange={(e) => {
                seterror({ ...error, review: "" });
                setreview(e.target.value);
              }}
              maxLength="300"
            ></textarea>
            <span>
              {t("Number of characters")} {300 - review.length}
            </span>
          </div>
          <div class="button text-center ">
            <div class="pull-right">
              <button class="btn" onClick={(e) => props.setrequest(false)}>
                {t("Cancel")}
              </button>
            </div>
            <div class="pull-right">
              <button
                class="btn confirm"
                onClick={review_send}
                style={thanks == 2 ? { opacity: "0.5" } : {}}
              >
                {t("Submit")}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="promocode_content signout invite">
          <p>
            <b>
              {t("Thank you for submitting review for")}{" "}
              <span style={{ color: "#A98D4B" }}>{props.username}</span>!{" "}
            </b>
          </p>
          <p>
            {t(
              "We are glad that you are part of the SensCare family and share your experience with others."
            )}
          </p>
          <div class="button text-center ">
            <div class="pull-right">
              <button class="btn" onClick={(e) => props.setrequest(false)}>
                {t("Close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Send_review;
