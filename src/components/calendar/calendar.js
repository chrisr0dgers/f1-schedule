import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../race/Race";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [lastRount, setLastRound] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const endpoints = [
      `https://ergast.com/api/f1/current.json`,
      `https://ergast.com/api/f1/current/last/results.json`,
    ];
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(([{ data: currentSeason }, { data: lastRaceResult }]) => {
        setEvents(currentSeason.MRData.RaceTable.Races);
        setLastRound(+lastRaceResult.MRData.RaceTable.round + 1);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto text-center mt-5">
            <Spinner animation="grow" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-md-9 mx-auto px-0 pt-3">
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
