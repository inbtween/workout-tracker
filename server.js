// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
// Middleware (post request)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static folder
app.use(express.static("public"));
// const htmlRoutes = require("./routes/html-routes");
// const apiRoutes = require("./routes/api-routes");
// connect to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });