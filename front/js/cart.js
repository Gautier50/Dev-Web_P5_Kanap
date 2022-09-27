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

      totalQuantity = parseInt(totalQuantity) + parseInt(recupL.quantity);

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
        if (baliseInputQuantity.value > 100 || baliseInputQuantity.value < 1) {
          alert("Veuillez modifier la quantité de produits du panier !");
          baliseInputQuantity.value = 1;
          recupLs[index].quantity = baliseInputQuantity.value;
        } else {
          recupLs[index].quantity = valueQuantityInput;
        }
        localStorage.setItem("productList", JSON.stringify(recupLs));
        location.reload();
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

//  FORMULAIRE   //

// RÉCUPÉRATION DE CHACUN DES ÉLÉMENTS DU FORMULAIRE À PARTIR DU DOM //
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAdress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

let submitOrder = document.getElementById("order");

// CRÉATION DES REGEX //
let regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
let regexLastName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
let regexAdress = /^([0-9]*) ([a-zA-Z,\. ]*)/;
let regexCity = /^[a-zA-Z ]+$/;
let regexEmail = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

// RÉCUPÉRATION DES BALISES <p> INDIQUANT UNE ERREUR EN CAS DE REFUS DE LA VALIDATION DE L'INPUT DU FORMULAIRE //
let baliseFirstNameErrorMessage = document.getElementById("firstNameErrorMsg");
let baliseLastNameErrorMessage = document.getElementById("lastNameErrorMsg");
let baliseAdressErrorMessage = document.getElementById("addressErrorMsg");
let baliseCityErrorMessage = document.getElementById("cityErrorMsg");
let baliseEmailErrorMessage = document.getElementById("emailErrorMsg");

// SI LE LOCALSTORAGE CONTIENT DES ÉLÉMENTS ON VALIDE LE FORMULAIRE GRÂCE AU BOUTON //
submitOrder.addEventListener("click", (event) => {
  event.preventDefault();

  // RÉCUPÈRE LA VALEUR ENTRÉE DANS L'INPUT DE CHAQUE ÉLÉMENTS DU FORMULAIRE //
  let checkFirstName = inputFirstName.value;
  let checkLastName = inputLastName.value;
  let checkAdress = inputAdress.value;
  let checkCity = inputCity.value;
  let checkEmail = inputEmail.value;

  const validationForm = () => {
    if (recupLs === null) {
      alert("Vous n'avez séléctionné aucun produit !");
      return false;
    } else if (
      regexFirstName.test(checkFirstName) == false ||
      checkFirstName === null
    ) {
      baliseFirstNameErrorMessage.innerHTML = "Veillez renseigner votre prénom";
      return false;
    } else if (
      regexLastName.test(checkLastName) == false ||
      checkLastName === null
    ) {
      baliseLastNameErrorMessage.innerHTML = "Veillez renseigner votre nom";
      return false;
    } else if (regexAdress.test(checkAdress) == false) {
      baliseAdressErrorMessage.innerHTML =
        "Veillez renseigner votre adresse avec les informations suivantes : Numéro, voie, nom de la voie, code postal";
      return false;
    } else if (regexCity.test(checkCity) == false) {
      baliseCityErrorMessage.innerHTML = "Veuillez renseigner votre ville";
      return false;
    } else if (regexEmail.test(checkEmail) == false) {
      baliseEmailErrorMessage.innerHTML = "Saisie de l'adresse mail incorrect";
      return false;
    } else {
      // CRÉATION D'UN OBJET CONTACT //
      let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };

      // CRÉATION D'UN TABLEAU POUR Y INSÉRER TOUT LES PRODUITS DE LA COMMANDE AINSI QUE LEURS QUANTITÉS //

      let products = [];

      // PARCOURS LE LOCALSTORAGE ET PUSH LES ID DANS LA VARIABLE PRODUCTS //
      for (let product of recupLs) {
        products.push(product.idSelectedProduct);
      }

      // CRÉE UN OBJET CONENANT LA LISTE DES INFORMATIONS DU FORMULAIRE ET DES PRODUITS DE LA COMMANDE //

      let userOrder = { contact, products };

      // CRÉATION DE LA REQUÊTE POST SUR L'API AFIN D'Y ENVOYER L'OBJET userOrder ET RÉCUPÉRER L'ID DE LA COMMANDE //

      this.product.postContact(userOrder);
    }
  };
  validationForm();
});
