// const formDelete = document.getElementById("form_delete")

//     formDelete.addEventListener("submit", function(event){
//         const confirmation = confirm("Deseja Deletar?")
//         if(!confirmation){
//             event.preventDefault()
//         }
//     })

const currentPage = document.location.pathname
console.log(currentPage)
const menu_items = document.querySelectorAll("header .header a")


for (item of menu_items){
    if (current_page.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }

}