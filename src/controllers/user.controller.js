import { AsyncHandler } from "../utils/asyncHandler.js";


const RegisterUser = AsyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})

export {RegisterUser}