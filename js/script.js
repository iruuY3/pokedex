const pokemonName = document.querySelector(".pokemon__nome");
const pokemonId = document.querySelector('.pokemon__numero');
const pokemonImage = document.querySelector('.pokemon__image')
const pokemonType1 = document.querySelector('.primeiro')
const pokemonType2 = document.querySelector('.segundo')
const primeiroTexto = document.querySelector('.primeiro_texto')
const segundoTexto = document.querySelector('.segundo_texto')

const form = document.querySelector('.formulario');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const cortexto = (texto,tipo) => {
    texto.style.color = '#fff';
    if (tipo == 'bug'){
        texto.style.color = '#fff';
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.background = '#205529ff';
    }
    else if (tipo == 'dark'){
        texto.style.color = '#fff';
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.background = '#040125ff'
    }
    else if (tipo == 'dragon'){
        texto.style.color = '#fff';
        texto.style.background = '#ec1f1fff'
        texto.style.boxShadow = 'inset 0px 18px #214cc2ff' ;
    }
    else if (tipo == 'electric'){
        texto.style.color = '#000';
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.background = '#fbff00ff'
    }
    else if (tipo == 'fairy'){
        texto.style.color = '#000';
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.background = '#ff72f3ff'
    }
    else if (tipo == 'fighting'){
        texto.style.color = '#fff';
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.background = '#c95021ff'
    }
    else if (tipo == 'fire'){
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.background = '#ff6400ff'
    }
    else if (tipo == 'flying'){
        texto.style.color = '#000';
        texto.style.background = '#8b8d94ff'
        texto.style.boxShadow = 'inset 0px 18px #245bffff' ;
    }
    else if (tipo == 'ghost'){
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.background = '#4d0149ff'
    }
    else if (tipo == 'grass'){
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.color = '#000';
        texto.style.background = '#00e70cff'
    }
    else if (tipo == 'ground'){
        texto.style.color = '#000';
        texto.style.background = '#6d4700ff'
        texto.style.boxShadow = 'inset 0px 18px #da9500ff' ;
    }
    else if (tipo == 'ice'){
        texto.style.color = '#000';
        texto.style.background = '#00c8faff'
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
    }
    else if (tipo == 'normal'){
        texto.style.color = '#000';
        texto.style.background = '#8b8a8aff'
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
    }
    else if (tipo == 'water'){
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.background = '#004edfff'
    }
    else if (tipo == 'poison'){
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
        texto.style.background = '#97328fff'
    }
    else if (tipo == 'psychic'){
        texto.style.color = '#fff';
        texto.style.background = '#fc0069ff'
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
    }
    else if (tipo == 'rock'){
        texto.style.color = '#fff';
        texto.style.background = '#9b4b00ff'
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
    }
    else if (tipo == 'steel'){
        texto.style.color = '#fff';
        texto.style.background = '#5a6c8fff'
        texto.style.boxShadow = 'inset 0px 0px #da9500ff' ;
    }
}

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
        pokemonType1.style.display = 'inline'
        pokemonType2.style.display = 'inline';
        segundoTexto.style.display = 'inline';

        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonType1.src = `Imagens/${data['types']['0']['type']['name']}.png`
        primeiroTexto.innerHTML = data['types']['0']['type']['name'];
        cortexto(primeiroTexto,data['types']['0']['type']['name'])
        if (data['types']['1']){
            pokemonType2.src = `Imagens/${data['types']['1']['type']['name']}.png`
            segundoTexto.innerHTML = data['types']['1']['type']['name'];
            cortexto(segundoTexto,data['types']['1']['type']['name'])
        }
        else {
            pokemonType2.style.display = 'none';
            segundoTexto.style.display = 'none';
        }
        searchPokemon = data.id;
    }
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Não encontrado"
        pokemonId.innerHTML = ""
        pokemonType1.style.display = 'none';
        pokemonType2.style.display = 'none';
        segundoTexto.innerHTML = 'nada'
        primeiroTexto.innerHTML = 'nada'
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
    else{
        searchPokemon = 1;
        renderPokemon(searchPokemon)
    }
});

buttonPrev.addEventListener('click', ()=> {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    else{
        searchPokemon = 649;
        renderPokemon(searchPokemon)
    }
});

renderPokemon(searchPokemon)