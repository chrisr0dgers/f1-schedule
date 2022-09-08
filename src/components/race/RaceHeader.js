const RaceHeader = (props) => {
  return (
    <div className="card-body">
      <div>
        <h2>{props.country}</h2>
        <p>{props.circuitName}</p>
      </div>
      <div>Date: {props.date}</div>
      <div>Race: {props.raceTime}</div>
      <hr />
    </div>
  );
};

export default RaceHeader;
