const router = require("express").Router()
const Workout = require("../models/workout.js")

router.post("/api/workouts", (req, res) => {
    Workout.create({}).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })  
})

// put
// get
