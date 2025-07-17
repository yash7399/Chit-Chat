import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast"

const Signup = () => {

  const dispatch= useDispatch()
  const navigate=useNavigate()
const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [signupData,setsignupData]=useState({
    fullname:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:"male"
  })

  const handleInputChange = (e) => {
    setsignupData((prev) => ({ 
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    // console.log(isAuthenticated)
  }, [isAuthenticated]);

  const handleSignUp=async()=>{
    if(signupData.password != signupData.confirmPassword){
      return toast.error("Password and Confirm Password do not match")
    }
    const response =await dispatch(registerUserThunk(signupData))
     if(response?.payload.success){
        navigate("/")
     }
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col gap-5 items-center max-w-[40rem] p-5 w-full rounded-lg shadow-lg bg-base-200 ">
        <h2 className="text-2xl font-semibold">Please Sign Up..!!</h2>

        <label className="input input-bordered flex items-center gap-2">
          <CiUser />
          <input
            name="fullname"
            onChange={handleInputChange}
            type="text"
            required
            placeholder="Full Name"
            minlength="3"
            maxlength="30"
          />
        </label>


        <label className="input input-bordered flex items-center gap-2">
          <CiUser />
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            required
            placeholder="Username"
            minlength="3"
            maxlength="30"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <IoKeyOutline />
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            required
            placeholder="Password"
            minlength="8"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <IoKeyOutline />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
            required
            placeholder="Confirm Password"
            minlength="8"
          />
        </label>

        <div className="input input-bordered flex items-center gap-5">
          <label htmlFor="male" className="flex gap-3 items-center">
            <input
              id="male"
              type="radio"
              name="gender"
              value="male"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            male
          </label>

          <label htmlFor="female" className="flex gap-3 items-center">
            <input
              id="female"
              type="radio"
              name="gender"
              value="female"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            female
          </label>
        </div>


        <button onClick={handleSignUp} className="btn btn-info">Sign Up</button>
        <p>
          Already have an account? &nbsp;
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
