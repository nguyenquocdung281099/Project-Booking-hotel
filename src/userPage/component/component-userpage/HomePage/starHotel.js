import { useTranslation } from "react-i18next";

export default function StarHotel() {
  const { t } = useTranslation();
  let data1 = [
    t("90 Luxury Rooms"),
    t("120 Family Rooms"),
    t("340 Standart Rooms"),
    t("10 Restaurants and Bars"),
    t(" 2 Parking Spaces"),
  ];
  let data2 = [
    t("1 Spa Center"),
    t("4 Fitness Halls"),
    t("3 Conference Halls"),
    t("5 Swimming Pools"),
    t("1 Beauty Center"),
  ];
  data1 = data1.map((item, index) => {
    return (
      <div key="index" className="start__hotel--item">
        <i class="fas fa-star mr-1"></i>
        {item}
      </div>
    );
  });
  data2 = data2.map((item, index) => {
    return (
      <div key="index" className="start__hotel--item">
        <i class="fas fa-star mr-1"></i>
        {item}
      </div>
    );
  });

  return (
    <div className="start__hotel row">
      <div className="col-12 col-md-6">{data1}</div>
      <div className="col-12 col-md-6">{data2}</div>
    </div>
  );
}
