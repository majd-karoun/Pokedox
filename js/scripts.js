let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // return all pokemons in the repository
  function getAll() {
    return pokemonList;
  }

  // add a pokemon object to the repository
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      return pokemonList.push(pokemon);
    }
  }

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
    // set and select variables
    let pokemonName = pokemon.name.toUpperCase();
    let pokemonHeight = pokemon.height;
    let li = document.createElement("li");
    let pokemonList = document.querySelector(".pokemon-list");
    let button = document.createElement("button");
    //generate the pokemon name
    button.innerText = pokemonName;
    button.classList.add("pokemon-label");
    pokemonList.appendChild(li);
    li.appendChild(button);
    // event listener to show details on button click
    button.addEventListener("click", () => showDetails(pokemon));
  }

  //show more details about the pokemon
  function showDetails(pokemon) {
    
    showLoadingMessage;
    loadDetails(pokemon).then(function () {
      hideLoadingMessage();
      console.log(pokemon)
      showModal(pokemon.name.toUpperCase(),`Height: ${pokemon.height}` , pokemon.imageUrl);
    });
  }

  // fetch pokemon names and urls and add them to the repository
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          hideLoadingMessage();
          add(pokemon);
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
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

function showModal(title, text, image) {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

  // Clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'X';
 closeButtonElement.addEventListener('click', hideModal);


  let titleElement = document.createElement('h2');
  titleElement.innerText = title;

  let contentElement = document.createElement('h3');
  contentElement.innerText = text;

  let imageElement = document.createElement('img');
  imageElement.setAttribute("src", image);

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(imageElement);
  modalContainer.appendChild(modal);



  modalContainer.classList.add('is-visible');
}

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});

window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});
