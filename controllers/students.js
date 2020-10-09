const fs = require('fs')
const data = require('../data.json')
const utils  = require('../utils')

//index
exports.index = function (req, res) {


    return res.render("students/index", {students: data.students})
}

//show
exports.show = function (req, res) {

    const{ id } = req.params
    const foundStudent = data.students.find(function(students) {
        return students.id == id
    })

    if (!foundStudent) return res.send("Student not found!!!")

    const students = {
        ...foundStudent,
        age: utils.age(foundStudent.birth),
        graduation: utils.graduation(foundStudent.schooling),
        created_at:new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at),
        services: foundStudent.atuacao.split(", "),
    }
    return res.render("students/show",{students})
}

//post
exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for ( key of keys){
        if (req.body[key] == "")
            return res.send("Please fill all fields!!!")
    }

    let {avatar_url, name, birth, schooling, class_type, atuacao} = req.body

    birth = Date.parse(birth)
    const id = Number(data.students.length + 1)
    const created_at = Date.now()

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        schooling,
        class_type,
        atuacao,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err){
            return res.send("Write file error!!!")
        }
        return res.redirect("/students")
    })
}

//edit
exports.edit = function(req,res){

    const{ id } = req.params
    const foundStudent = data.students.find(function(students) {
        return students.id == id
    })

    if (!foundStudent) return res.send("Student not found!!!")

    const students = {
        ...foundStudent,
        birth: utils.date(foundStudent.birth).iso
    }
    return res.render("students/edit", {students})
}

//put
exports.put = function(req, res){
    const{ id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(students, foundIndex) {
        if (id == students.id){
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("Student not found!!!")

    const students = {
        ...foundStudent,
        ...req.body,
        birth: utils.date(foundStudent.birth).iso,
        id: Number(req.body.id)

        //birth: Date.parse(req.body.birth)
    }

    data.students[index] = students


    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err){
            return res.send("Write file error!!!")
        }
        return res.redirect(`/students/${id}`)
    })

}

//delete
exports.delete = function(req,res){
    const{ id } = req.body

    const filteredStudents = data.students.filter(function(students){
        return students.id != id

    })
    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err){
            return res.send("Write file error!!!")
        }
        return res.redirect(`/students`)
    })
}