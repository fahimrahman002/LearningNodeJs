const express = require("express");
const router = new express.Router();
const Student = require("../models/students");
//Create a new student with promises
// router.post("/students", (req, res) => {
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

//Using Async-Await
router.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(200).send(studentsData);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.find({ _id });

    if (!studentData) {
      return res.status(404).send();
    } else {
      res.status(200).send(studentData);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/students/:id", async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deleteStudent) {
      return res.status(400).send();
    } else {
      res.status(200).send(deleteStudent);
    }
  } catch (err) {
    res.status(500).send(err); //server error
  }
});

router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateStudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
