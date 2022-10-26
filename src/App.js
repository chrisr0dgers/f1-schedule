import React, { useState, useEffect } from "react";
import Calendar from "./components/calendar/calendar";
import "./App.scss";
import { Grid } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about";

function App() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <Router>
      <div className="App">
        <Grid
          container
          justifyContent="center"
          mx={"auto"}
          mt={2}
          sx={{ px: 3 }}
        >
          <Grid item xs={6} md={4}>
            {dateState.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Grid>
          <Grid item xs={6} md={4} textAlign="right">
            {dateState.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            })}
          </Grid>
        </Grid>
        <Routes>
          <Route exact path="/" element={<Calendar />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
