const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now
    },
    exercises : [
        {
            type: {
                type: String,
                trim: true,
                required: "Please enter a type of exercise"
            },
            name: {
                type: String,
                trim: true,
                required: "Please enter an exercise name"
            },
            duration: {
                type: Number,
                required: "Please enter the duration of the exercise"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;