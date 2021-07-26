import EdgeBottom from "../HomePage/edge";
import EdgeTop from "../HomePage/edgeTop";
export default function TitleBlock(props) {
  return (
    <>
      {props.top === "true" ? <EdgeTop /> : ""}
      <h4 className="subtitle pt-5">{props.subtitle}</h4>
      <h2 className="title">{props.title}</h2>
      <EdgeBottom />
    </>
  );
}
