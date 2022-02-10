import { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, gettyperoom } from "../../../../../../redux/action";
export default function FilterCategory(props) {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.room);
  const type = data.type;
  const filter = data.filter;
  useEffect(() => {
    dispatch(gettyperoom());
    // eslint-disable-next-line
  }, []);
  function handleFilter(type) {
    dispatch(changeFilter({ ...filter, type: type }));
  }
  return (
    <div>
      <ul>
        {type.map((item, index) => (
          <li
            className={filter.type === item._id && "active"}
            key={`type_${item.name}-${index}`}
            onClick={(e) => {
              handleFilter(item._id);
            }}
          >
            <i class="fas fa-arrow-right"></i>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
