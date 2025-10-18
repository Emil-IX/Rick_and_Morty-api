


const button = document.getElementById('button')
const pageInfo = document.getElementById("pageInfo")


let charaters = []
let currenPage = 1
let itemsPerPage = 12
let totalPage = 1

//sent values to start
button.addEventListener('click', () => {

    const input1 = document.getElementById('input1').value
    const input2 = document.getElementById('input2').value
    if (!input1 || !input2) return alert('Complete los campos')
    if (isNaN(input1) || isNaN(input2)) return alert('Se admiten solo números')
    if (input1 > input2 || input1 <= 0) return alert('Dato no valido')
    if (input1 > 826 || input2 > 826) return alert('Limite alcanzado')
    getApi(input1, input2)
})

//api connection
const getApi = async (base = 1, limit = 40) => {
    charaters = []

    const ids = []


    for (i = base; i <= limit; i++) {
        ids.push(i)
    }

    const res = await fetch(`https://rickandmortyapi.com/api/character/${ids}`)
    const data = await res.json()

    charaters = data

    totalPage = Math.ceil(charaters.length / itemsPerPage)
    currenPage = 1
    renderPages(currenPage)
    updatePageinfo()
}

//Fo create render in the dom
const renderPages = (page) => {

    const container = document.getElementById('container')
    container.innerHTML = ''

    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    const currentItems = charaters.slice(start, end)

    currentItems.forEach(data => {
        const { id, name, gender, image, origin: { name: originName }, location: { name: locationName }, species, status } = data

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
            <p>Status: ${status}</p>
        `
        container.appendChild(card)
    })

    document.getElementById("start").disabled = (page === 1)
    document.getElementById("end").disabled = (page === totalPage)

}

//pagination controler
document.getElementById("start").addEventListener("click", () => {
    if (currenPage > 1) {
        currenPage--
        renderPages(currenPage)
        updatePageinfo()
    } else {

    }
})

//pagination controler
document.getElementById("end").addEventListener("click", () => {
    if (currenPage < totalPage) {
        currenPage++
        renderPages(currenPage)
        updatePageinfo()
    }
})

//pagination controler
pageInfo.addEventListener('click', (e) => {
    if (e.target.classList.contains("buttonN")) {

        currenPage = parseInt(e.target.value,10)
        renderPages(currenPage)
        updatePageinfo()

    }
})


//Update page information
const updatePageinfo = () => {
    //document.getElementById("pageInfo").textContent = `Page ${currenPage} of ${totalPage}`

    pageInfo.innerHTML = ""

    const maxBtn = 5
    const half = Math.floor(maxBtn / 2)

    let start = currenPage - half
    let end = currenPage + half

    if (start < 1) {
        start = 1
        end = Math.min(totalPage, start + maxBtn - 1)
    }


    if (end > totalPage) {
        end = totalPage
        start = Math.max(1, end - maxBtn + 1)
    }

    if (start > 1) {
        pageInfo.innerHTML += `<button class="buttonN" value="1">1</button>`;
        if (start > 2) pageInfo.innerHTML += `<span>...</span>`; 
    }

    for (let b = start; b <= end; b++) {
        pageInfo.innerHTML += `
         <button class="buttonN" value="${b}">${b}</button>
        `
    }

    if (end < totalPage) {
        if (end < totalPage - 1) pageInfo.innerHTML += `<span>...</span>`;
        pageInfo.innerHTML += `<button class="buttonN" value="${totalPage}">${totalPage}</button>`;
    }

    const btSelected = document.getElementsByClassName('buttonN');

for (let btn of btSelected) {
    if (parseInt(btn.value, 10) === currenPage) {
        btn.classList.add('btblack'); 
    } else {
        btn.classList.remove('btblack'); 
    }
}
}


//start the proyect
getApi()
