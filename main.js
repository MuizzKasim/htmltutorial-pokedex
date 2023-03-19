// const is a constant variable Once it is declared, it cannot be re-assigned anymore. Except via hardcoding. Unlike let variable, which can still be re-assigned after it is declared. Both const and let have limited scope. Attempting to re-assign a const will return an error
// async means asynchronous (XML technology). async makes a function return a Promise object. Async programming allows your program to start a potentially long-running task and still be able to be responsive to other events while that task is still running, rather than having to wait until that task has finished before it can resolve other task. Once the async task is finished, your program is presented with the result (Promise object)
// => is s shorthand notation for function 
//` ` notation is required for using string template literal. It is called the backtick symbol or tilde symbol. Template literal allows for multi-line strings, string interpolation - which are expressed using embedded expression, and special constructs
// ${expression} is a template literal embedded expression. It is used for string interpolation (adding new data to string dynamically)
// await keyword makes the function pause the execution and wait for a resolved Promise object before it continues futher execution. await keyword can only be used inside an async function.
// id refers to the function's parameter (single parameter in this case)
// fetch keyword is a XML technology. It is used to start the process of fetching resources from a server
// json means JavaScript Object Notation (JSON), standard text-based format for representing structured data based on JavaScript object syntax. Used commonly for transmitting data in web applications. E.g. Sending data from and to server and client.
const poke_container = document.getElementById('poke-container');
const pokemons_number = 1008;


const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    // console.log(pokemon);
    createPokemonCard(pokemon);
}

// call this function for testing
// get pokemon object of id number 1 i.e. bulbasaur
// getPokemon(1);

//Use this function to loop and gather all 158 pokemon data 
const fetchPokemon = async() =>{
    for (let i=1; i<=pokemons_number; i++){
        await getPokemon(i);
    }
}

//The function expression below carries the same meaning as the one above
// let fetchPokemon = async function(){
//     for (let i=1; i<=pokemons_number; i++){
//         await getPokemon(i);
//     }
// }

//Create a pokemon card
//Using pokemon object data obtained, pass the data into the createPokemonCard function
//and create a graphics around the data
const createPokemonCard = (pokemon) => {
    //this must be declared first
    const poke_container = document.getElementById('poke_container');

    //El stands for Element
    //create <div></div> tag in the html dynamically
    const pokemonEl = document.createElement('div');
    //for each newly created pokemon div, assign its class to 'pokemon'
    pokemonEl.classList.add('pokemon');

    const {id, name, sprites, types} = pokemon; //extract the id, name, sprites, types data of object into this const variable
    let pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); //Capitalize the first letter of each pokemon name

    //this logic is to prevent some weird pokemon names related to gender or abilites; such as nidoran-male and nidoran-female
    //an exception is make for Ho-oh cus that guys has a weird name too
    if(pokemonName.indexOf('-')!==-1 && pokemonName !== 'Ho-oh'){
        pokemonName = pokemonName.slice(0,pokemonName.indexOf('-'));
    }

    let type = types[0].type.name; //obtain the first type of pokemon in string
    type = type.charAt(0).toUpperCase() + type.slice(1); //capitalise the first letter of pokemon type

    //obtains each pokemon name into string and stores it in pokeInnerHTML variable
    const pokeInnerHTML = `
    <div class="img-container">
        <img src='${sprites.front_default}' alt='${name}' />
    </div>
    <div class='info'>
        <span class='number'>${id}</span>
        <h3 class='name'>${pokemonName}</h3>
        <small class='type'>Type: <span>${type}</span></small>
    </div>
    `;
    
    //transfer pokemon name to the div string
    pokemonEl.innerHTML = pokeInnerHTML;

    //make the pokemon card a child of poke_container
    poke_container.appendChild(pokemonEl);
}


//call this function
fetchPokemon();