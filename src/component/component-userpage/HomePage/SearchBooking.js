import "./stylecomponent.css";
import AOS from "aos";

export default function SearchBooking() {
  AOS.init();
  return (
    <div className="search__booking mt-5 fade-left row" data-aos={"fade-left"}>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkin">Checkin</label>
        <input type="date" id="checkin" value="2021-01-07" />;
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkout">Checkout</label>
        <input type="date" id="checkout" value="2021-05-07" />;
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="guest">guest</label>
        <select id="guest">
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="form-input search__room--input col-12 col-lg-6 col-xl-3 mb-2">
        <a href="/"> MAKE A RESERVATION </a>
      </div>
    </div>
  );
}
