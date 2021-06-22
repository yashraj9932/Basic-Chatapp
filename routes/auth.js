const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  getLoggedUser,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/currentuser", protect, getLoggedUser);

module.exports = router;
