import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { api } from "../../urls";
import Footer from "./common/footer";
import Header from "./common/header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Preloader from "./common/preLoader";
import data from "./../../teamdata.json";

function About() {
  const sliderRef = useRef();
  const { t, i18n } = useTranslation("aboutUs");
  const language = i18n.language;

  const [isloading, setIsloading] = useState(false);
  const [count, setcount] = useState(true);
  const [count2, setcount2] = useState(true);
  const [showemail, setShowemail] = useState("");
  const [abhoudata, setabhoudata] = useState("");
  const [teamdata, setteamdata] = useState([]);

  const handleCloseemail = () => {
    setShowemail("");
  };
  const handleShow1 = (e) => {
    setShowemail(e);
  };

  useEffect(() => {
    if (count) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      setIsloading(true);
      fetch(api + "/api/aboutus", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setabhoudata(result.data);
          setIsloading(false);
        })
        .catch((error) => console.log("error", error));

      setcount(false);
    }
    if (count2) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(api + "/api/allteam", requestOptions)
        .then((response) => response.json())
        .then((result) => setteamdata(result.data))
        .catch((error) => console.log("error", error));
      setcount2(false);
    }
  }, [count, count2]);
  var settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    arrows: true,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <>
      <Header />
      <div className="container-fluid">
        <Preloader isloading={isloading} />
        <div className="container">
          <div className="about">
            <div className="content border">
              <h2>{t("title", { defaultValue: abhoudata.title })}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: t("description", {
                    defaultValue: abhoudata.description,
                  }),
                }}
              />
            </div>
            <h2>{t("Meet our team")}</h2>

            <ul>
              <Slider
                ref={sliderRef}
                {...settings2}
                id="Slider-4"
                className="slider_test"
              >
                {language === "en"
                  ? teamdata.map((e, index) => {
                      return (
                        <div className="item">
                          <li>
                            <img src={api + "/assets/cms/" + e.image} />
                            <h3>{e.name}</h3>
                            <p>{e.education}</p>
                            <h4>{e.position}</h4>
                            <button onClick={(e) => handleShow1(index + 1)}>
                              {t("Read more about")}
                              {
                                e.name
                                  .substr(e.name.lastIndexOf("\\") + 1)
                                  .split(" ")[0]
                              }
                            </button>
                            <Modal
                              show={showemail == index + 1 ? true : false}
                              onHide={handleCloseemail}
                              className="about_model"
                            >
                              <Modal.Body>
                                <div className="promocode_content reset_email reset">
                                  <Link to="" onClick={handleCloseemail}>
                                    +{" "}
                                  </Link>
                                  <div className="about_team">
                                    <img src={api + "/assets/cms/" + e.image} />
                                    <div className="named">
                                      <h3>{e.name}</h3>
                                      <p>{e.education}</p>
                                      <h4>{e.position}</h4>
                                    </div>
                                    <p>{e.description}</p>
                                  </div>
                                </div>
                              </Modal.Body>
                            </Modal>
                          </li>
                        </div>
                      );
                    })
                  : data.map((e, index) => {
                      return (
                        <div className="item">
                          <li>
                            <img src={api + "/assets/cms/" + e.image} />
                            <h3>{e.name}</h3>
                            <p>{e.education}</p>
                            <h4>{e.position}</h4>
                            <button onClick={(e) => handleShow1(index + 1)}>
                              {t("Read more about")}
                              {e.nameCorrect}
                            </button>
                            <Modal
                              show={showemail == index + 1 ? true : false}
                              onHide={handleCloseemail}
                              className="about_model"
                            >
                              <Modal.Body>
                                <div className="promocode_content reset_email reset">
                                  <Link to="" onClick={handleCloseemail}>
                                    +{" "}
                                  </Link>
                                  <div className="about_team">
                                    <img src={api + "/assets/cms/" + e.image} />
                                    <div className="named">
                                      <h3>{e.name}</h3>
                                      <p>{e.education}</p>
                                      <h4>{e.position}</h4>
                                    </div>
                                    <p>{e.description}</p>
                                  </div>
                                </div>
                              </Modal.Body>
                            </Modal>
                          </li>
                        </div>
                      );
                    })}
              </Slider>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
