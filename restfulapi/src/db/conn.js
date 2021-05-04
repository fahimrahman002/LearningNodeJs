const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/students-api", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Db connection is successful");
  })
  .catch((err) => {
    console.log("Db Connection failed.");
  });
