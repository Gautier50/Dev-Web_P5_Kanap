//Récupération produits existants du localStorage

let cartItem = document.getElementById("cart__items");

var totalPrice = 0;
var totalQuantity = 0;

let recupLs = JSON.parse(localStorage.getItem("productList"));
console.log(recupLs);

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

      baliseInputQuantity.addEventListener("change", function (e) {
        alert(baliseInputQuantity.value);

        alert (index);
      });

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
      baliseDeleteItem.addEventListener("click", (e) => {
        recupLs.splice(index, 1);
        localStorage.setItem("productList", JSON.stringify(recupLs));
        location.reload();
      });

      var baliseTotalPrice = document.getElementById("totalPrice");
      baliseTotalPrice.innerText = totalPrice;
      
      var baliseTotalQuantity = document.getElementById("totalQuantity");
      baliseTotalQuantity.innerText = totalQuantity;
      

      
    });
});
