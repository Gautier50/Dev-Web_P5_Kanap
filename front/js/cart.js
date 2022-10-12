let cartItem = document.getElementById("cart__items");

// Déclaration des variables prix total, quantité totale et changement de quantité //
var totalPrice = 0;
var totalQuantity = 0;
var changeQuantity = 0;

// Récupération du Local Storage //
let recupLs = JSON.parse(localStorage.getItem("productList"));
// Affichage d'un tableau comprenant chaque article //
console.log(recupLs);

// AFFICHAGE DE CHACUN DES ARTICLES DU TABLEAU DANS LA BOUCLE FOREACH //
recupLs.forEach((recupL, index) => {
  // Affichage de l'objet javascript dans la console //
  console.log(recupL);

  // Requête fetch comprenant le lien de l'API dans lequel on ajoute l'id des articles de l'objet JS //
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
      // Affichage du texte du nom //
      baliseName.innerText = res.name;
      baliseItemContentDescription.appendChild(baliseName);

      let baliseColor = document.createElement("p");
      // Affichage du texte de la couleur //
      baliseColor.innerText = recupL.color;
      baliseItemContentDescription.appendChild(baliseColor);

      let balisePrice = document.createElement("p");
      // Affichage du prix de l'article avec le sigle " €" //
      balisePrice.innerText = res.price + " €";

      // On multiplie le prix avec la quantité pour obtenir le prix total //
      totalPrice = totalPrice + res.price * recupL.quantity;
      baliseItemContentDescription.appendChild(balisePrice);

      // On transforme la chaîne de caractères en nombres avec parseInt //
      // Ajout de la quantité depuis l'objet Javascript pour obtenir la quantité totale //
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
      // Affichage du texte "Qté" //
      baliseProductQuantity.innerText = "Qté : ";
      baliseItemContentSettingsQuantity.appendChild(baliseProductQuantity);
      // Création de l'élément "input" qui se charge de la quantité des produits //
      // On lui définit différents attributs //
      let baliseInputQuantity = document.createElement("input");
      baliseInputQuantity.setAttribute("type", "number");
      baliseInputQuantity.setAttribute("class", "itemQuantity");
      baliseInputQuantity.setAttribute("name", "itemQuantity");
      baliseInputQuantity.setAttribute("min", "1");
      baliseInputQuantity.setAttribute("max", "100");
      baliseInputQuantity.setAttribute("value", recupL.quantity);

      baliseItemContentSettingsQuantity.appendChild(baliseInputQuantity);

      // Modification des quantités d'un produit dans le panier grâce à l'évènement "change" //
      baliseInputQuantity.addEventListener("change", function (e) {
        let valueQuantityInput = baliseInputQuantity.value;

        // Si la quantité est supérieure à 100 et inférieure à 1 //
        if (baliseInputQuantity.value > 100 || baliseInputQuantity.value < 1) {
          // Alors on affiche le message d'erreur suivant //
          alert("Veuillez modifier la quantité de produits du panier !");
          // On ajoute une quantité de 1 //
          baliseInputQuantity.value = 1;
          // Dans notre tableau, on récupère la quantité de chaque produit //
          // Cette quantité pourra être modifiée grâce à l'évènement change //
          recupLs[index].quantity = baliseInputQuantity.value;
        } else {
          recupLs[index].quantity = valueQuantityInput;
        }
        localStorage.setItem("productList", JSON.stringify(recupLs));
        // On effectue un raffraichissement de la page //
        location.reload();
      });

      // Mise à jour des quantités des produits //
      let baliseItemContentSettingsDelete = document.createElement("div");
      baliseItemContentSettingsDelete.setAttribute(
        "class",
        "cart__item__content__delete"
      );
      baliseItemContentSettings.appendChild(baliseItemContentSettingsDelete);

      // Suppression des articles du panier //
      let baliseDeleteItem = document.createElement("p");
      baliseDeleteItem.setAttribute("class", "deleteItem");
      baliseItemContentSettingsDelete.appendChild(baliseDeleteItem);

      // Affichage du texte du bouton "supprimer" //
      baliseDeleteItem.textContent = "Supprimer";

      // Évènement au click sur le bouton "supprimer" //
      baliseDeleteItem.addEventListener("click", (e) => {
        // On modifie le contenu du tableau en l'actualisant //
        recupLs.splice(index, 1);
        localStorage.setItem("productList", JSON.stringify(recupLs));
        // On effectue un raffraichissement de la page //
        location.reload();
      });

      // Affichage du prix total //
      var baliseTotalPrice = document.getElementById("totalPrice");
      baliseTotalPrice.innerText = totalPrice;

      // Calcul du nombre total de produits dans le panier //
      var baliseTotalQuantity = document.getElementById("totalQuantity");
      baliseTotalQuantity.innerText = totalQuantity;
    });
});

//  FORMULAIRE  //

// Récupération de chacun des éléments du formulaire depuis le DOM //
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAdress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

let submitOrder = document.getElementById("order");

// Création de Regex //
let regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
let regexLastName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
let regexAdress = /^([0-9]*) ([a-zA-Z,\. ]*)/;
let regexCity = /^[a-zA-Z ]+$/;
let regexEmail = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

// Récupération des blaise <p> indiquant une erreur en cas de refus de la validation de l'input du formulaire //
let baliseFirstNameErrorMessage = document.getElementById("firstNameErrorMsg");
let baliseLastNameErrorMessage = document.getElementById("lastNameErrorMsg");
let baliseAdressErrorMessage = document.getElementById("addressErrorMsg");
let baliseCityErrorMessage = document.getElementById("cityErrorMsg");
let baliseEmailErrorMessage = document.getElementById("emailErrorMsg");

// Si le Local Storage contient des éléments conformes, on valide le formulaire grâce au click sur le bouton //
submitOrder.addEventListener("click", (event) => {
  event.preventDefault();
  // On suppose que tout le formulaire est valide
  let formOK = true;

  // si formOK est true, on peut valider la commande, sinon on ne fait rien
  if (formOK === true) {
    // validationForm();
  }

  // On récupère la valeur entrée dans l'input de de chaque élément  du formulaire //
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
      // Création d'un objet contact //
      let contact = {
        firstName: checkFirstName,
        lastName: checkLastName,
        address: checkAdress,
        city: checkCity,
        email: checkEmail,
      };

      // Création d'un tableau pour y insérer tout les produits de la commande ainsi que leurs quantités //
      let products = [];

      // Parcours le Local Storage et push les id dans la variable products //
      for (let product of recupLs) {
        products.push(product.id);
      }

      // Crée un objet contenant la liste des informations du formulaire et des produits de la commande //
      let userOrder = { contact: contact, products: products };

      // Création de la requête POST sur l'API afin d'y envoyer l'objet userOrder et récupérer l'id de la commande //
      let orderId = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userOrder),
      };
      console.log(userOrder);
      // Requête fetch comprenant l'URL de l'API afin d'afficher le numéro de commande //
      fetch("http://localhost:3000/api/products/order", orderId)
        .then((response) => response.json())
        .then((data) => {
          // Redirection vers la page confirmation //
          window.location = `/front/html/confirmation.html?id=${data.orderId}`;
        });
    }
  };
  validationForm();
});
