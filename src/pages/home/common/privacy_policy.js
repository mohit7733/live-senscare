import React, { useEffect, useState } from "react";
import { api } from "../../../urls";
import Footer from "./footer";
import Header from "./header";
import { useTranslation } from "react-i18next";
import Preloader from "../common/preLoader";

function Privacy_policy() {
  const { t } = useTranslation("privacyPolicy");
  const [isloading, setIsloading] = useState(true);
  const [count, setcount] = useState(true);
  const [investor, setinvestor] = useState({});
  useEffect(() => {
    if (count) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      setIsloading(true);
      fetch(api + "/api/privacypolicy", requestOptions)
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
            <p style={{ fontStyle: "italic" }}>
              {t("Poslednja verzija 27. Septemebar 2023.")}
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

export default Privacy_policy;
