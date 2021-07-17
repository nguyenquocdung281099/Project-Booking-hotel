import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookingRoom, getRoomDetail } from "../../../redux/action";
import "./style.css";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import { useTranslation } from "react-i18next";
import SearchBooking from "../../component/component-userpage/HomePage/SearchBooking";
import SliderDetail from "../../component/component-userpage/roomDetail/slider";
import Utilities from "../../component/component-userpage/roomDetail/Utilities";
import AOS from "aos";
import TitleBlock from "../../component/component-userpage/share/titleblock";
import DealBlock from "../../component/component-userpage/roomDetail/dealsBlock";
import SliderRoomVeiwed from "../../component/component-userpage/roomDetail/sliderRoomVeiwed";
import { KEY_ROOM_VEIWED } from "../../const/const";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

AOS.init({
  duration: 2000,
});

export default function RoomDetailPage() {
  const param = useParams();
  const dispath = useDispatch();
  const { t } = useTranslation();
  let dataRoomCurrent = useSelector((state) => state.room.roomsDetail);
  const bookingRoomFetch = useSelector((state) => state.booking.booking);
  const [styleProgess, setStyleProgess] = useState({
    width: "25%",
  });

  const holidays = setDateBooked(bookingRoomFetch);
  console.log(holidays);
  const dispatch = useDispatch();

  useEffect(() => {
    dispath(getRoomDetail({ id: param.id }));
  }, []);

  useEffect(() => {
    dispatch(getBookingRoom({ idroom: dataRoomCurrent.id, status: "NEW" }));
  }, [dispatch]);

  //? set data veiwed

  if (dataRoomCurrent.name) {
    const data = JSON.parse(sessionStorage.getItem(KEY_ROOM_VEIWED)) || [];
    if (data.findIndex((item) => item.name === dataRoomCurrent.name) === -1) {
      data.push(dataRoomCurrent);
      sessionStorage.setItem(KEY_ROOM_VEIWED, JSON.stringify(data));
    }
  }


  return (
    <main className="roomDetail__page">
      <section className="aboutus__main--banner container_fluid">
        <EdgeTop />
        <h1 className="main--banner__title">
          {t("Room Detail")} - {dataRoomCurrent.name}
        </h1>
        <EdgeBottom />
      </section>
      <section className="roomDetail__container container-fuild">
        <div className="roomDetail__wrap container">
          <SearchBooking />
          <div className="row pt-5 pb-5">
            <div className="col-8 ">
              <SliderDetail />
            </div>
            <div className="col-4">
              <Utilities />
            </div>
          </div>
        </div>
        <div className="roomDetail__description container">
          <div
            className="row mt-5"
            onMouseOver={() => {
              setStyleProgess({ width: "75%" });
            }}
          >
            <div className="col-8">
              <h4>{t("DESCRIPTION")}</h4>
              <p>{dataRoomCurrent.description}</p>
              <h4 className="mb-5">{t("ROOM DETAIL")}</h4>
              <div className="d-flex">
                <table className="table table-striped ">
                  <tbody>
                    <tr>
                      <th scope="row">{t("size")}:</th>
                      <td>350-425 m2</td>
                    </tr>
                    <tr>
                      <th scope="row">{t("view")}:</th>
                      <td>{t("Sea")}</td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Ensuite Bathroom")}</th>
                      <td>
                        <i class="far fa-times-circle"></i>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Breakfast Included")} </th>
                      <td>
                        <i class="fas fa-check-circle"></i>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Gym Access")}</th>
                      <td>
                        <i class="fas fa-check-circle"></i>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Ensuite Bathroom")}</th>
                      <td>24/7</td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Free Airport Pickup")}</th>
                      <td>
                        <i class="fas fa-check-circle"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="table table-striped ">
                  <tbody>
                    <tr>
                      <th scope="row">{t("Room Service")}</th>
                      <td>
                        <i class="fas fa-check-circle"></i>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Roof terrace")}</th>
                      <td>
                        <i class="fas fa-check-circle"></i>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Dryer")}</th>
                      <td>
                        <i class="far fa-times-circle"></i>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Balcony")}</th>
                      <td>
                        <i class="far fa-times-circle"></i>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Smoking allowed")}</th>
                      <td>
                        <i class="far fa-times-circle"></i>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Concrete flooring")}</th>
                      <td>24/7</td>
                    </tr>
                    <tr>
                      <th scope="row">{t("Free Parking")}</th>
                      <td>
                        <i class="fas fa-check-circle"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-3 ml-5">
              <h4 className="mb-3">{t("Availability")}</h4>
              <div className="d-flex">
                <div className="describe d-flex m-2 ">
                  <div className=" full-room mr-2">1</div>{" "}
                  <p>{t("fully-room")}</p>
                </div>
                <div className="describe d-flex m-2">
                  <div className="empty-room mr-2 ">1</div>{" "}
                  <p>{t("empty-room")}</p>
                </div>
              </div>
              <DatePicker inline excludeDates={holidays} />

              <h4 className="mb-3 mt-3">
                {t("OUR GUESTS RATE THIS ROOM AS BELOW")}
              </h4>
              <p>
                Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean
                lorem quis bibendum auctor nisi elit.
              </p>
              <p>Overal</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={styleProgess}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>Cleanliness</p>

              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={{ width: "89%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>Services</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={{ width: "80%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>Value</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>View</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={{ width: "80%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="Pricing__deals ">
        <TitleBlock subtitle="GET THE BEST" title="Pricing Deals" />
        <div className="container">
          <DealBlock />
        </div>
      </section>
      {sessionStorage.getItem(KEY_ROOM_VEIWED) ? (
        <section className="roomViewed">
          <TitleBlock subtitle="THE GEMS HOTEL" title="Room Veiwed" />

          <div className="container">
            <SliderRoomVeiwed />
          </div>
        </section>
      ) : (
        ""
      )}
    </main>
  );
}

const setDateBooked = (booking) => {
  let holidays = [];
  if (booking && booking.length !== 0) {
    booking.forEach((item) => {
      holidays[holidays.length] = parseInt(Date.parse(item.dateStart));
      while (holidays[holidays.length - 1] < Date.parse(item.dateEnd)) {
        holidays[holidays.length] =
          parseInt(holidays[holidays.length - 1]) + 86400000;
      }
    });
  }
  return holidays;
};
