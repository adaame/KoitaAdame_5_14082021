let recupLocalStorage = storage.getItem(produit);
console.log(recupLocalStorage);

function recuperationProduit() {
  const produitPanier = getProduit();
  console.log(`ìd`, id);
  fetch(`http://localhost:3000/api/cameras/`) //apel a l'api qui retourne une promese qui ce resoud seul si l'url est correcte
    .then((response) => {
      if (!response.ok) {
        //si reponse different de ok
        throw Error(`une erreur c'est produite`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(`data`, data);
      data.map((produit) => {
        if (produit._id === id) {
          console.log(`produit`, produit);
          const html = `
          <div class="produit">
          <p><img src="${produit.imageUrl}" alt="${produit.name}"></p>
          <p>Modele :${produit.name}</p>
          <p>Description:${produit.description}</p>
          <p>Prix:${produit.price / 100}€</p>
          </div>
          <form>
          <label for="option-produit>ddd</label>
          <select name="option-produit" id="option-produit">
          <option value="produit.lenses">${produit.lenses}</option></a>
          </select>
          </form>
          <button ="btn_panier"> Ajouter au panier</button>
          `;

          document
            .querySelector("#listeProduit")
            .insertAdjacentHTML("afterbegin", html);
        }
        const btn_envoyer = document.querySelector("#btn_panier");
        console.log(` vous avez ajouté au panier le produit ${produit.name}`);
      });

      var phoneNumber = document.getElementById("phone-number").value;
      var phoneRGEX =
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      var phoneResult = phoneRGEX.test(phoneNumber);
      alert("phone:" + phoneResult);
    })

    .catch((error) => {
      console.log(error);
    });
}
recuperationProduit();
