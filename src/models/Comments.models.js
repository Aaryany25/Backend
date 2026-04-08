import mongoose ,{Schema} from "mongoose";

const CommentSchema = new Schema({
content:{
    type:String,

},
video:{
    type:Schema.Types.ObjectId,
    ref:"Video"
},
user:{
    type:Schema.Types.ObjectId,
    ref:"User"
}
},{
    timestamps:true
})

export const Comments =mongoose.model("Comments",CommentSchema)