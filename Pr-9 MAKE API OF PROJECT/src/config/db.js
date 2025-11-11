const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://smit:smit7768@cluster0.axybcb4.mongodb.net/API",)
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error);
  }
}

module.exports = dbConnection;
