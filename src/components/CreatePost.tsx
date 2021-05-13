import React, { useState } from "react";
import { createStyles, Theme, makeStyles, Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    create_post_container: {
      padding: "10px",
      width: "600px",
      height: "145px",
      backgroundColor: "white",
      border: "solid",
      borderWidth: "thin",
      borderColor: "lightGray",
      ["@media (max-width:650px)"]: {
        width: "100%",
        borderRight: "none",
        borderLeft: "none",
      },
    },
    create_post_header: {
      fontWeight: "bold",
    },
    create_comment: {
      paddingTop: "10px",
    },
    create_comment_textfield: {
      width: "100%",
      height: "50px",
      border: "solid",
      borderWidth: "thin",
      borderColor: "lightGray",
      color: "black",
      paddingLeft: "10px",
      outline: "none",
    },
    post_btn_container: {
      paddingTop: "10px",
      justifyContent: "space-between",
      display: "flex",
      width: "100%",
    },
    create_post_btn: {
      fontSize: "12px",
      position: "static",
    },
    create_post_btn_container: {},
    add_file_btn_container: {
      paddingTop: "4px",
    },
  })
);

interface CreatePostInterface {
  getPosts: any;
}

function CreatePost({ getPosts }: CreatePostInterface) {
  const classes = useStyles();
  const [postName, setPostName] = useState("Poster44");
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState<any>("");

  function updatePostImage(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPostImage(reader.result);
    };
  }

  async function uploadImage(e: any) {
    e.preventDefault();
    if (!postImage) {
      return;
    }

    try {
      const postData = {
        postName: postName,
        postDescription: postDescription,
        postImage: postImage,
      };

      await axios.post("http://localhost:4000/post/", postData);
      getPosts();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.create_post_container}>
      <div className={classes.create_post_header}>Create New Post</div>
      <div className={classes.create_comment}>
        <form>
          <input
            className={classes.create_comment_textfield}
            onChange={(e) => {
              setPostDescription(e.target.value);
            }}
            value={postDescription}
            type="text"
            placeholder="Add a description..."
            required
          ></input>
        </form>
      </div>
      <div className={classes.post_btn_container}>
        <div className={classes.add_file_btn_container}>
          <form action="/" encType="multipart/form-data" method="POST">
            <input
              onChange={updatePostImage}
              type="file"
              name="postImage"
              id="postImage"
              required
            ></input>
          </form>
        </div>
        <div className={classes.create_post_btn_container}>
          <Button
            disableRipple
            className={classes.create_post_btn}
            onClick={uploadImage}
            variant="contained"
            color="primary"
          >
            CREATE POST
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
