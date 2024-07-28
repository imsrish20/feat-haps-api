const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel")

router.get("/", async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200);
    res.json({ message: "Success", category: category });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something went wrong!");
  }
});

router.post('/', async (req, res) => {
  try {
    let name = req.body.name;

    let message = "";

    if (name != "") {
      res.code = 200;
      message = "success";
    } else {
      res.code = 400;
      message = "incomplete";
    }

    if (res.code === 200) {
      result = await Category.create({
        name: name,
      })
    }
    res.json({ message: message, result: result });
  }
  catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something went wrong!");
  }
});
module.exports = router;
