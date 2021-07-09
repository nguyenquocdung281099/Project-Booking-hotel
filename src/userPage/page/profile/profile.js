import { useSelector } from "react-redux";
import "./style.css";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import { useTranslation } from "react-i18next";
export default function ProfilePage() {
  const users = useSelector((state) => state.user.user);
  const { t } = useTranslation();
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
            <div className="email">
              <label for="email">Email:</label>
              <input type="text" value={users.email} disabled />
            </div>
            <div className="userName">
              <label for="userName">{t("UserName")}:</label>
              <input type="text" value={users.userName} disabled />
            </div>
            <div className="birthday">
              <label for="birthday">{t("Birthday")}:</label>
              <input type="text" value={users.birthday} disabled />
            </div>
            <div className="address">
              <label for="address">{t("Address")}:</label>
              <input type="text" value={users.address} disabled />
            </div>
            <div className="password">
              <label for="password">{t("Password")}:</label>
              <input type="password" value={users.password} disabled />
              <button>
                <i class="fas fa-pen ml-3"></i>
              </button>
            </div>
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
