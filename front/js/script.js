var getBalise = document.getElementById("items");
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const products = data;

    products.forEach((product) => {
      console.log(product);
      /*getBalise.innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;*/

      
      // AFFICHAGE DES ARTICLES SUR LA PAGE D'ACCUEIL //
      let baliselink = document.createElement("a");
      baliselink.setAttribute("href", `./product.html?id=${product._id}`);
      getBalise.appendChild(baliselink);

      let balisearticle = document.createElement("article");
      baliselink.appendChild(balisearticle);

      let baliseimg = document.createElement("img");
      baliseimg.setAttribute("src", `${product.imageUrl}`);
      baliseimg.setAttribute("alt", product.altTxt);
      balisearticle.appendChild(baliseimg);

      let balisename = document.createElement("h3");
      balisename.setAttribute("class", "productName");
      balisename.innerText = product.name;
      balisearticle.appendChild(balisename);

      let balisedescription = document.createElement("p");
      balisedescription.setAttribute("class", "productDescription");
      balisedescription.innerText = product.description;
      balisearticle.appendChild(balisedescription);
    });
  });
