const numbersDiv = document.querySelector('.numbers')
const drawBtn = document.querySelector('#draw')
const resetBtn = document.querySelector('#reset')
const lottoNumbers = []


function numberCreate() {
    while(lottoNumbers.length < 6){
        let rn = Math.floor(Math.random()*45) + 1
        if(lottoNumbers.indexOf(rn) === -1){
            lottoNumbers.push(rn)
        }
        numbersDiv.textContent = lottoNumbers
    }
    
}

drawBtn.addEventListener('click', numberCreate)

resetBtn.addEventListener('click', function(){
    lottoNumbers.splice(0,6)
    numbersDiv.innerHTML = ""
})

function dateCreate() {
    const todaySpan = document.querySelector('#today')
   const now = new Date()
   let mon = now.getMonth() + 1
   let dat = now.getDate()
   todaySpan.textContent = `${mon}월 ${dat}일`
}
dateCreate()
