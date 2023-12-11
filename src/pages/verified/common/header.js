import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="container-fluid border2">
        <div className="container">
          <div className="header_verify">
            <div className="logo_verify">
              <Link to="/">
                <img src="./images/logo.svg" />{" "}
              </Link>
            </div>
            <div className="shadow">
              <img src="./images/verify_shadow.png" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
