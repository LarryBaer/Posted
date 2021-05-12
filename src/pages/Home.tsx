import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import axios from "axios";

// Import components
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    home: {},
    main_container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "70px",
      margin: "auto",
    },
    create_post: {
      paddingTop: "20px",
      ["@media (max-width:650px)"]: {
        width: "100%",
      },
    },
    posts: {
      paddingTop: "20px",
    },
  })
);

function Home() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const postsRes = await axios.get("http://localhost:4000/post/");
    setPosts(postsRes.data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={classes.home}>
      <Navbar />
      <div className={classes.main_container}>
        <div className={classes.create_post}>
          <CreatePost getPosts={getPosts} />
        </div>
        <div className={classes.posts}>
          <PostList posts={posts} />
          {/* <PostList /> */}
          {/* <Post />
          <Post />
          <Post /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
