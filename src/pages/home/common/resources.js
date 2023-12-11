import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../urls";
import Footer from "./footer";
import Header from "./header";
import { useTranslation } from "react-i18next";
import Preloader from "./preLoader";
import contentJson from "./resources.json";
import searchselectCustom from "./resources_select.json";

function Resources() {
  const [count, setcount] = useState(true);
  const [investor, setinvestor] = useState({});
  const [content, setcontent] = useState([]);
  const [content2, setcontent2] = useState([]);
  const [keysearch, setkeysearch] = useState("");
  const [category, setcategory] = useState("");

  const [faqtab, setfaqtab] = useState([]);
  const [selectcat, setselectcat] = useState([]);

  const [searchselect, setsearchselect] = useState([]);
  const [catopen, setcatopen] = useState(true);
  const { t, i18n } = useTranslation("resources");
  const [isloading, setIsloading] = useState(true);

  const language = i18n.language;

  const filterarray = (data, icon) => {
    let sum = false;
    faqtab.map((e, index) => {
      if (e.name == data) {
        sum = true;
        faqtab.splice(index, 1);
        document.getElementById(data).style.display = "none";
        document.getElementById(icon).style.transform = "rotate(0deg)";
      }
    });
    if (sum == false) {
      faqtab.push({ name: data });
      document.getElementById(data).style.display = "block";
      document.getElementById(icon).style.transform = "rotate(180deg)";
    }
  };

  useEffect(() => {
    if (count) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      setIsloading("true");
      fetch(api + "/api/resourcecontent", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setinvestor(result.data);
          setIsloading(false);
        })
        .catch((error) => console.log("error", error));

      //
      search_fi();
      //

      fetch(api + "/api/getRescategory", requestOptions)
        .then((response) => response.json())

        .then((result) => setsearchselect(result.data))
        .catch((error) => console.log("error", error));
      setcount(false);
    }
  }, [count, faqtab, content2, content, selectcat]);

  const search_fi = () => {
    var requestOptions2 = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      api +
        "/api/resourcecategory?category=" +
        selectcat.map((e) => {
          return e.name;
        }) +
        "&anysearch=" +
        keysearch,
      requestOptions2
    )
      .then((response) => response.json())
      .then((result) => {
        setcontent(result.data);
        setcontent2(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const custom = (e) => {
    if (catopen) {
      document.getElementById(e).style.display = "block";
      setcatopen(false);
    } else {
      document.getElementById(e).style.display = "none";
      setcatopen(true);
    }
  };

  const selectoption = (data) => {
    let sum = false;
    selectcat.map((e, index) => {
      if (e.name == data) {
        sum = true;
        selectcat.splice(index, 1);
      }
    });
    if (sum == false) {
      selectcat.push({ name: data });
    }
    setTimeout(() => {
      setselectcat([...selectcat]);
    }, 500);
  };
  return (
    <>
      <Header />
      <div className="container-fluid resource_tital">
        <Preloader isloading={isloading} />
        <div className="container">
          <h2>{t("title", { defaultValue: investor.title })}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: t("description", { defaultValue: investor.description }),
            }}
            className="workus"
          />
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="resource_content">
            <div className="resource_search">
              <label>
                {t("Explore resources")}
                <Link
                  to=""
                  onClick={(e) => {
                    window.location.reload();
                  }}
                >
                  {t("Clear all filters")}
                </Link>
              </label>
              <div className="form_group">
                <div className="inp">
                  <input
                    className="keyword"
                    type="text"
                    placeholder={t("keyword")}
                    onChange={(e) => setkeysearch(e.target.value)}
                    value={keysearch}
                  />
                  {keysearch.length > 2 ? (
                    <span
                      onClick={(e) => {
                        setkeysearch("");
                        setcategory("");
                        setTimeout(() => {
                          search_fi();
                        }, 2000);
                      }}
                    >
                      +
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="customselect inp">
                  <input
                    className="keyword"
                    type="text"
                    placeholder={t("Category")}
                    value={selectcat.map((e) => {
                      return e.name;
                    })}
                  />
                  <div className="option" id="cate">
                    {language === "en"
                      ? searchselect.map((e, index) => {
                          return (
                            <p
                              className={
                                searchselect.length == 1 + index ? "border" : ""
                              }
                            >
                              <input
                                type="checkbox"
                                onClick={(a) => selectoption(e.category)}
                              />
                              <h3>{e.category} </h3>
                              <span></span>
                            </p>
                          );
                        })
                      : searchselectCustom.map((e, index) => {
                          return (
                            <p
                              className={
                                searchselectCustom.length == 1 + index
                                  ? "border"
                                  : ""
                              }
                            >
                              <input
                                type="checkbox"
                                onClick={(a) => selectoption(e.category)}
                              />
                              <h3>{e.category} </h3>
                              <span></span>
                            </p>
                          );
                        })}
                    <div
                      className="clr inp"
                      onClick={(e) => {
                        setselectcat([]);
                        window.location.reload();
                      }}
                    >
                      {t("Clear All")} <span>+</span>
                    </div>
                  </div>

                  <span onClick={(e) => custom("cate")}>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z"
                        fill="#636363"
                      />
                    </svg>
                  </span>
                </div>
                {/* <input type="number" placeholder='ZIP code' /> */}
              </div>
              <div className="clear">
                <button
                  onClick={(e) => {
                    search_fi();
                    custom("cate");
                  }}
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.00005 2.20704C5.13404 2.20704 2.00001 5.34107 2.00001 9.20708C2.00001 13.0731 5.13404 16.2071 9.00005 16.2071C12.8661 16.2071 16.0001 13.0731 16.0001 9.20708C16.0001 5.34107 12.8661 2.20704 9.00005 2.20704ZM0 9.20708C0 4.23649 4.02946 0.207031 9.00005 0.207031C13.9706 0.207031 18.0001 4.23649 18.0001 9.20708C18.0001 14.1777 13.9706 18.2071 9.00005 18.2071C4.02946 18.2071 0 14.1777 0 9.20708Z"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.9433 14.1498C14.3338 13.7593 14.967 13.7593 15.3575 14.1498L19.7075 18.4999C20.0981 18.8904 20.0981 19.5235 19.7075 19.9141C19.317 20.3046 18.6838 20.3046 18.2933 19.9141L13.9433 15.5641C13.5528 15.1735 13.5528 14.5404 13.9433 14.1498Z"
                    />
                  </svg>
                  {t("Search")}
                </button>
              </div>
            </div>
            <div className="resources_tabs">
              {content.length >= 1 ? (
                language === "en" ? (
                  content.map((data, index) => {
                    return (
                      <div className="tabs">
                        <h2
                          onClick={(e) =>
                            filterarray("tab" + index, "icon" + index)
                          }
                        >
                          {data.category}{" "}
                          <img
                            src="./images/down_pur.svg"
                            id={"icon" + index}
                          />
                        </h2>
                        <div className="tab_open" id={"tab" + index}>
                          {data.data.map((data2, index) => {
                            return (
                              <>
                                {data2.title ? <h3>{data2.title}</h3> : <br />}
                                <h4>{data2.subtitle}</h4>
                                <a href={data2.link} target="_blank">
                                  {data2.link}
                                </a>
                                <br />
                              </>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  contentJson.map((data, index) => {
                    return (
                      <div className="tabs">
                        <h2
                          onClick={(e) =>
                            filterarray("tab" + index, "icon" + index)
                          }
                        >
                          {data.category}{" "}
                          <img
                            src="./images/down_pur.svg"
                            id={"icon" + index}
                          />
                        </h2>
                        <div className="tab_open" id={"tab" + index}>
                          {data.data.map((data2, index) => {
                            return (
                              <>
                                {data2.title ? <h3>{data2.title}</h3> : <br />}
                                <h4>{data2.subtitle}</h4>
                                <ul>
                                  <li style={{ marginBottom: "4px" }}>
                                    <a href={data2.link} target="_blank">
                                      {data2.link}
                                    </a>
                                  </li>
                                  <li>
                                    <a href={data2.linkAnother} target="_blank">
                                      {data2.linkAnother}{" "}
                                    </a>
                                  </li>
                                </ul>
                                <br />
                              </>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )
              ) : (
                <p>
                  {t("No records matching the current criteria were found!")}
                </p>
              )}
            </div>
            {/* <div className='resource_search resoft'>
                            <p><img src='./images/bag.svg' /> Visit our <Link to=''> Business Directory </Link> for more listed professional services</p>
                        </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Resources;
