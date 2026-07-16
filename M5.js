
let pokemon = [];
async function fetchPokemonList() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const data = await response.json();
  pokemon = data.results.map((item, index) => ({
    ...item,
    id: index + 1,
  }));
  console.log(pokemon);
  displayPokemon(pokemon);
}
fetchPokemonList();

function filterPokemon(filter) {
  let filteredPokemon = [...pokemon];
  if (filter === "AtoZ") {
    filteredPokemon.sort((a, b) => a.name.localeCompare(b.name));
  } 
  else if (filter === "ZtoA") {
    filteredPokemon.sort((a, b) => b.name.localeCompare(a.name));
  } 
  else if (filter === "newID") {
    filteredPokemon.sort((a, b) => b.id - a.id);
  } 
  else if (filter === "oldID") {
    filteredPokemon.sort((a, b) => a.id - b.id);
  }
  displayPokemon(filteredPokemon);
}
    function displayPokemon(pokemonList) {
  const pokemonListElement = document.getElementById("pokemonList");

  pokemonListElement.innerHTML = pokemonList
    .map(
      (item) => `
        <div class="pokemon-card">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png"
            alt="${item.name}"
          >
          <p>#${item.id} ${item.name}</p>
        </div>
      `
    )
    .join("");
}

async function fetchData(){
    try{
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const responseName = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const dataName = await responseName.json();
        if(!responseName.ok){
          throw new Error("could not fetch response");
        }
        const pokemonSprite = dataName.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        const nameElement = document.querySelector(".pokemonName");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
        nameElement.textContent = dataName.name;
        return dataName;
      }
    catch(error){
        console.error(error);
    }
}
async function fetchDataType() {
  try {
    const pokemonType = document
      .getElementById("pokemonType")
      .value.trim()
      .toLowerCase();
    const responseType = await fetch(
      `https://pokeapi.co/api/v2/type/${pokemonType}/`
    );
    if (!responseType.ok) {
      throw new Error("Could not fetch Pokémon type");
    }
    const dataType = await responseType.json();
    const typedPokemon = dataType.pokemon.map((item) => {
      const id = item.pokemon.url.split("/").filter(Boolean).pop();
      return {
        name: item.pokemon.name,
        id: Number(id),
      };
    });

    displayPokemon(typedPokemon);
  } catch (error) {
    console.error(error);
  }
}

// async function fetchData(){
//     try{
//         const pokemonType = document.getElementsByClassName("pokemonType")[0].value.toLowerCase();
//         const response = await fetch(`https://pokeapi.co/api/v2/type/${name}/`);
//         if(!response.ok){
//             throw new Error("could not fetch response");
//         }
//         const data = await response.json();
//         const pokemonSprite = data.sprites.front_default;
//         const imgElement = document.getElementById("pokemonSprite");
//         const nameElement = document.querySelector(".pokemonName");
//         imgElement.src = pokemonSprite;
//         imgElement.style.display = "block";
//         nameElement.textContent = data.name;
//     }
//     catch(error){
//         console.error(error);
//     }
// }

