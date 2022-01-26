const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  birthDate: Date,
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  availability: [
    {
      date: Date,
      startTime: Date,
      endTime: Date
    }
  ]
});

module.exports = Profile = mongoose.model("profile", profileSchema);
