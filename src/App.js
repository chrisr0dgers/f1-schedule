import React, { useState, useEffect } from "react";
import Calendar from "./components/calendar/calendar";
import "./App.scss";

function App() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center pt-3">
          <div className="col-md-3 col-6">
            {dateState.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div className="col-md-3 col-6 text-end">
            {dateState.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false,
            })}
          </div>
        </div>
      </div>
      <Calendar />
    </div>
  );
}

export default App;
