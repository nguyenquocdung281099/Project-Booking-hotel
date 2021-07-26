import "./style.css";
import TitleBlock from "../../component/component-userpage/share/titleblock";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import SearchBooking from "../../component/component-userpage/HomePage/SearchBooking";
import CardRoomsList from "../../component/component-userpage/roomspage/cardRoomslist";

import AOS from "aos";
import SiderBarRoom from "../../component/component-userpage/roomspage/siderbar/sidebarRoom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

AOS.init({
  duration: 1200,
});

export default function RoomsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();
  return (
    <main className="roomsPage__main container-fluid">
      <section className="roomsPage__main--banner">
        <EdgeTop />
        <h1 className="main--banner__title">{t("Rooms List")}</h1>
        <EdgeBottom />
      </section>
      <section className="roomsPage__main--content">
        <section className="roomsPage__content--wrap container">
          <SearchBooking />
          <TitleBlock subtitle={t("CHOOSE FOR YOURSELF")} title={t("Best Room")} />
          <div className="roomsPage__wrap row">
            <SiderBarRoom />
            <CardRoomsList />
          </div>
        </section>
      </section>
    </main>
  );
}
