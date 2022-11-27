import mongoose from "mongoose";

const connect = async () => {
    mongoose.connect(process.env.DB_CONNECTION);
    console.log("Connected to database");
}

export default connect;