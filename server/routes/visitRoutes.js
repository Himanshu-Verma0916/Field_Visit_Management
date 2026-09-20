const express= require("express");
const visitRouter=express.Router();
const {createVisit,getAllVisits,getVisitById,updateVisit,submitVisitForApproval,decideVisit,completeVisit}=require("../controllers/visitController");
const auth=require("../middleware/authMiddleware");
const role=require("../middleware/roleMiddleware");

visitRouter.post("/createVisit",auth,role("FIELD_OFFICER"),createVisit);
visitRouter.get("/getAllVisits",auth,role("FIELD_OFFICER","ADMIN","HQ_APPROVER"),getAllVisits);  // we will filterout fieldofficer can view only his visits
visitRouter.get("/getVisitById/:id",auth,getVisitById);
visitRouter.put("/updateVisit/:id",auth,role("FIELD_OFFICER"),updateVisit);
visitRouter.post("/submitVisitForApproval/:id",auth,role("FIELD_OFFICER"),submitVisitForApproval);
visitRouter.post("/decideVisit/:id",auth,role("ADMIN","HQ_APPROVER"),decideVisit);
visitRouter.post("/completeVisit/:id",auth,role("FIELD_OFFICER"),completeVisit);

module.exports=visitRouter;