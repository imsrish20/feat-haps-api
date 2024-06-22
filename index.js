require('dotenv').config(); // Add this line at the very top

const express = require("express");
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");
const mongoose = require("mongoose");

require('./auth'); // Ensure this is after dotenv config

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

// Session Middleware
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my Project Alpha ☺️");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello ${req.user.displayName}`);
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
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
