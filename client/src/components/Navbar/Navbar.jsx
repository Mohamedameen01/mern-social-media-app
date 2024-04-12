import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import LogoutIcon from "@mui/icons-material/Logout";
import { LOGOUT } from "../../redux/auth/actionTypes";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [dropDown, setDropDown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const headingStyle = {
    fontFamily: "Oswald, sans-serif",
    fontOpticalSizing: "auto",
  };

  return (
    <div className="h-[100px] flex justify-between items-center gap-3 m-5 border-2 shadow-lg shadow-indigo-500/50 rounded-lg p-4">
      <div className="">
        <Link to="/">
          <h1
            style={headingStyle}
            className="text-2xl md:text-4xl font-semibold text-gray-950"
          >
            Memories
          </h1>
        </Link>
      </div>
      <div className="grid">
        <div className="flex items-center gap-3">
          <h1 className="hidden md:block capitalize">
            {user?.data?.name || null}
          </h1>
          {user ? (
            <div>
              {user?.data?.picture ? (
                <img
                  className="cursor-pointer rounded-full w-10 h-10"
                  src={user?.data.picture}
                  alt={user?.data.name}
                  onClick={() => setDropDown(!dropDown)}
                />
              ) : (
                <div
                  onClick={() => setDropDown(!dropDown)}
                  className="cursor-pointer rounded-full w-8 h-8 bg-rose-500 text-white text-center pt-1"
                >
                  {user?.data?.name?.charAt(0)}
                </div>
              )}
            </div>
          ) : (
            <button className="bg-blue-600 text-white font-semibold py-1 px-3 rounded-md">
              <Link to="/auth">Sign in</Link>
            </button>
          )}
        </div>
        {user && (
          <div className={dropDown ? "relative" : "hidden"}>
            <div className="w-32 absolute top-0 right-0 truncate bg-white border-slate-800 shadow-lg shadow-black text-slate-800 mt-1 rounded-lg z-10">
              <Link to="/profile">
                <div className="flex items-center gap-2 m-1 px-3 py-1 hover:bg-gray-100 hover:w-full cursor-pointer">
                  {user?.data?.picture ? (
                    <img
                      className="rounded-full w-5 h-5"
                      src={user?.data?.picture}
                      alt={user?.data?.name}
                      onClick={() => setDropDown(!dropDown)}
                    />
                  ) : (
                    <div className="cursor-pointer rounded-full w-5 h-5 bg-rose-500 text-sm text-white text-center">
                      {user.data?.name?.charAt(0)}
                    </div>
                  )}
                  <h1>Profile</h1>
                </div>
              </Link>
              <div
                onClick={handleLogout}
                className="flex gap-2 px-3 py-1 hover:bg-gray-100 hover:w-full text-slate-900 rounded-md"
              >
                <LogoutIcon fontSize="small" />
                <h1>Logout</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
