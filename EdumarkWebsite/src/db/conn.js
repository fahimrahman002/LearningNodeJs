const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/edumark_website_db", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("db connection successful");
  })
  .catch((err) => {
    console.log("db connection failed");
  });
