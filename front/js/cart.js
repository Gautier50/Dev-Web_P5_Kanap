let cartItem = document.getElementById("cart__items");

// DÉCLARATION DES VARIABLES PRIX TOTAL, QUANTITÉ TOTALE ET CHANGEMENT DE QUANTITÉ //
var totalPrice = 0;
var totalQuantity = 0;
var changeQuantity = 0;

// AFFICHAGE DU TABLEAU COMPRENANT CHAQUE ARTICLES //
let recupLs = JSON.parse(localStorage.getItem("productList"));
console.log(recupLs);

// AFFICHAGE DE CHACUN DES ARTICLES DU TABLEAU DANS LA BOUCLE FOREACH //
recupLs.forEach((recupL, index) => {
  console.log(recupL);
  fetch(`http://localhost:3000/api/products/${recupL.id}`)
    .then((res) => res.json())
    .then((res) => {
      let baliseArticle = document.createElement("article");
      baliseArticle.setAttribute("class", "cart__item");
      baliseArticle.setAttribute("data-id", res.id);
      baliseArticle.setAttribute("data-color", recupL.color);
      cartItem.appendChild(baliseArticle);

      let baliseDivImg = document.createElement("div");
      baliseDivImg.setAttribute("class", "cart__item__img");
      baliseArticle.appendChild(baliseDivImg);

      let baliseImg = document.createElement("img");
      baliseImg.setAttribute("alt", "Photographie d'un canapé");
      baliseImg.setAttribute("src", res.imageUrl);
      baliseDivImg.appendChild(baliseImg);

      let baliseItemContent = document.createElement("div");
      baliseItemContent.setAttribute("class", "cart__item__content");
      baliseArticle.appendChild(baliseItemContent);

      let baliseItemContentDescription = document.createElement("div");
      baliseItemContentDescription.setAttribute(
        "class",
        "cart__item__content__description"
      );
      baliseItemContent.appendChild(baliseItemContentDescription);

      let baliseName = document.createElement("h2");
      baliseName.innerText = res.name;
      baliseItemContentDescription.appendChild(baliseName);

      let baliseColor = document.createElement("p");
      baliseColor.innerText = recupL.color;
      baliseItemContentDescription.appendChild(baliseColor);

      let balisePrice = document.createElement("p");
      balisePrice.innerText = res.price + " €";
      totalPrice = totalPrice + res.price * recupL.quantity;
      baliseItemContentDescription.appendChild(balisePrice);

      totalQuantity = totalQuantity + recupL.quantity;

      let baliseItemContentSettings = document.createElement("div");
      baliseItemContentSettings.setAttribute(
        "class",
        "cart__item__content__settings"
      );
      baliseItemContent.appendChild(baliseItemContentSettings);

      let baliseItemContentSettingsQuantity = document.createElement("div");
      baliseItemContentSettingsQuantity.setAttribute(
        "class",
        "cart__item__content__quantity"
      );
      baliseItemContentSettings.appendChild(baliseItemContentSettingsQuantity);

      let baliseProductQuantity = document.createElement("p");
      baliseProductQuantity.innerText = "Qté : ";
      baliseItemContentSettingsQuantity.appendChild(baliseProductQuantity);

      let baliseInputQuantity = document.createElement("input");
      baliseInputQuantity.setAttribute("type", "number");
      baliseInputQuantity.setAttribute("class", "itemQuantity");
      baliseInputQuantity.setAttribute("name", "itemQuantity");
      baliseInputQuantity.setAttribute("min", "1");
      baliseInputQuantity.setAttribute("max", "100");
      baliseInputQuantity.setAttribute("value", recupL.quantity);
      baliseItemContentSettingsQuantity.appendChild(baliseInputQuantity);

      // MODIFICATION DES QUANTITÉS D'UN PRODUIT DANS LE PANIER //
      baliseInputQuantity.addEventListener("change", function (e) {
        let valueQuantityInput = baliseInputQuantity.value;
        recupLs[index].quantity = valueQuantityInput;
        localStorage.setItem("productList", JSON.stringify(recupLs));
      });

      // MISE À JOUR QUANTITÉS DES PRODUITS //
      
      

    
      let baliseItemContentSettingsDelete = document.createElement("div");
      baliseItemContentSettingsDelete.setAttribute(
        "class",
        "cart__item__content__delete"
      );
      baliseItemContentSettings.appendChild(baliseItemContentSettingsDelete);

      // SUPPRESSION DES ARTICLES DU PANIER //
      let baliseDeleteItem = document.createElement("p");
      baliseDeleteItem.setAttribute("class", "deleteItem");
      baliseItemContentSettingsDelete.appendChild(baliseDeleteItem);
      baliseDeleteItem.textContent = "Supprimer";
      baliseDeleteItem.addEventListener("click", (e) => {
        recupLs.splice(index, 1);
        localStorage.setItem("productList", JSON.stringify(recupLs));
        location.reload();
      });

      //          AFFICHAGE DU PRIX TOTAL         //
      var baliseTotalPrice = document.getElementById("totalPrice");
      baliseTotalPrice.innerText = totalPrice;

      // CALCUL DU NOMBRE TOTAL DE PRODUITS DANS LE PANIER //
      var baliseTotalQuantity = document.getElementById("totalQuantity");
      baliseTotalQuantity.innerText = totalQuantity;
    });
});

