import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../race/Race";
import Button from "react-bootstrap/Button";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [lastRount, setLastRound] = useState([]);

  useEffect(() => {
    const endpoints = [
      `https://ergast.com/api/f1/current.json`,
      `https://ergast.com/api/f1/current/last/results.json`,
    ];
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      ([{ data: currentSeason }, { data: lastRaceResult }]) => {
        setEvents(currentSeason.MRData.RaceTable.Races);
        setLastRound(+lastRaceResult.MRData.RaceTable.round + 1);
      }
    );
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto pt-3">
          <Button
            className="mx-auto d-block"
            href={`#${lastRount}`}
            variant="primary"
          >
            Next Race
          </Button>
        </div>
      </div>
      {events.map((event) => {
        return <Event key={event.raceName} event={event} />;
      })}
    </div>
  );
};

export default Calendar;
