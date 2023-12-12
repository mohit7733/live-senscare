import React from "react";
import { api } from "../../../urls";
import Modal from "react-bootstrap/Modal";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Favorite_select(props) {
  const { t } = useTranslation("favorite_profile");
  const navigate = useNavigate();
  const [remove, setremove] = useState(false);
  const [removecheck, setremovecheck] = useState(
    props.heart || props.heart2 == true ? true : false
  );
  const [removecheck2, setremovecheck2] = useState(true);
  const favourite_selectapi = (a) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      job_id: a,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/savefavjob", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        props.heart ? props.heart() : console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {/* <button onClick={e => props.heart()}>sfdgsg</button> */}
      <input
        type="checkbox"
        onChange={(e) => {
          if (localStorage.getItem("token") && localStorage.getItem("id")) {
            if (e.target.checked == false) {
              setremove(true);
            } else {
              favourite_selectapi(props.id);
              setremovecheck(true);
            }
          } else {
            navigate("/login");
          }
        }}
        checked={removecheck2 == false ? removecheck2 : removecheck}
      />
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.6276 0.342582C10.1734 0.116411 10.7585 0 11.3493 0C11.9402 0 12.5253 0.116411 13.0711 0.342582C13.6168 0.568711 14.1127 0.90013 14.5303 1.31791C14.9481 1.73556 15.2798 2.23164 15.5059 2.77738C15.7321 3.32322 15.8485 3.90828 15.8485 4.49913C15.8485 5.08997 15.7321 5.67503 15.5059 6.22087C15.2797 6.76667 14.9483 7.26256 14.5305 7.68023C14.5304 7.68027 14.5305 7.68019 14.5305 7.68023L8.41336 13.7973C8.14312 14.0676 7.70499 14.0676 7.43475 13.7973L1.31766 7.68023C0.473975 6.83655 0 5.69227 0 4.49913C0 3.30598 0.473975 2.16171 1.31766 1.31803C2.16134 0.474345 3.30561 0.000370052 4.49876 0.000370052C5.6919 0.000370052 6.83618 0.474345 7.67986 1.31803L7.92405 1.56222L8.16813 1.31814C8.16817 1.3181 8.1681 1.31818 8.16813 1.31814C8.5858 0.900306 9.08181 0.568732 9.6276 0.342582ZM11.3493 1.38396C10.9403 1.38396 10.5353 1.46455 10.1574 1.62113C9.77948 1.77771 9.43614 2.00721 9.14697 2.29652L8.41336 3.03013C8.14312 3.30036 7.70499 3.30036 7.43475 3.03013L6.70125 2.29663C6.11711 1.71249 5.32485 1.38433 4.49876 1.38433C3.67266 1.38433 2.8804 1.71249 2.29626 2.29663C1.71212 2.88077 1.38396 3.67303 1.38396 4.49913C1.38396 5.32522 1.71212 6.11749 2.29626 6.70162L7.92405 12.3294L13.5518 6.70162C13.8412 6.41245 14.0708 6.069 14.2273 5.6911C14.3839 5.31321 14.4645 4.90817 14.4645 4.49913C14.4645 4.09008 14.3839 3.68504 14.2273 3.30715C14.0708 2.92926 13.8413 2.58592 13.552 2.29675C13.2628 2.00744 12.9192 1.77771 12.5413 1.62113C12.1634 1.46455 11.7584 1.38396 11.3493 1.38396Z"
          fill="#A98D4B"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.71965 0.345857C10.2707 0.117524 10.8614 0 11.4579 0C12.0544 0 12.645 0.117524 13.1961 0.345857C13.747 0.574148 14.2476 0.908736 14.6693 1.33051C15.091 1.75215 15.4258 2.25297 15.6541 2.80394C15.8825 3.355 16 3.94565 16 4.54214C16 5.13864 15.8825 5.72929 15.6541 6.28035C15.4258 6.83136 15.0912 7.332 14.6694 7.75366L8.49379 13.9292C8.22098 14.2021 7.77865 14.2021 7.50583 13.9292L1.33025 7.75366C0.478506 6.90191 0 5.74669 0 4.54214C0 3.33759 0.478506 2.18237 1.33025 1.33063C2.182 0.47888 3.33722 0.00037359 4.54177 0.00037359C5.74632 0.00037359 6.90154 0.47888 7.75328 1.33063L7.99981 1.57716L8.24623 1.33074C8.66789 0.908914 9.16864 0.574169 9.71965 0.345857Z"
          fill={props.heart ? "#A98D4B" : "transparent"}
        />
      </svg>
      {remove ? (
        <Modal show={remove} onHide={(e) => setremove(false)}>
          <Modal.Body>
            <div className="promocode_content signout invite favoritemod">
              <h2>{t("Remove from Favorites")}</h2>
              <p>
                {t("Are you sure you want to remove")}{" "}
                <span style={{ color: "#A98D4B" }}>{props.username} </span>{" "}
                {t("from Favorites?")}
              </p>
              <div class="button text-center ">
                <div class="pull-right">
                  <button
                    class="btn"
                    onClick={(e) => {
                      favourite_selectapi(props.id);
                      setremove(false);
                      setremovecheck2(false);
                      if (props.heart2 && props.heart2 == true) {
                        setremovecheck(false);
                      }
                    }}
                  >
                    {t("Remove")}
                  </button>
                  <button
                    class="btn"
                    onClick={(e) => {
                      setremovecheck(true);
                      setremove(false);
                    }}
                  >
                    {t("Keep")}
                  </button>
                </div>
              </div>
              <p class="hidemod">
                {t("Please visit our")}{" "}
                <Link to="/faq" target="_blank">
                  {t("FAQ")}
                </Link>{" "}
                {t("and")}{" "}
                <Link target="_blank" to="/safety-center">
                  {t("Safety center")}
                </Link>{" "}
                {t("to read more about SensCare platform and our safety tips.")}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default Favorite_select;
