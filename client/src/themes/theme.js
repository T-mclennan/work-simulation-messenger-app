import { createTheme, makeStyles } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
  }
});

export const useAuthStyles = makeStyles((theme) => ({
  headerBox: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-end",
    width: '100%',
    alignItems: "center",
  },

  formBox: {
    width: 60,
    backgroundColor: 'lightgray'
  },

  accentText: {
    color: 'rgb(189, 189, 189)',
  },

  navButton: {
    width: '10rem',
    height: '3.5rem',
    marginLeft: '3rem',
    color: '#3A8DFF',
    boxShadow: '0 2px 20px 0 rgba(88, 133, 196, 0.2)',
    transition: 'all 0.3s linear',
    '&:hover': {
      color: 'rgba(148, 9, 69, 0.8)',
      boxShadow: '0 2px 20px 0 rgba(88, 133, 196, 0.4)',
    }
  }, 

  actionButton: {
    width: '10rem',
    height: '3.5rem',
    backgroundColor: '#3A8DFF',
    color: 'white',
    transition: 'all 0.2s linear',
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 60,
    boxShadow: '0 2px 20px 0 rgba(88, 133, 196, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(148, 9, 69, 0.8)',
      boxShadow: '0 2px 20px 0 rgba(88, 133, 196, 0.4)',
    }
  },

  pageContainer: {
    height: '100%',
    padding: 35,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  contentBox: {
    width: '80%',
    maxWidth: 450,
    marginTop: 90,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
  },

  textField: {
    width: '100%'
  },
}))