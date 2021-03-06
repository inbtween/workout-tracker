const router = require("express").Router()
const db = require("../models")


router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        { $addFields: { totalDuration: { $sum: "$exercises.duration"}}}
    ]
    ).then(dbWorkout => res.json(dbWorkout))
    .catch(err => res.json(err))
})

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        { $addFields: { totalDuration: { $sum: "$exercises.duration"}}}
    ]
    
    ).sort({ _id: -1 })
    .limit(7).then(dbWorkout => res.json(dbWorkout))
    .catch(err => res.json(err))
})  

router.post("/api/workouts", (req, res) => {
    console.log("post")
    db.Workout.create({}).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })  
})

router.post("/api/workouts/range", (req, res) => {
    console.log("post")
    db.Workout.create({}).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })  
})

router.put("/api/workouts/:id", ({body, params}, res) => {
    db.Workout.findByIdAndUpdate(
        params.id, 
        { $push: {exercises: body} }, { new: true, runValidators: true}
    ).then(data => res.json(data))
    .catch(err => res.json(err))
})

module.exports = router;