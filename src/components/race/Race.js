import React, { useState, useEffect } from "react";
import axios from "axios";
import RaceHeader from "./RaceHeader";
import style from "./race.module.scss";
import RaceResult from "./RaceResult";
import RaceSchedule from "./RaceSchedule";

const Race = (props) => {
  const [raceResult, setraceResult] = useState([]);
  const [constructorsStanding, setConstructorsStanding] = useState([]);
  const [championshipStanding, setChampionshipStanding] = useState([]);

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
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
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
      );
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
    <div className={'"row"'}>
      {/* eslint-disable-next-line */}
      <a name={props.event.round}></a>
      <div
        className={`${
          isInThePast() && style.race_pastEvent
        } col-md-6 mx-auto card my-3`}
      >
        <RaceHeader
          country={props.event.Circuit.Location.country}
          circuitName={props.event.Circuit.circuitName}
          date={eventDateRange}
        />
        <div className="d-sm-flex flex-fill">
          {/* {!isInThePast() && <RaceSchedule schedule={raceSchedule} />} */}
          <RaceSchedule schedule={raceSchedule} />

          {isInThePast() && raceResult.Results !== undefined && (
            <RaceResult
              raceName={props.event.raceName}
              result={raceResult.Results}
              championship={championshipStanding}
              constructors={constructorsStanding}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Race;
