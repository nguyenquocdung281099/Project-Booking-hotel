import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../../../../../redux/action";
import "./style.css";

export default function FilterRating() {
  const data = useSelector((state) => state.room);
  const filter = data.filter;
  const dispatch = useDispatch();
  const star = [1, 2, 3, 4, 5];
  function handleFilter(rating) {
    dispatch(changeFilter({ ...filter, rating: rating }));
  }
  console.log(filter.rating);
  return (
    <ul>
      {star.map((item, index) => {
        let stars = [];
        for (let index = 0; index < 5; index++) {
          if (index < item) {
            stars[stars.length] = <i class="fas fa-star"></i>;
          } else {
            stars[stars.length] = <i class="far fa-star"></i>;
          }
        }
        return (
          <li
            onClick={() => {
              handleFilter(item);
            }}
            key={`star-${index}`}
            className={filter.rating === item ? "active" : ""}
          >
            {stars}
          </li>
        );
      })}
    </ul>
  );
}
