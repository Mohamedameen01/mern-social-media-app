import { useEffect } from "react";
import { useDispatch } from "react-redux";

import UserProfile from "../components/UserProfile/UserProfile";
import { getUserPosts } from "../redux/post/postAction";

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  return (
    <div className="bg-slate-950  w-full h-screen">
      <UserProfile />
    </div>
  );
}

export default Profile;
