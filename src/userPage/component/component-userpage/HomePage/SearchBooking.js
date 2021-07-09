import "./stylecomponent.css";
import AOS from "aos";
import { useTranslation } from "react-i18next";

export default function SearchBooking() {
  AOS.init();
  const { t } = useTranslation();
  return (
    <div className="search__booking mt-5 fade-left row">
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkin">{t("Checkin")}</label>
        <input type="date" id="checkin" value="2021-01-07" />;
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkout">{t("Checkout")}</label>
        <input type="date" id="checkout" value="2021-05-07" />;
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="guest">{t("guest")}</label>
        <select id="guest">
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
