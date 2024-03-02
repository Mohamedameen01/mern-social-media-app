import { useSelector } from "react-redux";

import Post from "./post/Post";
import PostLoader from "../Loader/PostLoader";

function Posts() {
  const posts = useSelector((state) => state.posts);

  return posts.length ? (
    posts.map((post) => (
      <div key={post._id}>
        <Post post={post} />
      </div>
    ))
  ) : (
    <PostLoader />
  );
}

export default Posts;
