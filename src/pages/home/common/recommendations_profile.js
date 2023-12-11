import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../urls";
import Modal from "react-bootstrap/Modal";
import { jsPDF } from "jspdf";
import { useTranslation } from "react-i18next";

function Recommendatins_profile(props) {
  const [list, setlist] = useState([]);
  const { t } = useTranslation("recomendation");
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
  const [request, setrequest] = useState(false);

  const profile_data = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      recomm_id: props.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/providerrecommendation_notifyview", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setlist([result.data.data]);
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

  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#recipt"), {
      callback: function (pdf) {
        // var pageCount = doc.internal.getNumberOfPages();
        // pdf.deletePage(pageCount);
        pdf.save(list && list[0] && list[0].ParentName + ".pdf");
      },
    });
  };

  return (
    <>
      {list && list[0] ? (
        <>
          <h2 className="border"></h2>
          <div className="detail_invit recomend">
            <p>
              <span className="date">
                {new Date(
                  list && list[0] && list[0].created_at
                ).toLocaleDateString("en-US", { weekday: "short" })}
                ,{" "}
                {month[
                  new Date(list && list[0] && list[0].created_at).getMonth()
                ] +
                  " " +
                  new Date(list && list[0] && list[0].created_at).getDate()}
                ,{" "}
                {new Date(list && list[0] && list[0].created_at).getFullYear()},{" "}
                {new Date(
                  list && list[0] && list[0].created_at
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
            <h2 className="first">
              {t("Dear")} <span>{message}</span>,
            </h2>
            <h2 className="last">
              <Link to={"/profile-parents/" + list[0]?.recommendation_userid}>
                {list && list[0] && list[0].ParentName}
              </Link>{" "}
              {t("has just sent you a recommendation file.")}
            </h2>
          </div>
          <div className="doc">
            <p onClick={generatePDF}>
              <svg
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.336 0C7.76 0 8.168 0.168 8.472 0.472L12.328 4.336C12.632 4.632 12.8 5.04 12.8 5.464V14.4C12.8 15.28 12.08 16 11.2 16H1.592C0.712 16 0 15.28 0 14.4V1.6C0 0.72 0.72 0 1.6 0H7.336ZM4.00014 12.7994H8.80014C9.24014 12.7994 9.60014 12.4394 9.60014 11.9994C9.60014 11.5594 9.24014 11.1994 8.80014 11.1994H4.00014C3.56014 11.1994 3.20014 11.5594 3.20014 11.9994C3.20014 12.4394 3.56014 12.7994 4.00014 12.7994ZM8.80014 9.6H4.00014C3.56014 9.6 3.20014 9.24 3.20014 8.8C3.20014 8.36 3.56014 8 4.00014 8H8.80014C9.24014 8 9.60014 8.36 9.60014 8.8C9.60014 9.24 9.24014 9.6 8.80014 9.6ZM7.20014 1.19945V4.79945C7.20014 5.23945 7.56014 5.59945 8.00014 5.59945H11.6001L7.20014 1.19945Z"
                  fill="white"
                />
              </svg>
              {t("Recommendation_")}
              {list && list[0] && list[0].ParentName}.doc
            </p>
            <Link to="" onClick={(e) => setrequest(true)}>
              {t("Show preview")}
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
      {request ? (
        <Modal show={request} onHide={(e) => setrequest(false)}>
          <Modal.Body>
            <div className="promocode_content signout invite request recomandationdwn">
              <h2>{list && list[0] && list[0].ParentName}.doc</h2>
              <Link to="" onClick={(e) => setrequest(false)}>
                +{" "}
              </Link>
              <br />
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7072 10.2523C11.841 10.2528 11.0214 10.6445 10.477 11.3182L5.64755 8.90347C5.77548 8.41171 5.76698 7.89438 5.62296 7.40709L10.5426 4.74641C11.5004 5.85506 13.1396 6.06415 14.3451 5.23145C15.5506 4.39876 15.9353 2.79169 15.2374 1.50341C14.5396 0.215139 12.9834 -0.340625 11.6274 0.214168C10.2714 0.768961 9.55101 2.25615 9.9563 3.6641L5.0367 6.32478C4.2458 5.41389 2.96968 5.09486 1.84317 5.5264C0.716664 5.95794 -0.0197013 7.04791 0.000401531 8.25408C0.0205043 9.46025 0.792783 10.5251 1.93305 10.9188C3.07331 11.3126 4.33809 10.9512 5.0982 10.0145L9.92761 12.4292C9.62817 13.6178 10.1167 14.8654 11.1437 15.5346C12.1707 16.2038 13.5093 16.1468 14.4758 15.3928C15.4422 14.6388 15.823 13.3542 15.4236 12.1953C15.0243 11.0364 13.9329 10.2591 12.7072 10.2605V10.2523Z"
                    fill="#7D2B8B"
                  />
                </svg>
                <a
                  href={
                    api +
                    "/public/assets/images/users/" +
                    list[0]?.recommendation_response
                  }
                  download
                  target="_blank"
                  id="btn_pdf"
                >
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 14V15.25C10 15.6642 9.66422 16 9.25 16H0.75C0.335781 16 0 15.6642 0 15.25V3.75C0 3.33578 0.335781 3 0.75 3H3V12.25C3 13.215 3.78503 14 4.75 14H10ZM10 3.25V0H4.75C4.33578 0 4 0.335781 4 0.75V12.25C4 12.6642 4.33578 13 4.75 13H13.25C13.6642 13 14 12.6642 14 12.25V4H10.75C10.3375 4 10 3.6625 10 3.25ZM13.7803 2.28034L11.7197 0.219656C11.579 0.0790133 11.3882 1.03999e-06 11.1893 0L11 0V3H14V2.81066C14 2.61175 13.921 2.42099 13.7803 2.28034V2.28034Z"
                      fill="#A98D4B"
                    />
                  </svg>
                  {t("Download")}
                </a>
              </span>
              <p>
                <br />
                <iframe
                  style={{ border: "none" }}
                  width="100%"
                  height="450px"
                  src={
                    "https://view.officeapps.live.com/op/embed.aspx?src=" +
                    api +
                    "/public/assets/images/users/" +
                    list[0]?.recommendation_response +
                    "&embedded=true"
                  }
                ></iframe>
              </p>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {/* <div className='pdffile'>
                <div className='recomandationdwn' id='recipt' >
                    <h2>{list && list[0] && list[0].ParentName}.doc</h2>
                    <p >Dear Mr./Ms. {list && list[0] && list[0].ParentName}:<br />
                        <br />
                        {list && list[0] && list[0].recommendation_response}
                        <br />
                        <br />
                        Sincerely <br />
                        <br />

                        Your Signature <br />
                        <br />
                        {list && list[0] && list[0].ParentName}</p>
                </div>
            </div> */}
    </>
  );
}

export default Recommendatins_profile;
