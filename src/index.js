let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //Add toy cards
  getAllToys()
});

//Render json data into html
function RenderOneCard(toy) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img class="toy-avatar" src="${toy.image}">
    <p><span>${toy.likes}</span> likes</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>
  `;
  //Add event listener to like btn
  card.querySelector(".like-btn").addEventListener("click", (e) => {
    toy.likes++;
    card.querySelector("span").textContent = toy.likes;
    updateToy(toy);
  })
  //Add card to DOM
  document.getElementById("toy-collection").appendChild(card);
}

//Add new toy to the DOM and post to the db.json file
function handleSumbit(e) {
  e.preventDefault();
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  };
  RenderOneCard(toyObj);
  postToy(toyObj);
}

//Get data on all toys and pass to render card 
function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(response =>response.json())
  .then(toys => toys.forEach(toy => RenderOneCard(toy)));
}

//Update json file with new info
function updateToy(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  });
}

//Add new toy to json file
function postToy(toy) {
  fetch("http://localhost:3000/toys", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  });
}

//Add event listener to toy form
document.querySelector(".add-toy-form").addEventListener("submit", handleSumbit)