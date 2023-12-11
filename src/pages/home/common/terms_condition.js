import React, { useEffect, useState } from "react";
import { api } from "../../../urls";
import Footer from "./footer";
import Header from "./header";
import { useTranslation } from "react-i18next";
import Preloader from "../common/preLoader";

function Terms_condition() {
  const [count, setcount] = useState(true);
  const [investor, setinvestor] = useState({});

  const { t } = useTranslation("termsOfUse");
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    if (count) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      setIsloading(true);
      fetch(api + "/api/termofuse", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setinvestor(result.data);
          setIsloading(false);
        })
        .catch((error) => console.log("error", error));
      setcount(false);
    }
  }, [count]);
  return (
    <>
      <Header />
      <div className="container-fluid">
        <Preloader isloading={isloading} />
        <div className="container">
          <div className="contact privacy">
            <h2>{t("title", { defaultValue: investor.title })}</h2>
            <p>
              <em>{t("Last version 27, September 2023")}</em>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: t("description", {
                  defaultValue: investor.description,
                }),
              }}
              className="privacycon"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terms_condition;
