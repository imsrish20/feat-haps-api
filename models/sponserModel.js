const mongoose = require("mongoose");

const sponserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Sponser = mongoose.model("Sponser", sponserSchema);

module.exports = { Sponser, sponserSchema };
