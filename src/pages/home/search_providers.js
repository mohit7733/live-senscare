import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../urls'
import Footer from './common/footer'
import Header from './common/header'
import Profession_change from './profession_chnage'
import Location from './common/location';
import View_edit from './view_edit'
import Modal from 'react-bootstrap/Modal'
import { country } from '../home/common/country';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from 'react';
import View_edit_provider from './view_edit_provider'

import Provider_notification_tabs from './provider_notification_tabs'
import Notification_tab_provider from './notification_tab_provider'
import Notification_tab_parents from './notification_tab_parents'
import Parents_notification_tabs from './parents_notification_tabs'
import Job_history_tap from './common/job_history_tap'
import Favorite_provider from './common/favorite_provider'
import Favorite_select from './common/favorite_select'
import Favorite_profile from './common/favorite_profile'
import Job_history_tap_parents from './common/job_hist_doc'
import Count_notification from './count_notification'
import Message_tab from './common/message_tab'
import Count_message from './count_message'
import Facebook_share from './common/share_facebook'

const validPassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const special = RegExp("(?=.*[!@#\$%\^&\*])");
const capital = RegExp("(?=.*[A-Z])");
const number = RegExp("(?=.*[0-9])");


function Search_providers() {
    const navigate = useNavigate();
    const sliderRef = useRef();
    const [list, setlist] = useState([])
    const [list2, setlist2] = useState([])
    const [showfprovider, setShowfprovider] = useState(false);

    const [usd, setusd] = useState({
        min: 0,
        max: 0,
    })
    const [filter, setfilter] = useState(JSON.parse(localStorage.getItem("filter")) != null ? JSON.parse(localStorage.getItem("filter")) : {})
    const [search, setsearch] = useState({
        jobcategory: "",
        keyword: "",
        city: filter.city ? filter.city : "",
        zip: filter.zip ? filter.zip : "",
        candidatespeaks: "",
        withinweek: "",
        withinmonth: "",
        tutorintrestedin: "",
        tutorintrestedin1: "",
        tutorintrestedin2: "",
        rates: "",
        tutorperhrrate: "",
        tutorexp: "",
        childneedcareno: "",
        preferredageofprovider: "",
        workingabroad: "",
        childsocialneed: "",
        distance: filter.distance ? filter.distance : "",
        carorlicence: "",
        backgroundstatus: ""
    })
    const [contact_code, setcontact_code] = useState({
        code: "",
        flag: ""
    })
    const [providerage, setproviderage] = useState({
        data1: "",
        data2: "",
        data3: "",
        data4: ""
    })
    const [speak, setspeak] = useState({
        English: "",
        Serbian: "",
        Mathematics: "",
        Physics: "",
        Chemistry: "",
        Online: ""
    })
    const [profile, setprofile] = useState({})
    const [interested, setinterested] = useState([])
    const [count, setcount] = useState(true)
    const [noresult, setnoresult] = useState("")
    const [filtercheck, setfiltercheck] = useState(true)
    const [advance_search, setadvance_search] = useState(false)
    const [plink, setplink] = useState(true)
    const [photoupload, setphotoupload] = useState(false);
    const [listshow, setlistshow] = useState(10)
    const [show, setShow] = useState(false);
    const [showsuccess, setshowsuccess] = useState(false);
    const [countryedit, setcountryedit] = useState(false);
    const [countrydata, setcountrydata] = useState("");
    const [catopen, setcatopen] = useState(true)
    const [children, setchildren] = useState("")
    const [children_age, setchildren_age] = useState([])
    const [category, setcategory] = useState(filter.category && filter.category[0] ? filter.category : [])
    const [latlong, setlatlong] = useState({
        "lat": "",
        "lng": ""
    })
    const handleCloselogin_firstprovider = () => {
        setShowfprovider(false)
    };
    const handleShowlogin_firstprovider = () => {
        setShowfprovider(true)
    };
    const [cat, setcat] = useState(
        filter.cat ? filter.cat : {
            data1: "",
            data2: "",
            data3: "",
            data4: ""
        })
    const [children2, setchildren2] = useState({
        data1: "",
        data2: "",
        data3: "",
        data4: ""
    })
    const slugdata = useParams()
    let data = slugdata.id

    const [profilesection, setprofilesection] = useState(localStorage.getItem("side") && localStorage.getItem("side") != "" ? localStorage.getItem("side") : "")
    const [subtab, setsubtab] = useState(data ? data : "")
    useEffect(() => {
        setsubtab(data ? data : "")
    }, [data, slugdata, subtab])
    const [edit, setedit] = useState("")
    const [ssubtab, setssubtab] = useState({
        personal: "",
        payment: "",
        delete: ""
    })
    const [password, setpassword] = useState({
        oldpassword: "",
        c_password: "",
        n_password: ""
    })
    const [error, seterror] = useState({
        oldpassword: "",
        c_password: "",
        n_password: ""
    });
    const [photo, setphoto] = useState("");
    const [verfied, setVerifed] = useState(false);
    const [disableaccoutn, setdisableaccoutn] = useState(false);
    const [cpassword, setcpassword] = useState(false);
    const [passwordc, setpasswordc] = useState(false);
    const [passwordn, setpasswordn] = useState(false);
    const [cardedit, setcardedit] = useState(false);
    const [cardnew, setcardnew] = useState(false);
    const [cancelmembership, setcancelmembership] = useState(false);
    const [deletewarning, setdeletewarning] = useState(false);
    const [accountdelete, setaccountdelete] = useState(false);
    const [sorry, setsorry] = useState(false);
    const [signout, setsignout] = useState(false);
    const [survay, setsurvay] = useState(false);
    const [phoneverify, setphoneverify] = useState({
        phone: "",
        otp: ""
    })

    const [emailverify, setemailverify] = useState({
        email: "",
        alemail: ""
    })
    const [survaydata, setsurvaydata] = useState({
        resion: "",
        other: "",
        status: ""
    });
    const [membership, setmembership] = useState("")
    const handleClose = () => setShow(false);

    const selectoption = (data) => {
        let sum = false
        category.map((e, index) => {
            if (e.name == data) {
                sum = true
                category.splice(index, 1)
            }
        })
        if (sum == false) {
            category.push({ "name": data })
        }
        setTimeout(() => {
            setcategory([...category])
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
        if (sum == false) {
            children_age.push({ "name": data })
        }
        setTimeout(() => {
            setchildren_age([...children_age])
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
    const custom2 = (e) => {
        if (catopen) {
            document.getElementById(e).style.display = "block"
            if (e == "filtern") {
                document.getElementById("leftdataback").style.background = "#FAFAFA"
            }
            setcatopen(false)
        } else {
            document.getElementById(e).style.display = "none"
            setcatopen(true)
            if (e == "filtern") {
                document.getElementById("leftdata").style.background = "#fff"
            }

        }
    }


    const profilemy = () => {
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
                setprofile(result.data)
                setadvance_search(true)
            })
            .catch(error => {
                setadvance_search(true)
                setcatopen(false)
            });
    }
    const provider_list = (distance) => {
        setlist([])
        setinterested([])
        setnoresult("")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/" + (localStorage.getItem("token") != null ? "v1/favproviderlisting" : "providerlisting") + "?keyword=" + search.keyword + "&distance=" + (distance ? distance : search.distance) + "&lat=" + latlong.lat + "&lng=" + latlong.lng + "&city=" + search.city + "&zip=" + search.zip + (cat.data1 != "" ? "&jobcategory[]=" + cat.data1 : "&jobcategory[]=") + (cat.data2 != "" ? "&jobcategory[]=" + cat.data2 : "&jobcategory[]=") + (cat.data3 != "" ? "&jobcategory[]=" + cat.data3 : "&jobcategory[]=") + (cat.data4 != "" ? "&jobcategory[]=" + cat.data4 : "&jobcategory[]=") + "&withinweek=" + search.withinweek + "&withinmonth=" + search.withinmonth + "&nanyintrestedin[]=" + search.tutorintrestedin + "&nanyintrestedin[]=" + search.tutorintrestedin1 + "&nanyintrestedin[]=" + search.tutorintrestedin2 + "&rates=" + (usd.max > 0 ? (usd.min + "-" + usd.max) : "") + "&tutorexp=" + search.tutorexp + "&nanyworkwithnochild=" + children + "&childsocialneed=" + search.childsocialneed + "&workingabroad=" + search.workingabroad + (providerage.data1 != "" ? "&nanyprefchildage[]=" + providerage.data1 : "&nanyprefchildage[]=") + (providerage.data2 != "" ? "&nanyprefchildage[]=" + providerage.data2 : "&nanyprefchildage[]=") + (providerage.data3 != "" ? "&nanyprefchildage[]=" + providerage.data3 : "&nanyprefchildage[]=") + (providerage.data4 != "" ? "&nanyprefchildage[]=" + providerage.data4 : "&nanyprefchildage[]=") + "&carorlicence=" + search.carorlicence + "&backgroundstatus=" + search.backgroundstatus, requestOptions)
            .then(response => response.json())
            .then(result => {
                let datafil = result.data.filter((data) => data.nanyperhrrate != null)
                setlist(datafil)
                setlist2(datafil)

                setTimeout(() => {
                    setnoresult("ubb")
                }, 500);
            })
            .catch(error => console.log('error', error));


        fetch(api + "/api/" + (localStorage.getItem("token") == null ? "highratedprovider" : "v1/authhighratedprovider"), requestOptions)
            .then(response => response.json())
            .then(result => {
                let x = []
                result.data.map((data) => {
                    if (data != null) {
                        x.push(data)
                        setinterested(x)
                    }
                })
            })
            .catch(error => console.log('error', error));
    }

    const short_by = (e) => {
        setlist([])
        if (e.target.value == "Reviews") {
            const sortedData = [...list2].sort((a, b) =>
                b.reviewcount - a.reviewcount
                // console.log(a.reviewcount, b.reviewcount)
                // a.reviewcount.localeCompare(b.reviewcount)
            );
            setlist(sortedData)
        }
        else if (e.target.value == "Low to high") {
            const sortedData = [...list2].sort((a, b) => {
                if (a.nanyperhrrate != null && b.nanyperhrrate) {
                    return parseInt(a.nanyperhrrate.substr(a.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0]) - parseInt(b.nanyperhrrate.substr(b.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0])
                }
            });
            setlist(sortedData)
        }
        else if (e.target.value == "High to low") {
            const sortedData = [...list2].sort((a, b) => {
                if (a.nanyperhrrate != null && b.nanyperhrrate != null) {
                    return parseInt(b.nanyperhrrate.substr(b.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1]) - parseInt(a.nanyperhrrate.substr(a.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1])
                }
                else if (a.tutorperhrrate != null && b.tutorperhrrate != null) {
                    return parseInt(b.tutorperhrrate.substr(b.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0]) - parseInt(a.tutorperhrrate.substr(a.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0])
                }
            });
            setlist(sortedData)
        } else if (e.target.value == "Distance") {
            setsearch({ ...search, distance: 10 })
            provider_list(5)
        } else if (e.target.value == "Relevance") {
            setlist(list2)
        }
    }

    const pmore = (e, x, z) => {
        document.getElementById(e).style.display = "none"
        document.getElementById(x).style.display = "block"
        if (plink) {
            document.getElementById(z).style.display = "block"
            setplink(false)
        } else {
            setplink(true)
            document.getElementById(z).style.display = "none"
        }
    }
    const filter_box = () => {
        if (filtercheck) {
            document.getElementById("filteron").style.display = "block"
            setfiltercheck(false)
        } else {
            document.getElementById("filteron").style.display = "none"
            setfiltercheck(true)
        }
    }
    const getletlon = (latlong2, e, addresss) => {
        e.then(function (result) {
            setlatlong(result)
        })
        let x = ""
        let y = ""
        for (var i = 0; i < latlong2.address_components.length; i++) {
            for (var j = 0; j < latlong2.address_components[i].types.length; j++) {
                if (latlong2.address_components[i].types[j] == "administrative_area_level_1") {
                    x = latlong2.address_components[i].long_name
                }
            }
        }
        for (var i = 0; i < latlong2.address_components.length; i++) {
            for (var j = 0; j < latlong2.address_components[i].types.length; j++) {
                if (latlong2.address_components[i].types[j] == "postal_code" || latlong2.address_components[i].types[j] == "street_number") {
                    y = latlong2.address_components[i].long_name
                }
            }
        }
        latlong2.address_components.map((e) => {
            e.types.map((a) => {
                if (a == "country") {
                    // seterror({ ...error, country: "", address: "" })
                    setprofile({ ...profile, country: e.long_name, address: addresss, zip: y, city: x })
                }
            });
        })
        if (e != "getLatLng") {
            e.then(function (result) {
                setlatlong(result)
                setsearch({ ...search, zip: parseInt(addresss) })
            })
        } else {
            setsearch({ ...search, zip: "" })
        }

    }
    var settings2 = {
        dots: false,
        infinite: true,
        slidesToShow: interested.length < 5 ? interested.length : 5,
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
                    initialSlide: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }
        ]
    };
    const [setcode, setsetcode] = useState(true)
    const codeselect = () => {
        if (setcode) {
            setsetcode(false)
        } else {
            setsetcode(true)
        }
    }
    const updateprofile = () => {

        if (emailverify.alemail == "") {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "address": profile.address,
                "last_name": profile.last_name,
                "city": profile.city,
                "zip": profile.zip,
                "country": profile.country,
                "lat": latlong.lat ? latlong.lat : profile.lat,
                "lng": latlong.lng ? latlong.lng : profile.lng,
                "countrycode": contact_code.code ? contact_code.code : profile.countrycode,
                "phone": profile.phone,
                "email": emailverify.email ? emailverify.email : profile.email
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(api + "/api/v1/updateprofile", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setTimeout(() => {
                            localStorage.setItem("name", profile.first_name + " " + profile.last_name)
                            setprofile(result.data.user)
                            // profilemy()
                            setedit("")
                        }, 1000);
                    }
                })
                .catch(error => console.log('error', error));
        } else {

        }
    }

    const changepassword = () => {
        if (password.n_password && password.oldpassword && password.c_password) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "current_password": password.oldpassword,
                "new_password": password.n_password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(api + "/api/v1/passwordchange", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.type == "Failed") {
                        seterror({
                            oldpassword: "password did not match",
                            c_password: "",
                            n_password: "",
                        })
                    } else {
                        setshowsuccess(true)
                        setShow(false)
                        seterror({
                            oldpassword: "",
                            c_password: "",
                            n_password: "",
                        })
                        localStorage.removeItem("id")
                        localStorage.removeItem("token")
                    }
                })
                .catch(error => console.log('error', error));
        } else {
            seterror({
                oldpassword: password.oldpassword ? "" : "Required",
                c_password: password.c_password ? "" : "Required",
                n_password: password.n_password ? "" : "Required",
            })
        }
    }
    function onChange(value) {
        setVerifed(true);
    }
    const logins_field = (e) => {

        const { name, value } = e.target;
        switch (name) {

            case 'oldpassword':
                error.oldpassword =
                    value ? "" : "required";
                break;
            case 'c_password':
                error.c_password =
                    value != password.n_password
                        ? "Password did not match"
                        : "";
                break;
            case 'n_password':
                error.n_password =
                    validPassword.test(value)
                        ? ""
                        : "Password did not match";
                break;
            default:
                break;
        }
        setpassword({ ...password, [name]: value })
        seterror(error)
    }
    const disableaccount = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "account_status": "DISABLE"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/disableaccount", requestOptions)
            .then(response => response.json())
            .then(result => {
                setdisableaccoutn(false)
                setprofile({ ...profile, account_status: "DISABLE" })
                setsurvay(true)
                setsurvaydata({ ...survaydata, status: "Disable" })
            })
            .catch(error => console.log('error', error));
    }
    const deleteaccount = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/deleteaccount", requestOptions)
            .then(response => response.json())
            .then(result => {
                setsurvaydata({ ...survaydata, status: "Delete" })
                setsurvay(true)
            })
            .catch(error => console.log('error', error));
    }
    const survaysave = () => {
        var myHeaders = new Headers();
        // myHeaders.append("Authorization");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": profile.username,
            "role": profile.user_type,
            "reason_type": survaydata.resion,
            "other_reason": survaydata.other,
            "status": survaydata.status,
            "user_id": profile.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/usersurvey", requestOptions)
            .then(response => response.json())
            .then(result => {
                localStorage.removeItem("id")
                localStorage.removeItem("token")
                if (survaydata.status == "Delete") {
                    setsorry(true)
                } else {
                    window.location.replace("/")
                }
                setsurvay(false)
            })
            .catch(error => console.log('error', error));
    }
    const mobileverify = () => {
        if (phoneverify.phone.length > 9) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "phonenoforverify": contact_code.code != "" ? contact_code.code + phoneverify.phone : ("+" + profile.countrycode) + phoneverify.phone,
                "phone": phoneverify.phone,
                "countrycode": contact_code.code != "" ? contact_code.code : "+" + profile.countrycode
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
                })
                .catch(error => {
                    console.log('error', error)
                });
        } else {

        }
    }
    const otpverify = () => {
        if (phoneverify.otp.length > 3) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "phonetoken": phoneverify.otp,
                "phone": phoneverify.phone,
                "countrycode": contact_code.code != "" ? contact_code.code : "+" + profile.countrycode
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
                    profilemy()
                })
                .catch(error => console.log('error', error));
        } else {
            seterror({
                ...error,
                otperror: "error"
            })
        }
    }
    const emailcheck = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": emailverify.email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/checkemail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.data.isExist == 1) {
                    setemailverify({ ...emailverify, alemail: result.message })
                } else {
                    setemailverify({ ...emailverify, alemail: "" })
                }
            })
            .catch(error => console.log('error', error));
    }
    const emailsurvay = () => {
        var myHeaders = new Headers();
        // myHeaders.append("Authorization");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "id": profile.id
        });
        var requestOptions = {
            method: 'POST',
            body: raw,
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(api + "/api/sendsurveymail", requestOptions)
            .then(response => response.json())
            .then(result => {
                localStorage.removeItem("id")
                localStorage.removeItem("token")
                setsurvay(false)
                if (survaydata.status == "Delete") {
                    setsorry(true)
                } else {
                    window.location.replace("/")
                }
            })
            .catch(error => console.log('error', error));
    }
    const membership1 = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // fetch(api + "/api/v1/getmembershipplan", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         // setmembership(result.data.name)
        //     })
        //     .catch(error => console.log('error', error));

    }

    useEffect(() => {
        if (count) {
            provider_list()
            profilemy()
            membership1()
            setcount(false)
        }
        // if (!localStorage.getItem("token") || !localStorage.getItem("id")) {
        //     window.location.replace("/login")
        // }
        localStorage.setItem("side", profilesection)
        // localStorage.setItem("back", subtab)
    }, [profile, list, category, error, profilesection, password, edit])

    useEffect(() => {
        localStorage.setItem("back", subtab + (slugdata.name ? "/" + slugdata.name : ""))
    }, [data, slugdata, subtab, list, category, error])

    const profile_update = () => {
        setphotoupload(false)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var formdata = new FormData();
        formdata.append("user_id", localStorage.getItem("id"));
        formdata.append("file_path", photo)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(api + "/api/v1/updateparents", requestOptions)
            .then(response => response.json())
            .then(result => {
                setphotoupload(false)
                window.location.reload()
            })
            .catch(error => {
                console.log('error', error)
            });
    }
    const [image, setImage] = useState(null)
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setphoto(event.target.files[0])
        }
    }
    return (
        <>

            <Header fil={filter_box} />
            <div className="container-fluid" style={{ overflow: "hidden" }}>
                <div className="filter_header" >
                    <div className="container">
                        <div className="filter_box" onKeyPress={e => {
                            if (e.key == "Enter" && localStorage.getItem("token") && localStorage.getItem("id")) {
                                provider_list()
                            }
                        }}>
                            <div className="filter_search">
                                <div className="advance_search_filter">
                                    <div className={"advance_search_filter_input Profile_complete " + (!catopen ? "op" : "")}>
                                        <span id="my-adv-filter" onClick={e => custom2("filtern")} >Advanced search</span>
                                        {advance_search != false ?
                                            <div className='filters_search detail work-experience' id="filtern" style={profile.about == "" || profile.about == null || !localStorage.getItem("token") || !localStorage.getItem("id") || localStorage.getItem("refine") ? { display: 'block' } : { display: 'none' }} >
                                                <div className='form_group full border qualification'>
                                                    <label>Frequency</label>
                                                    <div className='checkbox create'>
                                                        <ul>
                                                            <li><input type="radio" name="" onClick={e => {
                                                                if (e.target.checked) {
                                                                    setsearch({ ...search, tutorintrestedin: "Full time" })
                                                                } else {
                                                                    setsearch({ ...search, tutorintrestedin: "" })
                                                                }
                                                            }} /><span>Full time </span></li>
                                                            <li><input type="radio" name="" onClick={e => {
                                                                if (e.target.checked) {
                                                                    setsearch({ ...search, tutorintrestedin1: "Part time" })
                                                                } else {
                                                                    setsearch({ ...search, tutorintrestedin1: "" })
                                                                }
                                                            }} /><span>Part time </span></li>
                                                            <li><input type="radio" name="" onClick={e => {
                                                                if (e.target.checked) {
                                                                    setsearch({ ...search, tutorintrestedin2: "Occasionally" })
                                                                } else {
                                                                    setsearch({ ...search, tutorintrestedin2: "" })
                                                                }
                                                            }} /><span> Occasionally</span></li>
                                                        </ul>
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div> */}
                                                </div>
                                                <div className='form_group full border'>
                                                    <label>Hourly rate {profile && profile.country == "Serbia" ? "(RSD)" : "(USD)"}</label>
                                                    {profile && profile.country == "Serbia" ?
                                                        <div className="wrapper">
                                                            <div className="container_slide">
                                                                <div className="slider-track">
                                                                    <ul>
                                                                        <li style={usd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                        <li style={usd.min >= 20 || usd.max < 20 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                        <li style={usd.min >= 30 || usd.max < 30 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                        <li style={usd.min >= 40 || usd.max < 40 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="bggray_slider">
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
                                                                                ...usd, min: (e.target.value == 5 ? 60 : e.target.value * 10)
                                                                            })
                                                                        }
                                                                    }} />
                                                                <input type="range" min="0" max="5" id="slider-2" value={usd.max == 0 ? 50 / 10 : usd.max / 10} onChange={e => {
                                                                    if (usd.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                        setusd({
                                                                            ...usd, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                        })
                                                                    }
                                                                }} />
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
                                                        </div> :
                                                        <div className="wrapper">
                                                            <div className="container_slide">
                                                                <div className="slider-track">
                                                                    <ul>
                                                                        <li style={usd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                        <li style={usd.min >= 20 || usd.max < 20 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                        <li style={usd.min >= 30 || usd.max < 30 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                        <li style={usd.min >= 40 || usd.max < 40 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="bggray_slider">
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
                                                                    }
                                                                }} />
                                                                <input type="range" min="0" max="5" id="slider-2" value={usd.max == 0 ? 50 / 10 : usd.max / 10} onChange={e => {
                                                                    if (usd.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                        setusd({
                                                                            ...usd, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                        })
                                                                    }
                                                                }} />
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
                                                    }
                                                    <span className="price">{profile && profile.country == "Serbia" ? usd.min * 100 + " - " + usd.max * 100 : usd.min + " - " + (usd.max > 0 ? usd.max == 60 ? usd.max + "+" : usd.max : usd.max == 60 ? 60 + "+" : 60 + "+")}</span>
                                                    {/* <div className='errorfield'>{error.message}</div> */}
                                                </div>
                                                <div className='form_group full border'>
                                                    <label>Expected work experience</label>
                                                    <div className="select">
                                                        <select onChange={e => setsearch({ ...search, tutorexp: e.target.value })}>
                                                            <option disabled="" value="">Choose from the list</option>
                                                            <option value="0 - 1 years">0 - 1 years</option>
                                                            <option value="1 - 2 years">1 - 2 years </option><option value="2 - 4 years">2 - 4 years</option>
                                                            <option value="More than 4 years">More than 4 years</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='form_group full border'>
                                                    <label>Number of children</label>
                                                    <div className='children_number'>
                                                        <ul>
                                                            <li onClick={e => {
                                                                if (children2.data1 == "") {
                                                                    setchildren2({ ...children2, data1: 1 })
                                                                    setchildren(1)
                                                                } else {
                                                                    setchildren2({ ...children2, data1: "" })
                                                                    setchildren("")
                                                                }
                                                            }} className={children2.data1 == 1 ? "active" : ""}>1</li>
                                                            <li onClick={e => {
                                                                if (children2.data2 == "") {
                                                                    setchildren2({ ...children2, data2: 2 })
                                                                    setchildren(2)
                                                                } else {
                                                                    setchildren2({ ...children2, data2: "" })
                                                                    setchildren("")
                                                                }
                                                            }} className={children2.data2 == 2 ? "active" : ""}>2</li>
                                                            <li onClick={e => {
                                                                if (children2.data3 == "") {
                                                                    setchildren2({ ...children2, data3: "twins" })
                                                                    setchildren("twins")
                                                                } else {
                                                                    setchildren2({ ...children2, data3: "" })
                                                                    setchildren("")
                                                                }
                                                            }} className={children2.data3 == "twins" ? "active" : ""}>Twins</li>
                                                            <li onClick={e => {
                                                                if (children2.data4 == "") {
                                                                    setchildren2({ ...children2, data4: "3" })
                                                                    setchildren(3)
                                                                } else {
                                                                    setchildren2({ ...children2, data4: "" })
                                                                    setchildren("")
                                                                }
                                                            }} className={children2.data4 == 3 ? "active" : ""}>3+</li>
                                                        </ul>
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div> */}
                                                </div>
                                                <div className='job_performance'>
                                                    <div className='form_group   full border'>
                                                        <label>Provider's preferred age</label>
                                                        <div className='text customselect '>
                                                            {children_age ?
                                                                <span className='keyword' onClick={e => custom("cate5", "over2")} style={{
                                                                    cursor: "pointer", whiteSpace: "nowrap",
                                                                    overflow: "hidden"
                                                                }}>
                                                                    {children_age.map((e) => {
                                                                        if (typeof e.name == "string") {
                                                                            return e.name + ", "
                                                                        }
                                                                    })}
                                                                    {children_age.length > 0 ? "" : 'Choose from the list'}
                                                                </span>
                                                                : ""}
                                                        </div>
                                                        <div className='customselect inp'>
                                                            {/* <TranslateComponent text='Choose from the list' className='keyword' type="text" value={children_age.map((e) => {
                                                                return <TranslateComponent text={e.name + " , "} />
                                                            })} /> */}
                                                            <div className='overflow' id='over2' onClick={e => custom("cate5", "over2")} style={{ left: "-50%", top: "-51vh" }}></div>
                                                            <div className='option' id='cate5'>
                                                                <p ><input type="checkbox" onClick={a => {
                                                                    selectoption2("18 - 23 years")
                                                                    if (a.target.checked) {
                                                                        setproviderage({ ...providerage, data1: "18 - 23 years" })
                                                                    } else {
                                                                        setproviderage({ ...providerage, data1: "" })
                                                                    }
                                                                }} /><h3>{"18 - 23 years"} </h3><span></span></p>
                                                                <p ><input type="checkbox" onClick={a => {
                                                                    selectoption2("24 - 30 years")
                                                                    if (a.target.checked) {
                                                                        setproviderage({ ...providerage, data2: "24 - 30 years" })
                                                                    } else {
                                                                        setproviderage({ ...providerage, data2: "" })
                                                                    }
                                                                }} /><h3>{"24 - 30 years"}  </h3><span></span></p>
                                                                <p ><input type="checkbox" onClick={a => {
                                                                    selectoption2("31 - 40 years")
                                                                    if (a.target.checked) {
                                                                        setproviderage({ ...providerage, data3: "31 - 40 years" })
                                                                    } else {
                                                                        setproviderage({ ...providerage, data3: "" })
                                                                    }
                                                                }} /><h3>{"31 - 40 years"} </h3><span></span></p>
                                                                <p ><input type="checkbox" onClick={a => {
                                                                    selectoption2("Older than 40 years")
                                                                    if (a.target.checked) {
                                                                        setproviderage({ ...providerage, data4: "Older than 40 years" })
                                                                    } else {
                                                                        setproviderage({ ...providerage, data4: "" })
                                                                    }
                                                                }} /><h3>{"Older than 40 years"} </h3><span></span></p>
                                                            </div>
                                                            {/* <span onClick={e => custom("cate5", "over2")}>
                                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#636363" />
                                                                </svg>
                                                            </span> */}
                                                        </div>
                                                        {/* <div className='errorfield'>{error.message}</div> */}
                                                    </div>
                                                </div>

                                                <div className='form_group full border qualification'>
                                                    <label>Start date</label>
                                                    <div className='checkbox create'>
                                                        <ul>
                                                            <li><input type="radio" name="b" onClick={e => {
                                                                setsearch({ ...search, withinweek: e.target.checked })
                                                            }} /><span> Within a week</span></li>
                                                            <li><input type="radio" name="b" onClick={e => {
                                                                setsearch({ ...search, withinmonth: e.target.checked })
                                                            }} /><span> Within a month</span></li>
                                                        </ul>
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div> */}
                                                </div>
                                                <div className='form_group full border qualification'>
                                                    <label>Other options</label>
                                                    <div className='checkbox create'>
                                                        <ul>
                                                            <li><input type="radio" name="" onClick={e => {
                                                                if (search.carorlicence == "") {
                                                                    setsearch({ ...search, carorlicence: "true" })
                                                                } else {
                                                                    setsearch({ ...search, carorlicence: "" })
                                                                }
                                                            }} /><span>Has car or valid driver licence</span></li>
                                                            <li><input type="radio" name="" onClick={e => {
                                                                if (search.backgroundstatus == "") {
                                                                    setsearch({ ...search, backgroundstatus: "Yes" })
                                                                } else {
                                                                    setsearch({ ...search, backgroundstatus: "" })
                                                                }
                                                            }} /><span>
                                                                    Has a background check</span></li>
                                                            <li><input type="radio" name="" onClick={e => {
                                                                if (search.workingabroad == "") {
                                                                    setsearch({ ...search, workingabroad: "Yes" })
                                                                } else {
                                                                    setsearch({ ...search, workingabroad: "" })
                                                                }
                                                            }} /><span> Willing to work abroad </span></li>
                                                        </ul>
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div> */}
                                                </div>
                                                <div className='form_group full qualification'>
                                                    <label>Experience with</label>
                                                    <div className='checkbox create'>
                                                        <ul>
                                                            {/* <li><input type="checkbox" name="Newborns" /><span> </span></li> */}
                                                            <li><input type="radio" name="" onClick={e => {
                                                                if (search.childsocialneed == "") {
                                                                    setsearch({ ...search, childsocialneed: "Yes" })
                                                                } else {
                                                                    setsearch({ ...search, childsocialneed: "" })
                                                                }
                                                            }} /><span>Kids with special needs </span></li>
                                                        </ul>
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div> */}
                                                </div>

                                                {cat.data4 ?
                                                    <div className='form_group full'>
                                                        <label>
                                                            I need a tutor for</label>
                                                        <div className='checkbox create'>
                                                            <ul>
                                                                <li><input type="radio" name="" onClick={e => {
                                                                    if (speak.English == "") {
                                                                        setspeak({ ...speak, English: "English" })
                                                                    } else {
                                                                        setspeak({ ...speak, English: "" })
                                                                    }
                                                                }} /><span>
                                                                        English</span></li>
                                                                <li><input type="radio" name="" onClick={e => {
                                                                    if (speak.Serbian == "") {
                                                                        setspeak({ ...speak, Serbian: "Serbian" })
                                                                    } else {
                                                                        setspeak({ ...speak, Serbian: "" })
                                                                    }
                                                                }} /><span>

                                                                        Serbian</span></li>
                                                                <li><input type="radio" name="" onClick={e => {
                                                                    if (speak.Mathematics == "") {
                                                                        setspeak({ ...speak, Mathematics: "Mathematics" })
                                                                    } else {
                                                                        setspeak({ ...speak, Mathematics: "" })
                                                                    }
                                                                }} /><span>

                                                                        Mathematics</span></li>
                                                                <li><input type="radio" name="" onClick={e => {
                                                                    if (speak.Physics == "") {
                                                                        setspeak({ ...speak, Physics: "Physics" })
                                                                    } else {
                                                                        setspeak({ ...speak, Physics: "" })
                                                                    }
                                                                }} /><span>

                                                                        Physics</span></li>
                                                                <li><input type="radio" name="" onClick={e => {
                                                                    if (speak.Chemistry == "") {
                                                                        setspeak({ ...speak, Chemistry: "Chemistry" })
                                                                    } else {
                                                                        setspeak({ ...speak, Chemistry: "" })
                                                                    }
                                                                }} /><span>

                                                                        Chemistry</span></li>
                                                                <li><input type="radio" name="" onClick={e => {
                                                                    if (speak.Online == "") {
                                                                        setspeak({ ...speak, Online: "Online classes" })
                                                                    } else {
                                                                        setspeak({ ...speak, Online: "" })
                                                                    }
                                                                }} /><span> Online classes</span></li>
                                                            </ul>
                                                        </div>
                                                        {/* <div className='errorfield'>{error.message}</div> */}
                                                    </div>
                                                    : ""}
                                                <button onClick={e => {
                                                    setsubtab("")
                                                    provider_list()
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                    // localStorage.setItem("refine", "true")
                                                    // setTimeout(() => {
                                                    //     window.location.reload()
                                                    // }, 300);
                                                }}>Refine result</button>
                                            </div> : ""}
                                    </div>
                                </div>
                                <div className="filter_category Profile_complete ">
                                    <div className="filter_category_select detail work-experience">
                                        <div className='job_performance'>
                                            <div className='form_group   full'>
                                                <div className='customselect inp' >
                                                    {/* <input placeholder='Select job category' id="my-fil-cat" className='keyword' type="text" value={category.map((e) => {
                                                        return e.name
                                                    })} /> */}
                                                    <input
                                                        placeholder="Select job category"
                                                        id="my-fil-cat"
                                                        className="keyword"
                                                        type="text"
                                                        value={category.map((e) => e.name).join(', ')} // Add ', ' between values
                                                    />
                                                    <div className='overflow' id='over3' onClick={e => custom("cate6", "over3")} ></div>
                                                    <div className='option' id='cate6' >
                                                        <p ><input type="checkbox" onClick={a => {
                                                            selectoption("Nanny")
                                                            if (a.target.checked) {
                                                                setcat({ ...cat, data1: "Nanny" })
                                                            } else {
                                                                setcat({ ...cat, data1: "" })
                                                            }

                                                        }} /><h3>
                                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                    <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                    <circle cx="15.0009" cy="14.9968" r="12.3571" stroke="white" />
                                                                    <path d="M16.0158 13.5094V8.82664C16.0158 8.41385 16.3812 8.08904 16.7872 8.14994C19.4128 8.52212 21.4293 10.7823 21.4293 13.5094H16.0158ZM21.4287 14.1872C21.4287 15.4324 21.0024 16.5827 20.2918 17.4963C20.9144 18.0511 21.246 18.9241 21.0091 19.8647C20.7926 20.7173 20.0888 21.394 19.2294 21.5767C17.8219 21.8745 16.5565 20.9136 16.3738 19.6008H14.9663C14.7836 20.9203 13.5114 21.8812 12.0903 21.5699C11.2377 21.3805 10.5339 20.697 10.3309 19.8444C10.0603 18.7143 10.6084 17.6587 11.5084 17.1782C11.3527 16.9414 10.0738 14.1872 10.0738 14.1872H9.24822C8.87604 14.1872 8.57153 13.8827 8.57153 13.5105C8.57153 13.1384 8.87604 12.8339 9.24822 12.8339H10.5069C10.764 12.8339 11.0076 12.9827 11.1159 13.2196L11.576 14.1872H21.4287ZM12.6306 20.281C12.069 20.281 11.6156 19.8276 11.6156 19.266C11.6156 18.7043 12.069 18.2509 12.6306 18.2509C13.1923 18.2509 13.6456 18.7043 13.6456 19.266C13.6456 19.8276 13.1923 20.281 12.6306 20.281ZM17.7055 19.266C17.7055 19.8276 18.1589 20.281 18.7206 20.281C19.2822 20.281 19.7356 19.8276 19.7356 19.266C19.7356 18.7043 19.2822 18.2509 18.7206 18.2509C18.1589 18.2509 17.7055 18.7043 17.7055 19.266Z" fill="#7D2B8B" />
                                                                </svg>

                                                                Nanny </h3><span></span></p>
                                                        <p ><input type="checkbox" onClick={a => {
                                                            selectoption("Special Education Teacher")
                                                            if (a.target.checked) {
                                                                setcat({ ...cat, data2: "Special Education Teacher" })
                                                            } else {
                                                                setcat({ ...cat, data2: "" })
                                                            }
                                                        }} /><h3>
                                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                    <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                    <circle cx="14.8574" cy="14.8567" r="12.3571" stroke="white" />
                                                                    <path d="M22.0269 16.0174C20.9457 16.0174 20.4774 16.8402 19.89 16.8402C18.3281 16.8402 19.7498 12.2505 19.7498 12.2505C19.7498 12.2505 14.6381 14.3338 14.6381 12.1646C14.6381 11.2316 15.5831 10.9602 15.5831 9.92544C15.5831 9.0009 14.8509 8.50049 13.9825 8.50049C13.0801 8.50049 12.2543 8.99244 12.2543 9.96783C12.2543 11.045 13.0801 11.5115 13.0801 12.0967C13.0801 13.9098 8.49976 12.8431 8.49976 12.8431V21.5212C8.49976 21.5212 13.1517 22.5901 13.1517 20.7748C13.1517 20.1896 12.11 19.7303 12.11 18.6531C12.11 17.6777 12.8718 17.1858 13.7657 17.1858C14.6426 17.1858 15.3748 17.6862 15.3748 18.6107C15.3748 19.6455 14.4298 19.9169 14.4298 20.8499C14.4298 22.4333 17.8067 21.52 19.1493 21.52C19.1493 21.52 18.245 18.3923 19.8219 18.3923C20.7584 18.3923 21.0308 19.3338 22.0695 19.3338C22.9975 19.3338 23.4998 18.6044 23.4998 17.7308C23.4998 16.8402 23.006 16.0174 22.0269 16.0174Z" fill="#7D2B8B" />
                                                                </svg>
                                                                Special education teacher </h3><span></span></p>
                                                        <p ><input type="checkbox" onClick={a => {
                                                            selectoption("Special Education Paraprofessional")
                                                            if (a.target.checked) {
                                                                setcat({ ...cat, data3: "Special Education Paraprofessional" })
                                                            } else {
                                                                setcat({ ...cat, data3: "" })
                                                            }
                                                        }} /><h3>
                                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                    <circle cx="15" cy="15" r="15" stroke="#fff" />
                                                                    <path d="M14.9361 7.71484C14.2024 7.71484 13.6075 8.30966 13.6075 9.04341C13.6075 9.77715 14.2024 10.372 14.9361 10.372C15.6699 10.372 16.2647 9.77715 16.2647 9.04341C16.2647 8.30966 15.6699 7.71484 14.9361 7.71484ZM19.5861 14.2911C19.5861 13.9656 19.3469 13.6999 19.0281 13.6468C18.1977 13.5073 17.4139 13.0622 16.8825 12.4777L16.0255 11.5277C15.9126 11.4015 15.7731 11.3019 15.6203 11.2288C15.617 11.2288 15.6153 11.2271 15.6137 11.2255C15.612 11.2238 15.6104 11.2222 15.607 11.2222H15.6004C15.3546 11.0827 15.0823 11.0162 14.77 11.0561C14.0925 11.1358 13.6075 11.7469 13.6075 12.4312V16.3504C13.6075 17.0811 14.2054 17.679 14.9361 17.679H18.2575V20.3361C18.2575 20.7015 18.5564 21.0004 18.9218 21.0004C19.2872 21.0004 19.5861 20.7015 19.5861 20.3361V17.3468C19.5861 16.6161 18.9882 16.0183 18.2575 16.0183H16.2647V13.7265C16.929 14.2779 17.859 14.7495 18.7889 14.9355C19.2008 15.0219 19.5861 14.7096 19.5861 14.2911ZM13.6075 19.6721C14.4778 19.6721 15.2151 19.1141 15.4875 18.3435H16.8625C16.557 19.8581 15.2151 21.0006 13.6075 21.0006C11.7741 21.0006 10.2861 19.5126 10.2861 17.6792C10.2861 16.0717 11.4287 14.7298 12.9433 14.4242V15.7993C12.1727 16.0783 11.6147 16.809 11.6147 17.6792C11.6147 18.7819 12.5048 19.6721 13.6075 19.6721Z" fill="#7D2B8B" />
                                                                </svg>
                                                                Special education paraprofessional </h3><span></span></p>
                                                        <p ><input type="checkbox" onClick={a => {
                                                            selectoption("Tutor")
                                                            if (a.target.checked) {
                                                                setcat({ ...cat, data4: "Tutor" })
                                                            } else {
                                                                setcat({ ...cat, data4: "" })
                                                            }
                                                        }} /><h3>
                                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                    <circle cx="15" cy="15" r="15" stroke="#fff" />
                                                                    <path d="M21.0659 13.008L15.209 10.3386C15.0556 10.268 14.8883 10.268 14.7489 10.3386L8.89202 13.008C8.69679 13.0928 8.57129 13.2905 8.57129 13.5024C8.57129 13.7143 8.71074 13.912 8.90596 14.0109L9.40798 14.251V16.2283C9.40798 16.4261 9.56137 16.5814 9.7566 16.5814C9.95183 16.5814 10.1052 16.4261 10.1052 16.2283V14.6323L10.9419 15.0843V17.4854C10.9419 17.5842 10.9698 17.669 11.0256 17.7537C11.0814 17.8385 12.3503 19.7593 14.9162 19.7593C17.5518 19.7593 18.765 17.8244 18.8207 17.7537C18.8626 17.6831 18.9044 17.5842 18.9044 17.4995V15.1832L21.1216 14.0391C21.3169 13.9402 21.4284 13.7425 21.4284 13.5306C21.4005 13.2905 21.2611 13.1069 21.0659 13.008ZM17.9143 17.33C17.6354 17.669 16.6872 18.7707 14.9162 18.7707C13.187 18.7707 12.1969 17.6831 11.9181 17.33V15.5928L14.7349 17.0475C14.8186 17.0899 14.9022 17.104 14.9859 17.104C15.0696 17.104 15.1672 17.0899 15.2509 17.0475L17.9143 15.6775V17.33ZM14.9859 15.9035L10.412 13.5589L14.9859 11.4685L19.5598 13.5589L14.9859 15.9035ZM10.1052 17.0758C10.2028 17.1746 10.2726 17.33 10.2726 17.4713C10.2726 17.6125 10.2168 17.7678 10.1052 17.8667C10.0076 17.9656 9.85421 18.0362 9.71477 18.0362C9.57532 18.0362 9.42192 17.9797 9.32431 17.8667C9.2267 17.7678 9.15697 17.6125 9.15697 17.4713C9.15697 17.33 9.21275 17.1746 9.32431 17.0758C9.42192 16.9769 9.57532 16.9063 9.71477 16.9063C9.85421 16.9063 9.99366 16.9628 10.1052 17.0758Z" fill="#7D2B8B" />
                                                                </svg>
                                                                Tutor   </h3><span></span></p>
                                                    </div>
                                                    <span onClick={e => custom("cate6", "over3")}>
                                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#7D2B8B" />
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
                                    <input type="text" placeholder="City" id="my-fil-city" onChange={e => setsearch({ ...search, city: e.target.value })} />
                                </div>
                                <div className="zip code">
                                    <input type="text" placeholder="Zip code" id="my-fil-zip" onChange={e => setsearch({ ...search, zip: e.target.value })} />
                                    {/* <Location let={getletlon} type={"my-fil-zip"} /> */}
                                </div>
                                <div className="distance">
                                    <div className="distance_input">
                                        <select name="" id="my-fil-dis" onChange={e => setsearch({ ...search, distance: e.target.value })}>
                                            <option selected>Distance</option>
                                            <option value={5}>5 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                            <option value={10}>10 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                            <option value={15}>15 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                            <option value={20}>20 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                            <option value={25}>25 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                            <option value={30}>30 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                            <option value={35}>35 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                            <option value={40}>40 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                            <option value={45}>45 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                            <option value={50}>50 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="search_box">
                                <div className="search_input">
                                    <button id="my-fil-search" type="submit" onClick={e => {
                                        localStorage.getItem("user_type") == "parents" ?
                                            navigate("/search-providers") :
                                            localStorage.getItem("user_type") == "provider" ?
                                                navigate("/search-parents") : navigate("")
                                        setsubtab("")
                                        provider_list()
                                        localStorage.removeItem("filter")
                                    }}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    subtab == "Profile" ? "" :
                        <>
                            {profile.about == "" || profile.about == null ? "" :
                                <>
                                    <div className="mobile_profile_box">
                                        <a href={localStorage.getItem("user_type") == "parents" ? "profile-parents/" + profile.id : "/profile-provider/" + profile.id}>
                                            <div className="profile_pic">
                                                <img src={api + "/public/assets/images/users/" + profile.file_path} width="50" height="50" alt="" />
                                            </div>
                                        </a>
                                        <div className="mobile_profile_box_content1">
                                            <div className="profile_detail">
                                                <div className="profile_box_social">
                                                    <a href={localStorage.getItem("user_type") == "parents" ? "profile-parents/" + profile.id : "profile-provider/" + profile.id}>
                                                        <div className="name_iimg">
                                                            <p>{profile.first_name + ' ' + profile.last_name} ({profile.dob != undefined ? new Date().getFullYear() - parseInt(profile.dob.substr(profile.dob.lastIndexOf('\\') + 1).split('-')[0]) : ""})</p>
                                                            <p>
                                                                {profile.reviewAvg >= 0 ?
                                                                    <>
                                                                        {[...Array(profile.reviewAvg)].map((star, index) => {
                                                                            index += 1;
                                                                            return (
                                                                                <svg width="12" height="12" style={{ marginLeft: "3px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                                </svg>

                                                                            );
                                                                        })}
                                                                        {[...Array(5 - profile.reviewAvg)].map((star, index) => {
                                                                            index += 1;
                                                                            return (
                                                                                <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: "3px" }} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z" stroke="#A98D4B" stroke-linecap="round" stroke-linejoin="round" />
                                                                                </svg>
                                                                            );
                                                                        })}
                                                                    </>
                                                                    : ""
                                                                }
                                                                <span>({profile.reviewcount})</span>
                                                            </p>
                                                        </div>
                                                    </a>
                                                    <div className="profile_box_social_sec1">
                                                        {
                                                            profile.phoneVerifiedStatus == 1 ?
                                                                <img src={window.location.origin + "/images/nany_phone.svg"} alt="" />
                                                                :
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z" fill="#B7B7B7" />
                                                                </svg>}
                                                        <img src={window.location.origin + "/images/nany_msg.svg"} alt="" />
                                                        {
                                                            profile.facebookverify != null || profile.linkdinverify != null ?
                                                                <img src={window.location.origin + "/images/nany_cont.svg"} alt="" />
                                                                : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z" fill="#B7B7B7" />
                                                                </svg>
                                                        }

                                                        {localStorage.getItem("user_type") == "parents" ? "" :
                                                            profile.docsStatus == "Yes" ?
                                                                <img src={window.location.origin + "/images/ok.svg"} alt="" />
                                                                : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z" fill="#B7B7B7" />
                                                                </svg>
                                                        }

                                                    </div>

                                                    {localStorage.getItem("user_type") == "parents" ?
                                                        <span className='addjob'>
                                                            <Profession_change />
                                                        </span>
                                                        :
                                                        <div className="profile_box_social_sec2">
                                                            {
                                                                profile.service_type && profile.service_type.tab1 == "Nanny" ? <img src={window.location.origin + "/images/nany_pur.svg"} alt="" /> : ""}
                                                            {
                                                                profile.service_type && profile.service_type.tab2 ? <img src={window.location.origin + "/images/special_education.svg"} alt="" /> : ""}
                                                            {
                                                                profile.service_type && profile.service_type.tab3 ? <img src={window.location.origin + "/images/professional.svg"} alt="" /> : ""}
                                                            {
                                                                profile.service_type && profile.service_type.tab4 ? <img src={window.location.origin + "/images/tutorform.svg"} alt="" /> : ""
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="mobile_profile_box_content2">
                                                <div className="profile_functions">

                                                    <div className="funk">
                                                        <h5>{(new Date().getFullYear() - new Date(profile.created_at).getFullYear()) > 0 ? (new Date().getFullYear() - new Date(profile.created_at).getFullYear()) + " YRS" : 0 + " YRS"} </h5>
                                                        <h6>Member</h6>
                                                    </div>
                                                    <div className="vi"></div>
                                                    {localStorage.getItem("user_type") == "parents" ?
                                                        <div className="funk">
                                                            <h5>{profile.jobs}</h5>
                                                            <h6>Job posts</h6>
                                                        </div> :
                                                        <div className="funk">
                                                            <h5>{profile.jobApplicationcount}</h5>
                                                            <h6>Applications</h6>
                                                        </div>}
                                                    <div className="vi"></div>
                                                    <div className="funk">
                                                        <h5>{profile.hiringcount}</h5>
                                                        <h6>Hirings</h6>
                                                    </div>

                                                </div>
                                                <button onClick={e => {
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                }} style={{ float: "right" }}>
                                                    <a href={"/search-providers/Profile"}>
                                                        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.43506 8.00421L0.628351 13.8109C0.290141 14.1261 0.150922 14.6007 0.265309 15.0486C0.379697 15.4965 0.729447 15.8463 1.17735 15.9607C1.62526 16.075 2.09988 15.9358 2.41503 15.5976L10 8.01264L8.05319 6.06583L2.38975 0.402388C2.0746 0.0641773 1.59998 -0.075042 1.15207 0.0393456C0.704162 0.153733 0.354412 0.503484 0.240024 0.95139C0.125637 1.3993 0.264857 1.87392 0.603067 2.18907L6.43506 8.00421Z" fill="#7F7F7F" />
                                                        </svg>
                                                    </a>
                                                </button>
                                            </div>

                                        </div>

                                    </div>

                                </>
                            }
                        </>
                }

                <div className='filter_header2' id='filteron' style={!localStorage.getItem("token") || !localStorage.getItem("id") ? { display: 'block' } : { display: 'none' }} >
                    <div className="filter_box" onKeyPress={e => {
                        if (e.key == "Enter" && localStorage.getItem("token") && localStorage.getItem("id")) {
                            provider_list()
                        }
                    }}>
                        <div className="container">
                            <div className="filter_search">
                                <div className='monile_search'>
                                    <h2>Find perfect job</h2>
                                    <div className="filter_category Profile_complete ">
                                        <div className="filter_category_select detail work-experience">
                                            <div className='job_performance'>
                                                <div className='form_group   full'>
                                                    <div className='customselect inp' >
                                                        <input placeholder='Select job category' id="my-fil-cat" className='keyword' type="text" value={category.map((e) => {
                                                            return e.name
                                                        })} />
                                                        <div className='overflow' id='over4' onClick={e => custom("cate7", "over4")} ></div>
                                                        <div className='option' id='cate7' >
                                                            <p ><input type="checkbox" onClick={a => {
                                                                selectoption("Nanny")
                                                                if (a.target.checked) {
                                                                    setcat({ ...cat, data1: "Nanny" })
                                                                } else {
                                                                    setcat({ ...cat, data1: "" })
                                                                }

                                                            }} /><h3>
                                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                        <circle cx="15.0009" cy="14.9968" r="12.3571" stroke="white" />
                                                                        <path d="M16.0158 13.5094V8.82664C16.0158 8.41385 16.3812 8.08904 16.7872 8.14994C19.4128 8.52212 21.4293 10.7823 21.4293 13.5094H16.0158ZM21.4287 14.1872C21.4287 15.4324 21.0024 16.5827 20.2918 17.4963C20.9144 18.0511 21.246 18.9241 21.0091 19.8647C20.7926 20.7173 20.0888 21.394 19.2294 21.5767C17.8219 21.8745 16.5565 20.9136 16.3738 19.6008H14.9663C14.7836 20.9203 13.5114 21.8812 12.0903 21.5699C11.2377 21.3805 10.5339 20.697 10.3309 19.8444C10.0603 18.7143 10.6084 17.6587 11.5084 17.1782C11.3527 16.9414 10.0738 14.1872 10.0738 14.1872H9.24822C8.87604 14.1872 8.57153 13.8827 8.57153 13.5105C8.57153 13.1384 8.87604 12.8339 9.24822 12.8339H10.5069C10.764 12.8339 11.0076 12.9827 11.1159 13.2196L11.576 14.1872H21.4287ZM12.6306 20.281C12.069 20.281 11.6156 19.8276 11.6156 19.266C11.6156 18.7043 12.069 18.2509 12.6306 18.2509C13.1923 18.2509 13.6456 18.7043 13.6456 19.266C13.6456 19.8276 13.1923 20.281 12.6306 20.281ZM17.7055 19.266C17.7055 19.8276 18.1589 20.281 18.7206 20.281C19.2822 20.281 19.7356 19.8276 19.7356 19.266C19.7356 18.7043 19.2822 18.2509 18.7206 18.2509C18.1589 18.2509 17.7055 18.7043 17.7055 19.266Z" fill="#7D2B8B" />
                                                                    </svg>

                                                                    Nanny </h3><span></span></p>
                                                            <p ><input type="checkbox" onClick={a => {
                                                                selectoption("Special education teacher")
                                                                if (a.target.checked) {
                                                                    setcat({ ...cat, data2: "Special education teacher" })
                                                                } else {
                                                                    setcat({ ...cat, data2: "" })
                                                                }
                                                            }} /><h3>
                                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                        <circle cx="14.8574" cy="14.8567" r="12.3571" stroke="white" />
                                                                        <path d="M22.0269 16.0174C20.9457 16.0174 20.4774 16.8402 19.89 16.8402C18.3281 16.8402 19.7498 12.2505 19.7498 12.2505C19.7498 12.2505 14.6381 14.3338 14.6381 12.1646C14.6381 11.2316 15.5831 10.9602 15.5831 9.92544C15.5831 9.0009 14.8509 8.50049 13.9825 8.50049C13.0801 8.50049 12.2543 8.99244 12.2543 9.96783C12.2543 11.045 13.0801 11.5115 13.0801 12.0967C13.0801 13.9098 8.49976 12.8431 8.49976 12.8431V21.5212C8.49976 21.5212 13.1517 22.5901 13.1517 20.7748C13.1517 20.1896 12.11 19.7303 12.11 18.6531C12.11 17.6777 12.8718 17.1858 13.7657 17.1858C14.6426 17.1858 15.3748 17.6862 15.3748 18.6107C15.3748 19.6455 14.4298 19.9169 14.4298 20.8499C14.4298 22.4333 17.8067 21.52 19.1493 21.52C19.1493 21.52 18.245 18.3923 19.8219 18.3923C20.7584 18.3923 21.0308 19.3338 22.0695 19.3338C22.9975 19.3338 23.4998 18.6044 23.4998 17.7308C23.4998 16.8402 23.006 16.0174 22.0269 16.0174Z" fill="#7D2B8B" />
                                                                    </svg>
                                                                    special education teacher  </h3><span></span></p>
                                                            <p ><input type="checkbox" onClick={a => {
                                                                selectoption("Special education paraprofessional")
                                                                if (a.target.checked) {
                                                                    setcat({ ...cat, data3: "Special education paraprofessional" })
                                                                } else {
                                                                    setcat({ ...cat, data3: "" })
                                                                }
                                                            }} /><h3>
                                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                        <circle cx="15" cy="15" r="15" stroke="#fff" />
                                                                        <path d="M14.9361 7.71484C14.2024 7.71484 13.6075 8.30966 13.6075 9.04341C13.6075 9.77715 14.2024 10.372 14.9361 10.372C15.6699 10.372 16.2647 9.77715 16.2647 9.04341C16.2647 8.30966 15.6699 7.71484 14.9361 7.71484ZM19.5861 14.2911C19.5861 13.9656 19.3469 13.6999 19.0281 13.6468C18.1977 13.5073 17.4139 13.0622 16.8825 12.4777L16.0255 11.5277C15.9126 11.4015 15.7731 11.3019 15.6203 11.2288C15.617 11.2288 15.6153 11.2271 15.6137 11.2255C15.612 11.2238 15.6104 11.2222 15.607 11.2222H15.6004C15.3546 11.0827 15.0823 11.0162 14.77 11.0561C14.0925 11.1358 13.6075 11.7469 13.6075 12.4312V16.3504C13.6075 17.0811 14.2054 17.679 14.9361 17.679H18.2575V20.3361C18.2575 20.7015 18.5564 21.0004 18.9218 21.0004C19.2872 21.0004 19.5861 20.7015 19.5861 20.3361V17.3468C19.5861 16.6161 18.9882 16.0183 18.2575 16.0183H16.2647V13.7265C16.929 14.2779 17.859 14.7495 18.7889 14.9355C19.2008 15.0219 19.5861 14.7096 19.5861 14.2911ZM13.6075 19.6721C14.4778 19.6721 15.2151 19.1141 15.4875 18.3435H16.8625C16.557 19.8581 15.2151 21.0006 13.6075 21.0006C11.7741 21.0006 10.2861 19.5126 10.2861 17.6792C10.2861 16.0717 11.4287 14.7298 12.9433 14.4242V15.7993C12.1727 16.0783 11.6147 16.809 11.6147 17.6792C11.6147 18.7819 12.5048 19.6721 13.6075 19.6721Z" fill="#7D2B8B" />
                                                                    </svg>
                                                                    Special education paraprofessional"   </h3><span></span></p>
                                                            <p ><input type="checkbox" onClick={a => {
                                                                selectoption("Tutor")
                                                                if (a.target.checked) {
                                                                    setcat({ ...cat, data4: "Tutor" })
                                                                } else {
                                                                    setcat({ ...cat, data4: "" })
                                                                }
                                                            }} /><h3>
                                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                        <circle cx="15" cy="15" r="15" stroke="#fff" />
                                                                        <path d="M21.0659 13.008L15.209 10.3386C15.0556 10.268 14.8883 10.268 14.7489 10.3386L8.89202 13.008C8.69679 13.0928 8.57129 13.2905 8.57129 13.5024C8.57129 13.7143 8.71074 13.912 8.90596 14.0109L9.40798 14.251V16.2283C9.40798 16.4261 9.56137 16.5814 9.7566 16.5814C9.95183 16.5814 10.1052 16.4261 10.1052 16.2283V14.6323L10.9419 15.0843V17.4854C10.9419 17.5842 10.9698 17.669 11.0256 17.7537C11.0814 17.8385 12.3503 19.7593 14.9162 19.7593C17.5518 19.7593 18.765 17.8244 18.8207 17.7537C18.8626 17.6831 18.9044 17.5842 18.9044 17.4995V15.1832L21.1216 14.0391C21.3169 13.9402 21.4284 13.7425 21.4284 13.5306C21.4005 13.2905 21.2611 13.1069 21.0659 13.008ZM17.9143 17.33C17.6354 17.669 16.6872 18.7707 14.9162 18.7707C13.187 18.7707 12.1969 17.6831 11.9181 17.33V15.5928L14.7349 17.0475C14.8186 17.0899 14.9022 17.104 14.9859 17.104C15.0696 17.104 15.1672 17.0899 15.2509 17.0475L17.9143 15.6775V17.33ZM14.9859 15.9035L10.412 13.5589L14.9859 11.4685L19.5598 13.5589L14.9859 15.9035ZM10.1052 17.0758C10.2028 17.1746 10.2726 17.33 10.2726 17.4713C10.2726 17.6125 10.2168 17.7678 10.1052 17.8667C10.0076 17.9656 9.85421 18.0362 9.71477 18.0362C9.57532 18.0362 9.42192 17.9797 9.32431 17.8667C9.2267 17.7678 9.15697 17.6125 9.15697 17.4713C9.15697 17.33 9.21275 17.1746 9.32431 17.0758C9.42192 16.9769 9.57532 16.9063 9.71477 16.9063C9.85421 16.9063 9.99366 16.9628 10.1052 17.0758Z" fill="#7D2B8B" />
                                                                    </svg>
                                                                    Tutor </h3><span></span></p>
                                                        </div>
                                                        <span onClick={e => custom("cate7", "over4")}>
                                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#7D2B8B" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    {/* <div className='errorfield'>{error.message}</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='searchbutton'>
                                        <button onClick={e => handleShowlogin_firstprovider()}>
                                            <img src='./images/filter_icon.svg' />
                                            Advanced search
                                        </button>


                                        <button onClick={e => {
                                            localStorage.getItem("user_type") == "parents" ?
                                                navigate("/search-providers") :
                                                navigate("/search-parents")
                                            setsubtab("")
                                            provider_list()
                                        }}>
                                            <img src='./images/filter_search_icon.svg' />
                                            Search
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showfprovider ?
                        <Modal show={showfprovider} onHide={handleCloselogin_firstprovider}>
                            <Modal.Body>
                                <div className=' advance_search_popup'>
                                    <Link to="" onClick={handleCloselogin_firstprovider}>+ </Link>


                                    <div className="" id='filteron'  >
                                        <div className="container">
                                            <h2>Advanced Search</h2>
                                            <div className="filter_box" onKeyPress={e => {
                                                if (e.key == "Enter" && localStorage.getItem("token") && localStorage.getItem("id")) {
                                                    provider_list()
                                                }
                                            }}>
                                                <div className="filter_search">
                                                    <div className="filter_category Profile_complete ">
                                                        <div className="filter_category_select detail work-experience">
                                                            <div className='job_performance'>
                                                                <div className='form_group   full'>
                                                                    <div className='customselect inp' >
                                                                        <input placeholder='Select job category' id="my-fil-cat" className='keyword' type="text" value={category.map((e) => {
                                                                            return e.name
                                                                        })} />
                                                                        <div className='overflow' id='over119' onClick={e => custom("cate8", "over119")} ></div>
                                                                        <div className='option' id='cate8' >
                                                                            <p ><input type="checkbox" onClick={a => {
                                                                                selectoption("Nanny")
                                                                                if (a.target.checked) {
                                                                                    setcat({ ...cat, data1: "Nanny" })
                                                                                } else {
                                                                                    setcat({ ...cat, data1: "" })
                                                                                }

                                                                            }} /><h3>
                                                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                                        <circle cx="15.0009" cy="14.9968" r="12.3571" stroke="white" />
                                                                                        <path d="M16.0158 13.5094V8.82664C16.0158 8.41385 16.3812 8.08904 16.7872 8.14994C19.4128 8.52212 21.4293 10.7823 21.4293 13.5094H16.0158ZM21.4287 14.1872C21.4287 15.4324 21.0024 16.5827 20.2918 17.4963C20.9144 18.0511 21.246 18.9241 21.0091 19.8647C20.7926 20.7173 20.0888 21.394 19.2294 21.5767C17.8219 21.8745 16.5565 20.9136 16.3738 19.6008H14.9663C14.7836 20.9203 13.5114 21.8812 12.0903 21.5699C11.2377 21.3805 10.5339 20.697 10.3309 19.8444C10.0603 18.7143 10.6084 17.6587 11.5084 17.1782C11.3527 16.9414 10.0738 14.1872 10.0738 14.1872H9.24822C8.87604 14.1872 8.57153 13.8827 8.57153 13.5105C8.57153 13.1384 8.87604 12.8339 9.24822 12.8339H10.5069C10.764 12.8339 11.0076 12.9827 11.1159 13.2196L11.576 14.1872H21.4287ZM12.6306 20.281C12.069 20.281 11.6156 19.8276 11.6156 19.266C11.6156 18.7043 12.069 18.2509 12.6306 18.2509C13.1923 18.2509 13.6456 18.7043 13.6456 19.266C13.6456 19.8276 13.1923 20.281 12.6306 20.281ZM17.7055 19.266C17.7055 19.8276 18.1589 20.281 18.7206 20.281C19.2822 20.281 19.7356 19.8276 19.7356 19.266C19.7356 18.7043 19.2822 18.2509 18.7206 18.2509C18.1589 18.2509 17.7055 18.7043 17.7055 19.266Z" fill="#7D2B8B" />
                                                                                    </svg>

                                                                                    Nanny </h3><span></span></p>
                                                                            <p ><input type="checkbox" onClick={a => {
                                                                                selectoption("Special education teacher")
                                                                                if (a.target.checked) {
                                                                                    setcat({ ...cat, data2: "Special education teacher" })
                                                                                } else {
                                                                                    setcat({ ...cat, data2: "" })
                                                                                }
                                                                            }} /><h3>
                                                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                                        <circle cx="14.8574" cy="14.8567" r="12.3571" stroke="white" />
                                                                                        <path d="M22.0269 16.0174C20.9457 16.0174 20.4774 16.8402 19.89 16.8402C18.3281 16.8402 19.7498 12.2505 19.7498 12.2505C19.7498 12.2505 14.6381 14.3338 14.6381 12.1646C14.6381 11.2316 15.5831 10.9602 15.5831 9.92544C15.5831 9.0009 14.8509 8.50049 13.9825 8.50049C13.0801 8.50049 12.2543 8.99244 12.2543 9.96783C12.2543 11.045 13.0801 11.5115 13.0801 12.0967C13.0801 13.9098 8.49976 12.8431 8.49976 12.8431V21.5212C8.49976 21.5212 13.1517 22.5901 13.1517 20.7748C13.1517 20.1896 12.11 19.7303 12.11 18.6531C12.11 17.6777 12.8718 17.1858 13.7657 17.1858C14.6426 17.1858 15.3748 17.6862 15.3748 18.6107C15.3748 19.6455 14.4298 19.9169 14.4298 20.8499C14.4298 22.4333 17.8067 21.52 19.1493 21.52C19.1493 21.52 18.245 18.3923 19.8219 18.3923C20.7584 18.3923 21.0308 19.3338 22.0695 19.3338C22.9975 19.3338 23.4998 18.6044 23.4998 17.7308C23.4998 16.8402 23.006 16.0174 22.0269 16.0174Z" fill="#7D2B8B" />
                                                                                    </svg>
                                                                                    special education teacher </h3><span></span></p>
                                                                            <p ><input type="checkbox" onClick={a => {
                                                                                selectoption("Special education paraprofessional")
                                                                                if (a.target.checked) {
                                                                                    setcat({ ...cat, data3: "Special education paraprofessional" })
                                                                                } else {
                                                                                    setcat({ ...cat, data3: "" })
                                                                                }
                                                                            }} /><h3>
                                                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                                        <circle cx="15" cy="15" r="15" stroke="#fff" />
                                                                                        <path d="M14.9361 7.71484C14.2024 7.71484 13.6075 8.30966 13.6075 9.04341C13.6075 9.77715 14.2024 10.372 14.9361 10.372C15.6699 10.372 16.2647 9.77715 16.2647 9.04341C16.2647 8.30966 15.6699 7.71484 14.9361 7.71484ZM19.5861 14.2911C19.5861 13.9656 19.3469 13.6999 19.0281 13.6468C18.1977 13.5073 17.4139 13.0622 16.8825 12.4777L16.0255 11.5277C15.9126 11.4015 15.7731 11.3019 15.6203 11.2288C15.617 11.2288 15.6153 11.2271 15.6137 11.2255C15.612 11.2238 15.6104 11.2222 15.607 11.2222H15.6004C15.3546 11.0827 15.0823 11.0162 14.77 11.0561C14.0925 11.1358 13.6075 11.7469 13.6075 12.4312V16.3504C13.6075 17.0811 14.2054 17.679 14.9361 17.679H18.2575V20.3361C18.2575 20.7015 18.5564 21.0004 18.9218 21.0004C19.2872 21.0004 19.5861 20.7015 19.5861 20.3361V17.3468C19.5861 16.6161 18.9882 16.0183 18.2575 16.0183H16.2647V13.7265C16.929 14.2779 17.859 14.7495 18.7889 14.9355C19.2008 15.0219 19.5861 14.7096 19.5861 14.2911ZM13.6075 19.6721C14.4778 19.6721 15.2151 19.1141 15.4875 18.3435H16.8625C16.557 19.8581 15.2151 21.0006 13.6075 21.0006C11.7741 21.0006 10.2861 19.5126 10.2861 17.6792C10.2861 16.0717 11.4287 14.7298 12.9433 14.4242V15.7993C12.1727 16.0783 11.6147 16.809 11.6147 17.6792C11.6147 18.7819 12.5048 19.6721 13.6075 19.6721Z" fill="#7D2B8B" />
                                                                                    </svg>
                                                                                    special education paraprofessional  </h3><span></span></p>
                                                                            <p ><input type="checkbox" onClick={a => {
                                                                                selectoption("Tutor")
                                                                                if (a.target.checked) {
                                                                                    setcat({ ...cat, data4: "Tutor" })
                                                                                } else {
                                                                                    setcat({ ...cat, data4: "" })
                                                                                }
                                                                            }} /><h3>
                                                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <circle cx="15" cy="15" r="15" fill="#fff" />
                                                                                        <circle cx="15" cy="15" r="15" stroke="#fff" />
                                                                                        <path d="M21.0659 13.008L15.209 10.3386C15.0556 10.268 14.8883 10.268 14.7489 10.3386L8.89202 13.008C8.69679 13.0928 8.57129 13.2905 8.57129 13.5024C8.57129 13.7143 8.71074 13.912 8.90596 14.0109L9.40798 14.251V16.2283C9.40798 16.4261 9.56137 16.5814 9.7566 16.5814C9.95183 16.5814 10.1052 16.4261 10.1052 16.2283V14.6323L10.9419 15.0843V17.4854C10.9419 17.5842 10.9698 17.669 11.0256 17.7537C11.0814 17.8385 12.3503 19.7593 14.9162 19.7593C17.5518 19.7593 18.765 17.8244 18.8207 17.7537C18.8626 17.6831 18.9044 17.5842 18.9044 17.4995V15.1832L21.1216 14.0391C21.3169 13.9402 21.4284 13.7425 21.4284 13.5306C21.4005 13.2905 21.2611 13.1069 21.0659 13.008ZM17.9143 17.33C17.6354 17.669 16.6872 18.7707 14.9162 18.7707C13.187 18.7707 12.1969 17.6831 11.9181 17.33V15.5928L14.7349 17.0475C14.8186 17.0899 14.9022 17.104 14.9859 17.104C15.0696 17.104 15.1672 17.0899 15.2509 17.0475L17.9143 15.6775V17.33ZM14.9859 15.9035L10.412 13.5589L14.9859 11.4685L19.5598 13.5589L14.9859 15.9035ZM10.1052 17.0758C10.2028 17.1746 10.2726 17.33 10.2726 17.4713C10.2726 17.6125 10.2168 17.7678 10.1052 17.8667C10.0076 17.9656 9.85421 18.0362 9.71477 18.0362C9.57532 18.0362 9.42192 17.9797 9.32431 17.8667C9.2267 17.7678 9.15697 17.6125 9.15697 17.4713C9.15697 17.33 9.21275 17.1746 9.32431 17.0758C9.42192 16.9769 9.57532 16.9063 9.71477 16.9063C9.85421 16.9063 9.99366 16.9628 10.1052 17.0758Z" fill="#7D2B8B" />
                                                                                    </svg>
                                                                                    tutor </h3><span></span></p>
                                                                        </div>
                                                                        <span onClick={e => custom("cate8", "over119")}>
                                                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#7D2B8B" />
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
                                                    <div className="city keyword">
                                                        <input type="text" placeholder="City" id="my-fil-city" onChange={e => setsearch({ ...search, city: e.target.value })} />
                                                    </div>
                                                    <div className="zip code">
                                                        <input type="text" placeholder="Zip code" id="my-fil-zip" onChange={e => setsearch({ ...search, zip: e.target.value })} />
                                                        {/* <Location let={getletlon} type={"my-fil-zip"} /> */}
                                                    </div>
                                                    <div className="distance">
                                                        <div className="distance_input">
                                                            <select name="" id="my-fil-dis" onChange={e => setsearch({ ...search, distance: e.target.value })}>
                                                                <option value="" selected>Distance</option>
                                                                <option value={5}>5 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                                                <option value={10}>10 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                                                <option value={15}>15 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                                                <option value={20}>20 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                                                <option value={25}>25 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                                                <option value={30}>30 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                                                <option value={35}>35 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                                                <option value={40}>40 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                                                <option value={45}>45 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>
                                                                <option value={50}>50 {profile && profile.country == "Serbia" ? "Km" : "Miles"}</option>

                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="advance_search_filter">
                                                    <div className={"advance_search_filter_input Profile_complete " + (!catopen ? "op" : "")}>
                                                        <div className='filters_search detail work-experience' id='filterdata' >
                                                            <div className='form_group full border qualification selectbt'>
                                                                <label>Frequency</label>
                                                                <div className='checkbox create'>
                                                                    <ul>
                                                                        <li><input type="checkbox" name="" onClick={e => {
                                                                            if (e.target.checked) {
                                                                                setsearch({ ...search, tutorintrestedin: "Full time" })
                                                                            } else {
                                                                                setsearch({ ...search, tutorintrestedin: "" })
                                                                            }
                                                                        }} /><span> Full time</span></li>
                                                                        <li><input type="checkbox" name="" onClick={e => {
                                                                            if (e.target.checked) {
                                                                                setsearch({ ...search, tutorintrestedin1: "Part time" })
                                                                            } else {
                                                                                setsearch({ ...search, tutorintrestedin1: "" })
                                                                            }
                                                                        }} /><span>Part time </span></li>
                                                                        <li><input type="checkbox" name="" onClick={e => {
                                                                            if (e.target.checked) {
                                                                                setsearch({ ...search, tutorintrestedin2: "Occasionally" })
                                                                            } else {
                                                                                setsearch({ ...search, tutorintrestedin2: "" })
                                                                            }
                                                                        }} /><span> Occasionally</span></li>
                                                                    </ul>
                                                                </div>
                                                                {/* <div className='errorfield'>{error.message}</div> */}
                                                            </div>
                                                            <div className='form_group full border'>
                                                                <label>Hourly rate {profile && profile.country == "Serbia" ? "(RSD)" : "(USD)"}</label>
                                                                {profile && profile.country == "Serbia" ?
                                                                    <div className="wrapper">
                                                                        <div className="container_slide">
                                                                            <div className="slider-track">
                                                                                <ul>
                                                                                    <li style={usd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                                    <li style={usd.min >= 20 || usd.max < 20 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                                    <li style={usd.min >= 30 || usd.max < 30 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                                    <li style={usd.min >= 40 || usd.max < 40 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="bggray_slider">
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
                                                                                    }
                                                                                }} />
                                                                            <input type="range" min="0" max="5" id="slider-2" value={usd.max == 0 ? 50 / 10 : usd.max / 10} onChange={e => {
                                                                                if (usd.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                                    setusd({
                                                                                        ...usd, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                                    })
                                                                                }
                                                                            }} />
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
                                                                    </div> : <div className="wrapper">
                                                                        <div className="container_slide">
                                                                            <div className="slider-track">
                                                                                <ul>
                                                                                    <li style={usd.min >= 10 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                                    <li style={usd.min >= 20 || usd.max < 20 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                                    <li style={usd.min >= 30 || usd.max < 30 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                                    <li style={usd.min >= 40 || usd.max < 40 && usd.max > 0 ? { backgroundColor: "#E5E5E5" } : {}}></li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="bggray_slider">
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
                                                                                }
                                                                            }} />
                                                                            <input type="range" min="0" max="5" id="slider-2" value={usd.max == 0 ? 50 / 10 : usd.max / 10} onChange={e => {
                                                                                if (usd.min < (e.target.value == 5 ? 60 : e.target.value * 10)) {
                                                                                    setusd({
                                                                                        ...usd, max: (e.target.value == 5 ? 60 : e.target.value * 10),
                                                                                    })
                                                                                }
                                                                            }} />
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
                                                                }
                                                                <span className="price">{profile && profile.country == "Serbia" ? usd.min * 100 + " - " + usd.max * 100 : usd.min + " - " + (usd.max > 0 ? usd.max == 60 ? usd.max + "+" : usd.max : usd.max == 60 ? 60 + "+" : 60 + "+")}</span>
                                                                {/* <div className='errorfield'>{error.message}</div> */}
                                                            </div>
                                                            <div className='form_group full border'>
                                                                <label>Expected work experience</label>
                                                                <div className="select">
                                                                    <select onChange={e => setsearch({ ...search, tutorexp: e.target.value })}>
                                                                        <option disabled="">Choose from the list</option>
                                                                        <option value="0 - 1 years">0 - 1 years </option>
                                                                        <option value="1 - 2 years">1 - 2 years</option><option value="2 - 4 years">2 - 4 years</option>
                                                                        <option value="More than 4 years">More than 4 years</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className='form_group full border'>
                                                                <label>Number of children</label>
                                                                <div className='children_number'>
                                                                    <ul>
                                                                        <li onClick={e => {
                                                                            if (children2.data1 == "") {
                                                                                setchildren2({ ...children2, data1: 1 })
                                                                                setchildren(1)
                                                                            } else {
                                                                                setchildren2({ ...children2, data1: "" })
                                                                                setchildren("")
                                                                            }
                                                                        }} className={children2.data1 == 1 ? "active" : ""}>1</li>
                                                                        <li onClick={e => {
                                                                            if (children2.data2 == "") {
                                                                                setchildren2({ ...children2, data2: 2 })
                                                                                setchildren(2)
                                                                            } else {
                                                                                setchildren2({ ...children2, data2: "" })
                                                                                setchildren("")
                                                                            }
                                                                        }} className={children2.data2 == 2 ? "active" : ""}>2</li>
                                                                        <li onClick={e => {
                                                                            if (children2.data3 == "") {
                                                                                setchildren2({ ...children2, data3: "twins" })
                                                                                setchildren("twins")
                                                                            } else {
                                                                                setchildren2({ ...children2, data3: "" })
                                                                                setchildren("")
                                                                            }
                                                                        }} className={children2.data3 == "twins" ? "active" : ""}>Twins</li>
                                                                        <li onClick={e => {
                                                                            if (children2.data4 == "") {
                                                                                setchildren2({ ...children2, data4: "3" })
                                                                                setchildren(3)
                                                                            } else {
                                                                                setchildren2({ ...children2, data4: "" })
                                                                                setchildren("")
                                                                            }
                                                                        }} className={children2.data4 == 3 ? "active" : ""}>3+</li>
                                                                    </ul>
                                                                </div>
                                                                {/* <div className='errorfield'>{error.message}</div> */}
                                                            </div>
                                                            <div className='job_performance'>
                                                                <div className='form_group   full border'>
                                                                    <label>Provider's preferred age</label>
                                                                    <div className='customselect inp'>
                                                                        <input type="text" placeholder='Choose from the list' className='keyword' value={children_age.map((e) => {
                                                                            return e.name
                                                                        })} />
                                                                        <div className='overflow' id='over9' onClick={e => custom("cate9", "over9")}></div>
                                                                        <div className='option' id='cate9'>
                                                                            <p ><input type="checkbox" onClick={a => {
                                                                                selectoption2("18 - 23 years")
                                                                                if (a.target.checked) {
                                                                                    setproviderage({ ...providerage, data1: "18 - 23 years" })
                                                                                } else {
                                                                                    setproviderage({ ...providerage, data1: "" })
                                                                                }
                                                                            }} /><h3>{"18 - 23 years"} </h3><span></span></p>
                                                                            <p ><input type="checkbox" onClick={a => {
                                                                                selectoption2("24 - 30 years")
                                                                                if (a.target.checked) {
                                                                                    setproviderage({ ...providerage, data1: "24 - 30 years" })
                                                                                } else {
                                                                                    setproviderage({ ...providerage, data1: "" })
                                                                                }
                                                                            }} /><h3>{"24 - 30 years"} </h3><span></span></p>
                                                                            <p ><input type="checkbox" onClick={a => {
                                                                                selectoption2("31 - 40 years")
                                                                                if (a.target.checked) {
                                                                                    setproviderage({ ...providerage, data1: "31 - 40 years" })
                                                                                } else {
                                                                                    setproviderage({ ...providerage, data1: "" })
                                                                                }
                                                                            }} /><h3>{"31 - 40 years"} </h3><span></span></p>
                                                                            <p ><input type="checkbox" onClick={a => {
                                                                                selectoption2("Older than 40 years")
                                                                                if (a.target.checked) {
                                                                                    setproviderage({ ...providerage, data1: "Older than 40 years" })
                                                                                } else {
                                                                                    setproviderage({ ...providerage, data1: "" })
                                                                                }
                                                                            }} /><h3>{"Older than 40 years"} </h3><span></span></p>
                                                                        </div>
                                                                        <span onClick={e => custom("cate9", "over9")}>
                                                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M5.22299 0.247873L9.54938 5.05497C9.72313 5.24803 9.58612 5.55566 9.32639 5.55566L0.673609 5.55566C0.413877 5.55566 0.27687 5.24803 0.450621 5.05497L4.77701 0.247873C4.89618 0.115459 5.10382 0.115459 5.22299 0.247873Z" fill="#636363" />
                                                                            </svg>
                                                                        </span>
                                                                    </div>
                                                                    {/* <div className='errorfield'>{error.message}</div> */}
                                                                </div>
                                                            </div>
                                                            <div className='form_group full border qualification'>
                                                                <label>Start date</label>
                                                                <div className='checkbox create'>
                                                                    <ul>
                                                                        <li><input type="checkbox" name="b" onClick={e => {
                                                                            setsearch({ ...search, withinweek: e.target.checked })
                                                                        }} /><span>Within a week </span></li>
                                                                        <li><input type="checkbox" name="b" onClick={e => {
                                                                            setsearch({ ...search, withinmonth: e.target.checked })
                                                                        }} /><span>Within a month</span></li>
                                                                    </ul>
                                                                </div>
                                                                {/* <div className='errorfield'>{error.message}</div> */}
                                                            </div>
                                                            <div className='form_group full border qualification selectbt'>
                                                                <label>Other options</label>
                                                                <div className='checkbox create'>
                                                                    <ul>
                                                                        <li><input type="checkbox" name="" /><span>Has car or valid driver licence </span></li>
                                                                        <li><input type="checkbox" name="" /><span> Has a background check</span></li>
                                                                        <li><input type="checkbox" name="" onClick={e => {
                                                                            if (search.workingabroad == "") {
                                                                                setsearch({ ...search, workingabroad: "Yes" })
                                                                            } else {
                                                                                setsearch({ ...search, workingabroad: "" })
                                                                            }
                                                                        }} /><span> Willing to work abroad</span></li>
                                                                    </ul>
                                                                </div>
                                                                {/* <div className='errorfield'>{error.message}</div> */}
                                                            </div>
                                                            <div className='form_group full qualification selectbt'>
                                                                <label>Experience with</label>
                                                                <div className='checkbox create'>
                                                                    <ul>
                                                                        <li><input type="checkbox" name="" /><span> Newborns</span></li>
                                                                        <li><input type="checkbox" name="" onClick={e => {
                                                                            if (search.childsocialneed == "") {
                                                                                setsearch({ ...search, childsocialneed: "Yes" })
                                                                            } else {
                                                                                setsearch({ ...search, childsocialneed: "" })
                                                                            }
                                                                        }} /><span>Kids with special needs </span></li>
                                                                    </ul>
                                                                </div>
                                                                {/* <div className='errorfield'>{error.message}</div> */}
                                                            </div>
                                                            {cat.data4 ?
                                                                <div className='form_group full'>
                                                                    <label>I need a tutor for</label>
                                                                    <div className='checkbox create'>
                                                                        <ul>
                                                                            <li><input type="checkbox" name="" onClick={e => {
                                                                                if (speak.English == "") {
                                                                                    setspeak({ ...speak, English: "English" })
                                                                                } else {
                                                                                    setspeak({ ...speak, English: "" })
                                                                                }
                                                                            }} /><span>
                                                                                    English </span></li>
                                                                            <li><input type="checkbox" name="" onClick={e => {
                                                                                if (speak.Serbian == "") {
                                                                                    setspeak({ ...speak, Serbian: "Serbian" })
                                                                                } else {
                                                                                    setspeak({ ...speak, Serbian: "" })
                                                                                }
                                                                            }} /><span>
                                                                                    Serbian</span></li>
                                                                            <li><input type="checkbox" name="" onClick={e => {
                                                                                if (speak.Mathematics == "") {
                                                                                    setspeak({ ...speak, Mathematics: "Mathematics" })
                                                                                } else {
                                                                                    setspeak({ ...speak, Mathematics: "" })
                                                                                }
                                                                            }} /><span>
                                                                                    Mathematics</span></li>
                                                                            <li><input type="checkbox" name="" onClick={e => {
                                                                                if (speak.Physics == "") {
                                                                                    setspeak({ ...speak, Physics: "Physics" })
                                                                                } else {
                                                                                    setspeak({ ...speak, Physics: "" })
                                                                                }
                                                                            }} /><span>
                                                                                    Physics </span></li>
                                                                            <li><input type="checkbox" name="" onClick={e => {
                                                                                if (speak.Chemistry == "") {
                                                                                    setspeak({ ...speak, Chemistry: "Chemistry" })
                                                                                } else {
                                                                                    setspeak({ ...speak, Chemistry: "" })
                                                                                }
                                                                            }} /><span>
                                                                                    Chemistry </span></li>
                                                                            <li><input type="checkbox" name="" onClick={e => {
                                                                                if (speak.Online == "") {
                                                                                    setspeak({ ...speak, Online: "Online classes" })
                                                                                } else {
                                                                                    setspeak({ ...speak, Online: "" })
                                                                                }
                                                                            }} /><span>Online classes </span></li>
                                                                        </ul>
                                                                    </div>
                                                                    {/* <div className='errorfield'>{error.message}</div> */}
                                                                </div>
                                                                : ""}
                                                            <button onClick={e => {
                                                                setsubtab("")
                                                                provider_list()
                                                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                                                handleCloselogin_firstprovider()
                                                                // localStorage.setItem("refine2", "true")
                                                                // setTimeout(() => {
                                                                //     window.location.reload()
                                                                // }, 300);
                                                            }}><svg width="15" height="16" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9.00005 2.20704C5.13404 2.20704 2.00001 5.34107 2.00001 9.20708C2.00001 13.0731 5.13404 16.2071 9.00005 16.2071C12.8661 16.2071 16.0001 13.0731 16.0001 9.20708C16.0001 5.34107 12.8661 2.20704 9.00005 2.20704ZM0 9.20708C0 4.23649 4.02946 0.207031 9.00005 0.207031C13.9706 0.207031 18.0001 4.23649 18.0001 9.20708C18.0001 14.1777 13.9706 18.2071 9.00005 18.2071C4.02946 18.2071 0 14.1777 0 9.20708Z" fill="#fff" />
                                                                    <path d="M13.9433 14.1503C14.3338 13.7598 14.967 13.7598 15.3575 14.1503L19.7075 18.5003C20.0981 18.8909 20.0981 19.524 19.7075 19.9146C19.317 20.3051 18.6838 20.3051 18.2933 19.9146L13.9433 15.5645C13.5528 15.174 13.5528 14.5408 13.9433 14.1503Z" fill="#fff" />
                                                                </svg> Refine result</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </Modal.Body>
                        </Modal>
                        : ""
                }
                {subtab == "" ?
                    <>
                        <div className="mobile_looking_for_candidate">
                            <h2>These are experienced candidates from your area</h2>
                        </div>
                        <div className="mobile_looking_for_candidate_boxs">
                            {
                                list.map((data, index) => {
                                    if (index < listshow) {
                                        return (
                                            <div className="mobile_looking_for_candidate_box">
                                                <div className="head_part">
                                                    <h3 onClick={e => {
                                                        navigate("/profile-provider/" + data.id)
                                                    }}>{data.profile_headline != null ? data.profile_headline : ""} </h3>
                                                    {data.plateformsocialmedia == "Yes" ?
                                                        <Facebook_share link={window.location.origin + "/profile-provider/" + data.id} />
                                                        : ""}
                                                </div>
                                                <div className="post_general">
                                                    <h6 onClick={e => {
                                                        navigate("/profile-provider/" + data.id)
                                                    }}>{data.first_name + ' ' + data.last_name} ({data.dob != undefined ? new Date().getFullYear() - parseInt(data.dob.substr(data.dob.lastIndexOf('\\') + 1).split('-')[0]) : ""})</h6>
                                                    <p>
                                                        {data.reviewAvg >= 0 ?
                                                            <>
                                                                {[...Array(data.reviewAvg)].map((star, index) => {
                                                                    index += 1;
                                                                    return (
                                                                        <svg width="12" height="12" style={{ marginLeft: "3px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                        </svg>

                                                                    );
                                                                })}
                                                                {[...Array(5 - data.reviewAvg)].map((star, index) => {
                                                                    index += 1;
                                                                    return (
                                                                        <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: "3px" }} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z" stroke="#A98D4B" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>
                                                                    );
                                                                })}
                                                            </>
                                                            : ""
                                                        }
                                                        <span> ({data.reviewcount})</span>
                                                    </p>
                                                </div>
                                                <div className="main_sec">
                                                    <div className="first_sec">
                                                        <div className="image_sec" onClick={e => {
                                                            navigate("/profile-provider/" + data.id)
                                                        }}>
                                                            <img src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : "img/nany_img.png"} alt="" />
                                                            <div className="heart_sec">
                                                                {localStorage.getItem("user_type") == "parents" ?
                                                                    <Favorite_profile id={data.id} username={data.first_name} heart2={data.favorNot} />
                                                                    : ""
                                                                }
                                                            </div>
                                                            <div className="nany_social">
                                                                {
                                                                    data.phoneVerifiedStatus == 1 ?
                                                                        <img src={window.location.origin + "/images/nany_phone.svg"} alt="" />
                                                                        :
                                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z" fill="#B7B7B7" />
                                                                        </svg>}
                                                                <img src={window.location.origin + "/images/nany_msg.svg"} alt="" />
                                                                {
                                                                    data.facebookverify != null || data.linkdinverify != null ?
                                                                        <img src={window.location.origin + "/images/nany_cont.svg"} alt="" />
                                                                        : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z" fill="#B7B7B7" />
                                                                        </svg>
                                                                }
                                                                {
                                                                    data.docsStatus == "Yes" ?
                                                                        <img src={window.location.origin + "/images/ok.svg"} alt="" />
                                                                        : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z" fill="#B7B7B7" />
                                                                        </svg>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="second_sec">
                                                        <div className="post">
                                                            {
                                                                data.service_type != null ? Object.values(data.service_type)[0] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(data.service_type)[0] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(data.service_type)[0] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(data.service_type)[0] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                            }
                                                            <h5>{data.service_type != null ? Object.values(data.service_type)[0] == "Special Education Paraprofessional" ? "Paraprofessional" : Object.values(data.service_type)[0] == "Special Education Teacher" ? "SPED teacher" : Object.values(data.service_type)[0] : ""}
                                                                {/* {Object.values(data.service_type) + ","} */}
                                                            </h5>
                                                        </div>
                                                        <div className="post">
                                                            <img src="img/post_pay.png" alt="" />
                                                            {profile && profile.country == "Serbia" ? <h5>{data.nanyperhrrate != null ?
                                                                data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                + " - " +
                                                                data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                : data.tutorperhrrate ?
                                                                    data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                    + " - " +
                                                                    data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                    : ""}/hour</h5>

                                                                : <h5>${data.nanyperhrrate != null ? data.nanyperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""}/hour</h5>

                                                            }
                                                        </div>
                                                        {data.service_type != null && Object.values(data.service_type)[1] ?
                                                            <>
                                                                <div className="post">
                                                                    {
                                                                        data.service_type != null ? Object.values(data.service_type)[1] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(data.service_type)[1] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(data.service_type)[1] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(data.service_type)[1] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                    }
                                                                    <h5>{data.service_type != null ? Object.values(data.service_type)[1] : ""}
                                                                        {/* {
                                                                                        data.service_type != null && Object.values(data.service_type)[1].length > 8 ? "..." : ""
                                                                                    } */}
                                                                    </h5>
                                                                </div>

                                                                <div className="post">
                                                                    <img src={window.location.origin + "/img/post_pay.png"} alt="" />
                                                                    {profile && profile.country == "Serbia" ? <h5>{data.nanyperhrrate ?
                                                                        data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                        + " - " +
                                                                        data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                        : data.tutorperhrrate ?
                                                                            data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                            + " - " +
                                                                            data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                            : ""}/hour</h5>

                                                                        : <h5>${data.nanyperhrrate != null ? data.nanyperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""}/hour</h5>

                                                                    }
                                                                </div>
                                                            </>
                                                            : ""}
                                                        <div className="post">
                                                            <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                            <h5>{data.nanyintrestedin != null ? data.nanyintrestedin : "Full time"} </h5>
                                                        </div>
                                                        <div className="post">
                                                            <img src="img/post_cal.png" alt="" />
                                                            <h5>{data.nanystartdate != null ? data.nanystartdate : ""}</h5>
                                                        </div>
                                                        <div className="post">
                                                            <img src="img/post_loc.png" alt="" />
                                                            <h5>{data.country != null ? data.country : ""}, {data.city != null ? data.city : ""}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p id={"show" + index} >{data.about != null ? (data.about.substr(0, 100)
                                                ) : ""}   {data.about != null && data.about.length > 100 ? <span onClick={e => pmore("show" + index, "hide" + index, "plink" + index)}>...more</span> : ""} </p>
                                                <p id={"hide" + index} className="hide">{data.about}  <span onClick={e => pmore("hide" + index, "show" + index, "plink" + index)}> less</span></p>

                                                <div className="view_profile_btn">
                                                    {/* {!localStorage.getItem("token") || !localStorage.getItem("id") ? <Link to="/signup">View profile</Link> : */}
                                                    <button onClick={e => {
                                                        navigate("/profile-provider/" + data.id)
                                                    }}>View profile</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                                )}
                        </div>
                    </> : ""}
                {subtab == "my-profile" ?
                    <div className='Account mobile'>
                        <h2>Account</h2>
                        <div className={ssubtab.personal == "active" ? "active personal" : "personal"} >
                            <h3 onClick={e => setssubtab({ ...ssubtab, personal: ssubtab.personal == "" ? "active" : "" })}>Personal Info</h3>
                            {ssubtab.personal == "active" ?
                                <div className='withoutedit'>
                                    {edit == "" ?
                                        <button onClick={e => setedit("edit")}>
                                            <img src={window.location.origin + "/images/edit.svg"} alt="" />
                                        </button> : ""}
                                    {edit == "" ?
                                        <div className='detail'>
                                            <ul>
                                                <li className='disabledata'><span className='main'>First Name</span><span className='data'>{profile.first_name}</span></li>
                                                <li><span className='main'>Last Name</span><span className='data'>{profile.last_name}</span></li>
                                                <li className='disabledata'><span className='main'>Date of birth</span><span className='data'>{profile.dob}</span></li>
                                                <li><span className='main'>Mobile</span><span className='data'>{(contact_code.code == "" ? profile.countrycode : contact_code.code) + profile.phone}</span></li>
                                                <li><span className='main'>Email </span><span className='data'>{profile.email}</span></li>
                                                <li><span className='main'>Address</span><span className='data'>{profile.address}</span></li>
                                                <li><span className='main'>City</span><span className='data'>{profile.city}</span></li>
                                                <li><span className='main'>ZIP code</span><span className='data'>{profile.zip}</span></li>
                                                <li><span className='main'>Country</span><span className='data'>{profile.country}</span></li>
                                            </ul>
                                        </div>
                                        :
                                        <div className="panel-body">
                                            <form action="">
                                                <div className="row">

                                                    <div className="form-group col-md-6">
                                                        <div className="field-box">
                                                            <label className="label" for="firstName">First Name</label>
                                                            <input type="text" className="form-control" id="firstName" disabled value={profile.first_name} />
                                                        </div>
                                                        <div className="field-box">
                                                            <label className="label" for="lastName">Last Name</label>
                                                            <input type="text" className="form-control" id="lastName" value={profile.last_name} onChange={e => setprofile({ ...profile, last_name: e.target.value })} />
                                                        </div>
                                                        <div className="field-box">
                                                            <label className="label" for="dob">Date of Birth</label>
                                                            <div className="with-icon">
                                                                <img className="icons" src={window.location.origin + "/images/calender.svg"} alt="" />
                                                                <input type="text" className="form-control" id="dob" disabled value={profile.dob} />
                                                            </div>
                                                        </div>
                                                        <div className="field-box">
                                                            <label className="label" for="email">Email address</label>
                                                            <input type="email" className="form-control" id="email" data-required defaultValue={profile.email} onChange={e => setemailverify({ ...emailverify, email: e.target.value })} onBlur={e => emailcheck()} />
                                                            <span>{emailverify.alemail ? emailverify.alemail : profile.email_verified_at == null ? "Please verify your enail" : ""}</span>
                                                        </div>
                                                    </div>

                                                    <div className="form-group col-md-6">
                                                        <div className='form_group number field-box'>
                                                            <label className="label" for="mobile">Mobile Phone</label>
                                                            <input type="number" placeholder='Type here' name='phone' onChange={e => {
                                                                setphoneverify({ ...phoneverify, phone: e.target.value.length <= 10 ? e.target.value : profile.phone })
                                                            }} defaultValue={profile.phone} />
                                                            <div className='country_flag' onClick={e => codeselect()}><img src={contact_code.flag ? contact_code.flag :
                                                                country.data.filter((e) => {
                                                                    if (e.dial_code == ("+" + profile.countrycode)) {
                                                                        return e.flag
                                                                    }
                                                                })[0].flag} /> {contact_code.code ? contact_code.code : profile.countrycode}</div>
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
                                                            {
                                                                phoneverify.phone != "" && profile.phone != phoneverify.phone ?
                                                                    <button onClick={e => mobileverify()}>Get code</button>
                                                                    : ""}
                                                        </div>
                                                        {
                                                            phoneverify.phone != "" && profile.phone != phoneverify.phone ?
                                                                <div className="field-box">
                                                                    <input type="text" placeholder='OTP' className="form-control" onChange={e => {
                                                                        setphoneverify({ ...phoneverify, otp: e.target.value })
                                                                    }} />
                                                                    <button onClick={e => otpverify()}>Verify</button>
                                                                </div>
                                                                : ""}
                                                        <div className="field-box">
                                                            <label className="label" for="address1">Address</label>
                                                            <Location let={getletlon} typedefault={profile.address} />
                                                        </div>
                                                        <div className="field-box">
                                                            <div className="row coln">
                                                                <div className="col-md-6">

                                                                    <label className="label" for="city">City</label>
                                                                    <input type="text" className="form-control" id="city" data-required value={profile.city} onChange={e => setprofile({ ...profile, city: e.target.value })} />
                                                                </div>

                                                                <div className="col-md-6">

                                                                    <label className="label" for="zipCode">ZIP Code</label>
                                                                    <input type="number" className="form-control" id="zipCode" onChange={e => setprofile({ ...profile, zip: e.target.value })} value={profile.zip} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="field-box">
                                                            <label className="label" for="country">Country</label>
                                                            <input type="text" className="form-control" value={profile.country} />
                                                        </div>



                                                    </div>

                                                </div>

                                            </form>
                                        </div>
                                    }
                                    <div className='resetpassword'>
                                        <div className='form_group disabledata'>
                                            <label>Username</label>
                                            <input type="text" value={profile.username} disabled />
                                        </div>
                                        <div className='form_group '>
                                            <label>Password</label>
                                            <input type="password" value="........" />
                                        </div>
                                        <button onClick={e => setShow(true)}>Change password</button>
                                    </div>
                                    <div className="panel-body">
                                        <div className="button text-center">

                                            <div className="pull-right">
                                                <button className="btn" onClick={e => {
                                                    setcontact_code({
                                                        ...contact_code, code: ""
                                                    })
                                                    profilemy()
                                                    setedit("")
                                                }}>Cancel</button>
                                            </div>
                                            <div className="pull-right">
                                                <button className="btn confirm" onClick={e => updateprofile()}>Save changes</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                : ""
                            }
                        </div>
                        <div className={ssubtab.payment == "active" ? "active personal" : "personal"} >
                            <h3 onClick={e => setssubtab({ ...ssubtab, payment: ssubtab.payment == "" ? "active" : "" })}>Payment and Membership</h3>
                            {ssubtab.payment == "active" ?
                                <div className='cardstype'>
                                    <div className='paymenttype'>
                                        <button onClick={e => setcardnew(true)}>
                                            Add new card
                                        </button>
                                        <ul>
                                            <li>
                                                <input type="radio" id='a' name='a' />
                                                <label for="a">Pay with card</label>
                                            </li>
                                            <li>
                                                <input type="radio" id='b' name='a' />
                                                <label for="b">Pay with PayPal</label>
                                            </li>
                                        </ul>

                                    </div>
                                    <h4>My Cards</h4>
                                    <div className='savecard'>
                                        <ul>
                                            <li>

                                                <label for="c"> <input type="radio" id='c' name='c' /><span>Set as default</span></label>
                                                <span>Card name</span>
                                                <p>Bankname card****4589</p>
                                                <span>Expires on</span>
                                                <p>04/2022</p>
                                                <button>Remove</button>
                                                <button onClick={e => setcardedit(true)}>Edit</button>
                                            </li>
                                            <li>
                                                <label for="d"> <input type="radio" id='d' name='c' /><span>Set as default</span></label>
                                                <span>Card name</span>
                                                <p>Bankname card ****4589</p>
                                                <span>Expires on</span>
                                                <p>04/2022</p>
                                                <button>Remove</button>
                                                <button onClick={e => setcardedit(true)}>Edit</button>
                                            </li>
                                            <li>
                                                <label for="e"> <input type="radio" id='e' name='c' /><span>Set as default</span></label>
                                                <span>Card name</span>
                                                <p>Bankname card ****4589</p>
                                                <span>Expires on</span>
                                                <p>04/2022</p>
                                                <button>Remove</button>
                                                <button onClick={e => setcardedit(true)}>Edit</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='activeplan'>
                                        <ul>
                                            <li>
                                                <label>Current membership plan<span> {membership ? membership : "Plan not active"}</span></label>
                                                <button onClick={e => setcancelmembership(true)}>Cancel plan</button>
                                                <NavLink to={""}
                                                // {localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank"
                                                >  <button >Change plan</button></NavLink>
                                            </li>
                                            <li>
                                                <label>Subscription</label>
                                                <p>Auto renew subscription
                                                    <label className="switch">
                                                        <input type="checkbox" />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                : ""
                            }
                        </div>
                        <div className={ssubtab.delete == "active" ? "active personal" : "personal"} >
                            <h3 onClick={e => setssubtab({ ...ssubtab, delete: ssubtab.delete == "" ? "active" : "" })}>Deactivate/ Delete account</h3>
                            {ssubtab.delete == "active" ?
                                <div className='activeplan deletedeactivate'>
                                    <ul>
                                        <li>
                                            <label>Current account status plan <span>{profile.account_status == "ENABLE" ? "Active" : "Inactive"}</span></label>
                                            <button onClick={e => setdeletewarning(true)}>Delete account</button>
                                            <button onClick={e => setdisableaccoutn(true)}>Disable account</button>
                                        </li>
                                    </ul>
                                </div>
                                : ""
                            }
                        </div>
                    </div>
                    : ""}
                {
                    subtab == "Profile" ?
                        <>
                            {localStorage.getItem("user_type") == "parents" ?
                                <div className='mobile profile'>
                                    <View_edit />
                                </div>
                                :
                                <div className='mobile profile'>
                                    <View_edit_provider />
                                </div>
                            }
                        </>
                        : ""
                }
                <div className="container">
                    <div className="body_section searchbody" style={subtab != "" ? { minHeight: "auto", marginBottom: "100px", float: "left", width: "100%" } : {}} >
                        <div className="left_side_section" id={!catopen ? 'leftdata' : "leftdataback"} >
                            {profile.about == "" || profile.about == null ? "" :
                                <>
                                    <div className="profile_box">
                                        <div className="profile_box_social">
                                            <div className="profile_box_social_sec1">
                                                {localStorage.getItem("user_type") == "parents" ?
                                                    <Facebook_share link={window.location.origin + "/profile-parents/" + profile.id} />
                                                    :
                                                    <Facebook_share link={window.location.origin + "/profile-provider/" + profile.id} />
                                                }
                                                {
                                                    profile.phoneVerifiedStatus == 1 ?
                                                        <img src={window.location.origin + "/images/nany_phone.svg"} alt="" />
                                                        :
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z" fill="#B7B7B7" />
                                                        </svg>}
                                                <img src={window.location.origin + "/images/nany_msg.svg"} alt="" />
                                                {
                                                    profile.facebookverify != null || profile.linkdinverify != null ?
                                                        <img src={window.location.origin + "/images/nany_cont.svg"} alt="" />
                                                        : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z" fill="#B7B7B7" />
                                                        </svg>
                                                }

                                                {localStorage.getItem("user_type") == "parents" ? "" :
                                                    profile.docsStatus == "Yes" ?
                                                        <img src={window.location.origin + "/images/ok.svg"} alt="" />
                                                        : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z" fill="#B7B7B7" />
                                                        </svg>
                                                }
                                            </div>
                                            {localStorage.getItem("user_type") == "parents" ?
                                                <span className='addjob'>
                                                    <Profession_change />
                                                </span>
                                                :
                                                <div className="profile_box_social_sec2">
                                                    {
                                                        profile.service_type && profile.service_type.tab1 == "Nanny" ? <img src={window.location.origin + "/images/nany_pur.svg"} alt="" /> : ""}
                                                    {
                                                        profile.service_type && profile.service_type.tab2 ? <img src={window.location.origin + "/images/special_education.svg"} alt="" /> : ""}
                                                    {
                                                        profile.service_type && profile.service_type.tab3 ? <img src={window.location.origin + "/images/professional.svg"} alt="" /> : ""}
                                                    {
                                                        profile.service_type && profile.service_type.tab4 ? <img src={window.location.origin + "/images/tutorform.svg"} alt="" /> : ""
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div className="profile_pic_sec">
                                            <img src="img/left_pic.png" alt="" />
                                            <div className="profile_pic">
                                                <img src={api + "/public/assets/images/users/" + profile.file_path} width="80" height="80" alt="" />
                                                <div className="edit_icon">
                                                    <Link to="" onClick={e => setphotoupload(true)}><img src={window.location.origin + "/images/edit.svg"} alt="" /></Link>
                                                </div>
                                            </div>
                                            <img src="img/right_pic.png" alt="" />
                                        </div>
                                        <div className="profile_detail">
                                            <p>{profile.first_name + ' ' + profile.last_name} ({profile.dob != undefined ? new Date().getFullYear() - parseInt(profile.dob.substr(profile.dob.lastIndexOf('\\') + 1).split('-')[0]) : ""})</p>
                                            <div className="profilestart_video">
                                                <a>
                                                    <img src={window.location.origin + "/images/video.svg"} alt="" />
                                                </a>
                                                <span className='tooltipu'><strong>Upgrade</strong> to post media.</span>
                                                {profile.reviewAvg >= 0 ?
                                                    <>
                                                        {[...Array(profile.reviewAvg)].map((star, index) => {
                                                            index += 1;
                                                            return (
                                                                <svg width="12" height="12" style={{ marginLeft: "3px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                </svg>

                                                            );
                                                        })}
                                                        {[...Array(5 - profile.reviewAvg)].map((star, index) => {
                                                            index += 1;
                                                            return (
                                                                <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: "3px" }} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z" stroke="#A98D4B" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                            );
                                                        })}
                                                    </>
                                                    : ""
                                                }
                                                <span>({profile.reviewcount})</span>
                                            </div>
                                        </div>
                                        <div className="profile_functions">
                                            <div className="members">
                                                <h5>{(new Date().getFullYear() - new Date(profile.created_at).getFullYear()) > 0 ? (new Date().getFullYear() - new Date(profile.created_at).getFullYear()) + " YRS" : 0 + " YRS"} </h5>
                                                <h6>Member</h6>
                                            </div>
                                            <div className="vi"></div>
                                            {localStorage.getItem("user_type") == "parents" ?
                                                <div className="applications">
                                                    <h5>{profile.jobs}</h5>
                                                    <h6>Job posts</h6>
                                                </div> :
                                                <div className="applications">
                                                    <h5>{profile.jobApplicationcount}</h5>
                                                    <h6>Applications</h6>
                                                </div>}
                                            <div className="vi"></div>
                                            <div className="hiring">
                                                <h5>{profile.hiringcount}</h5>
                                                <h6>Hirings</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="silde_bar_dropdowns">
                                        <button type="button" className="side_drop_collapse" onClick={e => setprofilesection(profilesection != "notifications" ? "notifications" : "")}><img src={window.location.origin + "/images/notification.svg"} alt="" />
                                            <h4>Notifications<span> (<Count_notification />)</span></h4>
                                        </button>
                                        <div className="side_drop_collapse_box_content" style={profilesection == "notifications" ? { display: 'block' } : { display: 'none' }}>
                                            {localStorage.getItem("user_type") == "parents" ?
                                                <Notification_tab_parents setsubtab={setsubtab} subtab={subtab} />
                                                :
                                                <Notification_tab_provider setsubtab={setsubtab} subtab={subtab} />
                                            }
                                        </div>
                                        <button type="button" className="side_drop_collapse" onClick={e => setprofilesection(profilesection != "message" ? "message" : "")}><img src={window.location.origin + "/images/message.svg"} alt="" />
                                            <h4>
                                                Messages<span> (<Count_message />)</span></h4>
                                        </button>
                                        <div className="side_drop_collapse_box_content" style={profilesection == "message" ? { display: 'block' } : { display: 'none' }}>
                                            <Message_tab setsubtab={setsubtab} subtab={subtab} />
                                        </div>
                                        <button type="button" className="side_drop_collapse" onClick={e => setprofilesection(profilesection != "Job_history" ? "Job_history" : "")}><img src={window.location.origin + "/images/jobnhistory.svg"} alt="" />
                                            <h4>
                                                Job History and Docs</h4>
                                        </button>
                                        <div className="side_drop_collapse_box_content" style={profilesection == "Job_history" ? { display: 'block' } : { display: 'none' }}>
                                            {localStorage.getItem("user_type") == "parents" ?
                                                <Job_history_tap_parents setsubtab={setsubtab} subtab={subtab} /> :
                                                <Job_history_tap setsubtab={setsubtab} subtab={subtab} />
                                            }
                                        </div>
                                        {/* <button type="button" className="side_drop_collapse" ><img src={window.location.origin + "/images/promo.svg"} alt="" />
                                            <h4>Promotions</h4>
                                        </button>
                                        <div className="side_drop_collapse_box_content">
                                            <ul>
                                                <li></li>
                                            </ul>
                                        </div> */}
                                        <button type="button" className="side_drop_collapse" onClick={e => setprofilesection(profilesection != "fav" ? "fav" : "")}><svg width="16" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 1.55556V12.4444C0 13.3 0.692222 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0H1.55556C0.692222 0 0 0.7 0 1.55556ZM9.33332 4.66573C9.33332 5.95684 8.2911 6.99906 6.99999 6.99906C5.70888 6.99906 4.66666 5.95684 4.66666 4.66573C4.66666 3.37462 5.70888 2.3324 6.99999 2.3324C8.2911 2.3324 9.33332 3.37462 9.33332 4.66573ZM7.0001 8.47839C5.44455 8.47839 2.33344 9.33395 2.33344 10.8895V11.6673H11.6668V10.8895C11.6668 9.33395 8.55566 8.47839 7.0001 8.47839Z" fill="#A98D4B" />
                                        </svg>
                                            <h4>Recent profile visits</h4>
                                        </button>
                                        <div className="side_drop_collapse_box_content Document_main side_drop_collapse" style={profilesection == "fav" ? { display: 'block' } : { display: 'none' }}>
                                            <ul style={profilesection != "" ? { display: "block" } : { display: "none" }}>
                                                <li onClick={e => {
                                                    navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/who-i-visited" : "/search-providers/who-i-visited")
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                    setsubtab("who-i-visited")
                                                }} className={subtab == "who-i-visited" ? "active " : ""} >Who I Visited</li>
                                                <li onClick={e => {
                                                    navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/who-visited-me" : "/search-providers/who-visited-me")
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                    setsubtab("who-visited-me")
                                                }} className={subtab == "who-visited-me" ? "active upgrade" : "upgrade"}>Who Visited Me <span><Link to={""}
                                                // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank"
                                                >upgrade</Link></span></li>
                                            </ul>
                                        </div>

                                        {localStorage.getItem("user_type") == "parents" ?
                                            <button type="button" className="side_drop_collapse arrow" onClick={e => {
                                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                                setsubtab("all-profile")
                                                navigate("/search-providers/all-profile")
                                            }}><img src={window.location.origin + "/images/fav.svg"} alt="" />
                                                <h4>Favorites</h4>
                                            </button> :
                                            <button type="button" className="side_drop_collapse" onClick={e => setprofilesection(profilesection != "Favorites" ? "Favorites" : "")}><img src={window.location.origin + "/images/fav.svg"} alt="" />
                                                <h4>Favorites</h4>
                                            </button>
                                        }
                                        <div className="side_drop_collapse_box_content" style={profilesection == "Favorites" ? { display: 'block' } : { display: 'none' }}>
                                            {localStorage.getItem("user_type") == "parents" ?
                                                <Favorite_provider setsubtab={setsubtab} subtab={subtab} /> :
                                                <Favorite_provider setsubtab={setsubtab} subtab={subtab} />
                                            }
                                        </div>
                                        <button className={subtab == "Loyalty" ? "active side_drop_collapse arrow" : "side_drop_collapse arrow"} onClick={e => {
                                            setprofilesection(profilesection != "Loyalty" ? "Loyalty" : "")
                                            navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/Loyalty" : "/search-providers/Loyalty")
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                            setsubtab("Loyalty")
                                        }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                                <path d="M9.66667 12.0881V4.65248H6.33333V12.0881C6.33333 12.2612 6.39583 12.3945 6.52083 12.488C6.64583 12.5814 6.80556 12.6282 7 12.6282H9C9.19444 12.6282 9.35417 12.5814 9.47917 12.488C9.60417 12.3945 9.66667 12.2612 9.66667 12.0881ZM4.91667 3.3232H6.94792L5.63542 1.65122C5.45486 1.43659 5.21528 1.32928 4.91667 1.32928C4.63889 1.32928 4.40278 1.42621 4.20833 1.62006C4.01389 1.81391 3.91667 2.04931 3.91667 2.32624C3.91667 2.60317 4.01389 2.83857 4.20833 3.03242C4.40278 3.22627 4.63889 3.3232 4.91667 3.3232ZM12.0833 2.32624C12.0833 2.04931 11.9861 1.81391 11.7917 1.62006C11.5972 1.42621 11.3611 1.32928 11.0833 1.32928C10.7847 1.32928 10.5451 1.43659 10.3646 1.65122L9.0625 3.3232H11.0833C11.3611 3.3232 11.5972 3.22627 11.7917 3.03242C11.9861 2.83857 12.0833 2.60317 12.0833 2.32624ZM16 4.9848V8.308C16 8.40493 15.9688 8.48455 15.9062 8.54686C15.8438 8.60917 15.7639 8.64032 15.6667 8.64032H14.6667V12.9605C14.6667 13.2374 14.5694 13.4728 14.375 13.6667C14.1806 13.8605 13.9444 13.9574 13.6667 13.9574H2.33333C2.05556 13.9574 1.81944 13.8605 1.625 13.6667C1.43056 13.4728 1.33333 13.2374 1.33333 12.9605V8.64032H0.333333C0.236111 8.64032 0.15625 8.60917 0.09375 8.54686C0.03125 8.48455 0 8.40493 0 8.308V4.9848C0 4.88788 0.03125 4.80826 0.09375 4.74595C0.15625 4.68364 0.236111 4.65248 0.333333 4.65248H4.91667C4.27083 4.65248 3.72049 4.42574 3.26562 3.97226C2.81076 3.51879 2.58333 2.97011 2.58333 2.32624C2.58333 1.68237 2.81076 1.1337 3.26562 0.680218C3.72049 0.226739 4.27083 0 4.91667 0C5.65972 0 6.24306 0.266548 6.66667 0.799645L8 2.51317L9.33333 0.799645C9.75694 0.266548 10.3403 0 11.0833 0C11.7292 0 12.2795 0.226739 12.7344 0.680218C13.1892 1.1337 13.4167 1.68237 13.4167 2.32624C13.4167 2.97011 13.1892 3.51879 12.7344 3.97226C12.2795 4.42574 11.7292 4.65248 11.0833 4.65248H15.6667C15.7639 4.65248 15.8438 4.68364 15.9062 4.74595C15.9688 4.80826 16 4.88788 16 4.9848Z" fill="#A98D4B" />
                                            </svg>
                                            <h4>SensCare Loyalty </h4>
                                        </button>
                                        <button className={subtab == "Reviews" ? "active side_drop_collapse arrow" : "side_drop_collapse arrow"} onClick={e => {
                                            navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/Reviews" : "/search-providers/Reviews")
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                            setsubtab("Reviews")

                                        }}><img src={window.location.origin + "/images/reviewi.svg"} alt="" />
                                            <h4>Reviews</h4>
                                        </button>
                                        <button type="button" className="side_drop_collapse" onClick={e => setprofilesection(profilesection != "setting" ? "setting" : "")}><img src={window.location.origin + "/images/setting.svg"} alt="" />
                                            <h4>Settings</h4>
                                        </button>
                                        <div className="side_drop_collapse_box_content" style={profilesection == "setting" ? { display: 'block' } : { display: 'none' }}>
                                            <ul>
                                                <li className={subtab == "my-profile" ? "active" : ""} onClick={e => {
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                    navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/my-profile" : "/search-providers/my-profile")
                                                }}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM7.99973 2.40027C9.32773 2.40027 10.3997 3.47227 10.3997 4.80027C10.3997 6.12827 9.32773 7.20027 7.99973 7.20027C6.67173 7.20027 5.59973 6.12827 5.59973 4.80027C5.59973 3.47227 6.67173 2.40027 7.99973 2.40027ZM3.19946 11.1842C4.23146 12.7362 5.99946 13.7602 7.99946 13.7602C9.99946 13.7602 11.7675 12.7362 12.7995 11.1842C12.7755 9.59215 9.59146 8.72015 7.99946 8.72015C6.39946 8.72015 3.22346 9.59215 3.19946 11.1842Z" fill="#636363" />
                                                    </svg>
                                                    <span>
                                                        my-profile</span>
                                                </li>
                                                <li className={subtab == "Profile" ? "active" : ""} onClick={e => {
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                    navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/Profile" : "/search-providers/Profile")
                                                }}>
                                                    <svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.5067 1.77778H14.2222C15.2 1.77778 16 2.57778 16 3.55556V16C16 16.9778 15.2 17.7778 14.2222 17.7778H1.77778C0.8 17.7778 0 16.9778 0 16V3.55556C0 2.57778 0.8 1.77778 1.77778 1.77778H5.49333C5.86667 0.746667 6.84444 0 8 0C9.15556 0 10.1333 0.746667 10.5067 1.77778ZM8.88932 2.66623C8.88932 2.17734 8.48932 1.77734 8.00043 1.77734C7.51154 1.77734 7.11154 2.17734 7.11154 2.66623C7.11154 3.15512 7.51154 3.55512 8.00043 3.55512C8.48932 3.55512 8.88932 3.15512 8.88932 2.66623ZM7.9998 5.33313C9.47535 5.33313 10.6665 6.52424 10.6665 7.9998C10.6665 9.47535 9.47535 10.6665 7.9998 10.6665C6.52424 10.6665 5.33313 9.47535 5.33313 7.9998C5.33313 6.52424 6.52424 5.33313 7.9998 5.33313ZM2.66711 14.7553V15.9998H13.3338V14.7553C13.3338 12.9775 9.77822 11.9998 8.00045 11.9998C6.22267 11.9998 2.66711 12.9775 2.66711 14.7553Z" fill="#636363" />
                                                    </svg>
                                                    <span>View/Edit Profile</span>
                                                </li>
                                                <li className={subtab == "SignOut" ? "active" : ""} onClick={e => setsignout(true)}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.4444 1.71746C14.4444 3.14603 15.746 5.48253 15.746 8.12697C15.746 12.4698 12.2286 15.9905 7.88889 16C3.55556 16.0095 0.00635499 12.4762 5.79416e-06 8.13967C-0.00316881 5.49523 1.29842 3.15238 3.29524 1.72063C3.66667 1.45714 4.18413 1.56825 4.40635 1.96508L4.90794 2.85714C5.09524 3.19047 5.00635 3.61269 4.69841 3.84127C3.38095 4.81904 2.53969 6.36825 2.53969 8.1238C2.53651 11.054 4.90476 13.4603 7.87301 13.4603C10.7809 13.4603 13.2254 11.1047 13.2063 8.09205C13.1968 6.44761 12.4222 4.86031 11.0444 3.83809C10.7365 3.60952 10.6508 3.1873 10.8381 2.85714L11.3397 1.96508C11.5619 1.57143 12.0762 1.45397 12.4444 1.71746ZM9.14285 8.38094V0.761904C9.14285 0.339682 8.80317 0 8.38095 0H7.36508C6.94285 0 6.60317 0.339682 6.60317 0.761904V8.38094C6.60317 8.80316 6.94285 9.14285 7.36508 9.14285H8.38095C8.80317 9.14285 9.14285 8.80316 9.14285 8.38094Z" fill="#636363" />
                                                    </svg>
                                                    <span>Sign Out</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        {subtab == "" ?
                            <div className="right_side_section">
                                <div className="looking_for_candidate">
                                    <h2>These are experienced candidates from your area</h2>
                                    <div className="looking_for_candidate_filter_sec">
                                        <div className="result">
                                            <p>{list.length} <span>result{list.length > 1 ? "s" : ""}</span></p>
                                        </div>
                                        <div className="page_filter">
                                            <div className="sortby">
                                                <label for="">Sort by</label>
                                                <div className="sortby_select">
                                                    <select name="" id="" onChange={e => short_by(e)}>
                                                        <option selected value="Relevance">Relevance</option>
                                                        <option value="Reviews">Reviews</option>
                                                        <option value="Distance">Distance</option>
                                                        <option value="Low to high">Rate: Low to high</option>
                                                        <option value="High to low">Rate: High to low</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="resultperpage">
                                                <label for="">Result per page</label>
                                                <div className="resultperpage_select">
                                                    <select name="" id="" onChange={e => setlistshow(parseInt(e.target.value))}>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                        <option value="20">20</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        list.map((data, index) => {
                                            if (index < listshow) {
                                                return (
                                                    <div className="looking_for_candidate_boxs">
                                                        <div className="looking_for_candidate_box">
                                                            <div className="first_sec">
                                                                <div className="image_sec" >
                                                                    <img onClick={e => {
                                                                        navigate("/profile-provider/" + data.id)
                                                                    }} src={data.file_path != null ? api + "/public/assets/images/users/" + data.file_path : "img/nany_img.png"} alt="" />
                                                                    <div className="heart_sec">
                                                                        {localStorage.getItem("user_type") == "parents" ?
                                                                            <Favorite_profile id={data.id} username={data.first_name} heart2={data.favorNot} />
                                                                            : ""}

                                                                    </div>
                                                                </div>
                                                                <div className="nany_social">
                                                                    {
                                                                        data.phoneVerifiedStatus == 1 ?
                                                                            <img src={window.location.origin + "/images/nany_phone.svg"} alt="" />
                                                                            :
                                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M11.5641 0.576804L9.12661 0.0143156C8.86178 -0.0466206 8.58991 0.0916578 8.4821 0.34009L7.35712 2.96503C7.25868 3.19472 7.32431 3.46424 7.51884 3.62127L8.93912 4.78375C8.09539 6.58137 6.6212 8.07664 4.78608 8.93678L3.62361 7.5165C3.46423 7.32197 3.19705 7.25635 2.96737 7.35479L0.342424 8.47976C0.0916485 8.58992 -0.0466299 8.86178 0.0143063 9.12662L0.576795 11.5641C0.635387 11.8172 0.860382 12 1.12522 12C7.12744 12 12 7.13682 12 1.12523C12 0.862735 11.8195 0.635396 11.5641 0.576804Z" fill="#B7B7B7" />
                                                                            </svg>}
                                                                    <img src={window.location.origin + "/images/nany_msg.svg"} alt="" />
                                                                    {
                                                                        data.facebookverify != null || data.linkdinverify != null ?
                                                                            <img src={window.location.origin + "/images/nany_cont.svg"} alt="" />
                                                                            : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6.00072 1.80063C6.99672 1.80063 7.80072 2.60463 7.80072 3.60063C7.80072 4.59663 6.99672 5.40063 6.00072 5.40063C5.00472 5.40063 4.20072 4.59663 4.20072 3.60063C4.20072 2.60463 5.00472 1.80063 6.00072 1.80063ZM2.39874 8.38841C3.17274 9.55241 4.49874 10.3204 5.99874 10.3204C7.49874 10.3204 8.82474 9.55241 9.59874 8.38841C9.58074 7.19441 7.19274 6.54041 5.99874 6.54041C4.79874 6.54041 2.41674 7.19441 2.39874 8.38841Z" fill="#B7B7B7" />
                                                                            </svg>
                                                                    }
                                                                    {
                                                                        data.docsStatus == "Yes" ?
                                                                            <img src={window.location.origin + "/images/ok.svg"} alt="" />
                                                                            : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M0 6C0 2.688 2.688 0 6 0C9.312 0 12 2.688 12 6C12 9.312 9.312 12 6 12C2.688 12 0 9.312 0 6ZM1.79999 6.00005L4.79999 9.00005L10.2 3.60005L9.35399 2.74805L4.79999 7.30205L2.64599 5.15405L1.79999 6.00005Z" fill="#B7B7B7" />
                                                                            </svg>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="second_sec">
                                                                <div className="heading">
                                                                    <h3 onClick={e => {
                                                                        navigate("/profile-provider/" + data.id)
                                                                    }}>{data.profile_headline != null ? data.profile_headline : ""} </h3>
                                                                    {data.plateformsocialmedia == "Yes" ?
                                                                        <Facebook_share link={window.location.origin + "/profile-provider/" + data.id} />
                                                                        : ""}

                                                                </div>
                                                                <div className="post_general">
                                                                    <h6 onClick={e => {
                                                                        navigate("/profile-provider/" + data.id)
                                                                    }}>{data.first_name + ' ' + data.last_name} ({data.dob != undefined ? new Date().getFullYear() - parseInt(data.dob.substr(data.dob.lastIndexOf('\\') + 1).split('-')[0]) : ""})</h6>
                                                                    <p>
                                                                        {data.reviewAvg >= 0 ?
                                                                            <>
                                                                                {[...Array(data.reviewAvg)].map((star, index) => {
                                                                                    index += 1;
                                                                                    return (
                                                                                        <svg width="12" height="12" style={{ marginLeft: "3px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                                        </svg>

                                                                                    );
                                                                                })}
                                                                                {[...Array(5 - data.reviewAvg)].map((star, index) => {
                                                                                    index += 1;
                                                                                    return (
                                                                                        <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: "3px" }} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z" stroke="#A98D4B" stroke-linecap="round" stroke-linejoin="round" />
                                                                                        </svg>
                                                                                    );
                                                                                })}
                                                                            </>
                                                                            : ""
                                                                        }
                                                                        <span> ({data.reviewcount})</span>
                                                                    </p>
                                                                </div>
                                                                <div className="post_detail">
                                                                    <div className="post">
                                                                        {
                                                                            data.service_type != null ? Object.values(data.service_type)[0] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(data.service_type)[0] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(data.service_type)[0] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(data.service_type)[0] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                        }
                                                                        <h5>{data.service_type != null ? Object.values(data.service_type)[0]
                                                                            : ""}
                                                                            {/* {
                                                                                data.service_type != null && Object.values(data.service_type)[0].length > 8 ? "..." : ""
                                                                            } */}

                                                                            {/* {Object.values(data.service_type) + ","} */}
                                                                        </h5>
                                                                    </div>
                                                                    <div className="vi"></div>

                                                                    <div className="post_pay">
                                                                        <img src={window.location.origin + "/img/post_pay.png"} alt="" />
                                                                        {profile && profile.country == "Serbia" ? <h5>{data.nanyperhrrate != null ?
                                                                            data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                            + " - " +
                                                                            data.nanyperhrrate.substr(data.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                            : data.tutorperhrrate ?
                                                                                data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                                + " - " +
                                                                                data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                                : ""}
                                                                            /hour</h5>
                                                                            : <h5>${data.nanyperhrrate != null ? data.nanyperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""}
                                                                                /hour</h5>
                                                                        }
                                                                    </div>
                                                                    <div className="vi"></div>
                                                                    {data.service_type != null && Object.values(data.service_type)[1] ?
                                                                        <>
                                                                            <div className="post">
                                                                                {
                                                                                    data.service_type != null ? Object.values(data.service_type)[1] == "Nanny" ? <img src={window.location.origin + "/images/nany_post.svg"} alt="" /> : Object.keys(data.service_type)[1] == "tab2" ? <img src={window.location.origin + "/images/teacher_post.svg"} alt="" /> : Object.keys(data.service_type)[1] == "tab3" ? <img src={window.location.origin + "/images/education_post.svg"} alt="" /> : Object.keys(data.service_type)[1] == "tab4" ? <img src={window.location.origin + "/images/tutor_post.svg"} alt="" /> : "" : ""
                                                                                }
                                                                                <h5> {data.service_type != null ? Object.values(data.service_type)[1]
                                                                                    : ""}
                                                                                    {/* {
                                                                                        data.service_type != null && Object.values(data.service_type)[1].length > 8 ? "..." : ""
                                                                                    } */}

                                                                                </h5>
                                                                            </div>
                                                                            <div className="vi"></div>
                                                                            <div className="post_pay">
                                                                                <img src={window.location.origin + "/images/post_pay.svg"} alt="" />
                                                                                {profile && profile.country == "Serbia" ? <h5>{data.tutorperhrrate != null ?
                                                                                    data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                                    + " - " +
                                                                                    data.tutorperhrrate.substr(data.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                                    : ""}/hour</h5>

                                                                                    : <h5>${data.tutorperhrrate != null ? data.tutorperhrrate : data.tutorperhrrate ? data.tutorperhrrate : ""}/hour</h5>

                                                                                }

                                                                            </div>
                                                                            <div className="vi"></div>
                                                                        </>
                                                                        : ""}
                                                                    <div className="post_fet">
                                                                        <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                                        <h5>{data.nanyintrestedin != null ? data.nanyintrestedin : "Full time"} </h5>
                                                                    </div>
                                                                    <div className="vi"></div>
                                                                    <div className="post_cal">
                                                                        <img src={window.location.origin + "/images/post_cal.svg"} alt="" />
                                                                        <h5>{data.nanystartdate != null ? data.nanystartdate : data.tutorstartdate}</h5>
                                                                    </div>
                                                                    <div className="vi"></div>
                                                                    <div className="post_loc">
                                                                        <img src={window.location.origin + "/images/post_loc.svg"} alt="" />
                                                                        <h5>{data.country != null ? data.country : ""}, {data.city != null ? data.city : ""}</h5>
                                                                    </div>
                                                                </div>
                                                                <p id={"half" + index} >{data.about != null ? (data.about.substr(0, 100)
                                                                ) : ""}  {data.about != null && data.about.length > 100 ? <span onClick={e => pmore("half" + index, "full" + index, "plink" + index)}>...more</span> : ""} </p>
                                                                <p id={"full" + index} className="hide">{data.about}  <span onClick={e => pmore("full" + index, "half" + index, "plink" + index)}> less</span></p>

                                                                <div className="view_profile_btn">
                                                                    {/* {!localStorage.getItem("token") || !localStorage.getItem("id") ? <Link to="/signup">View profile</Link> :  */}
                                                                    <button onClick={e => {
                                                                        navigate("/profile-provider/" + data.id)
                                                                    }}>View profile</button>
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <p id={"plink" + index} className="hide">Please refer to our <Link to="/faq">FAQ</Link> and <Link to="/safety-center">Safety center</Link> to read safety tips.</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }

                                    {
                                        list.length == 0 && noresult != "" ?
                                            <div className="noresult">
                                                <h3>Sorry your search returned no Result.</h3>
                                                <img src={window.location.origin + "/images/search_noresult.svg"} />
                                            </div>
                                            : ""
                                    }
                                    {/* {
                                        list.length >= 6 ?
                                            <div className="load_more" onClick={e => setlistshow(100)}>
                                               
                                                Load more
                                            </div> : ""} */}
                                    {
                                        listshow < list.length ? (
                                            <div className="load_more" onClick={e => setlistshow(100)}>
                                                Load more
                                            </div>
                                        ) : null
                                    }

                                </div>
                                <div className="mob_update_to_premium">
                                    <h2><img src={window.location.origin + "/images/upgrade_icon.svg"} alt="" /><Link to={""}
                                    // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"}
                                    >Upgrade to premium</Link></h2>
                                    <h3>Appear higher in search Result and find your perfect {localStorage.getItem("user_type") == "parents" ? " candidate" : " job today"} <span><img src={window.location.origin + "/images/upgrade_right_side.svg"} alt="" /></span></h3>
                                </div>
                                <div className="update_to_premium">
                                    <h2><img src={window.location.origin + "/images/upgrade_icon.svg"} alt="" />Appear higher in search Result and find your perfect
                                        {localStorage.getItem("user_type") == "parents" ? " candidate" : " job today"}</h2>
                                    <h3><Link to={""}
                                    // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"}
                                    >Upgrade to premium</Link> <span><img src={window.location.origin + "/images/upgrade_right_side.svg"} alt="" /></span></h3>
                                </div>
                                {interested?.length > 0 ?
                                    <div className={"interested_fam  " + (interested.length < 5 ? "main-header" : "")}>
                                        <h2>No Results</h2>
                                        {/* <p>View popular candidates in your area</p> */}
                                        <div className="interested_fam_boxs">
                                            <div className="interested_fam_boxs images_set">
                                                {
                                                    interested?.length < 5 ?
                                                        interested?.map((data, index) => {

                                                            let data2 = data.user ? data.user : data;
                                                            return (<div className="interested_fam_box " style={{ marginBottom: "30px" }}>
                                                                <div className="image_sec">
                                                                    <img src={data2.file_path != null ? api + "/public/assets/images/users/" + data2.file_path : "img/nany_img.png"} alt="" />
                                                                    <div className="heart_sec">
                                                                        {localStorage.getItem("user_type") == "parents" ?
                                                                            <Favorite_profile id={data2.id} username={data2.first_name} heart2={data.favornotprofile} />
                                                                            : ""}
                                                                    </div>
                                                                </div>
                                                                <div className="general_sec">
                                                                    <h4><Link to={data2.user_type == "parents" ? "/profile-parents/" + data2.id : "/profile-provider/" + data2.id} target="_blank">{data2.first_name + " " + data2.last_name}</Link></h4>
                                                                    {data.reviewAvg >= 0 ?
                                                                        <>
                                                                            {[...Array(data.reviewAvg)]?.map((star, index) => {
                                                                                index += 1;
                                                                                return (
                                                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                                    </svg>

                                                                                );
                                                                            })}
                                                                            {[...Array(5 - data.reviewAvg)]?.map((star, index) => {
                                                                                index += 1;
                                                                                return (
                                                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z" stroke="#A98D4B" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                                                                                    </svg>
                                                                                );
                                                                            })}
                                                                        </>
                                                                        : ""
                                                                    }
                                                                    <div className="detail_sec">
                                                                        <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                                        <p> {data.service_types != null && data.service_types != undefined ? Object.values(data.service_types)[0]
                                                                            : ""}
                                                                            {data.service_type != null ? Object.values(data.service_type)[0]
                                                                                : ""}</p>
                                                                    </div>
                                                                    <div className="detail_sec">
                                                                        <img src={window.location.origin + "/images/post_pay.svg"} alt="" />
                                                                        <p>{profile && profile.country == "Serbia" ? <h5>{data2.nanyperhrrate !== null ?
                                                                            data2.nanyperhrrate.substr(data2.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                            + " - " +
                                                                            data2.nanyperhrrate.substr(data2.nanyperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                            : data2.tutorperhrrate ?
                                                                                data2.tutorperhrrate.substr(data2.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[0] * 100
                                                                                + " - " +
                                                                                data2.tutorperhrrate.substr(data2.tutorperhrrate.lastIndexOf('\\') + 1).split('-')[1] * 100
                                                                                : ""} /hour</h5>
                                                                            : <h5>${data2.nanyperhrrate !== null ? data2.nanyperhrrate : data2.tutorperhrrate ? data2.tutorperhrrate : ""}/hour </h5>
                                                                        }/hour</p>
                                                                    </div>
                                                                    <div className="detail_sec">
                                                                        <img src={window.location.origin + "/images/post_rang.svg"} alt="" />
                                                                        <p>{data2.nanyyearexp != null ? data2.nanyperhrrate : data2.setyearexp != null ? data2.setyearexp : data2.tutorexp != null ? data2.tutorexp : data2.yearofexpasteacher != null ? data2.yearofexpasteacher : "0"} yrs of exp</p></div>
                                                                    <div className="detail_sec">
                                                                        <img src={window.location.origin + "/images/post_loc.svg"} alt="" />
                                                                        <p>{data2.city + ", " + data2.country}</p>
                                                                    </div>
                                                                </div>
                                                            </div>)
                                                        })
                                                        :
                                                        <Slider ref={sliderRef} {...settings2} id="Slider-4" className='slider_test'>
                                                            {
                                                                interested?.map((data, index) => {
                                                                    let data2 = data.user ? data.user : data;
                                                                    if (data.status == 0) {
                                                                        return (<div className="item" key={index}>
                                                                            <div className="interested_fam_box ">
                                                                                <div className="image_sec">
                                                                                    <img src={data2.file_path != null ? api + "/public/assets/images/users/" + data2.file_path : "img/nany_img.png"} alt="" />
                                                                                    <div className="heart_sec">
                                                                                        {localStorage.getItem("user_type") == "parents" ?
                                                                                            <Favorite_profile id={data2.id} username={data2.first_name} heart2={data.favornotprofile} />
                                                                                            : ""
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div className="general_sec">
                                                                                    <h4><Link to={data2.user_type == "parents" ? "/profile-parents/" + data2.id : "/profile-provider/" + data2.id} target="_blank">{data2.first_name + " " + data2.last_name}</Link></h4>
                                                                                    {data.reviewAvg >= 0 ?
                                                                                        <>
                                                                                            {[...Array(data.reviewAvg)]?.map((star, index) => {
                                                                                                index += 1;
                                                                                                return (
                                                                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path d="M6.00002 0C6.20763 0 6.39724 0.123352 6.48913 0.318198L8.0478 3.6231L11.5335 4.15633C11.7388 4.18776 11.9094 4.33847 11.9734 4.54514C12.0374 4.7518 11.9838 4.97859 11.8351 5.13018L9.31339 7.70087L9.90853 11.3326C9.94363 11.5468 9.8595 11.7633 9.69151 11.891C9.52352 12.0187 9.30082 12.0355 9.11704 11.9344L6.00002 10.2188L2.88299 11.9344C2.69922 12.0355 2.47651 12.0187 2.30852 11.891C2.14054 11.7633 2.0564 11.5468 2.0915 11.3326L2.68664 7.70087L0.164889 5.13018C0.0161881 4.97859 -0.0374153 4.7518 0.026609 4.54514C0.0906331 4.33847 0.261186 4.18776 0.466582 4.15633L3.95224 3.6231L5.5109 0.318198C5.6028 0.123352 5.79241 0 6.00002 0Z" fill="#A98D4B" />
                                                                                                    </svg>

                                                                                                );
                                                                                            })}
                                                                                            {[...Array(5 - data.reviewAvg)]?.map((star, index) => {
                                                                                                index += 1;
                                                                                                return (
                                                                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path d="M7.59557 3.83638C7.66654 3.98687 7.80772 4.09219 7.97219 4.11735L11.4578 4.65058C11.4643 4.65157 11.4855 4.65971 11.4958 4.6931C11.5067 4.72833 11.4952 4.76275 11.4782 4.78004L8.95646 7.35073C8.8449 7.46445 8.79421 7.62453 8.81997 7.78173L9.41511 11.4135C9.42135 11.4516 9.40435 11.4812 9.38889 11.493L9.69151 11.891L9.38889 11.493C9.38189 11.4983 9.37628 11.4997 9.37253 11.4999C9.36881 11.5002 9.36417 11.4997 9.35814 11.4964L6.24111 9.78072C6.091 9.6981 5.90903 9.6981 5.75892 9.78072L2.64189 11.4964C2.63586 11.4997 2.63122 11.5002 2.6275 11.4999C2.62375 11.4997 2.61815 11.4983 2.61115 11.493L2.30852 11.891L2.61114 11.493C2.59568 11.4812 2.57868 11.4516 2.58492 11.4135L3.18006 7.78173C3.20582 7.62453 3.15513 7.46446 3.04358 7.35073L0.521824 4.78004C0.504873 4.76276 0.4933 4.72833 0.504215 4.6931C0.514559 4.65971 0.535772 4.65157 0.542192 4.65059L0.466582 4.15633L0.542193 4.65058L4.02785 4.11735C4.19232 4.09219 4.33349 3.98687 4.40447 3.83638L5.96313 0.531479C5.97646 0.503231 5.9951 0.5 6.00002 0.5C6.00494 0.5 6.02358 0.503231 6.0369 0.531479L7.59557 3.83638Z" stroke="#A98D4B" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                                                                                                    </svg>
                                                                                                );
                                                                                            })}
                                                                                        </>
                                                                                        : ""
                                                                                    }
                                                                                    <div className="detail_sec">
                                                                                        <img src={window.location.origin + "/images/post_fet.svg"} alt="" />
                                                                                        <p> {data.service_types != null ? Object.values(data.service_types)[0]
                                                                                            : ""}
                                                                                            {data.service_type != null ? Object.values(data.service_type)[0]
                                                                                                : ""}
                                                                                        </p>

                                                                                    </div>
                                                                                    <div className="detail_sec">
                                                                                        <img src={window.location.origin + "/images/post_pay.svg"} alt="" />
                                                                                        <p>${data2.nanyperhrrate}/hour</p>
                                                                                    </div>
                                                                                    <div className="detail_sec">
                                                                                        <img src={window.location.origin + "/images/post_rang.svg"} alt="" />
                                                                                        <p>{data2.nanyyearexp != null ? data2.nanyperhrrate : data2.setyearexp != null ? data2.setyearexp : data2.tutorexp != null ? data2.tutorexp : data2.yearofexpasteacher != null ? data2.yearofexpasteacher : "0"} yrs of exp</p></div>
                                                                                    <div className="detail_sec">
                                                                                        <img src={window.location.origin + "/images/post_loc.svg"} alt="" />
                                                                                        <p>{data2.city + ", " + data2.country}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>)
                                                                    }
                                                                })
                                                            }
                                                        </Slider>
                                                }

                                            </div>
                                            <br />
                                            <br />
                                            <br />
                                        </div>
                                    </div> :
                                    <>
                                        <br />
                                        <br />
                                    </>
                                }
                                {/* <div className="slider">
                                <div className="slider_buttons">
                                    <Link to="/"><img src="img/left-side.png" alt="" /></Link>
                                </div>
                                <div className="slider_up_button">
                                    <img src="img/slider_up.png" alt="" />
                                </div>
                                <div className="slider_item">
                                    <div className="head">
                                        <p>place for your banner</p>
                                    </div>
                                    <div className="center"></div>
                                    <div className="end">
                                        <img src="img/slider_img.png" alt="" srcset="" />
                                        <p>Advertise with us</p>
                                    </div>
                                </div>
                                <div className="slider_item">
                                    <div className="head">
                                        <p>place for your banner</p>
                                    </div>
                                    <div className="center"></div>
                                    <div className="end">
                                        <img src="img/slider_img.png" alt="" srcset="" />
                                        <p>Advertise with us</p>
                                    </div>
                                </div>
                                <div className="slider_item">
                                    <div className="head">
                                        <p>place for your banner</p>
                                    </div>
                                    <div className="center"></div>
                                    <div className="end">
                                        <img src="img/slider_img.png" alt="" srcset="" />
                                        <p>Advertise with us</p>
                                    </div>
                                </div>
                                <div className="slider_up_button">
                                    <img src="img/slider_down.png" alt="" />
                                </div>
                                <div className="slider_buttons">
                                    <Link to="/"><img src="img/right-side.png" alt="" /></Link>
                                </div>
                            </div> */}
                                {/* <div className="fam_slide_btns">
                                <Link to="/"><img src={window.location.origin + "/images/left_slide.svg"} alt="" /></Link>
                                <Link to="/"><img src={window.location.origin + "/images/right_slide.svg"} alt="" /></Link>
                            </div> */}
                                {/* <div className="local_business">
                                <h4>Explore your local businesses</h4>
                                <div className="head">
                                    <p>Find more deals <span><img src="img/search.png" alt="" /></span></p>
                                </div>
                                <div className="business_card">
                                    <div className="business_card_box">
                                        <div className="profile">
                                            <div className="logo_name_rating">
                                                <div className="logo">
                                                    <img src="img/logo.png" alt="" />
                                                </div>
                                                <div className="name_rating">
                                                    <div className="name">
                                                        <p>Dr Jovanovic</p>
                                                    </div>
                                                    <div className="rating">
                                                        <p><img src="img/stars.png" alt="" /><span>(3)</span></p>
                                                    </div>
                                                </div>
                                                <div className="heart">
                                                    <img src="img/heart.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="social">
                                                <img src="img/social_icon.png" alt="" />
                                            </div>
                                            <div className="share">
                                                <img src="img/share_icon.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="service_offer">
                                            <p>Dr. Jovanovic child psychologist-up to 20% off screening services</p>
                                        </div>
                                        <div className="pricing_session">
                                            <div className="pricing">
                                                <img src="img/price_tag.png" alt="" />
                                                <p>Price: <strong><s>$250</s></strong> <span>$200</span></p>
                                            </div>
                                            <div className="session">
                                                <img src="img/calender.png" alt="" />
                                                <p>Ends on: <span>08.02.2021</span></p>
                                            </div>
                                        </div>
                                        <div className="description">
                                            <p>Dr. Jovanovic, a child psychologist with more than 10 years...</p>
                                        </div>
                                        <div className="busniess_btn_section">
                                            <Link className="claim_btn" to="">Claim Deal</Link>
                                            <Link className="view_btn" to="">View Deal</Link>
                                        </div>
                                    </div>
                                    <div className="business_card_box">
                                        <div className="profile">
                                            <div className="logo_name_rating">
                                                <div className="logo">
                                                    <img src="img/logo.png" alt="" />
                                                </div>
                                                <div className="name_rating">
                                                    <div className="name">
                                                        <p>Dr Jovanovic</p>
                                                    </div>
                                                    <div className="rating">
                                                        <p><img src="img/stars.png" alt="" /><span>(3)</span></p>
                                                    </div>
                                                </div>
                                                <div className="heart">
                                                    <img src="img/heart.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="social">
                                                <img src="img/social_icon.png" alt="" />
                                            </div>
                                            <div className="share">
                                                <img src="img/share_icon.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="service_offer">
                                            <p>Dr. Jovanovic child psychologist-up to 20% off screening services</p>
                                        </div>
                                        <div className="pricing_session">
                                            <div className="pricing">
                                                <img src="img/price_tag.png" alt="" />
                                                <p>Price: <strong><s>$250</s></strong> <span>$200</span></p>
                                            </div>
                                            <div className="session">
                                                <img src="img/calender.png" alt="" />
                                                <p>Ends on: <span>08.02.2021</span></p>
                                            </div>
                                        </div>
                                        <div className="description">
                                            <p>Dr. Jovanovic, a child psychologist with more than 10 years...</p>
                                        </div>
                                        <div className="busniess_btn_section">
                                            <Link className="claim_btn" to="">Claim Deal</Link>
                                            <Link className="view_btn" to="">View Deal</Link>
                                        </div>
                                    </div>
                                    <div className="business_card_box">
                                        <div className="profile">
                                            <div className="logo_name_rating">
                                                <div className="logo">
                                                    <img src="img/logo.png" alt="" />
                                                </div>
                                                <div className="name_rating">
                                                    <div className="name">
                                                        <p>Dr Jovanovic</p>
                                                    </div>
                                                    <div className="rating">
                                                        <p><img src="img/stars.png" alt="" /><span>(3)</span></p>
                                                    </div>
                                                </div>
                                                <div className="heart">
                                                    <img src="img/heart.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="social">
                                                <img src="img/social_icon.png" alt="" />
                                            </div>
                                            <div className="share">
                                                <img src="img/share_icon.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="service_offer">
                                            <p>Dr. Jovanovic child psychologist-up to 20% off screening services</p>
                                        </div>
                                        <div className="pricing_session">
                                            <div className="pricing">
                                                <img src="img/price_tag.png" alt="" />
                                                <p>Price: <strong><s>$250</s></strong> <span>$200</span></p>
                                            </div>
                                            <div className="session">
                                                <img src="img/calender.png" alt="" />
                                                <p>Ends on: <span>08.02.2021</span></p>
                                            </div>
                                        </div>
                                        <div className="description">
                                            <p>Dr. Jovanovic, a child psychologist with more than 10 years...</p>
                                        </div>
                                        <div className="busniess_btn_section">
                                            <Link className="claim_btn" to="">Claim Deal</Link>
                                            <Link className="view_btn" to="">View Deal</Link>
                                        </div>
                                    </div>
                                    <div className="business_card_box">
                                        <div className="profile">
                                            <div className="logo_name_rating">
                                                <div className="logo">
                                                    <img src="img/logo.png" alt="" />
                                                </div>
                                                <div className="name_rating">
                                                    <div className="name">
                                                        <p>Dr Jovanovic</p>
                                                    </div>
                                                    <div className="rating">
                                                        <p><img src="img/stars.png" alt="" /><span>(3)</span></p>
                                                    </div>
                                                </div>
                                                <div className="heart">
                                                    <img src="img/heart.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="social">
                                                <img src="img/social_icon.png" alt="" />
                                            </div>
                                            <div className="share">
                                                <img src="img/share_icon.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="service_offer">
                                            <p>Dr. Jovanovic child psychologist-up to 20% off screening services</p>
                                        </div>
                                        <div className="pricing_session">
                                            <div className="pricing">
                                                <img src="img/price_tag.png" alt="" />
                                                <p>Price: <strong><s>$250</s></strong> <span>$200</span></p>
                                            </div>
                                            <div className="session">
                                                <img src="img/calender.png" alt="" />
                                                <p>Ends on: <span>08.02.2021</span></p>
                                            </div>
                                        </div>
                                        <div className="description">
                                            <p>Dr. Jovanovic, a child psychologist with more than 10 years...</p>
                                        </div>
                                        <div className="busniess_btn_section">
                                            <Link className="claim_btn" to="">Claim Deal</Link>
                                            <Link className="view_btn" to="">View Deal</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="load_more">
                                    <Link to="/">Load more</Link>
                                </div>
                            </div> */}
                                {/* <div className="edu_store">
                                <h4>Visit EDU store and find perfect educational materials and toys</h4>
                                <div className="head">
                                    <h5>Visit EDU store</h5>
                                    <h6>Search EDU store <span><img src="img/search.png" alt="" /></span></h6>
                                </div>
                                <p>SensCare EDU store is a place where you can find the best quality educational materials and
                                    toys
                                    for
                                    your child. <br />
                                    Our affiliated partners are offering a variety of educational products of all ages. <br />
                                    You can browse materials and toys of your preference in each category.</p>
                                <div className="edu_store_content">
                                    <img src="img/edu_store_img.png" alt="" />
                                    <div className="mobile_edu_store_cont">
                                        <h5>Visit EDU store</h5>
                                        <p>SensCare EDU store is a place where you can find the best quality educational
                                            materials
                                            and toys for
                                            your child. <br />
                                            Our affiliated partners are offering a variety of educational products of all ages.
                                            <br />
                                            You can browse materials and toys of your preference in each category.
                                        </p>
                                    </div>
                                    <div className="collapse_boxs">
                                        <button type="button" className="collapse">Sensory, behavioral and motor development
                                            toys</button>
                                        <div className="collapse_box_content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                                nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                        <button type="button" className="collapse">Educational Toys</button>
                                        <div className="collapse_box_content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                                nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                        <button type="button" className="collapse">School Materials</button>
                                        <div className="collapse_box_content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                                nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                        <button type="button" className="collapse">Baby Toys</button>
                                        <div className="collapse_box_content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                                nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                            : ""}
                        {subtab == "my-profile" ?
                            <div className='Account daskshow'>
                                <h2>Account</h2>
                                <div className={ssubtab.personal == "active" ? "active personal" : "personal"} >
                                    <h3 onClick={e => setssubtab({ ...ssubtab, personal: ssubtab.personal == "" ? "active" : "" })}>Personal Info</h3>
                                    {ssubtab.personal == "active" ?
                                        <>
                                            <div className='withoutedit'>
                                                {edit == "" ?
                                                    <button onClick={e => setedit("edit")}>
                                                        <img src={window.location.origin + "/images/edit.svg"} alt="" />
                                                    </button> : ""}
                                                {edit == "" ?
                                                    <div className='detail'>
                                                        <ul>
                                                            <li className='disabledata'><span className='main'>First Name</span><span className='data'>{profile.first_name}</span></li>
                                                            <li><span className='main'>Address</span><span className='data'>{profile.address}</span></li>
                                                            <li><span className='main'>Last Name</span><span className='data'>{profile.last_name}</span></li>
                                                            <li><span className='main'>City</span><span className='data'>{profile.city}</span></li>
                                                            <li className='disabledata'><span className='main'>Date of birth</span><span className='data'>{profile.dob}</span></li>
                                                            <li><span className='main'>ZIP code</span><span className='data'>{profile.zip}</span></li>
                                                            <li><span className='main'>Mobile</span><span className='data'>{(contact_code.code == "" ? profile.countrycode : contact_code.code) + "-" + profile.phone}</span></li>
                                                            <li><span className='main'>Country</span><span className='data'>{profile.country}</span></li>
                                                            <li><span className='main'>Email </span><span className='data'>{profile.email}</span></li>
                                                        </ul>
                                                    </div>
                                                    :
                                                    <div className="panel-body">
                                                        <div className="row">

                                                            <div className="form-group col-md-6">
                                                                <div className="field-box">
                                                                    <label className="label" for="firstName">First Name</label>
                                                                    <input type="text" className="form-control" id="firstName" disabled value={profile.first_name} />
                                                                </div>
                                                                <div className="field-box">
                                                                    <label className="label" for="lastName">Last Name</label>
                                                                    <input type="text" className="form-control" id="lastName" value={profile.last_name} onChange={e => setprofile({ ...profile, last_name: e.target.value })} />
                                                                </div>
                                                                <div className="field-box">
                                                                    <label className="label" for="dob">Date of Birth</label>
                                                                    <div className="with-icon">
                                                                        <img className="icons" src={window.location.origin + "/images/calender.svg"} alt="" />
                                                                        <input type="text" className="form-control" id="dob" disabled value={profile.dob} />
                                                                    </div>
                                                                </div>
                                                                <div className="field-box">
                                                                    <label className="label" for="email">Email address</label>
                                                                    <input type="email" className="form-control" id="email" data-required defaultValue={profile.email} onChange={e => setemailverify({ ...emailverify, email: e.target.value })} onBlur={e => emailcheck()} />
                                                                    <span>{emailverify.alemail ? emailverify.alemail : profile.email_verified_at == null ? "Please verify your enail" : ""}</span>
                                                                </div>
                                                            </div>

                                                            <div className="form-group col-md-6">

                                                                <div className="field-box">
                                                                    <label className="label" for="address1">Address</label>
                                                                    <Location let={getletlon} typedefault={profile.address} />
                                                                </div>
                                                                <div className="field-box">
                                                                    <div className="row coln">

                                                                        <div className="col-md-6">

                                                                            <label className="label" for="city">City</label>
                                                                            <input type="text" className="form-control" id="city" data-required value={profile.city} onChange={e => setprofile({ ...profile, city: e.target.value })} />
                                                                        </div>

                                                                        <div className="col-md-6">

                                                                            <label className="label" for="zipCode">ZIP Code</label>
                                                                            <input type="number" className="form-control" id="zipCode" onChange={e => setprofile({ ...profile, zip: e.target.value })} value={profile.zip} />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="field-box">
                                                                    <label className="label" for="country">Country</label>
                                                                    <input type="text" className="form-control" value={profile.country} />
                                                                </div>
                                                                <div className='form_group number field-box'>
                                                                    <label className="label" for="mobile">Mobile Phone</label>
                                                                    <input type="number" placeholder='Type here' name='phone' onChange={e => {
                                                                        setphoneverify({ ...phoneverify, phone: e.target.value.length <= 10 ? e.target.value : profile.phone })
                                                                    }} defaultValue={profile.phone} />
                                                                    <div className='country_flag' onClick={e => codeselect()}><img src={contact_code.flag ? contact_code.flag :
                                                                        country.data.filter((e) => {
                                                                            if (e.dial_code == ("+" + profile.countrycode)) {
                                                                                return e.flag
                                                                            }
                                                                        })[0].flag} /> {contact_code.code ? contact_code.code : profile.countrycode}</div>
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
                                                                    {
                                                                        phoneverify.phone != "" && profile.phone != phoneverify.phone ?
                                                                            <button onClick={e => mobileverify()}>Get code</button>
                                                                            : ""}
                                                                </div>
                                                                {
                                                                    phoneverify.phone != "" && profile.phone != phoneverify.phone ?
                                                                        <div className="field-box">
                                                                            <input type="text" placeholder='OTP' className="form-control"
                                                                                onChange={e => {
                                                                                    setphoneverify({ ...phoneverify, otp: e.target.value })
                                                                                }} />
                                                                            <button onClick={e => otpverify()}>Verify</button>
                                                                        </div>
                                                                        : ""}
                                                            </div>
                                                        </div>
                                                        <div className="button text-center">

                                                            <div className="pull-right">
                                                                <button className="btn" onClick={e => {
                                                                    setcontact_code({
                                                                        ...contact_code, code: ""
                                                                    })
                                                                    profilemy()
                                                                    setedit("")
                                                                }}>Cancel</button>
                                                            </div>
                                                            <div className="pull-right">
                                                                <button className="btn confirm" onClick={e => updateprofile()}>Save changes</button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                }
                                                <div className='resetpassword'>
                                                    <div className='form_group disabledata'>
                                                        <label>Username</label>
                                                        <input type="text" value={profile.username} disabled />
                                                    </div>
                                                    <div className='form_group '>
                                                        <label>Password</label>
                                                        <input type="password" value="......." />
                                                    </div>
                                                    <button onClick={e => setShow(true)}>Change password</button>
                                                </div>
                                            </div>

                                        </>
                                        : ""
                                    }
                                </div>
                                <div className={ssubtab.payment == "active" ? "active personal" : "personal"} >
                                    <h3 onClick={e => setssubtab({ ...ssubtab, payment: ssubtab.payment == "" ? "active" : "" })}>Payment and Membership</h3>
                                    {ssubtab.payment == "active" ?
                                        <div className='cardstype'>
                                            <div className='paymenttype'>
                                                <ul>
                                                    <li>
                                                        <input type="radio" id='a' name='a' />
                                                        <label for="a">Pay with card</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id='b' name='a' />
                                                        <label for="b">Pay with PayPal</label>
                                                    </li>
                                                </ul>
                                                <button onClick={e => setcardnew(true)}>
                                                    Add new card
                                                </button>
                                            </div>
                                            <h4>My Cards</h4>
                                            <div className='savecard'>
                                                <ul>
                                                    <li>

                                                        <label for="c"> <input type="radio" id='c' name='c' /><span>Set as default</span></label>
                                                        <span>Card name</span>
                                                        <p>Bankname card ****4589</p>
                                                        <span>Expires on</span>
                                                        <p>04/2022</p>
                                                        <button>Remove</button>
                                                        <button onClick={e => setcardedit(true)}>Edit</button>
                                                    </li>
                                                    <li>
                                                        <label for="d"> <input type="radio" id='d' name='c' /><span>Set as default</span></label>
                                                        <span>Card name</span>
                                                        <p>Bankname card ****4589</p>
                                                        <span>Expires on</span>
                                                        <p>04/2022</p>
                                                        <button>Remove</button>
                                                        <button onClick={e => setcardedit(true)}>Edit</button>
                                                    </li>
                                                    <li>
                                                        <label for="e"> <input type="radio" id='e' name='c' /><span>Set as default</span></label>
                                                        <span>Card name</span>
                                                        <p>Bankname card ****4589</p>
                                                        <span>Expires on</span>
                                                        <p>04/2022</p>
                                                        <button>Remove</button>
                                                        <button onClick={e => setcardedit(true)}>Edit</button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='activeplan'>
                                                <ul>
                                                    <li>
                                                        <label>Current membership plan <span>{membership ? membership :
                                                            "Plan not active"}</span></label>
                                                        <button onClick={e => setcancelmembership(true)}>Cancel plan</button>
                                                        <NavLink to={""}
                                                        // {localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank"
                                                        >  <button >Change plan</button></NavLink>
                                                    </li>
                                                    <li>
                                                        <label>Subscription</label>
                                                        <p>Auto renew subscription
                                                            <label className="switch">
                                                                <input type="checkbox" />
                                                                <span className="slider round"></span>
                                                            </label>
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        : ""
                                    }
                                </div>
                                <div className={ssubtab.delete == "active" ? "active personal" : "personal"} >
                                    <h3 onClick={e => setssubtab({ ...ssubtab, delete: ssubtab.delete == "" ? "active" : "" })}>Deactivate/ Delete account</h3>
                                    {ssubtab.delete == "active" ?
                                        <div className='activeplan deletedeactivate'>
                                            <ul>
                                                <li>
                                                    <label>Current account status plan<span>{profile.account_status == "ENABLE" ?
                                                        " Active" :
                                                        "Inactive"}</span></label>
                                                    <button onClick={e => setdeletewarning(true)}>Delete account</button>
                                                    <button onClick={e => setdisableaccoutn(true)}>Disable account</button>
                                                </li>

                                            </ul>
                                        </div>
                                        : ""
                                    }
                                </div>
                                <br />
                                <br />
                            </div>
                            : ""}
                        {
                            subtab == "Profile" ?
                                <>
                                    {localStorage.getItem("user_type") == "parents" ?
                                        <View_edit />
                                        :
                                        <View_edit_provider />
                                    }
                                </>
                                : ""
                        }
                        {localStorage.getItem("user_type") == "parents" ?
                            <Parents_notification_tabs subtab={subtab} profilesection={profilesection} />
                            :
                            <Provider_notification_tabs subtab={subtab} profilesection={profilesection} />
                        }
                    </div>

                </div>

                <div className='arrowtop'>
                    <svg onClick={e => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8" filter="url(#filter0_d_302_10697)">
                            <circle cx="49" cy="34" r="25" fill="#7D2B8B" />
                        </g>
                        <path d="M49.0042 32.5649L54.8109 38.3716C55.1261 38.7099 55.6007 38.8491 56.0486 38.7347C56.4965 38.6203 56.8463 38.2706 56.9607 37.8226C57.075 37.3747 56.9358 36.9001 56.5976 36.585L49.0126 29L47.0658 30.9468L41.4024 36.6102C41.0642 36.9254 40.925 37.4 41.0393 37.8479C41.1537 38.2958 41.5035 38.6456 41.9514 38.76C42.3993 38.8744 42.8739 38.7351 43.1891 38.3969L49.0042 32.5649Z" fill="white" />
                        <defs>
                            <filter id="filter0_d_302_10697" x="0" y="0" width="90" height="90" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="-4" dy="11" />
                                <feGaussianBlur stdDeviation="10" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_302_10697" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_302_10697" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                </div>
                <div className='mobilemenubottom'>
                    <div className="side_drop_collapse_box_content" style={profilesection == "notifications" ? { display: 'block' } : { display: 'none' }} onClick={e => {
                        localStorage.removeItem("side")
                        setprofilesection("")
                    }}>
                        <span onClick={e => {
                            localStorage.removeItem("side")
                            setprofilesection("")
                        }}></span>
                        {localStorage.getItem("user_type") == "parents" ?
                            <Notification_tab_parents setsubtab={setsubtab} subtab={subtab} />
                            :
                            <Notification_tab_provider setsubtab={setsubtab} subtab={subtab} />
                        }

                    </div>
                    <div className="side_drop_collapse_box_content Document_main " onClick={e => {
                        localStorage.removeItem("side")
                        setprofilesection("")
                    }} style={profilesection == "fav" ? { display: 'block' } : { display: 'none' }} >
                        <span onClick={e => {
                            localStorage.removeItem("side")
                            setprofilesection("")
                        }}></span>
                        <ul >
                            <li onClick={e => {
                                navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/who-i-visited" : "/search-providers/who-i-visited")
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                setsubtab("who-i-visited")
                            }} className={subtab == "who-i-visited" ? "active " : ""} >Who I Visited</li>
                            <li onClick={e => {
                                navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/who-visited-me" : "/search-providers/who-visited-me")
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                setsubtab("who-visited-me")
                            }} className={subtab == "who-visited-me" ? "active upgrade" : "upgrade"}>Who Visited Me <span><Link to={""}
                            // {!localStorage.getItem("token") || !localStorage.getItem("id") ? "/signup" : localStorage.getItem("user_type") == "parents" ? "/parents-membership" : "/provider-membership"} target="_blank"
                            >upgrade</Link></span></li>
                        </ul>
                    </div>
                    <div className="side_drop_collapse_box_content" style={profilesection == "Favorites" ? { display: 'block' } : { display: 'none' }} >
                        <span onClick={e => {
                            localStorage.removeItem("side")
                            setprofilesection("")
                        }}></span>
                        {localStorage.getItem("user_type") == "parents" ?
                            <Favorite_provider setsubtab={setsubtab} subtab={subtab} setprofilesection={setprofilesection} /> :
                            <Favorite_provider setsubtab={setsubtab} subtab={subtab} setprofilesection={setprofilesection} />
                        }
                    </div>
                    <div className="side_drop_collapse_box_content" style={profilesection == "Job_history" ? { display: 'block' } : { display: 'none' }} onClick={e => {
                        localStorage.removeItem("side")
                        setprofilesection("")
                    }}>
                        <span onClick={e => {
                            localStorage.removeItem("side")
                            setprofilesection("")
                        }}></span>
                        {localStorage.getItem("user_type") == "parents" ?
                            <Job_history_tap_parents setsubtab={setsubtab} subtab={subtab} /> :
                            <Job_history_tap setsubtab={setsubtab} subtab={subtab} />
                        }
                    </div>
                    <div className="side_drop_collapse_box_content" style={profilesection == "message" ? { display: 'block' } : { display: 'none' }} onClick={e => {
                        localStorage.removeItem("side")
                        setprofilesection("")
                    }}>
                        <span onClick={e => {
                            localStorage.removeItem("side")
                            setprofilesection("")
                        }}></span>
                        <Message_tab setsubtab={setsubtab} subtab={subtab} />
                    </div>
                    <ul>
                        <li onClick={e => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            setprofilesection(profilesection != "Job_history" ? "Job_history" : "")
                        }}><img src={window.location.origin + "/images/jobnhistory.svg"} alt="" />
                            <span>Jobs & Doc</span>
                        </li>
                        <li onClick={e => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            setprofilesection(profilesection != "fav" ? "fav" : "")
                        }}><svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="22"><path d="M0 1.55556V12.4444C0 13.3 0.692222 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0H1.55556C0.692222 0 0 0.7 0 1.55556ZM9.33332 4.66573C9.33332 5.95684 8.2911 6.99906 6.99999 6.99906C5.70888 6.99906 4.66666 5.95684 4.66666 4.66573C4.66666 3.37462 5.70888 2.3324 6.99999 2.3324C8.2911 2.3324 9.33332 3.37462 9.33332 4.66573ZM7.0001 8.47839C5.44455 8.47839 2.33344 9.33395 2.33344 10.8895V11.6673H11.6668V10.8895C11.6668 9.33395 8.55566 8.47839 7.0001 8.47839Z" fill="#A98D4B"></path></svg>
                            <span> Recent visit</span>
                        </li>
                        <li onClick={e => setprofilesection(profilesection != "message" ? "message" : "")}><img src={window.location.origin + "/images/message.svg"} alt="" />
                            <span>Messages</span>
                        </li>
                        {localStorage.getItem("user_type") == "parents" ?
                            <li onClick={e => {
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                setsubtab("all-profile")
                                navigate("/search-providers/all-profile")
                            }}><img src={window.location.origin + "/images/fav.svg"} alt="" />
                                <span>Favorites</span>
                            </li> :
                            <li onClick={e => {
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                setprofilesection(profilesection != "Favorites" ? "Favorites" : "")
                            }}><img src={window.location.origin + "/images/fav.svg"} alt="" />
                                <span>Favorites</span>
                            </li>
                        }
                        <li onClick={e => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            navigate(localStorage.getItem("user_type") == "parents" ? "/search-parents/Reviews" : "/search-providers/Reviews")
                            setprofilesection("")
                            setsubtab("Reviews")
                        }} className={subtab == "Reviews" ? "active side_drop_collapse_none" : "side_drop_collapse_none"}><img src={window.location.origin + "/images/reviewi.svg"} alt="" />
                            <span>Reviews</span>
                        </li>
                        <li onClick={e => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            setprofilesection(profilesection != "notifications" ? "notifications" : "")
                        }} >
                            <span className='count'><Count_notification /></span>
                            <img src={window.location.origin + "/images/notification.svg"} alt="" />
                            <span>Notifications</span>

                        </li>
                    </ul>
                </div>
            </div >
            {
                show ?
                    <Modal show={show} onHide={handleClose}>
                        < Modal.Body >
                            <div className='promocode_content younger reset reset2' style={{ paddingBottom: "40px" }}>
                                <Link to="" onClick={handleClose}>+ </Link>
                                <div className="pdng" >
                                    <h2>Change Password</h2>
                                    <form>
                                        <div className='form_group'>
                                            <label>Old password</label>
                                            <input type={passwordc ? "text" : "password"} placeholder=". . .  . . . . . . ." name='oldpassword' onChange={e => logins_field(e)} />
                                            <div className='eyes'>
                                                <input type={"checkbox"} onClick={e => {
                                                    setpasswordc(!passwordc)
                                                }} />
                                                <i></i>
                                            </div>
                                            <span className='errorfield'>{error.oldpassword}</span>
                                        </div>
                                        <div className='form_group'>
                                            <label>New password</label>
                                            <input type={passwordn ? "text" : "password"} placeholder=". . .  . . . . . . ." name='n_password' onChange={e => logins_field(e)} />
                                            <div className='eyes'>
                                                <input type={"checkbox"} onClick={e => {
                                                    setpasswordn(!passwordn)
                                                }} />
                                                <i></i>
                                            </div>

                                        </div>
                                        <div className='form_group'>
                                            <label>Confirm new password</label>
                                            <input type={cpassword ? "text" : "password"} placeholder=". . .  . . . . . . . " name='c_password' onChange={e => logins_field(e)} />
                                            <div className='eyes'>
                                                <input type={"checkbox"} onClick={e => {
                                                    setcpassword(!cpassword)
                                                }} />
                                                <i></i>
                                            </div>
                                            <span className='errorfield'>{error.c_password}</span>
                                            {error.n_password || error.n_password ?
                                                <div className='password_rule errorfield '>
                                                    <p>Your password must be between 8-15 characters long and contain<br />

                                                        {capital.test(password.n_password) ? "" : "- at least one uppercase letter"}
                                                        <br />
                                                        {number.test(password.n_password) ? "" : "- at least one number digit"}<br />
                                                        {special.test(password.n_password) ? "" : "- at least one special character -for example:  #, @, !"}</p>
                                                </div> : ""}
                                        </div>

                                        <div className='captch'>
                                            <ReCAPTCHA
                                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                                onChange={onChange}
                                            />
                                        </div>
                                    </form>
                                    <div className='buttons reset3'>
                                        <button className='rest' disabled={!verfied} onClick={changepassword}>Change</button>
                                        <button className="rest" onClick={handleClose}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body >
                    </Modal >
                    : ""
            }
            {
                showsuccess ?
                    <Modal show={showsuccess} onHide={e => setshowsuccess(false)}>
                        <Modal.Body>
                            <div className='promocode_content successpass'>
                                <Link to="" onClick={e => setshowsuccess(false)}>+ </Link>
                                <p>Your password is updated. Log in with your new password.</p>
                                <Link className='loginbtn' to={"/login"} >Log in</Link>
                            </div>
                        </Modal.Body>
                    </Modal> : ""
            }
            {
                cardedit ?
                    <Modal show={cardedit} onHide={e => setcardedit(false)} className="editcard">
                        <Modal.Body>
                            <div className='promocode_content younger reset reset2 paymentedit' style={{ paddingBottom: "40px" }}>
                                <Link to="" onClick={e => setcardedit(false)}>+ </Link>
                                {
                                    countryedit ? <div className='bgremove' onClick={e => setcountryedit(!countryedit)}></div> : ""}
                                <div className="panel-body dasktopshow" style={{ padding: "30px" }}>
                                    <h2>
                                        Edit card details</h2>
                                    <form>
                                        <div className="row">

                                            <div className="form-group col-md-6">
                                                <div className="field-box">
                                                    <label className="label" for="cardname">Name on card</label>
                                                    <input type="text" placeholder=" Name" className="form-control" id="cardname" data-required />
                                                </div>
                                                <div className="field-box">
                                                    <label className="label" for="billaddress">Billing address</label>
                                                    <input type="text" placeholder=" Address" className="form-control" id="billaddress" />
                                                </div>
                                                <div className="field-box">
                                                    <div className="row coln">

                                                        <div className="col-md-6" style={{ position: 'relative' }}>
                                                            <label className="label" for="city">Country</label>
                                                            <span className='duplicate' onClick={e => setcountryedit(!countryedit)}>{countrydata != "" ? countrydata : "Select"}</span>
                                                            {
                                                                countryedit ?
                                                                    <ul className='country_custom'>

                                                                        {

                                                                            country.data.map((data, i) => {
                                                                                return (
                                                                                    <li onClick={() => {
                                                                                        setcountryedit(!countryedit)
                                                                                        setcountrydata(data.country)
                                                                                    }}>
                                                                                        {data.country}
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                    : ""
                                                            }

                                                        </div>
                                                        {
                                                            countrydata == "United States" ?
                                                                <div className="col-md-6">

                                                                    <label className="label" for="city">State</label>
                                                                    <input type="text" placeholder='State' />
                                                                </div>
                                                                : ""}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="form-group col-md-6">
                                                <div className="field-box">
                                                    <label className="label" for="cardnumber">Card Number</label>
                                                    <input type="number" className="form-control" id="cardnumber" placeholder="1234 56789"
                                                        maxLength="16" data-required />
                                                </div>
                                                <div className="field-box">
                                                    <div className="row coln">
                                                        <div className="col-md-6">

                                                            <label className="label" for="expdate">Expiration Date</label>
                                                            <input type="number" className="form-control" id="expdate" placeholder="MM/YY"
                                                                maxLength="4" data-required />

                                                        </div>

                                                        <div className="col-md-6">

                                                            <label className="label" for="securitycode">Security #</label>
                                                            <input type="password" className="form-control" id="securitycode" maxLength="4"
                                                                placeholder="xxxxxx" data-required />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row coln field-box">
                                                    <div className="col-md-6">

                                                        <label className="label" for="city">City</label>
                                                        <input type="text" placeholder="New York" className="form-control" id="city" data-required />

                                                    </div>

                                                    <div className="col-md-6">

                                                        <label className="label" for="zipCode">ZIP Code</label>
                                                        <input type="number" className="form-control" id="zipCode" placeholder="12533665" />

                                                    </div>
                                                </div>



                                            </div>

                                        </div>
                                        <div className="save-info field-box">
                                            <input type="checkbox" id="option1" name="option1" value="" />
                                            <label><img className="tickicon1" src={window.location.origin + "/images/check.svg"} alt="" />Save this card for future payments
                                            </label>
                                        </div>
                                    </form>
                                    <div className="button text-center">

                                        <div className="pull-right">
                                            <button className="btn" onClick={e => setcardedit(false)}>Cancel</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm" onClick={e => setcardedit(false)}>Save</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="panel-body mobileshow" style={{ padding: "30px" }}>
                                    <h2>Edit card details</h2>
                                    <form>
                                        <div className="row">

                                            <div className="form-group col-md-6">
                                                <div className="field-box">
                                                    <label className="label" for="cardname">Name on card</label>
                                                    <input type="text" placeholder="Name" className="form-control" id="cardname" data-required />
                                                </div>
                                                <div className="field-box">
                                                    <label className="label" for="billaddress">Billing address</label>
                                                    <input type="text" placeholder="Address" className="form-control" id="billaddress" />
                                                </div>
                                                <div className="field-box" style={{ position: 'relative' }}>
                                                    <label className="label" for="city">Country</label>
                                                    <span className='duplicate' onClick={e => setcountryedit(!countryedit)}>{countrydata != "" ? countrydata : "Select"}</span>
                                                    {
                                                        countryedit ?
                                                            <ul className='country_custom'>

                                                                {

                                                                    country.data.map((data, i) => {
                                                                        return (
                                                                            <li onClick={() => {
                                                                                setcountryedit(!countryedit)
                                                                                setcountrydata(data.country)
                                                                            }}>
                                                                                {data.country}
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                            : ""
                                                    }
                                                </div>
                                                {
                                                    countrydata == "United States" ?
                                                        <div className="field-box">
                                                            <label className="label" for="city">State</label>
                                                            <input type="text" placeholder='State' />
                                                        </div> : ""}
                                            </div>
                                            <div className="form-group col-md-6">
                                                <div className="row coln field-box">
                                                    <div className="col-md-6">
                                                        <label className="label" for="city">City</label>
                                                        <input type="text" placeholder="New York" className="form-control" id="city" data-required />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="label" for="zipCode">ZIP Code</label>
                                                        <input type="number" className="form-control" id="zipCode" placeholder="12533665" />
                                                    </div>
                                                </div>
                                                <div className="field-box">
                                                    <label className="label" for="cardnumber">Card Number</label>
                                                    <input type="number" className="form-control" id="cardnumber" placeholder="1234 56789"
                                                        maxLength="16" data-required />
                                                </div>
                                                <div className="field-box">
                                                    <div className="row coln">
                                                        <div className="col-md-6">

                                                            <label className="label" for="expdate">Expiration Date</label>
                                                            <input type="number" className="form-control" id="expdate" placeholder="MM/YY"
                                                                maxLength="4" data-required />

                                                        </div>

                                                        <div className="col-md-6">

                                                            <label className="label" for="securitycode">Security #</label>
                                                            <input type="password" className="form-control" id="securitycode" maxLength="4"
                                                                placeholder="xxxxxx" data-required />

                                                        </div>
                                                    </div>
                                                </div>




                                            </div>

                                        </div>
                                        <div className="save-info field-box">
                                            <input type="checkbox" id="option1" name="option1" value="" />
                                            <label><img className="tickicon1" src={window.location.origin + "/images/check.svg"} alt="" />Save this card for future
                                                payments</label>
                                        </div>
                                    </form>
                                    <div className="button text-center">

                                        <div className="pull-right">
                                            <button className="btn" onClick={e => setcardedit(false)}>Cancel</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm" onClick={e => setcardedit(false)}>Save</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal> : ""
            }
            {
                cardnew ?
                    <Modal show={cardnew} onHide={e => setcardnew(false)} className="editcard">
                        <Modal.Body>
                            <div className='promocode_content younger reset reset2 paymentedit' style={{ paddingBottom: "40px" }}>
                                <Link to="" onClick={e => setcardnew(false)}>+ </Link>
                                {
                                    countryedit ? <div className='bgremove' onClick={e => setcountryedit(!countryedit)}></div> : ""}
                                <div className="panel-body dasktopshow" style={{ padding: "30px" }}>
                                    <h2>
                                        Add new card</h2>
                                    <form>
                                        <div className="row">

                                            <div className="form-group col-md-6">
                                                <div className="field-box">
                                                    <label className="label" for="cardname">Name on card</label>
                                                    <input type="text" placeholder="Name" className="form-control" id="cardname" data-required />
                                                </div>
                                                <div className="field-box">
                                                    <label className="label" for="billaddress">Billing address</label>
                                                    <input type="text" placeholder="Address" className="form-control" id="billaddress" />
                                                </div>
                                                <div className="field-box">
                                                    <div className="row coln">

                                                        <div className="col-md-6" style={{ position: 'relative' }}>
                                                            <label className="label" for="city">Country</label>
                                                            <span className='duplicate' onClick={e => setcountryedit(!countryedit)}>{countrydata != "" ? countrydata : "Select"}</span>
                                                            {
                                                                countryedit ?
                                                                    <ul className='country_custom'>

                                                                        {

                                                                            country.data.map((data, i) => {
                                                                                return (
                                                                                    <li onClick={() => {
                                                                                        setcountryedit(!countryedit)
                                                                                        setcountrydata(data.country)
                                                                                    }}>
                                                                                        {data.country}
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                    : ""
                                                            }
                                                        </div>
                                                        {
                                                            countrydata == "United States" ?
                                                                <div className="col-md-6">

                                                                    <label className="label" for="city">State</label>
                                                                    <input type="text" placeholder='State' />
                                                                </div> : ""
                                                        }

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="form-group col-md-6">
                                                <div className="field-box">
                                                    <label className="label" for="cardnumber">Card Number</label>
                                                    <input type="number" className="form-control" id="cardnumber" placeholder="1234 56789"
                                                        maxLength="16" data-required />
                                                </div>
                                                <div className="field-box">
                                                    <div className="row coln">
                                                        <div className="col-md-6">

                                                            <label className="label" for="expdate">Expiration Date</label>
                                                            <input type="number" className="form-control" id="expdate" placeholder="MM/YY"
                                                                maxLength="4" data-required />

                                                        </div>

                                                        <div className="col-md-6">

                                                            <label className="label" for="securitycode">Security #</label>
                                                            <input type="password" className="form-control" id="securitycode" maxLength="4"
                                                                placeholder="xxxxxx" data-required />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row coln field-box">
                                                    <div className="col-md-6">

                                                        <label className="label" for="city">City</label>
                                                        <input type="text" placeholder="New York" className="form-control" id="city" data-required />

                                                    </div>

                                                    <div className="col-md-6">

                                                        <label className="label" for="zipCode">ZIP Code</label>
                                                        <input type="number" className="form-control" id="zipCode" placeholder="12533665" />

                                                    </div>
                                                </div>



                                            </div>

                                        </div>
                                        <div className="save-info field-box">
                                            <input type="checkbox" id="option1" name="option1" value="" />
                                            <label><img className="tickicon1" src={window.location.origin + "/images/check.svg"} alt="" />Save this card for future
                                                payments</label>
                                        </div>
                                    </form>
                                    <div className="button text-center">

                                        <div className="pull-right">
                                            <button className="btn" onClick={e => setcardnew(false)}>Cancel</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm">Save</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="panel-body mobileshow" style={{ padding: "30px" }}>
                                    <h2>
                                        Add new card</h2>
                                    <form>
                                        <div className="row">

                                            <div className="form-group col-md-6">
                                                <div className="field-box">
                                                    <label className="label" for="cardname">Name on card</label>
                                                    <input type="text" placeholder="Name" className="form-control" id="cardname" data-required />
                                                </div>
                                                <div className="field-box">
                                                    <label className="label" for="billaddress">Billing address</label>
                                                    <input type="text" placeholder="Address" className="form-control" id="billaddress" />
                                                </div>

                                                <div className="field-box" style={{ position: 'relative' }}>
                                                    <label className="label" for="city">Country</label>
                                                    <span className='duplicate' onClick={e => setcountryedit(!countryedit)}>{countrydata != "" ? countrydata : "Select"}</span>
                                                    {
                                                        countryedit ?
                                                            <ul className='country_custom'>

                                                                {

                                                                    country.data.map((data, i) => {
                                                                        return (
                                                                            <li onClick={() => {
                                                                                setcountryedit(!countryedit)
                                                                                setcountrydata(data.country)
                                                                            }}>
                                                                                {data.country}
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                            : ""
                                                    }
                                                </div>
                                                {
                                                    countrydata == "United States" ?
                                                        <div className="field-box">
                                                            <label className="label" for="city">State</label>
                                                            <input type="text" placeholder='State' />
                                                        </div>
                                                        : ""}
                                            </div>
                                            <div className="form-group col-md-6">
                                                <div className="row coln field-box">
                                                    <div className="col-md-6">
                                                        <label className="label" for="city">City</label>
                                                        <input type="text" placeholder="New York" className="form-control" id="city" data-required />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="label" for="zipCode">ZIP Code</label>
                                                        <input type="number" className="form-control" id="zipCode" placeholder="12533665" />
                                                    </div>
                                                </div>
                                                <div className="field-box">
                                                    <label className="label" for="cardnumber">Card Number</label>
                                                    <input type="number" className="form-control" id="cardnumber" placeholder="1234 56789"
                                                        maxLength="16" data-required />
                                                </div>
                                                <div className="field-box">
                                                    <div className="row coln">
                                                        <div className="col-md-6">

                                                            <label className="label" for="expdate">Expiration Date</label>
                                                            <input type="number" className="form-control" id="expdate" placeholder="MM/YY"
                                                                maxLength="4" data-required />

                                                        </div>

                                                        <div className="col-md-6">

                                                            <label className="label" for="securitycode">Security #</label>
                                                            <input type="password" className="form-control" id="securitycode" maxLength="4"
                                                                placeholder="xxxxxx" data-required />

                                                        </div>
                                                    </div>
                                                </div>




                                            </div>

                                        </div>
                                        <div className="save-info field-box">
                                            <input type="checkbox" id="option1" name="option1" value="" />
                                            <label><img className="tickicon1" src={window.location.origin + "/images/check.svg"} alt="" />Save this card for future
                                                payments </label>
                                        </div>
                                    </form>
                                    <div className="button text-center">

                                        <div className="pull-right">
                                            <button className="btn" onClick={e => setcardnew(false)}>Cancel</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm">Save</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal> : ""
            }
            {
                cancelmembership ?
                    <Modal show={cancelmembership} onHide={e => setcancelmembership(false)}>
                        <Modal.Body>
                            <div className='promocode_content cancelmembership'>
                                <Link to="" onClick={e => setcancelmembership(false)}>+ </Link>
                                <h2><img src='/images/warning.svg' alt="warning-icon" /><br />Cancel membership</h2>
                                <div className='cancelmembershipp'>
                                    <p><span>Warning!</span>Are you sure you want to cancel? If you cancel your membership, you will lose your discount offers via Senscare Loyalty Program.</p>
                                    <div className="button text-center">
                                        <div className="pull-right">
                                            <button className="btn" onClick={e => setcancelmembership(false)}>Confirm</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm" onClick={e => setcancelmembership(false)}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    : ""
            }
            {
                disableaccoutn ?
                    <Modal show={disableaccoutn} onHide={e => setdisableaccoutn(false)}>
                        <Modal.Body>
                            <div className='promocode_content cancelmembership'>
                                <Link to="" onClick={e => setdisableaccoutn(false)}>+ </Link>
                                <h2><img src='/images/warning.svg' alt="warning-icon" /><br />
                                    Disable Account</h2>
                                <div className='cancelmembershipp'>
                                    <p>By disabling your account, your profile will be on temporary hold. </p>
                                    <div className="button text-center">
                                        <div className="pull-right">
                                            <button className="btn" onClick={e => disableaccount()}>Disable</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm" onClick={e => setdisableaccoutn(false)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    : ""
            }
            {
                deletewarning ?
                    <Modal show={deletewarning} onHide={e => setdeletewarning(false)}>
                        <Modal.Body>
                            <div className='promocode_content cancelmembership deletemodel'>
                                <Link to="" onClick={e => setdeletewarning(false)}>+ </Link>
                                <h2><img src='/images/warning.svg' alt="warning-icon" /><br />
                                    Delete Account</h2>
                                <div className='cancelmembershipp'>
                                    <p><span>Warning! </span>This action cannot be undone.</p>
                                    <div className="onepxline"></div>
                                    <ul>
                                        <li><img className="crossicon" src={window.location.origin + "/images/cancel.svg"} alt="" />All your contacts will be inaccessible. </li>
                                        <li><img className="crossicon" src={window.location.origin + "/images/cancel.svg"} alt="" /> All your employment history will be deleted.</li>
                                        <li><img className="crossicon" src={window.location.origin + "/images/cancel.svg"} alt="" /> All your messages, its favorites, and reviews will be erased.</li>
                                        <li><img className="crossicon" src={window.location.origin + "/images/cancel.svg"} alt="" />None of your recommendations will be available for download. </li>
                                    </ul>
                                    <div className="button text-center">
                                        <div className="pull-right">
                                            <button className="btn" onClick={e => {
                                                setaccountdelete(true)
                                                setdeletewarning(false)
                                            }
                                            }>Delete my account</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm" onClick={e => setdeletewarning(false)}>Keep my account</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    : ""
            }
            {
                survay ?
                    < Modal show={survay} onHide={e => emailsurvay()} >
                        <Modal.Body>
                            <div className='promocode_content cancelmembership'>
                                <Link to="" onClick={e => emailsurvay()}>+ </Link>
                                <h2>Sorry to see you go</h2>
                                <div className='cancelmembershipp'>
                                    <p><b>In order to make our service better for our clients, we need a little bit more information from you.</b></p>
                                    <div className="onepxline"></div>
                                    <p className='second'>Please tell us the reason you want to disable or delete your profile? </p>
                                    <br />
                                    <ul>
                                        <li><input type={"radio"} id="survay" name='survay' onClick={e => setsurvaydata({ ...survaydata, resion: "It’s too expensive" })} /><span>It’s too expensive </span></li>
                                        <li><input type={"radio"} id="survay" name='survay' onClick={e => setsurvaydata({ ...survaydata, resion: "I didn't find a job" })} /><span> I didn't find a job</span></li>
                                        <li><input type={"radio"} id="survay" name='survay' onClick={e => setsurvaydata({ ...survaydata, resion: "I found a job somewhere else" })} /><span>I found a job somewhere else
                                        </span></li>
                                        <li><input type={"radio"} id="survay" name='survay' onClick={e => setsurvaydata({ ...survaydata, resion: "other" })} /><span>Other </span></li>
                                    </ul>
                                    <div className='comment'>
                                        <textarea className={survaydata.resion == "other" && survaydata.other == "" ? "bordererror" : ""} maxLength="70" onChange={e => setsurvaydata({ ...survaydata, other: e.target.value })}></textarea>
                                        <span >Number of characters {70 - survaydata.other.length}</span>
                                    </div>
                                    <div className="button text-center">
                                        <div className="pull-right">
                                            <button className="btn" onClick={e => emailsurvay()}>Cancel</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm" onClick={e => survaysave()}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal >
                    : ""
            }
            {
                accountdelete ?
                    <Modal show={accountdelete} onHide={e => setaccountdelete(false)}>
                        <Modal.Body>
                            <div className='promocode_content cancelmembership deletemodel'>
                                <Link to="" onClick={e => setaccountdelete(false)}>+ </Link>
                                <h2><img src='/images/warning.svg' alt="warning-icon" /><br />
                                    Delete Account</h2>
                                <div className='cancelmembershipp'>
                                    <p>Are you sure you want to delete your account? </p>
                                    <div className="button text-center">
                                        <div className="pull-right">
                                            <button className="btn" onClick={e => deleteaccount()}>Delete</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm" onClick={e => setaccountdelete(false)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    : ""
            }
            {
                sorry ?
                    <Modal show={sorry} className="sorryto" onHide={e => window.location.replace("/")}>
                        <Modal.Body>
                            <div className='promocode_content cancelmembership '>
                                <Link to="/" onClick={e => setsorry(false)}>+ </Link>
                                <h2><img src='./images/return.png' /><br />We are sorry to see you go!</h2>
                                <p>You can <Link to={'/signup'}>come back</Link>anytime. </p>
                            </div>
                        </Modal.Body>
                    </Modal>
                    : ""
            }
            {
                signout ?
                    <Modal show={signout} onHide={e => setsignout(false)
                    } >
                        <Modal.Body>
                            <div className='promocode_content signout'>
                                <Link to="" onClick={e => setsignout(false)}>+ </Link>
                                <h2>Sign out</h2>
                                <p>Are you sure you want to Sign out? </p>
                                <div className="button text-center">
                                    <div className="pull-right">
                                        <button className="btn" onClick={e => setsignout(false)}>No</button>
                                    </div>
                                    <div className="pull-right">
                                        <button className="btn confirm" onClick={e => {
                                            localStorage.removeItem("id")
                                            localStorage.removeItem("token")
                                            setTimeout(() => {
                                                window.location.replace("/login")
                                            }, 500);
                                        }}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal > : ""
            }

            {
                photoupload ?
                    <Modal show={photoupload} onHide={e => setphotoupload(false)}>
                        <Modal.Body>
                            <div className='promocode_content cancelmembership uploadphoto'>
                                <div className=''>
                                    <p><strong>Upload profile photos</strong></p>
                                    <br />
                                    <ul>
                                        <li>
                                            {photo != "" ?
                                                <>
                                                    <img src={image} alt="preview image" />
                                                    <button onClick={e => setphoto("")}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="10" cy="10" r="10" fill="#A98D4B" />
                                                        <path d="M6 6.64062V6.09375C6 5.83398 6.20898 5.625 6.46875 5.625H8.65625L8.83984 5.25977C8.91797 5.09961 9.08008 5 9.25781 5H11.4902C11.668 5 11.8301 5.09961 11.9102 5.25977L12.0937 5.625H14.2812C14.541 5.625 14.75 5.83398 14.75 6.09375V6.64062C14.75 6.76953 14.6445 6.875 14.5156 6.875H6.23437C6.10547 6.875 6 6.76953 6 6.64062ZM14.1094 7.74805L13.7109 14.1211C13.6797 14.6152 13.2695 15 12.7754 15H7.97461C7.48047 15 7.07031 14.6152 7.03906 14.1211L6.64062 7.74805C6.63281 7.61328 6.74023 7.5 6.875 7.5H13.8769C14.0098 7.5 14.1172 7.61328 14.1094 7.74805Z" fill="white" />
                                                    </svg></button>
                                                </>
                                                :
                                                <>
                                                    <img src={api + "/public/assets/images/users/" + profile.file_path} alt="preview image" />
                                                    {/* <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="15" cy="15" r="14.5" stroke="#A98D4B" />
                                                        <rect x="14" y="7" width="2.28571" height="16" rx="1.14286" fill="#A98D4B" />
                                                        <rect x="7" y="16" width="2.28571" height="16" rx="1.14286" transform="rotate(-90 7 16)" fill="#A98D4B" />
                                                    </svg> */}
                                                </>
                                            }
                                            <input type={"file"} onChange={onImageChange} accept="image/*" />

                                        </li>
                                        <li>

                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="15" cy="15" r="14.5" stroke="#A98D4B" />
                                                <rect x="14" y="7" width="2.28571" height="16" rx="1.14286" fill="#A98D4B" />
                                                <rect x="7" y="16" width="2.28571" height="16" rx="1.14286" transform="rotate(-90 7 16)" fill="#A98D4B" />
                                            </svg>
                                            {/* <input type={"file"} onChange={e => setphoto(e.target.files[0])} accept="image/*" /> */}
                                            <button><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10" r="10" fill="#A98D4B" />
                                                <path d="M6 6.64062V6.09375C6 5.83398 6.20898 5.625 6.46875 5.625H8.65625L8.83984 5.25977C8.91797 5.09961 9.08008 5 9.25781 5H11.4902C11.668 5 11.8301 5.09961 11.9102 5.25977L12.0937 5.625H14.2812C14.541 5.625 14.75 5.83398 14.75 6.09375V6.64062C14.75 6.76953 14.6445 6.875 14.5156 6.875H6.23437C6.10547 6.875 6 6.76953 6 6.64062ZM14.1094 7.74805L13.7109 14.1211C13.6797 14.6152 13.2695 15 12.7754 15H7.97461C7.48047 15 7.07031 14.6152 7.03906 14.1211L6.64062 7.74805C6.63281 7.61328 6.74023 7.5 6.875 7.5H13.8769C14.0098 7.5 14.1172 7.61328 14.1094 7.74805Z" fill="white" />
                                            </svg></button>
                                        </li>
                                    </ul>
                                    <ol>
                                        <li>
                                            <div className='select_photoprofile'>
                                                <input type="radio" id="photo" name='photo' checked="true" />
                                                <span>Set as profile photo</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='select_photoprofile'>
                                                <input type="radio" id="photo" name='photo' />
                                                <span>Set as profile photo</span>
                                            </div>
                                        </li>
                                    </ol>
                                    <br />
                                    <p className='giveus'>* You can upload .jpg and .png files size up to 5Mb  </p>

                                    <div className="button text-center">
                                        <div className="pull-right">
                                            <button className="btn" onClick={e => setphotoupload()}>Close</button>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn confirm" onClick={e => profile_update()}>Upload photo</button>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </Modal.Body >
                    </Modal > : ""
            }
            <Footer />
        </>
    )
}

export default Search_providers
