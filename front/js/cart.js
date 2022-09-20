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
        
        // baliseTotalPrice();
        // baliseTotalQuantity();
        // alert(baliseInputQuantity.value);
        // alert (index);
      });

      // CHANGEMENT DE LA QUANTITÉ DE PRODUITS //
      // function changeQuantity() {
      //   const quantityElement = e.target.closest("input.itemQuantity").value;

      //   if (quantityElement != null) {
      //     const productId = e.target
      //       .closest("article.cart__item")
      //       .getAttribute("data-id");
      //     const productColor = e.target
      //       .closest("article.cart__item")
      //       .getAttribute("data-color");

      //     let cart = JSON.parse(localStorage.getItem("productList"));

      //     let foundProduct = cart.findIndex(
      //       (p) => p._id === productId && p.option === productColor
      //     );
      //   }

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

//              FORMULAIRE                 //

// VARIABLES REGEX POUR ÉVITER LES ERREURS DE CARACTÈRES //
let regEx1 = /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;
let regEx2 = /^[a-zA-Z\-1-9]+$/;

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const addresse = document.getElementById("address");
const ville = document.getElementById("city");
const mail = document.getElementById("email");

let valuePrenom, valueNom, valueAdresse, valueVille, valueMail;

prenom.addEventListener("input", function (e) {
  valuePrenom;
  if (e.target.value.length == 0) {
    errorPrenom.innerHTML = "";
    valuePrenom = null;
  } else if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    errorPrenom.innerHTML = "";
    valuePrenom = e.target.value;
  }
});

let checkFormulaire = {
  firstName: false,
  lastName: false,
  address: false,
  city: false,
  email: false,
};

// FORMULAIRE DE CONTACT, VÉRIFICATION DU FORMULAIRE UNIQUEMENT AU CLIC SUR LE BOUTON COMMANDER //
const button = document.getElementById("order");
button.addEventListener("click", (e) => {
  e.preventDefault();
});

// VÉRIFICATION PRÉNOM //
function validFirstName() {
  let firstName = document.getElementById("firstName").value;
  let text = document.getElementById("firstNameErrorMsg");

  let pattern = RegEx1;
  let number = RegEx2;

  if (firstName.match(pattern)) {
    text.innerHTML = "Prénom valide";

    checkFormulaire.firstName = true;
    return firstName;
  } else if (firstName.match(number)) {
    alert("Les chiffres ne sont pas tolérés");

    checkFormulaire.firstName = false;
  } else {
    text.innerHTML = "Merci de rentrer un prénom valide";

    checkFormulaire.firstName = false;
  }
}

// VÉRIFICATION NOM //
function validLastName() {
  let firstName = document.getElementById("lastName").value;
  let text = document.getElementById("lastNameErrorMsg");

  let pattern = RegEx1;
  let number = RegEx2;

  if (firstName.match(pattern)) {
    text.innerHTML = "Nom valide";

    checkFormulaire.firstName = true;
    return firstName;
  } else if (firstName.match(number)) {
    alert("Les chiffres ne sont pas tolérés");

    checkFormulaire.firstName = false;
  } else {
    text.innerHTML = "Merci de rentrer un nom valide";

    checkFormulaire.firstName = false;
  }
}

// VÉRIFICATION ADRESSE //
//   let baliseCartOrder = document.querySelectorAll(
//     'input [type="text"], input [type="email"]'
//   );

// const errorDisplay = (tag, message, valid) => {
// const container = document.querySelector("." + tag + "-container");
// const span = document.querySelector("." + tag + "-container span");

// if (!valid) {
//   container.classList.add("error");
//   span.textContent = message;
// } else {
//   container.classList.remove("error");
//   span.textContent = message;
// }
// }
//   let firstNameChecker = (value) => {
//     if (value.length > 0 && (value.length < 3 || value.length > 20)
//     ) {
//       errorDisplay("firstName", "Le prénom doit faire entre 3 et 20 caractères");
//       firstName = null;
//     // } else if (!value.match(() {
// errorDisplay("firstName", "Le prénom ne doit pas contenir de caractères spéciaux");
// firstName = null;
//     } else {
//       errorDisplay("firstName", "", true);
//       firstName = value
//     }
//   let lastNameChecker = (value) => {
//     console.log(value);
//   };
//   let adressChecker = (value) => {
//   };
//   let cityChecker = (value) => {
//   };
//   let emailChecker = (value) => {
//     if (!value.match(/^((\w[^\W]+)[.-]?){1,}@(([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3})|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/)) {
//       errorDisplay('email', "le mail n'est pas valide");
//       email = null;
//     } else {
//       errorDisplay("email", "", true);
//       email = value;
//     }
//   };
// baliseCartOrder.forEach((input) => {
//   input.addEventListener("input", (e) => {
//     switch (e.target.id) {
//       case "firstName":
//         firstNameChecker(e.target.value);
//         break;
//       case "lastName":
//         lastNameChecker(e.target.value);
//         break;
//       case "adress":
//         adressChecker(e.target.value);
//         break;
//       case "city":
//         cityChecker(e.target.value);
//         break;
//       case "email":
//         emailChecker(e.target.value);
//         break;
//       default:
//         null;
//     }
