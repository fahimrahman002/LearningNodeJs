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

const getTime = (UTCtime) => {
  let unix_timestamp = UTCtime;

  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var mins = date.getMinutes();

  let periods = "AM";
  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  var formattedTime = hours + " : " + mins + "  " + periods;

  return formattedTime;
};

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
app.get("/weather", (req, res) => {
  var objData;
  var arrData;
  requests(
    `http://api.openweathermap.org/data/2.5/weather?q=Dhaka&units=metric&appid=f47a4ee422529a5f19ce0b20405b9097`
  )
    .on("data", (chunk) => {
      try {
        objData = JSON.parse(chunk);
        arrData = [objData];

        res.render("weather", {
          temp: arrData[0].main.temp.toFixed(1),
          location: arrData[0].name,
          weather: arrData[0].weather[0].main,
          country: arrData[0].sys.country,
          humidity: arrData[0].main.humidity,
          tempmin: arrData[0].main.temp_min.toFixed(2),
          tempmax: arrData[0].main.temp_max.toFixed(2),
          sunrise: getTime(arrData[0].sys.sunrise),
          sunset: getTime(arrData[0].sys.sunset),
          feels_like: arrData[0].main.feels_like.toFixed(2),
          wind: arrData[0].wind.speed,
        });
      } catch (err) {
        console.log(`Error occured: ${err}`);
        res.render("404page");
      }
    })
    .on("end", function (err) {
      if (err) {
        res.render("404page");
        return console.log("connection closed due to errors", err);
      }
    });
});
app.get("*", (req, res) => {
  res.render("404page");
});
app.listen(8000, () => {
  console.log("Listening port 8000");
});
