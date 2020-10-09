const fs = require('fs')
const data = require('../data.json')
const utils  = require('../utils')

//index
exports.index = function (req, res) {
    return res.render("teachers/teachers", {teachers: data.teachers})
}

//show
exports.show = function (req, res) {

    const{ id } = req.params
    const foundTeacher = data.teachers.find(function(teachers) {
        return teachers.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!!!")

    const teachers = {
        ...foundTeacher,
        age: utils.age(foundTeacher.birth),
        graduation: utils.graduation(foundTeacher.schooling),
        created_at:new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
        services: foundTeacher.atuacao.split(", "),
    }
    return res.render("teachers/show",{teachers})
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
    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()

    data.teachers.push({
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
        return res.redirect("/teachers")
    })
}

//edit
exports.edit = function(req,res){

    const{ id } = req.params
    const foundTeacher = data.teachers.find(function(teachers) {
        return teachers.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!!!")

    const teachers = {
        ...foundTeacher,
        birth: utils.date(foundTeacher.birth).iso
    }
    return res.render("teachers/edit", {teachers})
}

//put
exports.put = function(req, res){
    const{ id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teachers, foundIndex) {
        if (id == teachers.id){
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send("Teacher not found!!!")

    const teachers = {
        ...foundTeacher,
        ...req.body,
        birth: utils.date(foundTeacher.birth).iso,
        id: Number(req.body.id)

        //birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teachers


    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err){
            return res.send("Write file error!!!")
        }
        return res.redirect(`/teachers/${id}`)
    })

}

//delete
exports.delete = function(req,res){
    const{ id } = req.body

    const filteredTeachers = data.teachers.filter(function(teachers){
        return teachers.id != id

    })
    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err){
            return res.send("Write file error!!!")
        }
        return res.redirect(`/teachers`)
    })
}