const express = require("express");

const router = express.Router();
const { SchoolName, validate } = require("../models/schoolName");

router.get("/", async (req, res) => {
  const schoolNames = await SchoolName.find().sort("name");

  res.send(schoolNames);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const schoolName = new SchoolName({
    name: req.body.name,
  });

  await schoolName.save();
  res.send(schoolName);
});

module.exports = router;
