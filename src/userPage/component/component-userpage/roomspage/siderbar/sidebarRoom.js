import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../../../../redux/action";
import FilterCategory from "./filterCategory";
import FilterRating from "./filterRating";
import "./style.css";

export default function SiderBarRoom() {
  const data = useSelector((state) => state.room);
  const filter = data.filter;
  const filterSearchRoom = data.filterSearchRoom;
  const dispatch = useDispatch();
  return (
    <div className="siderBarRoom col-12 col-lg-3 sidebar-filter">
      <select
        className="sort_room"
        onChange={(e) => {
          dispatch(
            changeFilter({
              ...filter,
              _sort: "pricePerday",
              _order: e.target.value,
            })
          );
        }}
      >
        <option selected>sort</option>
        <option value="asc">price asc</option>
        <option value="desc">price desc</option>
      </select>
      <h3 className="name_filter">Filter Category</h3>
      <FilterCategory />
      <h3 className="name_filter">Filter Rating</h3>
      <FilterRating />
      {Object.keys(filter).length !== 0 ||
        (Object.keys(filterSearchRoom).length !== 0 && (
          <button
            className="btn"
            onClick={() => {
              dispatch(changeFilter({}));
            }}
          >
            Clear Filter
          </button>
        ))}
    </div>
  );
}
