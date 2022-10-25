import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import RaceHeader from "./RaceHeader";
import style from "./race.module.scss";
import RaceResult from "./RaceResult";
import RaceSchedule from "./RaceSchedule";
import { CircularProgress, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";

const Race = (props) => {
  const [raceResult, setraceResult] = useState([]);
  const [constructorsStanding, setConstructorsStanding] = useState([]);
  const [championshipStanding, setChampionshipStanding] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const endpoints = [
    // Results for current round
    `https://ergast.com/api/f1/2022/${props.event.round}/results.json`,
    // Driver standings for current round
    `https://ergast.com/api/f1/2022/${props.event.round}/driverStandings.json`,
    // Contructor standing for current round
    `https://ergast.com/api/f1/2022/${props.event.round}/constructorStandings.json`,
  ];

  // Get race result if event has passed
  useEffect(() => {
    if (isInThePast()) {
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then(
          ([
            { data: results },
            { data: driverStandings },
            { data: constructorStandings },
          ]) => {
            setraceResult(results.MRData.RaceTable.Races[0]);
            setChampionshipStanding(
              driverStandings.MRData.StandingsTable.StandingsLists[0]
                .DriverStandings
            );
            setConstructorsStanding(
              constructorStandings.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings
            );
          }
        )
        .finally(() => setIsLoaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine if race has already been run
  const isInThePast = () => {
    const raceDate = new Date(`${props.event.date}T${props.event.time}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return raceDate < today;
  };

  var eventDateRange = `${new Date(
    `${props.event.FirstPractice.date}`
  ).getDate()}-${new Date(`${props.event.date}`).getDate()} ${new Date(
    `${props.event.date}`
  ).toLocaleString("default", { month: "short" })}`;

  // Format time
  const getTime = (time) => {
    return new Date(`${props.event.date}T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Race schedule
  var raceSchedule = {
    fp1: getTime(props.event.FirstPractice.time),
    fp2: getTime(props.event.SecondPractice.time),
    ...(props.event.ThirdPractice && {
      fp3: getTime(props.event.ThirdPractice.time),
    }),
    quali: getTime(props.event.Qualifying.time),
    ...(props.event.Sprint && { sprintRace: getTime(props.event.Sprint.time) }),
    raceTime: getTime(props.event.time),
  };

  return (
    <Grid item lg={7} md={8} xs={12} className={`row ${style.race}`}>
      {/* eslint-disable-next-line */}
      <a name={props.event.round}></a>

      <Card
        className={`${isInThePast() && style.race_pastEvent} mx-auto my-3 p-3`}
        variant="outlined"
      >
        <RaceHeader
          country={props.event.Circuit.Location.country}
          circuitName={props.event.Circuit.circuitName}
          date={eventDateRange}
        />
        <div className="d-sm-flex flex-fill">
          <RaceSchedule schedule={raceSchedule} />

          {isInThePast() && (
            <Box
              flex="auto"
              justifyContent="center"
              alignItems="center"
              sx={{ display: isLoaded ? "none" : "flex" }}
            >
              <CircularProgress />
            </Box>
          )}
          {isInThePast() && raceResult.Results !== undefined && (
            <Box
              flex="auto"
              sx={{ display: !isLoaded ? "none" : "flex" }}
            >
              <RaceResult
                raceName={props.event.raceName}
                result={raceResult.Results}
                championship={championshipStanding}
                constructors={constructorsStanding}
              />
            </Box>
          )}
        </div>
      </Card>
    </Grid>
  );
};

export default Race;
