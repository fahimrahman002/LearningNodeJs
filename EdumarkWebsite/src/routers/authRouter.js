const express = require("express");
const router = new express.Router();
const StudentModel = require("../models/studentModel");
router.use(express.json());
router.use(
  express.urlencoded({
    extended: false,
  })
);

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const student = await StudentModel.find({ email, password });
    if (student.length != 0) {
      console.log(student);
      res.render("index", {
        msgtype: "success",
        msg: "Login successful",
      });
    } else {
      res.render("index", {
        msgtype: "error",
        msg: "Authentication failed",
      });
    }
  } catch (err) {
    res.render("contact", {
      msgtype: "error",
      msg: `Error: ${err}`,
      msgtime: 3000,
    });
  }
});
router.post("/register", async (req, res) => {
  try {
    const pass = req.body.password;
    const conPass = req.body.confirmPassword;
    if (pass === conPass) {
      const registerStudent = new StudentModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      });
      await registerStudent.save();
      res.render("index", {
        msgtype: "success",
        msg: "Registration successful",
      });
    } else {
      res.render("contact", {
        msgtype: "warning",
        msg: "Password and Confirm must be same",
      });
    }
  } catch (err) {
    res.render("contact", {
      msgtype: "error",
      msg: `Error: ${err}`,
      msgtime: 3000,
    });
  }
});

// router.post("/register", async (req, res) => {
//   try {
//     const student = await console.log(req.body.email);
//     // res.render("about");
//     res.send("about");
//   } catch (err) {
//     res.status(400).send("Bad Request");
//   }
// });

module.exports = router;
