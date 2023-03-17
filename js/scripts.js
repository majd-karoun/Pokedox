let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Dragon",
      height: 20,
      type: ["ground", "fire"],
    },
    {
      name: "Tiger",
      height: 4,
      type: ["ground", "rock"],
    },
    {
      name: "Shark",
      height: 7,
      type: ["water", "blaze"],
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon && "height" in pokemon && "type" in pokemon) {
      return pokemonList.push(pokemon);
    }
  }

  // create a pokemon button and add it to .pokemon-list
  function addListItem(pokemon) {
    // set and select variables
    let pokemonName = pokemon.name;
    let pokemonHeight = pokemon.height;
    let li = document.createElement("li");
    let pokemonList = document.querySelector(".pokemon-list");
    let button = document.createElement("button");

    //render the pokemon names
    button.innerText = pokemonName;
    button.classList.add("pokemon-label");
    pokemonList.appendChild(li);
    li.appendChild(button);

    // event listener
    button.addEventListener('click',()=> showDetails(pokemon))
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }
  
  return {
    getAll,
    add,
    addListItem
  };
})();
//////////////////////////////////////////////


// add to pokemon to the repository
pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });
////////////////////////////////////////////


// iterate through and render the pokemon list
pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon)
});
//////////////////////////////////////////////////////////

