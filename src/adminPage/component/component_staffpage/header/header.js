import "./style.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { KEY_TOKEN } from "../../../../userPage/const/const";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/action";

export default function Header() {
  const notify = () => toast.success("logout success!");
  const dispatch = useDispatch();
  return (
    <div className="staff_header">
      <div className="staff_header-left">
        <ToastContainer />
        <button className="btn m-2">
          <Link
            to="/"
            onClick={() => {
              notify();
              localStorage.removeItem(KEY_TOKEN);
              localStorage.removeItem("KEY_AUTHEN");
              dispatch(logout());
            }}
          >
            logout
            <i class="fas fa-sign-out-alt"></i>
          </Link>
        </button>
      </div>
    </div>
  );
}
