import React, { useState, useEffect } from "react";
import Event from "../race/Race";
import Button from "react-bootstrap/Button";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [lastRount, setLastRound] = useState([]);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/2022.json")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.MRData.RaceTable.Races);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    fetch("http://ergast.com/api/f1/current/last/results.json")
      .then((response) => response.json())
      .then((data) => {
        setLastRound(+data.MRData.RaceTable.round + 1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto pt-3">
          <Button className="mx-auto d-block" href={`#${lastRount}`} variant="primary">
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
