import React, { useState, useEffect } from "react";
import { country } from "./common/country";
import Footer from "./common/footer";
import Header from "./common/header";
import { api } from "../../urls";
import { useTranslation } from "react-i18next";

function Provider_payment() {
  const [member, setmember] = useState(
    JSON.parse(localStorage.getItem("membership")) != null
      ? JSON.parse(localStorage.getItem("membership"))
      : ""
  );
  const [count, setcount] = useState(true);
  const [detail, setdetail] = useState("");
  const [plan, setplan] = useState(member.plan);
  const [planmobile, setplanmobile] = useState(member.planmobile);
  const [month, setmonth] = useState(member.month);
  const [complete, setcomplete] = useState("");
  const [complete2, setcomplete2] = useState("");
  const [savepayment, setsavepayment] = useState(false);
  const [country2, setcountry] = useState();
  const { t } = useTranslation("providerPayment");

  const updatemembership = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      price: complete,
      name: plan,
      month: month,
      iep: 1,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(api + "/api/v1/savemembershipplan", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert("Successful");
      })
      .catch((error) => console.log("error", error));
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
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  const countprice = () => {
    let planprice =
      plan == "Hummingbird"
        ? 0
        : plan == "Swan"
        ? 11.9
        : plan == "Flamingo"
        ? 17
        : "";
    let monthprice = planprice * month;
    setcomplete(monthprice);
  };
  const countprice2 = () => {
    let planprice =
      plan == "Hummingbird"
        ? 0
        : plan == "Swan"
        ? 14
        : plan == "Flamingo"
        ? 20
        : "";
    let monthprice = planprice * month;
    setcomplete2(monthprice);
  };
  useEffect(() => {
    console.log();
    if (count) {
      countprice();
      countprice2();
      profile_data();
      setcount(false);
    }
  }, [member]);
  return (
    <div>
      <div>
        <div class="selected_plan">
          <div class="container">
            <div class="selected_page_content">
              <h3>
                {t("You Selected:")} <strong>{plan}</strong>
              </h3>
              <div class="change_plan_btn">
                <button
                  onClick={(e) => {
                    window.scrollTo({ top: 0 });
                  }}
                >
                  {t("Change Plan")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="total_amnt">
          <div class="container">
            <div class="total_amnt_content">
              <h3>
                {t("Total Amount To Pay:")} <s>${complete2}</s>{" "}
                <span>${complete}</span>
              </h3>
              <h4>
                {t("Take advantage of our current discount offers and save")}
                {plan == "Swan" ? 15 : plan == "Flamingo" ? 20 : 100}%{" "}
                {t("now.")}
              </h4>
              <ul>
                <li>
                  {t(
                    "* Subscription will be automatically renewed unless you cancel it before the next renewal date."
                  )}
                </li>
                <li>
                  {t("* Plus applicable local taxes and currency conversions.")}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="payment_details">
            <h3>{t("Payment Details")}</h3>
            <div class="payment_cards">
              <button>
                <img src="img/mastercard.png" alt="" />
              </button>
              <button>
                <img src="img/maestro.png" alt="" />
              </button>
              <button>
                <img src="img/american_exp.png" alt="" />
              </button>
              <button>
                <img src="img/paypal.png" alt="" />
              </button>
            </div>
          </div>
          <div class="payment_form">
            <form action="">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label class="form-label" for="name">
                      {t("Name on Card")}
                    </label>
                    <input type="text" id="name" placeholder={t("Type here")} />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label class="form-label" for="card">
                      {t("Card Number")}
                    </label>
                    <input type="tel" id="card" placeholder={t("Type here")} />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label class="form-label" for="address">
                      {t("Billing Address")}
                    </label>
                    <input
                      type="text"
                      id="address"
                      placeholder={t("Type here")}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="row exp_Sec">
                    <div class="col exp_sec">
                      <div class="form-group">
                        <label class="form-label" for="date">
                          {t("Expiration Date")}
                        </label>
                        <input
                          type="date"
                          id="date"
                          placeholder={t("Type here")}
                        />
                      </div>
                    </div>
                    <div class="col exp_sec">
                      <div class="form-group">
                        <label class="form-label" for="security">
                          {t("Security #")}
                        </label>
                        <input
                          type="tel"
                          id="security"
                          placeholder={t("Type here")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <label class="form-label" for="country">
                          {t("Country")}
                        </label>
                        <select
                          name=""
                          id=""
                          onChange={(e) => setcountry(e.target.value)}
                        >
                          <option selected>{t("Choose from list")}</option>
                          {country.data.map((e) => {
                            return (
                              <option value={e.country}>{e.country}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div class="col">
                      {country2 != "Serbia" ? (
                        <div class="form-group">
                          <label class="form-label" for="state">
                            {t("State")}
                          </label>
                          <input
                            type="email"
                            id="email"
                            placeholder={t("Type here")}
                          />
                          {/* <select name="" id="">
                                                    <option selected>Choose from list</option>
                                                    <option value="a">a</option>
                                                    <option value="a">a</option>
                                                    <option value="a">a</option>
                                                    <option value="a">a</option>
                                                </select> */}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label class="form-label" for="email">
                      {t("Email Address")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder={t("Type here")}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="row city_zip">
                    <div class="col city_zip">
                      <div class="form-group">
                        <label class="form-label" for="city">
                          {t("City")}
                        </label>
                        <input
                          type="text"
                          id="city"
                          placeholder={t("Type here")}
                        />
                      </div>
                    </div>
                    <div class="col city_zip">
                      <div class="form-group">
                        <label class="form-label" for="zip">
                          {t("Zip Code")}
                        </label>
                        <input
                          type="tel"
                          id="zip"
                          placeholder={t("Type here")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <div class="radio">
                      <input
                        type="checkbox"
                        checked={savepayment}
                        onClick={(e) => setsavepayment()}
                      />
                      <label>{t("Save this card for future payments")}</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="promotion">
            <div class="promotion_code">
              <label for="">
                {t("Add a promotion code")}
                {/* <span>*This code expired.</span> */}
              </label>
              <input type="text" placeholder="ngsklf4875d" />
              <button>{t("Apply code")}</button>
            </div>
          </div>
          <div class="pay_aggrement">
            <input type="checkbox" />
            <label for="">
              {t("I agree to pay")} ${complete / month} {t("monthly for")}{" "}
              {month > 0 ? month : ""} {month == 1 ? "month" : "months"}
              {t("subscription.")}
            </label>
          </div>
          <div class="form_submit_button">
            <div class="button">
              <button class="can" onClick={(e) => {}}>
                {t("Back")}
              </button>
              <button class="sub" onClick={(e) => updatemembership()}>
                {t("Submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Provider_payment;
