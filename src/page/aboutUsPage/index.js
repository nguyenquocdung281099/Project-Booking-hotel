import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import "./style.css";
import "aos/dist/aos.css";
import AOS from "aos";
import SliderCommentClinet from "../../component/component-userpage/aboutuspage/sliderCommenclient";
import DiscoverAmenitiesBlock from "../../component/component-userpage/aboutuspage/discovercard";
// import CounterNumber from "../../component/component-userpage/aboutuspage/counteritem";
import TitleBlock from "../../component/component-userpage/share/titleblock";
AOS.init({
  duration: 1200,
});

export default function AboutUsPage() {
  return (
    <main className="aboutus__main container_fluid">
      <section className="aboutus__main--banner container_fluid">
        <EdgeTop />
        <h1 className="main--banner__title">About Us</h1>
        <EdgeBottom />
      </section>
      <section className="aboutus__main--chooseUs">
        <TitleBlock
          subtitle="WHY CHOOSE US"
          title="Experience the Splendour
of TheGem Hotel!"
        />
        <div className="aboutus-main container mt-5">
          <div className="row">
            <p
              data-aos="fade-right"
              className="whychooseus__descrn p-4 col-12 col-lg-7"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Sed
              ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque. laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
            <div className="col-5 image__choose d-none d-lg-block"></div>
          </div>
        </div>
      </section>
      <section className="counter">{/* ! code counter */}</section>
      <section className="discoverOurRoom container-fluid">
        <TitleBlock subtitle="DISCOVER OUR ROOMS" title="TheGem Amenities" />
        <div className="container">
          <DiscoverAmenitiesBlock />
        </div>
      </section>
      <section className="nearby container-fluid pt-5">
        <TitleBlock subtitle="THEGEM LUXURY HOTEL" title="NEARBY" />
        <div className="nearby_wrap container">
          <div className="d-flex flex-column flex-md-row">
            <img
              src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/2018/11/3-1.jpg"
              class="img-fluid img1"
              alt="nearby"
            />
            <img
              src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/2018/11/4-1.jpg"
              class="img-fluid img2"
              alt="nearby"
            />
          </div>
          <img
            src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/2018/11/7.jpg"
            class="img-fluid img2"
            alt="nearby"
          />
          <div className="d-flex flex-column flex-md-row">
            <img
              src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/2018/11/5-1.jpg"
              class="img-fluid img1"
              alt="nearby"
            />
            <img
              src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/2018/11/4-1.jpg"
              class="img-fluid img2"
              alt="nearby"
            />
          </div>
        </div>
      </section>
      <section className="slider__client">
        <TitleBlock subtitle="INFORMATION" title="What Client Say" />
        <SliderCommentClinet />
      </section>
    </main>
  );
}
