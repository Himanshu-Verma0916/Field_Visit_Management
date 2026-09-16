const express= require("express");
const visitRouter=express.Router();
const {createVisit,getAllVisits,getVisitById,updateVisit,submitVisitForApproval,decideVisit,completeVisit}=require("../controllers/visitController");
const auth=require("../middleware/authMiddleware");
const role=require("../middleware/roleMiddleware");

visitRouter.post("/",auth,role("USER"),createVisit);
visitRouter.get("/",auth,role("ADMIN"),getAllVisits);
visitRouter.get("/:id",auth,getVisitById);
visitRouter.put("/:id",auth,role("USER"),updateVisit);
visitRouter.post("/:id/submit",auth,role("USER"),submitVisitForApproval);
visitRouter.post("/:id/decide",auth,role("ADMIN"),decideVisit);
visitRouter.post("/:id/complete",auth,role("USER"),completeVisit);

module.exports=visitRouter;