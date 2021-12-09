const body = document.getElementsByClassName('cardContainer')[0];
let height = window.screen.height;
let url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
let pokemonList = [];
let pokemonData = [];
let typeS = "";
let offset = 151;
let card = "";

pokeFetch(url);

window.addEventListener('scroll', () => {
    
    if ((window.scrollY * 100 / height) > 40) {
        url = `https://pokeapi.co/api/v2/pokemon?limit=151&offset=${offset}`;
        
        pokeFetch(url);
        offset += 151;
        height += height;
    }
    
});


function pokeCall(pokemonList) {
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
            (element.types).forEach(element => {
                if (element !== null) {
                    typeS = `<p class="${element} types">${element.toUpperCase()}</p>`;
                }

            })
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
                                <p class="idPokemon">${element.id}</p>
                                <p class="poids">${element.weight}</p>
                                ${typeS}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            body.innerHTML += card;
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