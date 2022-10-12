const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

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

//  AFFICHAGE DES ARTICLES DE LA PAGE PRODUCT //
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

  // On Attribue une couleur à chacun des articles //
  colors.forEach((color) => {
    // Création de l'élément "option" dans lequel on retrouve la couleur de l'article //
    const option = document.createElement("option");
    option.value = color;

    // Affichage du texte de la couleur //
    option.textContent = color;

    // Affichage des options de couleur dans la console //
    console.log(option);
    select.appendChild(option);
  });
}

//                LOCAL STORAGE                //

const Kanap = window.localStorage.getItem("nom");

// Récupération du bouton "addToCart" dans le HTML //
let button = document.getElementById("addToCart");

// Écoute de l'évènement click sur le bouton //
button.addEventListener("click", function (e) {
  // Récupération de la couleur et de la quantité dans le HTML //
  let quantity = document.getElementById("quantity").value;
  let colors = document.getElementById("colors").value;

  // Modification du style et du texte du bouton "ajouter au panier" //
  document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
  document.querySelector("#addToCart").textContent = "Produit ajouté !";

  // Récupération du Local Storage //
  let ListLocalStorage = JSON.parse(localStorage.getItem("productList"));

  // Si mon Local Storage est nul
  // Alors on écrit un tableau vide dans notre Local Storage //
  if (ListLocalStorage == null) {
    localStorage.setItem("productList", JSON.stringify([]));
  }

  // On récupère à nouveau notre Local Storage //
  let listLocalStorage = JSON.parse(localStorage.getItem("productList"));

  var articleExist = false;

  // Boucle forEach sur notre Local Storage //
  listLocalStorage.forEach((OneArticle, index) => {
    console.log(OneArticle);
    console.log(id);
    console.log(colors);

    // Si un article a déjà cet id et cette couleur,
    // Alors on ajoute la quantité achetée sur l'article correspondant
    // On actualise le Local Storage avec le nouvel article //
    if (OneArticle.id == id && OneArticle.color == colors) {
      listLocalStorage[index].quantity =
        parseInt(listLocalStorage[index].quantity) + parseInt(quantity);
      localStorage.setItem("productList", JSON.stringify(listLocalStorage));
      articleExist = true;
    }
  });

  // Si l'article existe déjà, on lui ajoute la quantité souhaitée //
  if (articleExist == false) {
    // On crée une variable comprenant l'id, la couleur et la quatité du ou des nouveaux kanap //
    let newKanap = {
      id: id,
      color: colors,
      quantity: parseInt(quantity),
    };

    // On push notre Local Storage avec le ou les nouveaux kanaps //
    listLocalStorage.push(newKanap);

    // On actualise le Local Storage avec le ou les nouveaux kanaps //
    localStorage.setItem("productList", JSON.stringify(listLocalStorage));
  }
});
