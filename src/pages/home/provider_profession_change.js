import React, { useState, useEffect } from "react";
import Calander from "./common/calander";
import DatePicker from "react-datepicker";
import { api } from "../../urls";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
function Provider_profession_chnage(props) {
  const { t } = useTranslation("providerProfesionChange");
  const [showflogin, setShowflogin] = useState(false);
  const [show, setShow] = useState(false);
  const [setallapplicable2, setsetallapplicable2] = useState([]);
  const [livenow, setlivenow] = useState(false);
  const [nanny, setnanny] = useState(false);
  const [professional, setprofessional] = useState(false);
  const [teacher, setteacher] = useState(false);
  const [tuter, settuter] = useState(false);
  const [qcount, setqcount] = useState(0);
  const [disabled, setdisabled] = useState(0);

  const handleCloselogin_first = () => {
    setShowflogin(false);
  };
  const handleClose1 = () => {
    setnanny(false);
  };
  const handleClose2 = () => {
    setprofessional(false);
  };
  const handleClose3 = () => {
    setteacher(false);
  };
  const handleClose4 = () => {
    settuter(false);
  };
  const [count, setcount] = useState(true);
  const [detail, setdetail] = useState({});
  const [describe, setdescribe] = useState({});
  const [newprofession, setnewprofession] = useState({});
  const handleClose = () => setShow(false);
  const [nonselect, setnonselect] = useState("");
  const [inactiveprofessional, setinactiveprofessional] = useState({});
  const [inactiveprofessional2, setinactiveprofessional2] = useState({});
  const [jobelete, setjobelete] = useState({});
  const [range, setrange] = useState(0);
  const [experience, setexperience] = useState(0);
  const [sepworkexp, setsepworkexp] = useState(0);
  const [utorexperience, setutorexperience] = useState(0);
  const [habit, sethabit] = useState({
    smoke: "",
    licence: "",
    kids: "",
    housework: "",
    family: "",
  });
  const [qualifications, setqualifications] = useState({
    English: "",
    Serbian: "",
    Mathematics: "",
    Physics: "",
    Chemistry: "",
    Other: "",
  });
  const [methods, setmethods] = useState({
    setexpmethods: "",
    setexpmethods2: "",
    setexpmethods3: "",
    setexpmethods4: "",
  });
  const [usd, setusd] = useState({
    min: 0,
    max: 0,
  });
  const [tutorusd, settutorusd] = useState({
    min: 0,
    max: 0,
  });
  const [usd3, setusd3] = useState({
    min: 0,
    max: 0,
  });
  const [usd4, setusd4] = useState({
    min: 0,
    max: 0,
  });
  const [catopen, setcatopen] = useState(true);
  const describeselect = (a, b) => {
    if (Object.keys(describe).length < 2) {
      setdescribe({ ...describe, [a]: b });
      Object.keys(detail.service_type).filter((e) => e == a)[0]
        ? setnewprofession({})
        : setnewprofession({ ...newprofession, [a]: b });
      // setinactiveprofessional({ ...inactiveprofessional, [a]: b })
      setdetail({
        ...detail,
        service_type: { ...detail.service_type, [a]: b },
      });
      delete inactiveprofessional2[a];
      setinactiveprofessional2({ ...inactiveprofessional2 });
    } else {
      delete describe[a];
      setdescribe({ ...describe });
      // delete inactiveprofessional[a];
      // setinactiveprofessional({ ...inactiveprofessional })
      // delete activeprofession[a];
      // setTimeout(() => {
      //     setactiveprofession({ ...activeprofession })
      // }, 200);
      delete detail.service_type[a];
      setdetail({ ...detail });
      delete newprofession[a];
      setnewprofession({ ...newprofession });
    }
    // describeselect2(a, b)
    console.log(describe);
  };
  const selectoption6 = (data) => {
    let sum = false;
    setallapplicable2.map((e, index) => {
      if (e.name == data) {
        sum = true;
        setallapplicable2.splice(index, 1);
      }
    });
    if (sum == false) {
      setallapplicable2.push({ name: data });
    }
    setTimeout(() => {
      setsetallapplicable2([...setallapplicable2]);
    }, 500);
  };
  const custom = (e, x) => {
    if (catopen) {
      document.getElementById(e).style.display = "block";
      document.getElementById(x).style.display = "block";
      setcatopen(false);
    } else {
      document.getElementById(e).style.display = "none";
      document.getElementById(x).style.display = "none";
      setcatopen(true);
    }
  };
  const [errorfield, seterrorfield] = useState({
    nanyyearexp: "",
    smoke: "",
    carorlicence: "",
    cooking: "",
    lighthousework: "",
    traveling: "",
    workingabroad: "",
    nanyperhrrate: "",
    nanynewbornexp: "",
    livewithfamily: "",

    setyearexp: range,
    setexpmethods: "",
    seterhrrate: "",
    setexpiep: "",

    seperhrrate: "",
    sepexpmethods: "",
    sepworkexp: "",

    tutorexp: "",
    tutorperhrrate: "",
    tutorliketoteach: "",
    tutorintrestedonlinecls: "",

    nanyexpwithkid: "",
    sepexpwithkid: "",
    setallapplicable: "",
  });

  const [detailprovider, setdetailprovider] = useState({
    nanyyearexp: "",
    smoke: "",
    carorlicence: "",
    cooking: "",
    lighthousework: "",
    traveling: "",
    workingabroad: "",
    nanyperhrrate: "",
    nanynewbornexp: "",
    livewithfamily: "",

    setyearexp: range,
    setexpmethods: "",
    seterhrrate: "",
    setexpiep: "",

    seperhrrate: "",
    sepexpmethods: "",
    sepworkexp: "",

    tutorexp: "",
    tutorperhrrate: "",
    tutorliketoteach: "",
    tutorintrestedonlinecls: "",

    nanyexpwithkid: "",
    sepexpwithkid: "",
  });

  const [refresh, setrefresh] = useState("");

  const [activeprofession, setactiveprofession] = useState({});
  const describeselect2 = (a, b) => {
    console.log(inactiveprofessional);
    if (Object.keys(inactiveprofessional).length > 0) {
      Object.keys(inactiveprofessional).filter((e) => {
        if (e != a) {
          delete inactiveprofessional2[a];
          setTimeout(() => {
            if (Object.keys(describe).length < 2) {
              setinactiveprofessional({ ...inactiveprofessional, [a]: b });
            }
            setnewprofession({ ...newprofession, [a]: b });
            setinactiveprofessional2({ ...inactiveprofessional2 });
          }, 200);
        } else {
          delete inactiveprofessional[a];
          delete describe[a];
          delete newprofession[a];
          setTimeout(() => {
            setnewprofession({ ...newprofession });
            setdescribe({ ...describe });
            if (Object.keys(describe).length > 0) {
              setinactiveprofessional({ ...inactiveprofessional });
            }
            setinactiveprofessional2({ ...inactiveprofessional2, [a]: b });
          }, 200);
        }
      });
    } else {
      setinactiveprofessional({ [a]: b });
      setinactiveprofessional2({ [a]: b });
    }
    console.log(inactiveprofessional, a, b);
  };
  const describeselectadd = (a, b) => {
    console.log(detail.service_type);
    // let x = activeprofession
    // if (Object.keys(activeprofession).length > 0) {
    //     Object.keys(x).filter((e) => {
    //         if (e == a) {
    //             delete x[a];
    //             setTimeout(() => {
    //                 setactiveprofession({ ...x })
    //             }, 200);
    //         } else {
    //             setactiveprofession({ [a]: b })
    //         }
    //     }
    //     )
    // } else {
    //     setactiveprofession({ [a]: b })
    // }
  };
  const profile_data = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(api + "/api/v1/details", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setdetail(result.data);
        setdescribe(result.data.service_type);
        setinactiveprofessional(result.data.service_type);
        setinactiveprofessional2(
          result.data.inactive_service != null
            ? result.data.inactive_service
            : {}
        );
        setTimeout(() => {
          const x = Object.keys(detailprovider).forEach(function (key) {
            detailprovider[key] =
              result.data[key] != null ? result.data[key] : "";
            setdetailprovider({ ...detailprovider });
          });
        }, 500);
        sethabit({
          smoke: result.data.smoke ? result.data.smoke : "",
          licence: result.data.carorlicence ? result.data.carorlicence : "",
          kids: result.data.cooking ? result.data.cooking : "",
          housework: result.data.lighthousework
            ? result.data.lighthousework
            : "",
          family: result.data.traveling ? result.data.traveling : "",
        });
        setmethods(
          result.data.setexpmethods
            ? JSON.parse(result.data.setexpmethods)
            : methods
        );
        setqualifications(
          result.data.tutorliketoteach != null
            ? result.data.tutorliketoteach
            : {}
        );
        console.log(result.data);
        setexperience(
          result.data.nanyyearexp != null ? result.data.nanyyearexp : 0
        );
        setrange(result.data.setyearexp != null ? result.data.setyearexp : 0);
        setsepworkexp(
          result.data.sepworkexp != null ? result.data.sepworkexp : 0
        );
        setutorexperience(
          result.data.tutorexp != null ? result.data.tutorexp : 0
        );
        setusd({
          min:
            result.data.nanyperhrrate != null
              ? result.data.nanyperhrrate
                  .substr(result.data.nanyperhrrate.lastIndexOf("\\") + 1)
                  .split("-")[0]
              : 0,
          max:
            result.data.nanyperhrrate != null
              ? result.data.nanyperhrrate
                  .substr(result.data.nanyperhrrate.lastIndexOf("\\") + 1)
                  .split("-")[1]
              : 0,
        });
        settutorusd({
          min:
            result.data.tutorperhrrate != null
              ? result.data.tutorperhrrate
                  .substr(result.data.tutorperhrrate.lastIndexOf("\\") + 1)
                  .split("-")[0]
              : 0,
          max:
            result.data.tutorperhrrate != null
              ? result.data.tutorperhrrate
                  .substr(result.data.tutorperhrrate.lastIndexOf("\\") + 1)
                  .split("-")[1]
              : 0,
        });
        setusd3({
          min:
            result.data.seterhrrate != null
              ? result.data.seterhrrate
                  .substr(result.data.seterhrrate.lastIndexOf("\\") + 1)
                  .split("-")[0]
              : 0,
          max:
            result.data.seterhrrate != null
              ? result.data.seterhrrate
                  .substr(result.data.seterhrrate.lastIndexOf("\\") + 1)
                  .split("-")[1]
              : 0,
        });
        setusd4({
          min:
            result.data.seperhrrate != null
              ? result.data.seperhrrate
                  .substr(result.data.seperhrrate.lastIndexOf("\\") + 1)
                  .split("-")[0]
              : 0,
          max:
            result.data.seperhrrate != null
              ? result.data.seperhrrate
                  .substr(result.data.seperhrrate.lastIndexOf("\\") + 1)
                  .split("-")[1]
              : 0,
        });
      })
      .catch((error) => console.log("error", error));
  };
  const profile_update = (status) => {
    localStorage.setItem("search", "Profile");
    sessionStorage.clear();
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var formdata = new FormData();
    formdata.append("user_id", localStorage.getItem("id"));
    formdata.append("nanyyearexp", experience);
    formdata.append("smoke", habit.smoke);
    formdata.append("carorlicence", habit.licence);
    formdata.append("cooking", habit.kids);
    formdata.append("lighthousework", habit.housework);
    formdata.append("traveling", habit.family);
    formdata.append("workingabroad", detailprovider.workingabroad);
    formdata.append("livewithfamily", detailprovider.livewithfamily);
    formdata.append("nanyperhrrate", usd.min + "-" + usd.max);
    formdata.append("nanynewbornexp", detailprovider.nanynewbornexp);
    formdata.append("setexpmethods[]", JSON.stringify(methods));
    formdata.append("setexpiep", detailprovider.setexpiep);
    formdata.append("setyearexp", range);
    formdata.append("seterhrrate", usd3.min + "-" + usd3.max);
    formdata.append("seperhrrate", usd4.min + "-" + usd4.max);
    formdata.append("sepexpmethods", detailprovider.sepexpmethods);
    formdata.append("sepworkexp", sepworkexp);
    formdata.append("tutorexp", utorexperience);
    formdata.append("tutorperhrrate", tutorusd.min + "-" + tutorusd.max);
    formdata.append("tutorliketoteach", JSON.stringify(qualifications));
    formdata.append(
      "tutorintrestedonlinecls",
      detailprovider.tutorintrestedonlinecls
    );
    formdata.append("active_service", JSON.stringify(describe));
    formdata.append("inactive_service", JSON.stringify(inactiveprofessional2));
    formdata.append("nanyexpwithkid", detailprovider.nanyexpwithkid);
    formdata.append("sepexpwithkid", detailprovider.sepexpwithkid);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(api + "/api/v1/updateprovider", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        handleClose();
        profile_data();
        setTimeout(() => {
          if (Object.keys(newprofession).length == 0) {
            window.location.reload();
          }
          if (Object.keys(newprofession).length == qcount && status) {
            window.location.reload();
          } else {
            setqcount(qcount + 1);
          }
        }, 200);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const after_logins_field = (name) => {
    setrefresh();
    switch (name) {
      case "nanyyearexp":
        errorfield.nanyyearexp = experience == 0 ? "required" : "";
        break;
      case "smoke":
        errorfield.smoke = habit.smoke == "" ? "required" : "";
        break;
      case "setallapplicable":
        errorfield.setallapplicable = setallapplicable2[0] ? "" : "required";
        break;
      case "carorlicence":
        errorfield.carorlicence = habit.licence == "" ? "required" : "";
        break;
      case "cooking":
        errorfield.cooking = habit.kids == "" ? "required" : "";
        break;
      case "lighthousework":
        errorfield.lighthousework = habit.housework == "" ? "required" : "";
        break;
      case "traveling":
        errorfield.traveling = habit.family == "" ? "required" : "";
        break;
      case "workingabroad":
        errorfield.workingabroad =
          detailprovider.workingabroad == "" ? "required" : "";
        break;
      case "livewithfamily":
        errorfield.livewithfamily =
          detailprovider.livewithfamily == "" ? "required" : "";
        break;
      case "nanyperhrrate":
        errorfield.nanyperhrrate = usd.max == 0 ? "required" : "";
        break;
      case "seterhrrate":
        errorfield.seterhrrate = usd3.max == 0 ? "required" : "";
        break;
      case "seperhrrate":
        errorfield.seperhrrate = usd4.max == 0 ? "required" : "";
        break;
      case "tutorintrestedonlinecls":
        errorfield.tutorintrestedonlinecls =
          detailprovider.tutorintrestedonlinecls != "" ? "" : "required";
        break;
      case "nanynewbornexp":
        errorfield.nanynewbornexp =
          detailprovider.nanynewbornexp != "" ? "" : "required";
        break;
      case "setyearexp":
        errorfield.setyearexp = range > 0 ? "" : "required";
        break;
      case "setexpmethods":
        errorfield.setexpmethods =
          methods.setexpmethods != "" ||
          methods.setexpmethods2 != "" ||
          methods.setexpmethods3 != "" ||
          methods.setexpmethods4 != ""
            ? ""
            : "required";
        break;
      case "setexpiep":
        errorfield.setexpiep = detailprovider.setexpiep != "" ? "" : "required";
        break;
      case "sepexpmethods":
        errorfield.sepexpmethods =
          detailprovider.sepexpmethods != "" ? "" : "required";
        break;
      case "sepworkexp":
        errorfield.sepworkexp = sepworkexp == 0 ? "required" : "";
        break;
      case "tutorexp":
        errorfield.tutorexp = utorexperience > 0 ? "" : "required";
        break;
      case "tutorperhrrate":
        errorfield.tutorperhrrate = tutorusd.max == 0 ? "required" : "";
        break;
      case "tutorliketoteach":
        errorfield.tutorliketoteach =
          qualifications.English ||
          qualifications.Serbian ||
          qualifications.Mathematics ||
          qualifications.Physics ||
          qualifications.Chemistry ||
          qualifications.Other
            ? ""
            : "required";
        break;
      case "tutorintrestedonlinecls":
        errorfield.tutorintrestedonlinecls =
          detailprovider.tutorintrestedonlinecls != "" ? "" : "required";
        break;
      case "nanyexpwithkid":
        errorfield.nanyexpwithkid =
          detailprovider.nanyexpwithkid != "" ? "" : "required";
        break;
      case "sepexpwithkid":
        errorfield.sepexpwithkid =
          detailprovider.sepexpwithkid != "" ? "" : "required";
        break;
      default:
        break;
    }
    seterrorfield(errorfield);
    setTimeout(() => {
      setdetail(detail);
      setrefresh(name);
      window.scrollTo({ top: 0 });
    }, 1000);
  };

  const step1 = [
    { name: "nanyyearexp" },
    { name: "smoke" },
    { name: "carorlicence" },
    { name: "cooking" },
    { name: "lighthousework" },
    { name: "traveling" },
    { name: "workingabroad" },
    { name: "nanyperhrrate" },
    { name: "nanynewbornexp" },
    { name: "livewithfamily" },
    { name: "nanyexpwithkid" },
  ];
  const step2 = [
    { name: "setyearexp" },
    { name: "setexpmethods" },
    { name: "seterhrrate" },
    { name: "setexpiep" },
    { name: "setallapplicable" },
  ];
  const step3 = [
    { name: "seperhrrate" },
    { name: "sepexpmethods" },
    { name: "sepworkexp" },
    { name: "sepexpwithkid" },
  ];
  const step4 = [
    { name: "tutorexp" },
    { name: "tutorperhrrate" },
    { name: "tutorliketoteach" },
    { name: "tutorintrestedonlinecls" },
    { name: "sepexpwithkid" },
  ];

  useEffect(() => {
    if (count) {
      setcount(false);
      profile_data();
    }
    console.log(newprofession, describe);
  }, [detail, activeprofession, errorfield, newprofession, refresh]);
  return (
    <>
      <button onClick={(e) => setShowflogin(true)}>
        {t("Change Profession")}
      </button>
      {showflogin ? (
        <Modal
          show={showflogin}
          className="professional_select profchange"
          onHide={handleCloselogin_first}
        >
          <Modal.Body>
            <div className={"describe more_about "}>
              <img src={window.location.origin + "/images/sign_logo.svg"} />
              <h2>
                {t("It looks like you are ready to change your profession.")}
              </h2>
              <p>
                {" "}
                {t(
                  "Please choose from the menu below which profession you would like to deactivate first as only two professions can be active simultaneously."
                )}
              </p>
              <div className="process_guid ">
                {/* || inactiveprofessional2 && inactiveprofessional2.tab1 == "Nanny" */}
                <ul>
                  <li
                    className={
                      describe && describe.tab1 == "Nanny"
                        ? "active"
                        : "" + nonselect == ""
                        ? ""
                        : "bordererror"
                    }
                  >
                    {/* <div className='checkededit'>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10Z" fill="white" stroke="#636363" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <input type={"checkbox"} onClick={e => {
                                                if (e.target.value) {
                                                    describeselectadd("tab1", "Nanny")

                                                }
                                            }} checked={Object.keys(activeprofession).filter((e) => e == "tab1")[0] ? true : false} disabled={describe && describe.tab1 ? false : true} />
                                            <span></span>
                                        </div> */}
                    <br />
                    <Link
                      to=""
                      onClick={(e) => {
                        describeselect("tab1", "Nanny");
                      }}
                    >
                      <img
                        src={
                          window.location.origin +
                          (describe && describe.tab1 == "Nanny"
                            ? "/images/nanny_fill.svg"
                            : "/images/nanny.svg")
                        }
                      />
                      <span>{t("Nanny")}</span>
                    </Link>
                    <div class="personal_preferences">
                      <label class="switchedit">
                        <input
                          type="checkbox"
                          onClick={(e) => {
                            if (
                              (describe && Object.keys(describe).length != 2) ||
                              describe.tab1
                            ) {
                              setShow(true);
                              setdisabled(1);
                            }
                          }}
                          checked={
                            Object.keys(describe).filter((e) => e == "tab1")[0]
                              ? true
                              : false
                          }
                        />
                        <span class="slideredit roundedit"></span>
                      </label>
                    </div>
                  </li>
                  <li
                    className={
                      describe && describe.tab2 == "Special Education Teacher"
                        ? "active"
                        : "" + nonselect == ""
                        ? ""
                        : "bordererror"
                    }
                  >
                    {/* <div className='checkededit'>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10Z" fill="white" stroke="#636363" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <input type={"checkbox"} onClick={e => {

                                                if (e.target.value) {
                                                    describeselectadd("tab2", "Special Education Teacher")
                                                }
                                            }} checked={Object.keys(activeprofession).filter((e) => e == "tab2")[0] ? true : false} disabled={describe && describe.tab2 ? false : true} />
                                            <span></span>
                                        </div> */}
                    <br />
                    <Link
                      to=""
                      onClick={(e) => {
                        describeselect("tab2", "Special Education Teacher");
                      }}
                    >
                      <img
                        src={
                          window.location.origin +
                          (describe &&
                          describe.tab2 == "Special Education Teacher"
                            ? "/images/teacher_fill.svg"
                            : "/images/teacher.svg")
                        }
                      />
                      <span>{t("Special education teacher")}</span>
                    </Link>
                    <div class="personal_preferences">
                      <label class="switchedit">
                        <input
                          type="checkbox"
                          onClick={(e) => {
                            if (
                              (describe && Object.keys(describe).length != 2) ||
                              describe.tab2
                            ) {
                              setShow(true);
                              setdisabled(2);
                            }
                          }}
                          checked={
                            Object.keys(describe).filter((e) => e == "tab2")[0]
                              ? true
                              : false
                          }
                        />
                        <span class="slideredit roundedit"></span>
                      </label>
                    </div>
                  </li>
                  <li
                    className={
                      describe &&
                      describe.tab3 == "Special Education Paraprofessional"
                        ? "active"
                        : "" + nonselect == ""
                        ? ""
                        : "bordererror"
                    }
                  >
                    {/* <div className='checkededit'>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10Z" fill="white" stroke="#636363" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <input type={"checkbox"} onClick={e => {
                                                if (e.target.value) {
                                                    describeselectadd("tab3", "Special Education Paraprofessional")
                                                }
                                            }} checked={Object.keys(activeprofession).filter((e) => e == "tab3")[0] ? true : false} disabled={describe && describe.tab3 ? false : true} />
                                            <span></span>
                                        </div> */}
                    <br />
                    <Link
                      to=""
                      onClick={(e) => {
                        describeselect(
                          "tab3",
                          "Special Education Paraprofessional"
                        );
                      }}
                    >
                      <img
                        src={
                          window.location.origin +
                          (describe &&
                          describe.tab3 == "Special Education Paraprofessional"
                            ? "/images/education_fill.svg"
                            : "/images/education.svg")
                        }
                      />
                      <span>{t("Special education paraprofessional")}</span>
                    </Link>
                    <div class="personal_preferences">
                      <label class="switchedit">
                        <input
                          type="checkbox"
                          onClick={(e) => {
                            if (
                              (describe && Object.keys(describe).length != 2) ||
                              describe.tab3
                            ) {
                              setShow(true);
                              setdisabled(3);
                            }
                          }}
                          checked={
                            Object.keys(describe).filter((e) => e == "tab3")[0]
                              ? true
                              : false
                          }
                        />
                        <span class="slideredit roundedit"></span>
                      </label>
                    </div>
                  </li>
                  <li
                    className={
                      describe && describe.tab4 == "Tutor"
                        ? "active"
                        : "" + nonselect == ""
                        ? ""
                        : "bordererror"
                    }
                  >
                    {/* <div className='checkededit'>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10Z" fill="white" stroke="#636363" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <input type={"checkbox"} onClick={e => {
                                                if (e.target.value) {
                                                    describeselectadd("tab4", "Tutor")
                                                }
                                            }} checked={Object.keys(activeprofession).filter((e) => e == "tab4")[0] ? true : false} disabled={describe && describe.tab4 ? false : true} />
                                            <span></span>
                                        </div> */}
                    <br />
                    <Link
                      to=""
                      onClick={(e) => {
                        describeselect("tab4", "Tutor");
                      }}
                    >
                      <img
                        src={
                          window.location.origin +
                          (describe && describe.tab4 == "Tutor"
                            ? "/images/tutor_fill.svg"
                            : "/images/tutor.svg")
                        }
                      />
                      <span>{t("Tutor")}</span>
                    </Link>
                    <div class="personal_preferences">
                      <label class="switchedit">
                        <input
                          type="checkbox"
                          onClick={(e) => {
                            if (
                              (describe && Object.keys(describe).length != 2) ||
                              describe.tab4
                            ) {
                              setShow(true);
                              setdisabled(4);
                            }
                          }}
                          checked={
                            Object.keys(describe).filter((e) => e == "tab4")[0]
                              ? true
                              : false
                          }
                        />
                        <span class="slideredit roundedit"></span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <button className="back_sign" onClick={handleCloselogin_first}>
                {t("Cancel")}
              </button>
              <button
                className="back_sign"
                onClick={(e) => {
                  newprofession.tab1 ? setnanny(true) : setnanny(false);
                  newprofession.tab2 ? setteacher(true) : setteacher(false);
                  newprofession.tab3
                    ? setprofessional(true)
                    : setprofessional(false);
                  newprofession.tab4 ? settuter(true) : settuter(false);
                  profile_update(true);
                }}
              >
                {t("Continue")}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {show ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <div className="promocode_content younger statuschange">
              <Link to="" onClick={handleClose}>
                +{" "}
              </Link>
              <h5>{t("Change the status of profession")}</h5>
              <p style={{ marginBottom: "0" }}>
                <b>
                  {t(
                    "Do you want to make the selected profession active / inactive?"
                  )}
                </b>
              </p>
              <div className="graybg">
                <p>
                  {t(
                    "While SensCare understands that due to evolving life situations such as graduation, career change, etc. you may want to change profession, we do not recommend doing it frequently. You are allowed to change a profession two times per year."
                  )}
                </p>
                <div class="button text-center">
                  <div class="pull-right">
                    <button
                      class="btn"
                      onClick={(e) => {
                        handleClose();
                      }}
                    >
                      {t("Cancel")}
                    </button>
                  </div>
                  <div class="pull-right">
                    <button
                      class="btn confirm"
                      onClick={(e) => {
                        if (disabled == 1) {
                          // describeselect2("tab1", "Nanny")
                          describeselect("tab1", "Nanny");
                          describeselectadd("tab1", "Nanny");
                        } else if (disabled == 2) {
                          // describeselect2("tab2", "Special Education Teacher")
                          describeselect("tab2", "Special Education Teacher");
                          describeselectadd(
                            "tab2",
                            "Special Education Teacher"
                          );
                        } else if (disabled == 3) {
                          // describeselect2("tab3", "Special Education Paraprofessional")
                          describeselect(
                            "tab3",
                            "Special Education Paraprofessional"
                          );
                          describeselectadd(
                            "tab3",
                            "Special Education Paraprofessional"
                          );
                        } else if (disabled == 4) {
                          // describeselect2("tab4", "Tutor")
                          describeselect("tab4", "Tutor");
                          describeselectadd("tab4", "Tutor");
                        }
                        handleClose();
                      }}
                    >
                      {t("Change status")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {nanny ? (
        <Modal show={nanny} onHide={handleClose1} className="question_new">
          <Modal.Body>
            <div className="younger">
              {/* <Link to="" onClick={handleClose1}>+ </Link> */}
              <img src="/images/sign_logo.svg" />
              <h2>{t("Complete the Profile")}</h2>
              <p>{t("You can edit your info in settings section later")}</p>
              <div className="Profile_complete">
                <div className="detail work-experience additional_info your_kids  setp3">
                  <div className="nanny">
                    <h2 className="border">
                      <img src="/images/nany_pur.svg" /> {t("Nanny")}
                    </h2>
                    <div className="col-6">
                      <div className="iconsec">
                        <div className="form_group full">
                          <label>
                            {t("Years of work experience")}
                            <span
                              className={
                                errorfield.nanyyearexp != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="rang" style={{ minWidth: "375px" }}>
                            <div
                              class="slider"
                              onClick={(w) =>
                                seterrorfield({
                                  ...errorfield,
                                  nanyyearexp: "",
                                })
                              }
                            >
                              <input
                                type="range"
                                min="0"
                                max="60"
                                onChange={(e) => {
                                  setexperience(e.target.value);
                                  setdetailprovider({
                                    ...detailprovider,
                                    nanyyearexp: parseInt(e.target.value),
                                  });
                                }}
                                style={{
                                  "background-size":
                                    (experience * 100) / 60 + "% 100% ",
                                }}
                                value={experience}
                              />
                              <ul>
                                <li>0</li>
                                <li>15</li>
                                <li>30</li>
                                <li>45</li>
                                <li>60</li>
                              </ul>
                            </div>
                            <span id="rangeValue">{experience}</span>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                      <div className="rightsec">
                        <div className="form_group full">
                          <label>
                            {t("Rate per hour")}
                            {detail.country == "Serbia" ? "(RSD)" : "(USD)"}
                            <span
                              className={
                                errorfield.nanyperhrrate != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          {detail && detail.country == "Serbia" ? (
                            <div class="wrapper rang">
                              <div class="container_slide">
                                <div class="slider-track">
                                  <ul>
                                    <li
                                      style={
                                        usd.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 20 ||
                                        (usd.max < 20 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 30 ||
                                        (usd.max < 30 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 40 ||
                                        (usd.max < 40 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <div class="bggray_slider">
                                  <ul>
                                    <li
                                      style={
                                        usd.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 20 ||
                                        (usd.max < 20 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 30 ||
                                        (usd.max < 30 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 40 ||
                                        (usd.max < 40 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.max < 50 && usd.max != 0
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-1"
                                  value={usd.min / 10}
                                  onChange={(e) => {
                                    if (
                                      (usd.max > 0 ? usd.max : 60) >
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd({
                                        ...usd,
                                        min:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-2"
                                  value={usd.max == 0 ? 50 / 10 : usd.max / 10}
                                  onChange={(e) => {
                                    if (
                                      usd.min <
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd({
                                        ...usd,
                                        max:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div class="slider two">
                                <ul>
                                  <li>0</li>
                                  <li>1000</li>
                                  <li>2000</li>
                                  <li>3000</li>
                                  <li>4000</li>
                                  <li>6000+</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div class="wrapper rang">
                              <div class="container_slide">
                                <div class="slider-track">
                                  <ul>
                                    <li
                                      style={
                                        usd.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 20 ||
                                        (usd.max < 20 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 30 ||
                                        (usd.max < 30 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 40 ||
                                        (usd.max < 40 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <div class="bggray_slider">
                                  <ul>
                                    <li
                                      style={
                                        usd.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 20 ||
                                        (usd.max < 20 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 30 ||
                                        (usd.max < 30 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.min >= 40 ||
                                        (usd.max < 40 && usd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd.max < 50 && usd.max != 0
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-1"
                                  value={usd.min / 10}
                                  onChange={(e) => {
                                    if (
                                      (usd.max > 0 ? usd.max : 60) >
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd({
                                        ...usd,
                                        min:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-2"
                                  value={usd.max == 0 ? 50 / 10 : usd.max / 10}
                                  onChange={(e) => {
                                    if (
                                      usd.min <
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd({
                                        ...usd,
                                        max:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div class="slider two">
                                <ul>
                                  <li>0</li>
                                  <li>10</li>
                                  <li>20</li>
                                  <li>30</li>
                                  <li>40</li>
                                  <li>60+</li>
                                </ul>
                              </div>
                            </div>
                          )}
                          <span class="price">
                            {detail && detail.country == "Serbia"
                              ? usd.min * 100 + " - " + usd.max * 100
                              : usd.min + " - " + usd.max}
                          </span>
                          {/* <div className='errorfield'>{error.message}</div> */}
                        </div>
                      </div>
                      <div className="iconsec">
                        <div className="iconsec" style={{ width: "100%" }}>
                          <br />
                          <h3>
                            {t("Additional info")}
                            <span
                              className={
                                errorfield.smoke != "" ||
                                errorfield.carorlicence != "" ||
                                errorfield.cooking != "" ||
                                errorfield.lighthousework != "" ||
                                errorfield.traveling != ""
                                  ? "starred"
                                  : ""
                              }
                            >
                              *
                            </span>
                          </h3>
                          <br />
                          <div className="icon">
                            <ul>
                              <li
                                onClick={(e) =>
                                  seterrorfield({ ...errorfield, smoke: "" })
                                }
                              >
                                {t("Do you smoke?")}
                                <div className="icons">
                                  <svg
                                    className={
                                      habit.smoke == "false" ? "active" : ""
                                    }
                                    onClick={(e) => {
                                      sethabit({ ...habit, smoke: "false" });
                                    }}
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <circle
                                      stroke="#B7B7B7"
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M22.61 16.5999H24.03C25.08 16.5999 26 17.3399 26 18.6499V19.1999C26 19.6099 26.33 19.9499 26.75 19.9499H26.76C27.17 19.9499 27.51 19.6199 27.51 19.1999V18.3099C27.51 16.4999 25.91 15.1499 24.04 15.1499H22.74C21.72 15.1499 20.8 14.4199 20.67 13.3999C20.55 12.4499 21.13 11.6999 21.97 11.4699C22.29 11.3799 22.51 11.0899 22.51 10.7499C22.51 10.2599 22.05 9.88992 21.58 10.0299C20.16 10.4399 19.13 11.7599 19.16 13.3099C19.18 15.1599 20.77 16.5999 22.61 16.5999ZM27.69 11.3299C27.52 11.8399 27.23 12.3 26.85 12.68C28.72 13.57 30 15.49 30 17.71V19.2C30 19.61 29.66 19.95 29.25 19.95C28.84 19.95 28.5 19.61 28.5 19.2V17.72C28.5 15.7 27.07 14.01 25.14 13.7C24.77 13.64 24.5 13.32 24.5 12.95V12.8C24.5 12.45 24.75 12.17 25.09 12.06C25.64 11.8799 26.08 11.4399 26.26 10.8899C26.37 10.5599 26.64 10.3199 26.98 10.3099C27.5 10.3199 27.85 10.8299 27.69 11.3299ZM23.5 20.9499C24.33 20.9499 25 21.62 25 22.4501C25 22.6901 24.94 22.9201 24.84 23.1301L22.66 20.9499H23.5ZM26 20.9499H27.5V23.95H26V20.9499ZM28.5 23.95V20.9499H30V23.95H28.5ZM11.415 12.9474C11.6795 12.9474 11.9332 13.0526 12.12 13.2399L27.7 28.8298C28.09 29.2198 28.09 29.8498 27.7 30.2398C27.31 30.6298 26.68 30.6298 26.29 30.2398L20 23.9498H11.5C10.67 23.9498 10 23.2798 10 22.4498C10 21.6198 10.67 20.9498 11.5 20.9498H17L10.71 14.6499C10.32 14.2599 10.32 13.6299 10.71 13.2399C10.8968 13.0526 11.1505 12.9474 11.415 12.9474Z"
                                      fill="#B7B7B7"
                                    />
                                  </svg>
                                  <svg
                                    className={
                                      habit.smoke == "true" ? "active" : ""
                                    }
                                    onClick={(e) =>
                                      sethabit({ ...habit, smoke: "true" })
                                    }
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <circle
                                      stroke="#B7B7B7"
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                    />
                                    <path
                                      style={{
                                        transform:
                                          "translateY(8px) translateX(9px)",
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M16.85 5.62041C17.47 5.01041 17.85 4.17042 17.85 3.24043C17.85 1.73045 16.85 0.450466 15.47 0.0304707C14.99 -0.109528 14.5 0.250468 14.5 0.750462C14.5 1.08046 14.71 1.37045 15.02 1.46045C15.79 1.69045 16.35 2.40044 16.35 3.24043C16.35 4.06042 15.82 4.75042 15.08 5.00041C14.75 5.11041 14.5 5.39041 14.5 5.7404V5.8904C14.5 6.2604 14.77 6.58039 15.14 6.64039C17.07 6.95039 18.5 8.64037 18.5 10.6603V12.1403C18.5 12.5503 18.84 12.8903 19.25 12.8903C19.66 12.8903 20 12.5503 20 12.1403V10.6503C20 8.43037 18.72 6.51039 16.85 5.62041ZM13.5 13.8904H1.5C0.67 13.8904 0 14.5605 0 15.3905C0 16.2205 0.67 16.8906 1.5 16.8906H13.5C14.33 16.8906 15 16.2205 15 15.3905C15 14.5605 14.33 13.8904 13.5 13.8904ZM12.7301 8.09058H14.0301C15.9001 8.09058 17.5001 9.44056 17.5101 11.2505V12.1405C17.5101 12.5605 17.1701 12.8905 16.7601 12.8905H16.7501C16.3301 12.8905 16.0001 12.5505 16.0001 12.1405V11.5905C16.0001 10.2805 15.0801 9.54056 14.0301 9.54056H12.6101C10.7701 9.54056 9.18005 8.09058 9.15005 6.25061C9.12005 4.70063 10.1501 3.38065 11.5701 2.97066C12.0401 2.83066 12.5001 3.20065 12.5001 3.69064C12.5001 4.03064 12.2801 4.32063 11.9601 4.41063C11.1201 4.64063 10.5401 5.39062 10.6601 6.3406C10.7901 7.36059 11.7101 8.09058 12.7301 8.09058ZM16 13.8904H17.5V16.8906H16V13.8904ZM20 13.8904H18.5V16.8906H20V13.8904Z"
                                      fill="#B7B7B7"
                                    />
                                  </svg>
                                </div>
                              </li>
                              <li
                                onClick={(e) =>
                                  seterrorfield({
                                    ...errorfield,
                                    carorlicence: "",
                                  })
                                }
                              >
                                {t("Do you own a car or licence?")}
                                <div className="icons">
                                  <svg
                                    className={
                                      habit.licence == "false" ? "active" : ""
                                    }
                                    onClick={(e) => {
                                      sethabit({ ...habit, licence: "false" });
                                    }}
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      stroke="#B7B7B7"
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                    />
                                    <path
                                      d="M29.5309 17.0494H27.3897L27.0829 16.2339C26.7238 15.2794 26.0897 14.4681 25.2492 13.8875C24.4087 13.3069 23.4239 13 22.4013 13H17.5988C16.5761 13 15.5913 13.3069 14.7508 13.8875C13.9102 14.4681 13.2762 15.2794 12.9171 16.2339L12.6103 17.0494H10.4691C10.1491 17.0494 9.92324 17.3618 10.0244 17.6643L10.3369 18.5988C10.368 18.6918 10.4277 18.7728 10.5075 18.8301C10.5873 18.8874 10.6832 18.9183 10.7816 18.9183H11.9072L11.9052 18.9237C11.1415 19.3502 10.625 20.1641 10.625 21.0987V22.9676C10.625 23.5994 10.8613 24.1758 11.25 24.615V27.017C11.25 27.5331 11.6697 27.9515 12.1875 27.9515H14.0625C14.5803 27.9515 15 27.5331 15 27.017V25.4595H25V27.017C25 27.5331 25.4197 27.9515 25.9375 27.9515H27.8125C28.3303 27.9515 28.75 27.5331 28.75 27.017V24.615C29.1387 24.1757 29.375 23.5993 29.375 22.9676V21.0987C29.375 20.1641 28.8585 19.3502 28.0948 18.9237L28.0928 18.9183H29.2184C29.3168 18.9183 29.4127 18.8874 29.4925 18.8301C29.5723 18.7728 29.632 18.6918 29.6631 18.5988L29.9756 17.6643C30.0768 17.3618 29.8509 17.0494 29.5309 17.0494ZM15.2579 17.1088C15.6218 16.1417 16.5625 15.4919 17.5988 15.4919H22.4013C23.4375 15.4919 24.3782 16.1417 24.7421 17.1088L25.3056 18.6068H14.6944L15.2579 17.1088ZM13.4375 23.2791C12.7471 23.2791 12.1875 22.7213 12.1875 22.0332C12.1875 21.3451 12.7471 20.7872 13.4375 20.7872C14.1279 20.7872 15.3125 21.968 15.3125 22.6561C15.3125 23.3443 14.1279 23.2791 13.4375 23.2791ZM26.5625 23.2791C25.8721 23.2791 24.6875 23.3443 24.6875 22.6561C24.6875 21.968 25.8721 20.7872 26.5625 20.7872C27.2529 20.7872 27.8125 21.3451 27.8125 22.0332C27.8125 22.7213 27.2529 23.2791 26.5625 23.2791Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      d="M14 12L30 28"
                                      stroke="#B7B7B7"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  <svg
                                    className={
                                      habit.licence == "true" ? "active" : ""
                                    }
                                    onClick={(e) =>
                                      sethabit({ ...habit, licence: "true" })
                                    }
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                      stroke="#B7B7B7"
                                    />
                                    <path
                                      d="M29.5309 17.0494H27.3897L27.0829 16.2339C26.7238 15.2794 26.0897 14.4681 25.2492 13.8875C24.4087 13.3069 23.4239 13 22.4013 13H17.5988C16.5761 13 15.5913 13.3069 14.7508 13.8875C13.9102 14.4681 13.2762 15.2794 12.9171 16.2339L12.6103 17.0494H10.4691C10.1491 17.0494 9.92324 17.3618 10.0244 17.6643L10.3369 18.5988C10.368 18.6918 10.4277 18.7728 10.5075 18.8301C10.5873 18.8874 10.6832 18.9183 10.7816 18.9183H11.9072L11.9052 18.9237C11.1415 19.3502 10.625 20.1641 10.625 21.0987V22.9676C10.625 23.5994 10.8613 24.1758 11.25 24.615V27.017C11.25 27.5331 11.6697 27.9515 12.1875 27.9515H14.0625C14.5803 27.9515 15 27.5331 15 27.017V25.4595H25V27.017C25 27.5331 25.4197 27.9515 25.9375 27.9515H27.8125C28.3303 27.9515 28.75 27.5331 28.75 27.017V24.615C29.1387 24.1757 29.375 23.5993 29.375 22.9676V21.0987C29.375 20.1641 28.8585 19.3502 28.0948 18.9237L28.0928 18.9183H29.2184C29.3168 18.9183 29.4127 18.8874 29.4925 18.8301C29.5723 18.7728 29.632 18.6918 29.6631 18.5988L29.9756 17.6643C30.0768 17.3618 29.8509 17.0494 29.5309 17.0494ZM15.2579 17.1088C15.6218 16.1417 16.5625 15.4919 17.5988 15.4919H22.4013C23.4375 15.4919 24.3782 16.1417 24.7421 17.1088L25.3056 18.6068H14.6944L15.2579 17.1088ZM13.4375 23.2791C12.7471 23.2791 12.1875 22.7213 12.1875 22.0332C12.1875 21.3451 12.7471 20.7872 13.4375 20.7872C14.1279 20.7872 15.3125 21.968 15.3125 22.6561C15.3125 23.3443 14.1279 23.2791 13.4375 23.2791ZM26.5625 23.2791C25.8721 23.2791 24.6875 23.3443 24.6875 22.6561C24.6875 21.968 25.8721 20.7872 26.5625 20.7872C27.2529 20.7872 27.8125 21.3451 27.8125 22.0332C27.8125 22.7213 27.2529 23.2791 26.5625 23.2791Z"
                                      fill="#B7B7B7"
                                    />
                                  </svg>
                                </div>
                              </li>
                              <li
                                onClick={(e) =>
                                  seterrorfield({ ...errorfield, cooking: "" })
                                }
                              >
                                {t("Cooking for kids")}
                                <div className="icons">
                                  <svg
                                    className={
                                      habit.kids == "false" ? "active" : ""
                                    }
                                    onClick={(e) => {
                                      sethabit({ ...habit, kids: "false" });
                                    }}
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      stroke="#B7B7B7"
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M14.6551 16.8799C14.75 16.9598 14.8745 17 14.9991 17C15.1237 17 15.2482 16.9598 15.3431 16.8799C15.5334 16.7196 15.5334 16.4605 15.3431 16.3002C14.8492 15.8837 14.8492 15.2064 15.3431 14.7899C15.7664 14.4332 16 13.9593 16 13.4551C16 12.9508 15.7669 12.4769 15.3431 12.1202C15.1528 11.9599 14.8453 11.9599 14.6551 12.1202C14.4648 12.2805 14.4648 12.5396 14.6551 12.6999C14.8945 12.9016 15.0268 13.1697 15.0268 13.4551C15.0268 13.7404 14.895 14.0085 14.6551 14.2102C13.7816 14.9461 13.7816 16.144 14.6551 16.8799Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M24.6551 16.8799C24.75 16.9598 24.8745 17 24.9991 17C25.1237 17 25.2482 16.9598 25.3431 16.8799C25.5334 16.7196 25.5334 16.4605 25.3431 16.3002C24.8492 15.8837 24.8492 15.2064 25.3431 14.7899C25.7664 14.4332 26 13.9593 26 13.4551C26 12.9508 25.7669 12.4769 25.3431 12.1202C25.1528 11.9599 24.8453 11.9599 24.6551 12.1202C24.4648 12.2805 24.4648 12.5396 24.6551 12.6999C24.8945 12.9016 25.0268 13.1697 25.0268 13.4551C25.0268 13.7404 24.895 14.0085 24.6551 14.2102C23.7816 14.9461 23.7816 16.144 24.6551 16.8799Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M19.6551 13.8799C19.75 13.9598 19.8745 14 19.9991 14C20.1237 14 20.2482 13.9598 20.3431 13.8799C20.5334 13.7196 20.5334 13.4605 20.3431 13.3002C19.8492 12.8837 19.8492 12.2064 20.3431 11.7899C20.7664 11.4332 21 10.9593 21 10.4551C21 9.9508 20.7669 9.47689 20.3431 9.12022C20.1528 8.95993 19.8453 8.95993 19.6551 9.12022C19.4648 9.28052 19.4648 9.53961 19.6551 9.69991C19.8945 9.90161 20.0268 10.1697 20.0268 10.4551C20.0268 10.7404 19.895 11.0085 19.6551 11.2102C18.7816 11.9461 18.7816 13.144 19.6551 13.8799Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M22 18C22 18.28 21.94 18.55 21.84 18.79C25.75 19.6 28.73 22.93 29 27H11C11.27 22.93 14.25 19.6 18.16 18.79C18.06 18.55 18 18.28 18 18C18 16.9 18.9 16 20 16C21.1 16 22 16.9 22 18ZM30 30V28H10V30H30Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      d="M13 16L29 32"
                                      stroke="#B7B7B7"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  <svg
                                    className={
                                      habit.kids == "true" ? "active" : ""
                                    }
                                    onClick={(e) =>
                                      sethabit({ ...habit, kids: "true" })
                                    }
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                      stroke="#B7B7B7"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M14.6551 15.8799C14.75 15.9598 14.8745 16 14.9991 16C15.1237 16 15.2482 15.9598 15.3431 15.8799C15.5334 15.7196 15.5334 15.4605 15.3431 15.3002C14.8492 14.8837 14.8492 14.2064 15.3431 13.7899C15.7664 13.4332 16 12.9593 16 12.4551C16 11.9508 15.7669 11.4769 15.3431 11.1202C15.1528 10.9599 14.8453 10.9599 14.6551 11.1202C14.4648 11.2805 14.4648 11.5396 14.6551 11.6999C14.8945 11.9016 15.0268 12.1697 15.0268 12.4551C15.0268 12.7404 14.895 13.0085 14.6551 13.2102C13.7816 13.9461 13.7816 15.144 14.6551 15.8799Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M24.6551 15.8799C24.75 15.9598 24.8745 16 24.9991 16C25.1237 16 25.2482 15.9598 25.3431 15.8799C25.5334 15.7196 25.5334 15.4605 25.3431 15.3002C24.8492 14.8837 24.8492 14.2064 25.3431 13.7899C25.7664 13.4332 26 12.9593 26 12.4551C26 11.9508 25.7669 11.4769 25.3431 11.1202C25.1528 10.9599 24.8453 10.9599 24.6551 11.1202C24.4648 11.2805 24.4648 11.5396 24.6551 11.6999C24.8945 11.9016 25.0268 12.1697 25.0268 12.4551C25.0268 12.7404 24.895 13.0085 24.6551 13.2102C23.7816 13.9461 23.7816 15.144 24.6551 15.8799Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M19.6551 12.8799C19.75 12.9598 19.8745 13 19.9991 13C20.1237 13 20.2482 12.9598 20.3431 12.8799C20.5334 12.7196 20.5334 12.4605 20.3431 12.3002C19.8492 11.8837 19.8492 11.2064 20.3431 10.7899C20.7664 10.4332 21 9.95931 21 9.45506C21 8.9508 20.7669 8.47689 20.3431 8.12022C20.1528 7.95993 19.8453 7.95993 19.6551 8.12022C19.4648 8.28052 19.4648 8.53961 19.6551 8.69991C19.8945 8.90161 20.0268 9.16972 20.0268 9.45506C20.0268 9.74039 19.895 10.0085 19.6551 10.2102C18.7816 10.9461 18.7816 12.144 19.6551 12.8799Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M22 17C22 17.28 21.94 17.55 21.84 17.79C25.75 18.6 28.73 21.93 29 26H11C11.27 21.93 14.25 18.6 18.16 17.79C18.06 17.55 18 17.28 18 17C18 15.9 18.9 15 20 15C21.1 15 22 15.9 22 17ZM30 29V27H10V29H30Z"
                                      fill="#B7B7B7"
                                    />
                                  </svg>
                                </div>
                              </li>
                              <li
                                onClick={(e) =>
                                  seterrorfield({
                                    ...errorfield,
                                    lighthousework: "",
                                  })
                                }
                              >
                                {t("Light housework")}
                                <div className="icons">
                                  <svg
                                    className={
                                      habit.housework == "false" ? "active" : ""
                                    }
                                    onClick={(e) =>
                                      sethabit({ ...habit, housework: "false" })
                                    }
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                      stroke="#B7B7B7"
                                    />
                                    <path
                                      d="M28.773 11.4955C27.2368 10.6647 25.119 10.6297 23.2472 11.4043C21.5153 12.1214 20.2668 13.7015 19.5288 14.8889C19.1966 14.813 18.8411 14.961 18.6869 15.2622C18.5393 15.5502 18.6255 15.8844 18.8711 16.084C18.8038 16.2244 18.7627 16.3186 18.7472 16.3554L15.1627 23.7322C14.8012 23.5762 14.3706 23.7152 14.1923 24.0517C14.0107 24.3945 14.1598 24.8104 14.5256 24.9809L14.5501 24.9924L13.7437 26.6529H11.7398C11.3314 26.6529 11 26.9634 11 27.3461C11 27.7287 11.3314 28.0392 11.7398 28.0392H15.439C15.8474 28.0392 16.1789 27.7287 16.1789 27.3461C16.1789 26.9634 15.8474 26.6529 15.439 26.6529H15.3695L15.8825 25.5968C15.9502 25.6152 16.0187 25.6277 16.0871 25.6277C16.359 25.6277 16.6209 25.4866 16.7504 25.243C16.9198 24.9234 16.7992 24.5432 16.4862 24.3546L20.2006 16.7106C20.3009 16.7539 20.4055 16.7755 20.5095 16.7755C20.7851 16.7755 21.0495 16.6306 21.1768 16.3821C21.3462 16.0518 21.2086 15.6601 20.8735 15.482C21.5064 14.4827 22.5196 13.2215 23.8458 12.6725C25.2714 12.0823 26.9154 12.0913 28.0336 12.6961C28.8559 13.1407 29.3283 13.8481 29.4385 14.7992C29.6449 16.5803 29.4699 17.7746 28.9199 18.3496C28.8692 18.4026 28.8134 18.4481 28.7564 18.491V20.0427C29.2122 19.8985 29.6497 19.6632 30.0212 19.2754C30.8764 18.3829 31.1667 16.8697 30.9097 14.6498C30.7507 13.2742 29.9916 12.154 28.773 11.4955Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      d="M26.6663 23.1869C27.149 23.1869 27.6055 23.2899 28.0165 23.4694V20.2042V18.7978V17.9881C28.0165 17.6052 28.0553 17.6416 27.6466 17.6416H26.1976C25.7889 17.6416 21.6661 17.9594 20.5771 23.0033L19.8783 27.1727C19.8783 27.5557 20.2094 28.0392 20.6181 28.0392H24.129C23.7066 27.5293 23.4524 26.8916 23.4524 26.1981C23.4524 24.5376 24.8944 23.1869 26.6663 23.1869Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      d="M28.3861 24.5358C28.2725 24.4329 28.149 24.34 28.0162 24.2586C27.6274 24.0201 27.1639 23.8801 26.666 23.8801C25.3018 23.8801 24.192 24.9199 24.192 26.1981C24.192 26.9488 24.5767 27.6156 25.1694 28.0392C25.3758 28.1868 25.607 28.3043 25.8567 28.3858C26.1108 28.4686 26.3824 28.5157 26.6661 28.5157C26.9498 28.5157 27.2213 28.4686 27.4755 28.3858C27.7374 28.3005 27.9797 28.1754 28.1935 28.0177C28.3947 27.8694 28.5719 27.6936 28.7158 27.4947C28.9836 27.1242 29.1405 26.6778 29.1405 26.1978C29.1405 25.7438 28.9985 25.3212 28.7569 24.9636C28.6506 24.8076 28.527 24.6638 28.3861 24.5358ZM26.666 25.0353C27.3511 25.0353 27.9067 25.5559 27.9067 26.1978C27.9067 26.8396 27.3511 27.3602 26.666 27.3602C25.9809 27.3602 25.4253 26.8396 25.4253 26.1978C25.4253 25.5559 25.9805 25.0353 26.666 25.0353Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      d="M17 12L33 28"
                                      stroke="#B7B7B7"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M15 12L31 28"
                                      stroke="white"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  <svg
                                    className={
                                      habit.housework == "true" ? "active" : ""
                                    }
                                    onClick={(e) =>
                                      sethabit({ ...habit, housework: "true" })
                                    }
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                      stroke="#B7B7B7"
                                    />
                                    <path
                                      d="M27.773 11.4955C26.2368 10.6647 24.119 10.6297 22.2472 11.4043C20.5153 12.1214 19.2668 13.7015 18.5288 14.8889C18.1966 14.813 17.8411 14.961 17.6869 15.2622C17.5393 15.5502 17.6255 15.8844 17.8711 16.084C17.8038 16.2244 17.7627 16.3186 17.7472 16.3554L14.1627 23.7322C13.8012 23.5762 13.3706 23.7152 13.1923 24.0517C13.0107 24.3945 13.1598 24.8104 13.5256 24.9809L13.5501 24.9924L12.7437 26.6529H10.7398C10.3314 26.6529 10 26.9634 10 27.3461C10 27.7287 10.3314 28.0392 10.7398 28.0392H14.439C14.8474 28.0392 15.1789 27.7287 15.1789 27.3461C15.1789 26.9634 14.8474 26.6529 14.439 26.6529H14.3695L14.8825 25.5968C14.9502 25.6152 15.0187 25.6277 15.0871 25.6277C15.359 25.6277 15.6209 25.4866 15.7504 25.243C15.9198 24.9234 15.7992 24.5432 15.4862 24.3546L19.2006 16.7106C19.3009 16.7539 19.4055 16.7755 19.5095 16.7755C19.7851 16.7755 20.0495 16.6306 20.1768 16.3821C20.3462 16.0518 20.2086 15.6601 19.8735 15.482C20.5064 14.4827 21.5196 13.2215 22.8458 12.6725C24.2714 12.0823 25.9154 12.0913 27.0336 12.6961C27.8559 13.1407 28.3283 13.8481 28.4385 14.7992C28.6449 16.5803 28.4699 17.7746 27.9199 18.3496C27.8692 18.4026 27.8134 18.4481 27.7564 18.491V20.0427C28.2122 19.8985 28.6497 19.6632 29.0212 19.2754C29.8764 18.3829 30.1667 16.8697 29.9097 14.6498C29.7507 13.2742 28.9916 12.154 27.773 11.4955Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      d="M25.6664 23.1869C26.1491 23.1869 26.6056 23.2899 27.0166 23.4694V20.2042V18.7978V17.9881C27.0166 17.6052 27.0554 17.6416 26.6467 17.6416H25.1977C24.789 17.6416 20.6662 17.9594 19.5772 23.0033L18.8784 27.1727C18.8784 27.5557 19.2095 28.0392 19.6183 28.0392H23.1291C22.7067 27.5293 22.4526 26.8916 22.4526 26.1981C22.4526 24.5376 23.8945 23.1869 25.6664 23.1869Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      d="M27.386 24.5358C27.2724 24.4329 27.1489 24.34 27.0161 24.2586C26.6273 24.0201 26.1638 23.8801 25.6659 23.8801C24.3016 23.8801 23.1919 24.9199 23.1919 26.1981C23.1919 26.9488 23.5766 27.6156 24.1693 28.0392C24.3757 28.1868 24.6068 28.3043 24.8566 28.3858C25.1107 28.4686 25.3822 28.5157 25.6659 28.5157C25.9497 28.5157 26.2212 28.4686 26.4753 28.3858C26.7373 28.3005 26.9795 28.1754 27.1934 28.0177C27.3946 27.8694 27.5718 27.6936 27.7157 27.4947C27.9835 27.1242 28.1404 26.6778 28.1404 26.1978C28.1404 25.7438 27.9983 25.3212 27.7568 24.9636C27.6504 24.8076 27.5269 24.6638 27.386 24.5358ZM25.6659 25.0353C26.351 25.0353 26.9066 25.5559 26.9066 26.1978C26.9066 26.8396 26.351 27.3602 25.6659 27.3602C24.9808 27.3602 24.4252 26.8396 24.4252 26.1978C24.4252 25.5559 24.9804 25.0353 25.6659 25.0353Z"
                                      fill="#B7B7B7"
                                    />
                                  </svg>
                                </div>
                              </li>
                              <li
                                onClick={(e) =>
                                  seterrorfield({
                                    ...errorfield,
                                    traveling: "",
                                  })
                                }
                              >
                                {t("Traveling with family")}
                                <div className="icons">
                                  <svg
                                    className={
                                      habit.family == "false" ? "active" : ""
                                    }
                                    onClick={(e) => {
                                      sethabit({ ...habit, family: "false" });
                                    }}
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                      stroke="#B7B7B7"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M29.4194 15.5777C29.7342 15.5577 30.0442 15.6622 30.2826 15.8689C30.8025 16.3889 29.7626 18.0944 29.2426 18.4688L23.0028 22.6286L14.1632 25.8785L11.5632 23.6686L14.6831 24.1886L20.9229 20.5487L14.6831 16.3889L15.2031 15.8689L24.5628 17.9488L28.2026 15.8689C28.5813 15.6819 28.9971 15.5824 29.4194 15.5777ZM29.419 14.0178C28.7332 14.0221 28.0581 14.1877 27.4483 14.5014L24.3284 16.3005L15.5615 14.3454C15.0409 14.2305 14.4977 14.3893 14.1211 14.7666L13.6012 15.2866C13.2703 15.6173 13.1054 16.0789 13.1517 16.5444C13.1981 17.0098 13.4508 17.4299 13.8403 17.6889L18.0002 20.4604L14.4071 22.5403L11.8228 22.1087C11.1292 21.9902 10.442 22.3507 10.1454 22.9889C9.84881 23.6271 10.0162 24.3848 10.5541 24.8386L13.154 27.0485C13.5852 27.4172 14.1825 27.5228 14.7139 27.3241L23.5536 24.0743C23.669 24.0319 23.7789 23.976 23.8812 23.9079L30.121 19.748L30.173 19.7116C31.1477 18.8829 31.7918 17.7312 31.9877 16.4669C32.0556 15.8362 31.8404 15.2078 31.4001 14.751C30.8729 14.243 30.1609 13.9725 29.4294 14.0022L29.419 14.0178Z"
                                      fill="#B7B7B7"
                                    />
                                    <path
                                      d="M14 12L30 28"
                                      stroke="#B7B7B7"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  <svg
                                    className={
                                      habit.family == "true" ? "active" : ""
                                    }
                                    onClick={(e) =>
                                      sethabit({ ...habit, family: "true" })
                                    }
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      stroke="#B7B7B7"
                                      cx="20"
                                      cy="20"
                                      r="19.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M29.4194 15.5777C29.7342 15.5577 30.0442 15.6622 30.2826 15.8689C30.8025 16.3889 29.7626 18.0944 29.2426 18.4688L23.0028 22.6286L14.1632 25.8785L11.5632 23.6686L14.6831 24.1886L20.9229 20.5487L14.6831 16.3889L15.2031 15.8689L24.5628 17.9488L28.2026 15.8689C28.5813 15.6819 28.9971 15.5824 29.4194 15.5777ZM29.419 14.0178C28.7332 14.0221 28.0581 14.1877 27.4483 14.5014L24.3284 16.3005L15.5615 14.3454C15.0409 14.2305 14.4977 14.3893 14.1211 14.7666L13.6012 15.2866C13.2703 15.6173 13.1054 16.0789 13.1517 16.5444C13.1981 17.0098 13.4508 17.4299 13.8403 17.6889L18.0002 20.4604L14.4071 22.5403L11.8228 22.1087C11.1292 21.9902 10.442 22.3507 10.1454 22.9889C9.84881 23.6271 10.0162 24.3848 10.5541 24.8386L13.154 27.0485C13.5852 27.4172 14.1825 27.5228 14.7139 27.3241L23.5536 24.0743C23.669 24.0319 23.7789 23.976 23.8812 23.9079L30.121 19.748L30.173 19.7116C31.1477 18.8829 31.7918 17.7312 31.9877 16.4669C32.0556 15.8362 31.8404 15.2078 31.4001 14.751C30.8729 14.243 30.1609 13.9725 29.4294 14.0022L29.419 14.0178Z"
                                      fill="#B7B7B7"
                                    />
                                  </svg>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="rightsec">
                        <div className="form_group full space">
                          <label>
                            {t("Do you have experience with newborns?")}
                            <span
                              className={
                                errorfield.nanynewbornexp != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox">
                            <ul
                              onClick={(w) =>
                                seterrorfield({
                                  ...errorfield,
                                  nanynewbornexp: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="quality"
                                  checked={
                                    detailprovider.nanynewbornexp == "Yes"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      nanynewbornexp: "Yes",
                                    })
                                  }
                                />
                                <span> {t("Yes")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="quality"
                                  checked={
                                    detailprovider.nanynewbornexp == "No"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      nanynewbornexp: "No",
                                    })
                                  }
                                />
                                <span> {t("No")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                        <div className="form_group full">
                          <label>
                            {t("Would you living with the family?")}
                            <span
                              className={
                                errorfield.livewithfamily != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox create">
                            <ul
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  livewithfamily: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="family"
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      livewithfamily: "Yes",
                                    })
                                  }
                                  checked={
                                    detailprovider.livewithfamily == "Yes"
                                      ? true
                                      : false
                                  }
                                />
                                <span> {t("Yes")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="family"
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      livewithfamily: "No",
                                    })
                                  }
                                  checked={
                                    detailprovider.livewithfamily == "No"
                                      ? true
                                      : false
                                  }
                                />
                                <span> {t("No")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="family"
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      livewithfamily: "Open to offers",
                                    })
                                  }
                                  checked={
                                    detailprovider.livewithfamily ==
                                    "Open to offers"
                                      ? true
                                      : false
                                  }
                                />
                                <span> {t("Open to offers")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                        <div className="form_group full space">
                          <label>
                            {t(
                              "Do you have experience in working with kids with"
                            )}
                            <br />
                            {t("special needs?")}
                            <span
                              className={
                                errorfield.nanyexpwithkid != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox">
                            <ul
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  nanyexpwithkid: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="quality2"
                                  checked={
                                    detailprovider.nanyexpwithkid === "Yes"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      nanyexpwithkid: "Yes",
                                    })
                                  }
                                />
                                <span> {t("Yes")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="quality2"
                                  checked={
                                    detailprovider.nanyexpwithkid === "No"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      nanyexpwithkid: "No",
                                    })
                                  }
                                />
                                <span> {t("No")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                    </div>
                    <span>{t("Please fill out all (*) required fields.")}</span>
                  </div>
                </div>
              </div>
              <div className="button">
                <button
                  onClick={(e) => {
                    handleClose1();
                    window.scrollTo({ top: 0 });
                  }}
                >
                  {t("Back")}
                </button>
                <button
                  onClick={(e) => {
                    if (
                      detailprovider.nanyyearexp > 0 &&
                      (usd.min > 5 || usd.max > 5) &&
                      habit.smoke != "" &&
                      habit.licence != "" &&
                      habit.kids != "" &&
                      habit.housework != "" &&
                      habit.family != "" &&
                      detailprovider.nanynewbornexp != "" &&
                      detailprovider.livewithfamily != "" &&
                      detailprovider.nanyexpwithkid != ""
                    ) {
                      window.scrollTo({ top: 0 });
                      handleClose1();
                      profile_update(true);
                      setlivenow(true);
                    } else {
                      step1.map((e) => {
                        after_logins_field(e.name);
                      });
                    }
                  }}
                >
                  {t("Finish")}
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {teacher ? (
        <Modal show={teacher} onHide={handleClose3} className="question_new">
          <Modal.Body>
            <div className="younger">
              {/* <Link to="" onClick={handleClose3}>+ </Link> */}
              <img src="/images/sign_logo.svg" />
              <h2>{t("Complete the Profile")}</h2>
              <p>{t("You can edit your info in settings section later")}</p>
              <div className="Profile_complete">
                <div className="detail work-experience your_kids  setp3">
                  <div className="special_education">
                    <h2 className="border">
                      <img src="/images/special_education.svg" />{" "}
                      {t("Special Education Teacher")}
                    </h2>
                    <div className="col-6">
                      <div className="iconsec">
                        <div className="form_group full">
                          <label>
                            {t("Years of work experience")}
                            <span
                              className={
                                errorfield.setyearexp != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="rang" style={{ minWidth: "375px" }}>
                            <div
                              class="slider"
                              onClick={(w) =>
                                seterrorfield({ ...errorfield, setyearexp: "" })
                              }
                            >
                              <input
                                type="range"
                                min="0"
                                max="60"
                                onChange={(e) => setrange(e.target.value)}
                                style={{
                                  "background-size":
                                    (range * 100) / 60 + "% 100% ",
                                }}
                                value={range}
                              />
                              <ul>
                                <li>0</li>
                                <li>15</li>
                                <li>30</li>
                                <li>45</li>
                                <li>60</li>
                              </ul>
                            </div>
                            <span id="rangeValue">{range}</span>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                      <div className="rightsec">
                        <div className="form_group full">
                          <label>
                            {t("Rate per hour")}
                            {detail.country == "Serbia" ? "(RSD)" : "(USD)"}
                            <span
                              className={
                                errorfield.nanyperhrrate != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          {detail && detail.country == "Serbia" ? (
                            <div class="wrapper rang">
                              <div class="container_slide">
                                <div class="slider-track">
                                  <ul>
                                    <li
                                      style={
                                        usd3.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 20 ||
                                        (usd3.max < 20 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 30 ||
                                        (usd3.max < 30 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 40 ||
                                        (usd3.max < 40 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <div class="bggray_slider">
                                  <ul>
                                    <li
                                      style={
                                        usd3.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 20 ||
                                        (usd3.max < 20 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 30 ||
                                        (usd3.max < 30 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 40 ||
                                        (usd3.max < 40 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.max < 50 && usd3.max != 0
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-1"
                                  value={usd3.min / 10}
                                  onChange={(e) => {
                                    if (
                                      (usd3.max > 0 ? usd3.max : 60) >
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd3({
                                        ...usd3,
                                        min:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-2"
                                  value={
                                    usd3.max == 0 ? 50 / 10 : usd3.max / 10
                                  }
                                  onChange={(e) => {
                                    if (
                                      usd3.min <
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd3({
                                        ...usd3,
                                        max:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div class="slider two">
                                <ul>
                                  <li>0</li>
                                  <li>1000</li>
                                  <li>2000</li>
                                  <li>3000</li>
                                  <li>4000</li>
                                  <li>6000+</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div class="wrapper rang">
                              <div class="container_slide">
                                <div class="slider-track">
                                  <ul>
                                    <li
                                      style={
                                        usd3.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 20 ||
                                        (usd3.max < 20 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 30 ||
                                        (usd3.max < 30 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 40 ||
                                        (usd3.max < 40 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <div class="bggray_slider">
                                  <ul>
                                    <li
                                      style={
                                        usd3.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 20 ||
                                        (usd3.max < 20 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 30 ||
                                        (usd3.max < 30 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.min >= 40 ||
                                        (usd3.max < 40 && usd3.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd3.max < 50 && usd3.max != 0
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-1"
                                  value={usd3.min / 10}
                                  onChange={(e) => {
                                    if (
                                      (usd3.max > 0 ? usd3.max : 60) >
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd3({
                                        ...usd3,
                                        min:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-2"
                                  value={
                                    usd3.max == 0 ? 50 / 10 : usd3.max / 10
                                  }
                                  onChange={(e) => {
                                    if (
                                      usd3.min <
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd3({
                                        ...usd3,
                                        max:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div class="slider two">
                                <ul>
                                  <li>0</li>
                                  <li>10</li>
                                  <li>20</li>
                                  <li>30</li>
                                  <li>40</li>
                                  <li>60+</li>
                                </ul>
                              </div>
                            </div>
                          )}
                          <span class="price">
                            {detail && detail.country == "Serbia"
                              ? usd3.min * 100 + " - " + usd3.max * 100
                              : usd3.min + " - " + usd3.max}
                          </span>
                          {/* <div className='errorfield'>{error.message}</div> */}
                        </div>
                      </div>
                      <div className="iconsec">
                        <div className="form_group full qualification methad">
                          <label>
                            {t("Experience with following methods")}
                            <span
                              className={
                                errorfield.setexpmethods != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox">
                            <ul
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  setexpmethods: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  checked={
                                    methods.setexpmethods &&
                                    methods.setexpmethods == "ABA"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setmethods({
                                        ...methods,
                                        setexpmethods: "ABA",
                                      });
                                    } else {
                                      setmethods({
                                        ...methods,
                                        setexpmethods: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("ABA")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  checked={
                                    methods.setexpmethods2 &&
                                    methods.setexpmethods2 == "PECS"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setmethods({
                                        ...methods,
                                        setexpmethods2: "PECS",
                                      });
                                    } else {
                                      setmethods({
                                        ...methods,
                                        setexpmethods2: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("PECS")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  checked={
                                    methods.setexpmethods3 &&
                                    methods.setexpmethods3 == "Floortime"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setmethods({
                                        ...methods,
                                        setexpmethods3: "Floortime",
                                      });
                                    } else {
                                      setmethods({
                                        ...methods,
                                        setexpmethods3: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("Floortime")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  checked={
                                    methods.setexpmethods4 &&
                                    methods.setexpmethods4 == "None"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setmethods({
                                        ...methods,
                                        setexpmethods4: "None",
                                      });
                                    } else {
                                      setmethods({
                                        ...methods,
                                        setexpmethods4: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("None")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                      <div className="rightsec">
                        <div className="form_group full">
                          <label>
                            {t("Do you have an experience in")}{" "}
                            <a>{t("IEP")} </a>
                            <span className="smallpop">
                              {t("individualEducation")}
                            </span>{" "}
                            {t("development?")}
                            <span
                              className={
                                errorfield.setexpiep != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox">
                            <ul
                              onClick={(e) =>
                                seterrorfield({ ...errorfield, setexpiep: "" })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="quality6"
                                  checked={
                                    detailprovider.setexpiep == "Yes"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      setexpiep: "Yes",
                                    })
                                  }
                                />
                                <span> {t("Yes")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="quality6"
                                  checked={
                                    detailprovider.setexpiep == "No"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      setexpiep: "No",
                                    })
                                  }
                                />
                                <span> {t("No")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                      <div className="iconsec" style={{ clear: "both" }}>
                        <div className="job_performance">
                          <div className="form_group" style={{ width: "100%" }}>
                            <label>
                              {t("Area of expertise (select all applicable)")}
                              <span
                                className={
                                  errorfield.setallapplicable != ""
                                    ? "starred"
                                    : ""
                                }
                              >
                                *
                              </span>
                            </label>
                            <div className="customselect inp">
                              <input
                                className="keyword"
                                type="text"
                                placeholder={t("Choose from the list")}
                                value={setallapplicable2.map((e) => {
                                  return e.name;
                                })}
                              />
                              <div
                                className="overflow"
                                id="over22"
                                onClick={(e) => custom("cate88", "over22")}
                                style={{
                                  bottom: "100%",
                                  top: "auto",
                                }}
                              ></div>

                              <div
                                className="option"
                                id="cate88"
                                onClick={(e) =>
                                  seterrorfield({
                                    ...errorfield,
                                    setallapplicable: "",
                                  })
                                }
                                style={{
                                  bottom: "100%",
                                  top: "auto",
                                }}
                              >
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) => e.name == t("ADHD")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) => selectoption6(t("ADHD"))}
                                  />
                                  <h3>{t("ADHD")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) =>
                                          e.name == t("Auditory Impairment")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(t("Auditory Impairment"))
                                    }
                                  />
                                  <h3>{t("Auditory Impairment")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) => e.name == t("Autism")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) => selectoption6(t("Autism"))}
                                  />
                                  <h3>{t("Autism")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) => e.name == t("Cerebral palsy")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(t("Cerebral palsy"))
                                    }
                                  />
                                  <h3>{t("Cerebral palsy")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) => e.name == t("Down syndrome")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(t("Down syndrome"))
                                    }
                                  />
                                  <h3>{t("Down syndrome")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) => e.name == t("Dyslexia")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(t("Dyslexia"))
                                    }
                                  />
                                  <h3>{t("Dyslexia")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) =>
                                          e.name ==
                                          t("Mild intellectual disability")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(
                                        t("Mild intellectual disability")
                                      )
                                    }
                                  />
                                  <h3>{t("Mild intellectual disability")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) =>
                                          e.name ==
                                          t(
                                            "Moderate/Severe intellectual disability"
                                          )
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(
                                        t(
                                          "Moderate/Severe intellectual disability"
                                        )
                                      )
                                    }
                                  />
                                  <h3>
                                    {t(
                                      "Moderate/Severe intellectual disability"
                                    )}
                                  </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) =>
                                          e.name == t("Orthopedic impairment")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(t("Orthopedic impairment"))
                                    }
                                  />
                                  <h3>{t("Orthopedic impairment")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) =>
                                          e.name ==
                                          t("Speech learning impairment")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(
                                        t("Speech learning impairment")
                                      )
                                    }
                                  />
                                  <h3>{t("Speech learning impairment")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) =>
                                          e.name ==
                                          t("Specific learning disabilities")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(
                                        t("Specific learning disabilities")
                                      )
                                    }
                                  />
                                  <h3>
                                    {t("Specific learning disabilities")}{" "}
                                  </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) => e.name == t("Visual impairment")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) =>
                                      selectoption6(t("Visual impairment"))
                                    }
                                  />
                                  <h3>{t("Visual impairment")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    checked={
                                      setallapplicable2.filter(
                                        (e) => e.name == t("Other")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={(a) => selectoption6(t("Other"))}
                                  />
                                  <h3>{t("Other")} </h3>
                                  <span></span>
                                </p>
                              </div>

                              <span onClick={(e) => custom("cate88", "over22")}>
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
                            {/* <div className='errorfield'>{error.message}</div>*/}
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <span>{t("Please fill out all (*) required fields.")}</span>
                  </div>
                </div>
              </div>
              <div className="button">
                <button
                  onClick={(e) => {
                    handleClose3();
                    window.scrollTo({ top: 0 });
                  }}
                >
                  {t("Back")}
                </button>
                <button
                  onClick={(e) => {
                    if (
                      range > 0 &&
                      usd3.max > 0 &&
                      (methods.setexpmethods != "" ||
                        methods.setexpmethods2 != "" ||
                        methods.setexpmethods3 != "" ||
                        methods.setexpmethods4 != "") &&
                      detailprovider.setexpiep != "" &&
                      setallapplicable2[0]
                    ) {
                      window.scrollTo({ top: 0 });
                      handleClose3();
                      profile_update(true);
                      setlivenow(true);
                    } else {
                      step2.map((e) => {
                        after_logins_field(e.name);
                      });
                    }
                  }}
                >
                  {t("Finish")}
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {professional ? (
        <Modal
          show={professional}
          onHide={handleClose2}
          className="question_new"
        >
          <Modal.Body>
            <div className="younger">
              {/* <Link to="" onClick={handleClose2}>+ </Link> */}
              <img src="/images/sign_logo.svg" />
              <h2>{t("Complete the Profile")}</h2>
              <p>{t("You can edit your info in settings section later")}</p>
              <div className="Profile_complete">
                <div className="special_education">
                  <div className="detail work-experience your_kids  setp3">
                    <h2 className="border">
                      <img src="/images/professional.svg" />{" "}
                      {t("Special Education Paraprofessional")}
                    </h2>
                    <div className="col-6">
                      <div className="iconsec">
                        <div className="form_group full">
                          <label>
                            {t("Years of work experience")}
                            <span
                              className={
                                errorfield.sepworkexp != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="rang" style={{ minWidth: "375px" }}>
                            <div
                              class="slider"
                              onClick={(w) =>
                                seterrorfield({ ...errorfield, sepworkexp: "" })
                              }
                            >
                              <input
                                type="range"
                                min="0"
                                max="60"
                                onChange={(e) => setsepworkexp(e.target.value)}
                                style={{
                                  "background-size":
                                    (sepworkexp * 100) / 60 + "% 100% ",
                                }}
                                value={sepworkexp}
                              />
                              <ul>
                                <li>0</li>
                                <li>15</li>
                                <li>30</li>
                                <li>45</li>
                                <li>60</li>
                              </ul>
                            </div>
                            <span id="rangeValue">{sepworkexp}</span>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                      <div className="rightsec">
                        <div className="form_group full">
                          <label>
                            {t("Rate per hour")}
                            {detail.country == "Serbia" ? "(RSD)" : "(USD)"}
                            <span
                              className={
                                errorfield.nanyperhrrate != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          {detail && detail.country == "Serbia" ? (
                            <div class="wrapper rang">
                              <div class="container_slide">
                                <div class="slider-track">
                                  <ul>
                                    <li
                                      style={
                                        usd4.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 20 ||
                                        (usd4.max < 20 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 30 ||
                                        (usd4.max < 30 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 40 ||
                                        (usd4.max < 40 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <div class="bggray_slider">
                                  <ul>
                                    <li
                                      style={
                                        usd4.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 20 ||
                                        (usd4.max < 20 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 30 ||
                                        (usd4.max < 30 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 40 ||
                                        (usd4.max < 40 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.max < 50 && usd4.max != 0
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-1"
                                  value={usd4.min / 10}
                                  onChange={(e) => {
                                    if (
                                      (usd4.max > 0 ? usd4.max : 60) >
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd4({
                                        ...usd4,
                                        min:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-2"
                                  value={
                                    usd4.max == 0 ? 50 / 10 : usd4.max / 10
                                  }
                                  onChange={(e) => {
                                    if (
                                      usd4.min <
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd4({
                                        ...usd4,
                                        max:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div class="slider two">
                                <ul>
                                  <li>0</li>
                                  <li>1000</li>
                                  <li>2000</li>
                                  <li>3000</li>
                                  <li>4000</li>
                                  <li>6000+</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div class="wrapper rang">
                              <div class="container_slide">
                                <div class="slider-track">
                                  <ul>
                                    <li
                                      style={
                                        usd4.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 20 ||
                                        (usd4.max < 20 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 30 ||
                                        (usd4.max < 30 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 40 ||
                                        (usd4.max < 40 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <div class="bggray_slider">
                                  <ul>
                                    <li
                                      style={
                                        usd4.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 20 ||
                                        (usd4.max < 20 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 30 ||
                                        (usd4.max < 30 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.min >= 40 ||
                                        (usd4.max < 40 && usd4.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        usd4.max < 50 && usd4.max != 0
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-1"
                                  value={usd4.min / 10}
                                  onChange={(e) => {
                                    if (
                                      (usd4.max > 0 ? usd4.max : 60) >
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd4({
                                        ...usd4,
                                        min:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-2"
                                  value={
                                    usd4.max == 0 ? 50 / 10 : usd4.max / 10
                                  }
                                  onChange={(e) => {
                                    if (
                                      usd4.min <
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      setusd4({
                                        ...usd4,
                                        max:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div class="slider two">
                                <ul>
                                  <li>0</li>
                                  <li>10</li>
                                  <li>20</li>
                                  <li>30</li>
                                  <li>40</li>
                                  <li>60+</li>
                                </ul>
                              </div>
                            </div>
                          )}
                          <span class="price">
                            {detail && detail.country == "Serbia"
                              ? usd4.min * 100 + " - " + usd4.max * 100
                              : usd4.min + " - " + usd4.max}
                          </span>
                          {/* <div className='errorfield'>{error.message}</div> */}
                        </div>
                      </div>
                      <div className="iconsec space">
                        <div className="form_group full">
                          <label>
                            {t("Experience with following methods")}
                            <span
                              className={
                                errorfield.sepexpmethods != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox">
                            <ul
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  sepexpmethods: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="quality4"
                                  checked={
                                    detailprovider.sepexpmethods &&
                                    detailprovider.sepexpmethods == "ABA"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      sepexpmethods: "ABA",
                                    })
                                  }
                                />
                                <span> {t("ABA")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="quality4"
                                  checked={
                                    detailprovider.sepexpmethods &&
                                    detailprovider.sepexpmethods == "PECS"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      sepexpmethods: "PECS",
                                    })
                                  }
                                />
                                <span> {t("PECS")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="quality4"
                                  checked={
                                    detailprovider.sepexpmethods &&
                                    detailprovider.sepexpmethods == "Floortime"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      sepexpmethods: "Floortime",
                                    })
                                  }
                                />
                                <span> {t("Floortime")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="quality4"
                                  checked={
                                    detailprovider.sepexpmethods &&
                                    detailprovider.sepexpmethods == "None"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      sepexpmethods: "None",
                                    })
                                  }
                                />
                                <span> {t("None")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                      <div className="rightsec">
                        <div className="form_group full">
                          <label>
                            {t(
                              " Do you have experience in working with kids with special needs?"
                            )}
                            <span
                              className={
                                errorfield.sepexpwithkid != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox">
                            <ul
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  sepexpwithkid: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="quality3"
                                  checked={
                                    detailprovider.sepexpwithkid == "Yes"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      sepexpwithkid: "Yes",
                                    })
                                  }
                                />
                                <span> {t("Yes")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="quality3"
                                  checked={
                                    detailprovider.sepexpwithkid == "No"
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      sepexpwithkid: "No",
                                    })
                                  }
                                />
                                <span> {t("No")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                      <span>
                        {t("Please fill out all (*) required fields.")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="button text-center">
                <div class="pull-right">
                  <button class="btn" onClick={(e) => handleClose2()}>
                    {t("Back")}
                  </button>
                </div>
                <div class="pull-right">
                  <button
                    class="btn confirm"
                    onClick={(e) => {
                      if (
                        sepworkexp > 0 &&
                        detailprovider.sepexpmethods != "" &&
                        usd4.max > 5 &&
                        detailprovider.sepexpwithkid != ""
                      ) {
                        handleClose2();
                        window.scrollTo({ top: 0 });
                        profile_update(true);
                        setlivenow(true);
                      } else {
                        step3.map((e) => {
                          after_logins_field(e.name);
                        });
                      }
                    }}
                  >
                    {t("Finish")}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {tuter ? (
        <Modal show={tuter} onHide={handleClose4} className="question_new">
          <Modal.Body>
            <div className="younger">
              {/* <Link to="" onClick={handleClose4}>+ </Link> */}
              <img src="/images/sign_logo.svg" />

              <h2>{t("Complete the Profile")}</h2>
              <p>{t("You can edit your info in settings section later")}</p>
              <div className="Profile_complete">
                <div className="detail work-experience  your_kids  setp3">
                  <div className="nanny tutor">
                    <h2 className="border">
                      <img src="/images/tutorform.svg" /> {t("Tutor")}
                    </h2>
                    <div className="col-6">
                      <div className="iconsec">
                        <div className="form_group full">
                          <label>
                            {t("Years of work experience")}
                            <span
                              className={
                                errorfield.tutorexp != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="rang" style={{ minWidth: "375px" }}>
                            <div
                              class="slider"
                              onClick={(w) =>
                                seterrorfield({ ...errorfield, tutorexp: "" })
                              }
                            >
                              <input
                                type="range"
                                min="0"
                                max="60"
                                onChange={(e) =>
                                  setutorexperience(e.target.value)
                                }
                                style={{
                                  "background-size":
                                    (utorexperience * 100) / 60 + "% 100% ",
                                }}
                                value={utorexperience}
                              />
                              <ul>
                                <li>0</li>
                                <li>15</li>
                                <li>30</li>
                                <li>45</li>
                                <li>60</li>
                              </ul>
                            </div>
                            <span id="rangeValue">{utorexperience}</span>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                      <div className="rightsec">
                        <div className="form_group full">
                          <label>
                            {t("Rate per hour")}
                            {detail.country == "Serbia" ? "(RSD)" : "(USD)"}
                            <span
                              className={
                                errorfield.nanyperhrrate != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          {detail && detail.country == "Serbia" ? (
                            <div class="wrapper rang">
                              <div class="container_slide">
                                <div class="slider-track">
                                  <ul>
                                    <li
                                      style={
                                        tutorusd.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 20 ||
                                        (tutorusd.max < 20 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 30 ||
                                        (tutorusd.max < 30 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 40 ||
                                        (tutorusd.max < 40 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <div class="bggray_slider">
                                  <ul>
                                    <li
                                      style={
                                        tutorusd.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 20 ||
                                        (tutorusd.max < 20 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 30 ||
                                        (tutorusd.max < 30 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 40 ||
                                        (tutorusd.max < 40 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.max < 50 && tutorusd.max != 0
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-1"
                                  value={tutorusd.min / 10}
                                  onChange={(e) => {
                                    if (
                                      (tutorusd.max > 0 ? tutorusd.max : 60) >
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      settutorusd({
                                        ...tutorusd,
                                        min:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-2"
                                  value={
                                    tutorusd.max == 0
                                      ? 50 / 10
                                      : tutorusd.max / 10
                                  }
                                  onChange={(e) => {
                                    if (
                                      tutorusd.min <
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      settutorusd({
                                        ...tutorusd,
                                        max:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div class="slider two">
                                <ul>
                                  <li>0</li>
                                  <li>1000</li>
                                  <li>2000</li>
                                  <li>3000</li>
                                  <li>4000</li>
                                  <li>6000+</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div class="wrapper rang">
                              <div class="container_slide">
                                <div class="slider-track">
                                  <ul>
                                    <li
                                      style={
                                        tutorusd.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 20 ||
                                        (tutorusd.max < 20 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 30 ||
                                        (tutorusd.max < 30 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 40 ||
                                        (tutorusd.max < 40 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <div class="bggray_slider">
                                  <ul>
                                    <li
                                      style={
                                        tutorusd.min >= 10
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 20 ||
                                        (tutorusd.max < 20 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 30 ||
                                        (tutorusd.max < 30 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.min >= 40 ||
                                        (tutorusd.max < 40 && tutorusd.max > 0)
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                    <li
                                      style={
                                        tutorusd.max < 50 && tutorusd.max != 0
                                          ? { backgroundColor: "#E5E5E5" }
                                          : {}
                                      }
                                    ></li>
                                  </ul>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-1"
                                  value={tutorusd.min / 10}
                                  onChange={(e) => {
                                    if (
                                      (tutorusd.max > 0 ? tutorusd.max : 60) >
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      settutorusd({
                                        ...tutorusd,
                                        min:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="5"
                                  id="slider-2"
                                  value={
                                    tutorusd.max == 0
                                      ? 50 / 10
                                      : tutorusd.max / 10
                                  }
                                  onChange={(e) => {
                                    if (
                                      tutorusd.min <
                                      (e.target.value == 5
                                        ? 60
                                        : e.target.value * 10)
                                    ) {
                                      settutorusd({
                                        ...tutorusd,
                                        max:
                                          e.target.value == 5
                                            ? 60
                                            : e.target.value * 10,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div class="slider two">
                                <ul>
                                  <li>0</li>
                                  <li>10</li>
                                  <li>20</li>
                                  <li>30</li>
                                  <li>40</li>
                                  <li>60+</li>
                                </ul>
                              </div>
                            </div>
                          )}
                          <span class="price">
                            {detail && detail.country == "Serbia"
                              ? tutorusd.min * 100 + " - " + tutorusd.max * 100
                              : tutorusd.min + " - " + tutorusd.max}
                          </span>
                          {/* <div className='errorfield'>{error.message}</div> */}
                        </div>
                      </div>
                      <div className="iconsec">
                        <div className="form_group full qualification tutorteach">
                          <label>
                            {t("What classes would you teach?")}
                            <span
                              className={
                                errorfield.tutorliketoteach == ""
                                  ? ""
                                  : "starred"
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox">
                            <ul
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  tutorliketoteach: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  checked={
                                    qualifications.English == t("English")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setqualifications({
                                        ...qualifications,
                                        English: t("English"),
                                      });
                                    } else {
                                      setqualifications({
                                        ...qualifications,
                                        English: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("English")}</span>
                              </li>

                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  checked={
                                    qualifications.Serbian == t("Serbian")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setqualifications({
                                        ...qualifications,
                                        Serbian: t("Serbian"),
                                      });
                                    } else {
                                      setqualifications({
                                        ...qualifications,
                                        Serbian: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("Serbian")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  checked={
                                    qualifications.Mathematics ==
                                    t("Mathematics")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setqualifications({
                                        ...qualifications,
                                        Mathematics: t("Mathematics"),
                                      });
                                    } else {
                                      setqualifications({
                                        ...qualifications,
                                        Mathematics: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("Mathematics")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  checked={
                                    qualifications.Physics == t("Physics")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setqualifications({
                                        ...qualifications,
                                        Physics: t("Physics"),
                                      });
                                    } else {
                                      setqualifications({
                                        ...qualifications,
                                        Physics: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("Physics")}</span>
                              </li>

                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  checked={
                                    qualifications.Chemistry == t("Chemistry")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setqualifications({
                                        ...qualifications,
                                        Chemistry: t("Chemistry"),
                                      });
                                    } else {
                                      setqualifications({
                                        ...qualifications,
                                        Chemistry: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("Chemistry")}</span>
                              </li>
                              <li>
                                <input type="checkbox" name="" />
                                <span>
                                  {t("Other")}{" "}
                                  <input
                                    type="text"
                                    placeholder={t("Other")}
                                    onChange={(e) => {
                                      setqualifications({
                                        ...qualifications,
                                        Other: e.target.value,
                                      });
                                    }}
                                    defaultValue={
                                      qualifications.Other
                                        ? qualifications.Other
                                        : " "
                                    }
                                  />
                                </span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>

                      <div className="rightsec">
                        <div className="form_group full">
                          <label>
                            {t("I am interested in providing online classes")}
                            <span
                              className={
                                errorfield.tutorintrestedonlinecls != ""
                                  ? "starred"
                                  : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox create">
                            <ul
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  tutorintrestedonlinecls: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="yes"
                                  checked={
                                    detailprovider.tutorintrestedonlinecls ===
                                    t("Yes")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      tutorintrestedonlinecls: t("Yes"),
                                    })
                                  }
                                />
                                <span> {t("Yes")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="yes"
                                  checked={
                                    detailprovider.tutorintrestedonlinecls ===
                                    t("No")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      tutorintrestedonlinecls: t("No"),
                                    })
                                  }
                                />
                                <span> {t("No")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                      <div className="rightsec">
                        <div className="form_group full">
                          <label>
                            {t(
                              " Do you have experience in working with kids with special needs?"
                            )}
                            <span
                              className={
                                errorfield.sepexpwithkid != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox">
                            <ul
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  sepexpwithkid: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="quality3"
                                  checked={
                                    detailprovider.sepexpwithkid == t("Yes")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      sepexpwithkid: t("Yes"),
                                    })
                                  }
                                />
                                <span> {t("Yes")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="quality3"
                                  checked={
                                    detailprovider.sepexpwithkid == t("No")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      sepexpwithkid: t("No"),
                                    })
                                  }
                                />
                                <span> {t("No")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                    </div>
                    <span>{t("Please fill out all (*) required fields.")}</span>
                  </div>
                </div>
              </div>
              <div class="button text-center">
                <div class="pull-right">
                  <button class="btn" onClick={(e) => handleClose4()}>
                    {t("Back")}
                  </button>
                </div>
                <div class="pull-right">
                  <button
                    class="btn confirm"
                    onClick={(e) => {
                      if (
                        utorexperience > 0 &&
                        (qualifications.English ||
                          qualifications.Serbian ||
                          qualifications.Mathematics ||
                          qualifications.Physics ||
                          qualifications.Chemistry ||
                          qualifications.Other) &&
                        tutorusd.max > 5 &&
                        detailprovider.tutorintrestedonlinecls != "" &&
                        detailprovider.sepexpwithkid != ""
                      ) {
                        handleClose4();
                        profile_update(true);
                        setlivenow(true);
                      } else {
                        step4.map((e) => {
                          after_logins_field(e.name);
                        });
                      }
                    }}
                  >
                    {t("Finish")}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
export default Provider_profession_chnage;
