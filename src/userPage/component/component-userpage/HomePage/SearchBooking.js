import "./stylecomponent.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function SearchBooking() {
  const { t } = useTranslation();
  const [dateInfor, setdataInfor] = useState({
    checkin: "",
    checkout: "",
    guest: 0,
  });
  console.log(dateInfor);
  return (
    <div className="search__booking mt-5 fade-left row">
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkin">{t("Checkin")}</label>
        <input
          type="date"
          id="checkin"
          value={dateInfor.checkin}
          onChange={(e) => {
            setdataInfor({ ...dateInfor, checkin: e.target.value });
          }}
        />
        ;
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkout">{t("Checkout")}</label>
        <input
          type="date"
          id="checkout"
          value={dateInfor.checkout}
          onChange={(e) => {
            setdataInfor({ ...dateInfor, checkout: e.target.value });
          }}
        />
        ;
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="guest">{t("guest")}</label>
        <select
          id="guest"
          value={dateInfor.guest}
          onChange={(e) => {
            setdataInfor({ ...dateInfor, guest: e.target.value });
          }}
        >
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="form-input search__room--input col-12 col-lg-6 col-xl-3 mb-2">
        <a href="/">{t(" MAKE A RESERVATION")} </a>
      </div>
    </div>
  );
}
