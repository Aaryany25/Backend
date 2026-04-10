import { v2 as cloudinary } from 'cloudinary'
import fs from'fs'
cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key:process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary = async function(localpath){
        try {
            if(!localpath) return null 
            // upload on File on Cloudinary 
         const response = await    cloudinary.uploader
  .upload(localpath,{
    resource_type:'auto'
  })
//   File has been uploaded succesfully 
// console.log("File is uploaded on cloudinary",response.url)
fs.unlinkSync(localpath)
return response

//   .then(result=>console.log(result));
        } catch (error) {
            fs.unlink(localpath) //remve the save temp file when the operation is failed
            return null 
        }
    }

export default uploadOnCloudinary