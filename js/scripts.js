let body = $('.body'
)

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

// loop over Pokemon List
for (let i = 0; i < pokemonList.length; i++) {
  // check if pokemon is Tiger
  let pokemon = pokemonList[i].name
  if (pokemon.name=== "Dragon") {
    document.write(
      `${pokemon.name} (height ${
        pokemon.name
      }) ${"Wow, that's fast!"}`
    );
  } else {
    document.write(`${pokemonList[i].name} (height ${pokemonList[i].height})`);
  }
  let typesElement = $(
    '<p>' + '<strong>' + 'Type/s: ' + '</strong>' + '</p>'
  )
 
}
