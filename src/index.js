// write your code here

let ramenMenuDiv = document.getElementById("ramen-menu");
let form = document.getElementById("new-ramen");

fetch("http://localhost:4000/ramens")
  .then((response) => response.json())
  .then((ramens) => renderRamens(ramens));

function renderRamens(ramens) {
  for (let ramen of ramens) {
    console.log(ramen);

    let ramenImage = document.createElement("img");
    ramenImage.src = ramen.image;
    ramenImage.alt = ramen.name;

    ramenMenuDiv.append(ramenImage);

    ramenImage.addEventListener("click", function () {
      //   console.log("Image is clicked");
      let displayRamenImage = document.querySelector(".detail-image");
      displayRamenImage.src = ramen.image;

      let displayName = document.querySelector(".name");
      displayName.textContent = ramen.name;

      let displayRestaurant = document.querySelector(".restaurant");
      displayRestaurant.textContent = ramen.restaurant;

      document.querySelector("#rating-display").textContent = ramen.rating;

      let displayComment = document.querySelector("#comment-display");
      displayComment.textContent = ramen.comment;
    });
  }
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
