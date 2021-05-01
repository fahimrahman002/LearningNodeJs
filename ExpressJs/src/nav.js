const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Welcome to my home page");
});

app.get("/about", (req, res) => {
  res.status(200).send("Welcome to my about page");
});
app.get("/contact", (req, res) => {
  res.status(200).send("Welcome to my contact page");
});
app.get("/temp", (req, res) => {
  res.json([
    {
      id: 1,
      city: "Mymensingh",
      temp: 30,
    },
    {
      id: 2,
      city: "Mymensingh",
      temp: 30,
    },
  ]);
});
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
