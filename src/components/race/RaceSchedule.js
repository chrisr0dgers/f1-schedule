import { Box } from "@mui/material";
import style from "./RaceSchedule.module.scss";

const RaceSchedule = (props) => {
  return (
    <Box flex={'auto'}>
      <Box component={'h4'} mb={2}>Schedule</Box>
      <Box sx={{pb: 2, display: {sm:'flex'}}}>
        <div className={style["raceSchedule_practice"]}>
          <p>
            <strong>FP1:</strong> {props.schedule.fp1}
          </p>
          <p>
            <strong>FP2:</strong> {props.schedule.fp2}
          </p>
          {props.schedule.fp3 && (
            <Box component={'p'} mb={0}>
              <strong>FP3:</strong> {props.schedule.fp3}
            </Box>
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
      </Box>
    </Box>
  );
};

export default RaceSchedule;
