import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { editUser } from "../../../redux/action";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.user);
  const [dataInf, setdataInf] = useState({});
  useEffect(() => {
    setdataInf({
      email: users.email,
      userName: users.userName,
      birthday: users.birthday,
      address: users.address,
      password: users.password,
    });
    console.log(users);
  }, [users]);
  console.log(users);
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(true);

  return (
    <main className="profile__page container-fluid">
      <section className="aboutus__main--banner">
        <EdgeTop />
        <h1 className="main--banner__title">{t("Profile")}</h1>
        <EdgeBottom />
      </section>
      <section className="profiel__page--body wrap container">
        <div className="row">
          <div className="veiw-profile col-5">
            <img
              className="avatar_user"
              src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"
              alt="avatar"
            />
            <button
              onClick={(e) => {
                setDisabled(false);
              }}
            >
              <i class="fas fa-pen ml-3">Edit Information</i>
            </button>
            <div className="email">
              <label for="email">Email:</label>
              <input
                type="text"
                value={dataInf.email}
                disabled={disabled}
                onChange={(e) => {
                  setdataInf({ ...dataInf, email: e.target.value });
                }}
              />
            </div>
            <div className="userName">
              <label for="userName">{t("UserName")}:</label>
              <input
                type="text"
                value={dataInf.userName}
                onChange={(e) => {
                  setdataInf({ ...dataInf, userName: e.target.value });
                }}
                disabled={disabled}
              />
            </div>
            <div className="birthday">
              <label for="birthday">{t("Birthday")}:</label>
              <input
                type="text"
                value={dataInf.birthday}
                onChange={(e) => {
                  setdataInf({ ...dataInf, birthday: e.target.value });
                }}
                disabled={disabled}
              />
            </div>
            <div className="address">
              <label for="address">{t("Address")}:</label>
              <input
                type="text"
                value={dataInf.address}
                onChange={(e) => {
                  setdataInf({ ...dataInf, address: e.target.value });
                }}
                disabled={disabled}
              />
            </div>
            <div className="password">
              <label for="password">{t("Password")}:</label>
              <input
                type="password"
                value={dataInf.password}
                onChange={(e) => {
                  setdataInf({ ...dataInf, password: e.target.value });
                }}
                disabled={disabled}
              />
            </div>
            <button
              className="btn m-auto"
              onClick={() => {
                setDisabled(true);
                dispatch(editUser(users.id, dataInf));
              }}
            >
              Save
            </button>
          </div>
          <div className="history__booking col-6 ml-5">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{t("nameRoom")}</th>
                  <th scope="col">{t("promotion")}</th>
                  <th scope="col">{t("checkin")}</th>
                  <th scope="col">{t("checkout")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col">1</th>
                </tr>
                <tr>
                  <th scope="col">2</th>
                </tr>{" "}
                <tr>
                  <th scope="col">3</th>
                </tr>{" "}
                <tr>
                  <th scope="col">4</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
