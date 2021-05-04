const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const studentRouter = require("./routers/studentRouter");
const app = express();
const port = process.env.PORT || 8000;

app.use(studentRouter);
app.use(express.json());

app.listen(port, "localhost", () => {
  console.log(`Connected to port:${port}`);
});
