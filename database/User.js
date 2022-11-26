import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {type: String},
    cash: {type: String},
    cryptoAmounts: {type: String},
    cryptoSymbols: {type: String},
});

module.exports = mongoose.models.User || mongoose.model("User", User);