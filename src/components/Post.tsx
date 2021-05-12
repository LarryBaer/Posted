import React, {useState} from "react";
import { createStyles, Theme, makeStyles, IconButton } from "@material-ui/core";

// Import icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    post_container: {
      paddingBottom: "60px",
    },
    post: {
      width: "600px",
      backgroundColor: "white",
      borderStyle: "solid",
      borderWidth: "thin",
      borderColor: "lightGray",
      ["@media (max-width:650px)"]: {
        width: "100%",
        borderRight: "none",
        borderLeft: "none",
      },
    },
    post_header: {
      height: "50px",
      display: "flex",
    },
    post_header_name: {
      fontWeight: "bold",
      paddingTop: "14px",
      paddingLeft: "5px",
    },
    post_image_container: {},
    post_image: {
      minWidth:"100%",
      maxWidth: "100%",
      ["@media (max-width:650px)"]: {
        width: "100%",
      },
    },
    post_buttons: {
      height: "50px",
      paddingBottom: "50px",
    },
    post_description_container: {
      maxWidth: "100%",
      padding: "0px",
      margin: "0px",
    },
    post_description: {
      margin: "0px",
      padding: "10px",
    },
    create_comment: {
      paddingTop: "10px",
      height: "100%",
    },
    create_comment_textfield: {
      width: "100%",
      height: "50px",
      border: "none",
      borderTop: "solid",
      borderWidth: "thin",
      borderColor: "lightGray",
      color: "black",
      paddingLeft: "10px",
      outline: "none",
    },
    post_btn: { color: "black", position: "static" },
  })
);

interface PostInterface2{
  postName:any,
  postDescription:any,
  postImage:any,
}

function Post({postName, postDescription, postImage}: PostInterface2) {
  const classes = useStyles();
  return (
    <div className={classes.post_container}>
      <div className={classes.post}>
        <div className={classes.post_header}>
          <IconButton className={classes.post_btn}>
            <AccountCircleIcon />
          </IconButton>
          <div className={classes.post_header_name}>{postName}</div>
        </div>
        <div className={classes.post_image_container}>
          <img className={classes.post_image} src={postImage} alt="Post Image"></img>
        </div>
        <div className={classes.post_buttons}>
          <IconButton disableRipple className={classes.post_btn}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton disableRipple className={classes.post_btn}>
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton>
          <IconButton disableRipple className={classes.post_btn}>
            <BookmarkBorderIcon />
          </IconButton>
        </div>
        <div className={classes.post_description_container}>
          <p className={classes.post_description}>
              {postDescription}
          </p>
        </div>
        <div className={classes.create_comment}>
          <form>
            <input
              className={classes.create_comment_textfield}
              type="text"
              placeholder="Add a comment..."
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
