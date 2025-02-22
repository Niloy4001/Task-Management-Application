import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import logo from "../../public/vite.png";

import sun from '../../public/sun.png'
import moon from '../../public/moon.png'

export default function Navbar() {
  const { user, logOut,theme,setTheme } = useContext(AuthContext);
  console.log(theme);
  
  const handleLogout = async () => {
    await logOut();
  };
  console.log(user.email);
  console.log(user.photoURL);


    // use theme from local storage if available or set light theme
    // const [theme, setTheme] = useState(
    //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    // );
  
    // update state on toggle
    const handleToggle = (e) => {
      if (e.target.checked) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };
  
    // set theme state in localstorage on mount & also update localstorage on state change
    useEffect(() => {
      localStorage.setItem("theme", theme);
      const localTheme = localStorage.getItem("theme");
      // add custom data-theme attribute to html tag required to update theme using DaisyUI
      document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);


  return (
    <div className="bg-gray-900 text-white sticky top-0 z-10">
      <div className="navbar  shadow-sm w-[90%] mx-auto">
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <img src={logo} alt="" />
          <h1 className="font-bold text-2xl">TaskMA</h1>
        </div>
      </div>
      <div className="flex gap-2">
        {/* <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        /> */}
        <h1 className="md:flex justify-center items-center text-2xl font-bold mr-2 hidden ">
          {user?.displayName}
        </h1>
        <button className="">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={handleToggle}
              // show toggle image based on localstorage theme
              checked={theme === "light" ? false : true}
            />
            {/* light theme sun image */}
            <img src={sun} alt="light" className="w-8 h-8 swap-on" />
            {/* dark theme moon image */}
            <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
          </label>
        </button>
        <div className="dropdown dropdown-end flex items-center">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li className="md:hidden">
              <h1 className=" justify-center items-center text-xl font-bold">
                {user?.displayName}
              </h1>
            </li>
            <li>
              <button className="btn btn-md" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
