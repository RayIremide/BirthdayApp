const mongoose = require('mongoose');
require('dotenv').config()


const connectToMongoDB = async (url) => {
    mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}




module.exports ={ connectToMongoDB }