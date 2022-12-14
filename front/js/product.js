const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
if (id != null) {
  let imageUrl, altText, articleName;
}

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => Otherdata(res));

function Otherdata(Kanap) {
  console.log({ Kanap });
  const { altTxt, colors, description, imageUrl, name, price } = Kanap;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}

function makeTitle(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;
}

function makePrice(price) {
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;
}

function makeDescription(description) {
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;
}

function makeColors(colors) {
  const select = document.querySelector("#colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      console.log(option);
      select.appendChild(option);
    });
  }
}

//-----localStorage-------------
const Kanap = window.localStorage.getItem("nom");

let button = document.getElementById("addToCart");
button.addEventListener("click", function (e) {
  
  let quantity = document.getElementById("quantity").value;
  let colors = document.getElementById("colors").value;

  let ListLocalStorage = JSON.parse(localStorage.getItem("List"));
  if (ListLocalStorage == null) {
    localStorage.setItem("List", JSON.stringify([]));
  }

  let listLocalStorage = JSON.parse(localStorage.getItem("List"));

  var articleExist = false;

  listLocalStorage.forEach((OneArticle, index) => {
    console.log(OneArticle);
    console.log(id);
    console.log(colors);
    if (OneArticle.id == id && OneArticle.color == colors) {
      listLocalStorage[index].quantity =
        parseInt(listLocalStorage[index].quantity) + parseInt(quantity);
      localStorage.setItem("List", JSON.stringify(listLocalStorage));
      articleExist = true;
    }
  });
  if (articleExist == false) {
    let newKanap = {
      id: id,
      color: colors,
      quantity: quantity,
    };

    listLocalStorage.push(newKanap);
    localStorage.setItem("List", JSON.stringify(listLocalStorage));
  }
});
