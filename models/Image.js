const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true
  },
  likes: [
    {
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
      }
    }
  ],
  comments: [
    {
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
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
