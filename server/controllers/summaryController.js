const Visit = require('../models/visit');

const getSummary = async (req, res) => {
    try {
        const totalVisits = await Visit.countDocuments();
        const pendingVisits = await Visit.countDocuments({ status: 'PENDING' });
        const approvedVisits = await Visit.countDocuments({ status: 'APPROVED' });
        const rejectedVisits = await Visit.countDocuments({ status: 'REJECTED' });
        const draftVisits = await Visit.countDocuments({ status: 'DRAFT' });
        const completedVisits = await Visit.countDocuments({ status: 'COMPLETED' });
        
        const totalEstimatedCost = await Visit.aggregate([
            { $group: { _id: null, totalCost: { $sum: "$estimatedCost" } } }
        ]);
        res.status(200).json({message: "Summary retrieved successfully",summary:{ totalVisits, pendingVisits, approvedVisits, rejectedVisits, draftVisits, completedVisits, totalEstimatedCost: totalEstimatedCost[0]?.totalCost || 0 }});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSummary };