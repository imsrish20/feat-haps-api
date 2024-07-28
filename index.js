const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3030;

const eventHandler = require("./handlers/eventHandler");
const venueHandler = require("./handlers/venueHandler");
const organiserHandler = require("./handlers/organiserHandler");
const categoryHandler = require("./handlers/categoryHandler");
const sponserHandler = require("./handlers/sponserHandler");

const URI = "mongodb+srv://imsrish20:tEIA6x6wL1hnvNCQ@cluster0.r0q7yac.mongodb.net/feat-haps?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
}));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my Project Alpha ☺️");
});

// Handlers
app.use("/venues", venueHandler);
app.use("/organisers", organiserHandler);
app.use("/categories", categoryHandler);
app.use("/events", eventHandler);
app.use("/sponsers", sponserHandler);

// MongoDB connection
mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongo DB connected");
    app.listen(port, function () {
      console.log(`App is listening`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
