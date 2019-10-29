import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import {
  TextField,
  makeStyles,
  Typography,
  Button,
  Grid,
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItem

} from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { LoginContext } from "contexts";
import { notify } from "components";
import { API } from "helpers/index";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import Image from "../../../helpers/img/header.png";

let theme = createMuiTheme({
  palette: {
    primary: { main: "#007D98" },
    secondary: { main: "#11cb5f" },
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.dark,
    },
  },
  body: {
    height: "65vh",
  },
  header: {
    height: "35vh",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
  },
  footer: {
    backgroundColor: "#363635",
    color: "#f0f0f0",
    fontSize: ".3rem"
  },

  creator: {
    fontSize: ".7rem",
    padding: ".5rem"
  },
  
  divider: {
    border: "1px solid #FFD923",
    width: "65%",
    marginLeft: "10%"
  },


  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginBox: {},

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
  },
  developMessage: {},
  inputText: {
    ".MuiInput-underline:after": {
      borderBottom: "2px solid green",
    },
  },
}));

export const Login = () => {
  const classes = useStyles();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const { devMode, loginStatus, setAccessToken } = useContext(LoginContext);

  const performLogin = async () => {
    const data = {
      emailId,
      password,
    };
    const otp = await API.loginEmployer(data, setAccessToken);
    if (!otp) {
      notify("Email or Password are wrong");
    }
  };

  const validationCheck = () => {
    if (devMode) {
      return performLogin();
    }
    if (!loginStatus) {
      const email = emailId;
      const pwd = password;
      let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailPatternTest = emailPattern.test(email);
      if (emailPatternTest && pwd) {
        performLogin();
        return true;
      } else if (emailPatternTest === undefined && pwd === undefined) {
        notify("Email or password must not be empty!");
        return false;
      } else if (!emailPatternTest) {
        notify("Email must not be empty!");
        return false;
      } else if (!emailPatternTest && email.length > 0) {
        notify("Invalid email!");
        return false;
      } else if (!pwd) {
        notify("Password must not be empty!");
        return false;
      }
    }
  };

  let content = (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" className={classes.header}></Grid>
        <Grid
          container
          justify="center"
          alignItems="flex-start"
          className={classes.body}
        >
          <Grid className={classes.loginBox} item xs={11}>
            <form noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmailId(e.target.value)}
                autoFocus
                className={classes.inputText}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </form>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justify="space-between"
            alignItems="center"
            style={{ padding: "3vh 5vw" }}
          >
            <Grid item xs={12} style={{ paddingBottom: "3vh" }}>
              <Button
                fullWidth
                variant="contained"
                className={classes.buttons}
                onClick={validationCheck}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: "3vh" }}>
              <Typography align="center" variant="caption" display="block">
                Or
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: "5vh" }}>
              <Button
                fullWidth
                variant="contained"
                className={classes.buttons}
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.footer}>
          <Grid item xs={12} className={classes.developMessage}>
            <Grid container  item justify="space-between" >
              <Grid
                container
                item
                xs={5}
                direction="column"
                justify="flex-start"
              >
                <List component="nav"  >
                  <ListItem component="a" >
                    <ListItemText primary="Deakin"/>
                  </ListItem>
                  <Divider className={classes.divider}/>
                  <ListItem component="a">
                    <ListItemText secondary="Copyright" />
                  </ListItem>
                  <ListItem component="a">
                    <ListItemText secondary="Disclaimner" />
                  </ListItem>
                  <ListItem component="a">
                    <ListItemText secondary="Privacy" />
                  </ListItem>
                </List>
                <List component="nav">
                  <ListItem component="a">
                    <ListItemText primary="Help" />
                  </ListItem>
                  <Divider className={classes.divider}/>
                  <ListItem component="a">
                    <ListItemText secondary="FAQ" />
                  </ListItem>
                  <ListItem component="a">
                    <ListItemText secondary="Contact" />
                  </ListItem>
                </List>
              </Grid>

              {/* <Grid container item direction="column">
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="primary"
                      align="center"
                    >
                      Deakin Create
                    </Typography>
                  </Grid> */}
              {/* <Grid item xs={6}>
                    <Divider color="primary" light={true}/>
                  </Grid> */}

              {/* <Grid item>1</Grid>
                <Grid item>1</Grid> */}
              <Grid
                container
                item
                xs={5}
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <List component="nav"  >
                  <ListItem component="a" >
                    <ListItemText primary="Follow Us" className={classes.footer}/>
                  </ListItem>
                  <Divider className={classes.divider}/>
                  <ListItem component="a">
                    <ListItemIcon secondary="Copyright">
                      <FacebookIcon color="primary"/> 
                    </ListItemIcon>
                    <ListItemIcon secondary="Copyright">
                      <InstagramIcon color="primary"/>
                    </ListItemIcon>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Typography variant="body2"  align="left" className={classes.creator}>
              Developed by Deakin Launchpad
            </Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
  return content;
};
