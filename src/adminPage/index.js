import HeaderAdmin from "./component/header";
import AdminMain from "./component/main";
import AdminSideBar from "./component/sidebar";
import "./style.scss";
export default function AdminPage() {
  return (
    <div className="admin-page">
      <main>
        <AdminSideBar />
        <div className="container-admin">
          <HeaderAdmin />
          <AdminMain />
        </div>
      </main>
    </div>
  );
}
