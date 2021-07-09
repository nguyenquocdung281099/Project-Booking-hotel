import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { gettyperoom } from "../../../../redux/action/index";
import Button from "../share/button";
import "./share.css";

export default function OffersBlock() {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.room.type);
  useEffect(() => {
    dispatch(gettyperoom());
  }, [dispatch]);
  let data = type.map((item, key) => {
    if (key > 2) {
      return (
        <OffersBlockItem name={item.name} pricePerday={item.pricePerday} />
      );
    }
    return "";
  });
  return <div className="Offers__block row mt-5">{data}</div>;
}

function OffersBlockItem(props) {
  const { t } = useTranslation();
  return (
    <div className="OffersBlockItem col-12 col-lg-6 col-xl-4">
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col header_tab">{props.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{t("Flight Ticket")}</th>
          </tr>
          <tr>
            <th scope="row ">{t("Restaurant")}</th>
          </tr>
          <tr>
            <th scope="row">{t("Music Concert")}</th>
          </tr>
          <tr>
            <th scope="row">{t("Airport Pick-up")}</th>
          </tr>
          <tr>
            <th scope="row">{t("Sport Activities")}</th>
          </tr>
          <tr>
            <th scope="row pt-2">
              <Button url="/room" content={t("BOOK NOW")} />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
