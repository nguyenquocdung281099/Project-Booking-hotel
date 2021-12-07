import { Link } from "react-router-dom";
import { sideTitle } from "../../constant";
import "./style.scss";

export default function AdminSideBar() {
  return (
    <div className="admin-sidebar">
      <div>
        <ul>
          {sideTitle.map((item, index) => (
            <li key={`label-${index}`}>
              <img src={item.icon} alt="item.label" />
              <Link to={`/admin/${item.path}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
