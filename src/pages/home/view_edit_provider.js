import React, { useState, useEffect } from "react";
import Calander from "./common/calander";
import DatePicker from "react-datepicker";
import { api } from "../../urls";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { country } from "./common/country";
import { FacebookProvider, LoginButton } from "react-facebook";
import Modal from "react-bootstrap/Modal";
import Profession_change from "./profession_chnage";
import Provider_profession_chnage from "./provider_profession_change";
import LinkedInPage from "./common/linkedin";
import { useTranslation } from "react-i18next";
import customJson from "./common/custom.json";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
function View_edit_provider() {
  const { t, i18n } = useTranslation("view_edit");
  const language = i18n.language;

  const [show, setShow] = useState(false);
  const [disableset, setdisableset] = useState("");
  const handleClose = () => setShow(false);
  const [ssubtab, setssubtab] = useState({
    About: localStorage.getItem("edittime") ? "active" : "",
    kids: localStorage.getItem("edittime") ? "active" : "",
    Experience: "",
    job: localStorage.getItem("edittime") ? "active" : "",
    availability: localStorage.getItem("edittime") ? "active" : "",
    info: localStorage.getItem("edittime") ? "active" : "",
    security: localStorage.getItem("edittime") ? "active" : "",
    personal: localStorage.getItem("edittime") ? "active" : "",
  });
  const [photoupload, setphotoupload] = useState(false);
  const [profile, setprofile] = useState({});
  const [calandertype, setcalandertype] = useState(1);
  const [certificates, setcertificates] = useState({
    qualificationscertificatesname: "",
    qualificationscertificatesname2: "",
    qualificationscertificatesname3: "",
    qualificationscertificatesname4: "",
  });

  const [tutorusd, settutorusd] = useState({
    min: 0,
    max: 0,
  });
  const [prefcityforpromo, setprefcityforpromo] = useState({
    firstcity: "",
    secondcity: "",
    thirdcity: "",
  });
  const [promotionaloffersfor, setpromotionaloffersfor] = useState({
    afterAll: "",
    licensed: "",
    medical: "",
    education: "",
    special: "",
    activities: "",
    other: "",
  });
  const [educationalproductoffersfor, seteducationalproductoffersfor] =
    useState({
      sensory: "",
      school: "",
      all: "",
      educational: "",
      baby: "",
    });
  const [edit, setedit] = useState({
    About: localStorage.getItem("edittime") ? "edit" : "",
    kids: localStorage.getItem("edittime") ? "edit" : "",
    Experience: "",
    job: localStorage.getItem("edittime") ? "edit" : "",
    availability: localStorage.getItem("edittime") ? "edit" : "",
    info: localStorage.getItem("edittime") ? "edit" : "",
    security: localStorage.getItem("edittime") ? "edit" : "",
    personal: localStorage.getItem("edittime") ? "edit" : "",
  });
  const [count, setcount] = useState(true);
  const [range, setrange] = useState(0);
  const [sepallapplicable, setsepallapplicable] = useState([]);
  const [setallapplicable2, setsetallapplicable2] = useState([]);
  const [utorexperience, setutorexperience] = useState(0);
  const [sepworkexp, setsepworkexp] = useState(0);
  const [experience, setexperience] = useState(0);
  const [allapplicable, setallapplicable] = useState([]);
  const [nchildren, setnchildren] = useState("");
  const [children_age2, setchildren_age2] = useState([]);
  const [laveo, setlavelo] = useState(false);
  const [awarded, setawarded] = useState(false);
  const [catopen, setcatopen] = useState(true);
  const [methods, setmethods] = useState({
    setexpmethods: "",
    setexpmethods2: "",
    setexpmethods3: "",
    setexpmethods4: "",
  });
  const [today, settoday] = useState(new Date());
  const [selectcat2, setselectcat2] = useState([]);
  const [tutorintrestedinm, settutorintrestedinm] = useState({
    fulltime: "",
    parttime: "",
    occasionally: "",
  });
  const [languages, setlanguages] = useState([]);
  const selectoption5 = (data) => {
    let sum = false;
    sepallapplicable.map((e, index) => {
      if (e.name == data) {
        sum = true;
        sepallapplicable.splice(index, 1);
      }
    });
    if (sum == false) {
      sepallapplicable.push({ name: data });
    }
    setTimeout(() => {
      setsepallapplicable([...sepallapplicable]);
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
  const selectoption3 = (data) => {
    let sum = false;
    allapplicable.map((e, index) => {
      if (e.name == data) {
        sum = true;
        allapplicable.splice(index, 1);
      }
    });
    if (sum == false) {
      allapplicable.push({ name: data });
    }
    setTimeout(() => {
      setallapplicable([...allapplicable]);
    }, 500);
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
  const languageselect = (data) => {
    let sum = false;
    let x = data.substr(data.lastIndexOf("\\") + 1).split("_")[0];
    languages.map((e, index) => {
      if (e.name.substr(e.name.lastIndexOf("\\") + 1).split("_")[0] == x) {
        sum = true;
        e.name = data;
      }
    });
    if (sum == false) {
      languages.push({ name: data });
    }
    setTimeout(() => {
      setlanguages([...languages]);
    }, 500);
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
  const selectoption4 = (data) => {
    let sum = false;
    children_age2.map((e, index) => {
      if (e.name == data) {
        sum = true;
        children_age2.splice(index, 1);
      }
    });
    if (sum == false) {
      children_age2.push({ name: data });
    }
    setTimeout(() => {
      setchildren_age2([...children_age2]);
    }, 500);
  };

  const [detail, setdetail] = useState({});

  const [children_age, setchildren_age] = useState([]);
  const [children, setchildren] = useState(0);
  const [selectcat, setselectcat] = useState([]);

  const [inactiveprofessional, setinactiveprofessional] = useState({});
  const [activeprofession, setactiveprofession] = useState(
    JSON.parse(sessionStorage.getItem("service"))
      ? JSON.parse(sessionStorage.getItem("service"))
      : {}
  );

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
  const [qualifications, setqualifications] = useState({
    English: "",
    Serbian: "",
    Mathematics: "",
    Physics: "",
    Chemistry: "",
    Other: "",
  });
  const [dis, setdis] = useState(false);
  const [otp, setotp] = useState("");

  const [setcode, setsetcode] = useState(true);
  const [error, seterror] = useState({
    phone: "",
    email: "",
  });
  const [veri, setveri] = useState("");
  const [failed, setfailed] = useState(0);
  const [habit, sethabit] = useState({
    smoke: "",
    licence: "",
    kids: "",
    housework: "",
    family: "",
  });
  const codeselect = () => {
    if (setcode) {
      setsetcode(false);
    } else {
      setsetcode(true);
    }
  };
  const [image, setImage] = useState(null);
  const [photo, setphoto] = useState("");
  const [contact_code, setcontact_code] = useState({
    code: "",
    flag: "",
  });
  const [errorfield, seterrorfield] = useState({
    about: "",
    profile_headline: "",
    video: "",
    file_path: "",
    educationlevel: "",
    school: "",
    yearawarded: "",
    recommendationsfile: "",
    qualificationscertificatesname: "",
    cv: "",
    qualificationscertificatesdoc: "",
    nanynewbornexp: "",
    nanyyearexp: "",
    setareaexperties: "",
    setexpmethods: "",
    setexpiep: "",
    setyearexp: range,
    setallapplicable: setallapplicable2,
    nanyexpwithkid: "",
    tutorexp: utorexperience,
    sepexpwithkid: "",
    nanyallapplicable: allapplicable,
    sepallapplicable: sepallapplicable,
    sepexpmethods: "",
    sepworkexp: sepworkexp,
    nanyperhrrate: usd.min,
    tutorliketoteach: qualifications,
    tutorintrestedonlinecls: "",
    tutorintrestedinschool: "",
    tutorallapplicable: selectcat,
    tutorperhrrate: tutorusd.min,
    tutorworkwithnochild: children,
    tutorprefchildage: children_age,
    tutorstartdate: "",
    tutorintrestedin: "",
    tutorliketoteach: "",
    nanyhrrate: usd.min,
    nanyintrestedinschool: "",
    nanyworkwithnochild: nchildren,
    nanystartdate: "",
    nanyprefchildage: children_age2,
    nanyintrestedin: "",
    fulltime: {},
    beforeschool: {},
    afterschool: {},
    overnight: {},
    weekends: {},
    englishlevel: "",
    italianlevel: "",
    spanishlevel: "",
    germanlevel: "",
    chineselevel: "",
    frenchlevel: "",
    otherlangname: "",
    otherlevel: "",
    phone: "",
    backgrounddoc: "",
    backgroundstatus: "",
    smoke: habit.smoke,
    carorlicence: habit.licence,
    cooking: habit.kids,
    lighthousework: habit.housework,
    traveling: habit.family,
    workingabroad: "",
    livewithfamily: "",
    anyallergies: "",
    anyallergiesdescription: "",
    medicalcondition: "",
    medicalconditiondescription: "",
    plateformsocialmedia: "",
    seperhrrate: "",
    seterhrrate: "",
    yearofexpasteacher: "",
  });
  const [detailprovider, setdetailprovider] = useState({
    about: "",
    profile_headline: "",
    video: "",
    file_path: "",
    educationlevel: "",
    school: "",
    yearawarded: "",
    recommendationsfile: "",
    qualificationscertificatesname: "",
    cv: "",
    qualificationscertificatesdoc: "",
    nanynewbornexp: "",
    nanyyearexp: "",
    setareaexperties: "",
    setexpmethods: "",
    setexpiep: "",
    setyearexp: range,
    setallapplicable: setallapplicable2,
    nanyexpwithkid: "",
    tutorexp: utorexperience,
    sepexpwithkid: "",
    nanyallapplicable: allapplicable,
    sepallapplicable: sepallapplicable,
    sepexpmethods: "",
    sepworkexp: sepworkexp,
    nanyperhrrate: usd.min,
    tutorliketoteach: qualifications,
    tutorintrestedonlinecls: "",
    tutorintrestedinschool: "",
    tutorallapplicable: selectcat,
    tutorperhrrate: tutorusd.min,
    tutorworkwithnochild: "",
    tutorprefchildage: "",
    tutorstartdate: "",
    tutorintrestedin: "",
    nanyhrrate: usd.min,
    nanyintrestedinschool: "",
    nanyworkwithnochild: nchildren,
    nanystartdate: "",
    nanyprefchildage: children_age2,
    nanyintrestedin: "",
    fulltime: {},
    beforeschool: {},
    afterschool: {},
    overnight: {},
    weekends: {},
    countrycode: "",
    englishlevel: "",
    italianlevel: "",
    spanishlevel: "",
    germanlevel: "",
    chineselevel: "",
    frenchlevel: "",
    otherlangname: "",
    otherlevel: "",
    phone: "",
    facebookverify: "",
    twitterverify: "",
    linkdinverify: "",
    instaverify: "",
    backgrounddoc: "",
    backgroundstatus: "",
    smoke: habit.smoke,
    carorlicence: habit.licence,
    cooking: habit.kids,
    lighthousework: habit.housework,
    traveling: habit.family,
    workingabroad: "",
    livewithfamily: "",
    anyallergies: "",
    anyallergiesdescription: "",
    medicalcondition: "",
    medicalconditiondescription: "",
    plateformsocialmedia: "",
    seperhrrate: "",
    seterhrrate: "",
    yearofexpasteacher: 0,
    alertJobposts: "",
    profileactions: "",
  });

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
        if (result.data.qualificationscertificatesname[0]) {
          var iterator = result.data.qualificationscertificatesname.values();
          var y = {};
          setprofile(result.data);
          for (let elements of iterator) {
            if (elements == "First Aid") {
              y = { ...y, qualificationscertificatesname: elements };
            } else if (elements == "Montessori") {
              y = { ...y, qualificationscertificatesname2: elements };
            } else if (elements == "Board Certified Nurse") {
              y = { ...y, qualificationscertificatesname3: elements };
            } else if (
              elements != "First Aid" &&
              elements != "Montessori" &&
              elements != "Board Certified Nurse"
            ) {
              setcertificates({
                ...certificates,
                ...y,
                qualificationscertificatesname4:
                  elements != null ? elements : "",
              });
            }
          }
        }

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

        console.log(result.data, parseInt(result.data.calanderlastupdate));
        setTimeout(() => {
          const x = Object.keys(detailprovider).forEach(function (key) {
            detailprovider[key] =
              result.data[key] != null ? result.data[key] : "";
            setdetailprovider({ ...detailprovider });
          });
        }, 500);
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
        setallapplicable(
          result.data.nanyallapplicable != null
            ? result.data.nanyallapplicable
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
        setnchildren(
          result.data.nanyworkwithnochild != null
            ? result.data.nanyworkwithnochild
            : ""
        );
        setchildren_age(
          result.data.tutorprefchildage != null
            ? result.data.tutorprefchildage
            : []
        );
        setchildren(
          result.data.nanyworkwithnochild != null
            ? result.data.tutorworkwithnochild
            : ""
        );
        setselectcat(
          result.data.tutorallapplicable != null
            ? result.data.tutorallapplicable
            : []
        );
        setchildren_age2(
          result.data.nanyprefchildage != null
            ? result.data.nanyprefchildage
            : []
        );
        setsepallapplicable(
          result.data.sepallapplicable != null
            ? result.data.sepallapplicable
            : []
        );
        setsetallapplicable2(
          result.data.setallapplicable != null
            ? result.data.setallapplicable
            : []
        );
        setqualifications(
          result.data.tutorliketoteach != null
            ? result.data.tutorliketoteach
            : {}
        );
        sethabit({
          smoke: result.data.smoke ? result.data.smoke : "",
          licence: result.data.carorlicence ? result.data.carorlicence : "",
          kids: result.data.cooking ? result.data.cooking : "",
          housework: result.data.lighthousework
            ? result.data.lighthousework
            : "",
          family: result.data.traveling ? result.data.traveling : "",
        });
        setTimeout(() => {
          if (result.data.calanderlastupdate != null) {
            setcalandertype(parseInt(result.data.calanderlastupdate));
          }
        }, 2000);
        setmethods(
          result.data.setexpmethods
            ? JSON.parse(result.data.setexpmethods)
            : methods
        );
        // setlanguages(
        //     result.data.englishlevel != null ? [{ name: result.data.englishlevel }] : result.data.frenchlevel != null ? [{ name: result.data.frenchlevel }] : result.data.italianlevel != null ? [{ name: result.data.italianlevel }] : result.data.germanlevel != null ? [{ name: result.data.germanlevel }] : result.data.spanishlevel != null ? [{ name: result.data.spanishlevel }] : result.data.chineselevel != null ? [{ name: result.data.chineselevel }] : result.data.otherlevel != null ? [{ name: result.data.otherlevel }] : []
        // )
        setinactiveprofessional(
          result.data.inactive_service != null
            ? result.data.inactive_service
            : {}
        );

        result.data.prefcityforpromo
          ? setprefcityforpromo(result.data.prefcityforpromo)
          : setprefcityforpromo(prefcityforpromo);
        result.data.promotionaloffersfor
          ? setpromotionaloffersfor(result.data.promotionaloffersfor)
          : setpromotionaloffersfor(promotionaloffersfor);
        result.data.educationalproductoffersfor
          ? seteducationalproductoffersfor(
              result.data.educationalproductoffersfor
            )
          : seteducationalproductoffersfor(educationalproductoffersfor);
        sessionStorage.setItem(
          "service",
          JSON.stringify(result.data.service_type)
        );
        // setactiveprofession(result.data.service_type)
      })
      .catch((error) => console.log("error", error));
  };
  const mobileverify = () => {
    if (detailprovider.phone.length > 9) {
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
            ? contact_code.code + detailprovider.phone
            : "+" + detailprovider.countrycode + detailprovider.phone,
        phone: detailprovider.phone,
        countrycode:
          contact_code.code != ""
            ? contact_code.code
            : detailprovider.countrycode,
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
        phone: detailprovider.phone,
        countrycode:
          contact_code.code != ""
            ? contact_code.code
            : detailprovider.countrycode,
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

  const profile_update = () => {
    localStorage.setItem("search", "Profile");
    localStorage.setItem("search2", "setting");
    sessionStorage.clear();
    setdis(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var formdata = new FormData();
    formdata.append("user_id", localStorage.getItem("id"));
    formdata.append("about", detailprovider.about);
    formdata.append("profile_headline", detailprovider.profile_headline);
    detailprovider.video.name
      ? formdata.append("video", detailprovider.video)
      : formdata.append("about", detailprovider.about);
    detailprovider.file_path.name
      ? formdata.append("file_path", detailprovider.file_path)
      : formdata.append("about", detailprovider.about);
    formdata.append("educationlevel", detailprovider.educationlevel);
    formdata.append("school", detailprovider.school);
    formdata.append("yearawarded", detailprovider.yearawarded);
    detailprovider.recommendationsfile.name
      ? formdata.append(
          "recommendationsfile",
          detailprovider.recommendationsfile
        )
      : formdata.append("about", detailprovider.about);
    formdata.append(
      "qualificationscertificatesname[]",
      certificates.qualificationscertificatesname
    );
    formdata.append(
      "qualificationscertificatesname[]",
      certificates.qualificationscertificatesname2
    );
    formdata.append(
      "qualificationscertificatesname[]",
      certificates.qualificationscertificatesname3
    );
    formdata.append(
      "qualificationscertificatesname[]",
      certificates.qualificationscertificatesname4
    );
    detailprovider.cv.name
      ? formdata.append("cv", detailprovider.cv)
      : formdata.append("about", detailprovider.about);
    detailprovider.qualificationscertificatesdoc.name
      ? formdata.append(
          "qualificationscertificatesdoc[]",
          detailprovider.qualificationscertificatesdoc
        )
      : formdata.append("about", detailprovider.about);
    formdata.append("nanynewbornexp", detailprovider.nanynewbornexp);
    formdata.append("nanyyearexp", experience);
    formdata.append("setareaexperties", detailprovider.setareaexperties);
    formdata.append("setexpmethods[]", JSON.stringify(methods));
    formdata.append("setexpiep", detailprovider.setexpiep);
    formdata.append("setyearexp", range);
    formdata.append("setallapplicable", JSON.stringify(setallapplicable2));
    formdata.append("nanyexpwithkid", detailprovider.nanyexpwithkid);
    formdata.append("tutorexp", utorexperience);
    formdata.append("sepexpwithkid", detailprovider.sepexpwithkid);
    formdata.append("nanyallapplicable", JSON.stringify(allapplicable));
    formdata.append("sepallapplicable", JSON.stringify(sepallapplicable));
    formdata.append("sepexpmethods", detailprovider.sepexpmethods);
    formdata.append("sepworkexp", sepworkexp);
    formdata.append("countrycode", contact_code.code);
    formdata.append("nanyperhrrate", usd.min + "-" + usd.max);
    formdata.append("tutorliketoteach", JSON.stringify(qualifications));
    formdata.append(
      "tutorintrestedonlinecls",
      detailprovider.tutorintrestedonlinecls
    );
    formdata.append(
      "tutorintrestedinschool",
      detailprovider.tutorintrestedinschool
    );
    formdata.append("tutorallapplicable", JSON.stringify(selectcat));
    formdata.append("tutorperhrrate", tutorusd.min + "-" + tutorusd.max);
    formdata.append("tutorworkwithnochild", children);
    formdata.append("tutorprefchildage", JSON.stringify(children_age));
    formdata.append("tutorstartdate", detailprovider.tutorstartdate);
    formdata.append("tutorintrestedin", detailprovider.tutorintrestedin);
    formdata.append("nanyhrrate", usd.min + "-" + usd.max);
    formdata.append(
      "nanyintrestedinschool",
      detailprovider.nanyintrestedinschool
    );
    formdata.append("nanyworkwithnochild", nchildren);
    formdata.append("nanystartdate", detailprovider.nanystartdate);
    formdata.append("nanyprefchildage", JSON.stringify(children_age2));
    formdata.append("nanyintrestedin", detailprovider.nanyintrestedin);
    formdata.append("fulltime", JSON.stringify(detailprovider.fulltime));
    formdata.append(
      "beforeschool",
      JSON.stringify(detailprovider.beforeschool)
    );
    formdata.append("afterschool", JSON.stringify(detailprovider.afterschool));
    formdata.append("overnight", JSON.stringify(detailprovider.overnight));
    formdata.append("weekends", JSON.stringify(detailprovider.weekends));
    formdata.append("englishlevel", detailprovider.englishlevel);
    formdata.append("italianlevel", detailprovider.italianlevel);
    formdata.append("spanishlevel", detailprovider.spanishlevel);
    formdata.append("germanlevel", detailprovider.germanlevel);
    formdata.append("chineselevel", detailprovider.chineselevel);
    formdata.append("frenchlevel", detailprovider.frenchlevel);
    formdata.append("otherlangname", detailprovider.otherlangname);
    formdata.append("otherlevel", detailprovider.otherlevel);
    // formdata.append("phoneno", detailprovider.phone);
    detailprovider.backgrounddoc.name
      ? formdata.append("backgrounddoc", detailprovider.backgrounddoc)
      : formdata.append("about", detailprovider.about);
    formdata.append("backgroundstatus", detailprovider.backgroundstatus);
    formdata.append("smoke", habit.smoke);
    formdata.append("carorlicence", habit.licence);
    formdata.append("cooking", habit.kids);
    formdata.append("lighthousework", habit.housework);
    formdata.append("traveling", habit.family);
    formdata.append("workingabroad", detailprovider.workingabroad);
    formdata.append("livewithfamily", detailprovider.livewithfamily);
    formdata.append("anyallergies", detailprovider.anyallergies);
    formdata.append(
      "anyallergiesdescription",
      detailprovider.anyallergiesdescription
    );
    formdata.append("medicalcondition", detailprovider.medicalcondition);
    formdata.append(
      "medicalconditiondescription",
      detailprovider.medicalconditiondescription
    );
    formdata.append(
      "plateformsocialmedia",
      detailprovider.plateformsocialmedia
    );
    formdata.append("facebookverify", detailprovider.facebookverify);
    formdata.append("twitterverify", detailprovider.twitterverify);
    formdata.append("linkdinverify", detailprovider.linkdinverify);
    formdata.append("instaverify", detailprovider.instaverify);
    formdata.append("seterhrrate", usd3.min + "-" + usd3.max);
    formdata.append("seperhrrate", usd4.min + "-" + usd4.max);
    formdata.append("yearofexpasteacher", detailprovider.yearofexpasteacher);
    formdata.append(
      "active_service",
      Object.keys(activeprofession).length > 0
        ? JSON.stringify(activeprofession)
        : ""
    );
    formdata.append(
      "inactive_service",
      Object.keys(inactiveprofessional).length > 0
        ? JSON.stringify(inactiveprofessional)
        : ""
    );
    formdata.append(
      "alertJobposts",
      detailprovider.alertJobposts != "" ? detailprovider.alertJobposts : "yes"
    );
    // formdata.append("profileactions", detailprovider.profileactions != "" ? detailprovider.profileactions : "yes")
    formdata.append("calanderlastupdate", calandertype);

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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setdis(false);
        console.log("error", error);
      });
  };
  const profile_update2 = () => {
    setphotoupload(false);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var formdata = new FormData();
    formdata.append("user_id", localStorage.getItem("id"));
    formdata.append("file_path", photo);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(api + "/api/v1/updateparents", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setphotoupload(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    if (count) {
      setcount(false);
      profile_data();
    }
  }, [
    detail,
    detailprovider,
    prefcityforpromo,
    promotionaloffersfor,
    inactiveprofessional,
    activeprofession,
  ]);
  const calender_data = (name, e) => {
    console.log(name, e);
    setdetailprovider({ ...detailprovider, [name]: e });
  };
  const handleResponse = (data) => {
    console.log(data);
    if (data.profile.type) {
      setdetailprovider({ ...detailprovider, linkdinverify: true });
    } else {
      setdetailprovider({ ...detailprovider, facebookverify: true });
    }
  };

  const handleError = (error) => {
    console.log({ error });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setphoto(event.target.files[0]);
    }
  };

  return (
    <div className="Account daskshow editview providerprofile">
      <h2>{t("Profile Overview")}</h2>
      <h3>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 15V13H11V15H9ZM9 5V11H11V5H9Z"
            fill="#A98D4B"
          />
        </svg>
        {t(
          "Keeping your profile up-to-date increases your chances of getting hired."
        )}
      </h3>
      <div className="profile_full left_side_section ">
        <div class="profile_box">
          <h2>{t("Profile Overview")}</h2>
          <div class="profile_box_social">
            <div class="profile_box_social_sec1">
              <img
                src={window.location.origin + "/images/share_icon.svg"}
                alt=""
              />
              {detail.phoneVerifiedStatus == 1 ? (
                <img
                  src={window.location.origin + "/images/nany_phone.svg"}
                  alt=""
                />
              ) : (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z"
                    fill="#B7B7B7"
                  />
                </svg>
              )}
              <img
                src={window.location.origin + "/images/nany_msg.svg"}
                alt=""
              />
              {detail.facebookverify != null || detail.linkdinverify != null ? (
                <img
                  src={window.location.origin + "/images/nany_cont.svg"}
                  alt=""
                />
              ) : (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z"
                    fill="#B7B7B7"
                  />
                </svg>
              )}
              {detail.docsStatus == "Yes" ? (
                <img src={window.location.origin + "/images/ok.svg"} alt="" />
              ) : (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z"
                    fill="#B7B7B7"
                  />
                </svg>
              )}
            </div>
            {localStorage.getItem("user_type") == "parents" ? (
              // <span className='addjob'>
              //     <Profession_change />
              // </span>
              ""
            ) : (
              <div class="profile_box_social_sec2">
                {detail.service_type && detail.service_type.tab1 == "Nanny" ? (
                  <img
                    src={window.location.origin + "/images/nany_pur.svg"}
                    alt=""
                  />
                ) : (
                  ""
                )}
                {detail.service_type && detail.service_type.tab2 ? (
                  <img
                    src={
                      window.location.origin + "/images/special_education.svg"
                    }
                    alt=""
                  />
                ) : (
                  ""
                )}
                {detail.service_type && detail.service_type.tab3 ? (
                  <img
                    src={window.location.origin + "/images/professional.svg"}
                    alt=""
                  />
                ) : (
                  ""
                )}
                {detail.service_type && detail.service_type.tab4 ? (
                  <img
                    src={window.location.origin + "/images/tutorform.svg"}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          <div class="profile_pic_sec">
            {/* <img src="img/left_pic.png" alt="" /> */}
            <div class="profile_pic">
              <img
                src={api + "/public/assets/images/users/" + detail.file_path}
                width="80"
                height="80"
                alt=""
              />
              <div class="edit_icon">
                <Link to="" onClick={(e) => setphotoupload(true)}>
                  <img
                    src={window.location.origin + "/images/edit.svg"}
                    alt=""
                  />
                </Link>
              </div>
            </div>
            {/* <img src="img/right_pic.png" alt="" /> */}
          </div>
          <div class="profile_detail">
            <p>
              <svg
                style={{ float: "none" }}
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 4.5V1C14 0.45 13.55 0 13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V7.5L18 11.5V0.5L14 4.5Z"
                  fill="#C8B483"
                />
              </svg>{" "}
              {detail.first_name + " " + detail.last_name}{" "}
              <img
                src={window.location.origin + "/images/img_heart.svg"}
                alt=""
              />
            </p>
            <div class="profilestart_video">
              {detail?.reviewAvg ? (
                <>
                  {[...Array(detail?.reviewAvg)].map((star, index) => {
                    index += 1;
                    return (
                      <svg
                        width="12"
                        height="12"
                        style={{ marginLeft: "3px" }}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z"
                          fill="#A98D4B"
                        />
                      </svg>
                    );
                  })}
                  {[...Array(5 - detail?.reviewAvg)].map((star, index) => {
                    index += 1;
                    return (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        style={{ marginLeft: "3px" }}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z"
                          stroke="#A98D4B"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    );
                  })}
                </>
              ) : (
                ""
              )}{" "}
              <span> ({detail.reviewcount})</span>
            </div>
          </div>
          <div class="profile_functions">
            <div class="members">
              <h5>
                {new Date().getFullYear() -
                  new Date(detail.created_at).getFullYear() >
                0
                  ? new Date().getFullYear() -
                    new Date(detail.created_at).getFullYear() +
                    t(" YRS")
                  : 0 + t(" YRS")}{" "}
              </h5>
              <h6>{t("Member")}</h6>
            </div>
            <div class="vi"></div>
            {localStorage.getItem("user_type") == "parents" ? (
              <div class="applications">
                <h5>{detail.jobs}</h5>
                <h6>{t("Job posts")}</h6>
              </div>
            ) : (
              <div class="applications">
                <h5>{detail.jobApplicationcount}</h5>
                <h6>{t("Applications")}</h6>
              </div>
            )}
            <div class="vi"></div>
            <div class="hiring">
              <h5>{detail.hiringcount}</h5>
              <h6>{t("Hirings")}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="about_edit">
        <p>
          <h4>{t("About me_provider")}</h4>
          <svg
            width="40"
            height="29"
            viewBox="0 0 40 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.0698 9.06977C19.0698 3.95348 14.8837 0 9.76744 0C4.65116 0 0.348837 3.95348 0.348837 9.06977C0.348837 12.907 2.09302 15.5814 5.69767 17.2093C6.04651 17.907 6.27907 18.6047 6.27907 19.4186C6.27907 22.093 4.18605 24.4186 0 26.2791L1.97674 28.8372C11.2791 25.1163 19.0698 16.3953 19.0698 9.06977ZM40 9.06977C40 3.95348 35.6977 0 30.6977 0C25.5814 0 21.2791 3.95348 21.2791 9.06977C21.2791 12.907 23.0233 15.5814 26.6279 17.2093C26.9767 17.907 27.2093 18.6047 27.2093 19.4186C27.2093 22.093 25.1163 24.4186 20.9302 26.2791L22.907 28.8372C32.2093 25.1163 40 16.3953 40 9.06977Z"
              fill="#7D2B8B"
            />
          </svg>
          <span>{detail.about}</span>
        </p>
        <div className="rating">
          <h5>{t("Average rating")}</h5>

          <div className="score" style={{ borderColor: "#7D2B8B" }}>
            <span style={{ color: "#7D2B8B" }}>
              {detail.reviewAvg} <br />
              {detail?.reviewcount ? (
                <>
                  {[...Array(detail?.reviewAvg)].map((star, index) => {
                    index += 1;
                    return (
                      <svg
                        width="12"
                        height="12"
                        style={{ marginLeft: "3px" }}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z"
                          fill="#7D2B8B"
                        />
                      </svg>
                    );
                  })}
                  {[...Array(5 - detail?.reviewAvg)].map((star, index) => {
                    index += 1;
                    return (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        style={{ marginLeft: "3px" }}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z"
                          stroke="#7D2B8B"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </span>
          </div>
          <p>
            {detail?.reviewAvg == 5
              ? t(
                  "You are an amazing employee. Continue with excellent reviews and outstanding cooperation."
                )
              : detail?.reviewAvg == 4
              ? t(
                  "Let's get your review score even higher! Visit the profiles of candidates with high reviews to see which skills employers value the most and what they expect from candidates. You will benefit from our amazing tips on how to find and hire great clients."
                )
              : detail?.reviewAvg == 3
              ? t(
                  "Remember that our  outstanding management team is here to help you expand your experience and get your scores higher. We are happy to teamwork with you. Contact us at support@mysenscare.com"
                )
              : detail?.reviewAvg <= 2
              ? t(
                  "If your score falls below 2 stars from more than 3 reviewers, your profile will be automatically put on hold."
                )
              : ""}{" "}
          </p>
        </div>
        <div className="rating">
          <h5>{t("Profile views")}</h5>
          <div className="score">
            <span>{detail.visitorcount}</span>
          </div>
          <p>
            <strong>{t("Tip:")}</strong>{" "}
            {t(
              "Keep your profile completed and up to date to increase your profile views."
            )}
          </p>
        </div>
      </div>
      <div
        className={ssubtab.About == "active" ? "active personal" : "personal"}
      >
        <h3
          onClick={(e) =>
            setssubtab({
              ...ssubtab,
              About: ssubtab.About == "" ? "active" : "",
            })
          }
        >
          {t("About.")}
        </h3>
        {ssubtab.About == "active" ? (
          <div className="editabout">
            {edit.About == "" ? (
              <>
                <button onClick={(e) => setedit({ ...edit, About: "edit" })}>
                  <img
                    src={window.location.origin + "/images/edit.svg"}
                    alt=""
                  />
                </button>

                <h4>{t("Your Profile headline")}</h4>
                <p>{detail.profile_headline}</p>
                <br />
                <h4>{t("About me_provider")}</h4>
                <p>{detail.about}</p>
              </>
            ) : (
              <div className="Profile_complete">
                <div className="detail parents1 stap1">
                  <div className="form_group full">
                    <label>
                      {t("Your profile headline")}
                      <span
                        className={
                          errorfield.profile_headline != "" ? "starred" : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      className={
                        errorfield.profile_headline != "" ? "bordererror" : ""
                      }
                      placeholder={
                        detail.service_type
                          ? t("Experienced ") +
                            Object.values(detail.service_type)[0] +
                            t("with 10 years of experience.")
                          : ""
                      }
                      maxlength="50"
                      name="message"
                      defaultValue={detailprovider.profile_headline}
                      onChange={(e) => {
                        seterrorfield({ ...errorfield, profile_headline: "" });
                        setdetailprovider({
                          ...detailprovider,
                          profile_headline: e.target.value,
                        });
                      }}
                    ></textarea>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                    <span>
                      {t("Number of characters")}
                      {50 - detailprovider.profile_headline.length}
                    </span>
                  </div>
                  <div className="form_group full sec">
                    <label>
                      {t("Tell us more about yourself")}
                      <span className={errorfield.about != "" ? "starred" : ""}>
                        *
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      className={errorfield.about != "" ? "bordererror" : ""}
                      placeholder={
                        detail.service_type
                          ? Object.keys(detail.service_type).filter(
                              (e) => e == "tab2"
                            )[0]
                            ? t(
                                "My name is Jelena and I am a reliable and experienced special education teacher. I’ve been working with kids with developmental disabilities for the past 5 years and I am very passionate and committed to make meaningful progress in their life. Upon request, I can share my background check along with the references of the previous employee. I am CPR and First Aid certificated."
                              )
                            : Object.keys(detail.service_type).filter(
                                (e) => e == "tab1"
                              )[0]
                            ? t(
                                "Working with children is my passion and inspiration. Every day is very rewarding because I have learnt so much from kids and together we make the world a better place. I build a caring and respectful relationship with children and their families, and prepare them to become independent and self-reliant. I believe that each child has a unique set of skills and my goal is to help children discover and develop their interests which will make them happy. I am CPR and First Aid certificated."
                              )
                            : Object.keys(detail.service_type).filter(
                                (e) => e == "tab4"
                              )[0]
                            ? t(
                                "My name is Jelena and I am a reliable and experienced tutor. I’ve been working with students for the past 5 years and I am very passionate and committed to make meaningful progress in their life. Upon request, I can share my background check along with the references of the previous employers."
                              )
                            : Object.keys(detail.service_type).filter(
                                (e) => e == "tab3"
                              )[0]
                            ? t(
                                "My name is Jelena and I am a reliable and experienced special education paraprofessional. I’ve been working with kids with developmental disabilities for the past 5 years and I am very passionate and committed to make meaningful progress in their life. Upon request, I can share my background check along with the references of the previous employee. I am CPR and First Aid certificated."
                              )
                            : ""
                          : ""
                      }
                      maxlength="500"
                      name="message"
                      defaultValue={detailprovider.about}
                      onChange={(e) => {
                        seterrorfield({ ...errorfield, about: "" });
                        setdetailprovider({
                          ...detailprovider,
                          about: e.target.value,
                        });
                      }}
                    ></textarea>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                    <span>
                      {t("Number of characters")}{" "}
                      {500 - detailprovider.about.length}
                    </span>
                  </div>
                  <div className="form_group">
                    <label>
                      {t("Upload your profile picture")}
                      <span className="smallpop">
                        <strong>{t("Choice")}</strong> {t("And")}{" "}
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
                        className={
                          errorfield.file_path != "" ? "bordererror" : ""
                        }
                        placeholder={t("Choose file")}
                        onChange={(e) => {
                          seterrorfield({ ...errorfield, file_path: "" });
                          setdetailprovider({
                            ...detailprovider,
                            file_path: e.target.files[0],
                          });
                        }}
                        accept="image/*"
                      />
                      <span>
                        {detailprovider.file_path != ""
                          ? detailprovider.file_path.name
                            ? detailprovider.file_path.name
                            : detailprovider.file_path
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
                  <div className="form_group">
                    <label>
                      {t("Upload video")}
                      <span className="smallpop">
                        {t("This feature is available for")}{" "}
                        <strong>{t("Premium")}</strong> {t("members.")}
                      </span>{" "}
                      {t("presentation of yourself")}
                    </label>
                    <div className="upload">
                      <input
                        type="file"
                        placeholder={t("Choose file")}
                        onChange={(e) =>
                          setdetailprovider({
                            ...detailprovider,
                            video: e.target.files[0],
                          })
                        }
                        accept="video/*"
                      />
                      <span>
                        {detailprovider.video != ""
                          ? detailprovider.video.name
                            ? detailprovider.video.name
                            : detailprovider.video
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
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={ssubtab.kids == "active" ? "active personal" : "personal"}
      >
        <h3
          onClick={(e) =>
            setssubtab({ ...ssubtab, kids: ssubtab.kids == "" ? "active" : "" })
          }
        >
          {t("Education")}
        </h3>
        {ssubtab.kids == "active" ? (
          <div className="editkids ">
            {edit.kids == "" ? (
              <>
                <button onClick={(e) => setedit({ ...edit, kids: "edit" })}>
                  <img
                    src={window.location.origin + "/images/edit.svg"}
                    alt=""
                  />
                </button>
                <div className="educationun">
                  <div class="left2">
                    <label>
                      <span class="half">{t("Education Level")} </span>
                      <span className="">
                        <strong>{t(detail.educationlevel)}</strong>
                      </span>
                    </label>
                    <label>
                      <span class="half">{t("School/ university")} </span>
                      <span>
                        <strong>{t(detail.school)}</strong>
                      </span>
                    </label>
                    <label>
                      <span class="half">{t("Year awarded")} </span>{" "}
                      <span>
                        <strong>{t(detail.yearawarded)}</strong>
                      </span>
                    </label>
                  </div>
                  <div class="right2">
                    <label>{t("Qualifications and certificates")} </label>
                    <label>
                      <br />{" "}
                      <span>
                        {certificates.qualificationscertificatesname ==
                        "First Aid" ? (
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {certificates.qualificationscertificatesname}
                          </strong>
                        ) : (
                          ""
                        )}
                        {certificates.qualificationscertificatesname3 ==
                        "Board Certified Nurse" ? (
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {certificates.qualificationscertificatesname3}
                          </strong>
                        ) : (
                          ""
                        )}
                        {certificates.qualificationscertificatesname2 ==
                        "Montessori" ? (
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {certificates.qualificationscertificatesname2}
                          </strong>
                        ) : (
                          ""
                        )}
                        {certificates.qualificationscertificatesname4 ? (
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {certificates.qualificationscertificatesname4}
                          </strong>
                        ) : (
                          ""
                        )}
                      </span>
                    </label>
                  </div>
                </div>
                <br />
              </>
            ) : (
              <div className="Profile_complete">
                <div className="detail job_performance your_kids stap2">
                  <div className="form_group">
                    <label>
                      {t("Education Level")}
                      <span
                        className={
                          errorfield.educationlevel != "" ? "starred" : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <div className="text">
                      <span
                        onClick={(e) => {
                          seterrorfield({ ...errorfield, educationlevel: "" });
                          setlavelo(laveo ? false : true);
                        }}
                      >
                        {detailprovider.educationlevel
                          ? detailprovider.educationlevel
                          : t("Choose from the list")}
                      </span>
                      <div classes="select_data">
                        <ul
                          style={
                            laveo ? { display: "block" } : { display: "none" }
                          }
                        >
                          <li
                            onClick={(e) => {
                              setlavelo(laveo ? false : true);
                              setdetailprovider({
                                ...detailprovider,
                                educationlevel: t("High school"),
                              });
                            }}
                          >
                            {t("High school")}
                          </li>
                          <li
                            onClick={(e) => {
                              setlavelo(laveo ? false : true);
                              setdetailprovider({
                                ...detailprovider,
                                educationlevel: t("Bachelor"),
                              });
                            }}
                          >
                            {t("Bachelor")}
                          </li>
                          <li
                            onClick={(e) => {
                              setlavelo(laveo ? false : true);
                              setdetailprovider({
                                ...detailprovider,
                                educationlevel: t("Master"),
                              });
                            }}
                          >
                            {t("Master")}
                          </li>
                          <li
                            onClick={(e) => {
                              setlavelo(laveo ? false : true);
                              setdetailprovider({
                                ...detailprovider,
                                educationlevel: t("PhD"),
                              });
                            }}
                          >
                            {t("PhD")}
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                  <div className="form_group">
                    <label>
                      {t("Name of your school/university")}
                      <span
                        className={errorfield.school != "" ? "starred" : ""}
                      >
                        *
                      </span>
                    </label>
                    <div className="text">
                      <input
                        type="text"
                        placeholder={t("Type here")}
                        onChange={(e) => {
                          seterrorfield({ ...errorfield, school: "" });
                          setdetailprovider({
                            ...detailprovider,
                            school: e.target.value,
                          });
                        }}
                        defaultValue={detailprovider.school}
                      />
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                  <div className="form_group">
                    <label>
                      {t("Graduation Status")}
                      <span
                        className={
                          errorfield.yearawarded != "" ? "starred" : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <div className="text">
                      <span
                        onClick={(e) => {
                          seterrorfield({ ...errorfield, yearawarded: "" });
                          setawarded(awarded ? false : true);
                        }}
                      >
                        {detailprovider.yearawarded
                          ? detailprovider.yearawarded
                          : t("Choose from the list")}
                      </span>
                      <div classes="select_data">
                        <ul
                          style={
                            awarded ? { display: "block" } : { display: "none" }
                          }
                        >
                          <li
                            onClick={(e) => {
                              setawarded(awarded ? false : true);
                              setdetailprovider({
                                ...detailprovider,
                                yearawarded: t("In process"),
                              });
                            }}
                          >
                            {t("In process")}
                          </li>
                          <li
                            onClick={(e) => {
                              setawarded(awarded ? false : true);
                              setdetailprovider({
                                ...detailprovider,
                                yearawarded: t("Graduated"),
                              });
                            }}
                          >
                            {t("Graduated")}
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                  <div className="form_group qualification set">
                    <label>
                      {t("Professional qualifications and certificates")}
                    </label>
                    <div className="checkbox">
                      <ul
                        onClick={(e) =>
                          seterrorfield({
                            ...errorfield,
                            qualificationscertificatesname: "",
                          })
                        }
                      >
                        <li>
                          <input
                            type="checkbox"
                            name=""
                            onClick={(e) => {
                              if (e.target.checked) {
                                setcertificates({
                                  ...certificates,
                                  qualificationscertificatesname:
                                    t("First Aid"),
                                });
                              } else {
                                setcertificates({
                                  ...certificates,
                                  qualificationscertificatesname: "",
                                });
                              }
                            }}
                            checked={
                              certificates.qualificationscertificatesname ==
                              t("First Aid")
                                ? true
                                : false
                            }
                          />
                          <span> {t("First Aid")}</span>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            name=""
                            onClick={(e) => {
                              if (e.target.checked) {
                                setcertificates({
                                  ...certificates,
                                  qualificationscertificatesname3: t(
                                    "Board Certified Nurse"
                                  ),
                                });
                              } else {
                                setcertificates({
                                  ...certificates,
                                  qualificationscertificatesname3: "",
                                });
                              }
                            }}
                            checked={
                              certificates.qualificationscertificatesname3 ==
                              t("Board Certified Nurse")
                                ? true
                                : false
                            }
                          />
                          <span> {t("Board Certified Nurse")}</span>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            name=""
                            onClick={(e) => {
                              if (e.target.checked) {
                                setcertificates({
                                  ...certificates,
                                  qualificationscertificatesname2:
                                    t("Montessori"),
                                });
                              } else {
                                setcertificates({
                                  ...certificates,
                                  qualificationscertificatesname2: "",
                                });
                              }
                            }}
                            checked={
                              certificates.qualificationscertificatesname2 ==
                              t("Montessori")
                                ? true
                                : false
                            }
                          />
                          <span> {t("Montessori")}</span>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            name=""
                            onClick={(e) => {
                              if (e.target.checked) {
                                setcertificates({
                                  ...certificates,
                                  qualificationscertificatesname4: "e",
                                });
                              } else {
                                setcertificates({
                                  ...certificates,
                                  qualificationscertificatesname4: "",
                                });
                              }
                            }}
                            checked={
                              certificates.qualificationscertificatesname4 != ""
                                ? true
                                : false
                            }
                          />

                          <span>
                            {" "}
                            <input
                              type="text"
                              placeholder={t("Other")}
                              onChange={(e) => {
                                setcertificates({
                                  ...certificates,
                                  qualificationscertificatesname4:
                                    e.target.value,
                                });
                              }}
                              defaultValue={
                                certificates.qualificationscertificatesname4
                              }
                              className={
                                certificates.qualificationscertificatesname4 ==
                                "e"
                                  ? "bordererror"
                                  : ""
                              }
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={
          ssubtab.Experience == "active" ? "active personal" : "personal"
        }
      >
        <h3
          onClick={(e) =>
            setssubtab({
              ...ssubtab,
              Experience: ssubtab.Experience == "" ? "active" : "",
            })
          }
        >
          {t("Work Experience")}
        </h3>
        {ssubtab.Experience == "active" ? (
          <div className="editkids editabout">
            {edit.Experience == "" ? (
              <>
                <button
                  onClick={(e) => setedit({ ...edit, Experience: "edit" })}
                >
                  <img
                    src={window.location.origin + "/images/edit.svg"}
                    alt=""
                  />
                </button>

                {detail.service_type && detail.service_type.tab1 ? (
                  <div className="nannyediy">
                    <h2 class="border">
                      <img
                        src={window.location.origin + "/images/nany_pur.svg"}
                      />{" "}
                      {t("Nanny")}
                    </h2>
                    {detail.nanynewbornexp == "Yes" ? (
                      <label>
                        {" "}
                        <span>
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {t("Experience with newborns")}
                          </strong>
                        </span>
                      </label>
                    ) : (
                      ""
                    )}
                    {detail.nanyyearexp ? (
                      <label>
                        {t("Years of work experience")}
                        <span className="cir">{detail.nanyyearexp}</span>
                      </label>
                    ) : (
                      ""
                    )}
                    <br />
                    <br />
                  </div>
                ) : (
                  ""
                )}
                {detail.service_type && detail.service_type.tab2 ? (
                  <div className="nannyediy">
                    <h2 class="border">
                      <img
                        src={
                          window.location.origin +
                          "/images/special_education.svg"
                        }
                      />{" "}
                      {t("Special education teacher")}
                    </h2>
                    <label>{t("Experience in Special Education Field")} </label>
                    <label>
                      <br />{" "}
                      <span>
                        {detail.setallapplicable.map((e) => {
                          return (
                            <strong>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                  fill="#A98D4B"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                  fill="white"
                                />
                              </svg>
                              {e.name}
                            </strong>
                          );
                        })}
                      </span>
                    </label>
                    {detail.setyearexp ? (
                      <label>
                        {t("Years of work experience")}
                        <span className="cir">{detail.setyearexp}</span>
                      </label>
                    ) : (
                      ""
                    )}
                    <br />
                    <br />
                  </div>
                ) : (
                  ""
                )}

                {detail.service_type && detail.service_type.tab3 ? (
                  <div className="nannyediy">
                    <h2 class="border">
                      <img
                        src={
                          window.location.origin + "/images/professional.svg"
                        }
                      />{" "}
                      {t("Special education paraprofessional")}
                    </h2>
                    <label>{t("Experience in Special Education Field")} </label>
                    <label>
                      <br />{" "}
                      <span>
                        {detail.sepallapplicable &&
                          detail.sepallapplicable.map((e) => {
                            return (
                              <strong>
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                    fill="#A98D4B"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                    fill="white"
                                  />
                                </svg>
                                {e.name}
                              </strong>
                            );
                          })}
                      </span>
                    </label>
                    {detail.sepworkexp ? (
                      <label>
                        {t("Years of work experience")}
                        <span className="cir">{detail.sepworkexp}</span>
                      </label>
                    ) : (
                      ""
                    )}
                    <br />
                    <br />
                  </div>
                ) : (
                  ""
                )}

                {detail.service_type && detail.service_type.tab4 ? (
                  <div className="nannyediy">
                    <h2 class="border">
                      <img src={window.location.origin + "/images/tuter.svg"} />{" "}
                      {t("Tutor")}
                    </h2>
                    {detail.tutorexp ? (
                      <label>
                        {t("Years of work experience")}
                        <span className="cir">{detail.tutorexp}</span>
                      </label>
                    ) : (
                      ""
                    )}
                    <br />
                    <br />
                  </div>
                ) : (
                  ""
                )}

                {/* <div className='readonly'>
                                    {detail.inactive_service && detail.inactive_service.tab1 ?
                                        <div className='nannyediy'>
                                            <h2 class="border"><img src={window.location.origin + "/images/nany_pur_gray.svg" /> Nanny</h2>
                                            {detail.nanynewbornexp == "Yes" ?
                                                <label> <span><strong>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="#A98D4B" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z" fill="white" />
                                                    </svg>
                                                    Experience with newborns</strong></span></label> : ""}
                                            <label>Years of work experience <span className='cir'>{detail.nanyyearexp}</span></label>
                                            <br />
                                            <br />
                                        </div>
                                        : ""}
                                    {detail.inactive_service && detail.inactive_service.tab2 ?
                                        <div className='nannyediy'>
                                            <h2 class="border"><img src={window.location.origin + '/images/special_education_gray.svg'} />  Special Education Teacher</h2>
                                            <label>Experience in Special Education Field </label>
                                            <label><br /> <span>
                                                {
                                                    detail.setallapplicable.map((e) => {
                                                        return (
                                                            <strong>
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="#A98D4B" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z" fill="white" />
                                                                </svg>
                                                                {e.name}</strong>
                                                        )
                                                    })
                                                }

                                            </span>
                                            </label>
                                            <label>Years of work experience <span className='cir'>{detail.setyearexp}</span></label>
                                            <br />
                                            <br />
                                        </div>
                                        : ""}

                                    {detail.inactive_service && detail.inactive_service.tab3 ?
                                        <div className='nannyediy'>
                                            <h2 class="border"><img src={window.location.origin + '/images/professional_gray.svg'} />  Special Education Paraprofessional</h2>
                                            <label>Experience in Special Education Field </label>
                                            <label><br /> <span>
                                                {
                                                    detail.sepallapplicable.map((e) => {
                                                        return (
                                                            <strong>
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="#A98D4B" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z" fill="white" />
                                                                </svg>
                                                                {e.name}</strong>
                                                        )
                                                    })
                                                }

                                            </span>
                                            </label>
                                            <label>Years of work experience <span className='cir'>{detail.sepworkexp}</span></label>
                                            <br />
                                            <br />
                                        </div>
                                        : ""}

                                    {detail.inactive_service && detail.inactive_service.tab4 ?
                                        <div className='nannyediy'>
                                            <h2 class="border"><img src={window.location.origin + '/images/tuter_gray.svg'} /> Tutor</h2>
                                            <label>Years of work experience <span className='cir'>{detail.tutorexp}</span></label>
                                            <br />
                                            <br />

                                        </div>
                                        : ""}
                                </div> */}
              </>
            ) : (
              <div className="Profile_complete charactor">
                <div className="detail your_kids work-experience parents1 stap1">
                  {detail.service_type && detail.service_type.tab1 ? (
                    <div className="nanny">
                      <h2 className="border">
                        <img
                          src={window.location.origin + "/images/nany_pur.svg"}
                        />{" "}
                        {t("Nanny")}
                        <div class="personal_preferences">
                          <label class="switchedit">
                            <input
                              type="checkbox"
                              onClick={(e) => {
                                // if (e.target.checked) {
                                //     setinactiveprofessional({})
                                //     setactiveprofession(JSON.parse(sessionStorage.getItem("service")))
                                // }
                                setShow(true);
                                setdisableset(1);
                              }}
                              checked={
                                Object.keys(inactiveprofessional).filter(
                                  (e) => e == "tab1"
                                )[0]
                                  ? false
                                  : true
                              }
                            />
                            <span class="slideredit roundedit"></span>
                          </label>
                        </div>
                      </h2>
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
                      {detail.service_type &&
                      !detail.service_type.tab2 &&
                      !detail.service_type.tab3 ? (
                        <>
                          <div className="form_group full space">
                            <label>
                              {t(
                                "Do you have experience in working with kids with special needs?"
                              )}
                              <span
                                className={
                                  errorfield.nanyexpwithkid != ""
                                    ? "starred"
                                    : ""
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
                          {detailprovider.nanyexpwithkid == "Yes" ? (
                            <div className="job_performance">
                              <div className="form_group full">
                                <label>
                                  {t("Select all applicable")}
                                  <span
                                    className={
                                      errorfield.nanyallapplicable != ""
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
                                    value={allapplicable.map((e) => {
                                      return e.name;
                                    })}
                                  />
                                  <div
                                    className="overflow"
                                    id="over"
                                    onClick={(e) => custom("cate2", "over")}
                                  ></div>

                                  <div
                                    className="option"
                                    id="cate2"
                                    onClick={(e) =>
                                      seterrorfield({
                                        ...errorfield,
                                        nanyallapplicable: "",
                                      })
                                    }
                                  >
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(t("ADHD"))
                                        }
                                      />
                                      <h3>{t("ADHD")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(
                                            t("Auditory Impairment")
                                          )
                                        }
                                      />
                                      <h3>{t("Auditory Impairment")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(t("Autism"))
                                        }
                                      />
                                      <h3>{t("Autism")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(t("Cerebral palsy"))
                                        }
                                      />
                                      <h3>{t("Cerebral palsy")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(t("Down syndrome"))
                                        }
                                      />
                                      <h3>{t("Down syndrome")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(t("Dyslexia"))
                                        }
                                      />
                                      <h3>{t("Dyslexia")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(
                                            t("Mild intellectual disability")
                                          )
                                        }
                                      />
                                      <h3>
                                        {t("Mild intellectual disability")}{" "}
                                      </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(
                                            t(
                                              "Moderate/Severe intellectual disability"
                                            )
                                          )
                                        }
                                      />
                                      <h3>
                                        {t(
                                          t(
                                            "Moderate/Severe intellectual disability"
                                          )
                                        )}{" "}
                                      </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(
                                            t("Orthopedic impairment")
                                          )
                                        }
                                      />
                                      <h3>{t("Orthopedic impairment")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(
                                            t("Speech learning impairment")
                                          )
                                        }
                                      />
                                      <h3>
                                        {t("Speech learning impairment")}{" "}
                                      </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(
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
                                        onClick={(a) =>
                                          selectoption3(t("Visual impairment"))
                                        }
                                      />
                                      <h3>{t("Visual impairment")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption3(t("Other"))
                                        }
                                      />
                                      <h3>{t("Other")} </h3>
                                      <span></span>
                                    </p>
                                  </div>

                                  <span
                                    onClick={(e) => custom("cate2", "over")}
                                  >
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
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )}
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
                        <div className="rang">
                          <div
                            class="slider"
                            onClick={(w) =>
                              seterrorfield({ ...errorfield, nanyyearexp: "" })
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
                      <br />
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                  {detail.service_type && detail.service_type.tab2 ? (
                    <div className="special_education">
                      <h2 className="border">
                        <img
                          src={
                            window.location.origin +
                            "/images/special_education.svg"
                          }
                        />{" "}
                        {t("Special Education Teacher")}
                        <div class="personal_preferences">
                          <label class="switchedit">
                            <input
                              type="checkbox"
                              onClick={(e) => {
                                // if (e.target.checked) {
                                //     setinactiveprofessional({})
                                //     setactiveprofession(JSON.parse(sessionStorage.getItem("service")))
                                // }
                                setShow(true);
                                setdisableset(2);
                              }}
                              checked={
                                Object.keys(inactiveprofessional).filter(
                                  (e) => e == "tab2"
                                )[0]
                                  ? false
                                  : true
                              }
                            />
                            <span class="slideredit roundedit"></span>
                          </label>
                        </div>
                      </h2>
                      <div className="job_performance">
                        <div className="form_group">
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
                              id="over29"
                              onClick={(e) => custom("cate8", "over29")}
                            ></div>

                            <div
                              className="option"
                              id="cate8"
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  setallapplicable: "",
                                })
                              }
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
                                      (e) => e.name == t("Auditory Impairment")
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
                                  onClick={(a) => selectoption6(t("Dyslexia"))}
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
                                  {t("Moderate/Severe intellectual disability")}{" "}
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
                                <h3>{t("Specific learning disabilities")} </h3>
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

                            <span onClick={(e) => custom("cate8", "over29")}>
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
                      <div className="form_group full qualification methad">
                        <label>
                          {t(
                            "Experience with following methods (select all applicable)"
                          )}
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
                      <div className="form_group full">
                        <label>
                          {t("Do you have an experience in")} <a>{t("IEP")} </a>
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
                        <div className="rang">
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
                      <br />
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                  {detail.service_type && detail.service_type.tab3 ? (
                    <div className="special_education">
                      <h2 className="border">
                        <img
                          src={
                            window.location.origin + "/images/professional.svg"
                          }
                        />{" "}
                        {t("Special Education Paraprofessional")}
                        <div class="personal_preferences">
                          <label class="switchedit">
                            <input
                              type="checkbox"
                              onClick={(e) => {
                                // if (e.target.checked) {
                                //     setinactiveprofessional({})
                                //     setactiveprofession(JSON.parse(sessionStorage.getItem("service")))
                                // }
                                setShow(true);
                                setdisableset(3);
                              }}
                              checked={
                                Object.keys(inactiveprofessional).filter(
                                  (e) => e == "tab3"
                                )[0]
                                  ? false
                                  : true
                              }
                            />
                            <span class="slideredit roundedit"></span>
                          </label>
                        </div>
                      </h2>
                      {detail.service_type && !detail.service_type.tab2 ? (
                        <>
                          <div className="form_group full">
                            <label>
                              {t(
                                " Do you have experience in working with kids with special needs?"
                              )}
                              <span
                                className={
                                  errorfield.sepexpwithkid != ""
                                    ? "starred"
                                    : ""
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
                          {detailprovider.sepexpwithkid == "Yes" ? (
                            <div className="job_performance">
                              <div className="form_group">
                                <label>
                                  {t(
                                    "Area of expertise (select all applicable)"
                                  )}
                                  <span
                                    className={
                                      errorfield.sepallapplicable != ""
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
                                    value={sepallapplicable.map((e) => {
                                      return e.name;
                                    })}
                                  />
                                  <div
                                    className="overflow"
                                    id="over31"
                                    onClick={(e) => custom("cate75", "over31")}
                                  ></div>

                                  <div
                                    className="option"
                                    id="cate75"
                                    onClick={(e) =>
                                      seterrorfield({
                                        ...errorfield,
                                        setallapplicable: "",
                                      })
                                    }
                                  >
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(t("ADHD"))
                                        }
                                      />
                                      <h3>{t("ADHD")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(
                                            t("Auditory Impairment")
                                          )
                                        }
                                      />
                                      <h3>{t("Auditory Impairment")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(t("Autism"))
                                        }
                                      />
                                      <h3>{t("Autism")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(t("Cerebral palsy"))
                                        }
                                      />
                                      <h3>{t("Cerebral palsy")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(t("Down syndrome"))
                                        }
                                      />
                                      <h3>{t("Down syndrome")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(t("Dyslexia"))
                                        }
                                      />
                                      <h3>{t("Dyslexia")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(
                                            t("Mild intellectual disability")
                                          )
                                        }
                                      />
                                      <h3>
                                        {t("Mild intellectual disability")}{" "}
                                      </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(
                                            t(
                                              "Moderate/Severe intellectual disability"
                                            )
                                          )
                                        }
                                      />
                                      <h3>
                                        {t(
                                          "Moderate/Severe intellectual disability"
                                        )}{" "}
                                      </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(
                                            t("Orthopedic impairment")
                                          )
                                        }
                                      />
                                      <h3>{t("Orthopedic impairment")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(
                                            t("Speech learning impairment")
                                          )
                                        }
                                      />
                                      <h3>
                                        {t("Speech learning impairment")}{" "}
                                      </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(
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
                                        onClick={(a) =>
                                          selectoption5(t("Visual impairment"))
                                        }
                                      />
                                      <h3>{t("Visual impairment")} </h3>
                                      <span></span>
                                    </p>
                                    <p>
                                      <input
                                        type="checkbox"
                                        onClick={(a) =>
                                          selectoption5(t("Other"))
                                        }
                                      />
                                      <h3>{t("Other")} </h3>
                                      <span></span>
                                    </p>
                                  </div>

                                  <span
                                    onClick={(e) => custom("cate75", "over31")}
                                  >
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
                          ) : (
                            ""
                          )}
                          <div className="form_group full">
                            <label>
                              {t(
                                "Experience with following methods (select all applicable)"
                              )}
                              <span
                                className={
                                  errorfield.sepexpmethods != ""
                                    ? "starred"
                                    : ""
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
                                      detailprovider.sepexpmethods ==
                                        "Floortime"
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
                        </>
                      ) : (
                        ""
                      )}

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
                        <div className="rang">
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
                      <br />
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                  {detail.service_type && detail.service_type.tab4 ? (
                    <div className="nanny tutor">
                      <h2 className="border">
                        <img
                          src={window.location.origin + "/images/tutorform.svg"}
                        />{" "}
                        {t("Tutor")}
                        <div class="personal_preferences">
                          <label class="switchedit">
                            <input
                              type="checkbox"
                              onClick={(e) => {
                                // if (e.target.checked) {
                                //     setinactiveprofessional({})
                                //     setactiveprofession(JSON.parse(sessionStorage.getItem("service")))
                                // }
                                setShow(true);
                                setdisableset(4);
                              }}
                              checked={
                                Object.keys(inactiveprofessional).filter(
                                  (e) => e == "tab4"
                                )[0]
                                  ? false
                                  : true
                              }
                            />
                            <span class="slideredit roundedit"></span>
                          </label>
                        </div>
                      </h2>
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
                        <div className="rang">
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
                  ) : (
                    ""
                  )}
                  <div className="noteedit">
                    <Provider_profession_chnage />
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.96979 0C4.55861 0 0.978516 3.584 0.978516 8C0.978516 12.416 4.55861 16 8.96979 16C13.381 16 16.9611 12.416 16.9611 8C16.9611 3.584 13.381 0 8.96979 0ZM9.76781 11.9984H8.16956V10.3984H9.76781V11.9984ZM8.16956 8.8H9.76781V4H8.16956V8.8Z"
                        fill="#7D2B8B"
                      />
                    </svg>
                    {t(
                      "Note: You can activate/deactivate profession via toggle button but keep in mind that only two professions can be active simultaneously. You are allowed to change a profession two times per year."
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={ssubtab.job == "active" ? "active personal" : "personal"}>
        <h3
          onClick={(e) =>
            setssubtab({ ...ssubtab, job: ssubtab.job == "" ? "active" : "" })
          }
        >
          {t("Job Preferences")}
        </h3>
        {ssubtab.job == "active" ? (
          <div className="editkids editabout">
            {edit.job == "" ? (
              <>
                <button onClick={(e) => setedit({ ...edit, job: "edit" })}>
                  <img
                    src={window.location.origin + "/images/edit.svg"}
                    alt=""
                  />
                </button>
                {detail.service_type && detail.service_type.tab1 ? (
                  <div className="nannyediy">
                    <h2 class="border">
                      <img
                        src={window.location.origin + "/images/nany_pur.svg"}
                      />{" "}
                      {t("Nanny")}
                    </h2>
                    <label>
                      {t("Rate per hour")}
                      <span>
                        <strong>
                          <b>
                            {detail.country == "Serbia"
                              ? +usd.min * 100 
                                 +
                                " - " +
                                usd.max * 100 + " " +
                                "RSD"
                              : "$" + usd.min + " - " + usd.max}
                          </b>
                        </strong>
                      </span>
                    </label>
                    <br />
                    <br />
                  </div>
                ) : (
                  ""
                )}
                {detail.service_type && detail.service_type.tab2 ? (
                  <div className="nannyediy">
                    <h2 class="border">
                      <img
                        src={
                          window.location.origin +
                          "/images/special_education.svg"
                        }
                      />{" "}
                      {t("Special education teacher")}
                    </h2>
                    <label>
                      {t("Rate per hour")}
                      <span>
                        <strong>
                          <b>
                            {detail.country == "Serbia"
                              ? usd3.min * 100 +
                                
                                " - " +
                                usd3.max * 100 + " " +
                                "RSD"
                              : "$" + usd3.min + " - " + usd3.max}
                          </b>
                        </strong>
                      </span>
                    </label>
                    <br />
                    <br />
                  </div>
                ) : (
                  ""
                )}

                {detail.service_type && detail.service_type.tab3 ? (
                  <div className="nannyediy">
                    <h2 class="border">
                      <img
                        src={
                          window.location.origin + "/images/professional.svg"
                        }
                      />{" "}
                      {t("Special education paraprofessional")}
                    </h2>
                    <label>
                      {t("Rate per hour")}
                      <span>
                        <strong>
                          <b>
                            {detail.country == "Serbia"
                              ? +usd4.min * 100 +
                                
                                " - " +
                                usd4.max * 100 + " " +
                                "RSD"
                              : "$" + usd4.min + " - " + usd4.max}
                          </b>
                        </strong>
                      </span>
                    </label>
                    <br />
                    <br />
                  </div>
                ) : (
                  ""
                )}

                {detail.service_type && detail.service_type.tab4 ? (
                  <div className="nannyediy">
                    <h2 class="border">
                      <img src={window.location.origin + "/images/tuter.svg"} />{" "}
                      {t("Tutor")}
                    </h2>
                    <label>
                      {t("Rate per hour")}
                      <span>
                        <strong>
                          <b>
                            {detail.country == "Serbia"
                              ? +tutorusd.min * 100 +
                                " - " +
                                tutorusd.max * 100 + " " +
                                "RSD"
                              : "$" + tutorusd.min + " - " + tutorusd.max}
                          </b>
                        </strong>
                      </span>
                    </label>
                    <h4>{t("Experience in Tutoring")}</h4>
                    <label>
                      {qualifications.English &&
                      qualifications.English != "" ? (
                        <span>
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {t("English")}
                          </strong>
                        </span>
                      ) : (
                        ""
                      )}
                      {qualifications.Serbian &&
                      qualifications.Serbian != "" ? (
                        <span>
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {t("Serbian")}
                          </strong>
                        </span>
                      ) : (
                        ""
                      )}
                      {qualifications.Mathematics &&
                      qualifications.Mathematics != "" ? (
                        <span>
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {t("Mathematics")}
                          </strong>
                        </span>
                      ) : (
                        ""
                      )}
                      {qualifications.Physics &&
                      qualifications.Physics != "" ? (
                        <span>
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {t("Physics")}
                          </strong>
                        </span>
                      ) : (
                        ""
                      )}
                      {qualifications.Chemistry &&
                      qualifications.Chemistry != "" ? (
                        <span>
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {t("Chemistry")}
                          </strong>
                        </span>
                      ) : (
                        ""
                      )}
                      {qualifications.Other && qualifications.Other != "" ? (
                        <span>
                          <strong>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {t("Other")}
                          </strong>
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    <br />

                    <label>
                      {t("Providing online classes")}
                      <span>
                        <strong>
                          <b>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                fill="#A98D4B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                fill="white"
                              />
                            </svg>
                            {detail.tutorintrestedonlinecls
                              ? detail.tutorintrestedonlinecls
                              : ""}
                          </b>
                        </strong>
                      </span>
                    </label>
                    <br />
                    <br />
                  </div>
                ) : (
                  ""
                )}
                <div className="preferred_school_jobs tutor">
                  <h2 className="border">{t("Preferred school jobs")}</h2>
                  <label>
                    <span>
                      {detail.tutorallapplicable.map((e) => {
                        return (
                          <>
                            <strong style={{ marginBottom: "8px" }}>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                  fill="#A98D4B"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                  fill="white"
                                />
                              </svg>

                              {t(e.name)}
                            </strong>
                          </>
                        );
                      })}
                    </span>
                  </label>
                  {detail.yearofexpasteacher ? (
                    <label>
                      {t("Years of experience as a teacher")}
                      <span className="cir">{detail.yearofexpasteacher}</span>
                    </label>
                  ) : (
                    ""
                  )}
                  <br />
                  <br />
                </div>
                <div className="gernaledt">
                  <h2 class="border ">{t("General info")}</h2>
                  <div className="left2">
                    {/* <label>
                      {t("Preferred number of children to work with")}
                      <span
                        style={{
                          fontSize: "10px",
                          width: "49px",
                          height: "49px",
                        }}
                        className="cir"
                      >
                        {t(detail.nanyworkwithnochild)}
                      </span>
                    </label>
                     */}
                    <label>
                      {t("Preferred number of children to work with")}{" "}
                      <span
                        className={`cir ${
                          detail.nanyworkwithnochild === "twins" &&
                          language === "sr"
                            ? "specialStyle"
                            : ""
                        }`}
                      >
                        {t(detail.nanyworkwithnochild)}
                      </span>
                    </label>
                    {detail.nanyprefchildage[0] ? (
                      <label>
                        {t("Preferred child’s age")}
                        <span>
                          <strong>
                            <b>
                              {detail.nanyprefchildage &&
                                detail.nanyprefchildage.map((e, index) => {
                                  const modifiedName = t(e.name);
                                  return (
                                    modifiedName +
                                    (detail.nanyprefchildage.length - 1 >=
                                    index + 1
                                      ? ", "
                                      : "")
                                  );
                                })}
                            </b>
                          </strong>
                        </span>
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="right2">
                    <label>
                      {t("Start date")}
                      <span>
                        <strong>
                          <b>{detail.nanystartdate}</b>
                        </strong>
                      </span>
                    </label>
                    <label>
                      {t("Frequency")}
                      <span>
                        <strong>
                          <b>{t(detail.nanyintrestedin)}</b>
                        </strong>
                      </span>
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <div className="Profile_complete charactor">
                <div className="detail preferences   work-experience job_performance setp3">
                  {detail.service_type && detail.service_type.tab1 ? (
                    <div className="nanny">
                      <h2 className="border">
                        <img
                          src={window.location.origin + "/images/nany_pur.svg"}
                        />{" "}
                        {t("Nanny")}
                      </h2>
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
                  ) : (
                    ""
                  )}
                  {detail.service_type && detail.service_type.tab2 ? (
                    <div className="special_education big">
                      <h2 className="border">
                        <img
                          src={
                            window.location.origin +
                            "/images/special_education.svg"
                          }
                        />{" "}
                        {t("Special Education Teacher")}
                      </h2>
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
                  ) : (
                    ""
                  )}
                  {detail.service_type && detail.service_type.tab3 ? (
                    <div className="special_education big">
                      <h2 className="border">
                        <img
                          src={
                            window.location.origin + "/images/professional.svg"
                          }
                        />{" "}
                        {t("Special Education Paraprofessional")}
                      </h2>
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
                  ) : (
                    ""
                  )}
                  {detail.service_type && detail.service_type.tab4 ? (
                    <div className="tutor">
                      <h2 className="border">
                        <img
                          src={window.location.origin + "/images/tuter.svg"}
                        />{" "}
                        Tutor
                      </h2>
                      {detail.service_type &&
                      !detail.service_type.tab2 &&
                      !detail.service_type.tab3 ? (
                        <>
                          <div className="form_group full qualification tutorteach">
                            <label>
                              {t("Classes you would like to teach")}
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
                                    defaultChecked={
                                      qualifications.Mathematics ==
                                      "Mathematics"
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
                                <li>
                                  <input type="checkbox" name="" />
                                  <span>
                                    {t("Other")}
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
                                      "Yes"
                                        ? true
                                        : false
                                    }
                                    onClick={(e) =>
                                      setdetailprovider({
                                        ...detailprovider,
                                        tutorintrestedonlinecls: "Yes",
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
                                      "No"
                                        ? true
                                        : false
                                    }
                                    onClick={(e) =>
                                      setdetailprovider({
                                        ...detailprovider,
                                        tutorintrestedonlinecls: "No",
                                      })
                                    }
                                  />
                                  <span> {t("No")}</span>
                                </li>
                              </ul>
                            </div>
                            {/* <div className='errorfield'>{error.message}</div>*/}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
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
                  ) : (
                    ""
                  )}

                  <div className="nany2">
                    <div className="preferred_school_jobs tutor">
                      <h2 className="border">{t("Preferred school jobs")}</h2>
                      <div className="form_group full">
                        <label>
                          {t("I am interested in working in school")}
                          <span
                            className={
                              errorfield.nanyintrestedinschool != ""
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
                                nanyintrestedinschool: "",
                              })
                            }
                          >
                            <li>
                              <input
                                type="radio"
                                name="school"
                                checked={
                                  detailprovider.nanyintrestedinschool == "Yes"
                                    ? true
                                    : false
                                }
                                onClick={(e) =>
                                  setdetailprovider({
                                    ...detailprovider,
                                    nanyintrestedinschool: "Yes",
                                  })
                                }
                              />
                              <span> {t("Yes")}</span>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="school"
                                checked={
                                  detailprovider.nanyintrestedinschool == "No"
                                    ? true
                                    : false
                                }
                                onClick={(e) =>
                                  setdetailprovider({
                                    ...detailprovider,
                                    nanyintrestedinschool: "No",
                                  })
                                }
                              />
                              <span> {t("No")}</span>
                            </li>
                          </ul>
                        </div>
                        {/* <div className='errorfield'>{error.message}</div>*/}
                      </div>
                      {detailprovider.nanyintrestedinschool == "Yes" ? (
                        <>
                          <div className="form_group full">
                            <label>{t("Select all applicable")}</label>
                            <div className="customselect inp">
                              <input
                                className="keyword"
                                type="text"
                                placeholder={t("Choose from the list")}
                              />
                              <div
                                className="overflow"
                                id="over6"
                                onClick={(e) => custom("cate9", "over6")}
                              ></div>

                              <div className="option" id="cate9">
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) =>
                                      selectoption(t("Kindergarten Teacher"))
                                    }
                                    checked={
                                      selectcat.filter(
                                        (e) =>
                                          e.name == t("Kindergarten Teacher")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                  />
                                  <h3>{t("Kindergarten Teacher")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) =>
                                      selectoption(t("Elementary Teacher"))
                                    }
                                    checked={
                                      selectcat.filter(
                                        (e) => e.name == t("Elementary Teacher")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                  />
                                  <h3>{t("Elementary Teacher")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) =>
                                      selectoption(t("High School Teacher"))
                                    }
                                    checked={
                                      selectcat.filter(
                                        (e) =>
                                          e.name == t("High School Teacher")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                  />
                                  <h3>{t("High School Teacher")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) =>
                                      selectoption(
                                        t("Special Education Teacher")
                                      )
                                    }
                                    checked={
                                      selectcat.filter(
                                        (e) =>
                                          e.name ==
                                          t("Special Education Teacher")
                                      )[0]
                                        ? true
                                        : false
                                    }
                                  />
                                  <h3>{t("Special Education Teacher")} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) =>
                                      selectoption(
                                        t("Special Education Paraprofessional")
                                      )
                                    }
                                    checked={
                                      selectcat.filter(
                                        (e) =>
                                          e.name ==
                                          t(
                                            "Special Education Paraprofessional"
                                          )
                                      )[0]
                                        ? true
                                        : false
                                    }
                                  />
                                  <h3>
                                    {t("Special Education Paraprofessional")}{" "}
                                  </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) => setselectcat2([])}
                                  />
                                  <h3>{t("None")} </h3>
                                  <span></span>
                                </p>
                                {/* <div className='clr inp' onClick={e => {
                setselectcat([])
                window.location.reload()
            }}>Clear All <span>+</span></div>*/}
                              </div>

                              <span onClick={(e) => custom("cate9", "over6")}>
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
                          <label>
                            <span>
                              {selectcat.map((e) => {
                                return (
                                  <>
                                    <strong style={{ marginBottom: "8px" }}>
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                                          fill="#A98D4B"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                                          fill="white"
                                        />
                                      </svg>
                                      {e.name}
                                    </strong>
                                  </>
                                );
                              })}
                            </span>
                          </label>

                          <div className="form_group full">
                            <label>
                              {t("Years of work experience as a teacher")}
                              <span
                                className={
                                  errorfield.yearofexpasteacher != ""
                                    ? "starred"
                                    : ""
                                }
                              >
                                *
                              </span>
                            </label>
                            <div className="rang">
                              <div
                                class="slider"
                                onClick={(e) =>
                                  seterrorfield({
                                    ...errorfield,
                                    yearofexpasteacher: "",
                                  })
                                }
                              >
                                <input
                                  type="range"
                                  min="0"
                                  max="60"
                                  onChange={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      yearofexpasteacher: e.target.value,
                                    })
                                  }
                                  style={{
                                    "background-size":
                                      ((detailprovider.yearofexpasteacher == ""
                                        ? 0
                                        : detailprovider.yearofexpasteacher) *
                                        100) /
                                        60 +
                                      "% 100% ",
                                  }}
                                  value={
                                    detailprovider.yearofexpasteacher == ""
                                      ? 0
                                      : detailprovider.yearofexpasteacher
                                  }
                                />
                                <ul>
                                  <li>0</li>
                                  <li>15</li>
                                  <li>30</li>
                                  <li>45</li>
                                  <li>60</li>
                                </ul>
                              </div>
                              <span id="rangeValue">
                                {detailprovider.yearofexpasteacher == ""
                                  ? 0
                                  : detailprovider.yearofexpasteacher}
                              </span>
                            </div>
                            {/* <div className='errorfield'>{error.message}</div>*/}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="general_info tutor  preferred_school_jobs gernaledt">
                      <h2 className="border">{t("General info")}</h2>
                      <div className="left2">
                        <div className="form_group full">
                          <label>
                            {t("Number of children you prefer to work with?")}
                            <span
                              className={
                                errorfield.nanyworkwithnochild == ""
                                  ? ""
                                  : "starred"
                              }
                            >
                              *
                            </span>
                          </label>
                          <div className="children_number">
                            <ul
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  nanyworkwithnochild: "",
                                })
                              }
                            >
                              <li
                                onClick={(e) => setnchildren(1)}
                                className={nchildren == 1 ? "active" : ""}
                              >
                                1
                              </li>
                              <li
                                onClick={(e) => setnchildren(2)}
                                className={nchildren == 2 ? "active" : ""}
                              >
                                2
                              </li>
                              <li
                                onClick={(e) => setnchildren("twins")}
                                className={nchildren == "twins" ? "active" : ""}
                              >
                                {t("Twins")}
                              </li>
                              <li
                                onClick={(e) => setnchildren(3)}
                                className={nchildren == 3 ? "active" : ""}
                              >
                                3+
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                        <div
                          className="form_group  full"
                          style={{ clear: "both" }}
                        >
                          <label>
                            {t("Preferred child’s age")}
                            <span
                              className={
                                errorfield.nanyprefchildage != ""
                                  ? "starred"
                                  : ""
                              }
                            ></span>
                          </label>
                          <div className="customselect inp">
                            <input
                              className="keyword"
                              type="text"
                              placeholder={t("Choose from the list")}
                              value={children_age2.map((e) => {
                                return t(e.name);
                              })}
                            />
                            <div
                              className="overflow"
                              id="over7"
                              onClick={(e) => custom("cate66", "over7")}
                            ></div>

                            <div
                              className="option"
                              id="cate66"
                              onClick={(e) =>
                                seterrorfield({
                                  ...errorfield,
                                  nanyprefchildage: "",
                                })
                              }
                            >
                              <p>
                                <input
                                  type="checkbox"
                                  checked={
                                    children_age2.filter(
                                      (e) => e.name == t("0 - 1 years")
                                    )[0]
                                      ? true
                                      : false
                                  }
                                  onClick={(a) =>
                                    selectoption4(t("0 - 1 years"))
                                  }
                                />
                                <h3>{t("0 - 1 years")} </h3>
                                <span></span>
                              </p>
                              <p>
                                <input
                                  type="checkbox"
                                  checked={
                                    children_age2.filter(
                                      (e) => e.name == t("4 - 7 years")
                                    )[0]
                                      ? true
                                      : false
                                  }
                                  onClick={(a) =>
                                    selectoption4(t("4 - 7 years"))
                                  }
                                />
                                <h3>{t("4 - 7 years")} </h3>
                                <span></span>
                              </p>
                              <p>
                                <input
                                  type="checkbox"
                                  checked={
                                    children_age2.filter(
                                      (e) => e.name == t("8 - 10 years")
                                    )[0]
                                      ? true
                                      : false
                                  }
                                  onClick={(a) =>
                                    selectoption4(t("8 - 10 years"))
                                  }
                                />
                                <h3>{t("8 - 10 years")} </h3>
                                <span></span>
                              </p>
                              <p>
                                <input
                                  type="checkbox"
                                  checked={
                                    children_age2.filter(
                                      (e) => e.name == t("11 - 15 years")
                                    )[0]
                                      ? true
                                      : false
                                  }
                                  onClick={(a) =>
                                    selectoption4(t("11 - 15 years"))
                                  }
                                />
                                <h3>{t("11 - 15 years")} </h3>
                                <span></span>
                              </p>
                              <p>
                                <input
                                  type="checkbox"
                                  checked={
                                    children_age2.filter(
                                      (e) => e.name == t("16+  years")
                                    )[0]
                                      ? true
                                      : false
                                  }
                                  onClick={(a) =>
                                    selectoption4(t("16+  years"))
                                  }
                                />
                                <h3>{t("16+  years")} </h3>
                                <span></span>
                              </p>
                            </div>

                            <span onClick={(e) => custom("cate66", "over7")}>
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
                      <div className="right2">
                        <div className="form_group full">
                          <label>
                            {t("Start date")}
                            <span
                              className={
                                errorfield.nanystartdate != "" ? "starred" : ""
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
                            {/* <input className={errorfield.nanystartdate != "" ? "bordererror" : ""} type="date" min={today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0')} value={detailprovider.nanystartdate != null ? detailprovider.nanystartdate : ""} onChange={e => {
                    seterrorfield({ ...errorfield, nanystartdate: "" })
                    setdetailprovider({ ...detailprovider, nanystartdate: new Date(e.target.value) > today ? e.target.value : "" })
                }} />*/}
                            <DatePicker
                              className={
                                errorfield.nanystartdate != ""
                                  ? "bordererror"
                                  : ""
                              }
                              minDate={today}
                              selected={
                                detailprovider.nanystartdate != null &&
                                detailprovider.nanystartdate != ""
                                  ? new Date(detailprovider.nanystartdate)
                                  : today
                              }
                              onChange={(date: Date) => {
                                seterrorfield({
                                  ...errorfield,
                                  nanystartdate: "",
                                });
                                setdetailprovider({
                                  ...detailprovider,
                                  nanystartdate:
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
                        <div className="form_group full qualification ">
                          <label>
                            {t("frequency")}
                            <span
                              className={
                                errorfield.nanyintrestedin != ""
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
                                  nanyintrestedin: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name=""
                                  checked={
                                    tutorintrestedinm.fulltime != ""
                                      ? true
                                      : detailprovider.nanyintrestedin ==
                                        t("Full time")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      // settutorintrestedinm({ ...tutorintrestedinm, fulltime: "Full time" })
                                      setdetailprovider({
                                        ...detailprovider,
                                        nanyintrestedin: t("Full time"),
                                      });
                                    } else {
                                      setdetailprovider({
                                        ...detailprovider,
                                        nanyintrestedin: "",
                                      });
                                      // settutorintrestedinm({ ...tutorintrestedinm, fulltime: "" })
                                    }
                                  }}
                                />
                                <span> {t("Full time")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name=""
                                  checked={
                                    tutorintrestedinm.parttime != ""
                                      ? true
                                      : detailprovider.nanyintrestedin ==
                                        t("Part time")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      // settutorintrestedinm({ ...tutorintrestedinm, parttime: "Part time" })
                                      setdetailprovider({
                                        ...detailprovider,
                                        nanyintrestedin: t("Part time"),
                                      });
                                    } else {
                                      setdetailprovider({
                                        ...detailprovider,
                                        nanyintrestedin: "",
                                      });
                                      // settutorintrestedinm({ ...tutorintrestedinm, parttime: "" })
                                    }
                                  }}
                                />
                                <span> {t("Part time")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name=""
                                  checked={
                                    tutorintrestedinm.occasionally != ""
                                      ? true
                                      : detailprovider.nanyintrestedin ==
                                        t("Occasionally")
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      // settutorintrestedinm({ ...tutorintrestedinm, occasionally: "Occasionally" })
                                      setdetailprovider({
                                        ...detailprovider,
                                        nanyintrestedin: t("Occasionally"),
                                      });
                                    } else {
                                      setdetailprovider({
                                        ...detailprovider,
                                        nanyintrestedin: "",
                                      });
                                      // settutorintrestedinm({ ...tutorintrestedinm, occasionally: "" })
                                    }
                                  }}
                                />
                                <span> {t("Occasionally")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={
          ssubtab.availability == "active" ? "active personal" : "personal"
        }
      >
        <h3
          onClick={(e) => {
            setcalandertype(1);
            setssubtab({
              ...ssubtab,
              availability: ssubtab.availability === "" ? "active" : "",
            });
          }}
        >
          {t("Availability")}
        </h3>
        {ssubtab.availability == "active" ? (
          <div className="calendershow">
            {edit.availability == "" ? (
              <>
                <button
                  onClick={(e) => setedit({ ...edit, availability: "edit" })}
                >
                  <img
                    src={window.location.origin + "/images/edit.svg"}
                    alt=""
                  />
                </button>

                <div className="calander">
                  <div className="form_group full">
                    <label>{t("Availability and working hours")}</label>
                  </div>
                  <div className="legend">
                    <ul>
                      {detail.calanderlastupdate != null &&
                      parseInt(detail.calanderlastupdate) == 1 ? (
                        <li
                          className={
                            detail.calanderlastupdate != null &&
                            parseInt(detail.calanderlastupdate) == 1
                              ? "active"
                              : ""
                          }
                        >
                          <span>{t("Full time")}</span>
                        </li>
                      ) : (
                        ""
                      )}
                      {detail.calanderlastupdate != null &&
                      parseInt(detail.calanderlastupdate) == 2 ? (
                        <li
                          className={
                            detail.calanderlastupdate != null &&
                            parseInt(detail.calanderlastupdate) == 2
                              ? "active"
                              : ""
                          }
                        >
                          <span>{t("Before school")}</span>
                        </li>
                      ) : (
                        ""
                      )}
                      {detail.calanderlastupdate != null &&
                      parseInt(detail.calanderlastupdate) == 5 ? (
                        <li
                          className={
                            detail.calanderlastupdate != null &&
                            parseInt(detail.calanderlastupdate) == 5
                              ? "active"
                              : ""
                          }
                        >
                          <span>{t("Weekends")}</span>
                        </li>
                      ) : (
                        ""
                      )}
                      {detail.calanderlastupdate != null &&
                      parseInt(detail.calanderlastupdate) == 3 ? (
                        <li
                          className={
                            detail.calanderlastupdate != null &&
                            parseInt(detail.calanderlastupdate) == 3
                              ? "active"
                              : ""
                          }
                        >
                          <span>{t("After school")}</span>
                        </li>
                      ) : (
                        ""
                      )}
                      {detail.calanderlastupdate != null &&
                      parseInt(detail.calanderlastupdate) == 4 ? (
                        <li
                          className={
                            detail.calanderlastupdate != null &&
                            parseInt(detail.calanderlastupdate) == 4
                              ? "active"
                              : ""
                          }
                        >
                          <span>{t("Overnight")}</span>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                    <div className="form_group full">
                      <label className="border">{t("Legend")}</label>
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
                  <div className="calanderfull">
                    {calandertype == 1 ? (
                      <Calander
                        data={calender_data}
                        data1={detailprovider.fulltime}
                        data2={"fulltime"}
                      />
                    ) : (
                      ""
                    )}
                    {calandertype == 2 ? (
                      <Calander
                        data={calender_data}
                        data1={detailprovider.beforeschool}
                        data2={"beforeschool"}
                      />
                    ) : (
                      ""
                    )}
                    {calandertype == 3 ? (
                      <Calander
                        data={calender_data}
                        data1={detailprovider.afterschool}
                        data2={"afterschool"}
                      />
                    ) : (
                      ""
                    )}
                    {calandertype == 4 ? (
                      <Calander
                        data={calender_data}
                        data1={detailprovider.overnight}
                        data2={"overnight"}
                      />
                    ) : (
                      ""
                    )}
                    {calandertype == 5 ? (
                      <Calander
                        data={calender_data}
                        data1={detailprovider.weekends}
                        data2={"weekends"}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="legend legend2">
                    <div className="form_group full">
                      <label className="border">{t("Legend")}</label>
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
              </>
            ) : (
              <div className="Profile_complete">
                <div className="detail availability setp5">
                  <div className="form_group full">
                    <label>{t("Your availability and working hours*")}</label>
                    <p>
                      {t(
                        "Share your availability with families. You can always update your schedule if it changes later."
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
                        <span>{t("Full time")}</span>
                      </li>
                      <li
                        onClick={(e) => setcalandertype(2)}
                        className={calandertype == 2 ? "active" : ""}
                      >
                        <span>{t("Before school")}</span>
                      </li>

                      <li
                        onClick={(e) => setcalandertype(3)}
                        className={calandertype == 3 ? "active" : ""}
                      >
                        <span>{t("After school")}</span>
                      </li>
                      <li
                        onClick={(e) => setcalandertype(4)}
                        className={calandertype == 4 ? "active" : ""}
                      >
                        <span>{t("Overnight")}</span>
                      </li>
                      <li
                        onClick={(e) => setcalandertype(5)}
                        className={calandertype == 5 ? "active" : ""}
                      >
                        <span>{t("Weekends")}</span>
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
                          data1={detailprovider.fulltime}
                          data2={"fulltime"}
                        />
                      ) : (
                        ""
                      )}
                      {calandertype == 2 ? (
                        <Calander
                          data={calender_data}
                          data1={detailprovider.beforeschool}
                          data2={"beforeschool"}
                        />
                      ) : (
                        ""
                      )}
                      {calandertype == 3 ? (
                        <Calander
                          data={calender_data}
                          data1={detailprovider.afterschool}
                          data2={"afterschool"}
                        />
                      ) : (
                        ""
                      )}
                      {calandertype == 4 ? (
                        <Calander
                          data={calender_data}
                          data1={detailprovider.overnight}
                          data2={"overnight"}
                        />
                      ) : (
                        ""
                      )}
                      {calandertype == 5 ? (
                        <Calander
                          data={calender_data}
                          data1={detailprovider.weekends}
                          data2={"weekends"}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="legend">
                      <div className="form_group full">
                        <label className="border">{t("Legend")}</label>
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
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={ssubtab.info == "active" ? "active personal" : "personal"}
      >
        <h3
          onClick={(e) =>
            setssubtab({ ...ssubtab, info: ssubtab.info == "" ? "active" : "" })
          }
        >
          {t("Additional Info")}
        </h3>
        {ssubtab.info == "active" ? (
          <div className="editkids editabout editinfo ">
            {edit.info == "" ? (
              <>
                <button onClick={(e) => setedit({ ...edit, info: "edit" })}>
                  <img
                    src={window.location.origin + "/images/edit.svg"}
                    alt=""
                  />
                </button>

                <div className="Profile_complete">
                  <div className="detail  additional_info">
                    <div className="form_group full">
                      <label>{t("Languages")}</label>
                      {detail.englishlevel ? (
                        <div className="language">
                          <strong>{t("English")}</strong>
                          <ul>
                            <li
                              className={
                                detail.englishlevel == "Beginner"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Beginner")}
                            </li>
                            <li
                              className={
                                detail.englishlevel == "Intermediate"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Intermediate")}
                            </li>
                            <li
                              className={
                                detail.englishlevel == "Fluent" ? "active" : ""
                              }
                            >
                              {t("Fluent")}
                            </li>
                            <li
                              className={
                                detail.englishlevel == "Native" ? "active" : ""
                              }
                            >
                              {t("Native")}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                      {detail.frenchlevel ? (
                        <div className="language">
                          <strong>{t("French")}</strong>
                          <ul>
                            <li
                              className={
                                detail.frenchlevel == "Beginner" ? "active" : ""
                              }
                            >
                              {t("Beginner")}
                            </li>
                            <li
                              className={
                                detail.frenchlevel == "Intermediate"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Intermediate")}
                            </li>
                            <li
                              className={
                                detail.frenchlevel == "Fluent" ? "active" : ""
                              }
                            >
                              {t("Fluent")}
                            </li>
                            <li
                              className={
                                detail.frenchlevel == "Native" ? "active" : ""
                              }
                            >
                              {t("Native")}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                      {detail.italianlevel ? (
                        <div className="language">
                          <strong>{t("Italian")}</strong>
                          <ul>
                            <li
                              className={
                                detail.italianlevel == "Beginner"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Beginner")}
                            </li>
                            <li
                              className={
                                detail.italianlevel == "Intermediate"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Intermediate")}
                            </li>
                            <li
                              className={
                                detail.italianlevel == "Fluent" ? "active" : ""
                              }
                            >
                              {t("Fluent")}
                            </li>
                            <li
                              className={
                                detail.italianlevel == "Native" ? "active" : ""
                              }
                            >
                              {t("Native")}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                      {detail.germanlevel ? (
                        <div className="language">
                          <strong>{t("German")}</strong>
                          <ul>
                            <li
                              className={
                                detail.germanlevel == "Beginner" ? "active" : ""
                              }
                            >
                              {t("Beginner")}
                            </li>
                            <li
                              className={
                                detail.germanlevel == "Intermediate"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Intermediate")}
                            </li>
                            <li
                              className={
                                detail.germanlevel == "Fluent" ? "active" : ""
                              }
                            >
                              {t("Fluent")}
                            </li>
                            <li
                              className={
                                detail.germanlevel == "Native" ? "active" : ""
                              }
                            >
                              {t("Native")}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                      {detail.spanishlevel ? (
                        <div className="language">
                          <strong>{t("Spanish")}</strong>
                          <ul>
                            <li
                              className={
                                detail.spanishlevel == "Beginner"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Beginner")}
                            </li>
                            <li
                              className={
                                detail.spanishlevel == "Intermediate"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Intermediate")}
                            </li>
                            <li
                              className={
                                detail.spanishlevel == "Fluent" ? "active" : ""
                              }
                            >
                              {t("Fluent")}
                            </li>
                            <li
                              className={
                                detail.spanishlevel == "Native" ? "active" : ""
                              }
                            >
                              {t("Native")}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                      {detail.chineselevel ? (
                        <div className="language">
                          <strong>{t("Chinese")}</strong>
                          <ul>
                            <li
                              className={
                                detail.chineselevel == "Beginner"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Beginner")}
                            </li>
                            <li
                              className={
                                detail.chineselevel == "Intermediate"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Intermediate")}
                            </li>
                            <li
                              className={
                                detail.chineselevel == "Fluent" ? "active" : ""
                              }
                            >
                              {t("Fluent")}
                            </li>
                            <li
                              className={
                                detail.chineselevel == "Native" ? "active" : ""
                              }
                            >
                              {t("Native")}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                      {detail.otherlevel ? (
                        <div className="language">
                          <strong>
                            {t("Other language")}
                            <input
                              type="text"
                              placeholder={t("Type here")}
                              value={
                                detail.otherlangname ? detail.otherlangname : ""
                              }
                            />
                          </strong>
                          <ul>
                            <li
                              className={
                                detail.otherlevel == "Beginner" ? "active" : ""
                              }
                            >
                              {t("Beginner")}
                            </li>
                            <li
                              className={
                                detail.otherlevel == "Intermediate"
                                  ? "active"
                                  : ""
                              }
                            >
                              {t("Intermediate")}
                            </li>
                            <li
                              className={
                                detail.otherlevel == "Fluent" ? "active" : ""
                              }
                            >
                              {t("Fluent")}
                            </li>
                            <li
                              className={
                                detail.otherlevel == "Native" ? "active" : ""
                              }
                            >
                              {t("Native")}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                {detail.service_type && detail.service_type.tab1 ? (
                  <div className="icon">
                    <ul>
                      <li>
                        {t("Smoke?")}
                        <div className="icons">
                          {habit.smoke == "false" ? (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#7D2B8B"
                            >
                              <circle
                                stroke="#7D2B8B"
                                cx="20"
                                cy="20"
                                r="19.5"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22.61 16.5999H24.03C25.08 16.5999 26 17.3399 26 18.6499V19.1999C26 19.6099 26.33 19.9499 26.75 19.9499H26.76C27.17 19.9499 27.51 19.6199 27.51 19.1999V18.3099C27.51 16.4999 25.91 15.1499 24.04 15.1499H22.74C21.72 15.1499 20.8 14.4199 20.67 13.3999C20.55 12.4499 21.13 11.6999 21.97 11.4699C22.29 11.3799 22.51 11.0899 22.51 10.7499C22.51 10.2599 22.05 9.88992 21.58 10.0299C20.16 10.4399 19.13 11.7599 19.16 13.3099C19.18 15.1599 20.77 16.5999 22.61 16.5999ZM27.69 11.3299C27.52 11.8399 27.23 12.3 26.85 12.68C28.72 13.57 30 15.49 30 17.71V19.2C30 19.61 29.66 19.95 29.25 19.95C28.84 19.95 28.5 19.61 28.5 19.2V17.72C28.5 15.7 27.07 14.01 25.14 13.7C24.77 13.64 24.5 13.32 24.5 12.95V12.8C24.5 12.45 24.75 12.17 25.09 12.06C25.64 11.8799 26.08 11.4399 26.26 10.8899C26.37 10.5599 26.64 10.3199 26.98 10.3099C27.5 10.3199 27.85 10.8299 27.69 11.3299ZM23.5 20.9499C24.33 20.9499 25 21.62 25 22.4501C25 22.6901 24.94 22.9201 24.84 23.1301L22.66 20.9499H23.5ZM26 20.9499H27.5V23.95H26V20.9499ZM28.5 23.95V20.9499H30V23.95H28.5ZM11.415 12.9474C11.6795 12.9474 11.9332 13.0526 12.12 13.2399L27.7 28.8298C28.09 29.2198 28.09 29.8498 27.7 30.2398C27.31 30.6298 26.68 30.6298 26.29 30.2398L20 23.9498H11.5C10.67 23.9498 10 23.2798 10 22.4498C10 21.6198 10.67 20.9498 11.5 20.9498H17L10.71 14.6499C10.32 14.2599 10.32 13.6299 10.71 13.2399C10.8968 13.0526 11.1505 12.9474 11.415 12.9474Z"
                                fill="#fff"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#7D2B8B"
                            >
                              <circle
                                stroke="#7D2B8B"
                                cx="20"
                                cy="20"
                                r="19.5"
                              />
                              <path
                                style={{
                                  transform: "translateY(8px) translateX(9px)",
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.85 5.62041C17.47 5.01041 17.85 4.17042 17.85 3.24043C17.85 1.73045 16.85 0.450466 15.47 0.0304707C14.99 -0.109528 14.5 0.250468 14.5 0.750462C14.5 1.08046 14.71 1.37045 15.02 1.46045C15.79 1.69045 16.35 2.40044 16.35 3.24043C16.35 4.06042 15.82 4.75042 15.08 5.00041C14.75 5.11041 14.5 5.39041 14.5 5.7404V5.8904C14.5 6.2604 14.77 6.58039 15.14 6.64039C17.07 6.95039 18.5 8.64037 18.5 10.6603V12.1403C18.5 12.5503 18.84 12.8903 19.25 12.8903C19.66 12.8903 20 12.5503 20 12.1403V10.6503C20 8.43037 18.72 6.51039 16.85 5.62041ZM13.5 13.8904H1.5C0.67 13.8904 0 14.5605 0 15.3905C0 16.2205 0.67 16.8906 1.5 16.8906H13.5C14.33 16.8906 15 16.2205 15 15.3905C15 14.5605 14.33 13.8904 13.5 13.8904ZM12.7301 8.09058H14.0301C15.9001 8.09058 17.5001 9.44056 17.5101 11.2505V12.1405C17.5101 12.5605 17.1701 12.8905 16.7601 12.8905H16.7501C16.3301 12.8905 16.0001 12.5505 16.0001 12.1405V11.5905C16.0001 10.2805 15.0801 9.54056 14.0301 9.54056H12.6101C10.7701 9.54056 9.18005 8.09058 9.15005 6.25061C9.12005 4.70063 10.1501 3.38065 11.5701 2.97066C12.0401 2.83066 12.5001 3.20065 12.5001 3.69064C12.5001 4.03064 12.2801 4.32063 11.9601 4.41063C11.1201 4.64063 10.5401 5.39062 10.6601 6.3406C10.7901 7.36059 11.7101 8.09058 12.7301 8.09058ZM16 13.8904H17.5V16.8906H16V13.8904ZM20 13.8904H18.5V16.8906H20V13.8904Z"
                                fill="#fff"
                              />
                            </svg>
                          )}
                        </div>
                      </li>
                      <li>
                        {t("Cooking for kids")}
                        <div className="icons">
                          {habit.kids == "false" ? (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="#7D2B8B"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                stroke="#7D2B8B"
                                cx="20"
                                cy="20"
                                r="19.5"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.6551 16.8799C14.75 16.9598 14.8745 17 14.9991 17C15.1237 17 15.2482 16.9598 15.3431 16.8799C15.5334 16.7196 15.5334 16.4605 15.3431 16.3002C14.8492 15.8837 14.8492 15.2064 15.3431 14.7899C15.7664 14.4332 16 13.9593 16 13.4551C16 12.9508 15.7669 12.4769 15.3431 12.1202C15.1528 11.9599 14.8453 11.9599 14.6551 12.1202C14.4648 12.2805 14.4648 12.5396 14.6551 12.6999C14.8945 12.9016 15.0268 13.1697 15.0268 13.4551C15.0268 13.7404 14.895 14.0085 14.6551 14.2102C13.7816 14.9461 13.7816 16.144 14.6551 16.8799Z"
                                fill="#fff"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M24.6551 16.8799C24.75 16.9598 24.8745 17 24.9991 17C25.1237 17 25.2482 16.9598 25.3431 16.8799C25.5334 16.7196 25.5334 16.4605 25.3431 16.3002C24.8492 15.8837 24.8492 15.2064 25.3431 14.7899C25.7664 14.4332 26 13.9593 26 13.4551C26 12.9508 25.7669 12.4769 25.3431 12.1202C25.1528 11.9599 24.8453 11.9599 24.6551 12.1202C24.4648 12.2805 24.4648 12.5396 24.6551 12.6999C24.8945 12.9016 25.0268 13.1697 25.0268 13.4551C25.0268 13.7404 24.895 14.0085 24.6551 14.2102C23.7816 14.9461 23.7816 16.144 24.6551 16.8799Z"
                                fill="#fff"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M19.6551 13.8799C19.75 13.9598 19.8745 14 19.9991 14C20.1237 14 20.2482 13.9598 20.3431 13.8799C20.5334 13.7196 20.5334 13.4605 20.3431 13.3002C19.8492 12.8837 19.8492 12.2064 20.3431 11.7899C20.7664 11.4332 21 10.9593 21 10.4551C21 9.9508 20.7669 9.47689 20.3431 9.12022C20.1528 8.95993 19.8453 8.95993 19.6551 9.12022C19.4648 9.28052 19.4648 9.53961 19.6551 9.69991C19.8945 9.90161 20.0268 10.1697 20.0268 10.4551C20.0268 10.7404 19.895 11.0085 19.6551 11.2102C18.7816 11.9461 18.7816 13.144 19.6551 13.8799Z"
                                fill="#fff"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22 18C22 18.28 21.94 18.55 21.84 18.79C25.75 19.6 28.73 22.93 29 27H11C11.27 22.93 14.25 19.6 18.16 18.79C18.06 18.55 18 18.28 18 18C18 16.9 18.9 16 20 16C21.1 16 22 16.9 22 18ZM30 30V28H10V30H30Z"
                                fill="#fff"
                              />
                              <path
                                d="M13 16L29 32"
                                stroke="#fff"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="#7D2B8B"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="19.5"
                                stroke="#7D2B8B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.6551 15.8799C14.75 15.9598 14.8745 16 14.9991 16C15.1237 16 15.2482 15.9598 15.3431 15.8799C15.5334 15.7196 15.5334 15.4605 15.3431 15.3002C14.8492 14.8837 14.8492 14.2064 15.3431 13.7899C15.7664 13.4332 16 12.9593 16 12.4551C16 11.9508 15.7669 11.4769 15.3431 11.1202C15.1528 10.9599 14.8453 10.9599 14.6551 11.1202C14.4648 11.2805 14.4648 11.5396 14.6551 11.6999C14.8945 11.9016 15.0268 12.1697 15.0268 12.4551C15.0268 12.7404 14.895 13.0085 14.6551 13.2102C13.7816 13.9461 13.7816 15.144 14.6551 15.8799Z"
                                fill="#fff"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M24.6551 15.8799C24.75 15.9598 24.8745 16 24.9991 16C25.1237 16 25.2482 15.9598 25.3431 15.8799C25.5334 15.7196 25.5334 15.4605 25.3431 15.3002C24.8492 14.8837 24.8492 14.2064 25.3431 13.7899C25.7664 13.4332 26 12.9593 26 12.4551C26 11.9508 25.7669 11.4769 25.3431 11.1202C25.1528 10.9599 24.8453 10.9599 24.6551 11.1202C24.4648 11.2805 24.4648 11.5396 24.6551 11.6999C24.8945 11.9016 25.0268 12.1697 25.0268 12.4551C25.0268 12.7404 24.895 13.0085 24.6551 13.2102C23.7816 13.9461 23.7816 15.144 24.6551 15.8799Z"
                                fill="#fff"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M19.6551 12.8799C19.75 12.9598 19.8745 13 19.9991 13C20.1237 13 20.2482 12.9598 20.3431 12.8799C20.5334 12.7196 20.5334 12.4605 20.3431 12.3002C19.8492 11.8837 19.8492 11.2064 20.3431 10.7899C20.7664 10.4332 21 9.95931 21 9.45506C21 8.9508 20.7669 8.47689 20.3431 8.12022C20.1528 7.95993 19.8453 7.95993 19.6551 8.12022C19.4648 8.28052 19.4648 8.53961 19.6551 8.69991C19.8945 8.90161 20.0268 9.16972 20.0268 9.45506C20.0268 9.74039 19.895 10.0085 19.6551 10.2102C18.7816 10.9461 18.7816 12.144 19.6551 12.8799Z"
                                fill="#fff"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22 17C22 17.28 21.94 17.55 21.84 17.79C25.75 18.6 28.73 21.93 29 26H11C11.27 21.93 14.25 18.6 18.16 17.79C18.06 17.55 18 17.28 18 17C18 15.9 18.9 15 20 15C21.1 15 22 15.9 22 17ZM30 29V27H10V29H30Z"
                                fill="#fff"
                              />
                            </svg>
                          )}
                        </div>
                      </li>
                      <li>
                        {t("Light housework")}
                        <div className="icons">
                          {habit.housework == "false" ? (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="#7D2B8B"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="19.5"
                                stroke="#7D2B8B"
                              />
                              <path
                                d="M28.773 11.4955C27.2368 10.6647 25.119 10.6297 23.2472 11.4043C21.5153 12.1214 20.2668 13.7015 19.5288 14.8889C19.1966 14.813 18.8411 14.961 18.6869 15.2622C18.5393 15.5502 18.6255 15.8844 18.8711 16.084C18.8038 16.2244 18.7627 16.3186 18.7472 16.3554L15.1627 23.7322C14.8012 23.5762 14.3706 23.7152 14.1923 24.0517C14.0107 24.3945 14.1598 24.8104 14.5256 24.9809L14.5501 24.9924L13.7437 26.6529H11.7398C11.3314 26.6529 11 26.9634 11 27.3461C11 27.7287 11.3314 28.0392 11.7398 28.0392H15.439C15.8474 28.0392 16.1789 27.7287 16.1789 27.3461C16.1789 26.9634 15.8474 26.6529 15.439 26.6529H15.3695L15.8825 25.5968C15.9502 25.6152 16.0187 25.6277 16.0871 25.6277C16.359 25.6277 16.6209 25.4866 16.7504 25.243C16.9198 24.9234 16.7992 24.5432 16.4862 24.3546L20.2006 16.7106C20.3009 16.7539 20.4055 16.7755 20.5095 16.7755C20.7851 16.7755 21.0495 16.6306 21.1768 16.3821C21.3462 16.0518 21.2086 15.6601 20.8735 15.482C21.5064 14.4827 22.5196 13.2215 23.8458 12.6725C25.2714 12.0823 26.9154 12.0913 28.0336 12.6961C28.8559 13.1407 29.3283 13.8481 29.4385 14.7992C29.6449 16.5803 29.4699 17.7746 28.9199 18.3496C28.8692 18.4026 28.8134 18.4481 28.7564 18.491V20.0427C29.2122 19.8985 29.6497 19.6632 30.0212 19.2754C30.8764 18.3829 31.1667 16.8697 30.9097 14.6498C30.7507 13.2742 29.9916 12.154 28.773 11.4955Z"
                                fill="#fff"
                              />
                              <path
                                d="M26.6663 23.1869C27.149 23.1869 27.6055 23.2899 28.0165 23.4694V20.2042V18.7978V17.9881C28.0165 17.6052 28.0553 17.6416 27.6466 17.6416H26.1976C25.7889 17.6416 21.6661 17.9594 20.5771 23.0033L19.8783 27.1727C19.8783 27.5557 20.2094 28.0392 20.6181 28.0392H24.129C23.7066 27.5293 23.4524 26.8916 23.4524 26.1981C23.4524 24.5376 24.8944 23.1869 26.6663 23.1869Z"
                                fill="#fff"
                              />
                              <path
                                d="M28.3861 24.5358C28.2725 24.4329 28.149 24.34 28.0162 24.2586C27.6274 24.0201 27.1639 23.8801 26.666 23.8801C25.3018 23.8801 24.192 24.9199 24.192 26.1981C24.192 26.9488 24.5767 27.6156 25.1694 28.0392C25.3758 28.1868 25.607 28.3043 25.8567 28.3858C26.1108 28.4686 26.3824 28.5157 26.6661 28.5157C26.9498 28.5157 27.2213 28.4686 27.4755 28.3858C27.7374 28.3005 27.9797 28.1754 28.1935 28.0177C28.3947 27.8694 28.5719 27.6936 28.7158 27.4947C28.9836 27.1242 29.1405 26.6778 29.1405 26.1978C29.1405 25.7438 28.9985 25.3212 28.7569 24.9636C28.6506 24.8076 28.527 24.6638 28.3861 24.5358ZM26.666 25.0353C27.3511 25.0353 27.9067 25.5559 27.9067 26.1978C27.9067 26.8396 27.3511 27.3602 26.666 27.3602C25.9809 27.3602 25.4253 26.8396 25.4253 26.1978C25.4253 25.5559 25.9805 25.0353 26.666 25.0353Z"
                                fill="#fff"
                              />
                              <path
                                d="M17 12L33 28"
                                stroke="#fff"
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
                          ) : (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="#7D2B8B"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="19.5"
                                stroke="#7D2B8B"
                              />
                              <path
                                d="M27.773 11.4955C26.2368 10.6647 24.119 10.6297 22.2472 11.4043C20.5153 12.1214 19.2668 13.7015 18.5288 14.8889C18.1966 14.813 17.8411 14.961 17.6869 15.2622C17.5393 15.5502 17.6255 15.8844 17.8711 16.084C17.8038 16.2244 17.7627 16.3186 17.7472 16.3554L14.1627 23.7322C13.8012 23.5762 13.3706 23.7152 13.1923 24.0517C13.0107 24.3945 13.1598 24.8104 13.5256 24.9809L13.5501 24.9924L12.7437 26.6529H10.7398C10.3314 26.6529 10 26.9634 10 27.3461C10 27.7287 10.3314 28.0392 10.7398 28.0392H14.439C14.8474 28.0392 15.1789 27.7287 15.1789 27.3461C15.1789 26.9634 14.8474 26.6529 14.439 26.6529H14.3695L14.8825 25.5968C14.9502 25.6152 15.0187 25.6277 15.0871 25.6277C15.359 25.6277 15.6209 25.4866 15.7504 25.243C15.9198 24.9234 15.7992 24.5432 15.4862 24.3546L19.2006 16.7106C19.3009 16.7539 19.4055 16.7755 19.5095 16.7755C19.7851 16.7755 20.0495 16.6306 20.1768 16.3821C20.3462 16.0518 20.2086 15.6601 19.8735 15.482C20.5064 14.4827 21.5196 13.2215 22.8458 12.6725C24.2714 12.0823 25.9154 12.0913 27.0336 12.6961C27.8559 13.1407 28.3283 13.8481 28.4385 14.7992C28.6449 16.5803 28.4699 17.7746 27.9199 18.3496C27.8692 18.4026 27.8134 18.4481 27.7564 18.491V20.0427C28.2122 19.8985 28.6497 19.6632 29.0212 19.2754C29.8764 18.3829 30.1667 16.8697 29.9097 14.6498C29.7507 13.2742 28.9916 12.154 27.773 11.4955Z"
                                fill="#fff"
                              />
                              <path
                                d="M25.6664 23.1869C26.1491 23.1869 26.6056 23.2899 27.0166 23.4694V20.2042V18.7978V17.9881C27.0166 17.6052 27.0554 17.6416 26.6467 17.6416H25.1977C24.789 17.6416 20.6662 17.9594 19.5772 23.0033L18.8784 27.1727C18.8784 27.5557 19.2095 28.0392 19.6183 28.0392H23.1291C22.7067 27.5293 22.4526 26.8916 22.4526 26.1981C22.4526 24.5376 23.8945 23.1869 25.6664 23.1869Z"
                                fill="#fff"
                              />
                              <path
                                d="M27.386 24.5358C27.2724 24.4329 27.1489 24.34 27.0161 24.2586C26.6273 24.0201 26.1638 23.8801 25.6659 23.8801C24.3016 23.8801 23.1919 24.9199 23.1919 26.1981C23.1919 26.9488 23.5766 27.6156 24.1693 28.0392C24.3757 28.1868 24.6068 28.3043 24.8566 28.3858C25.1107 28.4686 25.3822 28.5157 25.6659 28.5157C25.9497 28.5157 26.2212 28.4686 26.4753 28.3858C26.7373 28.3005 26.9795 28.1754 27.1934 28.0177C27.3946 27.8694 27.5718 27.6936 27.7157 27.4947C27.9835 27.1242 28.1404 26.6778 28.1404 26.1978C28.1404 25.7438 27.9983 25.3212 27.7568 24.9636C27.6504 24.8076 27.5269 24.6638 27.386 24.5358ZM25.6659 25.0353C26.351 25.0353 26.9066 25.5559 26.9066 26.1978C26.9066 26.8396 26.351 27.3602 25.6659 27.3602C24.9808 27.3602 24.4252 26.8396 24.4252 26.1978C24.4252 25.5559 24.9804 25.0353 25.6659 25.0353Z"
                                fill="#fff"
                              />
                            </svg>
                          )}
                        </div>
                      </li>
                      <li>
                        {t("Car or licence")}
                        <div className="icons">
                          {habit.licence == "false" ? (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="#7D2B8B"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="19.5"
                                stroke="#7D2B8B"
                              />
                              <path
                                d="M29.5309 17.0494H27.3897L27.0829 16.2339C26.7238 15.2794 26.0897 14.4681 25.2492 13.8875C24.4087 13.3069 23.4239 13 22.4013 13H17.5988C16.5761 13 15.5913 13.3069 14.7508 13.8875C13.9102 14.4681 13.2762 15.2794 12.9171 16.2339L12.6103 17.0494H10.4691C10.1491 17.0494 9.92324 17.3618 10.0244 17.6643L10.3369 18.5988C10.368 18.6918 10.4277 18.7728 10.5075 18.8301C10.5873 18.8874 10.6832 18.9183 10.7816 18.9183H11.9072L11.9052 18.9237C11.1415 19.3502 10.625 20.1641 10.625 21.0987V22.9676C10.625 23.5994 10.8613 24.1758 11.25 24.615V27.017C11.25 27.5331 11.6697 27.9515 12.1875 27.9515H14.0625C14.5803 27.9515 15 27.5331 15 27.017V25.4595H25V27.017C25 27.5331 25.4197 27.9515 25.9375 27.9515H27.8125C28.3303 27.9515 28.75 27.5331 28.75 27.017V24.615C29.1387 24.1757 29.375 23.5993 29.375 22.9676V21.0987C29.375 20.1641 28.8585 19.3502 28.0948 18.9237L28.0928 18.9183H29.2184C29.3168 18.9183 29.4127 18.8874 29.4925 18.8301C29.5723 18.7728 29.632 18.6918 29.6631 18.5988L29.9756 17.6643C30.0768 17.3618 29.8509 17.0494 29.5309 17.0494ZM15.2579 17.1088C15.6218 16.1417 16.5625 15.4919 17.5988 15.4919H22.4013C23.4375 15.4919 24.3782 16.1417 24.7421 17.1088L25.3056 18.6068H14.6944L15.2579 17.1088ZM13.4375 23.2791C12.7471 23.2791 12.1875 22.7213 12.1875 22.0332C12.1875 21.3451 12.7471 20.7872 13.4375 20.7872C14.1279 20.7872 15.3125 21.968 15.3125 22.6561C15.3125 23.3443 14.1279 23.2791 13.4375 23.2791ZM26.5625 23.2791C25.8721 23.2791 24.6875 23.3443 24.6875 22.6561C24.6875 21.968 25.8721 20.7872 26.5625 20.7872C27.2529 20.7872 27.8125 21.3451 27.8125 22.0332C27.8125 22.7213 27.2529 23.2791 26.5625 23.2791Z"
                                fill="#fff"
                              />
                              <path
                                d="M14 12L30 28"
                                stroke="#fff"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="#7D2B8B"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="19.5"
                                stroke="#7D2B8B"
                              />
                              <path
                                d="M29.5309 17.0494H27.3897L27.0829 16.2339C26.7238 15.2794 26.0897 14.4681 25.2492 13.8875C24.4087 13.3069 23.4239 13 22.4013 13H17.5988C16.5761 13 15.5913 13.3069 14.7508 13.8875C13.9102 14.4681 13.2762 15.2794 12.9171 16.2339L12.6103 17.0494H10.4691C10.1491 17.0494 9.92324 17.3618 10.0244 17.6643L10.3369 18.5988C10.368 18.6918 10.4277 18.7728 10.5075 18.8301C10.5873 18.8874 10.6832 18.9183 10.7816 18.9183H11.9072L11.9052 18.9237C11.1415 19.3502 10.625 20.1641 10.625 21.0987V22.9676C10.625 23.5994 10.8613 24.1758 11.25 24.615V27.017C11.25 27.5331 11.6697 27.9515 12.1875 27.9515H14.0625C14.5803 27.9515 15 27.5331 15 27.017V25.4595H25V27.017C25 27.5331 25.4197 27.9515 25.9375 27.9515H27.8125C28.3303 27.9515 28.75 27.5331 28.75 27.017V24.615C29.1387 24.1757 29.375 23.5993 29.375 22.9676V21.0987C29.375 20.1641 28.8585 19.3502 28.0948 18.9237L28.0928 18.9183H29.2184C29.3168 18.9183 29.4127 18.8874 29.4925 18.8301C29.5723 18.7728 29.632 18.6918 29.6631 18.5988L29.9756 17.6643C30.0768 17.3618 29.8509 17.0494 29.5309 17.0494ZM15.2579 17.1088C15.6218 16.1417 16.5625 15.4919 17.5988 15.4919H22.4013C23.4375 15.4919 24.3782 16.1417 24.7421 17.1088L25.3056 18.6068H14.6944L15.2579 17.1088ZM13.4375 23.2791C12.7471 23.2791 12.1875 22.7213 12.1875 22.0332C12.1875 21.3451 12.7471 20.7872 13.4375 20.7872C14.1279 20.7872 15.3125 21.968 15.3125 22.6561C15.3125 23.3443 14.1279 23.2791 13.4375 23.2791ZM26.5625 23.2791C25.8721 23.2791 24.6875 23.3443 24.6875 22.6561C24.6875 21.968 25.8721 20.7872 26.5625 20.7872C27.2529 20.7872 27.8125 21.3451 27.8125 22.0332C27.8125 22.7213 27.2529 23.2791 26.5625 23.2791Z"
                                fill="#fff"
                              />
                            </svg>
                          )}
                        </div>
                      </li>
                      <li>
                        {t("Traveling with family")}
                        <div className="icons">
                          {habit.family == "false" ? (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="#7D2B8B"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="19.5"
                                stroke="#7D2B8B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M29.4194 15.5777C29.7342 15.5577 30.0442 15.6622 30.2826 15.8689C30.8025 16.3889 29.7626 18.0944 29.2426 18.4688L23.0028 22.6286L14.1632 25.8785L11.5632 23.6686L14.6831 24.1886L20.9229 20.5487L14.6831 16.3889L15.2031 15.8689L24.5628 17.9488L28.2026 15.8689C28.5813 15.6819 28.9971 15.5824 29.4194 15.5777ZM29.419 14.0178C28.7332 14.0221 28.0581 14.1877 27.4483 14.5014L24.3284 16.3005L15.5615 14.3454C15.0409 14.2305 14.4977 14.3893 14.1211 14.7666L13.6012 15.2866C13.2703 15.6173 13.1054 16.0789 13.1517 16.5444C13.1981 17.0098 13.4508 17.4299 13.8403 17.6889L18.0002 20.4604L14.4071 22.5403L11.8228 22.1087C11.1292 21.9902 10.442 22.3507 10.1454 22.9889C9.84881 23.6271 10.0162 24.3848 10.5541 24.8386L13.154 27.0485C13.5852 27.4172 14.1825 27.5228 14.7139 27.3241L23.5536 24.0743C23.669 24.0319 23.7789 23.976 23.8812 23.9079L30.121 19.748L30.173 19.7116C31.1477 18.8829 31.7918 17.7312 31.9877 16.4669C32.0556 15.8362 31.8404 15.2078 31.4001 14.751C30.8729 14.243 30.1609 13.9725 29.4294 14.0022L29.419 14.0178Z"
                                fill="#fff"
                              />
                              <path
                                d="M14 12L30 28"
                                stroke="#fff"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="#7D2B8B"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                stroke="#7D2B8B"
                                cx="20"
                                cy="20"
                                r="19.5"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M29.4194 15.5777C29.7342 15.5577 30.0442 15.6622 30.2826 15.8689C30.8025 16.3889 29.7626 18.0944 29.2426 18.4688L23.0028 22.6286L14.1632 25.8785L11.5632 23.6686L14.6831 24.1886L20.9229 20.5487L14.6831 16.3889L15.2031 15.8689L24.5628 17.9488L28.2026 15.8689C28.5813 15.6819 28.9971 15.5824 29.4194 15.5777ZM29.419 14.0178C28.7332 14.0221 28.0581 14.1877 27.4483 14.5014L24.3284 16.3005L15.5615 14.3454C15.0409 14.2305 14.4977 14.3893 14.1211 14.7666L13.6012 15.2866C13.2703 15.6173 13.1054 16.0789 13.1517 16.5444C13.1981 17.0098 13.4508 17.4299 13.8403 17.6889L18.0002 20.4604L14.4071 22.5403L11.8228 22.1087C11.1292 21.9902 10.442 22.3507 10.1454 22.9889C9.84881 23.6271 10.0162 24.3848 10.5541 24.8386L13.154 27.0485C13.5852 27.4172 14.1825 27.5228 14.7139 27.3241L23.5536 24.0743C23.669 24.0319 23.7789 23.976 23.8812 23.9079L30.121 19.748L30.173 19.7116C31.1477 18.8829 31.7918 17.7312 31.9877 16.4669C32.0556 15.8362 31.8404 15.2078 31.4001 14.751C30.8729 14.243 30.1609 13.9725 29.4294 14.0022L29.419 14.0178Z"
                                fill="#fff"
                              />
                            </svg>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
                <div className="nannyediy">
                  <div className="abrod">
                    <label className="abrodd">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9.00147 17.9287C5.05147 17.4387 2.00146 14.0787 2.00146 9.99874C2.00146 9.37874 2.08146 8.78874 2.21146 8.20874L7.00147 12.9987V13.9987C7.00147 15.0987 7.90147 15.9987 9.00147 15.9987V17.9287ZM13.9979 14.0006C14.8979 14.0006 15.6379 14.5806 15.8979 15.3906C17.1979 13.9706 17.9979 12.0806 17.9979 10.0006C17.9979 6.65058 15.9279 3.78058 12.9979 2.59058V3.00058C12.9979 4.10058 12.0979 5.00058 10.9979 5.00058H8.99792V7.00058C8.99792 7.55058 8.54792 8.00057 7.99792 8.00057H5.99792V10.0006H11.9979C12.5479 10.0006 12.9979 10.4506 12.9979 11.0006V14.0006H13.9979Z"
                          fill="#7D2B8B"
                        />
                      </svg>
                      {t("Work abroad")} <span>{t(detail.workingabroad)}</span>
                    </label>
                  </div>
                  {detailprovider.livewithfamily ? (
                    <div className="abrod">
                      <label className="abrodd">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="10" cy="10" r="10" fill="#7D2B8B" />
                          <path
                            d="M8.4 16V11.4118H11.6V16H15.6V9.88235H18L10 3L2 9.88235H4.4V16H8.4Z"
                            fill="white"
                          />
                        </svg>
                        {t("Living with the family")}
                        <span>{t(detail.livewithfamily)}</span>
                      </label>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {detail.anyallergies == "Yes" ? (
                  <label>
                    <span>
                      <strong>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                            fill="#A98D4B"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                            fill="white"
                          />
                        </svg>{" "}
                        {detail.anyallergies} {t("allergies")}
                      </strong>
                    </span>
                  </label>
                ) : (
                  ""
                )}
                {detail.medicalcondition == "Yes" ? (
                  <label>
                    <span>
                      <strong>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                            fill="#A98D4B"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                            fill="white"
                          />
                        </svg>{" "}
                        {language === "en"?detail.medicalcondition : ""} {t("medical conditions")}
                      </strong>
                    </span>
                  </label>
                ) : (
                  ""
                )}

                <br />
              </>
            ) : (
              <div className="Profile_complete new">
                <div className="detail  additional_info info_parents setp6">
                  <div
                    className="form_group full"
                    onClick={(e) =>
                      seterrorfield({
                        ...errorfield,
                        englishlevel: "",
                        frenchlevel: "",
                        italianlevel: "",
                        germanlevel: "",
                        spanishlevel: "",
                        chineselevel: "",
                        otherlevel: "",
                      })
                    }
                  >
                    <label>
                      {t("What languages do you speak?")}
                      <span
                        className={
                          errorfield.englishlevel != "" ||
                          errorfield.frenchlevel != "" ||
                          errorfield.italianlevel != "" ||
                          errorfield.germanlevel != "" ||
                          errorfield.spanishlevel != "" ||
                          errorfield.chineselevel != "" ||
                          errorfield.otherlevel != ""
                            ? "starred"
                            : ""
                        }
                      >
                        *
                      </span>
                    </label>
                    <div className="language">
                      <strong>{t("English")}</strong>
                      <ul>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "English_1") ==
                              ""
                            ) {
                              languageselect("English_1");
                              setdetailprovider({
                                ...detailprovider,
                                englishlevel: "Beginner",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                englishlevel: "",
                              });
                              languageselect("English_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "English_1") !=
                              "" || detailprovider.englishlevel == "Beginner"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Beginner")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "English_2") ==
                              ""
                            ) {
                              languageselect("English_2");
                              setdetailprovider({
                                ...detailprovider,
                                englishlevel: "Intermediate",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                englishlevel: "",
                              });
                              languageselect("English_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "English_2") !=
                              "" ||
                            detailprovider.englishlevel == "Intermediate"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Intermediate")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "English_3") ==
                              ""
                            ) {
                              languageselect("English_3");
                              setdetailprovider({
                                ...detailprovider,
                                englishlevel: "Fluent",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                englishlevel: "",
                              });
                              languageselect("English_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "English_3") !=
                              "" || detailprovider.englishlevel == "Fluent"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Fluent")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "English_4") ==
                              ""
                            ) {
                              languageselect("English_4");
                              setdetailprovider({
                                ...detailprovider,
                                englishlevel: "Native",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                englishlevel: "",
                              });
                              languageselect("English_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "English_4") !=
                              "" || detailprovider.englishlevel == "Native"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Native")}
                        </li>
                      </ul>
                    </div>
                    <div className="language">
                      <strong>{t("French")}</strong>
                      <ul>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "French_1") ==
                              ""
                            ) {
                              languageselect("French_1");
                              setdetailprovider({
                                ...detailprovider,
                                frenchlevel: "Beginner",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                frenchlevel: "",
                              });
                              languageselect("French_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "French_1") !=
                              "" || detailprovider.frenchlevel == "Beginner"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Beginner")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "French_2") ==
                              ""
                            ) {
                              languageselect("French_2");
                              setdetailprovider({
                                ...detailprovider,
                                frenchlevel: "Intermediate",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                frenchlevel: "",
                              });
                              languageselect("French_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "French_2") !=
                              "" || detailprovider.frenchlevel == "Intermediate"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Intermediate")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "French_3") ==
                              ""
                            ) {
                              languageselect("French_3");
                              setdetailprovider({
                                ...detailprovider,
                                frenchlevel: "Fluent",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                frenchlevel: "",
                              });
                              languageselect("French_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "French_3") !=
                              "" || detailprovider.frenchlevel == "Fluent"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Fluent")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "French_4") ==
                              ""
                            ) {
                              languageselect("French_4");
                              setdetailprovider({
                                ...detailprovider,
                                frenchlevel: "Native",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                frenchlevel: "",
                              });
                              languageselect("French_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "French_4") !=
                              "" || detailprovider.frenchlevel == "Native"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Native")}
                        </li>
                      </ul>
                    </div>
                    <div className="language">
                      <strong>{t("Italian")}</strong>
                      <ul>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Italian_1") ==
                              ""
                            ) {
                              languageselect("Italian_1");
                              setdetailprovider({
                                ...detailprovider,
                                italianlevel: "Beginner",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                italianlevel: "",
                              });
                              languageselect("Italian_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Italian_1") !=
                              "" || detailprovider.italianlevel == "Beginner"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Beginner")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Italian_2") ==
                              ""
                            ) {
                              languageselect("Italian_2");
                              setdetailprovider({
                                ...detailprovider,
                                italianlevel: "Intermediate",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                italianlevel: "",
                              });
                              languageselect("Italian_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Italian_2") !=
                              "" ||
                            detailprovider.italianlevel == "Intermediate"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Intermediate")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Italian_3") ==
                              ""
                            ) {
                              languageselect("Italian_3");
                              setdetailprovider({
                                ...detailprovider,
                                italianlevel: "Fluent",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                italianlevel: "",
                              });
                              languageselect("Italian_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Italian_3") !=
                              "" || detailprovider.italianlevel == "Fluent"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Fluent")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Italian_4") ==
                              ""
                            ) {
                              languageselect("Italian_4");
                              setdetailprovider({
                                ...detailprovider,
                                italianlevel: "Native",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                italianlevel: "",
                              });
                              languageselect("Italian_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Italian_4") !=
                              "" || detailprovider.italianlevel == "Native"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Native")}
                        </li>
                      </ul>
                    </div>
                    <div className="language">
                      <strong>{t("German")}</strong>
                      <ul>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "German_1") ==
                              ""
                            ) {
                              languageselect("German_1");
                              setdetailprovider({
                                ...detailprovider,
                                germanlevel: "Beginner",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                germanlevel: "",
                              });
                              languageselect("German_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "German_1") !=
                              "" || detailprovider.germanlevel == "Beginner"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Beginner")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "German_2") ==
                              ""
                            ) {
                              languageselect("German_2");
                              setdetailprovider({
                                ...detailprovider,
                                germanlevel: "Intermediate",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                germanlevel: "",
                              });
                              languageselect("German_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "German_2") !=
                              "" || detailprovider.germanlevel == "Intermediate"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Intermediate")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "German_3") ==
                              ""
                            ) {
                              languageselect("German_3");
                              setdetailprovider({
                                ...detailprovider,
                                germanlevel: "Fluent",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                germanlevel: "",
                              });
                              languageselect("German_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "German_3") !=
                              "" || detailprovider.germanlevel == "Fluent"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Fluent")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "German_4") ==
                              ""
                            ) {
                              languageselect("German_4");
                              setdetailprovider({
                                ...detailprovider,
                                germanlevel: "Native",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                germanlevel: "",
                              });
                              languageselect("German_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "German_4") !=
                              "" || detailprovider.germanlevel == "Native"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Native")}
                        </li>
                      </ul>
                    </div>
                    <div className="language">
                      <strong>{t("Spanish")}</strong>
                      <ul>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Spanish_1") ==
                              ""
                            ) {
                              languageselect("Spanish_1");
                              setdetailprovider({
                                ...detailprovider,
                                spanishlevel: "Beginner",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                spanishlevel: "",
                              });
                              languageselect("Spanish_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Spanish_1") !=
                              "" || detailprovider.spanishlevel == "Beginner"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Beginner")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Spanish_2") ==
                              ""
                            ) {
                              languageselect("Spanish_2");
                              setdetailprovider({
                                ...detailprovider,
                                spanishlevel: "Intermediate",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                spanishlevel: "",
                              });
                              languageselect("Spanish_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Spanish_2") !=
                              "" ||
                            detailprovider.spanishlevel == "Intermediate"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Intermediate")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Spanish_3") ==
                              ""
                            ) {
                              languageselect("Spanish_3");
                              setdetailprovider({
                                ...detailprovider,
                                spanishlevel: "Fluent",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                spanishlevel: "",
                              });
                              languageselect("Spanish_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Spanish_3") !=
                              "" || detailprovider.spanishlevel == "Fluent"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Fluent")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Spanish_4") ==
                              ""
                            ) {
                              languageselect("Spanish_4");
                              setdetailprovider({
                                ...detailprovider,
                                spanishlevel: "Native",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                spanishlevel: "",
                              });
                              languageselect("Spanish_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Spanish_4") !=
                              "" || detailprovider.spanishlevel == "Native"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Native")}
                        </li>
                      </ul>
                    </div>
                    <div className="language">
                      <strong>{t("Chinese")}</strong>
                      <ul>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Chinese_1") ==
                              ""
                            ) {
                              languageselect("Chinese_1");
                              setdetailprovider({
                                ...detailprovider,
                                chineselevel: "Beginner",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                chineselevel: "",
                              });
                              languageselect("Chinese_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Chinese_1") !=
                              "" || detailprovider.chineselevel == "Beginner"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Beginner")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Chinese_2") ==
                              ""
                            ) {
                              languageselect("Chinese_2");
                              setdetailprovider({
                                ...detailprovider,
                                chineselevel: "Intermediate",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                chineselevel: "",
                              });
                              languageselect("Chinese_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Chinese_2") !=
                              "" ||
                            detailprovider.chineselevel == "Intermediate"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Intermediate")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Chinese_3") ==
                              ""
                            ) {
                              languageselect("Chinese_3");
                              setdetailprovider({
                                ...detailprovider,
                                chineselevel: "Fluent",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                chineselevel: "",
                              });
                              languageselect("Chinese_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Chinese_3") !=
                              "" || detailprovider.chineselevel == "Fluent"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Fluent")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Chinese_4") ==
                              ""
                            ) {
                              languageselect("Chinese_4");
                              setdetailprovider({
                                ...detailprovider,
                                chineselevel: "Native",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                chineselevel: "",
                              });
                              languageselect("Chinese_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Chinese_4") !=
                              "" || detailprovider.chineselevel == "Native"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Native")}
                        </li>
                      </ul>
                    </div>
                    <div className="language">
                      <strong>
                        {t("Other language")}
                        <input
                          type="text"
                          placeholder={t("Type here")}
                          onChange={(e) =>
                            setdetailprovider({
                              ...detailprovider,
                              otherlangname: e.target.value,
                            })
                          }
                          defaultValue={
                            detailprovider.otherlangname != null
                              ? detailprovider.otherlangname
                              : ""
                          }
                        />
                      </strong>
                      <ul>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Other_1") == ""
                            ) {
                              languageselect("Other_1");
                              setdetailprovider({
                                ...detailprovider,
                                otherlevel: "Beginner",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                otherlevel: "",
                              });
                              languageselect("Other_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Other_1") !=
                              "" || detailprovider.otherlevel == "Beginner"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Beginner")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Other_2") == ""
                            ) {
                              languageselect("Other_2");
                              setdetailprovider({
                                ...detailprovider,
                                otherlevel: "Intermediate",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                otherlevel: "",
                              });
                              languageselect("Other_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Other_2") !=
                              "" || detailprovider.otherlevel == "Intermediate"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Intermediate")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Other_3") == ""
                            ) {
                              languageselect("Other_3");
                              setdetailprovider({
                                ...detailprovider,
                                otherlevel: "Fluent",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                otherlevel: "",
                              });
                              languageselect("Other_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Other_3") !=
                              "" || detailprovider.otherlevel == "Fluent"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Fluent")}
                        </li>
                        <li
                          onClick={(e) => {
                            if (
                              languages.filter((e) => e.name == "Other_4") == ""
                            ) {
                              languageselect("Other_4");
                              setdetailprovider({
                                ...detailprovider,
                                otherlevel: "Native",
                              });
                            } else {
                              setdetailprovider({
                                ...detailprovider,
                                otherlevel: "",
                              });
                              languageselect("Other_5");
                            }
                          }}
                          className={
                            languages.filter((e) => e.name == "Other_4") !=
                              "" || detailprovider.otherlevel == "Native"
                              ? "active"
                              : ""
                          }
                        >
                          {t("Native")}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="iconsec">
                    <div className="left2">
                      {detail.service_type &&
                      Object.keys(detail.service_type).length == 1 &&
                      detail.service_type.tab1 ? (
                        ""
                      ) : (
                        <div
                          className="form_group qualification full set "
                          style={{ marginBottom: "0" }}
                        >
                          <label>
                            {t("Do you have any allergies?")}
                            <span
                              className={
                                errorfield.anyallergies != "" ? "starred" : ""
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
                                  anyallergies: "",
                                })
                              }
                            >
                              <li>
                                <input
                                  type="radio"
                                  name="allergies"
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      anyallergies: "Yes",
                                    })
                                  }
                                  checked={
                                    detailprovider.anyallergies == "Yes"
                                      ? true
                                      : false
                                  }
                                />
                                <span> {t("Yes")}</span>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  name="allergies"
                                  onClick={(e) =>
                                    setdetailprovider({
                                      ...detailprovider,
                                      anyallergies: "No",
                                    })
                                  }
                                  checked={
                                    detailprovider.anyallergies == "No"
                                      ? true
                                      : false
                                  }
                                />
                                <span> {t("No")}</span>
                              </li>
                            </ul>
                            {detailprovider.anyallergies == "Yes" ? (
                              <>
                                <textarea
                                  rows="2"
                                  placeholder={t("Short description")}
                                  maxlength="300"
                                  name="message"
                                  onChange={(e) => {
                                    seterrorfield({
                                      ...errorfield,
                                      anyallergiesdescription: "",
                                    });
                                    setdetailprovider({
                                      ...detailprovider,
                                      anyallergiesdescription: e.target.value,
                                    });
                                  }}
                                  defaultValue={
                                    detailprovider.anyallergiesdescription !=
                                    null
                                      ? detailprovider.anyallergiesdescription
                                      : ""
                                  }
                                  className={
                                    errorfield.anyallergiesdescription != ""
                                      ? "bordererror"
                                      : ""
                                  }
                                ></textarea>
                                <span>
                                  {t("Number of characters")}
                                  {300 -
                                    detailprovider.anyallergiesdescription
                                      .length}
                                </span>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      )}
                    </div>
                    <div className="right2">
                      <div className="form_group qualification full set">
                        <label>
                          {t("Do you have any")}{" "}
                          <a>{t("medical condition")} </a>
                          <span className="smallpop">
                            {t("informationAbout")}
                          </span>{" "}
                          {t(
                            "which could interfere with your work performance?"
                          )}
                          <span
                            className={
                              errorfield.medicalcondition != "" ? "starred" : ""
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
                                medicalcondition: "",
                              })
                            }
                          >
                            <li>
                              <input
                                type="radio"
                                name="medical"
                                onClick={(e) =>
                                  setdetailprovider({
                                    ...detailprovider,
                                    medicalcondition: "Yes",
                                  })
                                }
                                checked={
                                  detailprovider.medicalcondition == "Yes"
                                    ? true
                                    : false
                                }
                              />
                              <span> {t("Yes")}</span>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="medical"
                                onClick={(e) =>
                                  setdetailprovider({
                                    ...detailprovider,
                                    medicalcondition: "No",
                                  })
                                }
                                checked={
                                  detailprovider.medicalcondition == "No"
                                    ? true
                                    : false
                                }
                              />
                              <span> {t("No")}</span>
                            </li>
                          </ul>
                          {detailprovider.medicalcondition == "Yes" ? (
                            <>
                              <textarea
                                rows="2"
                                placeholder={t("Short description")}
                                maxlength="300"
                                name="message"
                                onChange={(e) => {
                                  seterrorfield({
                                    ...errorfield,
                                    medicalconditiondescription: "",
                                  });
                                  setdetailprovider({
                                    ...detailprovider,
                                    medicalconditiondescription: e.target.value,
                                  });
                                }}
                                defaultValue={
                                  detailprovider.medicalconditiondescription !=
                                  null
                                    ? detailprovider.medicalconditiondescription
                                    : ""
                                }
                                className={
                                  errorfield.medicalconditiondescription != ""
                                    ? "bordererror"
                                    : ""
                                }
                              ></textarea>
                              <span>
                                {t("Number of characters")}
                                {300 -
                                  detailprovider.medicalconditiondescription
                                    .length}
                              </span>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        {/* <div className='errorfield'>{error.message}</div>*/}
                      </div>
                    </div>

                    <div className="left2" style={{ clear: "both" }}>
                      {detail.service_type && detail.service_type.tab1 ? (
                        <div className="icon">
                          <ul>
                            <>
                              <li
                                onClick={(e) =>
                                  seterrorfield({ ...errorfield, smoke: "" })
                                }
                                className={
                                  errorfield.smoke != "" ? "starred" : ""
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
                                className={
                                  errorfield.carorlicence != "" ? "starred" : ""
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
                                className={
                                  errorfield.cooking != "" ? "starred" : ""
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
                                className={
                                  errorfield.lighthousework != ""
                                    ? "starred"
                                    : ""
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
                                className={
                                  errorfield.traveling != "" ? "starred" : ""
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
                            </>
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
                          {t("Interested in working abroad")}
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
                              seterrorfield({
                                ...errorfield,
                                workingabroad: "",
                              })
                            }
                          >
                            <li>
                              <input
                                type="radio"
                                name="abroad"
                                onClick={(e) =>
                                  setdetailprovider({
                                    ...detailprovider,
                                    workingabroad: "Yes",
                                  })
                                }
                                checked={
                                  detailprovider.workingabroad == "Yes"
                                    ? true
                                    : false
                                }
                              />
                              <span> {t("Yes")}</span>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="abroad"
                                onClick={(e) =>
                                  setdetailprovider({
                                    ...detailprovider,
                                    workingabroad: "No",
                                  })
                                }
                                checked={
                                  detailprovider.workingabroad == "No"
                                    ? true
                                    : false
                                }
                              />
                              <span> {t("No")}</span>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="abroad"
                                onClick={(e) =>
                                  setdetailprovider({
                                    ...detailprovider,
                                    workingabroad: "Open to offers",
                                  })
                                }
                                checked={
                                  detailprovider.workingabroad ==
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
                      {detail.service_type &&
                      detail.service_type.tab1 &&
                      Object.keys(detail.service_type).length == 1 ? (
                        <div className="form_group full">
                          <label>
                            {t("Would you consider living with the family?")}
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
                                <span>{t("Open to offers")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div>*/}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={
          ssubtab.security == "active" ? "active personal" : "personal"
        }
      >
        <h3
          onClick={(e) =>
            setssubtab({
              ...ssubtab,
              security: ssubtab.security == "" ? "active" : "",
            })
          }
        >
          {t("Security and Verification")}
        </h3>
        {ssubtab.security == "active" ? (
          <div className="editkids security">
            {edit.security == "" ? (
              <>
                <button onClick={(e) => setedit({ ...edit, security: "edit" })}>
                  <img
                    src={window.location.origin + "/images/edit.svg"}
                    alt=""
                  />
                </button>

                <label>
                  {t("Verified accounts")}
                  <span>
                    <strong>
                      <div className="social_verify">
                        <svg
                          className={
                            detailprovider.facebookverify ? "active" : ""
                          }
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="39"
                            height="39"
                            rx="19.5"
                            stroke="#B7B7B7"
                          />
                          <path
                            d="M21.0677 28.9998V20.7891H23.8237L24.2363 17.5893H21.0677V15.5463C21.0677 14.6199 21.325 13.9885 22.6536 13.9885L24.348 13.9877V11.1258C24.0549 11.087 23.0491 10.9999 21.879 10.9999C19.436 10.9999 17.7634 12.491 17.7634 15.2296V17.5894H15.0003V20.7892H17.7633V28.9999L21.0677 28.9998Z"
                            fill="#B7B7B7"
                          />
                        </svg>
                        {/* <svg width="42" height="42" viewBox="0 0 42 42" fill="#A98D4B" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="1" y="1" width="40" height="40" rx="20" stroke="#A98D4B" />
                                            <path d="M29.9133 16.4929C29.9133 16.6958 29.9133 16.8987 29.9133 17.0726C29.9133 23.0726 25.3336 30.0001 16.9858 30.0001C14.406 30.0001 12.0292 29.2465 10.0002 27.9711C10.3481 28.0001 10.7249 28.0291 11.0727 28.0291C13.1887 28.0291 15.1597 27.3045 16.7249 26.0871C14.7249 26.0581 13.0437 24.7248 12.493 22.9277C12.7829 22.9856 13.0437 23.0146 13.3626 23.0146C13.7684 23.0146 14.1742 22.9566 14.551 22.8407C12.464 22.4349 10.8988 20.6088 10.8988 18.4059C10.8988 18.3769 10.8988 18.3769 10.8988 18.3479C11.5075 18.6958 12.2031 18.8987 12.9568 18.9277C11.7394 18.1161 10.9278 16.7248 10.9278 15.1306C10.9278 14.29 11.1597 13.5074 11.5365 12.8407C13.7684 15.5943 17.1307 17.3914 20.8988 17.5943C20.8118 17.2755 20.7829 16.8987 20.7829 16.5508C20.7829 14.0291 22.8118 12.0001 25.3336 12.0001C26.6379 12.0001 27.8263 12.5508 28.6379 13.4204C29.6814 13.2175 30.6379 12.8407 31.5365 12.319C31.1887 13.3914 30.464 14.261 29.5365 14.8407C30.464 14.7248 31.3336 14.4929 32.1452 14.1161C31.5655 15.0436 30.8118 15.8552 29.9133 16.4929Z" fill="#fff" />
                                        </svg> */}
                        <svg
                          className={
                            detailprovider.linkdinverify ? "active" : ""
                          }
                          width="40"
                          height="40"
                          viewBox="0 0 42 42"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="40"
                            height="40"
                            rx="20"
                            stroke="#B7B7B7"
                          />
                          <path
                            d="M30.5267 29.9936C29.3765 29.9662 28.2537 29.9662 27.1035 29.9936C26.8571 29.9936 26.8023 29.9389 26.8023 29.6924C26.8023 27.6658 26.8023 25.6119 26.8023 23.5854C26.8023 23.1198 26.7749 22.6543 26.638 22.2161C26.2272 20.792 24.584 20.2717 23.4065 21.2302C22.7766 21.7232 22.5301 22.4078 22.5301 23.2294C22.5301 25.1464 22.5301 27.0634 22.5301 28.9804C22.5301 29.2268 22.5027 29.4733 22.5301 29.7472C22.5575 29.9662 22.448 30.021 22.2563 29.9936C21.0787 29.9936 19.9285 29.9936 18.7509 29.9936C18.5318 29.9936 18.4771 29.9389 18.4771 29.7198C18.5044 27.9945 18.5044 26.2692 18.5044 24.5165C18.5044 22.3804 18.5044 20.2443 18.4771 18.1356C18.4771 17.8892 18.5318 17.8344 18.7509 17.8344C19.9285 17.8344 21.0787 17.8344 22.2563 17.8344C22.4754 17.8344 22.5301 17.8892 22.5301 18.1083C22.5301 18.5464 22.5301 18.9846 22.5301 19.5049C22.6123 19.4228 22.6397 19.3954 22.6671 19.368C23.7351 17.807 25.2413 17.3688 27.0214 17.6427C29.0753 17.9713 30.3898 19.3954 30.7184 21.5862C30.8006 22.1066 30.828 22.6269 30.828 23.1472C30.828 25.3381 30.828 27.5015 30.828 29.6924C30.828 29.9115 30.7732 29.9936 30.5267 29.9936Z"
                            fill="#B7B7B7"
                          />
                          <path
                            d="M16.2862 23.9138C16.2862 25.8308 16.2862 27.7478 16.2862 29.6648C16.2862 29.9113 16.2314 29.9935 15.9849 29.9935C14.8347 29.9661 13.6846 29.9935 12.5344 29.9935C12.3153 29.9935 12.2605 29.9387 12.2605 29.7196C12.2605 25.8582 12.2605 21.9695 12.2605 18.1081C12.2605 17.9164 12.3153 17.8342 12.5344 17.8342C13.7119 17.8342 14.8895 17.8342 16.0671 17.8342C16.3136 17.8342 16.341 17.9164 16.341 18.1355C16.2862 20.0525 16.2862 21.9695 16.2862 23.9138Z"
                            fill="#B7B7B7"
                          />
                          <path
                            d="M16.4773 14.6575C16.2034 15.7529 15.0806 16.3828 13.7935 16.1637C12.4242 15.9446 11.6574 14.6027 12.1503 13.2882C12.479 12.4666 13.2732 11.9737 14.2864 12.0011C15.82 11.9737 16.8333 13.2061 16.4773 14.6575Z"
                            fill="#B7B7B7"
                          />
                        </svg>
                        {/* <svg width="42" height="42" viewBox="0 0 42 42" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="1" y="1" width="40" height="40" rx="20" stroke="#B7B7B7" />
                                            <path d="M18.0002 21C18.0002 19.3432 19.343 17.9998 20.9998 17.9998C22.6565 17.9998 24 19.3432 24 21C24 22.6568 22.6565 24.0002 20.9998 24.0002C19.343 24.0002 18.0002 22.6568 18.0002 21ZM16.3784 21C16.3784 23.5524 18.4474 25.6214 20.9998 25.6214C23.5522 25.6214 25.6211 23.5524 25.6211 21C25.6211 18.4476 23.5522 16.3786 20.9998 16.3786C18.4474 16.3786 16.3784 18.4476 16.3784 21ZM24.7241 16.1954C24.724 16.409 24.7873 16.6178 24.9059 16.7955C25.0245 16.9731 25.1931 17.1116 25.3904 17.1934C25.5877 17.2752 25.8049 17.2967 26.0144 17.2551C26.2239 17.2135 26.4164 17.1108 26.5675 16.9598C26.7186 16.8088 26.8215 16.6164 26.8633 16.4069C26.905 16.1974 26.8837 15.9803 26.8021 15.7829C26.7204 15.5855 26.582 15.4168 26.4045 15.2981C26.2269 15.1793 26.0181 15.1159 25.8045 15.1158H25.8041C25.5178 15.1159 25.2432 15.2297 25.0407 15.4321C24.8382 15.6345 24.7243 15.909 24.7241 16.1954ZM17.3638 28.3258C16.4863 28.2858 16.0094 28.1397 15.6924 28.0162C15.2722 27.8526 14.9724 27.6578 14.6572 27.343C14.342 27.0282 14.1469 26.7287 13.984 26.3085C13.8605 25.9917 13.7143 25.5146 13.6744 24.6372C13.6308 23.6885 13.6221 23.4035 13.6221 21.0001C13.6221 18.5966 13.6315 18.3125 13.6744 17.363C13.7144 16.4855 13.8616 16.0094 13.984 15.6917C14.1476 15.2715 14.3424 14.9717 14.6572 14.6564C14.972 14.3412 15.2715 14.1461 15.6924 13.9832C16.0092 13.8597 16.4863 13.7135 17.3638 13.6736C18.3124 13.63 18.5974 13.6213 20.9998 13.6213C23.4021 13.6213 23.6874 13.6307 24.6368 13.6736C25.5143 13.7136 25.9904 13.8608 26.3082 13.9832C26.7284 14.1461 27.0282 14.3417 27.3434 14.6564C27.6586 14.9712 27.853 15.2715 28.0166 15.6917C28.1401 16.0085 28.2863 16.4855 28.3262 17.363C28.3698 18.3125 28.3785 18.5966 28.3785 21.0001C28.3785 23.4035 28.3698 23.6877 28.3262 24.6372C28.2862 25.5146 28.1393 25.9915 28.0166 26.3085C27.853 26.7287 27.6582 27.0285 27.3434 27.343C27.0286 27.6575 26.7284 27.8526 26.3082 28.0162C25.9914 28.1397 25.5143 28.2859 24.6368 28.3258C23.6882 28.3694 23.4032 28.3781 20.9998 28.3781C18.5963 28.3781 18.3121 28.3694 17.3638 28.3258ZM17.2892 12.0545C16.3311 12.0981 15.6764 12.2501 15.1047 12.4725C14.5126 12.7023 14.0113 13.0105 13.5104 13.5106C13.0095 14.0107 12.702 14.5128 12.4723 15.1049C12.2498 15.677 12.0979 16.3314 12.0543 17.2895C12.0099 18.2491 11.9998 18.5559 11.9998 21C11.9998 23.4441 12.0099 23.7509 12.0543 24.7105C12.0979 25.6687 12.2498 26.323 12.4723 26.8951C12.702 27.4868 13.0096 27.9895 13.5104 28.4894C14.0112 28.9893 14.5126 29.2971 15.1047 29.5275C15.6775 29.7499 16.3311 29.9019 17.2892 29.9455C18.2494 29.9891 18.5556 30 20.9998 30C23.4439 30 23.7507 29.9898 24.7103 29.9455C25.6684 29.9019 26.3227 29.7499 26.8948 29.5275C27.4866 29.2971 27.9882 28.9895 28.4891 28.4894C28.99 27.9893 29.2968 27.4868 29.5272 26.8951C29.7497 26.323 29.9023 25.6686 29.9452 24.7105C29.9889 23.7502 29.999 23.4441 29.999 21C29.999 18.5559 29.9889 18.2491 29.9452 17.2895C29.9016 16.3313 29.7497 15.6767 29.5272 15.1049C29.2968 14.5132 28.9892 14.0115 28.4891 13.5106C27.989 13.0097 27.4866 12.7023 26.8955 12.4725C26.3227 12.2501 25.6684 12.0974 24.711 12.0545C23.7514 12.0109 23.4446 12 21.0005 12C18.5564 12 18.2494 12.0102 17.2892 12.0545Z" fill="#B7B7B7" />
                                        </svg> */}
                      </div>
                    </strong>
                  </span>
                </label>
              </>
            ) : (
              <div className="Profile_complete">
                <div className="detail  verification  setp7 mg editkids security">
                  <div className="form_group">
                    <label>{t("Verify your accounts")}</label>
                    <div className="social_verify">
                      <FacebookProvider appId="3384521628485216">
                        <LoginButton
                          scope="email"
                          onCompleted={handleResponse}
                          onError={handleError}
                          className="facebook"
                        >
                          <span>
                            <svg
                              className={
                                detailprovider.facebookverify ? "active" : ""
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
                                stroke="#B7B7B7"
                              />
                              <path
                                d="M21.0677 28.9998V20.7891H23.8237L24.2363 17.5893H21.0677V15.5463C21.0677 14.6199 21.325 13.9885 22.6536 13.9885L24.348 13.9877V11.1258C24.0549 11.087 23.0491 10.9999 21.879 10.9999C19.436 10.9999 17.7634 12.491 17.7634 15.2296V17.5894H15.0003V20.7892H17.7633V28.9999L21.0677 28.9998Z"
                                fill="#B7B7B7"
                              />
                            </svg>
                          </span>
                        </LoginButton>
                      </FacebookProvider>
                      {/* <svg onClick={e => {
                                                if (detailprovider.twitterverify) {
                                                    setdetailprovider({ ...detailprovider, twitterverify: false })
                                                } else {
                                                    setdetailprovider({ ...detailprovider, twitterverify: true })
                                                }
                                            }} className={detailprovider.twitterverify ? "active" : ""} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="1" y="1" width="40" height="40" rx="20" stroke="#B7B7B7" />
                                                <path d="M29.9133 16.4929C29.9133 16.6958 29.9133 16.8987 29.9133 17.0726C29.9133 23.0726 25.3336 30.0001 16.9858 30.0001C14.406 30.0001 12.0292 29.2465 10.0002 27.9711C10.3481 28.0001 10.7249 28.0291 11.0727 28.0291C13.1887 28.0291 15.1597 27.3045 16.7249 26.0871C14.7249 26.0581 13.0437 24.7248 12.493 22.9277C12.7829 22.9856 13.0437 23.0146 13.3626 23.0146C13.7684 23.0146 14.1742 22.9566 14.551 22.8407C12.464 22.4349 10.8988 20.6088 10.8988 18.4059C10.8988 18.3769 10.8988 18.3769 10.8988 18.3479C11.5075 18.6958 12.2031 18.8987 12.9568 18.9277C11.7394 18.1161 10.9278 16.7248 10.9278 15.1306C10.9278 14.29 11.1597 13.5074 11.5365 12.8407C13.7684 15.5943 17.1307 17.3914 20.8988 17.5943C20.8118 17.2755 20.7829 16.8987 20.7829 16.5508C20.7829 14.0291 22.8118 12.0001 25.3336 12.0001C26.6379 12.0001 27.8263 12.5508 28.6379 13.4204C29.6814 13.2175 30.6379 12.8407 31.5365 12.319C31.1887 13.3914 30.464 14.261 29.5365 14.8407C30.464 14.7248 31.3336 14.4929 32.1452 14.1161C31.5655 15.0436 30.8118 15.8552 29.9133 16.4929Z" fill="#B7B7B7" />
                                            </svg> */}
                      {console.log(detailprovider)}
                      <LinkedInPage
                        handleResponse={handleResponse}
                        profile={"icon"}
                        status={detailprovider.linkdinverify}
                      />
                      {/* <svg onClick={e => {
                                                if (detailprovider.linkdinverify) {
                                                    setdetailprovider({ ...detailprovider, linkdinverify: false })
                                                } else {
                                                    setdetailprovider({ ...detailprovider, linkdinverify: true })
                                                }
                                            }} className={detailprovider.linkdinverify ? "active" : ""} width="40" height="40" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="1" y="1" width="40" height="40" rx="20" stroke="#B7B7B7" />
                                                <path d="M30.5267 29.9936C29.3765 29.9662 28.2537 29.9662 27.1035 29.9936C26.8571 29.9936 26.8023 29.9389 26.8023 29.6924C26.8023 27.6658 26.8023 25.6119 26.8023 23.5854C26.8023 23.1198 26.7749 22.6543 26.638 22.2161C26.2272 20.792 24.584 20.2717 23.4065 21.2302C22.7766 21.7232 22.5301 22.4078 22.5301 23.2294C22.5301 25.1464 22.5301 27.0634 22.5301 28.9804C22.5301 29.2268 22.5027 29.4733 22.5301 29.7472C22.5575 29.9662 22.448 30.021 22.2563 29.9936C21.0787 29.9936 19.9285 29.9936 18.7509 29.9936C18.5318 29.9936 18.4771 29.9389 18.4771 29.7198C18.5044 27.9945 18.5044 26.2692 18.5044 24.5165C18.5044 22.3804 18.5044 20.2443 18.4771 18.1356C18.4771 17.8892 18.5318 17.8344 18.7509 17.8344C19.9285 17.8344 21.0787 17.8344 22.2563 17.8344C22.4754 17.8344 22.5301 17.8892 22.5301 18.1083C22.5301 18.5464 22.5301 18.9846 22.5301 19.5049C22.6123 19.4228 22.6397 19.3954 22.6671 19.368C23.7351 17.807 25.2413 17.3688 27.0214 17.6427C29.0753 17.9713 30.3898 19.3954 30.7184 21.5862C30.8006 22.1066 30.828 22.6269 30.828 23.1472C30.828 25.3381 30.828 27.5015 30.828 29.6924C30.828 29.9115 30.7732 29.9936 30.5267 29.9936Z" fill="#B7B7B7" />
                                                <path d="M16.2862 23.9138C16.2862 25.8308 16.2862 27.7478 16.2862 29.6648C16.2862 29.9113 16.2314 29.9935 15.9849 29.9935C14.8347 29.9661 13.6846 29.9935 12.5344 29.9935C12.3153 29.9935 12.2605 29.9387 12.2605 29.7196C12.2605 25.8582 12.2605 21.9695 12.2605 18.1081C12.2605 17.9164 12.3153 17.8342 12.5344 17.8342C13.7119 17.8342 14.8895 17.8342 16.0671 17.8342C16.3136 17.8342 16.341 17.9164 16.341 18.1355C16.2862 20.0525 16.2862 21.9695 16.2862 23.9138Z" fill="#B7B7B7" />
                                                <path d="M16.4773 14.6575C16.2034 15.7529 15.0806 16.3828 13.7935 16.1637C12.4242 15.9446 11.6574 14.6027 12.1503 13.2882C12.479 12.4666 13.2732 11.9737 14.2864 12.0011C15.82 11.9737 16.8333 13.2061 16.4773 14.6575Z" fill="#B7B7B7" />
                                            </svg> */}
                      {/* <svg onClick={e => {
                                                if (detailprovider.instaverify) {
                                                    setdetailprovider({ ...detailprovider, instaverify: false })
                                                } else {
                                                    setdetailprovider({ ...detailprovider, instaverify: true })
                                                }
                                            }} className={detailprovider.instaverify ? "active" : ""} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="1" y="1" width="40" height="40" rx="20" stroke="#B7B7B7" />
                                                <path d="M18.0002 21C18.0002 19.3432 19.343 17.9998 20.9998 17.9998C22.6565 17.9998 24 19.3432 24 21C24 22.6568 22.6565 24.0002 20.9998 24.0002C19.343 24.0002 18.0002 22.6568 18.0002 21ZM16.3784 21C16.3784 23.5524 18.4474 25.6214 20.9998 25.6214C23.5522 25.6214 25.6211 23.5524 25.6211 21C25.6211 18.4476 23.5522 16.3786 20.9998 16.3786C18.4474 16.3786 16.3784 18.4476 16.3784 21ZM24.7241 16.1954C24.724 16.409 24.7873 16.6178 24.9059 16.7955C25.0245 16.9731 25.1931 17.1116 25.3904 17.1934C25.5877 17.2752 25.8049 17.2967 26.0144 17.2551C26.2239 17.2135 26.4164 17.1108 26.5675 16.9598C26.7186 16.8088 26.8215 16.6164 26.8633 16.4069C26.905 16.1974 26.8837 15.9803 26.8021 15.7829C26.7204 15.5855 26.582 15.4168 26.4045 15.2981C26.2269 15.1793 26.0181 15.1159 25.8045 15.1158H25.8041C25.5178 15.1159 25.2432 15.2297 25.0407 15.4321C24.8382 15.6345 24.7243 15.909 24.7241 16.1954ZM17.3638 28.3258C16.4863 28.2858 16.0094 28.1397 15.6924 28.0162C15.2722 27.8526 14.9724 27.6578 14.6572 27.343C14.342 27.0282 14.1469 26.7287 13.984 26.3085C13.8605 25.9917 13.7143 25.5146 13.6744 24.6372C13.6308 23.6885 13.6221 23.4035 13.6221 21.0001C13.6221 18.5966 13.6315 18.3125 13.6744 17.363C13.7144 16.4855 13.8616 16.0094 13.984 15.6917C14.1476 15.2715 14.3424 14.9717 14.6572 14.6564C14.972 14.3412 15.2715 14.1461 15.6924 13.9832C16.0092 13.8597 16.4863 13.7135 17.3638 13.6736C18.3124 13.63 18.5974 13.6213 20.9998 13.6213C23.4021 13.6213 23.6874 13.6307 24.6368 13.6736C25.5143 13.7136 25.9904 13.8608 26.3082 13.9832C26.7284 14.1461 27.0282 14.3417 27.3434 14.6564C27.6586 14.9712 27.853 15.2715 28.0166 15.6917C28.1401 16.0085 28.2863 16.4855 28.3262 17.363C28.3698 18.3125 28.3785 18.5966 28.3785 21.0001C28.3785 23.4035 28.3698 23.6877 28.3262 24.6372C28.2862 25.5146 28.1393 25.9915 28.0166 26.3085C27.853 26.7287 27.6582 27.0285 27.3434 27.343C27.0286 27.6575 26.7284 27.8526 26.3082 28.0162C25.9914 28.1397 25.5143 28.2859 24.6368 28.3258C23.6882 28.3694 23.4032 28.3781 20.9998 28.3781C18.5963 28.3781 18.3121 28.3694 17.3638 28.3258ZM17.2892 12.0545C16.3311 12.0981 15.6764 12.2501 15.1047 12.4725C14.5126 12.7023 14.0113 13.0105 13.5104 13.5106C13.0095 14.0107 12.702 14.5128 12.4723 15.1049C12.2498 15.677 12.0979 16.3314 12.0543 17.2895C12.0099 18.2491 11.9998 18.5559 11.9998 21C11.9998 23.4441 12.0099 23.7509 12.0543 24.7105C12.0979 25.6687 12.2498 26.323 12.4723 26.8951C12.702 27.4868 13.0096 27.9895 13.5104 28.4894C14.0112 28.9893 14.5126 29.2971 15.1047 29.5275C15.6775 29.7499 16.3311 29.9019 17.2892 29.9455C18.2494 29.9891 18.5556 30 20.9998 30C23.4439 30 23.7507 29.9898 24.7103 29.9455C25.6684 29.9019 26.3227 29.7499 26.8948 29.5275C27.4866 29.2971 27.9882 28.9895 28.4891 28.4894C28.99 27.9893 29.2968 27.4868 29.5272 26.8951C29.7497 26.323 29.9023 25.6686 29.9452 24.7105C29.9889 23.7502 29.999 23.4441 29.999 21C29.999 18.5559 29.9889 18.2491 29.9452 17.2895C29.9016 16.3313 29.7497 15.6767 29.5272 15.1049C29.2968 14.5132 28.9892 14.0115 28.4891 13.5106C27.989 13.0097 27.4866 12.7023 26.8955 12.4725C26.3227 12.2501 25.6684 12.0974 24.711 12.0545C23.7514 12.0109 23.4446 12 21.0005 12C18.5564 12 18.2494 12.0102 17.2892 12.0545Z" fill="#B7B7B7" />
                                            </svg> */}
                    </div>
                  </div>
                  <div className="form_group fs">
                    <div className="verification_number ">
                      <label>
                        <b>{t("Verified phone number")}</b>
                      </label>
                      <div className="number">
                        <input
                          type="text"
                          placeholder={t("Enter phone number")}
                          value={
                            detail.phone != null
                              ? "+" + detail.countrycode + " - " + detail.phone
                              : ""
                          }
                          disabled
                        />

                        <button>
                          {t("Verified")}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                              fill="#A98D4B"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z"
                              fill="white"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <br />
                      <label>{t("Enter new number for verification")}</label>
                      <div className="number profilecretate">
                        <div
                          className="country_flag"
                          onClick={(e) => codeselect()}
                        >
                          {/* <img src={contact_code.flag} /> {contact_code.code} */}
                          <img
                            src={
                              contact_code.flag &&
                              `${window.location.origin}/${contact_code.flag}`
                            }
                          />{" "}
                          {contact_code.code}
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
                                <img
                                  src={window.location.origin + "/" + e.flag}
                                />{" "}
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
                            setdetailprovider({
                              ...detailprovider,
                              phone: e.target.value,
                            });
                            detailprovider.phone.length > 7
                              ? seterror({ ...error, phone: "" })
                              : seterror({ ...error, phone: "error" });
                          }}
                        />

                        <button
                          onClick={(e) => mobileverify()}
                          disabled={
                            detail.phone != detailprovider.phone &&
                            detailprovider.phone.length == 10
                              ? false
                              : true
                          }
                        >
                          {dis ? t("Wait") : t("Get code")}
                        </button>
                      </div>
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
                        " Verification has failed. Please check if you have entered the correct number and try again in 60 seconds."
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
                      {t("Verification has failed. Please contact the")}
                      <Link to="/contact-us">{t("tech support")}</Link>{" "}
                      {t("for further assistance.")}
                    </div>
                    {/* <div className='errorfield'>{error.message}</div>*/}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={
          ssubtab.personal == "active" ? "active personal" : "personal"
        }
      >
        <h3
          onClick={(e) =>
            setssubtab({
              ...ssubtab,
              personal: ssubtab.personal == "" ? "active" : "",
            })
          }
        >
          {t("Personal Preferences")}
        </h3>
        {ssubtab.personal == "active" ? (
          <div className="personal_preferences">
            <div className="notification_edt">
              <h6>{t("Alerts and notifications")}</h6>
              <label>{t("Send alerts for")}</label>
              <ul>
                {/* <li>Deals
                                    <label class="switchedit">
                                        <input type="checkbox" onClick={e => setdetailprovider({ ...detailprovider, alertDeals: e.target.checked ? "yes" : "no" })} checked={detailprovider.alertDeals == "yes" ? true : false} />
                                        <span class="slideredit roundedit"></span>
                                    </label>
                                </li>
                                <li>EDU products
                                    <label class="switchedit">
                                        <input type="checkbox" onClick={e => setdetailprovider({ ...detailprovider, alertEDUproducts: e.target.checked ? "yes" : "no" })} checked={detailprovider.alertEDUproducts == "yes" ? true : false} />
                                        <span class="slideredit roundedit"></span>
                                    </label>
                                </li> */}
                <li>
                  {t("Job posts")}
                  <label class="switchedit">
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        setdetailprovider({
                          ...detailprovider,
                          alertJobposts: e.target.checked ? "yes" : "no",
                        })
                      }
                      checked={
                        detailprovider.alertJobposts == "yes" ||
                        detailprovider.alertJobposts == ""
                          ? true
                          : false
                      }
                    />
                    <span class="slideredit roundedit"></span>
                  </label>
                </li>
              </ul>
            </div>
            <div className="notification_edt">
              <h6>{t("Profile actions")}</h6>
              <ul>
                <li>
                  {t("Share profile")}
                  <label class="switchedit">
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        setdetailprovider({
                          ...detailprovider,
                          plateformsocialmedia: e.target.checked ? "Yes" : "No",
                        });
                      }}
                      checked={
                        detailprovider.plateformsocialmedia == "Yes" ||
                        detailprovider.plateformsocialmedia == ""
                          ? true
                          : false
                      }
                    />
                    <span class="slideredit roundedit"></span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        <div class="button text-center">
          <div class="pull-right">
            <button
              class="btn"
              onClick={(e) => {
                localStorage.setItem("search", "Profile");
                window.location.reload();
              }}
            >
              {t("Cancel")}
            </button>
          </div>
          <div class="pull-right">
            <button
              class="btn confirm"
              onClick={(e) => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                error.email != "" ? seterror({ ...error }) : profile_update();
              }}
            >
              {t("Save changes")}
            </button>
          </div>
        </div>
      </div>

      {show ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <div className="promocode_content younger statuschange">
              <Link to="" onClick={handleClose}>
                +{" "}
              </Link>
              <h5>{t("Change the status of profession")}</h5>
              <br />
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
                    <button class="btn" onClick={handleClose}>
                      {t("Cancel")}
                    </button>
                  </div>
                  <div class="pull-right">
                    <button
                      class="btn confirm"
                      onClick={(e) => {
                        console.log(Object.keys(inactiveprofessional).length);
                        if (disableset == 1) {
                          if (Object.keys(inactiveprofessional).length == 2) {
                            setinactiveprofessional({});
                            setactiveprofession(
                              JSON.parse(sessionStorage.getItem("service"))
                            );
                          } else {
                            setinactiveprofessional({ tab1: "Nanny" });
                            let x = JSON.parse(
                              sessionStorage.getItem("service")
                            );
                            delete x["tab1"];
                            setTimeout(() => {
                              setactiveprofession({ ...x });
                            }, 300);
                          }
                          handleClose();
                        } else if (disableset == 2) {
                          if (Object.keys(inactiveprofessional).length == 2) {
                            setinactiveprofessional({});
                            setactiveprofession(
                              JSON.parse(sessionStorage.getItem("service"))
                            );
                          } else {
                            setinactiveprofessional({
                              tab2: "Special Education Teacher",
                            });
                            let x = JSON.parse(
                              sessionStorage.getItem("service")
                            );
                            delete x["tab2"];
                            setTimeout(() => {
                              setactiveprofession({ ...x });
                            }, 300);
                          }
                          handleClose();
                        } else if (disableset == 3) {
                          if (Object.keys(inactiveprofessional).length == 2) {
                            setinactiveprofessional({});
                            setactiveprofession(
                              JSON.parse(sessionStorage.getItem("service"))
                            );
                          } else {
                            setinactiveprofessional({
                              tab3: "Special Education Paraprofessional",
                            });
                            let x = JSON.parse(
                              sessionStorage.getItem("service")
                            );
                            delete x["tab3"];
                            setTimeout(() => {
                              setactiveprofession({ ...x });
                            }, 300);
                          }
                          handleClose();
                        } else if (disableset == 4) {
                          if (Object.keys(inactiveprofessional).length == 2) {
                            setinactiveprofessional({});
                            setactiveprofession(
                              JSON.parse(sessionStorage.getItem("service"))
                            );
                          } else {
                            setinactiveprofessional({ tab4: "Tutor" });
                            let x = JSON.parse(
                              sessionStorage.getItem("service")
                            );
                            delete x["tab4"];
                            setTimeout(() => {
                              setactiveprofession({ ...x });
                            }, 300);
                          }
                          handleClose();
                        }
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
      {photoupload ? (
        <Modal show={photoupload} onHide={(e) => setphotoupload(false)}>
          <Modal.Body>
            <div className="promocode_content cancelmembership uploadphoto">
              <div className="">
                <p>
                  <strong>{t("Upload profile photos")}</strong>
                </p>
                <br />
                <ul>
                  <li>
                    {photo != "" ? (
                      <>
                        <img src={image} alt="preview image" />
                        <button onClick={(e) => setphoto("")}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="10" cy="10" r="10" fill="#A98D4B" />
                            <path
                              d="M6 6.64062V6.09375C6 5.83398 6.20898 5.625 6.46875 5.625H8.65625L8.83984 5.25977C8.91797 5.09961 9.08008 5 9.25781 5H11.4902C11.668 5 11.8301 5.09961 11.9102 5.25977L12.0937 5.625H14.2812C14.541 5.625 14.75 5.83398 14.75 6.09375V6.64062C14.75 6.76953 14.6445 6.875 14.5156 6.875H6.23437C6.10547 6.875 6 6.76953 6 6.64062ZM14.1094 7.74805L13.7109 14.1211C13.6797 14.6152 13.2695 15 12.7754 15H7.97461C7.48047 15 7.07031 14.6152 7.03906 14.1211L6.64062 7.74805C6.63281 7.61328 6.74023 7.5 6.875 7.5H13.8769C14.0098 7.5 14.1172 7.61328 14.1094 7.74805Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <img
                          src={
                            api +
                            "/public/assets/images/users/" +
                            detail.file_path
                          }
                          alt="preview image"
                        />
                        {/* <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                     <circle cx="15" cy="15" r="14.5" stroke="#A98D4B" />
                                                     <rect x="14" y="7" width="2.28571" height="16" rx="1.14286" fill="#A98D4B" />
                                                     <rect x="7" y="16" width="2.28571" height="16" rx="1.14286" transform="rotate(-90 7 16)" fill="#A98D4B" />
                                                 </svg> */}
                      </>
                    )}
                    <input
                      type={"file"}
                      onChange={onImageChange}
                      accept="image/*"
                    />
                  </li>
                  <li>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="15" cy="15" r="14.5" stroke="#A98D4B" />
                      <rect
                        x="14"
                        y="7"
                        width="2.28571"
                        height="16"
                        rx="1.14286"
                        fill="#A98D4B"
                      />
                      <rect
                        x="7"
                        y="16"
                        width="2.28571"
                        height="16"
                        rx="1.14286"
                        transform="rotate(-90 7 16)"
                        fill="#A98D4B"
                      />
                    </svg>
                    {/* <input type={"file"} onChange={e => setphoto(e.target.files[0])} accept="image/*" /> */}
                    <button>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" fill="#A98D4B" />
                        <path
                          d="M6 6.64062V6.09375C6 5.83398 6.20898 5.625 6.46875 5.625H8.65625L8.83984 5.25977C8.91797 5.09961 9.08008 5 9.25781 5H11.4902C11.668 5 11.8301 5.09961 11.9102 5.25977L12.0937 5.625H14.2812C14.541 5.625 14.75 5.83398 14.75 6.09375V6.64062C14.75 6.76953 14.6445 6.875 14.5156 6.875H6.23437C6.10547 6.875 6 6.76953 6 6.64062ZM14.1094 7.74805L13.7109 14.1211C13.6797 14.6152 13.2695 15 12.7754 15H7.97461C7.48047 15 7.07031 14.6152 7.03906 14.1211L6.64062 7.74805C6.63281 7.61328 6.74023 7.5 6.875 7.5H13.8769C14.0098 7.5 14.1172 7.61328 14.1094 7.74805Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
                <ol>
                  <li>
                    <div className="select_photoprofile">
                      <input
                        type="radio"
                        id="photo"
                        name="photo"
                        checked="true"
                      />
                      <span>{t("Set as profile photo")}</span>
                    </div>
                  </li>
                  <li>
                    <div className="select_photoprofile">
                      <input type="radio" id="photo" name="photo" />
                      <span>{t("Set as profile photo")}</span>
                    </div>
                  </li>
                </ol>
                <br />
                <p className="giveus">
                  {t("* You can upload .jpg and .png files size up to 5Mb")}
                </p>

                <div class="button text-center">
                  <div class="pull-right">
                    <button class="btn" onClick={(e) => setphotoupload()}>
                      {t("Close")}
                    </button>
                  </div>
                  <div class="pull-right">
                    <button
                      class="btn confirm"
                      onClick={(e) => profile_update2()}
                    >
                      {t("Upload photo")}
                    </button>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default View_edit_provider;
