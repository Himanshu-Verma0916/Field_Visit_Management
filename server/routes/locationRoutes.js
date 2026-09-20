const express = require("express");

const locationRouter = express.Router();

const {
    getAllLocations
} = require("../controllers/locationController");

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");


locationRouter.get("/getAllLocations",auth,role("FIELD_OFFICER", "HQ_APPROVER", "ADMIN"),getAllLocations);


module.exports = locationRouter;