import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 1200,
});
export default function Reward(props) {
  return (
    <div className="reward__item mb-4 col-12 col-md-6 col-lg-4">
      <p className="name__reward">
        Best Seaside
        <br />
        Hotel Award
      </p>
      <p className="time__reward">2010</p>
      <p className="place__reward">EUROPEAN HOTEL ASSOCIATION</p>
    </div>
  );
}
