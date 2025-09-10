import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const AuthStatus = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout()); // Clears user session and removes token
  };

  return (
    <div className="px-2">
      {isLoggedIn ? (
        <>
          {/* <p>{user?.username}</p>
          <p>{user?.avatar && <img src={`${API_URL}${user.avatar}`}  alt="Avatar" width="50" height="50" />}</p> */}
          <button
            className="rounded p-1 transition duration-300 ease-in-out  hover:bg-red-300  hover:text-zinc-500  hover:rounded-4xl  hover:shadow-lg active:scale-95"
            onClick={handleLogout}
          >
            <img
              title="Logout"
              className="w-10 h-10 object-cover"
              src="https://img.icons8.com/?size=100&id=j8vtslxN0LJo&format=png&color=000000"
              alt="logout"
            />
          </button>
        </>
      ) : (
        <div className="flex items-center space-x-2 px-3 py-2 transition duration-300 ease-in-out font-serif hover:bg-[#e2c099] hover:rounded-xl  hover:shadow-lg active:scale-95">
          <a href="/login">
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/?size=100&id=uzTBQdp9ZQly&format=png&color=000000"
              alt="import"
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;
