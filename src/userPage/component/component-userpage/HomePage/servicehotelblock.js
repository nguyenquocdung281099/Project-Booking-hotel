import EdgeBottom from "./edge";
import EdgeTop from "./edgeTop";
export default function ServiceBlock() {
  let dataImg = [
    {
      src: "https://live.staticflickr.com/65535/51277499132_66aac83ffd_b.jpg",
      title: "Сonference Hall",
    },
    {
      src: "https://live.staticflickr.com/65535/51278250976_e72e0e5d59_b.jpg",
      title: "Luxure Restaurant",
    },
    {
      src: "https://live.staticflickr.com/65535/51279270075_dfb2975a12_b.jpg",
      title: "Spa Сenter",
    },
  ];
  dataImg = dataImg.map((item, index) => (
    <ServiceBlockItem item={item} key={index} />
  ));
  return <> {dataImg} </>;
}
function ServiceBlockItem(props) {
  return (
    <div className="service__hotel--block mt-5 col-12 col-lg-6 col-xl-4">
      <img src={props.item.src} alt={props.item.title} />
      <div className="service__hotel--above">
        <EdgeTop />
        <h1>{props.item.title}</h1>
        <EdgeBottom />
      </div>
    </div>
  );
}
