const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const requests = require("requests");
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    userName: "Fahim",
  });
});
app.get("/home", (req, res) => {
  res.render("index", {
    userName: "Fahim",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    userName: "Fahim",
  });
});
app.get("/temp", (req, res) => {
  requests(
    `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=f47a4ee422529a5f19ce0b20405b9097`
  )
    .on("data", (chunk) => {
      try {
        const objData = JSON.parse(chunk);
        const arrData = [objData];

        res.write(
          `<h1>Now ${arrData[0].name}'s temperature is ${(
            arrData[0].main.temp - 273.15
          ).toFixed(2)}&deg;C</h1>`
        );
      } catch (err) {
        res.render('404page')
      }
    })
    .on("end", function (err) {
      if (err) return console.log("connection closed due to errors", err);
      res.send();
    });
});
app.get("*", (req, res) => {
  res.render("404page");
});
app.listen(8000, () => {
  console.log("Listening port 8000");
});
