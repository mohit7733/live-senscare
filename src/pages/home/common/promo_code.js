import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { api } from "../../../urls";
import { useTranslation } from "react-i18next";
function Promo_code(props) {
  const { t } = useTranslation("promo-code");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [copytet, setcopy] = useState(false);

  const [count, setcount] = useState(false);
  const [promo, setpromo] = useState("");

  useEffect(() => {
    if (!count) {
      setcount(true);
      promo_get();
    }
    setcopy(copytet);
  }, [count, copytet]);
  useEffect(() => {
    setcopy(copytet);
  }, [copytet]);

  const promo_get = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(api + "/api/getpromocode", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result.data.map((e) => {
          setpromo(e.name);
        });
      })
      .catch((error) => console.log("error", error));
  };
  const copy = (text) => {
    window.navigator.clipboard.writeText(text);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "<span >Copied</span> Copy code";
  };
  const handleCopy = (text) => {
    setcopy(true);
    handleClose();
    setTimeout(() => {
      handleShow();
    }, 10);
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    var tooltip = document.getElementById("myTooltip");
    // tooltip.innerHTML = "<span >"+(<TranslateComponent text="Copyed" />) + "</span>"+(<TranslateComponent text=" Copy code" />)
    // { console.log(tooltip.innerHTML,<TranslateComponent text="Copyed" />) }
  };
  return (
    <>
      <Link to="#" variant="primary" onClick={handleShow}>
        {props.title ? props.title : t("discount")}{" "}
      </Link>

      {show == true ? (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <div className="promocode_content">
                <Link to="" onClick={handleClose}>
                  +{" "}
                </Link>
                <h2>{t("reward")}</h2>
                <p>
                  {t("rewardFirst")} <span>{t("monthly")}</span>
                  {t("remainsActive")}
                </p>
                <img src={window.location.origin + "/images/promo.png"} />
                <h5>
                  {t("advantages")}
                  <Link to="/signup"> {t("register")} </Link>
                  {t("getDiscount")}
                </h5>
                <p>
                  {t("enter")}{" "}
                  <span style={{ textTransform: "uppercase" }}>{promo} </span>{" "}
                  {t("codePayment")}{" "}
                </p>
                <button
                  onClick={(e) => handleCopy(promo.toString())}
                  class="tooltiptext"
                  id="myTooltip"
                >
                  {copytet == true ? t("Copyed") : t("Copy code")}{" "}
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Promo_code;
