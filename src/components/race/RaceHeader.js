const RaceHeader = (props) => {
  return (
    <div className="card-body d-flex justify-content-between border-bottom">
      <div className="flex-fill">
        <h2>{props.country}</h2>
        <p className="mb-0">{props.circuitName}</p>
      </div>
      <div className="d-flex flex-fill align-items-end justify-content-end">
        <div>
          <p className="mb-0">
            <strong>Date:</strong> {props.date}
          </p>
        </div>
        <div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default RaceHeader;
