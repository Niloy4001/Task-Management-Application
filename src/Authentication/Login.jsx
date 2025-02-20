import React, { useContext, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";


const LogIn = () => {
  const { logInByGoogle, logInByEmailPassword, user, setForgotEmail } =
    useContext(AuthContext);

    const navigate = useNavigate()
const handleGoogleLogin = async () => {
    try {
        await logInByGoogle()
        console.log("log in success");
        navigate("/home")

        
        toast.success("Log In successfull")
    } catch (error) {
        // toast.error(error.message)
        console.log("log in failed");
        
    }
    console.log("Google Login Clicked");
  };

return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-6">Welcome</h2>
        <p className="text-gray-500 mb-4">Sign in with Google to continue</p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full p-3 border rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl mr-2" />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default LogIn;
