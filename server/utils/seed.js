const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");

const User = require("../models/user");
const Location = require("../models/location");
const Visit = require("../models/visit");
const ApprovalDecision = require("../models/approvalDecision");

// Seed data for the application to create initial users, locations, visits, and approval decisions.
const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await ApprovalDecision.deleteMany({});
        await Visit.deleteMany({});
        await Location.deleteMany({});
        await User.deleteMany({});

        console.log("Existing data cleared");

        // -------------------------
        // USERS
        // -------------------------

        const password = await bcrypt.hash("Password@123", 10);

        const users = await User.create([
            {
                name: "Rahul Sharma",
                email: "rahul.officer@example.com",
                password,
                role: "FIELD_OFFICER"
            },
            {
                name: "Priya Singh",
                email: "priya.officer@example.com",
                password,
                role: "FIELD_OFFICER"
            },
            {
                name: "Anita Verma",
                email: "anita.approver@example.com",
                password,
                role: "HQ_APPROVER"
            },
            {
                name: "Admin User",
                email: "admin@example.com",
                password,
                role: "ADMIN"
            }
        ]);

        const [
            officer1,
            officer2,
            approver,
            admin
        ] = users;

        console.log("Users created");

        // -------------------------
        // LOCATIONS
        // -------------------------

        const locations = await Location.create([
            {
                name: "Primary Health Centre A",
                district: "Gurugram",
                state: "Haryana"
            },
            {
                name: "Community Centre B",
                district: "Noida",
                state: "Uttar Pradesh"
            }
        ]);

        const [location1, location2] = locations;

        console.log("Locations created");

        // -------------------------
        // VISITS
        // -------------------------

        const visits = await Visit.create([
            {
                title: "Water Quality Monitoring Visit",
                purpose: "Collect field information and review safe water activities.",
                location: location1._id,
                plannedDate: new Date("2026-09-20"),
                estimatedCost: 1500,
                status: "DRAFT",
                createdBy: officer1._id
            },

            {
                title: "Community Awareness Visit",
                purpose: "Conduct community awareness activities related to safe water.",
                location: location2._id,
                plannedDate: new Date("2026-09-21"),
                estimatedCost: 2000,
                status: "PENDING",
                createdBy: officer1._id
            },

            {
                title: "Field Monitoring Visit",
                purpose: "Monitor implementation activities at the field location.",
                location: location1._id,
                plannedDate: new Date("2026-09-18"),
                estimatedCost: 1800,
                status: "APPROVED",
                createdBy: officer2._id
            },

            {
                title: "Program Follow-up Visit",
                purpose: "Follow up on previously identified field activities.",
                location: location2._id,
                plannedDate: new Date("2026-09-17"),
                estimatedCost: 1200,
                status: "REJECTED",
                createdBy: officer2._id
            },

            {
                title: "Completed Monitoring Visit",
                purpose: "Review completed field activities and collect final observations.",
                location: location1._id,
                plannedDate: new Date("2026-09-10"),
                estimatedCost: 1600,
                status: "COMPLETED",
                createdBy: officer1._id
            }
        ]);

        const [
            draftVisit,
            pendingVisit,
            approvedVisit,
            rejectedVisit,
            completedVisit
        ] = visits;

        console.log("Visits created");

        // -------------------------
        // APPROVAL DECISIONS
        // -------------------------

        await ApprovalDecision.create([
            {
                visit: approvedVisit._id,
                decidedBy: approver._id,
                decision: "APPROVED",
                remark: "Visit approved."
            },

            {
                visit: rejectedVisit._id,
                decidedBy: approver._id,
                decision: "REJECTED",
                remark: "Please provide a clearer purpose for the visit."
            },

            {
                visit: completedVisit._id,
                decidedBy: approver._id,
                decision: "APPROVED",
                remark: "Approved for field activity."
            }
        ]);

        console.log("Approval decisions created");

        console.log("\nSeed completed successfully!");
        console.log("\nTest credentials:");
        console.log("Field Officer: rahul.officer@example.com");
        console.log("HQ Approver:   anita.approver@example.com");
        console.log("Admin:         admin@example.com");
        console.log("Password:      Password@123");

        await mongoose.connection.close();

    } catch (error) {
        console.error("Seed failed:", error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedData();