import { useTranslation } from "react-i18next";

export default function Utilities() {
  const { t } = useTranslation();
  const data = [
    {
      class: "fas fa-bed",
      content: t("Double bed"),
    },
    {
      class: "fas fa-wifi",
      content: t("Free Wifi"),
    },
    {
      class: "fas fa-tv",
      content: t("Cable TV"),
    },
    {
      class: "fab fa-airbnb",
      content: t("Air condition"),
    },
    {
      class: "fas fa-box",
      content: t("Strong Box"),
    },
  ];
  return (
    <div>
      {data.map((item) => (
        <UtilitiesItem item={item} key={item.content} />
      ))}
    </div>
  );
}

function UtilitiesItem(props) {
  return (
    <div className="Utilities__item d-flex" data-aos="fade-bottom">
      <i class={props.item.class}></i>
      <h3 className="ml-5">{props.item.content} </h3>
    </div>
  );
}
