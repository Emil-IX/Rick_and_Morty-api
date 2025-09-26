


const button = document.getElementById('button')


let charaters = []
let currenPage = 1
let itemsPerPage = 10
let totalPage = 1


button.addEventListener('click', () => {

    const input1 = document.getElementById('input1').value
    const input2 = document.getElementById('input2').value
    if (!input1 || !input2) return alert('Complete los campos')
    if (isNaN(input1) || isNaN(input2)) return alert('Se admiten solo números')
    if (input1 > input2 || input1 <= 0) return alert('Dato no valido')
    if (input1 > 826 || input2 > 826) return alert('Limite alcanzado')
    getApi(input1, input2)
})

const getApi = async (base = 1, limit = 2) => {

    charaters = []
    for (base; base <= limit; base++) {

        const res = await fetch(`https://rickandmortyapi.com/api/character/${base}`)
        const data = await res.json()

        charaters.push(data)
    }

    totalPage = Math.ceil(charaters.length / itemsPerPage)
    currenPage = 1
    renderPages(currenPage)
    updatePageinfo()
}

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

document.getElementById("start").addEventListener("click", () => {
    if (currenPage > 1) {
        currenPage--
        renderPages(currenPage)
        updatePageinfo()
    } else {

    }
})

document.getElementById("end").addEventListener("click", () => {
    if (currenPage < totalPage) {
        currenPage++
        renderPages(currenPage)
        updatePageinfo()
    }
})



const updatePageinfo = () => {
    document.getElementById("pageInfo").textContent = `Page ${currenPage} of ${totalPage}`
}



getApi()
