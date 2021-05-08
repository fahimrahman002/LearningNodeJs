const express = require("express");
const router = new express.Router();
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/blog", (req, res) => {
  res.render("blog");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/course_details", (req, res) => {
  res.render("course_details");
});

router.get("/courses", (req, res) => {
  res.render("courses");
});

router.get("/elements", (req, res) => {
  res.render("elements");
});
router.get("/form", (req, res) => {
  res.render("form");
});

router.get("/single_blog", (req, res) => {
  res.render("single_blog");
});

module.exports = router;
