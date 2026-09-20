const Location = require("../models/location");

const getAllLocations = async (req, res) => {
    try {

        const locations = await Location.find()
            .sort({ name: 1 });

        res.status(200).json({
            message: "Locations retrieved successfully",
            locations
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getAllLocations
};