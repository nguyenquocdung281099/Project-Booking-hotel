import { useTranslation } from "react-i18next";
import "./style.css";

export default function DealBlock() {
  const { t } = useTranslation();
  const data = [
    {
      price: 99,
      descr: t("ON WEEKDAYS"),
    },
    {
      price: 149,
      descr: t("ON SPECIAl"),
    },
    {
      price: 120,
      descr: t("ON WEEKENDS"),
    },
  ];
  return (
    <div className="DealsBlock row">
      {data.map((item) => (
        <DealsBlockItem item={item} key={`${item.descr}`} />
      ))}
    </div>
  );
}

function DealsBlockItem(props) {
  return (
    <div className="DealsBlockItem col-12 col-md-6 col-lg-4">
      <div className="DealsBlockItem_inner">
        <h2 className="price">{props.item.price}$</h2>
        <h2>{props.item.descr}</h2>
      </div>
    </div>
  );
}
