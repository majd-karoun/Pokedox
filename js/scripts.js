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

  let pokemon = pokemonList[i].name
  let pokemonHeight = pokemonList[i].height
   
  // check if pokemon is Dragon
  if (pokemon=== "Dragon") {
    document.write(pokemon + '(height' + pokemonHeight +')'+ ' that is huge!'
    )
  } 
  
  else {
    document.write(pokemon + '(height' + pokemonHeight +')');
  }
 
}
