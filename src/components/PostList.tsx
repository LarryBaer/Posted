import React from "react";
import Post from "../components/Post";

interface PostInterface {
  posts: any;
}

function PostList({ posts }: PostInterface) {
  function renderPosts() {
    return posts.map((post: any, i: any) => {
      return (
        <Post
          postName={post.postName}
          postDescription={post.postDescription}
          postImage={post.postImage}
          key={i}
        />
      );
    });
  }

  return <div>{renderPosts()}</div>;
}

export default PostList;
