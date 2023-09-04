const Joi = require("joi");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  subjects: {
    marathi: {
      type: Number,
      default: 0,
    },
    mathematics: {
      type: Number,
      default: 0,
    },
    english: {
      type: Number,
      default: 0,
    },
    hindi: {
      type: Number,
      default: 0,
    },
    science: {
      type: Number,
      default: 0,
    },
    history: {
      type: Number,
      default: 0,
    },
    geography: {
      type: Number,
      default: 0,
    },
  },
});

const Student = mongoose.model("Student", studentSchema);

function validateStudent(student) {
  const schema = {
    name: Joi.string().required().min(3).max(255),
    schoolName: Joi.string().required().min(3).max(255),
    city: Joi.string().required().min(3).max(255),
    subjects: Joi.object({
      marathi: Joi.number(),
      mathematics: Joi.number(),
      english: Joi.number(),
      hindi: Joi.number(),
      science: Joi.number(),
      history: Joi.number(),
      geography: Joi.number(),
    }).required(),
  };

  return Joi.validate(student, schema);
}

module.exports.Student = Student;
module.exports.validate = validateStudent;
