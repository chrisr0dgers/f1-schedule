import React, { useState, useEffect } from "react";
import Event from "../race/Race";

const Calendar = () => {
  const [events, setEvents] = useState([]);
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

  return (
    <div className="container">
      {events.map((event) => {
        return <Event key={event.raceName} event={event} />;
      })}
    </div>
  );
};

export default Calendar;
