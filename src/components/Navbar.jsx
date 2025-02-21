import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Navbar() {
    const {user,logOut} = useContext(AuthContext)
    const handleLogout = async() =>{
        await logOut();
    }
    console.log(user.email);
    console.log(user.photoURL);
    
  return (
    <div className="navbar bg-base-100 shadow-sm w-[90%] mx-auto">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl">TaskMA</Link>
      </div>
      <div className="flex gap-2">
        {/* <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        /> */}
        <h1 className="flex justify-center items-center text-2xl font-bold mr-2">{user?.displayName}</h1>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoURL}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <button className="btn btn-md" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
