import TitleBlock from "./titleblock";
import { Link } from "react-router-dom";
export default function Banner(props) {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/">Home</Link>
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
