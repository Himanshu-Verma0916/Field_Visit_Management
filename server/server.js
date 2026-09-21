const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/authRoutes");
const visitRouter = require("./routes/visitRoutes");
const summaryRouter = require("./routes/summaryRoutes");
const locationRouter = require("./routes/locationRoutes");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// app.use(cors());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(limiter);

// api endpoints
app.use("/api/users", userRouter);
app.use("/api/visits",visitRouter);
app.use("/api/summary",summaryRouter);
app.use("/api/locations",locationRouter);

app.use("/", (req, res) => {
  res.send("API is running...");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});