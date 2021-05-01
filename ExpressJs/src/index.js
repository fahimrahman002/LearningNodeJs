const path = require("path");
const express = require("express");
const app = express();

const staticPath = path.join(__dirname, "../public");
//builtin middleware
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.send("Hello world from the express");
});
app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(8000, () => {
  console.log("listening port 8000");
});
