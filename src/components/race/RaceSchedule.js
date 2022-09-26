import style from "./RaceSchedule.module.scss";

const RaceSchedule = (props) => {
  return (
    <div className="card-body">
      <h4 className="mb-3">Schedule</h4>
      <div className="d-sm-flex pb-md-3">
        <div className={style["raceSchedule_practice"]}>
          <p>
            <strong>FP1:</strong> {props.schedule.fp1}
          </p>
          <p>
            <strong>FP2:</strong> {props.schedule.fp2}
          </p>
          {props.schedule.fp3 && (
            <p className="mb-0">
              <strong>FP3:</strong> {props.schedule.fp3}
            </p>
          )}
          {props.schedule.sprintRace && (
            <p>
              <strong>Sprint:</strong> {props.schedule.sprintRace}
            </p>
          )}
        </div>
        <div className={style["raceSchedule_race"]}>
          <p>
            <strong>Qualifying:</strong> {props.schedule.quali}
          </p>
          <p className="">
            <strong>Race:</strong> {props.schedule.raceTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RaceSchedule;
