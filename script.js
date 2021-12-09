const body = document.getElementsByClassName('cardContainer')[0];
let height = document.body.scrollHeight;
let url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
let pokemonList = [];
let pokemonData = [];
let typePoke = [];
let typePokeSingle = "";
let offset = 151;
let card = "";

pokeFetch(url);

window.addEventListener('scroll', () => {
    
    if ((window.scrollY * 100 / height) > 70) {
        url = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`;
        pokeFetch(url);
        offset += 151;
        height = document.body.scrollHeight;

    }
    
});


function pokeCall(pokemonList) {
    while (pokemonData.length > 0){
        pokemonData.pop()
    }
    Promise.all(pokemonList.map(url =>
        fetch(url.url)
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
                    "url": `https://pokeapi.co/api/v2/pokemon/${data.id}`
                };
            })
    ))
    .then(() => {
        pokemonData.forEach(element => {
            pokemonData = pokemonData.filter(value => Object.keys(value).length !== 0);
            console.log(pokemonData)
            typePoke = element.types;
            card = `
                <div class="row">
                    <div>
                        <div class="card">
                            <div class="cardImage">
                                <img src="${element.sprite}" alt="Pokemon Image">
                            </div>
                            <div class="card-content">
                                <a href="${element.url}">${(element.name).toUpperCase()}</a>
                            </div>
                            <div id="${element.id}" class="typesContent">
                                <p class="idPokemon">Pokemon ID : <span class="isBold">${element.id}</span></p>
                                <p class="poids">Weight : ${element.weight}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            body.innerHTML += card;
            typePoke.forEach(pokeType => {

                if (pokeType != null){
                    let typeStorage = document.getElementById(element.id);
                    typePokeSingle = `
                        <p class="${pokeType} types">${(pokeType).toUpperCase()}</p>
                    `;
                    typeStorage.innerHTML += typePokeSingle
                }

            })
        });
    });
}

function pokeFetch(url) {

    fetch(url)
    .then(res => res.json())
    .then((data) => {
        pokemonList = data.results;
        pokeCall(pokemonList);
    })
    .catch(err => console.warn(err.message));
}