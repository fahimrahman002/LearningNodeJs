const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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

studentSchema.pre("save", async function (next) {
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const StudentModel = new mongoose.model("Sudent", studentSchema);

module.exports = StudentModel;
