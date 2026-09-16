const mongoose = require("mongoose");

const approvalDecisionSchema = new mongoose.Schema(
    {
        visit:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Visit",
            required:true
        },
        decidedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        decision:{
            type:String,
            enum:["APPROVED", "REJECTED"],
            required:true
        },
        remark:{
            type:String,
            trim:true
        }
    },
    {timestamps:true}
);
const ApprovalDecision = mongoose.model("ApprovalDecision", approvalDecisionSchema);
module.exports = ApprovalDecision;