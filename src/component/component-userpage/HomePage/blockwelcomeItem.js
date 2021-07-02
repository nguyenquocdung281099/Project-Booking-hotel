import { Link } from "react-router-dom";
export default function BlockWelcomeItem(props) {
  return (
    <div className="BlockWelcomeItem col-12 col-lg-6 col-xl-4">
      <h1 className="title">{props.title}</h1>
      <img
        class=" mt-2 gem-wrapbox-element img-responsive"
        data-tgpli-src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/2018/11/line2.png"
        alt="gem"
        data-tgpli-inited=""
        id="tgpli-6012fc51950c9"
        src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/2018/11/line2.png"
      />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna. Ut enim ad mini veniam,
        quis nostrud exercitation.
      </p>
      <button className="btn">
        <Link to={`${props.link}`}>LEARN MORE</Link>
      </button>
    </div>
  );
}
