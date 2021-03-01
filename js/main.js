//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const poke1 = document.querySelector('#poke1').value
  const url = 'https://pokeapi.co/api/v2/pokemon/'+poke1
  let pokeStore = []
  let pokeImg = []

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        let pokemonName = data.name;
        pokemonName = capitalize(pokemonName);
        document.querySelector('#name1').innerText = pokemonName;

        let sprites = data.sprites;
        setSprites(sprites);

        pokeStore.push(data.types[0].type.name)
        pokeImg.push(data.sprites.front_shiny)

        let speciesUrl = data.species.url;

        fetch(speciesUrl)
        .then(res=>res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(`error ${err}`)
        })

      })
      .catch(err => {
          console.log(`error ${err}`)
      });



      
}

function setSprites(arrayOfSprites) {
  let urlArray = Object.values(arrayOfSprites);
  for (let i = 0 ; i < urlArray.length; i++) {
    if (urlArray[i] !== null) {
      let imgElement = document.createElement("img");
      imgElement.setAttribute('src', urlArray[i])
      imgElement.id = "sprite" + i;
      document.querySelector('#showSprites').appendChild(imgElement);
    }
  }

}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}