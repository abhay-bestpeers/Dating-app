const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
    from: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    to: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["unknown","interested", "accepted", "ignore", "rejected"],
        default: "unknown"
    }
}, { timestamps: true });

module.exports = mongoose.model("Connection", connectionSchema);
