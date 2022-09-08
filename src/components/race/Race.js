import React, { useState, useEffect } from "react";
import EventHeader from "./RaceHeader";

import RaceResult from "./RaceResult";
import RaceSchedule from "./RaceSchedule";

const Race = (props) => {
  const [raceResult, setraceResult] = useState([]);
  const [constructorsStanding, setConstructorsStanding] = useState([]);
  const [championshipStanding, setChampionshipStanding] = useState([]);

  // Determine if race has already been run
  const isInThePast = (date) => {
    const raceDate = new Date(`${props.event.date} ${props.event.time}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return raceDate < today;
  };

  var eventDateRange = `${new Date(
    `${props.event.FirstPractice.date}`
  ).getDate()}-${new Date(`${props.event.date}`).getDate()} ${new Date(
    `${props.event.date}`
  ).toLocaleString("default", { month: "short" })}`;

  // Get race result if event has passed
  useEffect(() => {
    if (isInThePast()) {
      // Race result
      fetch(`https://ergast.com/api/f1/2022/${props.event.round}/results.json`)
        .then((response) => response.json())
        .then((data) => {
          setraceResult(data.MRData.RaceTable.Races[0]);
        })
        .catch((err) => {
          console.log(err.message);
        });

      // Championship standings after race
      fetch(
        `http://ergast.com/api/f1/2022/${props.event.round}/driverStandings.json`
      )
        .then((response) => response.json())
        .then((data) => {
          setChampionshipStanding(
            data.MRData.StandingsTable.StandingsLists[0].DriverStandings
          );
        })
        .catch((err) => {
          console.log(err.message);
        });

      // Construtor standings after race
      fetch(
        `http://ergast.com/api/f1/2022/${props.event.round}/constructorStandings.json`
      )
        .then((response) => response.json())
        .then((data) => {
          setConstructorsStanding(
            data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format time
  const getTime = (time) => {
    return new Date(`${props.event.date} ${time}`).toLocaleTimeString([], {
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
  };

  return (
    <div className={'"row"'}>
      <div className="col-md-6 mx-auto card my-3">
        <EventHeader
          country={props.event.Circuit.Location.country}
          circuitName={props.event.Circuit.circuitName}
          date={eventDateRange}
          raceTime={getTime(props.event.time)}
        />
        {!isInThePast() && <RaceSchedule schedule={raceSchedule} />}

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
  );
};

export default Race;
