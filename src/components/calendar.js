import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://ergast.com/api/f1/2022.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data.MRData.RaceTable.Races);
        setEvents(data.MRData.RaceTable.Races);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div>
        {events.map((event) => {
          return (
            <div key={event.raceName}>
              <div>{event.raceName}</div>
              <div>{event.date}</div>
              <div>{event.FirstPractice.time}</div>
              <div>{event.SecondPractice.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
