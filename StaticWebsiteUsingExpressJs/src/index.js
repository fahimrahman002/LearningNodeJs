const express = require("express");
const app = express();
const path = require("path");

const staticPath = path.join(__dirname, "../public");
// app.use(express.static(staticPath));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});
app.listen(8000, () => {
  console.log("Listening port 8000");
});
