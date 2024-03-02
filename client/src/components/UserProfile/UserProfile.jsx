import memory from "../../images/memory.jpg";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoProfile from "../../images/noprofile.png";
import { Link } from "react-router-dom";

function UserProfile() {
  const posts = useSelector((state) => state.posts);
  const [isCustomized, setIsCustomized] = useState(false);

  const { data, token } = JSON.parse(localStorage.getItem("profile"));
  
  useEffect(()=> {
    if (token?.length < 500) {
      setIsCustomized(true);
    }
  },[])

  return (
    <div className="max-w-4xl mx-auto py-5 box-border text-white">
      <div className="mx-auto pb-10 grid grid-cols-2 border-b-2 border-slate-400">
        <div className="my-auto mx-auto">
          {data?.picture ? (
            <img
              className="w-20 h-20 md:w-40 md:h-40 rounded-full outline outline-2 outline-offset-0 outline-black shadow-md"
              src={data?.picture}
              alt=""
            />
          ) : (
            <img
              className="w-20 h-20 md:w-40 md:h-40 rounded-full outline outline-3 outline-slate-400"
              src={NoProfile}
              alt=""
            />
          )}
        </div>
        <div className="my-auto">
          <div className="my-1 md:text-xl font-semibold">{data?.name}</div>
          {isCustomized &&<Link to="/edit-profile">
            <div className="my-1 w-fit px-2 py-1 text-sm md:text-md  text-center border border-none bg-slate-600 text-white rounded-lg cursor-pointer hover:bg-slate-900">
              Edit Profile
            </div>
          </Link>}
          <div className="ml-1 my-1 ">{posts?.length} Posts</div>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-center">
          <PhotoSizeSelectActualIcon fontSize="small" />
          <span className="mx-2 uppercase font-bold text-sm tracking-widest">
            Posts
          </span>
        </div>
        <div className="mx-2 mt-5 grid grid-cols-3 gap-3">
          {posts?.map((post) => (
            <img
              key={post._id}
              src={post.imgFile}
              className="h-36 w-36 md:h-56 md:w-56 object-fill  rounded-md hover:opacity-85 hover:shadow-lg dark:hover:shadow-black/30"
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
