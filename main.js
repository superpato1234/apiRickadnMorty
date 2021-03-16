//Constante
const url = "https://rickandmortyapi.com/api/character";
//Selectores
let ignition = document.querySelector("#ignition");
let container = document.querySelector(".container");
let height = 0;
let secondPage = "";
let allData = {};
//Functions
function getData() {
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      fetch(data.info.next)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          console.log(data);
          for (let per of data.results) {
            const { name, image } = per;
            displayData(name, image);
          }
        });
      for (let per of data.results) {
        const { name, image } = per;
        displayData(name, image);
      }
    });
}

function displayData(name, img) {
  let div = document.createElement("div");
  div.className = "character";
  div.innerHTML = `<img src="${img}"/><p>${name}</p>`;
  container.appendChild(div);
  div.addEventListener("click", (e) => {
    height += 475;
    if (height > 18700) height = 0;
    container.style.transition = "all cubic-bezier(.15,-0.7,.83,.67) 1s";
    container.style.transform = `translateY(-${height}px)`;
  });
}

//Listener
ignition.addEventListener("click", getData);
getData();
