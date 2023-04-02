let pokemonRepository = (function () {
  
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let searchInput = document.querySelector("#search-input");

  // return all pokemons in the repository
  function getAll() {
    return pokemonList;
  }

  // search for a pokemon
  searchInput.addEventListener("input", function () {
    pokemonRepository.filterSearch(searchInput);
  });

  function filterSearch(searchInput) {
    let filterValue = searchInput.value.toLowerCase();
  
    // filter the pokemonList array based on the filterValue
    let filteredPokemon = pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
    });
  
    // update the displayed list of Pokemon based on the filtered results
    let pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = "";
    filteredPokemon.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  }
  

  // show a loading message
  function showLoadingMessage() {
    let message = document.createElement("h1");
    message.classList.add("loading-message");
    message.innerHTML = "Loading...";
    body = document.querySelector("body");
    body.appendChild(message);
  }

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  // turns passed pokemon into a button and add it to the dom
  function addListItem(pokemon) {
    loadDetails(pokemon).then(function () { // load details before creating the button
      // set and select variables
      let pokemonName = pokemon.name.toUpperCase();
      let pokemonHeight = pokemon.height;
      let li = document.createElement("li");
      li.classList.add("card")
      let pokemonList = document.querySelector(".pokemon-list");
      let image = document.createElement("img");
      image.setAttribute("src", pokemon.imageUrl); // set the image source to the Pokemon's image URL
      image.classList.add("pokemon-image"); // add a class for styling the image
      let button = document.createElement("button");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("data-target", "#exampleModal");
      // generate the pokemon name
      button.innerText = pokemonName;
      button.classList.add("pokemon-label", "btn");
      pokemonList.appendChild(li);
      li.appendChild(image); // add the image to the list item
      li.appendChild(button);
      // event listener to show details on button click
      button.addEventListener("click", () => showDetails(pokemon));
    });
  }

  // add a pokemon object to the repository
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      return pokemonList.push(pokemon);
    }
  }

  // fetch pokemon names and urls and add them to the repository
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        let pokemonPromises = json.results.map(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          return loadDetails(pokemon); // return a promise that resolves with the modified Pokemon object
        });
        return Promise.all(pokemonPromises); // wait for all promises to resolve before continuing
      })
      .then(function (pokemonList) {
        console.log(pokemonList);
        hideLoadingMessage();
        pokemonList.forEach(function (pokemon) {
          pokemonRepository.add(pokemon); // add the modified Pokemon object to the repository
          pokemonRepository.addListItem(pokemon); // create the list item with the modified Pokemon object
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  //fetch more details about each pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        console.log(details)
        item.imageUrl = details.sprites.front_default;
        item.imageBackUrl = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types;
        item.abilities = details.abilities;
        item.experience = details.base_experience;
        item.experience = details.base_experience;
        return item; // return the modified Pokemon object
      })
      .catch(function (e) {
        console.error(e);
      });
  }

    //show more details about the pokemon
    function showDetails(pokemon) {
    
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }
  

  

  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
    filterSearch,
  };
})();
//////////////////////////////////////////////

// calling fetch to api then adding results to the repository
pokemonRepository
  .loadList()
  .then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  })
  .then(function () {
    console.log(pokemonRepository.getAll());
  });
//////////////////////////////////////////////////////////

function showModal(item) {
  let modalBody = document.querySelector(".modal-body");
  let modalTitle = document.querySelector(".modal-title");
  let modalHeader = document.querySelector(".modal-header");

  modalTitle.innerHTML = "";
  modalBody.innerHTML = "";

  //creating an elements for the modal content
  let nameElement = document.createElement("h3");
  nameElement.textContent = item.name.toUpperCase() ;

  let imageElement = document.createElement("img");
  imageElement.setAttribute("class", "modal-img");
  imageElement.setAttribute("style", "width:50%");
  imageElement.setAttribute("src", item.imageUrl);
  
  let imageBackElement = document.createElement("img");
  imageBackElement.setAttribute("class", "modal-img");
  imageBackElement.setAttribute("style", "width:50%");
  imageBackElement.setAttribute("src", item.imageBackUrl);

  let heightElement = document.createElement("h3");
  heightElement.textContent = "height: " + item.height;

  let experienceElement = document.createElement("h3");
  experienceElement.textContent = "experience: " + item.experience;
  
  let typesElement = document.createElement("h3");
  typesElement.textContent =
    "types: " + item.types.map((type) => type.type.name).join(", ");

  
  let abilitiesElement = document.createElement("h3");
  abilitiesElement.textContent =
    "abilities: " + item.abilities.map((ability) => ability.ability.name).join(", ");

  

  modalTitle.appendChild(nameElement);
  modalBody.appendChild(imageElement);
  modalBody.appendChild(imageBackElement);
  modalBody.appendChild(experienceElement);
  modalBody.appendChild(heightElement);
  modalBody.appendChild(typesElement);
  modalBody.appendChild(abilitiesElement);
}
