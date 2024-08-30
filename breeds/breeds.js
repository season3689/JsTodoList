const request1 = new XMLHttpRequest()
const request2 = new XMLHttpRequest()

const header = document.querySelector("#header")
const main = document.querySelector("#main")
const input = document.querySelector("#filter-text")
const button = document.querySelector("#filter-button")
const select = document.querySelector("#filter-select")
const more = document.querySelector("#more")
const tothetop = document.querySelector("#tothetop")

const currentDogs = []

function displayDogs(item){
    const dogImgDiv = document.createElement("div")
    dogImgDiv.classList.add("flex-item")
    dogImgDiv.innerHTML = `
      <img src=${item}>
    `
    main.appendChild(dogImgDiv)
  }

window.addEventListener('load', function(){
    request1.open("GET", "https://dog.ceo/api/breeds/image/random/42")
    request1.addEventListener("load", () => {
        const result = JSON.parse(request1.response).message
        result.forEach((dog) => {
            currentDogs.push(dog)
            displayDogs(dog)
        })
    })
    request1.send()

    request2.open("GET", "https://dog.ceo/api/breeds/list/all")
    request2.addEventListener("load", () => {
        const result = JSON.parse(request2.response)
        Object.keys(result.message).forEach((item) => {
            const option = document.createElement("option")
            option.textContent = item
            option.value = item
            select.appendChild(option)
        })
    })
    request2.send()
})

button.addEventListener("click", function(){
    main.innerHTML = ""
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(input.value) != -1
    })
    input.value = ""
    filteredDogs.forEach(function(item){
        displayDogs(item)
    })
})
    
select.addEventListener("change", function(){
        main.innerHTML = ""
        let filteredDogs = currentDogs.filter(function(item){
            return item.indexOf(select.value) !== -1
        })

        filteredDogs.forEach(function(item){
            displayDogs(item)
        })
    })

more.addEventListener("click", function(){
    request1.open("GET", "https://dog.ceo/api/breeds/image/random/42")
    request1.addEventListener("load", () => {
        const result = JSON.parse(request1.response).message
        result.forEach((item) => {
            currentDogs.push(item)
            displayDogs(item)
        })
})
    request1.send()
})

tothetop.addEventListener("click", function(){
    window.scrollTo({ top: 0 })
  })