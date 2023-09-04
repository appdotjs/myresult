const mongoose = require("mongoose");
const Joi = require("joi");
const { schoolNameSchema } = require("./schoolName");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  schoolName: {
    type: schoolNameSchema,
    required: true,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
});
const Teacher = mongoose.model("Teacher", teacherSchema);

function validateTeacher(teacher) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    schoolNameId: Joi.string().required(),
    city: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(teacher, schema);
}
module.exports.Teacher = Teacher;
module.exports.validate = validateTeacher;
