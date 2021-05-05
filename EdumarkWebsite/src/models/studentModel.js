const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: String,
    minlength: 11,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const StudentModel = new mongoose.model("Sudent", studentSchema);

module.exports = StudentModel;
