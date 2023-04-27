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
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(renderCards)
});

function renderCards(cards) {
  const toyCollection = document.getElementById("toy-collection");
  cards.forEach(data => {
    //Create a div for each card
    const card = document.createElement("div");
    card.classList.add("card");
    //Add title
    const h2 = document.createElement("h2");
    h2.innerText = data.name;
    //Add image
    const img = document.createElement("img");
    img.src = data.image;
    img.classList.add("toy-avatar");
    //Add like counter
    const p = document.createElement("p");
    p.innerText = `${data.likes} Likes`;
    //Add like button
    const btn = document.createElement("button");
    btn.innerText = "Like ❤️";
    btn.classList.add("like-btn");
    //Append all to card and append card to toyCollection
    card.append(h2, img, p, btn);
    toyCollection.appendChild(card);
  })
}

function handleSumbit(e) {
  e.preventDefault();
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  }
}
