const express = require("express");
const router = express.Router();
const { validateProfile } = require("../validate");
const protect = require("../middleware/auth");
const {
  createProfile,
  getProfile,
  updateProfile,
  getAllProfiles,
} = require("../controllers/profile");

router.route("/")
  .post(protect, validateProfile, createProfile)
  .get(protect, getAllProfiles);

router.route("/:userId")
  .put(protect, validateProfile, updateProfile)
  .get(protect, getProfile);

// router.route("/all").get(protect, getAllProfiles);

module.exports = router;
