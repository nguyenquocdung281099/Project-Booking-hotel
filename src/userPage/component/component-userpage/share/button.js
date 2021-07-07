import { Link } from "react-router-dom";

export default function Button(props) {
  return (
    <Link to={props.url} className="btn-custom mt-2">
      {props.content}
    </Link>
  );
}
