const Visit = require("../models/visit");

const getSummary = async (req, res) => {
    try {

        const filter = {};

        // FIELD_OFFICER can only see their own summary
        if (req.user.role === "FIELD_OFFICER") {
            filter.createdBy = req.user._id;
        }

        const totalVisits = await Visit.countDocuments(filter);

        const pendingVisits = await Visit.countDocuments({...filter,status: "PENDING"});

        const approvedVisits = await Visit.countDocuments({...filter,status: "APPROVED"});

        const rejectedVisits = await Visit.countDocuments({...filter,status: "REJECTED"});

        const draftVisits = await Visit.countDocuments({...filter,status: "DRAFT"});

        const completedVisits = await Visit.countDocuments({...filter,status: "COMPLETED"});

        const totalEstimatedCost = await Visit.aggregate([
            {
                $match: filter
            },
            {
                $group: {
                    _id: null,
                    totalCost: {
                        $sum: "$estimatedCost"
                    }
                }
            }
        ]);

        res.status(200).json({
            message: "Summary retrieved successfully",
            summary: {
                totalVisits,
                pendingVisits,
                approvedVisits,
                rejectedVisits,
                draftVisits,
                completedVisits,
                totalEstimatedCost:totalEstimatedCost[0]?.totalCost || 0
            }
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getSummary
};