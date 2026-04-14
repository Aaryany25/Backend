import { AsyncHandler } from "../utils/asyncHandler.js";
import {APIError} from "../utils/APIerror.js"
import { APIresponse } from "../utils/APIresponse.js";
import {User} from "../models/User.model.js"
import uploadonCloudinary from "../utils/Cloudinary.js"

const generateAccessTokenandRefreshToken = async(userid)=>{
    try {
        const user = await User.findById(userid)
        const accesstoken = user.generateAccessToken()
        const refreshtoken = user.generateRefreshToken()

        // Saving the Refresh Token in the DB 
        user.refreshtoken = refreshtoken
        await user.save({validateBeforeSave: false })
        return {accesstoken, refreshtoken}

    } catch (error) {
        console.log(error)
        throw new APIError(500,"something went wring with access or refreshtoken")
    }
}

const RegisterUser = AsyncHandler(async (req,res)=>{
  
    // get the user details from Frontend 
    // check of required fileds - Validation
    // Check for existing User 
    // check for Images 
    // upload it to clodinary 
    // create the onject in the db 
    // remove password and refreshToken from the response 
    // Check for user Creation 
    //  send response 
    const {fullName,email,username, password} = req.body
    // console.log(fullName,email,username)
    if(
        [fullName,email,username,password].some((field)=>
            field?.trim()==="")
    ){
throw new APIError(
    400,"all Fields are required !!"
)
    }

    const ExistedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(ExistedUser){
        throw new APIError(409,"User Already Exists ")
    }
    const AvatarLocalPath = req.files?.avatar[0]?.path;
    const CoverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!AvatarLocalPath){
        throw new APIError(400,"Avatar is Required!!")
    }

   const avatar=   await uploadonCloudinary(AvatarLocalPath)
    const coverImage = await uploadonCloudinary(CoverImageLocalPath)
    if(!avatar){
        throw new APIError(400,"Avatar is Required!!")
    }
 const user =  await  User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        username : username.toLowerCase() ,
        email ,
        password 
    })

  const CreatedUser =  await User.findById(user._id).select(
    "-password -refreshtoken"
)
if(!CreatedUser){
    throw new APIError(500,"Cant Registed the User")
}
 
return res.status(201).json(
    new APIresponse(201,CreatedUser,"User Created Successfully !")
)
})

const LoginUser = AsyncHandler(async(req,res)=>{
    // Take username , email and password from frontned 
    // check if the user exsist with the username or email 
    // Validate the password 
    // generate  access token and refresh token 
    // Send Cookies 
    // send response
const {username,email,password} = req.body 
if(!username || !email){
      throw new APIError(400,"Email or Username is required")
}

const ExistedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(!ExistedUser){
        throw new APIError(409,"No user Found ")
    }

  const  isPasswordValid = await ExistedUser.isPasswordCorrect(password)
if(!isPasswordValid){
        throw new APIError(401,"incorrect password")
    }

   const {accesstoken,refreshtoken} = await  generateAccessTokenandRefreshToken(ExistedUser._id)

//    We are taken the refresh token from the db and setting the cokkies 
const LoggedInUser = await User.findById(ExistedUser._id).select("-password -refreshtoken")

const options={
    httpOnly :true,
    secure:true 

}
return res.status(200)
.cookie("accesstoken",accesstoken,options)
.cookie("refreshtoken",refreshtoken,options)
.json(
    new APIresponse(200,{
        user:LoggedInUser,accesstoken,refreshtoken
    },
"User LoggedIn Successfully ")
)
})

const LogoutUser = AsyncHandler(async(req,res)=>{
    // console.log(req.user)
 await User.findByIdAndUpdate(
    req.user._id,{
        $set:{
            refreshtoken:undefined
        }
    }
)
const options={
    httpOnly :true,
    secure:true 

}

return res.status(200)
.clearCookie("accesstoken",options)
.clearCookie("refreshtoken",options)
.json(
    new APIresponse(200,{},"User Logged Out SuccessFully")
)


})
export {RegisterUser,LoginUser,LogoutUser}