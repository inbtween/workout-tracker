// DEPENDENCIES
const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const db = require("./models");

// Middleware (post request)
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static folder
app.use(express.static("public"));

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});


app.use(require("./routes/html-routes"));
app.use(require("./routes/api-routes"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });

//   figure out the mongo db
