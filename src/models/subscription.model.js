import mongoose ,{Schema} from "mongoose";
const SubscriptionSchema = new Schema ({
 
subscriber:{
        type:Schema.Types.ObjectId,
    ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,
    ref:"User"
    },
},{timestamps:true})

export const Subscription = mongoose.model("Subscription",SubscriptionSchema)





const Dummy = new Schema({
content:{
    type:String,
    required:true
},
author:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
likes:[
    {
        type:Number,
        default:0
    },

],
comments:[
    {
        type:String,
        required:true
    }
]
},{timestamps:true})