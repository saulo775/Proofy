const fs = require('fs')
const data = require('./data.json')
const  utils  = require('./utils')


/*==== create ====*/

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
        created_at: Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
        services: foundTeacher.atuacao.split(", "),
    }
    return res.render("show",{teachers})
}



/*==== create ====*/

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

    //return res.send(req.body)
}