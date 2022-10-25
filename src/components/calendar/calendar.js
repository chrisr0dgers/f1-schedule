import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../race/Race";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress } from "@mui/material";

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
      <Grid container sx={{ px: 3 }}>
        <Grid md="6" textAlign="center" sx={{ mx: "auto", mt: 5 }}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid containerjustifyContent="center" sx={{ mx: "auto", px: 3 }}>
      <Grid item lg={7} md={8} xs={12} mt={2}>
        <Button
          sx={{ mx: "auto", display: "block", textAlign: "center" }}
          href={`#${lastRount}`}
          variant="contained"
        >
          Next Race
        </Button>
      </Grid>
      {events.map((event) => {
        return <Event key={event.raceName} event={event} />;
      })}
    </Grid>
  );
};
export default Calendar;
