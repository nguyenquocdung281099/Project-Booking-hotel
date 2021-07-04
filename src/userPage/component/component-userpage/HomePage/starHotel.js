export default function StarHotel() {
  let data1 = [
    "90 Luxury Rooms",
    "120 Family Rooms",
    "340 Standart Rooms",
    "10 Restaurants and Bars",
    " 2 Parking Spaces",
  ];
  let data2 = [
    "1 Spa Center",
    "4 Fitness Halls",
    "3 Conference Halls",
    "5 Swimming Pools",
    "1 Beauty Center",
  ];
  data1 = data1.map((item, index) => {
    return (
      <div key="index" className="start__hotel--item">
        <i class="fas fa-star mr-1"></i>
        {item}
      </div>
    );
  });
  data2 = data2.map((item, index) => {
    return (
      <div key="index" className="start__hotel--item">
        <i class="fas fa-star mr-1"></i>
        {item}
      </div>
    );
  });

  return (
    <div className="start__hotel row">
      <div className="col-12 col-md-6">{data1}</div>
      <div className="col-12 col-md-6">{data2}</div>
    </div>
  );
}
