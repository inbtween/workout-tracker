// DEPENDENCIES
const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const db = require("./models")
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

db.Workout.create({ name: "Fitness Tracker"}).then(dbWorkout => {
    console.log(dbWorkout);
}).catch(({message}) => {
    console.log(message)
})

app.post("/submit", ({body}, res) => {
    db.Exercise.create(body)
      .then(({_id}) => db.Workput.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
      .then(dbWorkput => {
        res.json(dbWorkput);
      })
      .catch(err => {
        res.json(err);
      });
  });


  app.get("/exercise", (req, res) => {
    db.Exercise.find({})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  
  app.get("/workout", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/populated", (req, res) => {
    db.Workout.find({})
    // populate() function
      .populate("exercise")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  

// aggregate function to dynamically add up and return the total duration for each workout.  $addFields,  $sum operator, 
app.post("/stats", ({body}, res) => {
    db.Workout.create(body).then(({_id}) => db.Workout.db.Workout.aggregate( [
        {
          $addFields: {
            duration: { $sum: "$duration" } ,
            weight: { $sum: "$weight" } ,
            reps: { $sum: "$reps" } ,
            sets: { $sum: "$sets" } ,
          }
        },
        {
          $addFields: { totalStats:
            { $add: [ "$totalDuration", "$totalWeight", "$totalReps", "$totalSets" ] } }
        },
     ] )
})



app.use(require("./routes/html-routes"));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });

//   figure out the mongo db