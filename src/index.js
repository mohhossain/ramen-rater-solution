// write your code here
let ramenMenuDiv = document.getElementById("ramen-menu");
let form = document.getElementById("new-ramen");
let editRamenForm = document.getElementById("edit-ramen");
let displayComment = document.querySelector("#comment-display");
let displayRating = document.querySelector("#rating-display");
let deleteButton = document.querySelector("#delete");

let ramenList = [];

fetch("http://localhost:4000/ramens")
  .then((response) => response.json())
  .then((ramens) => {
    ramenList = ramens;
    renderRamens(ramens);
    renderRamenDetails(ramens[0]);
  });

// renderRamens()

// function fetchRamens
function renderRamens(ramens) {
  ramenMenuDiv.innerHTML = "";
  for (let ramen of ramens) {
    console.log(ramen);

    let ramenImage = document.createElement("img");
    ramenImage.src = ramen.image;
    ramenImage.alt = ramen.name;

    ramenMenuDiv.append(ramenImage);

    ramenImage.addEventListener("click", function () {
      let displayRamenImage = document.querySelector(".detail-image");
      displayRamenImage.src = ramen.image;

      let displayName = document.querySelector(".name");
      displayName.textContent = ramen.name;

      let displayRestaurant = document.querySelector(".restaurant");
      displayRestaurant.textContent = ramen.restaurant;

      displayRating.textContent = ramen.rating;

      displayComment.textContent = ramen.comment;

      deleteButton.addEventListener("click", function () {
        let newRamenList = ramenList.filter(
          (keepRamen) => keepRamen.id !== ramen.id
        );

        ramenList = newRamenList;

        renderRamens(newRamenList);

        console.log(newRamenList);
      });
    });
  }
}

// DRY -> DO NOT REPEAT YOURSELF!!!!!!
function renderRamenDetails(ramen) {
  console.log("clicking image");
  let displayRamenImage = document.querySelector(".detail-image");
  displayRamenImage.src = ramen.image;

  let displayName = document.querySelector(".name");
  displayName.textContent = ramen.name;

  let displayRestaurant = document.querySelector(".restaurant");
  displayRestaurant.textContent = ramen.restaurant;

  displayRating.textContent = ramen.rating;

  displayComment.textContent = ramen.comment;

  deleteButton.addEventListener("click", function () {
    let newRamenList = ramenList.filter(
      (keepRamen) => keepRamen.id !== ramen.id
    );

    console.log(newRamenList);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(
    e.target.name.value,
    e.target.restaurant.value,
    e.target.image.value,
    e.target["new-comment"].value
  );

  let newRamen = {
    name: e.target.name.value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target["new-comment"].value,
  };
  //   console.log([newRamen]);

  renderRamens([newRamen]); //we are making this an array because objects are not iterable
});

editRamenForm.addEventListener("submit", function (e) {
  e.preventDefault();
  displayComment.textContent = e.target["new-comment"].value;
  displayRating.textContent = e.target.rating.value;
});
