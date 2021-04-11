const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
          $addFields: {
            durationSum: { $sum: "$exercises.duration" },
          },
        },
    ])
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.sendStatus(500).json(error);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Workout.findOneAndUpdate(
        { _id: params.id },
        {
          $push: { exercises: body },
        },
        (err, data) => {
          if (err) {
            res.send(err);
          }
          else {
            res.json(data);
          };
        }
    );
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create({}, (err, data) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json(data);
      };
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          durationSum: { $sum: "$exercises.duration" },
        },
      },
      {
        $limit: 20,
      },
    ])
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;