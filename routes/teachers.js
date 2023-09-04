const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const _ = require("lodash");
const { Teacher, validate } = require("../models/teacher");
const { SchoolName } = require("../models/schoolName");
router.get("/", async (req, res) => {
  const teachers = await Teacher.find().sort("name");

  res.send(teachers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const schoolName = await SchoolName.findById(req.body.schoolNameId);

  if (!schoolName) return res.status(400).send("Invalid school Name");

  let teacher = await Teacher.findOne({ email: req.body.email });
  if (teacher) return res.status(400).send("Teacher already registerd");

  teacher = new Teacher({
    name: req.body.name,
    schoolName: {
      _id: schoolName._id,
      name: schoolName.name,
    },
    city: req.body.city,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  teacher.password = await bcrypt.hash(teacher.password, salt);

  await teacher.save();

  const token = jwt.sign({ _id: teacher._id }, "jwtPrivateKey");
  res
    .header("x-auth-token", token)
    .send(_.pick(teacher, ["_id", "name", "schoolName", "city", "email"]));
});

module.exports = router;
