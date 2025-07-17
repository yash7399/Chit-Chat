import { response } from "express";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = asyncHandler(async (req, res, next) => {
  const { fullname, username, password, gender } = req.body;

  if (!fullname || !username || !password || !gender) {
    return next(new errorHandler("All feilds are reuired", 400));
  }

  const user = await User.findOne({ username });

  if (user) {
    return next(new errorHandler("User already exists", 400));
  }

  // const salt= await bcryptjs.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarType = gender == "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;
  const newUser =await User.create({
    username,
    fullname,
    password: hashedPassword,
    gender,
    avatar,
  });

  const tokenData={
    _id:newUser?._id
  }

  const token= jwt.sign(tokenData,process.env.JWT_SECRET,{
    expiresIn:"2d"
  })
  
  res.status(200)
  .cookie("token",token,{
    expires:new Date(
      Date.now()+2*24*60*60*1000
    ),
    httpOnly:true,
    secure:true,
    sameSite:"None"
  })
  .json({
    success: true,
    responseData: {
      user,
      token
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new errorHandler("Please enter a valid username or password", 400)
    );
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(
      new errorHandler("Please enter a valid username or password", 400)
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(
      new errorHandler("Please enter a valid username or password", 400)
    );
  }

  const tokenData={
    _id:user?._id
  }

  const token= jwt.sign(tokenData,process.env.JWT_SECRET,{
    expiresIn:"2d"
  })

  res.status(200)
  .cookie("token",token,{
    expires:new Date(
      Date.now()+2*24*60*60*1000
    ),
    httpOnly:true,
    secure:true,
    sameSite:"None",
  })
  .json({
    success:true,
    responseData:{
        user,
        token
    }
  })

});


export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const profile = await User.findById(userId);
  console.log(profile)
  res.status(200).json({
    success: true,
    responseData: profile,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout successfull!",
    });
});


export const getOtherUsers = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    success: true,
    responseData: otherUsers,
  });
});
