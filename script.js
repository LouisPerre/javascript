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
let typeS = []
let offset = 151

btn.addEventListener('click', function() {
    alert("Le JS est la")
})

pokeFetch(url)

window.addEventListener('scroll', () => {
    
    if ((window.scrollY * 100 / height) > 40) {
        url = `https://pokeapi.co/api/v2/pokemon?limit=151&offset=${offset}`
        
        pokeFetch(url)
        offset += 151
        height += height
    }
    
})


function pokeCall() {
    
    pokemonList.forEach(element => {
        fetch(element.url)
            .then(res => res.json())
            .then((data) => {
                pokemonData[data.id] = {
                    "name": data.name,
                    "types": [
                        data.types[0].type["name"],
                        typeof data.types[1] !== "undefined" ? data.types[1].type["name"] : null
                   ],
                    "sprite": data.sprites["front_default"],
                    "id": data.id,
                    "weight": data.weight,
                    "url": element.url
                }
                
                
                //let name = data.name
                //name = name.charAt(0).toUpperCase() + name.slice(1)
                //let row = document.createElement("div")
                //row.className = "row"
                //let cardUp = document.createElement("div")
                //let card = document.createElement("div")
                //card.className = "card"
                //let cardImage = document.createElement("div")
                //cardImage.className = "cardImage"
                //let img = document.createElement("img")
                //img.src = data.sprites["front_default"]
                //let cardContent = document.createElement("div")
                //cardContent.className = "card-content"
                //let pokeName = document.createElement("a")
                //pokeName.href = element.url
                //pokeName.innerHTML = name.toUpperCase()
                //let pokemonIdStorage = document.createElement("div")
                //pokemonIdStorage.id = data.id
                //pokemonIdStorage.className = "typesContent"
                //
                //let pokeWeight = document.createElement("p")
                //pokeWeight.innerHTML = `The weight is : ${data.weight}`
                //pokeWeight.classList = "poids"
                //let pokeId = document.createElement("p")
                //pokeId.classList = "idPokemon"
                //pokeId.innerHTML = `Id : <span class="pokeId">${data.id}</span>`
                //
                //
                //body.appendChild(row)
                //row.appendChild(cardUp)
                //cardUp.appendChild(card)
                //card.appendChild(cardImage)
                //cardImage.appendChild(img)
                //card.appendChild(cardContent)
                //cardContent.appendChild(pokeName)
                //card.appendChild(pokemonIdStorage)
                //pokemonIdStorage.appendChild(pokeId)
                //pokemonIdStorage.appendChild(pokeWeight)
                //typeS.forEach(element => {
                //    console.log('rtyuio')
                //    if (element !== null) {
                //        let typePoke = document.createElement("p")
                //        typePoke.classList = `${element} types`
                //        typePoke.innerHTML = element.toUpperCase()
                //        pokemonIdStorage.appendChild(typePoke)
                //    }
                //    
                //})
            })
            .catch(err => console.warn(err.message));
            
    });
    triage(pokemonData)
}

function triage(pokemonData) {  
    console.log(pokemonData)
    pokemonData.forEach(element => { 
        console.log('lala')
        let name = element.name
        let row = document.createElement("div")
        row.className = "row"
        let cardUp = document.createElement("div")
        let card = document.createElement("div")
        card.className = "card"
        let cardImage = document.createElement("div")
        cardImage.className = "cardImage"
        let img = document.createElement("img")
        img.src = element.sprite
        let cardContent = document.createElement("div")
        cardContent.className = "card-content"
        let pokeName = document.createElement("a")
        pokeName.href = element.url
        pokeName.innerHTML = name.toUpperCase()
        let pokemonIdStorage = document.createElement("div")
        pokemonIdStorage.id = element.id
        pokemonIdStorage.className = "typesContent"
        element.types.forEach(element => {
            if (element !== null) {
                let typePoke = document.createElement("p")
                typePoke.classList = `${element} types`
                typePoke.innerHTML = element
                pokemonIdStorage.appendChild(typePoke)
            }
            
        })
        let pokeWeight = document.createElement("p")
        pokeWeight.innerHTML = `The weight is : ${element.weight}`
        let pokeId = document.createElement("p")
        pokeId.classList = "idPokemon"
        pokeId.innerHTML = `Id : <span class="pokeId">${element.id}</span>`
        
        
        body.appendChild(row)
        row.appendChild(cardUp)
        cardUp.appendChild(card)
        card.appendChild(cardImage)
        cardImage.appendChild(img)
        card.appendChild(cardContent)
        cardContent.appendChild(pokeName)
        card.appendChild(pokemonIdStorage)
        pokemonIdStorage.appendChild(pokeId)
        pokemonIdStorage.appendChild(pokeWeight)
    })
}
    
function pokeFetch(url) {
    fetch(url)
    .then(res => res.json())
    .then((data) => {

        
        pokemonList = data.results
        console.log(pokemonList)
        pokeCall()
    })
    .catch(err => console.warn(err.message));
}