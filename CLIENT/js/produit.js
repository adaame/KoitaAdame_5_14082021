//RECUPERATION DE LA CHAINE DE REQUETE DANS L'URL = LE ? ET L'ID
//console.log(queryString); //chainederequete)
//Méthode 1 --slice pour suprimée une element entre un indice de début et un indice de fin
// const theId = queryString.slice(1);
// console.log(theId);

function getProduitId() {
  const queryString = window.location.search; // recup l'id apres le ? dans l'url
  const urlSearchParams = new URLSearchParams(queryString); // constructeur qui prend en parametre mon url
  return urlSearchParams.get("id"); //retourn la valeur de l'id dans l'url
}

function oneProduit() {
  const id = getProduitId();
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
      // console.log(`data`, data);
      data.map((produit) => {
        if (produit._id === id) {
          // console.log(`produit`, produit);
          const html = `
          <div class="produit">
          <p><img src="${produit.imageUrl}" alt="${produit.name}"></p>
          <p>Modele :${produit.name}</p>
          <p>Description:${produit.description}</p>
          <p>Prix:${produit.price / 100}€</p>
          </div>
          <form id ="choix">
          <label for="lenses"></label>
  
          <select name="option-produit" id="option-produit">
              <option value="">--Choisiez votre produit--</option>
              <option value="${produit.lenses}">${produit.lenses}</option>
              <option value="choix2">Choix 2</option>
              </select>
          </form>
          <button id="btn-envoyer" type="submit" name="btn-envoyer"> Ajouter au panier</button>
          `;

          document
            .querySelector("#listeProduit")
            .insertAdjacentHTML("afterbegin", html);
          // choix lentille selectionné
          const idForm = document.querySelector("#option-produit");
          const choixForm = produit.lenses;

          console.log(`choix de l'option`, choixForm);

          //recupération information au click
          const btn_envoyerAuPanier = document.querySelector("#btn-envoyer");
          console.log(btn_envoyerAuPanier);
          btn_envoyerAuPanier.addEventListener("click", (event) => {
            event.preventDefault();
            let optionProduit = {
              nomProduits: produit.name,
              idProduitSelectionne: produit._id,
              option_produit: choixForm,
              quantite: 1,
              prix: produit.price / 100,
            };
            console.log(optionProduit);
          });
        }

        // console.log(
        //   ` vous avez ajouté au panier le produit ${
        //     (`produit cliqué`, produit.name)
        //   }`
        // );
      });
    })

    .catch((error) => {
      console.log(error);
    });
}
oneProduit();
