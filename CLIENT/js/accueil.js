function fetchData() {
  fetch(" http://localhost:3000/api/cameras") //apel a l'api qui retourne une promese qui ce resoud seul si l'url est correcte
    .then((response) => {
      if (!response.ok) {
        //si reponse different de ok
        throw Error(`une erreur c'est produite`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      const html = data
        .map((produit) => {
          return `
          <div class="produit">
          <p><img src="${produit.imageUrl}" alt="${produit.name}"></p>
          <p>Modele :${produit.name}</p>
          <p>Description:${produit.description}</p>
          <p>Prix:${produit.price}€</p>
          <a href="./produit.html?id=${produit._id}"><button id="btn">En savoir</button></a>
          </div>
          `;
        })
        .join(""); // permet d'avoir un vide entre chaque article evite la virgule du tableau
      document.querySelector("#liste").insertAdjacentHTML("afterbegin", html);
    })

    .catch((error) => {
      console.log(error);
    });
}
fetchData();
