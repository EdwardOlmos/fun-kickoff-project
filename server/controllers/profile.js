const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /account-settings
// @desc Create user profile
// @access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const {
    userId,
    firstName,
    lastName,
    gender,
    phoneNumber,
    address,
    description,
    photoUrl,
    payment,
    availability    
  } = req.body;
  
  const profileExists = await Profile.findOne({ userId: userId });

  if (!profileExists) {
    const profile = await Profile.create({
      userId,
      firstName,
      lastName,
      gender,
      phoneNumber,
      address,
      description,
      photoUrl,
      payment,
      availability      
    });
    res.status(201).json({
      success: {
        profile: {
          userId: profile.userId,
          firstName: profile.firstName,
          lastName: profile.lastName,
          gender: profile.gender,
          phoneNumber: profile.phoneNumber,
          address: profile.address,
          description: profile.description,
          photoUrl: profile.photoUrl,
          payment: profile.payment,
          availability: profile.availability
        }
      }
    });
  } else {
    res.status(400).json({
      error: {
        message: "A profile already exists for this user"
      }
    });
  }
});

// @route GET /account-settings/:userId
// @desc Get profile by userId
// @access Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  
  const profile = await Profile.findOne({ userId: user._id });;  

  if (profile) {
    res.status(200).json({ profile: profile });
  } else {
    res.status(404).json({
      error: {
        message: "No profile found for this user"
      }
    });
  }
});

// @route PUT /account-settings/:userId
// @desc Update user profile
// @access Public
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const newProfile = await Profile.findOneAndUpdate({ user: user._id }, body);

  if (newProfile) {
    res.status(200).json({
      success: {
        message: "Successfully updated user profile"
      }
    });
  } else {
    res.status(404).json({
      error: {
        message: "No profile found for this user"
      }
    });
  }
});

// @route GET /account-settings
// @desc Get all profiles
// @access Public
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find();

  if (profiles.length) {
    res.status(200).json({ profiles: profiles });
  } else {
    res.status(404).json({
      error: {
        message: "No profiles found"
      }
    });
  }
});
