import TitleBlock from "./titleblock";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Banner(props) {
  const { t } = useTranslation();
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/">{t("Home")}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {props.content}
          </li>
        </ol>
      </nav>
      <TitleBlock title={props.title} top="true" subtitle={props.subtitle} />
    </>
  );
}
