import { CircularProgress, Grid, Typography } from "@mui/material";
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <Grid container sx={{ px: 3 }}>
        <Grid md="6" textAlign="center" sx={{ mx: "auto", mt: 5 }}>
          <Typography paragraph={true}>This is the about page</Typography>
        </Grid>
        <Grid item lg={7} md={8} xs={12} textAlign="center" pb={2}>
          <NavLink to={"/"}>
            Home
          </NavLink>
        </Grid>
      </Grid>
    );
  }
}

export default About;
