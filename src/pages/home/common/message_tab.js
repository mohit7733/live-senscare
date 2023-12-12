import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Message_tab(props) {
  const navigate = useNavigate();
  const { t } = useTranslation("message");

  return (
    <>
      <ul>
        <li
          className={props.subtab == "message-inbox" ? "active" : ""}
          onClick={(e) => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            props.setsubtab("message-inbox");
            navigate("/search-parents/message-inbox");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
          >
            <path
              d="M15.7761 4.99744L12.8403 0.593722C12.7185 0.411089 12.5535 0.261341 12.36 0.157768C12.1665 0.0541962 11.9504 3.4718e-06 11.7309 0H4.26914C4.04964 7.03035e-07 3.83353 0.0541924 3.64 0.157765C3.44647 0.261338 3.28151 0.411087 3.15975 0.593722L0.223944 4.99744C0.0779189 5.21646 -3.21479e-06 5.4738 0 5.73703L0 9.33333C0 10.0697 0.596944 10.6667 1.33333 10.6667H14.6667C15.4031 10.6667 16 10.0697 16 9.33333V5.73703C16 5.4738 15.9221 5.21646 15.7761 4.99744ZM4.507 1.77778H11.493L13.8634 5.33333H10.4444L9.55556 7.11111H6.44444L5.55556 5.33333H2.13661L4.507 1.77778Z"
              fill="#636363"
            />
          </svg>
          {t("Inbox")}
        </li>
        <li
          className={props.subtab == "Trash" ? "active" : ""}
          onClick={(e) => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            props.setsubtab("Trash");
            navigate("/search-parents/Trash");
          }}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
          >
            <path
              d="M0 2.625V1.75C0 1.33438 0.334375 1 0.75 1H4.25L4.54375 0.415625C4.66875 0.159375 4.92812 0 5.2125 0H8.78437C9.06875 0 9.32812 0.159375 9.45625 0.415625L9.75 1H13.25C13.6656 1 14 1.33438 14 1.75V2.625C14 2.83125 13.8312 3 13.625 3H0.375C0.16875 3 0 2.83125 0 2.625ZM12.975 4.39687L12.3375 14.5938C12.2875 15.3844 11.6312 16 10.8406 16H3.15937C2.36875 16 1.7125 15.3844 1.6625 14.5938L1.025 4.39687C1.0125 4.18125 1.18437 4 1.4 4H12.6031C12.8156 4 12.9875 4.18125 12.975 4.39687Z"
              fill="#636363"
            />
          </svg>{" "}
          {t("Trash")}
        </li>
      </ul>
    </>
  );
}

export default Message_tab;
