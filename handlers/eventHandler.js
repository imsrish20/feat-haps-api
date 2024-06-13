const express = require("express");
const router = express.Router();
const Event = require("../models/eventModel");
const { Venue } = require("../models/venueModel");
const { Organiser } = require("../models/organiserModel");
const { Category } = require("../models/categoryModel");
const { Sponser } = require("../models/sponserModel");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200);
    res.json({ message: "Success", events:events });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something went wrong!");
  }
});

router.post("/", async (req, res) => {
  try {
    let name = req.body.name;
    let description = req.body.description;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let fee = req.body.fee;
    let year = req.body.year;
    let venue_id = req.body.venue;
    let organiser_ids = req.body.organisers;
    let category_ids = req.body.categories;
    let sponser_ids = req.body.sponsers;

    const venueFilter = { _id: venue_id };
    const venue = await Venue.findOne(venueFilter);

    const organiserFilter = { _id: organiser_ids };
    const organisers = await Organiser.find(organiserFilter);

    const categoriesFilter = { _id: category_ids };
    const categories = await Category.find(categoriesFilter);

    const sponsersFilter = { _id: sponser_ids };
    const sponsers = await Sponser.find(sponsersFilter);

    let newEvent = await Event.create({
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
      fee: fee,
      year: year,
      venue: venue,
      organisers: organisers,
      categories: categories,
      sponsers: sponsers,
    });

    res.json({ message: "Success", result: newEvent });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something went wrong!");
  }
});

module.exports = router;
