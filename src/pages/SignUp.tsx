import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { TextField, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

// Create logo font
const font = "'Dancing Script', cursive";
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Dancing Script", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signup: {
      height: "100vh",
    },
    signup_container: {
      padding: "40px 50px 40px 50px",
      width: "400px",
      backgroundColor: "white",
      margin: "auto",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)",
      borderStyle: "solid",
      borderWidth: "thin",
      borderColor: "lightGray",
      display: "flex",
      flexDirection: "column",
    },
    signup_form_item: {
      paddingTop: "10px",
      textAlign: "center",
    },
    header_brand_word: {
      fontSize: "50px",
    },
    login_word: {
      fontWeight: "bold",
      color: "blue",
      textDecoration: "none",
    },
  })
);

function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);

  // Create a new user
  const history = useHistory();
  const createUser = async (e: any) => {
    e.preventDefault();
    try {
      const createUserData = {
        email,
        fullname,
        username,
        password,
      };

      await axios.post("http://localhost:4000/auth", createUserData);
      getLoggedIn();
      history.push("/home");
    } catch (err) {
      if (!email || !fullname || !username || !password) {
        alert("Please enter all required fields.");
      } else {
        alert("An account with this email already exists.");
      }
      console.error(err);
    }
  };

  return (
    <div className={classes.signup}>
      <div className={classes.signup_container}>
        <div className={classes.signup_form_item}>
          <ThemeProvider theme={theme}>
            <Typography className={classes.header_brand_word}>
              Posted
            </Typography>
          </ThemeProvider>
        </div>
        <div className={classes.signup_form_item}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </div>
        <div className={classes.signup_form_item}>
          <TextField
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
          />
        </div>
        <div className={classes.signup_form_item}>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
        </div>
        <div className={classes.signup_form_item}>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
        </div>
        <div className={classes.signup_form_item}>
          <Button onClick={createUser} variant="contained" color="primary">
            SIGN UP
          </Button>
        </div>
        <div className={classes.signup_form_item}>
          <p>
            Already have an account?
            <br />
            <a href="/login" className={classes.login_word}>
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
