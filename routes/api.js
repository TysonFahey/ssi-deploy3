const express = require("express");

const database = require("../models/index"); // requires the index.js file from this directory
const Student = database.Student; // the student model

const router = express.Router();

router.get("/students", function (req, res, next) {
  // query database, get all rows from database, convert it to JSON so it's available for us to use in our app
  Student.findAll({ order: ["name"] }).then((students) => {
    return res.json(students);
  });
});

router.post("/students", function (req, res, next) {
  const newStudent = req.body;
  Student.create(newStudent)
    .then((result) => {
      return res.status(201).send("New student created!");
    })
    .catch((err) => {
      // 400 is status code for bad request
      if (err instanceof database.Sequelize.ValidationError) {
        const messages = err.errors.map((e) => e.message); // go through every error in the array and put them in message
        return res.status(400).json(messages);
      } else {
        // some other error
        next(err); // if it gets here, control will go to server.js to figure it out
      }
    });
});

router.patch("/students/:id", function (req, res, next) {
  // matches requests to /students/1
  // students/2
  // students/100
  // req.params stores the id value
  // stores any placeholder in the url

  const studentID = req.params.id;
  const updatedStudent = req.body; // updated data about this student
  console.log(updatedStudent);
  Student.update(updatedStudent, { where: { id: studentID } })
    .then((result) => {
      const rowsModified = result[0]; // if one row was changed, we found student and they were updated
      if (rowsModified === 1) {
        return res.send("ok");
      } else {
        // if zero rows were updates, student was not found
        return res.status(404).send("Student not found ");
      }
    })
    .catch((err) => {
      // database errors (can't connect for example)
      // 400 is status code for bad request
      if (err instanceof database.Sequelize.ValidationError) {
        const messages = err.errors.map((e) => e.message); // go through every error in the array and put them in message
        return res.status(400).json(messages);
      } else {
        // some other error
        next(err); // if it gets here, control will go to server.js to figure it out
      }
    });

  // erros we could see: student id that doesn't exits, invalid data in the updatedStudent, database problems....
}); // colon allows a placeholder

router.delete("/students/:id", function (req, res, next) {
  // delete request to /api/students/4 will delete student with id 4
  const studentID = req.params.id;
  Student.destroy({ where: { id: studentID } }).then((rowsDeleted) => {
    if (rowsDeleted ===1 ){
    return res.send("Student Deleted")
    } else { // 0 rows deleted the student with this id givin is not in the database 
        return res.status(404).send('Student not found')
    }

  }).catch(err => {
    return next(err)
  }) // where the column id in the database has the same student id read in the request
});

module.exports = router; // dont forget the s
