import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import "./style.css";
import "aos/dist/aos.css";
import AOS from "aos";
import SliderCommentClinet from "../../component/component-userpage/aboutuspage/sliderCommenclient";
import DiscoverAmenitiesBlock from "../../component/component-userpage/aboutuspage/discovercard";
import TitleBlock from "../../component/component-userpage/share/titleblock";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
AOS.init({
  duration: 1200,
});

export default function AboutUsPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="aboutus__main container_fluid">
      <section className="aboutus__main--banner container_fluid">
        <EdgeTop />
        <h1 className="main--banner__title">{t("About Us")}</h1>
        <EdgeBottom />
      </section>
      <section className="aboutus__main--chooseUs">
        <TitleBlock subtitle={t("WHY CHOOSE US")} title={t("Experience")} />
        <div className="aboutus-main container mt-5">
          <div className="row">
            <p
              data-aos="fade-right"
              className="whychooseus__descrn p-4 col-12 col-lg-7"
            >
              {t("whychooseus")}
            </p>
            <div className="col-5 image__choose d-none d-lg-block"></div>
          </div>
        </div>
      </section>
      <section className="counter">{/* ! code counter */}</section>
      <section className="discoverOurRoom container-fluid">
        <TitleBlock
          subtitle={t("DISCOVER OUR ROOMS")}
          title={t("TheGem Amenities")}
        />
        <div className="container">
          <DiscoverAmenitiesBlock />
        </div>
      </section>
      <section className="nearby container-fluid ">
        <TitleBlock subtitle="THEGEM LUXURY HOTEL" title="NEARBY" />
        <div className="nearby_wrap container">
          <div className="d-flex flex-column flex-md-row flex-wrap">
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
          <div className="d-flex flex-column flex-md-row flex-wrap">
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
        <TitleBlock subtitle={t("INFORMATION")} title={t("What Client Say")} />
        <SliderCommentClinet />
      </section>
    </main>
  );
}
