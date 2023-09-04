const { Student, validate } = require("../models/student");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.find().sort("name");
  res.send(students);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = new Student({
    name: req.body.name,
    schoolName: req.body.schoolName,
    city: req.body.city,
    subjects: {
      marathi: req.body.subjects.marathi,
      mathematics: req.body.subjects.mathematics,
      english: req.body.subjects.english,
      hindi: req.body.subjects.hindi,
      science: req.body.subjects.science,
      history: req.body.subjects.history,
      geography: req.body.subjects.geography,
    },
  });

  await student.save();

  res.send(student);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student)
    return res.status(404).send("Student doesn't exists in data base");
  res.send(student);
});
module.exports = router;
