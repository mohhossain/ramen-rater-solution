// write your code here
let URL = "http://localhost:4000/ramens/";
let ramenMenuDiv = document.getElementById("ramen-menu");
let form = document.getElementById("new-ramen");
let editRamenForm = document.getElementById("edit-ramen");
let displayComment = document.querySelector("#comment-display");
let displayRating = document.querySelector("#rating-display");
let deleteButton = document.querySelector("#delete");

let ramenList = [];

let selectedRamen = {};
let selectedIndex = 0;

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
  ramens.forEach((ramen, index) => {
    console.log(ramen, index);

    let ramenImage = document.createElement("img");
    ramenImage.src = ramen.image;
    ramenImage.alt = ramen.name;

    ramenMenuDiv.append(ramenImage);

    ramenImage.addEventListener("click", function () {
      selectedRamen = ramen;
      selectedIndex = index;
      renderRamenDetails(ramen);

      deleteButton.addEventListener("click", function () {
        fetch(URL + ramen.id, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            let newRamenList = ramenList.filter(
              (keepRamen) => keepRamen.id !== ramen.id
            );

            ramenList = newRamenList;

            renderRamens(newRamenList);

            console.log(newRamenList);
          });
      });
    });
  });
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

  fetch(URL, {
    method: "POST",
    headers: {
      "content-type": "Application/json",
    },
    body: JSON.stringify(newRamen),
  })
    .then((res) => {
      return res.json();
      // if (res.ok) {
      //   res.json().then((data) => renderRamens([data]));
      // } else {
      //   console.log("Error");
      // }
    })
    .then((data) => {
      console.log(data);
      ramenList.push(data);
      renderRamens(ramenList);
    })
    .catch((err) => console.log(err));
  //   console.log([newRamen]);

  // renderRamens([newRamen]); //we are making this an array because objects are not iterable
});

editRamenForm.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(`http://localhost:4000/ramens/${selectedRamen.id}`, {
    method: "PATCH",
    headers: {
      "content-type": "Application/json",
    },
    body: JSON.stringify({
      rating: e.target.rating.value,
      comment: e.target["new-comment"].value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      displayComment.textContent = data.comment;
      displayRating.textContent = data.rating;
      ramenList[selectedIndex] = data;
      renderRamens(ramenList);
    });
  // .then(
  //   fetch("http://localhost:4000/ramens/")
  //     .then((res) => res.json())
  //     .then((data) => renderRamens(data))
  // );
});
