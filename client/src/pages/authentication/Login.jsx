import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";

const Login = () => {

  const navigate=useNavigate()
const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [loginData,setLoginData]=useState({
    username:"",
    password:""
  })

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleInputChange =  (e) => {
    setLoginData((prev) => ({ 
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleLogin=async ()=>{
    const response=await dispatch(loginUserThunk(loginData))
    if(response?.payload.success){
        navigate("/")
     }
  }


  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col gap-5 items-center max-w-[40rem] p-5 w-full rounded-lg shadow-lg bg-base-200 ">
        <h2 className="text-2xl font-semibold">Please Login..!!</h2>
        <label className="input input-bordered flex items-center gap-2">
          <CiUser />
          <input
            onChange={handleInputChange}
            name="username"
            type="text"
            required
            placeholder="Username"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <IoKeyOutline />
          <input
            onChange={handleInputChange}
            name="password"
            type="password"
            required
            placeholder="Password"
          />
        </label>

        <button onClick={handleLogin} className="btn btn-info">Login</button>
        <p>
          Don't have an account? &nbsp;
          <Link to="/signup" className="text-blue-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
