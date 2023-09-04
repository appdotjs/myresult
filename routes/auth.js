const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();
const { Teacher } = require("../models/teacher");
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let teacher = await Teacher.findOne({ email: req.body.email });
  if (!teacher) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    teacher.password
  );
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = jwt.sign({ _id: teacher._id }, "jwtPrivateKey");
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
