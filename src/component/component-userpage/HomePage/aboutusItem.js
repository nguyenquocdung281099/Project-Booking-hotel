export default function AboutusContent() {
  const aboutus = [
    {
      url: "https://live.staticflickr.com/65535/51277499157_e0a8c0a9df_w.jpg",
      name: "HERMAN LEDFORD",
    },
    {
      url: "https://live.staticflickr.com/65535/51279270015_8d99d01bf5_w.jpg",
      name: "EVA ANDERSON",
    },
    {
      url: "https://live.staticflickr.com/65535/51278968449_3144f6dfb1_w.jpg",
      name: "EMERSON ANDERSON",
    },
  ];
  return (
    <div className="aboutus__content row">
      {aboutus.map((item) => (
        <AboutusItem item={item} key={`aboutus-${item.name}`} />
      ))}
    </div>
  );
}

function AboutusItem(props) {
  return (
    <div className="aboutus__item col-12 col-lg-6 col-xl-4">
      <img src={props.item.url} alt="about_us_member" />
      <p className="aboutus__description">
        Lorem ipsum dolor sit ametcon sectetur adipisicing elit, sed doiusmod
        tempor incidilabore et dolore magna aliqua. Ut enim ad mini veniam, quis
        nostrud
      </p>
      <h4 className="aboutus__name">{props.item.name}</h4>
      <h5 className="aboutus__company">Creative Heads Inc</h5>
      <p className="quotation_marks">”</p>
    </div>
  );
}
