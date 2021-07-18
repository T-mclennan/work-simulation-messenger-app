import React from 'react'
import {
  Grid,
  Box,
  Typography,
  Hidden,
  makeStyles
} from "@material-ui/core";
import bgImage from '../../assets/bg-img.png';
import { ReactComponent as MySvg } from '../../assets/bubble.svg';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(33, 125, 254, 0.85), rgba(113, 172, 255, 0.85)), url(${bgImage})`,
    height: '90vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'start',
    alignItems: "center",
    color: '#fff', 
    paddingTop: 190,
    padding: 10,
    overflow: 'hidden',
  },

  text: {
    textAlign: 'center',
    letterSpacing: 0.32,
    fontWeight: "light",
    lineHeight: 1.5,
  },

}));

function AuthLayout({children}) {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={5} md={5}>
            <Box className={classes.hero}>
              <MySvg style={{marginBottom: '2rem'}}/>
              <Typography className={classes.text} variant="h5">Convese with anyone</Typography>
              <Typography className={classes.text} variant="h5">with any language</Typography>
            </Box>
          </Grid>
        </Hidden>
        {children}
      </Grid>
    </>
  )
}

export default AuthLayout;
