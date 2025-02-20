import React, { useContext, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
import { HiOutlineEyeOff } from "react-icons/hi";
import { RiEyeLine } from "react-icons/ri";
import { AuthContext } from "../AuthProvider/AuthProvider";


const LogIn = () => {
  const { logInByGoogle, logInByEmailPassword, user, setForgotEmail } =
    useContext(AuthContext);
  const { state } = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [eye, setEye] = useState(false);

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  // handle google log in
  const handleGoogleLogIn = () => {
    setErrorMessage("");
    logInByGoogle()
      .then((res) => {
        navigate(state ? `${state}` : "/");
      })
      .catch((err) => setErrorMessage(err.message));
  };

  // handle form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    logInByEmailPassword(email, password)
      .then((res) => {
        e.target.reset();
        navigate(state ? `${state}` : "/");
      })
      .catch((err) => setErrorMessage(err.message));
  };

  // handle forgot
  const handleForgot = () => {
    setForgotEmail("");
    const email = emailRef.current.value;
    email && setForgotEmail(email);
    navigate("/auth/forgot");
  };
  return (
    <div>
      {/* <Helmet>
        <title>Login | Chill Gamer</title>
      </Helmet> */}
      <div className="flex justify-center items-center py-14 px-3">
        <div className=" w-full md:w-[80%]  lg:w-[60%] ">
          {/* form div */}
          <div className=" bg-white w-full md:w-[50%] p-4 shrink-0 shadow-2xl">
            {/* title */}
            <h1 className="text-4xl text-center font-bold mb-5 flex justify-between items-center px-6">
              <span >Log In</span>
              {/* google log in */}
              <button onClick={handleGoogleLogIn}  className="text-2xl text-[#0B0223]">
                <FaGoogle></FaGoogle>
              </button>
            </h1>
            {/* form  */}
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  ref={passwordRef}
                  type={eye ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <span
                  onClick={() => setEye(!eye)}
                  className="absolute top-[52px] right-[8px] cursor-pointer"
                >
                  {eye ? <HiOutlineEyeOff /> : <RiEyeLine />}
                </span>
              </div>
              <div className="form-control mt-6">
                <button className="btn shadow-2xl text-white bg-gradient-to-b from-[#f948b2] to-[#8758f1]">
                  Login
                </button>
              </div>
              <div>
                <p className="text-left text-red-600">
                  {errorMessage && errorMessage}{" "}
                </p>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LogIn;
