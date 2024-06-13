const express = require("express");
const router = express.Router();
const Venue = require("../models/venueModel");

router.get("/", async (req, res) => {
  try {
    const venues = await Venue.find({});
    res.status(200);
    res.json({ message: "Success", venues: venues });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something went wrong!");
  }
});

router.post("/", async (req, res) => {
  try {
    let name = req.body.name;
    let approval_required = req.body.approval_required;
    let capacity = req.body.capacity;
    let location = req.body.location;

    let message = "";
    let result = null;

    if (
      name != "" &&
      approval_required != "" &&
      capacity != "" &&
      location != ""
    ) {
      res.code = 200;
      message = "success";
    } else {
      res.code = 400;
      message = "incomplete";
    }
    if (res.code === 200) {
      result = await Venue.create({
        name: name,
        approval_required: approval_required,
        capacity: capacity,
        location: location,
      });
    }

    res.json({ message: message, result: result });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something went wrong!");
  }
});

module.exports = router;
