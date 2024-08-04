const mongoose = require("mongoose");
const { organiserSchema } = require("./organiserModel");
const { categorySchema } = require("./categoryModel");
const { venueSchema } = require("./venueModel");
const { sponserSchema } = require("./sponserModel");

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    year: {
      type: [Number],
      default: [],
    },
    organisers: {
      type: [organiserSchema],
      required: true,
    },
    venue: {
      type: venueSchema,
      required: true,
    },
    categories: {
      type: [categorySchema],
      required: true,
    },
    sponsers: {
      type: [sponserSchema],
    },
    img_urls:{
      type:[String],
      required:true,
    }
  },
  {
    timestamp: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
