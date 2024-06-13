const mongoose = require("mongoose");

const organiserSchema = mongoose.Schema(
  {
    pocName: {
      type: String,
      required: true,
    },
    pocEmail: {
      type: String,
      required: true,
    },
    pocContact: {
      type: Number,
      required: true,
    },
    comittee: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Organiser = mongoose.model("Organiser", organiserSchema);

module.exports = { Organiser, organiserSchema };
