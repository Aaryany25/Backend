import mongoose ,{Schema} from "mongoose";
const PlayListSchema = new Schema({
name:{
    type:String,
    required:true
},
desc:{
    type:String,
},
user:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
videos:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
]
},{
    timestamps:true
})
export const PlayList =mongoose.model("PlayList",PlayListSchema)
