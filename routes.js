const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')



/*==== TEACHERS =====*/
routes.get("/", function(req, res){
    return res.redirect("teachers")
 })


routes.get("/teachers/create", function(req, res){
    return res.render("teachers/create")
})

routes.get("/teachers", teachers.index)

routes.get("/teachers/:id", teachers.show)

routes.get("/teachers/:id/edit", teachers.edit)

routes.post('/teachers', teachers.post)

routes.put('/teachers', teachers.put)

routes.delete('/teachers', teachers.delete)





/*====############ STUDENTS ###########=====*/




routes.get("/students/create", function(req, res){
    return res.render("students/create")
})

routes.get("/students", students.index)

routes.get("/students/:id", students.show)

routes.get("/students/:id/edit", students.edit)

routes.post('/students', students.post)

routes.put('/students', students.put)

routes.delete('/students', students.delete)



module.exports = routes