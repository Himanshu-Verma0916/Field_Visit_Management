const Visit = require('../models/visit');
const User = require('../models/user');
const Location = require('../models/location');
const ApprovalDecision = require('../models/approvalDecision');

// Create a new visit
const createVisit = async (req, res) => {
    try {
        const { title, purpose, location, plannedDate, estimatedCost } = req.body;
        const visit = new Visit({ title, purpose, location, plannedDate, estimatedCost , createdBy: req.user._id , status:"DRAFT"});
        await visit.save();
        res.status(201).json({message:"Visit created successfully", visit});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all visits
const getAllVisits = async (req, res) => {
    try {

        const {status,location,page=1, limit=10}= req.query;
        const filter={};

        // FIELD_OFFICER can only view their own visits
        if (req.user.role === "FIELD_OFFICER") {
            filter.createdBy = req.user._id;
        }
        
        if(status){
            filter.status=status;
        }
        if(location){
            filter.location=location;
        }

        const skip=(page-1)*limit; // Calculate the number of documents to skip based on the page and limit(pagination)

        const visits = await Visit.find(filter).populate('location').populate('createdBy', 'name email role').skip(skip).limit(Number(limit)).sort({createdAt:-1});
        const totalVisits=await Visit.countDocuments(filter);
        res.status(200).json({message:"Visits retrieved successfully", visits, pagination:{total:totalVisits, page:Number(page), limit:Number(limit), totalPages:Math.ceil(totalVisits/limit)}});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single visit by ID
const getVisitById = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id).populate('location').populate('createdBy', 'name email role');
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }

        const decisions=await ApprovalDecision.find({visit:visit._id}).populate('decidedBy','name email role').sort({createdAt:-1});
        res.status(200).json({message:"Visit retrieved successfully", visit, decisions});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a visit
const updateVisit = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }
        if (visit.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can only update your own visits"
            });
        }

        if(visit.status!=="DRAFT" && visit.status!=="REJECTED"){
            return res.status(400).json({ message: 'Only visits with status DRAFT or REJECTED can be updated' });
        }
        // Object.assign(visit, req.body);
        const {
            title,
            purpose,
            location,
            plannedDate,
            estimatedCost
        } = req.body;

        if (title !== undefined) visit.title = title;
        if (purpose !== undefined) visit.purpose = purpose;
        if (location !== undefined) visit.location = location;
        if (plannedDate !== undefined) visit.plannedDate = plannedDate;
        if (estimatedCost !== undefined) visit.estimatedCost = estimatedCost;

        await visit.save();
        res.status(200).json({message:"Visit updated successfully", visit});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

// submit a visit for approval
const submitVisitForApproval = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }
        if (visit.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can only submit your own visits for approval"
            });
        }

        if(visit.status!=="DRAFT" && visit.status!=="REJECTED"){
            return res.status(400).json({ message: 'Only visits with status DRAFT or REJECTED can be submitted for approval' });
        }   

        visit.status = "PENDING";
        await visit.save();
        res.status(200).json({message:"Visit submitted for approval successfully", visit});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// decide on a visit (approve or reject)

const decideVisit = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }

        if(visit.status!=="PENDING"){
            return res.status(400).json({ message: 'Only visits with status PENDING can be decided' });
        }

        if (visit.createdBy.toString() === req.user._id.toString()) {
            return res.status(403).json({
                message: "You cannot decide( approve or reject) on your own visit"
            });
        }

        const { decision, remark } = req.body;
        if (!["APPROVED", "REJECTED"].includes(decision)) {
            return res.status(400).json({ message: 'Decision must be either APPROVED or REJECTED' });
        }
        
        if (
            req.user.role === "HQ_APPROVER" &&
            decision === "REJECTED"
        ) {
            return res.status(403).json({
                message: "HQ Approver can only approve visits"
            });
        }
        
        if (decision === "REJECTED" && (!remark || remark.trim() === "")) {
            return res.status(400).json({
                message: "Remark is required when rejecting a visit"
            });
        }

        visit.status = decision;
        await visit.save();

        const approvalDecision = new ApprovalDecision({
            visit: visit._id,
            decidedBy: req.user._id,
            decision: decision,
            remark: remark
        });
        await approvalDecision.save();
        res.status(200).json({message:`Visit ${decision.toLowerCase()} successfully`, visit, decision: approvalDecision});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// complete a visit
const completeVisit = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }

        if(visit.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can only complete your own visits"
            });
        }

        if(visit.status!=="APPROVED"){
            return res.status(400).json({ message: 'Only visits with status APPROVED can be completed' });
        }


        visit.status = "COMPLETED";
        await visit.save();
        res.status(200).json({message:"Visit completed successfully", visit});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



module.exports = {
    createVisit,
    getAllVisits,
    getVisitById,
    updateVisit,
    submitVisitForApproval,
    decideVisit,
    completeVisit
};

