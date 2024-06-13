const express = require("express");
const { Organiser } = require("../models/organiserModel");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const organiser = await Organiser.find({});
    res.status(200);
    res.json({ message: "Success", organiser: organiser });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something went wrong!");
  }
});

router.post("/", async (req, res) => {
  try {
    let pocName = req.body.pocName;
    let pocContact = req.body.pocContact;
    let pocEmail = req.body.pocEmail;
    let comittee = req.body.comittee;

    let message = "";
    let result = null;

    if (
      pocName != "" &&
      comittee != "" &&
      pocEmail != "" &&
      pocContact != ""
    ) {
      res.code = 200;
      message = "success";
    } else {
      res.code = 400;
      message = "incomplete";
    }

    if (res.code === 200) {
      result = await Organiser.create({
        pocName: pocName,
        pocContact: pocContact,
        pocEmail: pocEmail,
        comittee: comittee,
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
