import React, { useState, useEffect } from "react";
import Calander from "./common/calander";
import DatePicker from "react-datepicker";
import { api } from "../../urls";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
function Profession_change(props) {
  const { t } = useTranslation("professionChange");
  const [showflogin, setShowflogin] = useState(false);
  const [show, setShow] = useState(false);
  const [nanny, setnanny] = useState(false);
  const [professional, setprofessional] = useState(false);
  const [teacher, setteacher] = useState(false);
  const [jobpost, setjobpost] = useState(false);
  const [tuter, settuter] = useState(false);
  const [livenow, setlivenow] = useState(false);
  const [disabled, setdisabled] = useState(0);
  var today = new Date();
  const handleClose1 = () => {
    setnanny(false);
    setqcount(qcount - 1);
  };
  const handleClose2 = () => {
    setqcount(qcount - 1);
    setprofessional(false);
  };
  const handleClose3 = () => {
    setqcount(qcount - 1);
    setteacher(false);
  };
  const handleClose4 = () => {
    setqcount(qcount - 1);
    settuter(false);
  };
  const handleClose5 = () => {
    setjobpost(false);
  };
  const handleCloselogin_first = () => {
    setShowflogin(false);
  };
  const [habit, sethabit] = useState({
    licence: "",
    kids: "",
    housework: "",
    family: "",
  });
  const [count, setcount] = useState(true);
  const [count2, setcount2] = useState(true);
  const [detail, setdetail] = useState({});
  const [describe, setdescribe] = useState({});
  const [newprofession, setnewprofession] = useState({});
  const handleClose = () => setShow(false);
  const [nonselect, setnonselect] = useState("");
  const [inactiveprofessional, setinactiveprofessional] = useState({});
  const [jobelete, setjobelete] = useState({});
  const [qcount, setqcount] = useState(0);
  const describeselect = (a, b) => {
    if (Object.keys(describe).length < 2) {
      setdescribe({ ...describe, [a]: b });
      Object.keys(detail.service_type).filter((e) => e == a)[0]
        ? setnewprofession({})
        : setnewprofession({ ...newprofession, [a]: b });
      setinactiveprofessional({ ...inactiveprofessional, [a]: b });
      setdetail({
        ...detail,
        service_type: { ...detail.service_type, [a]: b },
      });
      delete jobelete[a];
      setjobelete({ ...jobelete });
    } else {
      delete describe[a];
      setdescribe({ ...describe });
      delete inactiveprofessional[a];
      setinactiveprofessional({ ...inactiveprofessional });
      delete activeprofession[a];
      setactiveprofession({ ...activeprofession });
      delete detail.service_type[a];
      setdetail({ ...detail });
      delete newprofession[a];
      setnewprofession({ ...newprofession });
      setjobelete({ ...jobelete, [a]: b });
    }
  };
  const [errorfield, seterrorfield] = useState({
    nanyperhrrate: "",
    childtransportation: "",
    occasionaltraveling: "",
    lighthousework: "",
    cookingforkids: "",
    seperhrrate: "",
    tutorexp: "",
    seterhrrate: "",
    childneediep: "",
    tutorperhrrate: "",
    tutorliketoteach: "",
    tutorintrestedonlinecls: "",
    jobs: "",
    jobs_description: "",
    jobs2: "",
    jobs_description2: "",
    tutorstartdate2: "",
    liveinnany: "",
  });
  const [qualifications, setqualifications] = useState({
    English: "",
    Serbian: "",
    Mathematics: "",
    Physics: "",
    Chemistry: "",
    Other: "",
  });
  const [usd2, setusd2] = useState({
    min: 0,
    max: 0,
  });
  const [usd, setusd] = useState({
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

  const [detailparents, setdetailparents] = useState({
    nanyperhrrate: "",
    childtransportation: "",
    occasionaltraveling: "",
    lighthousework: "",
    cookingforkids: "",
    seperhrrate: "",
    tutorexp: "",
    seterhrrate: "",
    childneediep: "",
    tutorperhrrate: "",
    tutorliketoteach: "",
    tutorintrestedonlinecls: "",
    jobs: "",
    jobs_description: "",
    jobs2: "",
    jobs_description2: "",
    tutorstartdate2: "",
    liveinnany: "",
  });
  const [refresh, setrefresh] = useState("");
  const step1 = [
    { name: "cookingforkids" },
    { name: "lighthousework" },
    { name: "childtransportation" },
    { name: "occasionaltraveling" },
    { name: "tutorexp" },
    { name: "nanyperhrrate" },
    { name: "liveinnany" },
    { name: "tutorstartdate2" },
  ];
  const step2 = [
    { name: "tutorexp" },
    { name: "seperhrrate" },
    { name: "tutorstartdate2" },
  ];
  const step3 = [
    { name: "tutorexp" },
    { name: "seterhrrate" },
    { name: "childneediep" },
    { name: "tutorstartdate2" },
  ];
  const step4 = [
    { name: "tutorexp" },
    { name: "tutorperhrrate" },
    { name: "tutorliketoteach" },
    { name: "tutorintrestedonlinecls" },
    { name: "tutorstartdate2" },
  ];
  const step5 = [
    { name: "jobs" },
    { name: "jobs_description" },
    { name: "jobs2" },
    { name: "jobs_description2" },
  ];
  const [jobalready, setjobalready] = useState({
    tital: "",
    description: "",
    id: "",
    id2: "",
    plateformonsocialmedia: "Yes",
    plateformonsocialmedia2: "Yes",
    job_type: detail.service_type ? Object.values(detail.service_type)[0] : "",
    job_type2: detail.service_type ? Object.values(detail.service_type)[1] : "",
  });
  const after_logins_field = (name) => {
    setrefresh("");
    switch (name) {
      case "nanyperhrrate":
        errorfield.nanyperhrrate = usd.max == 0 ? "required" : "";
        break;

      case "childneediep":
        errorfield.childneediep =
          detailparents.childneediep == "" ? "required" : "";
        break;
      case "seterhrrate":
        errorfield.seterhrrate = usd3.max == 0 ? "required" : "";
        break;
      case "seperhrrate":
        errorfield.seperhrrate = usd4.max == 0 ? "required" : "";
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
          detailparents.tutorintrestedonlinecls == "" ? "required" : "";
        break;
      case "tutorperhrrate":
        errorfield.tutorperhrrate = usd2.max == 0 ? "required" : "";
        break;
      case "liveinnany":
        errorfield.liveinnany =
          detailparents.liveinnany == "" ? "required" : "";
        break;
      case "tutorstartdate2":
        errorfield.tutorstartdate2 =
          detailparents.tutorstartdate2 == "" ? "required" : "";
        break;
      case "tutorexp":
        errorfield.tutorexp = detailparents.tutorexp == "" ? "required" : "";
        break;
      case "occasionaltraveling":
        errorfield.occasionaltraveling = habit.family != "" ? "" : "required";
        break;
      case "cookingforkids":
        errorfield.cookingforkids = habit.kids == "" ? "required" : "";
        break;
      case "lighthousework":
        errorfield.lighthousework = habit.housework == "" ? "required" : "";
        break;
      case "childtransportation":
        errorfield.childtransportation = habit.licence == "" ? "required" : "";
        break;
      case "jobs":
        errorfield.jobs = detailparents.jobs == "" ? "required" : "";
        break;

      case "jobs_description":
        errorfield.jobs_description =
          detailparents.jobs_description == "" ? "required" : "";
        break;
      case "jobs2":
        errorfield.jobs2 = detailparents.jobs2 == "" ? "required" : "";
        break;
      case "jobs_description2":
        errorfield.jobs_description2 =
          detailparents.jobs_description2 == "" ? "required" : "";
        break;
      default:
        break;
    }
    seterrorfield(errorfield);
    setTimeout(() => {
      setdetail(detail);
      setrefresh(name);
    }, 900);
  };

  const [activeprofession, setactiveprofession] = useState({});

  const [jobfiletrf, setjobfiletrf] = useState([]);
  const describeselect2 = (a, b) => {
    console.log(inactiveprofessional);
    if (Object.keys(inactiveprofessional).length > 0) {
      Object.keys(inactiveprofessional).filter((e) => {
        if (e != a) {
          setinactiveprofessional({ ...inactiveprofessional, [a]: b });
          delete jobelete[a];
          setjobelete({ ...jobelete });
        } else {
          delete inactiveprofessional[a];
          delete describe[a];
          setTimeout(() => {
            setinactiveprofessional({ ...inactiveprofessional });
            setjobelete({ ...jobelete, [a]: b });
            setdescribe({ ...describe });
          }, 200);
        }
      });
    } else {
      setinactiveprofessional({ [a]: b });
    }
    console.log(inactiveprofessional, a, b);
  };
  const describeselectadd = (a, b) => {
    if (Object.keys(activeprofession).length > 0) {
      Object.keys(activeprofession).filter((e) => {
        if (e != a) {
          setactiveprofession({ [a]: b });
        } else {
          delete activeprofession[a];
          setTimeout(() => {
            setactiveprofession({ ...activeprofession });
          }, 200);
        }
      });
    } else {
      setactiveprofession({ [a]: b });
    }
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
        console.log(result.data);
        setdescribe(result.data.service_type);
        setinactiveprofessional(result.data.service_type);
        if (result.data?.job[0]) {
          setjobfiletrf(result.data?.job?.filter((e) => e.status == 0));
        }
        setTimeout(() => {
          const x = Object.keys(detailparents).forEach(function (key) {
            detailparents[key] =
              result.data[key] != null ? result.data[key] : "";
            setdetailparents({ ...detailparents });
          });
        }, 500);
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
        setusd2({
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
        sethabit({
          licence: result.data.childtransportation
            ? result.data.childtransportation
            : "",
          kids: result.data.cookingforkids ? result.data.cookingforkids : "",
          housework: result.data.lighthousework
            ? result.data.lighthousework
            : "",
          family: result.data.occasionaltraveling
            ? result.data.occasionaltraveling
            : "",
        });
        setqualifications(
          result.data.tutorliketoteach != null
            ? result.data.tutorliketoteach
            : {}
        );
        result.data.job[0]
          ? setTimeout(() => {
              // setdetailparents({ ...detailparents, jobs: result.data.job[0] && result.data.job[0].job_type == Object.values(activeprofession)[0] ? result.data.job[0].title : result.data.job[1] && result.data.job[1].job_type == Object.values(activeprofession)[0] ? result.data.job[1].title : "", jobs_description: result.data.job[0] && result.data.job[0].job_type == Object.values(activeprofession)[0] ? result.data.job[0].description : result.data.job[1] && result.data.job[1].job_type == Object.values(activeprofession)[0] ? result.data.job[1].description : "" })
              setjobalready({
                ...jobalready,
                id: result.data.job[0].id,
                id2: result.data.job[1] ? result.data.job[1].id : "",
                plateformonsocialmedia:
                  result.data.job[0].plateformonsocialmedia != ""
                    ? result.data.job[0].plateformonsocialmedia
                    : "Yes",
                plateformonsocialmedia2: result.data.job[1]
                  ? result.data.job[1].plateformonsocialmedia
                  : "",
              });
            }, 900)
          : setjobalready({ ...jobalready });
        console.log(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  const profile_update = (status) => {
    setdetailparents({
      ...detailparents,
      jobs:
        detail.job[0] &&
        detail.job[0].job_type == Object.values(activeprofession)[0]
          ? detail.job[0].title
          : detail.job[1] &&
            detail.job[1].job_type == Object.values(activeprofession)[0]
          ? detail.job[1].title
          : "",
      jobs_description:
        detail.job[0] &&
        detail.job[0].job_type == Object.values(activeprofession)[0]
          ? detail.job[0].description
          : detail.job[1] &&
            detail.job[1].job_type == Object.values(activeprofession)[0]
          ? detail.job[1].description
          : "",
    });

    // localStorage.setItem("search", "Profile")
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var formdata = new FormData();
    formdata.append("user_id", localStorage.getItem("id"));
    formdata.append("nanyperhrrate", usd.min + "-" + usd.max);
    detailparents.tutorexp == ""
      ? formdata.append("nanyperhrrate", usd.min + "-" + usd.max)
      : formdata.append("tutorexp", detailparents.tutorexp);
    formdata.append("occasionaltraveling", habit.family);
    formdata.append("cookingforkids", habit.kids);
    formdata.append("lighthousework", habit.housework);
    formdata.append("childtransportation", habit.licence);
    formdata.append("seterhrrate", usd3.min + "-" + usd3.max);
    formdata.append("seperhrrate", usd4.min + "-" + usd4.max);
    formdata.append("childneediep", detailparents.childneediep);
    formdata.append("tutorperhrrate", usd2.min + "-" + usd2.max);
    formdata.append("tutorliketoteach", JSON.stringify(qualifications));
    formdata.append(
      "tutorintrestedonlinecls",
      detailparents.tutorintrestedonlinecls
    );
    formdata.append("active_service", JSON.stringify(describe));
    formdata.append(
      "inactive_service",
      Object.keys(jobelete).length > 0 ? JSON.stringify(jobelete) : ""
    );
    detailparents.tutorstartdate2 == ""
      ? formdata.append("nanyperhrrate", usd.min + "-" + usd.max)
      : formdata.append("tutorstartdate", detailparents.tutorstartdate2);

    // detailparents.job.length == 1 &&
    if (jobpost && Object.keys(activeprofession).length > 0) {
      // if (jobfiletrf[0]?.job_type == Object.values(activeprofession)[0]) {
      detailparents.jobs != ""
        ? formdata.append("jobs[0][title]", detailparents.jobs)
        : formdata.append("about", detail.about);
      detailparents.jobs != ""
        ? formdata.append(
            "jobs[0][description]",
            detailparents.jobs_description
          )
        : formdata.append("about", detail.about);
      detailparents.jobs != ""
        ? formdata.append(
            "jobs[0][plateformonsocialmedia]",
            jobalready.plateformonsocialmedia
              ? jobalready.plateformonsocialmedia
              : "Yes"
          )
        : formdata.append("about", detail.about);
      detailparents.jobs != ""
        ? formdata.append(
            "jobs[0][job_type]",
            Object.values(activeprofession)[0]
          )
        : formdata.append("about", detail.about);

      jobfiletrf[0]?.job_type == Object.values(activeprofession)[0]
        ? formdata.append("jobs[0][job_id]", jobfiletrf[0]?.id)
        : jobfiletrf[1]?.job_type == Object.values(activeprofession)[0]
        ? formdata.append("jobs[0][job_id]", jobfiletrf[1]?.id)
        : formdata.append("about", detail.about);
    }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(api + "/api/v1/updateparents", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        profile_data();
        console.log(result);
        handleClose();
        // profile_data()
        setTimeout(() => {
          if (
            (activeprofession.tab1
              ? usd.max != 0
              : activeprofession.tab2
              ? usd3.max != 0
              : activeprofession.tab4
              ? usd2.max != 0
              : activeprofession.tab3
              ? usd4.max != 0
              : status) &&
            status == "preferences"
          ) {
            Object.keys(activeprofession).map((e) => {
              Object.keys(detail.active_service).map((a) => {
                if (a == e) {
                  if (status == "preferences") {
                    setjobpost(true);
                  }
                }
              });
            });
          } else {
            if (livenow != true && status != "final") {
              activeprofession.tab1 ? setnanny(true) : setnanny(false);
              activeprofession.tab2 ? setteacher(true) : setteacher(false);
              activeprofession.tab3
                ? setprofessional(true)
                : setprofessional(false);
              activeprofession.tab4 ? settuter(true) : settuter(false);
            }
          }
          if (
            Object.keys(activeprofession).length == qcount &&
            status &&
            Object.keys(activeprofession).length >= 0
          ) {
            setjobpost(true);
          } else {
            setqcount(qcount + 1);
          }
        }, 200);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const redirect = () => {
    window.location.href = "/search-providers";
    localStorage.removeItem("search");
  };
  useEffect(() => {
    if (count) {
      setcount(false);
      // profile_data()
    }
    console.log(detailparents.jobs, ">>>>>>>>>><?????????????????");
  }, [detail, activeprofession, errorfield, newprofession, jobelete, teacher]);
  return (
    <>
      {props.post ? (
        <button
          onClick={(e) => {
            profile_data();
            setShowflogin(true);
          }}
        >
          {props.post} {t("Job Post")}
        </button>
      ) : (
        <button
          onClick={(e) => {
            profile_data();
            setShowflogin(true);
          }}
        >
          {t("Job Post")}
          <img src={window.location.origin + "/images/jobpost.png"} />
        </button>
      )}

      {showflogin ? (
        <Modal
          show={showflogin}
          className="professional_select profchange"
          onHide={handleCloselogin_first}
        >
          <Modal.Body>
            <div className={"describe more_about "}>
              <img src={window.location.origin + "/images/sign_logo.svg"} />
              <h2>{t("It looks like you need a new service.")}</h2>
              {/* <p><span>I need </span> (Please select up to two professions) <br />Once you sign up, you can change your choice</p> */}
              <div className="process_guid ">
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
                    <div className="checkededit">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10Z"
                          fill="white"
                          stroke="#636363"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <input
                        type={"checkbox"}
                        onClick={(e) => {
                          if (e.target.value) {
                            describeselectadd("tab1", "Nanny");
                          }
                        }}
                        checked={
                          Object.keys(activeprofession).filter(
                            (e) => e == "tab1"
                          )[0]
                            ? true
                            : false
                        }
                        disabled={describe && describe.tab1 ? false : true}
                      />
                      <span></span>
                    </div>
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
                            if (e.target.checked) {
                              describeselect2("tab1", "Nanny");
                              describeselect("tab1", "Nanny");
                            } else {
                              setShow(true);
                              setdisabled(1);
                            }
                          }}
                          checked={
                            Object.keys(inactiveprofessional).filter(
                              (e) => e == "tab1"
                            )[0]
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
                    <div className="checkededit">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10Z"
                          fill="white"
                          stroke="#636363"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <input
                        type={"checkbox"}
                        onClick={(e) => {
                          if (e.target.value) {
                            describeselectadd(
                              "tab2",
                              "Special Education Teacher"
                            );
                          }
                        }}
                        checked={
                          Object.keys(activeprofession).filter(
                            (e) => e == "tab2"
                          )[0]
                            ? true
                            : false
                        }
                        disabled={describe && describe.tab2 ? false : true}
                      />
                      <span></span>
                    </div>
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
                            if (e.target.checked) {
                              describeselect2(
                                "tab2",
                                "Special Education Teacher"
                              );
                              describeselect(
                                "tab2",
                                "Special Education Teacher"
                              );
                            } else {
                              setShow(true);
                              setdisabled(2);
                            }
                          }}
                          checked={
                            Object.keys(inactiveprofessional).filter(
                              (e) => e == "tab2"
                            )[0]
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
                    <div className="checkededit">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10Z"
                          fill="white"
                          stroke="#636363"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <input
                        type={"checkbox"}
                        onClick={(e) => {
                          if (e.target.value) {
                            describeselectadd(
                              "tab3",
                              "Special Education Paraprofessional"
                            );
                          }
                        }}
                        checked={
                          Object.keys(activeprofession).filter(
                            (e) => e == "tab3"
                          )[0]
                            ? true
                            : false
                        }
                        disabled={describe && describe.tab3 ? false : true}
                      />
                      <span></span>
                    </div>
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
                            if (e.target.checked) {
                              describeselect2(
                                "tab3",
                                "Special Education Paraprofessional"
                              );
                              describeselect(
                                "tab3",
                                "Special Education Paraprofessional"
                              );
                            } else {
                              setShow(true);
                              setdisabled(3);
                            }
                          }}
                          checked={
                            Object.keys(inactiveprofessional).filter(
                              (e) => e == "tab3"
                            )[0]
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
                    <div className="checkededit">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10Z"
                          fill="white"
                          stroke="#636363"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <input
                        type={"checkbox"}
                        onClick={(e) => {
                          if (e.target.value) {
                            describeselectadd("tab4", "Tutor");
                          }
                        }}
                        checked={
                          Object.keys(activeprofession).filter(
                            (e) => e == "tab4"
                          )[0]
                            ? true
                            : false
                        }
                        disabled={describe && describe.tab4 ? false : true}
                      />
                      <span></span>
                    </div>
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
                            if (e.target.checked) {
                              describeselect2("tab4", "Tutor");
                              describeselect("tab4", "Tutor");
                            } else {
                              setShow(true);
                              setdisabled(4);
                            }
                          }}
                          checked={
                            Object.keys(inactiveprofessional).filter(
                              (e) => e == "tab4"
                            )[0]
                              ? true
                              : false
                          }
                        />
                        <span class="slideredit roundedit"></span>
                      </label>
                    </div>
                  </li>
                </ul>
                <p>
                  <svg
                    width="32"
                    height="16"
                    viewBox="0 0 32 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 0H8C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16H24C28.416 16 32 12.416 32 8C32 3.584 28.416 0 24 0Z"
                      fill="#A98D4B"
                    />
                    <path
                      d="M24.7995 13.5984C21.7008 13.5984 19.1995 11.0971 19.1995 7.99844C19.1995 4.89977 21.7008 2.39844 24.7995 2.39844C27.8981 2.39844 30.3995 4.89977 30.3995 7.99844C30.3995 11.0971 27.8981 13.5984 24.7995 13.5984Z"
                      fill="white"
                    />
                  </svg>
                  {t(
                    "Serves to deactivate a profession as only two professions can be active simultaneously"
                  )}
                </p>
                <p>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10Z"
                      fill="white"
                      stroke="#7D2B8B"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {t(
                    "Serves to select the profession for which you want to create a new job post"
                  )}
                </p>
                <div className="noteedit">
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
                      d="M7.99128 0C3.58009 0 0 3.584 0 8C0 12.416 3.58009 16 7.99128 16C12.4025 16 15.9826 12.416 15.9826 8C15.9826 3.584 12.4025 0 7.99128 0ZM8.76751 11.9984H7.16925V10.3984H8.76751V11.9984ZM7.16925 8.8H8.76751V4H7.16925V8.8Z"
                      fill="#7D2B8B"
                    />
                  </svg>
                  {t(
                    "Note: If you create a new job post for the profession that is currently active, you won’t have to deactivate it first. Just click on the circle within the profession"
                  )}
                </div>
              </div>
              <button className="back_sign" onClick={handleCloselogin_first}>
                {t("Cancel")}
              </button>
              <button
                className="back_sign"
                onClick={(e) => {
                  setTimeout(() => {
                    // activeprofession.tab1 ? setnanny(true) : setnanny(false);
                    // activeprofession.tab2 ? setteacher(true) : setteacher(false);
                    // activeprofession.tab3 ? setprofessional(true) : setprofessional(false);
                    // activeprofession.tab4 ? settuter(true) : settuter(false);
                  }, 500);

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
            <div className="promocode_content younger confirmchnage">
              <Link to="" onClick={handleClose}>
                +{" "}
              </Link>
              <h5>{t("Change the status of profession you’re looking for")}</h5>
              <p style={{ marginBottom: "0" }}>
                <b>
                  {t(
                    "This action will close an active job post and deactivate this profession on your profile."
                  )}
                </b>
              </p>
              <p>{t("Are you sure you want to continue?")}</p>
              <div class="button text-center">
                <div class="pull-right">
                  <button
                    class="btn"
                    onClick={(e) => {
                      if (disabled == 1) {
                        describeselect2("tab1", "Nanny");
                        describeselect("tab1", "Nanny");
                      } else if (disabled == 2) {
                        describeselect2("tab2", "Special Education Teacher");
                        describeselect("tab2", "Special Education Teacher");
                      } else if (disabled == 3) {
                        describeselect2(
                          "tab3",
                          "Special Education Paraprofessional"
                        );
                        describeselect(
                          "tab3",
                          "Special Education Paraprofessional"
                        );
                      } else if (disabled == 4) {
                        describeselect2("tab4", "Tutor");
                        describeselect("tab4", "Tutor");
                      }
                      handleClose();
                    }}
                  >
                    {t("Yes")}
                  </button>
                </div>
                <div class="pull-right">
                  <button class="btn confirm" onClick={handleClose}>
                    {t("No")}
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
              <img src={window.location.origin + "/images/sign_logo.svg"} />
              <h2>{t("Complete the Profile")}</h2>
              <p>{t("You can edit your info in settings section later")}</p>
              <div className="Profile_complete">
                <div className="detail preferences   work-experience job_performance setp3">
                  <div className="tutor parents">
                    <h2 className="border">
                      <img src={window.location.origin + "/images/tuter.svg"} />{" "}
                      {t("Tutor")}
                    </h2>
                    <div className="col-6 sideby">
                      <div className="form_group full">
                        <label>
                          {t("Preferred work experience")}
                          <span
                            className={
                              errorfield.tutorexp != "" ? "starred" : ""
                            }
                          >
                            *
                          </span>
                        </label>
                        <div class="select">
                          <select
                            value={
                              detailparents.tutorexp != ""
                                ? detailparents.tutorexp
                                : t("Choose from the list")
                            }
                            onChange={(e) => {
                              seterrorfield({ ...errorfield, tutorexp: "" });
                              setdetailparents({
                                ...detailparents,
                                tutorexp: e.target.value,
                              });
                            }}
                          >
                            <option disabled={true}>
                              {t("Choose from the list")}
                            </option>
                            <option value={"0 - 1 years"}>
                              {t("0 - 1 years")}
                            </option>
                            <option value={"1 - 2 years"}>
                              {t("1 - 2 years")}
                            </option>
                            <option value={"2 - 4 years"}>
                              {t("2 - 4 years")}
                            </option>
                            <option value={t("More than 4 years")}>
                              {t("More than 4 years")}
                            </option>
                          </select>
                        </div>
                        {/* <div className='errorfield'>{error.message}</div>*/}
                      </div>
                      <div className="form_group full">
                        <label>
                          {t("Rate per hour")}
                          {detail.country == "Serbia" ? "(RSD)" : "(USD)"}
                          <span
                            className={
                              errorfield.tutorperhrrate != "" ? "starred" : ""
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
                                      usd2.min >= 10
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 20 ||
                                      (usd2.max < 20 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 30 ||
                                      (usd2.max < 30 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 40 ||
                                      (usd2.max < 40 && usd2.max > 0)
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
                                      usd2.min >= 10
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 20 ||
                                      (usd2.max < 20 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 30 ||
                                      (usd2.max < 30 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 40 ||
                                      (usd2.max < 40 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.max < 50 && usd2.max != 0
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
                                value={usd2.min / 10}
                                onChange={(e) => {
                                  if (
                                    (usd2.max > 0 ? usd2.max : 60) >
                                    (e.target.value == 5
                                      ? 60
                                      : e.target.value * 10)
                                  ) {
                                    setusd2({
                                      ...usd2,
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
                                value={usd2.max == 0 ? 50 / 10 : usd2.max / 10}
                                onChange={(e) => {
                                  if (
                                    usd2.min <
                                    (e.target.value == 5
                                      ? 60
                                      : e.target.value * 10)
                                  ) {
                                    setusd2({
                                      ...usd2,
                                      max:
                                        e.target.value == 5
                                          ? 60
                                          : e.target.value * 10,
                                    });
                                    seterrorfield({
                                      ...errorfield,
                                      tutorperhrrate: "",
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
                                      usd2.min >= 10
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 20 ||
                                      (usd2.max < 20 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 30 ||
                                      (usd2.max < 30 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 40 ||
                                      (usd2.max < 40 && usd2.max > 0)
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
                                      usd2.min >= 10
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 20 ||
                                      (usd2.max < 20 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 30 ||
                                      (usd2.max < 30 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.min >= 40 ||
                                      (usd2.max < 40 && usd2.max > 0)
                                        ? { backgroundColor: "#E5E5E5" }
                                        : {}
                                    }
                                  ></li>
                                  <li
                                    style={
                                      usd2.max < 50 && usd2.max != 0
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
                                value={usd2.min / 10}
                                onChange={(e) => {
                                  if (
                                    (usd2.max > 0 ? usd2.max : 60) >
                                    (e.target.value == 5
                                      ? 60
                                      : e.target.value * 10)
                                  ) {
                                    setusd2({
                                      ...usd2,
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
                                value={usd2.max == 0 ? 50 / 10 : usd2.max / 10}
                                onChange={(e) => {
                                  if (
                                    usd2.min <
                                    (e.target.value == 5
                                      ? 60
                                      : e.target.value * 10)
                                  ) {
                                    setusd2({
                                      ...usd2,
                                      max:
                                        e.target.value == 5
                                          ? 60
                                          : e.target.value * 10,
                                    });
                                    seterrorfield({
                                      ...errorfield,
                                      tutorperhrrate: "",
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
                            ? usd2.min * 100 + " - " + usd2.max * 100
                            : usd2.min + " - " + usd2.max}
                        </span>
                        {/* <div className='errorfield'>{error.message}</div> */}
                      </div>
                      <div className="form_group full qualification">
                        <label>
                          {t("What classes you need a tutor for?")}
                          <span
                            className={
                              errorfield.tutorliketoteach != "" ? "starred" : ""
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
                                defaultChecked={
                                  qualifications.English == "English"
                                    ? true
                                    : false
                                }
                                onClick={(e) => {
                                  if (e.target.checked) {
                                    setqualifications({
                                      ...qualifications,
                                      English: "English",
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
                                defaultChecked={
                                  qualifications.Serbian == "Serbian"
                                    ? true
                                    : false
                                }
                                onClick={(e) => {
                                  if (e.target.checked) {
                                    setqualifications({
                                      ...qualifications,
                                      Serbian: "Serbian",
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
                                defaultChecked={
                                  qualifications.Mathematics == "Mathematics"
                                    ? true
                                    : false
                                }
                                onClick={(e) => {
                                  if (e.target.checked) {
                                    setqualifications({
                                      ...qualifications,
                                      Mathematics: "Mathematics",
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
                                defaultChecked={
                                  qualifications.Physics == "Physics"
                                    ? true
                                    : false
                                }
                                onClick={(e) => {
                                  if (e.target.checked) {
                                    setqualifications({
                                      ...qualifications,
                                      Physics: "Physics",
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
                                defaultChecked={
                                  qualifications.Chemistry == "Chemistry"
                                    ? true
                                    : false
                                }
                                onClick={(e) => {
                                  if (e.target.checked) {
                                    setqualifications({
                                      ...qualifications,
                                      Chemistry: "Chemistry",
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
                            <li className="aline">
                              <input
                                type="checkbox"
                                name=""
                                defaultChecked={
                                  qualifications.Other ? true : false
                                }
                              />
                              <span>
                                {t("Other")}{" "}
                                <input
                                  type="text"
                                  placeholder={t("Type here")}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setqualifications({
                                        ...qualifications,
                                        Other: e.target.value,
                                      });
                                    } else {
                                      setqualifications({
                                        ...qualifications,
                                        Other: "",
                                      });
                                    }
                                  }}
                                  defaultValue={
                                    qualifications.Other
                                      ? qualifications.Other
                                      : ""
                                  }
                                />
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="form_group full">
                        <label>
                          {t("I prefer online tutoring services")}
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
                                name="a1"
                                checked={
                                  detailparents.tutorintrestedonlinecls == "Yes"
                                    ? true
                                    : false
                                }
                                onClick={(e) =>
                                  setdetailparents({
                                    ...detailparents,
                                    tutorintrestedonlinecls: "Yes",
                                  })
                                }
                              />
                              <span> {t("Yes")}</span>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="a1"
                                checked={
                                  detailparents.tutorintrestedonlinecls == "No"
                                    ? true
                                    : false
                                }
                                onClick={(e) =>
                                  setdetailparents({
                                    ...detailparents,
                                    tutorintrestedonlinecls: "No",
                                  })
                                }
                              />
                              <span> {t("No")}</span>
                            </li>
                          </ul>
                        </div>
                        <br />
                        <br />

                        <label>
                          {t("Start date")}
                          <span
                            className={
                              errorfield.tutorstartdate2 != "" ? "starred" : ""
                            }
                          >
                            *
                          </span>
                        </label>
                        <div className="date_cal">
                          <span>
                            <svg
                              width="16"
                              height="18"
                              viewBox="0 0 16 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.3281 5.625H0.421875C0.189844 5.625 0 5.43516 0 5.20312V3.9375C0 3.00586 0.755859 2.25 1.6875 2.25H3.375V0.421875C3.375 0.189844 3.56484 0 3.79688 0H5.20312C5.43516 0 5.625 0.189844 5.625 0.421875V2.25H10.125V0.421875C10.125 0.189844 10.3148 0 10.5469 0H11.9531C12.1852 0 12.375 0.189844 12.375 0.421875V2.25H14.0625C14.9941 2.25 15.75 3.00586 15.75 3.9375V5.20312C15.75 5.43516 15.5602 5.625 15.3281 5.625ZM0.421875 6.75H15.3281C15.5602 6.75 15.75 6.93984 15.75 7.17188V16.3125C15.75 17.2441 14.9941 18 14.0625 18H1.6875C0.755859 18 0 17.2441 0 16.3125V7.17188C0 6.93984 0.189844 6.75 0.421875 6.75ZM4.5 13.9219C4.5 13.6898 4.31016 13.5 4.07812 13.5H2.67188C2.43984 13.5 2.25 13.6898 2.25 13.9219V15.3281C2.25 15.5602 2.43984 15.75 2.67188 15.75H4.07812C4.31016 15.75 4.5 15.5602 4.5 15.3281V13.9219ZM4.5 9.42188C4.5 9.18984 4.31016 9 4.07812 9H2.67188C2.43984 9 2.25 9.18984 2.25 9.42188V10.8281C2.25 11.0602 2.43984 11.25 2.67188 11.25H4.07812C4.31016 11.25 4.5 11.0602 4.5 10.8281V9.42188ZM9 13.9219C9 13.6898 8.81016 13.5 8.57812 13.5H7.17188C6.93984 13.5 6.75 13.6898 6.75 13.9219V15.3281C6.75 15.5602 6.93984 15.75 7.17188 15.75H8.57812C8.81016 15.75 9 15.5602 9 15.3281V13.9219ZM9 9.42188C9 9.18984 8.81016 9 8.57812 9H7.17188C6.93984 9 6.75 9.18984 6.75 9.42188V10.8281C6.75 11.0602 6.93984 11.25 7.17188 11.25H8.57812C8.81016 11.25 9 11.0602 9 10.8281V9.42188ZM13.5 13.9219C13.5 13.6898 13.3102 13.5 13.0781 13.5H11.6719C11.4398 13.5 11.25 13.6898 11.25 13.9219V15.3281C11.25 15.5602 11.4398 15.75 11.6719 15.75H13.0781C13.3102 15.75 13.5 15.5602 13.5 15.3281V13.9219ZM13.5 9.42188C13.5 9.18984 13.3102 9 13.0781 9H11.6719C11.4398 9 11.25 9.18984 11.25 9.42188V10.8281C11.25 11.0602 11.4398 11.25 11.6719 11.25H13.0781C13.3102 11.25 13.5 11.0602 13.5 10.8281V9.42188Z"
                                fill="#A98D4B"
                              />
                            </svg>
                          </span>
                          {/* <input type="date" min={String(fixdate)} max={"2099-06-30"} defaultValue={detailparents.tutorstartdate2 != null ? detailparents.tutorstartdate2 : ""} onChange={e => {
                                                seterrorfield({ ...errorfield, tutorstartdate2: "" })
                                                setdetailparents({ ...detailparents, tutorstartdate2: e.target.value })
                                            }} />*/}
                          <DatePicker
                            className={
                              errorfield.tutorstartdate2 != ""
                                ? "bordererror"
                                : ""
                            }
                            minDate={today}
                            selected={
                              detailparents.tutorstartdate2 != null &&
                              detailparents.tutorstartdate2 != ""
                                ? new Date(detailparents.tutorstartdate2)
                                : today
                            }
                            onChange={(date: Date) => {
                              seterrorfield({
                                ...errorfield,
                                tutorstartdate2: "",
                              });
                              setdetailparents({
                                ...detailparents,
                                tutorstartdate2:
                                  date.getFullYear() +
                                  "-" +
                                  String(date.getMonth() + 1).padStart(2, "0") +
                                  "-" +
                                  String(date.getDate()).padStart(2, "0"),
                              });
                            }}
                          />
                        </div>
                        {/* <div className='errorfield'>{error.message}</div>*/}
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
                        detailparents.tutorexp != "" &&
                        (qualifications.English ||
                          qualifications.Serbian ||
                          qualifications.Mathematics ||
                          qualifications.Physics ||
                          qualifications.Chemistry ||
                          qualifications.Other) &&
                        detailparents.tutorintrestedonlinecls != "" &&
                        usd2.max > 5 &&
                        detailparents.tutorstartdate2 != ""
                      ) {
                        // setqcount(qcount + 1)
                        handleClose4();
                        // setjobpost(true)
                        setTimeout(() => {
                          profile_update("preferences");
                        }, 400);
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
      {teacher ? (
        <Modal show={teacher} onHide={handleClose3} className="question_new">
          <Modal.Body>
            <div className="younger">
              {/* <Link to="" onClick={handleClose3}>+ </Link> */}
              <img src={window.location.origin + "/images/sign_logo.svg"} />
              <h2>{t("Complete the Profile")}</h2>
              <p>{t("You can edit your info in settings section later")}</p>
              <div className="Profile_complete">
                <div className="detail preferences   work-experience job_performance setp3">
                  <div className="tutor parents">
                    <h2 className="border">
                      <img
                        src={
                          window.location.origin +
                          "/images/special_education.svg"
                        }
                      />{" "}
                      {t("Special Education Teacher")}
                    </h2>
                    <div className="col-6 sideby">
                      <div className="form_group full">
                        <label>
                          {t("Preferred work experience")}
                          <span
                            className={
                              errorfield.tutorexp != "" ? "starred" : ""
                            }
                          >
                            *
                          </span>
                        </label>
                        <div class="select">
                          <select
                            value={
                              detailparents.tutorexp != ""
                                ? detailparents.tutorexp
                                : "Choose from the list"
                            }
                            onChange={(e) => {
                              seterrorfield({ ...errorfield, tutorexp: "" });
                              setdetailparents({
                                ...detailparents,
                                tutorexp: e.target.value,
                              });
                            }}
                          >
                            <option disabled={true}>
                              {t("Choose from the list")}
                            </option>
                            <option value={"0 - 1 years"}>
                              {t("0 - 1 years")}
                            </option>
                            <option value={"1 - 2 years"}>
                              {t("1 - 2 years")}
                            </option>
                            <option value={"2 - 4 years"}>
                              {t("2 - 4 years")}
                            </option>
                            <option value={t("More than 4 years")}>
                              {t("More than 4 years")}
                            </option>
                          </select>
                        </div>
                        {/* <div className='errorfield'>{error.message}</div>*/}
                      </div>

                      <div className="form_group full">
                        <label>
                          {t("Rate per hour")}
                          {detail.country == "Serbia" ? "(RSD)" : "(USD)"}
                          <span
                            className={
                              errorfield.seterhrrate != "" ? "starred" : ""
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
                                value={usd3.max == 0 ? 50 / 10 : usd3.max / 10}
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
                                    seterrorfield({
                                      ...errorfield,
                                      seterhrrate: "",
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
                                value={usd3.max == 0 ? 50 / 10 : usd3.max / 10}
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
                                    seterrorfield({
                                      ...errorfield,
                                      seterhrrate: "",
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
                      <div class="form_group full">
                        <label>
                          {t("Does your child need")} <a>{t("IEP")} </a>
                          <span class="smallpop">
                            {t("Education program")}
                          </span>{" "}
                          ?
                          <span
                            className={
                              errorfield.childneediep != "" ? "starred" : ""
                            }
                          >
                            *
                          </span>{" "}
                        </label>
                        <div class="checkbox create">
                          <ul
                            onClick={(e) =>
                              seterrorfield({ ...errorfield, childneediep: "" })
                            }
                          >
                            <li>
                              <input
                                type="radio"
                                name=""
                                onClick={(e) =>
                                  setdetailparents({
                                    ...detailparents,
                                    childneediep: "Yes",
                                  })
                                }
                                checked={
                                  detailparents.childneediep == "Yes"
                                    ? true
                                    : false
                                }
                              />
                              <span> {t("Yes")}</span>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name=""
                                onClick={(e) =>
                                  setdetailparents({
                                    ...detailparents,
                                    childneediep: "No",
                                  })
                                }
                                checked={
                                  detailparents.childneediep == "No"
                                    ? true
                                    : false
                                }
                              />
                              <span> {t("No")}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="form_group full">
                        <label>
                          {t("Start date")}
                          <span
                            className={
                              errorfield.tutorstartdate2 != "" ? "starred" : ""
                            }
                          >
                            *
                          </span>
                        </label>
                        <div className="date_cal">
                          <span>
                            <svg
                              width="16"
                              height="18"
                              viewBox="0 0 16 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.3281 5.625H0.421875C0.189844 5.625 0 5.43516 0 5.20312V3.9375C0 3.00586 0.755859 2.25 1.6875 2.25H3.375V0.421875C3.375 0.189844 3.56484 0 3.79688 0H5.20312C5.43516 0 5.625 0.189844 5.625 0.421875V2.25H10.125V0.421875C10.125 0.189844 10.3148 0 10.5469 0H11.9531C12.1852 0 12.375 0.189844 12.375 0.421875V2.25H14.0625C14.9941 2.25 15.75 3.00586 15.75 3.9375V5.20312C15.75 5.43516 15.5602 5.625 15.3281 5.625ZM0.421875 6.75H15.3281C15.5602 6.75 15.75 6.93984 15.75 7.17188V16.3125C15.75 17.2441 14.9941 18 14.0625 18H1.6875C0.755859 18 0 17.2441 0 16.3125V7.17188C0 6.93984 0.189844 6.75 0.421875 6.75ZM4.5 13.9219C4.5 13.6898 4.31016 13.5 4.07812 13.5H2.67188C2.43984 13.5 2.25 13.6898 2.25 13.9219V15.3281C2.25 15.5602 2.43984 15.75 2.67188 15.75H4.07812C4.31016 15.75 4.5 15.5602 4.5 15.3281V13.9219ZM4.5 9.42188C4.5 9.18984 4.31016 9 4.07812 9H2.67188C2.43984 9 2.25 9.18984 2.25 9.42188V10.8281C2.25 11.0602 2.43984 11.25 2.67188 11.25H4.07812C4.31016 11.25 4.5 11.0602 4.5 10.8281V9.42188ZM9 13.9219C9 13.6898 8.81016 13.5 8.57812 13.5H7.17188C6.93984 13.5 6.75 13.6898 6.75 13.9219V15.3281C6.75 15.5602 6.93984 15.75 7.17188 15.75H8.57812C8.81016 15.75 9 15.5602 9 15.3281V13.9219ZM9 9.42188C9 9.18984 8.81016 9 8.57812 9H7.17188C6.93984 9 6.75 9.18984 6.75 9.42188V10.8281C6.75 11.0602 6.93984 11.25 7.17188 11.25H8.57812C8.81016 11.25 9 11.0602 9 10.8281V9.42188ZM13.5 13.9219C13.5 13.6898 13.3102 13.5 13.0781 13.5H11.6719C11.4398 13.5 11.25 13.6898 11.25 13.9219V15.3281C11.25 15.5602 11.4398 15.75 11.6719 15.75H13.0781C13.3102 15.75 13.5 15.5602 13.5 15.3281V13.9219ZM13.5 9.42188C13.5 9.18984 13.3102 9 13.0781 9H11.6719C11.4398 9 11.25 9.18984 11.25 9.42188V10.8281C11.25 11.0602 11.4398 11.25 11.6719 11.25H13.0781C13.3102 11.25 13.5 11.0602 13.5 10.8281V9.42188Z"
                                fill="#A98D4B"
                              />
                            </svg>
                          </span>
                          {/* <input type="date" min={String(fixdate)} max={"2099-06-30"} defaultValue={detailparents.tutorstartdate2 != null ? detailparents.tutorstartdate2 : ""} onChange={e => {
                                                seterrorfield({ ...errorfield, tutorstartdate2: "" })
                                                setdetailparents({ ...detailparents, tutorstartdate2: e.target.value })
                                            }} />*/}
                          <DatePicker
                            className={
                              errorfield.tutorstartdate2 != ""
                                ? "bordererror"
                                : ""
                            }
                            minDate={today}
                            selected={
                              detailparents.tutorstartdate2 != null &&
                              detailparents.tutorstartdate2 != ""
                                ? new Date(detailparents.tutorstartdate2)
                                : today
                            }
                            onChange={(date: Date) => {
                              seterrorfield({
                                ...errorfield,
                                tutorstartdate2: "",
                              });
                              setdetailparents({
                                ...detailparents,
                                tutorstartdate2:
                                  date.getFullYear() +
                                  "-" +
                                  String(date.getMonth() + 1).padStart(2, "0") +
                                  "-" +
                                  String(date.getDate()).padStart(2, "0"),
                              });
                            }}
                          />
                        </div>
                        {/* <div className='errorfield'>{error.message}</div>*/}
                      </div>
                    </div>
                    <span>{t("Please fill out all (*) required fields.")}</span>
                  </div>
                </div>
              </div>
              <div class="button text-center">
                <div class="pull-right">
                  <button class="btn" onClick={(e) => handleClose3()}>
                    {t("Back")}
                  </button>
                </div>
                <div class="pull-right">
                  <button
                    class="btn confirm"
                    onClick={(e) => {
                      if (
                        detailparents.tutorexp != "" &&
                        usd3.max > 5 &&
                        detailparents.childneediep != "" &&
                        detailparents.tutorstartdate2 != ""
                      ) {
                        // setqcount(qcount + 1)
                        handleClose3();
                        // setjobpost(true)
                        setTimeout(() => {
                          profile_update("preferences");
                        }, 400);
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
      {professional ? (
        <Modal
          show={professional}
          onHide={handleClose2}
          className="question_new"
        >
          <Modal.Body>
            <div className="younger">
              {/* <Link to="" onClick={handleClose2}>+ </Link> */}
              <img src={window.location.origin + "/images/sign_logo.svg"} />
              <h2>{t("Complete the Profile")}</h2>
              <p>{t("You can edit your info in settings section later")}</p>
              <div className="Profile_complete">
                <div className="detail preferences   work-experience job_performance setp3">
                  <div className="tutor parents">
                    <h2 className="border">
                      <img
                        src={
                          window.location.origin + "/images/professional.svg"
                        }
                      />{" "}
                      {t("Special Education Paraprofessional")}
                    </h2>
                    <div className="col-6 sideby">
                      <div className="form_group full">
                        <label>
                          {t("Preferred work experience")}
                          <span
                            className={
                              errorfield.tutorexp != "" ? "starred" : ""
                            }
                          >
                            *
                          </span>
                        </label>
                        <div class="select">
                          <select
                            value={
                              detailparents.tutorexp != ""
                                ? detailparents.tutorexp
                                : "Choose from the list"
                            }
                            onChange={(e) => {
                              seterrorfield({ ...errorfield, tutorexp: "" });
                              setdetailparents({
                                ...detailparents,
                                tutorexp: e.target.value,
                              });
                            }}
                          >
                            <option disabled={true}>
                              {"Choose from the list"}
                            </option>
                            <option value={"0 - 1 years"}>
                              {t("0 - 1 years")}
                            </option>
                            <option value={"1 - 2 years"}>
                              {t("1 - 2 years")}
                            </option>
                            <option value={"2 - 4 years"}>
                              {t("2 - 4 years")}
                            </option>
                            <option value={t("More than 4 years")}>
                              {t("More than 4 years")}
                            </option>
                          </select>
                        </div>
                        {/* <div className='errorfield'>{error.message}</div>*/}
                      </div>
                      <div className="form_group full">
                        <label>
                          {t("Rate per hour")}
                          {detail.country == "Serbia" ? "(RSD)" : "(USD)"}
                          <span
                            className={
                              errorfield.seperhrrate != "" ? "starred" : ""
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
                                value={usd4.max == 0 ? 50 / 10 : usd4.max / 10}
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
                                    seterrorfield({
                                      ...errorfield,
                                      seperhrrate: "",
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
                                value={usd4.max == 0 ? 50 / 10 : usd4.max / 10}
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
                                    seterrorfield({
                                      ...errorfield,
                                      seperhrrate: "",
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
                      <div className="form_group full">
                        <label>
                          {t("Start date")}
                          <span
                            className={
                              errorfield.tutorstartdate2 != "" ? "starred" : ""
                            }
                          >
                            *
                          </span>
                        </label>
                        <div className="date_cal">
                          <span>
                            <svg
                              width="16"
                              height="18"
                              viewBox="0 0 16 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.3281 5.625H0.421875C0.189844 5.625 0 5.43516 0 5.20312V3.9375C0 3.00586 0.755859 2.25 1.6875 2.25H3.375V0.421875C3.375 0.189844 3.56484 0 3.79688 0H5.20312C5.43516 0 5.625 0.189844 5.625 0.421875V2.25H10.125V0.421875C10.125 0.189844 10.3148 0 10.5469 0H11.9531C12.1852 0 12.375 0.189844 12.375 0.421875V2.25H14.0625C14.9941 2.25 15.75 3.00586 15.75 3.9375V5.20312C15.75 5.43516 15.5602 5.625 15.3281 5.625ZM0.421875 6.75H15.3281C15.5602 6.75 15.75 6.93984 15.75 7.17188V16.3125C15.75 17.2441 14.9941 18 14.0625 18H1.6875C0.755859 18 0 17.2441 0 16.3125V7.17188C0 6.93984 0.189844 6.75 0.421875 6.75ZM4.5 13.9219C4.5 13.6898 4.31016 13.5 4.07812 13.5H2.67188C2.43984 13.5 2.25 13.6898 2.25 13.9219V15.3281C2.25 15.5602 2.43984 15.75 2.67188 15.75H4.07812C4.31016 15.75 4.5 15.5602 4.5 15.3281V13.9219ZM4.5 9.42188C4.5 9.18984 4.31016 9 4.07812 9H2.67188C2.43984 9 2.25 9.18984 2.25 9.42188V10.8281C2.25 11.0602 2.43984 11.25 2.67188 11.25H4.07812C4.31016 11.25 4.5 11.0602 4.5 10.8281V9.42188ZM9 13.9219C9 13.6898 8.81016 13.5 8.57812 13.5H7.17188C6.93984 13.5 6.75 13.6898 6.75 13.9219V15.3281C6.75 15.5602 6.93984 15.75 7.17188 15.75H8.57812C8.81016 15.75 9 15.5602 9 15.3281V13.9219ZM9 9.42188C9 9.18984 8.81016 9 8.57812 9H7.17188C6.93984 9 6.75 9.18984 6.75 9.42188V10.8281C6.75 11.0602 6.93984 11.25 7.17188 11.25H8.57812C8.81016 11.25 9 11.0602 9 10.8281V9.42188ZM13.5 13.9219C13.5 13.6898 13.3102 13.5 13.0781 13.5H11.6719C11.4398 13.5 11.25 13.6898 11.25 13.9219V15.3281C11.25 15.5602 11.4398 15.75 11.6719 15.75H13.0781C13.3102 15.75 13.5 15.5602 13.5 15.3281V13.9219ZM13.5 9.42188C13.5 9.18984 13.3102 9 13.0781 9H11.6719C11.4398 9 11.25 9.18984 11.25 9.42188V10.8281C11.25 11.0602 11.4398 11.25 11.6719 11.25H13.0781C13.3102 11.25 13.5 11.0602 13.5 10.8281V9.42188Z"
                                fill="#A98D4B"
                              />
                            </svg>
                          </span>
                          {/* <input type="date" min={String(fixdate)} max={"2099-06-30"} defaultValue={detailparents.tutorstartdate2 != null ? detailparents.tutorstartdate2 : ""} onChange={e => {
                                                seterrorfield({ ...errorfield, tutorstartdate2: "" })
                                                setdetailparents({ ...detailparents, tutorstartdate2: e.target.value })
                                            }} />*/}
                          <DatePicker
                            className={
                              errorfield.tutorstartdate2 != ""
                                ? "bordererror"
                                : ""
                            }
                            minDate={today}
                            selected={
                              detailparents.tutorstartdate2 != null &&
                              detailparents.tutorstartdate2 != ""
                                ? new Date(detailparents.tutorstartdate2)
                                : today
                            }
                            onChange={(date: Date) => {
                              seterrorfield({
                                ...errorfield,
                                tutorstartdate2: "",
                              });
                              setdetailparents({
                                ...detailparents,
                                tutorstartdate2:
                                  date.getFullYear() +
                                  "-" +
                                  String(date.getMonth() + 1).padStart(2, "0") +
                                  "-" +
                                  String(date.getDate()).padStart(2, "0"),
                              });
                            }}
                          />
                        </div>
                        {/* <div className='errorfield'>{error.message}</div>*/}
                      </div>
                    </div>
                    <span>{t("Please fill out all (*) required fields.")}</span>
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
                        detailparents.tutorexp != "" &&
                        usd4.max > 5 &&
                        detailparents.tutorstartdate2 != ""
                      ) {
                        // setqcount(qcount + 1)
                        handleClose2();
                        // setjobpost(true)
                        setTimeout(() => {
                          profile_update("preferences");
                        }, 400);
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
              <img src={window.location.origin + "/images/sign_logo.svg"} />
              <h2>{t("Complete the Profile")}</h2>
              <p>{t("You can edit your info in settings section later")}</p>
              <div className="Profile_complete">
                <div className="detail additional_info info_parents preferences   work-experience job_performance setp3">
                  <div className="tutor parents">
                    <h2 className="border">
                      <img
                        src={window.location.origin + "/images/nany_pur.svg"}
                      />{" "}
                      {t("Nanny")}
                    </h2>
                    <div className="col-6">
                      <div className="iconsec">
                        <div className="form_group full">
                          <label>
                            {t("Live in nanny?")}
                            <span
                              className={
                                errorfield.liveinnany != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="checkbox">
                            <ul
                              onClick={(e) =>
                                seterrorfield({ ...errorfield, liveinnany: "" })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="quality"
                                  onClick={(e) =>
                                    setdetailparents({
                                      ...detailparents,
                                      liveinnany: "Yes",
                                    })
                                  }
                                  checked={
                                    detailparents.liveinnany == "Yes"
                                      ? true
                                      : false
                                  }
                                />
                                <span> {t("Yes")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="quality"
                                  onClick={(e) =>
                                    setdetailparents({
                                      ...detailparents,
                                      liveinnany: "No",
                                    })
                                  }
                                  checked={
                                    detailparents.liveinnany == "No"
                                      ? true
                                      : false
                                  }
                                />
                                <span> {t("No")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                        <div className="icon ">
                          <div
                            className="form_group"
                            style={{ marginBottom: "0" }}
                          >
                            <label>
                              {t("I need")}
                              <span
                                className={
                                  errorfield.childtransportation != "" ||
                                  errorfield.occasionaltraveling != "" ||
                                  errorfield.lighthousework != "" ||
                                  errorfield.cookingforkids != ""
                                    ? "starred"
                                    : ""
                                }
                              >
                                *
                              </span>
                            </label>
                          </div>
                          <ul>
                            <li
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  childtransportation: "",
                                })
                              }
                            >
                              {t("Child transportation")}
                              <div className="icons">
                                <svg
                                  className={
                                    habit.licence == "false" ? "active" : ""
                                  }
                                  onClick={(e) =>
                                    sethabit({ ...habit, licence: "false" })
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
                                seterrorfield({
                                  ...errorfield,
                                  occasionaltraveling: "",
                                })
                              }
                            >
                              {t("Occasional traveling")}
                              <div className="icons">
                                <svg
                                  className={
                                    habit.family == "false" ? "active" : ""
                                  }
                                  onClick={(e) =>
                                    sethabit({ ...habit, family: "false" })
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
                                  cookingforkids: "",
                                })
                              }
                            >
                              {t("Cooking for kids")}
                              <div className="icons">
                                <svg
                                  className={
                                    habit.kids == "false" ? "active" : ""
                                  }
                                  onClick={(e) =>
                                    sethabit({ ...habit, kids: "false" })
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
                          </ul>
                        </div>
                      </div>
                      <div className="rightsec">
                        <div className="form_group full">
                          <label>
                            {t("Preferred work experience")}
                            <span
                              className={
                                errorfield.tutorexp != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div class="select">
                            <select
                              value={
                                detailparents.tutorexp != ""
                                  ? detailparents.tutorexp
                                  : "Choose from the list"
                              }
                              onChange={(e) => {
                                seterrorfield({ ...errorfield, tutorexp: "" });
                                setdetailparents({
                                  ...detailparents,
                                  tutorexp: e.target.value,
                                });
                              }}
                            >
                              <option disabled={true}>
                                {t("Choose from the list")}
                              </option>
                              <option value={"0 - 1 years"}>
                                {t("0 - 1 years")}
                              </option>
                              <option value={"1 - 2 years"}>
                                {t("1 - 2 years")}
                              </option>
                              <option value={"2 - 4 years"}>
                                {t("2 - 4 years")}
                              </option>
                              <option value={t("More than 4 years")}>
                                {t("More than 4 years")}
                              </option>
                            </select>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
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
                                      seterrorfield({
                                        ...errorfield,
                                        nanyperhrrate: "",
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
                                      seterrorfield({
                                        ...errorfield,
                                        nanyperhrrate: "",
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

                        <div className="form_group full">
                          <label>
                            {t("Start date")}
                            <span
                              className={
                                errorfield.tutorstartdate2 != ""
                                  ? "starred"
                                  : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="date_cal">
                            <span>
                              <svg
                                width="16"
                                height="18"
                                viewBox="0 0 16 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.3281 5.625H0.421875C0.189844 5.625 0 5.43516 0 5.20312V3.9375C0 3.00586 0.755859 2.25 1.6875 2.25H3.375V0.421875C3.375 0.189844 3.56484 0 3.79688 0H5.20312C5.43516 0 5.625 0.189844 5.625 0.421875V2.25H10.125V0.421875C10.125 0.189844 10.3148 0 10.5469 0H11.9531C12.1852 0 12.375 0.189844 12.375 0.421875V2.25H14.0625C14.9941 2.25 15.75 3.00586 15.75 3.9375V5.20312C15.75 5.43516 15.5602 5.625 15.3281 5.625ZM0.421875 6.75H15.3281C15.5602 6.75 15.75 6.93984 15.75 7.17188V16.3125C15.75 17.2441 14.9941 18 14.0625 18H1.6875C0.755859 18 0 17.2441 0 16.3125V7.17188C0 6.93984 0.189844 6.75 0.421875 6.75ZM4.5 13.9219C4.5 13.6898 4.31016 13.5 4.07812 13.5H2.67188C2.43984 13.5 2.25 13.6898 2.25 13.9219V15.3281C2.25 15.5602 2.43984 15.75 2.67188 15.75H4.07812C4.31016 15.75 4.5 15.5602 4.5 15.3281V13.9219ZM4.5 9.42188C4.5 9.18984 4.31016 9 4.07812 9H2.67188C2.43984 9 2.25 9.18984 2.25 9.42188V10.8281C2.25 11.0602 2.43984 11.25 2.67188 11.25H4.07812C4.31016 11.25 4.5 11.0602 4.5 10.8281V9.42188ZM9 13.9219C9 13.6898 8.81016 13.5 8.57812 13.5H7.17188C6.93984 13.5 6.75 13.6898 6.75 13.9219V15.3281C6.75 15.5602 6.93984 15.75 7.17188 15.75H8.57812C8.81016 15.75 9 15.5602 9 15.3281V13.9219ZM9 9.42188C9 9.18984 8.81016 9 8.57812 9H7.17188C6.93984 9 6.75 9.18984 6.75 9.42188V10.8281C6.75 11.0602 6.93984 11.25 7.17188 11.25H8.57812C8.81016 11.25 9 11.0602 9 10.8281V9.42188ZM13.5 13.9219C13.5 13.6898 13.3102 13.5 13.0781 13.5H11.6719C11.4398 13.5 11.25 13.6898 11.25 13.9219V15.3281C11.25 15.5602 11.4398 15.75 11.6719 15.75H13.0781C13.3102 15.75 13.5 15.5602 13.5 15.3281V13.9219ZM13.5 9.42188C13.5 9.18984 13.3102 9 13.0781 9H11.6719C11.4398 9 11.25 9.18984 11.25 9.42188V10.8281C11.25 11.0602 11.4398 11.25 11.6719 11.25H13.0781C13.3102 11.25 13.5 11.0602 13.5 10.8281V9.42188Z"
                                  fill="#A98D4B"
                                />
                              </svg>
                            </span>
                            {/* <input type="date" min={String(fixdate)} max={"2099-06-30"} defaultValue={detailparents.tutorstartdate2 != null ? detailparents.tutorstartdate2 : ""} onChange={e => {
                                                seterrorfield({ ...errorfield, tutorstartdate2: "" })
                                                setdetailparents({ ...detailparents, tutorstartdate2: e.target.value })
                                            }} />*/}
                            <DatePicker
                              className={
                                errorfield.tutorstartdate2 != ""
                                  ? "bordererror"
                                  : ""
                              }
                              minDate={today}
                              selected={
                                detailparents.tutorstartdate2 != null &&
                                detailparents.tutorstartdate2 != ""
                                  ? new Date(detailparents.tutorstartdate2)
                                  : today
                              }
                              onChange={(date: Date) => {
                                seterrorfield({
                                  ...errorfield,
                                  tutorstartdate2: "",
                                });
                                setdetailparents({
                                  ...detailparents,
                                  tutorstartdate2:
                                    date.getFullYear() +
                                    "-" +
                                    String(date.getMonth() + 1).padStart(
                                      2,
                                      "0"
                                    ) +
                                    "-" +
                                    String(date.getDate()).padStart(2, "0"),
                                });
                              }}
                            />
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
                  <button class="btn" onClick={(e) => handleClose1()}>
                    {t("Back")}
                  </button>
                </div>
                <div class="pull-right">
                  <button
                    class="btn confirm"
                    onClick={(e) => {
                      if (
                        detailparents.tutorexp != "" &&
                        usd.max > 5 &&
                        habit.licence &&
                        habit.family &&
                        habit.housework &&
                        habit.kids &&
                        detailparents.liveinnany != "" &&
                        detailparents.tutorstartdate2 != ""
                      ) {
                        // setqcount(qcount + 1)
                        handleClose1();
                        // setjobpost(true)
                        setTimeout(() => {
                          profile_update("preferences");
                        }, 400);
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
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {jobpost ? (
        <Modal
          show={jobpost}
          onHide={(e) => {
            handleClose5();
            window.location.reload();
          }}
          className="question_new jobs"
        >
          <Modal.Body>
            <div className="younger">
              <Link
                to=""
                onClick={(e) => {
                  handleClose5();
                  window.location.reload();
                }}
              >
                +{" "}
              </Link>
              <br></br>
              <p>
                <b>{t("Create new Job post")}</b>
              </p>
              <div className="Profile_complete">
                <div className="detail work-experience job_performance job_post setp4">
                  {activeprofession &&
                  Object.keys(activeprofession).length == 2 ? (
                    <>
                      <div className="form_group full">
                        <label>
                          <strong>
                            {t("Details for ")}{" "}
                            {t(Object.values(activeprofession)[1])}
                            {t("position")}
                          </strong>
                        </label>
                        <br />
                        <label>
                          {t("Job post title")}
                          <span
                            className={errorfield.jobs2 != "" ? "starred" : ""}
                          >
                            *
                          </span>
                        </label>
                        <textarea
                          rows={2}
                          placeholder={t(
                            "Hello, we are a family of three and we love outdoor activities. We also have an adorable cat."
                          )}
                          maxlength="70"
                          name="message"
                          onChange={(e) => {
                            seterrorfield({ ...errorfield, jobs2: "" });
                            setjobalready({
                              ...jobalready,
                              job_type2: Object.values(activeprofession)[1],
                            });
                            setdetailparents({
                              ...detailparents,
                              jobs2: e.target.value,
                            });
                          }}
                          defaultValue={detailparents.jobs2}
                        ></textarea>
                        {/* <div className='errorfield'>{error.message}</div>*/}
                        <span>
                          {t("Number of characters")}
                          {70 -
                            (detailparents.jobs2 != ""
                              ? detailparents.jobs2.length
                              : 0)}
                        </span>
                      </div>
                      <div className="form_group full sec">
                        <label>
                          {t("Job description")}
                          <span
                            className={
                              errorfield.jobs_description2 != ""
                                ? "starred"
                                : ""
                            }
                          >
                            *
                          </span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder={
                            activeprofession
                              ? Object.keys(activeprofession)[1] == "tab1"
                                ? t(
                                    "My name is Jelena and I am looking for a reliable, responsible and passionate nanny for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. Nanny would care for my son when I run errands, help with meal preparation for him and take him to the local park (walking distance). We need a nanny for Monday through Friday from 8 A.M. to 12 P.M."
                                  )
                                : Object.keys(activeprofession)[1] == "tab2"
                                ? t(
                                    "My name is Jelena and I am looking for a reliable, responsible and passionate special education teacher to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills."
                                  )
                                : Object.keys(activeprofession)[1] == "tab3"
                                ? t(
                                    "My name is Jelena and I am looking for a reliable, responsible and passionate special education paraprofessional to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills and possibly accompany him to the school"
                                  )
                                : Object.keys(activeprofession)[1] == "tab4"
                                ? t(
                                    "My name is Jelena and I am looking for a reliable, responsible and experienced English tutor for my 9-year-old son. Our son needs help in reading and writing. Also, we are open for online classes."
                                  )
                                : ""
                              : ""
                          }
                          maxlength="300"
                          name="message"
                          onChange={(e) => {
                            seterrorfield({
                              ...errorfield,
                              jobs_description2: "",
                            });
                            setdetailparents({
                              ...detailparents,
                              jobs_description2: e.target.value,
                            });
                          }}
                          defaultValue={detailparents.jobs_description2}
                        ></textarea>
                        {/* <div className='errorfield'>{error.message}</div>*/}
                        <span>
                          {t("Number of characters")}
                          {300 - detailparents.jobs_description2.length}
                        </span>
                      </div>

                      <div class="form_group full socialpost border">
                        <label>
                          {t(
                            "  I give my consent for this job to be shared by SensCare platform on social media"
                          )}
                          <span
                            className={
                              jobalready.plateformonsocialmedia2 == ""
                                ? "starred"
                                : ""
                            }
                          >
                            *
                          </span>
                        </label>
                        <div class="checkbox create">
                          <ul>
                            <li style={{ width: "25% !important" }}>
                              <input
                                type="radio"
                                name="ke"
                                onClick={(e) =>
                                  setjobalready({
                                    ...jobalready,
                                    plateformonsocialmedia2: "Yes",
                                  })
                                }
                                checked={
                                  jobalready.plateformonsocialmedia2 == "Yes"
                                    ? true
                                    : false
                                }
                              />
                              <span> {t("Yes")}</span>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="ke"
                                onClick={(e) =>
                                  setjobalready({
                                    ...jobalready,
                                    plateformonsocialmedia2: "No",
                                  })
                                }
                                checked={
                                  jobalready.plateformonsocialmedia2 == "No"
                                    ? true
                                    : false
                                }
                              />
                              <span> {t("No")}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="form_group full">
                    <label>
                      <strong>
                        {t("Details ")}
                        {activeprofession
                          ? t(Object.values(activeprofession)[0])
                          : ""}{" "}
                        {t("position")}
                      </strong>
                    </label>
                    <br />
                    <label>
                      {t("Job post title")}
                      <span className={errorfield.jobs != "" ? "starred" : ""}>
                        *
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder={
                        
                         t("Experienced ") +
                         (activeprofession
                           ? t(Object.values(activeprofession)[0])
                           : "") +
                         t(" with 10 years of experience")
                      }
                      maxlength="70"
                      name="message"
                      onChange={(e) => {
                        seterrorfield({ ...errorfield, jobs: "" });
                        setdetailparents({
                          ...detailparents,
                          jobs: e.target.value,
                        });
                        setjobalready({
                          ...jobalready,
                          job_type: Object.values(activeprofession)[0],
                        });
                      }}
                      defaultValue={
                        detail.job[0] &&
                        detail.job[0].job_type ==
                          Object.values(activeprofession)[0]
                          ? detailparents.jobs
                          : detail.job[1] &&
                            detail.job[1].job_type ==
                              Object.values(activeprofession)[0]
                          ? detailparents.jobs
                          : ""
                      }
                    ></textarea>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                    
                    <span>
                      {t("Number of characters")}
                      {70 -
                        (typeof detailparents.jobs != "number"
                          ? detailparents.jobs.length
                          : 0)}
                    </span>
                  </div>
                  
                  <div className="form_group full sec">
                    <label>
                      {t("Job description")}
                      <span
                        className={
                          errorfield.jobs_description != "" ? "starred" : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder={
                        activeprofession
                          ? Object.keys(activeprofession)[1] == "tab1"
                            ? t(
                                "My name is Jelena and I am looking for a reliable, responsible and passionate nanny for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. Nanny would care for my son when I run errands, help with meal preparation for him and take him to the local park (walking distance). We need a nanny for Monday through Friday from 8 A.M. to 12 P.M."
                              )
                            : Object.keys(activeprofession)[1] == "tab2"
                            ? t(
                                "My name is Jelena and I am looking for a reliable, responsible and passionate special education teacher to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills."
                              )
                            : Object.keys(activeprofession)[1] == "tab3"
                            ? t(
                                "My name is Jelena and I am looking for a reliable, responsible and passionate special education paraprofessional to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills and possibly accompany him to the school"
                              )
                            : Object.keys(activeprofession)[1] == "tab4"
                            ? t(
                                "My name is Jelena and I am looking for a reliable, responsible and experienced English tutor for my 9-year-old son. Our son needs help in reading and writing. Also, we are open for online classes."
                              )
                            : ""
                          : ""
                      }
                      
                      maxlength="300"
                      name="message"
                      onChange={(e) => {
                        seterrorfield({ ...errorfield, jobs_description: "" });
                        setdetailparents({
                          ...detailparents,
                          jobs_description: e.target.value,
                        });
                      }}
                      defaultValue={
                        detail.job[0] &&
                        detail.job[0].job_type ==
                          Object.values(activeprofession)[0]
                          ? detailparents.jobs_description
                          : detail.job[1] &&
                            detail.job[1].job_type ==
                              Object.values(activeprofession)[0]
                          ? detailparents.jobs_description
                          : ""
                      }
                    ></textarea>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                    <span>
                      {t("Number of characters")}
                      {300 - detailparents.jobs_description.length}
                    </span>
                  </div>
                  <div className="job_note" id="job_note">
                    <svg
                      width="15"
                      height="17"
                      viewBox="0 0 15 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.4 2L9 0H0V17H2V10H7.6L8 12H15V2H9.4Z"
                        fill="#7D2B8B"
                      />
                    </svg>
                    <p>
                      {t(
                        " Your old profile information will be applied to this job post, too. "
                      )}
                      <br />
                      {t("Please update your profile")}
                      <Link
                        to="/search-parents/Profile"
                        onClick={(e) => {
                          localStorage.setItem("edittime", "editall");
                          localStorage.setItem("search", "Profile");
                        }}
                        target={"_blank"}
                      >
                        {t(" here")}
                      </Link>{" "}
                      {t("if you have had some changes in the meantime.")}
                    </p>
                  </div>
                  <div class="form_group full socialpost ">
                    <label>
                      {t(
                        " I give my consent for this job to be shared by SensCare platform on social media"
                      )}
                      <span
                        className={
                          jobalready.plateformonsocialmedia == ""
                            ? "starred"
                            : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <div class="checkbox create">
                      <ul>
                        <li style={{ width: "25% !important" }}>
                          <input
                            type="radio"
                            name="e"
                            onClick={(e) =>
                              setjobalready({
                                ...jobalready,
                                plateformonsocialmedia: "Yes",
                              })
                            }
                            checked={
                              jobalready.plateformonsocialmedia == "Yes"
                                ? true
                                : false
                            }
                          />
                          <span> {t("Yes")}</span>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="e"
                            onClick={(e) =>
                              setjobalready({
                                ...jobalready,
                                plateformonsocialmedia: "No",
                              })
                            }
                            checked={
                              jobalready.plateformonsocialmedia == "No"
                                ? true
                                : false
                            }
                          />
                          <span> {t("No")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* && jobalready.plateformonsocialmedia*/}
                </div>
              </div>
              <div class="button text-center">
                <div class="pull-right">
                  <button class="btn" onClick={(e) => handleClose5()}>
                    {t("Back")}
                  </button>
                </div>
                <div class="pull-right">
                  <button
                    class="btn confirm"
                    onClick={(e) => {
                      if (
                        detailparents.jobs != "" &&
                        detailparents.jobs_description != "" &&
                        (activeprofession &&
                        Object.keys(activeprofession).length == 2
                          ? detailparents.jobs2 != "" &&
                            detailparents.jobs_description2 != "" &&
                            jobalready.plateformonsocialmedia2 &&
                            jobalready.plateformonsocialmedia
                          : detailparents.jobs != "")
                      ) {
                        setcount2(false);
                        setTimeout(() => {
                          handleClose5();
                          profile_update("final");
                          setlivenow(true);
                        }, 1000);
                      } else {
                        step5.map((e) => {
                          after_logins_field(e.name);
                        });
                        window.scrollTo({ top: 0 });
                      }
                    }}
                  >
                    {t("Publish")}
                  </button>
                </div>
              </div>
              <br />
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {livenow ? (
        <Modal show={livenow} onHide={(e) => window.location.reload()}>
          <Modal.Body>
            <div className="promocode_content login_first">
              <Link to="" onClick={(e) => window.location.reload()}>
                +{" "}
              </Link>
              <h2>{t("Congratulations! Your post is live now.")}</h2>
              <img
                src={window.location.origin + "/images/create_profile.png"}
              />
              <p className="pro">
                {t(
                  "SensCare wishes you to find the best provider! See your post"
                )}
                <Link
                  to="/search-parents/job-post"
                  target="_blank"
                  onClick={(e) => {
                    localStorage.setItem("search", "job_post");
                    localStorage.removeItem("search2", "Job_history");
                  }}
                >
                  {t("here")}
                </Link>
                .
              </p>
              <button onClick={redirect}>{t("Search for candidates")}</button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
export default Profession_change;
