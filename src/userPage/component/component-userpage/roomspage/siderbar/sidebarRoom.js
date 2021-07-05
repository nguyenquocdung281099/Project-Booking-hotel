import { propTypes } from "react-bootstrap/esm/Image";
import FilterCategory from "./filterCategory";

export default function SiderBarRoom() {
  return (
    <div className="siderBarRoom col-3 sidebar-filter">
      <h3 className="name_filter">Filter Category</h3>
      <FilterCategory />
      <h3 className="name_filter">Filter Rating</h3>
      
    </div>
  );
}
