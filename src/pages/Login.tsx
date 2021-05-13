import React, { useState, useContext } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

// Import images
import placeholder from "../images/placeholder.png";

// Create logo font
const font = "'Dancing Script', cursive";
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Dancing Script", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    login: {
      display: "flex",
      height: "100vh",
    },
    main_image: {
      maxWidth: "100%",
      paddingRight: "50px",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)",
      ["@media (max-width:800px)"]: {
        display: "none",
      },
    },
    login_container: {
      display: "flex",
      margin: "auto",
    },
    login_form: {
      padding: "40px 50px 40px 50px",
      width: "300px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      borderStyle: "solid",
      borderWidth: "thin",
      borderColor: "lightGray",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)",
    },
    login_form_item: {
      paddingTop: "10px",
      textAlign: "center",
    },
    signup_word: {
      fontWeight: "bold",
      color: "blue",
      textDecoration: "none",
    },
    header_brand_word: {
      fontSize: "50px",
    },
    img_container: {},
    login_btn: {},
    login_form_container: {},
  })
);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);

  // Log a user in
  const history = useHistory();
  async function login(e: any) {
    e.preventDefault();
    try {
      const loginData = {
        username,
        password,
      };

      await axios.post("http://localhost:4000/auth/login", loginData);
      getLoggedIn();
      history.push("/home");
    } catch (err) {
      if (!username || !password) {
        alert("Incorrect username or password.");
      } else {
        alert(err);
      }
      console.error(err);
    }
  }

  const classes = useStyles();
  return (
    <div className={classes.login}>
      <div className={classes.login_container}>
        <div className={classes.img_container}>
          <img className={classes.main_image} src={placeholder}></img>
        </div>
        <div className={classes.login_form_container}>
          <div className={classes.login_form}>
            <div className={classes.login_form_item}>
              <ThemeProvider theme={theme}>
                <Typography className={classes.header_brand_word}>
                  Posted
                </Typography>
              </ThemeProvider>
            </div>
            <div className={classes.login_form_item}>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                autoComplete="off"
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
            </div>
            <div className={classes.login_form_item}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="off"
                id="password outlined-basic"
                label="Password"
                variant="outlined"
              />
            </div>
            <div className={classes.login_form_item}>
              <Button
                onClick={login}
                className={classes.login_btn}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </div>
            <div className={classes.login_form_item}>
              <p>
                Don't have an account?{" "}
                <a href="/signup" className={classes.signup_word}>
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
