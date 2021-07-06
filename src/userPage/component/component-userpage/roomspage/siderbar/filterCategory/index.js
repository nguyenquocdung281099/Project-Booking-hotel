import { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, gettyperoom } from "../../../../../../redux/action";
export default function FilterCategory(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettyperoom());
  }, []);
  const data = useSelector((state) => state.room);
  const type = data.type;
  const filter = data.filter;
  console.log(filter);
  function handleFilter(id) {
    dispatch(changeFilter({ ...filter, idtyperoom: id }));
  }
  return (
    <div>
      <ul>
        {type.map((item, index) => (
          <li
            key={`type_${item.name}-${index}`}
            onClick={(e) => {
              handleFilter(item.id);
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
