const mongoose= require("mongoose");

const locationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    district:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});

const Location=mongoose.model("Location",locationSchema);
module.exports=Location;
