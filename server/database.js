const mongoose = require("mongoose");

const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB Connected Successfully ✅");

    } catch (error) {
        console.log("Connection failed ❌", error.message);
        throw error;
    }
};

module.exports = databaseConnection;