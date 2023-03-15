

let pokemonRepository = (function(){
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

  function getAll(){
    return pokemonList
  }

  function add(item){
    return pokemonList.push(item)
  }

  return{
  
    getAll,
    add
  }

}())


pokemonRepository.getAll().forEach(item => {
  let pokemon = item.name;
  let pokemonHeight = item.height;
   // check if pokemon is Dragon
   if (pokemon === "Dragon") {
    document.write(
      pokemon + "(height" + pokemonHeight + ")" + " That is huge!" + '<br>'
    );
  } else {
    document.write(pokemon + "(height" + pokemonHeight + ")" + '<br>');
  }
})
