const mongoose = require("mongoose");

const ProfileShema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  desc: {
    type: String
  },
  images: [
    {
      image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
      }
    }
  ],
  follows: [
    {
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileShema);
