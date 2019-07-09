const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile"
  },
  likes: [
    {
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
      }
    }
  ],
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  comments: [
    {
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true,
        default: Date.now
      }
    }
  ]
});

module.exports = Image = mongoose.model("image", ImageSchema);
