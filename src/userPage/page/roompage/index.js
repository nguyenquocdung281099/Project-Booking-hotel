import AOS from "aos";
import "./style.css";
import TitleBlock from "../../component/component-userpage/share/titleblock";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import SearchBooking from "../../component/component-userpage/HomePage/SearchBooking";
import CardRoomsList from "../../component/component-userpage/roomspage/cardRoomslist";
AOS.init({
  duration: 1200,
});

export default function RoomsPage() {
  return (
    <main className="roomsPage__main container-fluid">
      <section className="roomsPage__main--banner">
        <EdgeTop />
        <h1 className="main--banner__title">Rooms List</h1>
        <EdgeBottom />
      </section>
      <section className="roomsPage__main--content">
        <section className="roomsPage__content--wrap container p-5">
          <SearchBooking />
          <TitleBlock subtitle="CHOOSE FOR YOURSELF" title="Best Room" />
          <CardRoomsList />
        </section>
      </section>
    </main>
  );
}
