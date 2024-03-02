import { useRef } from "react";
import { useDispatch } from "react-redux";

import { removeUserProfile } from "../../redux/auth/authAction";

function ProfileImage({ obj, update, dataToParent, funcToChild }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")).data;
  
  const fileRef = useRef(null);
  const maxSize = 5 * 1024 * 1024;
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size < maxSize) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          dataToParent(fileReader.result);
        };
        update(!obj);
      } else console.log("File should be less than 5mb.");
    } else console.log("File should be image file.");
  };

  const handleRemove = () => {
    funcToChild(user);
    update(!obj);
  };

  return (
    <div className="absolute">
      <div className="grid gap-4  bg-slate-800 text-white text-center p-4 rounded-lg">
        <div className="text-sm md:text-lg border-b-2 border-gray-500  p-2 font-semibold ">
          Change profile photo
        </div>
        <div
          onClick={() => fileRef.current.click()}
          className="text-xs md:text-sm border-b-2 border-gray-500 hover:border-white p-2 text-cyan-300 font- cursor-pointer"
        >
          Upload photo
          <input type="file" hidden ref={fileRef} onChange={handleChange} />
        </div>
        <div
          onClick={handleRemove}
          className="text-xs md:text-sm border-b-2 border-gray-500 hover:border-white p-2 text-red-600 font-semibold cursor-pointer"
        >
          Remove current photo
        </div>
        <div
          onClick={() => update(!obj)}
          className="text-xs md:text-sm text-slate-300 hover:text-white font-medium cursor-pointer"
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
