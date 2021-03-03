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
        changeBackgroundColor(getMainType(data));       // Checks the main type of the pokemon and changes background color to it.
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
      // .catch(err => {
      //     console.log(`error ${err}`)
      // });



      
}

function setSprites(arrayOfSprites) {
  let urlArray = Object.values(arrayOfSprites);
  for (let i = 0 ; i < urlArray.length; i++) {
    if (urlArray[i] !== null) {
      // Add an if statement to test if first letters of string === https.
      if (typeof(urlArray[i]) === 'string'  && urlArray[i].substring(0,4) ==="http") {
        let imgElement = document.createElement("img");
      imgElement.setAttribute('src', urlArray[i])
      imgElement.id = "sprite" + i;
      document.querySelector('#showSprites').appendChild(imgElement);
      }
    }
  }
  

}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getMainType(pokemonData) {
  let types = [];
  let arrayOfType = pokemonData.types;
  arrayOfType.forEach(element => types.push(element.type.name));
  return types[0];
}

function changeBackgroundColor(element) {
  switch(element)  {
    case "fire":
      document.querySelector('body').style.backgroundColor = "rgba(255, 144, 0, 1)";
      break;
    case "water":
      document.querySelector('body').style.backgroundColor = "rgba(0, 204, 249, 1)";
      break;
    case "grass":
      document.querySelector('body').style.backgroundColor = "rgba(0, 210, 117, 1)"; 
      break;
    case "electric":
      document.querySelector('body').style.backgroundColor = "rgba(219, 255, 0, 0.57)";  
      break;
    default:
      document.querySelector('body').style.backgroundColor = "rgba(221, 229, 218, 0.89)"; 
  }
}