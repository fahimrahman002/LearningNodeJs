const http = require("http");
const fs = require("fs");
const requests = require("requests");
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp - 273.15);
  temperature = temperature.replace(
    "{%tempmin%}",
    orgVal.main.temp_min - 273.15
  );
  temperature = temperature.replace(
    "{%tempmax%}",
    orgVal.main.temp_max - 273.15
  );
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "http://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=f47a4ee422529a5f19ce0b20405b9097"
    )
      .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];

        console.log("Getting data..");
        // console.log(arrData[0].main.temp - 273.15);
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join("");

        res.write(realTimeData);
      })
      .on("end", function (err) {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  }
});

server.listen(8000, "127.0.0.1");
