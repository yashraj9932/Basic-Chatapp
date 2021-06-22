const express = require("express");
const router = express.Router();

const {
  addRoom,
  addUser,
  addMessage,
  getRooms,
} = require("../controllers/room");

const { protect } = require("../middleware/auth");

router.post("/addRoom", protect, addRoom);
router.post("/addUser/:id/:phone", protect, addUser);

router.route("/getrooms").get(protect, getRooms);

router.route("/message/:id").post(protect, addMessage);

module.exports = router;
