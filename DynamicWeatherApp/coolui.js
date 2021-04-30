const http = require("http");
const fs = require("fs");
const request = require("requests");
var homeFile = "";
fs.readFile("coolUI.html", "utf-8", (err, data) => {
  homeFile = data;
});
const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace(
    "{%temperature%}",
    orgVal.main.temp - 273.15,
    (err) => {}
  );
  temperature = temperature.replace(
    "{%weather%}",
    orgVal.weather[0].main,
    (err) => {}
  );
  temperature = temperature.replace("{%location%}", orgVal.name, (err) => {});
  temperature = temperature.replace(
    "{%country%}",
    orgVal.sys.country,
    (err) => {}
  );
  temperature = temperature.replace(
    "{%humidity%}",
    orgVal.main.humidity,
    (err) => {}
  );
  temperature = temperature.replace(
    "{%tempmin%}",
    orgVal.main.temp_min - 273.15,
    (err) => {}
  );
  temperature = temperature.replace(
    "{%tempmax%}",
    orgVal.main.temp_max - 273.15,
    (err) => {}
  );
  temperature = temperature.replace(
    "{%sunrise%}",
    orgVal.sys.sunrise,
    (err) => {}
  );
  temperature = temperature.replace(
    "{%sunset%}",
    orgVal.sys.sunset,
    (err) => {}
  );
  temperature = temperature.replace(
    "{%feels_like%}",
    (orgVal.main.feels_like - 273.15).toFixed(2),
    (err) => {}
  );
  temperature = temperature.replace("{%wind%}", orgVal.wind.speed, (err) => {});
  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    request(
      "http://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=f47a4ee422529a5f19ce0b20405b9097"
    )
      .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        const objArr = [objData];

        const realTimeData = objArr
          .map((val) => replaceVal(homeFile, val))
          .join("");
        // console.log(realTimeData);
        res.writeHead(200, { "content-type": "text/html" });
        res.write(realTimeData);
      })
      .on("end", (err) => {
        if (err) {
          return console.log("Can't fetch data from API");
        }

        res.end();
      });
  }
});

server.listen(8000, "localhost");
