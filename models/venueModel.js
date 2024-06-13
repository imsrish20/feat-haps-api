const mongoose = require("mongoose");

const venueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    capacity: {
      type: Number,
      required: true,
    },
    approval: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamp: true,
  }
);

const Venue = mongoose.model("Venue", venueSchema);

module.exports = {Venue, venueSchema};
