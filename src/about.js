import { CircularProgress, Grid, Typography } from '@mui/material';
import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <Grid container sx={{ px: 3 }}>
        <Grid md="6" textAlign="center" sx={{ mx: "auto", mt: 5 }}>
          <Typography paragraph={true}>This is the about page</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default About;
