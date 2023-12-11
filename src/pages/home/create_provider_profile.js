import React, { useState, useEffect } from 'react'
import Calander from './common/calander'
import Footer from './common/footer'
import Header from './common/header'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import { api } from '../../urls'
import { country } from './common/country'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LinkedInPage from './common/linkedin'


function Create_provider_profile() {
    const [startDate, setStartDate] = useState(new Date());
    const [detail, setdetail] = useState({})
    const [dis, setdis] = useState(false)
    const [mobile, setmobile] = useState(0)
    const [showflogin, setShowflogin] = useState(false);
    const [range, setrange] = useState(0)
    const [sepworkexp, setsepworkexp] = useState(0)
    const [experience, setexperience] = useState(0)
    const [utorexperience, setutorexperience] = useState(0)
    const [count, setcount] = useState(true)
    const [children, setchildren] = useState("")
    const [otp, setotp] = useState("")
    const [nchildren, setnchildren] = useState("")
    const [calandertype, setcalandertype] = useState(0)
    const [stap, setstap] = useState(1)
    const [process, setprocess] = useState(14)
    const [error, seterror] = useState({
        phone: ""
    })
    const [usd, setusd] = useState({
        min: 0,
        max: 60
    })
    const [tutorusd, settutorusd] = useState({
        min: 0,
        max: 60
    })
    const [usd3, setusd3] = useState({
        min: 0,
        max: 60
    })
    const [usd4, setusd4] = useState({
        min: 0,
        max: 60
    })
    const [habit, sethabit] = useState({
        smoke: "",
        licence: "",
        kids: "",
        housework: "",
        family: ""
    })
    const stapset = (e) => {
        setstap(e)
        e == 1 ? setprocess(14) : e == 2 ? setprocess(29) : e == 3 ? setprocess(43) : e == 4 ? setprocess(57) : e == 5 ? setprocess(71) : e == 6 ? setprocess(86) : e == 7 ? setprocess(100) : setprocess(10)
    }
    const [selectcat, setselectcat] = useState([])
    const [qualifications, setqualifications] = useState({
        English: "",
        Serbian: "",
        Mathematics: "",
        Physics: "",
        Chemistry: "",
        Other: ""
    })
    const [selectcat2, setselectcat2] = useState([])
    const [sepallapplicable, setsepallapplicable] = useState([])
    const [setallapplicable2, setsetallapplicable2] = useState([])
    const [children_age, setchildren_age] = useState([])
    const [children_age2, setchildren_age2] = useState([])
    const [allapplicable, setallapplicable] = useState([])
    const [languages, setlanguages] = useState([])
    const [catopen, setcatopen] = useState(true)
    const [today, settoday] = useState(new Date())
    const handleCloselogin_first = () => {
        setShowflogin(false)
    };

    const calender_data = (name, e) => {
        setdetailprovide({ ...detailprovider, [name]: e })
    }

    const redirect = () => {
        window.location.href = "/search-parents"
    }
    const languageselect = (data) => {
        let sum = false
        let x = data.substr(data.lastIndexOf('\\') + 1).split('_')[0]
        languages.map((e, index) => {
            if ((e.name.substr(e.name.lastIndexOf('\\') + 1).split('_')[0]) == x) {
                sum = true
                e.name = data
            }
        })
        if (sum == false) {
            languages.push({ name: data })
        }
        setTimeout(() => {
            setlanguages([...languages])
        }, 500);
    }
    const selectoption3 = (data) => {
        let sum = false
        allapplicable.map((e, index) => {
            if (e.name == data) {
                sum = true
                allapplicable.splice(index, 1)
            }
        })
        if (sum == false) {
            allapplicable.push({ "name": data })
        }
        setTimeout(() => {
            setallapplicable([...allapplicable])
        }, 500);
    }
    const selectoption2 = (data) => {
        let sum = false
        children_age.map((e, index) => {
            if (e.name == data) {
                sum = true
                children_age.splice(index, 1)
            }
        })

        if ((children == "twins" ? 2 : children) > children_age.length || children == 3) {
            if (sum == false) {
                children_age.push({ "name": data })
            }
        }
        setTimeout(() => {
            setchildren_age([...children_age])
        }, 500);
    }
    const selectoption = (data) => {
        let sum = false
        selectcat.map((e, index) => {
            if (e.name == data) {
                sum = true
                selectcat.splice(index, 1)
            }
        })
        if (sum == false) {
            selectcat.push({ "name": data })
        }
        setTimeout(() => {
            setselectcat([...selectcat])
        }, 500);
    }
    const selectoption4 = (data) => {
        let sum = false
        children_age2.map((e, index) => {
            if (e.name == data) {
                sum = true
                children_age2.splice(index, 1)
            }
        })
        if ((nchildren == "twins" ? 2 : nchildren) > children_age2.length || nchildren == 3) {
            if (sum == false) {
                children_age2.push({ "name": data })
            }
        }
        setTimeout(() => {
            setchildren_age2([...children_age2])
        }, 500);
    }
    const [tutorintrestedinm, settutorintrestedinm] = useState({
        fulltime: "",
        parttime: "",
        occasionally: ""
    })
    const selectoption5 = (data) => {
        let sum = false
        sepallapplicable.map((e, index) => {
            if (e.name == data) {
                sum = true
                sepallapplicable.splice(index, 1)
            }
        })
        if (sum == false) {
            sepallapplicable.push({ "name": data })
        }
        setTimeout(() => {
            setsepallapplicable([...sepallapplicable])
        }, 500);
    }
    const selectoption6 = (data) => {
        let sum = false
        setallapplicable2.map((e, index) => {
            if (e.name == data) {
                sum = true
                setallapplicable2.splice(index, 1)
            }
        })
        if (sum == false) {
            setallapplicable2.push({ "name": data })
        }
        setTimeout(() => {
            setsetallapplicable2([...setallapplicable2])
        }, 500);
    }
    const custom = (e, x) => {
        if (catopen) {
            document.getElementById(e).style.display = "block"
            document.getElementById(x).style.display = "block"
            setcatopen(false)
        } else {
            document.getElementById(e).style.display = "none"
            document.getElementById(x).style.display = "none"
            setcatopen(true)
        }
    }
    const [veri, setveri] = useState("")
    const [setcode, setsetcode] = useState(true)
    const codeselect = () => {
        if (setcode) {
            setsetcode(false)
        } else {
            setsetcode(true)
        }
    }
    const [contact_code, setcontact_code] = useState({
        code: "",
        flag: ""
    })
    const [certificates, setcertificates] = useState({
        qualificationscertificatesname: "",
        qualificationscertificatesname2: "",
        qualificationscertificatesname3: "",
        qualificationscertificatesname4: ""
    })
    const [methods, setmethods] = useState({
        setexpmethods: "",
        setexpmethods2: "",
        setexpmethods3: "",
        setexpmethods4: ""
    })
    const [detailprovider, setdetailprovide] = useState({
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
        plateformsocialmedia: "Yes",
        seperhrrate: "",
        seterhrrate: "",
        yearofexpasteacher: 0

    })
    const [refresh, setrefresh] = useState('')

    const profile_update = (a) => {

        setdis(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var formdata = new FormData();
        formdata.append("user_id", localStorage.getItem("id"));
        formdata.append("about", detailprovider.about);
        formdata.append("profile_headline", detailprovider.profile_headline);
        detailprovider.video.name ? formdata.append("video", detailprovider.video) : formdata.append("about", detailprovider.about)
        detailprovider.file_path.name ? formdata.append("file_path", detailprovider.file_path) : formdata.append("about", detailprovider.about)
        formdata.append("educationlevel", detailprovider.educationlevel);
        formdata.append("school", detailprovider.school);
        formdata.append("yearawarded", detailprovider.yearawarded);
        detailprovider.recommendationsfile.name ? formdata.append("recommendationsfile", detailprovider.recommendationsfile) : formdata.append("about", detailprovider.about);
        formdata.append("qualificationscertificatesname[]", certificates.qualificationscertificatesname);
        formdata.append("qualificationscertificatesname[]", certificates.qualificationscertificatesname2);
        formdata.append("qualificationscertificatesname[]", certificates.qualificationscertificatesname3);
        formdata.append("qualificationscertificatesname[]", certificates.qualificationscertificatesname4);
        detailprovider.cv.name ? formdata.append("cv", detailprovider.cv) : formdata.append("about", detailprovider.about)
        detailprovider.qualificationscertificatesdoc.name ? formdata.append("qualificationscertificatesdoc[]", detailprovider.qualificationscertificatesdoc) : formdata.append("about", detailprovider.about)
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
        formdata.append("tutorintrestedonlinecls", detailprovider.tutorintrestedonlinecls);
        formdata.append("tutorintrestedinschool", detailprovider.tutorintrestedinschool);
        formdata.append("tutorallapplicable", JSON.stringify(selectcat));
        formdata.append("tutorperhrrate", tutorusd.min + "-" + tutorusd.max);
        formdata.append("tutorworkwithnochild", children);
        formdata.append("tutorprefchildage", JSON.stringify(children_age));
        formdata.append("tutorstartdate", detailprovider.tutorstartdate);
        formdata.append("tutorintrestedin", detailprovider.tutorintrestedin);
        formdata.append("nanyhrrate", usd.min + "-" + usd.max);
        formdata.append("nanyintrestedinschool", detailprovider.nanyintrestedinschool);
        formdata.append("nanyworkwithnochild", nchildren);
        formdata.append("nanystartdate", detailprovider.nanystartdate);
        formdata.append("nanyprefchildage", JSON.stringify(children_age2));
        formdata.append("nanyintrestedin", detailprovider.nanyintrestedin);
        formdata.append("fulltime", JSON.stringify(detailprovider.fulltime));
        formdata.append("beforeschool", JSON.stringify(detailprovider.beforeschool));
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
        detailprovider.backgrounddoc.name ? formdata.append("backgrounddoc", detailprovider.backgrounddoc) : formdata.append("about", detailprovider.about)
        formdata.append("backgroundstatus", detailprovider.backgroundstatus);
        formdata.append("smoke", habit.smoke);
        formdata.append("carorlicence", habit.licence);
        formdata.append("cooking", habit.kids);
        formdata.append("lighthousework", habit.housework);
        formdata.append("traveling", habit.family);
        formdata.append("workingabroad", detailprovider.workingabroad);
        formdata.append("livewithfamily", detailprovider.livewithfamily);
        formdata.append("anyallergies", detailprovider.anyallergies);
        formdata.append("anyallergiesdescription", detailprovider.anyallergiesdescription);
        formdata.append("medicalcondition", detailprovider.medicalcondition);
        formdata.append("medicalconditiondescription", detailprovider.medicalconditiondescription);
        formdata.append("plateformsocialmedia", detailprovider.plateformsocialmedia);
        formdata.append("facebookverify", detailprovider.facebookverify);
        formdata.append("twitterverify", detailprovider.twitterverify);
        formdata.append("linkdinverify", detailprovider.linkdinverify);
        formdata.append("instaverify", detailprovider.instaverify);
        formdata.append("step", (stap + 1))
        formdata.append("seterhrrate", usd3.min + "-" + usd3.max)
        formdata.append("seperhrrate", usd4.min + "-" + usd4.max)
        formdata.append("yearofexpasteacher", detailprovider.yearofexpasteacher)
        if (a == true) {
            formdata.append("profilecompletestatus", "1")
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/updateprovider", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success == true && stap == 7) {
                    setShowflogin(true)
                }
                setdis(false)
            })
            .catch(error => {
                setdis(false)
                console.log('error', error)
            });
    }

    const profile_data = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token")
        );

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/details", requestOptions)
            .then(response => response.json())
            .then(result => {
                setdetail(result.data)
                console.log(result.data)
                setTimeout(() => {
                    const x = (Object.keys(detailprovider).forEach(function (key) {
                        (detailprovider[key] = (result.data[key] != null ? result.data[key] : ""))
                    }))
                    setrefresh(result.data)

                }, 500);
                setTimeout(() => {
                    setdetailprovide({ ...detailprovider, plateformsocialmedia: detailprovider.plateformsocialmedia != "" ? detailprovider.plateformsocialmedia : "Yes" })
                }, 700);
                setexperience(result.data.nanyyearexp != null ? result.data.nanyyearexp : 0)
                setrange(result.data.setyearexp != null ? result.data.setyearexp : 0)
                setsepworkexp(result.data.sepworkexp != null ? result.data.sepworkexp : 0)
                setutorexperience(result.data.tutorexp != null ? result.data.tutorexp : 0)
                setallapplicable(result.data.nanyallapplicable != null ? result.data.nanyallapplicable : [])
                setusd({
                    min: result.data.nanyperhrrate != null ? result.data.nanyperhrrate.substr(result.data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0] : 0,
                    max: result.data.nanyperhrrate != null ? result.data.nanyperhrrate.substr(result.data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] > 0 ? result.data.nanyperhrrate.substr(result.data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] : 60 : 60
                })
                settutorusd({
                    min: result.data.tutorperhrrate != null ? result.data.tutorperhrrate.substr(result.data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] : 0,
                    max: result.data.tutorperhrrate != null ? result.data.tutorperhrrate.substr(result.data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] > 0 ? result.data.tutorperhrrate.substr(result.data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] : 60 : 60
                })
                setusd3({
                    min: result.data.seterhrrate != null ? result.data.seterhrrate.substr(result.data.seterhrrate.lastIndexOf('\\') + 1).split('-')[0] : 0,
                    max: result.data.seterhrrate != null ? result.data.seterhrrate.substr(result.data.seterhrrate.lastIndexOf('\\') + 1).split('-')[1] > 0 ? result.data.seterhrrate.substr(result.data.seterhrrate.lastIndexOf('\\') + 1).split('-')[1] : 60 : 60
                })
                setusd4({
                    min: result.data.seperhrrate != null ? result.data.seperhrrate.substr(result.data.seperhrrate.lastIndexOf('\\') + 1).split('-')[0] : 0,
                    max: result.data.seperhrrate != null ? result.data.seperhrrate.substr(result.data.seperhrrate.lastIndexOf('\\') + 1).split('-')[1] > 0 ? result.data.seperhrrate.substr(result.data.seperhrrate.lastIndexOf('\\') + 1).split('-')[1] : 60 : 60
                })
                setnchildren(result.data.nanyworkwithnochild != null ? result.data.nanyworkwithnochild : "")
                setchildren_age(result.data.tutorprefchildage != null ? result.data.tutorprefchildage : [])
                setchildren(result.data.nanyworkwithnochild != null ? result.data.tutorworkwithnochild : "")
                setselectcat(result.data.tutorallapplicable != null ? result.data.tutorallapplicable : [])
                setchildren_age2(result.data.nanyprefchildage != null ? result.data.nanyprefchildage : [])
                setsepallapplicable(result.data.sepallapplicable != null ? result.data.sepallapplicable : [])
                setsetallapplicable2(result.data.setallapplicable != null ? result.data.setallapplicable : [])
                setqualifications(result.data.tutorliketoteach != null ? result.data.tutorliketoteach : {})
                sethabit({
                    smoke: result.data.smoke ? result.data.smoke : "",
                    licence: result.data.carorlicence ? result.data.carorlicence : "",
                    kids: result.data.cooking ? result.data.cooking : "",
                    housework: result.data.lighthousework ? result.data.lighthousework : "",
                    family: result.data.traveling ? result.data.traveling : ""
                })

                setmethods(
                    result.data.setexpmethods ? JSON.parse(result.data.setexpmethods) : methods
                )
                setlanguages(
                    result.data.englishlevel != null ? [{ name: result.data.englishlevel }] : result.data.frenchlevel != null ? [{ name: result.data.frenchlevel }] : result.data.italianlevel != null ? [{ name: result.data.italianlevel }] : result.data.germanlevel != null ? [{ name: result.data.germanlevel }] : result.data.spanishlevel != null ? [{ name: result.data.spanishlevel }] : result.data.chineselevel != null ? [{ name: result.data.chineselevel }] : result.data.otherlevel != null ? [{ name: result.data.otherlevel }] : []
                )
                if (result.data.qualificationscertificatesname != null && result.data.qualificationscertificatesname[0]) {
                    var iterator = result.data.qualificationscertificatesname.values();
                    var y = {}

                    for (let elements of iterator) {
                        if (elements == "First Aid") {
                            y = { ...y, qualificationscertificatesname: elements }
                        }
                        else if (elements == "Montessori") {
                            y = { ...y, qualificationscertificatesname2: elements }
                        }
                        else if (elements == "Board Certified Nurse") {
                            y = { ...y, qualificationscertificatesname3: elements }
                        }
                        else if (elements != "First Aid" && elements != "Montessori" && elements != "Board Certified Nurse") {
                            setcertificates({ ...certificates, ...y, qualificationscertificatesname4: elements != null ? elements : "" })
                        }
                    }
                }
                setdetail(result.data)
                setstap(result.data.step != null ? parseInt(result.data.step) <= 7 ? result.data.plateformsocialmedia ? 1 : parseInt(result.data.step) : 1 : 1)
            })
            .catch(error => console.log('error', error));
    }

    const mobileverify = () => {
        if (detailprovider.phone.length > 9) {
            setdis(true)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "phonenoforverify": contact_code.code != "" ? contact_code.code + detailprovider.phone : ("+" + detailprovider.countrycode) + detailprovider.phone,
                "phone": detailprovider.phone,
                "countrycode": contact_code.code != "" ? contact_code.code : detailprovider.countrycode
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(api + "/api/v1/sendotp", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setdis(false)
                    console.log(result)
                })
                .catch(error => {
                    setdis(false)
                    console.log('error', error)
                });
        } else {
            seterror({
                ...error,
                phone: "error"
            })
        }
    }
    const [failed, setfailed] = useState(0)
    const otpverify = () => {
        if (otp.length > 3) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "phonetoken": otp,
                "phone": detailprovider.phone,
                "countrycode": contact_code.code != "" ? contact_code.code : detailprovider.countrycode
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(api + "/api/v1/verifyotp", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setveri(result.success ? "done" : "")
                    setfailed(failed + 1)
                    result.success == true ? document.getElementById("success").style.display = "block" : document.getElementById("success").style.display = "none"
                    result.message == "failed" && failed == 0 ? document.getElementById("success4").style.display = "block" : document.getElementById("success4").style.display = "none"
                    result.message == "failed" && failed == 1 ? document.getElementById("success3").style.display = "block" : document.getElementById("success3").style.display = "none"
                })
                .catch(error => console.log('error', error));
        } else {
            seterror({
                ...error,
                otperror: "error"
            })
        }
    }
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
        // cv: "",
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
        yearofexpasteacher: ""
    })
    const after_logins_field = (name) => {
        setrefresh()
        switch (name) {
            case 'about':
                errorfield.about =
                    detailprovider.about == ''
                        ? "required"
                        : "";
                break;
            case 'profile_headline':
                errorfield.profile_headline =
                    detailprovider.profile_headline == ''
                        ? "required"
                        : "";
                break;
            case 'video':
                errorfield.video =
                    detailprovider.video != ''
                        ? "" : "required";

                break;
            case 'file_path':
                errorfield.file_path =
                    detailprovider.file_path != '' ? "" : "required";
                break;
            case 'educationlevel':
                errorfield.educationlevel =
                    detailprovider.educationlevel != '' ? "" : "required";
                break;
            case 'school':
                errorfield.school =
                    detailprovider.school != '' ? "" : "required";
                break;
            case 'yearawarded':
                errorfield.yearawarded =
                    detailprovider.yearawarded != '' ? "" : "required";
                break;
            case 'recommendationsfile':
                errorfield.recommendationsfile =
                    detailprovider.recommendationsfile != '' ? "" : "required";
                break;
            case 'qualificationscertificatesname':
                errorfield.qualificationscertificatesname =
                    detailprovider.qualificationscertificatesname != '' ? "" : "required";
                break;
            case 'cv':
                errorfield.cv =
                    detailprovider.cv != '' ? "" : "required";
                break;
            case 'qualificationscertificatesdoc':
                errorfield.qualificationscertificatesdoc =
                    detailprovider.qualificationscertificatesdoc != '' ? "" : "required";
                break;
            case 'nanynewbornexp':
                errorfield.nanynewbornexp =
                    detailprovider.nanynewbornexp != '' ? "" : "required";
                break;
            case 'nanyyearexp':
                errorfield.nanyyearexp =
                    experience == 0 ? "required" : "";
                break;
            case 'setareaexperties':
                errorfield.setareaexperties =
                    detailprovider.setareaexperties != '' ? "" : "required";
                break;
            case 'setexpmethods':
                errorfield.setexpmethods =
                    methods.setexpmethods != "" || methods.setexpmethods2 != "" || methods.setexpmethods3 != "" || methods.setexpmethods4 != "" ? "" : "required";
                break;
            case 'setexpiep':
                errorfield.setexpiep =
                    detailprovider.setexpiep != '' ? "" : "required";
                break;
            case 'setyearexp':
                errorfield.setyearexp =
                    range > 0 ? "" : "required";
                break;
            case 'setallapplicable':
                errorfield.setallapplicable =
                    setallapplicable2[0] ? "" : "required";
                break;
            case 'nanyexpwithkid':
                errorfield.nanyexpwithkid =
                    detailprovider.nanyexpwithkid != '' ? "" : "required";
                break;
            case 'tutorexp':
                errorfield.tutorexp =
                    utorexperience > 0 ? "" : "required";
                break;
            case 'sepexpwithkid':
                errorfield.sepexpwithkid =
                    detailprovider.sepexpwithkid != '' ? "" : "required";
                break;
            case 'sepworkexp':
                errorfield.sepworkexp =
                    sepworkexp == 0 ? "required" : "";
                break;

            case 'nanyallapplicable':
                errorfield.nanyallapplicable =
                    detailprovider.nanyallapplicable != '' ? "" : "required";
                break;
            case 'sepallapplicable':
                errorfield.sepallapplicable =
                    detailprovider.sepallapplicable != '' ? "" : "required";
                break;
            case 'sepexpmethods':
                errorfield.sepexpmethods =
                    detailprovider.sepexpmethods != '' ? "" : "required";
                break;

            case 'nanyperhrrate':
                errorfield.nanyperhrrate =
                    usd.max == 0 ? "required" : "";
                break;
            case 'seterhrrate':
                errorfield.seterhrrate =
                    usd3.max == 0
                        ? "required"
                        : "";
                break;
            case 'seperhrrate':
                errorfield.seperhrrate =
                    usd4.max == 0
                        ? "required"
                        : "";
                break;
            case 'tutorintrestedonlinecls':
                errorfield.tutorintrestedonlinecls =
                    detailprovider.tutorintrestedonlinecls != '' ? "" : "required";
                break;
            case 'tutorintrestedinschool':
                errorfield.tutorintrestedinschool =
                    detailprovider.tutorintrestedinschool != '' ? "" : "required";
                break;
            case 'tutorallapplicable':
                errorfield.tutorallapplicable =
                    detailprovider.tutorallapplicable != '' ? "" : "required";
                break;
            case 'tutorperhrrate':
                errorfield.tutorperhrrate =
                    tutorusd.max == 0 ? "required" : "";
                break;
            case 'tutorworkwithnochild':
                errorfield.tutorworkwithnochild =
                    children != "" ? ""
                        : "required";
                break;

            case 'tutorprefchildage':
                errorfield.tutorprefchildage =
                    !children_age[0]
                        ? "required"
                        : "";
                break;
            case 'tutorstartdate':
                errorfield.tutorstartdate =
                    detailprovider.tutorstartdate == ''
                        ? "required"
                        : "";
                break;
            case 'tutorintrestedin':
                errorfield.tutorintrestedin =
                    detailprovider.tutorintrestedin == ''
                        ? "required"
                        : "";
                break;
            case 'yearofexpasteacher':
                errorfield.yearofexpasteacher =
                    detailprovider.yearofexpasteacher == 0
                        ? "required"
                        : "";
                break;

            case 'tutorliketoteach':
                errorfield.tutorliketoteach =
                    qualifications.English || qualifications.Serbian || qualifications.Mathematics || qualifications.Physics || qualifications.Chemistry || qualifications.Other
                        ? ""
                        : "required";
                break;

            case 'nanyhrrate':
                errorfield.nanyhrrate =
                    detailprovider.nanyhrrate == ''
                        ? "required"
                        : "";
                break;
            case 'nanyintrestedinschool':
                errorfield.nanyintrestedinschool =
                    detailprovider.nanyintrestedinschool == ''
                        ? "required"
                        : "";
                break;
            case 'nanyworkwithnochild':
                errorfield.nanyworkwithnochild =
                    children == ""
                        ? "required"
                        : "";
                break;
            case 'nanystartdate':
                errorfield.nanystartdate =
                    detailprovider.nanystartdate == ''
                        ? "required"
                        : "";
                break;
            case 'nanyprefchildage':
                errorfield.nanyprefchildage =
                    children_age2[0]
                        ? ""
                        : "required";
                break;
            case 'nanyintrestedin':
                errorfield.nanyintrestedin =
                    detailprovider.nanyintrestedin == ''
                        ? "required"
                        : "";
                break;
            case 'fulltime':
                errorfield.fulltime =
                    detailprovider.fulltime == ''
                        ? "required"
                        : "";
                break;
            case 'beforeschool':
                errorfield.beforeschool =
                    detailprovider.beforeschool == ''
                        ? "required"
                        : "";
                break;
            case 'afterschool':
                errorfield.afterschool =
                    detailprovider.afterschool == ''
                        ? "required"
                        : "";
                break;
            case 'overnight':
                errorfield.overnight =
                    detailprovider.overnight == ''
                        ? "required"
                        : "";
                break;
            case 'weekends':
                errorfield.weekends =
                    detailprovider.weekends == ''
                        ? "required"
                        : "";
                break;
            case 'englishlevel':
                errorfield.englishlevel =
                    detailprovider.englishlevel == ''
                        ? "required"
                        : "";
                break;
            case 'italianlevel':
                errorfield.italianlevel =
                    detailprovider.italianlevel == ''
                        ? "required"
                        : "";
                break;
            case 'spanishlevel':
                errorfield.spanishlevel =
                    detailprovider.spanishlevel == ''
                        ? "required"
                        : "";
                break;
            case 'germanlevel':
                errorfield.germanlevel =
                    detailprovider.germanlevel == ''
                        ? "required"
                        : "";
                break;
            case 'chineselevel':
                errorfield.chineselevel =
                    detailprovider.chineselevel == ''
                        ? "required"
                        : "";
                break;
            case 'frenchlevel':
                errorfield.frenchlevel =
                    detailprovider.frenchlevel == ''
                        ? "required"
                        : "";
                break;
            case 'otherlangname':
                errorfield.otherlangname =
                    detailprovider.otherlangname == ''
                        ? "required"
                        : "";
                break;
            case 'otherlevel':
                errorfield.otherlevel =
                    detailprovider.otherlevel == ''
                        ? "required"
                        : "";
                break;
            case 'phone':
                errorfield.phone =
                    detailprovider.phone == '' ||
                        otp == '' || (detail.phoneVerifiedStatus != 1 || veri != "done")
                        ? "required"
                        : "";
                break;
            case 'backgrounddoc':
                errorfield.backgrounddoc =
                    detailprovider.backgrounddoc == ''
                        ? "required"
                        : "";
                break;
            case 'backgroundstatus':
                errorfield.backgroundstatus =
                    detailprovider.backgroundstatus == ''
                        ? "required"
                        : "";
                break;
            case 'smoke':
                errorfield.smoke =
                    habit.smoke == ''
                        ? "required"
                        : "";
                break;
            case 'carorlicence':
                errorfield.carorlicence =
                    habit.licence == ''
                        ? "required"
                        : "";
                break;
            case 'cooking':
                errorfield.cooking =
                    habit.kids == ''
                        ? "required"
                        : "";
                break;
            case 'lighthousework':
                errorfield.lighthousework =
                    habit.housework == ''
                        ? "required"
                        : "";
                break;
            case 'traveling':
                errorfield.traveling =
                    habit.family == ''
                        ? "required"
                        : "";
                break;
            case 'workingabroad':
                errorfield.workingabroad =
                    detailprovider.workingabroad == ''
                        ? "required"
                        : "";
                break;
            case 'livewithfamily':
                errorfield.livewithfamily =
                    detailprovider.livewithfamily == ''
                        ? "required"
                        : "";
                break;
            case 'anyallergies':
                errorfield.anyallergies =
                    detailprovider.anyallergies == ''
                        ? "required"
                        : "";
                break;

            case 'anyallergiesdescription':
                errorfield.anyallergiesdescription =
                    detailprovider.anyallergiesdescription == ''
                        ? "required"
                        : "";
                break;
            case 'medicalcondition':
                errorfield.medicalcondition =
                    detailprovider.medicalcondition == ''
                        ? "required"
                        : "";
                break;
            case 'medicalconditiondescription':
                errorfield.medicalconditiondescription =
                    detailprovider.medicalconditiondescription == ''
                        ? "required"
                        : "";
                break;
            case 'plateformsocialmedia':
                errorfield.plateformsocialmedia =
                    detailprovider.plateformsocialmedia == ''
                        ? "required"
                        : "";
                break;

            default:
                break;
        }
        seterrorfield(errorfield)
        setTimeout(() => {
            setdetail(detail)
            setrefresh(name)
            window.scrollTo({ top: 0 });
        }, 1000);
    }
    const step1 = [
        { name: "about" },
        { name: "file_path" },
        { name: "profile_headline" }
    ]
    const step2 = [
        { name: "educationlevel" },
        { name: "school" },
        { name: "yearawarded" },
        { name: "recommendationsfile" },
        { name: "qualificationscertificatesname" },
        { name: "cv" },
        { name: "qualificationscertificatesdoc" },
    ]
    const step3 = [
        { name: "nanynewbornexp" },
        { name: "nanyallapplicable" },
        { name: "nanyexpwithkid" },
        { name: "setallapplicable" },
        { name: "setexpmethods" },
        { name: "setexpiep" },
        { name: "setyearexp" },
        { name: "sepallapplicable" },
        { name: "sepexpmethods" },
        { name: "sepworkexp" },
        { name: "sepexpwithkid" },
        { name: "tutorexp" },
        { name: "nanyyearexp" },
    ]
    const step4 = [
        { name: "nanyperhrrate" },
        { name: "tutorliketoteach" },
        { name: "tutorintrestedonlinecls" },
        { name: "tutorperhrrate" },
        { name: "tutorintrestedinschool" },
        { name: "tutorallapplicable" },
        { name: "tutorworkwithnochild" },
        { name: "tutorprefchildage" },
        { name: "tutorstartdate" },
        { name: "tutorintrestedin" },
        { name: "nanyintrestedinschool" },
        { name: "nanyworkwithnochild" },
        { name: "nanyprefchildage" },
        { name: "nanystartdate" },
        { name: "nanyintrestedin" },
        { name: "setareaexperties" },
        { name: "seperhrrate" },
        { name: "seterhrrate" },
        { name: "yearofexpasteacher" }
    ]
    const step5 = [
        { name: "fulltime" },
        { name: "beforeschool" },
        { name: "afterschool" },
        { name: "overnight" },
        { name: "weekends" },
    ]
    const step6 = [
        { name: "englishlevel" },
        { name: "italianlevel" },
        { name: "spanishlevel" },
        { name: "germanlevel" },
        { name: "chineselevel" },
        { name: "frenchlevel" },
        { name: "otherlangname" },
        { name: "otherlevel" },
        { name: "smoke" },
        { name: "carorlicence" },
        { name: "cooking" },
        { name: "lighthousework" },
        { name: "traveling" },
        { name: "workingabroad" },
        { name: "livewithfamily" },
        { name: "anyallergies" },
        { name: "anyallergiesdescription" },
        { name: "medicalcondition" },
        { name: "medicalconditiondescription" },
    ]
    const step7 = [
        { name: "plateformsocialmedia" },
        { name: "phone" },
        { name: "backgrounddoc" },
        { name: "backgroundstatus" },
    ]
    const [laveo, setlavelo] = useState(false)
    const [awarded, setawarded] = useState(false)
    useEffect(() => {
        if (count) {
            profile_data()
            setcount(false)
            localStorage.getItem("user_type") == "provider" ? localStorage.getItem("user_type") : window.location.replace("/complete-parents-profile")
        }
    }, [detail, experience, detailprovider, habit, methods, error, stap, refresh, errorfield])



    const handleResponse = (data) => {
        console.log(data)
        if (data.profile.type) {
            setdetailprovide({ ...detailprovider, linkdinverify: true })
        } else {
            setdetailprovide({ ...detailprovider, facebookverify: true })
        }
    }

    const handleError = (error) => {
        console.log({ error });
    }

    return (
        <>
            <Header page={"proile"} />
            <div className='container-fluid'>
                <div className='container'>
                    <div className='Profile_complete'>
                        <div className='left'>
                            <div className='stop'>
                                <h3>Profile progress <span>{process}%</span></h3>
                                <span>
                                    <div class="progress">
                                        <div class="color" style={{ width: process + "%" }}></div>
                                    </div>

                                </span>
                            </div>
                            <div class={"progress-circle" + ' ' + "p" + process + ' ' + (process > 50 ? "over50" : "")}>
                                <span>{process}%</span>
                                <div class="left-half-clipper">
                                    <div class="first50-bar"></div>
                                    <div class="value-bar"></div>
                                </div>
                            </div>
                            <ul style={window.screen.width < 767 ? { transform: "translateX(" + mobile + "% )" } : {}}>
                                <li onClick={e => {
                                    if (detail.plateformsocialmedia && detail.plateformsocialmedia) {
                                        setstap(1)
                                    }
                                }} className={stap == 1 ? "active" : stap >= 1 ? "active2" : ""}>
                                    <span></span>
                                    <p ><b>About you</b></p>
                                </li>
                                <li onClick={e => {
                                    if (detail.plateformsocialmedia && detail.plateformsocialmedia) {
                                        setstap(2)
                                    }
                                }} className={stap == 2 ? "active" : stap >= 2 ? "active2" : ""}>
                                    <span></span>
                                    <p ><b>Education</b></p>
                                </li>
                                <li onClick={e => {
                                    if (detail.plateformsocialmedia && detail.plateformsocialmedia) {
                                        setstap(3)
                                    }
                                }} className={stap == 3 ? "active" : stap >= 3 ? "active2" : ""}>
                                    <span></span>
                                    <p ><b>Work Experience</b></p>
                                </li>
                                <li onClick={e => {
                                    if (detail.plateformsocialmedia && detail.plateformsocialmedia) {
                                        setstap(4)
                                    }
                                }} className={stap == 4 ? "active" : stap >= 4 ? "active2" : ""}>
                                    <span></span>
                                    <p ><b>Job Preferences</b></p>
                                </li>
                                <li onClick={e => {
                                    if (detail.plateformsocialmedia && detail.plateformsocialmedia) {
                                        setstap(5)
                                        setTimeout(() => {
                                            setcalandertype(1)
                                        }, 500);
                                    }
                                }}
                                    className={stap == 5 ? "active" : stap >= 5 ? "active2" : ""} >
                                    <span></span>
                                    <p ><b>Availability</b></p>
                                </li>
                                <li onClick={e => {
                                    if (detail.plateformsocialmedia && detail.plateformsocialmedia) {
                                        setstap(6)
                                    }
                                }} className={stap == 6 ? "active" : stap >= 6 ? "active2" : ""}>
                                    <span></span>
                                    <p ><b>Additional Info</b></p>
                                </li>
                                <li onClick={e => {
                                    if (detail.plateformsocialmedia && detail.plateformsocialmedia) {
                                        setstap(7)
                                    }
                                }} className={stap == 7 ? "active" : stap >= 7 ? "active2" : ""}>
                                    <span></span>
                                    <p ><b>Security and Verification</b></p>
                                </li>
                            </ul>
                        </div>
                        <div className='right'>
                            <div className='detail job_post stap1' style={stap == 1 ? {} : { "display": "none" }}>
                                <h2 className='border'>Welcome <span>{detail.username ? detail.username : ""}</span>, please complete your profile </h2>
                                <span>Please fill out all (*) required fields.</span>

                                <div className='form_group full'>
                                    <label>Your profile headline<span className={errorfield.profile_headline != "" ? "starred" : ""}>*</span></label>
                                    {detail.service_type ?
                                        <textarea placeholder={
                                            detail.service_type ? 'Experienced ' + (Object.values(detail.service_type)[0]) + ' with 10 years of experience.' : ""}
                                            rows={2} className={errorfield.profile_headline != "" ? "bordererror" : ""} maxlength="70" name='message' defaultValue={detailprovider.profile_headline} onChange={e => {
                                                seterrorfield({ ...errorfield, profile_headline: "" })
                                                setdetailprovide({ ...detailprovider, profile_headline: e.target.value })
                                            }}
                                        ></textarea>
                                        : ""
                                    }
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                    <span>Number of characters {(70 - detailprovider.profile_headline.length)}</span>
                                </div>
                                <div className='form_group full sec'>
                                    <label>Tell us more about yourself<span className={errorfield.about != "" ? "starred" : ""}>*</span></label>
                                    {detail.service_type ?
                                        <textarea placeholder={
                                            detail.service_type ? Object.keys(detail.service_type).filter((e) => e == "tab2")[0] ? "My name is Jelena and I am a reliable and experienced special education teacher. I’ve been working with kids with developmental disabilities for the past 5 years and I am very passionate and committed to make meaningful progress in their life. Upon request, I can share my background check along with the references of the previous employee. I am CPR and First Aid certificated." :
                                                Object.keys(detail.service_type).filter((e) => e == "tab1")[0] ? "Working with children is my passion and inspiration. Every day is very rewarding because I have learnt so much from kids and together we make the world a better place. I build a caring and respectful relationship with children and their families, and prepare them to become independent and self-reliant. I believe that each child has a unique set of skills and my goal is to help children discover and develop their interests which will make them happy. I am CPR and First Aid certificated." :
                                                    Object.keys(detail.service_type).filter((e) => e == "tab4")[0] ? "My name is Jelena and I am a reliable and experienced tutor. I’ve been working with students for the past 5 years and I am very passionate and committed to make meaningful progress in their life. Upon request, I can share my background check along with the references of the previous employers."
                                                        : Object.keys(detail.service_type).filter((e) => e == "tab3")[0] ? "My name is Jelena and I am a reliable and experienced special education paraprofessional. I’ve been working with kids with developmental disabilities for the past 5 years and I am very passionate and committed to make meaningful progress in their life. Upon request, I can share my background check along with the references of the previous employee. I am CPR and First Aid certificated." : "" : ""
                                        } rows={4} className={errorfield.about != "" ? "bordererror" : ""} maxlength="300" name='message' defaultValue={detailprovider.about} onChange={e => {
                                            seterrorfield({ ...errorfield, about: "" })
                                            setdetailprovide({ ...detailprovider, about: e.target.value })
                                        }} ></textarea> : ""}
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                    <span>Number of characters  {(300 - detailprovider.about.length)} </span>
                                </div>
                                <div className='form_group'>
                                    <label>Upload your profile <a>picture </a><span className='smallpop'><strong>Choice</strong> and <strong>Premium</strong> members may upload more photos later.</span><span className={errorfield.file_path != "" ? "starred" : ""}>*</span></label>
                                    <div className='upload'>
                                        <input type="file" placeholder="Choose file" className={errorfield.file_path != "" ? "bordererror" : ""} onChange={e => {
                                            seterrorfield({ ...errorfield, file_path: "" })
                                            setdetailprovide({ ...detailprovider, file_path: e.target.files[0] })
                                        }} accept="image/*" />
                                        <span className={errorfield.file_path != "" ? "bordererror" : ""}>{detailprovider.file_path != "" ? detailprovider.file_path.name ? detailprovider.file_path.name : detailprovider.file_path :
                                            "Choose file"}</span>
                                        <button>
                                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.909091 9.09091C1.41117 9.09091 1.81818 9.49792 1.81818 10V17.2727C1.81818 17.5138 1.91396 17.7451 2.08445 17.9156C2.25494 18.086 2.48617 18.1818 2.72727 18.1818H13.6364C13.8775 18.1818 14.1087 18.086 14.2792 17.9156C14.4497 17.7451 14.5455 17.5138 14.5455 17.2727V10C14.5455 9.49792 14.9525 9.09091 15.4545 9.09091C15.9566 9.09091 16.3636 9.49792 16.3636 10V17.2727C16.3636 17.996 16.0763 18.6897 15.5648 19.2012C15.0534 19.7127 14.3597 20 13.6364 20H2.72727C2.00395 20 1.31026 19.7127 0.7988 19.2012C0.287337 18.6897 0 17.996 0 17.2727V10C0 9.49792 0.407014 9.09091 0.909091 9.09091Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53899 0.266267C7.89402 -0.0887555 8.46962 -0.0887555 8.82464 0.266267L12.461 3.90263C12.816 4.25765 12.816 4.83326 12.461 5.18828C12.106 5.5433 11.5304 5.5433 11.1754 5.18828L8.18182 2.19474L5.18828 5.18828C4.83326 5.5433 4.25765 5.5433 3.90263 5.18828C3.54761 4.83326 3.54761 4.25765 3.90263 3.90263L7.53899 0.266267Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.18182 1.35465e-08C8.6839 1.35465e-08 9.09091 0.407014 9.09091 0.909091V12.7273C9.09091 13.2294 8.6839 13.6364 8.18182 13.6364C7.67974 13.6364 7.27273 13.2294 7.27273 12.7273V0.909091C7.27273 0.407014 7.67974 1.35465e-08 8.18182 1.35465e-08Z" fill="white" />
                                            </svg>

                                        </button>
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='form_group'>
                                    <label>Upload  <a>video </a>  <span className='smallpop'>This feature is available for <strong>Premium</strong> members. </span>presentation of yourself </label>
                                    <div className='upload'>
                                        <input type="file" placeholder="choose file" onChange={e => setdetailprovide({ ...detailprovider, video: e.target.files[0] })} accept="video/*" />
                                        <span>{detailprovider.video != "" ? detailprovider.video.name ? detailprovider.video.name : detailprovider.video :
                                            "Choose file"}</span>
                                        <button>
                                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.909091 9.09091C1.41117 9.09091 1.81818 9.49792 1.81818 10V17.2727C1.81818 17.5138 1.91396 17.7451 2.08445 17.9156C2.25494 18.086 2.48617 18.1818 2.72727 18.1818H13.6364C13.8775 18.1818 14.1087 18.086 14.2792 17.9156C14.4497 17.7451 14.5455 17.5138 14.5455 17.2727V10C14.5455 9.49792 14.9525 9.09091 15.4545 9.09091C15.9566 9.09091 16.3636 9.49792 16.3636 10V17.2727C16.3636 17.996 16.0763 18.6897 15.5648 19.2012C15.0534 19.7127 14.3597 20 13.6364 20H2.72727C2.00395 20 1.31026 19.7127 0.7988 19.2012C0.287337 18.6897 0 17.996 0 17.2727V10C0 9.49792 0.407014 9.09091 0.909091 9.09091Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53899 0.266267C7.89402 -0.0887555 8.46962 -0.0887555 8.82464 0.266267L12.461 3.90263C12.816 4.25765 12.816 4.83326 12.461 5.18828C12.106 5.5433 11.5304 5.5433 11.1754 5.18828L8.18182 2.19474L5.18828 5.18828C4.83326 5.5433 4.25765 5.5433 3.90263 5.18828C3.54761 4.83326 3.54761 4.25765 3.90263 3.90263L7.53899 0.266267Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.18182 1.35465e-08C8.6839 1.35465e-08 9.09091 0.407014 9.09091 0.909091V12.7273C9.09091 13.2294 8.6839 13.6364 8.18182 13.6364C7.67974 13.6364 7.27273 13.2294 7.27273 12.7273V0.909091C7.27273 0.407014 7.67974 1.35465e-08 8.18182 1.35465e-08Z" fill="white" />
                                            </svg>

                                        </button>
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='button'>
                                    <button onClick={e => {
                                        if (detailprovider.about != "" && detailprovider.profile_headline != "" && detailprovider.file_path != "") {
                                            stapset(2)
                                            setmobile(-12)
                                            window.scrollTo({ top: 0 });
                                            profile_update(false)
                                        } else {
                                            step1.map((e) => {
                                                after_logins_field(e.name)
                                            })
                                        }

                                    }}>Next</button>
                                </div>
                            </div>
                            {/**/}
                            <div className='detail stap2' style={stap == 2 ? {} : { "display": "none" }}>

                                <div className='form_group'>
                                    <label>Education Level<span className={errorfield.educationlevel != "" ? "starred" : ""}>*</span></label>
                                    <div className='text'>
                                        <span onClick={e => {
                                            seterrorfield({ ...errorfield, educationlevel: "" })
                                            setlavelo(laveo ? false : true)
                                        }}>{detailprovider.educationlevel ? detailprovider.educationlevel : "Choose from the list"}
                                            {laveo ?
                                                <div className='Hoverclose second' onClick={e => {
                                                    setlavelo(laveo ? false : true)
                                                }}></div> : ""}
                                        </span>
                                        <div classes="select_data">
                                            <ul style={laveo ? { display: "block" } : { display: "none" }}>
                                                <li onClick={e => {
                                                    setlavelo(laveo ? false : true)
                                                    setdetailprovide({ ...detailprovider, educationlevel: "High school" })
                                                }}>High school</li>
                                                <li onClick={e => {
                                                    setlavelo(laveo ? false : true)

                                                    setdetailprovide({ ...detailprovider, educationlevel: "Bachelor" })
                                                }}>Bachelor</li>
                                                <li onClick={e => {
                                                    setlavelo(laveo ? false : true)

                                                    setdetailprovide({ ...detailprovider, educationlevel: "Master" })
                                                }}>Master</li>
                                                <li onClick={e => {
                                                    setlavelo(laveo ? false : true)
                                                    setdetailprovide({ ...detailprovider, educationlevel: "PhD" })
                                                }}>PhD</li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='form_group'>
                                    <label>Name of your school/university<span className={errorfield.school != "" ? "starred" : ""}>*</span></label>
                                    <div className='text'>
                                        <input type="text" placeholder="Type here" onChange={e => {
                                            seterrorfield({ ...errorfield, school: "" })
                                            setdetailprovide({ ...detailprovider, school: e.target.value })
                                        }} defaultValue={detailprovider.school} />
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='form_group'>
                                    <label>Graduation Status<span className={errorfield.yearawarded != "" ? "starred" : ""}>*</span></label>
                                    <div className='text'>
                                        <span onClick={e => {
                                            seterrorfield({ ...errorfield, yearawarded: "" })
                                            setawarded(awarded ? false : true)
                                        }}>{detailprovider.yearawarded ? detailprovider.yearawarded : "Choose from the list"}
                                            {awarded ?
                                                <div className='Hoverclose second' onClick={e => {
                                                    setawarded(awarded ? false : true)
                                                }}></div> : ""}
                                        </span>
                                        <div classes="select_data">
                                            <ul style={awarded ? { display: "block" } : { display: "none" }}>
                                                <li onClick={e => {
                                                    setawarded(awarded ? false : true)
                                                    setdetailprovide({ ...detailprovider, yearawarded: "In process" })
                                                }}>In process</li>
                                                <li onClick={e => {
                                                    setawarded(awarded ? false : true)
                                                    setdetailprovide({ ...detailprovider, yearawarded: "Graduated" })
                                                }}>Graduated</li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='form_group'>
                                    <label>Upload your  <a>recommendations </a><span className='smallpop'>Recommendations will be not publicly available. You are encouraged to share recommendations with prospective employer upon their request.</span></label>
                                    <div className='upload'>
                                        <input type="file" placeholder='Choose file' onChange={e => {
                                            seterrorfield({ ...errorfield, recommendationsfile: "" })
                                            setdetailprovide({ ...detailprovider, recommendationsfile: e.target.files[0] })
                                        }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" />
                                        <span>{detailprovider.recommendationsfile != "" ? detailprovider.recommendationsfile.name ? detailprovider.recommendationsfile.name : detailprovider.recommendationsfile : "Choose file"}</span>
                                        <button>
                                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.909091 9.09091C1.41117 9.09091 1.81818 9.49792 1.81818 10V17.2727C1.81818 17.5138 1.91396 17.7451 2.08445 17.9156C2.25494 18.086 2.48617 18.1818 2.72727 18.1818H13.6364C13.8775 18.1818 14.1087 18.086 14.2792 17.9156C14.4497 17.7451 14.5455 17.5138 14.5455 17.2727V10C14.5455 9.49792 14.9525 9.09091 15.4545 9.09091C15.9566 9.09091 16.3636 9.49792 16.3636 10V17.2727C16.3636 17.996 16.0763 18.6897 15.5648 19.2012C15.0534 19.7127 14.3597 20 13.6364 20H2.72727C2.00395 20 1.31026 19.7127 0.7988 19.2012C0.287337 18.6897 0 17.996 0 17.2727V10C0 9.49792 0.407014 9.09091 0.909091 9.09091Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53899 0.266267C7.89402 -0.0887555 8.46962 -0.0887555 8.82464 0.266267L12.461 3.90263C12.816 4.25765 12.816 4.83326 12.461 5.18828C12.106 5.5433 11.5304 5.5433 11.1754 5.18828L8.18182 2.19474L5.18828 5.18828C4.83326 5.5433 4.25765 5.5433 3.90263 5.18828C3.54761 4.83326 3.54761 4.25765 3.90263 3.90263L7.53899 0.266267Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.18182 1.35465e-08C8.6839 1.35465e-08 9.09091 0.407014 9.09091 0.909091V12.7273C9.09091 13.2294 8.6839 13.6364 8.18182 13.6364C7.67974 13.6364 7.27273 13.2294 7.27273 12.7273V0.909091C7.27273 0.407014 7.67974 1.35465e-08 8.18182 1.35465e-08Z" fill="white" />
                                            </svg>

                                        </button>
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='form_group qualification set'>
                                    <label>Professional qualifications and certificates</label>
                                    <div className='checkbox'>
                                        <ul onClick={e => seterrorfield({ ...errorfield, qualificationscertificatesname: "" })}>
                                            <li><input type="checkbox" name="" onClick={e => {
                                                if (e.target.checked) {
                                                    setcertificates({ ...certificates, qualificationscertificatesname: "First Aid" })
                                                }
                                                else {
                                                    setcertificates({ ...certificates, qualificationscertificatesname: "" })
                                                }
                                            }} checked={certificates.qualificationscertificatesname == "First Aid" ? true : false} /><span> First Aid</span></li>
                                            <li><input type="checkbox" name="" onClick={e => {
                                                if (e.target.checked) {
                                                    setcertificates({ ...certificates, qualificationscertificatesname3: "Board Certified Nurse" })
                                                } else {
                                                    setcertificates({ ...certificates, qualificationscertificatesname3: "" })
                                                }
                                            }} checked={certificates.qualificationscertificatesname3 == "Board Certified Nurse" ? true : false} /><span>Board Certified Nurse</span></li>
                                            <li><input type="checkbox" name="" onClick={e => {
                                                if (e.target.checked) {
                                                    setcertificates({ ...certificates, qualificationscertificatesname2: "Montessori" })
                                                } else {
                                                    setcertificates({ ...certificates, qualificationscertificatesname2: "" })
                                                }
                                            }} checked={certificates.qualificationscertificatesname2 == "Montessori" ? true : false} /><span>Montessori </span></li>
                                            <li><input type="checkbox" name="" onClick={e => {
                                                if (e.target.checked) {
                                                    setcertificates({ ...certificates, qualificationscertificatesname4: "e" })
                                                }
                                                else {
                                                    setcertificates({ ...certificates, qualificationscertificatesname4: "" })
                                                }
                                            }} checked={certificates.qualificationscertificatesname4 != "" ? true : false} />

                                                <span> <input type="text" placeholder='Other' onChange={e => {
                                                    setcertificates({ ...certificates, qualificationscertificatesname4: e.target.value })
                                                }} defaultValue={certificates.qualificationscertificatesname4} className={certificates.qualificationscertificatesname4 == "e" ? "bordererror" : ""} /></span></li>

                                        </ul>
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='form_group'>
                                    <label>Upload your <a>CV </a><span className='smallpop'>CV will be not publicly available. You are encouraged to share CV with prospective employer upon their request.</span >
                                        {/* <span className={errorfield.cv != "" ? "starred" : ""}>*</span> */}
                                        {/* <span className={errorfield.cv != "" ? "starred" : ""}>*</span> */}
                                    </label>
                                    <div className='upload'>
                                        <input type="file" placeholder='Choose file' onChange={e => {
                                            // seterrorfield({ ...errorfield, cv: "" })
                                            setdetailprovide({ ...detailprovider, cv: e.target.files[0] })
                                        }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" />
                                        <span>{detailprovider.cv != "" ? detailprovider.cv.name ? detailprovider.cv.name : detailprovider.cv : "Choose file"}</span>
                                        <button>
                                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.909091 9.09091C1.41117 9.09091 1.81818 9.49792 1.81818 10V17.2727C1.81818 17.5138 1.91396 17.7451 2.08445 17.9156C2.25494 18.086 2.48617 18.1818 2.72727 18.1818H13.6364C13.8775 18.1818 14.1087 18.086 14.2792 17.9156C14.4497 17.7451 14.5455 17.5138 14.5455 17.2727V10C14.5455 9.49792 14.9525 9.09091 15.4545 9.09091C15.9566 9.09091 16.3636 9.49792 16.3636 10V17.2727C16.3636 17.996 16.0763 18.6897 15.5648 19.2012C15.0534 19.7127 14.3597 20 13.6364 20H2.72727C2.00395 20 1.31026 19.7127 0.7988 19.2012C0.287337 18.6897 0 17.996 0 17.2727V10C0 9.49792 0.407014 9.09091 0.909091 9.09091Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53899 0.266267C7.89402 -0.0887555 8.46962 -0.0887555 8.82464 0.266267L12.461 3.90263C12.816 4.25765 12.816 4.83326 12.461 5.18828C12.106 5.5433 11.5304 5.5433 11.1754 5.18828L8.18182 2.19474L5.18828 5.18828C4.83326 5.5433 4.25765 5.5433 3.90263 5.18828C3.54761 4.83326 3.54761 4.25765 3.90263 3.90263L7.53899 0.266267Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.18182 1.35465e-08C8.6839 1.35465e-08 9.09091 0.407014 9.09091 0.909091V12.7273C9.09091 13.2294 8.6839 13.6364 8.18182 13.6364C7.67974 13.6364 7.27273 13.2294 7.27273 12.7273V0.909091C7.27273 0.407014 7.67974 1.35465e-08 8.18182 1.35465e-08Z" fill="white" />
                                            </svg>

                                        </button>
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='form_group free'>
                                    <label>Upload certificates</label>
                                    <div className='upload'>
                                        <input type="file" placeholder="Choose file" onChange={e => {
                                            seterrorfield({ ...errorfield, qualificationscertificatesdoc: "" })
                                            setdetailprovide({ ...detailprovider, qualificationscertificatesdoc: e.target.files[0] })
                                        }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" />
                                        <span>{detailprovider.qualificationscertificatesdoc != "" ? detailprovider.qualificationscertificatesdoc.name ? detailprovider.qualificationscertificatesdoc.name : detailprovider.qualificationscertificatesdoc : "Choose file"}</span>
                                        <button>
                                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.909091 9.09091C1.41117 9.09091 1.81818 9.49792 1.81818 10V17.2727C1.81818 17.5138 1.91396 17.7451 2.08445 17.9156C2.25494 18.086 2.48617 18.1818 2.72727 18.1818H13.6364C13.8775 18.1818 14.1087 18.086 14.2792 17.9156C14.4497 17.7451 14.5455 17.5138 14.5455 17.2727V10C14.5455 9.49792 14.9525 9.09091 15.4545 9.09091C15.9566 9.09091 16.3636 9.49792 16.3636 10V17.2727C16.3636 17.996 16.0763 18.6897 15.5648 19.2012C15.0534 19.7127 14.3597 20 13.6364 20H2.72727C2.00395 20 1.31026 19.7127 0.7988 19.2012C0.287337 18.6897 0 17.996 0 17.2727V10C0 9.49792 0.407014 9.09091 0.909091 9.09091Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53899 0.266267C7.89402 -0.0887555 8.46962 -0.0887555 8.82464 0.266267L12.461 3.90263C12.816 4.25765 12.816 4.83326 12.461 5.18828C12.106 5.5433 11.5304 5.5433 11.1754 5.18828L8.18182 2.19474L5.18828 5.18828C4.83326 5.5433 4.25765 5.5433 3.90263 5.18828C3.54761 4.83326 3.54761 4.25765 3.90263 3.90263L7.53899 0.266267Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.18182 1.35465e-08C8.6839 1.35465e-08 9.09091 0.407014 9.09091 0.909091V12.7273C9.09091 13.2294 8.6839 13.6364 8.18182 13.6364C7.67974 13.6364 7.27273 13.2294 7.27273 12.7273V0.909091C7.27273 0.407014 7.67974 1.35465e-08 8.18182 1.35465e-08Z" fill="white" />
                                            </svg>

                                        </button>
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='button'>
                                    <button onClick={e => {
                                        stapset(1)
                                        setmobile(-12)
                                        window.scrollTo({ top: 0 });
                                    }}>Back</button>
                                    <button onClick={e => {
                                        if (detailprovider.educationlevel != "" && detailprovider.school != "" && detailprovider.yearawarded != "" && (certificates.qualificationscertificatesname4 == "e" ? certificates.qualificationscertificatesname4.length > 2 : detailprovider.educationlevel != "")) {
                                            stapset(3)
                                            setmobile(-20)
                                            window.scrollTo({ top: 0 });
                                            profile_update(false)
                                        } else {
                                            step2.map((e) => {
                                                after_logins_field(e.name)
                                            })
                                        }
                                    }}>Next</button>
                                </div>
                            </div>
                            {/**/}
                            <div className='detail work-experience your_kids  setp3' style={stap == 3 ? {} : { "display": "none" }}>
                                {detail.service_type && detail.service_type.tab1 ?
                                    <div className='nanny'>
                                        <h2 className='border'><img src='./images/nany_pur.svg' /> Nanny</h2>
                                        <div className='form_group full space qualification '>
                                            <label>Do you have experience with newborns?<span className={errorfield.nanynewbornexp != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox'>
                                                <ul onClick={w => seterrorfield({ ...errorfield, nanynewbornexp: "" })}>
                                                    <li><input type="checkbox" name="quality" checked={detailprovider.nanynewbornexp == "Yes" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, nanynewbornexp: "Yes" })} /><span>Yes </span></li>
                                                    <li><input type="checkbox" name="quality" checked={detailprovider.nanynewbornexp == "No" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, nanynewbornexp: "No" })} /><span> No</span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        {
                                            detail.service_type && !detail.service_type.tab2 && !detail.service_type.tab3 ?
                                                <>
                                                    <div className='form_group full space'>
                                                        <label>Do you have experience in working with kids with<br />special needs?<span className={errorfield.nanyexpwithkid != "" ? "starred" : ""}>*</span></label>
                                                        <div className='checkbox'>
                                                            <ul onClick={e => seterrorfield({ ...errorfield, nanyexpwithkid: "" })}>
                                                                <li><input type="radio" name="quality2" checked={detailprovider.nanyexpwithkid == "Yes" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, nanyexpwithkid: "Yes" })} /><span>Yes </span></li>
                                                                <li><input type="radio" name="quality2" checked={detailprovider.nanyexpwithkid == "No" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, nanyexpwithkid: "No" })} /><span> No</span></li>
                                                            </ul>
                                                        </div>
                                                        {/* <div className='errorfield'>{error.message}</div>*/}
                                                    </div>
                                                    {detailprovider.nanyexpwithkid == "Yes" ?
                                                        <div className='job_performance'>
                                                            <div className='form_group full'>
                                                                <label>Select all applicable<span className={errorfield.nanyallapplicable != "" ? "starred" : ""}>*</span></label>

                                                                <div className='text customselect '>
                                                                    {allapplicable ?
                                                                        <span className='keyword' onClick={e => custom("cate2", "over")} style={{
                                                                            cursor: "pointer", whiteSpace: "nowrap",
                                                                            overflow: "hidden"
                                                                        }}>
                                                                            {allapplicable.map((e, index) => {
                                                                                if (typeof e.name == "string") {
                                                                                    return (index > 0 ? ", " : "") + e.name
                                                                                }
                                                                            })}
                                                                        </span>
                                                                        : ""}
                                                                </div>
                                                                <div className='customselect inp'>
                                                                    {/* <input className='keyword' type="text" placeholder='Choose from the list' value={allapplicable.map((e) => {
                                                                        if (typeof e.name == "string") {
                                                                            return <TranslateComponent text={e.name} />
                                                                        }
                                                                    })} /> */}
                                                                    <div className='overflow' style={{ left: "-111%", top: "-37vh" }} id='over' onClick={e => custom("cate2", "over")}></div>

                                                                    <div className='option' id='cate2' onClick={e => seterrorfield({ ...errorfield, nanyallapplicable: "" })}>

                                                                        <p ><input type="checkbox" onClick={a => selectoption3("ADHD")} /><h3>{"ADHD"}  </h3><span></span></p>
                                                                        <p ><input type="checkbox" onClick={a => selectoption3("Auditory Impairment")} /><h3>{"Auditory Impairment"} </h3><span></span></p>
                                                                        <p ><input type="checkbox" onClick={a => selectoption3("Autism")} /><h3>{"Autism"} </h3><span></span></p>
                                                                        <p ><input type="checkbox" onClick={a => selectoption3("Cerebral palsy")} /><h3>{"Cerebral palsy"} </h3><span></span></p>
                                                                        <p><input type="checkbox" onClick={a => selectoption3("Down syndrome")} /><h3>{"Down syndrome"}  </h3><span></span></p>
                                                                        <p><input type="checkbox" onClick={a => selectoption3("Dyslexia")} /><h3>{"Dyslexia"} </h3><span></span></p>
                                                                        <p><input type="checkbox" onClick={a => selectoption3("Mild intellectual disability")} /><h3>{"Mild intellectual disability"} </h3><span></span></p>
                                                                        <p><input type="checkbox" onClick={a => selectoption3("Moderate/Severe intellectual disability")} /><h3>{"Moderate/Severe intellectual disability"} </h3><span></span></p>
                                                                        <p><input type="checkbox" onClick={a => selectoption3("Orthopedic impairment")} /><h3>{"Orthopedic impairment"} </h3><span></span></p>
                                                                        <p><input type="checkbox" onClick={a => selectoption3("Speech learning impairment")} /><h3>{"Speech learning impairment"}  </h3><span></span></p>
                                                                        <p><input type="checkbox" onClick={a => selectoption3("Specific learning disabilities")} /><h3>{"Specific learning disabilities"}  </h3><span></span></p>
                                                                        <p><input type="checkbox" onClick={a => selectoption3("Visual impairment")} /><h3>{"Visual impairment"}  </h3><span></span></p>
                                                                        <p><input type="checkbox" onClick={a => selectoption3("Other")} /><h3>{"Other"} </h3><span></span></p>
                                                                    </div>

                                                                    {/* <span >
                                                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#636363" />
                                                                        </svg>
                                                                    </span> */}
                                                                </div>
                                                                {/* <div className='errorfield'>{error.message}</div>*/}
                                                            </div>
                                                        </div>
                                                        : ""}
                                                </>
                                                : ""
                                        }
                                        <div className='form_group full'>
                                            <label>Years of work experience
                                                {/* <span className={errorfield.nanyyearexp != "" ? "starred" : ""}>*</span> */}
                                            </label>
                                            <div className='rang'>
                                                <div class="slider" onClick={w => seterrorfield({ ...errorfield, nanyyearexp: "" })}>
                                                    <input type="range" min="0" max="60" onChange={e => {
                                                        setexperience(e.target.value)
                                                        setdetailprovide({ ...detailprovider, nanyyearexp: parseInt(e.target.value) })
                                                    }} style={{ "background-size": ((experience * 100) / 60) + "% 100% " }} value={experience} />
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
                                    : ""}
                                {detail.service_type && detail.service_type.tab2 ?
                                    <div className='special_education'>
                                        <h2 className='border'><img src='./images/special_education.svg' />Special Education Teacher </h2>
                                        <div className='job_performance'>
                                            <div className='form_group'>
                                                <label>Area of expertise (select all applicable)<span className={errorfield.setallapplicable != "" ? "starred" : ""}>*</span></label>
                                                <div className='text customselect '>
                                                    {setallapplicable2 ?
                                                        <span className='keyword' onClick={e => custom("cate8", "over2")} style={{
                                                            cursor: "pointer", whiteSpace: "nowrap",
                                                            overflow: "hidden"
                                                        }}>
                                                            {setallapplicable2.map((e, index) => {
                                                                if (typeof e.name == "string") {
                                                                    return (index > 0 ? ", " : "") + e.name
                                                                }
                                                            })}
                                                        </span>
                                                        : ""}
                                                </div>
                                                <div className='customselect inp'>
                                                    {/* <input className='keyword' type="text" placeholder='Choose from the list' value={setallapplicable2.map((e) => {
                                                        return e.name
                                                    })} /> */}
                                                    <div className='overflow' style={{ left: "-111%", top: "-37vh" }} id='over2' onClick={e => custom("cate8", "over2")}></div>

                                                    <div className='option' id='cate8' onClick={e => seterrorfield({ ...errorfield, setallapplicable: "" })}>

                                                        <p ><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "ADHD")[0] ? true : false} onClick={a => selectoption6("ADHD")} /><h3>{"ADHD"} </h3><span></span></p>
                                                        <p ><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Auditory Impairment")[0] ? true : false} onClick={a => selectoption6("Auditory Impairment")} /><h3>{"Auditory Impairment"}  </h3><span></span></p>
                                                        <p ><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Autism")[0] ? true : false} onClick={a => selectoption6("Autism")} /><h3>{"Autism"}  </h3><span></span></p>
                                                        <p ><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Cerebral palsy")[0] ? true : false} onClick={a => selectoption6("Cerebral palsy")} /><h3>{"Cerebral palsy"}  </h3><span></span></p>
                                                        <p><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Down syndrome")[0] ? true : false} onClick={a => selectoption6("Down syndrome")} /><h3>{"Down syndrome"} </h3><span></span></p>
                                                        <p><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Dyslexia")[0] ? true : false} onClick={a => selectoption6("Dyslexia")} /><h3>{"Dyslexia"} </h3><span></span></p>
                                                        <p><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Mild intellectual disability")[0] ? true : false} onClick={a => selectoption6("Mild intellectual disability")} /><h3>{"Mild intellectual disability"} </h3><span></span></p>
                                                        <p><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Moderate/Severe intellectual disability")[0] ? true : false} onClick={a => selectoption6("Moderate/Severe intellectual disability")} /><h3>{"Moderate/Severe intellectual disability"}  </h3><span></span></p>
                                                        <p><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Orthopedic impairment")[0] ? true : false} onClick={a => selectoption6("Orthopedic impairment")} /><h3>{"Orthopedic impairment"} </h3><span></span></p>
                                                        <p><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Speech learning impairment")[0] ? true : false} onClick={a => selectoption6("Speech learning impairment")} /><h3>{"Speech learning impairment"}  </h3><span></span></p>
                                                        <p><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Specific learning disabilities")[0] ? true : false} onClick={a => selectoption6("Specific learning disabilities")} /><h3>{"Specific learning disabilities"}  </h3><span></span></p>
                                                        <p><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Visual impairment")[0] ? true : false} onClick={a => selectoption6("Visual impairment")} /><h3>{"Visual impairment"} </h3><span></span></p>
                                                        <p><input type="checkbox" checked={setallapplicable2.filter((e) => e.name == "Other")[0] ? true : false} onClick={a => selectoption6("Other")} /><h3>{"Other"} </h3><span></span></p>
                                                    </div>

                                                    {/* <span >
                                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#636363" />
                                                        </svg>
                                                    </span> */}
                                                </div>
                                                {/* <div className='errorfield'>{error.message}</div>*/}
                                            </div>
                                        </div>
                                        <div className='form_group full qualification methad'>
                                            <label>Experience with following methods (select all applicable)<span className={errorfield.setexpmethods != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, setexpmethods: "" })}>
                                                    <li><input type="checkbox" name="" checked={methods.setexpmethods && methods.setexpmethods == "ABA" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            setmethods({ ...methods, setexpmethods: "ABA" })
                                                        } else {
                                                            setmethods({ ...methods, setexpmethods: "" })
                                                        }
                                                    }} /><span> ABA</span></li>
                                                    <li><input type="checkbox" name="" checked={methods.setexpmethods2 && methods.setexpmethods2 == "PECS" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            setmethods({ ...methods, setexpmethods2: "PECS" })
                                                        } else {
                                                            setmethods({ ...methods, setexpmethods2: "" })
                                                        }
                                                    }} /><span> PECS </span></li>
                                                    <li><input type="checkbox" name="" checked={methods.setexpmethods3 && methods.setexpmethods3 == "Floortime" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            setmethods({ ...methods, setexpmethods3: "Floortime" })
                                                        } else {
                                                            setmethods({ ...methods, setexpmethods3: "" })
                                                        }
                                                    }} /><span> Floortime</span></li>
                                                    <li><input type="checkbox" name="" checked={methods.setexpmethods4 && methods.setexpmethods4 == "None" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            setmethods({ ...methods, setexpmethods4: "None" })
                                                        } else {
                                                            setmethods({ ...methods, setexpmethods4: "" })
                                                        }
                                                    }} /><span> None </span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        <div className='form_group full'>
                                            <label>Do you have an experience in <a>IEP</a><span className='smallpop'> IEP (Individual Education Program) is a document that is developed for each child in the public school system who is eligible for special education. The IEP is usually written by a team of specialized providers (special education specialist, OT, SLP, BID, psychologist). After a comprehensive evaluation of cognitive, language, and academic skills with standardized tests, written IEP will contain outlined present levels of performances (strengths and challenges that child may have), as well as specific IEP goals, appropriate accommodations, frequency and duration of special education services.</span> development?<span className={errorfield.setexpiep != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, setexpiep: "" })}>
                                                    <li><input type="radio" name="quality6" checked={detailprovider.setexpiep == "Yes" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, setexpiep: "Yes" })} /><span> Yes</span></li>
                                                    <li><input type="radio" name="quality6" checked={detailprovider.setexpiep == "No" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, setexpiep: "No" })} /><span>No </span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        <div className='form_group full'>
                                            <label>Years of work experience
                                                {/* <span className={errorfield.setyearexp != "" ? "starred" : ""}>*</span> */}
                                            </label>
                                            <div className='rang'>
                                                <div class="slider" onClick={w => seterrorfield({ ...errorfield, setyearexp: "" })}>
                                                    <input type="range" min="0" max="60" onChange={e => setrange(e.target.value)} style={{ "background-size": ((range * 100) / 60) + "% 100% " }} value={range} />
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
                                    : ""}
                                {detail.service_type && detail.service_type.tab3 ?
                                    <div className='special_education'>
                                        <h2 className='border'><img src='./images/professional.svg' />Special Education Paraprofessional </h2>
                                        {detail.service_type && !detail.service_type.tab2 ?
                                            <>
                                                <div className='form_group full'>
                                                    <label>Do you have experience in working with kids with special needs?<span className={errorfield.sepexpwithkid != "" ? "starred" : ""}>*</span></label>
                                                    <div className='checkbox'>
                                                        <ul onClick={e => seterrorfield({ ...errorfield, sepexpwithkid: "" })}>
                                                            <li><input type="radio" name="quality3" checked={detailprovider.sepexpwithkid == "Yes" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, sepexpwithkid: "Yes" })} /><span>Yes </span></li>
                                                            <li><input type="radio" name="quality3" checked={detailprovider.sepexpwithkid == "No" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, sepexpwithkid: "No" })} /><span> No</span></li>
                                                        </ul>
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                                </div>
                                                {detailprovider.sepexpwithkid == "Yes" ?
                                                    <div className='job_performance'>
                                                        <div className='form_group'>
                                                            <label>Area of expertise (select all applicable)<span className={errorfield.sepallapplicable != "" ? "starred" : ""}>*</span></label>
                                                            <div className='text customselect '>
                                                                {sepallapplicable ?
                                                                    <span className='keyword' onClick={e => custom("cate7", "over3")} style={{
                                                                        cursor: "pointer", whiteSpace: "nowrap",
                                                                        overflow: "hidden"
                                                                    }}>
                                                                        {sepallapplicable.map((e, index) => {
                                                                            if (typeof e.name == "string") {
                                                                                return (index > 0 ? ", " : "") + e.name
                                                                            }
                                                                        })}
                                                                    </span>
                                                                    : ""}
                                                            </div>
                                                            <div className='customselect inp'>
                                                                {/* <input className='keyword' type="text" placeholder='Choose from the list' value={sepallapplicable.map((e) => {
                                                                    return e.name
                                                                })} /> */}
                                                                <div className='overflow' style={{ left: "-111%", top: "-37vh" }} id='over3' onClick={e => custom("cate7", "over3")}></div>

                                                                <div className='option' id='cate7' onClick={e => seterrorfield({ ...errorfield, setallapplicable: "" })}>

                                                                    <p ><input type="checkbox" onClick={a => selectoption5("ADHD")} /><h3>{"ADHD"}  </h3><span></span></p>
                                                                    <p ><input type="checkbox" onClick={a => selectoption5("Auditory Impairment")} /><h3>{"Auditory Impairment"}  </h3><span></span></p>
                                                                    <p ><input type="checkbox" onClick={a => selectoption5("Autism")} /><h3>{"Autism"} </h3><span></span></p>
                                                                    <p ><input type="checkbox" onClick={a => selectoption5("Cerebral palsy")} /><h3>{"Cerebral palsy"}  </h3><span></span></p>
                                                                    <p><input type="checkbox" onClick={a => selectoption5("Down syndrome")} /><h3>{"Down syndrome"} </h3><span></span></p>
                                                                    <p><input type="checkbox" onClick={a => selectoption5("Dyslexia")} /><h3>{"Dyslexia"}  </h3><span></span></p>
                                                                    <p><input type="checkbox" onClick={a => selectoption5("Mild intellectual disability")} /><h3>{"Mild intellectual disability"} </h3><span></span></p>
                                                                    <p><input type="checkbox" onClick={a => selectoption5("Moderate/Severe intellectual disability")} /><h3>{"Moderate/Severe intellectual disability"}  </h3><span></span></p>
                                                                    <p><input type="checkbox" onClick={a => selectoption5("Orthopedic impairment")} /><h3>{"Orthopedic impairment"}  </h3><span></span></p>
                                                                    <p><input type="checkbox" onClick={a => selectoption5("Speech learning impairment")} /><h3>{"Speech learning impairment"}  </h3><span></span></p>
                                                                    <p><input type="checkbox" onClick={a => selectoption5("Specific learning disabilities")} /><h3>{"Specific learning disabilities"}  </h3><span></span></p>
                                                                    <p><input type="checkbox" onClick={a => selectoption5("Visual impairment")} /><h3>{"Visual impairment"} </h3><span></span></p>
                                                                    <p><input type="checkbox" onClick={a => selectoption5("Other")} /><h3>{"other"} </h3><span></span></p>
                                                                </div>

                                                                {/* <span >
                                                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#636363" />
                                                                    </svg>
                                                                </span> */}
                                                            </div>
                                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                                        </div>
                                                    </div>
                                                    : ""}
                                                <div className='form_group full'>
                                                    <label>Experience with following methods (select all applicable)<span className={errorfield.sepexpmethods != "" ? "starred" : ""}>*</span></label>
                                                    <div className='checkbox'>
                                                        <ul onClick={e => seterrorfield({ ...errorfield, sepexpmethods: "" })}>
                                                            <li><input type="radio" name="quality4" checked={detailprovider.sepexpmethods && detailprovider.sepexpmethods == "ABA" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, sepexpmethods: "ABA" })} /><span>ABA </span></li>
                                                            <li><input type="radio" name="quality4" checked={detailprovider.sepexpmethods && detailprovider.sepexpmethods == "PECS" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, sepexpmethods: "PECS" })} /><span> PECS</span></li>
                                                            <li><input type="radio" name="quality4" checked={detailprovider.sepexpmethods && detailprovider.sepexpmethods == "Floortime" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, sepexpmethods: "Floortime" })} /><span>Floortime </span></li>
                                                            <li><input type="radio" name="quality4" checked={detailprovider.sepexpmethods && detailprovider.sepexpmethods == "None" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, sepexpmethods: "None" })} /><span> None</span></li>
                                                        </ul>
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                                </div>
                                            </> : ""}

                                        <div className='form_group full'>
                                            <label>Years of work experience
                                                {/* <span className={errorfield.sepworkexp != "" ? "starred" : ""}>*</span> */}
                                            </label>
                                            <div className='rang'>
                                                <div class="slider" onClick={w => seterrorfield({ ...errorfield, sepworkexp: "" })}>
                                                    <input type="range" min="0" max="60" onChange={e => setsepworkexp(e.target.value)} style={{ "background-size": ((sepworkexp * 100) / 60) + "% 100% " }} value={sepworkexp} />
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
                                    : ""}
                                {detail.service_type && detail.service_type.tab4 ?
                                    <div className='nanny tutor'>
                                        <h2 className='border'><img src='./images/tutorform.svg' /> Tutor</h2>
                                        <div className='form_group full'>
                                            <label>Years of work experience<span className={errorfield.tutorexp != "" ? "starred" : ""}>*</span></label>
                                            <div className='rang'>
                                                <div class="slider" onClick={w => seterrorfield({ ...errorfield, tutorexp: "" })}>
                                                    <input type="range" min="0" max="60" onChange={e => setutorexperience(e.target.value)} style={{ "background-size": ((utorexperience * 100) / 60) + "% 100% " }} value={utorexperience} />
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
                                    : ""}
                                <div className='button'>
                                    <button onClick={e => {
                                        stapset(2)
                                        setmobile(-20)
                                        window.scrollTo({ top: 0 });
                                    }}>Back</button>
                                    <button onClick={e => {
                                        if ((detail.service_type && detail.service_type.tab1 ? detailprovider.nanynewbornexp != "" && (detail.service_type && !detail.service_type.tab2 && !detail.service_type.tab3 ? (detailprovider.nanyexpwithkid == "Yes" ? allapplicable[0] : detailprovider.educationlevel != "") && detailprovider.nanyexpwithkid != "" : detailprovider.educationlevel != "") : detailprovider.educationlevel != "") && (detail.service_type && detail.service_type.tab2 ? setallapplicable2[0] && (methods.setexpmethods != "" || methods.setexpmethods2 != "" || methods.setexpmethods3 != "" || methods.setexpmethods4 != "") && detailprovider.setexpiep != "" : detailprovider.educationlevel != "") && (detail.service_type && detail.service_type.tab3 ? (detail.service_type && !detail.service_type.tab2 ? (detailprovider.sepexpwithkid == "Yes" ? sepallapplicable[0] : detailprovider.educationlevel != "") && detailprovider.sepexpmethods != "" && detailprovider.sepexpwithkid != "" : sepworkexp) : detailprovider.educationlevel != "")) {
                                            stapset(4)
                                            setmobile(-32)
                                            window.scrollTo({ top: 0 });
                                            profile_update(false)
                                        } else {
                                            step3.map((e) => {
                                                after_logins_field(e.name)
                                            })
                                        }
                                    }}>Next</button>
                                </div>
                            </div>
                            {/**/}
                            <div className='detail work-experience job_performance setp4' style={stap == 4 ? {} : { "display": "none" }}>
                                {detail.service_type && detail.service_type.tab1 ?
                                    <div className='nanny'>
                                        <h2 className='border'><img src='./images/nany_pur.svg' /> Nanny</h2>
                                        <div className='form_group full'>
                                            <label>Rate per hour {detail.country == "Serbia" ? "(RSD)" : "(USD)"}<span className={errorfield.nanyperhrrate != "" ? "starred" : ""}>*</span></label>
                                            {detail && detail.country == "Serbia" ?
                                                <div class="wrapper rang">
                                                    <div class="container_slide">
                                                        <div class="slider-track">
                                                            <ul>
                                                                <li style={usd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 20 || usd.max < 20 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 30 || usd.max < 30 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 40 || usd.max < 40 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <div class="bggray_slider">
                                                            <ul>
                                                                <li style={usd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 20 || usd.max < 20 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 30 || usd.max < 30 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 40 || usd.max < 40 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.max < 50 && usd.max != 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <input type="range" min="0" max="5" id="slider-1" value={usd.min / 10}
                                                            onChange={e => {
                                                                if ((usd.max > 0 ? usd.max : 60) > (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                    setusd({
                                                                        ...usd, min: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                    })
                                                                    seterrorfield({ ...errorfield, nanyperhrrate: "" })
                                                                }
                                                            }} />
                                                        <input type="range" min="0" max="5" id="slider-2" value={usd.max == 0 ? 50 / 10 : usd.max / 10} onChange={e => {
                                                            if (usd.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                setusd({
                                                                    ...usd, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, nanyperhrrate: "" })
                                                            }
                                                        }} />
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
                                                </div> : <div class="wrapper rang">
                                                    <div class="container_slide">
                                                        <div class="slider-track">
                                                            <ul>
                                                                <li style={usd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 20 || usd.max < 20 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 30 || usd.max < 30 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 40 || usd.max < 40 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <div class="bggray_slider">
                                                            <ul>
                                                                <li style={usd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 20 || usd.max < 20 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 30 || usd.max < 30 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.min >= 40 || usd.max < 40 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd.max < 50 && usd.max != 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <input type="range" min="0" max="5" id="slider-1" value={usd.min / 10} onChange={e => {
                                                            if ((usd.max > 0 ? usd.max : 60) > (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                setusd({
                                                                    ...usd, min: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, nanyperhrrate: "" })
                                                            }
                                                        }} />
                                                        <input type="range" min="0" max="5" id="slider-2" value={usd.max == 0 ? 50 / 10 : usd.max / 10} onChange={e => {
                                                            if (usd.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                setusd({
                                                                    ...usd, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, nanyperhrrate: "" })
                                                            }
                                                        }} />
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
                                            }
                                            <span class="price">{detail && detail.country == "Serbia" ? usd.min * 100 + " - " + usd.max * 100 : usd.min + " - " + usd.max}</span>
                                            {/* <div className='errorfield'>{error.message}</div> */}
                                        </div>
                                    </div>
                                    : ""}
                                {detail.service_type && detail.service_type.tab2 ?
                                    <div className='special_education big'>
                                        <h2 className='border'><img src='./images/special_education.svg' />Special Education Teacher </h2>
                                        <div className='form_group full'>
                                            <label>Rate per hour {detail.country == "Serbia" ? "(RSD)" : "(USD)"}<span className={errorfield.seterhrrate != "" ? "starred" : ""}>*</span></label>
                                            {detail && detail.country == "Serbia" ?
                                                <div class="wrapper rang">
                                                    <div class="container_slide">
                                                        <div class="slider-track">
                                                            <ul>
                                                                <li style={usd3.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 20 || usd3.max < 20 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 30 || usd3.max < 30 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 40 || usd3.max < 40 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <div class="bggray_slider">
                                                            <ul>
                                                                <li style={usd3.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 20 || usd3.max < 20 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 30 || usd3.max < 30 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 40 || usd3.max < 40 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.max < 50 && usd3.max != 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <input type="range" min="0" max="5" id="slider-1" value={usd3.min / 10}
                                                            onChange={e => {
                                                                if ((usd3.max > 0 ? usd3.max : 60) > (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                    setusd3({
                                                                        ...usd3, min: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                    })
                                                                    seterrorfield({ ...errorfield, seterhrrate: "" })
                                                                }
                                                            }} />
                                                        <input type="range" min="0" max="5" id="slider-2" value={usd3.max == 0 ? 50 / 10 : usd3.max / 10} onChange={e => {
                                                            if (usd3.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                setusd3({
                                                                    ...usd3, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, seterhrrate: "" })
                                                            }
                                                        }} />
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
                                                </div> : <div class="wrapper rang">
                                                    <div class="container_slide">
                                                        <div class="slider-track">
                                                            <ul>
                                                                <li style={usd3.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 20 || usd3.max < 20 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 30 || usd3.max < 30 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 40 || usd3.max < 40 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <div class="bggray_slider">
                                                            <ul>
                                                                <li style={usd3.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 20 || usd3.max < 20 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 30 || usd3.max < 30 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.min >= 40 || usd3.max < 40 && usd3.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd3.max < 50 && usd3.max != 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <input type="range" min="0" max="5" id="slider-1" value={usd3.min / 10} onChange={e => {
                                                            if ((usd3.max > 0 ? usd3.max : 60) > (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                setusd3({
                                                                    ...usd3, min: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, seterhrrate: "" })
                                                            }
                                                        }} />
                                                        <input type="range" min="0" max="5" id="slider-2" value={usd3.max == 0 ? 50 / 10 : usd3.max / 10} onChange={e => {
                                                            if (usd3.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                setusd3({
                                                                    ...usd3, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, seterhrrate: "" })
                                                            }
                                                        }} />
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
                                            }
                                            <span class="price">{detail && detail.country == "Serbia" ? usd3.min * 100 + " - " + usd3.max * 100 : usd3.min + " - " + usd3.max}</span>
                                            {/* <div className='errorfield'>{error.message}</div> */}
                                        </div>
                                    </div>
                                    : ""}
                                {detail.service_type && detail.service_type.tab3 ?
                                    <div className='special_education big'>
                                        <h2 className='border'><img src='./images/professional.svg' />Special Education Paraprofessional </h2>
                                        <div className='form_group full'>
                                            <label>Rate per hour {detail.country == "Serbia" ? "(RSD)" : "(USD)"}<span className={errorfield.seterhrrate != "" ? "starred" : ""}>*</span></label>
                                            {detail && detail.country == "Serbia" ?
                                                <div class="wrapper rang">
                                                    <div class="container_slide">
                                                        <div class="slider-track">
                                                            <ul>
                                                                <li style={usd4.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 20 || usd4.max < 20 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 30 || usd4.max < 30 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 40 || usd4.max < 40 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <div class="bggray_slider">
                                                            <ul>
                                                                <li style={usd4.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 20 || usd4.max < 20 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 30 || usd4.max < 30 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 40 || usd4.max < 40 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.max < 50 && usd4.max != 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <input type="range" min="0" max="5" id="slider-1" value={usd4.min / 10}
                                                            onChange={e => {
                                                                if ((usd4.max > 0 ? usd4.max : 60) > (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                    setusd4({
                                                                        ...usd4, min: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                    })
                                                                    seterrorfield({ ...errorfield, seterhrrate: "" })
                                                                }
                                                            }} />
                                                        <input type="range" min="0" max="5" id="slider-2" value={usd4.max == 0 ? 50 / 10 : usd4.max / 10} onChange={e => {
                                                            if (usd4.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                setusd4({
                                                                    ...usd4, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, seterhrrate: "" })
                                                            }
                                                        }} />
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
                                                </div> : <div class="wrapper rang">
                                                    <div class="container_slide">
                                                        <div class="slider-track">
                                                            <ul>
                                                                <li style={usd4.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 20 || usd4.max < 20 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 30 || usd4.max < 30 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 40 || usd4.max < 40 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <div class="bggray_slider">
                                                            <ul>
                                                                <li style={usd4.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 20 || usd4.max < 20 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 30 || usd4.max < 30 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.min >= 40 || usd4.max < 40 && usd4.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={usd4.max < 50 && usd4.max != 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <input type="range" min="0" max="5" id="slider-1" value={usd4.min / 10} onChange={e => {
                                                            if ((usd4.max > 0 ? usd4.max : 60) > (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                setusd4({
                                                                    ...usd4, min: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, seterhrrate: "" })
                                                            }
                                                        }} />
                                                        <input type="range" min="0" max="5" id="slider-2" value={usd4.max == 0 ? 50 / 10 : usd4.max / 10} onChange={e => {
                                                            if (usd4.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                setusd4({
                                                                    ...usd4, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, seterhrrate: "" })
                                                            }
                                                        }} />
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
                                            }
                                            <span class="price">{detail && detail.country == "Serbia" ? usd4.min * 100 + " - " + usd4.max * 100 : usd4.min + " - " + usd4.max}</span>
                                            {/* <div className='errorfield'>{error.message}</div> */}
                                        </div>
                                    </div>
                                    : ""}
                                {detail.service_type && detail.service_type.tab4 ?
                                    <div className='tutor'>
                                        <h2 className='border'><img src='./images/tuter.svg' /> Tutor</h2>


                                        <div className='form_group full qualification tutorteach'>
                                            <label>Classes you would like to teach<span className={errorfield.tutorliketoteach == "" ? "" : "starred"}>*</span></label>
                                            <div className='checkbox'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, tutorliketoteach: "" })}>
                                                    <li><input type="checkbox" name="" defaultChecked={qualifications.Mathematics == "Mathematics" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            setqualifications({ ...qualifications, Mathematics: "Mathematics" })
                                                        } else {
                                                            setqualifications({ ...qualifications, Mathematics: "" })
                                                        }
                                                    }} /><span> Mathematics</span></li>
                                                    <li><input type="checkbox" name="" defaultChecked={qualifications.Physics == "Physics" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            setqualifications({ ...qualifications, Physics: "Physics" })
                                                        } else {
                                                            setqualifications({ ...qualifications, Physics: "" })
                                                        }
                                                    }} /><span>Physics </span></li>
                                                    <li><input type="checkbox" name="" defaultChecked={qualifications.English == "English" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            setqualifications({ ...qualifications, English: "English" })
                                                        } else {
                                                            setqualifications({ ...qualifications, English: "" })
                                                        }
                                                    }} /><span>English</span></li>
                                                    <li><input type="checkbox" name="" defaultChecked={qualifications.Serbian == "Serbian" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            setqualifications({ ...qualifications, Serbian: "Serbian" })
                                                        } else {
                                                            setqualifications({ ...qualifications, Serbian: "" })
                                                        }
                                                    }} /><span> Serbian</span></li>

                                                    <li><input type="checkbox" name="" defaultChecked={qualifications.Chemistry == "Chemistry" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            setqualifications({ ...qualifications, Chemistry: "Chemistry" })
                                                        } else {
                                                            setqualifications({ ...qualifications, Chemistry: "" })
                                                        }
                                                    }} /><span>Chemistry </span></li>
                                                    <li><input type="checkbox" name="" /><span>Other <input type="text" placeholder="Other" onChange={e => {

                                                        setqualifications({ ...qualifications, Other: e.target.value })

                                                    }} defaultValue={qualifications.Other ? qualifications.Other : " "} /></span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        <div className='form_group full'>
                                            <label>I am interested in providing online classes<span className={errorfield.tutorintrestedonlinecls != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox create'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, tutorintrestedonlinecls: "" })}>
                                                    <li><input type="radio" name="yes" checked={detailprovider.tutorintrestedonlinecls == "Yes" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, tutorintrestedonlinecls: "Yes" })} /><span>Yes</span></li>
                                                    <li><input type="radio" name="yes" checked={detailprovider.tutorintrestedonlinecls == "No" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, tutorintrestedonlinecls: "No" })} /><span>No </span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>


                                        <div className='form_group full'>
                                            <label>Rate per hour {detail.country == "Serbia" ? "(RSD)" : "(USD)"}<span className={errorfield.nanyperhrrate != "" ? "starred" : ""}>*</span></label>
                                            {detail && detail.country == "Serbia" ?
                                                <div class="wrapper rang">
                                                    <div class="container_slide">
                                                        <div class="slider-track">
                                                            <ul>
                                                                <li style={tutorusd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 20 || tutorusd.max < 20 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 30 || tutorusd.max < 30 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 40 || tutorusd.max < 40 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <div class="bggray_slider">
                                                            <ul>
                                                                <li style={tutorusd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 20 || tutorusd.max < 20 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 30 || tutorusd.max < 30 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 40 || tutorusd.max < 40 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.max < 50 && tutorusd.max != 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <input type="range" min="0" max="5" id="slider-1" value={tutorusd.min / 10}
                                                            onChange={e => {
                                                                if ((tutorusd.max > 0 ? tutorusd.max : 60) > (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                    settutorusd({
                                                                        ...tutorusd, min: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                    })
                                                                    seterrorfield({ ...errorfield, nanyperhrrate: "" })
                                                                }
                                                            }} />
                                                        <input type="range" min="0" max="5" id="slider-2" value={tutorusd.max == 0 ? 50 / 10 : tutorusd.max / 10} onChange={e => {
                                                            if (tutorusd.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                settutorusd({
                                                                    ...tutorusd, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, nanyperhrrate: "" })
                                                            }
                                                        }} />
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
                                                </div> : <div class="wrapper rang">
                                                    <div class="container_slide">
                                                        <div class="slider-track">
                                                            <ul>
                                                                <li style={tutorusd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 20 || tutorusd.max < 20 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 30 || tutorusd.max < 30 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 40 || tutorusd.max < 40 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <div class="bggray_slider">
                                                            <ul>
                                                                <li style={tutorusd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 20 || tutorusd.max < 20 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 30 || tutorusd.max < 30 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.min >= 40 || tutorusd.max < 40 && tutorusd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                <li style={tutorusd.max < 50 && tutorusd.max != 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                            </ul>
                                                        </div>
                                                        <input type="range" min="0" max="5" id="slider-1" value={tutorusd.min / 10} onChange={e => {
                                                            if ((tutorusd.max > 0 ? tutorusd.max : 60) > (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                settutorusd({
                                                                    ...tutorusd, min: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, nanyperhrrate: "" })
                                                            }
                                                        }} />
                                                        <input type="range" min="0" max="5" id="slider-2" value={tutorusd.max == 0 ? 50 / 10 : tutorusd.max / 10} onChange={e => {
                                                            if (tutorusd.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                settutorusd({
                                                                    ...tutorusd, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                })
                                                                seterrorfield({ ...errorfield, nanyperhrrate: "" })
                                                            }
                                                        }} />
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
                                            }
                                            <span class="price">{detail && detail.country == "Serbia" ? tutorusd.min * 100 + " - " + tutorusd.max * 100 : tutorusd.min + " - " + tutorusd.max}</span>
                                            {/* <div className='errorfield'>{error.message}</div> */}
                                        </div>
                                    </div>
                                    : ""}
                                {detail.service_type && detail.service_type.tab4 ?
                                    <div className='preferred_school_jobs tutor'>
                                        <h2 className='border'>Preferred school jobs</h2>
                                        <div className='form_group full space'>
                                            <label>I am interested in working in school<span className={errorfield.tutorintrestedinschool != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox create'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, tutorintrestedinschool: "" })}>
                                                    <li><input type="radio" name="yes2" checked={detailprovider.tutorintrestedinschool == "Yes" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, tutorintrestedinschool: "Yes" })} /><span> Yes</span></li>
                                                    <li><input type="radio" name="yes2" checked={detailprovider.tutorintrestedinschool == "No" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, tutorintrestedinschool: "No" })} /><span> No</span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        {detailprovider.tutorintrestedinschool == "Yes" ?
                                            <div className='form_group full'>
                                                <label>Select all applicable</label>
                                                <div className='text customselect '>
                                                    {selectcat ?
                                                        <span className='keyword' onClick={e => custom("cate", "over4")} style={{
                                                            cursor: "pointer", whiteSpace: "nowrap",
                                                            overflow: "hidden"
                                                        }}>
                                                            {selectcat.map((e) => {
                                                                if (typeof e.name == "string") {
                                                                    return e.name + ", "
                                                                }
                                                            })}
                                                        </span>
                                                        : ""}
                                                </div>
                                                <div className='customselect inp'>
                                                    {/* <input className='keyword' type="text" placeholder='Choose from the list' value={selectcat.map((e) => {
                                                        return e.name
                                                    })} /> */}
                                                    <div className='overflow' id='over4' style={{ left: "-111%", top: "-37vh" }} onClick={e => custom("cate", "over4")}></div>

                                                    <div className='option' id='cate'>

                                                        <p ><input type="checkbox" onClick={a => selectoption("Kindergarten Teacher")} /><h3>{"Kindergarten Teacher"} </h3><span></span></p>
                                                        <p ><input type="checkbox" onClick={a => selectoption("Elementary Teacher")} /><h3>{"Elementary Teacher"} </h3><span></span></p>
                                                        <p ><input type="checkbox" onClick={a => selectoption("High School Teacher")} /><h3>{"High School Teacher"} </h3><span></span></p>
                                                        <p ><input type="checkbox" onClick={a => selectoption("Special Education Teacher")} /><h3>{"Special Education Teacher"} </h3><span></span></p>
                                                        <p ><input type="checkbox" onClick={a => selectoption("Special Education Paraprofessional")} /><h3>{"Special Education Paraprofessional"} </h3><span></span></p>
                                                        <p  ><input type="checkbox" onClick={a => setselectcat([])} /><h3>{"None"} </h3><span></span></p>
                                                        {/* <div className='clr inp' onClick={e => {
                                                    setselectcat([])
                                                    window.location.reload()
                                                }}>Clear All <span>+</span></div>*/}
                                                    </div>


                                                    {/* <span >
                                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#636363" />
                                                        </svg>
                                                    </span> */}
                                                </div>
                                                {/* <div className='errorfield'>{error.message}</div>*/}
                                            </div>
                                            : ""}
                                        <div className='form_group full'>
                                            <label>Years of work experience<span className={utorexperience == 0 ? "starred" : ""}>*</span></label>
                                            <div className='rang'>
                                                <div class="slider">
                                                    <input type="range" min="0" max="60" onChange={e => setutorexperience(e.target.value)} style={{ "background-size": ((utorexperience * 100) / 60) + "% 100% " }} value={utorexperience} />
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
                                    : ""}
                                {detail.service_type && detail.service_type.tab4 ?
                                    <div className='general_info tutor  preferred_school_jobs'>
                                        <h2 className='border'>General info</h2>
                                        <div className='form_group full'>
                                            <label>Number of children you prefer to work with?<span className={errorfield.tutorworkwithnochild != "" ? "starred" : ""}>*</span></label>
                                            <div className='children_number'>
                                                <ul onClick={w => seterrorfield({ ...errorfield, tutorworkwithnochild: "" })}>
                                                    <li onClick={e => setchildren(1)} className={children == 1 ? "active" : ""}>1</li>
                                                    <li onClick={e => setchildren(2)} className={children == 2 ? "active" : ""}>2</li>
                                                    <li onClick={e => setchildren("twins")} className={children == "twins" ? "active" : ""}>Twins</li>
                                                    <li onClick={e => setchildren(3)} className={children == 3 ? "active" : ""}>3+</li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        <div className='form_group  full'>
                                            <label>Preferred child’s age<span className={errorfield.tutorprefchildage != "" ? "starred" : ""}>*</span></label>
                                            <div className='text customselect '>
                                                {children_age ?
                                                    <span className='keyword' onClick={e => custom("cate5", "over5")} style={{
                                                        cursor: "pointer", whiteSpace: "nowrap",
                                                        overflow: "hidden"
                                                    }}>
                                                        {children_age.map((e, index) => {
                                                            if (typeof e.name == "string") {
                                                                return (index > 0 ? ", " : "") + e.name
                                                            }
                                                        })}
                                                    </span>
                                                    : ""}
                                            </div>
                                            <div className='customselect inp'>
                                                {/* <input className='keyword' type="text" placeholder='Choose from the list' value={children_age.map((e) => {
                                                    return e.name
                                                })} /> */}
                                                <div className='overflow' id='over5' onClick={e => custom("cate5", "over5")}></div>

                                                <div className='option' id='cate5' onClick={w => seterrorfield({ ...errorfield, tutorprefchildage: "" })}>

                                                    <p ><input type="checkbox" checked={children_age.filter((e) => e.name == "0 - 1 years")[0] ? true : false} onClick={a => selectoption2("0 - 1 years")} /><h3>{"0 - 1 years"}  </h3><span></span></p>
                                                    <p ><input type="checkbox" checked={children_age.filter((e) => e.name == "1 - 3 years")[0] ? true : false} onClick={a => selectoption2("1 - 3 years")} /><h3>{"1 - 3 years"}  </h3><span></span></p>
                                                    <p ><input type="checkbox" checked={children_age.filter((e) => e.name == "4 - 7 years")[0] ? true : false} onClick={a => selectoption2("4 - 7 years")} /><h3>{"4 - 7 years"}  </h3><span></span></p>
                                                    <p ><input type="checkbox" checked={children_age.filter((e) => e.name == "8 - 10 years")[0] ? true : false} onClick={a => selectoption2("8 - 10 years")} /><h3>{"8 - 10 years"}  </h3><span></span></p>
                                                    <p ><input type="checkbox" checked={children_age.filter((e) => e.name == "11 - 15 years")[0] ? true : false} onClick={a => selectoption2("11 - 15 years")} /><h3>{"11 - 15 years"} </h3><span></span></p>
                                                    <p><input type="checkbox" checked={children_age.filter((e) => e.name == "16+  years")[0] ? true : false} onClick={a => selectoption2("16+  years")} /><h3>{"16+  years"} </h3><span></span></p>
                                                </div>


                                                {/* <span >
                                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#636363" />
                                                    </svg>
                                                </span> */}
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        <div className='form_group full'>
                                            <label>Start date<span className={errorfield.tutorstartdate != "" ? "starred" : ""}>*</span></label>
                                            <div className='date_cal'>
                                                <span><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.3281 5.625H0.421875C0.189844 5.625 0 5.43516 0 5.20312V3.9375C0 3.00586 0.755859 2.25 1.6875 2.25H3.375V0.421875C3.375 0.189844 3.56484 0 3.79688 0H5.20312C5.43516 0 5.625 0.189844 5.625 0.421875V2.25H10.125V0.421875C10.125 0.189844 10.3148 0 10.5469 0H11.9531C12.1852 0 12.375 0.189844 12.375 0.421875V2.25H14.0625C14.9941 2.25 15.75 3.00586 15.75 3.9375V5.20312C15.75 5.43516 15.5602 5.625 15.3281 5.625ZM0.421875 6.75H15.3281C15.5602 6.75 15.75 6.93984 15.75 7.17188V16.3125C15.75 17.2441 14.9941 18 14.0625 18H1.6875C0.755859 18 0 17.2441 0 16.3125V7.17188C0 6.93984 0.189844 6.75 0.421875 6.75ZM4.5 13.9219C4.5 13.6898 4.31016 13.5 4.07812 13.5H2.67188C2.43984 13.5 2.25 13.6898 2.25 13.9219V15.3281C2.25 15.5602 2.43984 15.75 2.67188 15.75H4.07812C4.31016 15.75 4.5 15.5602 4.5 15.3281V13.9219ZM4.5 9.42188C4.5 9.18984 4.31016 9 4.07812 9H2.67188C2.43984 9 2.25 9.18984 2.25 9.42188V10.8281C2.25 11.0602 2.43984 11.25 2.67188 11.25H4.07812C4.31016 11.25 4.5 11.0602 4.5 10.8281V9.42188ZM9 13.9219C9 13.6898 8.81016 13.5 8.57812 13.5H7.17188C6.93984 13.5 6.75 13.6898 6.75 13.9219V15.3281C6.75 15.5602 6.93984 15.75 7.17188 15.75H8.57812C8.81016 15.75 9 15.5602 9 15.3281V13.9219ZM9 9.42188C9 9.18984 8.81016 9 8.57812 9H7.17188C6.93984 9 6.75 9.18984 6.75 9.42188V10.8281C6.75 11.0602 6.93984 11.25 7.17188 11.25H8.57812C8.81016 11.25 9 11.0602 9 10.8281V9.42188ZM13.5 13.9219C13.5 13.6898 13.3102 13.5 13.0781 13.5H11.6719C11.4398 13.5 11.25 13.6898 11.25 13.9219V15.3281C11.25 15.5602 11.4398 15.75 11.6719 15.75H13.0781C13.3102 15.75 13.5 15.5602 13.5 15.3281V13.9219ZM13.5 9.42188C13.5 9.18984 13.3102 9 13.0781 9H11.6719C11.4398 9 11.25 9.18984 11.25 9.42188V10.8281C11.25 11.0602 11.4398 11.25 11.6719 11.25H13.0781C13.3102 11.25 13.5 11.0602 13.5 10.8281V9.42188Z" fill="#A98D4B" />
                                                </svg></span>
                                                {/* <input className={errorfield.tutorstartdate != "" ? "bordererror" : ""} type="date" min={today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0')} value={detailprovider.tutorstartdate != null ? detailprovider.tutorstartdate : ""} onChange={e => {
                                                    seterrorfield({ ...errorfield, tutorstartdate: "" })
                                                    setdetailprovide({ ...detailprovider, tutorstartdate: new Date(e.target.value) > today ? e.target.value : "" })
                                                }} />*/}
                                                <DatePicker className={errorfield.tutorstartdate != "" ? "bordererror" : ""} minDate={today} selected={detailprovider.tutorstartdate != null && detailprovider.tutorstartdate != "" ? new Date(detailprovider.tutorstartdate) : today} onChange={(date: Date) => {
                                                    seterrorfield({ ...errorfield, tutorstartdate: "" })
                                                    setdetailprovide({ ...detailprovider, tutorstartdate: date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') })
                                                }} />
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        <div className='form_group full qualification '>
                                            <label>I’m interested in<span className={errorfield.tutorintrestedin != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox create'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, tutorintrestedin: "" })}>
                                                    <li><input type="checkbox" name="" checked={tutorintrestedinm.fulltime != "" ? true : detailprovider.tutorintrestedin == "Full time" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            settutorintrestedinm({ ...tutorintrestedinm, fulltime: "Full time" })
                                                            setdetailprovide({ ...detailprovider, tutorintrestedin: "Full time" })
                                                        } else {
                                                            settutorintrestedinm({ ...tutorintrestedinm, fulltime: "" })
                                                            setdetailprovide({ ...detailprovider, tutorintrestedin: "" })
                                                        }
                                                    }} /><span> Full time</span></li>
                                                    <li><input type="checkbox" name="" checked={tutorintrestedinm.parttime != "" ? true : detailprovider.tutorintrestedin == "Part time" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            settutorintrestedinm({ ...tutorintrestedinm, parttime: "Part time" })
                                                            setdetailprovide({ ...detailprovider, tutorintrestedin: "Part time" })
                                                        } else {
                                                            settutorintrestedinm({ ...tutorintrestedinm, parttime: "" })
                                                            setdetailprovide({ ...detailprovider, tutorintrestedin: "" })
                                                        }
                                                    }} /><span>Part time </span></li>
                                                    <li><input type="checkbox" name="" checked={tutorintrestedinm.occasionally != "" ? true : detailprovider.tutorintrestedin == "Occasionally" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            settutorintrestedinm({ ...tutorintrestedinm, occasionally: "Occasionally" })
                                                            setdetailprovide({ ...detailprovider, tutorintrestedin: "Occasionally" })
                                                        } else {
                                                            settutorintrestedinm({ ...tutorintrestedinm, occasionally: "" })
                                                            setdetailprovide({ ...detailprovider, tutorintrestedin: "" })
                                                        }
                                                    }} /><span> Occasionally</span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                    </div>
                                    : ""}

                                <div className='nany2'>

                                    <div className='preferred_school_jobs tutor'>
                                        <h2 className='border'>Preferred school jobs</h2>
                                        <div className='form_group full'>
                                            <label>I am interested in working in school<span className={errorfield.nanyintrestedinschool != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox create'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, nanyintrestedinschool: "" })}>
                                                    <li><input type="radio" name="school" checked={detailprovider.nanyintrestedinschool == "Yes" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, nanyintrestedinschool: "Yes" })} /><span>Yes </span></li>
                                                    <li><input type="radio" name="school" checked={detailprovider.nanyintrestedinschool == "No" ? true : false} onClick={e => setdetailprovide({ ...detailprovider, nanyintrestedinschool: "No" })} /><span>No </span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        {detailprovider.nanyintrestedinschool == "Yes" ?
                                            <>
                                                <div className='form_group full'>
                                                    <label>Select all applicable</label>
                                                    <div className='text customselect '>
                                                        {selectcat ?
                                                            <span className='keyword' onClick={e => custom("cate9", "over6")} style={{
                                                                cursor: "pointer", whiteSpace: "nowrap",
                                                                overflow: "hidden"
                                                            }}>
                                                                {selectcat.map((e) => {
                                                                    if (typeof e.name == "string") {
                                                                        return e.name + ", "
                                                                    }
                                                                })}
                                                            </span>
                                                            : ""}
                                                    </div>
                                                    <div className='customselect inp'>
                                                        {/* <input className='keyword' type="text" placeholder='Choose from the list' value={selectcat.map((e) => {
                                                            return e.name
                                                        })} /> */}
                                                        <div className='overflow' id='over6' style={{ left: "-111%", top: "-37vh" }} onClick={e => custom("cate9", "over6")}></div>

                                                        <div className='option' id='cate9'>

                                                            <p ><input type="checkbox" onClick={a => selectoption("Kindergarten Teacher")} checked={selectcat.filter((e) => e.name == "Kindergarten Teacher")[0] ? true : false} /><h3>{"Kindergarten Teacher"} </h3><span></span></p>
                                                            <p ><input type="checkbox" onClick={a => selectoption("Elementary Teacher")} checked={selectcat.filter((e) => e.name == "Elementary Teacher")[0] ? true : false} /><h3>{"Elementary Teacher"} </h3><span></span></p>
                                                            <p ><input type="checkbox" onClick={a => selectoption("High School Teacher")} checked={selectcat.filter((e) => e.name == "High School Teacher")[0] ? true : false} /><h3>{"High School Teacher"} </h3><span></span></p>
                                                            <p ><input type="checkbox" onClick={a => selectoption("Special Education Teacher")} checked={selectcat.filter((e) => e.name == "Special Education Teacher")[0] ? true : false} /><h3>{"Special Education Teacher"} </h3><span></span></p>
                                                            <p ><input type="checkbox" onClick={a => selectoption("Special Education Paraprofessional")} checked={selectcat.filter((e) => e.name == "Special Education Paraprofessional")[0] ? true : false} /><h3>{"Special Education Paraprofessional"} </h3><span></span></p>
                                                            <p  ><input type="checkbox" onClick={a => setselectcat2([])} /><h3>{"None"} </h3><span></span></p>
                                                            {/* <div className='clr inp' onClick={e => {
                                                    setselectcat([])
                                                    window.location.reload()
                                                }}>Clear All <span>+</span></div>*/}
                                                        </div>


                                                        {/* <span >
                                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#636363" />
                                                            </svg>
                                                        </span> */}
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                                </div>

                                                <div className='form_group full'>
                                                    <label>Year of experience as a teacher<span className={errorfield.yearofexpasteacher != "" ? "starred" : ""}>*</span></label>
                                                    <div className='rang'>
                                                        <div class="slider" onClick={e => seterrorfield({ ...errorfield, yearofexpasteacher: "" })}>
                                                            <input type="range" min="0" max="60" onChange={e => setdetailprovide({ ...detailprovider, yearofexpasteacher: e.target.value })} style={{ "background-size": (((detailprovider.yearofexpasteacher == "" ? 0 : detailprovider.yearofexpasteacher) * 100) / 60) + "% 100% " }} value={(detailprovider.yearofexpasteacher == "" ? 0 : detailprovider.yearofexpasteacher)} />
                                                            <ul>
                                                                <li>0</li>
                                                                <li>15</li>
                                                                <li>30</li>
                                                                <li>45</li>
                                                                <li>60</li>
                                                            </ul>
                                                        </div>
                                                        <span id="rangeValue">{(detailprovider.yearofexpasteacher == "" ? 0 : detailprovider.yearofexpasteacher)}</span>
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                                </div>
                                            </>
                                            : ""}
                                    </div>
                                    <div className='general_info tutor  preferred_school_jobs'>
                                        <h2 className='border'>General info</h2>
                                        <div className='form_group full'>
                                            <label>Number of children you prefer to work with?<span className={errorfield.nanyworkwithnochild == "" ? "" : "starred"}>*</span></label>
                                            <div className='children_number'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, nanyworkwithnochild: "" })}>
                                                    <li onClick={e => setnchildren(1)} className={nchildren == 1 ? "active" : ""}>1</li>
                                                    <li onClick={e => setnchildren(2)} className={nchildren == 2 ? "active" : ""}>2</li>
                                                    <li onClick={e => setnchildren("twins")} className={nchildren == "twins" ? "active" : ""}>Twins</li>
                                                    <li onClick={e => setnchildren(3)} className={nchildren == 3 ? "active" : ""}>3+</li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        <div className='form_group  full'>
                                            <label>Preferred child’s age<span className={errorfield.nanyprefchildage != "" ? "starred" : ""}>*</span></label>
                                            <div className='text customselect '>
                                                {children_age2 ?
                                                    <span className='keyword' onClick={e => custom("cate6", "over7")} style={{
                                                        cursor: "pointer", whiteSpace: "nowrap",
                                                        overflow: "hidden"
                                                    }}>
                                                        {children_age2.map((e, index) => {
                                                            if (typeof e.name == "string") {
                                                                return (index > 0 ? ", " : "") + e.name
                                                            }
                                                        })}
                                                    </span>
                                                    : ""}
                                            </div>
                                            <div className='customselect inp'>

                                                {/* <div className='childinput'>
                                                    {children_age2.map((e, index) => {
                                                        return e.name 
                                                    })}
                                                </div> */}

                                                {/* <input className='keyword' type="text" placeholder='Choose from the list' value={children_age2.map((e, index) => {
                                                    return e.name + (children_age2.length - 1 >= index + 1 ? "; " : "")
                                                })} /> */}
                                                <div className='overflow' id='over7' onClick={e => custom("cate6", "over7")}></div>

                                                <div className='option' id='cate6' onClick={e => seterrorfield({ ...errorfield, nanyprefchildage: "" })}>

                                                    <p ><input type="checkbox" checked={children_age2.filter((e) => e.name == "0 - 1 years")[0] ? true : false} onClick={a => selectoption4("0 - 1 years")} /><h3>{"0 - 1 years"} </h3><span></span></p>
                                                    <p ><input type="checkbox" checked={children_age2.filter((e) => e.name == "1 - 3 years")[0] ? true : false} onClick={a => selectoption4("1 - 3 years")} /><h3>{"1 - 3 years"}  </h3><span></span></p>
                                                    <p ><input type="checkbox" checked={children_age2.filter((e) => e.name == "4 - 7 years")[0] ? true : false} onClick={a => selectoption4("4 - 7 years")} /><h3>{"4 - 7 years"}  </h3><span></span></p>
                                                    <p ><input type="checkbox" checked={children_age2.filter((e) => e.name == "8 - 10 years")[0] ? true : false} onClick={a => selectoption4("8 - 10 years")} /><h3>{"8 - 10 years"} </h3><span></span></p>
                                                    <p ><input type="checkbox" checked={children_age2.filter((e) => e.name == "11 - 15 years")[0] ? true : false} onClick={a => selectoption4("11 - 15 years")} /><h3>{"11 - 15 years"}  </h3><span></span></p>
                                                    <p><input type="checkbox" checked={children_age2.filter((e) => e.name == "16+  years")[0] ? true : false} onClick={a => selectoption4("16+  years")} /><h3>{"16+  years"}  </h3><span></span></p>
                                                </div>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        <div className='form_group full'>
                                            <label>Start date<span className={errorfield.nanystartdate != "" ? "starred" : ""}>*</span></label>
                                            <div className='date_cal'>
                                                <span><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.3281 5.625H0.421875C0.189844 5.625 0 5.43516 0 5.20312V3.9375C0 3.00586 0.755859 2.25 1.6875 2.25H3.375V0.421875C3.375 0.189844 3.56484 0 3.79688 0H5.20312C5.43516 0 5.625 0.189844 5.625 0.421875V2.25H10.125V0.421875C10.125 0.189844 10.3148 0 10.5469 0H11.9531C12.1852 0 12.375 0.189844 12.375 0.421875V2.25H14.0625C14.9941 2.25 15.75 3.00586 15.75 3.9375V5.20312C15.75 5.43516 15.5602 5.625 15.3281 5.625ZM0.421875 6.75H15.3281C15.5602 6.75 15.75 6.93984 15.75 7.17188V16.3125C15.75 17.2441 14.9941 18 14.0625 18H1.6875C0.755859 18 0 17.2441 0 16.3125V7.17188C0 6.93984 0.189844 6.75 0.421875 6.75ZM4.5 13.9219C4.5 13.6898 4.31016 13.5 4.07812 13.5H2.67188C2.43984 13.5 2.25 13.6898 2.25 13.9219V15.3281C2.25 15.5602 2.43984 15.75 2.67188 15.75H4.07812C4.31016 15.75 4.5 15.5602 4.5 15.3281V13.9219ZM4.5 9.42188C4.5 9.18984 4.31016 9 4.07812 9H2.67188C2.43984 9 2.25 9.18984 2.25 9.42188V10.8281C2.25 11.0602 2.43984 11.25 2.67188 11.25H4.07812C4.31016 11.25 4.5 11.0602 4.5 10.8281V9.42188ZM9 13.9219C9 13.6898 8.81016 13.5 8.57812 13.5H7.17188C6.93984 13.5 6.75 13.6898 6.75 13.9219V15.3281C6.75 15.5602 6.93984 15.75 7.17188 15.75H8.57812C8.81016 15.75 9 15.5602 9 15.3281V13.9219ZM9 9.42188C9 9.18984 8.81016 9 8.57812 9H7.17188C6.93984 9 6.75 9.18984 6.75 9.42188V10.8281C6.75 11.0602 6.93984 11.25 7.17188 11.25H8.57812C8.81016 11.25 9 11.0602 9 10.8281V9.42188ZM13.5 13.9219C13.5 13.6898 13.3102 13.5 13.0781 13.5H11.6719C11.4398 13.5 11.25 13.6898 11.25 13.9219V15.3281C11.25 15.5602 11.4398 15.75 11.6719 15.75H13.0781C13.3102 15.75 13.5 15.5602 13.5 15.3281V13.9219ZM13.5 9.42188C13.5 9.18984 13.3102 9 13.0781 9H11.6719C11.4398 9 11.25 9.18984 11.25 9.42188V10.8281C11.25 11.0602 11.4398 11.25 11.6719 11.25H13.0781C13.3102 11.25 13.5 11.0602 13.5 10.8281V9.42188Z" fill="#A98D4B" />
                                                </svg></span>
                                                {/* <input className={errorfield.nanystartdate != "" ? "bordererror" : ""} type="date" min={today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0')} value={detailprovider.nanystartdate != null ? detailprovider.nanystartdate : ""} onChange={e => {
                                                        seterrorfield({ ...errorfield, nanystartdate: "" })
                                                        setdetailprovide({ ...detailprovider, nanystartdate: new Date(e.target.value) > today ? e.target.value : "" })
                                                    }} />*/}
                                                <DatePicker className={errorfield.nanystartdate != "" ? "bordererror" : ""} minDate={today} selected={detailprovider.nanystartdate != null && detailprovider.nanystartdate != "" ? new Date(detailprovider.nanystartdate) : today} onChange={(date: Date) => {
                                                    seterrorfield({ ...errorfield, nanystartdate: "" })
                                                    setdetailprovide({ ...detailprovider, nanystartdate: date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') })
                                                }} />
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        <div className='form_group full qualification '>
                                            <label>I’m interested in<span className={errorfield.nanyintrestedin != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox create'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, nanyintrestedin: "" })}>
                                                    <li><input type="radio" name="" checked={tutorintrestedinm.fulltime != "" ? true : detailprovider.nanyintrestedin == "Full time" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            // settutorintrestedinm({ ...tutorintrestedinm, fulltime: "Full time" })
                                                            setdetailprovide({ ...detailprovider, nanyintrestedin: "Full time" })
                                                        } else {
                                                            setdetailprovide({ ...detailprovider, nanyintrestedin: "" })
                                                            // settutorintrestedinm({ ...tutorintrestedinm, fulltime: "" })
                                                        }
                                                    }} /><span>Full time </span></li>
                                                    <li><input type="radio" name="" checked={tutorintrestedinm.parttime != "" ? true : detailprovider.nanyintrestedin == "Part time" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            // settutorintrestedinm({ ...tutorintrestedinm, parttime: "Part time" })
                                                            setdetailprovide({ ...detailprovider, nanyintrestedin: "Part time" })
                                                        } else {
                                                            setdetailprovide({ ...detailprovider, nanyintrestedin: "" })
                                                            // settutorintrestedinm({ ...tutorintrestedinm, parttime: "" })
                                                        }
                                                    }} /><span>Part time </span></li>
                                                    <li><input type="radio" name="" checked={tutorintrestedinm.occasionally != "" ? true : detailprovider.nanyintrestedin == "Occasionally" ? true : false} onClick={e => {
                                                        if (e.target.checked) {
                                                            // settutorintrestedinm({ ...tutorintrestedinm, occasionally: "Occasionally" })
                                                            setdetailprovide({ ...detailprovider, nanyintrestedin: "Occasionally" })
                                                        } else {
                                                            setdetailprovide({ ...detailprovider, nanyintrestedin: "" })
                                                            // settutorintrestedinm({ ...tutorintrestedinm, occasionally: "" })
                                                        }
                                                    }} /><span> Occasionally</span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                    </div>
                                </div>

                                <div className='button'>
                                    <button onClick={e => {
                                        stapset(3)
                                        setmobile(-32)
                                        window.scrollTo({ top: 0 });
                                    }}>Back</button>
                                    <button onClick={e => {
                                        if ((detail.service_type && detail.service_type.tab1 ? (usd.min > 5 || usd.max > 5) : detailprovider.nanyintrestedinschool != "") && (detail.service_type && detail.service_type.tab4 ? (detail.service_type && !detail.service_type.tab2 && !detail.service_type.tab3 ? (qualifications.English || qualifications.Serbian || qualifications.Mathematics || qualifications.Physics || qualifications.Chemistry || qualifications.Other) && detailprovider.tutorintrestedonlinecls != "" : detailprovider.nanyintrestedin != "") && tutorusd.max > 5 : detailprovider.nanyintrestedin != "") && (detail.service_type && detail.service_type.tab2 ? usd3.max > 0 : detailprovider.nanyintrestedin != "") && (detail.service_type && detail.service_type.tab3 ? usd4.max > 0 : detailprovider.nanyintrestedin != "") && detailprovider.nanyintrestedinschool != "" && nchildren != "" && children_age2[0] && detailprovider.nanystartdate != "" && detailprovider.nanyintrestedin != "") {
                                            {
                                                stapset(5)
                                                setmobile(-46)
                                                window.scrollTo({ top: 0 });
                                                profile_update(false)
                                            }
                                            setTimeout(() => {
                                                setcalandertype(1)
                                            }, 500);
                                        } else {
                                            step4.map((e) => {
                                                after_logins_field(e.name)
                                            })
                                        }
                                    }}>Next</button>
                                </div>
                            </div>
                            {/**/}
                            <div className='detail availability setp5' style={stap == 5 ? {} : { "display": "none" }}>
                                <div className='form_group full'>
                                    <label>Your availability and working hours*</label>
                                    <p>Share your availability with families. You can always update your schedule if it changes later.</p>
                                </div>
                                <div className='form_group full'>
                                    <label>Auto-fill your calendar:</label>
                                    <ul>
                                        <li onClick={e => setcalandertype(1)} className={calandertype == 1 ? "active" : ""}>Full time</li>
                                        <li onClick={e => setcalandertype(2)} className={calandertype == 2 ? "active" : ""}>Before school</li>
                                        <li onClick={e => setcalandertype(3)} className={calandertype == 3 ? "active" : ""}>After school</li>
                                        <li onClick={e => setcalandertype(4)} className={calandertype == 4 ? "active" : ""}>Overnight</li>
                                        <li onClick={e => setcalandertype(5)} className={calandertype == 5 ? "active" : ""}>Weekends</li>
                                    </ul>
                                </div>
                                <div className='calander'>
                                    <div className='form_group full'>
                                        <label>Select days when you are available and your working hours</label>
                                    </div>
                                    <div className='calanderfull'>
                                        {
                                            calandertype == 1 ?
                                                <Calander data={calender_data} data1={detailprovider.fulltime} data2={"fulltime"} />
                                                : ""
                                        }{
                                            calandertype == 2 ?
                                                <Calander data={calender_data} data1={detailprovider.beforeschool} data2={"beforeschool"} />
                                                : ""
                                        }{
                                            calandertype == 3 ?
                                                <Calander data={calender_data} data1={detailprovider.afterschool} data2={"afterschool"} />
                                                : ""
                                        }{
                                            calandertype == 4 ?
                                                <Calander data={calender_data} data1={detailprovider.overnight} data2={"overnight"} />
                                                : ""
                                        }
                                        {
                                            calandertype == 5 ?
                                                <Calander data={calender_data} data1={detailprovider.weekends} data2={"weekends"} />
                                                : ""
                                        }
                                    </div>
                                    <div className='legend'>
                                        <div className='form_group full'>
                                            <label className='border'>Legend</label>
                                            <ul>
                                                <li><strong>Full time</strong><br />Mon - Fri, 9:00 AM to 6:00 PM</li>
                                                <li><strong>Before school</strong><br />Mon - Fri, 6:00 AM to 9:00 AM</li>
                                                <li><strong>After school</strong><br />Mon - Fri, 3:00 PM to 9:00 PM</li>
                                                <li><strong>Overnight</strong><br />Mon - Fri, 9:00 PM to 6:00 AM</li>
                                                <li><strong>Weekends</strong><br />Saturday 12:00 AM to Sunday 11:59 PM</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='button'>
                                    <button onClick={e => {
                                        stapset(4)
                                        setmobile(-46)
                                        window.scrollTo({ top: 0 });
                                    }}>Back</button>
                                    <button onClick={e => {
                                        if (detailprovider.fulltime != "" || detailprovider.beforeschool != "" || detailprovider.afterschool != "" || detailprovider.overnight != "" || detailprovider.weekends != "") {
                                            stapset(6)
                                            setmobile(-60)
                                            window.scrollTo({ top: 0 });
                                            profile_update(false)
                                        } else {
                                            step5.map((e) => {
                                                after_logins_field(e.name)
                                            })
                                        }
                                    }}>Next</button>
                                </div>
                            </div>
                            {/**/}
                            <div className='detail  additional_info setp6' style={stap == 6 ? {} : { "display": "none" }}>
                                <div className='form_group full' onClick={e => seterrorfield({ ...errorfield, englishlevel: "", frenchlevel: "", italianlevel: "", germanlevel: "", spanishlevel: "", chineselevel: "", otherlevel: "" })}>
                                    <label>What languages do you speak?<span className={errorfield.englishlevel != "" && errorfield.frenchlevel != "" && errorfield.italianlevel != "" && errorfield.germanlevel != "" && errorfield.spanishlevel != "" && errorfield.chineselevel != "" && errorfield.otherlevel != "" ? "starred" : ""}>*</span></label>
                                    <div className='language'>
                                        <strong>English</strong>
                                        <ul>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "English_1") == "") {
                                                    languageselect("English_1")
                                                    setdetailprovide({ ...detailprovider, englishlevel: "Beginner" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, englishlevel: "" })
                                                    languageselect("English_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "English_1") != "" || detailprovider.englishlevel == "Beginner" ? "active" : ""}>Beginner</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "English_2") == "") {
                                                    languageselect("English_2")
                                                    setdetailprovide({ ...detailprovider, englishlevel: "Intermediate" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, englishlevel: "" })
                                                    languageselect("English_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "English_2") != "" || detailprovider.englishlevel == "Intermediate" ? "active" : ""}>Intermediate</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "English_3") == "") {
                                                    languageselect("English_3")
                                                    setdetailprovide({ ...detailprovider, englishlevel: "Fluent" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, englishlevel: "" })
                                                    languageselect("English_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "English_3") != "" || detailprovider.englishlevel == "Fluent" ? "active" : ""}>Fluent</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "English_4") == "") {
                                                    languageselect("English_4")
                                                    setdetailprovide({ ...detailprovider, englishlevel: "Native" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, englishlevel: "" })
                                                    languageselect("English_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "English_4") != "" || detailprovider.englishlevel == "Native" ? "active" : ""}>Native</li>
                                        </ul>
                                    </div>
                                    <div className='language'>
                                        <strong>French</strong>
                                        <ul>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "French_1") == "") {
                                                    languageselect("French_1")
                                                    setdetailprovide({ ...detailprovider, frenchlevel: "Beginner" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, frenchlevel: "" })
                                                    languageselect("French_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "French_1") != "" || detailprovider.frenchlevel == "Beginner" ? "active" : ""}>Beginner</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "French_2") == "") {
                                                    languageselect("French_2")
                                                    setdetailprovide({ ...detailprovider, frenchlevel: "Intermediate" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, frenchlevel: "" })
                                                    languageselect("French_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "French_2") != "" || detailprovider.frenchlevel == "Intermediate" ? "active" : ""}>Intermediate</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "French_3") == "") {
                                                    languageselect("French_3")
                                                    setdetailprovide({ ...detailprovider, frenchlevel: "Fluent" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, frenchlevel: "" })
                                                    languageselect("French_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "French_3") != "" || detailprovider.frenchlevel == "Fluent" ? "active" : ""}>Fluent</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "French_4") == "") {
                                                    languageselect("French_4")
                                                    setdetailprovide({ ...detailprovider, frenchlevel: "Native" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, frenchlevel: "" })
                                                    languageselect("French_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "French_4") != "" || detailprovider.frenchlevel == "Native" ? "active" : ""}>Native</li>
                                        </ul>
                                    </div>
                                    <div className='language'>
                                        <strong>Italian</strong>
                                        <ul>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Italian_1") == "") {
                                                    languageselect("Italian_1")
                                                    setdetailprovide({ ...detailprovider, italianlevel: "Beginner" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, italianlevel: "" })
                                                    languageselect("Italian_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Italian_1") != "" || detailprovider.italianlevel == "Beginner" ? "active" : ""}>Beginner</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Italian_2") == "") {
                                                    languageselect("Italian_2")
                                                    setdetailprovide({ ...detailprovider, italianlevel: "Intermediate" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, italianlevel: "" })
                                                    languageselect("Italian_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Italian_2") != "" || detailprovider.italianlevel == "Intermediate" ? "active" : ""}>Intermediate</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Italian_3") == "") {
                                                    languageselect("Italian_3")
                                                    setdetailprovide({ ...detailprovider, italianlevel: "Fluent" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, italianlevel: "" })
                                                    languageselect("Italian_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Italian_3") != "" || detailprovider.italianlevel == "Fluent" ? "active" : ""}>Fluent</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Italian_4") == "") {
                                                    languageselect("Italian_4")
                                                    setdetailprovide({ ...detailprovider, italianlevel: "Native" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, italianlevel: "" })
                                                    languageselect("Italian_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Italian_4") != "" || detailprovider.italianlevel == "Native" ? "active" : ""}>Native</li>
                                        </ul>
                                    </div>
                                    <div className='language'>
                                        <strong>German</strong>
                                        <ul>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "German_1") == "") {
                                                    languageselect("German_1")
                                                    setdetailprovide({ ...detailprovider, germanlevel: "Beginner" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, germanlevel: "" })
                                                    languageselect("German_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "German_1") != "" || detailprovider.germanlevel == "Beginner" ? "active" : ""}>Beginner</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "German_2") == "") {
                                                    languageselect("German_2")
                                                    setdetailprovide({ ...detailprovider, germanlevel: "Intermediate" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, germanlevel: "" })
                                                    languageselect("German_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "German_2") != "" || detailprovider.germanlevel == "Intermediate" ? "active" : ""}>Intermediate</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "German_3") == "") {
                                                    languageselect("German_3")
                                                    setdetailprovide({ ...detailprovider, germanlevel: "Fluent" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, germanlevel: "" })
                                                    languageselect("German_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "German_3") != "" || detailprovider.germanlevel == "Fluent" ? "active" : ""}>Fluent</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "German_4") == "") {
                                                    languageselect("German_4")
                                                    setdetailprovide({ ...detailprovider, germanlevel: "Native" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, germanlevel: "" })
                                                    languageselect("German_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "German_4") != "" || detailprovider.germanlevel == "Native" ? "active" : ""}>Native</li>
                                        </ul>
                                    </div>
                                    <div className='language'>
                                        <strong>Spanish</strong>
                                        <ul>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Spanish_1") == "") {
                                                    languageselect("Spanish_1")
                                                    setdetailprovide({ ...detailprovider, spanishlevel: "Beginner" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, spanishlevel: "" })
                                                    languageselect("Spanish_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Spanish_1") != "" || detailprovider.spanishlevel == "Beginner" ? "active" : ""}>Beginner</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Spanish_2") == "") {
                                                    languageselect("Spanish_2")
                                                    setdetailprovide({ ...detailprovider, spanishlevel: "Intermediate" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, spanishlevel: "" })
                                                    languageselect("Spanish_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Spanish_2") != "" || detailprovider.spanishlevel == "Intermediate" ? "active" : ""}>Intermediate</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Spanish_3") == "") {
                                                    languageselect("Spanish_3")
                                                    setdetailprovide({ ...detailprovider, spanishlevel: "Fluent" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, spanishlevel: "" })
                                                    languageselect("Spanish_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Spanish_3") != "" || detailprovider.spanishlevel == "Fluent" ? "active" : ""}>Fluent</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Spanish_4") == "") {
                                                    languageselect("Spanish_4")
                                                    setdetailprovide({ ...detailprovider, spanishlevel: "Native" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, spanishlevel: "" })
                                                    languageselect("Spanish_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Spanish_4") != "" || detailprovider.spanishlevel == "Native" ? "active" : ""}>Native</li>
                                        </ul>
                                    </div>
                                    <div className='language'>
                                        <strong>Chinese</strong>
                                        <ul>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Chinese_1") == "") {
                                                    languageselect("Chinese_1")
                                                    setdetailprovide({ ...detailprovider, chineselevel: "Beginner" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, chineselevel: "" })
                                                    languageselect("Chinese_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Chinese_1") != "" || detailprovider.chineselevel == "Beginner" ? "active" : ""}>Beginner</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Chinese_2") == "") {
                                                    languageselect("Chinese_2")
                                                    setdetailprovide({ ...detailprovider, chineselevel: "Intermediate" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, chineselevel: "" })
                                                    languageselect("Chinese_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Chinese_2") != "" || detailprovider.chineselevel == "Intermediate" ? "active" : ""}>Intermediate</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Chinese_3") == "") {
                                                    languageselect("Chinese_3")
                                                    setdetailprovide({ ...detailprovider, chineselevel: "Fluent" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, chineselevel: "" })
                                                    languageselect("Chinese_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Chinese_3") != "" || detailprovider.chineselevel == "Fluent" ? "active" : ""}>Fluent</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Chinese_4") == "") {
                                                    languageselect("Chinese_4")
                                                    setdetailprovide({ ...detailprovider, chineselevel: "Native" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, chineselevel: "" })
                                                    languageselect("Chinese_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Chinese_4") != "" || detailprovider.chineselevel == "Native" ? "active" : ""}>Native</li>
                                        </ul>
                                    </div>
                                    <div className='language'>
                                        <strong>Other language <input type="text" placeholder="Type here" onChange={e => setdetailprovide({ ...detailprovider, otherlangname: e.target.value })} defaultValue={detailprovider.otherlangname != null ? detailprovider.otherlangname : ""} /></strong>
                                        <ul>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Other_1") == "") {
                                                    languageselect("Other_1")
                                                    setdetailprovide({ ...detailprovider, otherlevel: "Beginner" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, otherlevel: "" })
                                                    languageselect("Other_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Other_1") != "" || detailprovider.otherlevel == "Beginner" ? "active" : ""}>Beginner</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Other_2") == "") {
                                                    languageselect("Other_2")
                                                    setdetailprovide({ ...detailprovider, otherlevel: "Intermediate" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, otherlevel: "" })
                                                    languageselect("Other_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Other_2") != "" || detailprovider.otherlevel == "Intermediate" ? "active" : ""}>Intermediate</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Other_3") == "") {
                                                    languageselect("Other_3")
                                                    setdetailprovide({ ...detailprovider, otherlevel: "Fluent" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, otherlevel: "" })
                                                    languageselect("Other_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Other_3") != "" || detailprovider.otherlevel == "Fluent" ? "active" : ""}>Fluent</li>
                                            <li onClick={e => {
                                                if (languages.filter((e) => e.name == "Other_4") == "") {
                                                    languageselect("Other_4")
                                                    setdetailprovide({ ...detailprovider, otherlevel: "Native" })
                                                } else {
                                                    setdetailprovide({ ...detailprovider, otherlevel: "" })
                                                    languageselect("Other_5")
                                                }
                                            }
                                            }
                                                className={languages.filter((e) => e.name == "Other_4") != "" || detailprovider.otherlevel == "Native" ? "active" : ""}>Native</li>
                                        </ul>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className='iconsec'>

                                    <div className='right2'>
                                        <div className='form_group qualification full set'>
                                            <br />
                                            <label>Do you have any <a>allergies?</a><span className='smallpop'>Information about your medical condition will be not publicly available. To adhere to ethical standards, it is your responsibility to disclose to prospective employer any medical condition that could affect your work performance (e.g., heart problem, seizure, mental illness, etc.). Additionally, if you are substance user or you have an untreated mental illness, this job position might not be suitable for you.  </span> which could interfere with your work performance?<span className={errorfield.anyallergies != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox create'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, anyallergies: "" })}>
                                                    <li><input type="radio" name="allergies" onClick={e => setdetailprovide({ ...detailprovider, anyallergies: "Yes" })} checked={detailprovider.anyallergies == "Yes" ? true : false} /><span> Yes</span></li>
                                                    <li><input type="radio" name="allergies" onClick={e => setdetailprovide({ ...detailprovider, anyallergies: "No" })} checked={detailprovider.anyallergies == "No" ? true : false} /><span>No </span></li>

                                                </ul>
                                                {detailprovider.anyallergies == "Yes" ?
                                                    <>
                                                        <textarea rows="2" placeholder="Short description" maxlength="300" name="message" onChange={e => {
                                                            seterrorfield({ ...errorfield, anyallergiesdescription: "" })
                                                            setdetailprovide({ ...detailprovider, anyallergiesdescription: e.target.value })
                                                        }} defaultValue={detailprovider.anyallergiesdescription != null ? detailprovider.anyallergiesdescription : ""} className={errorfield.anyallergiesdescription != "" ? "bordererror" : ""}></textarea>
                                                        <span>Number of characters {(300 - detailprovider.anyallergiesdescription.length)}</span>
                                                    </>
                                                    : ""}
                                            </div>
                                        </div>
                                        <div className='form_group qualification full set'>
                                            <label>Do you have any <a>medical condition</a
                                            ><span className='smallpop'>Information about your medical condition will be not publicly available. To adhere to ethical standards, it is your responsibility to disclose to prospective employer any medical condition that could affect your work performance (e.g., heart problem, seizure, mental illness, etc.). Additionally, if you are substance user or you have an untreated mental illness, this job position might not be suitable for you.  </span> which could interfere with your work performance?
                                             <span className={errorfield.medicalcondition != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox create'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, medicalcondition: "" })}>
                                                    <li><input type="radio" name="medical" onClick={e => setdetailprovide({ ...detailprovider, medicalcondition: "Yes" })} checked={detailprovider.medicalcondition == "Yes" ? true : false} /><span>Yes </span></li>
                                                    <li><input type="radio" name="medical" onClick={e => setdetailprovide({ ...detailprovider, medicalcondition: "No" })} checked={detailprovider.medicalcondition == "No" ? true : false} /><span>No </span></li>

                                                </ul>
                                                {detailprovider.medicalcondition == "Yes" ?
                                                    <>
                                                        <textarea rows="2" placeholder="Short description" maxlength="300" name="message" onChange={e => {
                                                            seterrorfield({ ...errorfield, medicalconditiondescription: "" })
                                                            setdetailprovide({ ...detailprovider, medicalconditiondescription: e.target.value })
                                                        }} defaultValue={detailprovider.medicalconditiondescription != null ? detailprovider.medicalconditiondescription : ""} className={errorfield.medicalconditiondescription != "" ? "bordererror" : ""}></textarea>
                                                        <span>Number of characters {(300 - detailprovider.medicalconditiondescription.length)}</span>
                                                    </>
                                                    : ""}
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                    </div>
                                    <div className='left2'>
                                        {/* {detail.service_type && Object.keys(detail.service_type).length == 1 && detail.service_type.tab1 ? "" :
                                            <div className='form_group qualification full set ' style={{ marginBottom: "0" }}>
                                                <label>Do you have any allergies?<span className={errorfield.anyallergies != "" ? "starred" : ""}>*</span></label>
                                                <div className='checkbox create'>
                                                    <ul onClick={e => seterrorfield({ ...errorfield, anyallergies: "" })}>
                                                        <li><input type="radio" name="allergies" onClick={e => setdetailprovide({ ...detailprovider, anyallergies: "Yes" })} checked={detailprovider.anyallergies == "Yes" ? true : false} /><span> Yes</span></li>
                                                        <li><input type="radio" name="allergies" onClick={e => setdetailprovide({ ...detailprovider, anyallergies: "No" })} checked={detailprovider.anyallergies == "No" ? true : false} /><span> No</span></li>

                                                    </ul>
                                                    {detailprovider.anyallergies == "Yes" ?
                                                        <>
                                                            <textarea rows="2" placeholder="Short description" maxlength="300" name="message" onChange={e => {
                                                                seterrorfield({ ...errorfield, anyallergiesdescription: "" })
                                                                setdetailprovide({ ...detailprovider, anyallergiesdescription: e.target.value })
                                                            }} defaultValue={detailprovider.anyallergiesdescription != null ? detailprovider.anyallergiesdescription : ""} className={errorfield.anyallergiesdescription != "" ? "bordererror" : ""}></textarea>
                                                            <span>Number of characters {(300 - detailprovider.anyallergiesdescription.length)}</span>
                                                        </>
                                                        : ""}
                                                </div>
                                            </div>
                                        } */}
                                        <div className='icon'>
                                            <ul>
                                                {detail.service_type && detail.service_type.tab1 ?
                                                    <>
                                                        <li onClick={e => seterrorfield({ ...errorfield, smoke: "" })} className={errorfield.smoke != "" ? "starred" : ""}>Do you smoke?
                                                            <div className='icons'>
                                                                <svg className={habit.smoke == "false" ? "active" : ""} onClick={e => {

                                                                    sethabit({ ...habit, smoke: "false" })
                                                                }} width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                                    <circle stroke="#B7B7B7" cx="20" cy="20" r="19.5" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.61 16.5999H24.03C25.08 16.5999 26 17.3399 26 18.6499V19.1999C26 19.6099 26.33 19.9499 26.75 19.9499H26.76C27.17 19.9499 27.51 19.6199 27.51 19.1999V18.3099C27.51 16.4999 25.91 15.1499 24.04 15.1499H22.74C21.72 15.1499 20.8 14.4199 20.67 13.3999C20.55 12.4499 21.13 11.6999 21.97 11.4699C22.29 11.3799 22.51 11.0899 22.51 10.7499C22.51 10.2599 22.05 9.88992 21.58 10.0299C20.16 10.4399 19.13 11.7599 19.16 13.3099C19.18 15.1599 20.77 16.5999 22.61 16.5999ZM27.69 11.3299C27.52 11.8399 27.23 12.3 26.85 12.68C28.72 13.57 30 15.49 30 17.71V19.2C30 19.61 29.66 19.95 29.25 19.95C28.84 19.95 28.5 19.61 28.5 19.2V17.72C28.5 15.7 27.07 14.01 25.14 13.7C24.77 13.64 24.5 13.32 24.5 12.95V12.8C24.5 12.45 24.75 12.17 25.09 12.06C25.64 11.8799 26.08 11.4399 26.26 10.8899C26.37 10.5599 26.64 10.3199 26.98 10.3099C27.5 10.3199 27.85 10.8299 27.69 11.3299ZM23.5 20.9499C24.33 20.9499 25 21.62 25 22.4501C25 22.6901 24.94 22.9201 24.84 23.1301L22.66 20.9499H23.5ZM26 20.9499H27.5V23.95H26V20.9499ZM28.5 23.95V20.9499H30V23.95H28.5ZM11.415 12.9474C11.6795 12.9474 11.9332 13.0526 12.12 13.2399L27.7 28.8298C28.09 29.2198 28.09 29.8498 27.7 30.2398C27.31 30.6298 26.68 30.6298 26.29 30.2398L20 23.9498H11.5C10.67 23.9498 10 23.2798 10 22.4498C10 21.6198 10.67 20.9498 11.5 20.9498H17L10.71 14.6499C10.32 14.2599 10.32 13.6299 10.71 13.2399C10.8968 13.0526 11.1505 12.9474 11.415 12.9474Z" fill="#B7B7B7" />
                                                                </svg>
                                                                <svg className={habit.smoke == "true" ? "active" : ""} onClick={e => sethabit({ ...habit, smoke: "true" })} width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                                    <circle stroke="#B7B7B7" cx="20" cy="20" r="19.5" />
                                                                    <path style={{ transform: "translateY(8px) translateX(9px)" }} xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M16.85 5.62041C17.47 5.01041 17.85 4.17042 17.85 3.24043C17.85 1.73045 16.85 0.450466 15.47 0.0304707C14.99 -0.109528 14.5 0.250468 14.5 0.750462C14.5 1.08046 14.71 1.37045 15.02 1.46045C15.79 1.69045 16.35 2.40044 16.35 3.24043C16.35 4.06042 15.82 4.75042 15.08 5.00041C14.75 5.11041 14.5 5.39041 14.5 5.7404V5.8904C14.5 6.2604 14.77 6.58039 15.14 6.64039C17.07 6.95039 18.5 8.64037 18.5 10.6603V12.1403C18.5 12.5503 18.84 12.8903 19.25 12.8903C19.66 12.8903 20 12.5503 20 12.1403V10.6503C20 8.43037 18.72 6.51039 16.85 5.62041ZM13.5 13.8904H1.5C0.67 13.8904 0 14.5605 0 15.3905C0 16.2205 0.67 16.8906 1.5 16.8906H13.5C14.33 16.8906 15 16.2205 15 15.3905C15 14.5605 14.33 13.8904 13.5 13.8904ZM12.7301 8.09058H14.0301C15.9001 8.09058 17.5001 9.44056 17.5101 11.2505V12.1405C17.5101 12.5605 17.1701 12.8905 16.7601 12.8905H16.7501C16.3301 12.8905 16.0001 12.5505 16.0001 12.1405V11.5905C16.0001 10.2805 15.0801 9.54056 14.0301 9.54056H12.6101C10.7701 9.54056 9.18005 8.09058 9.15005 6.25061C9.12005 4.70063 10.1501 3.38065 11.5701 2.97066C12.0401 2.83066 12.5001 3.20065 12.5001 3.69064C12.5001 4.03064 12.2801 4.32063 11.9601 4.41063C11.1201 4.64063 10.5401 5.39062 10.6601 6.3406C10.7901 7.36059 11.7101 8.09058 12.7301 8.09058ZM16 13.8904H17.5V16.8906H16V13.8904ZM20 13.8904H18.5V16.8906H20V13.8904Z" fill="#B7B7B7" />
                                                                </svg>
                                                            </div>
                                                        </li>
                                                        <li onClick={e => seterrorfield({ ...errorfield, carorlicence: "" })} className={errorfield.carorlicence != "" ? "starred" : ""}>Do you own a car or licence?
                                                            <div className='icons'>
                                                                <svg className={habit.licence == "false" ? "active" : ""} onClick={e => {

                                                                    sethabit({ ...habit, licence: "false" })
                                                                }} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle stroke="#B7B7B7" cx="20" cy="20" r="19.5" />
                                                                    <path d="M29.5309 17.0494H27.3897L27.0829 16.2339C26.7238 15.2794 26.0897 14.4681 25.2492 13.8875C24.4087 13.3069 23.4239 13 22.4013 13H17.5988C16.5761 13 15.5913 13.3069 14.7508 13.8875C13.9102 14.4681 13.2762 15.2794 12.9171 16.2339L12.6103 17.0494H10.4691C10.1491 17.0494 9.92324 17.3618 10.0244 17.6643L10.3369 18.5988C10.368 18.6918 10.4277 18.7728 10.5075 18.8301C10.5873 18.8874 10.6832 18.9183 10.7816 18.9183H11.9072L11.9052 18.9237C11.1415 19.3502 10.625 20.1641 10.625 21.0987V22.9676C10.625 23.5994 10.8613 24.1758 11.25 24.615V27.017C11.25 27.5331 11.6697 27.9515 12.1875 27.9515H14.0625C14.5803 27.9515 15 27.5331 15 27.017V25.4595H25V27.017C25 27.5331 25.4197 27.9515 25.9375 27.9515H27.8125C28.3303 27.9515 28.75 27.5331 28.75 27.017V24.615C29.1387 24.1757 29.375 23.5993 29.375 22.9676V21.0987C29.375 20.1641 28.8585 19.3502 28.0948 18.9237L28.0928 18.9183H29.2184C29.3168 18.9183 29.4127 18.8874 29.4925 18.8301C29.5723 18.7728 29.632 18.6918 29.6631 18.5988L29.9756 17.6643C30.0768 17.3618 29.8509 17.0494 29.5309 17.0494ZM15.2579 17.1088C15.6218 16.1417 16.5625 15.4919 17.5988 15.4919H22.4013C23.4375 15.4919 24.3782 16.1417 24.7421 17.1088L25.3056 18.6068H14.6944L15.2579 17.1088ZM13.4375 23.2791C12.7471 23.2791 12.1875 22.7213 12.1875 22.0332C12.1875 21.3451 12.7471 20.7872 13.4375 20.7872C14.1279 20.7872 15.3125 21.968 15.3125 22.6561C15.3125 23.3443 14.1279 23.2791 13.4375 23.2791ZM26.5625 23.2791C25.8721 23.2791 24.6875 23.3443 24.6875 22.6561C24.6875 21.968 25.8721 20.7872 26.5625 20.7872C27.2529 20.7872 27.8125 21.3451 27.8125 22.0332C27.8125 22.7213 27.2529 23.2791 26.5625 23.2791Z" fill="#B7B7B7" />
                                                                    <path d="M14 12L30 28" stroke="#B7B7B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                <svg className={habit.licence == "true" ? "active" : ""} onClick={e => sethabit({ ...habit, licence: "true" })} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="20" cy="20" r="19.5" stroke="#B7B7B7" />
                                                                    <path d="M29.5309 17.0494H27.3897L27.0829 16.2339C26.7238 15.2794 26.0897 14.4681 25.2492 13.8875C24.4087 13.3069 23.4239 13 22.4013 13H17.5988C16.5761 13 15.5913 13.3069 14.7508 13.8875C13.9102 14.4681 13.2762 15.2794 12.9171 16.2339L12.6103 17.0494H10.4691C10.1491 17.0494 9.92324 17.3618 10.0244 17.6643L10.3369 18.5988C10.368 18.6918 10.4277 18.7728 10.5075 18.8301C10.5873 18.8874 10.6832 18.9183 10.7816 18.9183H11.9072L11.9052 18.9237C11.1415 19.3502 10.625 20.1641 10.625 21.0987V22.9676C10.625 23.5994 10.8613 24.1758 11.25 24.615V27.017C11.25 27.5331 11.6697 27.9515 12.1875 27.9515H14.0625C14.5803 27.9515 15 27.5331 15 27.017V25.4595H25V27.017C25 27.5331 25.4197 27.9515 25.9375 27.9515H27.8125C28.3303 27.9515 28.75 27.5331 28.75 27.017V24.615C29.1387 24.1757 29.375 23.5993 29.375 22.9676V21.0987C29.375 20.1641 28.8585 19.3502 28.0948 18.9237L28.0928 18.9183H29.2184C29.3168 18.9183 29.4127 18.8874 29.4925 18.8301C29.5723 18.7728 29.632 18.6918 29.6631 18.5988L29.9756 17.6643C30.0768 17.3618 29.8509 17.0494 29.5309 17.0494ZM15.2579 17.1088C15.6218 16.1417 16.5625 15.4919 17.5988 15.4919H22.4013C23.4375 15.4919 24.3782 16.1417 24.7421 17.1088L25.3056 18.6068H14.6944L15.2579 17.1088ZM13.4375 23.2791C12.7471 23.2791 12.1875 22.7213 12.1875 22.0332C12.1875 21.3451 12.7471 20.7872 13.4375 20.7872C14.1279 20.7872 15.3125 21.968 15.3125 22.6561C15.3125 23.3443 14.1279 23.2791 13.4375 23.2791ZM26.5625 23.2791C25.8721 23.2791 24.6875 23.3443 24.6875 22.6561C24.6875 21.968 25.8721 20.7872 26.5625 20.7872C27.2529 20.7872 27.8125 21.3451 27.8125 22.0332C27.8125 22.7213 27.2529 23.2791 26.5625 23.2791Z" fill="#B7B7B7" />
                                                                </svg>
                                                            </div>
                                                        </li>
                                                        <li onClick={e => seterrorfield({ ...errorfield, cooking: "" })} className={errorfield.cooking != "" ? "starred" : ""}>Cooking for kids
                                                            <div className='icons'>
                                                                <svg className={habit.kids == "false" ? "active" : ""} onClick={e => {

                                                                    sethabit({ ...habit, kids: "false" })
                                                                }} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle stroke="#B7B7B7" cx="20" cy="20" r="19.5" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6551 16.8799C14.75 16.9598 14.8745 17 14.9991 17C15.1237 17 15.2482 16.9598 15.3431 16.8799C15.5334 16.7196 15.5334 16.4605 15.3431 16.3002C14.8492 15.8837 14.8492 15.2064 15.3431 14.7899C15.7664 14.4332 16 13.9593 16 13.4551C16 12.9508 15.7669 12.4769 15.3431 12.1202C15.1528 11.9599 14.8453 11.9599 14.6551 12.1202C14.4648 12.2805 14.4648 12.5396 14.6551 12.6999C14.8945 12.9016 15.0268 13.1697 15.0268 13.4551C15.0268 13.7404 14.895 14.0085 14.6551 14.2102C13.7816 14.9461 13.7816 16.144 14.6551 16.8799Z" fill="#B7B7B7" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6551 16.8799C24.75 16.9598 24.8745 17 24.9991 17C25.1237 17 25.2482 16.9598 25.3431 16.8799C25.5334 16.7196 25.5334 16.4605 25.3431 16.3002C24.8492 15.8837 24.8492 15.2064 25.3431 14.7899C25.7664 14.4332 26 13.9593 26 13.4551C26 12.9508 25.7669 12.4769 25.3431 12.1202C25.1528 11.9599 24.8453 11.9599 24.6551 12.1202C24.4648 12.2805 24.4648 12.5396 24.6551 12.6999C24.8945 12.9016 25.0268 13.1697 25.0268 13.4551C25.0268 13.7404 24.895 14.0085 24.6551 14.2102C23.7816 14.9461 23.7816 16.144 24.6551 16.8799Z" fill="#B7B7B7" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6551 13.8799C19.75 13.9598 19.8745 14 19.9991 14C20.1237 14 20.2482 13.9598 20.3431 13.8799C20.5334 13.7196 20.5334 13.4605 20.3431 13.3002C19.8492 12.8837 19.8492 12.2064 20.3431 11.7899C20.7664 11.4332 21 10.9593 21 10.4551C21 9.9508 20.7669 9.47689 20.3431 9.12022C20.1528 8.95993 19.8453 8.95993 19.6551 9.12022C19.4648 9.28052 19.4648 9.53961 19.6551 9.69991C19.8945 9.90161 20.0268 10.1697 20.0268 10.4551C20.0268 10.7404 19.895 11.0085 19.6551 11.2102C18.7816 11.9461 18.7816 13.144 19.6551 13.8799Z" fill="#B7B7B7" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 18C22 18.28 21.94 18.55 21.84 18.79C25.75 19.6 28.73 22.93 29 27H11C11.27 22.93 14.25 19.6 18.16 18.79C18.06 18.55 18 18.28 18 18C18 16.9 18.9 16 20 16C21.1 16 22 16.9 22 18ZM30 30V28H10V30H30Z" fill="#B7B7B7" />
                                                                    <path d="M13 16L29 32" stroke="#B7B7B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                <svg className={habit.kids == "true" ? "active" : ""} onClick={e => sethabit({ ...habit, kids: "true" })} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="20" cy="20" r="19.5" stroke="#B7B7B7" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6551 15.8799C14.75 15.9598 14.8745 16 14.9991 16C15.1237 16 15.2482 15.9598 15.3431 15.8799C15.5334 15.7196 15.5334 15.4605 15.3431 15.3002C14.8492 14.8837 14.8492 14.2064 15.3431 13.7899C15.7664 13.4332 16 12.9593 16 12.4551C16 11.9508 15.7669 11.4769 15.3431 11.1202C15.1528 10.9599 14.8453 10.9599 14.6551 11.1202C14.4648 11.2805 14.4648 11.5396 14.6551 11.6999C14.8945 11.9016 15.0268 12.1697 15.0268 12.4551C15.0268 12.7404 14.895 13.0085 14.6551 13.2102C13.7816 13.9461 13.7816 15.144 14.6551 15.8799Z" fill="#B7B7B7" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6551 15.8799C24.75 15.9598 24.8745 16 24.9991 16C25.1237 16 25.2482 15.9598 25.3431 15.8799C25.5334 15.7196 25.5334 15.4605 25.3431 15.3002C24.8492 14.8837 24.8492 14.2064 25.3431 13.7899C25.7664 13.4332 26 12.9593 26 12.4551C26 11.9508 25.7669 11.4769 25.3431 11.1202C25.1528 10.9599 24.8453 10.9599 24.6551 11.1202C24.4648 11.2805 24.4648 11.5396 24.6551 11.6999C24.8945 11.9016 25.0268 12.1697 25.0268 12.4551C25.0268 12.7404 24.895 13.0085 24.6551 13.2102C23.7816 13.9461 23.7816 15.144 24.6551 15.8799Z" fill="#B7B7B7" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6551 12.8799C19.75 12.9598 19.8745 13 19.9991 13C20.1237 13 20.2482 12.9598 20.3431 12.8799C20.5334 12.7196 20.5334 12.4605 20.3431 12.3002C19.8492 11.8837 19.8492 11.2064 20.3431 10.7899C20.7664 10.4332 21 9.95931 21 9.45506C21 8.9508 20.7669 8.47689 20.3431 8.12022C20.1528 7.95993 19.8453 7.95993 19.6551 8.12022C19.4648 8.28052 19.4648 8.53961 19.6551 8.69991C19.8945 8.90161 20.0268 9.16972 20.0268 9.45506C20.0268 9.74039 19.895 10.0085 19.6551 10.2102C18.7816 10.9461 18.7816 12.144 19.6551 12.8799Z" fill="#B7B7B7" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 17C22 17.28 21.94 17.55 21.84 17.79C25.75 18.6 28.73 21.93 29 26H11C11.27 21.93 14.25 18.6 18.16 17.79C18.06 17.55 18 17.28 18 17C18 15.9 18.9 15 20 15C21.1 15 22 15.9 22 17ZM30 29V27H10V29H30Z" fill="#B7B7B7" />
                                                                </svg>
                                                            </div>
                                                        </li>
                                                        <li onClick={e => seterrorfield({ ...errorfield, lighthousework: "" })} className={errorfield.lighthousework != "" ? "starred" : ""}>Light housework
                                                            <div className='icons'>

                                                                <svg className={habit.housework == "false" ? "active" : ""} onClick={e => sethabit({ ...habit, housework: "false" })} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="20" cy="20" r="19.5" stroke="#B7B7B7" />
                                                                    <path d="M28.773 11.4955C27.2368 10.6647 25.119 10.6297 23.2472 11.4043C21.5153 12.1214 20.2668 13.7015 19.5288 14.8889C19.1966 14.813 18.8411 14.961 18.6869 15.2622C18.5393 15.5502 18.6255 15.8844 18.8711 16.084C18.8038 16.2244 18.7627 16.3186 18.7472 16.3554L15.1627 23.7322C14.8012 23.5762 14.3706 23.7152 14.1923 24.0517C14.0107 24.3945 14.1598 24.8104 14.5256 24.9809L14.5501 24.9924L13.7437 26.6529H11.7398C11.3314 26.6529 11 26.9634 11 27.3461C11 27.7287 11.3314 28.0392 11.7398 28.0392H15.439C15.8474 28.0392 16.1789 27.7287 16.1789 27.3461C16.1789 26.9634 15.8474 26.6529 15.439 26.6529H15.3695L15.8825 25.5968C15.9502 25.6152 16.0187 25.6277 16.0871 25.6277C16.359 25.6277 16.6209 25.4866 16.7504 25.243C16.9198 24.9234 16.7992 24.5432 16.4862 24.3546L20.2006 16.7106C20.3009 16.7539 20.4055 16.7755 20.5095 16.7755C20.7851 16.7755 21.0495 16.6306 21.1768 16.3821C21.3462 16.0518 21.2086 15.6601 20.8735 15.482C21.5064 14.4827 22.5196 13.2215 23.8458 12.6725C25.2714 12.0823 26.9154 12.0913 28.0336 12.6961C28.8559 13.1407 29.3283 13.8481 29.4385 14.7992C29.6449 16.5803 29.4699 17.7746 28.9199 18.3496C28.8692 18.4026 28.8134 18.4481 28.7564 18.491V20.0427C29.2122 19.8985 29.6497 19.6632 30.0212 19.2754C30.8764 18.3829 31.1667 16.8697 30.9097 14.6498C30.7507 13.2742 29.9916 12.154 28.773 11.4955Z" fill="#B7B7B7" />
                                                                    <path d="M26.6663 23.1869C27.149 23.1869 27.6055 23.2899 28.0165 23.4694V20.2042V18.7978V17.9881C28.0165 17.6052 28.0553 17.6416 27.6466 17.6416H26.1976C25.7889 17.6416 21.6661 17.9594 20.5771 23.0033L19.8783 27.1727C19.8783 27.5557 20.2094 28.0392 20.6181 28.0392H24.129C23.7066 27.5293 23.4524 26.8916 23.4524 26.1981C23.4524 24.5376 24.8944 23.1869 26.6663 23.1869Z" fill="#B7B7B7" />
                                                                    <path d="M28.3861 24.5358C28.2725 24.4329 28.149 24.34 28.0162 24.2586C27.6274 24.0201 27.1639 23.8801 26.666 23.8801C25.3018 23.8801 24.192 24.9199 24.192 26.1981C24.192 26.9488 24.5767 27.6156 25.1694 28.0392C25.3758 28.1868 25.607 28.3043 25.8567 28.3858C26.1108 28.4686 26.3824 28.5157 26.6661 28.5157C26.9498 28.5157 27.2213 28.4686 27.4755 28.3858C27.7374 28.3005 27.9797 28.1754 28.1935 28.0177C28.3947 27.8694 28.5719 27.6936 28.7158 27.4947C28.9836 27.1242 29.1405 26.6778 29.1405 26.1978C29.1405 25.7438 28.9985 25.3212 28.7569 24.9636C28.6506 24.8076 28.527 24.6638 28.3861 24.5358ZM26.666 25.0353C27.3511 25.0353 27.9067 25.5559 27.9067 26.1978C27.9067 26.8396 27.3511 27.3602 26.666 27.3602C25.9809 27.3602 25.4253 26.8396 25.4253 26.1978C25.4253 25.5559 25.9805 25.0353 26.666 25.0353Z" fill="#B7B7B7" />
                                                                    <path d="M17 12L33 28" stroke="#B7B7B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M15 12L31 28" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                <svg className={habit.housework == "true" ? "active" : ""} onClick={e => sethabit({ ...habit, housework: "true" })} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="20" cy="20" r="19.5" stroke="#B7B7B7" />
                                                                    <path d="M27.773 11.4955C26.2368 10.6647 24.119 10.6297 22.2472 11.4043C20.5153 12.1214 19.2668 13.7015 18.5288 14.8889C18.1966 14.813 17.8411 14.961 17.6869 15.2622C17.5393 15.5502 17.6255 15.8844 17.8711 16.084C17.8038 16.2244 17.7627 16.3186 17.7472 16.3554L14.1627 23.7322C13.8012 23.5762 13.3706 23.7152 13.1923 24.0517C13.0107 24.3945 13.1598 24.8104 13.5256 24.9809L13.5501 24.9924L12.7437 26.6529H10.7398C10.3314 26.6529 10 26.9634 10 27.3461C10 27.7287 10.3314 28.0392 10.7398 28.0392H14.439C14.8474 28.0392 15.1789 27.7287 15.1789 27.3461C15.1789 26.9634 14.8474 26.6529 14.439 26.6529H14.3695L14.8825 25.5968C14.9502 25.6152 15.0187 25.6277 15.0871 25.6277C15.359 25.6277 15.6209 25.4866 15.7504 25.243C15.9198 24.9234 15.7992 24.5432 15.4862 24.3546L19.2006 16.7106C19.3009 16.7539 19.4055 16.7755 19.5095 16.7755C19.7851 16.7755 20.0495 16.6306 20.1768 16.3821C20.3462 16.0518 20.2086 15.6601 19.8735 15.482C20.5064 14.4827 21.5196 13.2215 22.8458 12.6725C24.2714 12.0823 25.9154 12.0913 27.0336 12.6961C27.8559 13.1407 28.3283 13.8481 28.4385 14.7992C28.6449 16.5803 28.4699 17.7746 27.9199 18.3496C27.8692 18.4026 27.8134 18.4481 27.7564 18.491V20.0427C28.2122 19.8985 28.6497 19.6632 29.0212 19.2754C29.8764 18.3829 30.1667 16.8697 29.9097 14.6498C29.7507 13.2742 28.9916 12.154 27.773 11.4955Z" fill="#B7B7B7" />
                                                                    <path d="M25.6664 23.1869C26.1491 23.1869 26.6056 23.2899 27.0166 23.4694V20.2042V18.7978V17.9881C27.0166 17.6052 27.0554 17.6416 26.6467 17.6416H25.1977C24.789 17.6416 20.6662 17.9594 19.5772 23.0033L18.8784 27.1727C18.8784 27.5557 19.2095 28.0392 19.6183 28.0392H23.1291C22.7067 27.5293 22.4526 26.8916 22.4526 26.1981C22.4526 24.5376 23.8945 23.1869 25.6664 23.1869Z" fill="#B7B7B7" />
                                                                    <path d="M27.386 24.5358C27.2724 24.4329 27.1489 24.34 27.0161 24.2586C26.6273 24.0201 26.1638 23.8801 25.6659 23.8801C24.3016 23.8801 23.1919 24.9199 23.1919 26.1981C23.1919 26.9488 23.5766 27.6156 24.1693 28.0392C24.3757 28.1868 24.6068 28.3043 24.8566 28.3858C25.1107 28.4686 25.3822 28.5157 25.6659 28.5157C25.9497 28.5157 26.2212 28.4686 26.4753 28.3858C26.7373 28.3005 26.9795 28.1754 27.1934 28.0177C27.3946 27.8694 27.5718 27.6936 27.7157 27.4947C27.9835 27.1242 28.1404 26.6778 28.1404 26.1978C28.1404 25.7438 27.9983 25.3212 27.7568 24.9636C27.6504 24.8076 27.5269 24.6638 27.386 24.5358ZM25.6659 25.0353C26.351 25.0353 26.9066 25.5559 26.9066 26.1978C26.9066 26.8396 26.351 27.3602 25.6659 27.3602C24.9808 27.3602 24.4252 26.8396 24.4252 26.1978C24.4252 25.5559 24.9804 25.0353 25.6659 25.0353Z" fill="#B7B7B7" />
                                                                </svg>

                                                            </div>
                                                        </li>
                                                        <li onClick={e => seterrorfield({ ...errorfield, traveling: "" })} className={errorfield.traveling != "" ? "starred" : ""}>Traveling with family
                                                            <div className='icons'>
                                                                <svg className={habit.family == "false" ? "active" : ""} onClick={e => {

                                                                    sethabit({ ...habit, family: "false" })
                                                                }} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="20" cy="20" r="19.5" stroke="#B7B7B7" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.4194 15.5777C29.7342 15.5577 30.0442 15.6622 30.2826 15.8689C30.8025 16.3889 29.7626 18.0944 29.2426 18.4688L23.0028 22.6286L14.1632 25.8785L11.5632 23.6686L14.6831 24.1886L20.9229 20.5487L14.6831 16.3889L15.2031 15.8689L24.5628 17.9488L28.2026 15.8689C28.5813 15.6819 28.9971 15.5824 29.4194 15.5777ZM29.419 14.0178C28.7332 14.0221 28.0581 14.1877 27.4483 14.5014L24.3284 16.3005L15.5615 14.3454C15.0409 14.2305 14.4977 14.3893 14.1211 14.7666L13.6012 15.2866C13.2703 15.6173 13.1054 16.0789 13.1517 16.5444C13.1981 17.0098 13.4508 17.4299 13.8403 17.6889L18.0002 20.4604L14.4071 22.5403L11.8228 22.1087C11.1292 21.9902 10.442 22.3507 10.1454 22.9889C9.84881 23.6271 10.0162 24.3848 10.5541 24.8386L13.154 27.0485C13.5852 27.4172 14.1825 27.5228 14.7139 27.3241L23.5536 24.0743C23.669 24.0319 23.7789 23.976 23.8812 23.9079L30.121 19.748L30.173 19.7116C31.1477 18.8829 31.7918 17.7312 31.9877 16.4669C32.0556 15.8362 31.8404 15.2078 31.4001 14.751C30.8729 14.243 30.1609 13.9725 29.4294 14.0022L29.419 14.0178Z" fill="#B7B7B7" />
                                                                    <path d="M14 12L30 28" stroke="#B7B7B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                <svg className={habit.family == "true" ? "active" : ""} onClick={e => sethabit({ ...habit, family: "true" })} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle stroke="#B7B7B7" cx="20" cy="20" r="19.5" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.4194 15.5777C29.7342 15.5577 30.0442 15.6622 30.2826 15.8689C30.8025 16.3889 29.7626 18.0944 29.2426 18.4688L23.0028 22.6286L14.1632 25.8785L11.5632 23.6686L14.6831 24.1886L20.9229 20.5487L14.6831 16.3889L15.2031 15.8689L24.5628 17.9488L28.2026 15.8689C28.5813 15.6819 28.9971 15.5824 29.4194 15.5777ZM29.419 14.0178C28.7332 14.0221 28.0581 14.1877 27.4483 14.5014L24.3284 16.3005L15.5615 14.3454C15.0409 14.2305 14.4977 14.3893 14.1211 14.7666L13.6012 15.2866C13.2703 15.6173 13.1054 16.0789 13.1517 16.5444C13.1981 17.0098 13.4508 17.4299 13.8403 17.6889L18.0002 20.4604L14.4071 22.5403L11.8228 22.1087C11.1292 21.9902 10.442 22.3507 10.1454 22.9889C9.84881 23.6271 10.0162 24.3848 10.5541 24.8386L13.154 27.0485C13.5852 27.4172 14.1825 27.5228 14.7139 27.3241L23.5536 24.0743C23.669 24.0319 23.7789 23.976 23.8812 23.9079L30.121 19.748L30.173 19.7116C31.1477 18.8829 31.7918 17.7312 31.9877 16.4669C32.0556 15.8362 31.8404 15.2078 31.4001 14.751C30.8729 14.243 30.1609 13.9725 29.4294 14.0022L29.419 14.0178Z" fill="#B7B7B7" />
                                                                </svg>
                                                            </div>
                                                        </li>
                                                    </>
                                                    : ""}
                                            </ul>
                                        </div>
                                        <div className='form_group full' style={{ marginTop: "20px" }}>
                                            <label>Interested in working abroad<span className={errorfield.workingabroad != "" ? "starred" : ""}>*</span></label>
                                            <div className='checkbox create'>
                                                <ul onClick={e => seterrorfield({ ...errorfield, workingabroad: "" })}>
                                                    <li><input type="radio" name="abroad" onClick={e => setdetailprovide({ ...detailprovider, workingabroad: "Yes" })} checked={detailprovider.workingabroad == "Yes" ? true : false} /><span> Yes</span></li>
                                                    <li><input type="radio" name="abroad" onClick={e => setdetailprovide({ ...detailprovider, workingabroad: "No" })} checked={detailprovider.workingabroad == "No" ? true : false} /><span> No</span></li>
                                                    <li><input type="radio" name="abroad" onClick={e => setdetailprovide({ ...detailprovider, workingabroad: "Open to offers" })} checked={detailprovider.workingabroad == "Open to offers" ? true : false} /><span> Open to offers</span></li>
                                                </ul>
                                            </div>
                                            {/* <div className='errorfield'>{error.message}</div>*/}
                                        </div>
                                        {detail.service_type && detail.service_type.tab1 && Object.keys(detail.service_type).length == 1 ?
                                            <div className='form_group full'>
                                                <label>Would you consider living with the family?<span className={errorfield.livewithfamily != "" ? "starred" : ""}>*</span></label>
                                                <div className='checkbox create'>
                                                    <ul onClick={e => seterrorfield({ ...errorfield, livewithfamily: "" })}>
                                                        <li><input type="radio" name="family" onClick={e => setdetailprovide({ ...detailprovider, livewithfamily: "Yes" })} checked={detailprovider.livewithfamily == "Yes" ? true : false} /><span> Yes</span></li>
                                                        <li><input type="radio" name="family" onClick={e => setdetailprovide({ ...detailprovider, livewithfamily: "No" })} checked={detailprovider.livewithfamily == "No" ? true : false} /><span>No </span></li>
                                                        <li><input type="radio" name="family" onClick={e => setdetailprovide({ ...detailprovider, livewithfamily: "Open to offers" })} checked={detailprovider.livewithfamily == "Open to offers" ? true : false} /><span> Open to offers</span></li>
                                                    </ul>
                                                </div>
                                                {/* <div className='errorfield'>{error.message}</div>*/}
                                            </div> : ""}
                                    </div>
                                </div>

                                <div className='button'>
                                    <button onClick={e => {
                                        stapset(5)
                                        setmobile(-60)
                                        window.scrollTo({ top: 0 });
                                        setTimeout(() => {
                                            setcalandertype(1)
                                        }, 500);
                                    }}>Back</button>
                                    <button onClick={e => {
                                        if ((detailprovider.englishlevel != "" || detailprovider.frenchlevel != "" || detailprovider.italianlevel != "" || detailprovider.germanlevel != "" || detailprovider.spanishlevel != "" || detailprovider.chineselevel != "" || detailprovider.otherlevel != "") && (detail.service_type && Object.keys(detail.service_type).length == 1 && detail.service_type.tab1 ? (habit.smoke != "" && habit.licence != "" && habit.kids != "" && habit.housework != "" && habit.family != "") : detailprovider.medicalcondition != "") && detailprovider.workingabroad != "" && detailprovider.anyallergies != "" && (detailprovider.anyallergies == "Yes" ? detailprovider.anyallergiesdescription != "" : languages[0]) && detailprovider.medicalcondition != "" && (detailprovider.medicalcondition == "Yes" ? detailprovider.medicalconditiondescription != "" : languages[0]) && (detail.service_type && detail.service_type.tab1 && Object.keys(detail.service_type).length == 1 ? detailprovider.livewithfamily != "" : detailprovider.medicalcondition != "")) {
                                            stapset(7)
                                            setmobile(-75)
                                            window.scrollTo({ top: 0 });
                                            profile_update(false)
                                        } else {
                                            step6.map((e) => {
                                                after_logins_field(e.name)
                                            })
                                        }
                                    }}>Next</button>
                                </div>
                            </div>
                            {/**/}
                            <div className='detail  verification  setp7' style={stap == 7 ? {} : { "display": "none" }}>

                                <div className='form_group space'>
                                    <label>Verify your accounts</label>
                                    <div className='social_verify'>

                                        <LinkedInPage handleResponse={handleResponse} profile={"icon"} status={detailprovider.linkdinverify} />

                                        {/* <svg onClick={e => {
                                            if (detailprovider.instaverify) {
                                                setdetailprovide({ ...detailprovider, instaverify: false })
                                            } else {
                                                setdetailprovide({ ...detailprovider, instaverify: true })
                                            }
                                        }} className={detailprovider.instaverify ? "active" : ""} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="1" y="1" width="40" height="40" rx="20" stroke="#A98D4B" />
                                            <path d="M18.0002 21C18.0002 19.3432 19.343 17.9998 20.9998 17.9998C22.6565 17.9998 24 19.3432 24 21C24 22.6568 22.6565 24.0002 20.9998 24.0002C19.343 24.0002 18.0002 22.6568 18.0002 21ZM16.3784 21C16.3784 23.5524 18.4474 25.6214 20.9998 25.6214C23.5522 25.6214 25.6211 23.5524 25.6211 21C25.6211 18.4476 23.5522 16.3786 20.9998 16.3786C18.4474 16.3786 16.3784 18.4476 16.3784 21ZM24.7241 16.1954C24.724 16.409 24.7873 16.6178 24.9059 16.7955C25.0245 16.9731 25.1931 17.1116 25.3904 17.1934C25.5877 17.2752 25.8049 17.2967 26.0144 17.2551C26.2239 17.2135 26.4164 17.1108 26.5675 16.9598C26.7186 16.8088 26.8215 16.6164 26.8633 16.4069C26.905 16.1974 26.8837 15.9803 26.8021 15.7829C26.7204 15.5855 26.582 15.4168 26.4045 15.2981C26.2269 15.1793 26.0181 15.1159 25.8045 15.1158H25.8041C25.5178 15.1159 25.2432 15.2297 25.0407 15.4321C24.8382 15.6345 24.7243 15.909 24.7241 16.1954ZM17.3638 28.3258C16.4863 28.2858 16.0094 28.1397 15.6924 28.0162C15.2722 27.8526 14.9724 27.6578 14.6572 27.343C14.342 27.0282 14.1469 26.7287 13.984 26.3085C13.8605 25.9917 13.7143 25.5146 13.6744 24.6372C13.6308 23.6885 13.6221 23.4035 13.6221 21.0001C13.6221 18.5966 13.6315 18.3125 13.6744 17.363C13.7144 16.4855 13.8616 16.0094 13.984 15.6917C14.1476 15.2715 14.3424 14.9717 14.6572 14.6564C14.972 14.3412 15.2715 14.1461 15.6924 13.9832C16.0092 13.8597 16.4863 13.7135 17.3638 13.6736C18.3124 13.63 18.5974 13.6213 20.9998 13.6213C23.4021 13.6213 23.6874 13.6307 24.6368 13.6736C25.5143 13.7136 25.9904 13.8608 26.3082 13.9832C26.7284 14.1461 27.0282 14.3417 27.3434 14.6564C27.6586 14.9712 27.853 15.2715 28.0166 15.6917C28.1401 16.0085 28.2863 16.4855 28.3262 17.363C28.3698 18.3125 28.3785 18.5966 28.3785 21.0001C28.3785 23.4035 28.3698 23.6877 28.3262 24.6372C28.2862 25.5146 28.1393 25.9915 28.0166 26.3085C27.853 26.7287 27.6582 27.0285 27.3434 27.343C27.0286 27.6575 26.7284 27.8526 26.3082 28.0162C25.9914 28.1397 25.5143 28.2859 24.6368 28.3258C23.6882 28.3694 23.4032 28.3781 20.9998 28.3781C18.5963 28.3781 18.3121 28.3694 17.3638 28.3258ZM17.2892 12.0545C16.3311 12.0981 15.6764 12.2501 15.1047 12.4725C14.5126 12.7023 14.0113 13.0105 13.5104 13.5106C13.0095 14.0107 12.702 14.5128 12.4723 15.1049C12.2498 15.677 12.0979 16.3314 12.0543 17.2895C12.0099 18.2491 11.9998 18.5559 11.9998 21C11.9998 23.4441 12.0099 23.7509 12.0543 24.7105C12.0979 25.6687 12.2498 26.323 12.4723 26.8951C12.702 27.4868 13.0096 27.9895 13.5104 28.4894C14.0112 28.9893 14.5126 29.2971 15.1047 29.5275C15.6775 29.7499 16.3311 29.9019 17.2892 29.9455C18.2494 29.9891 18.5556 30 20.9998 30C23.4439 30 23.7507 29.9898 24.7103 29.9455C25.6684 29.9019 26.3227 29.7499 26.8948 29.5275C27.4866 29.2971 27.9882 28.9895 28.4891 28.4894C28.99 27.9893 29.2968 27.4868 29.5272 26.8951C29.7497 26.323 29.9023 25.6686 29.9452 24.7105C29.9889 23.7502 29.999 23.4441 29.999 21C29.999 18.5559 29.9889 18.2491 29.9452 17.2895C29.9016 16.3313 29.7497 15.6767 29.5272 15.1049C29.2968 14.5132 28.9892 14.0115 28.4891 13.5106C27.989 13.0097 27.4866 12.7023 26.8955 12.4725C26.3227 12.2501 25.6684 12.0974 24.711 12.0545C23.7514 12.0109 23.4446 12 21.0005 12C18.5564 12 18.2494 12.0102 17.2892 12.0545Z" fill="#A98D4B" />
                                        </svg> */}
                                    </div>
                                    <br />
                                    <br />
                                    <label>Do you have   <a>background check </a><span className='smallpop'>Background check document should not be older than 6 months and it will be not publicly available. You are strongly encouraged to share background check document with prospective employer upon their request.
                                        Please, upload background check at your earliest convenience. Background check is important for safety reasons and it increases your chances to get hired.</span> document <span className={errorfield.backgroundstatus != "" || (detailprovider.backgroundstatus == "Yes" ? errorfield.backgrounddoc != "" : errorfield.backgroundstatus != "") ? "starred" : ""}>*</span></label>
                                    <div className='checkbox create'>
                                        <ul onClick={e => {

                                            seterrorfield({ ...errorfield, backgroundstatus: "", backgrounddoc: "" })
                                        }}>

                                            <li><input type="radio" name="background" onClick={e => setdetailprovide({ ...detailprovider, backgroundstatus: "Yes" })} checked={detailprovider.backgroundstatus == "Yes" ? true : false} /><span>Yes </span></li>
                                            <li><input type="radio" name="background" onClick={e => setdetailprovide({ ...detailprovider, backgroundstatus: "No" })} checked={detailprovider.backgroundstatus == "No" ? true : false} /><span> No</span></li>
                                        </ul>
                                    </div>
                                    <div className='upload'>
                                        <input type="file" placeholder='Choose file to upload' onChange={e => {
                                            seterrorfield({ ...errorfield, backgroundstatus: "", backgrounddoc: "" })
                                            setdetailprovide({ ...detailprovider, backgrounddoc: e.target.files[0] })
                                        }} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf" />
                                        <span>{detailprovider.backgrounddoc != "" ? detailprovider.backgrounddoc.name ? detailprovider.backgrounddoc.name : detailprovider.backgrounddoc : "Choose file"}</span>
                                        <button>
                                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.909091 9.09091C1.41117 9.09091 1.81818 9.49792 1.81818 10V17.2727C1.81818 17.5138 1.91396 17.7451 2.08445 17.9156C2.25494 18.086 2.48617 18.1818 2.72727 18.1818H13.6364C13.8775 18.1818 14.1087 18.086 14.2792 17.9156C14.4497 17.7451 14.5455 17.5138 14.5455 17.2727V10C14.5455 9.49792 14.9525 9.09091 15.4545 9.09091C15.9566 9.09091 16.3636 9.49792 16.3636 10V17.2727C16.3636 17.996 16.0763 18.6897 15.5648 19.2012C15.0534 19.7127 14.3597 20 13.6364 20H2.72727C2.00395 20 1.31026 19.7127 0.7988 19.2012C0.287337 18.6897 0 17.996 0 17.2727V10C0 9.49792 0.407014 9.09091 0.909091 9.09091Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53899 0.266267C7.89402 -0.0887555 8.46962 -0.0887555 8.82464 0.266267L12.461 3.90263C12.816 4.25765 12.816 4.83326 12.461 5.18828C12.106 5.5433 11.5304 5.5433 11.1754 5.18828L8.18182 2.19474L5.18828 5.18828C4.83326 5.5433 4.25765 5.5433 3.90263 5.18828C3.54761 4.83326 3.54761 4.25765 3.90263 3.90263L7.53899 0.266267Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.18182 1.35465e-08C8.6839 1.35465e-08 9.09091 0.407014 9.09091 0.909091V12.7273C9.09091 13.2294 8.6839 13.6364 8.18182 13.6364C7.67974 13.6364 7.27273 13.2294 7.27273 12.7273V0.909091C7.27273 0.407014 7.67974 1.35465e-08 8.18182 1.35465e-08Z" fill="white" />
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                                <div className='form_group fs'>
                                    <label><strong>Verify your phone number<span className={errorfield.phone != "" && veri != "done" ? "starred" : ""}>*</span></strong>Please enter your phone number for  <a>verification </a><span className='smallpop'>We are asking for the phone number verification to ensure additional security for our members. For more information please visit <Link to='/safety-center'>Safety center</Link>. </span> purposes</label>
                                    <div className='verification_number'>
                                        <div className='number profilecretate'>
                                            <div className='country_flag' onClick={e => codeselect()}><img src={contact_code.flag} /> {contact_code.code != "" ? contact_code.code : ("+" + detailprovider.countrycode)}
                                                {setcode ? "" : <span className='Hoverclose2'></span>}
                                            </div>
                                            <ul style={setcode ? { display: "none" } : {}}>
                                                {
                                                    country.data.map((e) => {
                                                        return (
                                                            <li onClick={a => {
                                                                codeselect()
                                                                setcontact_code({ "flag": e.flag, "code": e.dial_code })
                                                            }}><img src={e.flag} /> {e.country + " " + " " + e.dial_code}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <input type="number" className={error.phone && error.phone.length > 2 ? "bordererror" : ""} placeholder='Enter phone number' onChange={e => {
                                                {
                                                    seterrorfield({ ...errorfield, phone: "" })
                                                    setdetailprovide({ ...detailprovider, phone: e.target.value })
                                                    detailprovider.phone.length > 7 ? seterror({ ...error, phone: "" }) : seterror({ ...error, phone: "error" })
                                                }
                                            }} value={detailprovider.phone != null ? detailprovider.phone : ""} />
                                            {
                                                veri == "done" ? "" :
                                                    <button onClick={e => {
                                                        seterrorfield({ ...errorfield, phone: "" })
                                                        mobileverify()
                                                    }} style={detail.phoneVerifiedStatus != null && detail.phoneVerifiedStatus == 1 ? { display: "none" } : {}}>{dis ? "Wait" : "Get code"}</button>
                                            }
                                        </div>
                                        <br />
                                        <br />
                                        <label>Enter your verification code </label>
                                        <div className='number'>
                                            <input type="number" placeholder='Enter code' className={error.otperror && error.otperror.length > 2 || errorfield.phone != "" && veri != "done" ? "bordererror" : ""} onChange={e => {
                                                setotp(e.target.value)
                                                otp.length > 2 ? seterror({ ...error, otperror: "" }) : seterror({ ...error, otperror: "error" })
                                                seterrorfield({ ...errorfield, phone: "" })
                                            }} />
                                            {
                                                veri == "done" ? "" :
                                                    <button onClick={e => {
                                                        seterrorfield({ ...errorfield, phone: "" })
                                                        otpverify()
                                                    }} style={detail.phoneVerifiedStatus != null && detail.phoneVerifiedStatus == 1 ? { display: "none" } : {}}>Verify</button>
                                            }
                                        </div>
                                    </div>
                                    <div className='success' id="success" style={detail.phoneVerifiedStatus != null && detail.phoneVerifiedStatus == 1 ? { display: "block" } : { display: "none" }}>
                                        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.4 2L9 0H0V17H2V10H7.6L8 12H15V2H9.4Z" fill="#7D2B8B" />
                                        </svg>
                                        Thank you! Your phone number is verified.
                                    </div>
                                    <div className='success2' id="success4" style={{ display: "none" }}>
                                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5263 16L9.26316 0L0 16H18.5263ZM10.1052 13.4737H8.42096V11.7895H10.1052V13.4737ZM8.42096 10.1056H10.1052V6.73713H8.42096V10.1056Z" fill="#7D2B8B" />
                                        </svg>
                                        Verification has failed. Please check if you have entered the correct number and try again in 60 seconds.
                                    </div>
                                    <div className='success2' id="success3" style={{ display: "none" }}>
                                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5263 16L9.26316 0L0 16H18.5263ZM10.1052 13.4737H8.42096V11.7895H10.1052V13.4737ZM8.42096 10.1056H10.1052V6.73713H8.42096V10.1056Z" fill="#7D2B8B" />
                                        </svg>
                                        Verification has failed. Please contact the  <Link to="/contact-us">tech support</Link>for further assistance.
                                    </div>
                                    {/* <div className='errorfield'>{error.message}</div>*/}
                                </div>
                                <div className='form_group full'>
                                    <br />
                                    <br />
                                    <br />
                                    <label>I give my consent for my profile to be shared by SensCare platform on social media.<span className={errorfield.plateformsocialmedia != "" ? "starred" : ""}>*</span></label>
                                    <div className='checkbox create'>
                                        <ul onClick={e => seterrorfield({ ...errorfield, plateformsocialmedia: "" })}>
                                            <li><input type="radio" name="social" onClick={e => setdetailprovide({ ...detailprovider, plateformsocialmedia: "Yes" })} checked={detailprovider.plateformsocialmedia == "" || detailprovider.plateformsocialmedia == "Yes" ? true : false} /><span>Yes </span></li>
                                            <li><input type="radio" name="social" onClick={e => setdetailprovide({ ...detailprovider, plateformsocialmedia: "No" })} checked={detailprovider.plateformsocialmedia == "No" ? true : false} /><span>No</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='button'>
                                    <button onClick={e => {
                                        stapset(6)
                                        setmobile(-60)
                                        window.scrollTo({ top: 0 });
                                    }}>Back</button>
                                    <button disabled={dis} onClick={e => {
                                        if (detailprovider.plateformsocialmedia == "") {
                                            setdetailprovide({ ...detailprovider, plateformsocialmedia: "Yes" })
                                        }
                                        if ((detailprovider.backgroundstatus == "Yes" ? detailprovider.backgrounddoc != "" : detailprovider.backgroundstatus != "") && detailprovider.backgroundstatus != "" && (detail.phoneVerifiedStatus == 1 || veri == "done")) {
                                            profile_update(true)

                                        } else {
                                            step7.map((e) => {
                                                after_logins_field(e.name)
                                            })
                                        }
                                    }}>
                                        {"Finish"} </button>
                                </div>
                            </div>
                            {/* setShowflogin*/}
                            {/**/}
                            <Modal show={showflogin} onHide={handleCloselogin_first}>
                                <Modal.Body>
                                    <div className='promocode_content login_first'>
                                        <Link to="" onClick={handleCloselogin_first}>+ </Link>
                                        <h2>Congratulations! Your profile  is live now.</h2>
                                        <img src='./images/create_profile.png' />
                                        <p className='pro'>SensCare wishes you to find the best job. See your profile  <Link to="/search-providers">here</Link>.</p>
                                        <button onClick={redirect}>Search for candidates</button>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Create_provider_profile
