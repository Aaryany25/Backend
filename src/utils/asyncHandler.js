const AsyncHandler =(func)=>{async(req,res,next)=>{
try {
    await func(req,res,next)
} catch (error) {
    resizeBy.status(error.code || 500).json({
        success:false ,
        message:error.message
    })
}
}}

export {AsyncHandler}