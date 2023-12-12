import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../urls";
import Footer from "./footer";
import Header from "./header";
import faqData from "../common/faq.json";

import { useTranslation } from "react-i18next";

function Faq() {
  const { t, i18n } = useTranslation("faq");
  const language = i18n.language;
  const [faqDataUpdate, setFaqDataUpdate] = useState([]);
  const [count, setcount] = useState(true);
  const [record, setrecord] = useState("");
  const [content, setcontent] = useState([]);
  const [content2, setcontent2] = useState([]);

  const [faqtab, setfaqtab] = useState([]);
  const [usertype, setusertype] = useState(localStorage.getItem("user_type"));
  const [search, setsearch] = useState(
    localStorage.getItem("faq") ? localStorage.getItem("faq") : ""
  );

  const filterarray = (data, icon, tag) => {
    let sum = false;
    faqtab.map((e, index) => {
      if (e.name == data) {
        sum = true;
        faqtab.splice(index, 1);
        document.getElementById(data).style.display = "none";
        document.getElementById(icon).style.transform = "rotate(0deg)";
        document.getElementById(tag).style.color = "#636363";
      }
    });
    if (sum == false) {
      faqtab.push({ name: data });
      document.getElementById(data).style.display = "block";
      document.getElementById(icon).style.transform = "rotate(180deg)";
      document.getElementById(tag).style.color = "#7D2B8B";
    }
  };

  const dataToRender = search ? faqDataUpdate : faqData;

  useEffect(() => {
    filterFaqArray(search);
  }, [search]);
  const filterFaqArray = (datas) => {
    if (datas) {
      // If there is input, filter faqData based on main_category and question
      const dataFilter = faqData.map((object) => {
        return {
          ...object,
          data: object.data.filter((data) => {
            const mainCategoryMatch = data.main_category
              .toLowerCase()
              .includes(datas.toLowerCase());
            const questionsMatch = data.question
              .toLowerCase()
              .includes(datas.toLowerCase());

            return mainCategoryMatch || questionsMatch;
          }),
        };
      });

      setFaqDataUpdate(dataFilter);
      return dataFilter;
    } else {
      // If there is no input, use the original faqData
      setFaqDataUpdate(faqData);
      return faqData;
    }
  };

  useEffect(() => {
    setrecord(localStorage.getItem("faq") ? localStorage.getItem("faq") : "");
    if (count) {
      //
      search_fi();
      setcount(false);
      //
    }
    var myClickableElem = document.getElementById("question1");

        
    myClickableElem
      ? (myClickableElem.onclick = function () {
          if (search) {
            setsearch("");
            setTimeout(() => {
              search_fi();
            }, 2000);
          } else {
            
            filterarray("tab01", "icon01", "tag01");
            window.scrollTo({ top: 200, behavior: "smooth" });
          }
        })
      : (myClickableElem = document.getElementById("question1"));

    var myClickableElem = document.getElementById("question2");
    myClickableElem
      ? (myClickableElem.onclick = function () {
          if (search) {
            setsearch("");
            setTimeout(() => {
              search_fi();
            }, 2000);
          } else {
            filterarray("tab01", "icon01", "tag01");
            window.scrollTo({ top: 200, behavior: "smooth" });
          }
        })
      : (myClickableElem = document.getElementById("question2"));
  }, [count, faqtab, content2, content, search]);

  const search_fi = () => {
    var requestOptions2 = {
      method: "GET",
      redirect: "follow",
    };

    fetch(api + "/api/faqList?search=" + search, requestOptions2)
      .then((response) => response.json())
      .then((result) => {
        setcontent(result.data);
        setcontent2(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const searchclear = () => {
    setsearch("");
    localStorage.removeItem("faq");
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <>
      <Header />
      <div className="container-fluid resource_tital faq">
        <div className="container">
          <h2>{t("Frequently Asked Questions")}</h2>
          <div className="form_group">
            <form name="myForm" action="javascript:myFunction(); return false;">
              <div className="inp">
                <input
                  type={"text"}
                  placeholder={t("Enter keyword")}
                  value={search}
                  onChange={(e) => {
                    setsearch(t(e.target.value));
                    filterFaqArray(e.target.value);
                    localStorage.removeItem("faq");
                  }}
                />
                {search.length > 1 ? (
                  <span onClick={(e) => searchclear()}>+</span>
                ) : (
                  ""
                )}
              </div>
              {/* <button type="submit" onClick={(e) => search_fi()}> */}
              <button
                type="submit"
                onClick={(e) => {
                  search_fi();
                  filterFaqArray(search);
                }}
              >
                <img src="./images/search_res.svg" /> {t("Search")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="resource_content">
            <div className="resources_tabs faq">
              {content.length >= 1 ? (
                language === "en" ? (
                  content.map((data, index2) => {
                    if (data.data.length != 0) {
                      if (usertype == "provider") {
                        return (
                          <div className="tabs">
                            {record != "" ? (
                              <h2
                                onClick={(e) => {
                                  setsearch(data.main_category);
                                  localStorage.removeItem("faq");
                                  setcount(true);
                                }}
                              >
                                {data.main_category}
                              </h2>
                            ) : (
                              <h2>{data.main_category}</h2>
                            )}
                            <div className="tab_open">
                              {data.data.map((data2, index) => {
                                return (
                                  <>
                                    <div className="faqans">
                                      {(
                                        data.id == 17
                                          ? (data2.category && index == 0) ||
                                            index == 4 ||
                                            index == 16 ||
                                            index == 30 ||
                                            index == 32 ||
                                            index == 36
                                          : data.id == 58
                                          ? (data2.category && index == 0) ||
                                            index == 5 ||
                                            index == 13
                                          : data2.category
                                      ) ? (
                                        <h3>{data2.category}</h3>
                                      ) : (
                                        ""
                                      )}
                                      {(
                                        data.id == 17
                                          ? (data2.sub_category &&
                                              index == 4) ||
                                            index == 13 ||
                                            index == 16 ||
                                            index == 26
                                          : data2.sub_category
                                      ) ? (
                                        <h5>{data2.sub_category}</h5>
                                      ) : (
                                        ""
                                      )}
                                      <h4
                                        id={"tag" + index2 + index}
                                        onClick={(e) =>
                                          filterarray(
                                            "tab" + index2 + index,
                                            "icon" + index2 + index,
                                            "tag" + index2 + index
                                          )
                                        }
                                      >
                                        <span>{data2.question}</span>{" "}
                                        <img
                                          src="./images/done_a.svg"
                                          id={"icon" + index2 + index}
                                        />
                                      </h4>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: data2.answer,
                                        }}
                                        className={
                                          "workus" +
                                          " " +
                                          (record != ""
                                            ? "answeropn"
                                            : "answer")
                                        }
                                        id={"tab" + index2 + index}
                                      />
                                    </div>
                                    {/* <a href={data2.link} target="_blank">{data2.link}</a> */}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        );
                      } else {
                        if (
                          data.main_category != "For Business and schools" &&
                          data.main_category != "EDU Store"
                        ) {
                          return (
                            <div className="tabs">
                              {record != "" ? (
                                <h2
                                  onClick={(e) => {
                                    setsearch(data.main_category);
                                    localStorage.removeItem("faq");
                                    setcount(true);
                                  }}
                                >
                                  {data.main_category}
                                </h2>
                              ) : (
                                <h2>{data.main_category}</h2>
                              )}
                              <div className="tab_open">
                                {data.data.map((data2, index) => {
                                  if (data2.category != "Deals") {
                                    return (
                                      <>
                                        <div className="faqans">
                                          {(
                                            data.id == 17
                                              ? (data2.category &&
                                                  index == 0) ||
                                                index == 4 ||
                                                index == 16 ||
                                                index == 30 ||
                                                index == 32 ||
                                                index == 36
                                              : data.id == 58
                                              ? (data2.category &&
                                                  index == 0) ||
                                                index == 5 ||
                                                index == 13
                                              : data2.category
                                          ) ? (
                                            <h3>{data2.category}</h3>
                                          ) : (
                                            ""
                                          )}
                                          {(
                                            data.id == 17
                                              ? (data2.sub_category &&
                                                  index == 4) ||
                                                index == 13 ||
                                                index == 16 ||
                                                index == 26
                                              : data2.sub_category
                                          ) ? (
                                            <h5>{data2.sub_category}</h5>
                                          ) : (
                                            ""
                                          )}
                                          <h4
                                            id={"tag" + index2 + index}
                                            onClick={(e) =>
                                              filterarray(
                                                "tab" + index2 + index,
                                                "icon" + index2 + index,
                                                "tag" + index2 + index
                                              )
                                            }
                                          >
                                            <span>{data2.question}</span>{" "}
                                            <img
                                              src="./images/done_a.svg"
                                              id={"icon" + index2 + index}
                                            />
                                          </h4>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: data2.answer,
                                            }}
                                            className={
                                              "workus" +
                                              " " +
                                              (record != ""
                                                ? "answeropn"
                                                : "answer")
                                            }
                                            id={"tab" + index2 + index}
                                          />
                                        </div>
                                        {/* <a href={data2.link} target="_blank">{data2.link}</a> */}
                                      </>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          );
                        }
                      }
                    }
                  })
                ) : (
                  dataToRender.map((data, index2) => {
                    if (data.data.length != 0) {
                      if (usertype == "provider") {
                        return (
                          <div className="tabs">
                            {record != "" ? (
                              <h2
                                onClick={(e) => {
                                  setsearch(data.main_category);
                                  localStorage.removeItem("faq");
                                  setcount(true);
                                }}
                              >
                                {data.main_category}
                              </h2>
                            ) : (
                              <h2>{data.main_category}</h2>
                            )}
                            <div className="tab_open">
                              {data.data.map((data2, index) => {
                                return (
                                  <>
                                    <div className="faqans">
                                      {(
                                        data.id == 17
                                          ? (data2.category && index == 0) ||
                                            index == 4 ||
                                            index == 16 ||
                                            index == 30 ||
                                            index == 32 ||
                                            index == 36
                                          : data.id == 58
                                          ? (data2.category && index == 0) ||
                                            index == 5 ||
                                            index == 13
                                          : data2.category
                                      ) ? (
                                        <h3>{data2.category}</h3>
                                      ) : (
                                        ""
                                      )}
                                      {(
                                        data.id == 17
                                          ? (data2.sub_category &&
                                              index == 4) ||
                                            index == 13 ||
                                            index == 16 ||
                                            index == 26
                                          : data2.sub_category
                                      ) ? (
                                        <h5>{data2.sub_category}</h5>
                                      ) : (
                                        ""
                                      )}
                                      <h4
                                        id={"tag" + index2 + index}
                                        onClick={(e) =>
                                          filterarray(
                                            "tab" + index2 + index,
                                            "icon" + index2 + index,
                                            "tag" + index2 + index
                                          )
                                        }
                                      >
                                        <span>{data2.question}</span>{" "}
                                        <img
                                          src="./images/done_a.svg"
                                          id={"icon" + index2 + index}
                                        />
                                      </h4>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: data2.answer,
                                        }}
                                        className={
                                          "workus" +
                                          " " +
                                          (record != ""
                                            ? "answeropn"
                                            : "answer")
                                        }
                                        id={"tab" + index2 + index}
                                      />
                                    </div>
                                    {/* <a href={data2.link} target="_blank">{data2.link}</a> */}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        );
                      } else {
                        if (
                          data.main_category != "For Business and schools" &&
                          data.main_category != "EDU Store"
                        ) {
                          return (
                            <div className="tabs">
                              {record != "" ? (
                                <h2
                                  onClick={(e) => {
                                    setsearch(data.main_category);
                                    localStorage.removeItem("faq");
                                    setcount(true);
                                  }}
                                >
                                  {data.main_category}
                                </h2>
                              ) : (
                                <h2>{data.main_category}</h2>
                              )}
                              <div className="tab_open">
                                {data.data.map((data2, index) => {
                                  if (data2.category != "Deals") {
                                    return (
                                      <>
                                        <div className="faqans">
                                          {(
                                            data.id == 17
                                              ? (data2.category &&
                                                  index == 0) ||
                                                index == 4 ||
                                                index == 16 ||
                                                index == 30 ||
                                                index == 32 ||
                                                index == 36
                                              : data.id == 58
                                              ? (data2.category &&
                                                  index == 0) ||
                                                index == 5 ||
                                                index == 13
                                              : data2.category
                                          ) ? (
                                            <h3>{data2.category}</h3>
                                          ) : (
                                            ""
                                          )}
                                          {(
                                            data.id == 17
                                              ? (data2.sub_category &&
                                                  index == 4) ||
                                                index == 13 ||
                                                index == 16 ||
                                                index == 26
                                              : data2.sub_category
                                          ) ? (
                                            <h5>{data2.sub_category}</h5>
                                          ) : (
                                            ""
                                          )}
                                          <h4
                                            id={"tag" + index2 + index}
                                            onClick={(e) =>
                                              filterarray(
                                                "tab" + index2 + index,
                                                "icon" + index2 + index,
                                                "tag" + index2 + index
                                              )
                                            }
                                          >
                                            <span>{data2.question}</span>{" "}
                                            <img
                                              src="./images/done_a.svg"
                                              id={"icon" + index2 + index}
                                            />
                                          </h4>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: data2.answer,
                                            }}
                                            className={
                                              "workus" +
                                              " " +
                                              (record != ""
                                                ? "answeropn"
                                                : "answer")
                                            }
                                            id={"tab" + index2 + index}
                                          />
                                        </div>
                                        {/* <a href={data2.link} target="_blank">{data2.link}</a> */}
                                      </>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          );
                        }
                      }
                    }
                  })
                )
              ) : (
                <p>{} </p>
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

export default Faq;