//              FORMULAIRE            //

// FORMULAIRE DE CONTACT, VÉRIFICATION DU FORMULAIRE UNIQUEMENT AU CLIC SUR LE BOUTON COMMANDER //
const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => {
  submitForm();
});

function submitForm(e) {
  e.preventDefault();
  if (cart.length === 0) alert("Veuillez ajouter des articles au panier");
  const body = makeRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  then((res) => res.json());
  then((data) => console.log(data));
  console.log(form.elements.firstName.value);
}
function makeRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const body = {
    contact: {
      firstName: "firstName",
      lastName: "lastName",
      adress: "adress",
      city: "city",
      email: "email",
    },
    products: ["productsId"],
  };
  return body;
}

// function form() {
//   var inputFirstName = document.getElementById("firstName").value;
//   var inputLastName = document.getElementById("lastName").value;
//   var inputAdress = document.getElementById("address").value;
//   var inputCity = document.getElementById("city").value;
//   var inputEmail = document.getElementById("email").value;

//   console.log(inputAdress);

//   var baliseFirstNameErrorMessage =
//     document.getElementById("firstNameErrorMsg");
//   var baliseLastNameErrorMessage = document.getElementById("lastNameErrorMsg");
//   var baliseAdressErrorMessage = document.getElementById("addressErrorMsg");
//   var baliseCityErrorMessage = document.getElementById("cityErrorMsg");
//   var baliseEmailErrorMessage = document.getElementById("emailErrorMsg");

//   let regexFirstName = /^[a-zA-Z0-9]+$/;
//   let regexLastName = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
//   let regexAdress = /^([0-9]*) ([a-zA-Z,\. ]*)/;
//   let regexCity = /^[a-zA-Z ]+$/;
//   let regexEmail = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

//   FormIsGood = true;

//   // VÉRIFICATION PRÉNOM //
//   if (regexFirstName.test(inputFirstName) === false) {
//     baliseFirstNameErrorMessage.innerHTML += `Erreur de prénom`;
//     FormIsGood = false;
//   }

//   // VÉRIFICATION NOM //
//   if (regexLastName.test(inputLastName) === false) {
//     baliseLastNameErrorMessage.innerHTML += `Erreur de nom`;
//     FormIsGood = false;
//   }

//   // VÉRIFICATION ADRESSE //
//   if (regexAdress.test(inputAdress) === false) {
//     baliseAdressErrorMessage.innerHTML += `Erreur d'adresse`;
//     FormIsGood = false;
//   }

//   // VÉRIFICATION VILLE //
//   if (regexCity.test(inputCity) === false) {
//     baliseCityErrorMessage.innerHTML += `Erreur de nom de ville`;
//     FormIsGood = false;
//   }

//   // VÉRIFICATION EMAIL //
//   if (regexEmail.test(inputEmail) === false) {
//     baliseEmailErrorMessage.innerHTML += `Erreur d'adresse Email`;
//     FormIsGood = false;
//   }
//   if (FormIsGood === true) {
//     alert("Vous avez remplis tout les champs");
//   }
//   return false;
// }
