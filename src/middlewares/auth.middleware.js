import { User } from "../models/User.model.js";
import { APIError } from "../utils/APIerror.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const VerifyJWT = AsyncHandler(async (req,res,next)=>{
  try {
    const token =  req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","")
    if(!token){
      throw new APIError(401,"unAuthorized Token")
    }
    const decoded= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
//   console.log(decoded._id)
    const user = User.findById(decoded._id).select("-password -refreshtoken")
  
    if(!user){
      throw new APIError(401,"Invalid User")
    }
    req.user = user
    console.log(req.user)
    next()
  } catch (error) {
    console.log(error)
    throw new APIError(401,error?.message || "Invalid AccessToken")
  }
})