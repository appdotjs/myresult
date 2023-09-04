const mongoose = require("mongoose");
const Joi = require("joi");

const schoolNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
});

const SchoolName = mongoose.model("SchoolName", schoolNameSchema);

function validateSchoolName(schoolName) {
  const schema = {
    name: Joi.string().min(2).max(255).required(),
  };

  return Joi.validate(schoolName, schema);
}

module.exports.validate = validateSchoolName;
module.exports.SchoolName = SchoolName;
module.exports.schoolNameSchema = schoolNameSchema;
