import { useState } from "react";

export default function CounterNumber(props) {
  let [number, setnumber] = useState(0);
  const a = setInterval(() => {
    setnumber(number + 3);
  }, 1000);
  if (number >= parseInt(props.max)) {
    clearInterval(a);
  }
  return (
    <div>
      <h1 className="number">{number}</h1>
    </div>
  );
}
