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
    res.status(400);
    throw new Error("A profile already exists for this user");
  }
});

// @route GET /account-settings
// @desc Get profile by userId
// @access Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  
  const profile = await Profile.findOne({ userId: user._id });;  

  if (!profile) {
    res.status(404);
    throw new Error("No profile found for this user");
  }

  res.status(200).json({ profile: profile });
});

// @route PUT /account-settings
// @desc Update user profile
// @access Public
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const newProfile = await Profile.findOneAndUpdate({ user: user._id }, body);

  if (!newProfile) {
    res.status(404);
    throw new Error("No profile found for this user");
  }

  res.status(200).json({
    success: {
      message: "Successfully updated user profile"
    }
  });
});

// @route GET /account-settings/all
// @desc Get all profiles
// @access Public
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find();

  if (!profiles.length) {
    res.status(404);
    throw new Error("No profiles found");
  }

  res.status(200).json({ profiles: profiles });
});
