import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import NoProfile from "../../images/noprofile.png";
import ProfileImage from "../ProfileImage/ProfileImage";
import {
  removeUserProfile,
  updateUserProfile,
} from "../../redux/auth/authAction";

function EditProfile() {
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    id: "",
    name: "",
    email: "",
    picture: "",
  });
  const [isCliked, setIsClicked] = useState(false);

  const { data } = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (data)
      setInfo({
        id: data._id,
        name: data.name,
        email: data.email,
        picture: data.picture,
      });
  }, [dispatch]);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(!isCliked);
  };

  const handleDataFromChild = (data) => setInfo({ ...info, picture: data });
  const handleRemoveProfile = (data) => dispatch(removeUserProfile(data));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(info));
  };

  return (
    <div className="max-w-xl mx-auto relative flex justify-center items-center">
      <div
        className={
          isCliked
            ? "blur-sm w-full grid gap-5 text-white p-4"
            : "blur-none w-full grid gap-5 text-white p-4"
        }
      >
        <div className="font-bold mt-14">Edit Profile</div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="mt-5"
          autoComplete="off"
          autoCorrect="off"
        >
          <div className="flex justify-between items-center px-3 bg-slate-700 rounded-lg">
            <img
              className="object-fill rounded-full w-10 h-10 md:w-20 md:h-20 m-2"
              src={info.picture ? info.picture : NoProfile}
              alt="profile-image"
            />
            <button
              onClick={handleClick}
              className="w-fit h-fit text-xs md:text-sm px-2 py-1 rounded-lg text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
            >
              Change photo
            </button>
          </div>
          <div className="mt-5 mx-2 font-semibold">Name</div>
          <div className="flex justify-between items-center px-3 py-2 bg-slate-700 mt-3 rounded-lg">
            <input
              className="w-1/2 text-xs md:text-sm m-2 p-2 focus:outline-blue-500 bg-slate-700 outline outline-1 outline-neutral-50 rounded-md"
              type="text"
              name="name"
              placeholder="name"
              value={info?.name}
              onChange={handleChange}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setInfo({ ...info, name: "" });
              }}
              className="w-fit h-fit text-xs md:text-sm rounded-lg px-2 py-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
            >
              Change name
            </button>
          </div>
          <div className="mt-5 mx-2 font-semibold">Email</div>
          <div className="flex justify-between items-center px-3 py-2 bg-slate-700 mt-3 rounded-lg">
            <input
              className="w-1/2 text-xs md:text-sm m-2 p-2 focus:outline-blue-500 bg-slate-700 outline outline-1 outline-neutral-50 rounded-md "
              type="text"
              name="email"
              placeholder="email"
              value={info?.email}
              onChange={handleChange}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setInfo({ ...info, email: "" });
              }}
              className="w-fit h-fit text-xs md:text-sm rounded-lg px-2 py-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
            >
              Change email
            </button>
          </div>
          <div className="flex justify-end mt-5 m-2">
            <button className="text-xs md:text-sm bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br px-6 py-1 text-white text-md font-semibold rounded-lg cursor-pointer">
              Submit
            </button>
          </div>
        </form>
      </div>
      {isCliked && (
        <ProfileImage
          obj={isCliked}
          update={setIsClicked}
          dataToParent={handleDataFromChild}
          funcToChild={handleRemoveProfile}
        />
      )}
    </div>
  );
}

export default EditProfile;
