let cartItem = document.getElementById("cart__items");

//---------------------------------------------------------------------------------//
// DÉCLARATION DES VARIABLES PRIX TOTAL, QUANTITÉ TOTALE ET CHANGEMENT DE QUANTITÉ //
//---------------------------------------------------------------------------------//

var totalPrice = 0;
var totalQuantity = 0;
var changeQuantity = 0;

//--------------------------------------------------//
// AFFICHAGE DU TABLEAU COMPRENANT CHAQUE ARTICLES //
//------------------------------------------------//
let recupLs = JSON.parse(localStorage.getItem("productList"));
console.log(recupLs);

//---------------------------------------------------------------------//
// AFFICHAGE DE CHACUN DES ARTICLES DU TABLEAU DANS LA BOUCLE FOREACH //
//-------------------------------------------------------------------//
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

      //----------------------------------------------//
      // CHANGEMENT DE QUANTITÉ DES PRODUITS DU PANIER//
      //----------------------------------------------//
      baliseInputQuantity.addEventListener("change", function (e) {
        baliseInputQuantity.value = recupL.quantity;
        // recupLs[index].quantity = baliseChangeQuantity.quantity;
        localStorage.setItem("productList", JSON.stringify(recupLs));
        location.reload();
        // alert(baliseInputQuantity.value);
        // alert (index);
      });

      let baliseItemContentSettingsDelete = document.createElement("div");
      baliseItemContentSettingsDelete.setAttribute(
        "class",
        "cart__item__content__delete"
      );
      baliseItemContentSettings.appendChild(baliseItemContentSettingsDelete);

      //------------------------------------//
      // SUPPRESSION DES ARTICLES DU PANIER //
      //------------------------------------//
      let baliseDeleteItem = document.createElement("p");
      baliseDeleteItem.setAttribute("class", "deleteItem");
      baliseItemContentSettingsDelete.appendChild(baliseDeleteItem);
      baliseDeleteItem.textContent = "Supprimer";
      baliseDeleteItem.addEventListener("click", (e) => {
        recupLs.splice(index, 1);
        localStorage.setItem("productList", JSON.stringify(recupLs));
        location.reload();
      });

      //------------------------------------------//
      //          AFFICHAGE DU PRIX TOTAL         //
      //------------------------------------------//
      var baliseTotalPrice = document.getElementById("totalPrice");
      baliseTotalPrice.innerText = totalPrice;

      //------------------------------------------//
      //          AFFICHAGE QUANTITÉ TOTALE      //
      //----------------------------------------//
      var baliseTotalQuantity = document.getElementById("totalQuantity");
      baliseTotalQuantity.innerText = totalQuantity;

      var baliseChangeQuantity = document.createElement("class");
      baliseChangeQuantity.innerText = changeQuantity;
    });

  //-----------------------------------------//
  //              FORMULAIRE                 //
  //-----------------------------------------//
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
});
