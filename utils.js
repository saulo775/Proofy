
exports.age =  function (timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month ==0 && today.getDate() < birthDate.getDate()){
            age = age - 1
        }

        return age
    }

exports.graduation = function graduation(schooling){
        if (schooling === "medio"){
            return "Ensino Medio completo"
        }else if(schooling === "superior"){
            return "Ensino Superior Completo"
        }else if(schooling === "mestrado"){
            return "Mestrado"
        }else if(schooling === "doutorado"){
            return "Doutorado"
        }else{
            return
        }

    }
