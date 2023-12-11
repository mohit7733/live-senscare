import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { api, api2 } from "../../urls";
import Footer from "./common/footer";
import Header from "./common/header";
import Location from "./common/location";
import Modal from "react-bootstrap/Modal";
import Calander from "./common/calander";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import Profession_change from "./profession_chnage";
import Send_review from "./send_review";
import Notification_tab_parents from "./notification_tab_parents";
import Notification_tab_provider from "./notification_tab_provider";
import Job_history_tap from "./common/job_history_tap";
import Favorite_provider from "./common/favorite_provider";
import Parents_notification_tabs from "./parents_notification_tabs";
import Provider_notification_tabs from "./provider_notification_tabs";
import Favorite_profile from "./common/favorite_profile";
import Job_history_tap_parents from "./common/job_hist_doc";
import Count_notification from "./count_notification";
import View_edit from "./view_edit";
import View_edit_provider from "./view_edit_provider";
import Message_tab from "./common/message_tab";
import Count_message from "./count_message";
import Facebook_share from "./common/share_facebook";
import { useTranslation } from "react-i18next";

export default function Profile_provider() {
  const { t, i18n } = useTranslation("ProvidedSignup");
  const language = i18n.language;
  const navigate = useNavigate();
  const [list, setlist] = useState([]);
  const [showflogin2, setshowflogin2] = useState(false);
  const [showfprovider2, setShowfprovider2] = useState(false);
  const [usd, setusd] = useState({
    min: 0,
    max: 0,
  });
  const [tutorusd, settutorusd] = useState({
    min: 0,
    max: 0,
  });
  const [search, setsearch] = useState({
    jobcategory: "",
    keyword: "",
    city: "",
    zip: "",
    tutorintrestedin: "",
    tutorintrestedin1: "",
    tutorintrestedin2: "",
    tutorworkwithnochild: "",
    tutorprefchildage: "",
    rates: "",
    workingabroad: "",
    tutorintrestedinschool: "",
    carorlicence: "",
    withinweek: "",
    withinmonth: "",
    jobposted: "",
    distance: "",
  });
  const [certificates, setcertificates] = useState({
    qualificationscertificatesname: "",
    qualificationscertificatesname2: "",
    qualificationscertificatesname3: "",
    qualificationscertificatesname4: "",
  });
  const [advance_search, setadvance_search] = useState(false);
  const [photoupload, setphotoupload] = useState(false);
  const [image, setImage] = useState(null);
  const [photo, setphoto] = useState("");
  const [interviewinvite, setinterviewinvite] = useState(false);
  const [request, setrequest] = useState(false);
  const [reviewmodel, setreviewmodel] = useState(false);
  const [profile, setprofile] = useState({});

  const [selfprofile, setselfprofile] = useState({});
  const [count, setcount] = useState(true);
  const [filtercheck, setfiltercheck] = useState(true);
  const [children, setchildren] = useState("");
  const [children_age, setchildren_age] = useState([]);
  const [category, setcategory] = useState([]);
  const [document, setdocument] = useState([]);
  const [latlong, setlatlong] = useState({
    lat: "",
    lng: "",
  });
  const [recommend, setrecommend] = useState("");
  const [jobs_list_profession, setjobs_list_profession] = useState([]);
  const [survay, setsurvay] = useState(false);
  const [invite_status, setinvite_status] = useState("0");
  const [job_id, setjob_id] = useState("");
  const [catopen, setcatopen] = useState(true);
  const [cat, setcat] = useState({
    data1: "",
    data2: "",
    data3: "",
    data4: "",
  });
  const [children2, setchildren2] = useState({
    data1: "",
    data2: "",
    data3: "",
    data4: "",
  });

  const [profilesection, setprofilesection] = useState(
    localStorage.getItem("side") && localStorage.getItem("side") != ""
      ? localStorage.getItem("side")
      : ""
  );
  const [subtab, setsubtab] = useState(
    localStorage.getItem("search") && localStorage.getItem("search") != ""
      ? localStorage.getItem("search")
      : ""
  );

  const [signout, setsignout] = useState(false);

  const usdfix = (e) => {
    setusd({
      min: 0,
      max: e,
    });
  };
  const selectoption = (data) => {
    let sum = false;
    category.map((e, index) => {
      if (e.name == data) {
        sum = true;
        category.splice(index, 1);
      }
    });
    if (sum == false) {
      category.push({ name: data });
    }
    setTimeout(() => {
      setcategory([...category]);
    }, 500);
  };
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
    console.log(children_age);
  };
  const custom = (e) => {
    if (catopen) {
      let x = window.document.getElementById("filtern");
      x.style.display = "block";
      setcatopen(false);
    } else {
      window.document.getElementById("filtern").style.display = "none";
      setcatopen(true);
    }
  };
  const custom2 = (e, x) => {
    console.log(e);
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
  const custom3 = (e, x) => {
    console.log(e);
    if (catopen) {
      setrecommend("open");
      setcatopen(false);
    } else {
      setrecommend("");
      setcatopen(true);
    }
  };
  const [qualifications, setqualifications] = useState({
    English: "",
    Serbian: "",
    Mathematics: "",
    Physics: "",
    Chemistry: "",
    Other: "",
  });
  const slugdata = useParams();
  const id = slugdata.id;

  const profilemy = () => {
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
        setadvance_search(true);
        setselfprofile(result.data);
        visiter();
      })
      .catch((error) => console.log("error", error));

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      provider_id: slugdata.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/getinterviewstatus", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setinvite_status(result.data.status);
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const jobs_list_send = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer   " + localStorage.getItem("token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      api + "/api/v1/currentactivejobs?providerid=" + slugdata.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setjobs_list_profession(result.data);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const profiledata = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer  " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: slugdata.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      api +
        "/api/" +
        (localStorage.getItem("token") != null
          ? "v1/favotheruserprofileview"
          : "otheruserprofileview"),
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setprofile(result.data);
        console.log(result);
        if (result.data.qualificationscertificatesname[0]) {
          var iterator = result.data.qualificationscertificatesname.values();
          var y = {};

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
        setTimeout(() => {
          if (result.data.calanderlastupdate != null) {
            setcalandertype(parseInt(result.data.calanderlastupdate));
          }
        }, 2000);
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
        console.log(result.data);
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
      })
      .catch((error) => console.log("error", error));
  };
  const provider_list = () => {
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

    fetch(
      api +
        "/api/jobslisting?keyword=" +
        search.keyword +
        "&distance=" +
        search.distance +
        "&lat=" +
        latlong.lat +
        "&lng=" +
        latlong.lng +
        "&city=" +
        search.city +
        "&zip=" +
        search.zip +
        "&tutorintrestedin[]=" +
        search.tutorintrestedin +
        "&tutorintrestedin[]=" +
        search.tutorintrestedin1 +
        "&tutorintrestedin[]=" +
        search.tutorintrestedin2 +
        "&tutorworkwithnochild=" +
        children +
        "&rates=" +
        (usd.min + "-" + usd.max) +
        "&workingabroad=" +
        search.workingabroad +
        "&tutorintrestedinschool=" +
        search.tutorintrestedinschool +
        (cat.data1 != "" ? "&jobcategory[]=" + cat.data1 : "&jobcategory[]=") +
        (cat.data2 != "" ? "&jobcategory[]=" + cat.data2 : "&jobcategory[]=") +
        (cat.data3 != "" ? "&jobcategory[]=" + cat.data3 : "&jobcategory[]=") +
        (cat.data4 != "" ? "&jobcategory[]=" + cat.data4 : "&jobcategory[]=") +
        "&tutorprefchildage=" +
        search.tutorprefchildage +
        "&carorlicence=" +
        search.carorlicence +
        "&withinweek=" +
        search.withinweek +
        "&withinmonth=" +
        search.withinmonth +
        "&jobposted=" +
        search.jobposted,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        // setlist(result.data)
      })
      .catch((error) => console.log("error", error));
  };
  const filter_box = () => {
    if (filtercheck) {
      document.getElementById("filteron").style.display = "block";
      setfiltercheck(false);
    } else {
      document.getElementById("filteron").style.display = "none";
      setfiltercheck(true);
    }
  };
  const getletlon = (latlong2, e, addresss) => {
    e.then(function (result) {
      setlatlong(result);
    });
    let x = "";
    let y = "";
    for (var i = 0; i < latlong2.address_components.length; i++) {
      for (var j = 0; j < latlong2.address_components[i].types.length; j++) {
        if (
          latlong2.address_components[i].types[j] ==
          "administrative_area_level_1"
        ) {
          x = latlong2.address_components[i].long_name;
        }
      }
    }
    for (var i = 0; i < latlong2.address_components.length; i++) {
      for (var j = 0; j < latlong2.address_components[i].types.length; j++) {
        if (
          latlong2.address_components[i].types[j] == "postal_code" ||
          latlong2.address_components[i].types[j] == "street_number"
        ) {
          y = latlong2.address_components[i].long_name;
        }
      }
    }
    latlong2.address_components.map((e) => {
      console.log(addresss);
      e.types.map((a) => {
        if (a == "country") {
          // seterror({ ...error, country: "", address: "" })
          setprofile({
            ...profile,
            country: e.long_name,
            address: addresss,
            zip: y,
            city: x,
          });
        }
      });
    });
    if (e != "getLatLng") {
      e.then(function (result) {
        setlatlong(result);
        setsearch({ ...search, zip: parseInt(addresss) });
        console.log(result);
      });
    } else {
      setsearch({ ...search, zip: "" });
    }
  };
  const profile_update = () => {
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
  const calender_data = (name, e) => {
    console.log(name, e);
  };
  const sliderRef = useRef();
  const [ssubtab, setssubtab] = useState({
    About: localStorage.getItem("edittime") ? "active" : "",
    kids: localStorage.getItem("edittime") ? "active" : "",
    job: localStorage.getItem("edittime") ? "active" : "",
    availability: localStorage.getItem("edittime") ? "active" : "",
    info: localStorage.getItem("edittime") ? "active" : "",
    security: localStorage.getItem("edittime") ? "active" : "",
    personal: localStorage.getItem("edittime") ? "active" : "",
    Reviews: localStorage.getItem("edittime") ? "active" : "",
    Job: localStorage.getItem("edittime") ? "active" : "",
  });
  const [plink, setplink] = useState(true);
  const [status, setstatus] = useState(false);
  const [usd3, setusd3] = useState({
    min: 0,
    max: 0,
  });
  const [usd4, setusd4] = useState({
    min: 0,
    max: 0,
  });
  const [calandertype, setcalandertype] = useState(1);
  const [habit, sethabit] = useState({
    licence: "",
    kids: "",
    housework: "",
    family: "",
  });
  var settings2 = {
    dots: false,
    infinite: true,
    slidesToShow:
      profile.reviewData?.length > 2 ? 3 : profile.reviewData?.length,
    arrows: true,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const [report, setreport] = useState({
    resion: "",
    other: "",
    error: "",
  });
  const [showflogin, setshowflogin] = useState(false);
  const reportset = () => {
    if (report.resion != "") {
      setreport({ ...report, error: "" });
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        report_userid: slugdata.id,
        reason: report.resion,
        other_reason: report.other,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(api + "/api/v1/reportuser", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setsurvay(false);
          setshowflogin(true);
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      setreport({ ...report, error: "error" });
    }
  };
  const visiter = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userid: slugdata.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/visitorsadd", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw2 = JSON.stringify({
      visitor_userid: slugdata.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };

    fetch(api + "/api/v1/providerprofilecheck", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const document_select = (a) => {
    // setcategory([a])
    let sum = false;
    category.map((e) => {
      if (e == a) {
        sum = true;
        const index = category.indexOf(a);
        if (index > -1) {
          category.splice(index, 1);
        }
        // setcategory([...category])
      }
    });
    if (sum == false) {
      category.push(a);
    }
    console.log(category);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setphoto(event.target.files[0]);
    }
  };
  useEffect(() => {
    if (count) {
      provider_list();
      profiledata();
      jobs_list_send();
      profilemy();
      setcount(false);
    }
    console.log(category);
    localStorage.setItem("side", profilesection);
    localStorage.setItem("back", localStorage.getItem("back"));
  }, [profile, category, profilesection]);
  const [status2, setstatus2] = useState(false);
  const recommendations = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "XSRF-TOKEN=" + localStorage.getItem("token"));

    var raw = JSON.stringify({
      provider_id: profile.id,
      documment_name: category,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/documentrequestforinterview", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setrequest(false);
        setstatus2(true);
        setTimeout(() => {
          setstatus2(false);
        }, 4000);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  const [ecomen, setecomen] = useState("");
  const interview_invite = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      provider_id: profile.id,
      job_id: job_id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/sendinterviewrequest", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setinterviewinvite(false);
        setstatus(true);
        setecomen("1");
        setTimeout(() => {
          setstatus(false);
        }, 4000);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Header fil={filter_box} />

      {status ? (
        <div className="popup_status" id="popup_status">
          {t("Congratulations, you successfully sent an interview invite!")}
        </div>
      ) : (
        ""
      )}
      {status2 ? (
        <div className="popup_status" id="popup_status">
          {t("Congratulations. You successfully requested a document!")}
        </div>
      ) : (
        ""
      )}
      <div className="container-fluid">
        <div className="filter_header" id="">
          <div className="container">
            <div
              className="filter_box"
              onKeyPress={(e) => {
                if (
                  e.key == "Enter" &&
                  localStorage.getItem("token") &&
                  localStorage.getItem("id")
                ) {
                  provider_list();
                }
              }}
            >
              <div className="filter_search">
                <div className="advance_search_filter">
                  <div
                    className={
                      "advance_search_filter_input Profile_complete " +
                      (!catopen ? "op" : "")
                    }
                  >
                    <span id="my-adv-filter" onClick={(e) => custom("filtern")}>
                      {t("Advanced search")}
                    </span>
                    {advance_search != false ? (
                      <div
                        className="filters_search detail work-experience"
                        id="filtern"
                        style={
                          profile.about == "" ||
                          profile.about == null ||
                          !localStorage.getItem("token") ||
                          !localStorage.getItem("id") ||
                          localStorage.getItem("refine")
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <div className="form_group full border qualification">
                          <label>{t("Frequency")}</label>
                          <div className="checkbox create">
                            <ul>
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setsearch({
                                        ...search,
                                        tutorintrestedin: "Full time",
                                      });
                                    } else {
                                      setsearch({
                                        ...search,
                                        tutorintrestedin: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("Full time")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setsearch({
                                        ...search,
                                        tutorintrestedin1: "Part time",
                                      });
                                    } else {
                                      setsearch({
                                        ...search,
                                        tutorintrestedin1: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("Part time")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name=""
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setsearch({
                                        ...search,
                                        tutorintrestedin2: "Occasionally",
                                      });
                                    } else {
                                      setsearch({
                                        ...search,
                                        tutorintrestedin2: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("Occasionally")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div> */}
                        </div>
                        <div className="form_group full border">
                          <label>
                            {t("Hourly rate")}{" "}
                            {profile && profile.country == "Serbia"
                              ? "(RSD)"
                              : "(USD)"}
                          </label>
                          {profile && profile.country == "Serbia" ? (
                            <div className="wrapper">
                              <div className="container_slide">
                                <div className="slider-track">
                                  <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
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
                              <div className="slider two">
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
                            <div className="wrapper">
                              <div className="container_slide">
                                <div className="slider-track">
                                  <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
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
                              <div className="slider two">
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
                          <span className="price">
                            {profile && profile.country == "Serbia"
                              ? usd.min * 100 + " - " + usd.max * 100
                              : usd.min + " - " + usd.max}
                          </span>
                          {/* <div className='errorfield'>{error.message}</div> */}
                        </div>

                        <div className="form_group full border">
                          <label>Number of children</label>
                          <div className="children_number">
                            <ul>
                              <li
                                onClick={(e) => {
                                  if (children2.data1 == "") {
                                    setchildren2({ ...children2, data1: 1 });
                                    setchildren(1);
                                  } else {
                                    setchildren2({ ...children2, data1: "" });
                                    setchildren("");
                                  }
                                }}
                                className={children2.data1 == 1 ? "active" : ""}
                              >
                                1
                              </li>
                              <li
                                onClick={(e) => {
                                  if (children2.data2 == "") {
                                    setchildren2({ ...children2, data2: 2 });
                                    setchildren(2);
                                  } else {
                                    setchildren2({ ...children2, data2: "" });
                                    setchildren("");
                                  }
                                }}
                                className={children2.data2 == 2 ? "active" : ""}
                              >
                                2
                              </li>
                              <li
                                onClick={(e) => {
                                  if (children2.data3 == "") {
                                    setchildren2({
                                      ...children2,
                                      data3: "twins",
                                    });
                                    setchildren("twins");
                                  } else {
                                    setchildren2({ ...children2, data3: "" });
                                    setchildren("");
                                  }
                                }}
                                className={
                                  children2.data3 == "twins" ? "active" : ""
                                }
                              >
                                Twins
                              </li>
                              <li
                                onClick={(e) => {
                                  if (children2.data4 == "") {
                                    setchildren2({ ...children2, data4: "3" });
                                    setchildren(3);
                                  } else {
                                    setchildren2({ ...children2, data4: "" });
                                    setchildren("");
                                  }
                                }}
                                className={children2.data4 == 3 ? "active" : ""}
                              >
                                3+
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div> */}
                        </div>
                        <div className="job_performance">
                          <div className="form_group   full border">
                            <label>{t("Child’s age")}</label>
                            <div className="customselect inp">
                              <input
                                className="keyword"
                                type="text"
                                placeholder={t("Choose from the list")}
                                value={children_age.map((e) => {
                                  return e.name;
                                })}
                              />
                              <div
                                className="overflow"
                                id="over2"
                                onClick={(e) => custom2("cate5", "over2")}
                              ></div>
                              <div className="option" id="cate5">
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) =>
                                      selectoption2("0 - 1 years")
                                    }
                                  />
                                  <h3>{"0 - 1 years"} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) =>
                                      selectoption2("4 - 7 years")
                                    }
                                  />
                                  <h3>{"4 - 7 years"} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) =>
                                      selectoption2("8 - 10 years")
                                    }
                                  />
                                  <h3>{"8 - 10 years"} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) =>
                                      selectoption2("11 - 15 years")
                                    }
                                  />
                                  <h3>{"11 - 15 years"} </h3>
                                  <span></span>
                                </p>
                                <p>
                                  <input
                                    type="checkbox"
                                    onClick={(a) => selectoption2("16+  years")}
                                  />
                                  <h3>{"16+  years"} </h3>
                                  <span></span>
                                </p>
                              </div>
                              <span onClick={(e) => custom2("cate5", "over2")}>
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
                            {/* <div className='errorfield'>{error.message}</div> */}
                          </div>
                        </div>

                        <div className="form_group full border qualification">
                          <label>{t("Start date")}</label>
                          <div className="checkbox create">
                            <ul>
                              <li>
                                <input
                                  type="checkbox"
                                  name="b"
                                  onClick={(e) => {
                                    setsearch({
                                      ...search,
                                      withinweek: e.target.checked,
                                    });
                                  }}
                                />
                                <span> {t("Within a week")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name="b"
                                  onClick={(e) => {
                                    setsearch({
                                      ...search,
                                      withinmonth: e.target.checked,
                                    });
                                  }}
                                />
                                <span> {t("Within a month")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div> */}
                        </div>
                        <div className="form_group full qualification">
                          <label>{t("Other options")}</label>
                          <div className="checkbox create">
                            <ul>
                              <li>
                                <input
                                  type="checkbox"
                                  name="b"
                                  onClick={(e) => {
                                    setsearch({
                                      ...search,
                                      carorlicence: e.target.checked,
                                    });
                                  }}
                                />
                                <span> {t("Without transportation")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name="b"
                                  onClick={(e) => {
                                    setsearch({
                                      ...search,
                                      jobposted: e.target.checked,
                                    });
                                  }}
                                />
                                <span> {t("Jobs posted within a week")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name="b"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setsearch({
                                        ...search,
                                        workingabroad: "Yes",
                                      });
                                    } else {
                                      setsearch({
                                        ...search,
                                        workingabroad: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("Work abroad")}</span>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  name="b"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setsearch({
                                        ...search,
                                        tutorintrestedinschool: "Yes",
                                      });
                                    } else {
                                      setsearch({
                                        ...search,
                                        tutorintrestedinschool: "",
                                      });
                                    }
                                  }}
                                />
                                <span> {t("School jobs")}</span>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='errorfield'>{error.message}</div> */}
                        </div>
                        <button
                          onClick={(e) => {
                            localStorage.setItem(
                              "filter",
                              JSON.stringify({
                                category: category,
                                distance: search.distance,
                                zip: search.zip,
                                city: search.city,
                                cat: cat,
                              })
                            );
                            provider_list();
                            navigate("/search-providers");
                          }}
                        >
                          {t("Refine result")}
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="filter_category Profile_complete ">
                  <div className="filter_category_select detail work-experience">
                    <div className="job_performance">
                      <div className="form_group   full">
                        <div className="customselect inp">
                          <input
                            id="my-fil-cat"
                            className="keyword"
                            type="text"
                            placeholder={t("Select job category")}
                            value={category.map((e) => {
                              return e.name;
                            })}
                          />
                          <div
                            className="overflow"
                            id="over3"
                            onClick={(e) => custom3("cate9", "over3")}
                            style={
                              recommend != ""
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          ></div>
                          <div
                            className="option"
                            id="cate9"
                            style={
                              recommend != ""
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <p>
                              <input
                                type="checkbox"
                                onClick={(a) => {
                                  selectoption(t("Nanny"));
                                  if (a.target.checked) {
                                    setcat({ ...cat, data1: t("Nanny") });
                                  } else {
                                    setcat({ ...cat, data1: "" });
                                  }
                                }}
                              />
                              <h3>
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 30 30"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="15" cy="15" r="15" fill="#fff" />
                                  <circle cx="15" cy="15" r="15" fill="#fff" />
                                  <circle
                                    cx="15.0009"
                                    cy="14.9968"
                                    r="12.3571"
                                    stroke="white"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M16.0158 13.5094V8.82664C16.0158 8.41385 16.3812 8.08904 16.7872 8.14994C19.4128 8.52212 21.4293 10.7823 21.4293 13.5094H16.0158ZM21.4287 14.1872C21.4287 15.4324 21.0024 16.5827 20.2918 17.4963C20.9144 18.0511 21.246 18.9241 21.0091 19.8647C20.7926 20.7173 20.0888 21.394 19.2294 21.5767C17.8219 21.8745 16.5565 20.9136 16.3738 19.6008H14.9663C14.7836 20.9203 13.5114 21.8812 12.0903 21.5699C11.2377 21.3805 10.5339 20.697 10.3309 19.8444C10.0603 18.7143 10.6084 17.6587 11.5084 17.1782C11.3527 16.9414 10.0738 14.1872 10.0738 14.1872H9.24822C8.87604 14.1872 8.57153 13.8827 8.57153 13.5105C8.57153 13.1384 8.87604 12.8339 9.24822 12.8339H10.5069C10.764 12.8339 11.0076 12.9827 11.1159 13.2196L11.576 14.1872H21.4287ZM12.6306 20.281C12.069 20.281 11.6156 19.8276 11.6156 19.266C11.6156 18.7043 12.069 18.2509 12.6306 18.2509C13.1923 18.2509 13.6456 18.7043 13.6456 19.266C13.6456 19.8276 13.1923 20.281 12.6306 20.281ZM17.7055 19.266C17.7055 19.8276 18.1589 20.281 18.7206 20.281C19.2822 20.281 19.7356 19.8276 19.7356 19.266C19.7356 18.7043 19.2822 18.2509 18.7206 18.2509C18.1589 18.2509 17.7055 18.7043 17.7055 19.266Z"
                                    fill="#7D2B8B"
                                  />
                                </svg>
                                {t("Nanny")}{" "}
                              </h3>
                              <span></span>
                            </p>
                            <p>
                              <input
                                type="checkbox"
                                onClick={(a) => {
                                  selectoption(t("Special education teacher"));
                                  if (a.target.checked) {
                                    setcat({
                                      ...cat,
                                      data2: t("Special education teacher"),
                                    });
                                  } else {
                                    setcat({ ...cat, data2: "" });
                                  }
                                }}
                              />
                              <h3>
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 30 30"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="15" cy="15" r="15" fill="#fff" />
                                  <circle cx="15" cy="15" r="15" fill="#fff" />
                                  <circle
                                    cx="14.8574"
                                    cy="14.8567"
                                    r="12.3571"
                                    stroke="white"
                                  />
                                  <path
                                    d="M22.0269 16.0174C20.9457 16.0174 20.4774 16.8402 19.89 16.8402C18.3281 16.8402 19.7498 12.2505 19.7498 12.2505C19.7498 12.2505 14.6381 14.3338 14.6381 12.1646C14.6381 11.2316 15.5831 10.9602 15.5831 9.92544C15.5831 9.0009 14.8509 8.50049 13.9825 8.50049C13.0801 8.50049 12.2543 8.99244 12.2543 9.96783C12.2543 11.045 13.0801 11.5115 13.0801 12.0967C13.0801 13.9098 8.49976 12.8431 8.49976 12.8431V21.5212C8.49976 21.5212 13.1517 22.5901 13.1517 20.7748C13.1517 20.1896 12.11 19.7303 12.11 18.6531C12.11 17.6777 12.8718 17.1858 13.7657 17.1858C14.6426 17.1858 15.3748 17.6862 15.3748 18.6107C15.3748 19.6455 14.4298 19.9169 14.4298 20.8499C14.4298 22.4333 17.8067 21.52 19.1493 21.52C19.1493 21.52 18.245 18.3923 19.8219 18.3923C20.7584 18.3923 21.0308 19.3338 22.0695 19.3338C22.9975 19.3338 23.4998 18.6044 23.4998 17.7308C23.4998 16.8402 23.006 16.0174 22.0269 16.0174Z"
                                    fill="#7D2B8B"
                                  />
                                </svg>
                                {t("Special education teacher")}
                              </h3>
                              <span></span>
                            </p>
                            <p>
                              <input
                                type="checkbox"
                                onClick={(a) => {
                                  selectoption(
                                    t("Special education paraprofessional")
                                  );
                                  if (a.target.checked) {
                                    setcat({
                                      ...cat,
                                      data3: t(
                                        "Special education paraprofessional"
                                      ),
                                    });
                                  } else {
                                    setcat({ ...cat, data3: "" });
                                  }
                                }}
                              />
                              <h3>
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 30 30"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="15" cy="15" r="15" fill="#fff" />
                                  <circle
                                    cx="15"
                                    cy="15"
                                    r="15"
                                    stroke="#fff"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.9361 7.71484C14.2024 7.71484 13.6075 8.30966 13.6075 9.04341C13.6075 9.77715 14.2024 10.372 14.9361 10.372C15.6699 10.372 16.2647 9.77715 16.2647 9.04341C16.2647 8.30966 15.6699 7.71484 14.9361 7.71484ZM19.5861 14.2911C19.5861 13.9656 19.3469 13.6999 19.0281 13.6468C18.1977 13.5073 17.4139 13.0622 16.8825 12.4777L16.0255 11.5277C15.9126 11.4015 15.7731 11.3019 15.6203 11.2288C15.617 11.2288 15.6153 11.2271 15.6137 11.2255C15.612 11.2238 15.6104 11.2222 15.607 11.2222H15.6004C15.3546 11.0827 15.0823 11.0162 14.77 11.0561C14.0925 11.1358 13.6075 11.7469 13.6075 12.4312V16.3504C13.6075 17.0811 14.2054 17.679 14.9361 17.679H18.2575V20.3361C18.2575 20.7015 18.5564 21.0004 18.9218 21.0004C19.2872 21.0004 19.5861 20.7015 19.5861 20.3361V17.3468C19.5861 16.6161 18.9882 16.0183 18.2575 16.0183H16.2647V13.7265C16.929 14.2779 17.859 14.7495 18.7889 14.9355C19.2008 15.0219 19.5861 14.7096 19.5861 14.2911ZM13.6075 19.6721C14.4778 19.6721 15.2151 19.1141 15.4875 18.3435H16.8625C16.557 19.8581 15.2151 21.0006 13.6075 21.0006C11.7741 21.0006 10.2861 19.5126 10.2861 17.6792C10.2861 16.0717 11.4287 14.7298 12.9433 14.4242V15.7993C12.1727 16.0783 11.6147 16.809 11.6147 17.6792C11.6147 18.7819 12.5048 19.6721 13.6075 19.6721Z"
                                    fill="#7D2B8B"
                                  />
                                </svg>
                                {t("Special education paraprofessional")}{" "}
                              </h3>
                              <span></span>
                            </p>
                            <p>
                              <input
                                type="checkbox"
                                onClick={(a) => {
                                  selectoption(t("Tutor"));
                                  if (a.target.checked) {
                                    setcat({ ...cat, data4: t("Tutor") });
                                  } else {
                                    setcat({ ...cat, data4: "" });
                                  }
                                }}
                              />
                              <h3>
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 30 30"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="15" cy="15" r="15" fill="#fff" />
                                  <circle
                                    cx="15"
                                    cy="15"
                                    r="15"
                                    stroke="#fff"
                                  />
                                  <path
                                    d="M21.0659 13.008L15.209 10.3386C15.0556 10.268 14.8883 10.268 14.7489 10.3386L8.89202 13.008C8.69679 13.0928 8.57129 13.2905 8.57129 13.5024C8.57129 13.7143 8.71074 13.912 8.90596 14.0109L9.40798 14.251V16.2283C9.40798 16.4261 9.56137 16.5814 9.7566 16.5814C9.95183 16.5814 10.1052 16.4261 10.1052 16.2283V14.6323L10.9419 15.0843V17.4854C10.9419 17.5842 10.9698 17.669 11.0256 17.7537C11.0814 17.8385 12.3503 19.7593 14.9162 19.7593C17.5518 19.7593 18.765 17.8244 18.8207 17.7537C18.8626 17.6831 18.9044 17.5842 18.9044 17.4995V15.1832L21.1216 14.0391C21.3169 13.9402 21.4284 13.7425 21.4284 13.5306C21.4005 13.2905 21.2611 13.1069 21.0659 13.008ZM17.9143 17.33C17.6354 17.669 16.6872 18.7707 14.9162 18.7707C13.187 18.7707 12.1969 17.6831 11.9181 17.33V15.5928L14.7349 17.0475C14.8186 17.0899 14.9022 17.104 14.9859 17.104C15.0696 17.104 15.1672 17.0899 15.2509 17.0475L17.9143 15.6775V17.33ZM14.9859 15.9035L10.412 13.5589L14.9859 11.4685L19.5598 13.5589L14.9859 15.9035ZM10.1052 17.0758C10.2028 17.1746 10.2726 17.33 10.2726 17.4713C10.2726 17.6125 10.2168 17.7678 10.1052 17.8667C10.0076 17.9656 9.85421 18.0362 9.71477 18.0362C9.57532 18.0362 9.42192 17.9797 9.32431 17.8667C9.2267 17.7678 9.15697 17.6125 9.15697 17.4713C9.15697 17.33 9.21275 17.1746 9.32431 17.0758C9.42192 16.9769 9.57532 16.9063 9.71477 16.9063C9.85421 16.9063 9.99366 16.9628 10.1052 17.0758Z"
                                    fill="#7D2B8B"
                                  />
                                </svg>
                                {t("Tutor")}{" "}
                              </h3>
                              <span></span>
                            </p>
                          </div>
                          <span onClick={(e) => custom3("cate9", "over3")}>
                            <svg
                              width="10"
                              height="6"
                              viewBox="0 0 10 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z"
                                fill="#7D2B8B"
                              />
                            </svg>
                          </span>
                        </div>
                        {/* <div className='errorfield'>{error.message}</div> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="keyword">
                                    <input type="text" placeholder="Keyword" id="my-fil-key" onChange={e => setsearch({ ...search, keyword: e.target.value })} />
                                </div> */}
                <div className="city">
                  <input
                    type="text"
                    placeholder={t("City")}
                    id="my-fil-city"
                    onChange={(e) =>
                      setsearch({ ...search, city: e.target.value })
                    }
                  />
                </div>
                <div className="zip code">
                  <input
                    type="text"
                    placeholder={t("Zip code")}
                    id="my-fil-zip"
                    onChange={(e) =>
                      setsearch({ ...search, zip: e.target.value })
                    }
                  />
                  {/* <Location let={getletlon} type={"my-fil-zip"} /> */}
                </div>
                <div className="distance">
                  <div className="distance_input">
                    <select
                      name=""
                      id="my-fil-dis"
                      onChange={(e) =>
                        setsearch({ ...search, distance: e.target.value })
                      }
                    >
                      <option value="" selected>
                        {t("Distance")}
                      </option>
                      <option value={5}>5 {t("Miles")}</option>
                      <option value={10}>10 {t("Miles")}</option>
                      <option value={15}>15 {t("Miles")}</option>
                      <option value={20}>20 {t("Miles")}</option>
                      <option value={25}>25 {t("Miles")}</option>
                      <option value={30}>30 {t("Miles")}</option>
                      <option value={35}>35 {t("Miles")}</option>
                      <option value={40}>40 {t("Miles")}</option>
                      <option value={45}>45 {t("Miles")}</option>
                      <option value={50}>50 {t("Miles")}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="search_box">
                <div className="search_input">
                  <button
                    id="my-fil-search"
                    type="submit"
                    onClick={(e) => {
                      localStorage.setItem(
                        "filter",
                        JSON.stringify({
                          category: category,
                          distance: search.distance,
                          zip: search.zip,
                          city: search.city,
                          cat: cat,
                        })
                      );
                      provider_list();
                      navigate("/search-providers");
                    }}
                  >
                    {t("Search")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {subtab == "Profile" ? (
          <>
            {localStorage.getItem("user_type") == "parents" ? (
              <div className="mobile profile">
                <View_edit />
              </div>
            ) : (
              <div className="mobile profile">
                <View_edit_provider />
              </div>
            )}
          </>
        ) : (
          ""
        )}
        <div className="container" style={{ overflow: "hidden" }}>
          <div
            className="body_section searchbody "
            style={
              subtab != ""
                ? {
                    minHeight: "auto",
                    marginBottom: "100px",
                    float: "left",
                    width: "100%",
                  }
                : {}
            }
          >
            <div className="left_side_section" id={!catopen ? "leftdata" : ""}>
              {selfprofile.about == "" || selfprofile.about == null ? (
                ""
              ) : (
                <>
                  <div className="profile_box">
                    <div className="profile_box_social">
                      <div className="profile_box_social_sec1">
                        {localStorage.getItem("user_type") == "parents" ? (
                          <Facebook_share
                            link={
                              window.location.origin +
                              "/profile-parents/" +
                              selfprofile.id
                            }
                          />
                        ) : (
                          <Facebook_share
                            link={
                              window.location.origin +
                              "/profile-provider/" +
                              selfprofile.id
                            }
                          />
                        )}
                        {selfprofile.phoneVerifiedStatus == 1 ? (
                          <img
                            src={
                              window.location.origin + "/images/nany_phone.svg"
                            }
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
                        {selfprofile.facebookverify != null ||
                        selfprofile.linkdinverify != null ? (
                          <img
                            src={
                              window.location.origin + "/images/nany_cont.svg"
                            }
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
                        {/* <img src={window.location.origin + "/images/ok.svg"} alt="" /> */}
                      </div>
                      {localStorage.getItem("user_type") == "parents" ? (
                        <span className="addjob">
                          <Profession_change />
                        </span>
                      ) : (
                        <div className="profile_box_social_sec2">
                          {selfprofile.service_type &&
                          selfprofile.service_type.tab1 == "Nanny" ? (
                            <img
                              src={
                                window.location.origin + "/images/nany_pur.svg"
                              }
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                          {selfprofile.service_type &&
                          selfprofile.service_type.tab2 ? (
                            <img
                              src={
                                window.location.origin +
                                "/images/special_education.svg"
                              }
                            />
                          ) : (
                            ""
                          )}
                          {selfprofile.service_type &&
                          selfprofile.service_type.tab3 ? (
                            <img
                              src={
                                window.location.origin +
                                "/images/professional.svg"
                              }
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                          {selfprofile.service_type &&
                          selfprofile.service_type.tab4 ? (
                            <img
                              src={
                                window.location.origin + "/images/tutorform.svg"
                              }
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </div>
                    <div className="profile_pic_sec">
                      <img src="img/left_pic.png" alt="" />
                      <div className="profile_pic">
                        <img
                          src={
                            api +
                            "/public/assets/images/users/" +
                            selfprofile.file_path
                          }
                          width="80"
                          height="80"
                          alt=""
                        />
                        <div className="edit_icon">
                          <Link to="" onClick={(e) => setphotoupload(true)}>
                            <img
                              src={window.location.origin + "/images/edit.svg"}
                              alt=""
                            />
                          </Link>
                        </div>
                      </div>
                      <img src="img/right_pic.png" alt="" />
                    </div>
                    <div className="profile_detail">
                      <p>
                        {selfprofile.first_name + " " + selfprofile.last_name} (
                        {selfprofile.dob != undefined
                          ? new Date().getFullYear() -
                            parseInt(
                              selfprofile.dob
                                .substr(selfprofile.dob.lastIndexOf("\\") + 1)
                                .split("-")[0]
                            )
                          : ""}
                        )
                      </p>
                      <div className="profilestart_video">
                        <a>
                          <img
                            src={window.location.origin + "/images/video.svg"}
                            alt=""
                          />
                        </a>
                        <span className="tooltipu">
                          <strong>{t("Upgrade")}</strong> {t("to post media.")}
                        </span>
                        {selfprofile.reviewAvg >= 0 ? (
                          <>
                            {[...Array(selfprofile.reviewAvg)].map(
                              (star, index) => {
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
                              }
                            )}
                            {[...Array(5 - selfprofile.reviewAvg)].map(
                              (star, index) => {
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
                              }
                            )}
                          </>
                        ) : (
                          ""
                        )}
                        <span>({selfprofile.reviewcount})</span>
                      </div>
                    </div>
                    <div className="profile_functions">
                      <div className="members">
                        <h5>
                          {new Date().getFullYear() -
                            new Date(selfprofile.created_at).getFullYear() >
                          0
                            ? new Date().getFullYear() -
                              new Date(selfprofile.created_at).getFullYear() +
                              t(" YRS")
                            : 0 + t(" YRS")}{" "}
                        </h5>
                        <h6>{t("Member")}</h6>
                      </div>
                      <div className="vi"></div>
                      {localStorage.getItem("user_type") == "parents" ? (
                        <div className="applications">
                          <h5>{selfprofile.jobs}</h5>
                          <h6>{t("Job posts")}</h6>
                        </div>
                      ) : (
                        <div className="applications">
                          <h5>{selfprofile.jobApplicationcount}</h5>
                          <h6>{t("Applications")}</h6>
                        </div>
                      )}
                      <div className="vi"></div>
                      <div className="hiring">
                        <h5>{selfprofile.hiringcount}</h5>
                        <h6>{t("Hirings")}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="silde_bar_dropdowns">
                    <button
                      type="button"
                      className="side_drop_collapse"
                      onClick={(e) =>
                        setprofilesection(
                          profilesection != "notifications"
                            ? "notifications"
                            : ""
                        )
                      }
                    >
                      <img
                        src={
                          window.location.origin + "/images/notification.svg"
                        }
                        alt=""
                      />
                      <h4>
                        {t("Notifications")}
                        <span>
                          {" "}
                          (<Count_notification />)
                        </span>
                      </h4>
                    </button>
                    <div
                      className="side_drop_collapse_box_content"
                      style={
                        profilesection == "notifications"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {localStorage.getItem("user_type") == "parents" ? (
                        <Notification_tab_parents
                          setsubtab={setsubtab}
                          subtab={subtab}
                        />
                      ) : (
                        <Notification_tab_provider
                          setsubtab={setsubtab}
                          subtab={subtab}
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      className="side_drop_collapse"
                      onClick={(e) =>
                        setprofilesection(
                          profilesection != "message" ? "message" : ""
                        )
                      }
                    >
                      <img
                        src={window.location.origin + "/images/message.svg"}
                        alt=""
                      />
                      <h4>
                        {t("Messages")}
                        <span>
                          {" "}
                          (<Count_message />)
                        </span>
                      </h4>
                    </button>
                    <div
                      className="side_drop_collapse_box_content"
                      style={
                        profilesection == "message"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <Message_tab setsubtab={setsubtab} subtab={subtab} />
                    </div>
                    <button
                      type="button"
                      className="side_drop_collapse"
                      onClick={(e) =>
                        setprofilesection(
                          profilesection != "Job_history" ? "Job_history" : ""
                        )
                      }
                    >
                      <img
                        src={window.location.origin + "/images/jobnhistory.svg"}
                        alt=""
                      />
                      <h4>{t("Job History and Docs")}</h4>
                    </button>
                    <div
                      className="side_drop_collapse_box_content"
                      style={
                        profilesection == "Job_history"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {localStorage.getItem("user_type") == "parents" ? (
                        <Job_history_tap_parents
                          setsubtab={setsubtab}
                          subtab={subtab}
                        />
                      ) : (
                        <Job_history_tap
                          setsubtab={setsubtab}
                          subtab={subtab}
                        />
                      )}
                    </div>
                    {/* <button type="button" className="side_drop_collapse" ><img src={window.location.origin + "/images/promo.svg"} alt="" />
                                            <h4>Promotions</h4>
                                        </button>
                                        <div className="side_drop_collapse_box_content">
                                            <ul>
                                                <li></li>
                                            </ul>
                                        </div> */}
                    <button
                      type="button"
                      className="side_drop_collapse"
                      onClick={(e) =>
                        setprofilesection(profilesection != "fav" ? "fav" : "")
                      }
                    >
                      <svg
                        width="16"
                        height="20"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 1.55556V12.4444C0 13.3 0.692222 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0H1.55556C0.692222 0 0 0.7 0 1.55556ZM9.33332 4.66573C9.33332 5.95684 8.2911 6.99906 6.99999 6.99906C5.70888 6.99906 4.66666 5.95684 4.66666 4.66573C4.66666 3.37462 5.70888 2.3324 6.99999 2.3324C8.2911 2.3324 9.33332 3.37462 9.33332 4.66573ZM7.0001 8.47839C5.44455 8.47839 2.33344 9.33395 2.33344 10.8895V11.6673H11.6668V10.8895C11.6668 9.33395 8.55566 8.47839 7.0001 8.47839Z"
                          fill="#A98D4B"
                        />
                      </svg>
                      <h4>{t("Recent profile visits")}</h4>
                    </button>
                    <div
                      className="side_drop_collapse_box_content Document_main side_drop_collapse"
                      style={
                        profilesection == "fav"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <ul
                        style={
                          profilesection != ""
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <li
                          onClick={(e) => {
                            navigate(
                              localStorage.getItem("user_type") == "parents"
                                ? "/search-parents/who-i-visited"
                                : "/search-providers/who-i-visited"
                            );
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setsubtab("who-i-visited");
                          }}
                          className={subtab == "who-i-visited" ? "active " : ""}
                        >
                          {t("Who I Visited")}
                        </li>
                        <li
                          onClick={(e) => {
                            navigate(
                              localStorage.getItem("user_type") == "parents"
                                ? "/search-parents/who-visited-me"
                                : "/search-providers/who-visited-me"
                            );
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setsubtab("who-visited-me");
                          }}
                          className={
                            subtab == "who-visited-me"
                              ? "active upgrade"
                              : "upgrade"
                          }
                        >
                          {t("Who Visited Me")}{" "}
                          <span>
                            <Link
                              to={""}
                              // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank"
                            >
                              {t("upgrade")}
                            </Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                    {localStorage.getItem("user_type") == "parents" ? (
                      <button
                        type="button"
                        className="side_drop_collapse arrow"
                        onClick={(e) => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          setsubtab("all-profile");
                          navigate("/search-providers/all-profile");
                        }}
                      >
                        <img
                          src={window.location.origin + "/images/fav.svg"}
                          alt=""
                        />
                        <h4>{t("Favorites")}</h4>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="side_drop_collapse"
                        onClick={(e) =>
                          setprofilesection(
                            profilesection != "Favorites" ? "Favorites" : ""
                          )
                        }
                      >
                        <img
                          src={window.location.origin + "/images/fav.svg"}
                          alt=""
                        />
                        <h4>{t("Favorites")}</h4>
                      </button>
                    )}
                    <div
                      className="side_drop_collapse_box_content"
                      style={
                        profilesection == "Favorites"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {localStorage.getItem("user_type") == "parents" ? (
                        <Favorite_provider
                          setsubtab={setsubtab}
                          subtab={subtab}
                        />
                      ) : (
                        <Favorite_provider
                          setsubtab={setsubtab}
                          subtab={subtab}
                        />
                      )}
                    </div>
                    <button
                      className={
                        subtab == "Reviews"
                          ? "active side_drop_collapse arrow"
                          : "side_drop_collapse arrow"
                      }
                      onClick={(e) => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setsubtab("Reviews");
                        navigate(
                          localStorage.getItem("user_type") == "parents"
                            ? "/search-parents/Reviews"
                            : "/search-providers/Reviews"
                        );
                      }}
                    >
                      <img
                        src={window.location.origin + "/images/reviewi.svg"}
                        alt=""
                      />
                      <h4>{t("Reviews")}</h4>
                    </button>
                    <button
                      className={
                        subtab == "Loyalty"
                          ? "active side_drop_collapse arrow"
                          : "side_drop_collapse arrow"
                      }
                      onClick={(e) => {
                        navigate(
                          localStorage.getItem("user_type") == "parents"
                            ? "/search-parents/Loyalty"
                            : "/search-providers/Loyalty"
                        );
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setsubtab("Loyalty");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                      >
                        <path
                          d="M9.66667 12.0881V4.65248H6.33333V12.0881C6.33333 12.2612 6.39583 12.3945 6.52083 12.488C6.64583 12.5814 6.80556 12.6282 7 12.6282H9C9.19444 12.6282 9.35417 12.5814 9.47917 12.488C9.60417 12.3945 9.66667 12.2612 9.66667 12.0881ZM4.91667 3.3232H6.94792L5.63542 1.65122C5.45486 1.43659 5.21528 1.32928 4.91667 1.32928C4.63889 1.32928 4.40278 1.42621 4.20833 1.62006C4.01389 1.81391 3.91667 2.04931 3.91667 2.32624C3.91667 2.60317 4.01389 2.83857 4.20833 3.03242C4.40278 3.22627 4.63889 3.3232 4.91667 3.3232ZM12.0833 2.32624C12.0833 2.04931 11.9861 1.81391 11.7917 1.62006C11.5972 1.42621 11.3611 1.32928 11.0833 1.32928C10.7847 1.32928 10.5451 1.43659 10.3646 1.65122L9.0625 3.3232H11.0833C11.3611 3.3232 11.5972 3.22627 11.7917 3.03242C11.9861 2.83857 12.0833 2.60317 12.0833 2.32624ZM16 4.9848V8.308C16 8.40493 15.9688 8.48455 15.9062 8.54686C15.8438 8.60917 15.7639 8.64032 15.6667 8.64032H14.6667V12.9605C14.6667 13.2374 14.5694 13.4728 14.375 13.6667C14.1806 13.8605 13.9444 13.9574 13.6667 13.9574H2.33333C2.05556 13.9574 1.81944 13.8605 1.625 13.6667C1.43056 13.4728 1.33333 13.2374 1.33333 12.9605V8.64032H0.333333C0.236111 8.64032 0.15625 8.60917 0.09375 8.54686C0.03125 8.48455 0 8.40493 0 8.308V4.9848C0 4.88788 0.03125 4.80826 0.09375 4.74595C0.15625 4.68364 0.236111 4.65248 0.333333 4.65248H4.91667C4.27083 4.65248 3.72049 4.42574 3.26562 3.97226C2.81076 3.51879 2.58333 2.97011 2.58333 2.32624C2.58333 1.68237 2.81076 1.1337 3.26562 0.680218C3.72049 0.226739 4.27083 0 4.91667 0C5.65972 0 6.24306 0.266548 6.66667 0.799645L8 2.51317L9.33333 0.799645C9.75694 0.266548 10.3403 0 11.0833 0C11.7292 0 12.2795 0.226739 12.7344 0.680218C13.1892 1.1337 13.4167 1.68237 13.4167 2.32624C13.4167 2.97011 13.1892 3.51879 12.7344 3.97226C12.2795 4.42574 11.7292 4.65248 11.0833 4.65248H15.6667C15.7639 4.65248 15.8438 4.68364 15.9062 4.74595C15.9688 4.80826 16 4.88788 16 4.9848Z"
                          fill="#A98D4B"
                        />
                      </svg>
                      <h4>{t("SensCare Loyalty")} </h4>
                    </button>
                    <button
                      type="button"
                      className="side_drop_collapse"
                      onClick={(e) =>
                        setprofilesection(
                          profilesection != "setting" ? "setting" : ""
                        )
                      }
                    >
                      <img
                        src={window.location.origin + "/images/setting.svg"}
                        alt=""
                      />
                      <h4>{t("Settings")}</h4>
                    </button>
                    <div
                      className="side_drop_collapse_box_content"
                      style={
                        profilesection == "setting"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <ul>
                        <li
                          className={subtab == "Account" ? "active" : ""}
                          onClick={(e) => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            navigate(
                              localStorage.getItem("user_type") == "parents"
                                ? "/search-parents/Account"
                                : "/search-providers/Account"
                            );
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM7.99973 2.40027C9.32773 2.40027 10.3997 3.47227 10.3997 4.80027C10.3997 6.12827 9.32773 7.20027 7.99973 7.20027C6.67173 7.20027 5.59973 6.12827 5.59973 4.80027C5.59973 3.47227 6.67173 2.40027 7.99973 2.40027ZM3.19946 11.1842C4.23146 12.7362 5.99946 13.7602 7.99946 13.7602C9.99946 13.7602 11.7675 12.7362 12.7995 11.1842C12.7755 9.59215 9.59146 8.72015 7.99946 8.72015C6.39946 8.72015 3.22346 9.59215 3.19946 11.1842Z"
                              fill="#636363"
                            />
                          </svg>
                          <span>{t("Account")}</span>
                        </li>
                        <li
                          className={subtab == "Profile" ? "active" : ""}
                          onClick={(e) => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            navigate(
                              localStorage.getItem("user_type") == "parents"
                                ? "/search-parents/Profile"
                                : "/search-providers/Profile"
                            );
                          }}
                        >
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.5067 1.77778H14.2222C15.2 1.77778 16 2.57778 16 3.55556V16C16 16.9778 15.2 17.7778 14.2222 17.7778H1.77778C0.8 17.7778 0 16.9778 0 16V3.55556C0 2.57778 0.8 1.77778 1.77778 1.77778H5.49333C5.86667 0.746667 6.84444 0 8 0C9.15556 0 10.1333 0.746667 10.5067 1.77778ZM8.88932 2.66623C8.88932 2.17734 8.48932 1.77734 8.00043 1.77734C7.51154 1.77734 7.11154 2.17734 7.11154 2.66623C7.11154 3.15512 7.51154 3.55512 8.00043 3.55512C8.48932 3.55512 8.88932 3.15512 8.88932 2.66623ZM7.9998 5.33313C9.47535 5.33313 10.6665 6.52424 10.6665 7.9998C10.6665 9.47535 9.47535 10.6665 7.9998 10.6665C6.52424 10.6665 5.33313 9.47535 5.33313 7.9998C5.33313 6.52424 6.52424 5.33313 7.9998 5.33313ZM2.66711 14.7553V15.9998H13.3338V14.7553C13.3338 12.9775 9.77822 11.9998 8.00045 11.9998C6.22267 11.9998 2.66711 12.9775 2.66711 14.7553Z"
                              fill="#636363"
                            />
                          </svg>
                          <span>{t("View/Edit Profile")}</span>
                        </li>
                        <li
                          className={subtab == "SignOut" ? "active" : ""}
                          onClick={(e) => setsignout(true)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.4444 1.71746C14.4444 3.14603 15.746 5.48253 15.746 8.12697C15.746 12.4698 12.2286 15.9905 7.88889 16C3.55556 16.0095 0.00635499 12.4762 5.79416e-06 8.13967C-0.00316881 5.49523 1.29842 3.15238 3.29524 1.72063C3.66667 1.45714 4.18413 1.56825 4.40635 1.96508L4.90794 2.85714C5.09524 3.19047 5.00635 3.61269 4.69841 3.84127C3.38095 4.81904 2.53969 6.36825 2.53969 8.1238C2.53651 11.054 4.90476 13.4603 7.87301 13.4603C10.7809 13.4603 13.2254 11.1047 13.2063 8.09205C13.1968 6.44761 12.4222 4.86031 11.0444 3.83809C10.7365 3.60952 10.6508 3.1873 10.8381 2.85714L11.3397 1.96508C11.5619 1.57143 12.0762 1.45397 12.4444 1.71746ZM9.14285 8.38094V0.761904C9.14285 0.339682 8.80317 0 8.38095 0H7.36508C6.94285 0 6.60317 0.339682 6.60317 0.761904V8.38094C6.60317 8.80316 6.94285 9.14285 7.36508 9.14285H8.38095C8.80317 9.14285 9.14285 8.80316 9.14285 8.38094Z"
                              fill="#636363"
                            />
                          </svg>
                          <span>{t("Sign Out")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
            {subtab == "" && profile?.username ? (
              <div
                className="Account  editview profileshow"
                style={{ width: "calc(100% - 22.5%)" }}
              >
                <h2>
                  {t("Profile Overview")}{" "}
                  <Link
                    to={
                      localStorage.getItem("back")
                        ? "/search-providers/" + localStorage.getItem("back")
                        : "/search-providers"
                    }
                  >
                    <svg
                      width="17"
                      height="8"
                      viewBox="0 0 17 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM17 3.5L1 3.5V4.5L17 4.5V3.5Z"
                        fill="#A98D4B"
                      />
                    </svg>{" "}
                    {t("Back")}
                  </Link>
                </h2>
                <div className="about_edit">
                  <div className="profile_full left_side_section ">
                    <div className="profile_box">
                      <div className="profile_box_social">
                        <div className="profile_box_social_sec1">
                          {profile.plateformsocialmedia == "Yes" ? (
                            <Facebook_share
                              link={
                                window.location.origin +
                                "/profile-provider/" +
                                profile.id
                              }
                            />
                          ) : (
                            ""
                          )}
                          {profile.phoneVerifiedStatus == 1 ? (
                            <img
                              src={
                                window.location.origin +
                                "/images/nany_phone.svg"
                              }
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
                            src={
                              window.location.origin + "/images/nany_msg.svg"
                            }
                            alt=""
                          />
                          {profile.facebookverify != null ||
                          profile.linkdinverify != null ? (
                            <img
                              src={
                                window.location.origin + "/images/nany_cont.svg"
                              }
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
                          {profile.docsStatus == "Yes" ? (
                            <img
                              src={window.location.origin + "/images/ok.svg"}
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
                                d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z"
                                fill="#B7B7B7"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="profile_box_social_sec2">
                          <div className="profile_box_social_sec2">
                            {profile.service_type &&
                            profile.service_type.tab1 == "Nanny" ? (
                              <img
                                src={
                                  window.location.origin +
                                  "/images/nany_pur.svg"
                                }
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                            {profile.service_type &&
                            profile.service_type.tab2 ? (
                              <img
                                src={
                                  window.location.origin +
                                  "/images/special_education.svg"
                                }
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                            {profile.service_type &&
                            profile.service_type.tab3 ? (
                              <img
                                src={
                                  window.location.origin +
                                  "/images/professional.svg"
                                }
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                            {profile.service_type &&
                            profile.service_type.tab4 ? (
                              <img
                                src={
                                  window.location.origin +
                                  "/images/tutorform.svg"
                                }
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      {selfprofile.id == profile.id ? (
                        ""
                      ) : (
                        <svg
                          style={{ cursor: "pointer" }}
                          onClick={(e) => setsurvay(true)}
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="15" cy="15" r="14.5" stroke="#7D2B8B" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.6667 20.3333C20.6667 21.8 19.4667 23 18 23H13.1333C12.4133 23 11.7333 22.7133 11.2333 22.2067L6 16.8867C6 16.8867 6.6404 16.2201 6.86667 16.0533C7.09293 15.8866 7.19614 15.8784 7.39333 15.86C7.59052 15.8416 7.67333 15.9 7.79333 15.9667C7.82 15.9733 10.6667 17.6067 10.6667 17.6067V9.66667C10.6667 9.11333 11.1133 8.66667 11.6667 8.66667C12.22 8.66667 12.6667 9.11333 12.6667 9.66667V14.3333H13.3333V8C13.3333 7.44667 13.78 7 14.3333 7C14.8867 7 15.3333 7.44667 15.3333 8V14.3333H16V8.66667C16 8.11333 16.4467 7.66667 17 7.66667C17.5533 7.66667 18 8.11333 18 8.66667V14.3333H18.6667V10.6667C18.6667 10.1133 19.1133 9.66667 19.6667 9.66667C20.22 9.66667 20.6667 10.1133 20.6667 10.6667V20.3333Z"
                            fill="#7D2B8B"
                          />
                        </svg>
                      )}
                      <div className="profile_pic_sec">
                        <img
                          src={window.location.origin + "/img/left_pic.png"}
                          alt=""
                        />
                        <div className="profile_pic">
                          <img
                            src={
                              api +
                              "/public/assets/images/users/" +
                              profile.file_path
                            }
                            width="80"
                            height="80"
                            alt=""
                          />
                        </div>
                        <img
                          src={window.location.origin + "/img/right_pic.png"}
                          alt=""
                        />
                      </div>
                      <div className="profile_detail">
                        <p>
                          {profile.first_name + " " + profile.last_name} (
                          {profile.dob != undefined
                            ? new Date().getFullYear() -
                              parseInt(
                                profile.dob
                                  .substr(profile.dob.lastIndexOf("\\") + 1)
                                  .split("-")[0]
                              )
                            : ""}
                          ){" "}
                          <a className="heart_sec">
                            {localStorage.getItem("user_type") == "parents" &&
                            selfprofile.id != profile.id ? (
                              <Favorite_profile
                                id={profile.id}
                                username={profile.username}
                                heart2={profile.favornotprofile}
                              />
                            ) : (
                              ""
                            )}
                          </a>
                        </p>
                        <div className="profilestart_video">
                          <a>
                            <img
                              src={window.location.origin + "/images/video.svg"}
                              alt=""
                            />
                          </a>
                          {/* <span className='tooltipu'><strong>Upgrade</strong> to post media.</span> */}
                          {profile.reviewAvg >= 0 ? (
                            (profile.invitationData &&
                              [profile.invitationData].filter(
                                (e) => e.ParentId == selfprofile.id
                              )[0]?.inviteStatus == 1 &&
                              profile.checkreviewstatus != true) ||
                            profile.checkapplyornot == true ? (
                              <>
                                {[...Array(profile.reviewAvg)].map(
                                  (star, index) => {
                                    index += 1;
                                    return (
                                      <svg
                                        onClick={(e) => setreviewmodel(true)}
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
                                  }
                                )}
                                {[...Array(5 - profile.reviewAvg)].map(
                                  (star, index) => {
                                    index += 1;
                                    return (
                                      <svg
                                        onClick={(e) => setreviewmodel(true)}
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
                                  }
                                )}
                              </>
                            ) : (
                              <>
                                {[...Array(profile.reviewAvg)].map(
                                  (star, index) => {
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
                                  }
                                )}
                                {[...Array(5 - profile.reviewAvg)].map(
                                  (star, index) => {
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
                                  }
                                )}
                              </>
                            )
                          ) : (
                            ""
                          )}
                          <span>({profile.reviewcount})</span>
                        </div>
                      </div>
                      <div className="profile_functions">
                        <div className="members">
                          <h5>
                            {new Date().getFullYear() -
                              new Date(profile.created_at).getFullYear() >
                            0
                              ? new Date().getFullYear() -
                                new Date(profile.created_at).getFullYear() +
                                t(" YRS")
                              : 0 + t(" YRS")}{" "}
                          </h5>
                          <h6>{t("Member")}</h6>
                        </div>
                        <div className="vi"></div>

                        <div className="applications">
                          <h5>{profile.jobApplicationcount}</h5>
                          <h6>{t("Applications")}</h6>
                        </div>
                        <div className="vi"></div>
                        <div className="hiring">
                          <h5>{profile.hiringcount}</h5>
                          <h6>{t("Hirings")}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="quarybtn">
                      {!localStorage.getItem("token") ||
                      !localStorage.getItem("id") ? (
                        <Link to="/signup" className="message">
                          {t("Interview invite")}
                        </Link>
                      ) : (profile.invitationData &&
                          [profile.invitationData].filter(
                            (e) => e.ParentId == selfprofile.id
                          )[0]?.inviteStatus == 1) ||
                        profile.checkapplyornot == true ? (
                        <button
                          className="message"
                          onClick={(e) => {
                            navigate(
                              "/search-providers/message-inbox/" + profile.id
                            );
                            // navigate(localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership")
                            localStorage.setItem("message", slugdata.id);
                          }}
                        >
                          {t("Send message")}
                        </button>
                      ) : (profile.invitationData &&
                          [profile.invitationData].filter(
                            (e) => e.ParentId == selfprofile.id
                          )[0]?.inviteStatus == 0) ||
                        ecomen != "" ? (
                        <button
                          className={"message"}
                          style={{ opacity: "0.5" }}
                        >
                          {t("Interview Requested")}
                        </button>
                      ) : profile.invitationData &&
                        [profile.invitationData].filter(
                          (e) => e.ParentId == selfprofile.id
                        )[0]?.inviteStatus == 2 ? (
                        <button className="message">
                          {t("Interview Declined")}
                        </button>
                      ) : (
                        <button
                          className={"message"}
                          onClick={(e) => {
                            selfprofile.user_type == "parents" &&
                            !selfprofile.job[0]
                              ? setShowfprovider2(true)
                              : setinterviewinvite(true);
                          }}
                          disabled={
                            selfprofile.id == profile.id ||
                            selfprofile.user_type == "provider"
                              ? true
                              : false
                          }
                          style={
                            selfprofile.id == profile.id ||
                            selfprofile.user_type == "provider"
                              ? { opacity: "0.5" }
                              : {}
                          }
                        >
                          {t("Interview invite")}
                        </button>
                      )}
                      <button
                        style={
                          selfprofile.id == profile.id ||
                          selfprofile.user_type == "provider" ||
                          profile.checkdocreqstatus
                            ? { opacity: "0.5" }
                            : {}
                        }
                        className="ask"
                        onClick={(e) => {
                          selfprofile.user_type == "parents" &&
                          !selfprofile.job[0]
                            ? setShowfprovider2(true)
                            : setrequest(true);
                        }}
                        disabled={
                          selfprofile.id == profile.id ||
                          selfprofile.user_type == "provider" ||
                          profile.checkdocreqstatus
                            ? true
                            : false
                        }
                      >
                        {t("Request documents")}
                      </button>
                    </div>
                  </div>
                  <p>
                    <h4>{t("About me")} </h4>
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
                    <span>{profile.about}</span>
                    <div className="quarybtn">
                      <div className="interview_box">
                        {!localStorage.getItem("token") ||
                        !localStorage.getItem("id") ? (
                          <Link to="/signup" className="message">
                            {t("Interview invite")}
                          </Link>
                        ) : (profile.invitationData &&
                            [profile.invitationData].filter(
                              (e) => e.ParentId == selfprofile.id
                            )[0]?.inviteStatus == 1) ||
                          profile.checkapplyornot == true ? (
                          <button
                            className="message"
                            onClick={(e) => {
                              navigate(
                                "/search-providers/message-inbox/" + profile.id
                              );
                              // navigate(localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership")
                              localStorage.setItem("message", slugdata.id);
                            }}
                          >
                            {t("Send message")}
                          </button>
                        ) : (profile.invitationData &&
                            [profile.invitationData].filter(
                              (e) => e.ParentId == selfprofile.id
                            )[0]?.inviteStatus == 0) ||
                          ecomen != "" ? (
                          <button
                            className="message"
                            style={{ opacity: "0.5" }}
                          >
                            {t("Interview Requested")}
                          </button>
                        ) : profile.invitationData &&
                          [profile.invitationData].filter(
                            (e) => e.ParentId == selfprofile.id
                          )[0]?.inviteStatus == 2 ? (
                          <button
                            className="message"
                            style={{ opacity: "0.5" }}
                          >
                            {t("Interview Declined")}
                          </button>
                        ) : (
                          <button
                            className={"message"}
                            onClick={(e) => {
                              selfprofile.user_type == "parents" &&
                              !selfprofile.job[0]
                                ? setShowfprovider2(true)
                                : setinterviewinvite(true);
                            }}
                            disabled={
                              selfprofile.id == profile.id ||
                              selfprofile.user_type == "provider"
                                ? true
                                : false
                            }
                            style={
                              selfprofile.id == profile.id ||
                              selfprofile.user_type == "provider"
                                ? { opacity: "0.5" }
                                : {}
                            }
                          >
                            {t("Interview invite")}
                          </button>
                        )}
                        <button
                          style={
                            selfprofile.id == profile.id ||
                            selfprofile.user_type == "provider" ||
                            profile.checkdocreqstatus
                              ? { opacity: "0.5" }
                              : {}
                          }
                          className="ask"
                          onClick={(e) => setrequest(true)}
                          disabled={
                            selfprofile.id == profile.id ||
                            selfprofile.user_type == "provider" ||
                            profile.checkdocreqstatus
                              ? true
                              : false
                          }
                        >
                          {t("Request documents")}
                        </button>
                      </div>
                    </div>
                  </p>
                </div>

                <div
                  className={
                    ssubtab.security == "active"
                      ? "active personal"
                      : "personal"
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
                    <div className="editkids security mg">
                      <label style={{ float: "left", width: "50%" }}>
                        {t("Verified accounts")}{" "}
                        <span>
                          <strong>
                            <div className="social_verify">
                              <svg
                                className={
                                  profile.facebookverify == "true"
                                    ? "active"
                                    : ""
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
                                  profile.linkdinverify == "true"
                                    ? "active"
                                    : ""
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
                      {profile.backgroundstatus == "Yes" ? (
                        <label
                          style={{
                            float: "left",
                            width: "50%",
                            clear: "none",
                            marginTop: "18px",
                          }}
                        >
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
                              {t("Background check")}
                            </strong>
                          </span>{" "}
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    ssubtab.Reviews == "active" ? "active personal" : "personal"
                  }
                >
                  <h3
                    onClick={(e) =>
                      setssubtab({
                        ...ssubtab,
                        Reviews: ssubtab.Reviews == "" ? "active" : "",
                      })
                    }
                  >
                    {t("Revie")}
                  </h3>
                  {ssubtab.Reviews == "active" ? (
                    profile.reviewData.length > 0 ? (
                      <Slider
                        ref={sliderRef}
                        {...settings2}
                        id="Slider-4"
                        className="slider_test reviewshow"
                      >
                        {profile.reviewData?.map((data, index) => {
                          return (
                            <div className="item">
                              <div className="review_list">
                                <div className="left_img">
                                  <img
                                    src={
                                      api +
                                      "/public/assets/images/users/" +
                                      data.file_path
                                    }
                                  />
                                </div>
                                <div className="right_content">
                                  <h2>{data.SenderName}</h2>
                                  <span>
                                    {[...Array(data.rating)].map(
                                      (star, index) => {
                                        index += 1;
                                        return (
                                          <svg
                                            width="12"
                                            height="12"
                                            style={{ marginRight: "5px" }}
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
                                      }
                                    )}

                                    {[...Array(5 - data.rating)].map(
                                      (star, index) => {
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
                                      }
                                    )}
                                  </span>
                                  <span className="date">
                                    {new Date(data.updated_at).getDate()}/
                                    {new Date(data.updated_at).getMonth() + 1}/
                                    {new Date(data.updated_at).getFullYear()}
                                  </span>
                                  <h3>{data.review_title}</h3>
                                  <p>{data.message}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Slider>
                    ) : (
                      <p className="no_active" style={{ margin: "25px 0" }}>
                        {t("No reviews at this time")}
                      </p>
                    )
                  ) : (
                    ""
                  )}
                </div>

                <div
                  className={
                    ssubtab.About == "active" ? "active personal" : "personal"
                  }
                >
                  <h3
                    onClick={(e) =>
                      setssubtab({
                        ...ssubtab,
                        About: ssubtab.About == "" ? "active" : "",
                      })
                    }
                  >
                    {t("About")}
                  </h3>
                  {ssubtab.About == "active" ? (
                    <div className="editkids aboutdetail">
                      <div className="left2">
                        <label>
                          <span className="half"> {t("First Name")} </span>
                          <span>
                            <strong>{profile.first_name}</strong>
                          </span>
                        </label>
                        <label>
                          <span className="half"> {t("Last Name")} </span>
                          <span>
                            <strong>{profile.last_name}</strong>
                          </span>
                        </label>
                        <label>
                          <span className="half"> {t("Date of birth")}</span>
                          <span>
                            <strong>{profile.dob}</strong>
                          </span>
                        </label>
                      </div>
                      <div className="right2">
                        <label>
                          <span className="half"> {t("City")} </span>
                          <span>
                            <strong>{profile.city}</strong>
                          </span>
                        </label>
                        <label>
                          <span className="half"> {t("ZIP code")} </span>
                          <span>
                            <strong>{profile.zip}</strong>
                          </span>
                        </label>
                        <label>
                          <span className="half"> {t("Country")} </span>
                          <span>
                            <strong>{profile.country}</strong>
                          </span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    ssubtab.Job == "active" ? "active personal" : "personal"
                  }
                >
                  <h3
                    onClick={(e) =>
                      setssubtab({
                        ...ssubtab,
                        Job: ssubtab.Job == "" ? "active" : "",
                      })
                    }
                  >
                    {t("Education")}
                  </h3>
                  {ssubtab.Job == "active" ? (
                    <div className="editkids ">
                      <div className="educationun">
                        <div className="left2">
                          <label>
                            <span className="half">
                              {t("Education Level")}{" "}
                            </span>
                            <span className="">
                              <strong>{t(profile.educationlevel)}</strong>
                            </span>
                          </label>
                          <label>
                            <span className="half">
                              {t("School/ university")}{" "}
                            </span>
                            <span>
                              <strong>{profile.school}</strong>
                            </span>
                          </label>
                          <label>
                            <span className="half">{t("Year awarded")} </span>
                            <span>
                              <strong>{t(profile.yearawarded)}</strong>
                            </span>
                          </label>
                        </div>
                        <div className="right2">
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
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    ssubtab.kids == "active" ? "active personal" : "personal"
                  }
                >
                  <h3
                    onClick={(e) =>
                      setssubtab({
                        ...ssubtab,
                        kids: ssubtab.kids == "" ? "active" : "",
                      })
                    }
                  >
                    {t("Work Experience")}
                  </h3>
                  {ssubtab.kids == "active" ? (
                    <div className="editkids editabout">
                      {profile.service_type && profile.service_type.tab1 ? (
                        <div className="nannyediy">
                          <h2 className="border">
                            <img
                              src={
                                window.location.origin + "/images/nany_pur.svg"
                              }
                            />{" "}
                            {t("Nanny")}
                          </h2>
                          {profile.nanynewbornexp == "Yes" ? (
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
                          <label>
                            {t("Years of work experience")}{" "}
                            <span className="cir">{profile.nanyyearexp}</span>
                          </label>
                          <br />
                          <br />
                        </div>
                      ) : (
                        ""
                      )}
                      {profile.service_type && profile.service_type.tab2 ? (
                        <div className="nannyediy">
                          <h2 className="border">
                            <img
                              src={
                                window.location.origin +
                                "/images/special_education.svg"
                              }
                            />
                            {t("Special education teacher")}
                          </h2>
                          <label>
                            {t("Experience in Special Education Field")}
                          </label>
                          <label>
                            <br />{" "}
                            <span>
                              {profile.setallapplicable.map((e) => {
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
                                    {t(e.name)}
                                  </strong>
                                );
                              })}
                            </span>
                          </label>
                          <label>
                            {t("Years of work experience")}{" "}
                            <span className="cir">{profile.setyearexp}</span>
                          </label>
                          <br />
                          <br />
                        </div>
                      ) : (
                        ""
                      )}

                      {profile.service_type && profile.service_type.tab3 ? (
                        <div className="nannyediy">
                          <h2 className="border">
                            <img
                              src={
                                window.location.origin +
                                "/images/professional.svg"
                              }
                            />
                            {t("Special education paraprofessional")}
                          </h2>
                          <label>
                            {t("Experience in Special Education Field")}
                          </label>
                          <label>
                            <br />{" "}
                            <span>
                              {profile.sepallapplicable != null &&
                                profile.sepallapplicable.map((e) => {
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
                                      {t(e.name)}
                                    </strong>
                                  );
                                })}
                            </span>
                          </label>
                          <label>
                            {t("Years of work experience")}{" "}
                            <span className="cir">{profile.sepworkexp}</span>
                          </label>
                          <br />
                          <br />
                        </div>
                      ) : (
                        ""
                      )}

                      {profile.service_type && profile.service_type.tab4 ? (
                        <div className="nannyediy">
                          <h2 className="border">
                            <img
                              src={window.location.origin + "/images/tuter.svg"}
                            />{" "}
                            {t("Tutor")}
                          </h2>
                          <label>
                            {t("Years of work experience")}{" "}
                            <span className="cir">{profile.tutorexp}</span>
                          </label>
                          <br />
                          <br />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    ssubtab.job == "active" ? "active personal" : "personal"
                  }
                >
                  <h3
                    onClick={(e) =>
                      setssubtab({
                        ...ssubtab,
                        job: ssubtab.job == "" ? "active" : "",
                      })
                    }
                  >
                    {t("Job Preferences")}
                  </h3>
                  {ssubtab.job == "active" ? (
                    <div className="editkids editabout">
                      {profile.service_type && profile.service_type.tab1 ? (
                        <div className="nannyediy">
                          <h2 className="border">
                            <img
                              src={
                                window.location.origin + "/images/nany_pur.svg"
                              }
                            />{" "}
                            {t("Nanny")}
                          </h2>
                          <label>
                            {t("Rate per hour")}
                            <span>
                              <strong>
                                <b>
                                  {profile.country == "Serbia"
                                    ? usd.min * 100 + " - " + usd.max * 100 + " " + "RSD"
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
                      {profile.service_type && profile.service_type.tab2 ? (
                        <div className="nannyediy">
                          <h2 className="border">
                            <img
                              alt="special-teacher"
                              src={
                                window.location.origin +
                                "/images/special_education.svg"
                              }
                            />
                            {t("Special education teacher")}
                          </h2>
                          <label>
                            {t("Rate per hour")}
                            <span>
                              <strong>
                                <b>
                                  {profile.country == "Serbia"
                                    ? usd3.min * 100 + " - " + usd3.max * 100 + " " + "RSD"
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

                      {profile.service_type && profile.service_type.tab3 ? (
                        <div className="nannyediy">
                          <h2 className="border">
                            <img
                              src={
                                window.location.origin +
                                "/images/professional.svg"
                              }
                            />{" "}
                            {t("Special education paraprofessional")}
                          </h2>
                          <label>
                            {t("Rate per hour")}
                            <span>
                              <strong>
                                <b>
                                  {profile.country == "Serbia"
                                    ? usd4.min * 100 + " - " + usd4.max * 100 + " " + "RSD"
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

                      {profile.service_type && profile.service_type.tab4 ? (
                        <div className="nannyediy">
                          <h2 className="border">
                            <img
                              src={window.location.origin + "/images/tuter.svg"}
                            />{" "}
                            {t("Tutor")}
                          </h2>
                          <label>
                            {t("Rate per hour")}
                            <span>
                              <strong>
                                <b>
                                  {profile.country == "Serbia"
                                    ? tutorusd.min * 100 +
                                      " - " +
                                      tutorusd.max * 100 + " " + "RSD"
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
                            {qualifications.Other &&
                            qualifications.Other != "" ? (
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
                                  {profile.tutorintrestedonlinecls
                                    ? profile.tutorintrestedonlinecls
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
                            {profile.tutorallapplicable != null &&
                              profile.tutorallapplicable.map((e) => {
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
                        <label>
                          {t("Years of experience as a teacher")}
                          <span className="cir">
                            {profile.yearofexpasteacher}
                          </span>
                        </label>
                        <br />
                        <br />
                      </div>
                      <div className="gernaledt">
                        <h2 className="border ">{t("General info")}</h2>
                        <div className="left2">
                          {/* <label>
                            {t("Preferred number of children to work with")}{" "}
                            <span
                              style={{
                                width: "45px",
                                height: "45px",
                                fontSize: "9px",
                              }}
                              className="cir"
                            >
                              {t(profile.nanyworkwithnochild)}
                            </span>
                          </label> */}
                          <label>
                            {t("Preferred number of children to work with")}
                            <span
                              className={`cir ${
                                profile.nanyworkwithnochild === "twins" && language === "sr"
                                  ? "specialStyle"
                                  : ""
                              }`}
                            >
                              {t(profile.nanyworkwithnochild)}
                            </span>
                          </label>
                          <label>
                            {t("Preferred child’s age")}
                            <span>
                              <strong>
                                <b>
                                  {profile.nanyprefchildage &&
                                    profile.nanyprefchildage.map((e, index) => {
                                      const modifiedName =
                                        language === "sr"
                                          ? e.name.includes("years")
                                            ? e.name.replace("years", "godina")
                                            : e.name
                                          : e.name.includes("godina")
                                          ? e.name.replace("godina", "years")
                                          : e.name;
                                      return (
                                        modifiedName +
                                        (profile.nanyprefchildage.length - 1 >=
                                        index + 1
                                          ? ", "
                                          : "")
                                      );
                                    })}
                                </b>
                              </strong>
                            </span>
                          </label>
                        </div>
                        <div className="right2">
                          <label>
                            {t("Start date")}
                            <span>
                              <strong>
                                <b>{profile.nanystartdate}</b>
                              </strong>
                            </span>
                          </label>
                          <label>
                            {t("Frequency")}
                            <span>
                              <strong>
                                <b>{t(profile.nanyintrestedin)}</b>
                              </strong>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    ssubtab.availability == "active"
                      ? "active personal"
                      : "personal"
                  }
                >
                  <h3
                    onClick={(e) =>
                      setssubtab({
                        ...ssubtab,
                        availability:
                          ssubtab.availability == "" ? "active" : "",
                      })
                    }
                  >
                    {t("Availability")}
                  </h3>
                  {ssubtab.availability == "active" ? (
                    <div className="calendershow">
                      <div className="calander">
                        <div className="form_group full">
                          <label>{t("Availability and working hours")}</label>
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
                        <div className="calanderfull progilecl">
                          {calandertype == 1 ? (
                            <Calander
                              data={calender_data}
                              data1={profile.fulltime}
                              data2={"fulltime"}
                              profile={"profile"}
                            />
                          ) : (
                            ""
                          )}
                          {calandertype == 2 ? (
                            <Calander
                              data={calender_data}
                              data1={profile.beforeschool}
                              data2={"beforeschool"}
                              profile={"profile"}
                            />
                          ) : (
                            ""
                          )}
                          {calandertype == 3 ? (
                            <Calander
                              data={calender_data}
                              data1={profile.afterschool}
                              data2={"afterschool"}
                              profile={"profile"}
                            />
                          ) : (
                            ""
                          )}
                          {calandertype == 4 ? (
                            <Calander
                              data={calender_data}
                              data1={profile.overnight}
                              data2={"overnight"}
                              profile={"profile"}
                            />
                          ) : (
                            ""
                          )}
                          {calandertype == 5 ? (
                            <Calander
                              data={calender_data}
                              data1={profile.weekends}
                              data2={"weekends"}
                              profile={"profile"}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    ssubtab.info == "active" ? "active personal" : "personal"
                  }
                >
                  <h3
                    onClick={(e) =>
                      setssubtab({
                        ...ssubtab,
                        info: ssubtab.info == "" ? "active" : "",
                      })
                    }
                  >
                    {t("Additional Info")}
                  </h3>
                  {ssubtab.info == "active" ? (
                    <div className="editkids editabout editinfo providerprofile">
                      <div className="Profile_complete">
                        <div className="detail  additional_info no_cur">
                          <div className="form_group full">
                            <label>{t("Languages")}</label>
                            {profile.englishlevel ? (
                              <div className="language">
                                <strong>{t("English")}</strong>
                                <ul>
                                  <li
                                    className={
                                      profile.englishlevel == "Beginner"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Beginner")}
                                  </li>
                                  <li
                                    className={
                                      profile.englishlevel == "Intermediate"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Intermediate")}
                                  </li>
                                  <li
                                    className={
                                      profile.englishlevel == "Fluent"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Fluent")}
                                  </li>
                                  <li
                                    className={
                                      profile.englishlevel == "Native"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Native")}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                            {profile.frenchlevel ? (
                              <div className="language">
                                <strong>{t("French")}</strong>
                                <ul>
                                  <li
                                    className={
                                      profile.frenchlevel == "Beginner"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Beginner")}
                                  </li>
                                  <li
                                    className={
                                      profile.frenchlevel == "Intermediate"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Intermediate")}
                                  </li>
                                  <li
                                    className={
                                      profile.frenchlevel == "Fluent"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Fluent")}
                                  </li>
                                  <li
                                    className={
                                      profile.frenchlevel == "Native"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Native")}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                            {profile.italianlevel ? (
                              <div className="language">
                                <strong>{t("Italian")}</strong>
                                <ul>
                                  <li
                                    className={
                                      profile.italianlevel == "Beginner"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Beginner")}
                                  </li>
                                  <li
                                    className={
                                      profile.italianlevel == "Intermediate"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Intermediate")}
                                  </li>
                                  <li
                                    className={
                                      profile.italianlevel == "Fluent"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Fluent")}
                                  </li>
                                  <li
                                    className={
                                      profile.italianlevel == "Native"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Native")}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                            {profile.germanlevel ? (
                              <div className="language">
                                <strong>{t("German")}</strong>
                                <ul>
                                  <li
                                    className={
                                      profile.germanlevel == "Beginner"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Beginner")}
                                  </li>
                                  <li
                                    className={
                                      profile.germanlevel == "Intermediate"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Intermediate")}
                                  </li>
                                  <li
                                    className={
                                      profile.germanlevel == "Fluent"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Fluent")}
                                  </li>
                                  <li
                                    className={
                                      profile.germanlevel == "Native"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Native")}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                            {profile.spanishlevel ? (
                              <div className="language">
                                <strong>{t("Spanish")}</strong>
                                <ul>
                                  <li
                                    className={
                                      profile.spanishlevel == "Beginner"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Beginner")}
                                  </li>
                                  <li
                                    className={
                                      profile.spanishlevel == "Intermediate"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Intermediate")}
                                  </li>
                                  <li
                                    className={
                                      profile.spanishlevel == "Fluent"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Fluent")}
                                  </li>
                                  <li
                                    className={
                                      profile.spanishlevel == "Native"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Native")}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                            {profile.chineselevel ? (
                              <div className="language">
                                <strong>{t("Chinese")}</strong>
                                <ul>
                                  <li
                                    className={
                                      profile.chineselevel == "Beginner"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Beginner")}
                                  </li>
                                  <li
                                    className={
                                      profile.chineselevel == "Intermediate"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Intermediate")}
                                  </li>
                                  <li
                                    className={
                                      profile.chineselevel == "Fluent"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Fluent")}
                                  </li>
                                  <li
                                    className={
                                      profile.chineselevel == "Native"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Native")}
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              ""
                            )}
                            {profile.otherlevel ? (
                              <div className="language">
                                <strong>
                                  {t("Other language")} :{" "}
                                  {profile.otherlangname
                                    ? profile.otherlangname
                                    : ""}
                                </strong>
                                <ul>
                                  <li
                                    className={
                                      profile.otherlevel == "Beginner"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Beginner")}
                                  </li>
                                  <li
                                    className={
                                      profile.otherlevel == "Intermediate"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Intermediate")}
                                  </li>
                                  <li
                                    className={
                                      profile.otherlevel == "Fluent"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Fluent")}
                                  </li>
                                  <li
                                    className={
                                      profile.otherlevel == "Native"
                                        ? "active"
                                        : ""
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
                      {profile.service_type && profile.service_type.tab1 ? (
                        <div className="icon">
                          <ul>
                            <li>
                              <span>{t("Smoking")}</span>
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
                                  ""
                                )}
                                {habit.smoke == "true" ? (
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
                                        transform:
                                          "translateY(8px) translateX(9px)",
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M16.85 5.62041C17.47 5.01041 17.85 4.17042 17.85 3.24043C17.85 1.73045 16.85 0.450466 15.47 0.0304707C14.99 -0.109528 14.5 0.250468 14.5 0.750462C14.5 1.08046 14.71 1.37045 15.02 1.46045C15.79 1.69045 16.35 2.40044 16.35 3.24043C16.35 4.06042 15.82 4.75042 15.08 5.00041C14.75 5.11041 14.5 5.39041 14.5 5.7404V5.8904C14.5 6.2604 14.77 6.58039 15.14 6.64039C17.07 6.95039 18.5 8.64037 18.5 10.6603V12.1403C18.5 12.5503 18.84 12.8903 19.25 12.8903C19.66 12.8903 20 12.5503 20 12.1403V10.6503C20 8.43037 18.72 6.51039 16.85 5.62041ZM13.5 13.8904H1.5C0.67 13.8904 0 14.5605 0 15.3905C0 16.2205 0.67 16.8906 1.5 16.8906H13.5C14.33 16.8906 15 16.2205 15 15.3905C15 14.5605 14.33 13.8904 13.5 13.8904ZM12.7301 8.09058H14.0301C15.9001 8.09058 17.5001 9.44056 17.5101 11.2505V12.1405C17.5101 12.5605 17.1701 12.8905 16.7601 12.8905H16.7501C16.3301 12.8905 16.0001 12.5505 16.0001 12.1405V11.5905C16.0001 10.2805 15.0801 9.54056 14.0301 9.54056H12.6101C10.7701 9.54056 9.18005 8.09058 9.15005 6.25061C9.12005 4.70063 10.1501 3.38065 11.5701 2.97066C12.0401 2.83066 12.5001 3.20065 12.5001 3.69064C12.5001 4.03064 12.2801 4.32063 11.9601 4.41063C11.1201 4.64063 10.5401 5.39062 10.6601 6.3406C10.7901 7.36059 11.7101 8.09058 12.7301 8.09058ZM16 13.8904H17.5V16.8906H16V13.8904ZM20 13.8904H18.5V16.8906H20V13.8904Z"
                                      fill="#fff"
                                    />
                                  </svg>
                                ) : (
                                  ""
                                )}
                              </div>
                            </li>
                            <li>
                              <span>{t("Cooking for kids")}</span>
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
                              <span>{t("Light housework")}</span>
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
                              <span>{t("Car or licence")}</span>
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
                              <span>{t("Traveling with family")}</span>
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
                        {profile.service_type &&
                        profile.service_type.tab1 &&
                        profile.livewithfamily ? (
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
                              {t("Living with the family")}{" "}
                              <span>{t(profile.livewithfamily)}</span>
                            </label>
                            <br />
                          </div>
                        ) : (
                          ""
                        )}
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
                            {t("Work abroad")}{" "}
                            <span>{t(profile.workingabroad)}</span>
                          </label>
                        </div>
                      </div>
                      {/*<label><span ><strong><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="#A98D4B" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z" fill="white" />
                                             </svg>  {profile.anyallergies} allergies</strong></span></label>
                                            <label><span ><strong><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="#A98D4B" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8283 6.40305C15.1833 6.75808 15.1833 7.33368 14.8283 7.6887L9.18544 13.5978C8.83042 13.9528 8.25481 13.9528 7.89979 13.5978L5.17252 10.8705C4.81749 10.5155 4.81749 9.9399 5.17252 9.58487C5.52754 9.22985 6.10314 9.22985 6.45817 9.58487L8.54261 11.6693L13.5426 6.40305C13.8976 6.04803 14.4732 6.04803 14.8283 6.40305Z" fill="white" />
                                            </svg>  {profile.medicalcondition} medical conditions</strong></span></label> */}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            {subtab == "Profile" ? (
              <>
                {localStorage.getItem("user_type") == "parents" ? (
                  <View_edit />
                ) : (
                  <View_edit_provider />
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mobilemenubottom">
          <div
            className="side_drop_collapse_box_content"
            onClick={(e) => {
              localStorage.removeItem("side");
              setprofilesection("");
            }}
            style={
              profilesection == "notifications"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <span
              onClick={(e) => {
                localStorage.removeItem("side");
                setprofilesection("");
              }}
            ></span>
            {localStorage.getItem("user_type") == "parents" ? (
              <Notification_tab_parents
                setsubtab={setsubtab}
                subtab={subtab}
                profilesection={profilesection}
              />
            ) : (
              <Notification_tab_provider
                setsubtab={setsubtab}
                subtab={subtab}
                profilesection={profilesection}
              />
            )}
          </div>

          <div
            className="side_drop_collapse_box_content Document_main "
            onClick={(e) => {
              localStorage.removeItem("side");
              setprofilesection("");
            }}
            style={
              profilesection == "fav"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <span
              onClick={(e) => {
                localStorage.removeItem("side");
                setprofilesection("");
              }}
            ></span>
            <ul>
              <li
                onClick={(e) => {
                  navigate(
                    localStorage.getItem("user_type") == "parents"
                      ? "/search-parents/who-i-visited"
                      : "/search-providers/who-i-visited"
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setsubtab("who-i-visited");
                }}
                className={subtab == "who-i-visited" ? "active " : ""}
              >
                {t("Who I Visited")}
              </li>
              <li
                onClick={(e) => {
                  navigate(
                    localStorage.getItem("user_type") == "parents"
                      ? "/search-parents/who-visited-me"
                      : "/search-providers/who-visited-me"
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setsubtab("who-visited-me");
                }}
                className={
                  subtab == "who-visited-me" ? "active upgrade" : "upgrade"
                }
              >
                {t("Who Visited Me")}{" "}
                <span>
                  <Link
                    to={""}
                    // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank"
                  >
                    {t("upgrade")}
                  </Link>
                </span>
              </li>
            </ul>
          </div>

          <div
            className="side_drop_collapse_box_content"
            style={
              profilesection == "Favorites"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <span
              onClick={(e) => {
                localStorage.removeItem("side");
                setprofilesection("");
              }}
            ></span>
            {localStorage.getItem("user_type") == "parents" ? (
              <Favorite_provider
                setsubtab={setsubtab}
                subtab={subtab}
                setprofilesection={setprofilesection}
              />
            ) : (
              <Favorite_provider
                setsubtab={setsubtab}
                subtab={subtab}
                setprofilesection={setprofilesection}
              />
            )}
          </div>
          <div
            className="side_drop_collapse_box_content"
            style={
              profilesection == "Job_history"
                ? { display: "block" }
                : { display: "none" }
            }
            onClick={(e) => {
              localStorage.removeItem("side");
              setprofilesection("");
            }}
          >
            <span
              onClick={(e) =>
                setprofilesection(
                  profilesection != "Job_history" ? "Job_history" : ""
                )
              }
            ></span>
            {localStorage.getItem("user_type") == "parents" ? (
              <Job_history_tap_parents setsubtab={setsubtab} subtab={subtab} />
            ) : (
              <Job_history_tap setsubtab={setsubtab} subtab={subtab} />
            )}
          </div>
          <div
            className="side_drop_collapse_box_content"
            style={
              profilesection == "message"
                ? { display: "block" }
                : { display: "none" }
            }
            onClick={(e) => {
              localStorage.removeItem("side");
              setprofilesection("");
            }}
          >
            <span
              onClick={(e) => {
                localStorage.removeItem("side");
                setprofilesection("");
              }}
            ></span>
            <Message_tab setsubtab={setsubtab} subtab={subtab} />
          </div>
          <ul>
            <li
              onClick={(e) => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setprofilesection(
                  profilesection != "Job_history" ? "Job_history" : ""
                );
              }}
            >
              <img
                src={window.location.origin + "/images/jobnhistory.svg"}
                alt=""
              />
              <span>{t("Jobs & Doc")}</span>
            </li>
            <li
              onClick={(e) => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setprofilesection(profilesection != "fav" ? "fav" : "");
              }}
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 1.55556V12.4444C0 13.3 0.692222 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0H1.55556C0.692222 0 0 0.7 0 1.55556ZM9.33332 4.66573C9.33332 5.95684 8.2911 6.99906 6.99999 6.99906C5.70888 6.99906 4.66666 5.95684 4.66666 4.66573C4.66666 3.37462 5.70888 2.3324 6.99999 2.3324C8.2911 2.3324 9.33332 3.37462 9.33332 4.66573ZM7.0001 8.47839C5.44455 8.47839 2.33344 9.33395 2.33344 10.8895V11.6673H11.6668V10.8895C11.6668 9.33395 8.55566 8.47839 7.0001 8.47839Z"
                  fill="#A98D4B"
                ></path>
              </svg>
              <span> {t("Recent visit")}</span>
            </li>
            <li
              onClick={(e) =>
                setprofilesection(profilesection != "message" ? "message" : "")
              }
            >
              <img
                src={window.location.origin + "/images/message.svg"}
                alt=""
              />
              <span>{t("Messages")}</span>
            </li>
            {localStorage.getItem("user_type") == "parents" ? (
              <li
                onClick={(e) => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setsubtab("all-profile");
                  navigate("/search-providers/all-profile");
                }}
              >
                <img src={window.location.origin + "/images/fav.svg"} alt="" />
                <span>{t("Favorites")}</span>
              </li>
            ) : (
              <li
                onClick={(e) => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setprofilesection(
                    profilesection != "Favorites" ? "Favorites" : ""
                  );
                }}
              >
                <img src={window.location.origin + "/images/fav.svg"} alt="" />
                <span>{t("Favorites")}</span>
              </li>
            )}
            <li
              onClick={(e) => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setsubtab("Reviews");
                setprofilesection("");
                navigate(
                  localStorage.getItem("user_type") == "parents"
                    ? "/search-parents/Reviews"
                    : "/search-providers/Reviews"
                );
              }}
            >
              <img
                src={window.location.origin + "/images/reviewi.svg"}
                alt=""
              />
              <span>{t("Reviews")}</span>
            </li>
            <li
              onClick={(e) => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setprofilesection(
                  profilesection != "notifications" ? "notifications" : ""
                );
              }}
            >
              <span className="count">
                <Count_notification />
              </span>
              <img
                src={window.location.origin + "/images/notification.svg"}
                alt=""
              />
              <span>{t("Notifications")}</span>
            </li>
          </ul>
        </div>
      </div>

      {showflogin ? (
        <Modal show={showflogin} onHide={(e) => setshowflogin(false)}>
          <Modal.Body>
            <div className="promocode_content cancelmembership reportthanks">
              <div className="">
                <p>
                  <strong>{t("Thank you for your message.")}</strong>
                </p>
                <br />
                <p className={"second"}>
                  <b>
                    {t(
                      "SensCare is taking your safety very seriously. Please allow us up to 48hrs to further investigate this inquiry."
                    )}{" "}
                  </b>{" "}
                </p>
                <br />
                <p className="giveus">
                  {t("In the meantime, please visit our")}{" "}
                  <Link to="/safety-center">{t("Safety center")}</Link>{" "}
                  {t("and")} <Link to="/faq">{t("FAQ")}</Link>{" "}
                  {t("for more info.")}{" "}
                </p>

                <div className="button text-center">
                  <div className="pull-right">
                    <button
                      className="btn"
                      onClick={(e) => {
                        setsurvay(false);
                        setshowflogin();
                      }}
                    >
                      {t("Close")}
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
      {survay ? (
        <Modal show={survay} onHide={(e) => setsurvay(false)}>
          <Modal.Body>
            <div className="promocode_content cancelmembership report">
              <Link to="" onClick={(e) => setsurvay(false)}>
                +{" "}
              </Link>
              <svg
                onClick={(e) => setsurvay(true)}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.6667 20.3333C20.6667 21.8 19.4667 23 18 23H13.1333C12.4133 23 11.7333 22.7133 11.2333 22.2067L6 16.8867C6 16.8867 6.6404 16.2201 6.86667 16.0533C7.09293 15.8866 7.19614 15.8784 7.39333 15.86C7.59052 15.8416 7.67333 15.9 7.79333 15.9667C7.82 15.9733 10.6667 17.6067 10.6667 17.6067V9.66667C10.6667 9.11333 11.1133 8.66667 11.6667 8.66667C12.22 8.66667 12.6667 9.11333 12.6667 9.66667V14.3333H13.3333V8C13.3333 7.44667 13.78 7 14.3333 7C14.8867 7 15.3333 7.44667 15.3333 8V14.3333H16V8.66667C16 8.11333 16.4467 7.66667 17 7.66667C17.5533 7.66667 18 8.11333 18 8.66667V14.3333H18.6667V10.6667C18.6667 10.1133 19.1133 9.66667 19.6667 9.66667C20.22 9.66667 20.6667 10.1133 20.6667 10.6667V20.3333Z"
                  fill="#7D2B8B"
                />
              </svg>
              <h2>{t("Report User")}</h2>
              <div className="cancelmembershipp">
                <p>
                  <b>
                    {t(
                      "In order to process your request, we need a little bit more information from you."
                    )}
                  </b>
                </p>
                <div className="onepxline"></div>
                <p className={report.error != "" ? "active second" : "second"}>
                  {t("What is the reason you want to report this profile?")}{" "}
                </p>
                <br />
                <ul>
                  <li>
                    <input
                      type={"radio"}
                      id="survay"
                      name="survay"
                      onClick={(e) =>
                        setreport({
                          ...report,
                          resion: "User sent an unsolicited message",
                          error: "",
                        })
                      }
                    />
                    <span> {t("User sent an unsolicited message")}</span>
                  </li>
                  <li>
                    <input
                      type={"radio"}
                      id="survay"
                      name="survay"
                      onClick={(e) =>
                        setreport({
                          ...report,
                          resion: "Security and verification issue",
                          error: "",
                        })
                      }
                    />
                    <span> {t("Security and verification issue")}</span>
                  </li>
                </ul>
                <p className="giveus">{t("Give us more details")}</p>
                <div className="comment">
                  <textarea
                    className={
                      report.resion == "other" && report.other == ""
                        ? "bordererror"
                        : ""
                    }
                    maxlength="70"
                    placeholder={t("Type here")}
                    onChange={(e) =>
                      setreport({ ...report, other: e.target.value, error: "" })
                    }
                  ></textarea>
                  <span>
                    {t("Number of characters")} {70 - report.other.length}
                  </span>
                </div>
                <div className="button text-center">
                  <div className="pull-right">
                    <button className="btn" onClick={(e) => reportset()}>
                      {t("Report User")}
                    </button>
                  </div>
                  <div className="pull-right">
                    <button
                      className="btn confirm"
                      onClick={(e) => setsurvay(false)}
                    >
                      {t("Cancel")}
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
      {signout ? (
        <Modal show={signout} onHide={(e) => setsignout(false)}>
          <Modal.Body>
            <div className="promocode_content signout">
              <Link to="" onClick={(e) => setsignout(false)}>
                +{" "}
              </Link>
              <h2>{t("Sign out")}</h2>
              <p>{t("Are you sure you want to Sign out?")} </p>
              <div className="button text-center">
                <div className="pull-right">
                  <button className="btn" onClick={(e) => setsignout(false)}>
                    {t("No")}
                  </button>
                </div>
                <div className="pull-right">
                  <button
                    className="btn confirm"
                    onClick={(e) => {
                      localStorage.removeItem("id");
                      localStorage.removeItem("token");
                      setTimeout(() => {
                        window.location.replace("/login");
                      }, 500);
                    }}
                  >
                    {t("Yes")}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {false ? (
        <Modal show={false} onHide={(e) => setinterviewinvite(false)}>
          <Modal.Body>
            <div className="promocode_content signout invite">
              <Link to="" onClick={(e) => setinterviewinvite(false)}>
                +{" "}
              </Link>
              <h2>{t("Interview invite")}</h2>
              <p>
                {t("Are you sure you want to send an Interview invite to")}{" "}
                <span style={{ color: "#A98D4B" }}>
                  {profile.first_name + " " + profile.last_name}
                </span>
                ?{" "}
              </p>
              <div className="button text-center ">
                <div className="pull-right">
                  <button
                    className="btn"
                    onClick={(e) => setinterviewinvite(false)}
                  >
                    {t("Cancel")}
                  </button>
                </div>
                <div className="pull-right">
                  <button
                    className="btn confirm"
                    onClick={(e) => interview_invite()}
                  >
                    {t("Send invite")}
                  </button>
                </div>
              </div>
              {profile.anyallergies == "Yes" ||
              profile.medicalcondition == "Yes" ? (
                <div className="noteedit">
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
                      fill="#A98D4B"
                    ></path>
                  </svg>
                  <span>
                    {" "}
                    <b> {t("Note:")}</b>{" "}
                    {t(
                      "Our record indicates that the provider might have an allergy and/or medical condition  that you may want to discuss about during the interview."
                    )}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {interviewinvite ? (
        <Modal show={interviewinvite} onHide={(e) => setinterviewinvite(false)}>
          <Modal.Body>
            <div className="promocode_content signout invite request request2">
              {/* <Link to="" onClick={e => setinterviewinvite(false)}>+ </Link> */}
              <h2>{t("Interview invite")}</h2>
              <ul>
                <li>
                  <span>{t("Send invite for:")}</span>
                </li>
                {jobs_list_profession.map((data, index) => {
                  return (
                    <li
                      style={data.invitestatus == 1 ? { option: "0.6" } : {}}
                      key={index}
                    >
                      <input
                        disabled={data.invitestatus == 1 ? true : false}
                        type="radio"
                        name="profession"
                        onClick={(e) => setjob_id(data.id)}
                      />
                      <span>
                        {data.job_type == "Special Education Paraprofessional"
                          ? t("Paraprofessional")
                          : data.job_type == "Special Education Teacher"
                          ? t("SPED teacher")
                          : t(data.job_type)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="button text-center ">
                <div className="pull-right">
                  <button
                    className="btn"
                    onClick={(e) => setinterviewinvite(false)}
                  >
                    {t("Cancel")}
                  </button>
                </div>
                <div className="pull-right">
                  <button
                    className="btn confirm"
                    onClick={(e) => interview_invite()}
                  >
                    {t("Send")}
                  </button>
                </div>
              </div>
              {/* {profile.anyallergies == "Yes" || profile.medicalcondition == "Yes" ? */}
              <div className="noteedit">
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
                    fill="#A98D4B"
                  ></path>
                </svg>
                <span>
                  {" "}
                  <b> {t("Note:")}</b>{" "}
                  {t(
                    "Our record indicated that the provider might have an allergy and/or medical condition  that you may want to discuss about during the meeting."
                  )}
                </span>
              </div>
              {/* : ""} */}
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {request ? (
        <Modal show={request} onHide={(e) => setrequest(false)}>
          <Modal.Body>
            <div className="promocode_content signout invite request">
              <Link to="" onClick={(e) => setrequest(false)}>
                +{" "}
              </Link>
              <h2>{t("Request Documents")}</h2>
              <p>
                {t(
                  "To get to know your candidates better, send them a request for additional documents."
                )}{" "}
              </p>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    name=""
                    onClick={(e) => document_select("CV")}
                  />
                  <span>{t("CV")}</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name=""
                    onClick={(e) => document_select("Background check")}
                  />
                  <span>{t("Background check")}</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name=""
                    onClick={(e) => document_select("Recommendations")}
                  />
                  <span>{t("Recommendations")}</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name=""
                    onClick={(e) => document_select("Certificates")}
                  />
                  <span>{t("Certificates")}</span>
                </li>
              </ul>
              <div className="button text-center ">
                <div className="pull-right">
                  <button className="btn" onClick={(e) => setrequest(false)}>
                    {t("Cancel")}
                  </button>
                </div>
                <div className="pull-right">
                  <button
                    className="btn confirm"
                    onClick={(e) => recommendations()}
                  >
                    {t("Send")}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      <Modal show={showflogin2} onHide={(e) => setshowflogin2(false)}>
        <Modal.Body>
          <div className="promocode_content login_first">
            <Link to="" onClick={(e) => showflogin2(false)}>
              +{" "}
            </Link>
            <h2>{t("Complete your profile and find the perfect candidate")}</h2>
            <img src={window.location.origin + "/images/landing.png"} />
            <p>
              {t(
                "Answer a few questions to help you find the candidates that are just right for you!"
              )}
            </p>
            <button>
              <Link to={"/complete-parents-profile"}>
                {t("Complete Profile")}
              </Link>
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showfprovider2} onHide={(e) => setShowfprovider2(false)}>
        <Modal.Body>
          <div className="promocode_content login_first">
            <Link to="" onClick={(e) => setShowfprovider2(false)}>
              +{" "}
            </Link>
            <h2>{t("Complete your profile and get a perfect job")}</h2>
            <img src={window.location.origin + "/images/landing.png"} />
            <p>
              {t(
                "Answer a few questions to make it easier to find jobs that are just made for you!"
              )}
            </p>
            <button>
              <Link to={"/complete-provider-profile"}>
                {t("Complete Profile")}
              </Link>
            </button>
          </div>
        </Modal.Body>
      </Modal>
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
                            selfprofile.file_path
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
                  {t("* You can upload .jpg and .png files size up to 5Mb")}{" "}
                </p>

                <div className="button text-center">
                  <div className="pull-right">
                    <button className="btn" onClick={(e) => setphotoupload()}>
                      {t("Close")}
                    </button>
                  </div>
                  <div className="pull-right">
                    <button
                      className="btn confirm"
                      onClick={(e) => profile_update()}
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
      {reviewmodel ? (
        <Modal show={reviewmodel} onHide={(e) => setreviewmodel(false)}>
          <Modal.Body>
            <Send_review
              setrequest={setreviewmodel}
              slugdata={slugdata.id}
              username={profile.first_name + " " + profile.last_name}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}
