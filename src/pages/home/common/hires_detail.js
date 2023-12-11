import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../urls";
import { useTranslation } from "react-i18next";

function Hires_detail(props) {
  const { t } = useTranslation("hiring");
  const [list, setlist] = useState([]);
  const [check, setcheck] = useState(true);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [message, setmessage] = useState("");

  const profile_data = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      inv_id: props.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/hiring_notificationview", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setlist([result.data]);
        setmessage(result.data.currentUserName);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (check) {
      profile_data();
      setcheck(false);
    }
    console.log(list);
  }, [check]);

  return (
    <>
      {list && list[0] ? (
        <>
          <h2 className="border"></h2>
          <div className="detail_invit recomend">
            <h2 className="first">
              {t("Dear")} {" " + message},
            </h2>{" "}
            <h2>
              <a>{list[0].jobOwnerName}</a> {t("has just hired you.")}
            </h2>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Hires_detail;
