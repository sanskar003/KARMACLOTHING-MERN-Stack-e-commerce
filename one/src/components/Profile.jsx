import React from "react";
import { useSelector } from "react-redux";
import AuthStatus from "./AuthStatus";
import { Link } from "react-router-dom";
import { API_URL } from "@/config/api";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="pageStructure p-4 sm:p-6">
      {user ? (
        <>
          {/* Heading + Edit */}
          <div className="flex items-center justify-center gap-3 py-6 sm:py-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[title] text-center">
              PROFILE
            </h1>
            <Link
              to={"/personal-info"}
              className="flex items-center justify-center rounded p-2 transition duration-300 ease-in-out hover:bg-emerald-300 hover:text-zinc-500 hover:rounded-4xl hover:shadow-lg active:scale-95"
              title="Edit Profile"
            >
              <img
                className="w-8 h-8 sm:w-10 sm:h-10 object-cover"
                src="https://img.icons8.com/?size=100&id=MwVZMMNQUKqR&format=png&color=000000"
                alt="editProfile"
              />
            </Link>
          </div>

          {/* Avatar + Info */}
          <div className="flex flex-col items-center">
            {user.avatar ? (
              <img
                className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-50 md:h-50 object-cover my-6"
                src={`${API_URL}${user.avatar}`}
                alt="Avatar"
              />
            ) : (
              <img
                className="w-24 h-24 sm:w-32 sm:h-32 my-6"
                src="https://img.icons8.com/?size=100&id=JOzPdFXJKESy&format=png&color=000000"
                alt="Default Avatar"
              />
            )}

            {/* User Info */}
            <div className="flex flex-col gap-4 font-[title] w-full max-w-3xl">
              {/* Username + Email */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <p className="text-lg sm:text-2xl md:text-3xl border-b-2 border-amber-500 px-2 py-1 rounded text-center">
                  <span className="text-zinc-500">username</span> :{" "}
                  {user.username}
                </p>
                <p className="text-lg sm:text-2xl md:text-3xl border-b-2 border-amber-500 px-2 py-1 rounded text-center">
                  <span className="text-zinc-500">email</span> : {user.email}
                </p>
              </div>

              {/* Address */}
              {user.address && (
                <>
                  <div className="flex justify-center">
                    <p className="text-lg sm:text-2xl md:text-3xl border-b-2 border-amber-500 px-2 py-1 rounded text-center">
                      <span className="text-zinc-500">street</span> :{" "}
                      {user.address.street}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <p className="text-lg sm:text-2xl md:text-3xl border-b-2 border-amber-500 px-2 py-1 rounded text-center">
                      <span className="text-zinc-500">city</span> :{" "}
                      {user.address.city}
                    </p>
                    <p className="text-lg sm:text-2xl md:text-3xl border-b-2 border-amber-500 px-2 py-1 rounded text-center">
                      <span className="text-zinc-500">state</span> :{" "}
                      {user.address.state}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <p className="text-lg sm:text-2xl md:text-3xl border-b-2 border-amber-500 px-2 py-1 rounded text-center">
                      <span className="text-zinc-500">zip code</span> :{" "}
                      {user.address.zipcode}
                    </p>
                    <p className="text-lg sm:text-2xl md:text-3xl border-b-2 border-amber-500 px-2 py-1 rounded text-center">
                      <span className="text-zinc-500">phone no</span> :{" "}
                      {user.address.phone}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Logout at the end */}
          <div className="flex justify-end items-center mt-8">
            <AuthStatus />
          </div>
        </>
      ) : (
        <p className="min-h-[40vh] flex justify-center items-center text-lg sm:text-2xl md:text-3xl font-[title] text-center">
          Please{" "}
          <Link to={"/login"} className="font-bold px-2 text-amber-700">
            login
          </Link>{" "}
          to view your profile.
        </p>
      )}
    </div>
  );
};

export default Profile;
