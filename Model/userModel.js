const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: { 
    type: String,
    required: true
  },

  username: { 
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  email: { 
    type: String, 
    unique: true,
    required: true
  },

  phone: { 
    type: Number,
    unique: true,
    required: true
  },

  techstack: { 
    type: String,
    required: true
  },

  age: { 
    type: Number,
    required: true
  },

  gender: { 
    type: String,
    required: true
  },
   
  address: {
    city: { 
      type: String,
      required: true
    },
    state: { 
      type: String,
      required: true
    }
  },


  requested: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  ignore: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],


  rejectedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  isdeltete: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
