const express = require('express')
const routes = express.Router()

routes.get("/", function (req, res) {
    return res.render('index')
})

routes.get("/students", function(req, res){
    return res.render("students")
})

routes.get("/teachers", function(req, res){
    return res.render("teachers")
})


module.exports = routes