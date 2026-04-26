const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://gauravsingh71205:gauravsingh71205@task.md0oc1p.mongodb.net/?appName=task/bookstore");
    console.log("MongoDB Atlas connected ✅");
  } catch (err) {
    console.log("Connection failed ❌", err);
  }
};

module.exports = databaseConnection;

