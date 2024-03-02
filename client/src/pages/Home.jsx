import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostForm from "../components/PostForm/PostForm";
import Posts from "../components/Posts/Posts";
import Navbar from "../components/Navbar/Navbar";
import { getUserPosts } from "../redux/post/postAction";


function Home() {
  const { id, currentPost: post } = useSelector((state) => state.updatePost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  return (
    <div className="max-w-[1280px] mx-auto m-3 box-border">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 m-3">
        <div className="grid col-span-2 md:grid-cols-2 gap-4 justify-center md:justify-normal">
          <Posts />
        </div>
        <div>
          <PostForm id={id} post={post} />
        </div>
      </div>
    </div>
  );
}

export default Home;
