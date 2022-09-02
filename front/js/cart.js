//Récupération produits existants du localStorage

let cartItem = document.getElementById("cart__items");

let recupLs = JSON.parse(localStorage.getItem("List"));
console.log(recupLs);

recupLs.forEach((recupL) => {
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

      let balisePQuantity = document.createElement("p");
      balisePQuantity.innerText = "Qté : ";
      baliseItemContentSettingsQuantity.appendChild(balisePQuantity);

      let baliseInputQuantity = document.createElement("input");
      baliseInputQuantity.setAttribute("type", "number");
      baliseInputQuantity.setAttribute("class", "itemQuantity");
      baliseInputQuantity.setAttribute("name", "itemQuantity");
      baliseInputQuantity.setAttribute("min", "1");
      baliseInputQuantity.setAttribute("max", "100");
      baliseInputQuantity.setAttribute("value", recupL.quantity);
      baliseItemContentSettingsQuantity.appendChild(baliseInputQuantity);

      let baliseItemContentSettingsDelete = document.createElement("div");
      baliseItemContentSettingsDelete.setAttribute(
        "class",
        "cart__item__content__delete"
      );
      baliseItemContentSettings.appendChild(baliseItemContentSettingsDelete);

      let baliseDeleteItem = document.createElement("p");
      baliseDeleteItem.setAttribute("class", "deleteItem");
      baliseItemContentSettingsDelete.appendChild(baliseDeleteItem);
      baliseDeleteItem.textContent = "Supprimer";

      let btnSupprimer = document.querySelectorAll(".deleteItem");
      btnSupprimer.forEach((article) => {
        article.addEventListener("click", (e) => {
          let btnSupprimer = document.createElement("Supprimer");
          console.log(btnSupprimer);
        });
      });
    });
});

/*---------------------------------------*/
// AFFICHAGE PRIX TOTAL
/*-------------------------------------*/

// totalQuantity = document.querySelector("#totalQuantity");
// baliseItemContentSettingsQuantity.quantity * balisePrice.price;
// let totalPriceItems = document.getElementById("totalPrice");
// totalPriceItems.textContent = totalQunatity;
