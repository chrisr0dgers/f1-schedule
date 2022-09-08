const RaceSchedule = (props) => {
  return (
    <div className="card-body">
      <div>FP1: {props.schedule.fp1}</div>
      <div>FP2: {props.schedule.fp2}</div>
      <div>
        {props.schedule.fp3 && <div>FP3: {props.schedule.fp3}</div>}
        {props.schedule.Sprint && <div>Sprint: {props.schedule.sprintRace}</div>}
      </div>
      <div>Qualifying: {props.schedule.quali}</div>
    </div>
  );
};

export default RaceSchedule;
