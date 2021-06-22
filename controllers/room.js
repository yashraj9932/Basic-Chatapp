const asyncHandler = require("../middleware/async");
const Room = require("../models/Room");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.addRoom = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new ErrorResponse("Please Enter the Required Details", 404));
  }
  const room = await Room.create(req.body);

  await Room.findByIdAndUpdate(
    room._id,
    {
      $push: { users: req.user.id },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  //Add the initial user who created the room
  const ress = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { rooms: room._id },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: ress });
});

exports.addUser = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorResponse("Room does not exist", 404));
  }

  const person = await User.findOne({ phone: req.params.phone });
  //   console.log(person);

  if (!person) {
    return next(new ErrorResponse("No such user on the database", 404));
  }

  var f = -1,
    i;
  for (i = 0; i < person.rooms.length; i++) {
    if (room._id.toString() == person.rooms[i].toString()) {
      f = i;
      break;
    }
  }
  if (f != -1) {
    return next(new ErrorResponse("User is already in the room", 400));
  }

  await Room.findByIdAndUpdate(
    req.params.id,
    {
      $push: { users: person._id },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  const ress = await User.findByIdAndUpdate(
    person._id,
    {
      $push: { rooms: req.params.id },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: ress });
});

exports.addMessage = asyncHandler(async (req, res, next) => {
  const text = req.body.text;
  if (!text) {
    return next(new ErrorResponse("Message Not Found", 404));
  }

  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new ErrorResponse("Room doesnt not exist", 404));
  }

  var f = -1,
    i;
  for (i = 0; i < room.users.length; i++) {
    if (req.user.id.toString() == room.users[i].toString()) {
      f = i;
      break;
    }
  }
  if (f == -1) {
    return next(new ErrorResponse("User is not in the room", 400));
  }

  const fields = {
    from: req.user.id,
    text,
    Date: Date.now,
  };

  room.messages.push(fields);
  room.save({
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: room });
});

exports.getRooms = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "rooms",
    populate: {
      path: "users",
      select: "name",
    },
  });
  if (!user) {
    return next(new ErrorResponse("User doesnt not exist", 404));
  }

  res.status(200).json({ success: true, data: user.rooms });
});
