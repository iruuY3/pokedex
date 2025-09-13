const pokemonName = document.querySelector(".pokemon__nome");
const pokemonId = document.querySelector('.pokemon__numero');
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.formulario');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status === 200){
        const data = await APIresponse.json();
        return data;
    }

}

const renderPokemon =async (pokemon) => {

    
    pokemonName.innerHTML = "Procurando..."
    const data = await fetchPokemon(pokemon);

    if(data && data.id <= 649){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id;
    }
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Não encontrado"
        pokemonId.innerHTML = ""
    }
    input.value = '';
}

form.addEventListener('submit', (event)=> {

    event.preventDefault()
    renderPokemon(input.value.toLowerCase());
});

buttonNext.addEventListener('click', ()=> {
    if (searchPokemon < 649){
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

buttonPrev.addEventListener('click', ()=> {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon)