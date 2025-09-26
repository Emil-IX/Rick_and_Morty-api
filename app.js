
const textt = "emil es el mas pro"

const text2 = btoa(textt)

console.log(text2)

console.log(atob(text2))

const emil = "ZW1pbCBlcyBlbCBtYXMgcHJv"
console.log(emil)


const button = document.getElementById('button')


button.addEventListener('click', () => {

    const input1 = document.getElementById('input1').value
    const input2 = document.getElementById('input2').value
    if(!input1 || !input2 ) return  alert('Complete los campos')
    if(isNaN(input1) || isNaN(input2) ) return  alert('Se admiten solo números')
    if(input1 > input2 ||  input1 <= 0   ) return  alert('Dato no valido')
    if(input1 > 826 ||  input2 > 826) return  alert('Limite alcanzado')
    getApi(input1,input2)
})

const getApi = async (base=1, limit=2) => {

    const container = document.getElementById('container')    
    container.innerHTML = ''

    for (base ; base <= limit ; base++) {
        
    const res = await fetch(`https://rickandmortyapi.com/api/character/${base}`)
    const data = await res.json()
        
    const{ id, name, gender, image, origin:{name:originName}, location:{name:locationName},species,status } = data
    
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
    <img src="${image}" alt="${name}">
    <h2>${name}</h2>
    <p><strong>ID:</strong> ${id}</p>
    <p>Gender: ${gender}</p>
    <p>Origen: ${originName}</p>
    <p>Location: ${locationName}</p>
    <p>Specie: ${species}</p>
    <p>Status: ${status

    }</p>



    `
    container.appendChild(card)

    }



}


getApi()
