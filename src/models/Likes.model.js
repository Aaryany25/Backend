import mongoose ,{Schema} from "mongoose";

const LikeSchema = new Schema ({
    comments:{
        type:Schema.Types.ObjectId,
        ref:"Comments"
    },
video:{
    type:Schema.Types.ObjectId,
    ref:"Video"
},
likedby:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
tweet:{
    type:Schema.Types.ObjectId,
    ref:"Tweets"
}
},{
    timestamps:true
})