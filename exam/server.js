const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware order correct

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DB connect
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", require("./routes/taskRoutes")); 

// app.use("/api/categories", categoryRoutes);
// Server Start
app.listen(5000, () => console.log("Server running on port 5000")); 