import React, { useState, useEffect } from "react";
import Calander from "./common/calander";
import Footer from "./common/footer";
import Header from "./common/header";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { country } from "./common/country";
import { api } from "../../urls";
import DatePicker from "react-datepicker";
import { FacebookProvider, LoginButton } from "react-facebook";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

function Create_parent_profile() {
  const { t, i18n } = useTranslation("createParentProfile");
  const language = i18n.language;
  const [showflogin, setShowflogin] = useState(false);
  const [refresh, setrefresh] = useState("");
  const [detail, setdetail] = useState({});
  const [error, seterror] = useState({
    phone: "",
  });
  const [dis, setdis] = useState(false);
  const [otp, setotp] = useState("");
  const [count, setcount] = useState(true);
  const [range, setrange] = useState(0);
  const [children, setchildren] = useState(0);
  const [calandertype, setcalandertype] = useState(0);
  const [stap, setstap] = useState(1);
  const [process, setprocess] = useState(10);
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
  const [mobile, setmobile] = useState(0);
  const [usd2, setusd2] = useState({
    min: 0,
    max: 0,
  });
  const [qualifications, setqualifications] = useState({
    English: "",
    Serbian: "",
    Mathematics: "",
    Physics: "",
    Chemistry: "",
    Other: "",
  });
  const [oralspeak, setoralspeak] = useState({
    English: "",
    Spanish: "",
    French: "",
    Chinese: "",
    German: "",
    Italian: "",
    Other: "",
  });
  const [habit, sethabit] = useState({
    licence: "",
    kids: "",
    housework: "",
    family: "",
  });
  const stapset = (e) => {
    setstap(e);
    e == 1
      ? setprocess(14)
      : e == 2
      ? setprocess(29)
      : e == 3
      ? setprocess(43)
      : e == 4
      ? setprocess(57)
      : e == 5
      ? setprocess(71)
      : e == 6
      ? setprocess(86)
      : e == 7
      ? setprocess(100)
      : setprocess(10);
  };
  const [selectcat, setselectcat] = useState([]);

  const [children_age, setchildren_age] = useState([]);
  const [catopen, setcatopen] = useState(true);

  var today = new Date();
  var fixdate =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  const calender_data = (name, e) => {
    setdetailparents({ ...detailparents, [name]: e });
    seterrorfield({ ...errorfield, [name]: "" });
  };
  const handleCloselogin_first = () => {
    setShowflogin(false);
  };
  const redirect = () => {
    window.location.href = "/search-providers";
  };

  const [setcode, setsetcode] = useState(true);
  const codeselect = () => {
    if (setcode) {
      setsetcode(false);
    } else {
      setsetcode(true);
    }
  };
  const [contact_code, setcontact_code] = useState({
    code: "",
    flag: "",
  });

  const selectoption2 = (data) => {
    let sum = false;
    children_age.map((e, index) => {
      if (e.name == data) {
        sum = true;
        children_age.splice(index, 1);
      }
    });
    if (sum == false) {
      children_age.push({ name: data });
    }
    setTimeout(() => {
      setchildren_age([...children_age]);
    }, 500);
  };
  const selectoption = (data) => {
    let sum = false;
    selectcat?.map((e, index) => {
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
  const [errorfield, seterrorfield] = useState({
    about: "",
    video: "",
    file_path: "",
    childneedcareno: "",
    childage: "",
    childsocialneed: "",
    yourkidallapplicable: "",
    childneediep: "",
    childmedicalcondition: "",
    childmedicaldescription: "",
    childanyallergies: "",
    childallergiesdescription: "",
    liveinnany: "",
    nanyperhrrate: "",
    tutorliketoteach: "",
    tutorintrestedonlinecls: "",
    tutorperhrrate: "",
    tutorexp: "",
    tutorstartdate: "",
    tutorintrestedin: "",
    preferredageofprovider: "",
    fulltime: "",
    beforeschool: "",
    afterschool: "",
    weekends: "",
    overnight: "",
    candidatespeaks: "",
    occasionaltraveling: "",
    cookingforkids: "",
    lighthousework: "",
    preferredcountry: "",
    childtransportation: "",
    workingabroad: "",
    preferredcity: "",
    phone: "",
    jobs: "",
    jobs_description: "",
    jobs2: "",
    jobs_description2: "",
    seperhrrate: "",
    seterhrrate: "",
  });

  console.log(errorfield.childage, "CHILDAGE");
  const [detailparents, setdetailparents] = useState({
    about: "",
    video: "",
    file_path: "",
    childneedcareno: "",
    childage: "",
    childsocialneed: "",
    yourkidallapplicable: "",
    childneediep: "",
    childmedicalcondition: "",
    childmedicaldescription: "",
    childanyallergies: "",
    childallergiesdescription: "",
    liveinnany: "",
    nanyperhrrate: "",
    tutorliketoteach: "",
    tutorintrestedonlinecls: "",
    tutorperhrrate: "",
    tutorexp: "",
    tutorstartdate: "",
    tutorintrestedin: "",
    preferredageofprovider: "",
    countrycode: "",
    fulltime: {},
    beforeschool: {},
    afterschool: {},
    weekends: {},
    overnight: {},
    candidatespeaks: "",
    occasionaltraveling: "",
    cookingforkids: "",
    lighthousework: "",
    preferredcountry: "",
    childtransportation: "",
    workingabroad: "",
    preferredcity: "",
    facebookverify: "",
    twitterverify: "",
    linkdinverify: "",
    instaverify: "",
    phone: "",
    jobs: "",
    jobs_description: "",
    jobs2: "",
    jobs_description2: "",

    seperhrrate: "",
    seterhrrate: "",
  });
  const [veri, setveri] = useState("");

  const profile_update = (a) => {
    setdis(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var formdata = new FormData();
    formdata.append("user_id", localStorage.getItem("id"));
    formdata.append("about", detailparents.about);
    detailparents.video.name
      ? formdata.append("video", detailparents.video)
      : formdata.append("about", detailparents.about);
    detailparents.file_path.name
      ? formdata.append("file_path", detailparents.file_path)
      : formdata.append("about", detailparents.about);
    formdata.append("childneedcareno", children);
    formdata.append("childage", JSON.stringify(selectcat));
    formdata.append("childsocialneed", detailparents.childsocialneed);
    formdata.append("yourkidallapplicable", JSON.stringify(children_age));
    formdata.append("childneediep", detailparents.childneediep);
    formdata.append(
      "childmedicalcondition",
      detailparents.childmedicalcondition
    );
    formdata.append(
      "childmedicaldescription",
      detailparents.childmedicaldescription
    );
    formdata.append("childanyallergies", detailparents.childanyallergies);
    formdata.append(
      "childallergiesdescription",
      detailparents.childallergiesdescription
    );
    formdata.append("liveinnany", detailparents.liveinnany);
    formdata.append("nanyperhrrate", usd.min + "-" + usd.max);
    formdata.append("tutorliketoteach", JSON.stringify(qualifications));
    formdata.append(
      "tutorintrestedonlinecls",
      detailparents.tutorintrestedonlinecls
    );
    formdata.append("tutorperhrrate", usd2.min + "-" + usd2.max);
    formdata.append("tutorexp", detailparents.tutorexp);
    formdata.append("tutorstartdate", detailparents.tutorstartdate);
    formdata.append("tutorintrestedin", detailparents.tutorintrestedin);
    formdata.append(
      "preferredageofprovider",
      detailparents.preferredageofprovider
    );
    formdata.append("fulltime", JSON.stringify(detailparents.fulltime));
    formdata.append("beforeschool", JSON.stringify(detailparents.beforeschool));
    formdata.append("afterschool", JSON.stringify(detailparents.afterschool));
    formdata.append("weekends", JSON.stringify(detailparents.weekends));
    formdata.append("overnight", JSON.stringify(detailparents.overnight));
    formdata.append("candidatespeaks", JSON.stringify(oralspeak));
    formdata.append("occasionaltraveling", habit.family);
    formdata.append("workingabroad", detailparents.workingabroad);
    formdata.append("cookingforkids", habit.kids);
    formdata.append(
      "countrycode",
      contact_code.code != "" ? contact_code.code : detailparents.countrycode
    );
    formdata.append("lighthousework", habit.housework);
    formdata.append("childtransportation", habit.licence);
    formdata.append("preferredcountry", detailparents.preferredcountry);
    formdata.append("preferredcity", detailparents.preferredcity);
    formdata.append("facebookverify", detailparents.facebookverify);
    formdata.append("twitterverify", detailparents.twitterverify);
    formdata.append("linkdinverify", detailparents.linkdinverify);
    formdata.append("instaverify", detailparents.instaverify);
    detailparents.jobs != ""
      ? formdata.append("jobs[0][title]", detailparents.jobs)
      : formdata.append("about", detail.about);
    detailparents.jobs != ""
      ? formdata.append("jobs[0][description]", detailparents.jobs_description)
      : formdata.append("about", detail.about);
    detailparents.jobs != ""
      ? formdata.append(
          "jobs[0][plateformonsocialmedia]",
          jobalready.plateformonsocialmedia
        )
      : formdata.append("about", detail.about);
    detailparents.jobs != ""
      ? formdata.append(
          "jobs[0][job_type]",
          Object.values(detail.service_type)[0]
        )
      : formdata.append("about", detail.about);
    detailparents.jobs != ""
      ? formdata.append("jobs[0][job_id]", jobalready.id)
      : formdata.append("about", detail.about);
    detailparents.jobs2 != ""
      ? formdata.append("jobs[1][title]", detailparents.jobs2)
      : formdata.append("about", detail.about);
    detailparents.jobs_description2 != ""
      ? formdata.append("jobs[1][description]", detailparents.jobs_description2)
      : formdata.append("about", detail.about);

    jobalready.id2 != ""
      ? formdata.append("jobs[1][job_id]", jobalready.id2)
      : formdata.append("about", detail.about);
    detailparents.jobs2 != ""
      ? formdata.append(
          "jobs[1][job_type]",
          Object.values(detail.service_type)[1]
        )
      : formdata.append("about", detail.about);
    detailparents.jobs2 != ""
      ? formdata.append(
          "jobs[1][plateformonsocialmedia]",
          jobalready.plateformonsocialmedia2
        )
      : formdata.append("about", detail.about);
    formdata.append("step", stap + 1);
    formdata.append("seterhrrate", usd3.min + "-" + usd3.max);
    formdata.append("seperhrrate", usd4.min + "-" + usd4.max);
    if (a == true) {
      formdata.append("profilecompletestatus", "1");
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
        if (result.success == true && stap == 7) {
          setShowflogin(true);
        }
        setdis(false);
      })
      .catch((error) => {
        setdis(false);
        console.log("error", error);
      });
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
        setTimeout(() => {
          const x = Object.keys(detailparents).forEach(function (key) {
            detailparents[key] =
              result.data[key] != null ? result.data[key] : "";
            setdetailparents({ ...detailparents });
          });
        }, 500);
        setchildren(result.data.childneedcareno);
        setselectcat(result.data.childage != null ? result.data.childage : []);
        setchildren_age(
          result.data.yourkidallapplicable != null
            ? result.data.yourkidallapplicable
            : []
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
        setqualifications(
          result.data.tutorliketoteach != null
            ? result.data.tutorliketoteach
            : {}
        );
        setoralspeak(
          result.data.candidatespeaks != null
            ? result.data.candidatespeaks
            : { ...oralspeak }
        );
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
        result.data.job[0]
          ? setTimeout(() => {
              setdetailparents({
                ...detailparents,
                jobs: result.data.job[0].title,
                jobs_description: result.data.job[0].description,
                jobs2: result.data.job[1].title ? result.data.job[1].title : "",
                jobs_description2: result.data.job[1].description
                  ? result.data.job[1].description
                  : "",
              });
              setjobalready({
                ...jobalready,
                id: result.data.job[0].id,
                id2: result.data.job[1].id ? result.data.job[1].id : "",
                plateformonsocialmedia:
                  result.data.job[0].plateformonsocialmedia != ""
                    ? result.data.job[0].plateformonsocialmedia
                    : "Yes",
                plateformonsocialmedia2: result.data.job[1]
                  .plateformonsocialmedia
                  ? result.data.job[1].plateformonsocialmedia
                  : "Yes",
              });
            }, 900)
          : setjobalready({ ...jobalready });
        setstap(
          result.data.step != null
            ? parseInt(result.data.step) <= 7
              ? result.data.job[0].plateformonsocialmedia
                ? 1
                : parseInt(result.data.step)
              : 1
            : 1
        );
      })
      .catch((error) => console.log("error", error));
  };
  const mobileverify = () => {
    if (detailparents.phone.length > 9) {
      setdis(true);
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        phonenoforverify:
          contact_code.code != ""
            ? contact_code.code + detailparents.phone
            : "+" + detailparents.countrycode + detailparents.phone,
        phone: detailparents.phone,
        countrycode:
          contact_code.code != ""
            ? contact_code.code
            : detailparents.countrycode,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(api + "/api/v1/sendotp", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setdis(false);
          console.log(result);
        })
        .catch((error) => {
          setdis(false);
          console.log("error", error);
        });
    } else {
      seterror({
        ...error,
        phone: "error",
      });
    }
  };
  const [failed, setfailed] = useState(0);
  const otpverify = () => {
    if (otp.length > 3) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        phonetoken: otp,
        phone: detailparents.phone,
        countrycode:
          contact_code.code != ""
            ? contact_code.code
            : detailparents.countrycode,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(api + "/api/v1/verifyotp", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setveri(result.success ? "done" : "");
          setfailed(failed + 1);
          result.success == true
            ? (document.getElementById("success").style.display = "block")
            : (document.getElementById("success").style.display = "none");
          result.message == "failed" && failed == 0
            ? (document.getElementById("success4").style.display = "block")
            : (document.getElementById("success4").style.display = "none");
          result.message == "failed" && failed == 1
            ? (document.getElementById("success3").style.display = "block")
            : (document.getElementById("success3").style.display = "none");
        })
        .catch((error) => console.log("error", error));
    } else {
      seterror({
        ...error,
        otperror: "error",
      });
    }
  };
  const after_logins_field = (name) => {
    setrefresh();
    switch (name) {
      case "about":
        errorfield.about = detailparents.about == "" ? "required" : "";
        break;
      case "video":
        errorfield.video = detailparents.video != "" ? "" : "required";

        break;
      case "file_path":
        errorfield.file_path = detailparents.file_path != "" ? "" : "required";
        break;
      case "childneedcareno":
        errorfield.childneedcareno =
          children == 0 || children == null ? "required" : "";
        break;
      case "childage":
        errorfield.childage = selectcat[0] ? "" : "required";
        break;
      case "childsocialneed":
        errorfield.childsocialneed =
          detailparents.childsocialneed == "" ? "required" : "";
        break;
      case "yourkidallapplicable":
        errorfield.yourkidallapplicable = children_age[0] ? "" : "required";
        break;
      case "childneediep":
        errorfield.childneediep =
          detailparents.childneediep == "" ? "required" : "";
        break;
      case "childmedicalcondition":
        errorfield.childmedicalcondition =
          detailparents.childmedicalcondition == "" ? "required" : "";
        break;
      case "childmedicaldescription":
        errorfield.childmedicaldescription =
          detailparents.childmedicaldescription == "" ? "required" : "";
        break;
      case "childanyallergies":
        errorfield.childanyallergies =
          detailparents.childanyallergies == "" ? "required" : "";
        break;
      case "childallergiesdescription":
        errorfield.childallergiesdescription =
          detailparents.childallergiesdescription == "" ? "required" : "";
        break;
      case "liveinnany":
        errorfield.liveinnany =
          detailparents.liveinnany == "" ? "required" : "";
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
      case "tutorexp":
        errorfield.tutorexp = detailparents.tutorexp == "" ? "required" : "";
        break;
      case "tutorstartdate":
        errorfield.tutorstartdate =
          detailparents.tutorstartdate == "" ? "required" : "";
        break;
      case "tutorintrestedin":
        errorfield.tutorintrestedin =
          detailparents.tutorintrestedin == "" ? "required" : "";
        break;
      case "preferredageofprovider":
        errorfield.preferredageofprovider =
          detailparents.preferredageofprovider == "" ? "required" : "";
        break;
      case "fulltime":
        errorfield.fulltime = detailparents.fulltime == "" ? "required" : "";
        break;
      case "beforeschool":
        errorfield.beforeschool =
          detailparents.beforeschool == "" ? "required" : "";
        break;
      case "afterschool":
        errorfield.afterschool =
          detailparents.afterschool == "" ? "required" : "";
        break;
      case "weekends":
        errorfield.weekends = detailparents.weekends == "" ? "required" : "";
        break;
      case "overnight":
        errorfield.overnight = detailparents.overnight == "" ? "required" : "";
        break;
      case "candidatespeaks":
        errorfield.candidatespeaks =
          oralspeak.English != "" ||
          oralspeak.Spanish != "" ||
          oralspeak.French != "" ||
          oralspeak.Chinese != "" ||
          oralspeak.German != "" ||
          oralspeak.Italian != "" ||
          oralspeak.Other != ""
            ? ""
            : "required";
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
      case "preferredcountry":
        errorfield.preferredcountry =
          detailparents.preferredcountry == "" ? "required" : "";
        break;
      case "childtransportation":
        errorfield.childtransportation = habit.licence == "" ? "required" : "";
        break;
      case "workingabroad":
        errorfield.workingabroad =
          detailparents.workingabroad == "" ? "required" : "";
        break;
      case "preferredcity":
        errorfield.preferredcity =
          detailparents.preferredcity == "" ? "required" : "";
        break;
      case "phone":
        errorfield.phone = detailparents.phone == "" ? "required" : "";
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
      window.scrollTo({ top: 0 });
    }, 900);
    setTimeout(() => {
      setdetail(detail);
      setrefresh(name.split());
      window.scrollTo({ top: 0 });
    }, 1500);
  };
  const step1 = [{ name: "about" }, { name: "file_path" }];
  const step2 = [
    { name: "childneedcareno" },
    { name: "childage" },
    { name: "childsocialneed" },
    { name: "yourkidallapplicable" },
    { name: "childneediep" },
    { name: "childmedicalcondition" },
    { name: "childmedicaldescription" },
    { name: "childanyallergies" },
    { name: "childallergiesdescription" },
  ];
  const step3 = [
    { name: "liveinnany" },
    { name: "tutorintrestedonlinecls" },
    { name: "tutorexp" },
    { name: "preferredageofprovider" },
    { name: "tutorstartdate" },
    { name: "tutorintrestedin" },
    { name: "nanyperhrrate" },
    { name: "tutorliketoteach" },
    { name: "tutorperhrrate" },
    { name: "setallapplicable" },
    { name: "setexpmethods" },
    { name: "setexpiep" },
    { name: "setyearexp" },
    { name: "sepexpwithkid" },
    { name: "sepallapplicable" },
    { name: "sepexpmethods" },
    { name: "sepworkexp" },
    { name: "seperhrrate" },
    { name: "seterhrrate" },
  ];
  const step4 = [
    { name: "fulltime" },
    { name: "beforeschool" },
    { name: "afterschool" },
    { name: "weekends" },
    { name: "overnight" },
  ];
  const step5 = [
    { name: "candidatespeaks" },
    { name: "cookingforkids" },
    { name: "lighthousework" },
    { name: "childtransportation" },
    { name: "occasionaltraveling" },
    { name: "workingabroad" },
    { name: "preferredcountry" },
    { name: "preferredcity" },
  ];
  const step7 = [
    { name: "jobs" },
    { name: "jobs_description" },
    { name: "jobs2" },
    { name: "jobs_description2" },
  ];
  useEffect(() => {
    if (count) {
      profile_data();
      setcount(false);
      localStorage.getItem("user_type") == "parents"
        ? localStorage.getItem("user_type")
        : window.location.replace("/complete-provider-profile");
    }

    console.log(oralspeak, errorfield, children, jobalready);
  }, [detail, detailparents, errorfield, refresh, jobalready]);
  const handleResponse = (data) => {
    setdetailparents({ ...detailparents, facebookverify: true });
    
  };

  const handleError = (error) => {
    console.log({ error });
  };
  return (
    <>
      <Header page={"proile"} />
      <div className="container-fluid">
        <div className="container">
          <div className="Profile_complete">
            <div className="left">
              <div className="stop">
                <h3>
                  {t("Profile progress")} <span>{process}%</span>
                </h3>
                <span>
                  <div class="progress">
                    <div class="color" style={{ width: process + "%" }}></div>
                  </div>
                </span>
              </div>
              <div
                class={
                  "progress-circle" +
                  " " +
                  "p" +
                  process +
                  " " +
                  (process > 50 ? "over50" : "")
                }
              >
                <span>{process}%</span>
                <div class="left-half-clipper">
                  <div class="first50-bar"></div>
                  <div class="value-bar"></div>
                </div>
              </div>
              <ul
                style={
                  window.screen.width < 767
                    ? { transform: "translateX(" + mobile + "% )" }
                    : {}
                }
              >
                <li
                  onClick={(e) => {
                    if (
                      detail.job[0].plateformonsocialmedia &&
                      detail.job[0].plateformonsocialmedia
                    ) {
                      setstap(1);
                    }
                  }}
                  className={stap == 1 ? "active" : stap >= 1 ? "active2" : ""}
                >
                  <span></span>
                  <p>{t("About you")}</p>
                </li>
                <li
                  onClick={(e) => {
                    if (
                      detail.job[0].plateformonsocialmedia &&
                      detail.job[0].plateformonsocialmedia
                    ) {
                      setstap(2);
                    }
                  }}
                  className={stap == 2 ? "active" : stap >= 2 ? "active2" : ""}
                >
                  <span></span>
                  <p>{t("Your kids")}</p>
                </li>
                <li
                  onClick={(e) => {
                    if (
                      detail.job[0].plateformonsocialmedia &&
                      detail.job[0].plateformonsocialmedia
                    ) {
                      setstap(3);
                    }
                  }}
                  className={stap == 3 ? "active" : stap >= 3 ? "active2" : ""}
                >
                  <span></span>
                  <p>{t("Job Preferences")}</p>
                </li>
                <li
                  onClick={(e) => {
                    if (
                      detail.job[0].plateformonsocialmedia &&
                      detail.job[0].plateformonsocialmedia
                    ) {
                      setstap(4);
                      setTimeout(() => {
                        setcalandertype(1);
                      }, 500);
                    }
                  }}
                  className={stap == 4 ? "active" : stap >= 4 ? "active2" : ""}
                >
                  <span></span>
                  <p>{t("Availability")}</p>
                </li>
                <li
                  onClick={(e) => {
                    if (
                      detail.job[0].plateformonsocialmedia &&
                      detail.job[0].plateformonsocialmedia
                    ) {
                      setstap(5);
                    }
                  }}
                  className={stap == 5 ? "active" : stap >= 5 ? "active2" : ""}
                >
                  <span></span>
                  <p>{t("Additional Info")}</p>
                </li>
                <li
                  onClick={(e) => {
                    if (
                      detail.job[0].plateformonsocialmedia &&
                      detail.job[0].plateformonsocialmedia
                    ) {
                      setstap(6);
                    }
                  }}
                  className={stap == 6 ? "active" : stap >= 6 ? "active2" : ""}
                >
                  <span></span>
                  <p>{t("Security and Verification")}</p>
                </li>
                <li
                  onClick={(e) => {
                    if (
                      detail.job[0].plateformonsocialmedia &&
                      detail.job[0].plateformonsocialmedia
                    ) {
                      setstap(7);
                    }
                  }}
                  className={stap == 7 ? "active" : stap >= 7 ? "active2" : ""}
                >
                  <span></span>
                  <p>{t("My Job Post")}</p>
                </li>
              </ul>
            </div>
            <div className="right">
              <div
                className="detail parents1 stap1"
                style={stap == 1 ? {} : { display: "none" }}
              >
                <h2 className="border">
                  {t("Welcome")}{" "}
                  <span>{detail.first_name + " " + detail.last_name}</span>,
                  {t("please complete your profile")}
                </h2>
                <span>{t("Please fill out all (*) required fields.")}</span>
                <div className="form_group full">
                  <label>
                    {t("Tell us more about yourself and your family")}
                    <span className={errorfield.about != "" ? "starred" : ""}>
                      *
                    </span>
                  </label>
                  <textarea
                    className={errorfield.about != "" ? "bordererror" : ""}
                    rows={2}
                    placeholder={t(
                      "Hello, we are a family of three and we love outdoor activities. We also have an adorable cat."
                    )}
                    maxlength="150"
                    name="message"
                    defaultValue={detailparents.about}
                    onChange={(e) => {
                      setdetailparents({
                        ...detailparents,
                        about: e.target.value,
                      });
                      seterrorfield({ ...errorfield, about: "" });
                    }}
                  ></textarea>
                  {/* <div className='errorfield'>{error.message}</div>*/}
                  <span>
                    {t("Number of characters")}{" "}
                    {150 - detailparents.about.length}
                  </span>
                </div>

                <div className="form_group second">
                  <label>
                    {t("Upload your profile")} <a>{t("picture")} </a>
                    <span className="smallpop">
                      <strong>{t("Premium")}</strong>{" "}
                      {t("members may upload more photos later.")}
                    </span>
                    <span
                      className={errorfield.file_path != "" ? "starred" : ""}
                    >
                      *
                    </span>
                  </label>
                  <div className="upload">
                    <input
                      type="file"
                      placeholder={t("Choose file")}
                      onChange={(e) => {
                        seterrorfield({ ...errorfield, file_path: "" });
                        setdetailparents({
                          ...detailparents,
                          file_path: e.target.files[0],
                        });
                      }}
                      accept="image/*"
                    />
                    <span
                      className={
                        errorfield.file_path != "" ? "bordererror" : ""
                      }
                    >
                      {detailparents.file_path != ""
                        ? detailparents.file_path.name
                          ? detailparents.file_path.name
                          : detailparents.file_path
                        : t("Choose file")}
                    </span>
                    <button>
                      <svg
                        width="17"
                        height="20"
                        viewBox="0 0 17 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.909091 9.09091C1.41117 9.09091 1.81818 9.49792 1.81818 10V17.2727C1.81818 17.5138 1.91396 17.7451 2.08445 17.9156C2.25494 18.086 2.48617 18.1818 2.72727 18.1818H13.6364C13.8775 18.1818 14.1087 18.086 14.2792 17.9156C14.4497 17.7451 14.5455 17.5138 14.5455 17.2727V10C14.5455 9.49792 14.9525 9.09091 15.4545 9.09091C15.9566 9.09091 16.3636 9.49792 16.3636 10V17.2727C16.3636 17.996 16.0763 18.6897 15.5648 19.2012C15.0534 19.7127 14.3597 20 13.6364 20H2.72727C2.00395 20 1.31026 19.7127 0.7988 19.2012C0.287337 18.6897 0 17.996 0 17.2727V10C0 9.49792 0.407014 9.09091 0.909091 9.09091Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.53899 0.266267C7.89402 -0.0887555 8.46962 -0.0887555 8.82464 0.266267L12.461 3.90263C12.816 4.25765 12.816 4.83326 12.461 5.18828C12.106 5.5433 11.5304 5.5433 11.1754 5.18828L8.18182 2.19474L5.18828 5.18828C4.83326 5.5433 4.25765 5.5433 3.90263 5.18828C3.54761 4.83326 3.54761 4.25765 3.90263 3.90263L7.53899 0.266267Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.18182 1.35465e-08C8.6839 1.35465e-08 9.09091 0.407014 9.09091 0.909091V12.7273C9.09091 13.2294 8.6839 13.6364 8.18182 13.6364C7.67974 13.6364 7.27273 13.2294 7.27273 12.7273V0.909091C7.27273 0.407014 7.67974 1.35465e-08 8.18182 1.35465e-08Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* <div className='errorfield'>{error.message}</div>*/}
                </div>
                <div className="form_group third">
                  <label>
                    {t("Upload short")} <a>{t("video")} </a>
                    <span className="smallpop">
                      {t("This feature is available for")}{" "}
                      <strong>{t("Premium")}</strong> {t("members")}.
                    </span>{" "}
                    {t("of yourself or your family")}
                  </label>
                  <div className="upload">
                    <input
                      type="file"
                      placeholder={t("Choose file")}
                      onChange={(e) =>
                        setdetailparents({
                          ...detailparents,
                          video: e.target.files[0],
                        })
                      }
                      accept="video/*"
                    />
                    <span
                      className={errorfield.video != "" ? "bordererror" : ""}
                    >
                      {detailparents.video != ""
                        ? detailparents.video.name
                          ? detailparents.video.name
                          : detailparents.video
                        : t("Choose file")}
                    </span>
                    <button>
                      <svg
                        width="17"
                        height="20"
                        viewBox="0 0 17 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.909091 9.09091C1.41117 9.09091 1.81818 9.49792 1.81818 10V17.2727C1.81818 17.5138 1.91396 17.7451 2.08445 17.9156C2.25494 18.086 2.48617 18.1818 2.72727 18.1818H13.6364C13.8775 18.1818 14.1087 18.086 14.2792 17.9156C14.4497 17.7451 14.5455 17.5138 14.5455 17.2727V10C14.5455 9.49792 14.9525 9.09091 15.4545 9.09091C15.9566 9.09091 16.3636 9.49792 16.3636 10V17.2727C16.3636 17.996 16.0763 18.6897 15.5648 19.2012C15.0534 19.7127 14.3597 20 13.6364 20H2.72727C2.00395 20 1.31026 19.7127 0.7988 19.2012C0.287337 18.6897 0 17.996 0 17.2727V10C0 9.49792 0.407014 9.09091 0.909091 9.09091Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.53899 0.266267C7.89402 -0.0887555 8.46962 -0.0887555 8.82464 0.266267L12.461 3.90263C12.816 4.25765 12.816 4.83326 12.461 5.18828C12.106 5.5433 11.5304 5.5433 11.1754 5.18828L8.18182 2.19474L5.18828 5.18828C4.83326 5.5433 4.25765 5.5433 3.90263 5.18828C3.54761 4.83326 3.54761 4.25765 3.90263 3.90263L7.53899 0.266267Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.18182 1.35465e-08C8.6839 1.35465e-08 9.09091 0.407014 9.09091 0.909091V12.7273C9.09091 13.2294 8.6839 13.6364 8.18182 13.6364C7.67974 13.6364 7.27273 13.2294 7.27273 12.7273V0.909091C7.27273 0.407014 7.67974 1.35465e-08 8.18182 1.35465e-08Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* <div className='errorfield'>{error.message}</div>*/}
                </div>
                <div className="button">
                  <button
                    onClick={(e) => {
                      if (
                        detailparents.about != "" &&
                        detailparents.file_path != ""
                      ) {
                        setmobile(-12);
                        stapset(2);
                        profile_update(false);
                        window.scrollTo({ top: 0 });
                      } else {
                        step1.map((e) => {
                          after_logins_field(e.name);
                        });
                      }
                    }}
                  >
                    {t("Next")}
                  </button>
                </div>
              </div>
              {/**/}
              <div
                className="detail job_performance your_kids stap2"
                style={stap == 2 ? {} : { display: "none" }}
              >
                <div className="left2">
                  <div className="form_group full">
                    <label>
                      {t("How many children do you need care for?")}
                      <span
                        className={
                          errorfield.childneedcareno != "" ? "starred" : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <div className="children_number">
                      <ul
                        onClick={(e) =>
                          seterrorfield({ ...errorfield, childneedcareno: "" })
                        }
                      >
                        <li
                          onClick={(e) => setchildren(1)}
                          className={children == 1 ? "active" : ""}
                        >
                          1
                        </li>
                        <li
                          onClick={(e) => setchildren(2)}
                          className={children == 2 ? "active" : ""}
                        >
                          2
                        </li>
                        <li
                          onClick={(e) => setchildren("twins")}
                          className={children == "twins" ? "active" : ""}
                        >
                          {t("Twins")}
                        </li>
                        <li
                          onClick={(e) => setchildren(3)}
                          className={children == 3 ? "active" : ""}
                        >
                          3+
                        </li>
                      </ul>
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                  <div className="form_group full">
                    <label>
                      {t("Child’s age")}
                      <span
                        className={errorfield.childage != "" ? "starred" : ""}
                      >
                        *
                      </span>
                    </label>
                    <div className="customselect inp">
                      <input
                        className="keyword"
                        type="text"
                        placeholder={t("Choose from the list")}
                        value={selectcat?.map((e) => {
                          return t(e.name);
                        })}
                      />
                      <div
                        className="overflow"
                        id="over"
                        onClick={(e) => custom("cate", "over")}
                      ></div>
                      <div
                        className="option"
                        id="cate"
                        onClick={(e) =>
                          seterrorfield({ ...errorfield, childage: "" })
                        }
                      >
                        <p>
                          <input
                            type="checkbox"
                            checked={
                              selectcat.filter(
                                (e) => e.name == t("0 - 1 years")
                              )[0]
                                ? true
                                : false
                            }
                            onClick={(a) => selectoption(t("0 - 1 years"))}
                          />
                          <h3>{t("0 - 1 years")} </h3>
                          <span></span>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            checked={
                              selectcat.filter(
                                (e) => e.name == t("1 - 3 years")
                              )[0]
                                ? true
                                : false
                            }
                            onClick={(a) => selectoption(t("1 - 3 years"))}
                          />
                          <h3>{t("1 - 3 years")} </h3>
                          <span></span>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            checked={
                              selectcat.filter(
                                (e) => e.name == t("4 - 7 years")
                              )[0]
                                ? true
                                : false
                            }
                            onClick={(a) => selectoption(t("4 - 7 years"))}
                          />
                          <h3>{t("4 - 7 years")} </h3>
                          <span></span>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            checked={
                              selectcat.filter(
                                (e) => e.name == t("8 - 10 years")
                              )[0]
                                ? true
                                : false
                            }
                            onClick={(a) => selectoption(t("8 - 10 years"))}
                          />
                          <h3>{t("8 - 10 years")} </h3>
                          <span></span>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            checked={
                              selectcat.filter(
                                (e) => e.name == t("11 - 15 years")
                              )[0]
                                ? true
                                : false
                            }
                            onClick={(a) => selectoption(t("11 - 15 years"))}
                          />
                          <h3>{t("11 - 15 years")} </h3>
                          <span></span>
                        </p>
                        <p>
                          <input
                            type="checkbox"
                            checked={
                              selectcat.filter(
                                (e) => e.name == t("16+  years")
                              )[0]
                                ? true
                                : false
                            }
                            onClick={(a) => selectoption(t("16+  years"))}
                          />
                          <h3>{t("16+  years")} </h3>
                          <span></span>
                        </p>
                      </div>
                      <span onClick={(e) => custom("cate", "over")}>
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
                  <div className="form_group full">
                    <label>
                      {t("Does your child have special needs?")}
                      <span
                        className={
                          errorfield.childsocialneed != "" ? "starred" : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <div className="checkbox create">
                      <ul
                        onClick={(e) =>
                          seterrorfield({ ...errorfield, childsocialneed: "" })
                        }
                      >
                        <li>
                          <input
                            type="radio"
                            name=""
                            onClick={(e) =>
                              setdetailparents({
                                ...detailparents,
                                childsocialneed: "Yes",
                              })
                            }
                            checked={
                              detailparents.childsocialneed == "Yes"
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
                                childsocialneed: "No",
                              })
                            }
                            checked={
                              detailparents.childsocialneed == "No"
                                ? true
                                : false
                            }
                          />
                          <span> {t("No")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {detailparents.childsocialneed == "Yes" ? (
                    <div className="form_group full">
                      <label>
                        {t("Select all applicable")}
                        <span
                          className={
                            errorfield.yourkidallapplicable != ""
                              ? "starred"
                              : ""
                          }
                        >
                          *
                        </span>
                      </label>
                      <div className="customselect inp">
                        <div className="detl">
                          {children_age.map((e) => {
                            return t(e.name) + " , ";
                          })}
                        </div>

                        <div
                          className="overflow"
                          id="over2"
                          onClick={(e) => custom("cate2", "over2")}
                        ></div>

                        <div
                          className="option"
                          id="cate2"
                          onClick={(e) =>
                            seterrorfield({
                              ...errorfield,
                              yourkidallapplicable: "",
                            })
                          }
                        >
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) => e.name == t("ADHD")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) => selectoption2(t("ADHD"))}
                            />
                            <h3>{t("ADHD")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) => e.name == t("Auditory Impairment")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) =>
                                selectoption2(t("Auditory Impairment"))
                              }
                            />
                            <h3>{t("Auditory Impairment")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) => e.name == t("Autism")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) => selectoption2(t("Autism"))}
                            />
                            <h3>{t("Autism")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) => e.name == t("Cerebral palsy")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) =>
                                selectoption2(t("Cerebral palsy"))
                              }
                            />
                            <h3>{t("Cerebral palsy")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) => e.name == t("Down syndrome")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) => selectoption2(t("Down syndrome"))}
                            />
                            <h3>{t("Down syndrome")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) => e.name == t("Dyslexia")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) => selectoption2(t("Dyslexia"))}
                            />
                            <h3>{t("Dyslexia")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) =>
                                    e.name == t("Mild intellectual disability")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) =>
                                selectoption2(t("Mild intellectual disability"))
                              }
                            />
                            <h3>{t("Mild intellectual disability")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) =>
                                    e.name ==
                                    t("Moderate/Severe intellectual disability")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) =>
                                selectoption2(
                                  t("Moderate/Severe intellectual disability")
                                )
                              }
                            />
                            <h3>
                              {t("Moderate/Severe intellectual disability")}{" "}
                            </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) => e.name == t("Orthopedic impairment")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) =>
                                selectoption2(t("Orthopedic impairment"))
                              }
                            />
                            <h3>{t("Orthopedic impairment")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) =>
                                    e.name == t("Speech learning impairment")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) =>
                                selectoption2(t("Speech learning impairment"))
                              }
                            />
                            <h3>{t("Speech learning impairment")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) =>
                                    e.name ==
                                    t("Specific learning disabilities")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) =>
                                selectoption2(
                                  t("Specific learning disabilities")
                                )
                              }
                            />
                            <h3>{t("Specific learning disabilities")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) => e.name == t("Visual impairment")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) =>
                                selectoption2(t("Visual impairment"))
                              }
                            />
                            <h3>{t("Visual impairment")} </h3>
                            <span></span>
                          </p>
                          <p>
                            <input
                              type="checkbox"
                              checked={
                                children_age.filter(
                                  (e) => e.name == t("Other")
                                )[0]
                                  ? true
                                  : false
                              }
                              onClick={(a) => selectoption2(t("Other"))}
                            />
                            <h3>{t("Other")} </h3>
                            <span></span>
                          </p>
                        </div>

                        <span onClick={(e) => custom("cate2", "over2")}>
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
                  ) : (
                    ""
                  )}
                  {detail.service_type && detail.service_type.tab2 ? (
                    <div class="form_group full">
                      <label>
                        {t("Does your child need")} <a>{t("IEP")} </a>
                        <span class="smallpop">
                          {t(
                            "IEP (Individual Education Program) is a document that is developed for each child in the public school system who is eligible for special education. The IEP is usually written by a team of specialized providers (special education specialist, OT, SLP, BID, psychologist). After a comprehensive evaluation of cognitive, language, and academic skills with standardized tests, written IEP will contain outlined present levels of performances (strengths and challenges that child may have), as well as specific IEP goals, appropriate accommodations, frequency and duration of special education services."
                          )}
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
                  ) : (
                    ""
                  )}
                </div>
                <div className="right2">
                  <div className="form_group full">
                    <label>
                      {t(
                        "Does your child have any chronic medical conditions?"
                      )}
                      <span
                        className={
                          errorfield.childmedicalcondition != ""
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
                            childmedicalcondition: "",
                          })
                        }
                      >
                        <li>
                          <input
                            type="radio"
                            name="c2"
                            onClick={(e) =>
                              setdetailparents({
                                ...detailparents,
                                childmedicalcondition: "Yes",
                              })
                            }
                            checked={
                              detailparents.childmedicalcondition == "Yes"
                                ? true
                                : false
                            }
                          />
                          <span> {t("Yes")}</span>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="c2"
                            onClick={(e) =>
                              setdetailparents({
                                ...detailparents,
                                childmedicalcondition: "No",
                              })
                            }
                            checked={
                              detailparents.childmedicalcondition == "No"
                                ? true
                                : false
                            }
                          />
                          <span> {t("No")}</span>
                        </li>
                      </ul>
                      {detailparents.childmedicalcondition == "Yes" ? (
                        <>
                          <textarea
                            rows="2"
                            placeholder={t("kratak opis")}
                            maxlength="300"
                            name="message"
                            onChange={(e) => {
                              seterrorfield({
                                ...errorfield,
                                childmedicaldescription: "",
                              });
                              setdetailparents({
                                ...detailparents,
                                childmedicaldescription: e.target.value,
                              });
                            }}
                            defaultValue={detailparents.childmedicaldescription}
                            className={
                              errorfield.childmedicaldescription != ""
                                ? "bordererror"
                                : ""
                            }
                          ></textarea>
                          <span>
                            {t("Number of characters")}{" "}
                            {300 - detailparents.childmedicaldescription.length}
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                  <div className="form_group full">
                    <label>
                      {t("Does your child have any allergies?")}
                      <span
                        className={
                          errorfield.childanyallergies != "" ? "starred" : ""
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
                            childanyallergies: "",
                          })
                        }
                      >
                        <li>
                          <input
                            type="radio"
                            name="b2"
                            onClick={(e) =>
                              setdetailparents({
                                ...detailparents,
                                childanyallergies: "Yes",
                              })
                            }
                            checked={
                              detailparents.childanyallergies == "Yes"
                                ? true
                                : false
                            }
                          />
                          <span> {t("Yes")}</span>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="b2"
                            onClick={(e) =>
                              setdetailparents({
                                ...detailparents,
                                childanyallergies: "No",
                              })
                            }
                            checked={
                              detailparents.childanyallergies == "No"
                                ? true
                                : false
                            }
                          />
                          <span> {t("No")}</span>
                        </li>
                      </ul>
                      {detailparents.childanyallergies == "Yes" ? (
                        <>
                          <textarea
                            rows="2"
                            placeholder={t("Short description")}
                            maxlength="300"
                            name="message"
                            onChange={(e) => {
                              seterrorfield({
                                ...errorfield,
                                childallergiesdescription: "",
                              });
                              setdetailparents({
                                ...detailparents,
                                childallergiesdescription: e.target.value,
                              });
                            }}
                            defaultValue={
                              detailparents.childallergiesdescription
                            }
                            className={
                              errorfield.childallergiesdescription != ""
                                ? "bordererror"
                                : ""
                            }
                          ></textarea>
                          <span>
                            {t("Number of characters")}{" "}
                            {300 -
                              detailparents.childallergiesdescription.length}
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                </div>
                <div className="button">
                  <button
                    onClick={(e) => {
                      setmobile(0);
                      stapset(1);
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    {t("Back")}
                  </button>
                  <button
                    onClick={(e) => {
                      if (
                        (children > 0 || children == "twins") &&
                        selectcat[0] &&
                        detailparents.childsocialneed != "" &&
                        (detail.service_type && detail.service_type.tab2
                          ? detailparents.childneediep != ""
                          : selectcat[0]) &&
                        detailparents.childmedicalcondition != "" &&
                        (detailparents.childmedicalcondition == "Yes"
                          ? detailparents.childmedicaldescription != ""
                          : selectcat[0]) &&
                        detailparents.childanyallergies != "" &&
                        (detailparents.childanyallergies == "Yes"
                          ? detailparents.childallergiesdescription != ""
                          : selectcat[0]) &&
                        (detailparents.childsocialneed == "Yes"
                          ? children_age[0]
                          : detailparents.childsocialneed != "")
                      ) {
                        setmobile(-20);
                        stapset(3);
                        window.scrollTo({ top: 0 });
                        profile_update(false);
                      } else {
                        step2.map((e) => {
                          after_logins_field(e.name);
                        });
                      }
                    }}
                  >
                    {t("Next")}
                  </button>
                </div>
              </div>
              {/**/}
              <div
                className="detail preferences   work-experience job_performance setp3"
                style={stap == 3 ? {} : { display: "none" }}
              >
                {detail.service_type && detail.service_type.tab1 ? (
                  <div className="nanny">
                    <h2 className="border">
                      <img src="./images/nany_pur.svg" /> {t("Nanny")}
                    </h2>
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
                                detailparents.liveinnany == "Yes" ? true : false
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
                                detailparents.liveinnany == "No" ? true : false
                              }
                            />
                            <span>{t("No")}</span>
                          </li>
                        </ul>
                      </div>
                      {/* <div className='errorfield'>{error.message}</div>*/}
                    </div>
                    <div className="form_group full">
                      <label>
                        {t("Rate per hour")}{" "}
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
                              <li>{t("10")}</li>
                              <li>{t("20")}</li>
                              <li>{t("30")}</li>
                              <li>{t("40")}</li>
                              <li>{t("60+")}</li>
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
                ) : (
                  ""
                )}

                {detail.service_type && detail.service_type.tab2 ? (
                  <div className="special_education big">
                    <h2 className="border">
                      <img src="./images/special_education.svg" />{" "}
                      {t("Special Education Teacher")}
                    </h2>
                    <div className="form_group full">
                      <label>
                        {t("Rate per hour")}{" "}
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
                                }
                              }}
                            />
                          </div>
                          <div class="slider two">
                            <ul>
                              <li>0</li>
                              <li>{t("10")}</li>
                              <li>{t("20")}</li>
                              <li>{t("30")}</li>
                              <li>{t("40")}</li>
                              <li>{t("60+")}</li>
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
                ) : (
                  ""
                )}
                {detail.service_type && detail.service_type.tab3 ? (
                  <div className="special_education big">
                    <h2 className="border">
                      <img src="./images/professional.svg" />{" "}
                      {t("Special Education Paraprofessional")}
                    </h2>
                    <div className="form_group full">
                      <label>
                        {t("Rate per hour")}{" "}
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
                                }
                              }}
                            />
                          </div>
                          <div class="slider two">
                            <ul>
                              <li>0</li>
                              <li>{t("10")}</li>
                              <li>{t("20")}</li>
                              <li>{t("30")}</li>
                              <li>{t("40")}</li>
                              <li>{t("60+")}</li>
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
                ) : (
                  ""
                )}
                {detail.service_type && detail.service_type.tab4 ? (
                  <div className="tutor parents">
                    <h2 className="border">
                      <img src="./images/tuter.svg" /> {t("Tutor")}
                    </h2>
                    <div className="form_group qualification">
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
                    </div>
                    <div className="form_group full">
                      <label>
                        {t("Rate per hour")}{" "}
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
                                }
                              }}
                            />
                          </div>
                          <div class="slider two">
                            <ul>
                              <li>0</li>
                              <li>{t("10")}</li>
                              <li>{t("20")}</li>
                              <li>{t("30")}</li>
                              <li>{t("40")}</li>
                              <li>{t("60+")}</li>
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
                  </div>
                ) : (
                  ""
                )}
                <div className="general_info tutor  preferred_school_jobs parents2">
                  <h2 className="border">{t("General info")}</h2>
                  <div className="form_group full">
                    <label>
                      {t("Preferred work experience")}
                      <span
                        className={errorfield.tutorexp != "" ? "starred" : ""}
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
                        <option value={t("0 - 1 years")}>
                          {t("0 - 1 years")}
                        </option>
                        <option value={"1 - 2 years"}>
                          {t("1 - 2 years")}
                        </option>
                        <option value={"2 - 4 years"}>
                          {t("2 - 4 years")}
                        </option>
                        <option value={"More than 4 years"}>
                          {t("More than 4 years")}
                        </option>
                      </select>
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>

                  <div className="form_group full">
                    <label>
                      {t("Preferred age of a provider")}
                      <span
                        className={
                          errorfield.preferredageofprovider != ""
                            ? "starred"
                            : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <div class="select">
                      <select
                        value={
                          detailparents.preferredageofprovider != ""
                            ? detailparents.preferredageofprovider
                            : t("Choose from the list")
                        }
                        onChange={(e) => {
                          seterrorfield({
                            ...errorfield,
                            preferredageofprovider: "",
                          });
                          setdetailparents({
                            ...detailparents,
                            preferredageofprovider: e.target.value,
                          });
                        }}
                      >
                        {/* detailparents.preferredageofprovider ? detailparents.preferredageofprovider :*/}
                        <option disabled={true}>
                          {t("Choose from the list")}
                        </option>
                        <option value={"18 - 23 years"}>
                          {t("18 - 23 years")}
                        </option>
                        <option value={"24 - 30 years"}>
                          {t("24 - 30 years")}
                        </option>
                        <option value={"31 - 40 years"}>
                          {t("31 - 40 years")}
                        </option>
                        <option value={"Older than 40 years"}>
                          {t("Older than 40 years")}
                        </option>
                        <option value={"Any"}>{t("Any")}</option>
                      </select>
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                  <div className="form_group full">
                    <label>
                      {t("Start date")}
                      <span
                        className={
                          errorfield.tutorstartdate != "" ? "starred" : ""
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
                      {/* <input type="date" min={String(fixdate)} max={"2099-06-30"} defaultValue={detailparents.tutorstartdate != null ? detailparents.tutorstartdate : ""} onChange={e => {
                                                seterrorfield({ ...errorfield, tutorstartdate: "" })
                                                setdetailparents({ ...detailparents, tutorstartdate: e.target.value })
                                            }} />*/}
                      <DatePicker
                        className={
                          errorfield.tutorstartdate != "" ? "bordererror" : ""
                        }
                        minDate={today}
                        selected={
                          detailparents.tutorstartdate != null &&
                          detailparents.tutorstartdate != ""
                            ? new Date(detailparents.tutorstartdate)
                            : today
                        }
                        onChange={(date: Date) => {
                          seterrorfield({ ...errorfield, tutorstartdate: "" });
                          setdetailparents({
                            ...detailparents,
                            tutorstartdate:
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
                  <div className="form_group full">
                    <label>
                      {t("Frequency")}
                      <span
                        className={
                          errorfield.tutorintrestedin != "" ? "starred" : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <div className="checkbox create">
                      <ul
                        onClick={(e) =>
                          seterrorfield({ ...errorfield, tutorintrestedin: "" })
                        }
                      >
                        <li>
                          <input
                            type="radio"
                            name="a"
                            checked={
                              detailparents.tutorintrestedin == t("Full time")
                                ? true
                                : false
                            }
                            onClick={(e) =>
                              setdetailparents({
                                ...detailparents,
                                tutorintrestedin: t("Full time"),
                              })
                            }
                          />
                          <span> {t("Full time")}</span>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="a"
                            checked={
                              detailparents.tutorintrestedin == t("Part time")
                                ? true
                                : false
                            }
                            onClick={(e) =>
                              setdetailparents({
                                ...detailparents,
                                tutorintrestedin: t("Part time"),
                              })
                            }
                          />
                          <span> {t("Part time")}</span>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="a"
                            checked={
                              detailparents.tutorintrestedin ==
                              t("Occasionally")
                                ? true
                                : false
                            }
                            onClick={(e) =>
                              setdetailparents({
                                ...detailparents,
                                tutorintrestedin: t("Occasionally"),
                              })
                            }
                          />
                          <span> {t("Occasionally")}</span>
                        </li>
                      </ul>
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                </div>
                <div className="button">
                  <button
                    onClick={(e) => {
                      stapset(2);
                      setmobile(-20);
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    {t("Back")}
                  </button>
                  <button
                    onClick={(e) => {
                      if (
                        (detail.service_type && detail.service_type.tab1
                          ? detailparents.liveinnany != "" && usd.max > 5
                          : detailparents.tutorexp != "") &&
                        (detail.service_type && detail.service_type.tab4
                          ? (qualifications.English ||
                              qualifications.Serbian ||
                              qualifications.Mathematics ||
                              qualifications.Physics ||
                              qualifications.Chemistry ||
                              qualifications.Other) &&
                            detailparents.tutorintrestedonlinecls != "" &&
                            usd2.max > 5
                          : detailparents.tutorexp != "") &&
                        detailparents.tutorexp != "" &&
                        detailparents.preferredageofprovider != "" &&
                        detailparents.tutorstartdate != "" &&
                        detailparents.tutorintrestedin &&
                        (detail.service_type && detail.service_type.tab2
                          ? usd3.max > 5
                          : detailparents.tutorintrestedin) &&
                        (detail.service_type && detail.service_type.tab3
                          ? usd4.max > 5
                          : detailparents.tutorintrestedin)
                      ) {
                        stapset(4);
                        setmobile(-32);
                        window.scrollTo({ top: 0 });
                        profile_update(false);
                        setTimeout(() => {
                          setcalandertype(1);
                        }, 500);
                      } else {
                        step3.map((e) => {
                          after_logins_field(e.name);
                        });
                      }
                    }}
                  >
                    {t("Next")}
                  </button>
                </div>
              </div>
              {/**/}
              <div
                className="detail availability setp5"
                style={stap == 4 ? {} : { display: "none" }}
              >
                <div className="form_group full">
                  <label>{t("Your availability and working hours*")}</label>
                  <p>
                    {t(
                      "Share (your preferred dates and times) when you need services. You can always update your schedule if it changes later."
                    )}
                  </p>
                </div>
                <div className="form_group full">
                  <label>{t("Auto-fill your calendar:")}</label>
                  <ul>
                    <li
                      onClick={(e) => setcalandertype(1)}
                      className={calandertype == 1 ? "active" : ""}
                    >
                      <span
                        className={errorfield.fulltime != "" ? "starred" : ""}
                      >
                        {t("Full time")}
                      </span>
                    </li>
                    <li
                      onClick={(e) => setcalandertype(2)}
                      className={calandertype == 2 ? "active" : ""}
                    >
                      <span
                        className={
                          errorfield.beforeschool != "" ? "starred" : ""
                        }
                      >
                        {t("Before school")}
                      </span>
                    </li>
                    <li
                      onClick={(e) => setcalandertype(3)}
                      className={calandertype == 3 ? "active" : ""}
                    >
                      <span
                        className={
                          errorfield.afterschool != "" ? "starred" : ""
                        }
                      >
                        {t("After school")}
                      </span>
                    </li>
                    <li
                      onClick={(e) => setcalandertype(4)}
                      className={calandertype == 4 ? "active" : ""}
                    >
                      <span
                        className={errorfield.overnight != "" ? "starred" : ""}
                      >
                        {t("Overnight")}
                      </span>
                    </li>
                    <li
                      onClick={(e) => setcalandertype(5)}
                      className={calandertype == 5 ? "active" : ""}
                    >
                      <span
                        className={errorfield.overnight != "" ? "starred" : ""}
                      >
                        {t("Weekends")}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="calander">
                  <div className="form_group full">
                    <label>
                      {t(
                        "Select days when you are available and your working hours"
                      )}
                    </label>
                  </div>
                  <div className="calanderfull">
                    {calandertype == 1 ? (
                      <Calander
                        data={calender_data}
                        data1={detailparents.fulltime}
                        data2={"fulltime"}
                      />
                    ) : (
                      ""
                    )}
                    {calandertype == 2 ? (
                      <Calander
                        data={calender_data}
                        data1={detailparents.beforeschool}
                        data2={"beforeschool"}
                      />
                    ) : (
                      ""
                    )}
                    {calandertype == 3 ? (
                      <Calander
                        data={calender_data}
                        data1={detailparents.afterschool}
                        data2={"afterschool"}
                      />
                    ) : (
                      ""
                    )}
                    {calandertype == 4 ? (
                      <Calander
                        data={calender_data}
                        data1={detailparents.overnight}
                        data2={"overnight"}
                      />
                    ) : (
                      ""
                    )}
                    {calandertype == 5 ? (
                      <Calander
                        data={calender_data}
                        data1={detailparents.weekends}
                        data2={"weekends"}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="legend">
                    <div className="form_group full">
                      <label className="border">Legend</label>
                      <ul>
                        <li>
                          <strong>{t("Full time")}</strong>
                          <br />
                          {t("Mon - Fri, 9:00 AM to 6:00 PM")}
                        </li>
                        <li>
                          <strong>{t("Before school")}</strong>
                          <br />
                          {t("Mon - Fri, 6:00 AM to 9:00 AM")}
                        </li>
                        <li>
                          <strong>{t("After school")}</strong>
                          <br />
                          {t("Mon - Fri, 3:00 PM to 9:00 PM")}
                        </li>
                        <li>
                          <strong>{t("Overnight")}</strong>
                          <br />
                          {t("Mon - Fri, 9:00 PM to 6:00 AM")}
                        </li>
                        <li>
                          <strong>{t("Weekends")}</strong>
                          <br />
                          {t("Saturday 12:00 AM to Sunday 11:59 PM")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="button">
                  <button
                    onClick={(e) => {
                      stapset(3);
                      setmobile(-32);
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    {t("Back")}
                  </button>
                  <button
                    onClick={(e) => {
                      if (
                        detailparents.fulltime != "" ||
                        detailparents.beforeschool != "" ||
                        detailparents.afterschool != "" ||
                        detailparents.weekends != "" ||
                        detailparents.overnight != ""
                      ) {
                        setmobile(-46);
                        stapset(5);
                        window.scrollTo({ top: 0 });
                        profile_update(false);
                      } else {
                        step4.map((e) => {
                          after_logins_field(e.name);
                        });
                      }
                    }}
                  >
                    {t("Next")}
                  </button>
                </div>
              </div>
              {/**/}
              <div
                className="detail  additional_info info_parents setp6"
                style={stap == 5 ? {} : { display: "none" }}
              >
                <div className="form_group border qualification">
                  <label>
                    {t("Our ideal candidate can speak")}
                    <span
                      className={
                        errorfield.candidatespeaks == "" ? "" : "starred"
                      }
                    >
                      *
                    </span>
                  </label>
                  <div className="checkbox create setredio vertical">
                    <ul
                      onClick={(e) =>
                        seterrorfield({ ...errorfield, candidatespeaks: "" })
                      }
                    >
                      <li>
                        <input
                          type="checkbox"
                          name=""
                          checked={
                            oralspeak.English == "English" ? true : false
                          }
                          onClick={(e) => {
                            if (e.target.checked) {
                              setoralspeak({
                                ...oralspeak,
                                English: "English",
                              });
                            } else {
                              setoralspeak({ ...oralspeak, English: "" });
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
                            oralspeak.Spanish == "Spanish" ? true : false
                          }
                          onClick={(e) => {
                            if (e.target.checked) {
                              setoralspeak({
                                ...oralspeak,
                                Spanish: "Spanish",
                              });
                            } else {
                              setoralspeak({ ...oralspeak, Spanish: "" });
                            }
                          }}
                        />
                        <span> {t("Spanish")}</span>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name=""
                          checked={oralspeak.French == "French" ? true : false}
                          onClick={(e) => {
                            if (e.target.checked) {
                              setoralspeak({ ...oralspeak, French: "French" });
                            } else {
                              setoralspeak({ ...oralspeak, French: "" });
                            }
                          }}
                        />
                        <span> {t("French")}</span>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name=""
                          checked={
                            oralspeak.Chinese == "Chinese" ? true : false
                          }
                          onClick={(e) => {
                            if (e.target.checked) {
                              setoralspeak({
                                ...oralspeak,
                                Chinese: "Chinese",
                              });
                            } else {
                              setoralspeak({ ...oralspeak, Chinese: "" });
                            }
                          }}
                        />
                        <span> {t("Chinese")}</span>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name=""
                          checked={oralspeak.German == "German" ? true : false}
                          onClick={(e) => {
                            if (e.target.checked) {
                              setoralspeak({ ...oralspeak, German: "German" });
                            } else {
                              setoralspeak({ ...oralspeak, German: "" });
                            }
                          }}
                        />
                        <span> {t("German")}</span>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name=""
                          checked={
                            oralspeak.Italian == "Italian" ? true : false
                          }
                          onClick={(e) => {
                            if (e.target.checked) {
                              setoralspeak({
                                ...oralspeak,
                                Italian: "Italian",
                              });
                            } else {
                              setoralspeak({ ...oralspeak, Italian: "" });
                            }
                          }}
                        />
                        <span> {t("Italian")}</span>
                      </li>
                      <li>
                        <input type="checkbox" name="" />
                        <span>
                          {t("Other")}
                          <input
                            type="text"
                            placeholder={t("Type here")}
                            defaultValue={oralspeak.Other}
                            onChange={(e) => {
                              setoralspeak({
                                ...oralspeak,
                                Other: t(e.target.value),
                              });
                            }}
                          />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="iconsec">
                  <div className="left2">
                    {detail.service_type && detail.service_type.tab1 ? (
                      <div className="icon border">
                        <div
                          className="form_group"
                          style={{ marginBottom: "0" }}
                        >
                          <label>
                            {t("I need")}
                            <span>*</span>
                          </label>
                          <br />
                        </div>
                        <ul>
                          <li
                            onClick={(e) =>
                              seterrorfield({
                                ...errorfield,
                                childtransportation: "",
                              })
                            }
                            className={
                              errorfield.childtransportation != ""
                                ? "starred"
                                : ""
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
                            className={
                              errorfield.occasionaltraveling != ""
                                ? "starred"
                                : ""
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
                            className={
                              errorfield.lighthousework != "" ? "starred" : ""
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
                            className={
                              errorfield.cookingforkids != "" ? "starred" : ""
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
                                className={habit.kids == "true" ? "active" : ""}
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
                    ) : (
                      ""
                    )}

                    <div
                      className="form_group full"
                      style={{ marginTop: "20px" }}
                    >
                      <label>
                        {t("Do you need child services abroad?")}
                        <span
                          className={
                            errorfield.workingabroad != "" ? "starred" : ""
                          }
                        >
                          *
                        </span>
                      </label>
                      <div className="checkbox create">
                        <ul
                          onClick={(e) =>
                            seterrorfield({ ...errorfield, workingabroad: "" })
                          }
                        >
                          <li>
                            <input
                              type="radio"
                              name=""
                              onClick={(e) =>
                                setdetailparents({
                                  ...detailparents,
                                  workingabroad: "Yes",
                                })
                              }
                              checked={
                                detailparents.workingabroad == "Yes"
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
                                  workingabroad: "No",
                                })
                              }
                              checked={
                                detailparents.workingabroad == "No"
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
                    {detailparents.workingabroad == "Yes" ? (
                      <>
                        <div className="form_group full">
                          <label>
                            {t("Preferred Country")}
                            <span
                              className={
                                errorfield.preferredcountry != ""
                                  ? "starred"
                                  : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div class="select">
                            <select
                              onChange={(e) => {
                                seterrorfield({
                                  ...errorfield,
                                  preferredcountry: "",
                                });
                                setdetailparents({
                                  ...detailparents,
                                  preferredcountry: e.target.value,
                                });
                              }}
                            >
                              <option disabled="">
                                {detailparents.preferredcountry != ""
                                  ? detailparents.preferredcountry
                                  : t("Choose from the list")}
                              </option>
                              {country.data.map((e) => {
                                return (
                                  <option value={e.country}>{e.country}</option>
                                );
                              })}
                            </select>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>

                        <div className="form_group full">
                          <label>
                            {t("Preferred City")}
                            <span
                              className={
                                errorfield.preferredcity != "" ? "starred" : ""
                              }
                            >
                              *
                            </span>
                          </label>
                          <div class="text">
                            <input
                              type="text"
                              placeholder={t("Type here")}
                              onChange={(e) => {
                                seterrorfield({
                                  ...errorfield,
                                  preferredcity: "",
                                });
                                setdetailparents({
                                  ...detailparents,
                                  preferredcity: e.target.value,
                                });
                              }}
                              defaultValue={detailparents.preferredcity}
                            />
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="button">
                  <button
                    onClick={(e) => {
                      stapset(4);
                      setmobile(-46);
                      window.scrollTo({ top: 0 });
                      setTimeout(() => {
                        setcalandertype(1);
                      }, 500);
                    }}
                  >
                    {t("Back")}
                  </button>
                  <button
                    onClick={(e) => {
                      if (
                        (oralspeak.English != "" ||
                          oralspeak.Spanish ||
                          oralspeak.French ||
                          oralspeak.Chinese ||
                          oralspeak.German ||
                          oralspeak.Italian ||
                          oralspeak.Other) &&
                        (detail.service_type &&
                        detail.service_type.tab1 &&
                        Object.keys(detail.service_type).length == 1
                          ? habit.licence &&
                            habit.family &&
                            habit.housework &&
                            habit.kids
                          : detailparents.workingabroad != "") &&
                        detailparents.workingabroad != "" &&
                        (detailparents.workingabroad == "Yes"
                          ? detailparents.preferredcountry != "" &&
                            detailparents.preferredcity != ""
                          : detailparents.workingabroad != "")
                      ) {
                        stapset(6);
                        setmobile(-60);
                        window.scrollTo({ top: 0 });
                        profile_update(false);
                      } else {
                        step5.map((e) => {
                          after_logins_field(e.name);
                        });
                      }
                    }}
                  >
                    {t("Next")}
                  </button>
                </div>
              </div>
              {/**/}
              <div
                className="detail  verification  setp7"
                style={stap == 6 ? {} : { display: "none" }}
              >
                <div className="form_group">
                  <label>{t("Verify your accounts")}</label>
                  <div className="social_verify">
                    <FacebookProvider appId="393979595255860">
                      <LoginButton
                        scope="email"
                        onCompleted={handleResponse}
                        onError={handleError}
                        className="facebook"
                      >
                        <span>
                          <svg
                            className={
                              detailparents.facebookverify ? "active" : ""
                            }
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.5"
                              y="0.5"
                              width="39"
                              height="39"
                              rx="19.5"
                              stroke="#A98D4B"
                            />
                            <path
                              d="M21.0677 28.9998V20.7891H23.8237L24.2363 17.5893H21.0677V15.5463C21.0677 14.6199 21.325 13.9885 22.6536 13.9885L24.348 13.9877V11.1258C24.0549 11.087 23.0491 10.9999 21.879 10.9999C19.436 10.9999 17.7634 12.491 17.7634 15.2296V17.5894H15.0003V20.7892H17.7633V28.9999L21.0677 28.9998Z"
                              fill="#A98D4B"
                            />
                          </svg>
                        </span>
                      </LoginButton>
                    </FacebookProvider>
                    <svg
                      onClick={(e) => {
                        if (detailparents.twitterverify) {
                          setdetailparents({
                            ...detailparents,
                            twitterverify: false,
                          });
                        } else {
                          setdetailparents({
                            ...detailparents,
                            twitterverify: true,
                          });
                        }
                      }}
                      className={detailparents.twitterverify ? "active" : ""}
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="40"
                        height="40"
                        rx="20"
                        stroke="#A98D4B"
                      />
                      <path
                        d="M29.9133 16.4929C29.9133 16.6958 29.9133 16.8987 29.9133 17.0726C29.9133 23.0726 25.3336 30.0001 16.9858 30.0001C14.406 30.0001 12.0292 29.2465 10.0002 27.9711C10.3481 28.0001 10.7249 28.0291 11.0727 28.0291C13.1887 28.0291 15.1597 27.3045 16.7249 26.0871C14.7249 26.0581 13.0437 24.7248 12.493 22.9277C12.7829 22.9856 13.0437 23.0146 13.3626 23.0146C13.7684 23.0146 14.1742 22.9566 14.551 22.8407C12.464 22.4349 10.8988 20.6088 10.8988 18.4059C10.8988 18.3769 10.8988 18.3769 10.8988 18.3479C11.5075 18.6958 12.2031 18.8987 12.9568 18.9277C11.7394 18.1161 10.9278 16.7248 10.9278 15.1306C10.9278 14.29 11.1597 13.5074 11.5365 12.8407C13.7684 15.5943 17.1307 17.3914 20.8988 17.5943C20.8118 17.2755 20.7829 16.8987 20.7829 16.5508C20.7829 14.0291 22.8118 12.0001 25.3336 12.0001C26.6379 12.0001 27.8263 12.5508 28.6379 13.4204C29.6814 13.2175 30.6379 12.8407 31.5365 12.319C31.1887 13.3914 30.464 14.261 29.5365 14.8407C30.464 14.7248 31.3336 14.4929 32.1452 14.1161C31.5655 15.0436 30.8118 15.8552 29.9133 16.4929Z"
                        fill="#A98D4B"
                      />
                    </svg>
                    <svg
                      onClick={(e) => {
                        if (detailparents.linkdinverify) {
                          setdetailparents({
                            ...detailparents,
                            linkdinverify: false,
                          });
                        } else {
                          setdetailparents({
                            ...detailparents,
                            linkdinverify: true,
                          });
                        }
                      }}
                      className={detailparents.linkdinverify ? "active" : ""}
                      width="40"
                      height="40"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="40"
                        height="40"
                        rx="20"
                        stroke="#A98D4B"
                      />
                      <path
                        d="M30.5267 29.9936C29.3765 29.9662 28.2537 29.9662 27.1035 29.9936C26.8571 29.9936 26.8023 29.9389 26.8023 29.6924C26.8023 27.6658 26.8023 25.6119 26.8023 23.5854C26.8023 23.1198 26.7749 22.6543 26.638 22.2161C26.2272 20.792 24.584 20.2717 23.4065 21.2302C22.7766 21.7232 22.5301 22.4078 22.5301 23.2294C22.5301 25.1464 22.5301 27.0634 22.5301 28.9804C22.5301 29.2268 22.5027 29.4733 22.5301 29.7472C22.5575 29.9662 22.448 30.021 22.2563 29.9936C21.0787 29.9936 19.9285 29.9936 18.7509 29.9936C18.5318 29.9936 18.4771 29.9389 18.4771 29.7198C18.5044 27.9945 18.5044 26.2692 18.5044 24.5165C18.5044 22.3804 18.5044 20.2443 18.4771 18.1356C18.4771 17.8892 18.5318 17.8344 18.7509 17.8344C19.9285 17.8344 21.0787 17.8344 22.2563 17.8344C22.4754 17.8344 22.5301 17.8892 22.5301 18.1083C22.5301 18.5464 22.5301 18.9846 22.5301 19.5049C22.6123 19.4228 22.6397 19.3954 22.6671 19.368C23.7351 17.807 25.2413 17.3688 27.0214 17.6427C29.0753 17.9713 30.3898 19.3954 30.7184 21.5862C30.8006 22.1066 30.828 22.6269 30.828 23.1472C30.828 25.3381 30.828 27.5015 30.828 29.6924C30.828 29.9115 30.7732 29.9936 30.5267 29.9936Z"
                        fill="#A98D4B"
                      />
                      <path
                        d="M16.2862 23.9138C16.2862 25.8308 16.2862 27.7478 16.2862 29.6648C16.2862 29.9113 16.2314 29.9935 15.9849 29.9935C14.8347 29.9661 13.6846 29.9935 12.5344 29.9935C12.3153 29.9935 12.2605 29.9387 12.2605 29.7196C12.2605 25.8582 12.2605 21.9695 12.2605 18.1081C12.2605 17.9164 12.3153 17.8342 12.5344 17.8342C13.7119 17.8342 14.8895 17.8342 16.0671 17.8342C16.3136 17.8342 16.341 17.9164 16.341 18.1355C16.2862 20.0525 16.2862 21.9695 16.2862 23.9138Z"
                        fill="#A98D4B"
                      />
                      <path
                        d="M16.4773 14.6575C16.2034 15.7529 15.0806 16.3828 13.7935 16.1637C12.4242 15.9446 11.6574 14.6027 12.1503 13.2882C12.479 12.4666 13.2732 11.9737 14.2864 12.0011C15.82 11.9737 16.8333 13.2061 16.4773 14.6575Z"
                        fill="#A98D4B"
                      />
                    </svg>
                    <svg
                      onClick={(e) => {
                        if (detailparents.instaverify) {
                          setdetailparents({
                            ...detailparents,
                            instaverify: false,
                          });
                        } else {
                          setdetailparents({
                            ...detailparents,
                            instaverify: true,
                          });
                        }
                      }}
                      className={detailparents.instaverify ? "active" : ""}
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="40"
                        height="40"
                        rx="20"
                        stroke="#A98D4B"
                      />
                      <path
                        d="M18.0002 21C18.0002 19.3432 19.343 17.9998 20.9998 17.9998C22.6565 17.9998 24 19.3432 24 21C24 22.6568 22.6565 24.0002 20.9998 24.0002C19.343 24.0002 18.0002 22.6568 18.0002 21ZM16.3784 21C16.3784 23.5524 18.4474 25.6214 20.9998 25.6214C23.5522 25.6214 25.6211 23.5524 25.6211 21C25.6211 18.4476 23.5522 16.3786 20.9998 16.3786C18.4474 16.3786 16.3784 18.4476 16.3784 21ZM24.7241 16.1954C24.724 16.409 24.7873 16.6178 24.9059 16.7955C25.0245 16.9731 25.1931 17.1116 25.3904 17.1934C25.5877 17.2752 25.8049 17.2967 26.0144 17.2551C26.2239 17.2135 26.4164 17.1108 26.5675 16.9598C26.7186 16.8088 26.8215 16.6164 26.8633 16.4069C26.905 16.1974 26.8837 15.9803 26.8021 15.7829C26.7204 15.5855 26.582 15.4168 26.4045 15.2981C26.2269 15.1793 26.0181 15.1159 25.8045 15.1158H25.8041C25.5178 15.1159 25.2432 15.2297 25.0407 15.4321C24.8382 15.6345 24.7243 15.909 24.7241 16.1954ZM17.3638 28.3258C16.4863 28.2858 16.0094 28.1397 15.6924 28.0162C15.2722 27.8526 14.9724 27.6578 14.6572 27.343C14.342 27.0282 14.1469 26.7287 13.984 26.3085C13.8605 25.9917 13.7143 25.5146 13.6744 24.6372C13.6308 23.6885 13.6221 23.4035 13.6221 21.0001C13.6221 18.5966 13.6315 18.3125 13.6744 17.363C13.7144 16.4855 13.8616 16.0094 13.984 15.6917C14.1476 15.2715 14.3424 14.9717 14.6572 14.6564C14.972 14.3412 15.2715 14.1461 15.6924 13.9832C16.0092 13.8597 16.4863 13.7135 17.3638 13.6736C18.3124 13.63 18.5974 13.6213 20.9998 13.6213C23.4021 13.6213 23.6874 13.6307 24.6368 13.6736C25.5143 13.7136 25.9904 13.8608 26.3082 13.9832C26.7284 14.1461 27.0282 14.3417 27.3434 14.6564C27.6586 14.9712 27.853 15.2715 28.0166 15.6917C28.1401 16.0085 28.2863 16.4855 28.3262 17.363C28.3698 18.3125 28.3785 18.5966 28.3785 21.0001C28.3785 23.4035 28.3698 23.6877 28.3262 24.6372C28.2862 25.5146 28.1393 25.9915 28.0166 26.3085C27.853 26.7287 27.6582 27.0285 27.3434 27.343C27.0286 27.6575 26.7284 27.8526 26.3082 28.0162C25.9914 28.1397 25.5143 28.2859 24.6368 28.3258C23.6882 28.3694 23.4032 28.3781 20.9998 28.3781C18.5963 28.3781 18.3121 28.3694 17.3638 28.3258ZM17.2892 12.0545C16.3311 12.0981 15.6764 12.2501 15.1047 12.4725C14.5126 12.7023 14.0113 13.0105 13.5104 13.5106C13.0095 14.0107 12.702 14.5128 12.4723 15.1049C12.2498 15.677 12.0979 16.3314 12.0543 17.2895C12.0099 18.2491 11.9998 18.5559 11.9998 21C11.9998 23.4441 12.0099 23.7509 12.0543 24.7105C12.0979 25.6687 12.2498 26.323 12.4723 26.8951C12.702 27.4868 13.0096 27.9895 13.5104 28.4894C14.0112 28.9893 14.5126 29.2971 15.1047 29.5275C15.6775 29.7499 16.3311 29.9019 17.2892 29.9455C18.2494 29.9891 18.5556 30 20.9998 30C23.4439 30 23.7507 29.9898 24.7103 29.9455C25.6684 29.9019 26.3227 29.7499 26.8948 29.5275C27.4866 29.2971 27.9882 28.9895 28.4891 28.4894C28.99 27.9893 29.2968 27.4868 29.5272 26.8951C29.7497 26.323 29.9023 25.6686 29.9452 24.7105C29.9889 23.7502 29.999 23.4441 29.999 21C29.999 18.5559 29.9889 18.2491 29.9452 17.2895C29.9016 16.3313 29.7497 15.6767 29.5272 15.1049C29.2968 14.5132 28.9892 14.0115 28.4891 13.5106C27.989 13.0097 27.4866 12.7023 26.8955 12.4725C26.3227 12.2501 25.6684 12.0974 24.711 12.0545C23.7514 12.0109 23.4446 12 21.0005 12C18.5564 12 18.2494 12.0102 17.2892 12.0545Z"
                        fill="#A98D4B"
                      />
                    </svg>
                  </div>
                </div>
                <div className="form_group fs">
                  <label>
                    <strong>
                      {t("Verify your phone number")}
                      <span
                        className={
                          errorfield.phone != "" && veri == "" ? "starred" : ""
                        }
                      >
                        *
                      </span>
                    </strong>
                    {t("Please enter your phone number for")}{" "}
                    <a>{t("verification")} </a>
                    <span className="smallpop">
                      {t(
                        "We are asking for the phone number verification to ensure additional security for our members. For more information please visit Safety center."
                      )}
                    </span>{" "}
                    {t("purposes")}
                  </label>
                  <div className="verification_number ">
                    <div className="number profilecretate">
                      <div
                        className="country_flag"
                        onClick={(e) => codeselect()}
                      >
                        <img src={contact_code.flag} />{" "}
                        {contact_code.code != ""
                          ? contact_code.code
                          : "+" + detailparents.countrycode}
                      </div>
                      <ul style={setcode ? { display: "none" } : {}}>
                        {country.data.map((e) => {
                          return (
                            <li
                              onClick={(a) => {
                                codeselect();
                                setcontact_code({
                                  flag: e.flag,
                                  code: e.dial_code,
                                });
                              }}
                            >
                              <img src={e.flag} />{" "}
                              {e.country + " " + " " + e.dial_code}
                            </li>
                          );
                        })}
                      </ul>
                      <input
                        type="number"
                        className={
                          error.phone && error.phone.length > 2
                            ? "bordererror"
                            : ""
                        }
                        placeholder={t("Enter phone number")}
                        onChange={(e) => {
                          setdetailparents({
                            ...detailparents,
                            phone: e.target.value,
                          });
                          detailparents.phone.length > 7
                            ? seterror({ ...error, phone: "" })
                            : seterror({ ...error, phone: "error" });
                        }}
                        defaultValue={
                          detailparents.phone != null ? detailparents.phone : ""
                        }
                      />

                      <button
                        onClick={(e) => mobileverify()}
                        style={
                          detail.phoneVerifiedStatus != null &&
                          detail.phoneVerifiedStatus == 1
                            ? { display: "none" }
                            : {}
                        }
                      >
                        {dis ? t("Wait") : t("Get code")}
                      </button>
                    </div>
                    <br />
                    <br />
                    <label>{t("Enter your verification code")}</label>
                    <div className="number">
                      <input
                        type="number"
                        className={
                          error.otperror && error.otperror.length > 2
                            ? "bordererror"
                            : ""
                        }
                        placeholder={t("Enter code")}
                        onChange={(e) => {
                          setotp(e.target.value);
                          otp.length > 2
                            ? seterror({ ...error, otperror: "" })
                            : seterror({ ...error, otperror: "error" });
                        }}
                      />
                      <button
                        onClick={(e) => otpverify()}
                        style={
                          detail.phoneVerifiedStatus != null &&
                          detail.phoneVerifiedStatus == 1
                            ? { display: "none" }
                            : {}
                        }
                      >
                        {t("Verify")}
                      </button>
                    </div>
                  </div>
                  <div
                    className="success"
                    id="success"
                    style={
                      detail.phoneVerifiedStatus != null &&
                      detail.phoneVerifiedStatus == 1
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
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
                    {t("Thank you ! Your phone number is verified.")}
                  </div>
                  <div
                    className="success2"
                    id="success4"
                    style={{ display: "none" }}
                  >
                    <svg
                      width="19"
                      height="16"
                      viewBox="0 0 19 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.5263 16L9.26316 0L0 16H18.5263ZM10.1052 13.4737H8.42096V11.7895H10.1052V13.4737ZM8.42096 10.1056H10.1052V6.73713H8.42096V10.1056Z"
                        fill="#7D2B8B"
                      />
                    </svg>
                    {t(
                      "Verification has failed. Please check if you have entered the correct number and try again in 60 seconds."
                    )}
                  </div>
                  <div
                    className="success2"
                    id="success3"
                    style={{ display: "none" }}
                  >
                    <svg
                      width="19"
                      height="16"
                      viewBox="0 0 19 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.5263 16L9.26316 0L0 16H18.5263ZM10.1052 13.4737H8.42096V11.7895H10.1052V13.4737ZM8.42096 10.1056H10.1052V6.73713H8.42096V10.1056Z"
                        fill="#7D2B8B"
                      />
                    </svg>
                    {t("Verification has failed. Please contact the")}{" "}
                    <Link to="/contact-us">{t("tech support")}</Link>{" "}
                    {t("for further assistance.")}
                  </div>
                  {/* <div className='errorfield'>{error.message}</div>*/}
                </div>
                <div className="button">
                  <button
                    onClick={(e) => {
                      stapset(5);
                      setmobile(-60);
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    {t("Back")}
                  </button>
                  <button
                    onClick={(e) => {
                      stapset(7);
                      setmobile(-75);
                      window.scrollTo({ top: 0 });
                      profile_update(false);
                      // if (detail.phoneVerifiedStatus == 1 || veri == "done") {
                      //     stapset(7)
                      //     setmobile(-75)
                      //     window.scrollTo({ top: 0 });
                      // } else {
                      //     seterrorfield({ ...errorfield, phone: "error" })
                      //     window.scrollTo({ top: 0 });
                      // }
                    }}
                  >
                    {t("Next")}
                  </button>
                </div>
              </div>
              {/**/}
              <div
                className="detail work-experience job_performance job_post setp4"
                style={stap == 7 ? {} : { display: "none" }}
              >
                <div className="form_group full">
                  <label>
                    <strong>
                      {t("Details for")}{" "}
                      {detail.service_type
                        ? t(Object.values(detail.service_type)[0])
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
                      language === "en"
                        ? `Experienced ${
                            detail.service_type
                              ? t(Object.values(detail.service_type)[0])
                              : ""
                          } with 10 years of experience`
                        : "Potreban nam je neko da radi sa našim detetom"
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
                        job_type: Object.values(detail.service_type)[0],
                      });
                    }}
                    defaultValue={t(detailparents.jobs)}
                  ></textarea>
                  {/* <div className='errorfield'>{error.message}</div>*/}
                  <span>
                    {t("Number of characters")} {70 - detailparents.jobs.length}
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
                      detail.service_type
                        ? Object.keys(detail.service_type)[0] == "tab1"
                          ? t(
                              "My name is Jelena and I am looking for a reliable, responsible and passionate nanny for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. Nanny would care for my son when I run errands, help with meal preparation for him and take him to the local park (walking distance). We need a nanny for Monday through Friday from 8 A.M. to 12 P.M."
                            )
                          : Object.keys(detail.service_type)[0] == "tab2"
                          ? t(
                              "My name is Jelena and I am looking for a reliable, responsible and passionate special education teacher to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills."
                            )
                          : Object.keys(detail.service_type)[0] == "tab3"
                          ? t(
                              "My name is Jelena and I am looking for a reliable, responsible and passionate special education paraprofessional to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills and possibly accompany him to the school"
                            )
                          : Object.keys(detail.service_type)[0] == "tab4"
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
                    defaultValue={t(detailparents.jobs_description)}
                  ></textarea>
                  {/* <div className='errorfield'>{error.message}</div>*/}
                  <span>
                    {t("Number of characters")}{" "}
                    {300 - detailparents.jobs_description.length}
                  </span>
                </div>
                <div class="form_group full socialpost border">
                  <label>
                    {t(
                      "I give my consent for this job to be shared by SensCare platform on social media"
                    )}
                    <span
                      className={
                        jobalready.plateformonsocialmedia == "" ? "starred" : ""
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
                {detail.service_type &&
                Object.keys(detail.service_type).length == 2 ? (
                  <>
                    <div className="form_group full">
                      <label>
                        <strong>
                          {t("Details for")}{" "}
                          {t(Object.values(detail.service_type)[1])}{" "}
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
                        placeholder={
                          t("Experienced") +
                          Object.values(detail.service_type)[1] +
                          t("with 10 years of experience")
                        }
                        maxlength="70"
                        name="message"
                        onChange={(e) => {
                          seterrorfield({ ...errorfield, jobs2: "" });
                          setjobalready({
                            ...jobalready,
                            job_type2: Object.values(detail.service_type)[1],
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
                        {70 - detailparents.jobs2.length}
                      </span>
                    </div>
                    <div className="form_group full sec">
                      <label>
                        {t("Job description")}
                        <span
                          className={
                            errorfield.jobs_description2 != "" ? "starred" : ""
                          }
                        >
                          *
                        </span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder={
                          detail.service_type
                            ? Object.keys(detail.service_type)[1] == "tab1"
                              ? t(
                                  "My name is Jelena and I am looking for a reliable, responsible and passionate nanny for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. Nanny would care for my son when I run errands, help with meal preparation for him and take him to the local park (walking distance). We need a nanny for Monday through Friday from 8 A.M. to 12 P.M."
                                )
                              : Object.keys(detail.service_type)[1] == "tab2"
                              ? t(
                                  "My name is Jelena and I am looking for a reliable, responsible and passionate special education teacher to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills."
                                )
                              : Object.keys(detail.service_type)[1] == "tab3"
                              ? t(
                                  "My name is Jelena and I am looking for a reliable, responsible and passionate special education paraprofessional to work with for my 3-year-old son. We are an easy going family of 3 members, and we love to engage in outdoor activities. We need someone to work with our son in the development of fine motor and language skills and possibly accompany him to the school"
                                )
                              : Object.keys(detail.service_type)[1] == "tab4"
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
                        {t("Number of characters")}{" "}
                        {300 - detailparents.jobs_description2.length}
                      </span>
                    </div>
                    <div class="form_group full socialpost">
                      <label>
                        {t(
                          "I give my consent for this job to be shared by SensCare platform on social media"
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
                {/* && jobalready.plateformonsocialmedia*/}
                <div className="button">
                  <button
                    onClick={(e) => {
                      stapset(6);
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    {t("Back")}
                  </button>
                  <button
                    disabled={dis}
                    onClick={(e) => {
                      if (
                        detailparents.jobs != "" &&
                        detailparents.jobs_description != "" &&
                        (detail.service_type &&
                        Object.keys(detail.service_type).length == 2
                          ? detailparents.jobs2 != "" &&
                            detailparents.jobs_description2 != "" &&
                            jobalready.plateformonsocialmedia2 &&
                            jobalready.plateformonsocialmedia
                          : detailparents.jobs != "")
                      ) {
                        profile_update(true);
                        setTimeout(() => {
                          setShowflogin(true);
                        }, 1000);
                      } else {
                        step7.map((e) => {
                          after_logins_field(e.name);
                        });
                      }
                    }}
                  >
                    {t("Finish")}
                  </button>
                </div>
              </div>
              {/**/}
              <Modal show={showflogin} onHide={handleCloselogin_first}>
                <Modal.Body>
                  <div className="promocode_content login_first">
                    <Link to="" onClick={handleCloselogin_first}>
                      +{" "}
                    </Link>
                    <h2>{t("Congratulations! Your post is live now")}.</h2>
                    <img src="./images/create_profile.png" />
                    <p className="pro">
                      {t(
                        "SensCare wishes you to find the best provider! See your post"
                      )}{" "}
                      <Link to="/search-parents">{t("here")}</Link>
                    </p>
                    <button onClick={redirect}>
                      {t("Search for candidates")}
                    </button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Create_parent_profile;
