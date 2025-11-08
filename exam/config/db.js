const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://smit:smit7768@cluster0.axybcb4.mongodb.net/exam");
    console.log("✅ Database Connected");
  } catch (err) {
    console.log("❌ Database Connection Failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
