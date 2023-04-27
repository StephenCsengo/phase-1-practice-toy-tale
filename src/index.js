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
function RenderOneCard(toy) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img class="toy-avatar" src="${toy.image}">
    <p>${toy.likes} likes</p>
    <button class="like-btn">Like ❤️</button>
  `;
  //Add card to DOM
  document.getElementById("toy-collection").appendChild(card);
}

function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(response =>response.json())
  .then(toys => toys.forEach(toy => RenderOneCard(toy)));
}
function handleSumbit(e) {
  e.preventDefault();
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  };
  fetch("http://localhost:3000/toys"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  };
}
document.querySelector(".add-toy-form").addEventListener("submit", handleSumbit)