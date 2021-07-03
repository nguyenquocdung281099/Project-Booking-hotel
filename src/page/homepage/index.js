import "./style.css";
import BlockWelcomeItem from "../../component/component-userpage/HomePage/blockwelcomeItem";
import SearchBooking from "../../component/component-userpage/HomePage/SearchBooking";
import Reward from "../../component/component-userpage/HomePage/reward";
import StarHotel from "../../component/component-userpage/HomePage/starHotel";
import MultipleItemsSlider from "../../component/component-userpage/HomePage/slider";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import ServiceBlock from "../../component/component-userpage/HomePage/servicehotelblock";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import Button from "../../component/component-userpage/share/button";
import AboutusContent from "../../component/component-userpage/HomePage/aboutusItem";
import TitleBlock from "../../component/component-userpage/share/titleblock";
import OffersBlock from "../../component/component-userpage/share/OffersBlock";
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init({
  duration: 1200,
});
export default function HomePage() {
  return (
    <div>
      <section className="bodypage__banner">
        <div className="bodypage__banner--content container">
          <EdgeTop />
          <h2 className="tracking-in-expand">TheGem Hotel </h2>
          <h3 className="tracking-in-expand"> Luxury Resort &#38; Spa</h3>
          <EdgeBottom />
          <div className="banner__booking">
            <SearchBooking />
          </div>
        </div>
      </section>
      <main className="bodypage__main ">
        <section className="bodypage__welcome container-fluid">
          <div className="bodypage__welcome--block row">
            <div
              className="welcome--block__image1 welcome--block__image col-12 col-lg-6 col-xl-4"
              data-aos="fade-left"
            ></div>
            <BlockWelcomeItem title="Great Services" link="/service" />
            <div
              className="welcome--block__image2 welcome--block__image col-12 col-lg-6 col-xl-4"
              data-aos="fade-right"
            ></div>
          </div>
          <div className="bodypage__welcome--block row">
            <BlockWelcomeItem title="Profession Staff" link="/about" />
            <div className="welcome--block__image3 welcome--block__image col-12 col-lg-6 col-xl-4"></div>
            <BlockWelcomeItem title="Best Experience" link="/gallery" />
          </div>
        </section>
        <section className="banner container-fluid ">
          <div className="reward container">
            <div className="row">
              <Reward />
              <Reward />
              <Reward />
            </div>
          </div>
        </section>
        <section className="Discover container-fluid">
          <div className="discover__content row" data-aos="fade-left">
            <div className="col-12 col-xl-6 pl-5 pt-5 mt-5">
              <div className="star">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <h3 className="discover__sub-title">
                Discover what makes us a five star hotel
              </h3>
              <h1 className="discover__title">About the Hotel</h1>
              <EdgeBottom />
              <p className="discover__description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
                <br />
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae!
              </p>
              <StarHotel />
            </div>
          </div>
        </section>
        <section className="container-fluid Favorite__Rooms">
          <h3 className="favorite__subtitle">TheGem Hotel</h3>
          <h1 className="favorite__title">Favorite Rooms</h1>
          <EdgeBottom />
          <MultipleItemsSlider />
          <div>
            <Button url="/room" content="VEIW ALL ROOMS" />
            <div className="service__hotel container-fluid ">
              <div className="row">
                <ServiceBlock />
              </div>
            </div>
          </div>
        </section>
        <section className="booking__room_Online container-fluid d-none d-lg-block">
          <div className="booking__room--body container">
            <div className="booking__room--wrap">
              <img
                src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/2018/11/21.png"
                alt="booking online"
              />
              <div className="booking__room--content">
                <EdgeTop />
                <h3 className="booking__room--subtitle">Luxury Resort App</h3>
                <h1 className="booking__room--title">Booking Rooms Online</h1>
                <EdgeBottom />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa. Sed ut perspiciatis
                  unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                  illo inventore veritati.
                </p>
                <Button url="/room" content="DOWNLOAD" />
              </div>
            </div>
          </div>
        </section>
        <section className="aboutus container-fluid">
          <TitleBlock subtitle="Our Guests" title="Say About Us" top="false" />
          <div className="container">
            <AboutusContent />
          </div>
        </section>
        <section className="Special__Offers container-fluid">
          <div className="container">
            <TitleBlock
              subtitle="TheGem Hotel"
              title="Special Offers"
              top="false"
            />
            <OffersBlock />
          </div>
        </section>
        <section className="our_tour container-fluid">
          <div className="titleVideo">
            <TitleBlock subtitle="Overview" title="Video Tour" />
          </div>
          <video autoplay="true">
            <source src="https://codex-themes.com/thegem/wp-content/uploads/2016/10/THE-SUITE-ROOM-10-HD.m4v?fbclid=IwAR07I1UPbMPRkhv7mHcz4A62zlQWjWKf7rqbjkWkPHuVoBk2q4vCEsp4IbE" />
          </video>
        </section>
      </main>
    </div>
  );
}
