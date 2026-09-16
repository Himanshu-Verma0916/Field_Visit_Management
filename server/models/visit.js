const mongoose= require("mongoose");

const visitSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    purpose:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Location",
        required:true
    },
    plannedDate:{
        type:Date,
        required:true
    },
    estimatedCost:{
        type:Number,
        required:true,
        min:0
    },

    status:{
        type:String,
        enum:["DRAFT", "PENDING", "APPROVED", "REJECTED", "COMPLETED"],
        default:"DRAFT",
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},{timestamps:true});

const Visit=mongoose.model("Visit",visitSchema);
module.exports=Visit;
