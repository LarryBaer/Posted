import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import {
  Typography,
  createStyles,
  Theme,
  makeStyles,
  IconButton,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";

// Import icons
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Create logo font
const font = "'Dancing Script', cursive";
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Dancing Script", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbar: {
      position: "fixed",
      width: "100vw",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0px 100px",
      backgroundColor: "white",
      borderStyle: "solid",
      borderWidth: "thin",
      borderColor: "lightGray",
      height: "70px",
      ["@media (max-width:650px)"]: {
        padding: "0px 20px",
        width: "100vw",
      },
    },
    navbar_items: {
      listStyle: "none",
    },
    navbar_item: {
      display: "inline-block",
      textTransform: "uppercase",
    },
    brand_word_container: {},
    brand_word: {
      cursor: "pointer",
      fontSize: "40px",
    },
    navbar_btn: { color: "black" },
  })
);

function NavBar() {
  const { getLoggedIn } = useContext(AuthContext);

  // Log out
  const history = useHistory();
  async function logOut() {
    await axios.get("http://localhost:4000/auth/logout");
    await getLoggedIn();
    history.push("/login");
  }

  const classes = useStyles();
  return (
    <div className={classes.navbar}>
      <div className={classes.brand_word_container}>
        <ThemeProvider theme={theme}>
          <Typography className={classes.brand_word}>Posted</Typography>
        </ThemeProvider>
      </div>
      <ul className={classes.navbar_items}>
        <li className={classes.navbar_item}>
          <IconButton className={classes.navbar_btn}>
            <HomeIcon />
          </IconButton>
        </li>
        <li className={classes.navbar_item}>
          <IconButton className={classes.navbar_btn}>
            <BookmarkOutlinedIcon />
          </IconButton>
        </li>
        <li className={classes.navbar_item}>
          <IconButton className={classes.navbar_btn}>
            <PeopleIcon />
          </IconButton>
        </li>
        <li className={classes.navbar_item}>
          <IconButton className={classes.navbar_btn}>
            <AccountCircleIcon />
          </IconButton>
        </li>
        <li className={classes.navbar_item}>
          <IconButton onClick={logOut} className={classes.navbar_btn}>
            <ExitToAppIcon />
          </IconButton>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
