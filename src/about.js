import { Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const About = () => {
  // const urlParams = new URLSearchParams(window.location.search);
  // let author = urlParams.get("author");

  return (
    <Grid container sx={{ px: 3 }}>
      <Grid md="6" textAlign="center" sx={{ mx: "auto", mt: 5 }}>
        <Typography paragraph={true}>This is the about page</Typography>
      </Grid>
      <Grid item lg={7} md={8} xs={12} textAlign="center" pb={2}>
        <NavLink to={"/"}>Home</NavLink>
      </Grid>
    </Grid>
  );
};

export default About;
