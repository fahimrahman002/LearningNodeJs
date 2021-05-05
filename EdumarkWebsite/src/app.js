const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("./db/conn");
const app = express();
const port = process.env.PORT || 8000;
const templatePath = path.join(__dirname, "../templates/views");
const staticPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../templates/partials");
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

const authRouter = require("./routers/authRouter.js");

authRouter.use(express.json());
authRouter.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(authRouter);

app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/contact", (req, res) => {
//   res.render("contact");
// });
// app.post("/contact", async (req, res) => {
//   try {
//     console.log("post request");
//     res.send(req.body.name);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
