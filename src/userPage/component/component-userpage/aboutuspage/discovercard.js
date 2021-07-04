import "./style.css";
import "./style.css";

export default function DiscoverAmenitiesBlock() {
  const data = [
    { classI: "fas fa-wifi", title: "FREE WIFI ACCESS" },
    { classI: "fas fa-tv", title: "FREE CABLE TV" },
    { classI: "fas fa-fan", title: "AIR CONDITIONING" },
  ];
  const data2 = [
    { classI: "fas fa-folder", title: "EXCHANGE OFFICE" },
    { classI: "fas fa-wifi", title: "FREE STRONGBOX" },
    { classI: "fas fa-swimmer", title: "FREE POOL ACCESS" },
  ];
  return (
    <>
      <div
        className="d-flex flex-wrap discover_block justify-content-between"
        data-aos="fade-right"
      >
        {data.map((item, index) => (
          <DiscoverAmenitiesItem item={item} key={`discoveritem-${index}`} />
        ))}
      </div>
      <div
        className="d-flex flex-wrap discover_block justify-content-between"
        data-aos="fade-left"
      >
        {data2.map((item, index) => (
          <DiscoverAmenitiesItem item={item} key={`discoveritem-${index}`} />
        ))}
      </div>
    </>
  );
}
function DiscoverAmenitiesItem(props) {
  return (
    <div className="DiscoverAmenitiesItem mb-5 mt-5 ">
      <i class={props.item.classI}></i>
      <h4 className="discoverAmenitiesItem-title">{props.item.title}</h4>
      <p className="discoverAmenitiesItem-descr">
        Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean
        sollicitudin, lorem quis bibendum auctor nisi elit.
      </p>
    </div>
  );
}
