// const AsyncHandler =(func)=>{async(req,res,next)=>{
// try {
//     await func(req,res,next)
// } catch (error) {
//     resizeBy.status(error.code || 500).json({
//         success:false ,
//         message:error.message
//     })
// }
// }}

const AsyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {AsyncHandler}