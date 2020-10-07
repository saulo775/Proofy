const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get("/", function (req, res) {
    return res.render('index')
})

routes.get("/students", function(req, res){
    return res.render("students")
})
routes.get("/teachers", function(req, res){
    return res.render("teachers")
})

routes.get("/teachers/create", function(req, res){
    return res.render("create")
})

routes.get("/teachers/:id", teachers.show)


routes.post('/teachers', teachers.post)


module.exports = routes