const btn = document.getElementsByClassName('button')[0]
const title = document.getElementsByClassName('pokeName')[0]
const img = document.getElementsByClassName('pokeSprite')[0]
const id = document.getElementsByClassName('pokeId')[0]
const body = document.getElementsByClassName('cardContainer')[0]
let height = window.screen.height
let div = ""
let url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
let pokemonList = []
let pokemonData = []
let offset = 151

btn.addEventListener('click', function() {
    alert("Le JS est la")
})

pokeFetch(url)

window.addEventListener('scroll', () => {
    
    if ((window.scrollY * 100 / height) > 70) {
        url = `https://pokeapi.co/api/v2/pokemon?limit=151&offset=${offset}`
        
        pokeFetch(url)
        console.log('dsqdsq')
        offset += 151
        height += height
    }
    
})

function pokeCall() {
    
    pokemonList.forEach(element => {
        fetch(element.url)
            .then(res => res.json())
            .then((data) => {
                let row = document.createElement("div")
                row.className = "row"
                let cardUp = document.createElement("div")
                let card = document.createElement("div")
                card.className = "card"
                let cardImage = document.createElement("div")
                cardImage.className = "cardImage"
                let img = document.createElement("img")
                img.src = data.sprites["front_default"]
                let link = document.createElement("a")
                link.href = element.url
                let cardContent = document.createElement("div")
                cardContent.className = "card-content"
                let pokeName = document.createElement("p")
                pokeName.innerHTML = data.name
                let pokemonIdStorage = document.createElement("div")
                pokemonIdStorage.id = data.id
                let pokeId = document.createElement("p")
                pokeId.innerHTML = `Id : <span class="pokeId">${data.id}</span>`
                
                body.appendChild(row)
                row.appendChild(cardUp)
                cardUp.appendChild(card)
                card.appendChild(cardImage)
                cardImage.appendChild(img)
                cardImage.appendChild(link)
                card.appendChild(cardContent)
                cardContent.appendChild(pokeName)
                card.appendChild(pokemonIdStorage)
                pokemonIdStorage.appendChild(pokeId)
            })
            .catch(err => console.warn(err.message));
    
    });
}

function pokeAppend(index) {
    let row = document.createElement("div")
    row.className = "row"
    let cardUp = document.createElement("div")
    let card = document.createElement("div")
    card.className = "card"
    let cardImage = document.createElement("div")
    cardImage.className = "cardImage"
    let img = document.createElement("img")
    img.src = pokemonData[index].sprite
    let link = document.createElement("a")
    link.href = pokemonData[index].link
    let cardContent = document.createElement("div")
    cardContent.className = "card-content"
    let pokeName = document.createElement("p")
    pokeName.innerHTML = pokemonData[index].name
    let pokemonIdStorage = document.createElement("div")
    pokemonIdStorage.id = pokemonData[index].id
    let pokeId = document.createElement("p")
    pokeId.innerHTML = `Id : <span class="pokeId">${pokemonData[index].id}</span>`
    
    console.log('ziiz')
    body.appendChild(row)
    row.appendChild(cardUp)
    cardUp.appendChild(card)
    card.appendChild(cardImage)
    cardImage.appendChild(img)
    cardImage.appendChild(link)
    card.appendChild(cardContent)
    cardContent.appendChild(pokeName)
    card.appendChild(pokemonIdStorage)
    pokemonIdStorage.appendChild(pokeId)
}

function pokeFetch(url) {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        pokemonList = data.results
        pokeCall()
    })
    .catch(err => console.warn(err.message));
}